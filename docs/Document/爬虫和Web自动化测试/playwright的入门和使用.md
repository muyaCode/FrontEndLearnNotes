# playwright 的入门和使用

python 自动化：[「自动化测试」新一代 Web 前端自动化测试框架 —— playwright 快速上手，轻松带入项目\_playwright 测试框架\_wincheshe 的博客-CSDN 博客](https://blog.csdn.net/m0_52409770/article/details/124673714)

基于 NodeJS 使用 Playwright 的教程：

- [Playwright-Node.js 自动化办公\_Marlene_Jiang 的博客-CSDN 博客\_nodejs playwright](https://blog.csdn.net/Marlene_Jiang/article/details/121199434)
- [web 浏览器自动化之 playwright - jeremy 的技术点滴 (jeremyxu2010.github.io)](https://jeremyxu2010.github.io/2020/11/web浏览器自动化之playwright/)
- [Nodejs Playwright 自动识别验证码登陆 B 站\_地域男孩的博客-CSDN 博客\_nodejs 验证码识别](https://blog.csdn.net/u013014254/article/details/124096804)
- [使用 playwright 在 Nodejs 环境下自动控制浏览器！ - 灰信网（软件开发博客聚合） (freesion.com)](https://www.freesion.com/article/16461562313/)

---

官网：https://playwright.dev/docs

命令行：[Command line tools | Playwright](https://playwright.dev/docs/cli#preserve-authenticated-state)

程序调试(代码调试)：[Debugging Selectors | Playwright](https://playwright.dev/docs/debug-selectors)

UI 可视化工具调试：[Debugging Tests | Playwright](https://playwright.dev/docs/debug)

测试代码生成器：[Test Generator | Playwright](https://playwright.dev/docs/codegen)

跟踪查看器：[Trace Viewer | Playwright](https://playwright.dev/docs/trace-viewer)

### 调试方式

#### 代码断点调试

```js
await page.pause();
```

运行之后会在那一步弹出 UI 工具：Playwright Inspector 窗口

在这个窗口里面可以录制操作，或者定位单个元素

### 页面的调试

文档：

F12 或右键-检查：打开页面的调试工具---【Console】选项：

`$('name="username"');` 或 `$x('.//*[name="username"]');` 或`$$('.//*[name="username"]');` 选择定位元素

调试选择器文档：[Debugging Selectors | Playwright](https://playwright.dev/docs/debug-selectors)

`playwright.$('.auth-form >> text=Log in');`

---

## 开发技巧

判断页面是否有该元素：使用$，使用 locator 会等待定位元素，如果定位不到，便超时响应
