FROM  node:12.18.3-alpine AS BUILD_IMAGE

RUN mkdir -p /usr/src/cat/

WORKDIR /usr/src/cat/

COPY  package.json /usr/src/cat/package.json

# install NPM dependencies
RUN npm install  --production --registry=https://registry.npm.taobao.org

# 使用最小node图像 --这个是生成环境的DockerFile
FROM node:12.18.3-alpine

# 改变时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    &&apk --update add tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \ 
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata \
    && apk add --no-cache bash

RUN mkdir -p /usr/src/cat/

WORKDIR /usr/src/cat/

COPY --from=BUILD_IMAGE /usr/src/cat/node_modules  ./node_modules/

# copy code
COPY . /usr/src/cat/

EXPOSE 3000 3001

USER node

CMD export NODE_ENV='production' && node src/prod.js