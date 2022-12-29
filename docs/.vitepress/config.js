import socialLinks from "./socialLinks";
import nav from "./nav";
import algolia from "./algolia";
import sidebar from "./sidebar";

export default {
  lang: "zh", // 中文，英文设置en
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
  },
  // outDir: "../dist", // 打包输出的目录
  // titleTemplate: '牧涯前端学习笔记', // 标题后缀
  cleanUrls: "without-subfolders", // url设置
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
  themeConfig: {
    logo: "/img/buding.svg",
    siteTitle: "牧涯前端学习笔记", // 网站左上角标题
    outlineTitle: '⚡️内容大纲',


    // 右上角导航
    nav,
    // 右上角导航中显示带有图标的社交帐户链接
    socialLinks,
    // 展示 algolia 搜索框
    algolia,
    // *****左边侧栏导航*****
    sidebar,


    // 编辑
    editLink: {
      pattern: 'https://github.com/muyaCode/FrontEndLearnNotes/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdateText: '上次更新时间：',
    // 卡片广告
    carbonAds: {
      code: '卡片广告 code',
      placement: '卡片广告布置'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // 首页页脚配置。您可以添加消息和版权。仅当页面由于设计原因不包含边栏时，才会显示页脚。
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-MuYa'
    },
  },
};
