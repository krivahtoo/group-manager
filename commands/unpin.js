const Command = require('./base')

const data = {
  name: 'unpin',
  admin: true,
  version: '1.0.0',
  description: 'Unpin a message in a group.',
  run: (bot) => (ctx) => {
    return ctx.unpinChatMessage()
  }
}

module.exports = Command(data)
