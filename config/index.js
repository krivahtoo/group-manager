const admins = []

const env = process.env

Object.keys(env)
  .filter(key => key.endsWith('_ADMIN'))
  .reduce((_obj, key) => {
    admins.push(raw[key])
  }, {})

module.exports = {
  ratelimit: {
    text: {
      window: 3000,
      limit: 1,
      onLimitExceeded: (ctx, next) => {
        if (ctx.admin || ctx.updateType !== 'message') {
          return next()
        }
        return ctx.reply('😠 Do not spam!!')
      }
    }
  },
  admins
}
