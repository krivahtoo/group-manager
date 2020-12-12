const Handler = require('./base')
const {
  errorHandler
} = require('../helpers')

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
    async (ctx) => {
      ctx.database.Group.findByPk(ctx.chat.id)
        .then((result) => {
          if (result && result.settings) {
            let settings = result.settings
            if (typeof settings !== 'object') {
              settings = JSON.parse(settings)
            }
            if (settings.deleteService) {
              ctx.deleteMessage(ctx.massage.massage_id)
            }
          }
        }).catch(errorHandler)
    }
  ]
}

module.exports = Handler(opts)
