// const debug = require('debug')('handlers:base')
/** @typedef {import('telegraf').Context} Context */
/** @typedef {import('telegraf').Middleware<Context>} Middleware */
/** @typedef {import('../bot').Bot} Bot */

class Handler {
  constructor (opts) {
    const defaultOpts = {
      name: 'base',
      type: 'text',
      run: (bot) => ['text', (ctx) => {}]
    }

    this.opts = Object.assign({}, defaultOpts, opts)
    /** @type {(bot: Bot) => [any, Middleware]} */
    this.run = this.opts.run
    /** @type {String} */
    this.name = this.opts.name
    /** @type {String} */
    this.type = this.opts.type
  }
}

module.exports = (opts = {}) => (new Handler(opts))

module.exports.Handler = Handler
