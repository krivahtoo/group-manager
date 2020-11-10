const adminMiddleware = require('./admin')
const dbMiddleware = require('./db')
const commandMiddleware = require('./command')
const debugMiddleware = require('./debug')
const ratelimitMiddleware = require('./rate-limit')
const translateMiddleware = require('./translate')
const timeMiddleware = require('./time')

module.exports = {
  adminMiddleware,
  dbMiddleware,
  commandMiddleware,
  debugMiddleware,
  ratelimitMiddleware,
  translateMiddleware,
  timeMiddleware
}
