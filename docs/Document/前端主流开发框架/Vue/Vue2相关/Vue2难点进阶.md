# Vue2 难点进阶

## 尤雨溪教你写 vue 高级 vue 教程 源码分析 中文字幕翻译

尤雨溪教你写 vue 高级 vue 教程 源码分析 中文字幕翻译：https://www.bilibili.com/video/BV1d4411v7UX/

## 难点进阶

##### this.$emit：子组件调用父组件的函数方法

```js
vm.$emit(event, arg); // 触发当前实例上的事件

// 例子：子组件触发父组件的函数方法
this.$emit("refresh", true); // 调用父组件的 refresh 函数,并传递参数。
```

##### this.$on：定义一个事件，并且指定事件的处理方法

```js
vm.$on(event, callback); // 监听event事件后运行 callback回调函数；
this.$on("getParam", this.handleParam); // this.$on('自定义事件名',处理方法)
this.$on(["getParam", "getParam2"], this.handleParam); // 可以绑定成数组事件
```

##### emit 和 on 的组合使用

1.首先创建一个 vue 的空白实例（兄弟间的桥梁）：busVue.js

```js
//     busVue.js
import Vue from "vue";
export default new Vue();
```

2.组件 a 设置：$emit

```js
import Bus from "@/store/modules/busVue.js";

methods: {
    handleSelect (item) {
      Bus.$emit('changeSelect', item)
    }
}
```

3.组件 b 设置：$on

```js
import Bus from "@/store/modules/busVue.js";

mounted(){
  Bus.$on('changeSelect', (val)=>{
    console.log(val, '7777777777')
  })
},
```

4.组合的单页示例：

```js
<template>
  <section>
    <h2>left</h2>
    <el-button type="primary" @click="isClick">点击</el-button>
  </section>
</template>
<script>
  export default {
    methods: {
      isClick() {
        this.$emit('isLeft', '点击事件！');
      }
    },
    mounted() {
      this.$on('isLeft', (val) => {
        console.log(val);
      });
    }
  }
</script>
```

---

#### this.$refs.组件的 ref 属性：可以获取到子组件的属性和和调用子组件的方法

```js
// 父组件
<child-a ref="child"></child-a>
...
methods: {
  getMyEvent(){
    // 调用子组件的方法：child是上边ref起的名字，emitEvent是子组件的方法。
    this.$refs.child.emitEvent("哈哈哈");
  }
}


// 子组件
<template>
  <button>点击我</button>
</template>
<script>
  export default {
    methods: {
      emitEvent(msg){
        console.log('接收的数据--------->'+msg)//接收的数据--------->我是父组件中的数据
      }
    }
  }
</script>
```

##### 自定义指令：Vue.directive()

