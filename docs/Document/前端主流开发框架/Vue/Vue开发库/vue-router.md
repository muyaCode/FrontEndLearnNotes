# vue-router4

官网：[Vue Router](https://router.vuejs.org/zh/)

文档：[介绍 | Vue Router](https://router.vuejs.org/zh/introduction.html)，按照文档配置信息

GitHub：[GitHub - vuejs/router: 🚦 The official router for Vue.js](https://github.com/vuejs/router)

---

#### 文档之外的：路由和权限校验：

##### **利用路由元信息 meta 属性来设置对象：[路由元信息 | Vue Router](https://router.vuejs.org/zh/guide/advanced/meta.html)**

1.meta 字段定义路由标题、图标、权限：

```js
const routes = [
	{
		path: "/login",
		component: () => import("@/views/login.vue"),
		meta: { title: "路由标题", icon: "edit", roles: ["admin1", "admin2"] },
	},
];
```

##### 路由守卫设置：

**全局前置守卫设置`router.beforeEach`：**

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于**等待中**

```js
router.beforeEach((to, from, next) => {});
```

例子：permission.js 权限方法里面使用，用于判断是否登录，和登录后需要跳转的路由页面

```js
router.beforeEach(async (to, from, next) => {
	NProgress.start();
	const token = store.state.token || sessionStorage.getItem("token");
	if (token) {
		if (to.path === "/login") {
			next("/information");
			NProgress.done();
		} else {
			const hasRoles =
				store.state.permissionRoutes && store.state.permissionRoutes.length;
			if (hasRoles) {
				next();
			} else {
				// 获取用户的角色
				let admins = await absApi.getAdmin();
				if (admins.code === 0) {
					const { authorities } = admins.data;
					store.mutations.setUser(admins.data);
					const roles = authorities.map((auth) => auth.authorityCode);
					store.mutations.setRoles(roles);
					// 获取角色的路由权限
					const permissionRoutes = permissionUtils.generateRoutes(roles);
					// 目前只有SYSTEM_ADMIN账号才有数据查看的权限
					if (
						roles.includes("SYSTEM_ADMIN") ||
						roles.includes("COUNTY_ADMIN")
					) {
						permissionRoutes[0].redirect = "/dashboard";
					} else if (roles.includes("INSURANCE_COMPANY")) {
						permissionRoutes[0].redirect = "/insurance";
					} else {
						permissionRoutes[0].redirect = "/information";
					}
					// 添加路由
					router.addRoutes([
						{
							path: "*",
							component: Layout,
							redirect: "/404",
							meta: { name: "首页" },
							children: [
								{
									path: "/404",
									meta: { name: "404" },
									component: () => import("@/views/error/404"),
								},
							],
						},
						...permissionRoutes,
					]);
					store.mutations.setPermissionRoutes(permissionRoutes);
					next({ ...to });
				} else {
					store.mutations.clearStoreData();
					next("/login");
					NProgress.done();
				}
			}
		}
	} else {
		if (whiteRoutes.includes(to.path)) {
			next();
		} else {
			store.mutations.clearStoreData();
			next("/login");
			NProgress.done();
		}
	}
});
```

---

**全局解析守卫设置`router.beforeResolve`：**

在  **每次导航**时都会触发，但是确保在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**

`router.beforeResolve`  是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

```js
router.beforeResolve(async (to) => {});
```

例子：确保用户可以访问 自定义 [meta](https://router.vuejs.org/zh/guide/advanced/meta.html)  属性  `requiresCamera`  的路由：

```js
router.beforeResolve(async (to) => {
	if (to.meta.requiresCamera) {
		try {
			await askForCameraPermission();
		} catch (error) {
			if (error instanceof NotAllowedError) {
				// ... 处理错误，然后取消导航
				return false;
			} else {
				// 意料之外的错误，取消导航并把错误传给全局处理器
				throw error;
			}
		}
	}
});
```

**全局后置钩子设置`router.afterEach`：**

对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用

```js
router.afterEach((to, from) => {
	sendToAnalytics(to.fullPath);
});
```

[navigation failures](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html)  等待导航结果 作为第三个参数：

```js
router.afterEach((to, from, failure) => {
	if (!failure) sendToAnalytics(to.fullPath);
});
```

使用进度条加载完成例子：NProgress.done();

```js
router.afterEach(() => {
	NProgress.done();
});
```

**组件内的守卫**：[导航守卫 | Vue Router](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)

- `beforeRouteEnter`在渲染该组件的对应路由被验证前调用：常用于判断页面跳转的参数来更改页面标题
- `beforeRouteUpdate`在当前路由改变，但是该组件被复用时调用：
- `beforeRouteLeave`在导航离开渲染该组件的对应路由时调用：

---

##### 动态添加路由：

常用于路由权限更改，和用户的路由权限

---

##### vue-router 原理解析

vue-router 是 vue 项目的重要组成部分，用于构建单页应用。单页应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。路由的本质就是建立 url 和页面之间的映射关系，解析 URL 实现不同页面之间的跳转

##### 1、vue-router 路由原理

vue-router 通过 hash 与 History interface 两种方式实现前端路由，更新视图但不重新请求页面”是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有两种方式

##### 2、两种路由模式

##### 1.hash 模式：

- **hash 模式**是 vue-router 的默认模式，在浏览器中符号的“#”，以及#后面的字符称之为 hash，用 window.location.hash 读取；

- hash 指的是 url 锚点，**当锚点发生变化的时候，浏览器只会修改访问历史记录，不会访问服务器重新获取页面**。因此可以监听描点值的变化，根据描点值渲染指定 dom。

**特点：**

- hash 虽然在 URL 中，但不被包括在 HTTP 请求中；用来指导浏览器动作，对服务端安全无用。

- hash 不会重加载页面。

- hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.xxx.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

```js
// router/index.js
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

export default new Router({
	// mode: 'history', // 默认是hash模式，不写就是默认模式
	routes,
});
```

**hash 模式下，url 可能为以下形式：**  
`http://localhost:8080/index.html#/book?bookid=1`

**hash 模式原理实现**

```js
window.addEventListener("hashchange", () => {
	const hash = window.location.hash.substr(1);
	// 根据hash值渲染不同的dom
});
```

---

##### 2.history 模式：

- history 采用 HTML5 的新特性；且提供了两个新方法：pushState（）
- replaceState（）可以对浏览器历史记录栈进行修改，以及 popState 事件的监听到状态变更。

**特点：**

- history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 地址后加上/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。

- 这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

```js
// router/index.js
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

export default new Router({
	mode: "history", // 默认是hash模式，不写就是默认模式
	routes,
});
```

**history 模式，url 会如下面所示：**  
`http://localhost:8080/book/1`

**history 模式原理实现：**

```js
window.addEventListener("popstate", () => {
	const path = window.location.pathname;
	// 根据path不同可渲染不同的dom
});
```

---

##### vue-router 总结

VueRouter 核心是，通过 Vue.use 注册插件，在插件的 install 方法中获取用户配置的 router 对象。当浏览器地址发生变化的时候，根据 router 对象匹配相应路由，获取组件，并将组件渲染到视图上。

**简单的 router 的实现步骤：**

1. url 改变

2. 触发事件监听

3. 改变 vue-router 中的 current 变量

4. 监视 current 变量的监视者

5. 获取新的组件

6. render

```js
// ****** 简单的router的实现 ******

// 存储全局使用的Vue对象
let _Vue = null;
class VueRouter {
	// vue.use要求plugin具备一个install方法
	static install(Vue) {
		// 判断插件是否已经安装过
		if (VueRouter.install.installed) {
			return;
		}
		VueRouter.install.installed = true;
		_Vue = Vue;

		// 将main文件中实例化Vue对象时传入的router对象添加到Vue的原型链上。
		_Vue.mixin({
			beforeCreate() {
				if (this.$options.router) {
					_Vue.prototype.$router = this.$options.router;
				}
			},
		});
	}

	constructor(options) {
		this.options = options;
		// 用于快速查找route
		this.routeMap = {};
		this.data = _Vue.observable({
			current: window.location.hash.substr(1),
		});
		this.init();
	}

	init() {
		this.createRouteMap();
		this.initComponents(_Vue);
		this.initEvent();
	}

	createRouteMap() {
		// 遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
		this.options.routes.forEach((route) => {
			this.routeMap[route.path] = route.component;
		});
	}

	initComponents(Vue) {
		// 注册router-link组件
		Vue.component("router-link", {
			props: {
				to: String,
			},
			methods: {
				clickHandler(e) {
					// 修改hash
					location.hash = this.to;
					// 修改current，触发视图更新
					this.$router.data.current = this.to;
					e.preventDefault();
				},
			},
			render(h) {
				return h(
					"a",
					{
						attrs: {
							href: this.to,
						},
						on: {
							click: this.clickHandler,
						},
					},
					[this.$slots.default]
				);
			},
		});
		const that = this;
		// 注册router-view插件
		Vue.component("router-view", {
			render(h) {
				const component = that.routeMap[that.data.current];
				return h(component);
			},
		});
	}

	initEvent() {
		// 在hash发生更改的时候，修改current属性，触发组件更新
		window.addEventListener("hashchange", () => {
			this.data.current = window.location.hash.substr(1);
		});
	}
}

export default VueRouter;
```
