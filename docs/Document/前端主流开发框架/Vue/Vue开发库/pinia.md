# Pinia 状态管理库的使用

## 一、网站相关

GitHub：[vuejs/pinia: 🍍](https://github.com/vuejs/pinia)

官网：[Home | Pinia (vuejs.org)](https://pinia.vuejs.org/)

中文网：[Home | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/)

## 二、其他学习文章

[2k 字轻松入门 Pinia - 掘金](https://juejin.cn/post/7139724486625984543)
[大菠萝？Pinia 已经来了，再不学你就 out 了 - 掘金 (juejin.cn)](https://juejin.cn/post/7078281612013764616)

[新一代状态管理工具，Pinia.js 上手指南 - 掘金 (juejin.cn)](https://juejin.cn/post/7049196967770980389)

[Pinia 进阶：优雅的 setup（函数式）写法+封装到你的企业项目 - 掘金 (juejin.cn)](https://juejin.cn/post/7057439040911441957)

[2022 年了，懂 vue3 的也该学一波 pinia 了 - 掘金 (juejin.cn)](https://juejin.cn/post/7123488184930926623)

[Vue 新一代状态管理工具——Pinia - 掘金 (juejin.cn)](https://juejin.cn/post/7119832691339444255)

[比 vuex 香的 🍍pinia 最快速入门指南 - 掘金 (juejin.cn)](https://juejin.cn/post/7134968684342165512)

[一文解析 Pinia 和 Vuex，带你全面理解这两个 Vue 状态管理模式 - 掘金 (juejin.cn)](https://juejin.cn/post/7121209657678364685)

[我把 vue3 项目中的 vuex 去除了，改用 pinia - 掘金 (juejin.cn)](https://juejin.cn/post/7068113574043844622)

[上手 Vue 新的状态管理 Pinia，一篇文章就够了 - 掘金 (juejin.cn)](https://juejin.cn/post/7075491793642455077)

[Vue3.2 setup 语法糖、Composition API、状态库 Pinia 归纳总结 - 掘金 (juejin.cn)](https://juejin.cn/post/7006108454028836895)

[可爱又简洁轻量的 Pinia，你确定不使用吗？ - 掘金 (juejin.cn)](https://juejin.cn/post/7054481067297734693)

---

## 三、基本特点

`Pinia`同样是一个 Vue 的状态管理工具，在`Vuex`的基础上提出了一些改进。与 vuex 相比，`Pinia` 最大的特点是：简便。

- 它没有`mutation`,他只有`state`，`getters`，`action`,在`action`中支持同步与异步方法来修改`state`数据
- 类型安全，与 `TypeScript` 一起使用时具有可靠的类型推断支持
- 模块化设计，通过构建多个存储模块，可以让程序自动拆分它们。
- 非常轻巧，只有大约 1kb 的大小。
- 不再有 `modules` 的嵌套结构,没有命名空间模块
- `Pinia` 支持扩展，可以非常方便地通过本地存储，事物等进行扩展。
- 支持服务器端渲染

## 四、安装与使用

### 1.安装

```bash
yarn add pinia
# 或者使用 npm
npm install pinia
```

### 2.核心概念

##### `store`: 使用`defineStore()`函数定义一个 store，第一个参数是应用程序中 store 的唯一 id. 里面包含`state`、`getters` 和 `actions`, 与 Vuex 相比没有了`Mutations`

```tsx
export const useStore = defineStore("main", {
	state: () => {
		return {
			name: "ming",
			doubleCount: 2,
		};
	},
	getters: {},
	actions: {},
});
```

> 注意：store 是一个用 reactive 包裹的对象，这意味着不需要在 getter 之后写.value，但是，就像 setup 中的 props 一样，我们不能对其进行解构.

```tsx
export default defineComponent({
	setup() {
		const store = useStore();
		// ❌ 这不起作用，因为它会破坏响应式
		// 这和从 props 解构是一样的
		const { name, doubleCount } = store;

		return {
			// 一直会是 "ming"
			name,
			// 一直会是 2
			doubleCount,
			// 这将是响应式的
			doubleValue: computed(() => store.doubleCount),
		};
	},
});
```

当然你可以使用`computed`来响应式的获取 state 的值（这与 Vuex 中需要创建`computed`引用以保留其响应性类似）,但是我们通常的做法是使用`storeToRefs`响应式解构 Store.

```tsx
const store = useStore();
// 正确的响应式解构
const { name, doubleCount } = storeToRefs(store);
```

##### `State`: 在 Pinia 中，状态被定义为返回初始状态的函数

```tsx
import { defineStore } from "pinia";

const useStore = defineStore("main", {
	// 推荐使用 完整类型推断的箭头函数
	state: () => {
		return {
			// 所有这些属性都将自动推断其类型
			counter: 0,
			name: "Eduardo",
		};
	},
});
```

###### 组件中 state 的获取与修改

在`Vuex`中我们修改`state`的值必须在`mutation`中定义方法进行修改，而在`pinia`中我们有多中修改 state 的方式.

- 基本方法：

```tsx
const store = useStore();
store.counter++;
```

- 重置状态：

```tsx
const store = useStore();
store.$reset();
```

- 使用`$patch`修改 state
  [1] 使用部分`state`对象进行修改

```tsx
const mainStore = useMainStore();
mainStore.$patch({
	name: "",
	counter: mainStore.counter++,
});
```

[2] `$patch`方法也可以接受一个函数来批量修改集合内部分对象的值

```tsx
cartStore.$patch((state) => {
	state.counter++;
	state.name = "test";
});
```

- 替换 state
  可以通过将其 $state 属性设置为新对象,来替换`Store`的整个状态：

```tsx
mainStore.$state = { name: "", counter: 0 };
```

- 访问其他模块的`state`

  - `Vuex`中我们要访问其他带命名空间的模块的 state 我们需要使用`rootState`

```tsx
  addAsyncTabs ({ state, commit, rootState, rootGetters }:ActionContext<TabsState, RootState>, tab:ITab): void {
      /// 通过rootState 访问main的数据
      console.log('rootState.main.count=======', rootState.main.count)
      if (state.tabLists.some(item => item.id === tab.id)) { return }
      setTimeout(() => {
        state.tabLists.push(tab)
      }, 1000)
    },
```

- Pinia 中访问其他`store`的`state`

```tsx
    import { useInputStore } from './inputStore'

    export const useListStore = defineStore('listStore', {
      state: () => {
        return {
          itemList: [] as IItemDate[],
          counter: 0
        }
      },
      getters: {
      },
      actions: {
        addList (item: IItemDate) {
          this.itemList.push(item)
          ///获取store，直接调用
          const inputStore = useInputStore()
          inputStore.inputValue = ''
        }
    })
```

#### Getter: Getter 完全等同于 Store 状态的计算值

```tsx
export const useStore = defineStore("main", {
	state: () => ({
		counter: 0,
	}),
	getters: {
		// 自动将返回类型推断为数字
		doubleCount(state) {
			return state.counter * 2;
		},
		// 返回类型必须明确设置
		doublePlusOne(): number {
			return this.counter * 2 + 1;
		},
	},
});
```

> 如果需要使用`this`访问到 整个`store`的实例,在`TypeScript`需要定义返回类型.
> 在`setup()`中使用：

```tsx
export default {
	setup() {
		const store = useStore();

		store.counter = 3;
		store.doubleCount; // 6
	},
};
```

- 访问其他模块的 getter

  - 对于`Vuex`而言如果要访问其他命名空间模块的`getter`，需要使用`rootGetters`属性

```tsx
    /// action 方法
    addAsyncTabs ({ state, commit, rootState, rootGetters }:ActionContext<TabsState, RootState>, tab:ITab): void {
      /// 通过rootGetters 访问main的数据
        console.log('rootGetters[]=======', rootGetters['main/getCount'])
      }
```

- `Pinia`中访问其他 store 中的 getter

```tsx
import { useOtherStore } from "./other-store";

export const useStore = defineStore("main", {
	state: () => ({
		// ...
	}),
	getters: {
		otherGetter(state) {
			const otherStore = useOtherStore();
			return state.localData + otherStore.data;
		},
	},
});
```

#### Action:actions 相当于组件中的 methods,使用`defineStore()`中的 actions 属性定义

```tsx
export const useStore = defineStore("main", {
	state: () => ({
		counter: 0,
	}),
	actions: {
		increment() {
			this.counter++;
		},
		randomizeCounter() {
			this.counter = Math.round(100 * Math.random());
		},
	},
});
```

> `pinia`中没有`mutation`属性，我们可以在`action`中定义业务逻辑，`action`可以是异步的，可以在其中 await 任何 API 调用甚至其他操作.

```tsx
...
// 定义一个action
asyncAddCounter () {
  setTimeout(() => {
    this.counter++
  }, 1000)
}
...
///setup()中调用
export default defineComponent({
  setup() {
    const main = useMainStore()
    // Actions 像 methods 一样被调用：
    main.asyncAddCounter()
    return {}
  }
})
```

- 访问其他 store 中的 Action

  要使用另一个 store 中的 action ，可以直接在操作内部使用它：

```tsx
import { useAuthStore } from "./auth-store";

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		// ...
	}),
	actions: {
		async fetchUserPreferences(preferences) {
			const auth = useAuthStore();
			///调用其他store的action
			if (auth.isAuthenticated()) {
				this.preferences = await fetchPreferences();
			} else {
				throw new Error("User must be authenticated");
			}
		},
	},
});
```

在`Vuex`中如果要调用另一个模块的`Action`，我们需要在当前模块中注册该方法为全局的`Action`，

```tsx
/// 注册全局Action
 globalSetCount: {
  root: true,/// 设置root 为true
    handler ({ commit }:ActionContext<MainState, RootState>, count:number):void {
       commit('setCount', count)
     }
    }
```

在另一个模块中对其进行`dispatch`调用

```tsx
/// 调用全局命名空间的函数
 handelGlobalAction ({ dispatch }:ActionContext<TabsState, RootState>):void {
   dispatch('globalSetCount', 100, { root: true })
 }
```

### 3.总结

与 [Vuex](https://vuex.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%22%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F%22%EF%BC%9F) 相比，[Pinia](https://pinia.web3doc.top/core-concepts/) 提供了一个更简单的 API，具有更少的操作，提供`Composition API`，最重要的是，在与`TypeScript`一起使用时具有可靠的类型推断支持，如果你正在开发一个新项目并且使用了`TypeScript`，可以尝试一下`pinia`，相信不会让你失望。

## 五、购物车例子

main.ts

```js
import { createPinia } from "pinia";
app.use(createPinia());
```

stores/counterStore.js

```js
import { defineStore } from "pinia";

// defineStore 函数返回值本质是一个Hooks
export const useCounterStore = defineStore("counter", {
	state: () => ({
		count: 0,
	}),

	actions: {
		increment() {
			this.count++;
			// console.log(0)
		},
	},

	getters: {
		doubleCount() {
			return this.count * 2;
		},
	},
});
export const counterStore = useCounterStore();
```

demo.vue

```vue
<script setup>
import { storeToRefs } from "pinia";
import { counterStore } from "@/stores/counterStore";
// const couterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore);
</script>

<template>
	<div>
		{{ count }}
		{{ doubleCount }}
		<button @click="couterStore.increment">+</button>
	</div>
</template>

<style lang="css">
/* css 代码 */
</style>
```

data/api.js

```js
function catchDataApi() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: "iphone12",
					price: 3000,
					inventory: 3,
				},
				{
					id: 2,
					name: "iphone13",
					price: 8000,
					inventory: 3,
				},
				{
					id: 3,
					name: "iphone14",
					price: 13000,
					inventory: 2,
				},
			]);
		}, 1000);
	});
}

export default catchDataApi;
```

store/productStore.js

```js
import { defineStore } from "pinia";
import catchDataApi from "../data/api";

export const useProductStore = defineStore({
	id: "productStore",

	state: () => ({
		products: [],
	}),

	actions: {
		async loadData() {
			try {
				const data = await catchDataApi();
				this.products = data;
			} catch (error) {}
		},
	},
});
```

store/cartStore.js

```js
import { defineStore, storeToRefs } from "pinia";
import { useProductStore } from "./productStore";
export const useCartStore = defineStore({
	id: "cartStore",

	state: () => ({
		cartList: [],
	}),

	// cartList = [
	//   {
	//     id: 1,
	//     name: 'iphone12',
	//     price: 10000,
	//     quantity: 1
	//   }
	// ]

	actions: {
		addToCart(product) {
			// 在购物车里查找是否有这个商品
			const p = this.cartList.find((item) => {
				return item.id === product.id;
			});

			// 如果找到了，购物车里的这个商品的数量加 1
			// 如果没有没有找到，添加这个商品到购物车
			if (!!p) {
				p.quantity++;
			} else {
				this.cartList.push({
					...product,
					quantity: 1,
				});
			}

			// 当点击放入购物车，这个商品的库存需要减少一个
			const productStore = useProductStore();
			const { products } = storeToRefs(productStore);
			const p2 = products.value.find((item) => {
				return item.id === product.id;
			});
			p2.inventory--;
		},
	},

	getters: {
		totalPrice() {
			return this.cartList.reduce((sum, item) => {
				return sum + item.price * item.quantity;
			}, 0);
		},
	},
});
```

views/Product.vue

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
const productStore = useProductStore();
const cartStore = useCartStore();
const { products } = storeToRefs(productStore);
const { addToCart } = cartStore;
productStore.loadData();
</script>

<template>
	<h1>产品列表</h1>
	<hr />
	<ul>
		<li v-for="product in products">
			{{ product.name }} - ￥{{ product.price }}
			<button @click="addToCart(product)" :disabled="product.inventory <= 0">
				放入购物车
			</button>
		</li>
	</ul>
</template>

<style lang="css">
/* css 代码 */
</style>
```

views/Cart.vue

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
const cartStore = useCartStore();
const { cartList, totalPrice } = storeToRefs(cartStore);
</script>

<template>
	<h1>购物车</h1>
	<hr />
	<ul>
		<li v-for="product in cartList">
			{{ product.name }} : {{ product.quantity }} x ￥{{ product.price }} = ￥{{
				product.quantity * product.price
			}}
		</li>
	</ul>
	<div>总价：￥{{ totalPrice }}</div>
</template>

<style lang="css">
/* css 代码 */
</style>
```

App.vue

```vue
<script setup>
import Product from "@/views/Product.vue";
import Cart from "@/views/Cart.vue";
</script>

<template>
	<Product></Product>
	<Cart></Cart>
</template>

<style lang="css">
/* css 代码 */
</style>
```
