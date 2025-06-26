# JavaScript 工具方法

##### **1、输入一个值，返回其数据类型**

```js
function type(para) {
	return Object.prototype.toString.call(para);
}
```

##### **2、数组去重**

```js
function unique1(arr) {
	return [...new Set(arr)];
}

function unique2(arr) {
	var obj = {};
	return arr.filter((ele) => {
		if (!obj[ele]) {
			obj[ele] = true;
			return true;
		}
	});
}

function unique3(arr) {
	var result = [];
	arr.forEach((ele) => {
		if (result.indexOf(ele) == -1) {
			result.push(ele);
		}
	});
	return result;
}
```

##### **3、字符串去重**

```javascript
String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}

###### //去除连续的字符串
function uniq(str) {
    return str.replace(/(\w)\1+/g, '$1')
}
```

##### **4、深拷贝 浅拷贝**

```javascript
//深克隆（深克隆不考虑函数）
function deepClone(obj, result) {
	var result = result || {};
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (typeof obj[prop] == "object" && obj[prop] !== null) {
				// 引用值(obj/array)且不为null
				if (Object.prototype.toString.call(obj[prop]) == "[object Object]") {
					// 对象
					result[prop] = {};
				} else {
					// 数组
					result[prop] = [];
				}
				deepClone(obj[prop], result[prop]);
			} else {
				// 原始值或func
				result[prop] = obj[prop];
			}
		}
	}
	return result;
}

// 深浅克隆是针对引用值
function deepClone(target) {
	if (typeof target !== "object") {
		return target;
	}
	var result;
	if (Object.prototype.toString.call(target) == "[object Array]") {
		// 数组
		result = [];
	} else {
		// 对象
		result = {};
	}
	for (var prop in target) {
		if (target.hasOwnProperty(prop)) {
			result[prop] = deepClone(target[prop]);
		}
	}
	return result;
}
// 无法复制函数
var o1 = jsON.parse(jsON.stringify(obj1));
```

##### **5、reverse 底层原理和扩展**

```javascript
// 改变原数组
Array.prototype.myReverse = function () {
	var len = this.length;
	for (var i = 0; i < len; i++) {
		var temp = this[i];
		this[i] = this[len - 1 - i];
		this[len - 1 - i] = temp;
	}
	return this;
};
```

##### **6、圣杯模式的继承**

```javascript
function inherit(Target, Origin) {
	function F() {}
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.constructor = Target;
	// 最终的原型指向
	Target.prop.uber = Origin.prototype;
}
```

##### **7、找出字符串中第一次只出现一次的字母**

```javascript
String.prototype.firstAppear = function () {
	var obj = {},
		len = this.length;
	for (var i = 0; i < len; i++) {
		if (obj[this[i]]) {
			obj[this[i]]++;
		} else {
			obj[this[i]] = 1;
		}
	}
	for (var prop in obj) {
		if (obj[prop] == 1) {
			return prop;
		}
	}
};
```

##### **8、找元素的第 n 级父元素**

```js
function parents(ele, n) {
	while (ele && n) {
		ele = ele.parentElement ? ele.parentElement : ele.parentNode;
		n--;
	}
	return ele;
}
```

##### **9、 返回元素的第 n 个兄弟节点**

```js
function retSibling(e, n) {
	while (e && n) {
		if (n > 0) {
			if (e.nextElementSibling) {
				e = e.nextElementSibling;
			} else {
				for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
			}
			n--;
		} else {
			if (e.previousElementSibling) {
				e = e.previousElementSibling;
			} else {
				for (
					e = e.previousElementSibling;
					e && e.nodeType !== 1;
					e = e.previousElementSibling
				);
			}
			n++;
		}
	}
	return e;
}
```

##### **10、封装 mychildren，解决浏览器的兼容问题**

```js
function myChildren(e) {
	var children = e.childNodes,
		arr = [],
		len = children.length;
	for (var i = 0; i < len; i++) {
		if (children[i].nodeType === 1) {
			arr.push(children[i]);
		}
	}
	return arr;
}
```

##### **11、判断元素有没有子元素**

```js
function hasChildren(e) {
	var children = e.childNodes,
		len = children.length;
	for (var i = 0; i < len; i++) {
		if (children[i].nodeType === 1) {
			return true;
		}
	}
	return false;
}
```

##### **12、我一个元素插入到另一个元素的后面**

```javascript
Element.prototype.insertAfter = function (target, elen) {
	var nextElen = elen.nextElenmentSibling;
	if (nextElen == null) {
		this.appendChild(target);
	} else {
		this.insertBefore(target, nextElen);
	}
};
```

##### **13、返回当前的时间（年月日时分秒）**

```js
function getDateTime() {
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() + 1,
		minute = date.getMinutes(),
		second = date.getSeconds();
	month = checkTime(month);
	day = checkTime(day);
	hour = checkTime(hour);
	minute = checkTime(minute);
	second = checkTime(second);
	function checkTime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	return (
		"" +
		year +
		"年" +
		month +
		"月" +
		day +
		"日" +
		hour +
		"时" +
		minute +
		"分" +
		second +
		"秒"
	);
}
```

