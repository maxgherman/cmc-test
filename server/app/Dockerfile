# official image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# APPLICATION ENV VARIABLES

# WEB SERVER
ENV SERVER_PORT=$PORT
ENV CLIENT_URL=$CLIENT_URL

# AUTH PROVIDER
ENV MAGIC_SECRET_KEY=$MAGIC_SECRET_KEY

# dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# application
COPY . ./

# build
RUN npm run lint
RUN CI=true npm test
RUN npm run build

# run
EXPOSE 8080
CMD [ "node", "./build/index.js" ]