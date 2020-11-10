const Command = require('./base')

const data = {
  name: 'about',
  version: '1.0.0',
  description: 'Info about this bot.',
  run: (bot) => (ctx) => {
    const pkg = require('../package.json')
    return ctx.replyWithMarkdown(
      `*${bot.name}*\n` +
      `Version: _${pkg.version}_\n` +
      `${bot.description || pkg.description}\n\n` +
      '[Source Code](https://github.com/krivahtoo/group-manager)'
    )
  }
}

module.exports = Command(data)