##### **14、获得滚动条的滚动距离**

```javascript
function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset,
		};
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop,
		};
	}
}
```

##### **15、获得视口的尺寸**

```javascript
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight,
		};
	} else {
		// ie8及其以下
		if (document.compatMode === "BackCompat") {
			// 怪异模式
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight,
			};
		} else {
			// 标准模式
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight,
			};
		}
	}
}
```

##### **16、获取任一元素的任意属性**

```javascript
function getStyle(elem, prop) {
	return window.getComputedStyle
		? window.getComputedStyle(elem, null)[prop]
		: elem.currentStyle[prop];
}
```

##### **17、绑定事件的兼容代码**

```js
function addEvent(elem, type, handle) {
	if (elem.addEventListener) {
		//非ie和非ie9
		elem.addEventListener(type, handle, false);
	} else if (elem.attachEvent) {
		//ie6到ie8
		elem.attachEvent("on" + type, function () {
			handle.call(elem);
		});
	} else {
		elem["on" + type] = handle;
	}
}
```

##### **18、解绑事件**

```js
function removeEvent(elem, type, handle) {
	if (elem.removeEventListener) {
		//非ie和非ie9
		elem.removeEventListener(type, handle, false);
	} else if (elem.detachEvent) {
		//ie6到ie8
		elem.detachEvent("on" + type, handle);
	} else {
		elem["on" + type] = null;
	}
}
```

##### **19、取消冒泡的兼容代码**

```js
function stopBubble(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
}
```

##### **20、检验字符串是否是回文**

```javascript
function isPalina(str) {
	if (Object.prototype.toString.call(str) !== "[object String]") {
		return false;
	}
	var len = str.length;
	for (var i = 0; i < len / 2; i++) {
		if (str[i] != str[len - 1 - i]) {
			return false;
		}
	}
	return true;
}
```

##### **21、检验字符串是否是回文**

```js
function isPalindrome(str) {
	str = str.replace(/\W/g, "").toLowerCase();
	console.log(str);
	return str == str.split("").reverse().join("");
}
```

##### **22、兼容 getElementsByClassName 方法**

```js
Element.prototype.getElementsByClassName =
	Document.prototype.getElementsByClassName = function (_className) {
		var allDomArray = document.getElementsByTagName("*");
		var lastDomArray = [];
		function trimSpace(strClass) {
			var reg = /\s+/g;
			return strClass.replace(reg, " ").trim();
		}
		for (var i = 0; i < allDomArray.length; i++) {
			var classArray = trimSpace(allDomArray[i].className).split(" ");
			for (var j = 0; j < classArray.length; j++) {
				if (classArray[j] == _className) {
					lastDomArray.push(allDomArray[i]);
					break;
				}
			}
		}
		return lastDomArray;
	};
```

##### **23、运动函数**

```javascript
function animate(obj, json, callback) {
	clearInterval(obj.timer);
	var speed, current;
	obj.timer = setInterval(function () {
		var lock = true;
		for (var prop in json) {
			if (prop == "opacity") {
				current = parseFloat(window.getComputedStyle(obj, null)[prop]) * 100;
			} else {
				current = parseInt(window.getComputedStyle(obj, null)[prop]);
			}
			speed = (json[prop] - current) / 7;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if (prop == "opacity") {
				obj.style[prop] = (current + speed) / 100;
			} else {
				obj.style[prop] = current + speed + "px";
			}
			if (current != json[prop]) {
				lock = false;
			}
		}
		if (lock) {
			clearInterval(obj.timer);
			typeof callback == "function" ? callback() : "";
		}
	}, 30);
}
```

##### **24、弹性运动**

```javascript
function ElasticMovement(obj, target) {
	clearInterval(obj.timer);
	var iSpeed = 40,
		a,
		u = 0.8;
	obj.timer = setInterval(function () {
		a = (target - obj.offsetLeft) / 8;
		iSpeed = iSpeed + a;
		iSpeed = iSpeed * u;
		if (Math.abs(iSpeed) <= 1 && Math.abs(a) <= 1) {
			console.log("over");
			clearInterval(obj.timer);
			obj.style.left = target + "px";
		} else {
			obj.style.left = obj.offsetLeft + iSpeed + "px";
		}
	}, 30);
}
```

##### **25、封装自己的 forEach 方法**

```javascript
Array.prototype.myForEach = function (func, obj) {
	var len = this.length;
	var _this = arguments[1] ? arguments[1] : window;
	// var _this=arguments[1]||window;
	for (var i = 0; i < len; i++) {
		func.call(_this, this[i], i, this);
	}
};
```

##### **26、封装自己的 filter 方法**

```javascript
Array.prototype.myFilter = function (func, obj) {
	var len = this.length;
	var arr = [];
	var _this = arguments[1] || window;
	for (var i = 0; i < len; i++) {
		func.call(_this, this[i], i, this) && arr.push(this[i]);
	}
	return arr;
};
```

##### **27、数组 map 方法**

