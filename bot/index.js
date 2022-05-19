if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const debug = require('debug')('bot:base')
const Telegraf = require('telegraf')
const LocalSession = require('telegraf-session-local')
const {
  resolve
} = require('path')
const {
  Composer,
  Stage
} = Telegraf
const {
  URL,
  BOT_TOKEN
} = process.env
const {
  errorHandler
} = require('../helpers')
const { ratelimit } = require('../config')
const {
  adminMiddleware,
  dbMiddleware,
  commandMiddleware,
  translateMiddleware: I18n,
  debugMiddleware,
  ratelimitMiddleware,
  timeMiddleware
} = require('../middlewares')

class Bot {
  /**
   * Bot base class
   *
   * @param {Object} data Bot config data
   * @param {Object[]} commands Bot commands
   * @param {Object[]} handlers Bot handlers
   * @param {Object[]} widgets Bot widgets
   */
  constructor (data, commands, handlers, widgets) {
    const defaultData = {
      api: '',
      name: 'bot',
      username: '',
      description: 'My cool bot'
    }
    /**
      * @typedef {object} BotInfo
      * @property {string} api
      * @property {string} name
      * @property {string} username
      * @property {string} description
      */
    /** @type {BotInfo} */
    this.data = Object.assign(defaultData, data)
    /** @type {import('telegraf').Telegraf} */
    this.bot = null
    this.commands = [...commands]
    this.handlers = [...handlers]
    this.widgets = [...widgets]
    this.session = new LocalSession({
      storage: LocalSession.storageMemory
    })
    // Just in case ;-)
    try {
      this.I18n = new I18n({
        path: resolve(__dirname, '../locales')
      })
    } catch (error) {
      debug(error)
    }
  }

  get api () {
    return this.data.api
  }

  set api (api) {
    this.data.api = api
  }

  get name () {
    return this.data.name
  }

  get description () {
    return this.data.description
  }

  admin () {
    const commands = []
    for (let i = 0; i < this.commands.length; i++) {
      const command = this.commands[i]
      if (command.isAdmin()) {
        commands.push(command.name)
      }
    }
    return commands
  }

  ownerCommands () {
    const commands = []
    for (let i = 0; i < this.commands.length; i++) {
      const command = this.commands[i]
      if (command.isOwner()) {
        commands.push(command.name)
      }
    }
    return commands
  }

  allCommands () {
    const commands = []
    for (let i = 0; i < this.commands.length; i++) {
      const command = this.commands[i]
      commands.push(command.name)
    }
    return commands
  }

  /** @param {import('../commands/base').Command} cmd */
  addCommand (cmd) {
    this.commands.push(cmd)
    return this
  }

  /** @param {import('../handlers/base').Handler} hdl */
  addHandler (hdl) {
    this.handlers.push(hdl)
    return this
  }

  hook () {
    return `/_run/bot/${this.api}`
  }

  setDb (db) {
    this.bot.context.database = db
  }

  async callback () {
    await this.bot.telegram.setWebhook(`${URL}${this.hook()}`)
    return this.bot.webhookCallback(this.hook())
  }

  init () {
    if (this.data.api === '') {
      this.data.api = BOT_TOKEN
    }
    if (/[0-9]{9}:[a-zA-Z0-9_-]{35}/i.test(this.data.api)) {
      debug('Setting up bot')
      // @ts-ignore
      this.bot = new Telegraf(
        this.data.api,
        {
          webhookReply: false,
          username: this.data.username
        }
      )

      // Scenes
      const stage = new Stage(this.widgets)
      stage.command('cancel', (ctx) => {
        ctx.reply('Operation canceled').then(errorHandler)
        return ctx.scene.leave()
      })

      // Middlewares
      this.bot.use(timeMiddleware(this))
      this.bot.use(debugMiddleware(this))
      this.bot.use(this.session.middleware())
      this.bot.use(adminMiddleware(this))
      this.bot.use(ratelimitMiddleware(ratelimit.text))
      this.bot.use(dbMiddleware(this))
      this.bot.use(commandMiddleware(this))
      this.bot.use(this.I18n.middleware())

      // Commands
      const cmds = []
      for (let i = 0; i < this.commands.length; i++) {
        /** @type {import('../commands/base').Command} */
        const cmd = this.commands[i]
        if (cmd.name) {
          if (cmd.alias && Array.isArray(cmd.alias)) {
            this.bot.command([cmd.name, ...cmd.alias], cmd.opts.run(this))
          } else {
            this.bot.command(cmd.name, cmd.opts.run(this))
          }
          cmds.push(cmd.name)
        }
      }
      debug('Initialize commands: %O', cmds)

      // Handlers
      const hdls = []
      for (let i = 0; i < this.handlers.length; i++) {
        /** @type {import('../handlers/base').Handler} */
        const hdl = this.handlers[i]
        if (hdl.name) {
          switch (hdl.type) {
            case 'action':
              this.bot.action(...hdl.run(this))
              break
            case 'text':
              this.bot.hears(...hdl.run(this))
              break
            case 'message':
              this.bot.on(...hdl.run(this))
              break
            default:
              this.bot.use(...hdl.run(this))
          }
          hdls.push(hdl.name)
        }
      }

      this.bot.use(
        // @ts-ignore
        Composer.command(
          (ctx) => ctx.reply('Sorry I didn\'t understand you.\nUse /help for available commands')
        )
      )
      this.bot.use(
        Composer.privateChat(
          Composer.mount(
            // @ts-ignore
            'text',
            (ctx) => ctx.reply('Sorry I didn\'t understand you.\nUse /help for available commands')
          )
        )
      )
      debug('Initialize handlers: %O', hdls)

      this.bot.catch(errorHandler)

      return Promise.resolve(this)
    } else {
      return Promise.reject(Error(`Could not initialize bot: ${this.name} invalid bot token`))
    }
  }
}

/**
 * Bot base class
 *
 * @param {Object} data Bot config data
 * @param {Object[]} c Bot commands
 * @param {Object[]} h Bot handlers
 * @param {Object[]} w Bot widgets
 */
module.exports = (data, c = [], h = [], w = []) => {
  return new Bot(data, c, h, w)
}

module.exports.Bot = Bot
