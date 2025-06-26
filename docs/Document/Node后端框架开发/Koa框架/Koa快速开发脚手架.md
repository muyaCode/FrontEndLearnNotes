# Koa 快速开发脚手架

## 环境：Node版本 >= v7.6.0 来支持ES2015、异步方法

1、第一步：全局安装  `koa-generator`

```bash
npm install koa-generator -g
```

2、第二步：使用  `koa-generator`  生成  `koa`  项目

```bash
# 项目名字为：myproject
koa2 myproject

# 如果需要ejs模板, 在koa2 后 加 -e参数：默认是pug模板
koa2 -e/--ejs  项目包名
```

3、第三步：进入项目，安装依赖包

```bash
# 进入 myproject 项目
cd myproject
# 安装
npm install
```

4、第四步：启动服务

```bash
npm start
```

5、第五步：打开浏览器

```bash
# 打开下面链接
http://localhost:3000/
# 页面显示
Hello Koa 2!
Welcome to Hello Koa 2!
```
