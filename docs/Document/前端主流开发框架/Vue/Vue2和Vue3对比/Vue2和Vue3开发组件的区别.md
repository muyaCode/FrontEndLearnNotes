# Vue2 和 Vue3 开发组件的区别

参考：[带你体验 Vue2 和 Vue3 开发组件有什么区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/139590941)

## 1.创建一个 `template`

组件来说，大多代码在 Vue2 和 Vue3 都**非常相似**。Vue3 支持`碎片(Fragments)`，就是说在组件可以拥有多个根节点。

这种新特性可以减少很多组件之间的`div`包裹元素。在开发 vue 的时候，我们会发现每一个组件都会有个`div`元素包裹着。就会出现很多层多余的`div`元素。`碎片(Fragments)`解决了这个问题。对于有完美强迫症的童鞋“真的时太棒了”。我们这里的例子里就不展示了，用简单的单根节点的组件。

**Vue2 表格 template**

```html
<template>
	<div class="form-element">
		<h2>{{ title }}</h2>
		<input type="text" v-model="username" placeholder="Username" />

		<input type="password" v-model="password" placeholder="Password" />

		<button @click="login">Submit</button>
		<p>Values: {{ username + ' ' + password }}</p>
	</div>
</template>
```

在 Vue3 的唯一真正的不同在于数据获取。Vue3 中的`反应数据（Reactive Data）`是包含在一个`反应状态（Reactive State）`变量中。— 所以我们需要访问这个反应状态来获取数据值。

```html
<template>
	<div class="form-element">
		<h2>{{ state.title }}</h2>
		<input type="text" v-model="state.username" placeholder="Username" />

		<input type="password" v-model="state.password" placeholder="Password" />

		<button @click="login">Submit</button>
		<p>Values: {{ state.username + ' ' + state.password }}</p>
	</div>
</template>
```

## 2.建立数据 `data`

**这里就是 Vue2 与 Vue3 最大的区别 — Vue2 使用`选项类型API（Options API）`对比 Vue3`合成型API（Composition API）`**

旧的选项型 API 在代码里分割了不同的属性（properties）：data，computed 属性，methods，等等。新的合成型 API 能让我们用方法（function）来分割，相比于旧的 API 使用属性来分组，这样代码会更加简便和整洁。

> 现在我们来对比一下 Vue2 写法和 Vue3 写法在代码里面的区别。

**Vue2** - 这里把两个数据放入 data 属性中

```js
export default {
	props: {
		title: String,
	},
	data() {
		return {
			username: "",
			password: "",
		};
	},
};
```

在**Vue3.0**，我们就需要使用一个新的`setup()`方法，此方法在组件初始化构造的时候触发。

为了可以让开发者对反应型数据有更多的控制，我们可以直接使用到 Vue3 的`反应API（reactivity API）`。

使用以下三步来建立`反应性数据`:

1. 从 vue 引入`reactive`
2. 使用`reactive()`方法来声名我们的数据为反应性数据
3. 使用`setup()`方法来返回我们的反应性数据，从而我们的 template 可以获取这些反应性数据

上一波代码，让大家更容易理解是怎么实现的。

```js
import { reactive } from "vue";

export default {
	props: {
		title: String,
	},
	setup() {
		const state = reactive({
			username: "",
			password: "",
		});

		return { state };
	},
};
```

这里构造的反应性数据就可以被`template`使用，可以通过`state.username`和`state.password`获得数据的值。

## 3.Vue2 对比 Vue3 的 `methods` 编写

**Vue2** 的选项型 API 是把 methods 分割到独立的属性区域的。我们可以直接在这个属性里面添加方法来处理各种前端逻辑。

```js
export default {
	props: {
		title: String,
	},
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		login() {
			// 登陆方法
		},
	},
};
```

**Vue3** 的合成型 API 里面的`setup()`方法也是可以用来操控 methods 的。创建声名方法其实和声名数据状态是一样的。— 我们需要先声名一个方法然后在`setup()`方法中`返回(return)`， 这样我们的组件内就可以调用这个方法了。

```js
export default {
	props: {
		title: String,
	},
	setup() {
		const state = reactive({
			username: "",
			password: "",
		});

		const login = () => {
			// 登陆方法
		};
		return {
			login,
			state,
		};
	},
};
```

## 4.生命周期钩子 — `Lifecyle Hooks`

在 **Vue2**，我们可以直接在组件属性中调用 Vue 的生命周期的钩子。以下使用一个`组件已挂载（mounted）`生命周期触发钩子。

```js
export default {
	props: {
		title: String,
	},
	data() {
		return {
			username: "",
			password: "",
		};
	},
	mounted() {
		console.log("组件已挂载");
	},
	methods: {
		login() {
			// login method
		},
	},
};
```

现在 **Vue3** 的合成型 API 里面的`setup()`方法可以包含了基本所有东西。生命周期的钩子就是其中之一！

但是在 Vue3 生周期钩子不是全局可调用的了，需要另外从 vue 中引入。和刚刚引入`reactive`一样，生命周期的挂载钩子叫`onMounted`。

引入后我们就可以在`setup()`方法里面使用`onMounted`挂载的钩子了。

```js
import { reactive, onMounted } from "vue";

export default {
	props: {
		title: String,
	},
	setup() {
		// ..

		onMounted(() => {
			console.log("组件已挂载");
		});

		// ...
	},
};
```

