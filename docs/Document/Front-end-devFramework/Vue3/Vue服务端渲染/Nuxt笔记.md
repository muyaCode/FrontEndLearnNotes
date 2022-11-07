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

## 4.
