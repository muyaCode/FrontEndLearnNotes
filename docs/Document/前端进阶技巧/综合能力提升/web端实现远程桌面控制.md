# web 端实现远程桌面控制

应着标题所说，web 端实现远程桌面控制，方案有好几种，达到的效果就是类似于向日葵一样可以远程桌面，但是操作方可以不用安装客户端，只需要一个 web 浏览器即可实现，桌面端需写一个程序用来 socket 连接和执行 Windows 指令。

## webSocket 实现方案

使用`webSocket`实现 web 端和桌面端的实时 TCP 通讯和连接，连接后桌面端获取自己的桌面流以照片流的形式截图发送 blob 格式给 web 端，web 端再接收后将此格式解析再赋值在 img 标签上，不停的接收覆盖，类似于快照的形式来呈现画面，再通过 api 获取 web 端的鼠标事件和键盘事件通过 webSocket 发送给客户端让他执行 Windows 事件，以此来达到远程控制桌面控制效果。

### Demo 实现

因为为了方便同事观看，所以得起一个框架服务，我习惯用 vue3 了，但大部分都是 js 代码，可参考改写。

html 只需一行搞定。

```html
<div>
	<img ref="imageRef" class="remote" src="" alt="" />
</div>
```

接下来就是 socket 连接，用 socket 库和直接 new webSocket 都可以连接，我习惯用库了，因为多一个失败了可以自动连接的功能，少写一点代码 🤣，库也是轻量级才几 k 大小。顺便把`socket心跳`也加上，这个和对端协商好就行了，一般都是 ping/pong 加个 type 值，发送时记得处理一下使用 json 格式发送，如果连接后 60 秒后没有互相发送消息客户端就会认为你是失联断开连接了，所以他就会强行踢掉你连接状态，所以心跳机制还是必不可少的。

```js
import ReconnectingWebSocket from "reconnecting-websocket";
const remoteControl = "192.168.1.175";
const scoketURL = `ws://${remoteControl}:10086/Echo`;
const imageRef = ref();

onMounted(() => {
	createdWebsocket();
});

const createdWebsocket = () => {
	socket = new ReconnectingWebSocket(scoketURL);
	socket.onopen = function () {
		console.log("连接已建立");
		resetHeart();
	};
	socket.onmessage = function (event) {
		// console.log(event.data)
		const objectDta = JSON.parse(event.data);
		console.log(objectDta);
		if (objectDta.type === 100) {
			resetHeart();
		}
	};
	socket.onclose = function () {
		console.log("断开连接");
	};
};

