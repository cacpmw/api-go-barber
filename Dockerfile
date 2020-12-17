FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

#APP VARS
ENV APP_SECRET=hf234hgf23hg4f23hjg4f234hjf
ENV APP_WEB_URL=http://localhost:3000
ENV APP_API_URL=http://localhost:3333

#MAIL VARSS
ENV APP_MAIL_DRIVER=ethereal
ENV APP_MAIL_SENDER_NAME="Equipe GoBarber"
ENV APP_MAIL_SENDER_EMAIL="equipe@gobarber.com.br"
#AWS VARS
ENV AWS_ACCESS_KEY_ID=
ENV AWS_SECRET_ACCESS_KEY=
ENV AWS_DEFAULT_REGION=
ENV AWS_BUCKET=

#STORAGE VARS
ENV STORAGE_DRIVER=disk

#REDIS VARS
ENV REDIS_HOST=db-redis
ENV REDIS_PORT=6379
ENV REDIS_PASS=


# RUN cp .env.example .env

EXPOSE 3333

RUN chmod +x wait-for.sh

CMD [ "yarn dev"]