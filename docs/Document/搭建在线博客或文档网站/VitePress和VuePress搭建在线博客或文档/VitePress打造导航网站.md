# VitePress打造导航网站

参考：[使用 VitePress 打造个人前端导航网站 · Issue #38 · maomao1996/daily-notes (github.com)](https://github.com/maomao1996/daily-notes/issues/38)

## 分析需求

首先，这个前端导航页只是博客中的一个模块，所以需要满足下面这些功能

### 布局

- 导航栏
- 页脚
- 本页目录（用于快速跳转）

### 导航内容的UI样式应与整站的界面风格一致

- 站点图标
- 站点名称
- 站点描述
- 站点链接

### 支持主题切换（`VitePress` 自带了主题功能）

## 页面布局

基于就地取材，我们先来分析下 `VitePress` 提供的四种布局配置

- layout: doc
  文档布局（默认）

  - 解析 `Markdown` 内置 `VitePress` 提供的所有样式
  - 具有侧边栏、导航栏、页脚、本页目录

- layout: page

  页面布局

  - 解析 `Markdown` 但不会获得任何默认样式
  - 具有侧边栏、导航栏、页脚

- layout: home

  首页布局

  - 解析 `Markdown` 但不会获得任何默认样式
  - 具有侧边栏、导航栏、页脚
  - 支持 `hero` 和 `features`

- layout: false

  无布局（纯空白页）

  - 解析 `Markdown` 但不会获得任何默认样式

综上考虑，我们选取 `layout: doc` 来开发

### 修改 `VitePress` 主题

> 因为 `layout: doc` 主要是提供给文档使用的，其页面宽度有限，同时为了更好的样式隔离，为其添加一个 `layoutClass` 方便我们更好的去自定义样式

在 `docs/.vitepress/theme` 目录下新建 `index.ts` 文件

```ts
import { h, App } from 'vue'
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'

export default Object.assign({}, Theme, {
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(Theme.Layout, props)
  }
})
```



### 添加页面和样式

在 `docs/nav` 目录下新建 `index.md`

> [frontmatter](https://vitepress.vuejs.org/config/frontmatter-config) 用于配置页面信息，也可以添加一些自定义信息

```md
---
layout: doc
layoutClass: m-nav-layout
---

<style src="./index.scss"></style>

# 前端导航
```



在 `docs/nav` 目录下新建 `index.scss`

`VitePress` 的所有样式都是基于 `CSS` 变量来编写，所以在扩展时很方便，同时因为 `CSS` 变量具有作用域，我们只需要在自定义的 `layoutClass` 下去修改，这样也不会影响其他页面

```scss
.m-nav-layout {
  /* 覆盖全局的 vp-layout-max-width（仅当前页面使用） */
  --vp-layout-max-width: 1660px;

  /* 修改 layout 最大宽度 */
  .container {
    max-width: var(--vp-layout-max-width) !important;
  }
  .content-container,
  .content {
    max-width: 100% !important;
  }
}
```



## 编写导航内容组件

为了让这个导航网站与整个站点风格相符，我选择了首页的 `features` 作为参考并进行了改造。

在 `docs/nav/components` 目录下新建 `type.ts`

```ts
export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc?: string
  /** 站点链接 */
  link: string
}
```



在 `docs/nav/components` 目录下新建 `MNavLink.vue`

```vue
<script setup lang="ts">
import { computed } from 'vue'

import { NavLink } from './type'

const props = defineProps<{
  icon?: NavLink['icon']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box">
      <div class="box-header">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img :src="icon" :alt="title" onerror="this.parentElement.style.display='none'" />
        </div>
        <h6 v-if="title" class="title">{{ title }}</h6>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--vp-c-bg-soft);
  }

  .box {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 100%;
    color: var(--vp-c-text-1);
    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 6px;
    width: 48px;
    height: 48px;
    font-size: 24px;
    background-color: var(--vp-c-mute);
    transition: background-color 0.25s;
    :deep(svg) {
      width: 24px;
      fill: currentColor;
    }
    :deep(img) {
      border-radius: 4px;
      width: 24px;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: 10px 0 0;
    line-height: 20px;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    .box {
      padding: 8px;
    }
    .icon {
      width: 40px;
      height: 40px;
    }
    .title {
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
```



在 `docs/nav/components` 目录下新建 `MNavLinks.vue`

```vue
<script setup lang="ts">
import MNavLink from './MNavLink.vue'
import type { NavLink } from './type'

defineProps<{
  title: string
  items: NavLink[]
}>()
</script>

<template>
  <div class="m-nav-links">
    <MNavLink
      v-for="{ icon, title, desc, link } in items"
      :key="link"
      :icon="icon"
      :title="title"
      :desc="desc"
      :link="link"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--gap);
  grid-column-gap: var(--gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --gap: 20px;
  }
}
</style>
```



### UI 对比

> 和首页的 `features` 进行对比

[![UI 对比](https://camo.githubusercontent.com/88a625299546b730cf25cbabaf3e4faedd52887025755af095f9d350f61695ae/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6e61762d6c696e6b2d312e706e67)](https://camo.githubusercontent.com/88a625299546b730cf25cbabaf3e4faedd52887025755af095f9d350f61695ae/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6e61762d6c696e6b2d312e706e67)
[![UI 对比](https://camo.githubusercontent.com/5791f23e9b30b04fb1de06ad7343add44863806e5374082f1156ec57cabb4498/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6e61762d6c696e6b2d322e706e67)](https://camo.githubusercontent.com/5791f23e9b30b04fb1de06ad7343add44863806e5374082f1156ec57cabb4498/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6e61762d6c696e6b2d322e706e67)

## 导航页面目录

### 方案探索过程

#### 1. 直接使用 `Markdown` 语法自动生成

```vue
---
layoutClass: m-nav-layout
---

<script setup>
import MNavLinks from './components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 前端导航

## 常用工具

<MNavLinks :items="[]"/>

## React 生态

<MNavLinks :items="[]"/>
```



这个方案实现简单，但使用时需要无脑 CV

#### 2. 自定义样式

在各种探索并翻阅了 `VitePress` 源码后发现，其页面目录是通过 `dom` 操作获取 `h2 - h6` 来生成的 —— [关键代码](https://github.com/vuejs/vitepress/blob/23f51350b3467a43437c373c13899536a5d8bdb6/src/client/theme-default/composables/outline.ts#L14)

```tsx
document.querySelectorAll<HTMLHeadingElement>('h2, h3, h4, h5, h6').forEach((el) => {
  if (el.textContent && el.id) {
    let title = el.textContent

    if (outlineBadges === false) {
      const clone = el.cloneNode(true) as HTMLElement
      for (const child of clone.querySelectorAll('.VPBadge')) {
        child.remove()
      }
      title = clone.textContent || ''
    }

    updatedHeaders.push({
      level: Number(el.tagName[1]),
      title: title.replace(/\s+#\s*$/, ''),
      link: `#${el.id}`
    })
  }
})
```



这样一来就简单很多了，我们只需将标题加入 `MNavLinks` 组件中，同时为了原汁原味，跟 `VitePress` 一样使用 `@mdit-vue/shared` 中的 `slugify` 方法对 `title` 进行格式化

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'

import MNavLink from './MNavLink.vue'
import type { NavLink } from './type'

const props = defineProps<{
  title: string
  items: NavLink[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})
</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true">#</a>
  </h2>
  <div class="m-nav-links">
    <MNavLink
      v-for="{ icon, title, desc, link } in items"
      :key="link"
      :icon="icon"
      :title="title"
      :desc="desc"
      :link="link"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--gap);
  grid-column-gap: var(--gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --gap: 20px;
  }
}
</style>
```



这样一来我们的前端导航页面就只需要维护一个数组来存储站点数据了

## 添加搜索和锚点定位

当我们站点的数据变得越来越多，寻找特定内容会变得困难，因此我们需要添加搜索功能。好在`VitePress` 自带了 Algolia 搜索，我们只需要适配一下即可（依然是就地取材）

### 1. 适配 Algolia 爬虫

Algolia 默认爬取的是 `.content` 下的 `h1 - h5, li, p`，而我们的 `MNavLink` 组件使用的是 `h6`，为了支持其爬取修改为 `h5` 即可

### 2. 添加锚点定位

修改 `MNavLink` 组件

```vue
<script setup lang="ts">
import { computed } from 'vue'
+ import { slugify } from '@mdit-vue/shared'

import { NavLink } from './type'

const props = defineProps<{
  icon?: NavLink['icon']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

+ const formatTitle = computed(() => {
+   if (!props.title) {
+     return ''
+   }
+   return slugify(props.title)
+ })

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box">
      <div class="box-header">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img :src="icon" :alt="title" onerror="this.parentElement.style.display='none'" />
        </div>
-         <h6 v-if="title" class="title">{{ title }}</h6>
+         <h5 v-if="title" :id="formatTitle" class="title">{{ title }}</h5>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>
```



### 3. 修改页面的 outline 配置项

```vue
---
layoutClass: m-nav-layout
+ outline: [2, 3, 4]
---
```



防止我们的站点标题被收录到页面目录下

[![页面目录](https://camo.githubusercontent.com/59415fd0c5f80d4f666a239b6b6458d845297b5278316ba63a5aa9aae7b0c3b2/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6f75746c696e652e706e67)](https://camo.githubusercontent.com/59415fd0c5f80d4f666a239b6b6458d845297b5278316ba63a5aa9aae7b0c3b2/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f6f75746c696e652e706e67)

## 最终效果展示

- [前端导航](https://fe-nav.netlify.app/nav/) 纯净模板展示（未添加 Algolia 搜索），代码已开源 [Github](https://github.com/maomao1996/vitepress-fe-nav)
- [前端导航 | 茂茂物语](https://notes.fe-mm.com/nav) 博客子模块展示（拥有完整功能）

[![最终效果展示](https://camo.githubusercontent.com/bff5cd267e6af9746af08eabba45b069cf74b61c1894eea23c81f67ae9e47d12/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f66652d6e61762d312e706e67)](https://camo.githubusercontent.com/bff5cd267e6af9746af08eabba45b069cf74b61c1894eea23c81f67ae9e47d12/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f66652d6e61762d312e706e67)
[![最终效果展示](https://camo.githubusercontent.com/2ae33363b1461e0a9533a2ff2838c46751aff5c39b6537dc89521728a3a732fb/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f66652d6e61762d322e706e67)](https://camo.githubusercontent.com/2ae33363b1461e0a9533a2ff2838c46751aff5c39b6537dc89521728a3a732fb/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d616f6d616f313939362f6461696c792d6e6f7465732f7374617469632f33382f66652d6e61762d322e706e67)

## 后续可能会添加的功能

- 支持隐藏标题、描述、`icon`
- 布局大小设置