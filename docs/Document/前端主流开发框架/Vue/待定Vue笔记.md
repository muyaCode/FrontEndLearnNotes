## 问题解决方案

### 1.Vue 数据变化视图不更新 (vue 文档：深入响应式原理)

[深入响应式原理 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/guide/reactivity.html)

#### 1.数组修改下标值或者长度，视图不更新

- 问题描述

  - 在 vue2 中 用数组下标修改值时 或者 新增对象 Key 值时 ，这样 vue 的 devsrve 函数是监听不到数据的变化的所以就会导致数据更新视图未更新

  - 数组利用下标修改值 (错误示范)

    - this.arr[0] = "列表 0"
      - // !错误的 这样是不响应的

  - 修改数组的长度 (错误示范)
    - this.arr.length = newLength
      - // !错误的 这样是不响应的

- 解决方案

  - ① 可以利用 vue 的 this.$set() 或 Vue.set(vm.obj,'key','value')  || vm.$set(vm.items, indexOfItem, newValue)方法

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法

      - this.$set(this.arr, 0, "列表 0")

      - this.$set(目标数据, "目标数据的下标或者 key 值", "所赋予的值")

  - ② 可以利用 vue 对数组重写的 splice 方法

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法

      - this.arr.splice(0, 1, "列表 0")

      - this.arr.splice(开始下标, 删除的个数, "替换的内容")

    - 数组更新检测： 其他数组变异方法

      - push()

      - pop()

      - shift()

      - unshift()

      - splice()

      - sort()

      - reverse()

      - push()，pop()，splice()，sort()，reverse()可被 vue 检测到

      - filter(), concat(), slice()

        - 这些不会改变原始数组，但总是返回一个新数组。

        - 当使用非变异方法时，可以用新数组替换旧数组

  - ③ 重新声明一个变量深拷贝一下当前这个数组然后重新赋值即可

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法
      - methods: { upDateData() { let newArr = JSON.parse(JSON.stringify(this.arr)) newArr[0] = "列表 0" this.arr = newArr } }

#### 2.对象新增 key 值，视图不更新

- 错误代码示例

  - 对象新增 key 值时，视图不更新

  - 数据

    - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

  - 方法
    - this.newObj.b="456"
      - 这样给对象新加 key 值得方式是不响应的

- 解决方案

  - ① 利用 this.$set() 或 Vue.set(vm.obj,'key','value')

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法

      - this.$set(this.newObj, "b", "456")

      - this.$set(目标数据, "目标数据的下标或者 key 值", "所赋予的值")

  - ② 重新声明一个变量深拷贝一下当前这个数组然后重新赋值即可

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法
      - methods: { upDateData() { let copyObj = JSON.parse(JSON.stringify(this.newObj)) copyObj.b = "456" this.newObj = copyObj } }

  - ③ 可以利用 ES6 的 Object.assign()方法

    - 数据

      - data: { arr: ["列表 1", '列表 2'], newObj: { a: "123" } },

    - 方法

      - this.newObj = Object.assign({}, this.newObj, { b: "456" })

      - 参数

        - Object.assign(target, ...sources)

        - 参数：

        - target--->目标对象

        - source--->源对象

          - 可以是...多个对象

        - 返回值：
        - target，即目标对象

#### 3.异步更新队列，视图不能实时更新

- 问题描述

  - 数据第一次获取到了，也渲染了，但是第二次之后数据只有在再一次渲染页面的时候更新，并不能实时更新。

  - Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。

- 解决方案

  - ① 利用 Vue.nextTick(callback) 或 this.$nextTick(callback)

    - 说明

      - callback 回调函数在 DOM 更新完成后就会调用

      - $nextTick()返回一个 Promise 对象，所以可以使用新的 ES2016 async/await 语法完成相同的事情：

    - 使用例子
      - this.$nextTick(()=>{ this.name = this.arr })

### 2.vue 多层循环，动态改变数据后渲染的很慢或者不渲染 (v-for 更新数据不重新渲染页面)

- 在 Vue 组件中，在 mounted 阶段调用了一个函数去请求异步数据，将返回结果赋给 data 里面的值却失败了，赋值完 console.log()出来明明是有值的，但页面却没有更新过来

  - 在函数中赋值完成以后，只要执行 this.$forceUpdate()去强制刷新数据

- this.$forceUpdate();

  - 强制刷新，解决页面不会重新渲染的问题

  - 官方解释：迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

- 如果是在（element-ui）下拉菜单中下拉框选择后绑定值改变，显示不变也可以如下代码这样写：

  - ```vue
    <el-select
    	v-model="reqdata.coupon_code"
    	class="w160"
    	@change="$forceupdate()"
    	placeholder="请选择订单类型"
    	size="small"
    >  <el-option  v-for="(item,index) in orderlist"  :key="index"  :label="item.name"  :value="item.id">  </el-option> </el-select>
    ```

  -

### 3.组件通信

