/** @typedef {import('telegraf').Context} Context */
/** @typedef {import('telegraf').Middleware<Context>} Middleware */
/** @typedef {import('../bot').Bot} Bot */

class Command {
  constructor (opts = {}) {
    const options = {
      alias: [],
      /** @type {Boolean | 'owner'} */
      admin: false,
      name: 'command',
      usage: '',
      version: '0.1.0',
      description: 'A simple command',
      /** @type {(bot: Bot) => Middleware} */
      run: (bot) => ({ reply, i18n }) => reply(i18n.t('dev'))
    }
    this.opts = Object.assign(options, opts)
    /** @type {String[]} */
    this.alias = this.opts.alias
    /** @type {String} */
    this.name = this.opts.name
    /** @type {String} */
    this.description = this.opts.description
    /** @type {String} */
    this.version = this.opts.version
    /** @type {String} */
    this.usage = this.opts.usage
  }

  run (bot) {
    return this.opts.run(bot)
  }

  isAdmin () {
    return (!!this.opts.admin && this.opts.admin !== 'owner')
  }

  isOwner () {
    return this.opts.admin === 'owner'
  }
}

module.exports = (opts) => new Command(opts)

module.exports.Command = Command
