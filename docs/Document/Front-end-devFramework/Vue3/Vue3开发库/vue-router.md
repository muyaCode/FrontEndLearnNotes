# vueRouter

官网：[Vue Router](https://router.vuejs.org/zh/)

文档：[介绍 | Vue Router](https://router.vuejs.org/zh/introduction.html)

GitHub：[GitHub - vuejs/router: 🚦 The official router for Vue.js](https://github.com/vuejs/router)

---

路由和权限校验：

**利用路由元信息meta属性来设置对象：[路由元信息 | Vue Router](https://router.vuejs.org/zh/guide/advanced/meta.html)**

1.meta字段定义路由标题、图标、权限：

```js
const routes = [{
    path: "/login",
	component: () => import("@/views/login.vue"),
    meta: { title: "路由标题", icon: "edit", roles: ['admin1', 'admin2'] }
}]
```

vue2的源码调试解析：

在vue.config.js里面设置

```js
config.when(
    process.env.NODE_ENV === 'development',
    config => config.devtool('source-map') 
    // source-map模式：是源码未编译的模式，方便debugger调试源码来查看运行情况
    // eval模式：是编译后的模式
)
```
