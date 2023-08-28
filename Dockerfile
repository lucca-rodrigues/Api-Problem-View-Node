
FROM docker.io/node:18.4.0-alpine as BUILD


ARG REPOSITORY
ARG APP_VERSION
ARG RELEASE_DATE
ARG MAINTAINER

LABEL app_version=${APP_VERSION} \
                  release_date=${RELEASE_DATE} \
                  repository=${REPOSITORY} \
                  maintainer=${MAINTAINER}


ENV PATH /opt/frst/app/node_modules/.bin:$PATH

RUN apk update && apk add --no-cache bash

RUN mkdir -p /opt/frst/app/
WORKDIR /opt/frst/app/

COPY /package*.json ./opt/frst/app/
COPY .sequelizerc ./opt/frst/app/

# USER root

RUN chown 1000:1000 /opt/frst/app/
RUN chmod -R 777 /opt/frst/app/

RUN true
COPY . /opt/frst/app/
RUN true

RUN ls /opt/frst/app/

RUN true

 RUN npm i && \ 
    npm ci --no-audit && \
    apk add --no-cache bash && \
    npm install -g sequelize-cli && \
    npm run build

EXPOSE 3001

CMD ["npm", "start"]
