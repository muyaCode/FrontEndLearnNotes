# 理解组件的概念(vue 和 react 的源码原理探索)

不同框架、工具对组件的定义和实现各不相同，但可以用一句话来概括它们对组件的定义： 组件就是基于视图的模块 。

组件的核心任务就是将数据渲染到视图并监听用户在视图上的操作。

我们以主流的 Vue 2.6 和 React 16.13 的源码为例，讲解较为复杂的数据渲染到视图的实现过程。

#### 视图

虽然 Vue 和 React 在编写组件视图的方式上有所不同，前者采用模板语言，更偏向于 HTML 语法，后者推荐使用语法糖 JSX，更偏向于 JavaScript 语法，但两者都是浏览器所无法直接识别的，所以都需要通过编译器转换成对应的可执行代码。下面来看看它们的实现。

##### Vue2.6

Vue 的模板编译器可分为 3 步：解析、优化、生成代码。

###### 1.解析

解析过程包括 词法分析 和 语法分析 ，其中词法分析是将字符串转化成令牌。Vue 有 3 个词法分析器，分别是 parseText()、parseFilter() 和 parseHTML()，其中 parseHTML() 用来解析视图模板字符串，词法分析的方式也是通过 while 循环截取视图模板字符串来实现的，下面的代码是截取的部分源码。

```js
while (html) {
	if (!lastTag || !isPlainTextElement(lastTag)) {
		let textEnd = html.indexOf("<");
		if (textEnd === 0) {
			if (comment.test(html)) {
				const commentEnd = html.indexOf("-->");
				if (commentEnd >= 0) {
					if (options.shouldKeepComment) {
						options.comment(
							html.substring(4, commentEnd),
							index,
							index + commentEnd + 3
						);
					}
					advance(commentEnd + 3);
					continue;
				}
			}
			if (conditionalComment.test(html)) {
				if (conditionalEnd >= 0) {
					advance(conditionalEnd + 2);
					continue;
				}
			}
		}
	}
}
function advance(n) {
	index += n;
	html = html.substring(n);
}
```

编译器在调用 parseHTML() 函数时，还传入了一个回调函数 start()，让 parseHTML() 在进行词法分析时的同时通过调用 start() 函数将令牌传给编译器进行语法分析，最终生成 AST，如下所示。

```js
parseHTML(template, {
	start(tag, attrs, unary, start, end) {
		const ns =
			(currentParent && currentParent.ns) || platformGetTagNamespace(tag);
		if (isIE && ns === "svg") {
			attrs = guardIESVGBug(attrs);
		}
		let element: ASTElement = createASTElement(tag, attrs, currentParent);
		if (ns) {
			element.ns = ns;
		}
		for (let i = 0; i < preTransforms.length; i++) {
			element = preTransforms[i](element, options) || element;
		}
		if (!inVPre) {
			processPre(element);
			if (element.pre) {
				inVPre = true;
			}
		}
		if (platformIsPreTag(element.tag)) {
			inPre = true;
		}
		if (inVPre) {
			processRawAttrs(element);
		} else if (!element.processed) {
			processFor(element);
			processIf(element);
			processOnce(element);
		}
		if (!unary) {
			currentParent = element;
			stack.push(element);
		} else {
			closeElement(element);
		}
	},
});
```

![生成的 AST 结构示例图](../img/生成的 AST 结构示例图.png)

生成的 AST 结构示例图

###### 2.优化

Vue 并没有直接使用生成的 AST，而是进行一个优化操作。优化操作的目的就是将那些不会发生变化的静态 AST 节点进行标记，避免每次更新视图的时候操作它们。

```js
function markStaticRoots(node: ASTNode, isInFor: boolean) {
	if (node.type === 1) {
		if (node.static || node.once) {
			node.staticInFor = isInFor;
		}
		if (
			node.static &&
			node.children.length &&
			!(node.children.length === 1 && node.children[0].type === 3)
		) {
			node.staticRoot = true;
			return;
		} else {
			node.staticRoot = false;
		}
		if (node.children) {
			for (let i = 0, l = node.children.length; i < l; i++) {
				markStaticRoots(node.children[i], isInFor || !!node.for);
			}
		}
		if (node.ifConditions) {
			for (let i = 1, l = node.ifConditions.length; i < l; i++) {
				markStaticRoots(node.ifConditions[i].block, isInFor);
			}
		}
	}
}
```

###### 3.生成代码

