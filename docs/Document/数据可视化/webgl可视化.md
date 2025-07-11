# webgl 可视化

## 地理信息获取

1-H5 地理信息.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			#box {
				width: 300px;
				height: 300px;
				border: 1px solid #000;
			}
		</style>
	</head>
	<body>
		<div id="box"></div>
		<script>
			if ("geolocation" in navigator) {
				//console.log(navigator.geolocation);
				let nub = 0;
				let index = navigator.geolocation.watchPosition(
					(position) => {
						//console.log("请求成功",position);
						nub++;
						box.innerHTML = `
           当前时间： ${position.timestamp}<br/>
           维度： ${position.coords.latitude}<br/>
           经度： ${position.coords.longitude}<br/>
           ${nub}
        `;
						if (nub >= 10) {
							navigator.geolocation.clearWatch(nub);
						}
					},
					(err) => {
						console.log("请求失败", err);
					},
					{
						enableHighAccuracy: true,
						timeout: 3000,
					}
				);
			} else {
				alert("对不起您的设备不支持地理定位");
			}
		</script>
	</body>
</html>
```

## 各种地图的 API

### 百度地图

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="http://api.map.baidu.com/api?v=3.0&ak=zKmy0EuvQ863eYPVAV0i4nwAIGqpB1Fs"></script>
		<style>
			#box {
				width: 300px;
				height: 300px;
			}
		</style>
	</head>
	<body>
		<div id="box"></div>
		<script>
			// 在 box 中创建一份地图
			var map = new BMap.Map("box");
			// 获取以当前经纬为中心的地图信息
			var point = new BMap.Point(116.404, 39.915);
			// 创建点坐标
			// 给 box 中 map 设置 中心点 以及缩放级别
			map.centerAndZoom(point, 15);
		</script>
	</body>
</html>
```

坐标系转换

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="https://api.map.baidu.com/api?v=3.0&ak=zKmy0EuvQ863eYPVAV0i4nwAIGqpB1Fs"></script>
		<style>
			#box {
				width: 300px;
				height: 300px;
			}
		</style>
	</head>
	<body>
		<div id="box"></div>
		<div id="box2"></div>
		<script>
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let { latitude, longitude } = position.coords;
					// 在 box 中创建一份地图
					var map = new BMap.Map("box");
					// 获取以当前经纬为中心的地图信息
					var point = new BMap.Point(longitude, latitude);
					// 创建点坐标
					// 给 box 中 map 设置 中心点 以及缩放级别
					var convertor = new BMap.Convertor();
					var pointArr = [point];
					convertor.translate(pointArr, 1, 5, (data) => {
						//box2.innerHTML = data.points[0];
						map.centerAndZoom(data.points[0], 15);
					});
				},
				(err) => {
					console.log("请求失败", err);
				},
				{
					enableHighAccuracy: true,
					timeout: 3000,
				}
			);
		</script>
	</body>
</html>
```

百度定位

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="http://api.map.baidu.com/api?v=3.0&ak=zKmy0EuvQ863eYPVAV0i4nwAIGqpB1Fs"></script>
		<style>
			#box {
				width: 300px;
				height: 300px;
			}
		</style>
	</head>
	<body>
		<div id="box"></div>
		<div id="box2"></div>
		<script>
			{
				let geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition((e) => {
					if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
						//console.log(e);
						let map = new BMap.Map("box");
						let mark = new BMap.Marker(e.point);
						map.centerAndZoom(e.point, 15);
						map.addOverlay(mark);
					} else {
						alert("定位失败");
					}
				});
			}
		</script>
	</body>
</html>
```