- 父传子

  - 父组件通过属性名传递数据，子组件通过 props 进行接收数据

  - 父组件传输的标签里的属性定义

    - 传输的属性和状态

      - 传输的属性

        - myname="myname"

      - 动态绑定 传输的状态
        - :myshow="myshow"

    - 代码

      - ```vue
        <navbar mynamea="myname" :myshowa="myshow"></navbar>
        ```

      -

      - data(){ return { myname:'zhangsan', myshow:true } }

  - 子组件接收父组件传输的属性(二选一)

    - props:["mynamea","myshowa"] ,

    - props:{ mynamea:String, myshowa:Boolean }

    - 代码

      -

      - ​ Vue.component("navbar",{ // 接受父组件传来的属性 // props:["myname","myshow"] , // 接受父组件传来的状态 props:{ myname:String, myshow:Boolean } })

- 事件机制 子传父

  - 子组件 通过 触发事件 的方式向父组件传递数据

    - 1.触发事件

      -

    - 2.事件
      - methods:{ handleClick(){ this.$emit('onup',父组件的事件); } }

  - 父组件 通过 监听事件 的方式来接收数据

    - 1.子组件中的自定义事件的监听

      - `<子组件 @onup="handlechange"></子组件>`

    - 2.数据定义和监听的代码

      - data(){ return { msg:'', } }

      - methods:{ // 父组件事件的回调子组件 handleChange(value){ this.msg= value; } }

- 子组件调用父组件的方法

  - 1.直接在子组件中通过 this.$parent.event 来调用父组件的方法

  - 2.在子组件里用$emit 向父组件触发一个事件，父组件监听这个事件

    - 子组件

      - Enlarge text
      - $emit('在父组件调用子组件时的属性：enlarge-text', '向父组件传值')

    - 父组件

      - ```vue
        <blog-post @enlarge-text="postfontsize += $event"></blog-post>
        ```

      - - $event
          - 子组件的$emit()第二个参数的值

      - @enlarge-text=""换成方法

        - ```vue
          <blog-post v-on:enlarge-text="onenlargetext"></blog-post>
          ```

        - methods: { onEnlargeText: function (enlargeAmount) { this.postFontSize += enlargeAmount } }
          - enlargeAmount 就是子组件的$emit()第二个参数的值

- vue 的 ref 实现组件通信 父子相互传

  - ```vue
    <child ref="mychild"></child>
    //子组件 Vue.component("child",{ template:` child `, data(){ return {
    childname:"子组件的状态" } }, methods:{ add(data){
    console.log("子组件的方法",data) } } }) var vm = new Vue({ el:"#box", data:{
    }, methods: { handleAdd(){ console.log("1111",this.$refs.mychild.childname)
    this.$refs.mychild.add("孩子听话"); } }, })
    ```

  -

  - 定义

    - 元素上自定义

      - ref="mytext"

    - 父组件上
      - methods: { handleAdd(){ console.log("1111",this.$refs.mychild.childname)     this.$refs.mychild.add("孩子听话"); }
        - this.$refs.mychild.拿到原生 DOM 节点

  - 应用场景

    - 1. ref 放在标签上， 拿到的是原生节点

    - 2. ref 放在组件上， 拿到的是组件对象

- 中央(中间人)事件总线通信 多层组件通信

  - 两个父组件里的组件，找到相同的父级的父级...

  - a.$on(eventName)

    - 监听事件

  - 引入组件

    - import bus form "@/bus"

  - 代码例子

    - ```vue
      <weixinauthor></weixinauthor>
      <weixinuser></weixinuser>
      import bus form "@/bus" //空vue实例 就是中央事件总线 var bus = new Vue();
      Vue.component("weixinauthor",{ template:` 我是一个微信公众号作者 发布 `,
      methods:{ handleClick(){
      bus.$emit("weixinmessage",this.$refs.mytext.value) } } })
      Vue.component("weixinuser",{ // 合适的位置先 订阅好 bus.$on template:`
      我是一个微信用户 `, mounted(){ bus.$on("weixinmessage",(data)=>{
      console.log("收到推送了",data) }) console.log("生命周期函数-当前组件的dom
      创建完成之后 就会调用") } }) new Vue({ el:"#box" })
      ```

    -

  - 代码解析

    - 定义事件总线

      - //空 vue 实例 就是中央事件总线 var bus = new Vue();

    - 两个组件调用

      - 推送

        - methods:{ handleClick(){ bus.$emit("weixinmessage",this.$refs.mytext.value) }

      - 接收
        - mounted(){ bus.$on("weixinmessage",(data)=>{ console.log("收到推送了",data) }) console.log("生命周期函数-当前组件的 dom 创建完成之后 就会调用") }

- Vue 组件间通信 的 6 种方式

  - 1.props / $emit 适用 父子组件通信

  - 2.ref 与 parent /children 适用 父子组件通信

    - ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

    - parent /children：访问父 / 子实例

  - 3.EventBus （emit /on） 适用于 父子、隔代、兄弟组件通信

    - 这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

  - 4.attrs/listeners 适用于 隔代组件通信

    - attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。

    - listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="listeners" 传入内部组件

  - 5.provide / inject 适用于 隔代组件通信

    - 祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

  - 6.Vuex 适用于 父子、隔代、兄弟组件通信

    - Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

    - 状态

      - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

      - 改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

- Vue2 组件通信方法

  - 非父子组件通信时

    - bus

    - vuex

    - Vue.observable()

      - https://cn.vuejs.org/v2/api/#Vue-observable

      - vue2.6 发布的一个新的 api

      - 可以处理简单的跨组件共享数据状态的问题 ，可以说是个精简版的 vuex

      - 例子

        - 定义

          - ```vue
            // /store/store.js import Vue from 'vue //
            创建state对象，使用observable让state对象可响应 export let state =
            Vue.observable({ name: '张三', 'age': 38 }) // 创建对应的方法 export
            let mutations = { changeName(name) { state.name = name },
            setAge(age) { state.age = age } }
            ```

          -

        - 使用

          - ```vue
            <template>
            	姓名：{{ name }} 年龄：{{ age }} 改变姓名 改变年龄
            </template>
            import { state, mutations } from '@/store export default { //
            在计算属性中拿到值 computed: { name() { return state.name }, age() {
            return state.age } }, // 调用mutations里面的方法，更新数据 methods:
            { changeName: mutations.changeName, setAge: mutations.setAge } }
            ```

          -

### Vue3 组件通信方法

## Vue 前后端交互

### HTTP 协议

网络协议，其实也就是前后端商量好的沟通准则。服务器要能读得懂客户端的请求，客户端也要懂服务器的响应，那么他们之间就需要一个协议

常见的网络协议

- TCP

- HTTP

- HTTPS

- FTP

三次握手和四次挥手

- HTTP 基于 TCP，是面向连接的协议，建立连接要通过三次握手，断开连接要经过四次挥手

http 协议的构成

- 请求

  - 请求头

    - Request Header

      - Requst URL

      - Requst Method

      - Query String Parameters

  - 请求体
    - Request Body

- 响应

  - 响应头

    - Response Header

    - Content-Type

  - 响应体

    - Response Body

  - 响应数据

### location 对象方法

- location.assign()

  - 跟 href 一样，可以跳转页面(也称为重定向页面) 可以后退返回原页面

- location.replace()

  - 可以跳转，但不能退回原页面

- location.reload()
  - 重新加载页面，相当于刷新按钮或者 f5，如果参数为 true 强制刷新 ctrl+f5

### 前端鉴权

https://juejin.cn/post/6844903864458543111

#### Cookie

##### 概念

- 存于客户端，由于 http 协议是无状态的，只要客户端与服务端数据交换完，就会断掉链接，如果再请求 就再次链接，而服务器是无法保存这种链接的状态，只有不停地链接、断链接，所以需要 cookie 来做一个身份认证，再次请求的时候服务器会根据这个身份 id 进行用户判断。

##### 注意

- cookie 是不可跨域的

- 在 http 请求中携带，会在服务器和客户端间传递，所以 cookie 会有大小限制，不能超过 4k，而且存在在设定的 path 下。

##### 封装 cookie

```js
var Cookie = {
	//分装获取的方法 Cookie.get('name')
	get: function (key) {
		var cookiestr = document.cookie; //读取本地的cookie
		var list = cookiestr.split("; ");
		for (var i = 0; i < list.length; i++) {
			var kvs = list[i].split("=");
			if (kvs[0] == key) {
				return kvs[1]; //查询是否存在 存在返回 否则返回null
			}
		}
		return null;
	},
	//封装写入cookie的方法 包括内容、有效期、路径，是否安全传输
	set: function (key, value, expires, path) {
		if (typeof expires == "number" || typeof expires == "string") {
			expires = Number(expires);
			if (isNaN(expires)) {
				expires = undefined;
			} else {
				var d = new Date();
				d.setDate(d.getDate() + expires);
				expires = d;
			}
		}
		if (!(expires instanceof Date) && typeof expires == "object") {
			expires = undefined;
		}
		//cookie的写入 用json字符串形式 调用的时候用Cookie.set('name','zhangsan','/')
		document.cookie =
			key +
			"=" +
			value +
			";" +
			(expires ? "expires=" + expires + ";" : "") +
			(path ? "path=" + path + ";" : "");
	},
};
```

#### Session

#### Token 验证(JWT)

#### OAuth(开放授权)

#### HTML5 本地存储

##### sessionStorage

是用户从打开当前会话窗口到关闭会话窗这一段时间有效，关闭之后存的数据就会被删除

示例

```js
sessionStorage.setItem("name", "alice");
var username = sessionStorage.getItem("name");

sessionStorage.remove("name");
sessionStorage.clear();
```

遍历属性

```js
var storage = window.sessionStorage;
var length = storage.length;
for(let i=-;i<length;i++){
    console.log(storage.key(i),storage.getItem(key))
}
```

##### localStorage

localStorage 会一直存在浏览器中 除非人工清除 方法同上

示例

```js
localStorage.setItem("name", "alice");
var username = localStorage.getItem("name");

localStorage.remove("name");
localStorage.clear();
```

遍历属性

```js
var storage = window.localStorage;
var length = storage.length;
for(let i=-;i<length;i++){
    console.log(storage.key(i),storage.getItem(key))
}
```

### Ajax

#### Ajax 特点特性

- Ajax 是一套 API 核心提供的类型：XMLHttpRequest

- 优点

  - 不需要插件支持（一般浏览器且默认开启 JavaScript 即可）

  - 用户体验极佳（不刷新页面即可获取可更新的数据）

  - 提升 Web 程序的性能（在传递数据方面做到按需发送，不必整体提交）

  - 减轻服务器和带宽的负担（将服务器的一些操作转移到客户端）

- 缺点

  - 前进、后退的功能被破坏（因为 Ajax 永远在当前页，不会记录前后页面）

  - 搜索引擎的支持度不够（因为搜索引擎爬虫还不能理解 JS 引起变化数据的内容）

#### Ajax 应用场景

- 1.页面上拉加载更多数据

- 2.列表数据无刷新分页

- 3.表单项离开焦点数据验证： 验证邮箱和用户名唯一性

- 4.搜索框提示文章提示文字列表

- 5.省市区三级联动

#### Ajax 状态码和 HTTP 状态码

- Ajax 状态码

  - 0 - 4 五种状态

    - 0 实例对象 代理（xhr）被创建，代表初始化状态，请求对象

    - 1 open() 方法已经被调用，建立了连接

    - 2 send() 方法已经被调用，已经接收到了响应报文的响应头，但还没有拿到体

    - 3 正在下载(加载)响应报文的响应体，有可能响应体为空，也有可能不完整

    - 4 代表最终的完成，整个响应报文已经完整下载，可以直接使用 responseText

- HTTP 状态码

  - 表示连接继续

    - 100 ~ 199

  - 表示各种意义上的成功

    - 200 ~ 299

  - 表示重定向

    - 300 ~ 399

  - 表示各种客户端错误

    - 400 ~ 499

  - 表示各种服务端错误
    - 500 ~ 599

#### 同步和异步

同步（sync）

- JS 是单线程语言，对于拿到的程序，一行一行的执行，上面的执行为完成，就等待。

异步（async）

- 定时器函数 (就是异步执行的函数)

  - setTimeout(()=>{})

  - 异步代码总是在同步之后执行

#### Ajax 基础+封装

##### Ajax 数据交互 工作步骤

- 1.准备页面请求，创建 XMLHttpRequest 对象

- 2.使用 XMLHttpRequest 对象的 open（）和 send（）方法发送资源请求给服务器

- 3.后台计算

- 4.onreadystatechange 函数，状态改变时发送数据回客户端，使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性获得服务器的响应

##### 代码请求

###### get 请求

1.创建一个 XMLHttpRequest 实例对象

- var xhr = new XMLHttpRequest()

  2.调用 open 方法打开连接

- xhr.open(method,'url',true)

- open 方法有三个参数

  - method

    - 请求的方法

      - "GET"

      - "POST"

  - url

    - 请求的 url 地址

  - true 参数异步布尔值
    - 是否异步

  3.发送请求(回车键或者点击访问发送请求)

- xhr.send()

  4.监听状态的改变

```js
xhr.onreadystatechange = function () {
  // 判断状态值 ， 0 -4 五种状态，4代表最终的完成
  if (this.readyState === 4) {
    // 判断状态码
    if (this.status === 200) {
      var resp = JSON.parse(xhr.responseText)
      console.log(resp)
      document.querySelector('div').innerHTML = `
        编号: ${resp.id}
        标题: ${resp.title}`
    }
}
```

- xhr.onreadystatechange =function(){}

  - 等价于监听事件

    - xhr.addEventListener('onreadystatechange',function(){})

    - xhr.onload = function () {}

      - onload 是 HTML5 中提供的 XMLHttpRequest v2.0 定义的

      - 有兼容性问题，低版本 IE 不兼容

      - 不需要判断 Ajax 的 readyState0-4 状态值

      - 只被调用一次，执行效率较高

  - AJAX API 采用事件的机制（通知的感觉）

  - 这个事件在响应时和 xhr 状态改变就触发

  - 被调用多次

- this.readyState

  - Ajax 状态码

    - 0 - 4 五种状态

      - 0 实例对象 代理（xhr）被创建，代表初始化状态，请求对象

      - 1 open() 方法已经被调用，建立了连接

      - 2 send() 方法已经被调用，已经接收到了响应报文的响应头，但还没有拿到体

      - 3 正在下载(加载)响应报文的响应体，有可能响应体为空，也有可能不完整

      - 4 代表最终的完成，整个响应报文已经完整下载，可以直接使用 responseText

  - this 指向 xhr，xhr 是全局变量,this 直接指向 xhr，寻找运行更快

- this.status

  - HTTP 状态码

    - 表示连接继续

      - 100 ~ 199

    - 表示各种意义上的成功

      - 200 ~ 299

    - 表示重定向

      - 300 ~ 399

    - 表示各种客户端错误

      - 400 ~ 499

    - 表示各种服务端错误
      - 500 ~ 599

- this.statusText

  - 获取响应状态描述

- JSON.parse(xhr.responseText)

  - 获取服务端响应的内容体

    - xhr.responseText

      - 得到的数据

    - xhr.response

  - JSON.parse()
    - 内置对象 JSON 解析数据

  5.当网络中断时无法发送 Ajax 请求的方法

- xhr.onerror = function(){ alert('网络中断，无法发送 Ajax 请求') }

完整代码

```js
function sendMsg () {
  // 1. 创建一个XMLHttpRequest对象
  var xhr = new XMLHttpRequest()
  // 2. 调用open方法打开连接
  // open方法有三个参数：
  //   1. 请求的method
  //   2. 请求的url
  //   3. 是否异步，默认值为true，一般这个参数可以不传
  xhr.open('get', './data.php?id=1')
  // 3. 发送请求
  xhr.send()
  // 4. 监听状态的改变
  xhr.onreadystatechange = function () {
    // 判断状态值 ， 0 -4 五种状态，4代表最终的完成
    if (this.readyState === 4) {
      // 判断状态码
      if (this.status === 200) {
        // 解析JSON
        var resp = JSON.parse(xhr.responseText)
        console.log(resp)
        // 循环遍历数据
        for (var i = 0; i < data.length; i++) {
          var liElement = document.createElement('li')
          liElement.innerHTML = data[i].name
          liElement.id = data[i].id
          // 注册点击事件
          listElement.appendChild(liElement)
          // 监听点击事件
          liElement.addEventListener('click', function () {
            // TODO: 通过AJAX操作获取服务端对应数据的信息
            // 如何获取当前被点击元素对应的数据的ID
            // console.log(this.id)
            var xhr1 = new XMLHttpRequest()
            xhr1.open('GET', 'users.php?id=' + this.id)
            xhr1.send()
            xhr1.onreadystatechange = function () {
              if (this.readyState !== 4) return
              var obj = JSON.parse(this.responseText)
              alert(obj.age)
          }
        })
      }
    }
  }
}
```

###### post 请求

可以设置请求头和传参

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

- 设置请求头

xhr.send('name=zhangsan&age=18')

- send()传参

  - 里面参数可以传请求体，如果为 null 的话就什么都不传

  1.创建一个 XMLHttpRequest 实例对象

- var xhr = new XMLHttpRequest()

  2.调用 open 方法打开连接

- xhr.open(method,'url',true)

- open 方法有三个参数

  - method

    - 请求的方法

      - "GET"

      - "POST"

  - url

    - 请求的 url 地址

  - true 参数 为 是否 async 异步 ，默认为 true

    - 同步模式 ajax 操作会有楞等的情况

    - 在于 send 方法会不会出现等待情况

  3.设置请求头(请求参数格式的类型)

- ```js
  // 设置请求头的
  content-type xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  ```

  - 格式

    - application/x-www-form-urlencoded

      - urlencoded 数据格式

    - application/json
      - json 数据格式

- post 请求必须设置

  4.发送请求(回车键或者点击访问发送请求)

- xhr.send()

  - 里面参数可以传请求体，如果为 null 的话就什么都不传

  - 获取全部响应头

    - this.getAllResponseHeaders()

      - date

      - server

      - connection

      - ....

  - 设置请求头

    - xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      - 请求头名,值

  - 以 urlencoded 格式 设置请求体参数
    - xhr.send('key1=value1&key2=value2')

  5.监听状态的改变

```js
xhr.onreadystatechange = function () {
  // 判断状态值 ， 0 -4 五种状态，4代表最终的完成
  if (this.readyState === 4) {
    // 判断状态码
    if (this.status === 200) {
      var resp = JSON.parse(xhr.responseText)
      console.log(resp)
      document.querySelector('div').innerHTML = `
        编号: ${resp.id}
        标题: ${resp.title}`
    }
}
```

- xhr.onreadystatechange =function(){}

  - 等价于监听事件

    - xhr.addEventListener('onreadystatechange',function(){})

    - xhr.onload = function () {}

      - onload 是 HTML5 中提供的 XMLHttpRequest v2.0 定义的

      - 有兼容性问题，低版本 IE 不兼容

      - 不需要判断 Ajax 的 readyState0-4 状态值

      - 只被调用一次，执行效率较高

  - AJAX API 采用事件的机制（通知的感觉）

  - 这个事件在响应时和 xhr 状态改变就触发

  - 被调用多次

- this.readyState

  - Ajax 状态码

    - 0 - 4 五种状态

      - 0 实例对象 代理（xhr）被创建，代表初始化状态，请求对象

      - 1 open() 方法已经被调用，建立了连接

      - 2 send() 方法已经被调用，已经接收到了响应报文的响应头，但还没有拿到体

      - 3 正在下载(加载)响应报文的响应体，有可能响应体为空，也有可能不完整

      - 4 代表最终的完成，整个响应报文已经完整下载，可以直接使用 responseText

  - this 指向 xhr，xhr 是全局变量,this 直接指向 xhr，寻找运行更快

- this.status

  - HTTP 状态码

    - 表示连接继续

      - 100 ~ 199

    - 表示各种意义上的成功

      - 200 ~ 299

    - 表示重定向

      - 300 ~ 399

    - 表示各种客户端错误

      - 400 ~ 499

    - 表示各种服务端错误
      - 500 ~ 599

- this.statusText

  - 获取响应状态描述

- this.getResponseHeader('Content‐Type')

  - 获取响应头数据格式

- this.getAllResponseHeader()

  - 全部响应头

- this.response

  - 获取服务端响应的内容体

    - 与 this.responseText 获取到的是一样的数据

  - 得到的结果会根据 this.responseType 的变化而变化

    - 当设置 this.responseType = "json" 的值时

      - this.responseText 这个属性就会没有了

      - 兼容性 IE10+

- this.responseText

  - 获取服务端响应的内容体

    - 与 this.response 获取到的是一样的数据

  - 永远获取的是字符串格式的响应体

- JSON.parse(xhr.responseText)

  - JSON.parse()
    - JSON 解析 xhr.responseText 得到的数据

  6.当网络中断时无法发送 Ajax 请求的方法

- xhr.onerror = function(){ alert('网络中断，无法发送 Ajax 请求') }

完整代码

```js
function sendMsg() {
	var xhr = new XMLHttpRequest();
	// 这里method传post
	xhr.open("post", "./data.php");
	// 设置请求头的content-type
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("name=zhangsan&age=18");
	xhr.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var resp = JSON.parse(this.responseText);
				console.log(resp);
				document.querySelector("div").innerHTML = `
            姓名：${resp.name}
            年龄：${resp.age}
            余额：${resp.money}
            `;
			}
		}
	};
}
```

###### get 和 post 的不同

post 请求要设置请求头(请求参数格式的类型)

- ```js
  // 设置请求头的content-type
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ```

  - 格式

    - application/x-www-form-urlencoded

      - urlencoded 数据格式

    - application/json
      - json 数据格式

- post 请求必须设置

get 请求不能提交 json 对象数据格式。 传统网站的表单提交也不支持 json 对象数据格式

##### 封装 ajax

```js
var util = {
	get: function (url, query, callback, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			url = url.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("get", url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	post: function (url, query, callback, isJson) {
		// 如果有参数，把参数拼接起来
		var str = "";
		if (query) {
			for (var key in query) {
				str += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			str = str.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	// 传对象参数
	// params: object ： { method, url, query, callback, isJson }
	ajax: function (params) {
		var xhr = new XMLHttpRequest();
		if (params.method.toLowerCase() === "get") {
			if (params.query) {
				params.url += "?";
				for (var key in params.query) {
					params.url += `${key}=${params.query[key]}&`;
				}
				params.url = params.url.slice(0, -1);
			}
			xhr.open("get", params.url);
			xhr.send();
		} else {
			// post
			var str = "";
			if (params.query) {
				for (var key in params.query) {
					str += `${key}=${params.query[key]}&`;
				}
				str = str.slice(0, -1);
			}
			xhr.open("post", params.url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(str);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var resp = params.isJson
						? JSON.parse(xhr.responseText)
						: xhr.responseText;
					params.callback(resp);
				}
			}
		};
	},
};
```

##### 调用封装的 ajax

```js
function sendMsg() {
	util.get(
		"./data.php",
		{ id: 3, title: "lisi" },
		function (resp) {
			console.log(resp);
		},
		true
	);

	util.post(
		"./data2.php",
		{ id: 3, title: "lisi" },
		function (resp) {
			console.log(resp);
		},
		true
	);

	util.ajax({
		method: "post",
		url: "./data.php",
		query: {
			id: 3,
			title: "wangwu",
		},
		callback: function (resp) {
			console.log(resp);
		},
		isJson: true,
	});
}
```

##### Ajax 接口调用数据实战

```js
// 列表接口：https://api.apiopen.top/getJoke
// 详情接口：https://api.apiopen.top/getSingleJoke?sid=段子id

// 页面以开始就查询段子列表
util.get(
	"https://api.apiopen.top/getJoke",
	null,
	function (resp) {
		console.log(resp);
		var html = "";
		// 拼接li字符串显示在ul里
		resp.result.forEach(function (item) {
			html += `

    ${item.text}
    查看作者

`;
		});
		document.querySelector("#wrap").innerHTML = html;
	},
	true
);

// 事件委托给button添加事件
document.querySelector("#wrap").onclick = function (e) {
	var target = e.target;
	if (target.tagName === "BUTTON") {
		// 从按钮的自定义属性上取到sid
		var sid = target.getAttribute("data-id");
		util.get(
			"https://api.apiopen.top/getSingleJoke",
			{
				sid: sid,
			},
			function (resp) {
				console.log(resp);
				var name = resp.result.name;
				// 找到父级li，插入作者信息
				var b = document.createElement("b");
				b.innerHTML = name;
				target.parentNode.appendChild(b);
			},
			true
		);
	}
};
```

##### 模板引擎的使用

- 模板引擎实际上就是一个 API，模板引擎有很多种，使用方式大同小异，目的为了可以更容易的将数据渲染到 HTML 中

- artTemplate
  - https://aui.github.io/art-template/

###### 使用步骤

- 1. 选择一个模板引擎

- 2. 下载模板引擎 JS 文件

- 3. 引入到页面中

- 4. 准备一个模板

- 5. 准备一个数据

- 6. 通过模板引擎的 JS 提供的一个函数将模板和数据整合得到渲染结果 HTML

- 7. 将渲染结果的 HTML 设置到 默认元素

代码

```js


  <!--
    script 标签的特点是
    1. innerhtml 永远不会显示在界面上
    2. 如果 type 不等于 text/javascript 的话，内部的内容不会作为 javascript 执行
  -->

    {{each comments}}
    <!-- each 内部 $value 拿到的是当前被遍历的那个元素 -->
    <tr>
      <td>{{$value.author}}</td>
      <td>{{$value.content}}</td>
      <td>{{$value.created}}</td>
    </tr>
    {{/each}}




    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'test.php')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      var res = JSON.parse(this.responseText)

      // 模板所需数据
      var context = { comments: res.data }
      // 借助模板引擎的API 渲染数据
      var html = template('tmpl', context)
      console.log(html)
      // 字符串添加到标签里
     document.getElementById('demo').innerHTML = html


      // 1. 选择一个模板引擎
      //  https://github.com/tj/consolidate.js#supported-template-engines
      // 2. 下载模板引擎JS文件
      // 3. 引入到页面中
      // 4. 准备一个模板
      // 5. 准备一个数据
      // 6. 通过模板引擎的JS提供的一个函数将模板和数据整合得到渲染结果HTML
      // 7. 将渲染结果的HTML 设置到 默认元素的 innerHTML 中

      // var tmpl = '{{if user}}{{user.name}}{{/if}}'
      //
      // 为什么不在JS变量中写模板？
      // 1. 如果将模板写到JS中，维护不方便，不能换行，没有着色
      // 为什么使用script标记
      // 1. script不会显示在界面

    }


```

##### FormData 对象 表单提交

作用

- ajax 请求需要传递参数而参数又比较多的时候使用：参数值的获取和参数格式的拼接

- 1.模拟 HTML 表单，相当于将 HTML 表单映射成表单对象，自动 将表单对象中的数据拼接成请求参数的格式

- 2.异步上传二进制文件：图片文件、视频文件等等

使用

- 1.准备 HTML 表单

  - ​

- 2.将 HTML 表单转化为 formData 对象

  - var form= document.getElementById('from'); var formData = new FormData(form);

- 3.提交表单对象

  - xhr.send(formData);

  - xhr.open('post','url');
    - 请求方法一定要为 post

实例方法

- 1.get 获取表单对象中指定属性的值

  - formData.get('key');

- 2.set 设置(改变)表单对象中指定属性的值

  - formData.set('key','value');

  - 如果设置的表单属性不存在，将会创建这个表单属性并赋值；如果设置的表单属性存在，将会覆盖原有的值

- 3.delete 删除表单对象中属性的值

  - formData.delete('key');

- 4.append 向表单对象中追加属性值

  - formData.append('key','value');

- set 方法和 append 方法的区别
  - 在属性名已存在的情况下，set 会覆盖已有键名的值，append 会保留两个值

查看其它方法

- var formdata = new FormData(); console.log(formdata);

- 1.二进制文件的上传+进度条+图片即时预览

  - 1.标签

    -

    -

    - 0%

  - 2.代码

    - ```js
      var file = document.getElementById("file");
      var imgBox = document.getElementById("imgBox");
      var progressBar = document.getElementById("progressBar");
      file.onchange = function () {
      	// 创建空表单对象
      	var formData = new FormData();
      	// 将用户选择的二进制文件追加到表单对象中
      	formData.append("attrName", this.files[0]);

      	var xhr = new XMLHttpRequest();
      	// 配置ajax对象，请求方式必须是post
      	xhr.open("post", "url");
      	xhr.send(formData);
      	xhr.onload = function () {
      		if (this.status == 200) {
      			var result = JSON.parse(this.responseText);
      			// 动态创建img表单
      			var img = document.createElement("img");
      			// 给图片设置src属性
      			img.src = result.path; // 请求到的属性地址
      			// 当图片加载完成后
      			img.onload = function () {
      				// img图片添加到imgBox的div盒子里
      				imgBox.appendChild(img);
      			};
      		}
      	};
      	// 文件上传进度展示
      	xhr.upload.onprogress = function (e) {
      		// 当前上传文件大小/文件总大小 再将结果转换文百分数
      		// 将结果赋值给进度条的宽度属性
      		var result = (e.loaded / e.total) * 100 + "%";
      		// 将百分比设置结果
      		progressBar.style.width = result;
      		// 将百分比写在在进度条标签显示中
      		progressBar.innerHTML = result;
      		// 文件上传图片即时预览
      	};
      };
      ```

      - this.files[0]

        - file 的属性

      - xhr.upload.onprogress
        - 文件上传触发 onprogress 过程事件

#### promise

ES6 新增的对象

- 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

三种状态

- Pending 进行中

- Resolved(Fulfilled) 已完成

- Rejected 已失败

作用

- 把异步代码写成同步形式

封装+调用例子：

Promise 的封装

```js
// 基于promise的get请求
// return new Promise
 fetch: function (url, query, isJson) {
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      url = url.slice(0, -1)
    }
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
            resolve(resp)
          } else {
            reject()
          }
        }
      }
    })
  }
```

- 封装解析

  - ```js
    function foo () {
         return new Promise(function () {
              ……
         })
    }
    // 在then里处理成功
    foo().then(function () {
         ……
    })

    ```

    - new Promise()

      - 实例

    - then 里处理

- 调用

  ```js
  // 发送请求

  function sendMsg() {
  	// 把异步代码写成同步形式，不用传回调函数了，而是在then里处理成功
  	util
  		.fetch(
  			"./data.php",
  			{
  				id: 3,
  			},
  			true
  		)
  		.then(function (resp) {
  			console.log(resp);
  		});
  }
  ```

#### fetch

​ ES6 获取资源接口的原生方法

- 此 XMLHttpRequest 更好用，但是兼容性一般

- 使用方法会返回一个 promise，避免了回调，不会因为状态吗错误而 reject

##### 方法详解

###### GET

```js
fetch("http://example.com/movies.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (myJson) {
		console.log(muJson);
	});
```

###### POST

```js
const data = { id: 1, title: "aaa" };
fetch(url, {
	body: JSON.stringify(data),
	method: "POST",
})
	.then((response) => response.json())
	.then((myJson) => {
		console.log(muJson);
	});
```

代码例子

```js
// 列表接口：https://api.apiopen.top/getJoke
// 详情接口：https://api.apiopen.top/getSingleJoke?sid=段子id

// 页面以开始就查询段子列表
// fetch方法，在then里来写成功之后的逻辑
fetch("https://api.apiopen.top/getJoke")
	.then(function (resp) {
		return resp.json();
	})
	.then(function (resp) {
		var html = "";
		// 拼接li字符串显示在ul里
		resp.result.forEach(function (item) {
			html += `
            
              ${item.text}
              查看作者
            
          `;
		});
		document.querySelector("#wrap").innerHTML = html;
	});

// 事件委托给button添加事件
document.querySelector("#wrap").onclick = function (e) {
	var target = e.target;
	if (target.tagName === "BUTTON") {
		// 从按钮的自定义属性上取到sid
		var sid = target.getAttribute("data-id");

		fetch(`https://api.apiopen.top/getSingleJoke?sid=${sid}`)
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				var name = resp.result.name;
				// 找到父级li，插入作者信息
				var b = document.createElement("b");
				b.innerHTML = name;
				target.parentNode.appendChild(b);
			});
	}
};

const data = {
	id: 1,
	title: "aaa",
};
fetch(url, {
	body: JSON.stringify(data),
	method: "POST",
})
	.then((response) => response.json())
	.then((myJson) => {
		console.log(muJson);
	});
```

#### jQuery Ajax 代码实战

方法参考

- http://www.jquery123.com/category/ajax/

- http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp

##### $.ajax

参数详解

- url：请求地址

- type：请求方法，默认为 get

- dataType: 服务端响应数据类型

  - get

  - post

  - jsonp

- contentType：请求体内容类型，默认 application/x-www-form-urlencoded

- data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递

  - GET

  - POST

- timeout：请求超时时间

- beforeSend：请求发起之前触发

- success：请求成功之后触发（响应状态码 200）

- error：请求失败触发

- complete：请求完成触发（不管成功与否）

表单内容传参数

- 1.serialize()方法

  - ```js
    $("#from").on("submit", function () {
    	var params = $("#form").serialize();
    	return false;
    });
    ```

    - return false;
      - 阻止表单默认提交的行为

  - 将表单中的数据自动拼接成字符串类型的参数

- 2.函数方法： 将表单中用户输入的内容转换成对象类型

  - ```js
    function serializeObject(obj) {
    	// 处理结果对象
    	var result = {};
    	// 表单中用户输入的内容
    	var params = obj.serializeArray();
    	// console.log(params);
    	// 循环数组，将数组转换为对象类型
    	$.each(params, function (index, value) {
    		result[value.name] = value.value;
    	});
    	// 将处理的结果返回到函数
    	return result;
    }
    ```

- 代码例子

  - ```js
    // var params = {name:'zs',age:20};
    $.ajax({
          url: 'time.php',// 可以省略域名，浏览器自动填写
          type: 'get',
          // 向服务器发送的请求参数
          data：{name:'zs',age:20},
          // data：'name=zs&age=20',
          // data：JSON.stringify(params) ,// 定义的参数先转换再传值
          // 在所有发送请求的操作（open, send）之前执行
          beforeSend: function (xhr) {
            console.log('beforeSend', xhr)
          },
          // 请求成功调用
          success: function (res) {
            // 隐藏 loading
            // 只有请求成功（状态码为200）才会执行这个函数
            console.log(res)
          },
          // 请求失败调用
          error: function (xhr) {
            // 隐藏 loading
            // 只有请求不正常（状态码不为200）才会执行
            console.log('error', xhr)
          },
          complete: function (xhr) {
            // 不管是成功还是失败都是完成，都会执行这个 complete 函数
            console.log('complete', xhr)
          }
          // 指定参数的格式类型
          contentType: 'application/x-www-form-urlencoded'
        })
    ```

- $.ajax 方法发送 jsonp 请求

```js
$.ajax({
	url: "",
	dataType: "jsonp",
	// 传递函数名字callback的参数名称
	jsonp: "cb",
	// 指定函数名称
	jsonCallback: "fnName",
	// 成功后
	success: function (response) {},
});
```

##### $.get

- $.get('json.php', { id: 1 }, function (res) { console.log(res) })

##### $.post

- $.post('json.php', { id: 1 }, function (res) { console.log(res) })

##### $.getJSON

- $.getJSON('json.php', { id: 1 }, function (res) { console.log(res) })

##### Todo LIst 案例

##### JQuery 中的 Ajax 全局事件处理

- http://www.jquery123.com/category/ajax/global-ajax-event-handlers/

- 全局事件

  - $(document).on('ajaxStart',function(){})

    - 当请求开始发送时触发

  - $(document).on('ajaxComplete',function(){})
    - 当请求完成时触发

- 使用例子
  - 进度条加载

#### 浏览器同源策略 跨域

##### 概念

- 必须协议、域名、端口号三者完全一致才叫同源，只有同源的地址才可以相互通过 AJAX 的方式请求。

- 浏览器安全策略，非同源数据不能直接互相访问

##### 跨域方法

###### CORSS 跨域资源共享 (客户端设置)

- 客户端-后端设置响应头，允许跨域

- 允许访问的网址

  - .header('Access-Control-Allow-Origin',‘\*’);
    - \*指所有网址，可以改成指定的网址

- 允许使用访问的方法
  - .header('Access-Control-Allow-Methods','get,post');
    - get,post 指两种方法都可以，也可以单指定 post 或者 get 方法

###### JSONP 跨域(绕过跨域同源) (调用第三方网站的接口)

- 借助于 script 标签发送跨域请求的技巧

  - 标签传的值都是 GET 方式

- 原理

  - 通过 script 标签请求一个服务端的 PHP 文件

  - 这个文件返回的结果是一段 JS，作用是调用我们事先定义好的一个函数

  - 从而将服务端想要给客户端发过去的数据发送给客户端

- 代码例子

  - PHP 服务端

    - ```php
      // 在 JSON 格式的字符串外面包裹了一个函数的调用，
      // 返回的结果就变成了一段 JS 代码 echo "fn({$json})";
      ```

  - 封装 jsonp 函数

    - ```php
      function jsonp(options){
        var script = document.createElement('script');
        // 拼接字符串的变量
        var parmas = '';
        for (var attr in options.data){
          parmas += '&' + attr + '=' + options.data[attr];
        }
        // 定义参数
        // 定义随机函数名，防止多个请求会被覆盖替换
        var random= Math.random().toString().replace('.','');
        var fnName = 'myJsonp' + random;
        //options.success函数用window.[变量]变为全局作用域下函数
        window[fnName ]= options.success;
        script.src = options.url + '?callback=fnName';//拼接参数
        // 开始发起请求
        document.body.appendChild(script);
        // 为script标签添加onload加载事件
        script.onload = function(){
          // 移除script标签
          document.body.removeChild(script);
        }
      }
      ```

  - 客户端实时调用发送

    ```js
    btn.onclick = function () {
    	jsonp({
    		url: "",
    		data: {
    			name: "lisi",
    			age: 30,
    		},
    		success: function (data) {
    			// 请求成功后返回的
    			console.log(data);
    		},
    	});
    };
    // 相当于请求的回调
    function foo(res) {
    	console.log(res);
    }
    ```

- 腾讯天气 接口调用案例

  - ```js

    ```

  -

##### 两种方法调用

###### 服务端

PHP 服务端

```php
// 如果客户端采用的是 script 标记对我发送的请求
// 一定要返回一段 JavaScript
header('Content-Type: application/javascript');
$result = json_encode($data);

$callback_name = $_GET['callback'];

echo "typeof {$callback_name} === 'function' && {$callback_name}({$result})";

```

###### 客户端 jsonp 封装和调用

```js
function jsonp(url, params, callback) {
	var funcName = "jsonp_" + Date.now() + Math.random().toString().substr(2, 5);

	if (typeof params === "object") {
		var tempArr = [];
		for (var key in params) {
			var value = params[key];
			tempArr.push(key + "=" + value);
		}
		params = tempArr.join("&");
	}

	var script = document.createElement("script");
	script.src = url + "?" + params + "&callback=" + funcName;
	document.body.appendChild(script);

	window[funcName] = function (data) {
		callback(data);

		delete window[funcName];
		document.body.removeChild(script);
	};
}
```

调用

```js
jsonp("http://localhost/jsonp/server.php", { id: 123 }, function (res) {
	console.log(res);
});

jsonp("http://localhost/jsonp/server.php", { id: 123 }, function (res) {
	console.log(res);
});
```

##### cookie 登录跨域

- 当使用 Ajax 技术发送跨域请求时，默认情况下不会再请求中携带 cookie 信息

- 解决方案 ：xhr.withCredentials：让跨域登录功能携带 cookie 信息，默认值为 flase

- 客户端设置

  - .header('Access-Control-Allow-Credentials',true)
    - 允许客户端发送请求时携带 cookie

- 服务端请求时.open()之后设置
  - xhr.withCredentials = true;

#### Axios

- 易用、简洁且高效的 http 库

- 文档

  - http://www.axios-js.com/

  - http://www.axios-js.com/zh-cn/docs/

#### 服务端返回的 JSON 数据处理

##### 概念

- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。 它基于 ECMAScript 的一个子集。相比于 XML，json 易于人阅读和编写，同时也易于机器解析和生成，目前数据传递基本上都使用 json。

##### 结构

- 对象

  - var data =["张三",18,"男"];

- 数组

  - var person ={"name":"张三","age":18,"sex":"男"};

- 组合

  - ```js
    var persons = [
    	{ name: "张三", age: 18, sex: "男" },
    	{ name: "张三", age: 18, sex: "男" },
    	{ name: "张三", age: 18, sex: "男" },
    	{ name: "张三", age: 18, sex: "男" },
    ];
    ```

##### 格式

- 数据在键值对中

- 数据由逗号分隔

- 花括号保存对象

- 方括号保存数组

- json 字符串转换成 json 对象

  - JSON.parse()

  - 将 json 字符串转换为 json 对象
    - `{"name":"zs"}` 转换成 `{name:"zs"}` 对象格式

##### json 对象转换成 json 字符串

- JSON.stringify()

##### 将 json 对象转换成 json 字符串

- `{name:"zs"}` 转换成 `{"name":"zs"}` 对象格式

##### 请求参数拼接

- `var params = 'username=' + nameValue + '&password=' + passwordValue`

##### JSON 封装 Scroll

- ```js
  /**
   * 获取滚动的头部距离和左边距离
   * scroll().top scroll().left
   * @returns {*}
   */
  function scroll() {
  	if (window.pageYOffset !== null) {
  		return {
  			top: window.pageYOffset,
  			left: window.pageXOffset,
  		};
  	} else if (document.compatMode === "CSS1Compat") {
  		// W3C
  		return {
  			top: document.documentElement.scrollTop,
  			left: document.documentElement.scrollLeft,
  		};
  	}

  	return {
  		top: document.body.scrollTop,
  		left: document.body.scrollLeft,
  	};
  }

  window.onscroll = function () {
  	console.log(scroll().top);
  };
  ```

##### 数组和字符串操作方法

###### 数组操作方法

- array.concat(value, ...)

  - 连接数组

- Array.join( )

  - 将数组元素连接起来以构建一个字符串

- Array.length

  - 数组的长度

- Array.pop( )

  - 删除并返回数组的最后一个元素

- Array.push( )

  - 给数组添加元素

- Array.reverse( )

  - 颠倒数组中元素的顺序

- Array.shift( )

  - 将元素移出数组

- Array.slice( )

  - 返回数组的一部分

- Array.sort( )

  - 对数组元素进行排序

- Array.splice( )

  - 插入、删除或替换数组的元素

- Array.toLocaleString( )

  - 把数组转换成局部字符串

- Array.toString( )

  - 将数组转换成一个字符串

- Array.unshift( )
  - 在数组头部插入一个元素

###### 字符串操作方法

- String.charAt( )

  - 返回字符串中的第 n 个字符

- String.charCodeAt( )

  - 返回字符串中的第 n 个字符的代码

- String.concat( )

  - 连接字符串

- String.fromCharCode( )

  - 从字符编码创建—个字符串

- String.indexOf( )

  - 检索字符串

- String.lastIndexOf( )

  - 从后向前检索一个字符串

- String.length

  - 字符串的长度

- String.localeCompare( )

  - 用本地特定的顺序来比较两个字符串

- String.match( )

  - 找到一个或多个正则表达式的匹配

- String.replace( )

  - 替换一个与正则表达式匹配的子串

- String.search( )

  - 检索与正则表达式相匹配的子串

- String.slice( )

  - 抽取一个子串

- String.split( )

  - 将字符串分割成字符串数组

- String.substr( )

  - 抽取一个子串

- String.substring( )

  - 返回字符串的一个子串

- String.toLocaleLowerCase( )

  - 把字符串转换小写

- String.toLocaleUpperCase( )

  - 将字符串转换成大写

- String.toLowerCase( )

  - 将字符串转换成小写

- String.toString( )

  - 返回字符串

- String.toUpperCase( )

  - 将字符串转换成大写

- String.valueOf( )
  - 返回字符串

#### RESTful 风格 的 API

设计请求的规范

- GET

  - 获取用户列表数据

    - http://www.inianan.com/users

  - 获取用户 ID 为 1 的用户信息
    - http://www.inianan.com/users/1

- POST

  - 创建(添加)用户数据数据
    - http://www.inianan.com/users

- PUT

  - 修改(更新)用户 ID 为 1 的用户信息
    - http://www.inianan.com/users/1

- DELETE
  - 删除用户 ID 为 1 的用户信息
    - http://www.inianan.com/users/1

### XML 基础

- 可扩展标记性语言，作用是传输和存储数据(基本被淘汰的语言，只是基础了解)

  - 兼容性问题

- XML DOM 文档对象原型 API

### 真机调试

- Chrome + Android / Safari + iOS

- Fiddler / Charles

- Weinre, Spy-Debugger,vConsole

### 接口测试

- Restful API

  - 定义

    - 表现层状态转移

    - REpresentational State Transfer
      - 应用接口

  - 特点

    - 客户端 - 服务器

      - 通过用户界面，让数据与存储分开，通过简化服务器组件来实现跨多平台的应用

    - 无状态，可缓存

      - C -> S 包含理解请求所需的所有信息

    - 统一接口

    - 分层系统

    - 按需代码(可选)

  - 常见接口测试工具

    - 客户端

      - Postman

      - Postwoman

      - DOClever

    - 抓包 proxy

      - Charles

      - fiddler

    - 插件类

      - DHC

      - Postman

      - REST client

- Mock 数据

  - 虚拟的数据，虚拟的测试数据

  - 作用

    - 效率开发

    - 模拟交互与全过程

    - 全量数据测试极端情况

  - mockjs

    - Github 下载

    - 函数定义测试代码例子

  - 常用工具

    - 平台类

      - DOClever

        - 项目管理平台

      - Yapi

        - 项目接口管理平台

      - EasyMock

      - RAP2

      - Swagger

    - 终端类

      - Postman

        - 接口测试工具

      - SoapUI

      - DOClever

    - 插件类

      - Postman

      - DHC

      - REST client

  - Mock 数据开发流程

    - 1.前端定义接口

    - 2.完成静态页面

    - 3.完成 UI 交互

    - 4.对接真实接口

    - 5.页面/逻辑测试

    - 6.线上部署

- 本地安装 接口测试工具

  - doclever 下载安装

  - docker-compose 安装配置

- 性能测试

  - 工具

    - JSPerf

    - YSlow

    - PageSpeed

    - 接口压测
      - AB/Jmeter/tcpcopy/siege/load runner

  - 优化原则

### 前后端交互模式

#### 传统 URL

#### Restful 形式 URL

##### HTTP 请求方式

- GET

  - 查询

- POST

  - 添加

- PUT

  - 修改

- DELETE
  - 删除

##### 符合规制的 URL 地址

- http://www.hello.com/books

  - GET

- http://www.hello.com/books

  - POST

- http://www.hello.com/books/123

  - PUT

- http://www.hello.com/books/123
  - DELETE

### Promise 用法

#### 概念作用

- 主要解决异步深层嵌套的问题

- promise 提供了简洁的 API 使得异步操作更加容易

#### 基本用法

```js
var p = new Promise(function (resolve, reject) {
	//2. 这里用于实现异步任务  setTimeout
	setTimeout(function () {
		var flag = false;
		if (flag) {
			//3. 正常情况
			resolve("hello");
		} else {
			//4. 异常情况
			reject("出错了");
		}
	}, 100);
});
//  5 Promise实例生成以后，可以用then方法指定resolved状态和reject状态的回调函数
//  在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了
p.then(
	function (data) {
		console.log(data);
	},
	function (info) {
		console.log(info);
	}
);
```

- resolve('情况正常无内鬼')
- reject('出错了');

使用 new 来构建一个 Promise Promise 的构造函数接收一个参数，是函数，并且传入两个参数： resolve，reject，分别表示异步操作执行成功后的回调函数 和 异步操作执行失败后的回调函数

#### 基于 Promise 发送 Ajax 请求

```js
function queryData(url) {
     //  1.1 创建一个Promise实例
      var p = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState != 4) return;
          if(xhr.readyState == 4 && xhr.status == 200) {
            # 1.2 处理正常的情况
            resolve(xhr.responseText);
          }else{
            # 1.3 处理异常情况
            reject('服务器错误');
          }
        };
        xhr.open('get', url);
        xhr.send(null);
      });
      return p;
    }

