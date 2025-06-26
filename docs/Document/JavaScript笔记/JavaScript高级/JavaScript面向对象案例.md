# JavaScript 面向对象案例

## util.js：公共工具库

```js
//格式化日期的代码

//根据id获取元素的代码

//innerText和textContent的兼容

//获取第一个子元素的兼容

//获取最后一个子元素的兼容

/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
	var str = ""; //存储时间的字符串
	//获取年
	var year = dt.getFullYear();
	//获取月
	var month = dt.getMonth() + 1;
	//获取日
	var day = dt.getDate();
	//获取小时
	var hour = dt.getHours();
	//获取分钟
	var min = dt.getMinutes();
	//获取秒
	var sec = dt.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;
	str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
	return str;
}
/**
 * 获取指定标签对象
 * @param id 标签的id属性值
 * @returns {Element}根据id属性值返回指定标签对象
 */
function my$(id) {
	return document.getElementById(id);
}
/**
 * 设置元素的文本内容
 * @param element 任意元素
 * @param text 任意文本内容
 */
function setInnerText(element, text) {
	if (typeof element.textContent == "undefined") {
		element.innerText = text;
	} else {
		element.textContent = text;
	}
}
/**
 * 获取元素的文本内容
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
	if (typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}
/**
 * 获取父级元素中的第一个子元素
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
function getFirstElement(element) {
	if (element.firstElementChild) {
		return element.firstElementChild;
	} else {
		var node = element.firstChild;
		while (node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}
/**
 * 获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
	if (element.lastElementChild) {
		return element.lastElementChild;
	} else {
		var node = element.lastChild;
		while (node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}
/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
	if (element.previousElementSibling) {
		return element.previousElementSibling;
	} else {
		var node = element.previousSibling;
		while (node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}
/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
	if (element.nextElementSibling) {
		return element.nextElementSibling;
	} else {
		var node = element.nextSibling;
		while (node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}
/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
	if (!element) return;
	var elements = [];
	var ele = element.previousSibling;
	while (ele) {
		if (ele.nodeType === 1) {
			elements.push(ele);
		}
		ele = ele.previousSibling;
	}
	ele = element.nextSibling;
	while (ele) {
		if (ele.nodeType === 1) {
			elements.push(ele);
		}
		ele = ele.nextSibling;
	}
	return elements;
}
/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser() {
	var browserName = navigator.userAgent.toLowerCase();
	if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
		console.log("IE");
	} else if (/firefox/i.test(browserName)) {
		console.log("Firefox");
	} else if (
		/chrome/i.test(browserName) &&
		/webkit/i.test(browserName) &&
		/mozilla/i.test(browserName)
	) {
		console.log("Chrome");
	} else if (/opera/i.test(browserName)) {
		console.log("Opera");
	} else if (
		/webkit/i.test(browserName) &&
		!(
			/chrome/i.test(browserName) &&
			/webkit/i.test(browserName) &&
			/mozilla/i.test(browserName)
		)
	) {
		console.log("Safari");
	} else {
		console.log("不知道什么鬼!");
	}
}

//为任意一个元素绑定事件:元素,事件类型,事件处理函数
function addEventListener(element, type, fn) {
	if (element.addEventListener) {
		//支持
		element.addEventListener(type, fn, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, fn);
	} else {
		element["on" + type] = fn;
	}
}
//为任意的一个元素解绑某个事件:元素,事件类型,事件处理函数
function removeEventListener(element, type, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(type, fn, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + type, fn);
	} else {
		element["on" + type] = null;
	}
}

/**
 * 获取的是页面向上或者向左卷曲出去的距离的值,返回的是对象
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function getScroll() {
	return {
		top:
			window.pageYOffset ||
			document.body.scrollTop ||
			document.documentElement.scrollTop ||
			0,
		left:
			window.pageXOffset ||
			document.body.scrollLeft ||
			document.documentElement.scrollLeft ||
			0,
	};
}
```

