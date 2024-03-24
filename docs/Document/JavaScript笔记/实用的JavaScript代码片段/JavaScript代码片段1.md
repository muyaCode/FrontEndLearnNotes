# JavaScript 代码片段 1

## 代码片段转截图

开源地址：https://github.com/abi/screenshot-to-code

官方介绍：放入屏幕截图并将其转换为干净的代码（HTML/Tailwind/React/Vue）

## 1. 获取浏览器 Cookie 的值

使用 document.cookie 来获取 Cookie 的值。

```js
const cookie = (name) =>
	`; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();

cookie("_ga");
// Result: "GA1.2.1929736587.1601974046"
```

## 2. 将 RGB 转换为十六进制

```js
const rgbToHex = (r, g, b) =>
	"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);
// Result: #0033ff`
```

## 3. 复制到剪贴板

使用 navigator.clipboard.writeText 轻松将任何文本复制到剪贴板上。

```js
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("Hello World");
```

## 4.检查日期是否有效

使用以下代码段检查日期是否有效。

```js
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
isDateValid("December 17, 1995 03:24:00");
// Result: true
```

## 5.找出一年中的某一天

查找日期中的某一天。

```js
const dayOfYear = (date) =>
	Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date());
// Result: 272
```

## 将 6.字符串首字母大写

Javascript 没有内置的大写函数，因此我们可以使用以下代码。

```js
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
capitalize("follow for more");
// Result: Follow for more
```

## 7.计算两天之间相差的天数

使用以下代码段查找给定 2 天之间相差的天数。

```js
const dayDif = (date1, date2) =>
	Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
dayDif(new Date("2020-10-21"), new Date("2021-10-22"));
// Result: 366
```

## 8.清除所有 Cookie

通过使用 document.cookie 可以轻松清除存储在网页中的所有 cookie 。

```js
const clearCookies = document.cookie
	.split(";")
	.forEach(
		(cookie) =>
			(document.cookie = cookie
				.replace(/^ +/, "")
				.replace(/=.\*/, `=;expires=${new Date(0).toUTCString()};path=/`))
	);
```

## 9. 生成随机十六进制

使用 Math.random 和 padEnd 属性生成随机的十六进制。

```js
const randomHex = () =>
	`#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padEnd(6, "0")}`;
console.log(randomHex());
// Result: #92b008
```

## 10. 数组去重

使用 SetJavaScript 可以轻松地删除重复项。超级有用！

```js
const removeDuplicates = (arr) => [...new Set(arr)];
console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));
// Result: [ 1, 2, 3, 4, 5, 6 ]
```

## 11. 从 URL 获取查询参数

通过 window.location 或原始 URL 轻松查询 goole.com?search=easy&page=3 的参数。

```js
const getParameters = (URL) => {
    URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
    return JSON.stringify(URL);
};
getParameters(window.location)
// Result: { search : "easy", page : 3 }

/---------------or-------------/

Object.fromEntries(new URLSearchParams(window.location.search))
```

## 12. 从日期获取“时分秒”格式的时间

我们可以从日期中，获取到 hour : minutes : seconds 格式的时间：

```js
const timeFromDate = (date) => date.toTimeString().slice(0, 8);
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
// Result: "17:30:00"
```

## 13. 确认奇偶数

```js
const isEven = (num) => num % 2 === 0;
console.log(isEven(2));
// Result: True
/---------------------or----------------/;
const isEven = (num) => (num & 1) === 0;
console.log(isEven(2));
// Result: True
```

## 14. 求平均值

使用 reduce 方法找到多个数字的平均值。

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4);
// Result: 2.5
```

## 15. 回到顶部

使用 window.scrollTo(0, 0) 方法自动回到顶部。将 x 和 y 都设置为 0。

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop();
```

## 16. 翻转字符串

使用 split,reverse 和 join 方法轻松翻转字符串。

```js
const reverse = (str) => str.split("").reverse().join("");
reverse("hello world");
// Result: 'dlrow olleh'
```

## 17. 检查数组是否为空

检查数组是否为空的简单代码，结果将返回 true 或 false。

```js
const isNotEmpty = (arr) => Array.isArray(arr) && arr.length > 0;
isNotEmpty([1, 2, 3]);
// Result: true
```

## 18. 获取用户选定的文本

使用内置 getSelection 属性获取用户选择的文本。

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```

## 19. 打乱数组

使用 sort 和 random 方法对数组进行打乱混合。

