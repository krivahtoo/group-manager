if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const debug = require('debug')('bot:main')
const express = require('express')
const bot = require('./bot')
const db = require('./database')
const commands = require('./commands')
const {
  URL,
  PORT
} = process.env

const app = express()

db.sequelize
  .authenticate()
  .then(() => {
    debug('Database connection has been established successfully.')
  })
  .catch(err => {
    errorHandler('Unable to establish database connection:')
    debug(err)
  })

db.sequelize
  .sync()
  .then(() => debug('Initialized database'))

// Initialize our bot
bot(
  {
    name: 'Group Manager',
    description: 'A bot to help group admins manage their groups'
  },
  commands
).init().then(async bt => {
  bt.setDb(db)
  app.use(await bt.callback())
})

app.listen(PORT, () => {
  debug(`Bot listening on ${URL} 0n ${PORT}`)
})
