from node:8.16-alpine

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]