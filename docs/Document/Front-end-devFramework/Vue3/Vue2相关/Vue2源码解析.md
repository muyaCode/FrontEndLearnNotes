# Vue2源码解析

#### vue2的源码调试解析：

在vue.config.js里面设置

```js
// 基于vue-cli创建的vue3项目
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  tra/nspileDependencies: true,
  configureWebpack(config) {
    console.log(config)
    config.devtool = 'cheap-module-source-map' // 这种写法方式
  }
})
// 基于vue-cli创建的vue2项目
module.exports = {
  configureWebpack: config => {
    config.when(
        process.env.NODE_ENV === 'development',
        config => config.devtool('source-map'),
        // source-map模式：是源码未编译的模式，方便debugger调试源码来查看运行情况
        // eval模式：是编译后的模式
    ),
  }
}

// 增加调试的配置后，可以在要调试的代码里 增加断点 或者 debugger
// 然后VSCode运行调试，再去浏览器Sources选项卡进行源码调试
// launch.json设置调试的目录src/*
```
