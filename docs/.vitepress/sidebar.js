// 左边侧栏导航
export default {
  "/": [
    {
      text: "🌟学习指南",
      items: [
        { text: "学习指南", link: "/order/study_guide" },
        { text: "markdown图标", link: "/order/markdown图标" },
      ],
    },
    {
      text: "🔧前端环境配置",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "学习指南",
          link: "/Document/ToolEnvConfig/Guide",
        },
        {
          text: "前端工具环境配置",
          link: "/Document/ToolEnvConfig/前端工具环境配置",
        },
      ],
    },
    {
      text: "😄HTML和CSS学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "HTML学习",
          items:[
            {
              text: "HTML学习指导",
              link: "/Document/HTML和CSS/HTML/HTML学习指引",
            },
            {
              text: "HTML标签",
              link: "/Document/HTML和CSS/HTML/HTML标签",
            },
            {
              text: "HTML5学习",
              link: "/Document/HTML和CSS/HTML/HTML5学习",
            },
          ]
        },
        {
          text: "CSS基础和进阶总结",
          items: [
            {
              text: "CSS基础总结",
              link: "/Document/HTML和CSS/CSS/CSS基础总结",
            },
            {
              text: "CSS新特性",
              link: "/Document/HTML和CSS/CSS/CSS新特性",
            },
            {
              text: "CSS开发技巧",
              link: "/Document/HTML和CSS/CSS/CSS开发技巧",
            },
            {
              text: "CSS工程化(模块化)方案",
              link: "/Document/HTML和CSS/CSS/CSS工程化(模块化)方案",
            },
            {
              text: "CSS预处理器",
              link: "/Document/HTML和CSS/CSS/CSS预处理器",
            },
            {
              text: "CSS架构",
              link: "/Document/HTML和CSS/CSS/CSS架构",
            },
            {
              text: "CSS工具",
              link: "/Document/HTML和CSS/CSS/CSS工具",
            },
            {
              text: "CSS框架工具库",
              link: "/Document/HTML和CSS/CSS/CSS框架工具库",
            },
            {
              text: "CSS奇淫巧技",
              link: "/Document/HTML和CSS/CSS/CSS奇淫巧技",
            },
            {
              text: "CSS性能优化",
              link: "/Document/HTML和CSS/CSS/CSS性能优化",
            },
          ]
        },
      ],
    },
    {
      text: "😆JavaScript笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "JavaScript基础",
          items: [
            {
              text: "JavaScript基础",
              link: "/Document/JavaScript笔记/JavaScript基础/JavaScript基础",
            },
            {
              text: "Ajax概念入门到手写",
              link: "/Document/JavaScript笔记/JavaScript基础/Ajax入门概念到手写",
            },
          ]
        },
        {
          text: "JavaScript的对象的属性和方法",
          items: [
            {
              text: "JavaScript中的对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript中的对象",
            },
            {
              text: "JavaScript_Object的属性和方法",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Object的属性和方法",
            },
            {
              text: "JavaScript_Array对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Array对象",
            },
            {
              text: "JavaScript_String对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_String对象",
            },
            {
              text: "JavaScript_Boolean对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Boolean对象",
            },
            {
              text: "JavaScript_Number对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Number对象",
            },
            {
              text: "JavaScript_Math对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Math对象",
            },
            {
              text: "JavaScript_Date对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Date对象",
            },
            {
              text: "JavaScript_RegExp对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_RegExp对象",
            },
            {
              text: "JavaScript_Error对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_Error对象",
            },
            {
              text: "JavaScript_全局对象(属性和函数)",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_全局对象(属性和函数)",
            },
            {
              text: "JavaScript_运算符对象",
              link: "/Document/JavaScript笔记/JavaScript的对象的属性和方法/JavaScript_运算符对象",
            },
          ]
        },
        {
          text: "JavaScript高级",
          items: [
            {
              text: "JavaScript高级学习指南",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript高级学习指南",
            },
            {
              text: "JavaScript中的数据类型",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript中的数据类型",
            },
            {
              text: "JavaScript面向对象编程",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript面向对象编程",
            },
            {
              text: "JavaScript面向对象案例",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript面向对象案例",
            },
            {
              text: "JavaScript函数进阶",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript函数进阶",
            },
            {
              text: "JavaScript正则表达式",
              link: "/Document/JavaScript笔记/JavaScript高级/JavaScript正则表达式",
            },
            {
              text: "Promise异步编程",
              link: "/Document/JavaScript笔记/JavaScript高级/Promise异步编程",
            },
            {
              text: "HTML5_Canvas笔记",
              link: "/Document/JavaScript笔记/JavaScript高级/HTML5_Canvas笔记",
            },
          ]
        },
        {
          text: "JavaScript功能源码实现",
          items: [
            {
              text: "手写Promise",
              link: "/Document/JavaScript笔记/JavaScript功能源码实现/手写Promise",
            }
          ]
        },
        {
          text: "ECMAScript语法",
          items: [
            {
              text: "ECMAScript语法简介-文档-资源",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript语法简介-文档-资源",
            },
            {
              text: "ECMAScript-6(ES2015)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-6(ES2015)",
            },
            {
              text: "ECMAScript-7(ES2016)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-7(ES2016)",
            },
            {
              text: "ECMAScript-8((ES2017))",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-8((ES2017))",
            },
            {
              text: "ECMAScript-9(ES2018)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-9(ES2018)",
            },
            {
              text: "ECMAScript-10(ES2019)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-10(ES2019)",
            },
            {
              text: "ECMAScript-11(ES2020)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-11(ES2020)",
            },
            {
              text: "ECMAScript-12(ES2021)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-12(ES2021)",
            },
            {
              text: "ECMAScript-13(ES2022)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-13(ES2022)",
            },
          ]
        },
      ]
    },
    {
      text: "😊TypeScript笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
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
              text: "1-初识TypeScript",
              link: "/Document/TypeScript/TypeScript开发前置/1-初识TypeScript",
            },
            {
              text: "2-安装TypeScript",
              link: "/Document/TypeScript/TypeScript开发前置/2-安装TypeScript",
            },
            {
              text: "3-第一个TypeScript程序",
              link: "/Document/TypeScript/TypeScript开发前置/3-第一个TypeScript程序",
            },
            {
              text: "4-使用Webpack打包TypeScript",
              link: "/Document/TypeScript/TypeScript开发前置/4-使用Webpack打包TypeScript",
            },
          ],
        },
        {
          text: "TypeScript语法",
          items: [
            {
              text: "1-基础类型",
              link: "/Document/TypeScript/TypeScript语法/1-基础类型",
            },
            {
              text: "2-interface接口",
              link: "/Document/TypeScript/TypeScript语法/2-interface接口",
            },
            {
              text: "3-class类",
              link: "/Document/TypeScript/TypeScript语法/3-class类",
            },
            {
              text: "4-function函数",
              link: "/Document/TypeScript/TypeScript语法/4-function函数",
            },
            {
              text: "5-泛型",
              link: "/Document/TypeScript/TypeScript语法/5-泛型",
            },
            {
              text: "6-其他",
              link: "/Document/TypeScript/TypeScript语法/6-其他",
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
      text: "😃前端开发框架学习",
      items: [],
    },
    {
      text: "Vue3学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Vue2相关",
          items: [
            {
              text: "Vue2进阶",
              link: "/Document/Front-end-devFramework/Vue3/Vue2相关/Vue2难点进阶",
            },
            {
              text: "Vue2源码解析",
              link: "/Document/Front-end-devFramework/Vue3/Vue2相关/Vue2源码解析",
            },
          ]
        },
        {
          text: "Vue3学习指导",
          link: "/Document/Front-end-devFramework/Vue3/Guide",
        },
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
          text: "其它新组件和API",
          items: [
            {
              text: "01_新组件",
              link: "/Document/Front-end-devFramework/Vue3/其它新组件和API/01_新组件",
            },
            {
              text: "02_scriptsetup语法糖",
              link: "/Document/Front-end-devFramework/Vue3/其它新组件和API/02_scriptsetup语法糖",
            },
            {
              text: "03_其他新API",
              link: "/Document/Front-end-devFramework/Vue3/其它新组件和API/03_其他新API",
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
          text: "Vue3开发库",
          items: [
            {
              text: "vueRouter",
              link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/vue-router",
            },
            {
              text: "vuex",
              link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/vuex",
            },
            {
              text: "pinia",
              link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/pinia",
            },
            {
              text: "axios",
              link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/axios",
            },
            {
              text: "tailwindcss",
              link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/tailwindcss",
            },
            // {
            //   text: "",
            //   link: "/Document/Front-end-devFramework/Vue3/Vue3开发库/",
            // },
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
          text: "Vue测试",
          items: [
            {
              text: "Vue项目测试学习指南",
              link: "/Document/Front-end-devFramework/Vue3/Vue测试/Vue项目测试学习指南",
            },
            {
              text: "单元测试",
              link: "/Document/Front-end-devFramework/Vue3/Vue测试/单元测试",
            },
            {
              text: "组件测试",
              link: "/Document/Front-end-devFramework/Vue3/Vue测试/组件测试",
            },
            {
              text: "端到端测试",
              link: "/Document/Front-end-devFramework/Vue3/Vue测试/端到端测试",
            },
          ],
        },
        {
          text: "Vue服务端渲染",
          items: [
            {
              text: "服务端渲染导学",
              link: "/Document/Front-end-devFramework/Vue3/Vue服务端渲染/服务端渲染导学",
            },
            {
              text: "Vue+Nuxt服务端渲染",
              link: "/Document/Front-end-devFramework/Vue3/Vue服务端渲染/Vue+Nuxt服务端渲染",
            },
            {
              text: "Nuxt笔记",
              link: "/Document/Front-end-devFramework/Vue3/Vue服务端渲染/Nuxt笔记",
            },
            {
              text: "",
              link: "/Document/Front-end-devFramework/Vue3/Vue服务端渲染/",
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
            {
              text: "02_给VitePress添加algolia搜索",
              link: "/Document/Front-end-devFramework/Vue3/搭建在线文档网站/02_给VitePress添加algolia搜索",
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
          text: 'Vue主要的社区开发库',
          items: [
            {
              text: 'Pinia状态管理库的使用',
              link: '/Document/Front-end-devFramework/Vue3/Vue主要的社区开发库/Pinia状态管理库的使用',
            },
          ]
        },
        {
          text: "Vue3前端综合解决方案",
          items: [
            {
              text: "00_setup()和scriptsetup语法糖",
              link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/00_setup()和scriptsetup语法糖",
            },
            {
              text: "02_项目架构解决方案",
              link: "/Document/Front-end-devFramework/Vue3/Vue3前端综合解决方案/01_项目架构解决方案",
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
          ],
        },
        {
          text: 'Vue3源码学习指导',
          items: [
            {
              text: 'Vue3源码学习指导',
              link: '/Document/Front-end-devFramework/Vue3/Vue3源码解析/Vue3源码学习指导',
            },
          ]
        },
      ]
    },
    {
      text: "React学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
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
      text: "Angular学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Angular快速上手",
          items: [
            {
              text: "Angular快速上手",
              link: "/Document/Front-end-devFramework/Angular/Angular快速上手",
            },
          ],
        },
        {
          text: "Angular实战",
          items: [
            {
              text: "Angular实战",
              link: "/Document/Front-end-devFramework/Angular实战",
            },
          ],
        },
      ]
    },
    {
      text: "微信开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "微信公众号开发",
          items: [
            {
              text: "微信公众号简介和相关资源",
              link: "/Document/微信开发/微信公众号开发/微信公众号简介和相关资源",
            },
            {
              text: "Koa开发微信公众号后端服务",
              link: "/Document/微信开发/微信公众号开发/Koa开发微信公众号后端服务",
            },
          ],
        },
        {
          text: "微信小程序开发",
          items: [
            {
              text: "微信小程序简介和相关资源",
              link: "/Document/微信开发/微信小程序开发/微信小程序简介和相关资源",
            },
          ],
        },
      ]
    },
    {
      text: "😏前端综合解决方案",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "00_编程规范解决方案指南",
          link: "/Document/前端综合解决方案/00_编程规范解决方案指南",
        },
        {
          text: "01_ESLint编程规范",
          link: "/Document/前端综合解决方案/01_ESLint编程规范",
        },
        {
          text: "02_Prettier-前端代码格式化工具",
          link: "/Document/前端综合解决方案/02_Prettier-前端代码格式化工具",
        },
        {
          text: "03_Git代码提交规范",
          link: "/Document/前端综合解决方案/03_Git代码提交规范",
        },
        {
          text: "05_Svg Sprite Icon",
          link: "/Document/前端综合解决方案/05_Svg Sprite Icon",
        },
        {
          text: "06_前端模块化",
          link: "/Document/前端综合解决方案/06_前端模块化",
        },
        {
          text: "07_其他前端解决方案",
          link: "/Document/前端综合解决方案/07_其他前端解决方案",
        },
        {
          text: "08_npm script",
          link: "/Document/前端综合解决方案/08_npm scrip",
        },
        {
          text: "09_Web Components组件",
          link: "/Document/前端综合解决方案/09_Web Components组件",
        },
        {
          text: "10_前端基建",
          link: "/Document/前端综合解决方案/10_前端基建",
        },
        {
          text: "11_移动端适配",
          link: "/Document/前端综合解决方案/11_移动端适配",
        },
        
      ],
    },
    {
      text: "😍Git笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
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
        {
          text: "04_Git提交流程",
          link: "/Document/Git/04_Git提交流程",
        },
      ]
    },
    {
      text: "😘GitBook",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "GitBook制作电子书",
          link: "/Document/GitBook/GitBook制作电子书",
        }
      ]
    },
    {
      text: "😚GitHub的使用",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "GitHub快速入门",
          link: "/Document/GitHub的使用/GitHub快速入门",
        },
        {
          text: "在GitHub精准搜索和寻找项目",
          link: "/Document/GitHub的使用/在GitHub精准搜索和寻找项目",
        },
        {
          text: "GitHub加速",
          link: "/Document/GitHub的使用/GitHub加速",
        },
        {
          text: "GitHub仓库实用技巧",
          link: "/Document/GitHub的使用/GitHub仓库实用技巧",
        },
        {
          text: "",
          link: "/Document/GitHub的使用/",
        },
        {
          text: "GitHub仓库辅助工具",
          link: "/Document/GitHub的使用/GitHub仓库辅助工具",
        },
      ]
    },
    {
      text: "😳Bash Shell脚本笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "Bash 脚本教程",
          link: "/Document/Bash Shell脚本笔记/Bash 脚本教程",
        },
        {
          text: "命令行工具",
          link: "/Document/Bash Shell脚本笔记/命令行工具",
        },
        {
          text: "",
          link: "/Document/Bash Shell脚本笔记/",
        },
      ]
    },
    {
      text: "😌前端开发调试",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
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
        {
          text: "移动端开发调试",
          link: "/Document/DevDebug/移动端开发调试",
        },
        {
          text: "前后端对接联调",
          link: "/Document/DevDebug/前后端对接联调",
        },
      ]
    },
    {
      text: "😁前端工程化/自动化",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "前端工程化",
          items: [
            {
              text: "学习指导",
              link: "/Document/Project-Engineering/前端工程化/学习指导",
            },
            {
              text: "前端工程化",
              link: "/Document/Project-Engineering/前端工程化/前端工程化",
            },
            {
              text: "单元测试",
              link: "/Document/Project-Engineering/前端工程化/单元测试",
            },
            {
              text: "功能测试",
              link: "/Document/Project-Engineering/前端工程化/功能测试",
            },
            {
              text: "静态代码检查",
              link: "/Document/Project-Engineering/前端工程化/静态代码检查",
            },
            {
              text: "",
              link: "/Document/Project-Engineering/前端工程化/",
            },
          ],
        },
        {
          text: "前端自动化",
          items: [
            {
              text: "学习指导",
              link: "/Document/Project-Engineering/前端自动化/学习指导",
            },
            {
              text: "前端自动化",
              link: "/Document/Project-Engineering/前端自动化/前端自动化",
            },
            {
              text: "持续集成",
              link: "/Document/Project-Engineering/前端自动化/持续集成",
            },
            {
              text: "GitHub Actions",
              link: "/Document/Project-Engineering/前端自动化/GitHub Actions",
            },
            {
              text: "持续集成服务Travis CI",
              link: "/Document/Project-Engineering/前端自动化/持续集成服务Travis CI",
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
              link: "/Document/Project-Engineering/PackToBuild/babel",
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
            {
              text: "Turbopack",
              link: "/Document/Project-Engineering/PackToBuild/Turbopack",
            },
          ],
        },
      ]
    },
    {
      text: "😉前端性能优化专题",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "00_性能优化前置知识",
          link: "/Document/前端性能优化专题/00_性能优化前置知识",
        },
        {
          text: "01_1性能分析工具",
          link: "/Document/前端性能优化专题/01_1性能分析工具",
        },
        {
          text: "01_2前端性能优化策略",
          link: "/Document/前端性能优化专题/01_2前端性能优化策略",
        },
        {
          text: "02_项目开发阶段性能优化",
          link: "/Document/前端性能优化专题/02_项目开发阶段性能优化",
        },
        {
          text: "03_项目打包阶段性能优化",
          link: "/Document/前端性能优化专题/03_项目打包阶段性能优化",
        },
        {
          text: "04_项目上线阶段性能优化",
          link: "/Document/前端性能优化专题/04_项目上线阶段性能优化",
        },
        {
          text: "05_Vue性能优化",
          link: "/Document/前端性能优化专题/05_Vue性能优化",
        },
        {
          text: "",
          link: "/Document/前端性能优化专题/",
        },
      ]
    },
    {
      text: "😜NodeJS笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Node相关网站资源",
          link: "/Document/Node/Node相关网站资源",
        },
        {
          text: "NodeJS介绍",
          link: "/Document/Node/NodeJS介绍",
        },
        {
          text: "NodeJS安装和配置",
          link: "/Document/Node/NodeJS安装和配置",
        },
        {
          text: "Node版本管理工具",
          link: "/Document/Node/Node版本管理工具",
        },
        {
          text: "Node基础",
          link: "/Document/Node/Node基础",
        },
        {
          text: "Node高级",
          link: "/Document/Node/Node高级",
        },
        {
          text: "Node实战",
          items: [
            {
              text: 'Node搭建Web服务器',
              link: "/Document/Node/Node实战/Node搭建Web服务器",
            },
            {
              text: 'Node原生API服务开发',
              link: "/Document/Node/Node实战/Node原生API服务开发",
            },
          ],
        },
        {
          text: "nvm的简介、安装、使用",
          link: "/Document/Node/nvm的简介、安装、使用",
        },
        {
          text: "npm学习",
          link: "/Document/Node/npm学习",
        },
        {
          text: "NodeJS学习",
          link: "/Document/Node/NodeJS学习",
        },
        {
          text: "自定义Node模块发布",
          link: "/Document/Node/自定义Node模块发布",
        },
        {
          text: "npm scripts 使用指南",
          link: "/Document/Node/npm scripts 使用指南",
        },
      ]
    },
    {
      text: "😝Node后端框架开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Express框架",
          items: [
            {
              text: "Express介绍和相关网址",
              link: "/Document/Node后端框架开发/Express框架/Express介绍和相关网址",
            },
            {
              text: "Express快速开发脚手架",
              link: "/Document/Node后端框架开发/Express框架/Express快速开发脚手架",
            },
            {
              text: "Express相关资源",
              link: "/Document/Node后端框架开发/Express框架/Express相关资源",
            },
            {
              text: "Express实战开发参考",
              link: "/Document/Node后端框架开发/Express框架/Express实战开发参考",
            },
            {
              text: "Express实战开发",
              link: "/Document/Node后端框架开发/Express框架/Express实战开发",
            },
          ],
        },
        {
          text: "KoaJs框架",
          items: [
            {
              text: "Koa框架前置JS知识",
              link: "/Document/Node后端框架开发/Koa框架/Koa框架前置JS知识",
            },
            {
              text: "Koa项目结构和相关依赖",
              link: "/Document/Node后端框架开发/Koa框架/Koa项目结构和相关依赖",
            },
            {
              text: "Koa快速开发脚手架",
              link: "/Document/Node后端框架开发/Koa框架/Koa快速开发脚手架",
            },
            {
              text: "Koa中间件与洋葱模型",
              link: "/Document/Node后端框架开发/Koa框架/Koa中间件与洋葱模型",
            },
            {
              text: "Koa-应用(Application)",
              link: "/Document/Node后端框架开发/Koa框架/Koa-应用(Application)",
            },
            {
              text: "Koa-上下文(Context)",
              link: "/Document/Node后端框架开发/Koa框架/Koa-上下文(Context)",
            },
            {
              text: "Koa-请求(Request)",
              link: "/Document/Node后端框架开发/Koa框架/Koa-请求(Request)",
            },
            {
              text: "Koa-响应(Response)",
              link: "/Document/Node后端框架开发/Koa框架/Koa-响应(Response)",
            },
            {
              text: "Koa相关资源",
              link: "/Document/Node后端框架开发/Koa框架/Koa相关资源",
            },
            {
              text: "Koa-实战开发",
              link: "/Document/Node后端框架开发/Koa框架/Koa-实战开发",
            },
            {
              text: "Koa项目示例",
              link: "/Document/Node后端框架开发/Koa框架/Koa项目示例",
            },
            {
              text: "EggJS框架",
              link: "/Document/Node后端框架开发/Koa框架/EggJS框架",
            },
          ],
        },
        {
          text: "Nest框架",
          items: [
            {
              text: "Nest框架",
              link: "/Document/Node后端框架开发/Nest框架/Nest框架",
            }
          ],
        },
        {
          text: "Fastify框架",
          items: [
            {
              text: "Fastify框架",
              link: "/Document/Node后端框架开发/Fastify框架/Fastify框架",
            }
          ],
        },
        {
          text: "接口测试工具",
          link: "/Document/Node后端框架开发/接口测试工具",
        },
        {
          text: "Node项目项目开发跨域问题",
          link: "/Document/Node后端框架开发/Node项目项目开发跨域问题",
        },
        {
          text: "Node项目上线部署",
          link: "/Document/Node后端框架开发/Node项目上线部署",
        },
      ]
    },
    {
      text: "😗Deno笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Deno",
          link: "/Document/Deno/Deno",
        },
      ]
    },
    {
      text: "😰Bun笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Bun",
          link: "/Document/Bun/Bun",
        },
      ]
    },
    {
      text: "😀数据库的使用",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "数据库简介",
          link: "/Document/数据库的使用/数据库简介"
        },
        {
          text: "MongoDB数据库",
          items: [
            {
              text: "MongoDB数据库",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB相关资源",
            },
            {
              text: "MongoDB下载安装和配置",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB下载安装和配置",
            },
            {
              text: "MongoDB基础",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB基础",
            },
            {
              text: "MongoDB高级",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB高级",
            },
            {
              text: "MongoDB数据库的使用",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB数据库的使用",
            },
            {
              text: "MongoDB数据库迁移",
              link: "/Document/数据库的使用/MongoDB数据库/MongoDB数据库迁移",
            },
          ]
        },
        {
          text: "MySQL数据库",
          items: [
            {
              text: "MySQL数据库相关资源",
              link: "/Document/数据库的使用/MySQL数据库/MySQL数据库相关资源",
            },
            {
              text: "MySQL版本介绍",
              link: "/Document/数据库的使用/MySQL数据库/MySQL版本介绍",
            },
            {
              text: "MySQL下载安装和配置",
              link: "/Document/数据库的使用/MySQL数据库/MySQL下载安装和配置",
            },
            {
              text: "MySQL数据库的使用",
              link: "/Document/数据库的使用/MySQL数据库/MySQL数据库的使用",
            },
            {
              text: "MySQL数据库迁移",
              link: "/Document/数据库的使用/MySQL数据库/MySQL数据库迁移",
            },
          ]
        },
        {
          text: "Redis数据库",
          items: [
            {
              text: "Redis数据库相关资源",
              link: "/Document/数据库的使用/Redis数据库/Redis数据库相关资源",
            },
            {
              text: "Redis版本介绍",
              link: "/Document/数据库的使用/Redis数据库/Redis版本介绍",
            },
            {
              text: "Redis下载安装和配置",
              link: "/Document/数据库的使用/Redis数据库/Redis下载安装和配置",
            },
            {
              text: "Redis数据库的使用",
              link: "/Document/数据库的使用/Redis数据库/Redis数据库的使用",
            },
            {
              text: "Redis数据库迁移",
              link: "/Document/数据库的使用/Redis数据库/Redis数据库迁移",
            },
          ]
        },
        {
          text: "Postgres数据库",
          items: [
            {
              text: "Postgres数据库",
              link: "/Document/数据库的使用/Postgres数据库/Postgres数据库入门",
            },
          ]
        },
      ]
    },
    {
      text: "😗Electron笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Electron学习指南",
          link: "/Document/Electron/Guide",
        },
        {
          text: "Electron入门",
          link: "/Document/Electron/Electron入门",
        },
        {
          text: "Electron相关技巧",
          link: "/Document/Electron/Electron相关技巧",
        },
        {
          text: "Electron库",
          link: "/Document/Electron/Electron库",
        },
        {
          text: "electron-builder打包配置",
          link: "/Document/Electron/electron-builder打包配置",
        },
        {
          text: "electron-packager打包配置",
          link: "/Document/Electron/electron-packager打包配置",
        },
        {
          text: "@electron-forge打包配置",
          link: "/Document/Electron/@electron-forge打包配置",
        },
        {
          text: "Electron打包遇见问题及解决",
          link: "/Document/Electron/Electron打包遇见问题及解决",
        },
        {
          text: "Electron项目打包优化配置",
          link: "/Document/Electron/Electron项目打包优化配置",
        },
      ]
    },
    {
      text: "😯Tauri框架",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Tauri框架入门",
          link: "/Document/Tauri框架/Tauri框架入门",
        },
        {
          text: "Tauri相关技巧",
          link: "/Document/Tauri框架/Tauri相关技巧",
        },
        {
          text: "Tauri打包遇见问题及解决",
          link: "/Document/Tauri框架/Tauri打包遇见问题及解决",
        },
        {
          text: "Rust语言学习",
          link: "/Document/Tauri框架/Rust语言学习",
        },
      ]
    },
    {
      text: "😪Flutter框架学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Flutter框架入门",
          link: "/Document/Flutter框架/Flutter框架入门",
        },
        {
          text: "Dart语言学习",
          link: "/Document/Flutter框架/Dart语言学习",
        },
        {
          text: "Flutter开发",
          link: "/Document/Flutter框架/Flutter开发",
        },
        {
          text: "Flutter实战",
          link: "/Document/Flutter框架/Flutter实战",
        },
        {
          text: "Flutter遇见问题及解决",
          link: "/Document/Flutter框架/Flutter遇见问题及解决",
        },
      ]
    },
    {
      text: "😙Elasticsearch",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "全文搜索引擎 Elasticsearch 入门教程",
          link: "/Document/Elasticsearch/全文搜索引擎Elasticsearch入门教程",
        },
      ],
    },
    {
      text: "😛CoffeeScript",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "CoffeeScript",
          link: "/Document/CoffeeScript/CoffeeScript",
        },
      ],
    },
    {
      text: "😴技术提升和职业规划",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
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
      text: "😟开源相关",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "使用Issue管理软件项目",
          link: "/Document/开源相关/使用Issue管理软件项目",
        },
        {
          text: "代码开源协议",
          link: "/Document/开源相关/代码开源协议",
        },
      ]
    },
    {
      text: "😭JavaScript数据结构和算法",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "JavaScript算法",
          link: "/Document/JavaScript数据结构和算法/JavaScript算法",
        },
      ]
    },
    {
      text: "😇前端面试题",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "CSS和HTML面试题",
          items: [
            {
              text: "CSS和HTML面试题",
              link: "/Document/前端面试题/CSS和HTML面试题/CSS和HTML面试题",
            },
          ],
        },
        {
          text: "JavaScript面试题",
          items: [
            {
              text: "JavaScript函数面试题",
              link: "/Document/前端面试题/JavaScript面试题/JavaScript函数面试题",
            },
            {
              text: "手写实现JS方法",
              link: "/Document/前端面试题/JavaScript面试题/手写实现JS方法",
            },
            {
              text: "this指向题",
              link: "/Document/前端面试题/JavaScript面试题/this指向题",
            },
            {
              text: "类型转换题",
              link: "/Document/前端面试题/JavaScript面试题/类型转换题",
            },
            {
              text: "其他面试题",
              link: "/Document/前端面试题/JavaScript面试题/其他面试题",
            },
          ],
        },
        {
          text: "Vue面试题",
          items: [
            {
              text: "Vue面试题",
              link: "/Document/前端面试题/Vue面试题/Vue面试题",
            },
          ],
        },
      ]
    }
  ]
}