```javascript
Array.prototype.myMap = function (func) {
	var arr = [];
	var len = this.length;
	var _this = arguments[1] || window;
	for (var i = 0; i < len; i++) {
		arr.push(func.call(_this, this[i], i, this));
	}
	return arr;
};
```

##### **28、数组 every 方法**

```javascript
Array.prototype.myEvery = function (func) {
	var flag = true;
	var len = this.length;
	var _this = arguments[1] || window;
	for (var i = 0; i < len; i++) {
		if (func.apply(_this, [this[i], i, this]) == false) {
			flag = false;
			break;
		}
	}
	return flag;
};
```

##### **29、数组 reduce 方法**

```javascript
Array.prototype.myReduce = function (func, initialValue) {
	var len = this.length,
		nextValue,
		i;
	if (!initialValue) {
		// 没有传第二个参数
		nextValue = this[0];
		i = 1;
	} else {
		// 传了第二个参数
		nextValue = initialValue;
		i = 0;
	}
	for (; i < len; i++) {
		nextValue = func(nextValue, this[i], i, this);
	}
	return nextValue;
};
```

##### **30、获取 url 中的参数（1）**

```js
function getWindonHref() {
	var sHref = window.location.href;
	var args = sHref.split("?");
	if (args[0] === sHref) {
		return "";
	}
	var hrefarr = args[1].split("#")[0].split("&");
	var obj = {};
	for (var i = 0; i < hrefarr.length; i++) {
		hrefarr[i] = hrefarr[i].split("=");
		obj[hrefarr[i][0]] = hrefarr[i][1];
	}
	return obj;
}
```

##### **31、数组排序**

```js
// 快排 [left] + min + [right]
function quickArr(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	var left = [],
		right = [];
	var pIndex = Math.floor(arr.length / 2);
	var p = arr.splice(pIndex, 1)[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] <= p) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	// 递归
	return quickArr(left).concat([p], quickArr(right));
}

// 冒泡
function bubbleSort(arr) {
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

function bubbleSort(arr) {
	var len = arr.length;
	for (var i = 0; i < len - 1; i++) {
		for (var j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}
```

##### **32、遍历 Dom 树**

```js
// 给定页面上的DOM元素,将访问元素本身及其所有后代(不仅仅是它的直接子元素)
// 对于每个访问的元素，函数讲元素传递给提供的回调函数
function traverse(element, callback) {
	callback(element);
	var list = element.children;
	for (var i = 0; i < list.length; i++) {
		traverse(list[i], callback);
	}
}
```

##### **33、原生 js 封装 ajax（1）**

```javascript
function ajax(method, url, callback, data, flag) {
	var xhr;
	flag = flag || true;
	method = method.toUpperCase();
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHttp");
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(2);
			callback(xhr.responseText);
		}
	};

	if (method == "GET") {
		var date = new Date(),
			timer = date.getTime();
		xhr.open("GET", url + "?" + data + "&timer" + timer, flag);
		xhr.send();
	} else if (method == "POST") {
		xhr.open("POST", url, flag);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}
}
```

##### **34、异步加载 script**

```javascript
function loadScript(url, callback) {
	var oscript = document.createElement("script");
	if (oscript.readyState) {
		// ie8及以下版本
		oscript.onreadystatechange = function () {
			if (
				oscript.readyState === "complete" ||
				oscript.readyState === "loaded"
			) {
				callback();
			}
		};
	} else {
		oscript.onload = function () {
			callback();
		};
	}
	oscript.src = url;
	document.body.appendChild(oscript);
}
```

##### **35、cookie 管理**

```javascript
var cookie = {
	set: function (name, value, time) {
		document.cookie = name + "=" + value + "; max-age=" + time;
		return this;
	},
	remove: function (name) {
		return this.setCookie(name, "", -1);
	},
	get: function (name, callback) {
		var allCookieArr = document.cookie.split("; ");
		for (var i = 0; i < allCookieArr.length; i++) {
			var itemCookieArr = allCookieArr[i].split("=");
			if (itemCookieArr[0] === name) {
				return itemCookieArr[1];
			}
		}
		return undefined;
	},
};
```

##### **36、实现 bind()方法**

```javascript
Function.prototype.myBind = function (target) {
	var target = target || window;
	var _args1 = [].slice.call(arguments, 1);
	var self = this;
	var temp = function () {};
	var F = function () {
		var _args2 = [].slice.call(arguments, 0);
		var parasArr = _args1.concat(_args2);
		return self.apply(this instanceof temp ? this : target, parasArr);
	};
	temp.prototype = self.prototype;
	F.prototype = new temp();
	return F;
};
```

##### **37、实现 call()方法**

```javascript
Function.prototype.myCall = function () {
	var ctx = arguments[0] || window;
	ctx.fn = this;
	var args = [];
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	var result = ctx.fn(...args);
	delete ctx.fn;
	return result;
};
```

##### **38、实现 apply()方法**

```javascript
Function.prototype.myApply = function () {
	var ctx = arguments[0] || window;
	ctx.fn = this;
	if (!arguments[1]) {
		var result = ctx.fn();
		delete ctx.fn;
		return result;
	}
	var result = ctx.fn(...arguments[1]);
	delete ctx.fn;
	return result;
};
```

