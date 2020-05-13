# 使用最小node图像
FROM node:12.16.3-alpine 

# 改变时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    &&apk -- update add tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \ 
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata \
    && apk add --no-cache bash

RUN mkdir -p /usr/src/cat/

WORKDIR /usr/src/cat/

COPY  package.json /usr/src/cat/package.json

RUN cd /usr/src/cat/

#只安装生产依赖
RUN npm i --production --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/src/cat/

EXPOSE 3000

CMD export NODE_ENV='production'&& node src/main.js