# 注意：  这里需要开启一个服务
# 在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了
```

#### 调用

```js
queryData("http://localhost:3000/data")
	.then(function (data) {
		console.log(data);
		// 1.4 想要继续链式编程下去 需要 return
		return queryData("http://localhost:3000/data1");
	})
	.then(function (data) {
		console.log(data);
		return queryData("http://localhost:3000/data2");
	})
	.then(function (data) {
		console.log(data);
	});
```

#### then 参数中的函数返回值

1.返回 Promise 实例对象

- 返回的该实例对象会调用下一个 then

  2.返回普通值

- 返回的普通值会直接传递给下一个 then，通过 then 参数中函数的参数接收该值

调用实例

```js
queryData("http://localhost:3000/data")
	.then(function (data) {
		return queryData("http://localhost:3000/data1");
	})
	.then(function (data) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(123);
			}, 1000);
		});
	})
	.then(function (data) {
		return "hello";
	})
	.then(function (data) {
		console.log(data);
	});
```

#### Promise 基本 API

##### Promise 实例 API

###### 实例方法

- .then()

  - \- 得到异步任务正确的结果

- .catch()

  - \- 获取异常信息

- .finally()

  - \- 成功与否都会执行（不是正式标准）

  - 不是标准，但有浏览器的支持

###### 1.实例封装

```js
function foo() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			// resolve(123);
			reject("error");
		}, 100);
	});
}
```

###### 2.实例调用

```js
foo()
	.then(
		function (data) {
			console.log(data);
		},
		function (data) {
			console.log(data);
		}
	)
	.finally(function () {
		console.log("finished");
	});

