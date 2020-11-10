module.exports = (
  html,
  options = {},
  d = {
    start: '#{',
    end: '}'
  }
) => {
  const re = new RegExp(`${d.start}([^${d.end}]+)?${d.end}`, 'g')
  const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  let code = 'const r=[]; '
  let cursor = 0
  let match
  const add = (line, js) => {
    js
      ? (code += line.match(reExp) ? `${line} ` : `r.push(${line});`)
      : (code += line !== '' ? `r.push("${line.replace(/"/g, '\\\\"')}"); ` : '')
    return add
  }
  for (const key in options) {
    code += ` const ${key} = this.${key};`
  }
  while ((match = re.exec(html)) !== null) {
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }
  add(html.substr(cursor, html.length - cursor))
  code += 'return r.join("");'

  // eslint-disable-next-line no-new-func
  return new Function(code).apply(options)
}
