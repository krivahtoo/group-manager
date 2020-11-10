module.exports = (bot) => (ctx, next) => {
  ctx.webhookReply = false
  switch (ctx.updateType) {
    case 'message':
      if (new Date().getTime() / 1000 - ctx.message.date < 5 * 60) {
        next()
      } else {
        console.log(`Ignoring messages updateType: 'message' from ${ctx.chat.id}`)
      }
      break
    case 'callback_query':
      if (ctx.callbackQuery.message && new Date().getTime() / 1000 - ctx.callbackQuery.message.date < 5 * 60) {
        next()
      } else {
        console.log(`Ignoring messages updateType: 'callback_query' from ${ctx.chat.id}`)
      }
      break
    case 'inline_query':
      return next()
    default:
      next()
      break
  }
}
