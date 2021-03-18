class Command {
  constructor (opts = {}) {
    const options = {
      alias: [],
      admin: false,
      name: 'command',
      usage: '',
      version: '0.1.0',
      description: 'A simple command',
      run: (bot) => ({ reply, i18n }) => reply(i18n.t('dev'))
    }
    this.opts = Object.assign(options, opts)
    this.alias = this.opts.alias
    this.name = this.opts.name
    this.description = this.opts.description
    this.version = this.opts.version
    this.usage = this.opts.usage
  }

  run (bot) {
    return this.opts.run(bot)
  }

  isAdmin () {
    return (!!this.opts.admin && this.opts.admin !== 'owner')
  }

  isOwner () {
    return this.opts.admin === 'owner'
  }
}

module.exports = (opts) => new Command(opts)
