const Command = require('./base')
const { escapeMarkdown, capFirst } = require('../helpers')

const data = {
  name: 'help',
  usage: '[command]',
  version: '1.1.1',
  description: 'Show help',
  run: (bot) => async (ctx) => {
    await ctx.replyWithChatAction('typing')
    let txt

    if (ctx.command.args) {
      txt = ctx.command.args[0]
    }

    let text = ''
    if (txt) {
      /** @type {boolean | Object} */
      let cmd = false
      for (const command of bot.commands) {
        if (command.name === txt) {
          cmd = command
        }
      }
      if (cmd) {
        text = `*${capFirst(cmd.name)} Command*\n`

        if (cmd.alias.length > 0) {
          text += `Alias: ${cmd.alias.join(', ')}\n`
        }

        text += ctx.i18n.t('commands.help.command', {
          version: cmd.version,
          name: cmd.name,
          usage: escapeMarkdown(cmd.usage),
          description: escapeMarkdown(cmd.description)
        })
      } else {
        text = ctx.i18n.t('errors.unavailable')
      }
    } else {
      text += '*Available Commands*\n'
      let adminCmds = '\n*Admin Commands*\n'

      for (const cmd of bot.commands) {
        if (cmd.isAdmin()) {
          adminCmds += `/${cmd.name} ${escapeMarkdown(
            cmd.usage
          )} - ${escapeMarkdown(cmd.description)}\n`
        } else {
          text += `/${cmd.name} ${escapeMarkdown(cmd.usage)} - ${escapeMarkdown(
            cmd.description
          )}\n`
        }
      }

      if (ctx.admin) {
        text += adminCmds
      }
      text += ctx.i18n.t('errors.use_help')
    }
    return ctx.replyWithMarkdown(text)
  }
}

module.exports = Command(data)
