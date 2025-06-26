# 08_JavaScript 性能优化

## 内存管理

- 内存：由可读写单元组成， 表示一片可操作空间
- 管理：人为的去操作一片空间的申请、使用和释放
- 内存管理：开发者主动申请空间、使用空间、释放
- 空间管理流程：申请一使用一释放

```js
// 申请内存空间
let obj = {};
// 使用内存空间
obj.name = "lg";
// 释放内存空间
obj = null;
```

## 垃圾回收与常见 GC 算法

### JavaScript 中的垃圾

- JavaScript 中内存管理是自动的
- 对象不再被引用时是垃圾
- 对象不能从根上访问到时是垃圾

### JavaScript 中的可达对象

- 可以访问到的对象就是可达对象 (引用、作用域链)
- 可达的标准就是从根出发是否能够被找到
- JavaScript 中的根就可以理解为是全局变量对象

```js
function objGroup(obj1, obj2) {
	obj.next = obj2;
	obj2.prev = obj1;

	return { o1: obj1, o2: obj2 };
}
let obj = objgroup({ name: "obj1" }, { name: "obj2" });
console.log(obj);
```

### GC 算法介绍

#### GC 定义与作用

- GC 就是垃圾回收机制的简写
- GC 可以找到内存中的垃圾、并释放和回收空间

#### GC 里的垃圾是什么

程序中不再需要使用的对象

```js
function func() {
	name = "lg";
	return `${name} is a coder`;
}
func();
```

程序中不能再访问到的对象

```js
function func() {
	name = "lg";
	return `${name} is a coder`;
}
func();
```

### GC 算法是什么

- GC 是一种机制，垃圾回收器完成具体的工作
- 工作的内容就是查找垃圾释放空间、回收空间
- 算法就是工作时查找和回收所遵循的规则

### 常见 GC 算法

#### 1.引用计数

引用计数算法

- 核心思想:设置引用数，判断当前引用数是否为 0
- 引用计数器
- 引用关系改变时修改引用数字
- 引用数字为 0 时立即回收

```js
const user1 = { age: 11 };
const user2 = { age: 22 };
const user3 = { age: 33 };
const nameList = [user1.age, user2.age, user3.age];

function fn() {
	const num1 = 1;
	const num2 = 2;
}

fn();
```

引用计数算法优点

- 发现垃圾时立即回收
- 最大限度减少程序暂停卡顿时间

引用计数算法缺点

- 无法回收循环引用的对象
- 资源和时间开销大

```js
function fn() {
	const obj1 = {};
	const obj2 = {};
	obj1.name = obj2;
	obj2.name = obj1;

	return "lg is a coder!";
}
fn();
```

#### 2.标记清除

##### 标记清除算法

- 核心思想: 分标记和清除二个阶段完成
- 遍历所有对象找标记活动对象
- 遍历所有对象清除没有标记对象
- 回收相应的空间

##### 标记清除算法的优缺点

待定

#### 3.标记整理

##### 标记整理算法原理

- 标记整理可以看做是标记清除的增强
- 标记阶段的操作和标记清除一致
- 清除阶段会先执行整理，移动对象位置

...图例图解

#### 4.分代回收

看以下 V8 引擎

## V8 引擎的垃圾回收

### 认识 V8

- V8 是一款主流的 JavaScript 执行引擎
- V8 采用即时编译
- V8 内存设限

### V8 垃圾回收策略

- 采用分代回收的思想
- 内存分为新生代、老生代
- 针对不同对象采用不同算法

### V8 中常用 GC 算法

- 分代回收
- 空间复制
- 标记清除
- 标记整理
- 标记增量

### V8 内存分配

- V8 内存空间一分为二
- 小空间用于存储新生代对象 (32M 16M)
- 新生代指的是存活时间较短的对象

### 新生代对象回收实现

- 回收过程采用复制算法 + 标记整理
- 新生代内存区分为二个等大小空间
- 使用空间为 From,空闲空间为 To
- 活动对象存储于 From 空间
- 标记整理后将活动对象拷贝至 To
- From 与 To 交换空间完成释放

### 回收细节说明

- 拷贝过程中可能出现晋升
- 晋升就是将新生代对象移动至老生代
- 一轮 GC 还存活的新生代需要晋升
- To 空间的使用率超过 25%

### 老年代对象回收实现

- 主要采用标记清除、标记整理、增量标记算法
- 首先使用标记清除完成垃圾空间的回收
- 采用标记整理进行空间优化
- 采用增量标记进行效率优化

### 细节对比

