# nextTick 前置：event loop 和 nextTick

在我们学习[nextTick](https://cn.vuejs.org/api/general.html#nexttick) 之前需要先了解 Event Loop 事件循环机制

[学习 Vue3 第三十五章（event loop 和 nextTick）\_vue3 setup nexttick-CSDN 博客](https://xiaoman.blog.csdn.net/article/details/125237755)

## JS 执行机制

在我们学 js 的时候都知道 js 是单线程的如果是多线程的话会引发一个问题在同一时间同时操作 DOM 一个增加一个删除 JS 就不知道到底要干嘛了，所以这个语言是单线程的但是随着 HTML5 到来 js 也支持了多线程 webWorker 但是也是不允许操作 DOM。

单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以 JS 中就出现了异步的概念。

## 同步任务

代码从上到下按顺序执行

## 异步任务

### 1.宏任务

script(整体代码)、setTimeout、setInterval、UI 交互事件、postMessage、Ajax

### 2.微任务

Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

### 运行机制

所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个 tick 如此形成循环。

nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。

```vue
<template>
	<div ref="xiaoman">
		{{ text }}
	</div>
	<button @click="change">change div</button>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

const text = ref("小满开飞机");
const xiaoman = ref<HTMLElement>();

const change = async () => {
	text.value = "小满不开飞机";
	console.log(xiaoman.value?.innerText); //小满开飞机
	await nextTick();
	console.log(xiaoman.value?.innerText); //小满不开飞机
};
</script>

<style scoped></style>
```

源码地址：core\packages\runtime-core\src\scheduler.ts

```typescript
const resolvedPromise: Promise<any> = Promise.resolve();
let currentFlushPromise: Promise<void> | null = null;

export function nextTick<T = void>(
	this: T,
	fn?: (this: T) => void
): Promise<void> {
	const p = currentFlushPromise || resolvedPromise;
	return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```

nextTick 接受一个参数 fn（函数）定义了一个变量 P 这个 P 最终返回都是 Promise，最后是 return 如果传了 fn 就使用变量 P.then 执行一个微任务去执行 fn 函数，then 里面 this 如果有值就调用 bind 改变 this 指向返回新的函数，否则直接调用 fn，如果没传 fn，就返回一个 promise，最终结果都会返回一个 promise

在我们之前讲过的 ref 源码中有一段 triggerRefValue 他会去调用 triggerEffects。

```typescript
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
	ref = toRaw(ref);
	if (ref.dep) {
		if (__DEV__) {
			triggerEffects(ref.dep, {
				target: ref,
				type: TriggerOpTypes.SET,
				key: "value",
				newValue: newVal,
			});
		} else {
			triggerEffects(ref.dep);
		}
	}
}
```

...

```typescript
export function triggerEffects(
	dep: Dep | ReactiveEffect[],
	debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
	// spread into array for stabilization
	for (const effect of isArray(dep) ? dep : [...dep]) {
		if (effect !== activeEffect || effect.allowRecurse) {
			if (__DEV__ && effect.onTrigger) {
				effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
			}
			//当响应式对象发生改变后，执行 effect 如果有 scheduler 这个参数，会执行这个 scheduler 函数
			if (effect.scheduler) {
				effect.scheduler();
			} else {
				effect.run();
			}
		}
	}
}
```

那么 scheduler 这个函数从哪儿来的 我们看这个类 ReactiveEffect

```typescript
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean

  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null, //我在这儿
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }
```

scheduler 作为一个参数传进来的

```typescript
const effect = (instance.effect = new ReactiveEffect(
	componentUpdateFn,
	() => queueJob(instance.update),
	instance.scope // track it in component's effect scope
));
```

他是在初始化 effect 通过 queueJob 传进来的

```typescript
//queueJob 维护job列队，有去重逻辑，保证任务的唯一性，每次调用去执行，被调用的时候去重，每次调用去执行 queueFlush
export function queueJob(job: SchedulerJob) {
	// 判断条件：主任务队列为空 或者 有正在执行的任务且没有在主任务队列中  && job 不能和当前正在执行任务及后面待执行任务相同
	// 重复数据删除：
	// - 使用Array.includes(Obj, startIndex) 的 起始索引参数：startIndex
	// - startIndex默认为包含当前正在运行job的index，此时，它不能再次递归触发自身
	// - 如果job是一个watch()回调函数或者当前job允许递归触发，则搜索索引将+1，以允许他递归触发自身-用户需要确保回调函数不会死循环
	if (
		(!queue.length ||
			!queue.includes(
				job,
				isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
			)) &&
		job !== currentPreFlushParentJob
	) {
		if (job.id == null) {
			queue.push(job);
		} else {
			queue.splice(findInsertionIndex(job.id), 0, job);
		}
		queueFlush();
	}
}
```

queueJob 维护 job 列队 并且调用 queueFlush

```typescript
function queueFlush() {
	// 避免重复调用flushJobs
	if (!isFlushing && !isFlushPending) {
		isFlushPending = true;
		//开启异步任务处理flushJobs
		currentFlushPromise = resolvedPromise.then(flushJobs);
	}
}
```

queueFlush 给每一个队列创建了微任务

## 如何去理解 Tick

例如我们显示器是 60FPS

那浏览器绘制一帧就是 1000 / 60 ≈ 16.6ms

那浏览器这一帧率做了什么

1.处理用户的事件，就是 event 例如 click，input change 等。

2.执行定时器任务

3.执行 requestAnimationFrame

4.执行 dom 的回流与重绘

5.计算更新图层的绘制指令

6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

所以 一个 Tick 就是去做了这些事

## 课程代码

```vue
<template>
	<div ref="box" class="wraps">
		<div>
			<div class="item" v-for="item in chatList">
				<div>{{ item.name }}:</div>
				<div>{{ item.message }}</div>
			</div>
		</div>
	</div>
	<div class="ipt">
		<div>
			<textarea v-model="ipt" type="text" />
		</div>
		<div>
			<button @click="send">send</button>
		</div>
	</div>
	<HelloWorld></HelloWorld>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, getCurrentInstance, watch } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
// let instance = getCurrentInstance()
// console.log(instance);
let current = ref(0);
watch(current, (newVal, oldVal) => {
	console.log(newVal);
});
//next Tick
//60FPS 1000/60 = 16.7ms
// 1.处理用户的事件，就是event 例如 click，input change 等。

// 2.执行定时器任务

// 3.执行 requestAnimationFrame

// 4.执行dom 的回流与重绘

// 5.计算更新图层的绘制指令

// 6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

// for (let i =0;i<1000;i++) {
//   current.value = i
// }

let chatList = reactive([{ name: "张三", message: "xxxxxxxxx" }]);
let box = ref<HTMLDivElement>();
let ipt = ref("");
//Vue 更新dom是异步的 数据更新是同步
//我们本次执行的代码是同步代码
//当我们操作dom 的时候发现数据读取的是上次的 就需要使用nextIick
const send = async () => {
	chatList.push({
		name: "小满",
		message: ipt.value,
	});
	//1.回调函数模式
	//2.async await 写法
	await nextTick();
	box.value!.scrollTop = 99999999;

	//ipt.value = ''
};
</script>

<style scoped lang="less">
.wraps {
	margin: 10px auto;
	width: 500px;
	height: 400px;
	overflow: auto;
	overflow-x: hidden;
	background: #fff;
	border: 1px solid #ccc;

	.item {
		width: 100%;
		height: 50px;
		background: #ccc;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border-bottom: 1px solid #fff;
	}
}

.ipt {
	margin: 10px auto;
	width: 500px;
	height: 40px;
	background: #fff;
	border: 1px solid #ccc;

	textarea {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
	}
	button {
		width: 100px;
		margin: 10px 0;
		float: right;
	}
}
</style>
```
