const debug = require('debug')('middleware:command')

module.exports = (bot) => (ctx, next) => {
  const adminCommands = bot.admin()
  const ownerCommands = bot.ownerCommands()
  ctx.command = {}
  if (ctx.updateType === 'message' && ctx.updateSubTypes[0] === 'text') {
    const text = ctx.update.message.text
    if (text.startsWith('/')) {
      debug('Detected a command')
      const match = text.match(/^\/([^\s]+)\s?(.+)?/)
      let args = []
      let command
      if (match !== null) {
        if (match[1]) {
          command = match[1].toLowerCase()
          if (match[2]) {
            args = match[2].split(' ')
            if (command === 'start') {
              ctx.payload = args[0].trim()
              debug('Payload detected')
            }
          }
          if (adminCommands.includes(command) && !ctx.admin) {
            return ctx.reply('Command unavailable').then(_v => {
              if (ctx.command && ctx.chat.type === 'supergroup') {
                ctx.deleteMessage()
              }
            })
          }
          if (ownerCommands.includes(command) && ctx.admin !== 'owner') {
            return ctx.reply('Command unavailable').then(_v => {
              if (ctx.command && ctx.chat.type === 'supergroup') {
                ctx.deleteMessage()
              }
            })
          }
        }
      }

      ctx.command = {
        raw: text,
        name: command,
        args
      }
    }
  } else if (ctx.updateType === 'callback_query') {
    const allCommands = bot.allCommands()
    const [name, ...args] = ctx.callbackQuery.data.split(':')
    if (allCommands.includes(name)) {
      ctx.command = {
        raw: ctx.callbackQuery.data,
        name,
        args
      }
    }
  }
  debug('Command: %O', ctx.command)
  return next().then(_val => {
    if (ctx.command && ctx.chat.type === 'supergroup') {
      debug('Deleting command message')
      ctx.deleteMessage()
    }
  })
}