##### **39、防抖**

```javascript
function debounce(handle, delay) {
	var timer = null;
	return function () {
		var _self = this,
			_args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			handle.apply(_self, _args);
		}, delay);
	};
}
```

##### **40、节流**

```javascript
function throttle(handler, wait) {
	var lastTime = 0;
	return function (e) {
		var nowTime = new Date().getTime();
		if (nowTime - lastTime > wait) {
			handler.apply(this, arguments);
			lastTime = nowTime;
		}
	};
}
```

##### **41、requestAnimFrame 兼容性方法**

```javascript
window.requestAnimFrame = (function () {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();
```

##### **42、cancelAnimFrame 兼容性方法**

```javascript
window.cancelAnimFrame = (function () {
	return (
		window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		}
	);
})();
```

##### **43、jsonp 底层方法**

```javascript
function jsonp(url, callback) {
	var oscript = document.createElement("script");
	if (oscript.readyState) {
		// ie8及以下版本
		oscript.onreadystatechange = function () {
			if (
				oscript.readyState === "complete" ||
				oscript.readyState === "loaded"
			) {
				callback();
			}
		};
	} else {
		oscript.onload = function () {
			callback();
		};
	}
	oscript.src = url;
	document.body.appendChild(oscript);
}
```

##### **44、获取 url 上的参数（2）**

```js
function getUrlParam(sUrl, sKey) {
	var result = {};
	sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, function (ele, key, val) {
		if (!result[key]) {
			result[key] = val;
		} else {
			var temp = result[key];
			result[key] = [].concat(temp, val);
		}
	});
	if (!sKey) {
		return result;
	} else {
		return result[sKey] || "";
	}
}
```

##### **45、格式化时间**

```js
function formatDate(t, str) {
	var obj = {
		yyyy: t.getFullYear(),
		yy: ("" + t.getFullYear()).slice(-2),
		M: t.getMonth() + 1,
		MM: ("0" + (t.getMonth() + 1)).slice(-2),
		d: t.getDate(),
		dd: ("0" + t.getDate()).slice(-2),
		H: t.getHours(),
		HH: ("0" + t.getHours()).slice(-2),
		h: t.getHours() % 12,
		hh: ("0" + (t.getHours() % 12)).slice(-2),
		m: t.getMinutes(),
		mm: ("0" + t.getMinutes()).slice(-2),
		s: t.getSeconds(),
		ss: ("0" + t.getSeconds()).slice(-2),
		w: ["日", "一", "二", "三", "四", "五", "六"][t.getDay()],
	};
	return str.replace(/([a-z]+)/gi, function ($1) {
		return obj[$1];
	});
}
```

##### **46、验证邮箱的正则表达式**

```js
function isAvailableEmail(sEmail) {
	var reg = /^([\w+\.])+@\w+([.]\w+)+$/;
	return reg.test(sEmail);
}
```

##### **47、函数柯里化**

```js
//是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术

function curryIt(fn) {
	var length = fn.length,
		args = [];
	var result = function (arg) {
		args.push(arg);
		length--;
		if (length <= 0) {
			return fn.apply(this, args);
		} else {
			return result;
		}
	};
	return result;
}
```

##### **48、大数相加**

```js
function sumBigNumber(a, b) {
	var res = "", //结果
		temp = 0; //按位加的结果及进位
	a = a.split("");
	b = b.split("");
	while (a.length || b.length || temp) {
		//~~按位非 1.类型转换，转换成数字 2.~~undefined==0
		temp += ~~a.pop() + ~~b.pop();
		res = (temp % 10) + res;
		temp = temp > 9;
	}
	return res.replace(/^0+/, "");
}
```

##### **49、单例模式**

```javascript
function getSingle(func) {
	var result;
	return function () {
		if (!result) {
			result = new func(arguments);
		}
		return result;
	};
}
```

##### **50、加载 js || css || style**

```js
const loadRes = function (name, type, fn) {
	// 加载js || css || style
	let ref;
	if (type === "js") {
		// 外部js
		ref = document.createElement("script");
		ref.setAttribute("type", "text/JavaScript");
		ref.setAttribute("src", name);
	} else if (type === "css") {
		// 外部css
		ref = document.createElement("link");
		ref.setAttribute("rel", "stylesheet");
		ref.setAttribute("type", "text/css");
		ref.setAttribute("href", name);
	} else if (type === "style") {
		// style
		ref = document.createElement("style");
		ref.innerhtml = name;
	}
	if (typeof ref !== "undefined") {
		document.getElementsByTagName("head")[0].appendChild(ref);
		ref.onload = function () {
			// 加载完成执行
			typeof fn === "function" && fn();
		};
	}
};
```

##### **51、获取 url 参数（3）**

```javascript
const getUrlParam = function (name) {
	// 获取url参数
	let reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.href.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return undefined;
};
```

##### **52、本地存储**

