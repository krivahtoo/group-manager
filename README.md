# Group Manager Bot

:warning: ***Warning:** This bot is not fully working yet*

![GitHub](https://img.shields.io/github/license/krivahtoo/group-manager)
![GitHub package.json version](https://img.shields.io/github/package-json/v/krivahtoo/group-manager)
![GitHub last commit](https://img.shields.io/github/last-commit/krivahtoo/group-manager)
[![Node.js CI](https://github.com/krivahtoo/group-manager/actions/workflows/node.js.yml/badge.svg)](https://github.com/krivahtoo/group-manager/actions/workflows/node.js.yml)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/krivahtoo/group-manager/telegraf)

Group Manager is a bot to help group manage their groups

## Preriquisites

- Node.js
- yarn
- [ngrok](https://ngrok.com) (optional - running locally)

## Running

### Development

> This assumes that you have ngrok setup on your system

Clone this project

```sh
git clone https://github.com/krivahtoo/group-manager.git
```

Install node dependencies using yarn

```sh
yarn
```

Start ngrok on port 3000 and copy the url.

```sh
ngrok http 3000
```

Create `.env` file and add

```ini
BOT_TOKEN="Your : token here...."
PORT=3000
URL='xxxxx.ngrok.io'

# Comma separated admin ids
ADMINS=182383,1234455
```

Start your bot

```sh
yarn dev
```

### Production

The following env variables are required for production

```
BOT_TOKEN="Your : token here...."
PORT=3000

# Comma separated admin ids
ADMINS=182383,1234455
```

Starting your bot

```sh
yarn start
```
