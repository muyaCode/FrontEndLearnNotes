# NodeJS 爬虫系统开发

Nodejs 因为基于 JavaScript 的语法，对解析 html 标签有着天然的优势

## 爬虫系统以及 Robots 协议介绍

**爬虫**，是一种自动获取网页内容的程序。是搜索引擎的重要组成部分，因此搜索引擎优化很大程度上就是针对爬虫而做出的优化。

**robots.txt**是一个文本文件，robots.txt 是一个协议，不是一个命令。
robots.txt 是爬虫要查看的第一个文件。
robots.txt 文件告诉爬虫在服务器上什么文件是可以被查看的，搜索机器人就会按照该文件中的内容来确定访问的范围。

## 使用环境和技术栈

Express

Axios

Cheerio

## 实现命令行工具

什么是命令行工具：

- 客户端软件
- 用户交互
- 面向开发者
- ...

开发命令行工具步骤：

- process.argv 与解析 process.argv
- npm install commander
- npm install optimist
- npm install prompt
- 输出帮助信息
- 输出彩色文本

运行脚本到命令执行总共需要几步：

- 脚本与运行脚本
- 设置默认的运行时
- 使用 chmod 分配执行权限
- 设置环境变量
- 开始使用命令行

## 爬虫流程

### 1-目标：确定你想要获取的数据

- 1. 确定想要的数据在什么页面上（一般详细的数据会在详情页）

- 2. 确定在哪些页面可以链接到这些页面（一般分类列表页面会有详情页的链接数据）

- 3. 寻找页面之间和数据之间的规律

### 2-分析页面

- 1. 获取数据的方式（正则，cherrio）

- 2. 分析数据是通过 ajax 请求的数据，还是 html 里自带的数据

- 3. 如果是通过 AJAX 请求的数据，那么需要获取 ajax 请求的链接，一般请求到的数据都为 JSON 格式数据，那么就会比较容易解析。

- 4. 如何数据在 HTML 里面，那么就用 cherrio 通过选择器将内容选中

### 3-编写单个数据获取的案例

- 1. 解析出分类页的链接地址

- 2. 解析出列表页的链接地址

- 3. 解析出详情页的链接地址

- 4. 解析详情页里面想要获取的数据

- 5. 将数据进行保存到本地或者是数据库

### 4-如果遇到阻碍进行反爬虫对抗

- 1. User-Agent 是否是正常浏览器的信息

- 2. 将请求头设置成跟浏览器一样的内容

- 3. 因为爬虫的爬取速度过快，会导致封 IP 号。

  - 1.那么可以降低速度进行解决

  - 2.可以使用代理进行解决

- 4. 如果设置需要凭证，那么可以采用无界浏览器真实模拟。

### 项目解析

- processer 负责管理爬虫的基本逻辑

- fetcher 负责解决代理 IP，超时等问题

- strategy 负责处理每次爬取失败后的策略

## 请求库

### 内置

- HTTP

- HTTPS

### request

- 作者停止更新

- https://github.com/request/request

### axios

- axios 优势会更明显，前后端通杀，前后端调用的方式一致。

- https://github.com/axios/axios

### superagent

- https://github.com/visionmedia/superagent

- https://visionmedia.github.io/superagent/

例子

```js
request
	.post("/api/pet")
	.send({ name: "Manny", species: "cat" })
	.set("X-API-Key", "foobar")
	.set("Accept", "application/json")
	.then((res) => {
		alert("yay got " + JSON.stringify(res.body));
	});
```

### crawler

- https://github.com/bda-research/node-crawler/blob/master/CHANGELOG.md

- https://www.jianshu.com/p/50450791ce51

- http://node-crawler.org/

## 爬虫解析框架

- cheerio

- jsdom

## 模拟用户操纵浏览器

### Playright

### puppeteer

官网：https://zhaoqize.github.io/puppeteer-api-zh_CN/#/

#### 常用 API

- 打开新标签页

  - let page = await browser.newPage()

- 获取所有浏览器中的页面

  - let pages = await browser.pages()

- 关闭浏览器

  - browser.close()

- 将页面跳转至

  - await page.goto(url)

- 获取页面的对象,并进行操作

  - let btn = await page.$(selector) let input = await page.$(selector) //点击按钮 btn.click() //聚焦到输入框 input.forcus()

- 在页面上写入内容或者键盘按键

  - await page.keyboard.type('Hello World!'); await page.keyboard.press('ArrowLeft'); await page.keyboard.down('Shift');

- 设置鼠标的移动

  - await page.mouse.move(0, 0); await page.mouse.down(); await page.mouse.move(0, 100); await page.mouse.move(100, 100); await page.mouse.move(100, 0); await page.mouse.move(0, 0); await page.mouse.up();

- 截获页面请求

  - await page.setRequestInterception(true); page.on('request', request => { request.url()//可以获取请求的网址，request，包含了所有的请求信息 if(你想要的条件){ request.continue() }else{ request.abort([errorCode]) } });

- 获取浏览器的信息和内容
  - page.$eval(selector,(item)=>{return item}) page.$$eval(selectors,(items)=>{return items})

### Selenium

官网

- https://www.selenium.dev/zh-cn/

- 中文网
  - http://www.selenium.org.cn/

安装

```bash
npm install selenium-webdriver --save
```

下载地址：https://www.npmjs.com/package/selenium-webdriver

使用详解

- https://www.fenxianglu.cn/article/343

- https://www.jianshu.com/p/0893e1d773ef

## 数据持久化

- 操作 mysql 和 sqllite 建议使用 sequelize

  - sequelize

- 操作 mongodb
  - mongoose
    - https://github.com/Automattic/mongoose

## 输出装饰模块

- chalk

  - chalk 中文意思是粉笔的意思，这个模块是 node 很有特色和实用的一个模块，它可以为你输出的内容添加颜色， 下划线， 背景色等装饰。

  - 可以适当使用 chalk 来突出某些内容，例如请求的 url 加上下划线。

  - https://github.com/chalk/chalk

  - 例子
    - const logRequest = (response, isDetailed = false) => { const URL = chalk.underline.yellow(response.request.url); const basicInfo = `${response.request.method} Status: ${response.status} Content-Type: ${response.type} URL=${URL}`; if (!isDetailed) { logger.info(basicInfo); } else { const detailInfo = `${basicInfo}\ntext: ${response.text}`; logger.info(detailInfo); } };
