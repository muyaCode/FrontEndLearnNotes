# 08_npm scrip

[npm script详解 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903982888910855)

[用 npm script 打造超溜的前端工作流 - 王仕军 - 掘金小册 (juejin.cn)](https://juejin.cn/book/6844723718749421582)

[npm(script)脚本 - 走看看 (zoukankan.com)](http://t.zoukankan.com/ruange-p-10908276.html)

[玩转npm script (copyfuture.com)](https://copyfuture.com/blogs-details/202112111615205990)

[(1条消息) 玩转npm script_旺旺旺小小苏的博客-CSDN博客](https://blog.csdn.net/liusuyun_1/article/details/117595482)

[入门篇 01：创建并运行 npm script 命令 · 用 npm script 打造超溜的前端工作流 · 看云 (kancloud.cn)](https://www.kancloud.cn/sllyli/npm-script/1243451)

[(1条消息) 你要知道的 Npm Script 都在这里_weixin_46961967的博客-CSDN博客](https://blog.csdn.net/weixin_46961967/article/details/113904547)

### 什么是 npm script

npm 允许在 **package.json** 文件里面，使用scripts字段定义脚本命令。

```json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

使用

```bash
npm run build # npm run + 定义的命令
```

## 运行多个命令

在实际开发过程中可能会碰到多个命令一起启动的情况。比如我们前后端一起启动。

运行多个命令就会涉及到串行和并行问题了

### 串行

串行实现方式也比较简单，只需要用 `&&` 符号把多条 `npm script` 按先后顺序串起来即可。

```js
"scripts": {
  "frotend": "echo \"前端服务启动啦\"",
  "server": "echo \"后端服务启动啦\"",
  "all": "npm run frotend && npm run server",
},
```