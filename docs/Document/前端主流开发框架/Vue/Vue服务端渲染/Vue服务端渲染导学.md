# Vue服务端渲染导学

## 基本概念

- **SSR** （server side render）服务端渲染，是指由服务侧（server side）完成页面的 DOM 结构拼接，然后发送到浏览器，为其绑定状态与事件，成为完全可交互页面的过程。
- **CSR**（client side render）客户端渲染，是指由客户端（client side）JS 完成页面和数据的拼接，生成 DOM 结构再交由浏览器渲染成页面的过程。
- **SPA**（single page application）单页面应用，指只有一张 WEB 页面的应用，也就是说在导航切换的过程中页面不会刷新，只是局部更新内容。SPA 实现的原理就采用了 CSR，页面中所有内容由 JS 控制，需要浏览器进行 JS 解析才能显示出来。
- **SEO**（search engine optimization）搜索引擎优化，利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。
- **SSG**（static side generate），无需服务器实时动态编译，在构建时针对特定路由简单的生成静态 HTML 文件，我们也可称之为预渲染。
- **AJAX**（Asynchronous Javascript And XML）异步 JS&XML，前台发送 AJAX 请求后并不会阻塞其他操作，数据接手后再异步更新页面，也就是说可以在不重新加载整个网页的情况下，对网页的局部数据进行更新。

## 发展背景

- 早些年的互联网时代，应用逻辑相对比较简单，与用户的交互并不是很多，所以大部分的网站都是由前端工程师开发好 HTML 页面，后台拿到页面后转成后台模板语法，将动态的数据添加进去，如 JSP、Velocity 等。后台开发完成后启动服务，当我们访问页面时，后台定位到请求的路径，按照页面需求从数据库抓取数据，随之进行 HTML 文件的拼接，最后返回给浏览器。这也就是**初级的服务端渲染**。

- 随着应用复杂性提高，用户对于界面的要求越来越高，前端交互也越发显得重要。同时，AJAX 的兴起把传统的开发模式带入到一个新时代：**前后端分离式开发**，即前端有自己的服务，不依赖于后台，前后端通过 AJAX 进行数据交互。前端发送请求，通过后台提供的 api 获取数据，然后通过前端 js 进行 HTML 页面的生成，展示给浏览器。这也就是所谓的**客户端渲染**。  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602101008650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NyYXp5X2ppYWxpbg==,size_16,color_FFFFFF,t_70)

- SPA 单页面应用就是这个时代的产物，一些框架也由此盛行，如 Vue、React、Angular 等，配合着 webpack、gulp 等打包工具，实现了前端开发环境热更新部署，生产环境的压缩优化打包，让前端开发效率及质量大大提高。

- SPA 单页面应用虽好，但同时也伴随着一些弊端的产生：

  1. 对 SEO（搜索引擎优化）不友好，因为他们的源码长这样:  
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210318164948427.png)  
     SEO 是通过抓取我们网页源码中的关键字来建立索引库的，所以这种源码中没有内容，而是通过 js 添加进去的网站就会被搜索引擎直接 pass 掉了。
  2. 首屏加载速度慢，因为页面内容是由 js 拼接出来的，所以浏览器会等待 js 处理完成后才能渲染真正的 DOM 结构，多了一些等待时间。

- 为了解决 SEO 和首屏加载慢的问题，前端攻城狮们在浏览器与后台服务间搭建一个服务器（一般是用 node.js 搭建的），专门用于**服务端渲染**。其流程是这样的：  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210602100913985.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NyYXp5X2ppYWxpbg==,size_16,color_FFFFFF,t_70)

## 对比

### 服务器端渲染的优缺点是？

#### 优点

- 前端耗时少。因为后端拼接完了 html，浏览器只需要直接渲染出来。
- 有利于 SEO。因为在后端有完整的 html 页面，所以爬虫更容易爬取获得信息，更有利于 seo。
- 无需占用客户端资源。即解析模板的工作完全交由后端来做，客户端只要解析标准的 html 页面即可，这样对于客户端的资源占用更少，尤其是移动端，也可以更省电。
- 后端生成静态化文件。即生成缓存片段，这样就可以减少数据库查询浪费的时间了，且对于数据变化不大的页面非常高效 。

#### 缺点

- 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，则对于前端复杂度高的项目，不利于项目高效开发。另外，如果是服务器端渲染，则前端一般就是写一个静态 html 文件，然后后端再修改为模板，这样是非常低效的，并且还常常需要前后端共同完成修改的动作； 或者是前端直接完成 html 模板，然后交由后端。另外，如果后端改了模板，前端还需要根据改动的模板再调节 css，这样使得前后端联调的时间增加。
- 占用服务器端资源。即服务器端完成 html 模板的解析，如果请求较多，会对服务器造成一定的访问压力。而如果使用前端渲染，就是把这些解析的压力分摊了前端，而这里确实完全交给了一个服务器。

### 客户端渲染的优缺点是？

#### 优点

- 前后端分离。前端专注于前端 UI，后端专注于 api 开发，且前端有更多的选择性，而不需要遵循后端特定的模板。
- 体验更好。比如，我们将网站做成 SPA 或者部分内容做成 SPA，这样，尤其是移动端，可以使体验更接近于原生 app。

#### 缺点

- 前端响应较慢。如果是客户端渲染，前端还要进行拼接字符串的过程，需要耗费额外的时间，不如服务器端渲染速度快。
- 不利于 SEO。虽然 Chrome 和部分浏览器开始对页面进行 JS 的执行后再抓取，但目前大部分浏览器对于 SPA 都是不认的，只是记录了一个页面，所以 SEO 很差。因为服务器端可能没有保存完整的 html，而是前端通过 js 进行 dom 的拼接，那么爬虫无法爬取信息。