行走日记

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="http://api.map.baidu.com/api?v=3.0&ak=zKmy0EuvQ863eYPVAV0i4nwAIGqpB1Fs"></script>
		<style>
			html {
				font-size: 10vw;
			}
			body {
				margin: 0;
				font-size: 0.3rem;
			}
			h1 {
				margin: 0;
			}
			#main {
				display: flex;
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				flex-direction: column;
			}
			.header {
				height: 1.4rem;
				background: #000;
			}
			.header h1 {
				font: 0.45rem/1.4rem "宋体";
				text-align: center;
				color: #fff;
			}
			#view {
				flex: 1;
			}
			.view {
				height: 100%;
				display: none;
				overflow: auto;
			}
			#view .show {
				display: block;
			}
			#nav {
				display: flex;
				border-top: 2px solid #000;
				height: 1.2rem;
			}
			#nav a {
				flex: 1;
				background: #000;
				color: #fff;
				font: 0.3rem/1.2rem "宋体";
				text-align: center;
			}
			#nav a.active {
				color: #000;
				background: #fff;
			}
		</style>
	</head>
	<body>
		<section id="main">
			<header class="header">
				<h1>行走日记</h1>
			</header>
			<div id="view">
				<div class="view show" id="map"></div>
				<div class="view">
					<textarea id="text"></textarea>
					<button id="btn">发布日记</button>
				</div>
				<div class="view" id="list">
					<ul class="message_list">
						<li>
							<p>心情不错，放飞了自己</p>
							<span>北京市</span>
						</li>
						<li>
							<p>心情不错，放飞了自己2</p>
							<span>北京市</span>
						</li>
						<li>
							<p>心情不错，放飞了自己3</p>
							<span>北京市</span>
						</li>
					</ul>
				</div>
			</div>
			<nav id="nav">
				<a class="active">地图</a>
				<a>记录</a>
				<a>日记</a>
			</nav>
		</section>
		<script>
			{
				let navs = document.querySelectorAll("#nav a");
				let views = document.querySelectorAll("#view .view");
				let map = new BMap.Map("map");
				let geolocation = new BMap.Geolocation();
				let nowPoint = new BMap.Point(116.331398, 39.897445);
				let nowCity = "";
				let marks = [];
				let messageList = document.querySelector(".message_list");
				if (localStorage.getItem("gis")) {
					gis = JSON.parse(localStorage.getItem("gis"));
				} else {
					gis = [
						{
							title: "哈哈哈",
							point: new BMap.Point(116.331398, 39.897445),
							city: "北京市",
						},
					];
				}
				addLabel();
				renderList();
				map.centerAndZoom(nowPoint, 12);

				// 在地图上添加覆盖物
				function addLabel() {
					marks.forEach((mark) => {
						map.removeOverlay(mark);
					});
					gis.forEach((info) => {
						let mark = new BMap.Marker(info.point);
						let txt = info.title.substr(0, 10);
						let width = txt.length * 12 + 10;
						let opt = {
							position: info.point,
							offset: new BMap.Size(-width / 2 - 2, 2),
						};
						let label = new BMap.Label(txt, opt);
						label.setStyle({
							width: width + "px",
							fontSize: "12px",
							color: "red",
							height: "30px",
							lineHeight: "30px",
							textAlign: "center",
						});
						map.addOverlay(mark);
						map.addOverlay(label);
						marks.push(mark);
						marks.push(label);
					});
				}

				// 渲染日记

				function renderList() {
					if (gis.length < 1) {
						messageList.innerHTML = "暂无日记";
						return;
					}
					messageList.innerHTML = gis
						.map((info) => {
							return `<li>
                    <p>${info.title}</p>
                    <span>${info.city}</span>
                </li>`;
						})
						.join("");
				}

				// 获取当前位置
				geolocation.getCurrentPosition(
					(e) => {
						if (geolocation.getStatus() == 0) {
							nowPoint = e.point;
							console.log(e);
							nowCity = e.address.city;
							let myIcon = new BMap.Icon(
								"http://lbsyun.baidu.com//jsdemo/img/fox.gif",
								new BMap.Size(300, 157)
							);
							let mark = new BMap.Marker(nowPoint, { icon: myIcon });
							map.addOverlay(mark);
							map.panTo(nowPoint);
						}
					},
					{
						enableHighAccuracy: true,
					}
				);

				// 发布日记
				let btn = document.querySelector("#btn");
				let text = document.querySelector("#text");
				btn.onclick = function () {
					gis.push({
						title: text.value,
						point: nowPoint,
						city: nowCity,
					});
					addLabel();
					renderList();
					localStorage.setItem("gis", JSON.stringify(gis));
				};

				navs.forEach((a, index) => {
					a.onclick = function () {
						navs.forEach((a, index) => {
							a.classList.remove("active");
							views[index].classList.remove("show");
						});
						a.classList.add("active");
						views[index].classList.add("show");
					};
				});
			}
		</script>
	</body>
</html>
```

控件

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="http://api.map.baidu.com/api?v=3.0&ak=zKmy0EuvQ863eYPVAV0i4nwAIGqpB1Fs"></script>
		<style>
			html {
				font-size: 10vw;
			}
			body {
				margin: 0;
				font-size: 0.3rem;
			}
			h1 {
				margin: 0;
			}
			#main {
				display: flex;
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				flex-direction: column;
			}
			#map {
				flex: 1;
			}
		</style>
	</head>
	<body>
		<section id="main">
			<div id="map"></div>
		</section>
		<script>
			{
				let map = new BMap.Map("map");
				let nowPoint = new BMap.Point(116.331398, 39.897445);
				map.centerAndZoom(nowPoint, 12);
				map.addControl(
					new BMap.NavigationControl({
						anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
						offset: new BMap.Size(100, 0),
						type: BMAP_NAVIGATION_CONTROL_PAN,
					})
				);
				map.addControl(new BMap.OverviewMapControl());
				map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.MapTypeControl());
				map.addControl(new BMap.GeolocationControl());
			}
		</script>
	</body>
</html>
```

### 高德地图

## HTML5 拖放操作和 FileReader

### 1-Drag 与 Drop

1.拖拽与拖放的效果

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<p>呵呵哈哈哈</p>
		<div>
			<a href="http://kaikeba.com">呵呵呵呵</a>
		</div>
		<img src="./images/logo-new.png" />

		<div style="width: 100px;height: 100px;background: red"></div>
	</body>