## 0.面向对象改变颜色案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>面向对象改变颜色案例</title>
		<style>
			div {
				width: 300px;
				height: 200px;
				background-color: red;
			}
		</style>
	</head>
	<body>
		<input type="button" value="改变颜色" id="btn" />
		<div id="dv"></div>
		<script>
			//点击按钮,改变div的背景颜色
			document.getElementById("btn").onclick = function () {
				document.getElementById("dv").style.backgroundColor = "yellow";
			};

			// 面向对象思想----初级的
			// 按钮是一个对象,div是一个对象,颜色是一个属性

			function ChangeStyle(btnId, dvId, color) {
				this.btnObj = document.getElementById(btnId); //按钮对象
				this.dvObj = document.getElementById(dvId); //div对象
				this.color = color; //颜色
			}
			//数据共享来改变背景颜色
			ChangeStyle.prototype.init = function () {
				//console.log(this);//就是实例对象---就是当前对象
				var that = this;
				//点击按钮,改变div的背景颜色
				this.btnObj.onclick = function () {
					that.dvObj.style.backgroundColor = that.color;
				};
			};

			//实例化对象
			var cs = new ChangeStyle("btn", "dv", "yellow");
			cs.init();
		</script>
	</body>
</html>
```

## 1.随机小方块：贪吃蛇游戏的食物方块

利用立即执行函数，把局部变量给 window 全局变量

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>随机小方块</title>
		<style>
			.map {
				width: 800px;
				height: 600px;
				background-color: #ccc;
				position: relative;
			}
		</style>
	</head>
	<body>
		<div class="map"></div>
		<script src="common.js"></script>
		<script>
			//产生随机数对象的
			(function (window) {
				function Random() {}
				Random.prototype.getRandom = function (min, max) {
					return Math.floor(Math.random() * (max - min) + min);
				};
				//把局部对象暴露给window顶级对象,就成了全局的对象
				window.Random = new Random();
			})(window); //自调用构造函数的方式,分号一定要加上

			//产生小方块对象
			(function (window) {
				//console.log(Random.getRandom(0,5));
				//选择器的方式来获取元素对象
				var map = document.querySelector(".map");

				//食物的构造函数
				function Food(width, height, color) {
					this.width = width || 20; //默认的小方块的宽
					this.height = height || 20; //默认的小方块的高
					//横坐标,纵坐标
					this.x = 0; //横坐标随机产生的
					this.y = 0; //纵坐标随机产生的
					this.color = color; //小方块的背景颜色
					this.element = document.createElement("div"); //小方块的元素
				}
				//初始化小方块的显示的效果及位置---显示地图上
				Food.prototype.init = function (map) {
					//设置小方块的样式
					var div = this.element;
					div.style.position = "absolute"; //脱离文档流
					div.style.width = this.width + "px";
					div.style.height = this.height + "px";
					div.style.backgroundColor = this.color;
					//把小方块加到map地图中
					map.appendChild(div);
					this.render(map);
				};
				//产生随机位置
				Food.prototype.render = function (map) {
					//随机产生横纵坐标
					var x =
						Random.getRandom(0, map.offsetWidth / this.width) * this.width;
					var y =
						Random.getRandom(0, map.offsetHeight / this.height) * this.height;
					this.x = x;
					this.y = y;
					var div = this.element;
					div.style.left = this.x + "px";
					div.style.top = this.y + "px";
				};

				//实例化对象
				var fd = new Food(20, 20, "green");
				fd.init(map);
				console.log(fd.x + "====" + fd.y);
			})(window);
		</script>
	</body>
</html>
```

## 2.面向对象贪吃蛇游戏

实现思路：

```bash
//模拟贪吃蛇游戏,做的项目
    /*
    *
    * 地图: 宽，高，背景颜色，因为小蛇和食物都是相对于地图显示的,这里小蛇和食物都是地图的子元素,随机位置显示,脱离文档流的,地图也需要脱离文档流--css需要设置:宽,高,背景颜色,脱标
    *
    * 食物---div元素
    * elements--->存储div的数组(将来删除的食物div时候,先从map中删除div,再从数组中移除div)
    * 食物:宽,高,背景颜色,横坐标,纵坐标
    * 一个食物就是一个对象,这个对象有相应的属性,这个对象需要在地图上显示
    * 最终要创建食物的对象,先 有构造函数,并且把相应的值作为参数传入到构造函数中
    * 食物要想显示在地图上,食物的初始化就是一个行为
    * 1.食物的构造函数--->创建食物对象
    * 2.食物的显示的方法-->通过对象调用方法,显示食物,设置相应的样式
    * 2.1.1 因为食物要被小蛇吃掉,吃掉后应该再次出现食物,原来的食物就删除了
    * 2.1.2 每一次初始化食物的时候先删除原来的食物,然后重新的初始化食物
    * 2.1.3 通过一个私有的函数(外面不能调用的函数)删除地图上的食物,同时最开始的时候食物也相应的保存到一个数组中,再从这个数组中把食物删除
    * 最后的时候,把食物的构造函数给window下的属性,这样做,外部就可以直接使用这个食物的构造函数了
    *
    * 小蛇
    * 小蛇就是一个对象
    * 属性: 每个身体都有宽，高，方向
    * 属性:身体分三个部分,每个部分都是一个对象,每个部分都有横纵坐标,背景颜色
    * 小蛇要想显示在地图上,先删除之前的小蛇,然后再初始化小蛇(小蛇要移动)--方法
    *
    * 小蛇要移动---方法
    * 思路:把小蛇的头的坐标给小蛇第一部分的身体,第一部分的身体的坐标给下一个部分身体
    * 小蛇的头,需要单独的设置:方向
    *
    * */
```