编译的最后一步就是将优化后的 AST 转化成可执行的代码。这个转化的过程就是遍历 AST，然后判断节点类型，按照元素、指令解析成对应可执行的 JS 代码。

Vue 中的编译根据不同平台有所区别，下面是浏览器端的编译部分代码。

// 视图模板

```html
<div id="app">
  <h1>Hello {{text}}</h1>
  <span v-bind:id="message">
</div>
```

// 可执行的 js 代码

```js
"with(this){return _c('div',{attrs:{"id":"app"}},[_c('h1',[_v("Hello "+_s(text))]),_v(" "),_c('span',{attrs:{"id":message}})])}"
```

##### React 16.13

React 组件视图则使用 JS 的语法糖 jsx 来编写（不用 jsx 也可以编写组件），这种语法糖其实就是混合了 HTML 和 JS 两种语言，浏览器也是无法直接识别的，所以用到了 babel 及其插件 babel-plugin-transform-react-jsx 对 jsx 进行预编译，编译步骤和之前提到的基本一致，这里就不再赘述了。

#### 延伸 1：虚拟 DOM 是用来提升性能的吗？

虽然 Vue 和 React 有着种种差异，但在某些地方达成了共识，比如都使用了虚拟 DOM 技术。对于使用过 React 或 Vue 的同学对虚拟 DOM 应该不陌生，其实就是 JavaScript 用来模拟真实 DOM 的数据对象。

DOM 的作用有以下两个。

- **优化性能** 。DOM 操作是比较耗时的，对于大量、频繁的 DOM 操作，如果先在 JavaScript 中模拟进行，然后再通过计算比对，找到真正需要更新的节点，这样就有可能减少不必要的 DOM 操作，从而提升渲染性能。但并不是所有的 DOM 操作都能通过虚拟 DOM 提升性能，比如单次删除某个节点，直接操作 DOM 肯定比虚拟 DOM 计算比对之后再删除要快。总体而言， 虚拟 DOM 提升了 DOM 操作的性能下限，降低了 DOM 操作的性能上限。 所以会看到一些对渲染性能要求比较高的场景，比如在线文档、表格编辑，还是会使用原生 DOM 操作。
- **跨平台** 。由于虚拟 DOM 以 JavaScript 对象为基础，所以可根据不同的运行环境进行代码转换（比如浏览器、服务端、原生应用等），这使得它具有了跨平台的能力。

#### 数据模型

虽然组件屏蔽了 DOM 操作，但提供了数据模型作为操作接口。下面来看看 Vue 和 React 组件的另一个要素“数据模型”。

##### Vue 2.6

Vue 组件内部提供了一个值为函数的 data 属性，调用这个函数时会返回一个对象。下面的代码分别在组件声明时将 data 属性定义为函数和对象，当定义为对象时会报错。

```js
// 正确
Vue.component("item", {
	template: "<p>item:{{name}}</p>",
	// data 必须是函数
	data() {
		return { name: Math.random() };
	},
});
// 报错：The "data" option should be a function that returns a per-instance value in component definitions.
Vue.component("item", {
	template: "<p>item:{{name}}</p>",
	data: {
		name: Math.random(),
	},
});
```

但我们在修改数据模型的时候，data 指代的却是一个对象。那为什么在声明的时候还要通过函数来返回对象呢？
按照官方的说法，是为了保证“每个实例可以维护一份对返回对象的独立复制”，具体实现就是调用 data() 函数，并将其 this 指向当前组件实例 vm，同时将当前实例作为参数传递给 data() 函数，然后将返回的数据对象存储到组件实例 vm._data 属性中。下面代码是截取的部分源码。_

```js
function initData(vm: Component) {
	let data = vm.$options.data;
	data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
	if (!isPlainObject(data)) {
		data = {};
		process.env.NODE_ENV !== "production" &&
			warn(
				"data functions should return an object:\n" +
					"https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",
				vm
			);
	}
}
```

需要注意的是，有一种例外情况，那就是 Vue 实例中的 data 属性是一个对象，因为 Vue 实例是全局唯一的，所以不需要通过调用函数的方式来创建数据对象副本。

##### React

虽然通过调用函数的方式确实可以保证每个组件实例拥有自己的数据，但如果 data 改成对象就一定不可以吗？
答案当然是否定的。

在 “ JavaScript 的数据类型”中实现过一个深拷贝函数，理论上通过深拷贝函数来创建数据对象副本，也是完全可行的。