</html>
```

2.拖放基本流程

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<p>呵呵哈哈哈</p>
		<div>
			<a href="http://kaikeba.com">呵呵呵呵</a>
		</div>
		<img src="./images/logo-new.png" draggable="false" />

		<!-- 设置被拖放元素的draggable属性为true -->
		<div
			id="box1"
			draggable="true"
			style="width: 100px;height: 100px;background: red"
		></div>

		<script>
			/*
            我们可以给默认可以拖拽的元素（选中的文本、链接、图像）设置draggable为false，就可以阻止它们拖拽

            firefox：如果拖拽的元素没有设置拖放内容，还是不能拖放
                - draggable=true
                - 设置拖放内容
        */
			let box1 = document.querySelector("#box1");

			box1.ondragstart = function (e) {
				// 设置拖放内容：e.dataTransfer.setData('text', 'kaikeba');
				e.dataTransfer.setData("text", "kaikeba");
			};
		</script>

		<div
			id="box1"
			draggable="true"
			style="width: 100px;height: 100px;background: red"
		></div>

		<div
			id="box2"
			draggable="true"
			style="width: 200px;height: 200px;background: green; position: absolute; left: 400px;top: 200px;"
		></div>

		<img src="./images/logo-new.png" />

		<script>
			let box1 = document.querySelector("#box1");
			let box2 = document.querySelector("#box2");

			box1.ondragstart = function (e) {
				// 如果在这里设置了拖拽的数据，则会触发浏览器的默认行为
				e.dataTransfer.setData("text", "http://kaikeba.com");

				console.log("dragstart");
			};

			box1.ondrag = function () {
				console.log("drag");
			};

			box1.ondragend = function () {
				console.log("dragend");
			};

			box2.ondragenter = function () {
				console.log("dragenter");
			};

			box2.ondragleave = function () {
				console.log("dragleave");
			};

			/*
            默认情况下，不是所有元素都能成为放置元素的
            我们需要在dragover事件中阻止默认的行为：不允许放置
        */
			box2.ondragover = function (e) {
				// 该事件每次触发的时候都会重置默认行为
				e.preventDefault();
				console.log("dragover");
			};

			box2.ondrop = function (e) {
				// 当drop事件触发的时候，还有会有其它的一些默认的行为
				e.preventDefault();
				e.stopPropagation();
				console.log("drop");
			};
		</script>
	</body>
</html>
```

3.拖放数据-拖放内容

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<div
			id="box1"
			draggable="true"
			style="width: 100px;height: 100px;background: red"
		></div>

		<div
			id="box2"
			draggable="true"
			style="width: 200px;height: 200px;background: green; position: absolute; left: 400px;top: 200px;"
		></div>

		<img src="./images/logo-new.png" />

		<script>
			let box1 = document.querySelector("#box1");
			let box2 = document.querySelector("#box2");

			box1.ondragstart = function (e) {
				// e.dataTransfer.setData('text/html', 'http://kaikeba.com');
				// e.dataTransfer.setData('text/plain', 'abc');
				// e.dataTransfer.setData('text', box1);

				e.dataTransfer.setData("text", "#box1");
			};

			box2.ondragover = function (e) {
				e.preventDefault();
			};

			box2.ondrop = function (e) {
				e.preventDefault();
				e.stopPropagation();

				// console.log('drop', e.dataTransfer.getData('text/html'));
				// console.log('drop', e.dataTransfer.getData('text/plain'));

				// console.log(e.dataTransfer.getData('text'));

				let id = e.dataTransfer.getData("text");
				let el = document.querySelector(id);

				this.appendChild(el);
			};
		</script>
	</body>
</html>
```

4.拖放数据-拖放效果

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<div
			id="box1"
			draggable="true"
			style="width: 100px;height: 100px;background: red"
		></div>

		<div
			id="box2"
			draggable="true"
			style="width: 200px;height: 200px;background: green; position: absolute; left: 400px;top: 200px;"
		></div>

		<img src="./images/logo-new.png" />

		<script>
			let box1 = document.querySelector("#box1");
			let box2 = document.querySelector("#box2");

			box1.ondragstart = function (e) {
				e.dataTransfer.setData("text", "开课吧");

				// 后续 dropEffect 值的白名单
				e.dataTransfer.effectAllowed = "copyLink";
			};

			box2.ondragover = function (e) {
				// 禁止放置
				// e.dataTransfer.dropEffect = 'none';

				// console.log( e.dataTransfer.dropEffect );

				e.dataTransfer.dropEffect = "move";

				e.preventDefault();
			};

			box2.ondrop = function (e) {
				e.preventDefault();
				e.stopPropagation();
				console.log("drop");
			};
		</script>
	</body>
</html>
```

5.拖放数据-拖放图片

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<div
			id="box1"
			draggable="true"
			style="width: 100px;height: 100px;background: red"
		></div>

		<div
			id="box2"
			draggable="true"
			style="width: 200px;height: 200px;background: green; position: absolute; left: 400px;top: 200px;"
		></div>

		<!-- <img src="./images/logo-new.png" /> -->

		<script>
			let box1 = document.querySelector("#box1");
			let box2 = document.querySelector("#box2");

			let img = new Image(); // document.createElement('img');
			img.src = "./images/logo-new.png";

			box1.ondragstart = function (e) {
				e.dataTransfer.setData("text", "开课吧");

				// 后续 dropEffect 值的白名单
				e.dataTransfer.effectAllowed = "copyLink";

				// 设置拖放图片
				e.dataTransfer.setDragImage(img, 100, 100);
			};

			box2.ondragover = function (e) {
				// 禁止放置
				// e.dataTransfer.dropEffect = 'none';

				// console.log( e.dataTransfer.dropEffect );

				e.dataTransfer.dropEffect = "move";

				e.preventDefault();
			};

			box2.ondrop = function (e) {
				e.preventDefault();
				e.stopPropagation();
				console.log("drop");
			};
		</script>
	</body>
