module.exports = (
  text,
  data = {},
  delim = {
    start: '#{',
    end: '}'
  }
) => {
  const re = new RegExp(`${delim.start}([^${delim.end}]+)?${delim.end}`, 'g')
  const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  let code = 'const r=[]; '
  let cursor = 0
  let match
  const add = (line, js) => {
    js
      ? (code += line.match(reExp) ? `${line} ` : `r.push(${line});`)
      : (code += line !== '' ? `r.push("${line.replace(/"/g, '\\\\"').replace(/\n/g, '\\n')}"); ` : '')
    return add
  }
  for (const key in data) {
    code += ` const ${key} = this.${key};`
  }
  while ((match = re.exec(text)) !== null) {
    add(text.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }
  add(text.substr(cursor, text.length - cursor))
  code += 'return r.join("");'

  // eslint-disable-next-line no-new-func
  return new Function(code).apply(data)
}