React 组件的数据模型 state，其值就是 对象类型 。但 React 并没有直接采用深拷贝的方式来实现，因为深拷贝操作性能开销太大。下面的一段代码是创建对象和深拷贝对象的时间开销对比，耗时相差一倍，对于结构更加复杂的对象，这个差异可能会变得更大。

```js
// 创建对象
console.time("create");
var obj = {};
for (let i = 0; i < 100; i++) {
	obj[Math.random()] = Math.random();
}
console.timeEnd("create"); // create: 0.288818359375ms
// 深拷贝
console.time("clone");
_.cloneDeep(obj);
console.timeEnd("clone"); // clone: 0.637939453125ms
```

React 组件是通过将 state 设置为不可变对象的方式来实现的，不可变对象指的就是当一个变量被创建后，它的值不可以被修改。这也就意味着当组件状态发生变化时，不修改 state 属性，而是重新创建新的 state 状态对象。

React 中的不可变对象通过 Structural Sharing（结构共享）的操作，大大减少了性能开销。这种操作的原理就是，如果对象中的一个属性发生变化，那么只深拷贝当前属性，然后将对象属性指向这个深拷贝的属性，其他节点仍然进行共享。

下面的示例代码，验证了 React 组件的状态对象 state 的不可变性。

```js
let o = { val: 0 };
let b = { val: 0 };
class Child extends React.Component {
	constructor() {
		super();
		this.state = {
			o,
			b,
		};
	}
	click(p) {
		this.setState(
			{
				[p]: {
					val: this.state[p].val + 1,
				},
			},
			() => {
				console.log("o:", this.state.o === o);
				console.log("b:", this.state.b === b);
			}
		);
	}
	render() {
		return (
			<div>
				<button onClick={this.click.bind(this, "o")}>按钮o</button>
				<button onClick={this.click.bind(this, "b")}>按钮b</button>
				<p>o.val: {this.state.o.val} </p>
				<p>b.val: {this.state.b.val} </p>
			</div>
		);
	}
}
class App extends React.Component {
	render() {
		return (
			<div>
				<Child />
			</div>
		);
	}
}
window.onload = function () {
	ReactDOM.render(<App />, window.app);
};
```

创建两个值为对象的变量 o 和 b，在 Child 组件的构造函数中赋值给 state，Child 组件中有两个按钮，分别用来修改 state.o 属性和 state.b 属性。如果只点击“按钮 o”，通过控制台输出结果可以观察到，state.o 进行了深拷贝之后发生了改变，所以不等于对象 o，而 state.b 没有改变，仍然等于对象 b。

#### 渲染

当数据发生变化时，如何修改视图呢？Vue 和 React 采取了两种不同的策略。

##### Vue

Vue 采取的是响应式的视图更新方式，基于 Object.defineProperty() 函数，监听数据对象属性的变化，然后再更新到视图。下面深入分析它的实现细节。

Vue 在组件初始化的时候会将 data() 函数返回的数据对象传入 observe() 函数，在这个函数中会将数据对象作为参数来创建一个 Observer 实例，在这个实例的构造函数中将会通过 Object.defineProperty 为数据对象的每个属性设置监听。

```js
export class Observer {
	value: any;
	dep: Dep;
	vmCount: number;
	constructor(value: any) {
		this.value = value;
		this.dep = new Dep();
		this.vmCount = 0;
		def(value, "__ob__", this);
		if (Array.isArray(value)) {
			if (hasProto) {
				protoAugment(value, arrayMethods);
			} else {
				copyAugment(value, arrayMethods, arrayKeys);
			}
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}
	walk(obj: Object) {
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			defineReactive(obj, keys[i]);
		}
	}
	observeArray(items: Array<any>) {
		for (let i = 0, l = items.length; i < l; i++) {
			observe(items[i]);
		}
	}
}
```

当监听到数据变化时，该进行什么操作呢？这里我们查看 defineReactive() 的源码可以看到，除了为数据对象设置值之外，还会调用一个 dep.notify() 函数。

```js
function reactiveSetter(newVal) {
	const value = getter ? getter.call(obj) : val;
	if (newVal === value || (newVal !== newVal && value !== value)) {
		return;
	}
	if (process.env.NODE_ENV !== "production" && customSetter) {
		customSetter();
	}
	if (getter && !setter) return;
	if (setter) {
		setter.call(obj, newVal);
	} else {
		val = newVal;
	}
	childOb = !shallow && observe(newVal);
	dep.notify();
}
```