```javascript
const store = {
	// 本地存储
	set: function (name, value, day) {
		// 设置
		let d = new Date();
		let time = 0;
		day = typeof day === "undefined" || !day ? 1 : day; // 时间,默认存储1天
		time = d.setHours(d.getHours() + 24 * day); // 毫秒
		localStorage.setItem(
			name,
			JSON.stringify({
				data: value,
				time: time,
			})
		);
	},
	get: function (name) {
		// 获取
		let data = localStorage.getItem(name);
		if (!data) {
			return null;
		}
		let obj = JSON.parse(data);
		if (new Date().getTime() > obj.time) {
			// 过期
			localStorage.removeItem(name);
			return null;
		} else {
			return obj.data;
		}
	},
	clear: function (name) {
		// 清空
		if (name) {
			// 删除键为name的缓存
			localStorage.removeItem(name);
		} else {
			// 清空全部
			localStorage.clear();
		}
	},
};
```

##### **53、cookie 操作【set，get，del】**

```javascript
const cookie = {
	// cookie操作【set，get，del】
	set: function (name, value, day) {
		let oDate = new Date();
		oDate.setDate(oDate.getDate() + (day || 30));
		document.cookie = name + "=" + value + ";expires=" + oDate + "; path=/;";
	},
	get: function (name) {
		let str = document.cookie;
		let arr = str.split("; ");
		for (let i = 0; i < arr.length; i++) {
			let newArr = arr[i].split("=");
			if (newArr[0] === name) {
				return newArr[1];
			}
		}
	},
	del: function (name) {
		this.set(name, "", -1);
	},
};
```

##### **54、Js 获取元素样式【支持内联】**

```javascript
const getRealStyle = function (obj, styleName) {
	// Js获取元素样式【支持内联】
	var realStyle = null;
	if (obj.currentStyle) {
		realStyle = obj.currentStyle[styleName];
	} else if (window.getComputedStyle) {
		realStyle = window.getComputedStyle(obj, null)[styleName];
	}
	return realStyle;
};
```

##### **55、时间格式化**

```javascript
const formatDate = function (fmt, date) {
	// 时间格式化 【'yyyy-MM-dd hh:mm:ss',时间】
	if (typeof date !== "object") {
		date = !date ? new Date() : new Date(date);
	}
	var o = {
		"M+": date.getMonth() + 1, // 月份
		"d+": date.getDate(), // 日
		"h+": date.getHours(), // 小时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
		}
	}
	return fmt;
};
```

##### **56、原生 ajax 操作（2）**

```typescript
const ajax = function (conf) {
	// ajax操作
	let url = conf.url,
		data = conf.data,
		senData = [], // 封装后的数据
		async = conf.async !== undefined ? conf.async : true, // ture为异步请求
		type = conf.type || "get", // 默认请求方式get
		dataType = conf.dataType || "json",
		contenType = conf.contenType || "application/x-www-form-urlencoded",
		success = conf.success,
		error = conf.error,
		isForm = conf.isForm || false, // 是否formdata
		header = conf.header || {}, // 头部信息
		xhr = ""; // 创建ajax引擎对象
	if (data == null) {
		senData = "";
	} else if (typeof data === "object" && !isForm) {
		// 如果data是对象，转换为字符串
		for (var k in data) {
			senData.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
		}
		senData = senData.join("&");
	} else {
		senData = data;
	}
	try {
		xhr = new ActiveXObject("microsoft.xmlhttp"); // IE内核系列浏览器
	} catch (e1) {
		try {
			xhr = new XMLHttpRequest(); // 非IE内核浏览器
		} catch (e2) {
			if (error != null) {
				error("不支持ajax请求");
			}
		}
	}
	xhr.open(type, type !== "get" ? url : url + "?" + senData, async);
	if (type !== "get" && !isForm) {
		xhr.setRequestHeader("content-type", contenType);
	}
	for (var h in header) {
		xhr.setRequestHeader(h, header[h]);
	}
	xhr.send(type !== "get" ? senData : null);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				if (dataType === "json" && success != null) {
					let res = "";
					try {
						res = eval("(" + xhr.responseText + ")");
					} catch (e) {
						console.log(e);
					}
					success(res); // 将json字符串转换为js对象
				}
			} else {
				if (error != null) {
					error("通讯失败!" + xhr.status);
				}
			}
		}
	};
};
```

##### **57、fetch 请求的封装**

```javascript
const fetch = function (url, setting) {
	// fetch请求的封装
	let opts = {
		// 设置参数的初始值
		method: (setting.method || "GET").toUpperCase(), // 请求方式
		headers: setting.headers || {}, // 请求头设置
		credentials: setting.credentials || true, // 设置cookie是否一起发送
		body: setting.body || {},
		mode: setting.mode || "no-cors", // 可以设置 cors, no-cors, same-origin
		redirect: setting.redirect || "follow", // follow, error, manual
		cache: setting.cache || "default", // 设置 cache 模式 (default, reload, no-cache)
	};
	let dataType = setting.dataType || "json"; // 解析方式
	let data = setting.data || ""; // 参数
	let paramsFormat = function (obj) {
		// 参数格式
		var str = "";
		for (var i in obj) {
			str += `${i}=${obj[i]}&`;
		}
		return str.split("").slice(0, -1).join("");
	};

	if (opts.method === "GET") {
		url = url + (data ? `?${paramsFormat(data)}` : "");
	} else {
		setting.body = data || {};
	}
	return new Promise((resolve, reject) => {
		fetch(url, opts)
			.then(async (res) => {
				let data =
					dataType === "text"
						? await res.text()
						: dataType === "blob"
						? await res.blob()
						: await res.json();
				resolve(data);
			})
			.catch((e) => {
				reject(e);
			});
	});
};
```