foo()
	.then(function (data) {
		console.log(data);
	})
	.catch(function (data) {
		console.log(data);
	})
	.finally(function () {
		console.log("finished");
	});
```

##### Promise 对象 API

##### 对象方法

- xxx.all()

  - Promise.all`方法接受一个数组作参数，数组中的对象（p1、p2、p3）均为promise实例（如果不是一个promise，该项会被用`Promise.resolve`转换为一个 promise)。它的状态由这三个 promise 实例决定

- xxx.race()
  - Promise.race`方法同样接受一个数组作参数。当p1, p2, p3中有一个实例的状态发生改变（变为`fulfilled`或`rejected`），p 的状态就跟着改变。并把第一个改变状态的 promise 的返回值，传给 p 的回调函数

##### 1.对象方法封装

```js
function queryData(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.readyState == 4 && xhr.status == 200) {
				// 处理正常的情况
				resolve(xhr.responseText);
			} else {
				// 处理异常情况
				reject("服务器错误");
			}
		};
		xhr.open("get", url);
		xhr.send(null);
	});
}
```

##### 2.对象方法调用

```js
var p1 = queryData("http://localhost:3000/a1");
var p2 = queryData("http://localhost:3000/a2");
var p3 = queryData("http://localhost:3000/a3");
Promise.all([p1, p2, p3]).then(function (result) {
	//   all 中的参数  [p1,p2,p3]   和 返回的结果一 一对应["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
	console.log(result); //["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
});
Promise.race([p1, p2, p3]).then(function (result) {
	// 由于p1执行较快，Promise的then()将获得结果'P1'。p2,p3仍在继续执行，但执行结果将被丢弃。
	console.log(result); // "HELLO TOM"
});
```

### 接口调用-fetch

#### 概念

- Fetch API 是新的 ajax 解决方案 Fetch 会返回 Promise

- fetch 不是 ajax 的进一步封装，而是原生 js，没有使用 XMLHttpRequest 对象

#### Fetch API 基本用法

语法

```js
fetch(url, options)
	.then((data) => {
		// 调用.text()返回promise对象
		return data.text();
	})
	.then((ret) => {
		// 这里才是最终的数据
		console.log(ret);
	});
