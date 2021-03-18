const Command = require('./base')

const data = {
  name: 'start',
  version: '1.1.0',
  description: 'Start the bot',
  run: (bot) => (ctx) => {
    return ctx.replyWithMarkdown(
      ctx.i18n.t('commands.start', {
        name: ctx.from.first_name,
        about: ctx.i18n.t('description')
      })
    )
  }
}

module.exports = Command(data)