##### **58、设备判断：android、ios、web**

```javascript
const isDevice = function () {
	// 判断是android还是ios还是web
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/iPhone\sOS/i) === "iphone os" || ua.match(/iPad/i) === "ipad") {
		// ios
		return "iOS";
	}
	if (ua.match(/Android/i) === "android") {
		return "Android";
	}
	return "Web";
};
```

##### **59、判断是否为微信**

```javascript
const isWx = function () {
	// 判断是否为微信
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) === "micromessenger") {
		return true;
	}
	return false;
};
```

##### **60、文本复制功能**

```javascript
const copyTxt = function (text, fn) {
	// 复制功能
	if (typeof document.execCommand !== "function") {
		console.log("复制失败，请长按复制");
		return;
	}
	var dom = document.createElement("textarea");
	dom.value = text;
	dom.setAttribute("style", "display: block;width: 1px;height: 1px;");
	document.body.appendChild(dom);
	dom.select();
	var result = document.execCommand("copy");
	document.body.removeChild(dom);
	if (result) {
		console.log("复制成功");
		typeof fn === "function" && fn();
		return;
	}
	if (typeof document.createRange !== "function") {
		console.log("复制失败，请长按复制");
		return;
	}
	var range = document.createRange();
	var div = document.createElement("div");
	div.innerhtml = text;
	div.setAttribute("style", "height: 1px;fontSize: 1px;overflow: hidden;");
	document.body.appendChild(div);
	range.selectNode(div);
	var selection = window.getSelection();
	console.log(selection);
	if (selection.rangeCount > 0) {
		selection.removeAllRanges();
	}
	selection.addRange(range);
	document.execCommand("copy");
	typeof fn === "function" && fn();
	console.log("复制成功");
};
```

##### **61、判断是否是一个数组**

```javascript
const isArray = function (arr) {
	// 判断是否是一个数组
	return Object.prototype.toString.call(arr) === "[object Array]";
};
```

##### **62、判断两个数组是否相等**

```js
const arrayEqual = function (arr1, arr2) {
	//判断两个数组是否相等
	if (arr1 === arr2) return true;
	if (arr1.length != arr2.length) return false;
	for (let i = 0; i < arr1.length; ++i) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
};
```

##### **63、时间与时间戳转换**

```javascript
const stamp = {
	// 时间，时间戳转换
	getTime: function (time) {
		// 时间转10位时间戳
		let date = time ? new Date(time) : new Date();
		return Math.round(date.getTime() / 1000);
	},
	timeToStr: function (time, fmt) {
		// 10位时间戳转时间
		return new Date(time * 1000).pattern(fmt || "yyyy-MM-dd");
	},
};
```

##### **64、常用正则验证**

```typescript
const checkStr = function (str, type) {
	// 常用正则验证，注意type大小写
	switch (type) {
		case "phone": // 手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case "tel": // 座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case "card": // 身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case "pwd": // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^[a-zA-Z]\w{5,17}$/.test(str);
		case "postal": // 邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case "QQ": // QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case "email": // 邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case "money": // 金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case "URL": // 网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
				str
			);
		case "IP": // IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
				str
			);
		case "date": // 日期时间
			return (
				/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
					str
				) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
			);
		case "number": // 数字
			return /^[0-9]$/.test(str);
		case "english": // 英文
			return /^[a-zA-Z]+$/.test(str);
		case "chinese": // 中文
			return /^[\u4E00-\u9FA5]+$/.test(str);
		case "lower": // 小写
			return /^[a-z]+$/.test(str);
		case "upper": // 大写
			return /^[A-Z]+$/.test(str);
		case "HTML": // HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
};
```

##### **65、是否为 PC 端**

```javascript
const isPC = function () {
	// 是否为PC端
	let userAgentInfo = navigator.userAgent;
	let Agents = [
		"Android",
		"iPhone",
		"SymbianOS",
		"Windows Phone",
		"iPad",
		"iPod",
	];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
};
```

##### **66、去除字符串空格**

```typescript
const trim = function (str, type) {
	// 去除空格， type:  1-所有空格  2-前后空格  3-前空格 4-后空格
	type = type || 1;
	switch (type) {
		case 1:
			return str.replace(/\s+/g, "");
		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, "");
		case 3:
			return str.replace(/(^\s*)/g, "");
		case 4:
			return str.replace(/(\s*$)/g, "");
		default:
			return str;
	}
};
```

##### **67、字符串大小写转换**