这里的 dep 是在建立监听的时候创建的 Dep 实例，它相当于一个事件代理，内部有一个 subs 队列属性，用来存储依赖它的 Watcher 实例。当调用 dep.notify() 函数时，会遍历内部的 Watcher 队列，分别调用它们的 update() 函数。

```js
export default class Dep {
	static target: ?Watcher;
	id: number;
	subs: Array<Watcher>;
	constructor() {
		this.id = uid++;
		this.subs = [];
	}
	addSub(sub: Watcher) {
		this.subs.push(sub);
	}
	removeSub(sub: Watcher) {
		remove(this.subs, sub);
	}
	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
	notify() {
		const subs = this.subs.slice();
		if (process.env.NODE_ENV !== "production" && !config.async) {
			subs.sort((a, b) => a.id - b.id);
		}
		for (let i = 0, l = subs.length; i < l; i++) {
			subs[i].update();
		}
	}
}
```

Watcher 实例会在挂载组件的时候被创建，主要功能是一方面将自身添加到 Dep 实例的 subs 数组属性中；另一方面在收到更新通知后更新视图。值得注意的是，这个更新操作是延迟执行的，每次有新的数据变更要放入队列时都会进行判断，如果已存在则跳过，等所有变更都添加到队列后再进行统一更新操作。这么做的好处是如果同一个 watcher 被多次触发，只会被推入到队列中一次，从而避免了同一时刻重复操作 DOM 导致性能损耗。

具体实现是通过调用 queueWatcher() 函数，将当前 Watcher 实例放入到一个队列中进行缓冲。queueWatcher() 函数的源码如下所示。

```js
export function queueWatcher(watcher: watcher) {
	const id = watcher.id;
	if (has[id] == null) {
		has[id] = true;
		if (!flushing) {
			queue.push(watcher);
		} else {
			// if already flushing, splice the watcher based on its id
			// if already past its id, it will be run next immediately.
			let i = queue.length - 1;
			while (i > index && queue[i].id > watcher.id) {
				i--;
			}
			queue.splice(i + 1, 0, watcher);
		}
		// queue the flush
		if (!waiting) {
			waiting = true;

			if (process.env.NODE_ENV !== "production" && !config.async) {
				flushSchedulerQueue();
				return;
			}
			nextTick(flushSchedulerQueue);
		}
	}
}
```

在上面的代码中，flushSchedulerQueue 函数负责遍历队列并调用 watcher.run() 函数进行视图更新相关操作，实现异步队列的关键在于 nextTick() 函数，在调用该函数时，会将回调函数 flushSchedulerQueue() 放入一个 callbacks 数组中，然后执行一个 timerFunc() 函数，该函数会根据不同的运行环境选择可行的延迟执行方式，比如在现代浏览器中会优先使用 Promise.resolve().then，而在老版本的浏览器中会使用 setTimeout。

```js
if (typeof Promise !== "undefined" && isNative(Promise)) {
	const p = Promise.resolve();
	timerFunc = () => {
		p.then(flushCallbacks);
		if (isIOS) setTimeout(noop);
	};
	isUsingMicroTask = true;
} else if (
	!isIE &&
	typeof MutationObserver !== "undefined" &&
	(isNative(MutationObserver) ||
		MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
	let counter = 1;
	const observer = new MutationObserver(flushCallbacks);
	const textNode = document.createTextNode(String(counter));
	observer.observe(textNode, {
		characterData: true,
	});
	timerFunc = () => {
		counter = (counter + 1) % 2;
		textNode.data = String(counter);
	};
	isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
	timerFunc = () => {
		setImmediate(flushCallbacks);
	};
} else {
	timerFunc = () => {
		setTimeout(flushCallbacks, 0);
	};
}
```

虽然功能实现了，但 Object.defineProperty() 这个函数本身还存在一个缺陷，就是当属性值为对象类型的时候，无法监听对象内部的数据变化。像下面的代码，监听对象属性 obj 和数组属性 array 都会失败。

```js
(function () {
	var obj = { id: 1 };
	var array = [];
	Object.defineProperty(o, "obj", {
		enumerable: true,
		configurable: true,
		get: function () {
			return obj;
		},
		set: function (val) {
			console.log("set object"); // 不会执行
			obj = val;
		},
	});
	Object.defineProperty(o, "array", {
		enumerable: true,
		configurable: true,
		get: function () {
			return array;
		},
		set: function (val) {
			console.log("set array"); // 不会执行
			array = val;
		},
	});
})();
o.obj.id = 2;
console.log(o.obj); // {id: 2}
o.array.push(1);
console.log(o.array); // [1]
```