```js
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
console.log(shuffleArray([1, 2, 3, 4]));
// Result: [ 1, 4, 3, 2 ]
```

## 20. 检测用户是否处于暗模式

使用以下代码检查用户的设备是否处于暗模式。

```js
const isDarkMode =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(isDarkMode); // Result: True or False
```

## 其他

### 1、深浅拷贝

- 首先浅拷贝和深拷贝只针对引用类型

#### （1）浅拷贝

- 浅拷贝：拷贝对象的属性的值（`简单类型`存的值就是`值本身`，`引用类型`存的值是`对象的堆地址`），所以如果拷贝的对象值中有`引用类型属性`，拷贝后的新对象属性和源对象属性指向同一个对地址，`修改`此指向的对象会`相互影响`。
- 常见方法：
  - 拷贝对象：Object.assgin() 或者 展开运算符 {...obj}
  - 拷贝数组：Array.prototype.concat() 或者 [...arr]

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>浅拷贝</title>
	</head>

	<body>
		<script>
			const user = {
				uname: "pink",
				age: 18,
				family: {
					baby: "小pink",
				},
			};

			// 浅拷贝
			const o1 = { ...user };
			o1.age = 20; //对象属性值类型修改不影响
			console.log(o1.age); //20
			console.log(user.age); //18

			// 浅拷贝
			const o2 = {};
			Object.assign(o2, user);
			o2.age = 20;
			o2.family.baby = "老pink"; //对象属性引用类型修改会相互影响
			console.log(o2.family.baby); //老pink
			console.log(user.family.baby); //老pink
		</script>
	</body>
</html>
```

#### （2）深拷贝

- 深拷贝：拷贝对象属性的时候，遇到引用类型就创建一个新对象，然后递归，直至所有字段全部拷贝完成。
- 常见方法：
  - 递归函数实现深拷贝
    - 如果一个函数在内部可以调用其本身，那么这个函数就是递归函数
    - 由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件 return
  - lodash.cloneDeep 实现深拷贝
  - JSON.stringify 实现深拷贝

**递归函数实现深拷贝：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>递归函数实现深拷贝</title>
	</head>

	<body>
		<script>
			const obj = {
				uname: "pink",
				age: 18,
				hobby: ["乒乓球", "足球"],
				family: {
					baby: "小pink",
				},
			};
			const o = {};

			// 拷贝函数
			function deepCopy(newObj, oldObj) {
				for (let k in oldObj) {
					// 处理数组
					if (oldObj[k] instanceof Array) {
						newObj[k] = [];
						deepCopy(newObj[k], oldObj[k]);
						// 处理对象
					} else if (oldObj[k] instanceof Object) {
						newObj[k] = {};
						deepCopy(newObj[k], oldObj[k]);
						//值类型
					} else {
						newObj[k] = oldObj[k];
					}
				}
			}

			// 函数调用  两个参数 o 新对象  obj 旧对象
			deepCopy(o, obj);
			o.age = 20;
			o.hobby[0] = "篮球";
			o.family.baby = "老pink";
			console.log(o.age); //20
			console.log(o.hobby[0]); //篮球
			console.log(o.family.baby); //老pink
			console.log(obj.age); //18
			console.log(obj.hobby[0]); //乒乓球
			console.log(obj.family.baby); //小pink
		</script>
	</body>
</html>
```

**lodash.cloneDeep 实现深拷贝：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>lodash.cloneDeep实现深拷贝</title>
	</head>

	<body>
		<!-- 先引用 -->
		<script src="./lodash.min.js"></script>
		<script>
			const obj = {
				uname: "pink",
				age: 18,
				hobby: ["乒乓球", "足球"],
				family: {
					baby: "小pink",
				},
			};
			const o = _.cloneDeep(obj);
			o.age = 20;
			o.hobby[0] = "篮球";
			o.family.baby = "老pink";
			console.log(o.age); //20
			console.log(o.hobby[0]); //篮球
			console.log(o.family.baby); //老pink
			console.log(obj.age); //18
			console.log(obj.hobby[0]); //乒乓球
			console.log(obj.family.baby); //小pink
		</script>
	</body>
</html>
```

**JSON.stringify 实现深拷贝：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>JSON.stringify实现深拷贝</title>
	</head>

	<body>
		<script>
			const obj = {
				uname: "pink",
				age: 18,
				hobby: ["乒乓球", "足球"],
				family: {
					baby: "小pink",
				},
			};
			// 把对象转换为 JSON 字符串
			const o = JSON.parse(JSON.stringify(obj));
			o.age = 20;
			o.hobby[0] = "篮球";
			o.family.baby = "老pink";
			console.log(o.age); //20
			console.log(o.hobby[0]); //篮球
			console.log(o.family.baby); //老pink
			console.log(obj.age); //18
			console.log(obj.hobby[0]); //乒乓球
			console.log(obj.family.baby); //小pink
		</script>
	</body>
</html>
```

