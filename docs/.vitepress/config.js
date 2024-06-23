import { defineConfig } from "vitepress";
import config from "genji-theme-vitepress/config";

import socialLinks from "./config/socialLinks";
import nav from "./config/nav";
// import algolia from "./config/algolia";
import sidebar from "./config/sidebar";
import search from "./config/search";

// 配置文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 报错：SyntaxError: Invalid end tag.    会输出报错所在的目录：https://vitepress.dev/zh/reference/site-config#transformpagedata
  // async transformPageData(pageData, { siteConfig }) {
  //   pageData.contributors = await getPageContributors(pageData.relativePath)
  // },

  // 代码块运行插件文档：https://genji-md.dev/getting-started
  extends: config,

  lang: "zh", // 中文，英文设置en-US
  title: "牡涯前端学习笔记", // 浏览器标签标题
  description: "记录前端学习过的笔记",
  base: '/FrontEndLearnNotes/', // url默认前缀
  appearance: true, // 暗黑模式
  ignoreDeadLinks: true, // 不会因死链接而使构建失败
  lastUpdated: true, // 使用 git 提交获取时间戳，使默认主题能够显示页面的上次更新时间
  // markdown主题
  markdown: {
    // 主题选择：https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    // 主题预览：https://vscodethemes.com/
    // 添加自定义的主题(加载主题)：https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
    theme: "one-dark-pro",
    lineNumbers: true, // 显示代码行数
    // markdown-it-attrs 插件忽略
    attrs: {
      leftDelimiter: '[[',
      rightDelimiter: ']]'
    }
  },
  // outDir: "../dist", // 打包输出的目录
  // titleTemplate: '牧涯前端学习笔记', // 标题后缀
  cleanUrls: true, // url是否带.html后缀
  // 浏览器标签图标设置
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://avatars.githubusercontent.com/u/48587992?v=4'
      }
    ]
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  // ***** 主题设置 *****
  // 文档：https://vitepress.vuejs.org/config/theme-configs
  themeConfig: {
    logo: "/img/buding.svg",
    siteTitle: "牧涯前端学习笔记", // 网站左上角标题
    outlineTitle: '⚡️文档内容大纲', // 大纲标题
    outline: 'deep', // 大纲显示层级：number：只显示 | [number, number]：指定层级范围显示 | 'deep'：全部显示 | false：不显示

    // 使用浏览器内置索引进行模糊全文搜索
    search,
    
    // 使用 algolia 搜索框
    // search: {
    //   provider: 'algolia',
    //   options: algolia,
    // },
    // 右上角导航
    nav,
    // 右上角导航中显示带有图标的社交帐户链接
    socialLinks,
    // *****左边侧栏导航*****
    sidebar,


    // 编辑
    editLink: {
      pattern: 'https://github.com/muyaCode/FrontEndLearnNotes/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    // 自定义上次更新的文本和日期格式
    lastUpdated: {
      text: '上次更新：',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 右边文档大纲下面的-卡片广告
    // carbonAds: {
    //   code: '卡片广告 code',
    //   placement: '卡片广告布置'
    // },
    
    // 首页页脚配置。您可以添加消息和版权。仅当页面由于设计原因不包含边栏时，才会显示页脚。
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-2023  MuYa'
    },
  },
});
