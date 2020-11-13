const Command = require('./base')

const data = {
  name: 'unban',
  admin: true,
  version: '1.0.0',
  description: 'Unban a banned user.'
}

module.exports = Command(data)
