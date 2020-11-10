'use strict'

const debug = require('debug')('middleware:debug')
const numeral = require('numeral')

module.exports = (bot) => (ctx, next) => {
  const start = new Date().getTime()
  debug(`------------New Update: ${bot.name}------------`)
  const updateType = ctx.updateType
  const updateSubType = ctx.updateSubTypes[0]
  let text = `Processing: ${updateType}:${updateSubType}`
  if (ctx.from) {
    text += ` From: ${ctx.from.first_name}`
  }
  if (updateSubType === 'text') {
    text += ` Text: ${ctx.message.text.trim()}`
  }
  if (updateType === 'callback_query' && ctx.callbackQuery.data) {
    text += ` Data: ${ctx.callbackQuery.data}`
  }
  debug(text)
  // Show stats at the very end
  return Promise.resolve().then(() => {
    return new Promise(resolve => {
      next().then(() => {
        resolve()
      })
    })
  }).then(() => {
    const end = new Date().getTime()
    debug('------------Stats------------')
    debug(`
      Time used: ${numeral((end - start) / 1000).format('0.000')}s\n
      Heap used: ${numeral(process.memoryUsage().heapUsed).format('0.00b')}\n
      Heap total: ${numeral(process.memoryUsage().heapTotal).format('0.00b')}
    `)
    debug('------------Finished------------')
  })
}
