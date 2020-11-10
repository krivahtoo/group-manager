const path = require('path')

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '/../.data/sqlite.db'),
    define: {
      underscoredAll: true
    }
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '/../.data/sqlite.db'),
    define: {
      underscoredAll: true
    }
  },
  production: process.env.DATABASE_URL
}
