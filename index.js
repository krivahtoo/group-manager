if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const debug = require('debug')('bot:main')
const express = require('express')
const bot = require('./bot')
const db = require('./database')
const commands = require('./commands')
const handlers = require('./handlers')
const {
  errorHandler
} = require('./helpers')
const {
  URL,
  PORT
} = process.env

const app = express()

// Connect to our database
db.sequelize
  .authenticate()
  .then(() => {
    debug('Database connection has been established successfully.')
  })
  .catch(err => {
    errorHandler('Unable to establish database connection:')
    debug(err)
  })

// Create tables if not already created
db.sequelize
  .sync()
  .then(() => debug('Initialized database'))

// Initialize our bot
bot(
  {
    name: 'Group Manager',
    description: 'A bot to help group admins manage their groups'
  },
  // All our commands
  commands,
  // All our handlers
  handlers
  // All our widgets
).init().then(async bt => {
  // Setup our database object
  bt.setDb(db)
  app.use(await bt.callback())
}).catch(errorHandler)

app.listen(PORT, () => {
  debug(`Bot listening on ${URL} 0n ${PORT}`)
})