</html>
```

### 2-系统文件拖放与读取

1.拖放系统文件到页面.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<script>
			// 设置body为可放置元素
			document.body.ondragover = function (e) {
				e.preventDefault();
			};
			// 处理放置后的行为
			document.body.ondrop = function (e) {
				// 防止浏览器打开文件这个默认行为
				e.preventDefault();
				e.stopPropagation();

				// console.log('drop');

				console.log(e.dataTransfer.files);
			};
		</script>
	</body>
</html>
```

2.input.file.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<input type="file" id="f" />

		<script>
			let f = document.querySelector("#f");

			f.onchange = function () {
				// console.log('change');
				// console.log( this.value );

				console.log(this.files);
			};
		</script>
	</body>
</html>
```

3.FileReader.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<script>
			// 设置body为可放置元素
			document.body.ondragover = function (e) {
				e.preventDefault();
			};
			// 处理放置后的行为
			document.body.ondrop = function (e) {
				// 防止浏览器打开文件这个默认行为
				e.preventDefault();
				e.stopPropagation();

				// console.log('drop');

				// console.log( e.dataTransfer.files );

				let file = e.dataTransfer.files[0];

				// 读取文件的内容
				let fr = new FileReader();

				fr.onload = function () {
					console.log(this.result);
				};

				// fr.readAsText( file );
				// fr.readAsText( file, 'gbk' );
			};
		</script>
	</body>
</html>
```

4.FileReader-dataURL.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<!-- <img src="data:image/png;base64,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" /> -->

		<script>
			// 设置body为可放置元素
			document.body.ondragover = function (e) {
				e.preventDefault();
			};
			// 处理放置后的行为
			document.body.ondrop = function (e) {
				// 防止浏览器打开文件这个默认行为
				e.preventDefault();
				e.stopPropagation();

				// console.log('drop');

				// console.log( e.dataTransfer.files );

				let file = e.dataTransfer.files[0];

				// 读取文件的内容
				let fr = new FileReader();

				fr.onload = function () {
					// console.log(this.result);

					let img = new Image(); // new Image() => document.createElement('img')
					img.src = this.result;
					document.body.appendChild(img);
				};

				fr.readAsDataURL(file);
			};
		</script>
	</body>
</html>
```

5.FileReader-ArrayBuffer.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<script>
			// 设置body为可放置元素
			document.body.ondragover = function (e) {
				e.preventDefault();
			};
			// 处理放置后的行为
			document.body.ondrop = function (e) {
				// 防止浏览器打开文件这个默认行为
				e.preventDefault();
				e.stopPropagation();

				// console.log('drop');

				// console.log( e.dataTransfer.files );

				let file = e.dataTransfer.files[0];

				// 读取文件的内容
				let fr = new FileReader();

				fr.onload = function () {
					console.log(this.result);

					let int8Array = new Int8Array(this.result);
					console.log(int8Array);

					int8Array.forEach((data) => {
						// console.log(data);

						console.log(String.fromCharCode(data));
					});
				};

				fr.readAsArrayBuffer(file);
			};
		</script>
	</body>
</html>
```

### 3-系统文件夹拖放与读取

resources/recycle-bin.svg

```html
<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
	t="1559012320249"
	class="icon"
	style=""
	viewBox="0 0 1024 1024"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	p-id="993"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	width="200"
	height="200"
>
	<defs><style type="text/css"></style></defs>
	<path
		d="M944.355556 170.666667h-166.115556V111.502222c0-27.306667-20.48-47.786667-47.786667-47.786666H293.546667c-27.306667 0-47.786667 20.48-47.786667 47.786666v56.888889H79.644444C61.44 170.666667 45.511111 186.595556 45.511111 204.8s15.928889 34.133333 34.133333 34.133333h866.986667c18.204444 0 34.133333-15.928889 34.133333-34.133333-2.275556-18.204444-18.204444-34.133333-36.408888-34.133333zM812.373333 311.751111H211.626667c-9.102222 0-18.204444 2.275556-22.755556 9.102222-6.826667 6.826667-9.102222 13.653333-9.102222 22.755556v550.684444c0 54.613333 45.511111 100.124444 100.124444 100.124445h466.488889c54.613333 0 100.124444-45.511111 100.124445-100.124445V343.608889c0-18.204444-15.928889-31.857778-34.133334-31.857778zM425.528889 841.955556c0 18.204444-15.928889 34.133333-34.133333 34.133333s-34.133333-15.928889-34.133334-34.133333V482.417778c0-18.204444 15.928889-34.133333 34.133334-34.133334s34.133333 15.928889 34.133333 34.133334V841.955556z m241.208889 0c0 18.204444-15.928889 34.133333-34.133334 34.133333s-34.133333-15.928889-34.133333-34.133333V482.417778c0-18.204444 15.928889-34.133333 34.133333-34.133334s34.133333 15.928889 34.133334 34.133334V841.955556z"
		fill="#d81e06"
		p-id="994"
	></path>
</svg>
```

