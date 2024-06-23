# Vue.js 性能优化技巧

Vue.js 核心成员  [Guillaume Chau](https://github.com/Akryum)  在 19 年美国的 Vue conf 分享的主题：9 Performance secrets revealed，分享中提到了九个 Vue.js 性能优化的技巧。

分享的  [PPT](https://slides.com/akryum/vueconfus-2019)，也阅读了相关的[项目源码](https://github.com/Akryum/vue-9-perf-secrets/)，在深入了解它的优化原理后，把其中一些优化技巧也应用到了我平时的工作中，取得了相当不错的效果。

分享做二次加工，详细阐述其中的优化原理，并做一定程度的扩展和延伸。

> 本文主要还是针对 Vue.js 2.x 版本

## Functional components

第一个技巧，函数式组件，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/functional "https://vue-9-perf-secrets.netlify.app/bench/functional")。

优化前的组件代码如下：

```html
<template>
	<div class="cell">
		<div v-if="value" class="on"></div>
		<section v-else class="off"></section>
	</div>
</template>

<script>
	export default { props: ["value"] };
</script>
```

优化后的组件代码如下：

```html
<template functional>
	<div class="cell">
		<div v-if="props.value" class="on"></div>
		<section v-else class="off"></section>
	</div>
</template>
```

然后我们在父组件各渲染优化前后的组件 800 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark1](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efdc43d574544231ad9012482a064ba8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark2](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2234e433d468465a8f86cb6d4420c318~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化前执行 `script` 的时间要多于优化后的，而我们知道 JS 引擎是单线程的运行机制，JS 线程会阻塞 UI 线程，所以当脚本执行时间过长，就会阻塞渲染，导致页面卡顿。而优化后的 `script` 执行时间短，所以它的性能更好。

那么，为什么用函数式组件 JS 的执行时间就变短了呢？这要从函数式组件的实现原理说起了，你可以把它理解成一个函数，它可以根据你传递的上下文数据渲染生成一片 DOM。

函数式组件和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 `patch` 过程中，如果遇到一个节点是组件 `vnode`，会递归执行子组件的初始化过程；而函数式组件的 `render` 生成的是普通的 `vnode`，不会有递归子组件的过程，因此渲染开销会低很多。

因此，函数式组件也不会有状态，不会有响应式数据，生命周期钩子函数这些东西。你可以把它当成把普通组件模板中的一部分 DOM 剥离出来，通过函数的方式渲染出来，是一种在 DOM 层面的复用。

## Child component splitting

第二个技巧，子组件拆分，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/child "https://vue-9-perf-secrets.netlify.app/bench/child")。

优化前的组件代码如下：

```html
<template>
	<div :style="{ opacity: number / 300 }">
		<div>{{ heavy() }}</div>
	</div>
</template>

<script>
	export default {
		props: ["number"],
		methods: {
			heavy() {
				const n = 100000;
				let result = 0;
				for (let i = 0; i < n; i++) {
					result += Math.sqrt(Math.cos(Math.sin(42)));
				}
				return result;
			},
		},
	};
</script>
```

优化后的组件代码如下：

```html
<template>
	<div :style="{ opacity: number / 300 }">
		<ChildComp />
	</div>
</template>

<script>
	export default {
		components: {
			ChildComp: {
				methods: {
					heavy() {
						const n = 100000;
						let result = 0;
						for (let i = 0; i < n; i++) {
							result += Math.sqrt(Math.cos(Math.sin(42)));
						}
						return result;
					},
				},
				render(h) {
					return h("div", this.heavy());
				},
			},
		},
		props: ["number"],
	};
</script>
```