### 2、异常处理

- 异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

#### （1）throw 抛异常

- throw `抛出异常信息`，程序也`会终止执行`
- throw 后面跟的是错误提示信息
- Error 对象配合 throw 使用，能够设置更详细的错误信息

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>throw抛出异常</title>
	</head>

	<body>
		<script>
			function fn(x, y) {
				if (!x || !y) {
					// throw '没有参数传递进来'
					throw new Error("没有参数传递过来");
				}

				return x + y;
			}
			console.log(fn());
		</script>
	</body>
</html>
```

![image-20230530140409885](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79452df8b6bd4401b93100285a7e2f3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### （2）try /catch 捕获异常

- try...catch 用于捕获错误信息
- 将预估可能发生错误的代码写在 try 代码段中
- 如果 try 代码段中出现错误后，会执行 catch 代码段，并截获到错误信息
- finally 不管是否有错误，都会执行

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>try-catch捕获异常</title>
	</head>

	<body>
		<p>123</p>
		<script>
			function fn() {
				try {
					// 可能发送错误的代码 要写到 try
					const p = document.querySelector(".p");
					p.style.color = "red";
				} catch (err) {
					// 拦截错误，提示浏览器提供的错误信息，但是不中断程序的执行
					console.log(err.message);
				} finally {
					// 不管你程序对不对，一定会执行的代码
					console.log("不管你程序对不对，一定会执行的代码");
				}
				console.log(11);
			}
			fn();
		</script>
	</body>
</html>
```

