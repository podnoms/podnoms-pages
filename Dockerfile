FROM node:15.5.0-buster as builder

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn global add @angular/cli
RUN yarn build:ssr


FROM node:latest

LABEL maintainer="Fergal Moran <Ferg@lMoran.me>"
ARG env
RUN npm install pm2 -g
RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./dist/ dist/
EXPOSE 4000

CMD ["pm2-docker", "./dist/podnoms-pages/server/main.js"]