然后我们在父组件各渲染优化前后的组件 300 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark3](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b0a76b6f8d246f88a54f09113ad5b60~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark4](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeabe26329304167abd019e282a25a9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化后执行 `script` 的时间要明显少于优化前的，因此性能体验更好。

那么为什么会有差异呢，我们来看优化前的组件，示例通过一个 `heavy` 函数模拟了一个耗时的任务，且这个函数在每次渲染的时候都会执行一次，所以每次组件的渲染都会消耗较长的时间执行 JavaScript。

而优化后的方式是把这个耗时任务 `heavy` 函数的执行逻辑用子组件 `ChildComp` 封装了，由于 Vue 的更新是组件粒度的，虽然每一帧都通过数据修改导致了父组件的重新渲染，但是 `ChildComp` 却不会重新渲染，因为它的内部也没有任何响应式数据的变化。所以优化后的组件不会在每次渲染都执行耗时任务，自然执行的 JavaScript 时间就变少了。

不过针对这个优化的方式我提出了一些不同的看法，详情可以点开这个 [issue](https://github.com/Akryum/vue-9-perf-secrets/issues/1 "https://github.com/Akryum/vue-9-perf-secrets/issues/1")，我认为这个场景下的优化用计算属性要比子组件拆分要好。得益于计算属性自身缓存特性，耗时的逻辑也只会在第一次渲染的时候执行，而且使用计算属性也没有额外渲染子组件的开销。

在实际工作中，使用计算属性是优化性能的场景会有很多，毕竟它也体现了一种空间换时间的优化思想。

## Local variables

第三个技巧，局部变量，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/local-var "https://vue-9-perf-secrets.netlify.app/bench/local-var")。

优化前的组件代码如下：

```html
<template>
	<div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
	export default {
		props: ["start"],
		computed: {
			base() {
				return 42;
			},
			result() {
				let result = this.start;
				for (let i = 0; i < 1000; i++) {
					result +=
						Math.sqrt(Math.cos(Math.sin(this.base))) +
						this.base * this.base +
						this.base +
						this.base * 2 +
						this.base * 3;
				}
				return result;
			},
		},
	};
</script>
```

优化后的组件代码如下：

```html
<template>
	<div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
	export default {  props: ['start'],  computed: {    base () {      return 42
	    },    result ({ base, start }) {      let result = start      for (let i = 0; i < 1000; i++) {        result += Math.sqrt(Math.cos(Math.sin(base))) + base * base + base + base * 2 + base * 3
	      }      return result    },  },}
</script>
```

然后我们在父组件各渲染优化前后的组件 300 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark5](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d6ca9cf22a4e40ae0e5edc93ac1279~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark6](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b08a4cdd60894db6a4e536a6c7160e0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化后执行 `script` 的时间要明显少于优化前的，因此性能体验更好。

这里主要是优化前后的组件的计算属性 `result` 的实现差异，优化前的组件多次在计算过程中访问 `this.base`，而优化后的组件会在计算前先用局部变量 `base`，缓存 `this.base`，后面直接访问 `base`。

那么为啥这个差异会造成性能上的差异呢，原因是你每次访问 `this.base` 的时候，由于 `this.base` 是一个响应式对象，所以会触发它的 `getter`，进而会执行依赖收集相关逻辑代码。类似的逻辑执行多了，像示例这样，几百次循环更新几百个组件，每个组件触发 `computed` 重新计算，然后又多次执行依赖收集相关逻辑，性能自然就下降了。

从需求上来说，`this.base` 执行一次依赖收集就够了，把它的 `getter` 求值结果返回给局部变量 `base`，后续再次访问 `base` 的时候就不会触发 `getter`，也不会走依赖收集的逻辑了，性能自然就得到了提升。

这是一个非常实用的性能优化技巧。因为很多人在开发 Vue.js 项目的时候，每当取变量的时候就习惯性直接写 `this.xxx` 了，因为大部分人并不会注意到访问 `this.xxx` 背后做的事情。在访问次数不多的时候，性能问题并没有凸显，但是一旦访问次数变多，比如在一个大循环中多次访问，类似示例这种场景，就会产生性能问题了。

我之前给 ZoomUI 的 Table 组件做性能优化的时候，在 `render table body` 的时候就使用了局部变量的优化技巧，并写了 benchmark 做性能对比：渲染 1000 \* 10 的表格，ZoomUI Table 的更新数据重新渲染的性能要比 ElementUI 的 Table 性能提升了近一倍。

## Reuse DOM with v-show

第四个技巧，使用 `v-show` 复用 DOM，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/hide "https://vue-9-perf-secrets.netlify.app/bench/hide")。

优化前的组件代码如下：

```html
<template functional>
	<div class="cell">
		<div v-if="props.value" class="on">
			<Heavy :n="10000" />
		</div>
		<section v-else class="off">
			<Heavy :n="10000" />
		</section>
	</div>
</template>
```

优化后的组件代码如下：

```html
<template functional>
	<div class="cell">
		<div v-show="props.value" class="on">
			<Heavy :n="10000" />
		</div>
		<section v-show="!props.value" class="off">
			<Heavy :n="10000" />
		</section>
	</div>
</template>
```

