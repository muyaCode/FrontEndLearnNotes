# vuex：状态管理库

官网：[Vuex 是什么？ | Vuex](https://vuex.vuejs.org/zh/)

GitHub：[GitHub - vuejs/vuex: 🗃️ Centralized State Management for Vue.js.](https://github.com/vuejs/vuex)

**vuex已更新到v4.x版本，v5版本不会再出，官方推荐使用```pinia```作为vuex的v5版本**

---

#### 非父子通信、状态管理：

###### 1.State通过：this.$store.state.共享状态属性，来访问共享状态属性

在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态：

```javascript
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return $store.state.count // 返回状态，通过计算属性接收，然后在页面上使用
    }
  }
}
```

###### 1.1 `mapState` 辅助函数：来访问共享状态state属性的第二种方法

- 一个组件需要获取多个状态，可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：
  
  ```javascript
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'
  
  export default {
    // ...
    computed: mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
  
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
  
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  }
  ```

- 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。
  
  ```javascript
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
  // 可以配合ES6展开运算符使用：可以对数组或对象进行展开，方便后面可以自定义属性合并
  computed: {
    ...mapState(['count']),
  }
  ```

###### 2.Getter通过：getters: {} 定义 store 的计算方法：相当于vue的计算属性

```javascript
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    // 页面内可以通过this.$store.getters.doneTodos，访问
    doneTodos (state, getters) {
      console.log(getters.doneTodos.length) // 其他 getter
      return state.todos.filter(todo => todo.done)
    }
    // 也可以通过让 getter 返回一个函数，来实现给 getter 传参
    // 页面内可以通过this.$store.getters.getTodoById(2)，访问
    getTodoById: (state) => (id) => {
       return state.todos.find(todo => todo.id === id)
     }
    }
})
```

###### 2.1 `mapGetters` 辅助函数：第二种调用getters属性的方法

- `mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
  
  ```javascript
  import { mapGetters } from 'vuex'
  
  export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
      ])
    }
  }
  ```

- 将一个 getter 属性另取一个名字，使用对象形式：
  
  ```javascript
  ...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
  })
  ```

###### 3.Mutation通过：mutations: {} 里面添加修改状态的函数方法

###### 3.1使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：防止名字冲突、更方便修改

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```javascript
// store.js
import { createStore } from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = createStore({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015(ES6) 风格的计算属性命名功能(对象的变量属性)
    // 来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // 修改 state
    }
  }
})
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

###### 4.Action通过：action: {} 里面添加方法调用mutations里面的方法

```javascript
const store = createStore({
  // 定义共享状态
  state: {
    count: 0
  },
  // 修改状态
  mutations: {
    // 页面内通过：this.$store.commit('increment', data参数)，普通风格
    // 或this.$store.commit({ type: 'increment', amount: 10 }),对象风格触发
    increment (state, data) {
      state.count++
      // state.count += data.amount // data参数的使用：两种风格都是这样使用
    }
  },
  // 异步修改状态的方法(异步修改状态)
  actions: {
    // 页面内通过：this.$store.dispatch('increment', data参数)，普通风格
    // 或this.$store.dispatch({ type: 'increment', amount: 10 }),对象风格触发
    increment (context) {
      // 异步提交到mutations的方法
      context.commit('increment')
    }
    // ** new Promise组合 Action
    // 页面中可以：this.$store.dispatch('actionA').then(() => {...})，调用
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      }
    )
  }
  }
})
```

###### 3.1 ```mapMutations```辅助函数：在组件中提交 Mutation--第二种调用状态管理Mutation里的修改的方法

