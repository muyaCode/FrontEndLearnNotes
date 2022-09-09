# Pinia状态管理库的使用

### 基本特点

`Pinia`同样是一个Vue的状态管理工具，在`Vuex`的基础上提出了一些改进。与vuex相比，`Pinia` 最大的特点是：简便。

- 它没有`mutation`,他只有`state`，`getters`，`action`,在`action`中支持同步与异步方法来修改`state`数据
- 类型安全，与 `TypeScript` 一起使用时具有可靠的类型推断支持
- 模块化设计，通过构建多个存储模块，可以让程序自动拆分它们。
- 非常轻巧，只有大约 1kb 的大小。
- 不再有 `modules` 的嵌套结构,没有命名空间模块
- `Pinia` 支持扩展，可以非常方便地通过本地存储，事物等进行扩展。
- 支持服务器端渲染

### 安装与使用

#### 安装

```bash
yarn add pinia
# 或者使用 npm
npm install pinia
```

#### 核心概念：

##### `store`: 使用`defineStore()`函数定义一个store，第一个参数是应用程序中store的唯一id. 里面包含`state`、`getters` 和 `actions`, 与Vuex相比没有了`Mutations`.

```tsx
export const useStore = defineStore('main', {
 state: () => {
    return {
      name: 'ming',
      doubleCount: 2
    }
  },
  getters: {
    
  },
  actions: {
    
  }
})
```

> 注意：store 是一个用reactive 包裹的对象，这意味着不需要在getter 之后写.value，但是，就像setup 中的props 一样，我们不能对其进行解构.

```tsx
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    const { name, doubleCount } = store

    return {
      // 一直会是 "ming"
      name,
      // 一直会是 2
      doubleCount,
      // 这将是响应式的
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

当然你可以使用`computed`来响应式的获取state的值（这与Vuex中需要创建`computed`引用以保留其响应性类似）,但是我们通常的做法是使用`storeToRefs`响应式解构Store.

```tsx
const store = useStore()
// 正确的响应式解构
const { name, doubleCount } = storeToRefs(store)
```

##### `State`: 在Pinia中，状态被定义为返回初始状态的函数.

```tsx
import { defineStore } from 'pinia'

const useStore = defineStore('main', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo'
    }
  },
})
```

###### 组件中state的获取与修改：

在`Vuex`中我们修改`state`的值必须在`mutation`中定义方法进行修改，而在`pinia`中我们有多中修改state的方式.

- 基本方法：

```tsx
const store = useStore()
store.counter++
```

- 重置状态：

```tsx
const store = useStore()
store.$reset()
```

- 使用`$patch`修改state
  [1] 使用部分`state`对象进行修改

```tsx
const mainStore = useMainStore()
mainStore.$patch({
   name: '',
   counter: mainStore.counter++
 })
```

​ [2] `$patch`方法也可以接受一个函数来批量修改集合内部分对象的值

```tsx
cartStore.$patch((state) => {
  state.counter++
  state.name = 'test'
})
```

- 替换state
  可以通过将其 $state 属性设置为新对象,来替换`Store`的整个状态：

```tsx
mainStore.$state = { name: '', counter: 0 }
```

- 访问其他模块的`state`
  
  - `Vuex`中我们要访问其他带命名空间的模块的state我们需要使用`rootState`

```tsx
  addAsyncTabs ({ state, commit, rootState, rootGetters }:ActionContext<TabsState, RootState>, tab:ITab): void {
      /// 通过rootState 访问main的数据
      console.log('rootState.main.count=======', rootState.main.count)
      if (state.tabLists.some(item => item.id === tab.id)) { return }
      setTimeout(() => {
        state.tabLists.push(tab)
      }, 1000)
    },
```

- Pinia 中访问其他`store`的`state`

```tsx
    import { useInputStore } from './inputStore'

    export const useListStore = defineStore('listStore', {
      state: () => {
        return {
          itemList: [] as IItemDate[],
          counter: 0
        }
      },
      getters: {
      },
      actions: {
        addList (item: IItemDate) {
          this.itemList.push(item)
          ///获取store，直接调用
          const inputStore = useInputStore()
          inputStore.inputValue = ''
        }
    })
```

#### Getter: Getter完全等同于Store状态的计算值.

```tsx
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },
    // 返回类型必须明确设置
    doublePlusOne(): number {
      return this.counter * 2 + 1
    },
  },
})
```

> 如果需要使用`this`访问到 整个`store`的实例,在`TypeScript`需要定义返回类型.
> 在`setup()`中使用：

```tsx
export default {
  setup() {
    const store = useStore()

    store.counter = 3
    store.doubleCount // 6
  },
}
```

- 访问其他模块的getter
  
  - 对于`Vuex`而言如果要访问其他命名空间模块的`getter`，需要使用`rootGetters`属性

```tsx
    /// action 方法
    addAsyncTabs ({ state, commit, rootState, rootGetters }:ActionContext<TabsState, RootState>, tab:ITab): void {
      /// 通过rootGetters 访问main的数据
        console.log('rootGetters[]=======', rootGetters['main/getCount'])
      }
```

- `Pinia`中访问其他store中的getter

```tsx
    import { useOtherStore } from './other-store'

    export const useStore = defineStore('main', {
      state: () => ({
        // ...
      }),
      getters: {
        otherGetter(state) {
          const otherStore = useOtherStore()
          return state.localData + otherStore.data
        },
      },
    })
```

#### Action:actions 相当于组件中的methods,使用`defineStore()`中的 actions 属性定义.

```tsx
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```

> `pinia`中没有`mutation`属性，我们可以在`action`中定义业务逻辑，`action`可以是异步的，可以在其中await 任何 API调用甚至其他操作.

```tsx
...
//定义一个action
asyncAddCounter () {
  setTimeout(() => {
    this.counter++
  }, 1000)
}
...
///setup()中调用
export default defineComponent({
  setup() {
    const main = useMainStore()
    // Actions 像 methods 一样被调用：
    main.asyncAddCounter()
    return {}
  }
})
```

- 访问其他store中的Action
  
  要使用另一个 store中的action ，可以直接在操作内部使用它：

```tsx
  import { useAuthStore } from './auth-store'

  export const useSettingsStore = defineStore('settings', {
    state: () => ({
      // ...
    }),
    actions: {
      async fetchUserPreferences(preferences) {
        const auth = useAuthStore()
        ///调用其他store的action
        if (auth.isAuthenticated()) {
          this.preferences = await fetchPreferences()
        } else {
          throw new Error('User must be authenticated')
        }
      },
    },
  })
```

在`Vuex`中如果要调用另一个模块的`Action`，我们需要在当前模块中注册该方法为全局的`Action`，

```tsx
/// 注册全局Action
 globalSetCount: {
  root: true,/// 设置root 为true
    handler ({ commit }:ActionContext<MainState, RootState>, count:number):void {
       commit('setCount', count)
     }
    }
```

在另一个模块中对其进行`dispatch`调用

```tsx
/// 调用全局命名空间的函数
 handelGlobalAction ({ dispatch }:ActionContext<TabsState, RootState>):void {
   dispatch('globalSetCount', 100, { root: true })
 }
```

### 三. 总结

与 [Vuex](https://vuex.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%22%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F%22%EF%BC%9F) 相比，[Pinia](https://pinia.web3doc.top/core-concepts/) 提供了一个更简单的 API，具有更少的操作，提供`Composition API`，最重要的是，在与`TypeScript`一起使用时具有可靠的类型推断支持，如果你正在开发一个新项目并且使用了`TypeScript`，可以尝试一下`pinia`，相信不会让你失望。


