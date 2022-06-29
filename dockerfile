# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /
COPY . .
RUN yarn install --production
RUN cd src/ && yarn install --production
CMD ["node", "index.mjs"]
EXPOSE 3000