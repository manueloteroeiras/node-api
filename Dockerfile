FROM node:6.10.0

ADD ./package.json /app/package.json

WORKDIR /app
RUN npm install

ENV NODE_ENV=production
ENV PORT=8080
ENV MONGODB_URI=mongodb://localhost:32772/node-api

ADD ./ /app

EXPOSE 8080

CMD [ "node", "app.js" ]
