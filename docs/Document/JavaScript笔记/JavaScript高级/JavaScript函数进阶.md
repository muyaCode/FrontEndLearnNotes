# JavaScript 函数进阶

参考文档：[Function - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

## 函数的定义方式

- 函数声明
- 函数表达式
- `new Function`

### 函数声明

```javascript
function foo() {}
```

### 函数表达式

```javascript
var foo = function () {};
```

### 例子

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>函数声明和函数表达式</title>
		<script>
			//函数的角色:
			//函数的声明
			function f1() {
				console.log("我是函数");
			}
			f1();
			//函数表达式
			var ff = function () {
				console.log("我也是一个函数");
			};
			ff();
		</script>
	</head>
	<body></body>
</html>
```

### 函数声明与函数表达式的区别

函数声明：

- 函数声明必须有名字
- 函数声明会函数提升，在预解析阶段就已创建，声明前后都可以调用

函数表达式：

- 函数表达式类似于变量赋值
- 函数表达式可以没有名字，例如匿名函数
- 函数表达式没有变量提升，在执行阶段创建，必须在表达式执行之后才可以调用

下面是一个根据条件定义函数的例子：

```javascript
if (true) {
	function f() {
		console.log(1);
	}
} else {
	function f() {
		console.log(2);
	}
}
f();
```

以上代码执行结果在不同浏览器中结果不一致。

不过我们可以使用函数表达式解决上面的问题：

```javascript
var ff;

if (true) {
	ff = function () {
		console.log(1);
	};
} else {
	ff = function () {
		console.log(2);
	};
}
ff();
```

- **函数声明**如果放在 if-else 的语句中，在 IE8 的浏览器中会出现问题

- 所以编码中尽量用**函数表达式**

### 3 种函数定义方式

1.function 语句式函数声明

- 形式：句子

- 名称：有名

- 性质：静态

- 解析时机：优先解析

- 作用域：具有函数的作用域（正常的作用域）

  2.函数表达式（函数直接量） ECMAScript 推荐的方式（定义变量接收函数）

- 形式：表达式

- 名称：匿名

- 性质：静态

- 解析时机：顺序解析：先执行 function 句式函数再执行它

- 作用域：具有函数的作用域（正常的作用域）

  3.function 构造函数式,a,b 是形参，函数执行体直接写在后边，以分号结束

- 形式：表达式

- 名称：匿名

- 性质：动态

- 解析时机：顺序解析

- 作用域：顶级函数（顶级作用域）

性质--静态和动态的区别：

- 函数直接量和 function 语句式被 javascript 解释一次，放在了内存，以后用到的话直接调用，占用内存，所以说是“静态”的。

- 而构造函数式是每一次调用都动态新建一个，用完之后就销毁了，不占用内存，所以说是“动态”的。所以，有些程序只希望调用一次，就可以用动态的构造函数式。

## 函数的调用方式

- 普通函数
- 构造函数
- 对象方法

## 函数内 `this` 指向的不同场景

函数的调用方式决定了 `this` 指向的不同：

| 调用方式          | 非严格模式               | 备注                                 |
| ----------------- | ------------------------ | ------------------------------------ |
| 普通函数调用      | window                   | "use strict";严格模式下是：undefined |
| 构造函数调用      | 实例对象：new 构造函数() | 原型方法中 this 也是实例对象         |
| 原型对象中的 this | 实例对象：new 构造函数() |                                      |
| 对象.方法调用     | 该方法所属对象           | 紧挨着的对象                         |
| 事件绑定方法      | 绑定事件对象             |                                      |
| 定时器函数        | window                   |                                      |

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<title>函数内this指向的不同场景</title>
	</head>
	<body></body>
</html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			// 严格模式的普通函数:
			// "use strict";
			// function f1() {
			//  console.log('严格模式的普通函数的this',this); // undefined
			// }
			// f1();

			// 普通函数
			function f1() {
				console.log("普通函数的this", this);
			}
			f1();

			// 定时器中的this
			setInterval(function () {
				console.log("定时器中的this", this);
			}, 1000);

			// 构造函数
			function Person() {
				console.log("构造函数的this", this);

				// 对象的方法
				this.sayHi = function () {
					console.log(this);
				};
			}

			// 原型中的方法
			Person.prototype.eat = function () {
				console.log("原型中的方法的this", this);
			};
			var per = new Person();
			console.log(per);
			per.sayHi();
			per.eat();

			// BOM:中顶级对象是window,浏览器中所有的东西都是window的
		</script>
	</head>
	<body></body>
</html>
```

这就是对函数内部 this 指向的基本整理，写代码写多了自然而然就熟悉了。

## 函数的 3 种调用方式

3 种调用方式：

- 普通函数的调用方式

- 构造函数的调用方式

- 构造函数的对象方法的调用方式

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>函数的3种调用方式</title>
		<script>
			//普通函数
			function f1() {
				console.log("文能提笔控萝莉");
			}
			f1();

			//构造函数---通过new 来调用,创建对象
			function F1() {
				console.log("我是构造函数,我骄傲");
			}
			var f = new F1();

			// 构造函数的对象方法
			function Person() {
				this.play = function () {
					console.log("玩代码");
				};
			}
			var per = new Person();
			per.play();
		</script>
	</head>
	<body></body>
</html>
```

## 函数也是对象

- 所有函数都是 `Function` 的实例
- 对象中有`__proto__`原型，是对象
- 函数中有`prototype`原型，是对象

示例：

```html{23}
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>函数也是对象</title>
  <script>
   function F1() {}

   console.dir(F1);

   console.dir(Math); // 中有__proto__,但是没有prorotype

   // 对象中有__proto__,函数中应该有prototype

   // 如果一个东西里面有prototype，又有__proto__,说明是函数,也是对象
   function F2(name) {
    this.name = name;
   }

   console.dir(F2);

   // 所有的函数实际上都是Function的构造函数创建出来的实例对象
   var f1 = new Function("num1", "num2", "return num1+num2");
   console.log(f1(10, 20));
   console.log(f1.__proto__ == Function.prototype); // true

   // 所以,函数实际上也是对象

   console.dir(f1);

   console.dir(Function);
  </script>
 </head>
 <body>

  </body>
</html>
```

## 数组中函数的调用

示例：

```html{27-29}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>数组中函数的调用</title>
  <script>

    //数组可以存储任何类型的数据
    var arr=[
        function () {
          console.log("十一假期快乐");
        },
        function () {
          console.log("十一假期开心");
        },
        function () {
          console.log("十一假期健康");
        },
        function () {
          console.log("十一假期安全");
        },
        function () {
          console.log("十一假期如意");
        }
    ];
    // 回调函数:函数作为参数使用
    arr.forEach(function (ele) {
      ele();
    });

  </script>
</head>
<body>

</body>
</html>
```

## 函数的 call、apply、bind 方法

call、apply、bind 三个函数方法都可以改变 this 的指向

### call

call 方法文档：[Function.prototype.call() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

`call()` 方法调用一个函数,，其具有一个指定的 `this` 值和分别地提供的参数(参数的列表)。

**注意**：该方法的作用和 `apply()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

**语法**：

```javascript
function.call(thisArg, arg1, arg2, ...)
```

**参数**：

- `thisArg`

  - 在 fun 函数运行时指定的 this 值
  - 如果指定了 null 或者 undefined 则内部 this 指向 window

- `arg1, arg2, ...`

  - 指定的参数列表

### apply

apply 方法文档：[Function.prototype.apply() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

`apply()` 方法调用一个函数, 其具有一个指定的 `this` 值，以及作为一个数组（或类似数组的对象）提供的参数。

注意：该方法的作用和 `call()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

**语法**：

```javascript
function.apply(thisArg, [argsArray])
```

**参数**：

- `thisArg`
- `argsArray`

`apply()` 与 `call()` 非常相似，不同之处在于提供参数的方式。 `apply()` 使用参数数组而不是一组参数列表。例如：

```javascript
function.apply(this, ['eat', 'bananas'])
```

### call 和 apply 方法对比使用和总结

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			// apply和call都可以改变this的指向
			// 函数的调用,改变this的指向
			//    function f1(x,y) {
			//      console.log((x+y)+":===>"+this);
			//      return "这是函数的返回值";
			//    }
			//    // apply和call调用
			//    var r1=f1.apply(null,[1,2]);//此时f1中的this是window
			//    console.log(r1);
			//    var r2=f1.call(null,1,2);//此时f1中的this是window
			//    console.log(r2);
			//    console.log("=============>");
			//    // 改变this的指向
			//    var obj={
			//      sex:"男"
			//    };
			//    // 本来f1函数是window对象的,但是传入obj之后,f1函数此时就是obj对象的
			//    var r3=f1.apply(obj,[1,2]);//此时f1中的this是obj
			//    console.log(r3);
			//    var r4=f1.call(obj,1,2);//此时f1中的this是obj
			//    console.log(r4);

			// 方法改变this的指向

			//    function Person(age) {
			//      this.age = age;
			//    }
			//    Person.prototype.sayHi = function (x, y) {
			//      console.log((x + y) + ":====>" + this.age);// 是实例对象
			//    };
			//
			//    function Student(age) {
			//      this.age = age;
			//    }
			//    var per = new Person(10);// 实例对象
			//    var stu = new Student(100);// 实例对象
			//    // sayHi方法是per实例对象的
			//    per.sayHi.apply(stu, [10, 20]);
			//    per.sayHi.call(stu, 10, 20);

			// apply和call的使用方法
			/*
			 * apply的使用语法
			 * 函数名字.apply(对象,[参数1,参数2,...]);
			 * 方法名字.apply(对象,[参数1,参数2,...]);
			 * call的使用语法
			 * 函数名字.call(对象,参数1,参数2,...);
			 * 方法名字.call(对象,参数1,参数2,...);
			 *
			 * 作用:改变this的指向
			 * 不同的地方:参数传递的方式是不一样的
			 *
			 * 只要是想使用别的对象的方法,并且希望这个方法是当前对象的,那么就可以使用apply或者是call的方法改变this的指向
			 *
			 * */

			// apply和call这两个方法是哪里来的：Function.prototype
			// apply和call方法实际上并不在函数这个实例对象中,而是在Function的prototype中
			function f1() {
				console.log(this + ":====>调用了");
			}
			// f1是函数,f1也是对象
			console.dir(f1);
			// 对象调用方法,说明,该对象中有这个方法
			f1.apply();
			f1.call();
			console.log(f1.__proto__ == Function.prototype);
			// 所有的函数都是Function的实例对象
			console.log(Function.prototype); //ƒ () { [native code] }
			console.dir(Function);

			//实例对象调用方法,方法要么在实例对象中存在,要么在原型对象中存在

			//apply和call方法中如果没有传入参数,或者是传入的是null,那么调用该方法的函数对象中的this就是默认的window

			//f1.apply(null,[100,200]);
			//f1.call(null,100,200);

			// apply和call都可以让函数或者方法来调用,传入参数和函数自己调用的写法不一样,但是效果是一样的

			//    var result1=f1.apply(null,[10,20]);
			//    var result2=f1.call(null,10,20);
			//    console.log(result1);
			//    console.log(result2);

			//    function f1(x,y) {
			//      console.log("这个函数是window对象的一个方法:"+(x+y)+this.sex);
			//    }
			//    window.f1(10,20);
			//    //obj是一个对象
			//    var obj={
			//      age:10,
			//      sex:"男"
			//    };
			//
			//    window.f1.apply(obj,[10,20]);
			//    window.f1.call(obj,10,20);
			//    console.dir(obj);

			//apply和call改变this的指向
			function Person(age, sex) {
				this.age = age;
				this.sex = sex;
			}
			//通过原型添加方法
			Person.prototype.sayHi = function (x, y) {
				console.log("您好啊:" + this.sex);
				return 1000;
			};
			var per = new Person(10, "男");
			per.sayHi();

			console.log("==============");
			function Student(name, sex) {
				this.name = name;
				this.sex = sex;
			}
			var stu = new Student("小明", "人妖");
			var r1 = per.sayHi.apply(stu, [10, 20]);
			var r2 = per.sayHi.call(stu, 10, 20);

			console.log(r1);
			console.log(r2);
		</script>
	</head>
	<body></body>
</html>
```

call 和 apply 方法总结：

- 都可以改变 this 的指向：上面的函数内 this 指向的表格数据

  - ```js
    function Person(age, sex) {
    	this.age = age;
    	this.sex = sex;
    }
    //通过原型添加方法
    Person.prototype.sayHi = function (x, y) {
    	console.log("您好啊:" + this.sex);
    	return 1000;
    };
    var per = new Person(10, "男");
    per.sayHi();

    console.log("==============");
    function Student(name, sex) {
    	this.name = name;
    	this.sex = sex;
    }
    var stu = new Student("小明", "人妖");
    var r1 = per.sayHi.apply(stu, [10, 20]);
    var r2 = per.sayHi.call(stu, 10, 20);

    console.log(r1);
    console.log(r2);
    ```

- apply 和 call 方法也是函数的调用的方式

  - 直接调用，什么参数都不传：

    - f1.apply();

    - f1.call();

- apply 和 call 方法中如果没有传入参数，或者是传入的是 null，那么调用该方法的函数对象中的 this 就是默认的 window

- apply 和 call 都可以让函数或者方法来调用，传入参数和函数自己调用的写法不一样，但是效果是一样的，函数内有返回值，可以定义变量接收

  - var result1=f1.apply(null,[10,20]);

  - var result2=f1.call(null,10,20);

  - console.log(result1);

  - console.log(result2);

### bind

bind 文档：[Function.prototype.bind() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

- bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的 call 属性）。

- 当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。

- 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

**语法**：

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

**参数**：

- thisArg

  - 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。

- arg1, arg2, ...

  - 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

**返回值**：

返回由指定的 this 值和初始化参数改造的原函数拷贝。

**示例 1**：

```javascript
this.x = 9;
var module = {
	x: 81,
	getX: function () {
		return this.x;
	},
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

**示例 2**：

```javascript
function LateBloomer() {
	this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function () {
	window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
	console.log("I am a beautiful flower with " + this.petalCount + " petals!");
};

var flower = new LateBloomer();
flower.bloom(); // 一秒钟后, 调用'declare'方法
```

例子：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			function f1(x, y) {
				console.log(x + y + ":=====>" + this.age);
			}

			//复制了一份的时候,把参数传入到了f1函数中,x===>10,y===>20,null就是this,默认就是window
			//bind方法是复制的意思,参数可以在复制的时候传进去,也可以在复制之后调用的时候传入进去

			function Person(age) {
				this.age = age;
			}
			Person.prototype.play = function () {
				console.log(this + "====>" + this.age);
			};

			function Student(age) {
				this.age = age;
			}
			var per = new Person(10);
			var stu = new Student(20);
			//复制了一份
			var ff = per.play.bind(stu);
			ff();
			//bind是用来复制一份
			//使用的语法:
			// 函数名字.bind(对象,参数1,参数2,...); ----> 返回值是复制之后的这个函数
			// 方法名字.bind(对象,参数1,参数2,...); ----> 返回值是复制之后的这个方法
		</script>
	</head>
	<body></body>
</html>
```

bind 方法的使用例子：通过对象,调用方法,产生随机数

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			//通过对象,调用方法,产生随机数

			function ShowRandom() {
				//1-10的随机数
				this.number = parseInt(Math.random() * 10 + 1);
			}
			//添加原型方法
			ShowRandom.prototype.show1 = function () {
				//改变了定时器中的this的指向了,本来应该是window,现在是实例对象了
				window.setInterval(this.show2.bind(this), 1000);
			};
			//添加原型方法
			ShowRandom.prototype.show2 = function () {
				//显示随机数--
				console.log(this.number);
			};
			//实例对象
			var sr = new ShowRandom();
			//调用方法,输出随机数字
			//调用这个方法一次,可以不停的产生随机数字,但是都是产生的同一个随机数
			sr.show1();
		</script>
	</head>
	<body></body>
</html>
```

### 小结

- call 和 apply 特性一样

  - 都是用来调用函数，而且是立即调用
  - 但是可以在调用函数的同时，通过第一个参数指定函数内部 `this` 的指向
  - call 调用的时候，参数必须以参数列表的形式进行传递，也就是以逗号分隔的方式依次传递即可
  - apply 调用的时候，参数必须是一个数组，然后在执行的时候，会将数组内部的元素一个一个拿出来，与形参一一对应进行传递
  - 如果第一个参数指定了 `null` 或者 `undefined` 则内部 this 指向 window

- bind

  - 可以用来指定内部 this 的指向，然后生成一个改变了 this 指向的新的函数
  - bind 方法，是复制一份的时候，再改变 this 的指向
  - 它和 call、apply 最大的区别是：bind 不会调用
  - bind 支持传递参数，它的传参方式比较特殊，一共有两个位置可以传递
    - 1. 在 bind 的同时，以参数列表的形式进行传递
    - 2. 在调用的时候，以参数列表的形式进行传递
    - 那到底以谁 bind 的时候传递的参数为准呢还是以调用的时候传递的参数为准
    - 两者合并：bind 的时候传递的参数和调用的时候传递的参数会合并到一起，传递到函数内部

## 不带括号执行 JavaScript 函数的七种方法

不带括号执行 JavaScript 函数的七种方法：

```js
alert`1337`;
throw ((onerror = alert), 1337);
Function`x${"alert\x281337\x29"}x`;
"alert\x281337\x29" instanceof { [Symbol["hasInstance"]]: eval };
valueOf = alert;
window + "";
x = new DOMMatrix();
matrix = alert;
x.a = 1337;
location = "javascript" + ":" + x;
```

下代码所示：alert`123`alert

```js
function x() {
	alert(arguments[0]);
	alert(arguments[1]);
}
x`x${"ale" + "rt(1)"}x`;
```

这里发生的事情是所有字符串都作为数组添加到第一个参数中，第二个参数获取字符串，但等等，为什么字符串作为第二个参数传递给函数？好吧，字符串的处理方式与占位符不同，没有占位符的普通字符串将作为数组添加到第一个参数中，而占位符将作为其类型的新参数添加。最后一点很重要，我当时没有意识到的是占位符被添加为参数，其类型而不是字符串！以下代码对此进行了演示：alert(1)alert(1)

```js
function x() {
	alert(arguments[0]);
	arguments[1]("hello");
}
function y(str) {
	alert(str);
}
x`x${y}x`;
```

太好了，这是很酷的行为，这意味着我们可以调用函数并使用任何类型的多个参数。
但是我们有一个问题，在标记模板中使用字符串时，它们将始终作为第一个参数添加，从而破坏使用第一个参数的函数。我们在这里的目标是使用我们选择的参数调用函数。
例如，我们可能想要调用，因为第一个参数接受一个函数或字符串，第三个参数使用该值调用该函数：setTimeout

```js
setTimeout(alert, 0, "I get passed to alert");
```

让我们尝试调用：setTimeout

```js
setTimeout`${alert}${0}${1}`; // Uncaught SyntaxError: Unexpected token ','
```

我们可以再次使用自定义函数看到发生了什么：

```js
function x() {
	console.log(arguments);
}
x`${alert}${0}${1}`;
```

控制台的屏幕截图，显示发送到函数的参数

因此，我们可以看到第一个参数包含一个空白字符串数组，最后的另一个数组再次充满空白字符串。当将这些数组转换为字符串时，我们会得到一堆逗号，这会导致语法错误。不知何故，我们需要函数忽略第一个参数，你怎么做？好吧，您可以使用，因为第一个参数将是分配给函数的“this”的数组，现在警报将作为第一个参数传递给函数，但是......setTimeoutsetTimeoutsetTimeout.callsetTimeout

```js
setTimeout.call`${alert}${0}${1}`; //Illegal invocation
```

因为你不再直接调用函数，JavaScript 会抛出一个异常来阻止你调用函数，因为“this”不再是窗口对象。我想游戏结束了，然后我意识到过去我做过一些 JS 黑客和其他。它们允许您调用函数而不会出现非法调用错误：[].sort

```js
[].sort.call`${alert}1337`;
```

当然，您可以使用其他函数，例如 和其他数组方法，例如：evalmap

```js
[].map.call`${eval}\\u{61}lert\x281337\x29`;
```

也可以使用：Reflect

显示一些使用 Reflect.apply 调用导航函数的代码

上面使用 Chrome 中的新方法导致有效负载来自。

为了调用，您需要为函数提供正确的“thisObject”，这是在第二个参数中完成的。在第三个参数中使用，该参数必须是发送到函数的参数数组。使用设置和应用的方法，您可以分配给几乎任何对象或调用任何函数！请注意，我使用“window.name”来隐藏有效负载，通常有效负载将来自另一个页面或域，方法是将其传递到跨域传递的窗口的“name”属性中。navigation.navigatewindow.namenavigateReflect.applywindow.nameReflect

## 函数的其它成员

- arguments
  - 函数的实参集合（**已弃用**）
  - 文档：[Function.arguments - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments)
- caller
  - 函数的调用者（**非标准**）
  - 文档：[Function.caller - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller)
- length
  - 函数的形参个数
  - 文档：[Function.length - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
- name
  - 函数实例的名称
  - 文档：[Function.name - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

```javascript
function fn(x, y, z) {
	console.log(fn.length); // => 形参的个数
	console.log(arguments); // 伪数组实参参数集合
	console.log(arguments.callee === fn); // 函数本身
	console.log(fn.caller); // 函数的调用者
	console.log(fn.name); // => 函数的名字
}

function f() {
	fn(10, 20, 30);
}

f();
```

## 高阶函数

- 函数可以作为参数
- 函数可以作为返回值

### 函数作为参数

```javascript
function eat(callback) {
	setTimeout(function () {
		console.log("吃完了");
		callback();
	}, 1000);
}

eat(function () {
	console.log("去唱歌");
});
```

函数作为参数练习案例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			//    var arr = [1, 100, 20, 200, 40, 50, 120, 10];
			//    //排序
			//    arr.sort();
			//    console.log(arr);

			var arr = [1, 100, 20, 200, 40, 50, 120, 10];
			//排序---函数作为参数使用,匿名函数作为sort方法的参数使用,那么此时的匿名函数中有两个参数,
			arr.sort(function (obj1, obj2) {
				if (obj1 > obj2) {
					return -1;
				} else if (obj1 == obj2) {
					return 0;
				} else {
					return 1;
				}
			});
			console.log(arr);

			var arr1 = ["acdef", "abcd", "bcedf", "bced"];
			arr1.sort(function (a, b) {
				if (a > b) {
					return 1;
				} else if (a == b) {
					return 0;
				} else {
					return -1;
				}
			});
			console.log(arr1);
		</script>
	</head>
	<body></body>
</html>
```

### 函数作为返回值

```javascript
function genFun(type) {
	return function (obj) {
		return Object.prototype.toString.call(obj) === type;
	};
}

var isArray = genFun("[object Array]");
var isObject = genFun("[object Object]");

console.log(isArray([])); // => true
console.log(isArray({})); // => true
```

函数作为返回值案例：

前置知识：多种数据格式使用.call 改变的 this 的指向

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>函数作为返回值练习</title>
		<script>
			//    function f1() {
			//      console.log("f1函数开始");
			//      return function () {
			//        console.log("我是函数,但是此时是作为返回值使用的");
			//      }
			//
			//    }
			//
			//    var ff=f1();
			//    ff();

			//    var num=10;
			//    console.log(typeof num);//获取num这个变量的数据类型
			//    var obj={};//对象
			//    //判断这个对象是不是某个类型的
			//    console.log(obj instanceof Object);
			//    //获取某个对象的数据类型的样子
			//    //Object.prototype.toString.call(对象);//此时得到的就是这个对象的类型的样子
			//
			//
			//
			//    //此时输出的是Object的数据类型   [object Object]
			//    console.log(Object.prototype.toString());
			//    //输出的数组的数据类型      [object Array]
			//    console.log(Object.prototype.toString.call([]));
			//
			//    var arr=[10,20,30];
			//    console.log(Object.prototype.toString.call(arr));
			//
			console.log(Object.prototype.toString.call(new Date()));

			//获取某个对象的类型是不是你传入的类型
			//[10,20,30] 是不是"[object Array]"
			//type---是变量----是参数----"[object Array]"
			//obj---是变量-----是参数----[10,20,30];

			//判断这个对象和传入的类型是不是同一个类型
			function getFunc(type) {
				return function (obj) {
					return Object.prototype.toString.call(obj) === type;
				};
			}

			var ff = getFunc("[object Array]");
			var result = ff([10, 20, 30]);
			console.log(result);

			var ff1 = getFunc("[object Object]");
			var dt = new Date();
			var result1 = ff1(dt);
			console.log(result1);
		</script>
	</head>
	<body></body>
</html>
```

函数作为返回值-电影信息排序练习：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>函数作为返回值-电影信息排序练习</title>
		<script>
			// 排序,每个文件都有名字，大小,时间,都可以按照某个属性的值进行排序

			// 三部电影,电影有名字,大小,上映时间
			function File(name, size, time) {
				this.name = name; // 电影名字
				this.size = size; // 电影大小
				this.time = time; // 电影的上映时间
			}
			var f1 = new File("jack.avi", "400M", "1997-12-12");
			var f2 = new File("tom.avi", "200M", "2017-12-12");
			var f3 = new File("xiaosu.avi", "800M", "2010-12-12");
			var arr = [f1, f2, f3];

			function fn(attr) {
				// 函数作为返回值
				return function getSort(obj1, obj2) {
					if (obj1[attr] > obj2[attr]) {
						return 1;
					} else if (obj1[attr] == obj2[attr]) {
						return 0;
					} else {
						return -1;
					}
				};
			}

			var ff = fn("name");

			// 函数作为参数
			arr.sort(ff);
			for (var i = 0; i < arr.length; i++) {
				console.log(arr[i].name + "====>" + arr[i].size + "===>" + arr[i].time);
			}
		</script>
	</head>
	<body></body>
</html>
```

## 函数闭包

### 0.闭包前置：作用域、作用域链、预解析

- 变量---->局部变量和全局变量

- **作用域**：就是变量的使用范围

  - 局部作用域和全局作用域

  - js 的 ES5 语法中没有块级作用域（ES6 语法才有）---> 一对括号中定义的变量，这个变量可以在大括号外面使用

- **作用域链**：变量的使用, 从里向外, 层层的搜索, 搜索到了就可以直接使用了;

  - 层层搜索, 搜索到 0 级作用域的时候, 如果还是没有找到这个变量, 结果就是报错;

  - 函数中定义的变量是局部变量

- **预解析**：就是在浏览器解析代码之前,把变量的声明和函数的声明提前(提升)到该作用域的最上面

```javascript
{
	var foo = "bar";
}

console.log(foo);

if (true) {
	var a = 123;
}
console.log(a);
```

作用域链示例代码：

```javascript
var a = 10;

function fn() {
	var b = 20;

	function fn1() {
		var c = 30;
		console.log(a + b + c);
	}

	function fn2() {
		var d = 40;
		console.log(c + d);
	}

	fn1();
	fn2();
}
```

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			//变量---->局部变量和全局变量,
			//作用域:就是变量的使用范围
			//局部作用域和全局作用域
			//js中没有块级作用域---一对括号中定义的变量,这个变量可以在大括号外面使用
			//函数中定义的变量是局部变量

			//    while(true){
			//      var num=10;
			//      break;
			//    }
			//    console.log(num);
			//
			//    {
			//      var num2=100;
			//    }
			//    console.log(num2);
			//
			//    if(true){
			//      var num3=1000;
			//    }
			//    console.log(num3);

			//    function f1() {
			//      //局部变量
			//      var num=10;
			//    }
			//    console.log(num);

			// 作用域链: 变量的使用, 从里向外, 层层的搜索, 搜索到了就可以直接使用了;
			// 层层搜索, 搜索到0级作用域的时候, 如果还是没有找到这个变量, 结果就是报错;
			var num = 10; //作用域链 级别:0
			var num2 = 20;
			var str = "abc";
			function f1() {
				var num2 = 20;
				function f2() {
					var num3 = 30;
					console.log(num);
				}
				f2();
			}
			f1();

			//预解析:就是在浏览器解析代码之前,把变量的声明和函数的声明提前(提升)到该作用域的最上面

			//变量的提升
			console.log(num);
			var num = 100;

			//函数的声明被提前了
			f1();
			function f1() {
				console.log("这个函数,执行了");
			}

			var f2;
			f2 = function () {
				console.log("小杨好帅哦");
			};
			f2();
		</script>
	</head>
	<body></body>
</html>
```

- 内层作用域可以访问外层作用域，反之不行

### 1.什么是闭包

1. 闭包就是能够读取其他函数内部变量的函数，

   1. 函数 A 中,有一个函数 B,函数 B 中可以访问函数 A 中定义的变量或者是数据,此时形成了闭包(这句话暂时不严谨)

2. 由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，
   因此可以把闭包简单理解成 “定义在一个函数内部的函数”。

3. 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

### 2.闭包的用途

- 可以在函数外部读取函数内部成员（延长作用域链）
- 让函数内成员始终存活在内存中（缓存数据）

### 3.闭包的模式

- 函数模式的闭包

  - ```js
    // 函数模式的闭包：在一个函数中有一个函数，调用最外面的函数，里面的函数也会执行
    function f1() {
    	var num = 10;
    	//函数的声明
    	function f2() {
    		console.log(num);
    	}
    	//函数调用
    	f2();
    }
    f1();
    ```

- 对象模式的闭包

  - ```js
    // 对象模式的闭包：函数中有一个对象
    function f3() {
    	var num = 10;
    	var obj = {
    		age: num,
    	};
    	console.log(obj.age); //10
    }
    f3();
    ```

### 4.简单的闭包示例

示例 0：两种函数闭包示范

```js
// 闭包：函数内定义了变量，返回出去，外面能访问，外面能拿到值
function f1() {
	var num = 10;
	return function () {
		console.log(num);
		return num;
	};
}

var ff = f1();
var result = ff();
console.log(result);

// 闭包：函数内定义了变量，变量在函数外能拿到
function f2() {
	var num = 100;
	return {
		age: num,
	};
}

var obj = f2();
console.log(obj.age);
```

示例 1：函数内返回值为函数的闭包

```javascript
function fn() {
	var count = 0;
	return {
		getCount: function () {
			console.log(count);
		},
		setCount: function () {
			count++;
		},
	};
}

var fns = fn();

fns.getCount(); // => 0
fns.setCount();
fns.getCount(); // => 1
```

示例 2：普通的函数的++和函数模式的闭包++的连续调用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			// 普通的函数：不会累加
			function f1() {
				var num = 10;
				num++;
				return num;
			}
			console.log(f1()); // 11
			console.log(f1()); // 11
			console.log(f1()); // 11

			// 函数模式的闭包：累加
			function f2() {
				var num = 10;
				return function () {
					num++;
					return num;
				};
			}
			var ff = f2();
			console.log(ff()); // 11
			console.log(ff()); // 12
			console.log(ff()); // 13
		</script>
	</head>
	<body></body>
</html>
```

---

示例 3：for 循环内的数组每个属性函数闭包

```javascript
var arr = [10, 20, 30];
for (var i = 0; i < arr.length; i++) {
	arr[i] = function () {
		console.log(i);
	};
}
```

---

示例 4：for 循环内的定时器函数闭包

```javascript
console.log(111);

for (var i = 0; i < 3; i++) {
	setTimeout(function () {
		console.log(i);
	}, 0);
}
console.log(222);
```

---

示例 5：闭包点赞投票案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>闭包点赞投票案例</title>
		<style>
			ul {
				list-style-type: none;
			}
			li {
				float: left;
				margin-left: 10px;
			}
			img {
				width: 200px;
				height: 180px;
			}
			input {
				margin-left: 30%;
			}
		</style>
		<script>
			//$永远都是24k纯帅的十八岁的杨哥$
		</script>
	</head>
	<body>
		<ul>
			<li>
				<img src="images/ly.jpg" alt="" /><br /><input
					type="button"
					value="赞(1)"
				/>
			</li>
			<li>
				<img src="images/lyml.jpg" alt="" /><br /><input
					type="button"
					value="赞(1)"
				/>
			</li>
			<li>
				<img src="images/fj.jpg" alt="" /><br /><input
					type="button"
					value="赞(1)"
				/>
			</li>
			<li>
				<img src="images/bd.jpg" alt="" /><br /><input
					type="button"
					value="赞(1)"
				/>
			</li>
		</ul>
		<script>
			// 获取所有的按钮
			// 根据标签名字获取元素
			function my$(tagName) {
				return document.getElementsByTagName(tagName);
			}
			// 闭包缓存数据
			function getValue() {
				var value = 2;
				return function () {
					//每一次点击的时候,都应该改变当前点击按钮的value值
					this.value = "赞(" + value++ + ")";
				};
			}
			// 获取所有的按钮
			var btnObjs = my$("input");
			// 循环遍历每个按钮,注册点击事件
			for (var i = 0; i < btnObjs.length; i++) {
				//注册事件
				btnObjs[i].onclick = getValue();
			}

			// 错误，点击所有会每个点击事件都累加在一个数值
			//  var btnObjs=my$("input");
			//  var value=1;
			//  //循环遍历每个按钮
			//  for(var i=0;i<btnObjs.length;i++){
			//
			//    //为每个按钮注册点击事件
			//    btnObjs[i].onclick=function () {
			//      console.log("哈哈");
			//      this.value="赞("+(value++)+")";
			//    };
			//  }
		</script>
	</body>
</html>
```

---

示例 6：沙箱模式--定义使用的变量等元素不会跟外面的冲突，环境独立

```js
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>title</title>
  <script>
   //沙箱:环境,黑盒,在一个虚拟的环境中模拟真实世界,做实验,实验结果和真实世界的结果是一样,但是不会影响真实世界

   // var num = 10;
   // console.log(num + 10);

   // // 立即执行函数沙箱---小环境
   // (function () {
   //  var num = 10;
   //  console.log(num);
   // })();

   // // 立即执行函数沙箱---小环境
   // (function () {
   //  var num = 20;
   //  console.log(num + 10);
   // })();

            // // 变量和沙箱里面不冲突
   // var num = 100;
   // (function () {
   //  var num = 10;
   //  console.log(num); //10
   // })();

   // console.log(num); //100

   // 沙箱小案例
   (function () {
    var str = "小白喜欢小黑";
    str = str.substr(2);
    console.log(str);
   })();

   // 沙箱
   (function () {
    var str = "小明喜欢小红";
    str = str.substr(2);
    console.log(str);
   })();
  </script>
 </head>
 <body>
  <input type="button" value="按钮" id="btn" />
  <script>
   //点击按钮,弹出对话框
   (function () {
    document.getElementById("btn").onclick = function () {
     console.log("按钮被点击了");
    };
   })();
  </script>
 </body>
</html>
```

沙箱案例 2：元素的操作

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
	</head>
	<body>
		<div>这是div</div>
		<div>这是div</div>
		<div>这是div</div>
		<p>这是p</p>
		<p>这是p</p>
		<p>这是p</p>
		<script>
			// 跟函数同名的变量
			var getTag = 10;
			var dvObjs = 20;
			var pObjs = 30;

			(function () {
				// 根据标签名字获取元素
				function getTag(tagName) {
					return document.getElementsByTagName(tagName);
				}
				// 获取所有的div
				var dvObjs = getTag("div");
				for (var i = 0; i < dvObjs.length; i++) {
					dvObjs[i].style.border = "2px solid pink";
				}
				// 获取所有的p
				var pObjs = getTag("p");
				for (var i = 0; i < pObjs.length; i++) {
					pObjs[i].style.border = "2px solid pink";
				}
			})();
			console.log(getTag);
			console.log(dvObjs);
			console.log(pObjs);
		</script>
	</body>
</html>
```

---

示例 7：产生多个相同的随机数

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			// 普通的函数生成不同的随机数
			function showRandom() {
				var num = parseInt(Math.random() * 10 + 1);
				console.log(num);
			}

			showRandom();
			showRandom();
			showRandom();

			//闭包的方式,产生三个随机数,但是都是相同的（因为数据被闭包缓存了）
			function f1() {
				// 想要缓存的变量放置在这里的作用域
				var num = parseInt(Math.random() * 10 + 1);
				return function () {
					console.log(num);
				};
			}

			var ff = f1();

			ff();
			ff();
			ff();

			//总结：如果想要缓存数据,就把这个数据放在外层的函数和里层的函数的中间位置

			//闭包的作用：缓存数据.优点也是缺陷,没有及时的释放

			//局部变量是在函数中,函数使用结束后,局部变量就会被自动的释放
			//闭包后,里面的局部变量的使用作用域链就会被延长
		</script>
	</head>
	<body></body>
</html>
```

---

### 5.闭包的思考题

思考题 1：

```javascript
var name = "The Window";
var object = {
	name: "My Object",
	getNameFunc: function () {
		return function () {
			return this.name;
		};
	},
};

console.log(object.getNameFunc()());
```

思考题 2：

```javascript
var name = "The Window";
var object = {
	name: "My Object",
	getNameFunc: function () {
		var that = this;
		return function () {
			return that.name;
		};
	},
};
console.log(object.getNameFunc()());
```

## 函数递归

递归：函数中调用函数自己，此时就是递归

递归一定要有结束的条件

### 递归执行模型

```javascript
function fn1() {
	console.log(111);
	fn2();
	console.log("fn1");
}

function fn2() {
	console.log(222);
	fn3();
	console.log("fn2");
}

function fn3() {
	console.log(333);
	fn4();
	console.log("fn3");
}

function fn4() {
	console.log(444);
	console.log("fn4");
}

fn1();
```

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			var i = 0;
			function f1() {
				i++;
				if (i < 5) {
					f1();
				}
				console.log("从前有个山,山里有个庙,庙里有个和尚给小和尚讲故事:");
			}

			f1();
		</script>
	</head>
	<body></body>
</html>
```

### 递归的案例

计算阶乘的递归函数：

```javascript
function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}
```

案例综合：

- for 循环实现：求 n 个数字的和，5 计算 1+2+3+4+5

- 递归实现：求 n 个数字的和：n=5 ---> 5+4+3+2+1

- 递归案例：求一个数字各个位数上的数字的和：123 ---> 6 ---> 1+2+3

- 递归案例：求斐波那契数列

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>递归案例综合</title>
		<script>
			// for循环实现：求n个数字的和,5 计算1+2+3+4+5
			//    var sum=0;
			//    for(var i=1;i<=5;i++){
			//      sum+=i;
			//    }
			//    console.log(sum);

			// 递归实现：求n个数字的和：n=5 --->  5+4+3+2+1
			// 函数的声明
			//    function getSum(x) {
			//      if(x==1){
			//        return 1;
			//      }
			//      return x+getSum(x-1);
			//    }
			//    // 函数的调用
			//    console.log(getSum(5));

			/*
			 *
			 * getSum函数执行过程:
			 * 代码执行getSum(5)--->进入函数,此时的x是5,执行的是5+getSum(4),此时代码等待
			 * 此时5+getSum(4),代码先不进行计算,先执行getSum(4),进入函数,执行的是4+getSum(3),等待, 先执行的是getSum(3),进入函数,执行3+getSum(2),等待,先执行getSum(2),进入函数,执行 2+getSum(1);等待, 先执行getSum(1),执行的是x==1的判断,return 1,所以,
			 * 此时getSum(1)的结果是1,开始向外走出去
			 * 2+getSum(1) 此时的结果是:2+1
			 * 执行:
			 * getSum(2)---->2+1
			 * 3+getSum(2) 此时的结果是3+2+1
			 * 4+getSum(3) 此时的结果是4+3+2+1
			 * 5+getSum(4) 此时的结果是5+4+3+2+1
			 *
			 * 结果:15
			 *
			 *
			 *
			 * */

			// 递归案例：求一个数字各个位数上的数字的和：123 ---> 6 ---> 1+2+3
			function getEverySum(x) {
				if (x < 10) {
					return x;
				}
				// 获取的是这个数字的个位数
				return (x % 10) + getEverySum(parseInt(x / 10));
			}
			console.log(getEverySum(1364)); //5

			// 递归案例：求斐波那契数列
			function getFib(x) {
				if (x == 1 || x == 2) {
					return 1;
				}
				return getFib(x - 1) + getFib(x - 2);
			}
			console.log(getFib(12));
		</script>
	</head>
	<body></body>
</html>
```

### 递归应用场景

- 深拷贝：是复制，深：把一个对象中所有的属性或者方法，一个一个的找到，并且在另一个对象中开辟相应的空间，一个一个的存储到另一个对象中

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<title>递归函数实现深拷贝</title>
  		<script>
  			//深拷贝:拷贝还是复制,深:把一个对象中所有的属性或者方法,一个一个的找到.并且在另一个对象中开辟相应的空间,一个一个的存储到另一个对象中
  			var obj1 = {
  				age: 10,
  				sex: "男",
  				car: ["奔驰", "宝马", "特斯拉", "奥拓"],
  				dog: {
  					name: "大黄",
  					age: 5,
  					color: "黑白色",
  				},
  			};

  			var obj2 = {}; //空对象
  			//通过函数实现,把对象a中的所有的数据深拷贝到对象b中
  			function extend(a, b) {
  				for (var key in a) {
  					//先获取a对象中每个属性的值
  					var item = a[key];
  					//判断这个属性的值是不是数组
  					if (item instanceof Array) {
  						//如果是数组,那么在b对象中添加一个新的属性,并且这个属性值也是数组
  						b[key] = [];
  						//调用这个方法，把a对象中这个数组的属性值一个一个的复制到b对象的这个数组属性中
  						extend(item, b[key]);
  					} else if (item instanceof Object) {
  						//判断这个值是不是对象类型的
  						//如果是对象类型的,那么在b对象中添加一个属性,是一个空对象
  						b[key] = {};
  						//再次调用这个函数,把a对象中的属性对象的值一个一个的复制到b对象的这个属性对象中
  						extend(item, b[key]);
  					} else {
  						//如果值是普通的数据,直接复制到b对象的这个属性中
  						b[key] = item;
  					}
  				}
  			}

  			extend(obj1, obj2);
  			console.dir(obj1);
  			console.dir(obj2);
  		</script>
  	</head>
  	<body></body>
  </html>
  ```

````
- 浅拷贝的写法：拷贝就是复制，就相当于把一个对象中的所有的内容，复制一份给另一个对象，直接复制，或者说,就是把一个对象的地址给了另一个对象，他们指向相同，两个对象之间有共同的属性或者方法，都可以使用

- ```html
  <!DOCTYPE html>
  <html lang="en">
   <head>
    <meta charset="UTF-8" />
    <title>浅拷贝</title>
    <script>
     // 浅拷贝：拷贝就是复制,就相当于把一个对象中的所有的内容,复制一份给另一个对象,直接复制,或者说,就是把一个对象的地址给了另一个对象,他们指向相同,两个对象之间有共同的属性或者方法,都可以使用
     var obj1 = {
      age: 10,
      sex: "男",
      car: ["奔驰", "宝马", "特斯拉", "奥拓"],
     };
     // 另一个对象
     var obj2 = {};

     // 写一个函数,作用：把一个对象的属性复制到另一个对象中,浅拷贝
     // 把a对象中的所有的属性复制到对象b中
     function extend(a, b) {
      for (var key in a) {
       b[key] = a[key];
      }
     }
     extend(obj1, obj2);
     console.dir(obj2); // 开始的时候这个对象是空对象
     console.dir(obj1); // 有属性
    </script>
   </head>
   <body></body>
  </html>


````

- 菜单树

```html

```

- 遍历 DOM 树

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<title>遍历DOM树</title>
  	</head>

  	<body>
  		<h1>遍历 DOM 树</h1>
  		<p style="color: green">Tip: 可以在遍历的回调函数中任意定制需求</p>
  		<div>
  			<ul>
  				<li>123</li>
  				<li>456</li>
  				<li>789</li>
  			</ul>
  			<div>
  				<div>
  					<span>haha</span>
  				</div>
  			</div>
  		</div>
  		<div id="demo_node">
  			<ul>
  				<li>123</li>
  			</ul>
  			<p>hello</p>
  			<h2>world</h2>
  			<div>
  				<p>dsa</p>
  				<h3>
  					<span>dsads</span>
  				</h3>
  			</div>
  		</div>
  		<script>
  			//获取页面中的根节点--根标签
  			var root = document.documentElement; //html
  			//函数遍历DOM树
  			//根据根节点,调用fn的函数,显示的是根节点的名字
  			function forDOM(root1) {
  				//调用f1,显示的是节点的名字
  				// f1(root1);
  				//获取根节点中所有的子节点
  				var children = root1.children;
  				//调用遍历所有子节点的函数
  				forChildren(children);
  			}
  			//给我所有的子节点,我把这个子节点中的所有的子节点显示出来
  			function forChildren(children) {
  				//遍历所有的子节点
  				for (var i = 0; i < children.length; i++) {
  					//每个子节点
  					var child = children[i];
  					//显示每个子节点的名字
  					f1(child);
  					//判断child下面有没有子节点,如果还有子节点,那么就继续的遍历
  					child.children && forDOM(child);
  				}
  			}
  			//函数调用,传入根节点
  			forDOM(root);
  			function f1(node) {
  				console.log("节点的名字:" + node.nodeName);
  			}

  			// 节点：nodeName,nodeType,nodeValue

  			//  第一个函数：给我根节点,我会找到所有的子节点:forDOM(根节点)
  			//  获取这个根节点的子节点
  			//  var children=根节点的.children
  			//  调用第二个函数
  			//
  			//  第二个函数：给我所有的子节点,我把每个子节点的名字显示出来(children)
  			//  for(var i=0;i<children.length;i++){
  			//    每个子节点
  			//    var child=children[i];
  			//    f1(child);给我节点,我显示该节点的名字
  			//    child是子节点,但是如果child里面还有子节点,此时child就是爹了
  			//    child.children&&第一个函数(child)
  			//  }
  		</script>
  	</body>
  </html>
  ```

---