let heartTime = null; // 心跳定时器实例
let socketHeart = 0; // 心跳次数
let HeartTimeOut = 20000; // 心跳超时时间
let socketError = 0; // 错误次数
// socket 重置心跳
const resetHeart = () => {
	socketHeart = 0;
	socketError = 0;
	clearInterval(heartTime);
	sendSocketHeart();
};
const sendSocketHeart = () => {
	heartTime = setInterval(() => {
		if (socketHeart <= 3) {
			console.log("心跳发送：", socketHeart);
			socket.send(
				JSON.stringify({
					type: 100,
					key: "ping",
				})
			);
			socketHeart = socketHeart + 1;
		} else {
			reconnect();
		}
	}, HeartTimeOut);
};
// socket重连
const reconnect = () => {
	socket.close();
	if (socketError <= 3) {
		clearInterval(heartTime);
		socketError = socketError + 1;
		console.log("socket重连", socketError);
	} else {
		console.log("重试次数已用完的逻辑", socketError);
		clearInterval(heartTime);
	}
};
```

成功稳定连接后那么恭喜你完成第一步了，接下来就是获取对端发来的照片流了，使用`socket.onmessage`api 用来接收对端消息，需要转一下 json，因为发送的数据照片流很快，控制台直接刷屏了，所以简单处理一下。收到照片流把 blob 格式处理一下再使用`window.URL.createObjectURL(blob)`赋值给 img 即可。

```js
socket.onmessage = function (event) {
	// console.log(event.data)
	if (event.data instanceof Blob) {
		// 处理桌面流
		const data = event.data;
		const blob = new Blob([data], { type: "image/jpg" });
		imageRef.value.src = window.URL.createObjectURL(blob);
	} else {
		const objectDta = JSON.parse(event.data);
		console.log(objectDta);
		if (objectDta.type === 100) {
			resetHeart();
		}
	}
};
```

此时页面可以呈现画面了，并且是可以看得到对面操作的，但让人挠头的是，分辨率和尺寸不对，有上下和左右的滚动条显示，并不是百分百的，解决这个问题倒是不难，但如需考虑获取自身的鼠标坐标发送给对端，这个坐标必须准确无误，简单来说就是`分辨率自适应`，因为 web 端使用的电脑屏幕大小是不一样的，切桌面端发送给你的桌面流比如是全屏分辨率的，以此得做`适配`，这个放后面解决，先来处理`鼠标和键盘事件`,纪录下来并发送对应的事件给桌面端。记得去除浏览器的拖动和鼠标右键事件，以免效果紊乱。

```js
const watchControl = () => {
	// 监听事件
	window.ondragstart = function (e) {
		// 移除拖动事件
		e.preventDefault();
	};
	window.ondragend = function (e) {
		// 移除拖动事件
		e.preventDefault();
	};
	window.onkeydown = function (e) {
		// 键盘按下
		console.log("键盘按下", e);
		socket.send(JSON.stringify({ type: 0, key: e.keyCode }));
	};
	window.onkeyup = function (e) {
		// 键盘抬起
		console.log("键盘抬起", e);
		socket.send(JSON.stringify({ type: 1, key: e.keyCode }));
	};
	window.onmousedown = function (e) {
		// 鼠标单击按下
		console.log("单击按下", e);
		console.log(newPageX, "newPageX");
		console.log(newPageY, "newPageY");
		socket.send(JSON.stringify({ type: 5, x: pageX, y: pageY }));
	};
	window.onmouseup = function (e) {
		// 鼠标单击抬起
		console.log("单击抬起", e);
		socket.send(JSON.stringify({ type: 6, x: pageX, y: pageY }));
	};
	window.oncontextmenu = function (e) {
		// 鼠标右击
		console.log("右击", e);
		e.preventDefault();
		socket.send(JSON.stringify({ type: 4, x: pageX, y: pageY }));
	};
	window.ondblclick = function (e) {
		// 鼠标双击
		console.log("双击", e);
	};
	window.onmousewheel = function (e) {
		// 鼠标滚动
		console.log("滚动", e);
		const moving = e.deltaY / e.wheelDeltaY;
		socket.send(
			JSON.stringify({
				type: 7,
				x: e.x,
				y: e.y,
				deltaY: e.deltaY,
				deltaFactor: moving,
			})
		);
	};
	window.onmousemove = function (e) {
		// 鼠标移动
		if (!timer) {
			timer = setTimeout(function () {
				console.log("鼠标移动:X轴位置" + e.pageX + ";Y轴位置:" + e.pageY);
				socket.send(JSON.stringify({ type: 2, x: pageX, y: pageY }));
				timer = null;
			}, 60);
		}
	};
};
```

现在就可以实现远程控制了，发送的事件类型根据桌面端服务需要什么参数协商好就成，接下来就是处理分辨率适配问题了，解决办法大致就是赋值 img 图片后拿到他的参数分辨率，然后获取自身浏览器的宽高，除以他的分辨率再乘上自身获取的鼠标坐标就 OK 了，获取 img 图片事件需要延迟一下，因为是后面 socket 连接后才赋值的图片，否则宽高就一直是 0，加在 watchControl 事件里面，发送时坐标也要重新计算。

```js
const watchControl = () => {
    console.dir(imageRef.value)
    imgWidth.value = imageRef.value.naturalWidth === 0 ? 1920 : imageRef.value.naturalWidth// 图片宽度
    imgHeight.value = imageRef.value.naturalHeight === 0 ? 1080 : imageRef.value.naturalHeight // 图片高度
    clientHeight = document.body.offsetHeight

    ......

    window.onmousedown = function (e) { // 鼠标单击按下
    console.log('单击按下', e)
    const newPageX = parseInt(e.pageX * (imgWidth.value / clientWidth)) // 计算分辨率
    const newPageY = parseInt(e.pageY * (imgHeight.value / clientHeight))
    console.log(newPageX, 'newPageX')
    console.log(newPageY, 'newPageY')
    socket.send(JSON.stringify({ type: 5, x: newPageX, y: newPageY }))
  }
}
```

现在就几乎大功告成了，坐标稳定发送，获取的也是正确计算出来的，下面再做一些 socket 加密优化，还有事件优化，集成到项目里面离开时还是要`清除所有事件和socket连接`，直接上完整全部代码。

```vue
<template>
	<div>
		<img ref="imageRef" class="remote" src="" alt="" />
	</div>