然后我们在父组件各渲染优化前后的组件 200 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark7](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6572d2ab8f647a8a24e8f8c95320288~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark8](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/350cd2452aae4455a24c441bcc25f886~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化后执行 `script` 的时间要明显少于优化前的，因此性能体验更好。

优化前后的主要区别是用 `v-show` 指令替代了 `v-if` 指令来替代组件的显隐，虽然从表现上看，`v-show` 和 `v-if` 类似，都是控制组件的显隐，但内部实现差距还是很大的。

`v-if` 指令在编译阶段就会编译成一个三元运算符，条件渲染，比如优化前的组件模板经过编译后生成如下渲染函数：

```js
function render() {
	with (this) {
		return _c(
			"div",
			{
				staticClass: "cell",
			},
			[
				props.value
					? _c(
							"div",
							{
								staticClass: "on",
							},
							[
								_c("Heavy", {
									attrs: {
										n: 10000,
									},
								}),
							],
							1
					  )
					: _c(
							"section",
							{
								staticClass: "off",
							},
							[
								_c("Heavy", {
									attrs: {
										n: 10000,
									},
								}),
							],
							1
					  ),
			]
		);
	}
}
```

当条件 `props.value` 的值变化的时候，会触发对应的组件更新，对于 `v-if` 渲染的节点，由于新旧节点 `vnode` 不一致，在核心 diff 算法比对过程中，会移除旧的 `vnode` 节点，创建新的 `vnode` 节点，那么就会创建新的 `Heavy` 组件，又会经历 `Heavy` 组件自身初始化、渲染 `vnode`、`patch` 等过程。

因此使用 `v-if` 每次更新组件都会创建新的 `Heavy` 子组件，当更新的组件多了，自然就会造成性能压力。

而当我们使用 `v-show` 指令，优化后的组件模板经过编译后生成如下渲染函数：

```js
function render() {
	with (this) {
		return _c(
			"div",
			{
				staticClass: "cell",
			},
			[
				_c(
					"div",
					{
						directives: [
							{
								name: "show",
								rawName: "v-show",
								value: props.value,
								expression: "props.value",
							},
						],
						staticClass: "on",
					},
					[
						_c("Heavy", {
							attrs: {
								n: 10000,
							},
						}),
					],
					1
				),
				_c(
					"section",
					{
						directives: [
							{
								name: "show",
								rawName: "v-show",
								value: !props.value,
								expression: "!props.value",
							},
						],
						staticClass: "off",
					},
					[
						_c("Heavy", {
							attrs: {
								n: 10000,
							},
						}),
					],
					1
				),
			]
		);
	}
}
```

当条件 `props.value` 的值变化的时候，会触发对应的组件更新，对于 `v-show` 渲染的节点，由于新旧 `vnode` 一致，它们只需要一直 `patchVnode` 即可，那么它又是怎么让 DOM 节点显示和隐藏的呢？

原来在 `patchVnode` 过程中，内部会对执行 `v-show` 指令对应的钩子函数 `update`，然后它会根据 `v-show` 指令绑定的值来设置它作用的 DOM 元素的 `style.display` 的值控制显隐。

因此相比于 `v-if` 不断删除和创建函数新的 DOM，`v-show` 仅仅是在更新现有 DOM 的显隐值，所以 `v-show` 的开销要比 `v-if` 小的多，当其内部 DOM 结构越复杂，性能的差异就会越大。

但是 `v-show` 相比于 `v-if` 的性能优势是在组件的更新阶段，如果仅仅是在初始化阶段，`v-if` 性能还要高于 `v-show`，原因是在于它仅仅会渲染一个分支，而 `v-show` 把两个分支都渲染了，通过 `style.display` 来控制对应 DOM 的显隐。

在使用 `v-show` 的时候，所有分支内部的组件都会渲染，对应的生命周期钩子函数都会执行，而使用 `v-if` 的时候，没有命中的分支内部的组件是不会渲染的，对应的生命周期钩子函数都不会执行。

因此你要搞清楚它们的原理以及差异，才能在不同的场景使用适合的指令。

## KeepAlive

第五个技巧，使用 `KeepAlive` 组件缓存 DOM，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/keep-alive/ "https://vue-9-perf-secrets.netlify.app/bench/keep-alive/")。

优化前的组件代码如下：

```html
<template>
	<div id="app">
		<router-view />
	</div>
</template>
```

优化后的组件代码如下：

```html
<template>
	<div id="app">
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
</template>
```

