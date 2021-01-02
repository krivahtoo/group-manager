# Commands folder

This folder contains all commands

## How to add command

- Create a file for your command, with the following:

```js
const Command = require('./base')

const data = {
  name: 'command_name', // e.g. help for /help
  version: '0.1.0',
  description: 'Some description',
  usage: '<required value> [optional value]', // i.e. values that are passed to the command
  alias: ['n', 'nm'], // aliases of the command
  admin: false, // Is it for admins only? 
  run: (bot) => (ctx) => {
    // your command code here
  }
}

module.exports = Command(data)
```

Your command file can contain any thing as long as it exports an instance on `Command` class

- Add you file to `index.js`
