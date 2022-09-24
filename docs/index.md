---
layout: home

title: 牧涯前端学习笔记
titleTemplate: 记录一些前端学习的知识

hero:
  name: 前端路线基础到进阶
  text: 后浪卷前浪
  tagline: 仅供学习
  # 首页右边Logo设置
  # image:
  #   src: /logo.png
  #   alt: logo
  actions:
    - theme: brand
      text: 查看笔记
      link: /order/study_guide
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/muyaCode/FrontEndLearningNotes

features:
  - icon: 💡
    title: HTML
    details: 基于vitePress构建
  - icon: 📦
    title: CSS
    details: 由浅入深
  - icon: 🛠️
    title: JavaScript
    details: JavaScript基础到进阶。
---

<!-- 文档：https://vitepress.vuejs.org/config/frontmatter-configs#layout -->
<!-- 表情：https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json -->

<style>
  /*首页标题 覆盖变量 自定义字体渐变样式*/
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  }
</style>

<!-- 团队成员显示 -->
<!-- <script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我们的团队
    </template>
    <template #lead>
      各个成员来着....
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage> -->