### 全部代码版本

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>面向对象贪吃蛇游戏</title>
		<style>
			.map {
				width: 800px;
				height: 600px;
				background-color: #ccc;
				position: relative;
				margin: 0 auto;
			}
		</style>
	</head>
	<body>
		<!--画出地图,设置样式-->
		<div class="map"></div>

		<script>
			//自调用函数----食物的
			(function () {
				var elements = []; //用来保存每个小方块食物的
				//食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
				function Food(x, y, width, height, color) {
					//横纵坐标
					this.x = x || 0;
					this.y = y || 0;
					//宽和高
					this.width = width || 20;
					this.height = height || 20;
					//背景颜色
					this.color = color || "green";
				}

				//为原型添加初始化的方法(作用：在页面上显示这个食物)
				//因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
				Food.prototype.init = function (map) {
					//先删除这个小食物
					//外部无法访问的函数
					remove();

					//创建div
					var div = document.createElement("div");
					//把div加到map中
					map.appendChild(div);
					//设置div的样式
					div.style.width = this.width + "px";
					div.style.height = this.height + "px";
					div.style.backgroundColor = this.color;
					//先脱离文档流
					div.style.position = "absolute";
					//随机横纵坐标
					this.x =
						parseInt(Math.random() * (map.offsetWidth / this.width)) *
						this.width;
					this.y =
						parseInt(Math.random() * (map.offsetHeight / this.height)) *
						this.height;
					div.style.left = this.x + "px";
					div.style.top = this.y + "px";

					//把div加入到数组elements中
					elements.push(div);
				};

				//私有的函数---删除食物的
				function remove() {
					//elements数组中有这个食物
					for (var i = 0; i < elements.length; i++) {
						var ele = elements[i];
						//找到这个子元素的父级元素,然后删除这个子元素
						ele.parentNode.removeChild(ele);
						//再次把elements中的这个子元素也要删除
						elements.splice(i, 1);
					}
				}

				//把Food暴露给Window,外部可以使用
				window.Food = Food;
			})();

			//自调用函数---小蛇
			(function () {
				var elements = []; //存放小蛇的每个身体部分
				//小蛇的构造函数
				function Snake(width, height, direction) {
					//小蛇的每个部分的宽
					this.width = width || 20;
					this.height = height || 20;
					//小蛇的身体
					this.body = [
						{ x: 3, y: 2, color: "red" }, //头
						{ x: 2, y: 2, color: "orange" }, //身体
						{ x: 1, y: 2, color: "orange" }, //身体
					];
					//方向
					this.direction = direction || "right";
				}

				//为原型添加方法--小蛇初始化的方法
				Snake.prototype.init = function (map) {
					//先删除之前的小蛇
					remove(); //===========================================

					//循环遍历创建div
					for (var i = 0; i < this.body.length; i++) {
						//数组中的每个数组元素都是一个对象
						var obj = this.body[i];
						//创建div
						var div = document.createElement("div");
						//把div加入到map地图中
						map.appendChild(div);
						//设置div的样式
						div.style.position = "absolute";
						div.style.width = this.width + "px";
						div.style.height = this.height + "px";
						//横纵坐标
						div.style.left = obj.x * this.width + "px";
						div.style.top = obj.y * this.height + "px";
						//背景颜色
						div.style.backgroundColor = obj.color;
						//方向暂时不定
						//把div加入到elements数组中----目的是为了删除
						elements.push(div);
					}
				};

				//为原型添加方法---小蛇动起来
				Snake.prototype.move = function (food, map) {
					//改变小蛇的身体的坐标位置
					var i = this.body.length - 1; //2
					for (; i > 0; i--) {
						this.body[i].x = this.body[i - 1].x;
						this.body[i].y = this.body[i - 1].y;
					}
					//判断方向---改变小蛇的头的坐标位置
					switch (this.direction) {
						case "right":
							this.body[0].x += 1;
							break;
						case "left":
							this.body[0].x -= 1;
							break;
						case "top":
							this.body[0].y -= 1;
							break;
						case "bottom":
							this.body[0].y += 1;
							break;
					}

					//判断有没有吃到食物
					//小蛇的头的坐标和食物的坐标一致
					var headX = this.body[0].x * this.width;
					var headY = this.body[0].y * this.height;
					//判断小蛇的头的坐标和食物的坐标是否相同
					if (headX == food.x && headY == food.y) {
						//获取小蛇的最后的尾巴
						var last = this.body[this.body.length - 1];
						//把最后的蛇尾复制一个,重新的加入到小蛇的body中
						this.body.push({
							x: last.x,
							y: last.y,
							color: last.color,
						});
						//把食物删除,重新初始化食物
						food.init(map);
					}
				}; //删除小蛇的私有的函数=============================================================================
				function remove() {
					//删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
					var i = elements.length - 1;
					for (; i >= 0; i--) {
						//先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
						var ele = elements[i];
						//从map地图上删除这个子元素div
						ele.parentNode.removeChild(ele);
						elements.splice(i, 1);
					}
				}

				//把Snake暴露给window,外部可以访问
				window.Snake = Snake;
			})();

			//自调用函数---游戏对象================================================
			(function () {
				var that = null; //该变量的目的就是为了保存游戏Game的实例对象-------

				//游戏的构造函数
				function Game(map) {
					this.food = new Food(); //食物对象
					this.snake = new Snake(); //小蛇对象
					this.map = map; //地图
					that = this; //保存当前的实例对象到that变量中-----------------此时that就是this
				}

				//初始化游戏-----可以设置小蛇和食物显示出来
				Game.prototype.init = function () {
					//初始化游戏
					//食物初始化
					this.food.init(this.map);
					//小蛇初始化
					this.snake.init(this.map);
					//调用自动移动小蛇的方法========================||调用了小蛇自动移动的方法
					this.runSnake(this.food, this.map);
					//调用按键的方法
					this.bindKey(); //========================================
				};

				//添加原型方法---设置小蛇可以自动的跑起来
				Game.prototype.runSnake = function (food, map) {
					//自动的去移动
					var timeId = setInterval(
						function () {
							//此时的this是window
							//移动小蛇
							this.snake.move(food, map);
							//初始化小蛇
							this.snake.init(map);
							//横坐标的最大值
							var maxX = map.offsetWidth / this.snake.width;
							//纵坐标的最大值
							var maxY = map.offsetHeight / this.snake.height;
							//小蛇的头的坐标
							var headX = this.snake.body[0].x;
							var headY = this.snake.body[0].y;
							//横坐标
							if (headX < 0 || headX >= maxX) {
								//撞墙了,停止定时器
								clearInterval(timeId);
								alert("游戏结束");
							}
							//纵坐标
							if (headY < 0 || headY >= maxY) {
								//撞墙了,停止定时器
								clearInterval(timeId);
								alert("游戏结束");
							}
						}.bind(that),
						150
					);
				};

				//添加原型方法---设置用户按键,改变小蛇移动的方向
				Game.prototype.bindKey = function () {
					//获取用户的按键,改变小蛇的方向
					document.addEventListener(
						"keydown",
						function (e) {
							//这里的this应该是触发keydown的事件的对象---document,
							//所以,这里的this就是document
							//获取按键的值
							switch (e.keyCode) {
								case 37:
									this.snake.direction = "left";
									break;
								case 38:
									this.snake.direction = "top";
									break;
								case 39:
									this.snake.direction = "right";
									break;
								case 40:
									this.snake.direction = "bottom";
									break;
							}
						}.bind(that),
						false
					);
				};

				//把Game暴露给window,外部就可以访问Game对象了
				window.Game = Game;
			})();

			//初始化游戏对象
			var gm = new Game(document.querySelector(".map"));

			//初始化游戏---开始游戏
			gm.init();

			//外部测试代码
			//  var fd = new Food();
			//  fd.init(document.querySelector(".map"));
			//  //创建小蛇
			//  var snake = new Snake();
			//  snake.init(document.querySelector(".map"));//先在地图上看到小蛇
			//
			//
			//
			//  setInterval(function () {
			//    snake.move(fd, document.querySelector(".map"));
			//    snake.init(document.querySelector(".map"));
			//  }, 150);

			//  snake.move(fd, document.querySelector(".map"));//走一步
			//  snake.init(document.querySelector(".map"));//初始化---重新画一条小蛇(先删除之前的小蛇,把现在的小蛇显示出来)

			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));

			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//console.log(fd.x+"====>"+fd.y);

			//console.log(fd.width);
		</script>
	</body>
