const Command = require('./base')
const {
  escapeMarkdown,
  capFirst
} = require('../helpers')

const data = {
  name: 'help',
  usage: '[command]',
  version: '1.1.1',
  description: 'Show help',
  run: (bot) => async (ctx) => {
    await ctx.tg.sendChatAction(ctx.from.id, 'typing')
    let txt

    if (ctx.command.args) {
      txt = ctx.command.args[0]
    }

    let text = ''
    if (txt) {
      let cmd = false
      for (const command of bot.commands) {
        if (command.name === txt) {
          cmd = command
        }
      }
      if (cmd) {
        text =
          `*${capFirst(cmd.name)} Command*\n` +
          `Alias: ${cmd.alias.join(', ')}` +
          `Version: _${cmd.version}_\n` +
          `Usage: /${cmd.name} ${escapeMarkdown(cmd.usage)}\n` +
          `Description: ${escapeMarkdown(cmd.description)}\n`
      } else {
        text = 'Command not found\n'
      }
    } else {
      text += '*Available Commands*\n'
      let cmdText = '\n*Admin Commands*\n'

      for (const cmd of bot.commands) {
        if (cmd.isAdmin()) {
          cmdText += `/${cmd.name} ${escapeMarkdown(cmd.usage)} - ${escapeMarkdown(cmd.description)}\n`
        } else {
          text += `/${cmd.name} ${escapeMarkdown(cmd.usage)} - ${escapeMarkdown(cmd.description)}\n`
        }
      }

      if (ctx.admin) {
        text += cmdText
      }
      text += '\nUse /help `command` to get more help on a command\n'
    }
    return ctx.replyWithMarkdown(text)
  }
}

module.exports = Command(data)