## 使用服务端渲染

服务端渲染有很多方式都能够实现：

### JSP（JavaServer Pages）

传统的前后端统一式开发，将前端代码放到后台项目中，使用 JSP 进行数据拼接，这也是服务端渲染的一种实现方式。因其开发效率及体验都不是很好，所以我们现在的项目很少使用。

### express + ejs

我们可以使用`express` + `ejs`搭建一个`node`服务器，将前端 HTML 代码编写成`ejs`的专用语法，涉及到需要数据请求的地方，我们向后台发送请求，获取到数据后将内容返回给`ejs`进行 HTML 拼接，最终再返回给客户端。

> `express`+`ejs`只是一个例子，我们可以使用与其功能类似的其他框架，比如`koa`等。

### express + react

`react`框架的项目，想使用`ssr`，可以使用`react-dom/server`的`renderToString()`方法将 React 组件转化为 HTML 代码，从而实现服务端渲染。

```js
import fs from "fs";
import path from "path";
import express from "express";

import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const app = express();

app.get("/*", (req, res) => {
	const renderedString = renderToString(
		<StaticRouter>
			<App></App>
		</StaticRouter>
	);

	fs.readFile(path.resolve("index.html"), "utf8", (error, data) => {
		if (error) {
			res.send(`<p>Server Error</p>`);
			return false;
		}

		res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${renderedString}</div>`
			)
		);
	});
});

app.listen(3000);
```

### vue + nuxt

`vue`框架的项目，使用`nuxt`就很方便了，我们只需要按照`nuxt`的脚手架创建好项目结构，然后就可以按照`vue`的开发方式进行开发了。  
`nuxt`支持**SSR 服务端渲染模式**和**SSG 静态生成模式**，如果说我们的页面需要提前动态获取数据并进行拼接，我们就需要使用服务端渲染模式；如果说我们的页面静态的东西比较多，动态数据不需要考虑 SEO，那么我们可以选择静态生成模式，相当于使用预渲染，不需要 node 服务器也能够提升 SEO。  
需要注意的是，`nuxt`为我们提供了比原生`vue`更多的生命周期：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601100540788.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NyYXp5X2ppYWxpbg==,size_16,color_FFFFFF,t_70)

- **nuxtServerInit**：服务端初始化，用于在页面渲染之前将数据存储到 vuex 中，比如用户信息，注意第一个参数是 vuex 的上下文对象，第二个参数是 nuxt 上下文对象

- **Route Middleware**：路由中间件，在初始化页面组件前调用，用于设置或检查路由条件或者重定向。此中间件分为三类，按照顺序调用，一是渲染 Global（在 nuxt.config.js 中定义），二是 Layout 整体布局（在 layout 中定义），三是 Page 页面组件（在 Page component 中定义）

- **validate**，校验钩子，在渲染页面组件前调用，用于校验动态路由参数的有效性，需要返回`true`或`false`

- **asyncData**：异步获取数据，在渲染组件之前获取数据用，好比你在`vue`组件中用 created 获取数据一样，不同的是 asyncData 是在服务端执行的，所以在此钩子中不能获取`vue`组件的 this 对象。还有要注意的是：asyncData 只是在首屏的时候调用一次（即页面渲染之前，所以事件触发不了它）

- **beforeCreate 和 created**：`vue`实例的创建和创建前的钩子函数，与`vue`不同的是 nuxt 会在服务端和客户端都调用。

- **fetch**：与`asyncData`类似，不同的是它不会设置组件的数据，因为此钩子是在 vue 实例创建后调用的，所以在这里可以获取到 vue 的 this 对象。

- **mounted&其他钩子**：与 vue 剩余的生命周期一致，在客户端执行。

  ```vue
  <template>
    <div class="news-wrap">
      <div class="title-wrap">
        {{ title }}
      </div>
      <div
        v-for="(item, index) in newsList"
        :key="index"
        class="news-item"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="author">
          {{ item.author }}
        </div>
        <div class="date">
          {{ item.date }}
        </div>
        <div class="description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getNewsList } from '../api'
  
  export default {
    data () {
      return {
        newsList: [],
        title: '新闻列表1'
      }
    },
    async fetch () {
      await getNewsList().then((res) => {
        console.log(res)
        if (res.code === 1) {
          // console.log(res, app)
          this.title = 'ssr新闻列表'
          this.newsList = res.data
        }
      })
    }
  }
  </script>
  ```

## 怎样选择？

之前看到网上一句话 ，觉得用在这里在合适不过：“抛开业务场景谈技术选型的都是耍流氓”。

### 适用于客户端渲染的项目：

- 企业内部项目，管理平台这类不需要 SEO 的项目，使用客户端渲染能能够提高开发效率，减少服务器资源占用；
- 强交互项目：对于交互比较多，数据不是很固定的项目，使用客户端渲染，能够让用户更临近于原生 APP 体验；

### 适用于服务端渲染的项目：

- 官网 / 博客网站 / 营销类网站：这些网站对 SEO 和首屏渲染速度更加注重，所以服务端渲染会是较好的选择；

### 综合方案？

现在有技术可以实现服务端渲染和客户端渲染结合，比如[next.js](https://www.nextjs.cn/docs/basic-features/data-fetching)，对于网站部分需要 SEO 和首屏渲染速度的页面，我们是使用服务端渲染，对于其他交互性强或者是不需要 SEO 的页面，我们使用静态构成，从而减少服务器压力，提高交互体验。

## 开发nuxt3 项目模板

[【2024年4月】nuxt3 项目模板，让你开发官网得心应手 - 掘金 (juejin.cn)](https://juejin.cn/post/7362095142743818278)