1.系统文件夹拖放.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<script>
			document.body.ondragover = function (e) {
				e.preventDefault();
			};

			document.ondrop = function (e) {
				e.preventDefault();
				e.stopPropagation();

				// 拖拽的内容
				// console.log( e.dataTransfer.files );

				// items：拖拽的文件
				// console.log( e.dataTransfer.items );

				[...e.dataTransfer.items].forEach((item) => {
					// console.log(item);

					// let file = item.getAsFile();
					// console.log(file);

					// 要获取当前item对象的FileSystemEntry对象，通过该对象我们可以分辨出是文件还是文件夹
					let entry = item.webkitGetAsEntry();
					// console.log( entry );

					getFiles(entry);
				});
			};

			function getFiles(entry) {
				if (entry.isFile) {
					// 如果是文件，直接转成File对象
					entry.file(
						(f) => {
							console.log(f); //File
						},
						(err) => {
							console.log("读取失败");
						}
					);
				}

				if (entry.isDirectory) {
					// console.log('我是一个目录');

					// 创建一个目录读取对象
					let dirReader = entry.createReader();
					dirReader.readEntries((entries) => {
						// console.log(entries);

						entries.forEach((entry) => {
							getFiles(entry);
						});
					});
				}
			}
		</script>
	</body>
</html>
```

### 实例-1-拖拽项目到回收站

实例-1-拖拽项目到回收站-无 JS 版本.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>实例-1-拖拽项目到回收站-无JS版本</title>
		<style>
			.recycle-bin {
				position: fixed;
				right: 80px;
				top: 80px;
				width: 120px;
				height: 120px;
				background: url("./resources/recycle-bin.svg") no-repeat;
				background-size: cover;
			}
			.box {
				margin: 100px auto 0;
				width: 800px;
				overflow: hidden;
			}
			ul {
				float: left;
				margin: 0;
				padding: 10px;
				width: 30%;
				min-height: 40px;
				border: 4px solid #aaaaab;
				color: #aaaaab;
				list-style: none;
			}
			ul.focus {
				border-color: #5fa207;
				border-style: dashed;
				color: #5fa207;
			}
			li {
				padding: 20px;
				line-height: 20px;
			}
			li.drag {
				background-color: #5fa207;
				color: #fff;
			}
		</style>
	</head>
	<body>
		<div class="recycle-bin"></div>

		<div class="box">
			<ul class="left">
				<li>选项一</li>
				<li>选项二</li>
				<li>选项三</li>
				<li>选项四</li>
			</ul>
		</div>
	</body>
</html>
实例-1-拖拽项目到回收站.html
```

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			.recycle-bin {
				position: fixed;
				right: 80px;
				top: 80px;
				width: 120px;
				height: 120px;
				background: url("./resources/recycle-bin.svg") no-repeat;
				background-size: cover;
			}
			.box {
				margin: 100px auto 0;
				width: 800px;
				overflow: hidden;
			}
			ul {
				float: left;
				margin: 0;
				padding: 10px;
				width: 30%;
				min-height: 40px;
				border: 4px solid #aaaaab;
				color: #aaaaab;
				list-style: none;
			}
			ul.focus {
				border-color: #5fa207;
				border-style: dashed;
				color: #5fa207;
			}
			li {
				padding: 20px;
				line-height: 20px;
			}
			li.drag {
				background-color: #5fa207;
				color: #fff;
			}
		</style>
	</head>
	<body>
		<div class="recycle-bin"></div>

		<div class="box">
			<ul class="left">
				<li>选项一</li>
				<li>选项二</li>
				<li>选项三</li>
				<li>选项四</li>
			</ul>
		</div>

		<script>
			/*
	1. 获取所有的li元素，并给它们绑定
		1. dragstart
			1. 设置该元素的class为drag
		2. dragend
			2. 删除该元素的drag样式

	2. 获取到回收站元素，也给它绑定
		1. dragover
		2. drop
			删除拖放到回收站上的元素
	
*/

			let liElements = document.querySelectorAll("li");
			let recycleBinElement = document.querySelector(".recycle-bin");
			let dragElement = null;

			liElements.forEach((liElement) => {
				liElement.setAttribute("draggable", true);

				liElement.ondragstart = function (e) {
					e.dataTransfer.setData("text", "");

					this.classList.add("drag");
					dragElement = this;
				};

				liElement.ondragend = function () {
					this.classList.remove("drag");
				};

				recycleBinElement.ondragover = function (e) {
					e.preventDefault();
				};

				recycleBinElement.ondrop = function (e) {
					e.preventDefault();
					e.stopPropagation();

					dragElement.remove();
				};
			});
		</script>
	</body>