```

实例调用

```js
fetch("http://localhost:3000/fdata")
	.then(function (data) {
		// text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
		return data.text();
	})
	.then(function (data) {
		//   在这个then里面我们能拿到最终的数据
		console.log(data);
	});
```

#### fetch API 中 的请求参数传递

##### 方法和作用

- HTTP 协议，它给我们提供了很多的方法，如 POST，GET，DELETE，UPDATE，PATCH 和 PUT

- 1- 默认的是 GET 请求

- 2- 需要在 options 对象中 指定对应的 method method:请求使用的方法

- 3- post 和 普通 请求的时候 需要在 options 中 设置 请求头 headers 和 body

##### 1.传统 URL 传参

```js
// 1.1 GET参数传递 - 传统URL  通过url  ？ 的形式传参
fetch("http://localhost:3000/books?id=123", {
	// get 请求可以省略不写 默认的是GET
	method: "get",
})
	.then(function (data) {
		// 它返回一个Promise实例对象，用于获取后台返回的数据
		return data.text();
	})
	.then(function (data) {
		// 在这个then里面我们能拿到最终的数据
		console.log(data);
	});
```

##### 2.restful 形式的 URL 传参

1.GET 请求

```js
// 1.2  GET参数传递  restful形式的URL  通过/ 的形式传递参数  即  id = 456 和id后台的配置有关

