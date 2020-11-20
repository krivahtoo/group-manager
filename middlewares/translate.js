const debug = require('debug')('middleware:translate')
const fs = require('fs')
const path = require('path')
const YAML = require('yaml')
const {
  TemplateEngine
} = require('../helpers')

class I18n {
  constructor (opts = {}) {
    const defaultOpts = {
      locale: 'en'
    }
    if (!opts.path) {
      throw new Error('You must specify locales path.')
    }
    this.opts = Object.assign(defaultOpts, opts)
    this.data = this.loadFiles(this.opts.path)
  }

  loadFiles (Path) {
    if (!fs.existsSync(Path)) {
      throw new Error(`Locales Path: ${Path} does not exists.`)
    }
    const files = fs.readdirSync(Path)
    const data = {}
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (/\.yml$/.test(file)) {
        data[file.replace('.yml', '')] =
          YAML.parse(
            fs.readFileSync(path.resolve(Path, file), 'utf8')
          )
      }
    }
    return data
  }

  middleware () {
    return (ctx, next) => {
      ctx.i18n = new Context({
        locale: this.opts.locale,
        // Just in case
        data: Object.assign(this.data.en, this.data[this.opts.locale])
      })
      return next()
    }
  }
}

class Context {
  constructor (opts = {}) {
    this.data = opts.data
    this.locale = opts.locale
    this.opts = Object.assign({}, opts)
  }

  t (text, options = {}) {
    debug(`Translating: '${text}'`)
    // We can't translate normal text
    if (text.includes(' ')) return text
    return TemplateEngine(
      text.split('.').reduce((acc, key) => acc && acc[key], this.data),
      options
    )
  }
}

module.exports = I18n