- 新生代区域垃圾回收使用空间换时间
- 老生代区域垃圾回收不适合复制算法

### V8 总结

- V8 是一款主流的 JavaScript 执行引擎
- V8 内存设置上限
- V8 采用基于分代回收思想实现垃圾回收
- V8 内存分为新生代和老生代
- V8 垃圾回收常见的 GC 算法

## 浏览器 Performance(性能)工具

### 为什么使用 Performance

- GC 的目的是为了实现内存空间的良性循环
- 良性循环的基石是合理使用
- 时刻关注才能确定是否合理
- Performance 提供多种监控方式

### Performance 使用步骤

- 打开浏览器输入目标网址
- 进入开发人员工具面板，选择性能
- 开启录制功能，访问具体界面
- 执行用户行为，一段时间后停止录制
- 分析界面中记录的内存信息

### 内存问题的外在表现

- 页面出现延迟加载或经常性暂停
- 页面持续性出现糟糕的性能
- 页面的性能随时间延长越来越差

### 界定内存问题的标准

- 内存泄露：内存使用持续升高
- 内存膨胀：在多数设备上都存在性能问题
- 频繁垃圾回收：通过内存变化图进行分析

### 监控内存的几种方式

- 浏览器任务管理器
- Timeline 时序图记录
- 堆快照查找分离 DOM
- 判断是否存在频繁的垃圾回收

### 浏览器的任务管理器监控内存

使用 HTML 页面代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>任务管理器监控内存变化</title>
</head>
<body>
    <bufton id="btn">Add</button>
    <script>
    const oBtn = document .getElementById( 'btn ')
    oBtn.onclick = function() {
        let arrList = new Array(1000000)
    }
    </script>
</ body>
</html>
```

打开浏览器后通过快捷键调用浏览器的任务管理器，查看运行内存：**shift + esc**，然后右击选择显示：JavaScript 内存，就可以检测页面内存

### 事件线 TimeLine 记录内存变化

使用 HMTL 页面代码

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>时间线记录内存变化</title>
	</head>
	<body>
		<button id="btn">Add</button>
		<script>
			const arrList = [];
			function test() {
				for (let i = 0; i < 100000; i++) {
					document.body.appendChild(document.createElement("p"));
				}
				arrList.push(new Array(1000000).join("x"));
				document.getElementById("btn").addEventListener("click", test);
			}
		</script>
	</body>
</html>
```

基于代码页面打开浏览器，然后打开控制台，勾选上性能，运行观察内存变化

### 对快照查找分离 DOM

#### 什么是分离 DOM

- 界面元素存活在 DOM 树上
- 垃圾对象时的 DOM 节点
- 分离状态的 DOM 节点

编写 HTML 文件

```html
<!DOCTYPE html>
<html ang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>堆快照监控内存</title>
	</head>
	<body>
		<button id="btn">Add</button>
		<script>
			var tmpEle
			function fn() {
			    var ul = document.createElement( 'ul')
			    for (var i = 0; i < 10; i+) {
			        var li = document.createElement('li')
			        ul.appendChild(li)
			 }
			 tmpEle = ul
			}
			document.getElementById( 'btn').addEventListener('click', fn)
		</script>
	</body>
</html>
```

然后浏览器打开运行页面，打开控制台，找到内存面板，选择分析类型：堆快照-->获取快照，类筛选器那里筛选是否存在分离 DOM

### 判断是否存在频繁的 GC 垃圾回收

- Timeline 中频繁的上升下降
- 任务管理器中数据频繁的增加减小

### Performance 使用总结

- Performance 使用流程
- 内存问题的相关分析
- Performance 时序图监控内存变化
- 任务管理器监控内存变化
- 堆块照查找分离 DOM

## V8 引擎执行工作流程

![V8 引擎执行工作流程](.\img\V8 引擎执行工作流程.jpg)

### Scanner 是一个扫描器

### Parser 是一个解析器

#### 预解析优点

- 跳过未被使用的代码
- 不生成 AST，创建无变量引用和声明的 scopes
- 依据规范抛出特定错误
- 解析速度更快

代码示例

```js

```

#### 全量解析

- 解析被使用的代码
- 生成 AST
- 构建具体 scopes 信息，变量引用、声明等
- 抛出所有语法错误

代码示例

```js

```

### lgnition 是 V8 提供的一个解释器

### TurboFan 是 V8 提供的编译器模块

### 堆栈准备