</html>
```

### 实例-2-拖拽的穿梭框

实例-2-拖拽的穿梭框-无 JS 版本.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			.box {
				margin: 100px auto 0;
				width: 800px;
				overflow: hidden;
			}
			ul {
				margin: 0;
				padding: 10px;
				width: 30%;
				min-height: 40px;
				border: 4px solid #aaaaab;
				color: #aaaaab;
				list-style: none;
			}
			ul.left {
				float: left;
			}
			ul.right {
				float: right;
			}
			ul.focus {
				border-color: #5fa207;
				border-style: dashed;
				color: #5fa207;
			}
			li {
				padding: 20px;
				line-height: 20px;
			}
			li.drag {
				background-color: #5fa207;
				color: #fff;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<ul class="left">
				<li>选项一</li>
				<li>选项二</li>
				<li>选项三</li>
				<li>选项四</li>
			</ul>
			<ul class="right"></ul>
		</div>
	</body>
</html>
```

实例-2-拖拽的穿梭框.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			.box {
				margin: 100px auto 0;
				width: 800px;
				overflow: hidden;
			}
			ul {
				margin: 0;
				padding: 10px;
				width: 30%;
				min-height: 40px;
				border: 4px solid #aaaaab;
				color: #aaaaab;
				list-style: none;
			}
			ul.left {
				float: left;
			}
			ul.right {
				float: right;
			}
			ul.focus {
				border-color: #5fa207;
				border-style: dashed;
				color: #5fa207;
			}
			li {
				padding: 20px;
				line-height: 20px;
			}
			li.drag {
				background-color: #5fa207;
				color: #fff;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<ul class="left">
				<li>选项一</li>
				<li>选项二</li>
				<li>选项三</li>
				<li>选项四</li>
			</ul>
			<ul class="right"></ul>
		</div>

		<script>
			/*
			1. 获取到所有的li元素，并给它们绑定
				dragstart、dragend
			2. 给两个ul绑定
				dragover、dragleave、drop
		*/

			let liElements = document.querySelectorAll("li");
			let leftElement = document.querySelector(".left");
			let rightElement = document.querySelector(".right");

			let dragElement = null;

			liElements.forEach((liElement) => {
				liElement.setAttribute("draggable", true);

				liElement.ondragstart = function (e) {
					e.dataTransfer.setData("text", "");

					this.classList.add("drag");
					dragElement = this;
				};

				liElement.ondragend = function () {
					this.classList.remove("drag");
				};
			});

			leftElement.ondragover = rightElement.ondragover = function (e) {
				// console.log( dragElement.parentNode == this );
				// console.log( this.contains( dragElement ) );

				if (!this.contains(dragElement)) {
					e.preventDefault();
					this.classList.add("focus");
				}
			};

			leftElement.ondragleave = rightElement.ondragleave = function (e) {
				this.classList.remove("focus");
			};

			leftElement.ondrop = rightElement.ondrop = function (e) {
				e.preventDefault();
				e.stopPropagation();

				this.classList.remove("focus");

				this.appendChild(dragElement);
			};
		</script>
	</body>
</html>
```

### 实例-3-拖拽无刷新上传

#### 前端版本

index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			html,
			body {
				height: 100%;
				margin: 0;
			}
			ul {
				margin: 0;
				padding: 0;
				list-style: none;
			}
			.drop_dashed {
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				border: 5px dashed rgb(0, 0, 0);
				background-color: rgb(255, 255, 255);
				opacity: 0.2;
				box-sizing: border-box;
				display: none;
			}
			.drop_dashed:before {
				position: absolute;
				left: 0;
				top: 50%;
				width: 100%;
				text-align: center;
				font-size: 24px;
				line-height: 24px;
				content: "文件拖放到此处";
			}

			.task_panel {
				display: none;
				position: fixed;
				right: 20px;
				bottom: 20px;
				z-index: 99;
				width: 500px;
				box-shadow: 0 1px 4px 0 rgba(15, 32, 66, 0.2);
				border: 1px solid rgba(5, 13, 27, 0.16);
				overflow: hidden;
			}
			.task_panel:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				border: 2px solid #00a4ff;
			}

			.icon {
				display: inline-block;
				width: 36px;
				height: 36px;
				line-height: 36px;
				background-repeat: no-repeat;
				background-position: center;
			}
			.task-progress-status-success {
				background-image: url("./images/icon-task-succ.svg");
			}
			.window-fold {
				background-image: url("./images/icon-window-fold.svg");
			}
			.all-close {
				background-image: url("./images/icon-all-close.svg");
			}

			.task_header {
				padding: 20px;
				border-bottom: 1px solid #eeeeee;
			}

			.task_header h4 {
				margin: 0;
				padding: 0;
				font-size: 24px;
			}
			.task_header .icon {
				position: absolute;
				top: 20px;
				cursor: pointer;
				transition: all 0.5s;
			}
			.task_header .icon.window-fold {
				right: 40px;
			}
			.task_header .icon.all-close {
				right: 10px;
			}
			.task_header .icon.window-fold.down,
			.task_header .icon.all-close:hover {
				transform: rotate(180deg);
			}

			.task_body {
				height: 313px;
				overflow: auto;
				transition: height 0.5s;
			}
			.task_body.hide {
				height: 0;
			}
			.task_body li {
				margin-bottom: 2px;
				position: relative;
				height: 20px;
				line-height: 20px;
				padding: 20px;
			}
			.task_body span {
				position: relative;
				z-index: 99;
			}
			.task_body li .task-progress-status {
				position: absolute;
				right: 10px;
				top: 0;
				z-index: 99;
				line-height: 60px;
			}
			.task_body li .task-progress-status .icon {
				position: relative;
				top: 15px;
			}
			.task_body .progress {
				position: absolute;
				left: 0;
				top: 0;
				width: 0%;
				height: 60px;
				background-color: rgba(0, 40, 255, 0.3);
			}
		</style>
	</head>
	<body>
		<div class="drop_dashed"></div>

		<div class="task_panel">
			<div class="task_header">
				<h4></h4>

				<span class="icon window-fold"></span>
				<span class="icon all-close"></span>
			</div>
			<ul class="task_body">
				<li>
					<span>任务一</span>
					<div class="task-progress-status">上传中……</div>
					<div class="progress"></div>
				</li>
				<li>
					<span>任务二</span>
					<div class="task-progress-status">
						<span class="icon task-progress-status-success"></span>
					</div>
					<div class="progress"></div>
				</li>
				<li>
					<span>任务三</span>
					<div class="task-progress-status">
						<span class="icon task-progress-status-success"></span>
					</div>
					<div class="progress"></div>
				</li>
			</ul>
		</div>
	</body>
</html>
```

icon-all-close.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-all-close</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-4"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<g id="ic_close_task">
			<g>
				<rect id="Rectangle-22" x="0" y="0" width="20" height="20"></rect>
				<path
					d="M11,9 L17,9 L17,11 L11,11 L11,17 L9,17 L9,11 L3,11 L3,9 L9,9 L9,3 L11,3 L11,9 Z"
					id="Combined-Shape"
					fill="#484848"
					transform="translate(10.000000, 10.000000) rotate(-45.000000) translate(-10.000000, -10.000000) "
				></path>
			</g>
		</g>
	</g>
</svg>
```

icon-task-succ.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-task-succ</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-7"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<path
			d="M8.58578644,11.8284271 L5.75735931,9 L4.34314575,10.4142136 L7.17157288,13.2426407 L8.58578644,14.6568542 L15.6568542,7.58578644 L14.2426407,6.17157288 L8.58578644,11.8284271 Z M10,19 C5.02943725,19 1,14.9705627 1,10 C1,5.02943725 5.02943725,1 10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 Z"
			id="icon-task-succ"
			fill="#01BD88"
		></path>
	</g>
</svg>
```

icon-window-fold.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-window-fold</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-3"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<g id="ic_unfold">
			<g
				transform="translate(10.000000, 10.000000) scale(1, -1) translate(-10.000000, -10.000000) "
			>
				<rect id="Rectangle-19" x="0" y="0" width="20" height="20"></rect>
				<path
					d="M7,11 L15,11 L15,13 L7,13 L5,13 L5,3 L7,3 L7,11 Z"
					id="Combined-Shape"
					fill="#484848"
					transform="translate(10.000000, 8.000000) rotate(-45.000000) translate(-10.000000, -8.000000) "
				></path>
			</g>
		</g>
	</g>
</svg>
```

#### 后端版本

基于 koa.js

app.js

```js
const Koa = require("koa");
const Router = require("koa-router");
const Multer = require("koa-multer");
const KoaStaticCache = require("koa-static-cache");

const app = new Koa();
const upload = Multer({
	storage: Multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./uploads");
		},
		filename: function (req, file, cb) {
			cb(
				null,
				file.originalname.replace(
					/(\.[a-zA-Z0-7]+)$/g,
					($0, $1) => "-" + Date.now() + $1
				)
			);
		},
	}),
});

