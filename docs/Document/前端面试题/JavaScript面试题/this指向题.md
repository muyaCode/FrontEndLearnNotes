# this指向题

MDN的this文档：[this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## this指向

全局作用域下的this -> 指向全局对象window

```js
console.log(this);
```

浏览器、node、worker环境下的全局对象this

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

函数作用域下的this：

普通函数

```js
// 非严格模式下：指向window
// 严格模式下：指向undefined
'use strict'
function test1() {
  console.log(this)
}
test1();

const test2 = function() {
  console.log(this);
}
test2();
```

构造函数

```js
function Test() {
  this.a = 1;
  this.b = 2;
  // console.log(this);

  return {
    c: 3,
    d: 4
  }
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

立即执行函数

```js
const Test = (function () {
  function Test2() { // constructor

  }

  Test.prototype.say = function() {

  }
  Test.do = function() {

  }
  // 改变this指向window全局
  window.Test = Test;
})();
const test = new Test();
test.Test2();
```

箭头函数

```js
// 箭头函数没有自己的this，全局箭头函数内的this指向的是window
// 局部的箭头函数的this指向的是上一层作用域（上一层作用域要是非箭头函数，如果是箭头函数，就再向上一层找）
const test = () => {
  console.log(this); // window
}
test();
```

---

class类

实例化class类的this指向

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

继承class类的this指向

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
    this.hobby = '哈哈哈哈';
    console.log('子类访问父类的age属性', this.age)
  }
	study() {
		console.log(this);
		this.swim();
	}
}
const son = new Son();
son.study();
```

class类中是严格模式

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

this指向的基本原则：谁调用就指向谁（箭头函数是例外）

```js
const obj = {
  a: 1,
  b: 2,
  test3: function() {
    // this指向obj对象
    console.log(this.a);
  },
  test4: test4, // 调用赋值test4函数
  c: {
    d: 4,
    test5: function() {
      // this -> 指向obj.c对象
      console.log(this);
      console.log(this.d);
    }
  }
}

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
  test3: function() {
    // 属性的函数方法内的函数，在属性方法内执行函数，函数内的函数是孤立的 -> 所以下面的this指向window
    // 函数内的函数是孤立的，不属于上层函数的作用域，属于window作用域，所以最近的引用就是window
    function t() {
      console.log(this);
    }
    t(); // window
  }
}
obj2.test3();

// 最近的引用例子2：
const obj3 = Object.create({
  test4: function() {
    console.log(this.a + this.b); // 3
  }
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

字面量方法定义对象的this

```js
// 1
const obj = {
  a: 1,
  b: 2,
}
// 2
var obj2 = Object.create(null);
obj2.a = 1;
obj2.b = 2;
console.log(obj2);
// 3：对象拦截和设置方法
var obj3 = {}
Object.defineProperty(obj3, 'a', {
  get: function() {
    console.log('获取到a');
    console.log(this); // obj3也就是{}
    return 4;
  },
  set: function() {
    console.log('set设置')
  }
});
obj3.a;
```

---

事件处理函数的绑定的this

```js
// 元素的方法监听绑定
var oBtn = document.getElementById('btn');
// onclick事件处理函数内部的this -> 总是指向被绑定的DOM元素上
oBtn.onclick = function() {
  console.log(this)
}
// 立即执行函数内部的事件函数的绑定
;(function(document) {
  var oBtn = document.getElementById('btn');
  function Plus(a, b) {
    this.a = a;
    this.b = b;

    this.init();
  }

  Plus.prototype.init = function () {
    this.binEvent();
  }

  Plus.prototype.binEvent = function () {
    // 改变this的第一种方法：.bind(this)：实现该方法指向Plus实例的this
    oBtn.addEventListener('click', this.handleBtnClick.bind(this), false);
    
    // 改变this的第二种方法：使用外面的this调用该方法
    // var _self = this;
    // oBtn.addEventListener('click', function() {
    //   _self.handleBtnClick();
    // }, false);
  }

  Plus.prototype.handleBtnClick = function () {
    console.log(this.a + this.b);
  }

  window.Plus = Plus
})(document);

new Plus(3, 4);
```

html元素内的this的属性`onclick`点击方法的this指向

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>this指向题</title>
</head>
<body>
  <!-- 这个元素就是上面事件绑定处理函数获取的元素 -->
  <button id="btn">按钮</button>
  <!-- this指向该元素 -->
  <button onclick="console.log(this)">按钮元素属性方法1</button>
  <!-- this默认指向window，可以通过后面的括号来改变指向的this -->
  <button onclick="(function(){ console.log(this) })();">按钮元素属性方法2</button>
</body>
<script src="./index.js"></script>
</html>
```

## 改变this指向的方法

函数和对象的this转换文档：[this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#this_和对象转换)

```js
```