我们点击按钮在 Simple page 和 Heavy Page 之间切换，会渲染不同的视图，其中 Heavy Page 的渲染非常耗时。我们开启 Chrome 的 Performance 面板记录它们的性能，然后分别在优化前后执行如上的操作，会得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark9](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3f7a60981d44d268f801b8d752815d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

![bpfcp-zoom-in-crop-mark10](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c1d249d0d0149d587b8a94ecd1d37eb~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark11](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8da716157c8045c3a189526f37d2c1ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

![bpfcp-zoom-in-crop-mark12](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7470877578c84caf82996a45ebc965f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化后执行 `script` 的时间要明显少于优化前的，因此性能体验更好。

在非优化场景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件，渲染组件就会经过组件初始化，`render`、`patch` 等过程，如果组件比较复杂，或者嵌套较深，那么整个渲染耗时就会很长。

而在使用 `KeepAlive` 后，被 `KeepAlive` 包裹的组件在经过第一次渲染后，的 `vnode` 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 `vnode` 和 DOM，然后渲染，并不需要再走一次组件初始化，`render` 和 `patch` 等一系列流程，减少了 `script` 的执行时间，性能更好。

但是使用 `KeepAlive` 组件并非没有成本，因为它会占用更多的内存去做缓存，这是一种典型的空间换时间优化思想的应用。

## Deferred features

第六个技巧，使用 `Deferred` 组件延时分批渲染组件，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/deferred "https://vue-9-perf-secrets.netlify.app/bench/deferred")。

优化前的组件代码如下：

```html
<template>
	<div class="deferred-off">
		<VueIcon icon="fitness_center" class="gigantic" />

		<h2>I'm an heavy page</h2>

		<Heavy v-for="n in 8" :key="n" />

		<Heavy class="super-heavy" :n="9999999" />
	</div>
</template>
```

优化后的组件代码如下：

```html
<template>
	<div class="deferred-on">
		<VueIcon icon="fitness_center" class="gigantic" />

		<h2>I'm an heavy page</h2>

		<template v-if="defer(2)">
			<Heavy v-for="n in 8" :key="n" />
		</template>

		<Heavy v-if="defer(3)" class="super-heavy" :n="9999999" />
	</div>
</template>

<script>
	import Defer from "@/mixins/Defer";

	export default { mixins: [Defer()] };
</script>
```

我们点击按钮在 Simple page 和 Heavy Page 之间切换，会渲染不同的视图，其中 Heavy Page 的渲染非常耗时。我们开启 Chrome 的 Performance 面板记录它们的性能，然后分别在优化前后执行如上的操作，会得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark13](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3ee73d2f8c64f8bbd90579ce81b67d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark14](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c341c560d4a4c7897565b2fb9ae9d73~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以发现，优化前当我们从 Simple Page 切到 Heavy Page 的时候，在一次 Render 接近结尾的时候，页面渲染的仍然是 Simple Page，会给人一种页面卡顿的感觉。而优化后当我们从 Simple Page 切到 Heavy Page 的时候，在一次 Render 靠前的位置页面就已经渲染了 Heavy Page 了，并且 Heavy Page 是渐进式渲染出来的。

优化前后的差距主要是后者使用了 `Defer` 这个 `mixin`，那么它具体是怎么工作的，我们来一探究竟：

```js
export default function (count = 10) {
	return {
		data() {
			return {
				displayPriority: 0,
			};
		},

		mounted() {
			this.runDisplayPriority();
		},

		methods: {
			runDisplayPriority() {
				const step = () => {
					requestAnimationFrame(() => {
						this.displayPriority++;
						if (this.displayPriority < count) {
							step();
						}
					});
				};
				step();
			},

			defer(priority) {
				return this.displayPriority >= priority;
			},
		},
	};
}
```

`Defer` 的主要思想就是把一个组件的一次渲染拆成多次，它内部维护了 `displayPriority` 变量，然后在通过 `requestAnimationFrame` 在每一帧渲染的时候自增，最多加到 `count`。然后使用 `Defer mixin` 的组件内部就可以通过 `v-if="defer(xxx)"` 的方式来控制在 `displayPriority` 增加到 `xxx` 的时候渲染某些区块了。

当你有渲染耗时的组件，使用 `Deferred` 做渐进式渲染是不错的注意，它能避免一次 `render` 由于 JS 执行时间过长导致渲染卡住的现象。

## Time slicing

第七个技巧，使用 `Time slicing` 时间片切割技术，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/fetch-items "https://vue-9-perf-secrets.netlify.app/bench/fetch-items")。

优化前的代码如下：

```js
fetchItems ({ commit }, { items }) {
  commit('clearItems')
  commit('addItems', items)
}
```

优化后的代码如下：

```js
fetchItems ({ commit }, { items, splitCount }) {
  commit('clearItems')
  const queue = new JobQueue()
  splitArray(items, splitCount).forEach(
    chunk => queue.addJob(done => {
      // 分时间片提交数据
      requestAnimationFrame(() => {
        commit('addItems', chunk)
        done()
      })
    })
  )
  await queue.start()
}
```

我们先通过点击 `Genterate items` 按钮创建 10000 条假数据，然后分别在开启和关闭 `Time-slicing` 的情况下点击 `Commit items` 按钮提交数据，开启 Chrome 的 Performance 面板记录它们的性能，会得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark15](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e8d91db10e04e4a8992343227e52eaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark16](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5703007e2ab47ccba80107166fce5b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以发现，优化前总的 `script` 执行时间要比优化后的还要少一些，但是从实际的观感上看，优化前点击提交按钮，页面会卡死 1.2 秒左右，在优化后，页面不会完全卡死，但仍然会有渲染卡顿的感觉。

那么为什么在优化前页面会卡死呢？因为一次性提交的数据过多，内部 JS 执行时间过长，阻塞了 UI 线程，导致页面卡死。

优化后，页面仍有卡顿，是因为我们拆分数据的粒度是 1000 条，这种情况下，重新渲染组件仍然有压力，我们观察 fps 只有十几，会有卡顿感。通常只要让页面的 fps 达到 60，页面就会非常流畅，如果我们把数据拆分粒度变成 100 条，基本上 fps 能达到 50 以上，虽然页面渲染变流畅了，但是完成 10000 条数据总的提交时间还是变长了。

使用 `Time slicing` 技术可以避免页面卡死，通常我们在这种耗时任务处理的时候会加一个 loading 效果，在这个示例中，我们可以开启 `loading animation`，然后提交数据。对比发现，优化前由于一次性提交数据过多，JS 一直长时间运行，阻塞 UI 线程，这个 loading 动画是不会展示的，而优化后，由于我们拆成多个时间片去提交数据，单次 JS 运行时间变短了，这样 loading 动画就有机会展示了。

> 这里要注意的一点，虽然我们拆时间片使用了 `requestAnimationFrame` API，但是使用 `requestAnimationFrame` 本身是不能保证满帧运行的，`requestAnimationFrame` 保证的是在浏览器每一次重绘后会执行对应传入的回调函数，想要保证满帧，只能让 JS 在一个 Tick 内的运行时间不超过 17ms。

## Non-reactive data

第八个技巧，使用 `Non-reactive data` 非响应式数据，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/fetch-items "https://vue-9-perf-secrets.netlify.app/bench/fetch-items")。

