# Node原理和机制

指南：[指南 | Node.js (nodejs.org)](https://nodejs.org/zh-cn/docs/guides)

Node的依赖和原理：[所有依赖项 | Node.js (nodejs.org)](https://nodejs.org/zh-cn/docs/meta/topics/dependencies)

## 核心剖析JavaScript事件循环

包括浏览器和Node中的事件循环、宏队列、微队列

防抖、节流等等

## Node事件轮询机制

官网文档：[Node.js 事件循环，定时器和 process.nextTick() | Node.js (nodejs.org)](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick)

```bash
   ┌───────────────────────────┐
┌─>│           timers          │  本阶段执行setTimeout() 和 setInterval()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  这个阶段执行一些诸如TCP错误之类的系统操作的回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  只内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │ 获取新的 I/0 事件，查找已经到时的定时器
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │  setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  关闭事件的回调 socket.close事件
   └───────────────────────────┘
```

先看一段node执行的代码

```js
// 
setImmediate(function () {console.log('setImmediate( )'});
// 定时器                    
setTimeout(function () {console.log('setTimeout()');
// Node的process.nextTick
process.nextTick(function () {console.log('process.nextTick()');
                      
/*
* 不管上面方法如何排序都是按这个顺序执行：
* 1.process.nextTick()
* 2.setTimeout()
* 3.setImmediate()
*/
```

nodejs的事件轮询机制：借助libuv库实现的：[libuv/libuv: Cross-platform asynchronous I/O (github.com)](https://github.com/libuv/libuv)

**概括事件轮询机制**，分为 6个阶段:

1.timers定时器阶段

计时和执行到点的定时器回调函数

2.pending callbacks

某些系统操作(例如TCP错误类型)的回调函数

3.idle，prepare

准备工作

4.poll 轮询阶段 (轮询队列)

**如果轮询队列不为空**，依次同步取出轮询队列中第一个回调函数执行，直到轮询队列为空或者达到系统最大的限制

**如果轮询队列为空，则会进入以下流程**：

- 如果之前设置过setImmediate函数
  - 直接进入下一个check阶段
- 如果之前没有设置过setImmediate函数
- 在当前poll阶段等待
  - 直到轮询队列添加回调函数，就去第一个情况执行
  - 如何定时器到点了，也会去下一阶段

5.check 查阶段

执行setImmediate设置的回调函数

6.close callbacks 关闭阶段

执行close事件回调函数

**`process.nextTick()`  会在任意阶段优先执行**

## 同步和异步
