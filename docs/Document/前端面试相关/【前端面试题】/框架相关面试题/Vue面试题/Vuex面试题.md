# Vuex面试题

Vuex文档：[Vuex 是什么？ | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/)

## Vuex的基本使用

- state : 状态中⼼
- mutations : 更改状态
- actions : 异步更改状态
- getters : 获取状态
- modules : 将 state 分成多个 modules ，便于管理



在Vue中使用：

dispatch

commit

mapState

mapGetters

mapActions

mapMutations



### Vuex 中的 action 和 mutation 有何区别

- action 中处理异步，mutation 不可以
- mutation 做原子操作
- action 可以整合多个 mutation

## state的数据结构设计



## Vuex原理



## 待定

### 1.什么是vuex？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态， 并以相应的规则保证状态以一种可预测的方式发生改变 简单来说，就是用来集中管理数据；

### 2.Vuex解决了什么问题？

解决两个问题

多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

### 3.使用vuex的核心概念



### 4.Vuex插件有用过吗？怎么用简单介绍一下？

Vuex插件就是一个函数，它接收 store 作为唯一参数。在Vuex.Store构造器选项plugins引入。 在store/plugin.js文件中写入

然后在store/index.js文件中写入http请求
