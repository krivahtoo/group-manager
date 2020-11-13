const Command = require('./base')

const data = {
  name: 'ban',
  admin: true,
  version: '1.0.0',
  description: 'Ban a group user.'
}

module.exports = Command(data)
