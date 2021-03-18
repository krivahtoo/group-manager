const Command = require('./base')

const data = {
  name: 'unban',
  admin: true,
  version: '1.0.0',
  description: 'Unban a banned user.',
  run: (bot) => (ctx) => {
    let userId
    if (ctx.message.reply_to_message) {
      userId = ctx.message.reply_to_message.message_id
    } else if (ctx.command.args && ctx.command.args[0]) {
      userId = ctx.command.args[0]
    } else {
      return ctx.reply('Usage: /unban [user-id] or reply', { reply_to_message_id: ctx.message.message_id })
    }
    return ctx.unbanChatMember(userId)
  }
}

module.exports = Command(data)
