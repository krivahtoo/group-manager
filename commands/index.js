const startCommand = require('./start')
const helpCommand = require('./help')
const aboutCommand = require('./about')
const banCommand = require('./ban')
const unbanCommand = require('./unban')
const pinCommand = require('./pin')
const unpinCommand = require('./unpin')

module.exports = [
  startCommand,
  helpCommand,
  aboutCommand,
  banCommand,
  unbanCommand,
  pinCommand,
  unpinCommand
]