优化前代码如下：

```js
const data = items.map((item) => ({
	id: uid++,
	data: item,
	vote: 0,
}));
```

优化后代码如下：

```js
const data = items.map((item) => optimizeItem(item));

function optimizeItem(item) {
	const itemData = {
		id: uid++,
		vote: 0,
	};
	Object.defineProperty(itemData, "data", {
		// Mark as non-reactive
		configurable: false,
		value: item,
	});
	return itemData;
}
```

还是前面的示例，我们先通过点击 `Genterate items` 按钮创建 10000 条假数据，然后分别在开启和关闭 `Partial reactivity` 的情况下点击 `Commit items` 按钮提交数据，开启 Chrome 的 Performance 面板记录它们的性能，会得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark17](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eacf438389084a5f89869a5247b0b966~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark18](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d4f407d94b8470184721473028890b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们可以看到优化后执行 `script` 的时间要明显少于优化前的，因此性能体验更好。

之所以有这种差异，是因为内部提交的数据的时候，会默认把新提交的数据也定义成响应式，如果数据的子属性是对象形式，还会递归让子属性也变成响应式，因此当提交数据很多的时候，这个过程就变成了一个耗时过程。

而优化后我们把新提交的数据中的对象属性 `data` 手动变成了 `configurable` 为 `false`，这样内部在 `walk` 时通过 `Object.keys(obj)` 获取对象属性数组会忽略 `data`，也就不会为 `data` 这个属性 `defineReactive`，由于 `data` 指向的是一个对象，这样也就会减少递归响应式的逻辑，相当于减少了这部分的性能损耗。数据量越大，这种优化的效果就会更明显。

其实类似这种优化的方式还有很多，比如我们在组件中定义的一些数据，也不一定都要在 `data` 中定义。有些数据我们并不是用在模板中，也不需要监听它的变化，只是想在组件的上下文中共享这个数据，这个时候我们可以仅仅把这个数据挂载到组件实例 `this` 上，例如：

```js
export default {
	created() {
		this.scroll = null;
	},
	mounted() {
		this.scroll = new BScroll(this.$el);
	},
};
```

这样我们就可以在组件上下文中共享 `scroll` 对象了，尽管它不是一个响应式对象。

## Virtual scrolling

第九个技巧，使用 `Virtual scrolling` 虚拟滚动组件，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/fetch-items "https://vue-9-perf-secrets.netlify.app/bench/fetch-items")。

优化前组件的代码如下：

```html
<div class="items no-v">
	<FetchItemViewFunctional
		v-for="item of items"
		:key="item.id"
		:item="item"
		@vote="voteItem(item)"
	/>
</div>
```

优化后代码如下：

```html
<recycle-scroller class="items" :items="items" :item-size="24">
	<template v-slot="{ item }">
		<FetchItemView :item="item" @vote="voteItem(item)" />
	</template>
</recycle-scroller>
```

还是前面的示例，我们需要开启 `View list`，然后点击 `Genterate items` 按钮创建 10000 条假数据（注意，线上示例最多只能创建 1000 条数据，实际上 1000 条数据并不能很好地体现优化的效果，所以我修改了源码的限制，本地运行，创建了 10000 条数据），然后分别在 `Unoptimized` 和 `RecycleScroller` 的情况下点击 `Commit items` 按钮提交数据，滚动页面，开启 Chrome 的 Performance 面板记录它们的性能，会得到如下结果。

优化前：

