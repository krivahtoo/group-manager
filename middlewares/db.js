'use strict'

const debug = require('debug')('middleware:database')
const {
  errorHandler,
  keysToCamel
} = require('../helpers')

module.exports = (bot) => async (ctx, next) => {
  if (!ctx.session) {
    ctx.session = new Map()
  }
  debug('session: %O', ctx.session)
  const { User, Group } = ctx.database
  if (ctx.from) {
    const from = keysToCamel(ctx.from)
    const id = Number(from.id)

    if (from.isBot) {
      debug('Skipping bot')
      return next()
    }

    const usr = await User
      .findByPk(id)
      .then(async user => {
        if (user && user.id) {
          debug('User was already created')

          return update(user, from)
        } else {
          debug('Saving a new user.')
          from.banned = false
          const newUser = new User(from)
          newUser.save()
          return newUser
        }
      })

    ctx.session.user = usr
  }
  if (ctx.chat && (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group')) {
    const chat = keysToCamel(ctx.chat)

    const grp = await Group
      .findByPk(Number(chat.id))
      .then(group => {
        if (group && group.id) {
          return update(group, chat)
        } else {
          debug('Saving a new group')
          const newGrp = new Group(chat)
          newGrp.save()
          return newGrp
        }
      })
    ctx.group = grp
  }

  return next()
}

const update = async (Model, data) => {
  const diff = Object.keys(data).reduce((acc, key) => {
    if (key === 'id') {
      return acc
    }
    if (typeof data[key] === 'boolean') {
      Model[key] = Boolean(Model[key])
    }
    if (data[key] !== Model[key]) {
      acc[key] = data[key]
    }
    return acc
  }, {})

  const fields = { ...diff }

  if (Object.keys(diff).length > 0) {
    debug('updating Model data: %o', fields)
    await Model.update(fields).catch(errorHandler)
  }

  return Model
}