```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    // 
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),

    // 调用另一个名字
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

###### 4.1 ```mapActions```辅助函数：在组件中分发<mark>Action</mark>--第二种调用状态管理action里的异步修改的方法

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      // 将 `this.increment()`方法 映射为 `this.$store.dispatch('increment')`
      'increment', 

      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)`方法 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy' 
    ]),
    
    // 调用另一个名字
    ...mapActions({
      // 将 `this.add()`方法 映射为 `this.$store.dispatch('increment')`
      add: 'increment' 
    })
  }
}
```

###### 4.2.通过：vue的Devtools浏览器调试插件可以看到mutations的方法的调用情况和结果

###### 5.通过：Module来将store分割成模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: () => ({ ... }), // state的第二种写法：回调函数
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  // 命名空间的模块:当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
  namespaced: true,
  // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  state: () => ({ ... }),
  getters: {
    isAdmin () { ... } // 命名空间调用-> getters['moduleB/isAdmin']
    // 在这个模块的 getter 中，`getters` 被局部化了
    // 你可以使用 getter 的第四个参数来调用 `rootGetters`
    someGetter (state, getters, rootState, rootGetters) {
      getters.someOtherGetter // -> 'moduleB/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
      rootGetters['bar/someOtherGetter'] // 调用其他命名空间的-> 'bar/someOtherGetter'
    },
  },
  mutations: {
    login () { ... } // 命名空间调用-> commit('moduleB/login')
  },
  actions: {
    login () { ... } // 命名空间调用-> dispatch('moduleB/login')
  }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



#### 需要缓存的状态数据

1.为了不需要多次请求tab里的数据，减轻服务器压力。可以使用vuex的actions异步提交mutations把请求的数据缓存起来，在对应页面的时候，先判断是否有缓存数据，如果有，直接使用，没有再去请求

2.登录的信息，需要用到的登录用户的信息，后期要用这些参数来请求相关接口



#### Vuex实现原理

Vuex的原理关键：使用Vue实例管理状态

###### Vuex装载分析

这个问题实际就是问到Vuex的store是如何装载到组件中的，首先利用了Vue的插件机制使用Vue.use(Vuex)来去安装Vuex插件，那么此时会调用vuex的install方法，当调用install时此时会利用mixin机制在beforeCreate阶段去执行vuexInit。核心源码如下：

```js
Vue.mixin({ beforeCreate: vuexInit });
```

我们可以发现在beforeCreate阶段调用了vuexInit方法，我们分析一下vuexInit方法。

```js
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
```

分析如上代码：

将初始化Vue根组件时传入的store设置到this对象的$store属性上，子组件从其父组件引用$store属性，层层嵌套进行设置。

在任意组件中执行 this.$store 都能找到装载的那个store对象。

###### Vuex中的state与getter

vuex的Store 会划分出 state 和 getters 两个数据区。getter是从store的state中派生出的状态。那么首先我们先看我们是如何访问state的？

```js
  get state () {
    return this._vm._data.$$state
  }
```

当我们使用this.$store.state.xxx去获取xxx属性时，实际获取的是store挂载到_vm中store._vm.data.$$state中的数据。

---
state是如何挂载上去的？我们在Store constructor找到了核心函数resetStoreVM，观察resetStoreVM的核心代码，其主要做的事情是初始化了一个vue实例_vm，由于vue的data是响应式的，所以，$$state也是响应式的，那么当我们 在一个组件实例中 对state.xxx进行 更新时，基于vue的data的响应式机制，所有相关组件的state.xxx的值都会自动更新，视图自然也会自动更新，核心代码如下：

```js
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
```

上面所介绍的是state，那么接下来我们介绍一下getter，其核心源码也是在  
resetStoreVM中，核心源码如下：

```js
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })
```

until.js的部分源码如下：

```js
/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}
```

对wrappedGetters 进行处理，让getter 存储至computed对象上，对getter对象的属性进行数据劫持，当触发get时，返回`store._vm[key]`，最后将computed挂载到vue实例上，当做计算属性。

```js
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
```

---

Vuex原理讲解

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vuex原理解析</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
</head>
<body>
  <div id="root1">{{data1}}</div>
  <div id="root2">{{data2}}</div>
  <div id="root3">
    <button @click="change">change</button>
  </div>

  <script>
    // 注册vue插件
    function registerPlugin(Vue) {
      const vuex = {}
      vuex._vm = new Vue({
        data:{
          message: 'hello vue.js'
        },
      })
      // vuex赋值
      vuex.state = vuex._vm
      vuex.mutations = {
        setMessage(value) {
          vuex.state.message = value
        }
      }
    
      // 初始化
      function init() {
        this.$store = vuex
      }
      // 所有的vue实例beforeCreate时都调用init方法
      Vue.mixin({
        beforeCreate: init
      })
    }

    // 使用插件
    Vue.use(registerPlugin)

    // Vue实例化例子
    new Vue({
      el: '#root1',
      computed: {
        data1() {
          return this.$store.state.message
        }
      }
    })
    new Vue({
      el: '#root2',
      computed: {
        data2() {
          return this.$store.state.message
        }
      }
    })
    new Vue({
      el: '#root3',
      methods: {
        change() {
          const newValue = this.$store.state.message + '.'
          this.$store.mutations.setMessage(newValue)
        }
      }
    })
  </script>
</body>
</html>
```

---

#### 总结

- vuex利用了vue的mixin机制，混合 beforeCreate 钩子 将store注入至vue组件实例上，并注册了 vuex store的引用属性 $store。

- vuex的state是借助vue的响应式data实现的。getter是借助vue的计算属性computed特性实现的。
  