![bpfcp-zoom-in-crop-mark19](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f3a130b890e444081394979a11c5752~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

优化后：

![bpfcp-zoom-in-crop-mark20](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28c2abc800ee4caf9f5529e83370ba3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比这两张图我们发现，在非优化的情况下，10000 条数据在滚动情况下 fps 只有个位数，在非滚动情况下也就十几，原因是非优化场景下渲染的 DOM 太多，渲染本身的压力很大。优化后，即使 10000 条数据，在滚动情况下的 fps 也能有 30 多，在非滚动情况下可以达到 60 满帧。

之所以有这个差异，是因为虚拟滚动的实现方式，是只渲染视口内的 DOM，这样总共渲染的 DOM 数量就很少了，自然性能就会好很多。

虚拟滚动组件也是 [Guillaume Chau](https://github.com/Akryum "https://github.com/Akryum") 写的，感兴趣的同学可以去研究它的[源码实现](https://github.com/Akryum/vue-virtual-scroller "https://github.com/Akryum/vue-virtual-scroller")。它的基本原理就是监听滚动事件，动态更新需要显示的 DOM 元素，计算出它们在视图中的位移。

虚拟滚动组件也并非没有成本，因为它需要在滚动的过程中实时去计算，所以会有一定的 `script` 执行的成本。因此如果列表的数据量不是很大的情况，我们使用普通的滚动就足够了。

---

## Vue 应用性能优化指南：[Vue 应用性能优化指南 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903677262561293)

得益于 Vue 的 **响应式系统** 和 **虚拟 DOM 系统** ，Vue 在渲染组件的过程中能自动追踪数据的依赖，并精确知晓数据更新的时候哪个组件需要重新渲染，渲染之后也会经过虚拟 DOM diff 之后才会真正更新到 DOM 上，Vue 应用的开发者**一般不需要**做额外的优化工作。

但在实践中仍然有可能遇到性能问题，下面会介绍一些定位分析 Vue 应用性能问题的方式及一些优化的建议。

![Vue 应用运行原理](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d789e70497~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

整体内容由三部分组成：

- 如何定位 Vue 应用性能问题
- Vue 应用运行时性能优化建议
- Vue 应用加载性能优化建议

### 1. 如何定位 Vue 应用性能问题

Vue 应用的性能问题可以分为两个部分，第一部分是运行时性能问题，第二部分是加载性能问题。

和其他 web 应用一样，定位 Vue 应用性能问题最好的工具是 Chrome Devtool，通过 Performance 工具可以用来录制一段时间的 CPU 占用、内存占用、FPS 等运行时性能问题，通过 Network 工具可以用来分析加载性能问题。

![bpfcp-zoom-in-crop-mark21](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d789fc7786~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

例如，通过 Performance 工具的 Bottom Up 标签我们可以看出一段时间内耗时最多的操作，这对于优化 CPU 占用和 FPS 过低非常有用，可以看出最为耗时的操作发生在哪里，可以知道具体函数的执行时间，定位到瓶颈之后，我们就可以做一些针对性的优化。

![bpfcp-zoom-in-crop-mark22](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d7dc70634d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

更多 Chrome Devtool 使用方式请参考[使用 Chrome Devtool 定位性能问题 的指南](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)

### 2. Vue 应用运行时性能优化建议

运行时性能主要关注 Vue 应用初始化之后对 CPU、内存、本地存储等资源的占用，以及对用户交互的及时响应。下面是一些有用的优化手段：

#### 2.1 引入生产环境的 Vue 文件

开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句没有用，反而会增加应用的体积。有些警告检查还有一些小的**运行时开销**。

当使用 webpack 或 Browserify 类似的构建工具时，Vue 源码会根据 process.env.NODE_ENV 决定是否启用生产环境模式，默认情况为开发环境模式。在 webpack 与 Browserify 中都有方法来覆盖此变量，以启用 Vue 的生产环境模式，同时在构建过程中警告语句也会被压缩工具去除。

详细的做法请参阅 [生产环境部署](https://cn.vuejs.org/v2/guide/deployment.html)

#### 2.2 使用单文件组件预编译模板

当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在**运行时被编译为渲染函数**。通常情况下这个过程已经足够快了，但**对性能敏感的应用还是最好避免这种用法**。

预编译模板最简单的方式就是使用**单文件组件**——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。

详细的做法请参阅 [预编译模板](https://cn.vuejs.org/v2/guide/deployment.html#%E6%A8%A1%E6%9D%BF%E9%A2%84%E7%BC%96%E8%AF%91)

#### 2.3 提取组件的 CSS 到单独到文件

当使用单文件组件时，组件内的 CSS 会以 `<style>` 标签的方式通过 JavaScript 动态注入。这有一些小小的**运行时开销**，将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存。

查阅这个构建工具各自的文档来了解更多：

- [webpack + vue-loader](https://vue-loader.vuejs.org/zh-cn/configurations/extract-css.html) (`vue-cli` 的 webpack 模板已经预先配置好)
- [Browserify + vueify](https://github.com/vuejs/vueify#css-extraction)
- [Rollup + rollup-plugin-vue](https://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=custom-handler)

#### 2.4 利用`Object.freeze()`提升性能

`Object.freeze()` 可以冻结一个对象，冻结之后不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

当你把一个普通的 JavaScript 对象传给 Vue 实例的  `data`  选项，Vue 将遍历此对象所有的属性，并使用  [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)  把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

但 Vue 在遇到像 `Object.freeze()` 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter 等数据劫持的方法。[参考 Vue 源码](https://github.com/vuejs/vue/blob/v2.5.17/src/core/observer/index.js?1535281657346#L134)

**Vue observer 源码**：

![bpfcp-zoom-in-crop-mark23](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d7dc90f5c1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

##### 2.4.1 性能提升效果对比

在基于 Vue 的一个 [big table benchmark](https://github.com/vuejs/vue/blob/v2.5.17/benchmarks/big-table/index.html?1535282017690) 里，可以看到在渲染一个一个 1000 x 10 的表格的时候，开启`Object.freeze()` 前后重新渲染的对比。

**big table benchmark**：

![bpfcp-zoom-in-crop-mark24](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d78d944dde~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**开启优化之前**：

![bpfcp-zoom-in-crop-mark25](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c5feaccc752d5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**开启优化之后**：

![bpfcp-zoom-in-crop-mark26](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c5feadd555c81~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

在这个例子里，**使用了 `Object.freeze()`比不使用快了 4 倍**

##### 2.4.2 为什么`Object.freeze()` 的性能会更好

**不使用`Object.freeze()` 的 CPU 开销**

![bpfcp-zoom-in-crop-mark27](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d7c41b64bf~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**使用 `Object.freeze()`的 CPU 开销**

![bpfcp-zoom-in-crop-mark28](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d7fdffa474~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

对比可以看出，使用了 `Object.freeze()` 之后，减少了 observer 的开销。

##### 2.4.3 `Object.freeze()`应用场景

由于 `Object.freeze()` 会把对象冻结，所以比较适合展示类的场景，如果你的数据属性需要改变，可以重新替换成一个新的 `Object.freeze()`的对象。

#### 2.5 扁平化 Store 数据结构

很多时候，我们会发现接口返回的信息是如下的深层嵌套的树形结构：

```json
{
	"id": "123",
	"author": {
		"id": "1",
		"name": "Paul"
	},
	"title": "My awesome blog post",
	"comments": [
		{
			"id": "324",
			"commenter": {
				"id": "2",
				"name": "Nicole"
			}
		}
	]
}
```

假如直接把这样的结构存储在 store 中，如果想修改某个 commenter 的信息，我们需要一层层去遍历找到这个用户的信息，同时有可能这个用户的信息出现了多次，还需要把其他地方的用户信息也进行修改，每次遍历的过程会带来额外的性能开销。

假设我们把用户信息在 store 内统一存放成 `users[id]`这样的结构，修改和读取用户信息的成本就变得非常低。

你可以手动去把接口里的信息通过类似数据的表一样像这样存起来，也可以借助一些工具，这里就需要提到一个概念叫做 `JSON数据规范化（normalize）`, Normalizr 是一个开源的工具，可以将上面的深层嵌套的 JSON 对象通过定义好的 schema 转变成使用 id 作为字典的实体表示的对象。

举个例子，针对上面的 JSON 数据，我们定义 `users` `comments` `articles` 三种 schema：

```php
import {normalize, schema} from 'normalizr';

// 定义 users schema
const user = new schema.Entity('users');

// 定义 comments schema
const comment = new schema.Entity('comments', {
  commenter: user,
});

// 定义 articles schema
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment],
});

const normalizedData = normalize(originalData, article);
```

normalize 之后就可以得到下面的数据，我们可以按照这种形式存放在 store 中，之后想修改和读取某个 id 的用户信息就变得非常高效了，时间复杂度降低到了 O(1)。

```css
{
  result: "123",
  entities: {
    "articles": {
      "123": {
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "Paul" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
```

需要了解更多请参考 normalizr 的文档 [https://github.com/paularmstrong/normalizr](https://github.com/paularmstrong/normalizr)

#### 2.6 避免持久化 Store 数据带来的性能问题

当你有让 Vue App 离线可用，或者有接口出错时候进行灾备的需求的时候，你可能会选择把 Store 数据进行持久化，这个时候需要注意以下几个方面：

##### 2.6.1 持久化时写入数据的性能问题

Vue 社区中比较流行的 vuex-persistedstate，利用了 store 的 subscribe 机制，来订阅 Store 数据的 mutation，如果发生了变化，就会写入 storage 中，默认用的是 localstorage 作为持久化存储。

也就是说默认情况下每次 commit 都会向 localstorage 写入数据，localstorage 写入是同步的，而且存在不小的性能开销，如果你想打造 60fps 的应用，就必须避免频繁写入持久化数据

下面是开发环境下通过 Performance 工具抓取的一个截图，可以看到出现了一次长达 6s 的卡顿：

**6 秒钟的卡顿**：

![bpfcp-zoom-in-crop-mark29](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d84795d172~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

通过 Bottom-Up 可以看到 setState 占用了 3241.4ms 的 CPU 执行时间，而 setState 正是在向 Storage 写入数据。

**vuex-persistedstate setState 源码**：

![bpfcp-zoom-in-crop-mark30](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d847a933ca~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

我们应该尽量减少直接写入 Storage 的频率：

- 多次写入操作合并为一次，比如采用函数节流或者将数据先缓存在内存中，最后在一并写入
- 只有在必要的时候才写入，比如只有关心的模块的数据发生变化的时候才写入

##### 2.6.2 避免持久化存储的容量持续增长

由于持久化缓存的容量有限，比如 localstorage 的缓存在某些浏览器只有 5M，我们不能无限制的将所有数据都存起来，这样很容易达到容量限制，同时数据过大时，读取和写入操作会增加一些性能开销，同时内存也会上涨。

尤其是将 API 数据进行 normalize 数据扁平化后之后，会将一份数据散落在不同的实体上，下次请求到新的数据也会散落在其他不同的实体上，这样会带来持续的存储增长。

因此，当设计了一套持久化的数据缓存策略的时候，同时应该设计旧数据的缓存清除策略，例如请求到新数据的时候将旧的实体逐个进行清除。

#### 2.7 优化无限列表性能

如果你的应用存在非常长或者无限滚动的列表，那么采用 **窗口化** 的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间。

[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list) 和 [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 都是解决这类问题的开源项目。你也可以参考 Google 工程师的文章[Complexities of an Infinite Scroller](https://developers.google.com/web/updates/2016/07/infinite-scroller) 来尝试自己实现一个虚拟的滚动列表来优化性能，主要使用到的技术是 DOM 回收、墓碑元素和滚动锚定。

**Google 工程师绘制的无限列表设计**：

![bpfcp-zoom-in-crop-mark：3024](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d8478b24bf~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 2.8 通过组件懒加载优化超长应用内容初始渲染性能

上面提到的无限列表的场景，比较适合列表内元素非常相似的情况，不过有时候，你的 Vue 应用的超长列表内的内容往往不尽相同，例如在一个复杂的应用的主界面中，整个主界面由非常多不同的模块组成，而用户看到的往往只有首屏一两个模块。在初始渲染的时候不可见区域的模块也会执行和渲染，带来一些额外的性能开销。

**使用组件懒加载在不可见时只需要渲染一个骨架屏，不需要真正渲染组件**：

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c5feaf23067e1~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

你可以对组件直接进行懒加载，对于不可见区域的组件内容，直接不进行加载和初始化，避免初始化渲染运行时的开销。具体可以参考我们之前的专栏文章 [性能优化之组件懒加载: Vue Lazy Component 介绍](https://juejin.cn/post/6844903496102199304)，了解如何做到组件粒度的懒加载。

### 3. Vue 应用加载性能优化建议

#### 3.1 利用服务端渲染（SSR）和预渲染（Prerender）来优化加载性能

在一个单页应用中，往往只有一个 html 文件，然后根据访问的 url 来匹配对应的路由脚本，动态地渲染页面内容。单页应用比较大的问题是首屏可见时间过长。

单页面应用显示一个页面会发送多次请求，第一次拿到 html 资源，然后通过请求再去拿数据，再将数据渲染到页面上。而且由于现在微服务架构的存在，还有可能发出多次数据请求才能将网页渲染出来，每次数据请求都会产生 RTT（往返时延），会导致加载页面的时间拖的很长。

**服务端渲染、预渲染和客户端渲染的对比**：

![bpfcp-zoom-in-crop-mark31](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/10/165c22d84c84cebf~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

这种情况下可以采用服务端渲染（SSR）和预渲染（Prerender）来提升加载性能，这两种方案，用户读取到的直接就是网页内容，由于少了节省了很多 RTT（往返时延），同时，还可以对一些资源内联在页面，可以进一步提升加载的性能。

可以参考我们的专栏文章 [优化向：单页应用多路由预渲染指南](https://juejin.cn/post/6844903503362523143) 了解如何利用预渲染进行优化。

服务端渲染（SSR）可以考虑使用 Nuxt 或者按照 Vue 官方提供的 [Vue SSR 指南](https://ssr.vuejs.org/zh/)来一步步搭建。

#### 3.2 通过组件懒加载优化超长应用内容加载性能

在上面提到的超长应用内容的场景中，通过组件懒加载方案可以优化初始渲染的运行性能，其实，这对于优化应用的加载性能也很有帮助。

组件粒度的懒加载结合异步组件和 webpack 代码分片，可以保证按需加载组件，以及组件依赖的资源、接口请求等，比起通常单纯的对图片进行懒加载，更进一步的做到了按需加载资源。

**使用组件懒加载之前的请求瀑布图**：

![bpfcp-zoom-in-crop-mark32](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c5feb03e51a44~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**使用组件懒加载之后的请求瀑布图**：

![bpfcp-zoom-in-crop-mark33](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c5feb14c9cd5c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

使用组件懒加载方案对于超长内容的应用初始化渲染很有帮助，可以减少大量必要的资源请求，缩短渲染关键路径，具体做法请参考我们之前的专栏文章 [性能优化之组件懒加载: Vue Lazy Component 介绍](https://juejin.cn/post/6844903496102199304)。

### 总结

本文总结了 Vue 应用运行时以及加载时的一些性能优化措施，下面做一个回顾和概括：

- Vue 应用运行时性能优化措施

  - 引入生产环境的 Vue 文件
  - 使用单文件组件预编译模板
  - 提取组件的 CSS 到单独到文件
  - 利用`Object.freeze()`提升性能
  - 扁平化 Store 数据结构
  - 合理使用持久化 Store 数据
  - 组件懒加载

- Vue 应用加载性能优化措施

  - 服务端渲染 / 预渲染
  - 组件懒加载