</html>
```

### 模块化代码拆分版本

html：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>面向对象贪吃蛇游戏</title>
		<style>
			.map {
				width: 800px;
				height: 600px;
				background-color: #ccc;
				position: relative;
			}
		</style>
	</head>
	<body>
		<!--画出地图,设置样式-->
		<div class="map"></div>
		<script src="food.js"></script>
		<script src="Snake.js"></script>
		<script src="Game.js"></script>
		<script>
			//初始化游戏对象
			var gm = new Game(document.querySelector(".map"));

			//初始化游戏---开始游戏
			gm.init();

			//外部测试代码
			//  var fd = new Food();
			//  fd.init(document.querySelector(".map"));
			//  //创建小蛇
			//  var snake = new Snake();
			//  snake.init(document.querySelector(".map"));//先在地图上看到小蛇
			//
			//
			//
			//  setInterval(function () {
			//    snake.move(fd, document.querySelector(".map"));
			//    snake.init(document.querySelector(".map"));
			//  }, 150);

			//  snake.move(fd, document.querySelector(".map"));//走一步
			//  snake.init(document.querySelector(".map"));//初始化---重新画一条小蛇(先删除之前的小蛇,把现在的小蛇显示出来)

			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));
			//
			//  snake.move(fd, document.querySelector(".map"));
			//  snake.init(document.querySelector(".map"));

			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//  fd.init(document.querySelector(".map"));
			//console.log(fd.x+"====>"+fd.y);

			//console.log(fd.width);
		</script>
	</body>
</html>
```