app.use(
	KoaStaticCache({
		prefix: "/public",
		dir: "./public",
		dynamic: true,
	})
);

const router = new Router();

router.all("*", async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Methods", "POST,OPTIONS");
	await next();
});

router.options("/upload", async (ctx) => {
	ctx.body = "";
});

router.post("/upload", upload.single("file"), async (ctx) => {
	ctx.body = "上传完成";
});

app.use(router.routes());

app.listen(9999);
```

package.json

```json
"dependencies": {
    "koa": "^2.7.0",
    "koa-multer": "^1.0.2",
    "koa-router": "^7.4.0",
    "koa-static-cache": "^5.1.2"
  }
```

public\index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			html,
			body {
				height: 100%;
				margin: 0;
			}
			ul {
				margin: 0;
				padding: 0;
				list-style: none;
			}
			.drop_dashed {
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				border: 5px dashed rgb(0, 0, 0);
				background-color: rgb(255, 255, 255);
				opacity: 0.2;
				box-sizing: border-box;
				display: none;
			}
			.drop_dashed:before {
				position: absolute;
				left: 0;
				top: 50%;
				width: 100%;
				text-align: center;
				font-size: 24px;
				line-height: 24px;
				content: "文件拖放到此处";
			}

			.task_panel {
				display: none;
				position: fixed;
				right: 20px;
				bottom: 20px;
				z-index: 99;
				width: 500px;
				box-shadow: 0 1px 4px 0 rgba(15, 32, 66, 0.2);
				border: 1px solid rgba(5, 13, 27, 0.16);
				overflow: hidden;
			}
			.task_panel:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				border: 2px solid #00a4ff;
			}

			.icon {
				display: inline-block;
				width: 36px;
				height: 36px;
				line-height: 36px;
				background-repeat: no-repeat;
				background-position: center;
			}
			.task-progress-status-success {
				background-image: url("./images/icon-task-succ.svg");
			}
			.window-fold {
				background-image: url("./images/icon-window-fold.svg");
			}
			.all-close {
				background-image: url("./images/icon-all-close.svg");
			}

			.task_header {
				padding: 20px;
				border-bottom: 1px solid #eeeeee;
			}

			.task_header h4 {
				margin: 0;
				padding: 0;
				font-size: 24px;
			}
			.task_header .icon {
				position: absolute;
				top: 20px;
				cursor: pointer;
				transition: all 0.5s;
			}
			.task_header .icon.window-fold {
				right: 40px;
			}
			.task_header .icon.all-close {
				right: 10px;
			}
			.task_header .icon.window-fold.down,
			.task_header .icon.all-close:hover {
				transform: rotate(180deg);
			}

			.task_body {
				height: 313px;
				overflow: auto;
				transition: height 0.5s;
			}
			.task_body.hide {
				height: 0;
			}
			.task_body li {
				margin-bottom: 2px;
				position: relative;
				height: 20px;
				line-height: 20px;
				padding: 20px;
			}
			.task_body span {
				position: relative;
				z-index: 99;
			}
			.task_body li .task-progress-status {
				position: absolute;
				right: 10px;
				top: 0;
				z-index: 99;
				line-height: 60px;
			}
			.task_body li .task-progress-status .icon {
				position: relative;
				top: 15px;
			}
			.task_body .progress {
				position: absolute;
				left: 0;
				top: 0;
				width: 0%;
				height: 60px;
				background-color: rgba(0, 40, 255, 0.3);
			}
		</style>
	</head>
	<body>
		<div class="drop_dashed"></div>

		<div class="task_panel">
			<div class="task_header">
				<h4></h4>

				<span class="icon window-fold"></span>
				<span class="icon all-close"></span>
			</div>
			<ul class="task_body">
				<li>
					<span>任务一</span>
					<div class="task-progress-status">上传中……</div>
					<div class="progress"></div>
				</li>
				<li>
					<span>任务二</span>
					<div class="task-progress-status">
						<span class="icon task-progress-status-success"></span>
					</div>
					<div class="progress"></div>
				</li>
				<li>
					<span>任务三</span>
					<div class="task-progress-status">
						<span class="icon task-progress-status-success"></span>
					</div>
					<div class="progress"></div>
				</li>
			</ul>
		</div>

		<script src="./js/index.js"></script>
	</body>
</html>
```

