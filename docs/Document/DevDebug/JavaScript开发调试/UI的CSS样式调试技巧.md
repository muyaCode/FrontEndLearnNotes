# UI 的 CSS 样式调试技巧

Debucsser-用于 CSS 的调试库：<https://github.com/lucagez/Debucsser>

一个用于 CSS 的调试库，鼠标悬浮的时候，网页会显示区块的 CSS 信息。

使用一个 CSS 技巧给所有元素加上 outline，这样就能迅速了解自己所需的元素位置信息，无须再选择元素查看了。
通过这个技巧不仅能帮助我们在开发中迅速了解元素所在的位置，还能帮助我们方便地查看任意网站的布局，查看元素是否对齐。

我们只需要添加以下 CSS 就能为任何网站添加这样的效果：每个元素都添加了红框

```css
body {
	outline: 1px solid red;
}
```

没有使用 border 的原因是 border 会增加元素的大小但是 outline 不会。

2.可以通过一个开关来实现任意网页开启关闭这个功能呢？
答案是有的，我们需要借助 Chrome 的书签功能。

1. 打开书签管理页
2. 右上角三个点「添加新书签」
3. 名称随意，粘贴以下代码到网址中

```js
javascript: (function () {
	const $style = document.createElement("style");
	$style.innerText = `body _ {outline: 1px solid red}`;
	document.body.appendChild($style);
})();
```

或：给 style 标签加个 ID,再判这个 ID

```js
javascript: (function () {
	const style = document.getElementById("outlineStyle");
	if (style) {
		style.parentNode.removeChild(style);
	} else {
		const style = document.createElement("style");
		style.innerText = "* {outline: 1px solid red}";
		style.id = "outlineStyle";
		document.head.appendChild(style);
	}
})();
```

然后我们就可以在任意网站上点击刚才创建的书签，内部会判断是否存在调试的 style。
存在的话就删除，不存在的话就添加，通过这种方式我们就能很方便的通过这个技巧查看任意网页的布局了。

#### 控制台调试注入样式：

```js
var css = document.createElement("style");
css.innerHTML = `\* body * {
  outline: 1px solid red;
}`;
document.querySelector("head").appendChild(css);
```

```js
const style = document.createElement("style");
document.getElementsByTagName("head")[0].append(style);
style.innerHTML = `\* { background-color: rgba(255, 0, 0, .2); }

- - { background-color: rgba(0, 255, 0, .2); }
- - - { background-color: rgba(0, 0, 255, .2); }
- - - - { background-color: rgba(255, 0, 255, .2); }
- - - - - { background-color: rgba(0, 255, 255, .2); }
- - - - - - { background-color: rgba(255, 255, 0, .2); }`;
```

或：

```js
var css = document.createElement("style");
css.innerHTML = `\* { background-color: rgba(255,0,0,.2); }
- - { background-color: rgba(0,255,0,.2); }
- - - { background-color: rgba(0,0,255,.2); }
- - - - { background-color: rgba(255,0,255,.2); }
- - - - - { background-color: rgba(0,255,255,.2); }
- - - - - - { background-color: rgba(255,255,0,.2); }
- - - - - - - { background-color: rgba(255,0,0,.2); }
- - - - - - - - { background-color: rgba(0,255,0,.2); }
- - - - - - - - - { background-color: rgba(0,0,255,.2); }
- - - - - - - - - - { background-color: rgba(0,0,255,.2); }`;
document.querySelector("head").appendChild(css);
```

CSS 调试技巧：https://www.zhihu.com/question/20376053/answer/2480624314
如何高效调试与检测你的 CSS 代码：https://www.bilibili.com/read/cv12118658/
CSS 开发必会的 Chrome14 个调试工具技巧：https://www.xiaohongshu.com/discovery/item/629831f60000000021034143
