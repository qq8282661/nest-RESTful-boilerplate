# nest-RESTful-boilerplate

结合 node 最佳实践,模仿 egg,做出的 nest 服务端模板

### 简介

- 数据库操作:typeORM,mysql

- 模板渲染:ejs

- docker 应用容器化配置文件

- 数据验证:class-validator

- 服务器通讯:grpc

### 使用方法

下载代码

```bash
 git clone https://github.com/qq8282661/nest-RESTful-boilerplate.git
```

开发环境

```bash
npm run dev
```

生产环境,

```bash
npm run tsc&&npm start
```

可以使用 pm2 等监控工具(需要在编译后)
