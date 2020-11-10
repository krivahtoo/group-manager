'use strict'

const path = require('path')
const Sequelize = require('sequelize')
const GroupModel = require('./modules/group')
const UserModel = require('./modules/user')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/database.js'))[env]

const sequelize = new Sequelize(config)

const Group = GroupModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)

module.exports = {
  sequelize,
  Sequelize,
  Group,
  User
}
