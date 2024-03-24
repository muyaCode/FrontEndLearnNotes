# Vuex 源码解析

## vuex 库 github 地址

https://github.com/vuejs/vuex

## 实现原理文档

https://www.cnblogs.com/crazycode2/p/13458804.html

## 前置介绍

### 实现原理

采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

### Vuex 的构成

1）state

- state 是存储的单一状态，是存储的基本数据。

2）Getters

- getters 是 store 的计算属性，对 state 的加工，是派生出来的数据。就像 computed 计算属性一样，getter 返回的值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变才会被重新计算。

3）Mutations

- mutations 提交更改数据，使用 store.commit 方法更改 state 存储的状态。（mutations 同步函数）

4）Actions

- actions 像一个装饰器，提交 mutation，而不是直接变更状态。（actions 可以包含任何异步操作）

5）Module

- Module 是 store 分割的模块，每个模块拥有自己的 state、getters、mutations、actions。

以上使用例子

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

6）辅助函数

- Vuex 提供了 mapState、MapGetters、MapActions、mapMutations 等辅助函数给开发在 vm 中处理 store。

### Vuex 的使用

```js
import Vuex from "vuex";
Vue.use(Vuex); // 1. vue的插件机制，安装vuex
let store = new Vuex.Store({
	// 2.实例化store，调用install方法
	state,
	getters,
	modules,
	mutations,
	actions,
	plugins,
});
new Vue({
	// 3.注入store, 挂载vue实例
	store,
	render: (h) => h(app),
}).$mount("#app");
```

### Vuex 的设计思想

Vuex 的设计思想，借鉴了 Flux、Redux，将数据存放到全局的 store，再将 store 挂载到每个 vue 实例组件中，利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新

## 手写 vuex 状态管理

### 需求分析

- vuex 的 store 是如何挂载注入到组件中
- vuex 的 state 和 getters 是如何映射到各个组件实例中响应式更新状态
- 浅层次实现

### 源码实现 src\kstore

#### index.js 使用 vuex

```js
import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		counter: 0,
	},
	getters: {
		doubleCounter(state) {
			return state.counter * 2;
		},
	},
	mutations: {
		add(state) {
			state.counter++;
			// this.state
		},
	},
	actions: {
		// 结构上下文
		add({ commit }) {
			setTimeout(() => {
				commit("add");
			}, 1000);
		},
	},
	modules: {},
});
```

#### kvuex.js 实现 vuex

```js
// 保存构造函数引用，避免import
let Vue;

class Store {
	constructor(options) {
		// this.$options = options;
		this._mutations = options.mutations;
		this._actions = options.actions;

		// 响应化处理state
		// this.state = new Vue({
		//   data: options.state
		// })
		this._vm = new Vue({
			data: {
				// 加两个$，Vue不做代理
				$$state: options.state,
			},
		});

		// 绑定commit、dispatch的上下文问store实例
		this.commit = this.commit.bind(this);
		this.dispatch = this.dispatch.bind(this);
	}

	// 存取器， store.state
	get state() {
		console.log(this._vm);

		return this._vm._data.$$state;
	}

	set state(v) {
		console.error("你造吗？你这样不好！");
	}

	// store.commit('add', 1)
	// type: mutation的类型
	// payload：载荷，是参数
	commit(type, payload) {
		const entry = this._mutations[type];
		if (entry) {
			entry(this.state, payload);
		}
	}

	dispatch(type, payload) {
		const entry = this._actions[type];
		if (entry) {
			entry(this, payload);
		}
	}
}

function install(_Vue) {
	Vue = _Vue;

	Vue.mixin({
		beforeCreate() {
			if (this.$options.store) {
				Vue.prototype.$store = this.$options.store;
			}
		},
	});
}

// Vuex
export default {
	Store,
	install,
};
```
