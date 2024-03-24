# JQuery面试题

### 1、JQuery 的源码看过吗？能不能简单概况一下它的实现原理？

考察学习知识的态度，是否仅仅是停留在使用层面，要知其然知其所以然

### 2、jQuery.fn 的 init 方法返回的 this 指的是什么对象？为什么要返回 this？

this 执行 init 构造函数自身，其实就是 jQuery 实例对象，返回 this 是为了实现 jQuery 的链式操作

### 3、jquery 中如何将数组转化为 json 字符串，然后再转化回来？

```js
$.parseJSON('{"name":"John"}');
JSON.stringify;
```

### 4、jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝？

递归赋值

### 5、jquery.extend 与 jquery.fn.extend 的区别？

Jquery.extend 用来扩展 jQuery 对象本身；jquery.fn.extend 用来扩展 jQuery 实例

### 6、谈一下 Jquery 中的 bind(),live(),delegate(),on()的区别？

jquery1.7 以后就推荐使用 on 的方式来进行事件绑定了

### 7、JQuery 一个对象可以同时绑定多个事件，这是如何实现的？

可以同时绑定多个事件，低层实现原理是使用 addEventListner 与 attachEvent 兼容处理做事件注册

### 4、Jquery 与 jQuery UI 有啥区别？

jQuery 是操作 dom 的框架，jQueryUI 是基于 jQuery 做的一个 UI 组件库

### 5、jQuery 和 Zepto 的区别？各自的使用场景？

jQuery 主要用于 pc 端，当然有对应的 jQuerymobile 用于移动端，zepto 比 jQuery 更加小巧，主要用于移动端

jquer mobile 相对于 zepto 功能强大，但是体积也很庞大，zepto 非常的轻量

### 6、针对 jQuery 的优化方法？

a、优先使用 ID 选择器
b、jquery 获取到的 DOM 元素如果需要多次使用，建议使用一个变量将其保存起来，因为操作 DOM 的过程是非常耗费性能的
c、在 class 前使用 tag(标签名)
d、给选择器一个上下文
e、慎用 .live()方法（应该说尽量不要使用）
f、使用 data()方法存储临时变量

### 7、Zepto 的点透问题如何解决？

点透主要是由于两个 div 重合，例如：一个 div 调用 show()，一个 div 调用 hide()；

这个时候当点击上面的 div 的时候就会影响到下面的那个 div；

解决办法主要有 2 种：

1.github 上有一个叫做 fastclick 的库，它也能规避移动设备上 click 事件的延迟响应，<https://github.com/ftlabs/fastclick>

将它用 script 标签引入页面（该库支持 AMD，于是你也可以按照 AMD 规范，用诸如 require.js 的模块加载器引入），并且在 dom ready 时初始化在 body 上。

2.根据分析，如果不引入其它类库，也不想自己按照上述 fastclcik 的思路再开发一套东西，需要 1.一个优先于下面的"divClickUnder"捕获的事件；

2.并且通过这个事件阻止掉默认行为（下面的"divClickUnder"对 click 事件的捕获，在 ios 的 safari，click 的捕获被认为和滚屏、点击输入框弹起键盘等一样，是一种浏览器默认行为，即可以被 event.preventDefault()阻止的行为）。