</template>

<script setup>
import ReconnectingWebSocket from "reconnecting-websocket";
import { Base64 } from "js-base64";

onMounted(() => {
	createdWebsocket();
});

const route = useRoute();
let socket = null;
const secretKey = "keyXXXXXXX";
const remoteControl = "192.168.1.xxx";
const scoketURL = `ws://${remoteControl}:10086/Echo?key=${Base64.encode(
	secretKey
)}`;
const imageRef = ref();
let timer = null;
const clientWidth = document.documentElement.offsetWidth;
let clientHeight = null;
const widthCss = window.innerWidth + "px";
const heightCss = window.innerHeight + "px";
const imgWidth = ref(); // 图片宽度
const imgHeight = ref(); // 图片高度

const createdWebsocket = () => {
	socket = new ReconnectingWebSocket(scoketURL);
	socket.onopen = function () {
		console.log("连接已建立");
		resetHeart();
		setTimeout(() => {
			watchControl();
		}, 500);
	};
	socket.onmessage = function (event) {
		if (event.data instanceof Blob) {
			// 处理桌面流
			const data = event.data;
			const blob = new Blob([data], { type: "image/jpg" });
			imageRef.value.src = window.URL.createObjectURL(blob);
		} else {
			const objectDta = JSON.parse(event.data);
			console.log(objectDta);
			if (objectDta.type === 100) {
				resetHeart();
			}
		}
	};
	socket.onclose = function () {
		console.log("断开连接");
	};
};

const handleMousemove = (e) => {
	// 鼠标移动
	if (!timer) {
		timer = setTimeout(function () {
			const newPageX = parseInt(e.pageX * (imgWidth.value / clientWidth)); // 计算分辨率
			const newPageY = parseInt(e.pageY * (imgHeight.value / clientHeight));
			// console.log(newPageX, 'newPageX')
			// console.log(newPageY, 'newPageY')
			// console.log('鼠标移动:X轴位置' + e.pageX + ';Y轴位置:' + e.pageY)
			socket.send(JSON.stringify({ type: 2, x: newPageX, y: newPageY }));
			timer = null;
		}, 60);
	}
};
const handleKeydown = (e) => {
	// 键盘按下
	console.log("键盘按下", e);
	socket.send(JSON.stringify({ type: 0, key: e.keyCode }));
};
const handleMousedown = (e) => {
	// 鼠标单击按下
	console.log("单击按下", e);
	const newPageX = parseInt(e.pageX * (imgWidth.value / clientWidth)); // 计算分辨率
	const newPageY = parseInt(e.pageY * (imgHeight.value / clientHeight));
	console.log(newPageX, "newPageX");
	console.log(newPageY, "newPageY");
	socket.send(JSON.stringify({ type: 5, x: newPageX, y: newPageY }));
};
const handleKeyup = (e) => {
	// 键盘抬起
	console.log("键盘抬起", e);
	socket.send(JSON.stringify({ type: 1, key: e.keyCode }));
};

const handleMouseup = (e) => {
	// 鼠标单击抬起
	console.log("单击抬起", e);
	const newPageX = parseInt(e.pageX * (imgWidth.value / clientWidth)); // 计算分辨率
	const newPageY = parseInt(e.pageY * (imgHeight.value / clientHeight));
	console.log(newPageX, "newPageX");
	console.log(newPageY, "newPageY");
	socket.send(JSON.stringify({ type: 6, x: newPageX, y: newPageY }));
};

const handleContextmenu = (e) => {
	// 鼠标右击
	console.log("右击", e);
	e.preventDefault();
	const newPageX = parseInt(e.pageX * (imgWidth.value / clientWidth)); // 计算分辨率
	const newPageY = parseInt(e.pageY * (imgHeight.value / clientHeight));
	console.log(newPageX, "newPageX");
	console.log(newPageY, "newPageY");
	socket.send(JSON.stringify({ type: 4, x: newPageX, y: newPageY }));
};

const handleDblclick = (e) => {
	// 鼠标双击
	console.log("双击", e);
};

const handleMousewheel = (e) => {
	// 鼠标滚动
	console.log("滚动", e);
	const moving = e.deltaY / e.wheelDeltaY;
	socket.send(
		JSON.stringify({
			type: 7,
			x: e.x,
			y: e.y,
			deltaY: e.deltaY,
			deltaFactor: moving,
		})
	);
};

