const err = require('debug')('bot:error')
const { Extra } = require('telegraf')
const MemoryStore = require('./memory-store')
const TemplateEngine = require('./template-engine')

const errorHandler = (error) => {
  err(error)
  return false
}

const makeUserMention = ({
  id,
  username,
  first_name: firstName,
  last_name: lastName
}) => username
  ? `@${username}`
  : `[${firstName || lastName}](tg://user?id=${id})`

const escapeMarkdown = (text = '') => {
  text = text
    .replace('_', '\\_')
    .replace('*', '\\*')
    .replace('[', '\\[')
    .replace('`', '\\`')
  return text
}

const capFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

const isArray = function (a) {
  return Array.isArray(a)
}

const isObject = (o) => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {}

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k])
      })

    return n
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i)
    })
  }

  return o
}

const reply = async (text, ctx) => {
  const res = await ctx.replyWithMarkdown(text, Extra.inReplyTo(ctx.message.message_id))
  return res
}

const roll = (min, max, floatFlag) => {
  const r = Math.random() * (max - min) + min
  return floatFlag ? r : Math.floor(r)
}

const admin = () => (ctx, next) => {
  if (ctx.admin) {
    return next()
  } else {
    return ctx.reply('Use /help for available commands')
  }
}

module.exports = {
  errorHandler,
  makeUserMention,
  escapeMarkdown,
  keysToCamel,
  reply,
  MemoryStore,
  roll,
  admin,
  capFirst,
  TemplateEngine
}
