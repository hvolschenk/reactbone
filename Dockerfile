FROM node:erbium-alpine

RUN apk update && apk add curl make python && rm -rf /var/cache/apk/*

ENV CHOKIDAR_USEPOLLING true
ENV HOME /home/node/app

WORKDIR $HOME

VOLUME [$HOME]

RUN chown -R node:node $HOME
USER node
