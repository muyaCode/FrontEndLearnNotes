# HTML 标签不常用补充

主要讲解那些“看不见”的 HTML 标签及其使用场景。

提到 HTML 标签，前端工程师会非常熟悉，因为在开发页面时经常使用。但往往关注更多的是页面渲染效果及交互逻辑，也就是对用户可见可操作的部分，比如表单、菜单栏、列表、图文。

其实还有一些非常重要却容易被忽视的标签，这些标签大多数用在**页面头部 head 标签**内，虽然对用户不可见，但如果在某些场景下，比如交互实现、性能优化、搜索优化，合理利用它们就可以达到事半功倍的效果。

## meta 标签:自动刷新/跳转

### 1.实现 PPT 自动播放的功能

只需要在每个页面的 meta 标签内设置好下一个页面的地址即可

```html
<meta http-equiv="Refresh" content="5; URL=page2.html" />
```

上面的代码会在 5s 之后自动跳转到同域下的 page2.html 页面。我们要实现 PPT 自动播放的功能，只需要在每个页面的 meta 标签内设置好下一个页面的地址即可。

### 2.每隔一分钟就需要刷新页面的大屏幕监控

也可以通过 meta 标签来实现，只需去掉后面的 URL 即可

```html
<meta http-equiv="Refresh" content="60" />
```

### 这两种方法为什么少见呢？

不少前端工程师对 meta 标签用法缺乏深入了解

在使用它的时候，刷新和跳转操作是不可取消的

对刷新时间间隔或者需要手动取消的，推荐使用 JavaScript 定时器来实现

如果只是想实现页面的定时刷新或跳转

(比如某些页面缺乏访问权限，在 x 秒后跳首页这样的场景)

建议实践下 meta 标签的用法

## title 标签与 Hack 手段:消息提醒

B/S 架构的优点:版本更新方便、跨平台、跨终端

但在处理某些场景，比如即时通信场景时，会变得比较麻烦

因为前后端通信深度依赖 HTTP 协议，而 HTTP 协议采用“请求-响应”模式

一种低效的解决方案是客户端通过轮询机制获取最新消息(HTML5 下可使用 WebSocket 协议)

### 消息提醒功能实现比较困难

HTML5 标准发布之前，浏览器没有开放图标闪烁、弹出系统消息之类的接口

只能借助一些 Hack 的手段，比如修改 title 标签来达到类似的效果

(HTML5 下可使用 Web Notifications API 弹出系统消息)

例子：浏览器标签上有文字提示闪烁

```js
let msgNum = 1; // 消息条数
let cnt = 0; // 计数器
const inerval = setInterval(() => {
	cnt = (cnt + 1) % 2;
	if (msgNum === 0) {
		// 通过DOM修改title
		document.title += `聊天页面`;
		clearInterval(interval);
		return;
	}
	const prefix = cnt % 2 ? `新消息(${msgNum})` : "";
	document.title = `${prefix}聊天页面`;
}, 1000);
```

定时修改 title 标签内容，可以制作其他动画效果，比如文字滚动。

但需要注意浏览器会对 title 标签文本进行去空格操作

动态修改 title 标签可以将一些关键信息显示到标签上

(比如下载时的进度、当前操作步骤)

## 性能优化

性能问题的两方面原因：渲染速度慢、请求时间长

**合理地使用标签**，可以在一定程度上提升渲染速度以及减少请求时间

### script 标签:调整加载顺序提升渲染速度

渲染引擎在解析 HTML 时，若遇到 script 标签引用文件

则会暂停解析过程，同时通知网络线程加载文件

文件加载后会切换至 JavaScript 引警来执行对应代码

代码执行完成之后切换至渲染引擎继续渲染页面

### script 标签的 3 个属性

- **async 属性**一一立即请求文件，但不阻塞渲染引擎，文件加载完毕后阻塞渲染引擎并立即执行文件内容
- **defer 属性**一一立即请求文件，但不阻塞染引擎，等到解析完 HTML 之后再执行文件内容

- **HTML5 标准 type 属性**——对应值为“module“。让浏览器按照 ECMAScript6 标准将文件当作模块进行解析，默认阻塞效果同 defer 也可以配合 async 在请求完成后立即执行

```html
<script></script>
<script defer></script>
<script async></script>
<script type="module"></script>
<script type="module” async></script>
```

图例

![script 标签的属性流程图](.\img\script 标签的属性流程图.jpg)

- 绿色的线表示执行解析 HTML，蓝色的线表示请求文件，红色的线表示执行文件

- **当渲染引擎解析 HTML 遇到 script 标签引入文件时，会立即进行一次渲染**

- 构建工具会把编译好的引用 JavaScript 代码的 script 标签放入到 body 标签底部

- 当渲染引擎执行到 body 底部时会先将已解析的内容染出来，然后再去请求相应的 JavaScript 文件

- 如果是内联脚本(即不通过 src 属性引用外部脚本文件直接在 HTML 编写 JavaScript 代码的形式)渲染引擎则不会染

采用 3 种属性都能减少请求文件引起的阻塞时间，只有 defer 属性以及 type="module" 情况下能保证渲染引擎的优先执行，从而减少执行文件内容消耗的时间，让用户更快地看见页面（即使这些页面内容可能并没有完全地显示）。

除此之外还应当注意，当渲染引擎解析 HTML 遇到 script 标签引入文件时，会立即进行一次渲染。

