# Vue.js3 响应式 API 比 2.x 好在哪儿？

参考：[Vue.js 3.0 响应式 API 比 2.x 好在哪儿？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247493060&idx=2&sn=7a8437e8a51ff84c22e4bdc7f49927aa&chksm=eb07ddbddc7054abcb8f8595d93295ac5c680581d3272e743cba3e7a5b7b4fc2c3448a632ba9&token=431470234&lang=zh_CN#rd)

为什么说 Vue.js 3 的响应式 API 实现和 Vue.js 2.x 相比性能要好，具体好在哪里呢？它又有哪些不足呢？

## 响应式实现方式

响应式原理是 Vue.js 的核心思想之一，它的本质是当数据变化后会自动执行某个函数。

响应式的实现基本都是靠数据劫持，在 Vue.js 2.x 中，是通过 `Object.defineProperty` API 劫持数据的变化，在数据被访问的时候收集依赖，然后在数据被修改的时候通知依赖更新。

而到了 Vue.js 3.0，作者使用 `Proxy` API 来劫持数据，并重写了响应式部分。

## Proxy VS Object.defineProperty

那么，`Proxy` 和 `Object.defineProperty` 有哪些区别呢？

从 API 上来看，`Proxy` 劫持的是整个对象，那么对于对象属性的新增、删除、修改自然都可以劫持到；而`Object.defineProperty` API 劫持的对象某一个属性的访问和修改，因此它不能监听对象属性新增和删除。

从兼容性上来看，`Object.defineProperty` 支持所有主流浏览器，并兼容 IE9+，而 `Proxy` 支持现代主流浏览器，但唯独不支持 IE，在国内 PC 端还没有完全放弃 IE 的大环境下，导致 Vue.js 3.0 的普及受到限制。

从性能上看，`Proxy` 比 `Object.defineProperty` 要慢。没错，是慢喔，为了测试它们的性能差异，我特地写了一个测试 demo，放在了 GitHub 上 https://github.com/ustbhuangyi/Proxy-vs-DefineProperty，感兴趣的同学可以 clone 下来跑一下。

## 性能差异

既然 `Proxy` 比 `Object.defineProperty` 慢，那么为何说 Vue.js 3.0 的响应式 API 实现和 Vue.js 2.x 相比性能要好呢？

其实这个性能好主要体现在初始化阶段。Vue.js 2.x 内部把某个对象变成响应式的时候，如果遇到对象的某个属性的值仍然是对象的时候，会递归把子对象也变成响应式。

到了 Vue.js 3.0，并不会在初始阶段递归响应式，而是在对象属性被访问的时候才递归执行下一步 `reactive`，这其实是一种延时定义子对象响应式的实现，在性能上会有较大的提升。

说到延时响应式，那么 Vue.js 2.x 也可以这么做吗，其实也是可以的，我对 Vue.js 2.x 的响应式源码部分做了修改，如下：

```js
Object.defineProperty(obj, key, {
	enumerable: true,
	configurable: true,
	get: function reactiveGetter() {
		const value = getter ? getter.call(obj) : val;
		let childOb = !shallow && observe(value);
		if (Dep.target) {
			dep.depend();
			if (childOb) {
				childOb.dep.depend();
				if (Array.isArray(value)) {
					dependArray(value);
				}
			}
		}
		return value;
	},
	// ...
});
```

改动很简单，就是把递归的 `observe` 放在了 `getter` 中执行。

改完后我跑了一下 Vue.js 的单元测试，发现只有几个测试没通过，但没通过的测试用例是因为我们改动的逻辑影响了这些测试用例原本的含义，但实际上并无本质的影响，因此在 Vue.js 2.x 中，把递归响应式的逻辑放在 `getter` 中也是可行的。

到这里你可能会问，如果延时响应式，那会不会每次访问数据的时候都要重新定义一次响应式呢，其实是不用的，在 Vue.js 2.x 中，在执行一次 `observe` 后，会把观察者对象 `ob` 保留在 `value.__ob__` 属性中；而在 Vue.js 3.0 中，会用 `reactiveMap` 保留已定义的响应式对象，这样下一次就直接从缓存里拿到对应的值了，这就是典型的空间换时间的思想。

## 总结

所以就响应式的实现而言，Vue.js 3.0 比 Vue.js 2.x 在性能上的优势主要体现在初始化阶段，不需要递归把子对象定义成响应式。

而 `Proxy` 本身并不比 `Object.defineProperty` 快，好处是在于可以直接对整个对象劫持，包括对象属性的新增和删除，劣势就是浏览器的兼容性不够好，而且没有合适的 polyfill。

我出这个题主要是希望你能做到以下两点：

1. 从源码层面探索，了解 Vue.js 响应式的实现原理。
2. 对比 Vue.js 2.x 和 Vue.js 3.0 在响应式实现上的差异。

要记住，分析和思考的过程远比答案重要。
