const Command = require('./base')

const data = {
  name: 'pin',
  admin: true,
  version: '1.0.0',
  description: 'Pin a message in a group.'
}

module.exports = Command(data)
