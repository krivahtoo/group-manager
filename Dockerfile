FROM node:12

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . /app

ENV PORT=3000

EXPOSE 3000

CMD [ "yarn", "dev" ]
