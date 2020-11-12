FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN ls

EXPOSE 3333

#RUN chmod 777 ./wait-for.sh
#RUN ls -la
#ENTRYPOINT ["./wait-for.sh","database:5432","--","yarn typeorm migration:run","yarn dev"]
