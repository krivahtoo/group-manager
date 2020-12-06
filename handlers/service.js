const Handler = require('./base')

const opts = {
  name: 'service',
  type: 'message',
  run: (bot) => [
    [
      // TODO new_chat_members handled by welcome handler
      'new_chat_members',
      'new_chat_photo',
      'new_chat_title',
      'left_chat_member',
      'delete_chat_photo'
    ],
    async (ctx) => {}
  ]
}

module.exports = Handler(opts)