![image-20230530140903442](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a152fe21b63f4728bdbe3db6b239f2d6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### （3）debugger

- 可以在代码里面添加 debugger，用来断点调试代码

![image-20230530141922325](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/445afd843a6d47e69f8c267f1053d3c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 3、处理 this

#### （1）this 指向

- 普通函数 this 指向
  - 谁调用 this 的值指向谁
  - 普通函数没有明确调用者时 this 值为 window，严格模式下没有调用者时 this 的值为 undefined
- 箭头函数 this 指向
- 箭头函数中的并不存在 this，箭头函数中的 this 是绑定的最近作用域中的 this，向外层作用域中一层一层查找 this，直到有 this 的定义
- 不适用情况：构造函数，原型函数，字面量对象中函数，dom 事件函数等
- 适用情况：需要使用上层 this 的地方

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>普通函数的this指向</title>
	</head>

	<body>
		<button>点击</button>
		<script>
			// 普通函数：谁调用我，this就指向谁
			console.log(this); // window
			function fn() {
				console.log(this); // window
			}
			window.fn();
			window.setTimeout(function () {
				console.log(this); // window
			}, 1000);
			document.querySelector("button").addEventListener("click", function () {
				console.log(this); // 指向 button
			});
			const obj = {
				sayHi: function () {
					console.log(this); // 指向 obj
				},
			};
			obj.sayHi();
		</script>
	</body>
</html>
```

#### （2）改变 this

- JavaScript 中还允许指定函数中 this 的指向，有 3 个方法可以动态指定普通函数中 this 的指向

- call()

  - 使用 call 方法`调用函数`，同时`指定`被调用函数中 `this` 的值

  - 语法：

    ```
    fun.call(thisArg, arg1, arg2, ...)
    ```

    - thisArg：在 fun 函数运行时指定的 this 值
    - arg1，arg2：传递的其他参数
    - 返回值就是函数的返回值，因为它就是调用函数

- apply()

  - 使用 apply 方法`调用函数`，同时`指定`被调用函数中 `this` 的值

  - 语法：

    ```
    fun.apply(thisArg, [argsArray])
    ```

    - thisArg：在 fun 函数运行时指定的 this 值
    - argsArray：传递的值，`必须包含在数组里面`
    - 返回值就是函数的返回值，因为它就是调用函数
    - `因此 apply 主要跟数组有关系，比如使用 Math.max() 求数组的最大值`

- bind()

  - bind() 方法`不会调用函数`。`指定`被调用函数中 `this` 的值，返回新函数

  - 语法：

    ```
    fun.bind(thisArg, arg1, arg2, ...)
    ```

    - thisArg：在 fun 函数运行时指定的 this 值
    - arg1，arg2：传递的其他参数
    - 返回由指定的 this 值和初始化参数改造的 `原函数拷贝 （新函数）`
    - `因此只改变 this 指向，不调用函数时，使用 bind，比如改变定时器内部的this指向.`

**call 案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>call</title>
	</head>

	<body>
		<script>
			const obj = {
				uname: "pink",
			};

			function fn(x, y) {
				console.log(this); // window
				console.log(x + y);
			}

			// 1. 调用函数
			// 2. 改变this指向obj,原来是window调用指向window
			// 3. 返回值就是函数的返回值
			fn.call(obj, 1, 2);
		</script>
	</body>
</html>
```

**apply 案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>apply</title>
	</head>

	<body>
		<script>
			const obj = {
				age: 18,
			};

			function fn(x, y) {
				console.log(this);
				console.log(x + y);
			}
			// 1. 调用函数
			// 2. 改变this指向
			// 3. 返回值就是函数的返回值
			fn.apply(obj, [1, 2]);

			// 使用场景：求数组最大值最小值
			const arr = [100, 44, 77];
			const max = Math.max.apply(Math, arr);
			const min = Math.min.apply(null, arr);
			console.log(max, min);
		</script>
	</body>
</html>
```

**bind 案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>bind</title>
	</head>

	<body>
		<button>发送短信</button>
		<script>
			const obj = {
				age: 18,
			};

			function fn() {
				console.log(this);
			}

			// 1. bind不会调用函数
			// 2. 能改变this指向
			// 3. 返回值是个函数，但是这个函数里面的this是更改过的obj
			const fun = fn.bind(obj);
			fun();

			// 需求:有一个按钮，点击里面就禁用，2秒钟之后开启
			document.querySelector("button").addEventListener("click", function () {
				// 禁用按钮
				this.disabled = true;
				window.setTimeout(
					function () {
						// 在这个普通函数里面，我们要this由原来的window 改为 btn
						this.disabled = false;
					}.bind(this),
					2000
				); // 这里的this 和 btn 一样
			});
		</script>
	</body>
</html>
```

### 4、性能优化

#### （1）防抖

- 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会`重新计算`函数执行时间
- 使用场景：搜索框输入，设定每次输入完毕 n 秒后发送请求，如果期间还有输入，则重新计算时间

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>防抖</title>
		<style>
			.box {
				width: 500px;
				height: 500px;
				background-color: #ccc;
				color: #fff;
				text-align: center;
				font-size: 100px;
			}
		</style>
	</head>

	<body>
		<div class="box"></div>
		<script>
			const box = document.querySelector(".box");
			let i = 1;

			//数值加1
			function mouseMove() {
				box.innerHTML = ++i;
			}

			// 防抖函数
			function debounce(fn, t) {
				let timeId;
				return function () {
					// 如果有定时器就清除
					if (timeId) clearTimeout(timeId);

					// 开启定时器
					timeId = setTimeout(function () {
						fn();
					}, t);
				};
			}
			//鼠标移动触发函数
			box.addEventListener("mousemove", debounce(mouseMove, 1000));
		</script>
	</body>
</html>
```

#### （2）节流

- 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
- 使用场景： 鼠标移动，页面尺寸发生变化，滚动条滚动等开销比较大的情况下

**案例如下：**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>节流</title>
		<style>
			.box {
				width: 500px;
				height: 500px;
				background-color: #ccc;
				color: #fff;
				text-align: center;
				font-size: 100px;
			}
		</style>
	</head>

	<body>
		<div class="box"></div>
		<script>
			const box = document.querySelector(".box");
			let i = 1;

			//数值加1
			function mouseMove() {
				box.innerHTML = ++i;
			}

			// 节流函数
			function throttle(fn, t) {
				// 起始时间
				let startTime = 0;
				return function () {
					// 得到当前的时间
					let now = Date.now();

					// 判断如果大于等于 500 调用函数
					if (now - startTime >= t) {
						// 调用函数
						fn();

						// 起始的时间 = 现在的时间
						startTime = now;
					}
				};
			}
			box.addEventListener("mousemove", throttle(mouseMove, 1000));
		</script>
	</body>
</html>
```

#### （3）lodash 节流和防抖

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>lodash节流和防抖</title>
		<style>
			.box {
				width: 500px;
				height: 500px;
				background-color: #ccc;
				color: #fff;
				text-align: center;
				font-size: 100px;
			}
		</style>
	</head>

	<body>
		<div class="box"></div>
		<script src="./lodash.min.js"></script>
		<script>
			const box = document.querySelector(".box");
			let i = 1;

			//数值加1
			function mouseMove() {
				box.innerHTML = ++i;
			}

			// lodash 节流
			// box.addEventListener('mousemove', _.throttle(mouseMove, 500))
			// lodash 防抖
			box.addEventListener("mousemove", _.debounce(mouseMove, 500));
		</script>
	</body>
</html>
```

## 浏览器

### 实现全屏

当你需要将当前屏幕显示为全屏

```js
function fullScreen() {
	const el = document.documentElement;
	const rfs =
		el.requestFullScreen ||
		el.webkitRequestFullScreen ||
		el.mozRequestFullScreen ||
		el.msRequestFullscreen;
	if (typeof rfs != "undefined" && rfs) {
		rfs.call(el);
	}
}
fullScreen();
```

### 退出全屏

当你需要退出全屏

```js
function exitScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
	if (typeof cfs != "undefined" && cfs) {
		cfs.call(el);
	}
}
exitScreen();
```

### 页面打印

当你需要将当前页面打印出来

```js
window.print();
```

### 打印内容样式更改

当你需要将当前页面打印出来，但是需要修改一下当前排版

```html
<style>
	/* 使用@media print可以调整你需要的打印样式 */
	@media print {
		.noprint {
			display: none;
		}
	}
</style>
<div class="print">print</div>
<div class="noprint">noprint</div>
```

### 阻止关闭事件

当你需要防止用户刷新或者关闭浏览器，你可以选择触发 beforeunload 事件，部分浏览器不能自定义文本内容

```js
window.onbeforeunload = function () {
	return "您确定要离开haorooms博客吗？";
};
```

### 屏幕录制

当你需要将录制当前屏幕，并将录屏上传或下载

```js
const streamPromise = navigator.mediaDevices.getDisplayMedia();
streamPromise.then((stream) => {
	var recordedChunks = []; // 录制的视频数据

	var options = { mimeType: "video/webm; codecs=vp9" }; // 设置编码格式
	var mediaRecorder = new MediaRecorder(stream, options); // 初始化MediaRecorder实例

	mediaRecorder.ondataavailable = handleDataAvailable; // 设置数据可用（录屏结束）时的回调
	mediaRecorder.start();

	// 视频碎片合并
	function handleDataAvailable(event) {
		if (event.data.size > 0) {
			recordedChunks.push(event.data); // 添加数据，event.data是一个BLOB对象
			download(); // 封装成BLOB对象并下载
		}
	}

	// 文件下载
	function download() {
		var blob = new Blob(recordedChunks, {
			type: "video/webm",
		});
		// 此处可将视频上传到后端
		var url = URL.createObjectURL(blob);
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		a.href = url;
		a.download = "test.webm";
		a.click();
		window.URL.revokeObjectURL(url);
	}
});
```

### 判断横竖屏

当你需要对手机进行横屏或者竖屏的状态判断

```js
function hengshuping() {
	if (window.orientation == 180 || window.orientation == 0) {
		alert("竖屏状态！");
	}
	if (window.orientation == 90 || window.orientation == -90) {
		alert("横屏状态！");
	}
}
window.addEventListener(
	"onorientationchange" in window ? "orientationchange" : "resize",
	hengshuping,
	false
);
```

### 横竖屏样式变更

当你需要在横屏和竖屏的时候设置不同的样式时

```html
<style>
	@media all and (orientation: landscape) {
		body {
			background-color: #ff0000;
		}
	}

	@media all and (orientation: portrait) {
		body {
			background-color: #00ff00;
		}
	}
</style>
```

### 标签页显隐

当你需要对标签页显示隐藏进行事件监听时

```js
const { hidden, visibilityChange } = (() => {
	let hidden, visibilityChange;
	if (typeof document.hidden !== "undefined") {
		// Opera 12.10 and Firefox 18 and later support
		hidden = "hidden";
		visibilityChange = "visibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	}
	return {
		hidden,
		visibilityChange,
	};
})();

const handleVisibilityChange = () => {
	console.log("当前被隐藏", document[hidden]);
};

document.addEventListener(visibilityChange, handleVisibilityChange, false);
```

## 图片

### 本地图片预览

当你从客户端获取到一张图片但不能立刻上传到服务器，却需要预览的时候

```html
<div class="test">
	<input type="file" name="" id="" />
	<img src="" alt="" />
</div>
<script>
	const getObjectURL = (file) => {
		let url = null;
		if (window.createObjectURL != undefined) {
			// basic
			url = window.createObjectURL(file);
		} else if (window.webkitURL != undefined) {
			// webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		} else if (window.URL != undefined) {
			// mozilla(firefox)
			url = window.URL.createObjectURL(file);
		}
		return url;
	};
	document.querySelector("input").addEventListener("change", (event) => {
		document.querySelector("img").src = getObjectURL(event.target.files[0]);
	});
</script>
```

### 图片预加载

当你有大量图片的时候，你需要将图片进行预加载以免出现白屏的情况

```js
const images = [];
function preloader(args) {
	for (let i = 0, len = args.length; i < len; i++) {
		images[i] = new Image();
		images[i].src = args[i];
	}
}

preloader(["1.png", "2.jpg"]);
```

## js

### 字符串脚本化

当你需要将一串字符串转换成一个 js 脚本，该方法有 xss 漏洞，慎用

```js
const obj = eval('({ name: "jack" })');
// obj会被转换为对象{ name: "jack" }
const v = eval("obj");
// v会变成obj这个变量
```

### 递归函数名解耦

当你需要写一个递归函数的时候，你声明了一个函数名，但是每次修改函数名的时候总会忘记修改内部的函数名。argument 为函数内部对象，包含传入函数的所有参数，arguments.callee 代表函数名。

```js
// 这是一个最基础的斐波那契数列
function fibonacci(n) {
	const fn = arguments.callee;
	if (n <= 1) return 1;
	return fn(n - 1) + fn(n - 2);
}
```

## DOM 元素

### 隐显判断

当你需要对一个 dom 元素进行判断当前是否出现在页面视图内，你可以尝试用 IntersectionObserver 进行判断

```html
<style>
	.item {
		height: 350px;
	}
</style>

<div class="container">
	<div class="item" data-id="1">不可见</div>
	<div class="item" data-id="2">不可见</div>
	<div class="item" data-id="3">不可见</div>
</div>

<script>
	if (window?.IntersectionObserver) {
		let items = [...document.getElementsByClassName("item")]; // 解析为真数组，也可用 Array.prototype.slice.call()

		let io = new IntersectionObserver(
			(entries) => {
				entries.forEach((item) => {
					item.target.innerHTML =
						item.intersectionRatio === 1 // 元素显示比例，为1时完全可见，为0时完全不可见
							? `元素完全可见`
							: `元素部分不可见`;
				});
			},
			{
				root: null,
				rootMargin: "0px 0px",
				threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
			}
		);

		items.forEach((item) => io.observe(item));
	}
</script>
```

### 元素可编辑

当你需要在某个 dom 元素进行编辑，让它点击的时候就像一个 textarea

```html
<div contenteditable="true">这里是可编辑的内容</div>
```

### 元素属性监听

```html
<div id="test">test</div>
<button onclick="handleClick()">OK</button>

<script>
	const el = document.getElementById("test");
	let n = 1;
	const observe = new MutationObserver((mutations) => {
		console.log("属性发生变化了", mutations);
	});
	observe.observe(el, {
		attributes: true,
	});

	function handleClick() {
		el.setAttribute("style", "color: red");
		el.setAttribute("data-name", n++);
	}

	setTimeout(() => {
		observe.disconnect(); // 停止监听
	}, 5000);
</script>
```

### 打印 dom 元素

当你需要在开发过程中打印 dom 元素时，使用 console.log 往往只会打印出整个 dom 元素，而无法查看该 dom 元素的内部属性。你可以尝试使用 console.dir

```js
console.dir(document.body);
```

## 其他

### 激活应用

当你在移动端开发时，需要打开其他应用。以下方法也可以通过 location.href 赋值操作

```html
<a href="tel:12345678910">电话</a>

<a href="sms:12345678910,12345678911?body=你好">android短信</a>
<a href="sms:/open?addresses=12345678910,12345678911&body=你好">ios短信</a>

<a href="wx://">ios短信</a>
```

## 数组

### 生成数组

当你需要要生成一个 0-99 的数组
方案 1

```js
const createArr = (n) => Array.from(new Array(n), (v, i) => i);
const arr = createArr(100); // 0 - 99 数组
```

方案 2

```js
const createArr = (n) => new Array(n).fill(0).map((v, i) => i);
createArr(100); // 0 - 99数组
```

### 打乱数组

当你有一个数组，你需要打乱这个数组的排序

```js
const randomSort = (list) => list.sort(() => Math.random() - 0.5);
randomSort([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // 随机排列结果
```

### 数组简单数据去重

当你需要将数组中的所有重复的元素只保留一个

```js
const removeDuplicates = (list) => [...new Set(list)];
removeDuplicates([0, 0, 2, 4, 5]); // [0,2,4,5]
```

### 数组唯一值数据去重

根据唯一值对数组进行去重

```js
const duplicateById = (list) => [
	...list.reduce((prev, cur) => prev.set(cur.id, cur), new Map()).values(),
];
duplicateById([
	{ id: 1, name: "jack" },
	{ id: 2, name: "rose" },
	{ id: 1, name: "jack" },
]);
// [{id: 1, name: 'jack'}, {id: 2, name: 'rose'}]
```

### 多数组取交集

当你需要取多个数组中的交集

```js
const intersection = (a, ...arr) =>
	[...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9]);
// [3, 4]
```

### 查找最大值索引

但你需要找到一个数组中的最大值的索引

```js
const indexOfMax = (arr) =>
	arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2
```

### 查找最小值索引

当你需要找到一个数组中的最小值的索引

```js
const indexOfMin = (arr) =>
	arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);
indexOfMin([2, 5, 3, 4, 1, 0, 9]); // 5
```

### 找到最接近的数值

当你需要在一个数组中找到一个最接近的值

```js
const closest = (arr, n) =>
	arr.reduce((prev, curr) =>
		Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev
	);
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50); // 33
```

### 压缩多个数组

当你需要将多个数组压缩成一个数组

```js
const zip = (...arr) =>
	Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) =>
		arr.map((a) => a[i])
	);
