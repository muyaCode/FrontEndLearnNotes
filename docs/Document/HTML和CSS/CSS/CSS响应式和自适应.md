# CSS响应式和自适应

web前端的应用分类：

- M站
  - M站一般是指手机网页端的页面
- H5
  - HTML5的简称，最新的网页技术
- PC端
  - 个人计算机或个人电脑
- 移动端APP
  - APP是应用程序软件Application的缩写的手机软件
- 平板端
  - 

## 根据用户设备进行页面分发

### JS用户信息相关代码

js获取用户设备信息

```js
console.log(navigator.userAgent);
```

获取用户浏览器信息

```js
// 浏览器名称
console.log(navigator.appName);
// 浏览器版本号
console.log(navigator.appVersion);
// 浏览器语言
console.log(navigator.language);
// 浏览器平台
console.log(navigator.platform);
```

通过判断用户设备分发对应页面

```js
// test()方法用于正则检测一个字符串中是否匹配某个模式，返回布尔值true|false
var device = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
window.location.href = device ? "phone.html" : "pc.html"
```

## viewport视口

[HTML  meta标签 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/tag-meta.html)

[HTML  meta标签 (w3school.com.cn)](https://www.w3school.com.cn/tags/tag_meta.asp)

---

视口演示

- html的meta标签布局视口：根据设备大小来改变视觉宽度(不是理想宽度)

- 1.vacode快捷生成以下代码：`meta:vp`

- 2.viewport针对的是移动端，在PC端是无效的

- 3.单独设置initial-scale或width时，会有兼容性问题，所以设置布局为理想视口的时候，两个需要同时设置

- 4.就算设置了user-scalabel的时候在Android Chrome的时候也可以强制启动手动缩放

  ```html
  <!--
  width：定义视口的宽度,单位是像素
  height：定义视口的高度,单位是像素
  initial-scale：定义初始的缩放值
  maxnum-scale：最大的缩放比例，要大于或等于缩小的缩放比例
  minnum-scale：最小的缩放比例，要大于或等于缩大的缩放比例
  user-scalabel：是否允许用户使用手动缩放，默认是允许，no是不允许，yes是允许
  -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

## CSS媒体查询
