# Electron应用质量监控

## Electron的质量保障：Web超集

|            | 开发                                          | 测试                                                   | 上线                   | 监控                                     |
| ---------- | --------------------------------------------- | ------------------------------------------------------ | ---------------------- | ---------------------------------------- |
| Web侧      | 代码静态检查、强类型语言、Code Review | 单元测试、性能测试、UI自动化测试、冒烟测试 | 灰度发布、回滚     | 性能监控、异常监控、用户行为监控 |
| Electron侧 |                                               | +Electron测试(Spectron)                           | +功能开关、+热修复 | +崩溃监控                                |

## Electron崩溃监控关键步骤

![electron程序崩溃](.\img\electron程序崩溃.jpg)

## 崩溃监控--服务端

需要实现一个submitUrl的POST接口，请求为multipart/form-data格式

- `ver` String - Electron 的版本
- `platform` String -例如win32!
- `process_type` String - 例如renderer!
- `guid` String-例如5e1286fc-da97-479e-918b-6bfb0c3d1c72'
- `_version` String- `package.json` 里的版本号
- `_productName` String - `crashReporter`  `options` 对象中的产品名字
- `prod` String- 基础产品名字.在这种情况下为 Electron.
- `_companyName` String - `crashReporter`  `options` 对象中的公司名称
- `upload_file_minidump` File - `minidump` 格式的崩溃报告
- All level one properties of the `extra` object in the `crashReporter`  `options` object.

### 服务端也是在 `updater-server` 中 完成 崩溃监控 代码逻辑

1.在koa项目中安装 `koa-multer` 库

```bash
npm i @koa/multer multer --save
# 或
yarn add @koa/multer multer
```

2.在index.js中

```js
const multer = require('@koa/multer');

// 创建崩溃日志目录
const uploadCrash = multer({dest: 'crash/'});
// 上传客户端软件崩溃日志
router.post('/crash', uploadCrash.single('upload_file_minidump'), (ctx, next) => {
  console.log('软件崩溃日志：', ctx.req.body);
  // 存DB（数据库）

});
```

## 崩溃监控--客户端

electron 的`crashReporter`模块文档：[crashReporter | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/api/crash-reporter)

初始化崩溃监控：crashReporter.start(options)

- companyName
- submitURL
- extra (字符串，自定义数据，一般会传上用户信息、业务信息

更新extra属性：crashReporter.addExtraParameter(key, value)

主进程和渲染进程都需要初始化

### electron客户端中 完成 崩溃监控 代码逻辑

1.electron主进程目录中新建`crash-reporter.js` 错误收集功能模块

```js
const { crashReporter } = require('electron');
// electron程序崩溃日志上传
function crashReporterInit() {
  crashReporter.start({
    productName: 'remote_control',
    companyName: 'muya',
    submitURL: 'http://127.0.0.1:33855/crash',
  });
}

module.exports = { crashReporterInit };
```

2.在main.js中导入使用，和测试electron程序崩溃

```js
const { crashReporterInit } = require('./crash-reporter');
// 在这个生命周期上传
app.on('will-finish-launching', () => {
    // electron程序崩溃日志上传
    crashReporterInit();
});
// 监听应用激活：在这个生命周期中测试崩溃
app.on('activate', () => {
    // 测试electron程序崩溃
    process.crash();
});
```

3.启动应用，点击激活应用触发崩溃

## 崩溃日志分析

### 崩溃日志解析

下载并解压electron symbol：<https://github.com/electron/electron/release>

- Macelectron-vxXX-darwin-x64-symbols.zip
- Winelectron-vxXX-win32-ia32-symbols.zip

服务端解析dmp文件

- node-minidump：[electron/node-minidump: Node module to process minidump files (github.com)](https://github.com/electron/node-minidump)

- node-minidump解析代码

  - ```js
    const minidump = require(minidump);
    const fs = require('fs');
    minidump.addSymbolPath('./symbols/electron-v23.2.0-darwin-x64-symbols/breakpad_symbols/');
    
    minidump.walkStack('./e1989fb5bc4e7177f39f9e493d6221b9', (err, res)=> {
        fs.writeFileSync('./res.txt', res);
    })
    ```

- <https://backtrace.io/blog/backtrace/electron-crash-repserver/>

### 崩溃监控-小技巧

渲染进程崩溃后提示用户重新加载

通过preload统一初始化崩溃监控

主进程、渲染进程通过process.crash()可以模拟崩溃

## 崩溃治理的难点

定位出错栈困难

- Native错误栈、无操作上下文

调试门槛高

- 如果我们要调试electron主进程(electron内核)，需要用到C++的知识，用到像GDB这样的一些调试工具
- C++、lldb/GDB

运行环境复杂

- 机器型号、系统、其他软件

## 崩溃治理的经验总结

- 用户操作日志和系统信息非常重要
- 及时升级Electron
- 复现和定位问题比治理重要
- 社区响应快
- devtool在治理内存问题非常有效

## 美团Electron崩溃监控实践

![Electron崩溃监控实践](.\img\Electron崩溃监控实践.jpg)

electron主进程中的异常监控

```js
process.on('uncaughtException', function (error){
    //上报异常
       
    // 异常日志
    
})
```

### 延伸资料

- <http://seenaburns.com/debugging-electron-memory-usagel>
- <https://cloud.tencent.com/developer/article/1084368>
- <https://juejin.im/post/5c5ee47be51d457f95354c82>
- <https://developers.google.com/web/tools/chrome-devtools/memoryproblems?hl=zh-cn>
