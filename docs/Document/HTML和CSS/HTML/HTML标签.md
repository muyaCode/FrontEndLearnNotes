# HTML5 的新增标签

:::  tip
为了更好地处理今天的互联网应用，HTML5 添加了很多新元素及功能，比如： 图形的绘制，多媒体内容，更好的页面结构，更好的形式 处理，和几个 api 拖放元素，定位，包括网页 应用程序缓存，存储，网络工作者，等等。
:::

<!-- canvas

| **标签**   | **描述**                                    |
| -------- | ----------------------------------------- |
| <canvas> | 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API |

多媒体

| 标签       | 描述                                     |
| -------- | -------------------------------------- |
| <audio>  | 定义音频内容                                 |
| <video>  | 定义视频（video 或者 movie）                   |
| <source> | 定义多媒体资源 <video> 和 <audio>  字体          |
| <embed>  | 定义嵌入的内容，比如插件。                          |
| <track>  | 为诸如 <video> 和 <audio> 元素之类的媒介规定外部文本轨道。 |

表单

| 标签         | 描述                                        |
| ---------- | ----------------------------------------- |
| <datalist> | 定义选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。 |
| <keygen>   | 规定用于表单的密钥对生成器字段。                          |
| <output>   | 定义不同类型的输出，比如脚本的输出。                        |

语义和结构

HTML5提供了新的元素来创建更好的页面结构：

| **标签**       | **描述**                                |
| ------------ | ------------------------------------- |
| <article>    | 定义页面的侧边栏内容                            |
| <aside>      | 定义页面内容之外的内容。                          |
| <bdi>        | 允许您设置一段文本，使其脱离其父元素的文本方向设置。            |
| <command>    | 定义命令按钮，比如单选按钮、复选框或按钮                  |
| <details>    | 用于描述文档或文档某个部分的细节                      |
| <dialog>     | 定义对话框，比如提示框                           |
| <summary>    | 标签包含 details 元素的标题                    |
| <figure>     | 规定独立的流内容（图像、图表、照片、代码等等）。              |
| <figcaption> | 定义 <figure> 元素的标题                     |
| <footer>     | 定义 section 或 document 的页脚。            |
| <header>     | 定义了文档的头部区域                            |
| <mark>       | 定义带有记号的文本。                            |
| <meter>      | 定义度量衡。仅用于已知最大和最小值的度量。                 |
| <nav>        | 定义运行中的进度（进程）。                         |
| <progress>   | 定义任何类型的任务的进度。                         |
| <ruby>       | 定义 ruby 注释（中文注音或字符）。                  |
| <rt>         | 定义字符（中文注音或字符）的解释或发音。                  |
| <rp>         | 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。 |
| <section>    | 定义文档中的节（section、区段）。                  |
| <time>       | 定义日期或时间。                              |
| <wbr>        | 规定在文本中的何处适合添加换行符。                     |

HTML中移除的标签：
以下的 HTML 4.01 元素在HTML5中已经被删除:
<acronym> 字体兼容
<applet> java组件
<basefont> 字体
<big>
<center>
<dir> 目录
<font>
<frame>
<frameset>
<noframes>
<strike>
-->

HTML 参考手册|菜鸟教程：<https://www.runoob.com/tags/html-reference.html>