public\js\index.js

```js
let dropDashedElement = document.querySelector(".drop_dashed");

/**
 * 当有文件拖放到浏览器的时候，显示 dropDashedElement
 */
document.body.ondragover = function (e) {
	e.dataTransfer.setData("text", "");
	console.log("sdsd");

	dropDashedElement.style.display = "block";
};
```

images\

icon-all-close.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-all-close</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-4"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<g id="ic_close_task">
			<g>
				<rect id="Rectangle-22" x="0" y="0" width="20" height="20"></rect>
				<path
					d="M11,9 L17,9 L17,11 L11,11 L11,17 L9,17 L9,11 L3,11 L3,9 L9,9 L9,3 L11,3 L11,9 Z"
					id="Combined-Shape"
					fill="#484848"
					transform="translate(10.000000, 10.000000) rotate(-45.000000) translate(-10.000000, -10.000000) "
				></path>
			</g>
		</g>
	</g>
</svg>
```

icon-task-succ.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-task-succ</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-7"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<path
			d="M8.58578644,11.8284271 L5.75735931,9 L4.34314575,10.4142136 L7.17157288,13.2426407 L8.58578644,14.6568542 L15.6568542,7.58578644 L14.2426407,6.17157288 L8.58578644,11.8284271 Z M10,19 C5.02943725,19 1,14.9705627 1,10 C1,5.02943725 5.02943725,1 10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 Z"
			id="icon-task-succ"
			fill="#01BD88"
		></path>
	</g>
</svg>
```

icon-window-fold.svg

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
	width="20px"
	height="20px"
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
	<title>icon-window-fold</title>
	<desc>Created with Sketch.</desc>
	<defs></defs>
	<g
		id="Artboard-3"
		stroke="none"
		stroke-width="1"
		fill="none"
		fill-rule="evenodd"
	>
		<g id="ic_unfold">
			<g
				transform="translate(10.000000, 10.000000) scale(1, -1) translate(-10.000000, -10.000000) "
			>
				<rect id="Rectangle-19" x="0" y="0" width="20" height="20"></rect>
				<path
					d="M7,11 L15,11 L15,13 L7,13 L5,13 L5,3 L7,3 L7,11 Z"
					id="Combined-Shape"
					fill="#484848"
					transform="translate(10.000000, 8.000000) rotate(-45.000000) translate(-10.000000, -8.000000) "
				></path>
			</g>
		</g>
	</g>
</svg>
```

## 音频可视化

## 音频视频操作