Snake.js：小蛇的身体方法

```js
//自调用函数---小蛇
(function () {
	var elements = []; //存放小蛇的每个身体部分
	//小蛇的构造函数
	function Snake(width, height, direction) {
		//小蛇的每个部分的宽
		this.width = width || 20;
		this.height = height || 20;
		//小蛇的身体
		this.body = [
			{ x: 3, y: 2, color: "red" }, //头
			{ x: 2, y: 2, color: "orange" }, //身体
			{ x: 1, y: 2, color: "orange" }, //身体
		];
		//方向
		this.direction = direction || "right";
	}

	//为原型添加方法--小蛇初始化的方法
	Snake.prototype.init = function (map) {
		//先删除之前的小蛇
		remove(); //===========================================

		//循环遍历创建div
		for (var i = 0; i < this.body.length; i++) {
			//数组中的每个数组元素都是一个对象
			var obj = this.body[i];
			//创建div
			var div = document.createElement("div");
			//把div加入到map地图中
			map.appendChild(div);
			//设置div的样式
			div.style.position = "absolute";
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			//横纵坐标
			div.style.left = obj.x * this.width + "px";
			div.style.top = obj.y * this.height + "px";
			//背景颜色
			div.style.backgroundColor = obj.color;
			//方向暂时不定
			//把div加入到elements数组中----目的是为了删除
			elements.push(div);
		}
	};

	//为原型添加方法---小蛇动起来
	Snake.prototype.move = function (food, map) {
		//改变小蛇的身体的坐标位置
		var i = this.body.length - 1; //2
		for (; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//判断方向---改变小蛇的头的坐标位置
		switch (this.direction) {
			case "right":
				this.body[0].x += 1;
				break;
			case "left":
				this.body[0].x -= 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}

		//判断有没有吃到食物
		//小蛇的头的坐标和食物的坐标一致
		var headX = this.body[0].x * this.width;
		var headY = this.body[0].y * this.height;
		//判断小蛇的头的坐标和食物的坐标是否相同
		if (headX == food.x && headY == food.y) {
			//获取小蛇的最后的尾巴
			var last = this.body[this.body.length - 1];
			//把最后的蛇尾复制一个,重新的加入到小蛇的body中
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color,
			});
			//把食物删除,重新初始化食物
			food.init(map);
		}
	}; //删除小蛇的私有的函数=============================================================================
	function remove() {
		//删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
		var i = elements.length - 1;
		for (; i >= 0; i--) {
			//先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
			var ele = elements[i];
			//从map地图上删除这个子元素div
			ele.parentNode.removeChild(ele);
			elements.splice(i, 1);
		}
	}

	//把Snake暴露给window,外部可以访问
	window.Snake = Snake;
})();
```

