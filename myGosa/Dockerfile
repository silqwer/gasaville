FROM node:8.11.1

MAINTAINER Yongho Kim <silqwer@gmail.com>

WORKDIR /home/tekville/dkapps/gosa

COPY package.json /home/tekville/dkapps/gosa

RUN npm install

COPY . /home/tekville/dkapps/gosa

CMD npm start app.js

EXPOSE 8888