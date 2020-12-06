// const debug = require('debug')('handlers:base')

class Handler {
  constructor (opts) {
    const defaultOpts = {
      name: 'base',
      type: 'text',
      run: (bot) => ['text', (ctx) => {}]
    }

    this.opts = Object.assign({}, defaultOpts, opts)
    this.run = this.opts.run
    this.name = this.opts.name
    this.type = this.opts.type
  }
}

module.exports = (opts = {}) => (new Handler(opts))