Game.js：游戏的对象方法

```js
//自调用函数---游戏对象================================================
(function () {
	var that = null; //该变量的目的就是为了保存游戏Game的实例对象-------

	//游戏的构造函数
	function Game(map) {
		this.food = new Food(); //食物对象
		this.snake = new Snake(); //小蛇对象
		this.map = map; //地图
		that = this; //保存当前的实例对象到that变量中-----------------此时that就是this
	}

	//初始化游戏-----可以设置小蛇和食物显示出来
	Game.prototype.init = function () {
		//初始化游戏
		//食物初始化
		this.food.init(this.map);
		//小蛇初始化
		this.snake.init(this.map);
		//调用自动移动小蛇的方法========================||调用了小蛇自动移动的方法
		this.runSnake(this.food, this.map);
		//调用按键的方法
		this.bindKey(); //========================================
	};

	//添加原型方法---设置小蛇可以自动的跑起来
	Game.prototype.runSnake = function (food, map) {
		//自动的去移动
		var timeId = setInterval(
			function () {
				//此时的this是window
				//移动小蛇
				this.snake.move(food, map);
				//初始化小蛇
				this.snake.init(map);
				//横坐标的最大值
				var maxX = map.offsetWidth / this.snake.width;
				//纵坐标的最大值
				var maxY = map.offsetHeight / this.snake.height;
				//小蛇的头的坐标
				var headX = this.snake.body[0].x;
				var headY = this.snake.body[0].y;
				//横坐标
				if (headX < 0 || headX >= maxX) {
					//撞墙了,停止定时器
					clearInterval(timeId);
					alert("游戏结束");
				}
				//纵坐标
				if (headY < 0 || headY >= maxY) {
					//撞墙了,停止定时器
					clearInterval(timeId);
					alert("游戏结束");
				}
			}.bind(that),
			300
		);
	};

	//添加原型方法---设置用户按键,改变小蛇移动的方向
	Game.prototype.bindKey = function () {
		//获取用户的按键,改变小蛇的方向
		document.addEventListener(
			"keydown",
			function (e) {
				//这里的this应该是触发keydown的事件的对象---document,
				//所以,这里的this就是document
				//获取按键的值
				switch (e.keyCode) {
					case 37:
						this.snake.direction = "left";
						break;
					case 38:
						this.snake.direction = "top";
						break;
					case 39:
						this.snake.direction = "right";
						break;
					case 40:
						this.snake.direction = "bottom";
						break;
				}
			}.bind(that),
			false
		);
	};

	//把Game暴露给window,外部就可以访问Game对象了
	window.Game = Game;
})();
```

food.js：小蛇的食物方法

```js
// 自调用函数----食物的
(function () {
	var elements = []; // 用来保存每个小方块食物的
	// 食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
	function Food(x, y, width, height, color) {
		// 横纵坐标
		this.x = x || 0;
		this.y = y || 0;
		// 宽和高
		this.width = width || 20;
		this.height = height || 20;
		// 背景颜色
		this.color = color || "green";
	}

	// 为原型添加初始化的方法(作用：在页面上显示这个食物)
	// 因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
	Food.prototype.init = function (map) {
		// 先删除这个小食物
		// 外部无法访问的函数
		remove();

		// 创建div
		var div = document.createElement("div");
		// 把div加到map中
		map.appendChild(div);
		// 设置div的样式
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		// 先脱离文档流
		div.style.position = "absolute";
		// 随机横纵坐标
		this.x =
			parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
		this.y =
			parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";

		// 把div加入到数组elements中
		elements.push(div);
	};

	// 私有的函数---删除食物的
	function remove() {
		// elements数组中有这个食物
		for (var i = 0; i < elements.length; i++) {
			var ele = elements[i];
			// 找到这个子元素的父级元素,然后删除这个子元素
			ele.parentNode.removeChild(ele);
			// 再次把elements中的这个子元素也要删除
			elements.splice(i, 1);
		}
	}

	// 把Food暴露给Window,外部可以使用
	window.Food = Food;
})();
```