w3c 的 HTML+CSS 手册：[HTML 系列教程 (w3school.com.cn)](https://www.w3school.com.cn/h.asp)

MDN：[MDN Web Docs (mozilla.org)](https://developer.mozilla.org/zh-CN/)

## HTML5 新增 API

### 页面结构主要使用标签

html5 的这些标签，语义化更明确

| 标签名  |        作用        |
| :-----: | :----------------: |
|   nav   |      表示导航      |
| header  |  表示页眉或者头部  |
| footer  |      表示页脚      |
|  main   |    文档主要内容    |
| article |        文章        |
|  aside  |    主题内容之外    |
| footer  | 文档或者页面的页脚 |

示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			header {
				display: block;
				width: 100%;
				height: 100px;
				background-color: red;
			}
			nav {
				display: block;
				width: 100%;
				height: 36px;
				background-color: green;
			}
			/*IE9:行级元素在设置宽度的时候是失效
        IE8:完全不支持语义标签(不支持html5):在IE8中，它不认识语义标签，所以无法解析这些标签，也就意味着所写的样式无效。*/
			main {
				/*将行级元素转换为块级元素*/
				display: block;
				width: 100%;
				height: 500px;
				background-color: #ccc;
			}
			main > article {
				width: 80%;
				height: 100%;
				background-color: purple;
				float: left;
			}
			main > aside {
				width: 20%;
				height: 100%;
				background-color: pink;
				float: right;
			}
			footer {
				display: block;
				width: 100%;
				height: 80px;
				background-color: skyblue;
			}
		</style>
	</head>
	<body>
		<!--第一种方式：手动创建标签-->
		<!--<script>
    /*手动创建标签:默认的标签的类型都是行级元素*/
    document.createElement("header");
    document.createElement("nav");
    document.createElement("main");
    document.createElement("article");
    document.createElement("aside");
    document.createElement("footer");
</script>-->
		<!--第二种方式：引入第三方插件-->
		<!--html5shiv.min.js:在默认情况下，IE8及以下的IE版本不支持HTML5,引入这个文件就可以做到兼容-->
		<script src="../js/html5shiv.min.js"></script>
		<header>头部</header>
		<nav>导航</nav>
		<main>
			<article>左边</article>
			<aside>右边</aside>
		</main>
		<footer>底部</footer>
		<!--<div class="header"></div>
<div class="nav"></div>
<div class="mainContent">
    <div class="left"></div>
    <div class="right"></div>
</div>
<div class="footer"></div>-->
	</body>
</html>
```

### input 的属性

文档：[HTML input 标签 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/tag-input.html)

编程之家 HTML 标签：<https://www.jb51.cc/htmllabel-tutorial/>

手机浏览器的网页输入框（input 元素）可以用`capture`属性，直接获取摄像头的数据，不需要 JS 代码

使用示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<form action="">
			用户名：<input type="text" name="userName" /> <br />
			密码：<input type="password" name="userPwd" /> <br />
			<!--email提供了默认的电子邮箱的完整验证：要求必须包含@符号，同时必须包含服务器名称，如果不能满足验证，则会阻止当前的数据提交-->
			邮箱：<input type="email" /> <br />
			<!--tel它并不是来实现验证。它的本质目的是为了能够在移动端打开数字键盘。意味着数字键盘限制了用户只能输入数字。  如何查看效果：qq发送文件>>手机端使用qq来接收>>使用手机浏览器查看-->
			电话：<input type="tel" /> <br />
			<!--验证只能输入合法的网址：必须包含http://-->
			网址：<input type="url" /> <br />
			<!--number：只能输入数字(包含小数点)，不能输入其它的字符
    max:最大值
    min:最小值
    value:默认值-->
			数量：<input type="number" value="60" max="100" min="0" /> <br />
			<!--search：可以提供更人性化的输入体验-->
			请输入商品名称：<input type="search" /> <br />
			<!--range:范围-->
			范围：<input type="range" max="100" min="0" value="50" /> <br />
			颜色：<input type="color" /> <br />
			<!--日期时间相关-->
			<!--time:时间：时分秒-->
			时间：<input type="time" /> <br />
			<!--date：日期：年月日-->
			日期：<input type="date" /> <br />
			<!--datetime:大多数浏览器不能支持datetime.用于屏幕阅读器-->
			日期时间：<input type="datetime" /><br />
			<!--datetime-local:日期和时间-->
			日期时间：<input type="datetime-local" /> <br />
			月份：<input type="month" /> <br />
			星期：<input type="week" />
			<!--提交-->
			<input type="submit" />
		</form>
	</body>
</html>
```

### 表单中的新增属性、元素和事件

#### 表单新增属性

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<form action="" id="myForm">
			<!--placeholder：提示文本，提示占位-->
			<!--autofocus:自动获取焦点-->
			<!--autocomplete:自动完成：on:打开  off:关闭
    1.必须成功提交过:提交过才会记录
    2.当前添加autocomplete的元素必须有name属性-->
			用户名：<input
				type="text"
				name="userName"
				placeholder="请输入用户名"
				autofocus
				autocomplete="on"
			/>
			<br />
			<!--tel并不会实现验证，仅仅是在移动端能够弹出数字键盘-->
			<!--required:必须输入，如果没有输入则会阻止当前数据提交-->
			<!--pattern:正则表达式验证
    *:代表任意个
    ?:代表0个或1个
    +：代表1个或多个-->
			手机号：<input
				type="tel"
				name="userPhone"
				required
				pattern="^(\+86)?1\d{10}$"
			/>
			<br />
			<!--multiple：可以选择多个文件-->
			文件：<input type="file" name="photo" multiple /> <br />
			<!--email:有默认验证  在email中，multiple允许输入多个邮箱地址，以逗号分隔-->
			邮箱：<input type="email" name="email" multiple /><br />

			<!--提交：-->
			<input type="submit" /> <br />
		</form>
		<!--下面这个表单元素并没有包含在form中：默认情况下面表单元素的数据不会进行提交-->
		<!--form:指定表单id,那么在将来指定id号的表单进行数据提交的时候，也会将当前表单元素的数据一起提交-->
		地址：<input type="text" name="address" form="myForm" />
	</body>
</html>
```

#### 表单新增元素：input + datalist + option 做下拉选择框

datalist 元素浏览器兼容性较差，不建议使用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<form action="">
			<!--专业：
    <select name="" id="">
        <option value="1">前端与移动开发</option>
        <option value="2">java</option>
        <option value="3">javascript</option>
        <option value="4">c++</option>
    </select>-->
			<!--不仅可以选择，还应该可以输入-->
			<!--建立输入框与datalist的关联  list="datalist的id号"-->
			专业：<input type="text" list="subjects" /> <br />
			<!--通过datalist创建选择列表-->
			<datalist id="subjects">
				<!--创建选项值：value:具体的值 label:提示信息，辅助值-->
				<!--option可以是单标签也可以是双标签-->
				<option value="英语" label="不会" />
				<option value="前端与移动开发" label="前景非常好"></option>
				<option value="java" label="使用人数多"></option>
				<option value="javascript" label="做特效"></option>
				<option value="c" label="不知道"></option>
			</datalist>

			网址：<input type="url" list="urls" />
			<datalist id="urls">
				<!--如果input输入框的type类型是url,那么value值必须添加http://-->
				<option value="http://www.baidu.com" label="百度"></option>
				<option value="http://www.sohu.com"></option>
				<option value="http://www.163.com"></option>
			</datalist>
		</form>
	</body>
</html>
```

#### 加密元素：keygen，输出内容的语义化元素：output

keygen 标签规定用于表单的密钥对生成器字段。

当提交表单时，私钥存储在本地，公钥发送到服务器。

浏览器兼容新较低，该标签在新的 Web 标准中已废弃

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<form action="">
			用户名：<input type="text" name="userName" /><br />
			密码：<input type="password" name="userPwd" /> <br />
			<!-- keygen 标签规定用于表单的密钥对生成器字段 -->
			<!-- 当提交表单时，私钥存储在本地，公钥发送到服务器 -->
			加密：<keygen></keygen><br />
			<input type="submit" />
		</form>

		<!--显示输出信息：只能显示不能修改
1.语义性更强
2.值需要你去设置，不能自动计算-->
		<output>总金额：￥100.00</output>
	</body>
</html>
```

#### 表单中的新增事件：oninput,onkeyup,oninvalid

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<form action="">
			用户名：<input type="text" name="userName" id="userName" /><br />
			电话：<input
				type="tel"
				name="userPhone"
				id="userPhone"
				pattern="^1\d{10}$"
			/>
			<br />
			<input type="submit" />
		</form>
		<script>
			/*1.oninput:监听当前指定元素内容的改变：只要内容改变(添加内容，删除内容)，就会触发这个事件*/
			document.getElementById("userName").oninput = function () {
				console.log("oninput:" + this.value);
			};

			/*onkeyup:键盘弹起的时候触发：每一个键的弹起都会触发一次*/
			document.getElementById("userName").onkeyup = function () {
				console.log("onkeyup:" + this.value);
			};

			/*oninvalid:当验证不通过时触发*/
			document.getElementById("userPhone").oninvalid = function () {
				/*设置默认的提示信息*/
				this.setCustomValidity("请输入合法的11位手机号");
			};
		</script>
	</body>
</html>
```

#### 两种类型进度条：progress 和 meter

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<!--max:最大值，value:当前进度值-->
		<progress max="100" value="100"></progress>

		<!--度量器：衡量当前进度值-->
		<!--high:规定的较高的值
low:规定的较低的值
max:最大值
min:最小值
value:当前度量值-->
		<meter max="100" min="0" high="80" low="40" value="30"></meter>
		<meter max="100" min="0" high="80" low="40" value="60"></meter>
		<meter
			max="100"
			min="0"
			high="80"
			low="40"
			value="100"
			name="level"
		></meter>
	</body>
</html>
```

#### 表单案例总结

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<link rel="stylesheet" href="../css/formCss.css" />
	</head>
	<body>
		<form action="">
			<fieldset>
				<legend>学生档案</legend>
				<label for="userName">姓名:</label>
				<input
					type="text"
					name="userName"
					id="userName"
					placeholder="请输入用户名"
				/>
				<label for="userPhone">手机号码:</label>
				<input type="tel" name="userPhone" id="userPhone" pattern="^1\d{10}$" />
				<label for="email">邮箱地址:</label>
				<input type="email" required name="email" id="email" />
				<label for="collage">所属学院:</label>
				<input
					type="text"
					name="collage"
					id="collage"
					list="cList"
					placeholder="请选择"
				/>
				<datalist id="cList">
					<option value="前端与移动开发学院"></option>
					<option value="java学院"></option>
					<option value="c++学院"></option>
				</datalist>
				<label for="score">入学成绩:</label>
				<input type="number" max="100" min="0" value="0" id="score" />
				<label for="level">基础水平:</label>
				<meter id="level" max="100" min="0" low="59" high="90"></meter>
				<label for="inTime">入学日期:</label>
				<input type="date" id="inTime" name="inTime" />
				<label for="leaveTime">毕业日期:</label>
				<input type="date" id="leaveTime" name="leaveTime" />
				<input type="submit" />
			</fieldset>
		</form>
		<script>
			// 增加入学成绩事件，meter 进度条也改变
			document.getElementById("score").oninput = function () {
				document.getElementById("level").value = this.value;
			};
		</script>
	</body>
</html>
```

CSS 样式：css/formCss.scc

```css
* {
	padding: 0;
	margin: 0;
}
form {
	width: 600px;
	margin: 20px auto;
}

form > fieldset {
	padding: 10px;
}

form > fieldset > meter,
form > fieldset > input {
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 10px 0;
	border: none;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	padding-left: 5px;
	/*width=内容+padding+border*/
	box-sizing: border-box;
}
form > fieldset > meter {
	padding-left: 0px;
}
```

### 音频和视频

文档：[HTML-video 标签 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/tag-video.html)

JavaScript 方法文档-用于自定义播放器：[HTML 音频/视频 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-av-dom.html)

html 案例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<!--embed:可以直接插入音频视频，本质是通过本机安装的音频视频播放软件来播放的。要求必须已经安装了这些软件  兼容性-->

		<!--flash:  1.先学习flash,增加使用成本  2.iphone,ipd,不支持flash-->

		<!--audio:音频-->
		<!--
src:播放文件的路径
controls:音频播放器的控制器面板
autoplay:自动播放
loop:循环播放-->
		<!--<audio src="../mp3/aa.mp3" controls></audio>-->

		<!--video：视频-->
		<!--
src:播放文件的路径
controls:音频播放器的控制器面板
autoplay:自动播放
loop:循环播放
poster:指定视频还没有完全下载完毕，或者用户没有点击播放前显示的封面。 默认显示当前视频文件的第一副图像
width:视频的宽度
height:视频的高度
-->
		<!--注意事项：视频始终会保持原始的宽高比。意味着如果你同时设置宽高，并不是真正的将视频的画面大小设置为指定的大小，而只是将视频的占据区域设置为指定大小，除非你设置的宽高刚好就是原始的宽高比例。所以建议：在设置视频宽高的时候，一般只会设置宽度或者高度，让视频文件自动缩放-->
		<!--<video src="../mp3/mp4.mp4" poster="../images/l1.jpg" controls  height="600"></video>-->

		<!--source:因为不同的浏览器所支持的视频格式不一样，为了保证用户能够看到视频，我们可以提供多个视频文件让浏览器自动选择-->
		<!--<video src="../mp3/flv.flv" controls></video>-->
		<video controls>
			<!--视频源，可以有多个源-->
			<source src="../mp3/flv.flv" type="video/flv" />
			<source src="../mp3/mp4.mp4" type="video/mp4" />
		</video>
	</body>
</html>
```

### 自定义属性

标签内自定义属性

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<!--定义-->
		<!--规范：
1.data-开头
2.data-后必须至少有一个字符，多个单词使用-连接
建议：
1.名称应该都使用小写--不要包含任何的大写字符
2.名称中不要有任何的特殊符号
3.名称不要副作用纯数字-->
		<p data-school-name="itcast">传智播客</p>
		<p data-name="itcast">传智播客</p>

		<!--取值-->
		<script>
			window.onload = function () {
				var p = document.querySelector("p");
				/*获取自定义属性值*/
				/*将data-后面的单词使用camel命名法连接:必须使用camel合法法获取值否则有可能无法获取到值*/
				//var value=p.dataset["schoolname"];//data-schoolname
				var value = p.dataset["schoolName"]; //data-school-name
				console.log(value);
			};
		</script>
	</body>
</html>
```

### 网络监听接口

ononline 事件：网络连通的时候触发这个事件

offline 事件：网络断开时触发

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<script>
			/*1.ononline:网络连通的时候触发这个事件*/
			window.addEventListener("online", function () {
				alert("网络连通了");
			});

			/*2.onoffline:网络断开时触发*/
			window.addEventListener("offline", function () {
				alert("网络断开了");
			});
		</script>
	</body>
</html>
```

### 全屏接口

接口：

1. requestFullScreen():开启全屏显示

   1. 不同浏览器需要添加不同的前缀

   2. chrome：webkit   firefox：moz   ie：ms   opera：o

2. cancelFullScreen()：退出全屏显示:也添加前缀，在不同的浏览器下.退出全屏只能使用 document 来实现

3. fullScreenElement：是否是全屏状态，也只能使用 document 进行判断

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<div>
			<img src="../images/l1.jpg" alt="" />
			<input type="button" id="full" value="全屏" />
			<input type="button" id="cancelFull" value="退出全屏" />
			<input type="button" id="isFull" value="是否全屏" />
		</div>
		<script>
			/*全屏操作的主要方法和属性
			 * 1.requestFullScreen():开启全屏显示
			 *   不同浏览器需要添加不同的前缀
			 *   chrome:webkit   firefox:moz   ie:ms   opera:o
			 * 2.cancelFullScreen():退出全屏显示:也添加前缀，在不同的浏览器下.退出全屏只能使用document来实现
			 * 3.fullScreenElement:是否是全屏状态，也只能使用document进行判断*/

			window.onload = function () {
				var div = document.querySelector("div");
				/*添加三个按钮的点击事件*/
				/*全屏操作*/
				document.querySelector("#full").onclick = function () {
					/*div.requestFullScreen();*/
					/*div.webkitRequestFullScreen();*/
					/*div.mozRequestFullScreen();*/
					/*使用能力测试添加不同浏览器下的前缀*/
					if (div.requestFullScreen) {
						div.requestFullScreen();
					} else if (div.webkitRequestFullScreen) {
						div.webkitRequestFullScreen();
					} else if (div.mozRequestFullScreen) {
						div.mozRequestFullScreen();
					} else if (div.msRequestFullScreen) {
						div.msRequestFullScreen();
					}
				};

				/*退出全屏*/
				document.querySelector("#cancelFull").onclick = function () {
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msCancelFullScreen) {
						document.msCancelFullScreen();
					}
				};

				/*判断是否是全屏状态*/
				document.querySelector("#isFull").onclick = function () {
					/*两个细节：使用document判断  能力测试*/
					if (
						document.fullscreenElement ||
						document.webkitFullscreenElement ||
						document.mozFullScreenElement ||
						document.msFullscreenElement
					) {
						alert(true);
					} else {
						alert(false);
					}
				};
			};
		</script>
	</body>
</html>
```

### FileReader 实例文件读取

文档：[FileReader - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			div {
				height: 20px;
				width: 0%;
				background-color: red;
			}
		</style>
	</head>
	<body>
		<!--展示图片：-->
		<!--src:指定路径(资源定位--url):src请求的是外部文件，一般来说是服务器资源。意味着它需要向服务器发送请求，它占用服务器资源-->
		<!--<img src="../images/l1.jpg" alt="">-->

		<!--需求：即时预览：
即时：当用户选择完图片之后就立刻进行预览的处理 >>onchange
预览：通过文件读取对象的readAsDataURL()完成-->
		<form action="">
			文件：
			<input
				type="file"
				name="myFile"
				id="myFile"
				onchange="getFileContent();"
			/>
			<br />
			<div></div>
			<input type="submit" />
		</form>
		<img src="" alt="" />
		<script>
			var div = document.querySelector("div");
			/*FileReader:读取文件内容
			 * 1.readAsText():读取文本文件(可以使用Txt打开的文件)，返回文本字符串，默认编码是UTF-8
			 * 2.readAsBinaryString():读取任意类型的文件。返回二进制字符串。这个方法不是用来读取文件展示给用户看，而是存储文件。例如：读取文件的内容，获取二进制数据，传递给后台，后台接收了数据之后，再将数据存储
			 * 3.readAsDataURL():读取文件获取一段以data开头的字符串，这段字符串的本质就是DataURL.DataURL是一种将文件(这个文件一般就是指图像或者能够嵌入到文档的文件格式)嵌入到文档的方案。DataURL是将资源转换为base64编码的字符串形式，并且将这些内容直接存储在url中>>优化网站的加载速度和执行效率。
			 * abort():中断读取*/
			function getFileContent() {
				/*1.创建文件读取对象*/
				var reader = new FileReader();
				/*2.读取文件，获取DataURL
				 * 2.1.说明没有任何的返回值:void：但是读取完文件之后，它会将读取的结果存储在文件读取对象的result中
				 * 2.2.需要传递一个参数 binary large object:文件(图片或者其它可以嵌入到文档的类型)
				 * 2.3:文件存储在file表单元素的files属性中，它是一个数组*/
				var file = document.querySelector("#myFile").files;
				reader.readAsDataURL(file[0]);
				/*获取数据*/
				/*FileReader提供一个完整的事件模型，用来捕获读取文件时的状态
				 * onabort:读取文件中断片时触发
				 * onerror:读取错误时触发
				 * onload:文件读取成功完成时触发
				 * onloadend:读取完成时触发，无论成功还是失败
				 * onloadstart:开始读取时触发
				 * onprogress:读取文件过程中持续触发*/
				reader.onload = function () {
					//console.log(reader.result);
					/*展示*/
					document.querySelector("img").src = reader.result;
				};

				reader.onprogress = function (e) {
					var percent = (e.loaded / e.total) * 100 + "%";
					div.style.width = percent;
				};
			}
		</script>
	</body>
</html>
```

### 拖拽接口

标签元素拖拽属性：draggable="true"

实现拖拽的事件：

- 应用于被拖拽元素的事件：

  - ondrag         应用于拖拽元素，整个拖拽过程都会调用--持续

  - ondragstart     应用于拖拽元素，当拖拽开始时调用

  - ondragleave     应用于拖拽元素，当鼠标离开拖拽元素时调用

  - ondragend     应用于拖拽元素，当拖拽结束时调用\*/

- 应用于目标元素的事件：

  - ondragenter     应用于目标元素，当拖拽元素进入时调用

  - ondragover     应用于目标元素，当停留在目标元素上时调用

  - ondrop         应用于目标元素，当在目标元素上松开鼠标时调用

  - ondragleave     应用于目标元素，当鼠标离开目标元素时调用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				margin: 0;
				padding: 0;
			}
			.div1 {
				width: 200px;
				height: 200px;
				border: 1px solid red;
				position: relative;
				margin-left: 20px;
				float: left;
			}
			.div2 {
				width: 200px;
				height: 200px;
				border: 1px solid blue;
				position: relative;
				margin-left: 20px;
				float: left;
			}
			.div3 {
				width: 200px;
				height: 200px;
				border: 1px solid green;
				position: relative;
				margin-left: 20px;
				float: left;
			}
			p {
				background-color: orange;
				margin-top: 5px;
			}
		</style>
	</head>
	<body>
		<div class="div1" id="div1">
			<!--在h5中，如果想拖拽元素，就必须为元素添加draggable="true". 图片和超链接默认就可以拖拽-->
			<p id="pe" draggable="true">试着把我拖过去</p>
			<p id="pe1" draggable="true">试着也把我拖过去</p>
		</div>
		<div class="div2" id="div2"></div>
		<div class="div3" id="div3"></div>
		<script>
			/*学习拖拽，主要就是学习拖拽事件*/
			var obj = null; //当前被拖拽的地元素

			// ***** 指定元素的拖拽事件 *****
			p.ondragstart = function () {
				console.log("ondragstart");
			};
			p.ondragend = function () {
				console.log("ondragend");
			};
			p.ondragleave = function () {
				console.log("被拖拽元素：ondragleave");
			};
			p.ondrag = function () {
				//console.log("ondrag");
			};

			/*应用于目标元素的事件
    *ondragenter    应用于目标元素，当拖拽元素进入时调用
     ondragover    应用于目标元素，当停留在目标元素上时调用
     ondrop        应用于目标元素，当在目标元素上松开鼠标时调用
     ondragleave    应用于目标元素，当鼠标离开目标元素时调用*/
			div2.ondragenter = function () {
				console.log("ondragenter");
			};
			div2.ondragover = function (e) {
				//console.log("ondragover");
				/*如果想触发ondrop事件，那么就必须在这个位置阻止浏览器的默认行为*/
				e.preventDefault();
			};
			/*浏览器默认会阻止ondrop事件：我们必须在ondragover中阻止浏览器的默认行为*/
			div2.ondrop = function () {
				console.log("ondrop");
				/*添加被拖拽的元素到当前目标元素*/
				div2.appendChild(p);
			};
			div2.ondragleave = function () {
				console.log("目标元素：ondragleave");
			};

			div1.ondragover = function (e) {
				//console.log("ondragover");
				/*如果想触发ondrop事件，那么就必须在这个位置阻止浏览器的默认行为*/
				e.preventDefault();
			};
			div1.ondrop = function () {
				console.log("ondrop");
				/*添加被拖拽的元素到当前目标元素*/
				div1.appendChild(p);
			};

			/*应用于被拖拽元素的事件
    *ondrag         应用于拖拽元素，整个拖拽过程都会调用--持续
     ondragstart    应用于拖拽元素，当拖拽开始时调用
     ondragleave    应用于拖拽元素，当鼠标离开拖拽元素时调用
     ondragend    应用于拖拽元素，当拖拽结束时调用*/
			document.ondragstart = function (e) {
				/*通过事件捕获来获取当前被拖拽的子元素*/
				e.target.style.opacity = 0.5;
				e.target.parentNode.style.borderWidth = "5px";
				obj = e.target;
				/*通过dataTransfer来实现数据的存储与获取
				 * setData(format,data):
				 * format:数据的类型：text/html   text/uri-list
				 * Data:数据:一般来说是字符串值*/
				e.dataTransfer.setData("text/html", e.target.id);
			};
			document.ondragend = function (e) {
				e.target.style.opacity = 1;
				e.target.parentNode.style.borderWidth = "1px";
			};
			document.ondragleave = function (e) {};
			document.ondrag = function (e) {};

			/*应用于目标元素的事件
    *ondragenter    应用于目标元素，当拖拽元素进入时调用
     ondragover    应用于目标元素，当停留在目标元素上时调用
     ondrop        应用于目标元素，当在目标元素上松开鼠标时调用
     ondragleave    应用于目标元素，当鼠标离开目标元素时调用*/
			document.ondragenter = function (e) {
				console.log(e.target);
			};
			document.ondragover = function (e) {
				/*如果想触发ondrop事件，那么就必须在这个位置阻止浏览器的默认行为*/
				e.preventDefault();
			};
			/*浏览器默认会阻止ondrop事件：我们必须在ondragover中阻止浏览器的默认行为*/
			document.ondrop = function (e) {
				/*添加元素*/
				//e.target.appendChild(obj);
				/*通过e.dataTransfer.setData存储的数据，只能在drop事件中获取*/
				var id = e.dataTransfer.getData("text/html");
				/*console.log("id="+id);*/
				e.target.appendChild(document.getElementById(id));
			};
			document.ondragleave = function (e) {};
		</script>
	</body>
</html>
```

### 地理定位接口

文档：

- [HTML5 地理定位 | 菜鸟教程 (runoob.com)](https://www.runoob.com/html/html5-geolocation.html)

- [HTML5 地理定位 (w3school.com.cn)](https://www.w3school.com.cn/html/html5_geolocation.asp)

- [HTML5 地理定位\_w3cschool](https://www.w3cschool.cn/html5/html5-geolocation.html)

- [HTML5 地理定位 · HTML5 中文教程 (uprogrammer.cn)](http://uprogrammer.cn/html5-cn/geolocation.html)

```html

```

### web 存储

文档：[HTML5 Web 存储 | 菜鸟教程 (runoob.com)](https://www.runoob.com/html/html5-webstorage.html)

#### localStorage 和 sessionStorage

客户端存储数据的两个对象为：

- localStorage - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。
- sessionStorage - 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

在使用 web 存储前,应检查浏览器是否支持 localStorage 和 sessionStorage:

```js
if (typeof Storage !== "undefined") {
	// 是的! 支持 localStorage  sessionStorage 对象!
	// 一些代码.....
} else {
	// 抱歉! 不支持 web 存储。
}
```
