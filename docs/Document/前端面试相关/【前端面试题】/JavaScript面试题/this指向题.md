# this 指向题

MDN 的 this 文档：[this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## 描述一下 this

this ，函数执行的上下文，可以通过 apply ， call ， bind 改变 this
的指向。对于匿名函数或者直接调用的函数来说，this 指向全局上下文（浏览
器为 window，NodeJS 为 global ），剩下的函数调用，那就是谁调用它，
this 就指向谁。当然还有 es6 的箭头函数，箭头函数的指向取决于该箭头函
数声明的位置，在哪里声明， this 就指向哪里。

## 谈谈 This 对象的理解

- this 总是指向函数的直接调用者（而非间接调用者）
- 如果有 new 关键字， this 指向 new 出来的那个对象
- 在事件中， this 指向触发这个事件的对象，特殊的是， IE 中的 attachEvent 中的 this 总是指向全局对象 Window

其实 JS 中的 this 是一个非常简单的东西，只需要理解它的执行规则就 OK。

在这里不想像其他博客一样展示太多的代码例子弄得天花乱坠， 反而不易理解。

call/apply/bind 可以显式绑定, 这里就不说了。

主要这些场隐式绑定的场景讨论：

- 1）全局上下文
- 2）直接调用函数
- 3）对象.方法的形式调用
- 4）DOM 事件绑定(特殊)
- 5）new 构造函数绑定
- 6）箭头函数

#### 全局上下文

全局上下文默认 this 指向 window, 严格模式下指向 undefined。

#### 直接调用函数

比如：

```js
let obj = {
	a: function () {
		console.log(this);
	},
};
let func = obj.a;
func();
```

这种情况是直接调用。this 相当于全局上下文的情况。

#### 对象.方法的形式调用

还是刚刚的例子，我如果这样写：

```js
obj.a();
```

这就是 对象.方法 的情况，this 指向这个对象

#### DOM 事件绑定

onclick 和 addEventerListener 中 this 默认指向绑定事件的元素。

IE 比较奇异，使用 attachEvent，里面的 this 默认指向 window。

#### new+构造函数

此时构造函数中的 this 指向实例对象。

#### 箭头函数？

箭头函数没有 this, 因此也不能绑定。里面的 this 会指向当前最近的非箭头函数的 this，找不到就是 window(严格模式是 undefined)。比如：

```js
let obj = {
    a: function() {
        let do = () => {
            console.log(this);
        }
        do();
    }
}
obj.a(); // 找到最近的非箭头函数a，a现在绑定着obj, 因此箭头函数中的this是obj
```

优先级：new > call、apply、bind > 对象.方法 > 直接调用。

## JS 中如何确定 this 的值？如果是在全局作用域下，this 的值是全局对象，浏览器环境下是 window。

函数中 this 的指向取决于函数的调用形式，在㇐些情况下也受到严格模式的影响。

● 作为普通函数调用：严格模式下，this 的值是 undefined，非严格模式下，this 指向全局对象。
● 作为方法调用：this 指向所属对象。
● 作为构造函数调用：this 指向实例化的对象。
● 通过 call, apply, bind 调用：如果指定了第㇐个参数 thisArg，this 的值就是 thisArg 的值（如果是原始值，会包装为对象）；如果不传 thisArg，要判断
严格模式，严格模式下 this 是 undefined，非严格模式下 this 指向全局对象。

## this 指向

### 全局作用域下的 this

全局作用域下的 this -> 指向全局对象 window

```js
console.log(this);
```

### 浏览器、node、worker 环境下的全局对象 this

```js
/**
 * 浏览器、node、worker环境下的全局对象this
 * web：window、self、frames、this
 * node：global
 * worker：self
 * 通用：ES7新增的globalThis，上面所有的环境都是全局的this
 * globalThis文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 */
var a = "global -> a";
// global.b = 'global -> b';
var obj = {
	a: "obj -> a",
	test: function () {
		console.log(this.a);
		// console.log(global.b);
		// console.log(global.a);
		console.log(self.a);
		console.log(frames.a);
	},
};
obj.test();
console.log(globalThis);
```

---

### 函数作用域下的 this

#### 普通函数

```js
// 非严格模式下：指向window
// 严格模式下：指向undefined
"use strict";
function test1() {
	console.log(this);
}
test1();

const test2 = function () {
	console.log(this);
};
test2();
```

#### 构造函数

```js
function Test() {
	this.a = 1;
	this.b = 2;
	// console.log(this);

	return {
		c: 3,
		d: 4,
	};
}
/**
 * 1. 构造函数里默认隐式返回this，或者手动返回this，这个this指向的新对象构造都是成功的
 * 2. 如果手动返回了一个新对象，this指向的新对象的构造是失败的
 * 3. 如果手动返回了一个新对象，this -> 指向的对象就被忽略了
 */
var test = new Test(); // 实例化构造函数
var test2 = Test(); // 执行函数
console.log(test);
console.log(test2);
```

#### 立即执行函数

```js
const Test = (function () {
	function Test2() {
		// constructor
	}

	Test.prototype.say = function () {};
	Test.do = function () {};
	// 改变this指向window全局
	window.Test = Test;
})();
const test = new Test();
test.Test2();
```

#### 箭头函数

```js
// 箭头函数没有自己的this，全局箭头函数内的this指向的是window
// 局部的箭头函数的this指向的是上一层作用域（上一层作用域要是非箭头函数，如果是箭头函数，就再向上一层找）
const test = () => {
	console.log(this); // window
};
test();
```

---

### class 类的 this 指向

#### 实例化 class 类的 this 指向

```js
class Test {
	constructor() {
		// 类的非静态方法 -> 指向new实例化的this
		this.test = function () {
			console.log("node-static：" + this);
		};
	}
	// 类的静态方法 -> 指向Test.prototype{...}（类的原型属性prototype）
	// 默认情况下：new this类 -> 指向__proto__ -> 再指向Test.prototype
	test() {
		console.log("static：" + this);
	}
}

const test = new Test();
test.test();
```

#### 继承 class 类的 this 指向

```js
class Father {
	constructor() {
		// this里面有age属性
		this.age = 20;
	}
	swim() {
		console.log("Go swimming!!!");
	}
}
class Son extends Father {
	constructor() {
		// 必须在最上面加上super();方法，才能继承父类的constructor，super()可以传递参数
		// 调用了父类上的constructor
		// 生成this绑定 -> 父类的this -> Son的实例
		super();
		this.hobby = "哈哈哈哈";
		console.log("子类访问父类的age属性", this.age);
	}
	study() {
		console.log(this);
		this.swim();
	}
}
const son = new Son();
son.study();
```

#### class 类中是严格模式

```js
class Father {
	constructor() {
		// 让函数内的this固定指向Father实例
		this.eat = this.eat.bind(this);
	}

	get fruit() {
		return "apple";
	}

	eat() {
		console.log("我吃" + this.fruit);
	}
}

class Son {
	get fruit() {
		return "orange";
	}
}
const father = new Father();
const son = new Son();
father.eat();

son.eat = father.eat;

son.eat();
// 儿子也必须吃父亲的水果
console.log(son, father);
```

---

#### this 指向的基本原则：谁调用就指向谁（箭头函数是例外）

```js
const obj = {
	a: 1,
	b: 2,
	test3: function () {
		// this指向obj对象
		console.log(this.a);
	},
	test4: test4, // 调用赋值test4函数
	c: {
		d: 4,
		test5: function () {
			// this -> 指向obj.c对象
			console.log(this);
			console.log(this.d);
		},
	},
};

function test4() {
	console.log(this.b);
}

obj.test3();
obj.test4();
obj.c.test5();

// 对象方法内部的this -> 指向最近的引用
const obj2 = {
	a: 1,
	b: 2,
	test3: function () {
		// 属性的函数方法内的函数，在属性方法内执行函数，函数内的函数是孤立的 -> 所以下面的this指向window
		// 函数内的函数是孤立的，不属于上层函数的作用域，属于window作用域，所以最近的引用就是window
		function t() {
			console.log(this);
		}
		t(); // window
	},
};
obj2.test3();

// 最近的引用例子2：
const obj3 = Object.create({
	test4: function () {
		console.log(this.a + this.b); // 3
	},
});
obj3.a = 1;
obj3.b = 2;
/**
 * 1. test4由obj3调用
 * 2. 所以obj3就是test4最近的引用
 * 3. test4 的this -> 指向obj3
 * 查找顺序：
 * 4. obj3 = { test4 x }
 * 5. obj3 -> __proto__ -> prototype对象
 * 6. 指导找到Object.prototype对象位置
 * 7. 只有链上有test4 ，直接调用
 * 8. 如果找不到，保存undefined
 * 9. undefined无法执行 -> 所以会报错not a function TypeError
 */
obj3.test4();
```

---

#### 字面量方法定义对象的 this

```js
// 1
const obj = {
	a: 1,
	b: 2,
};
// 2
var obj2 = Object.create(null);
obj2.a = 1;
obj2.b = 2;
console.log(obj2);
// 3：对象拦截和设置方法
var obj3 = {};
Object.defineProperty(obj3, "a", {
	get: function () {
		console.log("获取到a");
		console.log(this); // obj3也就是{}
		return 4;
	},
	set: function () {
		console.log("set设置");
	},
});
obj3.a;
```

---

#### html 元素事件处理函数的绑定的 this

```js
// 元素的方法监听绑定
var oBtn = document.getElementById("btn");
// onclick事件处理函数内部的this -> 总是指向被绑定的DOM元素上
oBtn.onclick = function () {
	console.log(this);
};
// 立即执行函数内部的事件函数的绑定
(function (document) {
	var oBtn = document.getElementById("btn");
	function Plus(a, b) {
		this.a = a;
		this.b = b;

		this.init();
	}

	Plus.prototype.init = function () {
		this.binEvent();
	};

	Plus.prototype.binEvent = function () {
		// 改变this的第一种方法：.bind(this)：实现该方法指向Plus实例的this
		oBtn.addEventListener("click", this.handleBtnClick.bind(this), false);

		// 改变this的第二种方法：使用外面的this调用该方法
		// var _self = this;
		// oBtn.addEventListener('click', function() {
		//   _self.handleBtnClick();
		// }, false);
	};

	Plus.prototype.handleBtnClick = function () {
		console.log(this.a + this.b);
	};

	window.Plus = Plus;
})(document);

new Plus(3, 4);
```

#### html 元素内的 this 的属性`onclick`点击方法的 this 指向

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>this指向题</title>
	</head>
	<body>
		<!-- 这个元素就是上面事件绑定处理函数获取的元素 -->
		<button id="btn">按钮</button>
		<!-- this指向该元素 -->
		<button onclick="console.log(this)">按钮元素属性方法1</button>
		<!-- this默认指向window，可以通过后面的括号来改变指向的this -->
		<button onclick="(function(){ console.log(this) })();">
			按钮元素属性方法2
		</button>
	</body>
	<script src="./index.js"></script>
</html>
```

## 改变 this 指向的方法（this 指向的显示绑定）

函数和对象的 this 显示绑定方法文档：[this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#this_和对象转换)

### 通过 call 或者 apply 绑定 this 对象

显示绑定后，this 就会明确指向绑定的对象

```js
function foo() {
	console.log(this);
}
// 显示绑定
foo.call(window); // this指向window
foo.call({ name: "哈哈" }); // 指向该对象
foo.call(123); // 指向该Number对象，存放是123
```

### 通过 bind 方法总是绑定到指定对象上

```js

```

## 说出并解释下列代码的输出结果：

```JavaScript
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

### 参考答案

#### 1、 Foo.getName();

调用 Foo 的静态方法，所以，打印 2

#### 2、 Foo().getName();

Foo()就是普通函数调用，返回的 this 是 window，后面调用 window.getName()
​ 而 window 下的 getName 在 Foo()中调用 getName 被重新赋值,所以,打印 1

#### 3、 getName();

在执行过 Foo().getName()的基础上，所以 getName=function(){console.log(1)},所以,打印 1，[如果 getName()放在 Foo().getName()上执行打印结果为 4]

#### 4、 new Foo.getName();

构造器私有属性的 getName(),所以,打印 2

#### 5、 new Foo().getName();

原型上的 getName()，打印 3

#### 6、 new new Foo().getName()

首先 new Foo()得到一个空对象{}

第二步向空对象中添加一个属性 getName，值为一个函数

第三步 new {}.getName()

等价于 var bar = new (new Foo().getName)(); console.log(bar)
​ 先 new Foo 得到的实例对象上的 getName 方法，再将这个原型上 getName 方法当做构造函数继续 new ，所以执行原型上的方法,打印 3

## 20200717 面试题

各位小伙伴，今天的面试时刻到啦！下面有两道面试题，大家思考之后给出相应的结果并说明理由（只考虑浏览器环境）

第一题：写出打印结果，并分析出原因

```js
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
	length: 5,
	method: function (fn) {
		fn();
		arguments[0]();
	},
};

obj.method(fn, 1);
```

解析：首先，我们在全局定义了一个变量 length、一个对象 obj 和一个函数 fn，length 赋值为 10。接下来是 fn 函数，输出 this.length。对象 obj 中，obj.length 是 5，obj.method 是一个函数。method 函数里面的形参也是一个函数，这个函数里面调用了 fn 函数，arguments 是一个伪数组，代表 method 函数实际接收到的参数列表，所以 arguments[0] ()就代表了调用 arguments 里的第一项。obj.method(fn, 1)代表的就是调用 obj 当中的 method 函数，并且传递了两个参数，fn 和 1。

分析完了代码的含义，我们来看输出结果。method 函数当中调用的 fn 函数是全局当中的函数，所以 this 指向的是 window，this.length 就是 10。上面说了，arguments[0] ()代表的是调用 arguments 里面的第一项，也就是传参进来的 fn，所以这个 this 指向的是 arguments，method 函数接收的参数是两个，所以 arguments.length 就是 2。最后的输出结果就是 10 2

第二题：写出打印结果，并分析出原因

```js
function a(xx) {
	this.x = xx;
	return this;
}
var x = a(5);
var y = a(6);

console.log(x.x);
console.log(y.x);
```

解析：首先，我们在全局定义了一个变量 x、一个变量 y 和一个函数 a，函数 a 当中的 this.x 等于接收到的参数，返回 this，这里要注意，返回的不是 this.x，而是 this。接下来我们给 x 赋值，值为 a(5)，又给 y 进行赋值，值为 a(6)。最后，我们输出 x.x，y.x。

分析完代码的含义，我们来看输出结果。a 函数传了一个参数 5，那么 this.x 就被赋值为了 5，函数 a 的 this 指向的是 window，也就是 window.x = 5。上面我们说过，这个函数返回的是 this，也就是 this 指向的 window，x = a(5)就相当于 window.x = window，此时的 x 被赋值为了 window。下面又执行了 y = a(6)，也就是说，x 的值再次发生了改变，边为了 6，y 则被赋值为了 window。console.log(x.x)就相当于 console.log(6.x)，输出的自然是 undefined。console.log(y.x)，输出的相当于是 console.log(window.x)，得到的值自然是 6。最后输出的结果为 undefined 6
