const admins = []

const env = process.env

// get all values with _ADMIN prefix
Object.keys(env)
  .filter(key => key.endsWith('_ADMIN'))
  .reduce((_obj, key) => {
    return admins.push(env[key])
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
