# VueRouter 源码解析

### vue-router 库 github 地址

https://github.com/vuejs/vue-router

### vue-router 实现原理文档

- https://www.jianshu.com/p/b85a89ca1d98
- https://www.cnblogs.com/cokolxvd/p/15726669.html

### vue-router 实现原理

vue-router 实现了再不跳转页面的情况下更新视图，也就是只有一个页面

#### vue-router 的三种模式

##### history 模式

概述

- html5 标准中，为 history 添加了 pushState()、replaceState()方法，以及 onpopstate 事件。但原理和 hash 方式是相同的
- history 模式并不会向服务器发送请求，是因为 vue-cli 对 history 模式做了处理
- 通过 history 模式 实现单页路由的 URL 没有 #。但因为没有 # ，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求
- 为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面

底层实现原理

```html
<body>
	<a id="login" href="#">登录</a>
	<a id="desk" href="#">桌面</a>
	<hr />
	<div id="content"></div>
</body>
<script>
	let login = document.querySelector("#login");
	let content = document.querySelector("#content");
	login.addEventListener("click", function (e) {
		e.preventDefault();
		history.pushState({ name: "loginname" }, "login", "/login");
		content.innerHTML = "登录";
	});
	let desk = document.querySelector("#desk");
	desk.addEventListener("click", function (e) {
		e.preventDefault();
		history.pushState({ name: "deskname" }, "desk", "/desk");
		content.innerHTML = "桌面";
	});
	window.onpopstate = function (e) {
		let name = e.state.name;
		if (name == "loginname") {
			content.innerHTML = "这是登录";
		} else {
			content.innerHTML = "这是桌面";
		}
	};
</script>
```

- history.pushState()
- 路径就是普通的 url，通过 history.pushState()方法来改变地址栏，并把当前地址记录在浏览器的访问历史中，并不会真正的跳到指定的路径，也就是浏览器不会向服务器发送请求。
- 通过监听 popstate 事件，可以监听到浏览器历史操作的变化，在 popstate 事件中可以记录浏览器地址栏改变后的地址，要注意的是，调用 history.pushSate()和 history.replaceState()不会触发 popstate 事件，只有点击浏览器的前进后退按钮及调用 history.forward()、history.back()、history.go()方法时才会触发 popstate 事件。
- 最后通过路由找到对应的组件，渲染在浏览器中

##### hash 模式

概述

- 是以 url 中#后面的内容作为路由地址，可以直接通过 location.url 来切换浏览器的地址，如果只改变了#后面的内容，浏览器不会向服务器请求这个地址，但是会把这个地址记录在浏览器的访问记录中，当 hash 改变后，要监听 hash 的变化，并做相应的处理，我们可以监听 hashchange 事件，当 hash 发生变化时，会触发 hashchange 事件，在 hashchange 事件中记录当前路由地址，并找到当前路由对应的组件，重新渲染在浏览器中
- hash 模式实现的路由地址有 #
- \#后面的内容不会传给服务端，也就是说不会重新刷新页面，并且路由切换的时候也不会重新加载页面。
- hash 必须和原先的值不同，才能新增会话浏览历史的记录。

底层实现原理

```html
<body>
	<a href="#/login">登录</a>
	<a href="#/desk">桌面</a>
	<hr />
	<div id="content"></div>
</body>
<script>
	let content = document.querySelector("#content");
	window.onhashchange = function (e) {
		console.log(window.history.state);
		let { newURL } = e;
		if (newURL.endsWith("#/login")) {
			content.innerHTML = "这是登录内容";
		} else if (newURL.endsWith("#/desk")) {
			content.innerHTML = "这是桌面内容";
		}
	};
</script>
```

##### abstract 模式

概述