```javascript
const changeCase = function (str, type) {
	// 字符串大小写转换 type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
	type = type || 4;
	switch (type) {
		case 1:
			return str.replace(/\b\w+\b/g, function (word) {
				return (
					word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
				);
			});
		case 2:
			return str.replace(/\b\w+\b/g, function (word) {
				return (
					word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
				);
			});
		case 3:
			return str
				.split("")
				.map(function (word) {
					if (/[a-z]/.test(word)) {
						return word.toUpperCase();
					} else {
						return word.toLowerCase();
					}
				})
				.join("");
		case 4:
			return str.toUpperCase();
		case 5:
			return str.toLowerCase();
		default:
			return str;
	}
};
```

##### **68、过滤 html 代码**

```js
const filterTag = function (str) {
	// 过滤html代码(把<>转换)
	str = str.replace(/&/gi, "&");
	str = str.replace(/</gi, "<");
	str = str.replace(/>/gi, ">");
	str = str.replace(" ", " ");
	return str;
};
```

##### **69、生成随机数范围**

```js
const random = function (min, max) {
	// 生成随机数范围
	if (arguments.length === 2) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	} else {
		return null;
	}
};
```

##### **70、阿拉伯数字转中文大写数字**

```javascript
const numberToChinese = function (num) {
	// 将阿拉伯数字翻译成中文的大写数字
	let AA = new Array(
		"零",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九",
		"十"
	);
	let BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
	let a = ("" + num).replace(/(^0*)/g, "").split(".");
	let k = 0;
	let re = "";
	for (let i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re;
				break;
			case 4:
				if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) {
					re = BB[4] + re;
				}
				break;
			case 8:
				re = BB[5] + re;
				BB[7] = BB[5];
				k = 0;
				break;
		}
		if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
			re = AA[0] + re;
		}
		if (a[0].charAt(i) !== 0) {
			re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		}
		k++;
	}
	if (a.length > 1) {
		// 加上小数部分(如果有小数部分)
		re += BB[6];
		for (let i = 0; i < a[1].length; i++) {
			re += AA[a[1].charAt(i)];
		}
	}
	if (re === "一十") {
		re = "十";
	}
	if (re.match(/^一/) && re.length === 3) {
		re = re.replace("一", "");
	}
	return re;
};
```

##### **71、原生 dom 操作**

```javascript
const dom = {
	$: function (selector) {
		let type = selector.substring(0, 1);
		if (type === "#") {
			if (document.querySelecotor) return document.querySelector(selector);
			return document.getElementById(selector.substring(1));
		} else if (type === ".") {
			if (document.querySelecotorAll)
				return document.querySelectorAll(selector);
			return document.getElementsByClassName(selector.substring(1));
		} else {
			return document[
				"querySelectorAll" ? "querySelectorAll" : "getElementsByTagName"
			](selector);
		}
	},
	hasClass: function (ele, name) {
		/* 检测类名 */
		return ele.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)"));
	},
	addClass: function (ele, name) {
		/* 添加类名 */
		if (!this.hasClass(ele, name)) ele.className += " " + name;
	},
	removeClass: function (ele, name) {
		/* 删除类名 */
		if (this.hasClass(ele, name)) {
			let reg = new RegExp("(\\s|^)" + name + "(\\s|$)");
			ele.className = ele.className.replace(reg, "");
		}
	},
	replaceClass: function (ele, newName, oldName) {
		/* 替换类名 */
		this.removeClass(ele, oldName);
		this.addClass(ele, newName);
	},
	siblings: function (ele) {
		/* 获取兄弟节点 */
		console.log(ele.parentNode);
		let chid = ele.parentNode.children,
			eleMatch = [];
		for (let i = 0, len = chid.length; i < len; i++) {
			if (chid[i] !== ele) {
				eleMatch.push(chid[i]);
			}
		}
		return eleMatch;
	},
	getByStyle: function (obj, name) {
		/* 获取行间样式属性 */
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj, false)[name];
		}
	},
	domToStirng: function (htmlDOM) {
		/* DOM转字符串 */
		var div = document.createElement("div");
		div.appendChild(htmlDOM);
		return div.innerHTML;
	},
	stringToDom: function (htmlString) {
		/* 字符串转DOM */
		var div = document.createElement("div");
		div.innerHTML = htmlString;
		return div.children[0];
	},
};
```

##### **72、判断图片加载完成**

```javascript
const imgLoadAll = function (arr, callback) {
	// 图片加载
	let arrImg = [];
	for (let i = 0; i < arr.length; i++) {
		let img = new Image();
		img.src = arr[i];
		img.onload = function () {
			arrImg.push(this);
			if (arrImg.length == arr.length) {
				callback && callback();
			}
		};
	}
};
```

##### **73、音频加载完成操作**

```js
const loadAudio = function (src, callback) {
	// 音频加载
	var audio = new Audio(src);
	audio.onloadedmetadata = callback;
	audio.src = src;
};
```

##### **74、光标所在位置插入字符**

