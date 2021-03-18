const Command = require('./base')

const data = {
  name: 'pin',
  admin: true,
  usage: '[message]',
  version: '1.0.0',
  description: 'Pin a message in a group.',
  run: (bot) => (ctx) => {
    let messageId
    if (ctx.message.reply_to_message) {
      messageId = ctx.message.reply_to_message.message_id
    } else if (ctx.command.args && ctx.command.args[0]) {
      messageId = ctx.command.args[0]
    } else {
      return ctx.reply('Please reply to a message you want to pin or pass the message id')
    }
    return ctx.pinChatMessage(messageId)
  }
}

module.exports = Command(data)
