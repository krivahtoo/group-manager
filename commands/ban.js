const Command = require('./base')

const data = {
  name: 'ban',
  admin: true,
  usage: ' [user id] or reply',
  version: '1.0.0',
  description: 'Ban a group user.',
  run: (bot) => (ctx) => {
    let userId
    if (ctx.message.reply_to_message) {
      userId = ctx.message.reply_to_message.message_id
    } else if (ctx.command.args && ctx.command.args[0]) {
      userId = ctx.command.args[0]
    } else {
      return ctx.reply(
        ctx.i18n.t('usage', { command: 'ban', usage: '[user id] or reply' }),
        { reply_to_message_id: ctx.message.message_id }
      )
    }
    return ctx.kickChatMember(userId)
  }
}

module.exports = Command(data)