```js
const insertAtCursor = function (dom, val) {
	// 光标所在位置插入字符
	if (document.selection) {
		dom.focus();
		let sel = document.selection.createRange();
		sel.text = val;
		sel.select();
	} else if (dom.selectionStart || dom.selectionStart == "0") {
		let startPos = dom.selectionStart;
		let endPos = dom.selectionEnd;
		let restoreTop = dom.scrollTop;
		dom.value =
			dom.value.substring(0, startPos) +
			val +
			dom.value.substring(endPos, dom.value.length);
		if (restoreTop > 0) {
			dom.scrollTop = restoreTop;
		}
		dom.focus();
		dom.selectionStart = startPos + val.length;
		dom.selectionEnd = startPos + val.length;
	} else {
		dom.value += val;
		dom.focus();
	}
};
```

##### **75、图片地址转 base64**

```js
const getBase64 = function (img) {
	//传入图片路径，返回base64，使用getBase64(url).then(function(base64){},function(err){});
	let getBase64Image = function (img, width, height) {
		//width、height调用时传入具体像素值，控制大小,不传则默认图像大小
		let canvas = document.createElement("canvas");
		canvas.width = width ? width : img.width;
		canvas.height = height ? height : img.height;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		let dataURL = canvas.toDataURL();
		return dataURL;
	};
	let image = new Image();
	image.crossOrigin = "";
	image.src = img;
	let deferred = $.Deferred();
	if (img) {
		image.onload = function () {
			deferred.resolve(getBase64Image(image));
		};
		return deferred.promise();
	}
};
```

##### **76、base64 图片下载功能**

```javascript
const downloadFile = function (base64, fileName) {
	//base64图片下载功能
	let base64ToBlob = function (code) {
		let parts = code.split(";base64,");
		let contentType = parts[0].split(":")[1];
		let raw = window.atob(parts[1]);
		let rawLength = raw.length;
		let uInt8Array = new Uint8Array(rawLength);
		for (let i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		}
		return new Blob([uInt8Array], {
			type: contentType,
		});
	};
	let aLink = document.createElement("a");
	let blob = base64ToBlob(base64); //new Blob([content]);
	let evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true); //initEvent不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
	aLink.download = fileName;
	aLink.href = URL.createObjectURL(blob);
	aLink.click();
};
```

##### **77、浏览器是否支持 webP 格式图片**

```javascript
const isSupportWebP = function () {
	//判断浏览器是否支持webP格式图片
	return (
		!![].map &&
		document
			.createElement("canvas")
			.toDataURL("image/webp")
			.indexOf("data:image/webp") == 0
	);
};
```

##### **78、url 参数转对象**

```javascript
const parseQueryString = function (url) {
	//url参数转对象
	url = !url ? window.location.href : url;
	if (url.indexOf("?") === -1) {
		return {};
	}
	let search =
		url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
	if (search === "") {
		return {};
	}
	search = search.split("&");
	let query = {};
	for (let i = 0; i < search.length; i++) {
		let pair = search[i].split("=");
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
	}
	return query;
};
```

##### **79、对象序列化【对象转 url 参数】**

```javascript
const stringfyQueryString = function (obj) {
	//对象序列化【对象转url参数】
	if (!obj) return "";
	let pairs = [];
	for (let key in obj) {
		let value = obj[key];
		if (value instanceof Array) {
			for (let i = 0; i < value.length; ++i) {
				pairs.push(
					encodeURIComponent(key + "[" + i + "]") +
						"=" +
						encodeURIComponent(value[i])
				);
			}
			continue;
		}
		pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
	}
	return pairs.join("&");
};
```

##### **80、H5 软键盘缩回、弹起回调**

```javascript
const h5Resize = function (downCb, upCb) {
	//当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化 [downCb 当软键盘弹起后，缩回的回调,upCb 当软键盘弹起的回调]
	var clientHeight = window.innerHeight;
	downCb = typeof downCb === "function" ? downCb : function () {};
	upCb = typeof upCb === "function" ? upCb : function () {};
	window.addEventListener("resize", () => {
		var height = window.innerHeight;
		if (height === clientHeight) {
			downCb();
		}
		if (height < clientHeight) {
			upCb();
		}
	});
};
```

##### **81、函数防抖**

```javascript
const debounce = function (func, wait, immediate) {
	//函数防抖[func 函数,wait 延迟执行毫秒数,immediate true 表立即执行,false 表非立即执行,立即执行是触发事件后函数会立即执行，然后n秒内不触发事件才能继续执行函数的效果]
	let timeout;
	return function () {
		let context = this;
		let args = arguments;
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		}
	};
};
```

##### **82、函数节流**

```javascript
const throttle = function (func, wait, type) {
	//函数节流 [func 函数 wait 延迟执行毫秒数 type 1 表时间戳版，2 表定时器版]
	if (type === 1) {
		let previous = 0;
	} else if (type === 2) {
		let timeout;
	}
	return function () {
		let context = this;
		let args = arguments;
		if (type === 1) {
			let now = Date.now();
			if (now - previous > wait) {
				func.apply(context, args);
				previous = now;
			}
		} else if (type === 2) {
			if (!timeout) {
				timeout = setTimeout(() => {
					timeout = null;
					func.apply(context, args);
				}, wait);
			}
		}
	};
};
```