- 支持所有 JavaScript 运行环境，如 Node.js 服务器端。
- abstract 模式是使用一个不依赖于浏览器的浏览历史虚拟管理后端。
- 根据平台差异可以看出，在 Weex 环境中只支持使用 abstract 模式。 不过，vue-router 自身会对环境做校验，如果发现没有浏览器的 API，vue-router 会自动强制进入 abstract 模式，所以 在使用 vue-router 时只要不写 mode 配置即可，默认会在浏览器环境中使用 hash 模式，在移动端原生环境中使用 abstract 模式。 （当然，你也可以明确指定在所有情况下都使用 abstract 模式）。

### 手写 router 路由 (简单思路)

#### 需求分析

- 作为一个插件存在：实现 vue-router 类和 install 方法
- 实现两个全局组件：router-view 用于显示匹配组件内容，router-link 用于跳转
- 监控 url 变化：监听 hashchange 或者 popstate 事件
- 响应最新 url：创建一个响应式的属性 current，当它改变时获取对应组件并显示

#### 源码实现 src\krouter

##### index.js 应用路由

```js
import Vue from "vue";
import VueRouter from "./kvue-router";
import Home from "../views/Home.vue";

// 1.应用插件
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

// 2.创建实例
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
```

##### krouter-router.js 实现

```js
import Link from "./krouter-link";
import View from "./krouter-view";

let Vue;

// 1.实现一个插件：挂载$router

class KVueRouter {
	constructor(options) {
		this.$options = options;
		console.log(this.$options);

		// 需要创建响应式的current属性
		// 利用Vue提供的defineReactive做响应化
		// 这样将来current变化的时候，依赖的组件会重新render
		Vue.util.defineReactive(this, "current", "/");

		// this.app = new Vue({
		//   data() {
		//     return {
		//       current: '/'
		//     }
		//   }
		// })

		// 监控url变化
		window.addEventListener("hashchange", this.onHashChange.bind(this));
		window.addEventListener("load", this.onHashChange.bind(this));

		// 创建一个路由映射表
		this.routeMap = {};
		options.routes.forEach((route) => {
			this.routeMap[route.path] = route;
		});
	}

	onHashChange() {
		console.log(window.location.hash);

		this.current = window.location.hash.slice(1);
	}
}

KVueRouter.install = function (_Vue) {
	// 保存构造函数，在KVueRouter里面使用
	Vue = _Vue;

	// 挂载$router
	// 怎么获取根实例中的router选项
	Vue.mixin({
		beforeCreate() {
			// 确保根实例的时候才执行
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router;
			}
		},
	});

	// 任务2：实现两个全局组件router-link和router-view
	Vue.component("router-link", Link);
	Vue.component("router-view", View);
};

export default KVueRouter;
```

##### krouter-link.js 实现

```js
export default {
	props: {
		to: {
			type: String,
			required: true,
		},
	},
	render(h) {
		// <a href="#/about">abc</a>
		// <router-link to="/about">xxx</router-link>
		// h(tag, data, children)
		console.log(this.$slots);
		return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
		// return <a href={'#' + this.to}>{this.$slots.default}</a>
	},
};
```

##### krouter-view.js 实现

```js
export default {
	render(h) {
		//获取path对应的component
		const { routeMap, current } = this.$router;
		console.log(routeMap, current);

		const component = routeMap[current].component || null;
		return h(component);
	},
};
```

## vue router 4 源码篇

[vue router 4 源码篇：路由诞生——createRouter原理探索 - 掘金 (juejin.cn)](https://juejin.cn/post/7144890513143889950)

[vue router 4 源码篇：路由matcher的前世今生 - 掘金 (juejin.cn)](https://juejin.cn/post/7145742001764319240)

[vue router 4 源码篇：router history的原生结合 - 掘金 (juejin.cn)](https://juejin.cn/post/7146408382251925540)

[vue router 4 源码篇：导航守卫该如何设计（一） - 掘金 (juejin.cn)](https://juejin.cn/post/7152721037870759972)

[vue router 4 源码篇：导航守卫该如何设计（二） - 掘金 (juejin.cn)](https://juejin.cn/post/7153958470499172382)
