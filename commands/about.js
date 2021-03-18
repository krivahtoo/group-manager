const Command = require('./base')

const data = {
  name: 'about',
  version: '1.0.0',
  description: 'Info about this bot.',
  run: (bot) => (ctx) => {
    const pkg = require('../package.json')
    return ctx.replyWithMarkdown(
      ctx.i18n.t('about', {
        name: bot.name,
        version: pkg.version,
        description: ctx.i18n.t('description')
      })
    )
  }
}

module.exports = Command(data)
