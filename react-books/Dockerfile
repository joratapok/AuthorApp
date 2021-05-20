FROM node:14.15.1

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json ./app
RUN npm install

COPY . /app

CMD npm start
