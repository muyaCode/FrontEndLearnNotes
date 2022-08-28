export default {
  // base:'/docs/', // url默认前缀
  lang: "zh",
  title: "牡涯前端学习笔记", // 浏览器标签标题
  description: "记录前端学习过的笔记",
  base: '/FrontEndLearningNotes/',
  appearance: true, // 暗黑模式
  ignoreDeadLinks: true, // 不会因死链接而使构建失败
  lastUpdated: true, // 使用 git 提交获取时间戳，使默认主题能够显示页面的上次更新时间
  // markdown主题
  markdown: {
    // 主题选择：https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    // 主题预览：https://vscodethemes.com/
    // 添加自定义的主题(加载主题)：https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
    theme: "one-dark-pro",
    linNumbers: true, // 显示行数
  },
  // outDir: "../dist",
  // titleTemplate: '牧涯前端学习笔记', // 标题后缀
  cleanUrls: "without-subfolders", // url设置

  // ***** 主题设置 *****
  themeConfig: {
    logo: "/img/buding.svg",
    siteTitle: "牧涯前端学习笔记", // 网站左上角标题
    outlineTitle: '⚡️内容大纲',
    // 右上角导航中显示带有图标的社交帐户链接
    socialLinks: [
      // { icon: 'discord', link: 'https://github.com/' },
      // { icon: 'facebook', link: 'https://github.com/' },
      // { icon: 'instagram', link: 'https://github.com/' },
      // { icon: 'linkedin', link: 'https://github.com/' },
      // { icon: 'slack', link: 'https://github.com/' },
      // { icon: 'twitter', link: 'https://github.com/' },
      // { icon: 'youtube', link: 'https://github.com/' },
      { icon: 'github', link: 'https://github.com/muyaCode/FrontEndLearningNotes' },
      {
        icon: {
          svg: `<svg t="1660806015529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1999" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
            <defs>
              <style type="text/css">
                @font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944") format("woff2"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944") format("woff"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944") format("truetype"); }
              </style>
            </defs>
            <path d="M514.6112 508.672m-445.4912 0a445.4912 445.4912 0 1 0 890.9824 0 445.4912 445.4912 0 1 0-890.9824 0Z" fill="#FFF3E6" p-id="2000"></path>
            <path d="M672.256 358.912c23.3984-13.9776 39.168-39.936 39.168-69.7344 0-44.5952-35.2768-80.7424-78.7456-80.7424-19.5072 0-37.2736 7.3216-51.0464 19.3024-13.6704-23.8592-38.912-39.8848-67.84-39.8848s-54.1696 16.0256-67.84 39.8848c-13.7728-12.032-31.5392-19.3024-51.0464-19.3024-43.52 0-78.7456 36.1472-78.7456 80.7424 0 29.7984 15.7696 55.7056 39.168 69.7344-80.4864 45.2096-133.8368 123.8016-133.8368 213.2992 0 140.2368 130.8672 253.9008 292.3008 253.9008s292.352-113.664 292.352-253.9008c-0.0512-89.4464-53.4016-168.0384-133.888-213.2992z m-73.984 208.0256c14.1312 0 25.6 11.776 25.6 26.2656s-11.4688 26.2656-25.6 26.2656h-60.928v62.464c0 14.4896-11.4688 26.2656-25.6 26.2656s-25.6-11.776-25.6-26.2656v-62.464h-60.928c-14.1312 0-25.6-11.776-25.6-26.2656s11.4688-26.2656 25.6-26.2656h60.928v-20.0192h-60.928c-14.1312 0-25.6-11.776-25.6-26.2656s11.4688-26.2656 25.6-26.2656h27.904c-17.2032-18.9952-32.256-35.5328-35.7888-39.2192a26.63424 26.63424 0 0 1-7.2704-27.9552c4.4544-13.7728 18.9952-21.1968 32.4096-16.5888 6.8608 2.3552 6.8608 2.3552 49.7664 49.7152 6.9632 7.68 13.9264 15.36 19.968 22.0672l61.3888-65.1264a25.12896 25.12896 0 0 1 36.1984-0.6144c10.1888 10.0864 10.4448 26.6752 0.6144 37.12l-38.2976 40.6016h26.1632c14.1312 0 25.6 11.776 25.6 26.2656s-11.4688 26.2656-25.6 26.2656h-60.928v20.0192h60.928z" fill="#FFA131" p-id="2001"></path><path d="M768.9728 448.3584c-23.3984-36.1984-56.6784-66.9696-96.7168-89.4464 23.3984-13.9776 39.168-39.936 39.168-69.7344 0-44.5952-35.2768-80.7424-78.7456-80.7424-19.5072 0-37.2736 7.3216-51.0464 19.3024-13.6704-23.8592-38.912-39.8848-67.84-39.8848s-54.1696 16.0256-67.84 39.8848c-13.7728-12.032-31.5392-19.3024-51.0464-19.3024-43.52 0-78.7456 36.1472-78.7456 80.7424 0 29.7984 15.7696 55.7056 39.168 69.7344-80.4864 45.2096-133.8368 123.8016-133.8368 213.2992 0 50.432 16.9984 97.3824 46.1824 136.9088 17.3056 6.2464 35.2256 11.3664 53.8112 15.104 199.7824 40.8064 394.9568-81.664 447.488-275.8656z m-170.7008 118.5792c14.1312 0 25.6 11.776 25.6 26.2656s-11.4688 26.2656-25.6 26.2656h-60.928v62.464c0 14.4896-11.4688 26.2656-25.6 26.2656s-25.6-11.776-25.6-26.2656v-62.464h-60.928c-14.1312 0-25.6-11.776-25.6-26.2656s11.4688-26.2656 25.6-26.2656h60.928v-20.0192h-60.928c-14.1312 0-25.6-11.776-25.6-26.2656s11.4688-26.2656 25.6-26.2656h27.904c-17.2032-18.9952-32.256-35.5328-35.7888-39.2192a26.63424 26.63424 0 0 1-7.2704-27.9552c4.4544-13.7728 18.9952-21.1968 32.4096-16.5888 6.8608 2.3552 6.8608 2.3552 49.7664 49.7152 6.9632 7.68 13.9264 15.36 19.968 22.0672l61.3888-65.1264a25.12896 25.12896 0 0 1 36.1984-0.6144c10.1888 10.0864 10.4448 26.6752 0.6144 37.12l-38.2976 40.6016h26.1632c14.1312 0 25.6 11.776 25.6 26.2656s-11.4688 26.2656-25.6 26.2656h-60.928v20.0192h60.928z" fill="#FFAD3A" p-id="2002"></path><path d="M672.256 358.912c1.792-1.0752 3.5328-2.2528 5.2224-3.4816 13.312-26.112 24.1664-53.8624 32.2048-83.0976-7.5264-36.5056-39.168-63.9488-77.0048-63.9488-19.5072 0-37.2736 7.3216-51.0464 19.3024-13.6704-23.8592-38.912-39.8848-67.84-39.8848s-54.1696 16.0256-67.84 39.8848c-13.7728-12.032-31.5392-19.3024-51.0464-19.3024-43.52 0-78.7456 36.1472-78.7456 80.7424 0 29.7984 15.7696 55.7056 39.168 69.7344-80.4864 45.2096-133.8368 123.8016-133.8368 213.2992 0 6.2464 0.3584 12.4928 0.8704 18.6368 62.3104 9.0624 123.8528 4.5568 181.2992-11.52 4.5056-7.424 12.4928-12.3904 21.6576-12.3904h15.9744c15.36-5.8368 30.3616-12.544 44.9536-20.0192v-0.0512h-60.928c-14.1312 0-25.6-11.776-25.6-26.2656s11.4688-26.2656 25.6-26.2656h27.904c-17.2032-18.9952-32.256-35.5328-35.7888-39.2192a26.63424 26.63424 0 0 1-7.2704-27.9552c4.4544-13.7728 18.9952-21.1968 32.4096-16.5888 6.8608 2.3552 6.8608 2.3552 49.7664 49.7152 6.9632 7.68 13.9264 15.36 19.968 22.0672l61.3888-65.1264a25.12896 25.12896 0 0 1 36.1984-0.6144c8.2944 8.192 9.8816 20.6848 4.9152 30.72 23.2448-26.1632 43.52-55.296 60.16-86.8864-0.9728-0.4096-1.8432-0.9728-2.7136-1.4848z" fill="#FFBB48" p-id="2003"></path><path d="M256.256 452.0448c145.7152-15.6672 275.2-104.3968 342.1696-235.52-6.0928 3.0208-11.7248 6.8096-16.7936 11.264-13.6704-23.8592-38.912-39.8848-67.84-39.8848s-54.1696 16.0256-67.84 39.8848c-13.7728-12.032-31.5392-19.3024-51.0464-19.3024-43.52 0-78.7456 36.1472-78.7456 80.7424 0 29.7984 15.7696 55.7056 39.168 69.7344-41.4208 23.1936-75.5712 55.296-99.072 93.0816z" fill="#FFC753" p-id="2004"></path>
          </svg>`
        },
        link: '/'
      }
    ],
    // 右上角导航
    nav: [
      { text: "我的个人网站", link: "" },
      { text: "掘金文章", link: "" },
      { text: "设置", link: "/Order/setting" },
      {
        text: "下拉选择",
        items: [
          { text: "选择1", link: "/Order/items/item1" },
          { text: "选择2", link: "/Order/items/item2" },
          { text: "选择3", link: "/Order/items/item3" },
          { text: "选择4", link: "/Order/items/item4" },
        ],
      },
    ],
    // 左边侧栏导航
    sidebar: [
      {
        text: "学习指南",
        items: [{ text: "学习指南", link: "/Order/study_guide" }],
      },
      {
        text: "TypeScript笔记",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "TypeScript学习指南",
            items: [
              {
                text: "TypeScript学习指南",
                link: "/Document/TypeScript/TypeScript学习指南/TypeScript学习指南",
              },
            ],
          },
          {
            text: "初识 TypeScript",
            items: [
              {
                text: "1.初识TypeScript",
                link: "/Document/TypeScript/TypeScript开发前置/1.初识TypeScript",
              },
              {
                text: "2.安装TypeScript",
                link: "/Document/TypeScript/TypeScript开发前置/2.安装TypeScript",
              },
              {
                text: "3.第一个TypeScript程序",
                link: "/Document/TypeScript/TypeScript开发前置/3.第一个TypeScript程序",
              },
              {
                text: "4.使用Webpack打包TypeScript",
                link: "/Document/TypeScript/TypeScript开发前置/4.使用Webpack打包TypeScript",
              },
            ],
          },
          {
            text: "TypeScript语法",
            items: [
              {
                text: "1.基础类型",
                link: "/Document/TypeScript/TypeScript语法/1.基础类型",
              },
              {
                text: "2.interface接口",
                link: "/Document/TypeScript/TypeScript语法/2.interface接口",
              },
              {
                text: "3.class类",
                link: "/Document/TypeScript/TypeScript语法/3.class类",
              },
              {
                text: "4.function函数",
                link: "/Document/TypeScript/TypeScript语法/4.function函数",
              },
              {
                text: "5.泛型",
                link: "/Document/TypeScript/TypeScript语法/5.泛型",
              },
              {
                text: "6.其他",
                link: "/Document/TypeScript/TypeScript语法/6.其他",
              },
            ],
          },
          {
            text: "TypeScript配置文件",
            items: [
              {
                text: "TypeScript配置文件",
                link: "/Document/TypeScript/TypeScript配置文件/TypeScript配置文件",
              },
            ],
          },
        ],
      },
      {
        text: "前端开发框架学习",
        items: [],
      },
      {
        text: "Vue3学习",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "Vue3快速上手",
            items: [
              {
                text: "01_认识Vue3",
                link: "/Document/Front-end-devFramework/Vue3/Vue3快速上手/01_认识Vue3",
              },
              {
                text: "02_创建vue3项目",
                link: "/Document/Front-end-devFramework/Vue3/Vue3快速上手/02_创建vue3项目",
              },
            ],
          },
          {
            text: "Composition API",
            items: [
              {
                text: "01_Composition API_常用部分",
                link: "/Document/Front-end-devFramework/Vue3/Composition API/01_Composition API_常用部分",
              },
              {
                text: "02_Composition API_其它部分",
                link: "/Document/Front-end-devFramework/Vue3/Composition API/02_Composition API_其它部分",
              },
              {
                text: "03_手写组合API",
                link: "/Document/Front-end-devFramework/Vue3/Composition API/03_手写组合API",
              },
              {
                text: "04_Composition VS Option",
                link: "/Document/Front-end-devFramework/Vue3/Composition API/04_Composition VS Option",
              },
            ],
          },
          {
            text: "其它新组合和API",
            items: [
              {
                text: "01_新组件",
                link: "/Document/Front-end-devFramework/Vue3/其它新组合和API/01_新组件",
              },
              {
                text: "02_其他新API",
                link: "/Document/Front-end-devFramework/Vue3/其它新组合和API/02_其他新API",
              },
            ],
          },
          {
            text: "Vue3综合案例",
            items: [
              {
                text: "TodoList",
                link: "/Document/Front-end-devFramework/Vue3/Vue3综合案例/TodoList",
              },
            ],
          },
          {
            text: "Vue3项目开发规范",
            items: [
              {
                text: "Vue3项目开发规范",
                link: "/Document/Front-end-devFramework/Vue3/Vue3项目开发规范/Vue3项目开发规范",
              },
            ],
          },
          {
            text: "搭建在线文档网站",
            items: [
              {
                text: "01_VuePress搭建在线文档",
                link: "/Document/Front-end-devFramework/Vue3/搭建在线文档网站/01_VuePress搭建在线文档",
              },
            ],
          },
          {
            text: "Vue常用组件开发实战",
            items: [
              {
                text: "01_前置指导",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/00_前置指导",
              },
              {
                text: "02_表单组件",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/01_表单组件",
              },
              {
                text: "03_全局加载组件",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/02_全局加载组件",
              },
              {
                text: "04_全局消息组件",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/03_全局消息组件",
              },
              {
                text: "05_上传组件",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/04_上传组件",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/",
              },
              {
                text: "组件发布",
                link: "/Document/Front-end-devFramework/Vue3/Vue常用组件开发实战/组件发布",
              },
            ],
          },
          {
            text: "Vue3前端综合解决方案",
            items: [
              {
                text: "00_setup()和scriptsetup语法糖",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/00_setup()和scriptsetup语法糖",
              },
              {
                text: "01_0_编程规范解决方案指南",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_0_编程规范解决方案指南",
              },
              {
                text: "01_1_ESLint编程规范",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_1_ESLint编程规范",
              },
              {
                text: "01_2_Prettier-前端代码格式化工具",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_2_Prettier-前端代码格式化工具",
              },
              {
                text: "01_3_Git代码提交规范",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_3_Git代码提交规范",
              },
              {
                text: "01_4_Commitizen",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_4_Commitizen",
              },
              {
                text: "01_5_husky",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_5_husky",
              },
              {
                text: "01_6_commitlint",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_6_commitlint",
              },
              {
                text: "01_7_Pre-commit",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_7_Pre-commit",
              },
              {
                text: "01_8_Lint-staged",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_8_Lint-staged",
              },
              {
                text: "01_9_Svg Sprite Icon",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_9_Svg Sprite Icon",
              },
              {
                text: "01_10_GitHooks",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_10_GitHooks",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/",
              },
              {
                text: "02_项目架构解决方案",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/02_项目架构解决方案",
              },
              {
                text: "02_项目架构之搭建登录架构方案与实现",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/02_项目架构之搭建登录架构方案与实现",
              },
              {
                text: "03_项目架构之搭建Layout架构方案与实现",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/03_项目架构之搭建Layout架构方案与实现",
              },
              {
                text: "04_后台项目通用功能开发",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/04_后台项目通用功能开发",
              },
              {
                text: "05_UI框架解决方案Vue3和ElementPlus",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/05_UI框架解决方案Vue3和ElementPlus",
              },
              {
                text: "06_角色、权限控制功能实现的解决方案",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/06_角色、权限控制功能实现的解决方案",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/",
              },
              {
                text: "",
                link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/",
              },
            ],
          },
        ]
      },
      {
        text: "React学习",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "React快速上手",
            items: [
              {
                text: "React快速上手",
                link: "/Document/Front-end-devFramework/React/React快速上手/React快速上手",
              },
            ],
          },
          {
            text: "React实战",
            items: [
              {
                text: "React实战",
                link: "/Document/Front-end-devFramework/React/React实战/React实战",
              },
            ],
          },
          {
            text: "React实战",
            items: [
              {
                text: "React实战",
                link: "/Document/Front-end-devFramework/React/React实战/React实战",
              },
            ],
          },
        ]
      },
      {
        text: "Git笔记",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "Git学习指南",
            link: "/Document/Git/Guide",
          },
          {
            text: "01_Git前置",
            link: "/Document/Git/01_Git前置",
          },
          {
            text: "02_Git命令详解",
            link: "/Document/Git/02_Git命令详解",
          },
          {
            text: "03_Git工具",
            link: "/Document/Git/03_Git工具",
          },
        ]
      },
      {
        text: "前端开发调试",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "JavaScript开发调试",
            items: [
              {
                text: "项目中使用编辑器debugger",
                link: "/Document/DevDebug/JavaScript开发调试/项目中使用编辑器debugger",
              },
              {
                text: "JavaScript开发调试",
                link: "/Document/DevDebug/JavaScript开发调试/JavaScript开发调试",
              },
              {
                text: "UI的CSS样式调试技巧",
                link: "/Document/DevDebug/JavaScript开发调试/UI的CSS样式调试技巧",
              },
              {
                text: "ChromeDevTools工具的使用",
                link: "/Document/DevDebug/JavaScript开发调试/ChromeDevTools工具的使用",
              },
            ]
          },
          {
            text: "Vue开发调试",
            link: "/Document/DevDebug/Vue开发调试",
          },
          {
            text: "React开发调试",
            link: "/Document/DevDebug/React开发调试",
          },
          {
            text: "抓包工具调试",
            link: "/Document/DevDebug/抓包工具调试",
          },
          {
            text: "其他调试工具",
            link: "/Document/DevDebug/其他调试工具",
          },
        ]
      },
      {
        text: "前端工程化/自动化",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "前端工程化",
            items: [
              {
                text: "前端工程化",
                link: "/Document/Project-Engineering/前端工程化-自动化/前端工程化",
              },
            ],
          },
          {
            text: "前端自动化",
            items: [
              {
                text: "前端自动化",
                link: "/Document/Project-Engineering/前端工程化-自动化/前端自动化",
              },
            ],
          },
          {
            text: "项目打包构建工具",
            items: [
              {
                text: "学习指南",
                link: "/Document/Project-Engineering/PackToBuild/Guide",
              },
              {
                text: "webpack",
                link: "/Document/Project-Engineering/PackToBuild/webpack",
              },
              {
                text: "vite",
                link: "/Document/Project-Engineering/PackToBuild/vite",
              },
              {
                text: "gulp",
                link: "/Document/Project-Engineering/PackToBuild/gulp",
              }, 
              {
                text: "grunt",
                link: "/Document/Project-Engineering/PackToBuild/grunt",
              },
              {
                text: "browserify",
                link: "/Document/Project-Engineering/PackToBuild/browserify",
              },
              {
                text: "yeoman",
                link: "/Document/Project-Engineering/PackToBuild/yeoman",
              },
              {
                text: "babel",
                link: "/Document/Project-Engineering/PackToBuild/yeoman",
              },
              {
                text: "Rollup",
                link: "/Document/Project-Engineering/PackToBuild/rollup",
              },
              {
                text: "Parcel",
                link: "/Document/Project-Engineering/PackToBuild/parcel",
              },
              {
                text: "esbuild",
                link: "/Document/Project-Engineering/PackToBuild/esbuild",
              },
            ],
          },
        ]
      },
      {
        text: "技术提升和职业规划",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "技术提升",
            link: "/Document/技术提升和职业规划/skillUpgrading",
          },
          {
            text: "职业规划",
            link: "/Document/技术提升和职业规划/careerPlanning",
          },
        ]
      },
      {
        text: "待定3",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定4",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定5",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定6",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定7",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定8",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定9",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定10",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定11",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定12",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
      {
        text: "待定13",
        collapsible: true, // 可折叠
        collapsed: false, // 初始不折叠
        items: [
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
          {
            text: "哈哈哈",
            items: [
              {
                text: "",
                link: "/",
              },
            ],
          },
        ]
      },
    ],
    
    // 首页页脚配置。您可以添加消息和版权。仅当页面由于设计原因不包含边栏时，才会显示页脚。
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2022-present Evan You'
    // },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
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
  },
};
