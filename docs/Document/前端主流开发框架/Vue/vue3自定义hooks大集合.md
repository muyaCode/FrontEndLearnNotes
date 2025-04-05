# vue3自定义hooks大集合

## 介绍

平常说的 自定义hooks 在vue3 官方说法叫组合式 API (Composition API)

- 组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件
- 虽然这套 API 的风格是基于函数的组合，但**组合式 API 并不是函数式编程**。组合式 API 是以 Vue 中数据可变的、细粒度的响应性系统为基础的，而函数式编程通常强调数据不可
- 组合式 API 最基本的优势是它使我们能够通过组合函数来实现更加简洁高效的逻辑复用。在选项式 API 中我们主要的逻辑复用机制是 mixins，而组合式 API 解决了 mixins 的所有缺陷

## 使用

平时我们 写自定义hooks 可能有两种

- 一种是 基于业务的 自定义hooks 只是为了单纯提取 可复用的逻辑 ，缺点是只能用在自己项目中
- 一种是 可复用行强的 可在全局使用的 比如对于弹框、表格、表单等等的自定义hooks

### 基于业务封装的 hooks

最近我在开发低代码的项目 我在项目中得封装一套组件 看下面的伪代码：

## vue3 hooks的网站以及文章

### 开源库与开源项目中的hooks

🚀vue3官方推荐社区项目：VueUse

这个是我最推荐大家的hooks 平时没事的时候在里面逛一下 看看源码 绝对能学到很多，我平时用的比较多的是其中的 `useResizeObserver`、`useTitle`、`useClipboard`、`useDraggable` 等

🚀ahooks-vue

ahooks 的 vue 实现。许多 hooks 是从ahooks移植过来的，但是不完全一致。包含了 `useRequest`、`useAxios`、`useFullscreen`、`useTable`等

🚀个人封装的hooks 库

这个是我偶然发现的 一个hooks 库 感觉也是模仿其他库的，仅供参考

🚀vue-hooks

主要包含了 `useDate`、`useStore`、`useActions`等

🚀vue-use-web

跟 vueuse 有点像不知道是不是vueuse 前身，而且都是国外大佬维护的

🚀vue-hooks-plus

其中包含47个高质量 & 可靠 hook函数 其中`useRequeset` 、`useWebSocket`、`useFetchs`等都很优秀

🚀针对 Vue3 的实用Hooks集合

`useRequest`、 `useDate`、`useVirtualList` 我在项目中都用到了

🚀20kstars 的后台管理项目：vue-vben-admin

这个是 点赞比较多的 vue3 后台管理项目 其中 我上面的分页hooks 就是抄他的 里面还有很多 表格表单hooks 大家也可以参考 其中包含了 `useContext`、`useScroll`、`useEventListener`、`useTable`、`useTitle`等

🚀vue3-antd-admin

喜欢用 antd 的同学可以看看其中的`useI18n` `useModal`、`useEventbus` 方案都很优秀

### 表格相关的

🚀一文学会vue3如何自定义hook钩子函数和封装组件

🚀【Vue3】如何封装一个超级好用的 Hook ！

🚀useTable表格hooks封装和使用(Vue3)

🚀vue3流水线开发分页列表？😁 useTable了解一下

🚀Vue3自定义useTable

🚀在Vue3这样子写页面更快更高效

🚀基于vue3+Arco Design的table组件的hook二次封装

每个人封装的 表格 hook 其实都有区别 所以大家可以综合一下 总结出比较适合自己项目的，因为每个人项目中的 ui  分页等等 都不太一样 所以个人建议总结出一个 集成到自己项目中是最好的

### 关于请求的 hook

🚀Vue3 教你实现公司级网络请求的 Hook

🚀Vue3使用hook封装常见的几种异步请求函数场景，让开发更加丝滑

### 其他 hooks

🚀Form表单组件封装和使用(Vue3)

他把antdvue 的form 二次封装了 并且搭配了自己的封装的hooks

🚀【vue3】写hook三天，治好了我的组件封装强迫症。

封装了 下拉框选项从后端获取值得hooks 以及关于 loading 状态的 hook

🚀Vue3自定义一个Hooks，实现一键换肤

一键换肤的 hooks

🚀Vue3使用hook封装媒体查询和事件监听，使Vue的开发更加丝滑🚀🚀🚀

🚀聊聊Vue3+hook怎么写弹窗组件更快更高效

🚀【Vue3 Hook】实现 useTimeout 代替 setTimeout

🚀公共Hooks封装之文件下载useDownloadBlob

🚀在vue中封装useIntro来更好的使用Intro.js