为了解决这个问题，Vue 分别采取了两个措施。对于对象属性，遍历对象属性逐层进行监听，下面是组件初始化断点调试的截图，从图中可看出，在组件初始化的时候分别对对象 data 的 o 属性和对象 o 的 name 属性进行了监听。

![同时监听了对象 data 的 o 属性和对象 data.o 的 name 属性](../img/同时监听了对象 data 的 o 属性和对象 data.o 的 name 属性.png)

同时监听了对象 data 的 o 属性和对象 data.o 的 name 属性

对于数组属性，修改了会引起数组变化的 7 个函数，包括：

- push()

- pop()

- shift()

- unshift()

- splice()

- sort()

- reverse()

具体实现包括两步，第一步是根据 Array.prototype 创建一个新的原型对象 arrayMethods，通过 Object.defineProperty() 函数对 arrayMethods 对象的上述 7 个函数进行劫持和修改，当调用这些方法时发送消息告知视图需要更新，下面是相关源码。

```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
];
methodsToPatch.forEach(function (method) {
	const original = arrayProto[method];
	def(arrayMethods, method, function mutator(...args) {
		const result = original.apply(this, args);
		const ob = this.__ob__;
		let inserted;
		switch (method) {
			case "push":
			case "unshift":
				inserted = args;
				break;
			case "splice":
				inserted = args.slice(2);
				break;
		}
		if (inserted) ob.observeArray(inserted);
		ob.dep.notify();
		return result;
	});
});
```

第二步就是当遇到值为数组类型的属性时，将它的原型指向 arrayMethods 对象。

```js
export class Observer {
	value: any;
	dep: Dep;
	vmCount: number;
	constructor(value: any) {
		this.value = value;
		this.dep = new Dep();
		this.vmCount = 0;
		def(value, "__ob__", this);
		if (Array.isArray(value)) {
			if (hasProto) {
				protoAugment(value, arrayMethods);
			} else {
				copyAugment(value, arrayMethods, arrayKeys);
			}
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}
	walk(obj: Object) {
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			defineReactive(obj, keys[i]);
		}
	}
	observeArray(items: Array<any>) {
		for (let i = 0, l = items.length; i < l; i++) {
			observe(items[i]);
		}
	}
}
```

当然 Vue 3 中使用 Proxy 能更好地解决这个问题，Proxy 可以直接监听整个数据对象而不再需要分别监听每个属性，同时还提供了更多的 API 函数，只是在兼容性方面不如 Object.defineProperty() 函数。

##### React

React 组件中的视图更新，并不是像 Vue 中那样自动响应的，而是需要手动调用 setState() 函数来触发。

React 为了提升组件更新时的性能，不仅将状态更新包装成任务放入了异步队列，而且还使用了类似协程的方式来调度这些队列中的更新任务。任务的执行顺序会根据每个任务的优先级来进行调整，并且任务的执行过程中可能会被中断，但状态会被保存，直到合适的时候会再次读取状态并继续执行任务。整个实现过程相当复杂，由于篇幅所限，不对其原理展开分析了，有兴趣的同学可自行查阅相关资料学习。

对于组件的开发者而言，这种调度机制的具体表现就是：在组件内部调用 setState() 来修改状态时将异步更新视图，而在原生 DOM 事件或异步操作中（比如 setTimeout、setInterval、Promise）则是同步更新视图。

#### 总结

这一课时我们讲解了主流视图库 Vue 和 React 的组件实现机制。

两种框架用了不同的方式来描述组件视图，Vue 采用风格偏向 HTML 的模板语言，React 则采用了风格偏向 JavaScript 的 JSX 语法糖，虽然两者风格迥异，但都必须通过编译器进行编译之后才能在浏览器端执行。

在组件的数据定义上，两者也有明显的区别。Vue 通过函数来创建并返回数据对象，React 组件的状态对象则具有不可变性。这两种方式都保证了不同组件实例拥有独立的数据（状态）对象。

在渲染机制上，Vue 通过监听数据对象属性实现响应式的数据绑定，通过建立异步更新队列来提升性能。React 则需要手动调用 setState() 函数才能触发更新，同时建立了异步任务队列来提升性能。通过类似协程的方式来调度这些任务。

最后布置一道思考题：你还知道哪些数据绑定的实现方式？

答：Vue3 proxy 方式