所以这也就是为什么构建工具会把编译好的引用 JavaScript 代码的 script 标签放入到 body 标签底部，因为当渲染引擎执行到 body 底部时会先将已解析的内容渲染出来，然后再去请求相应的 JavaScript 文件。

如果是内联脚本（即不通过 src 属性引用外部脚本文件直接在 HTML 编写 JavaScript 代码的形式），渲染引擎则不会渲染。

### link 标签: 通过预处理提升染速度

在我们对大型单页应用进行性能优化时，也许会用到按需懒加载的方式，来加载对应的模块，但如果能合理利用 link 标签的 rel 属性值来进行预加载，就能进一步提升渲染速度。

**dns-prefetch**

当 link 标签的 rel 属性值为“dns-prefetch”时，浏览器会对某个域名预先进行 DNS 解析并缓存

下面是淘宝网的解析

```html
<link rel="dns-prefetch" href="//g.alicdn.com" />
<link rel="dns-prefetch" href="//img.alicdn.com" />
<link rel="dns-prefetch" href="//tce.alicdn.com" />
<link rel="dns-prefetch" href="//gm.mmstat.com" />
<link ref="dns-prefetch" href="//tce.taobao.com" />
<link rel="dns-prefetch" href="//log.mmstat.com" />
<link rel="dns-prefetch" href="//tui.taobao.com" />
<link rel="dns-prefetch" href="//ald.taobao.com" />
<link rel="dns-prefetch" href="//gw.alicdn.com" />
<link rel="dns-prefetch" href="//atanx.alicdn.com" />
<link rel="dns-prefetch" href="//dfhs.tanx.com" />
<link rel="dns-prefetch" href="//ecpm.tanx.com" />
<link rel="dns-prefetch" href="//res.mmstat.com" />
```

**preconnect**

让浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作

包括 DNS 解析、TLS 协商、TCP 握手，通过消除往返延迟来为用户节省时间

**prefetch/preload**

两个值都是让浏览器预先下载并缓存某个资源，但不同的是 prefetch 可能会在浏览器忙时被忽略，而 preload 则是一定会被预先下载

**prerender**

浏览器不仅会加载资源，还会解析执行页面，进行预渲染

#### 具体过程图解

![link 标签-通过预处理提升染速度](.\img\link 标签-通过预处理提升染速度.jpg)

## 搜索优化（SEO）

### meta 标签

#### meta 标签:提取关键信息

百度搜索网站，会有网站的名字和描述信息

这些描述信息是通过 meta 标签专门为搜索引擎设置的
目的是方便用户预览搜索到的结果

代码如下：

```html
<meta
	content="拉勾,拉勾网,拉勾招聘,拉钩, 拉钩网 ,互联网招聘,拉勾互联网招聘, 移动互联网招聘, 垂直互联网招聘, 微信招聘, 微博招聘, 拉勾官网, 拉勾百科,跳槽, 高薪职位, 互联网圈子, IT招聘, 职场招聘, 猎头招聘,O2O招聘, LBS招聘, 社交招聘, 校园招聘, 校招,社会招聘,社招"
	name="keywords"
/>
```

**在实际工作中**

在实际工作中，推荐使用一些关键字工具来挑选，比如 [Google Trends](https://trends.google.com/trends)、[站长工具](https://data.chinaz.com/keyword/)。

### link 标签

#### link 标签:减少重复

对于同一个页面会有多个网址，又或者存在某些重定向页面，比如:

- https://xx.com/a.html
- https://xx.com/detail?id="abcd"

那么在这些页面中可以这样设置：

```html
<link href="https://lagou.com/a.html" rel="canonical" />
```

合并网址的方式:比如使用站点地图，或者在 HTTP 请求响应头部添加 rel="canonical"

这样可以让搜索引擎避免花费时间抓取重复网页。不过需要注意的是，它还有个限制条件，那就是指向的网站不允许跨域。

当然，要合并网址还有其他的方式，比如使用站点地图，或者在 HTTP 请求响应头部添加 rel="canonical"。这里，就不展开介绍了，道理都是相通的，多探索和实践。

### 延申内容：OGP (Open Graph Protocal，开放图表协议)

OGP 是 Facebook 公司在 2010 年提出的

目的是**通过增加文档信息来提升社交网页在被分享时的预览效果**

只需要在一些分享页面中添加一些 meta 标签及属性

支持 OGP 协议的社交网站就会在解析页面时生成丰富的预览信息比如站点名称、网页作者、预览图片

下面是微信文章支持 OGP 协议的代码，可以看到通过 meta 标签属性值声明了：网址、预览图片、描述信息、站点名称、网页类型和作者信息。

```html
<meta property="og:title" content="标题" />
<meta property="og:url" content="url链接" />
<meta property="og:image" content="图片链接" />
<meta property="og:description" content="简单说明" />
<meta property="og:site_name" content="平台名字" />
<meta property="og:type" content="类型：arcticle|文章" />
<meta property="og:arcticle:author" content="作者" />
<meta property="twitter:card" content="卡片" />
<meta property="twitter:image" content="图片链接" />
<meta property="twitter:title" content="标题" />
<meta property="twitter:creator" content="创建者" />
<meta property="twitter:site" content="站点平台名字" />
<meta property="twitter:description" content="说明" />
<meta property="twitter:" content="" />
```

现在百度已经宣布支持，微信文章的不少页面上也添加了相关标签属性，有兴趣的话你可以查看官方网站：<https://ogp.me/>