zip([1, 2, 3, 4], ["a", "b", "c", "d"], ["A", "B", "C", "D"]);
// [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]
```

### 矩阵交换行和列

当你需要将一个矩阵的行和列进行互相交换

```javascript
const transpose = (matrix) =>
	matrix[0].map((col, i) => matrix.map((row) => row[i]));
transpose(
	[
		// [
		[1, 2, 3], //      [1, 4, 7],
		[4, 5, 6], //      [2, 5, 8],
		[7, 8, 9], //      [3, 6, 9],
	] //  ]
);
```

## 数字转换

### 进制转换

将 10 进制转换成 n 进制，可以使用 toString(n)

```js
const toDecimal = (num, n = 10) => num.toString(n);
// 假设数字10要转换成2进制
toDecimal(10, 2); // '1010'
```

将 n 进制转换成 10 进制，可以使用 parseInt(num, n)

```js
// 10的2进制为1010
const toDecimalism = (num, n = 10) => parseInt(num, n);
toDecimalism(1010, 2);
```

## 正则

### 手机号格式化

当你需要将手机号码格式化成 xxx-xxxx-xxxx 的形式

```javascript
const formatPhone = (str, sign = "-") =>
	str
		.replace(/(\W|\s)/g, "")
		.split(/^(\d{3})(\d{4})(\d{4})$/)
		.filter((item) => item)
		.join(sign);