- JS 执行环境
- 执行环境栈(ECStack, execution context stack）
- 执行上下文
- VO(G)，全局变量对象

#### 内存

- 01 基本数据类型是按值进行操作 01
- 02 基本数据类型值是存放在 区的
- 03 无论我们当前看到的栈内存，还是后续引用数据类型会使用的堆内存都属于计算机内存
- 04 GO(全局对象)

#### 引用类型堆栈处理

栈内存存储变量
堆内存存储变量的地址

#### 函数堆栈处理

1.创建函数和创建变量类似，函数名此时就可以看做是一个变量

2.单独开辟一个堆内存用于存放函数的体 (字符串形式代码)当前内存地址也会有一个 16 进制数值地址

3.创建函数的时候，它的作用域[[scope]] 就已经确定了 (创建函数时所在的执行上下文)

4.创建函数之后会将它的内存地址存放在栈区与对应的函数名进行关联

函数执行，目的就是为了将函数据对应的堆内存里的字符串形式代码进行执行。代码在执行的时候肯定需要有一个环境，此时就意味着函数在执行的时候会生成一个新的执行上下文来管理函数体当中的代码

函数执行时做的事情:

01 确定作用域链:<当前执行上下文，上级执行上下文>

02 确定 this --》window

03 初始化 arguments 对象

04 形参赋值: obj = arr

05 变量提升:

06 执行代码

```js
obj[0] = "zoe";

obj = ["拉勾教育"];

obj[1] = ["大前端"];
console.og(obj); // ["拉"，"大"]
```

01 函数创建

- 可以将函数名称看做是变量，存放在 V0 当中 ，同时它的值就是当前函数对应的内存地址
- 函数本身也是一个对象，创建时会有一个内存地址，空间内存放的就是函数体代码(字符串形式的

02 函数执行

- 函数执行时会形成一个全新私有上下文，它里面有一个 AO 用于理这个上下文当中的变量
- 步骤：
  - 01 作用域链<当前执行上下文，上级作用域所在的执行上下文>
  - 02 确定 this
  - 03 初始化 arguments (对)
  - 04 形参赋值:它就相当于是变量声明，然后将声明的变量放置于 AO
  - 05 量提升 06 代码执行

#### 闭包堆栈处理

闭包代码如下

```js
var a = 1;
function foo() {
	var b = 2;
	return function (c) {
		console.log(c + b++);
	};
}
var f = foo();
f(5);
f(10);
```

01 闭包：是一种机制:

- 保护：当前上下文当中的变量与其它的上下文中变量互不于扰
- 保存：当前上下文中的数据(堆内存)被当前上下文以外的上下文中的变量所引用，这个数据就保存下来了

02 闭包：

- 函数调用形成了一个全新的私有上下文，在函数调用之后当前上下文不被释放就是闭包(临时不被释放)

#### 闭包与垃圾回收

```js
var a = 10;
function foo(a) {
	return function (b) {
		console.log(b + ++a);
	};
}
var fn = foo(10);
fn(5);
foo(6)(7);
console.log(a);
```

- 1 浏览器都自有垃圾回收 (内存管理，V8 为例)
- 2 栈空间、堆空间
- 3 堆:当前堆内存如果被占用，就能被释放掉，但是我们如果确认后续不再使用这个内存里的数据也可以自己主动置空，然后浏览器就会对其进行回收
- 4 栈: 当前上下文中是否有内容，被其它上下文的变量所占用，如果有则无法释放 (闭包)

## 代码性能优化实例

### 循环添加事件实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
 <title>循环添加事件</title>
 <script src="./06-add-event-loop.js"></script><head>
<body>
    <!-- index属性的事件委托实现 -->
    <button index="1">按钮1</button>
    <button index="2">按钮2</button>
    <button index="3">按钮3</button>
</body>
</html>
```

js

```js
var aButtons = document.querySelectorAll("button");
// 基础
for (var i = 0; i < aButtons.length; i++) {
	aButtons[i].onclick = function () {
		console.log(`当前索引值为${i}`);
	};
}

/**
 * 闭包
 * 自定义属性
 * 事件委托
 */
for (var i = 0; i < aButtons.length; i++) {
	(function () {
		aButtons[i].onclick = function () {
			console.log(`当前索引值为${i}`);
		};
	})(i);
}

// 第三种
for (var i = 0; i < aButtons.length; i++) {
	aButtons[i].onclick = (function () {
		aButtons[i].onclick = function () {
			console.log(`当前索引值为${i}`);
		};
	})(i);
}

// 第四种
for (var i = 0; i < aButtons.length; i++) {
	aButtons[i].myIndex = i;
	aButtons[i].onclick = function () {
		console.log(`当前索引值为${this.myIndex}`);
	};
}

// 第五种：按钮的index属性事件委托方法
document.body.onclick = function (ev) {
	var target = ev.target,
		targetDom = target.tagName;
	if (targetDom === "BUTTON") {
		var index = target.getAttribute("index");
		console.log(`当前点击的是第 ${index} 个`);
	}
};
```

#### JSBench 的使用

JSBench 是一个在线测试代码运行效率和性能的网站

网址：[JSBench.me - JavaScript performance benchmarking playground](https://jsbench.me/)

### 1.变量局部化

变量局部化 (全局、局部)可以提高代码的执行效率( 减少了数据访问时需要查的路径)

数据的存储和读取

```js
// 第一种
var i,
	str = "";
function packageDom1() {
	for (i = 0; i < 1000; i++) {
		str += i;
	}
}
packageDom1();

// 第二种变量局部化：效率更高
function packageDom2() {
	let str = "";
	for (let i = 0; i < 1000; i++) {
		str += i;
	}
}
packageDom2();
```

把两段代码放在 JSBench 网站中测试对比，看那个运行效率更高：[JSBench.me - JavaScript performance benchmarking playground](https://jsbench.me/)

### 2.缓存数据

缓存数据例子

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>缓存数据</title>
	</head>
	<body>
		<div id="skip" class="skip"></div>
		<script>
			// 缓存数据: 对于需要多次使用的数据进行提前保存，后续进行使用
			var oBox = document.getElementById("skip");
			// 假设在当前的函数体当中需要对 cLassName 的值进行多次使用，那么我们就可以将它提前缓存起来
			function hasClassName1(ele, cls) {
				return (ele.className = cls);
			}
			console.log(hasClassName1(oBox, "skip"));

			function hasClassName2(ele, cls) {
				var clsName = ele.className; // 使用变量缓存数据，数据如果多次使用效率更高
				return (className = cls);
			}
			console.log(hasClassName2(oBox, "skip"));
		</script>
	</body>
</html>
```

再去 JSBench 网站中测试对比，看那个运行效率更高：[JSBench.me - JavaScript performance benchmarking playground](https://jsbench.me/)

### 3.减少访问层级

```js
// 减少访问层级
var obj = {
    age: 18,
    methods: {
        m1: {
            name: '',
         time: 100
        }

        m2: {
            name: '',
        }
    }
}

// 第一种，层级更少：运行效率更快
function Person1() {
    this.name = 'zce'
    this.age = 40
}
let p1 = new Person1()
console.log(p1.age)
// 第二种：
function Person2() {
    this.name = 'zce'
    this.age = 40
    this.getAge = function () {
        return this.age
    }
}
let p2 = new Person2()
console.log(p2.getAge())
```

### 4.防抖和节流

### 为什么需要防抖和节流？

在一些高频率事件触发的场景下我们不希望对应的事件处理函数多次执行

场景:

- 滚动事件
- 输入的模糊匹配
- 轮播图切换
- 点击操作
- ...

浏览器默认情况下都会有自己的监听事件间隔( 4~6ms)，如果检测到多次事件的监听执行，那么就会造成不必要的资源浪费

#### 使用场景

**前置的场景**：界面上有一个按钮，我们可以连续多次点击

**防抖**: 对于这个高频的作来说，我们只希望识别一次点击，可以人为是第一次或者是最后一次

**节流**：对于高频作，我们可以自己来设置频率，让本来会执行很多次的事件触发，按着我们定义的频率减少触发的次数

#### 防抖函数

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>防抖函数实现</title>
</head>
<body>
 <button id="btn">点击</button>
    <script>
  var oBtn = document.getElementById( 'btn')
        // oBtn.onclick = function () {
        //     console.log('点击了')
        // }

        /**
          * handle 最终需要执行的事件监听
          * wait 事件触发之后多久开始执行
          * immediate 控制执行第一次还是最后一次，false 执行最后一次
    */
        function myDebounce(handle, wait, immediate) {
            // 参数类型判断及默认值处理
   if (typeof handle !=== 'function') throw new Error( 'handle must be an function')
   if (typeof wait === 'undefined') wait = 300
   if (typeof wait === 'boolean') {
                immediate = wait
    wait = 300
            }

   if (typeof immediate === 'boolean') immediate = false

            // 所谓的防抖效果我们想要实现的就是有一个“人“可以管理 handte 的执行次数
            // 如果我们想要执行最后一次，那就意味着无论我们当前点击了多少次，前面的N-1次都无用
            let timer = null
   return function proxy(...args) {
                let self = this,
                 init = immediate && !timer
                clearTimeout(timer)
                timer = setTimeout(() => {
                    timer = null
                    !immediate ? handle.call(self, ...args) : null
                }, wait)

                // 如果当前传递进来的是 true 就表示我们需要立即执行
                // 如果想要实现只在第一次执行，那么可以添加上 timer 为 null 做为判断
                // 因为只要 timer 为 null 就意味着没有第二次....点击
    init ? handle.call(self, ... args) : null
            }
        }
        // 定义事件执行函数
        function btnClick(ev) {
            console.log('点击了', this, ev)
        }
        // 当我们执行了按钮点击之后就会执行...返回的 proxy
  oBtn.onclick = myDebounce(btnClick, 200, true)
  // oBtn.onclick = btnClick() // this ev
 </script>
< body>
</html>
```

#### 节流函数

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>节流函数实现</title>
    <style>
        body {
            height: 5000px;
        }
    </style>
</head>
<body>
    <script>
  // 节流:我们这里的书流指就是在自定义的一段时间内让事件进行触发
        function myThrottle(handle, wait) {
            if (typeof handle !===  'function') throw new Error('handle must be anfunction')
            if (typeof wait === 'undefined') wait = 400

            let previous = 0 // 定义变量记录上一次执行时的时间
            let timer = null // 用它来管理定时器

            // 返回节流事件
            return function proxy (...args) {
    let now = new Date() // 定义变量记灵当前次执行的时刻时间点
                let self = this
    let interval = wait - (now - previous)

                if (interval < 0) {
                    // 此时就说明是一个非高频次作可以执行 handle
                    clearTimeout(timer)
                    timer = null

                    handle.call(self, ...args)
                    previous = new Date( )
                } else if (!timer) { // 当我们发现当前系统中有一个定时器了，就意味着我们不需要再开启定时器
                // 此时就说明这次的作发生在了我们定义的频次时间范围内，那就不应该执行 handle
                // 这个时候我们就可以自定义一个定时器，让 handle 在 interval 之后去执行
                timer = setTimeout(() => {
                    // 这个作只是将系统中的定时器清除了，但是 timer 中的值还在
                    clearTimeout(timer)
                    handle.call(self, ...args)
                 previous = new Date()
                }, interval)
            }
        }

        // 定义滚动事件监听
        function scrollFn() {
            console.log('滚动了这')
        }

        // window.onscroll = scrollFn
        window.onscroll = myThrottle(scrollFn, 600)
 </script>
< body>
</html>
```

### 5.减少判断层级

减少条件判断

```js
function doSomething(part, chapter) {
	const parts = ["ES2016", "这工程化", "Vue", "React", "Node"];
	if (part) {
		if (parts.includes(part)) {
			console.log("属于当前课程");
			if (chapter > 5) {
				console.log("您需要提供 VIP 身份");
			}
		}
	} else {
		console.log("请确认模块信息");
	}
}

doSomething("ES2016", 6);

// 上面代码：改进后的代码
function doSomething(part, chapter) {
	const parts = ["ES2016", "这工程化", "Vue", "React", "Node"];
	if (!part) {
		console.log("请确认模块信息");
		return;
	}
	if (!parts.includes(part)) return;
	console.log("属于当前课程");
	if (chapter > 5) {
		console.log("您需要提供 VIP 身份");
	}
}

doSomething("ES2016", 6);
```

### 6.减少循环体活动

```js
var test = () => {
	var i;
	var arr = ["zce", 38, "我为前端而活"];
	for (i = 0; i < arr.length; i++) {
		console.log(arr[i]);
	}
};
test();

// 优化后的代码
var test = () => {
	var i;
	var arr = ["zce", 38, "我为前端而活"];
	var len = arr.length;
	for (i = 0; i < len; i++) {
		console.log(arr[i]);
	}
};
test();

// 再次改进
var test = () => {
	var arr = ["zce", 38, "我为前端而活"];
	var len = arr.length;
	while (len--) {
		console.log(arr[len]);
	}
};
test();
```

### 7.字面量与构造式

字面量执行效率会更快

```js
let test = () => {
    let obj = new object()
    obj.name = 'zce
 obj.age = 38
 obj.slogan = "我为前端而活"
 return obj
}
// 速度对比上面更快
let test = () => {
    let obj = { name : 'zce', age: 38, slogan: '我为前端而活' }
 return obj
}
console.log(test())

var str1 = 'zce说我为前端而活' // 这个速度更快
var str2 = new string('zce说我为前端而活') // 比上面对比，是上面速度的两倍
console.log(str1)
console.log(str2)
```