## 5.计算属性 - `Computed Properties`

我们一起试试添加一个计算属性来转换`username`成小写字母。

在 **Vue2** 中实现，我们只需要在组件内的选项属性中添加即可

```js
export default {
	// ..
	computed: {
		lowerCaseUsername() {
			return this.username.toLowerCase();
		},
	},
};
```

**Vue3** 的设计模式给予开发者们按需引入需要使用的依赖包。这样一来就不需要多余的引用导致性能或者打包后太大的问题。Vue2 就是有这个一直存在的问题。

所以在 Vue3 使用计算属性，我们先需要在组件内引入`computed`。

使用方式就和`反应性数据（reactive data）`一样，在`state`中加入一个计算属性:

```js
import { reactive, onMounted, computed } from 'vue'

export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase())
    })

    // ...
  }
```

## 6.接收 `Props`

接收组件`props`参数传递这一块为我们带来了 Vue2 和 Vue3 之间最大的区别。**—`this`在 vue3 中与 vue2 代表着完全不一样的东西。**

在 **Vue2**，`this`代表的是当前组件，不是某一个特定的属性。所以我们可以直接使用`this`访问 prop 属性值。就比如下面的例子在挂载完成后打印处当前传入组件的参数`title`。

```js
mounted () {
    console.log('title: ' + this.title)
}
```

但是在 **Vue3** 中，`this`无法直接拿到 props 属性，emit events（触发事件）和组件内的其他属性。不过全新的`setup()`方法可以接收两个参数：

1. `props` - 不可变的组件参数
2. `context` - Vue3 暴露出来的属性（emit，slots，attrs）

所以在 Vue3 接收与使用 props 就会变成这样：

```js
setup (props) {
    // ...

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    // ...
}
```

## 7.事件 - `Emitting Events`

在 **Vue2** 中自定义事件是非常直接的，但是在 **Vue3** 的话，我们会有更多的控制的自由度。

举例，现在我们想在点击提交按钮时触发一个`login`的事件。

在 **Vue2** 中我们会调用到`this.$emit`然后传入事件名和参数对象。

```js
login () {
      this.$emit('login', {
        username: this.username,
        password: this.password
      })
 }
```

但是在 **Vue3**中，我们刚刚说过`this`已经不是和 vue2 代表着这个组件了，所以我们需要不一样的自定义事件的方式。

那怎么办呀？! ლಠ 益 ಠ)ლ

不用慌，在`setup()`中的第二个参数`content`对象中就有`emit`，这个是和`this.$emit`是一样的。那么我们只要在`setup()`接收第二个参数中使用**分解对象法**取出`emit`就可以在 setup 方法中随意使用了。

然后我们在`login`方法中编写登陆事件：

```js
setup (props, { emit }) {
    // ...

    const login = () => {
      emit('login', {
        username: state.username,
        password: state.password
      })
    }

    // ...
}
```

## 8.最终的 vue2 对比 vue3 代码

真的是太棒了，能看到这里的童鞋们，你们现在基本都看到 vue2 与 vue3 其实概念与理念都是一样的。只是有一些属性获取方式和声名和定义方式稍微变了。一直在鬼哭狼嚎的小小前端开发猿人们，你们可以松一口气了吧。

总结一下，我觉得 **Vue3** 给我们前端开发者带来了全新的开发体验，更好的使用弹性，可控度也得到了大大的提升。如果你是一个学过或者接触过 **React** 然后现在想使用 Vue 的话，应该特别兴奋，因为很多使用方式都和 React 非常相近了 ！

全新的`合成式API（Composition API）`可以提升代码的解耦程度 —— 特别是大型的前端应用，效果会更加明显。还有就是按需引用的有了更细微的可控性，让项目的性能和打包大小有更好的控制。

最后我把完成的 **Vue2** 和 **Vue3** 的组件代码发出来给大家：

**Vue2**

```vue
<template>
	<div class="form-element">
		<h2>{{ title }}</h2>
		<input type="text" v-model="username" placeholder="Username" />

		<input type="password" v-model="password" placeholder="Password" />

		<button @click="login">Submit</button>
		<p>Values: {{ username + " " + password }}</p>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
	},
	data() {
		return {
			username: "",
			password: "",
		};
	},
	mounted() {
		console.log("title: " + this.title);
	},
	computed: {
		lowerCaseUsername() {
			return this.username.toLowerCase();
		},
	},
	methods: {
		login() {
			this.$emit("login", {
				username: this.username,
				password: this.password,
			});
		},
	},
};
</script>
```

**Vue3**

```vue
<template>
	<div class="form-element">
		<h2>{{ state.title }}</h2>
		<input type="text" v-model="state.username" placeholder="Username" />

		<input type="password" v-model="state.password" placeholder="Password" />

		<button @click="login">Submit</button>
		<p>Values: {{ state.username + " " + state.password }}</p>
	</div>
</template>
<script>
import { reactive, onMounted, computed } from "vue";

export default {
	props: {
		title: String,
	},
	setup(props, { emit }) {
		const state = reactive({
			username: "",
			password: "",
			lowerCaseUsername: computed(() => state.username.toLowerCase()),
		});

		onMounted(() => {
			console.log("title: " + props.title);
		});

		const login = () => {
			emit("login", {
				username: state.username,
				password: state.password,
			});
		};

		return {
			login,
			state,
		};
	},
};
</script>
```