formatPhone("13123456789"); // '131-2345-6789'
formatPhone("13 1234 56 789", " "); // '131 2345 6789'
```

### 去除多余空格

当你需要将一段文本中的多个空格合并成一个空格

```js
const setTrimOut = (str) => str.replace(/\s\s+/g, " ");
const str = setTrimOut("hello,   jack"); //
```

## web

### 重新加载当前页面

```js
const reload = () => location.reload();
reload();
```

### 滚动到页面顶部

如果你需要将页面翻到最顶部

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop();
```

### 元素滚动

如果你希望将一个元素顺滑的滚动到可视区域的起点

```js
const scrollToTop = (element) =>
	element.scrollIntoView({ behavior: "smooth", block: "start" });
scrollToTop(document.body);
```

如果你希望将一个元素顺滑的滚动到可视区域的终点

```js
const scrollToBottom = (element) =>
	element.scrollIntoView({ behavior: "smooth", block: "end" });
scrollToBottom(document.body);
```

### 检查当前是否 IE 浏览器

```js
const isIE = !!document.documentMode;
```

### 从给定文本中剥离 html

当你需要在某个文本中将里面的标签全部过滤掉

```js
const stripHtml = (html) =>
	new DOMParser().parseFromString(html, "text/html").body.textContent || "";
stripHtml("<div>test</div>"); // 'test'
```

