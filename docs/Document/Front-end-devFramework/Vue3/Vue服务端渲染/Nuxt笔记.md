# Nuxt笔记

## 1.页面配置

根目录app.vue文件标签：

- [NuxtPage](https://v3.nuxtjs.org/api/components/nuxt-page)：默认显示的pages目录的页面，首页为index.vue
  - ```js
    <!-- app.vue -->
    <template>
      <NuxtPage />
    </template>
    ```
- [NuxtLayout](https://v3.nuxtjs.org/api/components/nuxt-layout)：默认显示layouts目录的布局，默认页是default.vue；可以包裹住
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

### router和route：

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

### 编程式导航：

`navigateTo()``navigate()`

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

---

## 3.SEO标签优化相关：

```js
<script setup lang='ts'>
  // useHead的标签组件：https://v3.nuxtjs.org/getting-started/seo-meta#components
  // useHead的属性类型和作用：https://v3.nuxtjs.org/api/composables/use-head
  // SEO标签总结：https://www.cnblogs.com/colorful-paopao1/p/10189962.html、https://www.cnblogs.com/hellowzd/p/6177836.html
  useHead({
    /*  网站标题（title）：
    * 一般设置3~5个关键词+一个品牌词，关键词要与网站定位相关，同时包含核心业务。当然，最好还要结合用户的搜索习惯。
    */
    title: '导航首页', // 当前页面标题
    // 标题模板
    titleTemplate: (title) => {
      return title ? `${title} - 前端|后端|学习|导航|前端导航|后端导航|前端库导航|前端学习导航` : '前端|后端|学习|导航|前端导航|后端导航|前端库导航|前端学习导航'
    },
    meta: [
      /* 网站描述（description）：
      * 主要是网站介绍的内容，可以适当包含title中的关键词，字数一般控制在70左右。正确填写网站描述，除了可提升网站业务相关性外，还能够增强网站关键词的匹配度，有利于网站关键词排名。
      */
      { name:'description', content: '好用的前端后端开发者的导航网站，包含前端的学习资料，练习项目，面试题库，后端各种库的导航和学习资料' },
      /* 网站关键词（keyword）：
      * 设置关键词标签更多是辅助的作用，而且不会展示在搜索结果中，提炼时候可以重复title的内容。相对来说也没有标题和描述那么重要，但按照规范填写肯定更好。
      */
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

## 4.middleware文件夹中间件的使用

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

---

## 5.自定义hook函数：

###### composables 目录下定义文件，默认情况下不可再有文件夹，因为Nuxt默认只扫描该目录下的顶层的文件

[Composables · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/composables#how-files-are-scanned)



##### 定义

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

##### 页面内使用：方法会自动导入，可在`.js``.ts``.vue`文件中使用：

```html
<template>
  <div>
    {{ foo }}
  </div>
</template>

<script setup>
const foo = useFoo()
</script>
工具
```

##### 工具函数嵌套组合使用：

```js
// composables/test.ts
export const useFoo = () => {
  const nuxtApp = useNuxtApp()
  const bar = useBar()
}
```

##### 访问插件：

```js
// composables/test.ts
export const useHello = () => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$hello
}
```





---

## 6.server服务器目录

文档：[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#server-directory)

---

Nuxt 会自动扫描 、 和目录中的文件，以使用 HMR 支持注册 API 和服务器处理程序。

### `~/server/api`：服务器API接口目录

#### 1.在根目录下位置创建文件夹下的新文件：`server/api/hello.ts`

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

#### 2.匹配路由参数的API接口：

新建目录下的文件：`~/server/api/user/[name].ts`

```js
export default defineEventHandler((event) => 
  `Hello, ${event.context.params.name}!`
)
```

2.1页面内调用：

```js
// user后面的/nuxt就是返回来的：event.context.params.name
const nuxt = await $fetch('/api/user/nuxt')
```

#### 3.匹配HTTP方法：四种方法：.get、.post、.put、.delete

api名.方法名.ts，例子：test.post.ts、test.get.ts

```js
// server/api/test.get.ts
export default defineEventHandler(() => 'Test get handler')
```

```js
// server/api/test.post.ts
export default defineEventHandler(() => 'Test post handler')
```

#### 4.包罗万象：捕获所有路由有助于回退路由处理

###### 4.1 与任何路由处理程序不匹配的所有请求注册一个 catch-all 错误捕捉路由

`~/server/api/foo/[...].ts`：catch-all 错误捕捉路由

```js
export default defineEventHandler(() => `Default foo handler`)
```

#### 5.处理请求：使用实例

###### 5.1 使用readBody正文处理请求

```js
// server/api/submit.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return { body }
})
```

页面内 调用此 API：
`$fetch('/api/submit', { method: 'post', body: { test: 123 } })`

###### 5.2 使用getQuery查询参数处理请求：

```js
// server/api/query.get.ts
export default defineEventHandler((event) => {
  const query = getQuery(event)
  return { a: query.param1, b: query.param2 }
})
```

浏览器页面参数示例查询：`/api/query?param1=a&param2=b`

###### 5.3 访问运行时配置：useRuntimeConfig()

```js
// server/api/foo.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return { key: config.KEY }
})
```

###### 5.4 访问请求cookies：

```js
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)
  return { cookies }
})
```

#### 6.高级用法示例：

###### 6.1 `nitro`的`nuxt.config`配置

[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#nitro-configuration)

###### 6.2 使用嵌套路由：server/api/hello.ts

```js
import { createRouter } from 'h3'

const router = createRouter()

router.get('/', () => 'Hello World')

export default router
```

###### 6.3 发送流：

**注意：**这是一项实验性功能，仅在 Node.js 环境中可用。

```js
// server/api/foo.get.ts
import fs from 'node:fs'
import { sendStream } from 'h3'

export default defineEventHandler((event) => {
  return sendStream(event, fs.createReadStream('/path/to/file'))
})
```

###### 6.4 返回旧版处理程序或中间件

[Server · Nuxt Directory Structure (nuxtjs.org)](https://v3.nuxtjs.org/guide/directory-structure/server#return-a-legacy-handler-or-middleware)

###### 6.5 服务存储

###### 6.5.1 使用Redis存储：nuxt.config.ts文件设置

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

###### 6.5.2 服务器接口使用Redis存储：

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

浏览器中访问：`http://localhost:3000/hello`路径

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

## 7.自定义错误页面：404错误...

1.在根目录新建文件：error.vue文件

```html
<template>
  <div>
    <div>404</div>
    <button @click="handleError">返回首页</button>  
  </div>
</template>
<script setup lang="ts">
  const handleError = () => clearError({ redirect: "/" })
</script>
```

完成后重新启动项目

---

## 8.读取运行时配置文件



---

## 9.Nuxt缺点
