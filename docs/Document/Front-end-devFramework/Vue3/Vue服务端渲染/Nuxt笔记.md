# Nuxt笔记

## 1.页面配置

根目录app.vue文件标签：

- [NuxtPage](https://v3.nuxtjs.org/api/components/nuxt-page)：默认显示的**pages目录**的页面，首页为index.vue
  
  - ```js
    <!-- app.vue -->
    <template>
      <NuxtPage />
    </template>
    ```

- [NuxtLayout](https://v3.nuxtjs.org/api/components/nuxt-layout)：默认显示**layouts目录**的布局页面，默认页是：default.vue
  
  - ```js
    <!-- app.vue -->
    <template>
      <div>
        <NuxtLayout :name="layout">
          <NuxtPage />
        </NuxtLayout>
      </div>
    </template>
    <script setup>
    const layout = 'custom' // 指定layout为custom页，标签内使用 :name="layout"
    </script>
    ```

- [NuxtWelcome](https://v3.nuxtjs.org/api/components/nuxt-welcome)：默认的欢迎页面

## 2.页面路由

### pages里面的页面都会自动生成路由

可以是<mark>vue组件</mark>或者后缀名为``.vue```.js``.jsx``.ts``.tsx`的文件

### 路由跳转：

```js
<nav>
  <ul>
    <li><NuxtLink to="/">index</NuxtLink></li>
    <li><NuxtLink to="/about">About</NuxtLink></li>
    <li v-for="id in [1,2,3]">
      <NuxtLink :to="{path: `/posts/${id}`}">Post {{id}}</NuxtLink>
    </li>
    <li><NuxtLink to="/posts/1">click 1</NuxtLink></li>
    <li><NuxtLink to="/posts/2">click 2</NuxtLink></li>
    <li><button @click="$router.push('/about')">跳转about</button></li>
  </ul>
</nav>
```

### router和route

可以在script标签内通过useRouter()useRoute()和获得，或者在template标签内通过$router和$route获得

```js
<script setup lang='ts'>
  const router = useRouter()

  console.log('router', router)
  const route = useRoute()

  console.log('route.query', route.query)
  console.log('route.params', route.params)
</script>

<template>
  <div>
    ID：{{ $route.params.id }}
  </div>
  <div>
    posts-{{ $route.params.id }}
    {{$router.hasRoute}}
  </div>
</template>
```

### 编程式导航

`navigateTo()`和`navigate()`

**注意：**确保始终通过从函数返回来链接其结果。`await``navigateTo`

```js
<script setup>
const router = useRouter();
const name = ref('');
const type = ref(1);

function navigate(){
  return navigateTo({
    path: '/search',
    query: {
      name: name.value,
      type: type.value
    }
  })
}
</script>
```

### 页面或者组件切换过渡动画配置

文档：[过渡 ·努克斯特 (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/transitions#page-transitions)

1.为所有页面设置过渡：

2.为页面设置不同的过渡：

3.为布局设置过渡：[Transitions · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/transitions#layout-transitions)

4.禁用特定页面的过：[Transitions · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/transitions#disable-transitions)

5.高度动态和自定义的过渡：[Transitions · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/transitions#javascript-hooks)

6.使用 NuxtPage 进行过渡：[Transitions · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/transitions#transition-with-nuxtpage)

```js
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
```

app.vue文件设置动画

```html
<template>
  <NuxtPage />
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
```

## 3.middleware文件夹：中间件的使用(路由前置守卫)

nuxt.config.ts：是路由的全局守卫

1.定义中间件：middleware\auth.ts

```js
// auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('auth')
})
```

2.页面内使用中间件：

```js
<script setup>
definePageMeta({
  middleware: ["auth"] // 中间件文件名字
  // or middleware: 'auth'
})
</script>
```

3.动态添加或重写中间件：

可以使用辅助函数手动添加全局或命名路由中间件，下例是在插件目录中定义中间件：

```js
// plugins/mideleware.ts
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-test', 
    () => {
      console.log('this global middleware was added in a plugin and will be run on every route change')
    }, 
    { global: true }
  )

  addRouteMiddleware('named-test', 
    () => {
      console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
    }
  )
})
```

调用也和上面的一样

## 4.Meta等标签的SEO优化相关

文档：[SEO and Meta · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/seo-meta#components)

useHead的标签组件：<https://v3.nuxtjs.org/getting-started/seo-meta#components>

useHead的属性类型和作用：<https://v3.nuxtjs.org/api/composables/use-head>

SEO标签总结1：<https://www.cnblogs.com/colorful-paopao1/p/10189962.html>

SEO标签总结2：<https://www.cnblogs.com/hellowzd/p/6177836.html>

```js
<script setup lang='ts'>
  useHead({
    // 网站标题（title）：
    // 一般设置3~5个关键词+一个品牌词，关键词要与网站定位相关，同时包含核心业务。当然，最好还要结合用户的搜索习惯。
    title: '导航首页', // 当前页面标题
    // 标题模板
    titleTemplate: (title) => {
      return title ? `${title} - 前端|后端|学习|导航|前端导航|后端导航|前端库导航|前端学习导航` : '前端|后端|学习|导航|前端导航|后端导航|前端库导航|前端学习导航'
    },
    meta: [
      // 网站描述（description）：
      // 主要是网站介绍的内容，可以适当包含title中的关键词，字数一般控制在70左右。正确填写网站描述，除了可提升网站业务相关性外，还能够增强网站关键词的匹配度，有利于网站关键词排名。
      { name:'description', content: '好用的前端后端开发者的导航网站，包含前端的学习资料，练习项目，面试题库，后端各种库的导航和学习资料' },
      // 网站关键词（keyword）：
      // 设置关键词标签更多是辅助的作用，而且不会展示在搜索结果中，提炼时候可以重复title的内容。相对来说也没有标题和描述那么重要，但按照规范填写肯定更好。
      { name:'keyword', content: '前端|后端|学习|导航|前端导航|后端导航|前端库导航|前端学习导航' },
    ],
    script: [
      { children: 'console.log(\'Hello word\')' }
    ]
  })
</script>

<template>
  <div>
    <img src="/img/qr.jpg" alt="二维码图片2" />
  </div>
</template>

<style scoped lang="scss">

</style>
```

与上列标签对应的组件

```bash
<Title>
<Base>
<Script>
<NoScript>
<Style>
<Meta>
<Link>
<Body>
<Html>
<Head>
```

## 5.自定义hook函数

**composables 目录下定义文件，默认情况下不可再有文件夹，因为Nuxt默认只扫描该目录下的顶层的文件**

[Composables · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/composables#how-files-are-scanned)

### 定义

```js
// composables/useFoo.ts

// 使用命名导出
export const useFoo = () => {
  return useState('foo', () => 'bar')
}
// 使用默认导出
// export default function () {
//   return useState('foo', () => 'bar')
// }
```

##### 页面内使用：定义的方法会自动导入，可在`.js``.ts``.vue`文件中使用

```html
<template>
  <div>
    {{ foo }}
  </div>
</template>

<script setup>
const foo = useFoo() // 使用
</script>
工具
```

##### 工具函数嵌套组合使用

```js
// composables/test.ts
export const useFoo = () => {
  const nuxtApp = useNuxtApp()
  const bar = useBar()
}
```

##### 访问插件

```js
// composables/test.ts
export const useHello = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$hello
}
```

## 6.server服务器目录

文档：[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#server-directory)

---

Nuxt 会自动扫描 、 和目录中的文件，以使用 HMR 支持注册 API 和服务器处理程序。

### `~/server/api`：服务器API接口目录

#### 6.1.在根目录下位置创建文件夹下的新文件：`server/api/hello.ts`

```js
export default defineEventHandler((event) => {
  console.log('hello event',event.context)
  return {
    data: 'hello word'
  }
})
```

1.2.页面中调用此API：

```js
await $fetch('/api/hello')
```

1.3浏览器中访问：

```bash
http://localhost:3000/api/hello
```

#### 6.2.匹配路由参数的API接口

新建目录下的文件：`~/server/api/user/[name].ts`

```js
export default defineEventHandler((event) => 
  `Hello, ${event.context.params.name}!`
)
```

6.2.1页面内调用：

```js
// user后面的/nuxt就是返回来的：event.context.params.name
const nuxt = await $fetch('/api/user/nuxt')
```

#### 6.3.匹配HTTP方法：四种方法：.get、.post、.put、.delete

api名.方法名.ts，例子：test.post.ts、test.get.ts

如果不写方法名，默认是get方法

```js
// server/api/test.get.ts
export default defineEventHandler(() => 'Test get handler')
```

```js
// server/api/test.post.ts
export default defineEventHandler(() => 'Test post handler')
```

#### 6.4.包罗万象：捕获所有路由有助于回退路由处理

###### 6.4.1 与任何路由处理程序不匹配的  所有请求注册一个 catch-all 错误捕捉

`~/server/api/foo/[...].ts`：catch-all 错误捕捉

```js
export default defineEventHandler(() => `Default foo handler`)
```

请求一个foo下不存在的接口：便会默认请求到上面的接口

```js
http://localhost:3000/api/foo/dd
```

#### 6.5.处理请求：使用实例

###### 6.5.1 使用readBody正文处理请求

```js
// server/api/submit.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return { body }
})
```

页面内 调用此 API：
`$fetch('/api/submit', { method: 'post', body: { test: 123 } })`

###### 6.5.2 使用getQuery查询参数处理请求

```js
// server/api/query.get.ts
export default defineEventHandler((event) => {
  const query = getQuery(event)
  return { a: query.param1, b: query.param2 }
})
```

浏览器页面参数示例查询：`/api/query?param1=a&param2=b`

###### 6.5.3 访问请求cookies

```js
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)
  return { cookies }
})
```

###### 6. 5.4访问运行时配置：useRuntimeConfig()

```js
// server/api/foo.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return { key: config.KEY }
})
```

#### 6.6.高级用法示例

###### 6.6.1 `nitro`的`nuxt.config`配置

[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#nitro-configuration)

###### 6.6.2 使用嵌套路由：server/api/hello.ts

```js
import { createRouter } from 'h3'

const router = createRouter()

router.get('/', () => 'Hello World')

export default router
```

###### 6.6.3 发送流

**注意：**这是一项实验性功能，仅在 Node.js 环境中可用。

```js
// server/api/foo.get.ts
import fs from 'node:fs'
import { sendStream } from 'h3'

export default defineEventHandler((event) => {
  return sendStream(event, fs.createReadStream('/path/to/file'))
})
```

###### 6.6.4 返回旧版处理程序或中间件

[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#return-a-legacy-handler-or-middleware)

###### 6.6.5 服务存储

**6.6.5.1 使用Redis存储：nuxt.config.ts文件设置**

```js
export default defineNuxtConfig({
  nitro: {
    storage: {
      'redis': {
        driver: 'redis', // 使用Redis存储
        /* redis connector options */
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 0 // Defaults to 0
      }
    }
  }
})
```

**6.6.5.2 服务器接口使用Redis存储：**

接口使用:

```js
// server/api/test.post.ts：post接口使用
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await useStorage().setItem('redis:test', body)
  return 'Data is set'
})
```

```js
// server/api/test.get.ts：get接口使用
export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem('redis:test')
  return data
})
```

页面调用接口：

```html
<template>
  <div>
    <div>Post state: {{ resDataSuccess }}</div>
    <div>Get Data: {{ resData.text }}</div>
  </div>
</template>

<script setup lang="ts">
  const { data: resDataSuccess } = await useFetch('/api/test', {
      method: 'post',
      body: { text: 'Nuxt is Awesome!' }
  })
  const { data: resData } = await useFetch('/api/test')
</script>
```

---

### `~/server/routes`：服务器路由目录

在根目录下新建文件夹下的文件：server\routes\hello.ts

```js
export default defineEventHandler(() => 'Hello World!')
```

浏览器中访问：

```js
http://localhost:3000/hello
```

---

### `~/server/middleware`：服务中间件目录

中间件处理程序将在任何其他服务器路由之前在每个请求上运行，用于添加或检查标头、记录请求或扩展事件的请求对象。

中间件处理程序不应返回任何内容（也不关闭或响应请求），而应仅检查或扩展请求上下文或引发错误。

服务器/中间件/日志

```js
export default defineEventHandler((event) => {
  console.log('New request: ' + event.req.url)
})
```

服务器/中间件/身份验证

```js
export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
})
```

---

### `~/server/plugins`：服务器插件目录

Nuxt将自动读取目录中的任何文件，并将它们注册为Nitro插件。这允许扩展 Nitro 的运行时行为并挂钩到生命周期事件中。

在根目录下位置创建文件夹下的新文件：`server/plugins/nitroPlugin.ts`

```js
export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)
})
```

---

### `~/server/utils`：服务器公共工具程序目录

```js

```

---

## 7.使用UI组件库

##### 官方教程：node_modules组件安装路径里添加nuxt.js文件，里面写入配置

官方文档：[Components · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/components#library-authors)

中文文档：[components | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/directory-structure/components.html#%E5%BA%93%E4%BD%9C%E8%80%85)

##### 2.在plugins目录下：用插件形式 使用UI组件库：

1. 安装所需的插件：
   
   ```bash
   yarn add --dev vue-gtag-next
   ```

2. 创建一个插件文件`plugins/vue-gtag.client.js`
   
   ```js
   import VueGtag from 'vue-gtag-next'
   
   export default defineNuxtPlugin((nuxtApp) => {
   nuxtApp.vueApp.use(VueGtag, {
     property: {
       id: 'GA_MEASUREMENT_ID'
     }
   })
   })
   ```

##### 3. ElementPlus 引入：

官方文档：[快速开始 | Element Plus (gitee.io)](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E4%BD%BF%E7%94%A8-nuxt-js)

##### 4.NaiveUI引入：

官网：[Naive UI: 一个 Vue 3 组件库](https://www.naiveui.com/)

[服务端渲染 Server-Sider Rendering - Naive UI](https://www.naiveui.com/zh-CN/os-theme/docs/ssr)

[课时3.引入NaiveUI和基本使用_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zt4y187EV?p=3&spm_id_from=pageDriver&vd_source=5f0c99b3deddffe219938763769b15ac) 

## 8.Nuxt3生命周期钩子

Nuxt3生命周期钩子列表文档：[Lifecycle Hooks · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/guide/going-further/hooks#lifecycle-hooks)

生命周期钩子函数的用法：[Lifecycle Hooks · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/guide/going-further/hooks)

## 9.plugins：Nuxt插件目录

1.文档：[Plugins · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/plugins)

2.中文文档：[插件 plugins | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/directory-structure/plugins.html#%E6%8F%92%E4%BB%B6%E7%9B%AE%E5%BD%95)

3.通过生命周期钩子来写插件，生命周期钩子文档：[Lifecycle Hooks · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/guide/going-further/hooks#lifecycle-hooks)

4.生命周期钩子函数的用法：[Lifecycle Hooks · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/guide/going-further/hooks)

### 全局loading插件例子

```js
// plugins\loading.ts
// 1.导入相关的组件api

// 2.生命周期中判断: 未开始，开始和完成 ，或发生错误时使用
export default defineNuxtPlugin((NuxtApp) => {
  const loading = ref(null);

  NuxtApp.hook("app:mounted", (e) => {
    if(!loading.value) {
      // 运行加载组件
      // loading.value = 加载组件
    }
  })

  NuxtApp.hook("page:start", (e) => {
    // loading.value?.start() // 开始loading加载
  })

  NuxtApp.hook("page:finish", (e) => {
    // loading.value?.finish() // loading加载完成
  })

  NuxtApp.hook("app:error", (e) => {
    // 如果是在客户端
    if(process.client) {
      console.log("客户端app:error", e)
    }
    // 如果是在服务端
    if(process.server) {
      console.log("服务端app:error", e)
    }
  })
})
```

## 10.全局的错误处理

文档：[Error handling · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/error-handling)

## 11.自定义全局错误页面

文档：[Error handling · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/error-handling#rendering-an-error-page)

1.在根目录新建文件：error.vue文件

```html
<template>
  <div>
    <div>发生了错误！！！</div>
    <button @click="handleError">返回首页</button>  
  </div>
</template>
<script setup lang="ts">
  const handleError = () => clearError({ redirect: "/" })
</script>
```

完成后重新启动项目

## 12.通过插件实现：全局loading组件

1.nuxt自带的路由跳转 全局顶部loading加载组件： [· Nuxt Components (nuxtjs.org)](https://v3.nuxtjs.org/api/components/nuxt-loading-indicator)

```html
<!-- app.vue文件 -->
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#FF0000" height="3" duration="2000" throttle="200" /> <!-- 在页面导航上显示进度条 -->
      <NuxtPage /> <!-- 路由出口 -->
    </NuxtLayout>
  </div>
</template>
```

2.自定义插件全局loading组件：看[8.plugins：Nuxt插件目录：全局loading插件例子](#8pluginsnuxt插件目录)↑

## 13.全局化配置

主题、命名空间、继承主题、语言配置、使用操作系统主题、禁用 inline 主题

以NaiveUI的全局化配置为例：[全局化配置 Config Provider - Naive UI](https://www.naiveui.com/zh-CN/light/components/config-provider)

教程：[课时8.主布局实现_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zt4y187EV/?p=8&spm_id_from=pageDriver&vd_source=5f0c99b3deddffe219938763769b15ac)

## 14.数据交互

官网文档：[Data Fetching · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/data-fetching)

中文文档：[获取数据 | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/usage/data-fetching.html)

`Nuxt3`提供了 4 种方式使得你可以在服务器端异步获取数据

- useAsyncData
- useLazyAsyncData （useAsyncData+lazy:true）
- useFetch
- useLazyFetch （useFetch+lazy:true）

> 注意：他们只能在**`setup`**或者是`生命周期钩子`中使用

## 15.状态管理

文档：[State Management · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/state-management)

## 16.运行时配置

文档：[Runtime Config · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/guide/going-further/runtime-config)

##### 1 公开的运行时配置

第二种方法看中文网文档：[运行时配置 Runtime Config | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/usage/runtime-config.html#%E5%85%AC%E5%BC%80%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE-exposing-runtime-config)

nuxt.config.ts文件下配置runtimeConfig：

```js
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api'
    }
  }
})
```

**页面或服务器中使用（访问时运行）**

```js
const runtimeConfig = useRuntimeConfig()

console.log(runtimeConfig.apiSecret)
console.log(runtimeConfig.public.apiBase)
```

**Vue实例页面中直接访问配置**：使用上面选项 API 配置时，可通过 下面命令获得公共运行时配置

```js
this.$config.public
```

###### 环境变量

除了一些进程(process)环境变量之外，如果在项目的根目录中有一个 `.env` 文件，它将自动加载到 `process.env` 中，并且可以在 `nuxt.config` 文件和模块中访问。

.env文件：

```js
// .env
BASE_URL = https://nuxtjs.org
API_SECRET = api_secret_token
```

nuxt.config.ts文件下访问：

```js
export default defineNuxtConfig({
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  privateRuntimeConfig: {
    API_SECRET: process.env.API_SECRET,
  },
})
```

##### 2 访问运行时配置

[运行时配置 Runtime Config | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/usage/runtime-config.html#%E8%AE%BF%E9%97%AE%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE-accessing-runtime-config)

在 Nuxt 应用程序的 Vue 实例中，需要调用 `useRuntimeConfig()` 来访问运行时配置。

Vue实例中访问：

```js
<script setup>
const config = useRuntimeConfig()
</script>
```

插件中访问：

```js
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  console.log('API base URL:', config.public.apiBase)
});
```

服务器路由中访问：

```js
export default async () => {
  const result = await $fetch('https://my.api.com/test', {
    headers: {
      Authorization: `Bearer ${useRuntimeConfig().apiSecret}`
    }
  })
  return result
}
```

手动输入运行是配置：

```js
declare module '@nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
    public: {
      apiBase: string
    }
  }
}
// 确保在扩充类型时 import/export 某
export {}
```

```js
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    testConfig: string
  }
  interface PrivateRuntimeConfig {
    token: string
  }
}
// 确保在扩充类型时 import/export 某些比较重要的内容
export {}
```

## 

## 17.Nuxt3第三方模块

模块预览地址：[Explore Nuxt Modules (nuxtjs.org)](https://modules.nuxtjs.org/?version=3.x)

模块都是带有nuxt名字的库：可以点击进去，然后看文档在项目中安装使用.

在nuxt.config.js文件配置好模块后，模块都是和正常vue3项目的模块使用一样

@pinia/nuxt状态管理库的配合useState()使用：[【Nuxt3从入门到实战】第八啪：巧用社区“模块”，让开发超级高效，让Nuxt更加强大！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV15Q4y1v7ug/?spm_id_from=pageDriver&vd_source=5f0c99b3deddffe219938763769b15ac)

## 18.测试

文档：[Testing · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/testing)

## 19.编译

1.pnpm run build后：会在项目目录生成 .output 这个打包后的目录

2.运行pnpm run preview命令，预览打包后的项目。

## 20.项目部署

文档：[Deployment · Nuxt (nuxtjs.org)](https://v3.nuxtjs.org/getting-started/deployment)

中文文档：[Azure | Nuxt 3 - 中文文档 (nuxtjs.org.cn)](https://www.nuxtjs.org.cn/deployment/azure.html#azure-functions)

在nuxt项目中的server目录中：index.ts 做反向代理，

## 21.Nuxt缺点

1.Nuxt的server的服务器端存在缺点：

- 没有数据校验：如何去校验前端传来的数据

- 缺少必要的orm：对象与关系数据库之间的桥梁

###### 建议使用 服务端渲染 + 其他后端语言作服务器接口 来结合 开发：CSR + SSR 相结合