### 重定向

当你需要跳转到其他页面

```js
const goTo = (url) => (location.href = url);
```

### 文本粘贴

当你需要复制文本到粘贴板上

```js
const copy = (text) =>
	navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
copy("你需要粘贴的文本");
```

## 日期

### 判断日期是否为今天

```js
const isToday = (date) =>
	date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
```

### 日期转换

当你需要将日期转换为为 YYYY-MM-DD 格式

```js
const formatYmd = (date) => date.toISOString().slice(0, 10);
formatYmd(new Date());
```

### 秒数转换

当你需要将秒数转换为 hh:mm:ss 格式

```js
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);
formatSeconds(200); // 00:03:20
```

### 获取某年某月的第一天

当你需要获取某年某月的第一天

```javascript
const getFirstDate = (d = new Date()) =>
	new Date(d.getFullYear(), d.getMonth(), 1);
getFirstDate(new Date("2022-04")); // Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)
```

### 获取某年某月的最后一天

当你需要获取某年某月的最后一天

```js
const getLastDate = (d = new Date()) =>
	new Date(d.getFullYear(), d.getMonth() + 1, 0);
getLastDate(new Date("2023-03-04")); // Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)
```

### 获取某年月份天数

当你需要获取某年某个月份的总天数

```js
const getDaysNum = (year, month) => new Date(year, month, 0).getDate();
const day = getDaysNum(2024, 2); // 29
```

