FROM registry.access.redhat.com/ubi9/nodejs-18

ENV TZ="Europe/Helsinki"

WORKDIR /opt/app-root/src

ARG GIT_SHA
ENV REACT_APP_GIT_SHA=$GIT_SHA

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

ARG E2E
ENV E2E=$E2E

ARG STAGING
ENV STAGING=$STAGING

# Setup
COPY package* ./
RUN npm ci --omit-dev --ignore-scripts --no-audit --no-fund
COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]