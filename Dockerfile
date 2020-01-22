# FROM nginx:alpine

# COPY nginx/conf.d /etc/nginx/nginx.conf
# WORKDIR /usr/share/nginx/html
# COPY dist/podnoms-pages/ .

# EXPOSE 80
FROM node:latest

LABEL maintainer="Fergal Moran <Ferg@lMoran.me>"
ARG env
RUN npm install pm2 -g
RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./dist/ dist/
EXPOSE 4000

CMD ["pm2-docker", "./dist/podnoms-pages/server/main.js"]