const watchControl = () => {
	// 监听事件
	console.dir(imageRef.value);
	imgWidth.value =
		imageRef.value.naturalWidth === 0 ? 1920 : imageRef.value.naturalWidth; // 图片宽度
	imgHeight.value =
		imageRef.value.naturalHeight === 0 ? 1080 : imageRef.value.naturalHeight; // 图片高度
	clientHeight = document.body.offsetHeight;

	window.ondragstart = function (e) {
		// 移除拖动事件
		e.preventDefault();
	};
	window.ondragend = function (e) {
		// 移除拖动事件
		e.preventDefault();
	};
	window.addEventListener("mousemove", handleMousemove);
	window.addEventListener("keydown", handleKeydown);
	window.addEventListener("mousedown", handleMousedown);
	window.addEventListener("keyup", handleKeyup);
	window.addEventListener("mouseup", handleMouseup);
	window.addEventListener("contextmenu", handleContextmenu);
	window.addEventListener("dblclick", handleDblclick);
	window.addEventListener("mousewheel", handleMousewheel);
};

let heartTime = null; // 心跳定时器实例
let socketHeart = 0; // 心跳次数
const HeartTimeOut = 20000; // 心跳超时时间
let socketError = 0; // 错误次数
// socket 重置心跳
const resetHeart = () => {
	socketHeart = 0;
	socketError = 0;
	clearInterval(heartTime);
	sendSocketHeart();
};
const sendSocketHeart = () => {
	heartTime = setInterval(() => {
		if (socketHeart <= 3) {
			console.log("心跳发送：", socketHeart);
			socket.send(
				JSON.stringify({
					type: 100,
					key: "ping",
				})
			);
			socketHeart = socketHeart + 1;
		} else {
			reconnect();
		}
	}, HeartTimeOut);
};
// socket重连
const reconnect = () => {
	socket.close();
	if (socketError <= 3) {
		clearInterval(heartTime);
		socketError = socketError + 1;
		console.log("socket重连", socketError);
	} else {
		console.log("重试次数已用完的逻辑", socketError);
		clearInterval(heartTime);
	}
};

onBeforeUnmount(() => {
	socket.close();
	console.log("组件销毁");
	window.removeEventListener("mousemove", handleMousemove);
	window.removeEventListener("keydown", handleKeydown);
	window.removeEventListener("mousedown", handleMousedown);
	window.removeEventListener("keyup", handleKeyup);
	window.removeEventListener("mouseup", handleMouseup);
	window.removeEventListener("contextmenu", handleContextmenu);
	window.removeEventListener("dblclick", handleDblclick);
	window.removeEventListener("mousewheel", handleMousewheel);
});
</script>

<style scoped>
.remote {
	width: v-bind(widthCss);
	height: v-bind(heightCss);
}
</style>
```

现在就算是彻底大功告成了，加密密钥或者方式还是和对端协商，流畅度和清晰度也不错的，简单办公还是没问题的，和不开会员的向日葵效果差不多，后面的优化方式大致围绕着 `图片压缩`来做应该能达到更加流畅的效果，如果项目是 https 的话 socket 服务也要升级成 wss 协议。

## 通过 webrtc 进行对等连接

通过 webrtc 进行对等连接，然后被控方通过桌面分享视频流的方式，然后接收方通过 `robot.js` 模拟好捕获鼠标的键盘事件发送给服务器，让服务器告诉被控方执行的指令。

但是有个问题，webrtc 太依赖网络了，稍微差一点就不是很清晰

[webrtc 实现远程控制-前端部分 - 掘金 (juejin.cn)](https://juejin.cn/post/7208837219212296252)

[带你了解云游戏实现关键技术——WebRTC - 掘金 (juejin.cn)](https://juejin.cn/post/7242596613750227005)

[用 yangwebrtc 搭建兼容 webrtc 的跨平台的云桌面(远程桌面控制系统) - 掘金 (juejin.cn)](https://juejin.cn/post/7034877753774047263)

[React+WebRTC 简单实现房间视频通话 demo - 掘金 (juejin.cn)](https://juejin.cn/post/7312393081437011983)

## P2P 流媒体服务实现

[NodeJS 实现视频通话/直播 - 掘金 (juejin.cn)](https://juejin.cn/post/7254401320425308218)
