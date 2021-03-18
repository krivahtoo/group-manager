const admins = []

const env = process.env.ADMINS

// get all admins on ADMINS
env.split(',').forEach(val => {
  admins.push(parseInt(val))
})

module.exports = {
  ratelimit: {
    text: {
      window: 3000,
      limit: 1,
      onLimitExceeded: (ctx, next) => {
        if (ctx.admin || ctx.updateType !== 'message') {
          return next()
        }
        return ctx.reply('\u{1F975} Do not spam!!')
      }
    }
  },
  admins
}