文档：[自定义指令 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

API：[API — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/api/#Vue-directive)

通过 Vue.use 插件注册的方法批量注册指令：[超实用的全局 Vue 自定义指令\_黄庚中的博客-CSDN 博客\_vue 全局定义指令](https://blog.csdn.net/xiaodi520520/article/details/111308726)

常用的全局的指令：↓

- 复制粘贴指令 v-copy
- 长按指令 v-longpress
- 输入框防抖指令 v-debounce
- 禁止表情及特殊字符 v-emoji
- 图片懒加载 v-LazyLoad
- 权限校验指令 v-premission
- 实现页面水印 v-waterMarker
- 拖拽指令 v-draggable

###### 1.v-loading 指令：全局加载样式组件

加载动画组件 loading.vue

```html
<template>
	<div class="loadingcssbox">
		<img src="../../assets/loading.gif" />
	</div>
</template>
```

指令钩子函数 loading.js

```js
import Vue from "vue";
//引入加载动画组件
import Loading from "./Loading.vue";
const loadingDirectiive = {
	inserted(el, bing) {
		// el ==>表示被绑定了指令的那个元素，这个el是一个原生的js对象。
		// bing ==> 指令相关的信息
		// 得到一个组件的构造函数
		const loadingCtor = Vue.extend(Loading);
		// 得到实例loadingComp
		const loadingComp = new loadingCtor();
		// 获取实例的html。将html放在el的实例上面去。
		// 放在el实例上的优势是方便访问。
		// $el是可以访问加载动画的html。
		// 这样就可以将它添加到某一个节点上。同时也方便移除
		const htmlLoading = loadingComp.$mount().$el;
		// 将html放在el的实例上面去
		el.myHtml = htmlLoading;
		if (bing.value) {
			appendHtml(el);
		}
	},
	update(el, bing) {
		// bing.value 是v-loading绑定的那个值； true 要显示加载动画
		//新值 bing.value与旧值bing.oldValue是否相等
		if (bing.value !== bing.oldValue) {
			bing.value ? appendHtml(el) : removeHtml(el);
		}
	},
};

function appendHtml(el) {
	el.appendChild(el.myHtml);
}

function removeHtml(el) {
	el.removeChild(el.myHtml);
}
export default loadingDirectiive;
```

main.js 中 注册成为全局指令：

```js
import loadingDirectiive from './components/loading/loading'
Vue.directive('loading', loadingDirectiive)

<!-- 全局指令的注册方式 -->
Vue.directive("color", {
  钩子函数
})
```

使用加载动画指令：

```js
<template>
  <div class="box">
    <ListCom :listArr="listArr" v-loading="isLoadFlag"></ListCom>
  </div>
</template>
<script>
import ListCom from '../components/ListCom.vue'
export default {
  components: {
    ListCom
  },
  data() {
    return {
      listArr: [],
      //通过isLoadFlag来控制动画是否开启
      isLoadFlag:false,
    }
  },
  created() {
    this.sendAPi()
  },
  methods: {
    sendAPi() {
      this.isLoadFlag = true;//开启加载动画
      setTimeout(() => {
        this.listArr = [
          { name: '齐玄帧', dec: '五百年前的吕祖', },
          { name: '王仙芝', dec: '白帝转世' },
          { name: '李淳罡', dec: '李淳罡当初的实力是绝对的天下第一的' },
          { name: '邓太阿', dec: '徐凤年的舅舅' },
          { name: '曹长卿', dec: '这位号称独占天象八斗风流，实力排进天下前三' }
        ]
        //移除加载动画
        this.isLoadFlag = false
      },3000)
    }
  }
}
</script>
```

###### 2.v-click-out：一个按钮点击后弹出一个浮层，然后点击按钮外的所有事件，都关闭浮层。

定义指令：

```js
export default {
	clickOut: {
		// 初始化指令
		bind(el, binding, vnode) {
			function clickHandler(e) {
				// 这里判断点击的元素是否是本身，是本身，则返回
				if (el.contains(e.target)) {
					return false;
				}
				// 判断指令中是否绑定了函数
				if (binding.expression) {
					// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
					binding.value(e);
				}
			}
			// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
			el.__vueClickOutside__ = clickHandler;
			document.addEventListener("click", clickHandler);
		},
		update() {},
		unbind(el, binding) {
			// 解除事件监听
			document.removeEventListener("click", el.__vueClickOutside__);
			delete el.__vueClickOutside__;
		},
	},
};
```

main.js 中 注册成为全局指令：

```js
import clickOut from "./components/clickOut/clickOut";
Vue.directive("clickOut", clickOut);
```

使用指令：

```js
<span @click="showDialog" v-click-out="hideDialog">点击我打开否则关闭</span>
```

###### 3.：倒计时指令

定义指令：

```js
var toZeroStr = (val, num = 2) => {
	num = num || 2;
	return (new Array(num).join("0") + val).slice(-num);
};
var milliseconds2HMS = (diff) => {
	const millisecond = diff % 1000;
	diff = diff - millisecond;
	return seconds2HMS(diff / 1000);
};
var seconds2HMS = (diff) => {
	const seconds = diff % 60;
	const minutes = (diff - seconds) % 3600;
	// const hours = (diff - minutes - seconds) % 86400;
	const hours = diff - minutes - seconds;
	return [hours / 3600, minutes / 60, seconds];
};

export default {
	// 倒计时
	countdown: {
		bind(el, binding, vnode) {
			const { componentOptions, data } = vnode;
			const listeners = componentOptions ? componentOptions.listeners : null;
			const on = data ? data.on : null;
			const events = listeners ? listeners : on ? on : null;
			if (events && typeof events === "object" && Object.keys(events).length) {
				binding.customListeners = events;
			}
		},

		inserted(el, binding, vnode) {
			let val = +binding.value;
			if (!val) {
				return;
			}
			const formatter = vnode.data.attrs.formatter;
			let timer = null;
			window.clearInterval(el.timer);
			const tFunction = () => {
				val -= 1000;
				let instance = milliseconds2HMS(val);
				if (val <= 0) {
					if (timer) {
						window.clearInterval(timer);
						timer = null;
						if (binding.customListeners) {
							binding.customListeners.complete &&
								binding.customListeners.complete();
						}
					}
					el.innerHTML = "0";
					return;
				}
				el.innerHTML = formatter.replace(
					/(HH.+)(mm.+)(ss.+)/g,
					(str, $1, $2, $3) => {
						return str
							.replace(
								new RegExp($1, "g"),
								!instance[0] ? "" : $1.replace(/HH/g, toZeroStr(instance[0]))
							)
							.replace(
								new RegExp($2, "g"),
								!instance[0] && !instance[1]
									? ""
									: $2.replace(/mm/g, toZeroStr(instance[1]))
							)
							.replace(
								new RegExp($3, "g"),
								!instance[1] && !instance[2]
									? ""
									: $3.replace(/ss/g, toZeroStr(instance[2]))
							);
					}
				);
			};
			tFunction();
			timer = window.setInterval(tFunction, 1000);
			el.timer = timer;
		},

		update(el, binding, vnode) {
			if (binding.oldValue !== binding.value) {
				window.clearInterval(el.timer);
				binding.def.inserted(el, binding, vnode);
			}
		},

		unbind(el, binding, vnode) {
			window.clearInterval(el.timer);
			el.timer = null;
			delete el.timer;
			const customListeners = binding.customListeners;
			if (customListeners) {
				delete binding.customListeners;
			}
		},
	},
};
```

main.js 中 注册成为全局指令：

```js
import countdown from "./components/countdown/countdown";
Vue.directive("countdown", countdown);
```

使用 v-countdown 倒计时指令

```html
<span v-countdown="10000" formatter="HH小时mm分ss秒"></span>
```

##### 4.占用图指令：v-showimg

```
当没有数据的时候，显示一个占位图。
我们将会通过自定义指令 v-showimg="showImgFlag"来控制是否显示占位图
占位图组件 ShowImgCom.vue
自定义钩子 showimg.js
```

占位图组件 ShowImgCom.vue

```html
<template>
	<div class="showimgbox">
		<img src="../../assets/nodata.png" />
		<p>暂无数据</p>
	</div>
</template>
```

指令的书写 showimg.js

```javascript
import Vue from "vue";
import ShowImgCom from "./ShowImgCom.vue";
const showimgDirectiive = {
	inserted(el, bing) {
		const showimgCtor = Vue.extend(ShowImgCom);
		const showImgComp = new showimgCtor();
		const htmlSHowPic = showImgComp.$mount().$el;
		el.myHtml = htmlSHowPic;
		if (bing.value) {
			appendHtml(el);
		}
	},
	update(el, bing) {
		if (bing.value !== bing.oldValue) {
			bing.value ? appendHtml(el) : removeHtml(el);
		}
	},
};

function appendHtml(el) {
	el.appendChild(el.myHtml);
}

function removeHtml(el) {
	el.removeChild(el.myHtml);
}
export default showimgDirectiive;
```

main.js 注册

```javascript
import showimgDirectiive from "./components/ShowImg/showimg";
Vue.directive("showimg", showimgDirectiive);
```

指令的使用 v-showimg 指令

```html
<template>
	<div class="box" v-showimg="showImgFlag">
		<ListCom :listArr="listArr" v-loading="isLoadFlag"></ListCom>
	</div>
</template>
<script>
	import ListCom from '../components/ListCom.vue'
	export default {  components: {    ListCom
	  },  data() {    return {      listArr: [],      isLoadFlag: false,      showImgFlag:false
	    }  },  created() {     this.sendAPi()  },  methods: {    sendAPi() {       this.isLoadFlag = true;//加载中
	      setTimeout(() => {         this.listArr = []        this.isLoadFlag = false         //是否显示占位图
	        if (this.listArr && this.listArr.length === 0) {          this.showImgFlag = true
	        } else {           this.showImgFlag =false
	        }      },3000)    }  }}
</script>
```
