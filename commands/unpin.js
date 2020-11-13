const Command = require('./base')

const data = {
  name: 'unpin',
  admin: true,
  version: '1.0.0',
  description: 'Unpin a message in a group.'
}

module.exports = Command(data)
