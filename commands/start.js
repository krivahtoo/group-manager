const Command = require('./base')

const data = {
  name: 'start',
  version: '1.1.0',
  description: 'Start the bot',
  run: (bot) => (ctx) => {
    const pkg = require('../package.json')
    return ctx.replyWithMarkdown(
      `Hi, *${ctx.from.first_name}*\n` +
      `${bot.description || pkg.description}\n\n` +
      'Use /help for available commands'
    )
  }
}

module.exports = Command(data)
