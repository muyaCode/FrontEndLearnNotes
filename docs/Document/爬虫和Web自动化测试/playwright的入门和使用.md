# playwright 的入门和使用

python 自动化：[「自动化测试」新一代 Web 前端自动化测试框架 —— playwright 快速上手，轻松带入项目\_playwright 测试框架\_wincheshe 的博客-CSDN 博客](https://blog.csdn.net/m0_52409770/article/details/124673714)

## playwright简介

**Playwright** 是由微软公司于 2020 年初发布的新一代自动化测试工具。相较于目前最常用的 **Selenium**，它仅用一个 API 即可自动执行 **Chromium**、**Firefox**、**WebKit** 等主流浏览器的自动化操作。作为针对 **Python** 语言纯自动化的工具，在回归测试中能更快地实现自动化。

### Playwright 的优势包括：

1. **不需要安装各种 Driver**：与 **Selenium** 需要通过 WebDriver 操作浏览器不同，**Playwright** 通过开发者工具与浏览器交互，安装简洁，不需要安装各种 Driver。
2. **跨语言支持**：**Playwright** 几乎支持所有语言，且不依赖于各种 Driver，通过调用内置浏览器启动速度更快。
3. **基于 Websocket 的通讯**：Playwright 基于 Websocket 可自动获取浏览器实际情况。
4. **自动等待**：**Playwright** 支持自动等待元素出现和等待事件发生。
5. **网络拦截（Mock 接口）**：可以拦截网络请求，方便测试。

### **局限性**：

1. 不支持旧版 Microsoft Edge 或 IE11。
2. 需要 SSL 证书的网站可能无法录制。
3. 移动端测试是通过桌面浏览器模拟，无法控制真机

如果你想要快速上手 **Playwright**，可以尝试录制自己的自动化脚本，或者直接使用 **Playwright** 的 API 进行定制化编写。

### 相比于 Selenium，它有一些独特的优势：

1. **多浏览器和多语言支持**：Playwright适用于多种浏览器和多种编程语言，包括 Python、Java、Node.js 和 .NET。这对于准备切换到 Playwright 的用户非常友好。
2. **元素定位方式**：Playwright支持基于 CSS、XPath 和文本等常用的元素定位方式，可以大幅减少编写代码的时间，并保证代码的稳定性。
3. **操作浏览器内核**：Playwright使用 API 方式操作浏览器内核，速度快且稳定。它还可以与浏览器双向沟通，元素操作可以在元素准备就绪的情况下进行。
4. **支持 UI 和非 UI 运行**：Playwright支持在 UI 和非 UI 模式下运行，节省了调试和运行时间。

总之，Playwright为现代 Web 应用提供了可靠的端到端测试能力，是一个值得关注的自动化工具。如果你之前使用过 Selenium，你甚至可以同时使用 Selenium 和 Playwright，以充分利用它们的优势。

## 基于 NodeJS 使用 Playwright 的教程：

- [Playwright-Node.js 自动化办公\_Marlene_Jiang 的博客-CSDN 博客\_nodejs playwright](https://blog.csdn.net/Marlene_Jiang/article/details/121199434)
- [web 浏览器自动化之 playwright - jeremy 的技术点滴 (jeremyxu2010.github.io)](https://jeremyxu2010.github.io/2020/11/web浏览器自动化之playwright/)
- [Nodejs Playwright 自动识别验证码登陆 B 站\_地域男孩的博客-CSDN 博客\_nodejs 验证码识别](https://blog.csdn.net/u013014254/article/details/124096804)
- [使用 playwright 在 Nodejs 环境下自动控制浏览器！ - 灰信网（软件开发博客聚合） (freesion.com)](https://www.freesion.com/article/16461562313/)

---

## 相关网址

官网：https://playwright.dev/

文档：https://playwright.dev/docs/intro

命令行：[Command line tools | Playwright](https://playwright.dev/docs/cli#preserve-authenticated-state)

程序调试(代码调试)：[Debugging Selectors | Playwright](https://playwright.dev/docs/debug-selectors)

UI 可视化工具调试：[Debugging Tests | Playwright](https://playwright.dev/docs/debug)

测试代码生成器：[Test Generator | Playwright](https://playwright.dev/docs/codegen)

跟踪查看器：[Trace Viewer | Playwright](https://playwright.dev/docs/trace-viewer)

## 使用步骤

### 1.安装：

安装 Playwright 依赖库：

```bash
# npm
npm install playwright
# python
pip install playwright
```

安装 Chromium、Firefox、WebKit 等浏览器的驱动文件：

```bash
# npm

# python
python -m playwright install
```

### 2.自动录制：

从起始页开始录制：

```bash
# npm

# python
python -m playwright codegen [URL] --target python -o 'my.py' -b chromium
```

### 3.定制化编写：

- 元素定位：使用选择器规则如 CSS、XPath、Text。
- 元素操作：下拉选择框、文件上传、鼠标点击、截屏等。

### 4.网络拦截（Mock 接口）：

可以拦截网络请求并自定义处理。

### 5.同步执行：

依次打开多个浏览器，访问网页并截图。

### 6.异步执行：

同时进行多个浏览器操作。

## 调试方式

#### 代码断点调试

```js
await page.pause();
```

运行之后会在那一步弹出 UI 工具：Playwright Inspector 窗口

在这个窗口里面可以录制操作，或者定位单个元素

## 页面的调试

文档：

F12 或右键-检查：打开页面的调试工具---【Console】选项：

`$('name="username"');` 或 `$x('.//*[name="username"]');` 或`$$('.//*[name="username"]');` 选择定位元素

调试选择器文档：[Debugging Selectors | Playwright](https://playwright.dev/docs/debug-selectors)

`playwright.$('.auth-form >> text=Log in');`

---

## 开发技巧

判断页面是否有该元素：使用$，使用 locator 会等待定位元素，如果定位不到，便超时响应