fetch("http://localhost:3000/books/456", {
	// get 请求可以省略不写 默认的是GET
	method: "get",
})
	.then(function (data) {
		return data.text();
	})
	.then(function (data) {
		console.log(data);
	});
```

2.DELETE 请求

```js
// 2.1  DELETE请求方式参数传递      删除id  是  id=789
fetch("http://localhost:3000/books/789", {
	method: "delete",
})
	.then(function (data) {
		return data.text();
	})
	.then(function (data) {
		console.log(data);
	});
```

3.POST 请求

```js
//  3 POST请求传参
fetch('http://localhost:3000/books', {
    method: 'post',
    # 3.1  传递数据
    body: 'uname=lisi&pwd=123',
    // 3.2  设置请求头
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(function(data) {
    return data.text();
}).then(function(data) {
    console.log(data)
});


//  POST请求传参
fetch('http://localhost:3000/books', {
        method: 'post',
        body: JSON.stringify({
            uname: '张三',
            pwd: '456'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(data) {
        return data.text();
    }).then(function(data) {
        console.log(data)
    });
```

4.PUT 请求

```js
//  PUT请求传参     修改id 是 123 的
fetch("http://localhost:3000/books/123", {
	method: "put",
	body: JSON.stringify({
		uname: "张三",
		pwd: "789",
	}),
	headers: {
		"Content-Type": "application/json",
	},
})
	.then(function (data) {
		return data.text();
	})
	.then(function (data) {
		console.log(data);
	});
```

#### fetchAPI 中 响应结果格式

```js
fetch("http://localhost:3000/json")
	.then(function (data) {
		// return data.json();   //  将获取到的数据使用 json 转换对象
		return data.text(); //  //  将获取到的数据 转换成字符串
	})
	.then(function (data) {
		// console.log(data.uname)
		// console.log(typeof data)
		var obj = JSON.parse(data);
		console.log(obj.uname, obj.age, obj.gender);
	});
```

### 接口调用-Axios

#### 概念和作用

- \- 基于 promise 用于浏览器和 node.js 的 http 客户端

- \- 支持浏览器和 node.js

- \- 支持 promise

- \- 能拦截请求和响应

- \- 自动转换 JSON 数据

- \- 能转换请求和响应数据

#### axios 基础用法

##### 用法

###### get 和 delete 请求传递参数

- 通过传统的 url 以 ? 的形式传递参数

- restful 形式传递参数

- 通过 params 形式传递参数

###### post 和 put 请求传递参数

- 通过选项传递参数

- 通过 URLSearchParams 传递参数

##### 用法例子

###### 1.发送 get 请求

```js
// 1. 发送get 请求
axios.get("http://localhost:3000/adata").then(function (ret) {
	// 拿到 ret 是一个对象      所有的对象都存在 ret 的data 属性里面
	// 注意data属性是固定的用法，用于获取后台的实际数据
	// console.log(ret.data)
	console.log(ret);
});
```

###### 2.get 请求传递参数

```js
// 2.1  通过传统的url  以 ? 的形式传递参数
axios.get("http://localhost:3000/axios?id=123").then(function (ret) {
	console.log(ret.data);
});

// 2.2  restful 形式传递参数
axios.get("http://localhost:3000/axios/123").then(function (ret) {
	console.log(ret.data);
});

// 2.3  通过params  形式传递参数
axios
	.get("http://localhost:3000/axios", {
		params: {
			id: 789,
		},
	})
	.then(function (ret) {
		console.log(ret.data);
	});
```

###### 3.axios delete 请求传参

```js
// 3 axios delete 请求传参     传参的形式和 get 请求一样
axios
	.delete("http://localhost:3000/axios", {
		params: {
			id: 111,
		},
	})
	.then(function (ret) {
		console.log(ret.data);
	});
```

###### 4.axios 的 post 请求

```js
// 4.1  通过选项传递参数
axios
	.post("http://localhost:3000/axios", {
		uname: "lisi",
		pwd: 123,
	})
	.then(function (ret) {
		console.log(ret.data);
	});

// 4.2  通过 URLSearchParams  传递参数
var params = new URLSearchParams();
params.append("uname", "zhangsan");
params.append("pwd", "111");
axios.post("http://localhost:3000/axios", params).then(function (ret) {
	console.log(ret.data);
});
```

###### 5.axios put 请求传参

```js
// 5  axios put 请求传参   和 post 请求一样
axios
	.put("http://localhost:3000/axios/123", {
		uname: "lisi",
		pwd: 123,
	})
	.then(function (ret) {
		console.log(ret.data);
	});
```

#### axios 全局配置

```js
// 配置公共的请求头
axios.defaults.baseURL = 'https://api.example.com';
// 配置 超时时间
axios.defaults.timeout = 2500;
// 配置公共的请求头
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
# 配置公共的 post 的 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### axios 拦截器

##### 请求拦截器

请求拦截器的作用是在请求发送前进行一些操作

例如在每个请求体里加上 token，统一做了处理如果以后要改也非常容易

代码例子

```js
// 1. 请求拦截器
axios.interceptors.request.use(
	function (config) {
		console.log(config.url);
		// 1.1  任何请求都会经过这一步   在发送请求之前做些什么
		config.headers.mytoken = "nihao";
		// 1.2  这里一定要return   否则配置不成功
		return config;
	},
	function (err) {
		// 1.3 对请求错误做点什么
		console.log(err);
	}
);
```

响应拦截器的作用是在接收到响应后进行一些操作

例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页

代码例子

```js
// 2. 响应拦截器
axios.interceptors.response.use(
	function (res) {
		// 2.1  在接收响应做些什么
		var data = res.data;
		return data;
	},
	function (err) {
		// 2.2 对响应错误做点什么
		console.log(err);
	}
);
```

#### 接口的跨域请求样式

在 Request Headers 下面，有一些请求需要的字段，请求的时候需要配置相关字段才能跨域,一个个来试相关的请求字段配置 headers:{}

```js
axios
	.get({
		url: "https://project.com/getdata",
		method: "get",
		headers: {
			字段名1: "值",
			字段名2: "值",
		},
	})
	.then((res) => {
		console.log(res.data);
	});
```

#### vue-Axios 库

- 易用、简洁且高效的 http 库

  - 使用 ES6 新增对象 Promise 管理异步，告别传统 callback 方式

  - Vue 常用 Ajax 库

- 文档

  - http://www.axios-js.com/

  - http://www.axios-js.com/zh-cn/docs/

- 安装

  ```bash
  npm install --save axios vue-axios
  ```

- main.js 入口文件引用

  ```js
  import Vue from "vue";
  import axios from "axios";
  import VueAxios from "vue-axios";

  Vue.use(VueAxios, axios);
  ```

- 使用

  ```js
  Vue.axios.get(api).then((response) => {
  	console.log(response.data);
  });

  this.axios.get(api).then((response) => {
  	console.log(response.data);
  });

  this.$http.get(api).then((response) => {
  	console.log(response.data);
  });
  ```

### 接口调用-async/await

#### 概念和作用

- async/await 是 ES8 引入的新语法，可以更加方便的进行异步操作

- async/await 让异步代码看起来、表现起来更像同步代码

#### 使用详解

- async 作为一个关键字放到函数前面

  - 任何一个`async`函数都会隐式返回一个`promise`

- await 关键字只能在使用`async`定义的函数里 ：调用接口的前面使用

  - await 后面可以直接跟一个 Promise 实例对象

  - await 函数不能单独使用

#### 配合使用

配合 Promise 使用

```js
async function queryData() {
	// 1.2 await关键字只能在使用async定义的函数中使用      await后面可以直接跟一个 Promise实例对象
	var ret = await new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve("nihao");
		}, 1000);
	});
	// console.log(ret.data)
	return ret;
}
// 1.3 任何一个async函数都会隐式返回一个promise   我们可以使用then 进行链式编程
queryData().then(function (data) {
	console.log(data);
});
```

配合 Axios 使用 (处理多个异步请求)

```js
// 2.async    函数处理多个异步函数
axios.defaults.baseURL = "http://localhost:3000";

async function queryData() {
	// 2.1  添加await之后 当前的await 返回结果之后才会执行后面的代码
	var info = await axios.get("async1");
	// 2.2  让异步代码看起来、表现起来更像同步代码
	var ret = await axios.get("async2?info=" + info.data);
	return ret.data;
}

queryData().then(function (data) {
	console.log(data);
});
```