## 函数

### 异步函数判断

判断一个函数是否属于异步函数

```js
const isAsyncFunction = (v) =>
	Object.prototype.toString.call(v) === "[object AsyncFunction]";
isAsyncFunction(async function () {}); // true
```

## 数字

### 截断数字

当你需要将小数点后的某些数字截断而不取四舍五入

```js
const toFixed = (n, fixed) =>
	`${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0];
toFixed(10.255, 2); // 10.25
```

### 四舍五入

当你需要将小数点后的某些数字截断，并取四舍五入

```js
const round = (n, decimals = 0) =>
	Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
round(10.255, 2); // 10.26
```

### 补零

当你需要在一个数字 num 不足 len 位数的时候前面补零操作

```js
const replenishZero = (num, len, zero = 0) =>
	num.toString().padStart(len, zero);
replenishZero(8, 2); // 08
```

## 对象

### 删除无效属性

当你需要删除一个对象中的属性值为 null 或 undefined 的所有属性

```javascript
const removeNullUndefined = (obj) =>
	Object.entries(obj).reduce(
		(a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
		{}
	);

removeNullUndefined({ name: "", age: undefined, sex: null }); // { name: '' }
```

### 反转对象键值

当你需要将对象的键值对交换

```js
const invert = (obj) =>
	Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
invert({ name: "jack" }); // {jack: 'name'}
```

### 字符串转对象

当你需要将一串字符串比如'{name: "jack"}'转换成对象时，直接使用 JSON.parse 将会报错。

```js
const strParse = (str) =>
	JSON.parse(
		str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, '"')
	);

strParse('{name: "jack"}');
```

## 其他

### 比较两个对象

当你需要比较两个对象，js 的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致。

```js
const isEqual = (...objects) =>
	objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
isEqual({ name: "jack" }, { name: "jack" }); // true
isEqual({ name: "jack" }, { name: "jack1" }, { name: "jack" }); // false
```

### 随机颜色生成

当你需要获取一个随机颜色

```js
const getRandomColor = () =>
	`#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
getRandomColor(); // '#4c2fd7'
```

### 颜色格式转换

当你需要将 16 进制的颜色转换成 rgb

```js
const hexToRgb = (hex) =>
	hex
		.replace(
			/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			(_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
		)
		.substring(1)
		.match(/.{2}/g)
		.map((x) => parseInt(x, 16));
hexToRgb("#00ffff"); // [0, 255, 255]
hexToRgb("#0ff"); // [0, 255, 255]
```

### 获取随机 ip

当你需要生成一个 ip 地址

```javascript
const randomIp = () =>
	Array(4)
		.fill(0)
		.map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
		.join(".");
```

### uuid

当你需要生成一个 id

```js
const uuid = (a) =>
	a
		? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
		: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
uuid();
```

### 获取 cookie

当你需要将 cookie 转换成对象

```js
const getCookie = () =>
	document.cookie
		.split(";")
		.map((item) => item.split("="))
		.reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
getCookie();
```

### 强制等待

当你需要等待一段时间，但又不想写在 setTimeout 函数中，造成回调地狱

```js
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {
	console.log("time");
});
```
