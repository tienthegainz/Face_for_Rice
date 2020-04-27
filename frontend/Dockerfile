# base image
FROM node:12.16.1-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
RUN yarn
COPY . .

# start app
CMD ["yarn", "start"]