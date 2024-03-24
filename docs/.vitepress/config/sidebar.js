// 左边侧栏导航
export default {
  "/": [
    {
      text: "🌟学习指南",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "学习指南", link: "/order/study_guide" },
        { text: "前端笔记集合", link: "/order/前端笔记集合" },
        { text: "前端小白学习路线", link: "/order/前端小白学习路线" },
        { text: "前端大师修炼路线", link: "/order/前端大师修炼路线" },
        { text: "前端开发库工具集合", link: "/order/前端开发库工具集合" },
        { text: "前端架构", link: "/order/前端架构" },
        { text: "markdown图标", link: "/order/markdown图标" },
        { text: "软件镜像地址合集", link: "/order/软件镜像地址合集" },
        { text: "学习资源和方法", link: "/order/学习资源和方法" },
        { text: "前端学习合理的知识结构", link: "/order/前端学习合理的知识结构" },
      ],
    },
    {
      text: "🔧前端开发环境配置",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "学习指南",
          link: "/Document/前端开发环境配置/Guide",
        },
        {
          text: "前端工具环境配置",
          link: "/Document/前端开发环境配置/前端工具环境配置",
        },
        {
          text: "VSCode编辑器环境配置",
          link: "/Document/前端开发环境配置/VSCode编辑器环境配置",
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
            {
              text: "HTML实用技巧",
              link: "/Document/HTML和CSS/HTML/HTML实用技巧",
            },
            {
              text: "WebComponents",
              link: "/Document/HTML和CSS/HTML/WebComponents",
            },
          ]
        },
        {
          text: "CSS基础和进阶总结",
          collapsible: true,
          collapsed: true,
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
              text: "CSS布局总结",
              link: "/Document/HTML和CSS/CSS/CSS布局总结",
            },
            {
              text: "CSS响应式和自适应",
              link: "/Document/HTML和CSS/CSS/CSS响应式和自适应",
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
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "JavaScript基础",
              link: "/Document/JavaScript笔记/JavaScript基础/JavaScript基础",
            },
            {
              text: "JavaScript基础练习题",
              link: "/Document/JavaScript笔记/JavaScript基础/JavaScript基础练习题",
            },
            {
              text: "Ajax概念入门到手写",
              link: "/Document/JavaScript笔记/JavaScript基础/Ajax入门概念到手写",
            },
            {
              text: "JavaScript模块化发展历程",
              link: "/Document/JavaScript笔记/JavaScript基础/JavaScript模块化发展历程",
            },
          ]
        },
        {
          text: "JavaScript的对象的属性和方法",
          collapsible: true,
          collapsed: true,
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
          collapsible: true,
          collapsed: true,
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
          text: "JavaScript的运行和原理",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "1.JavaScript的运行环境",
              link: "/Document/JavaScript笔记/JavaScript的运行和原理/JavaScript的运行环境",
            },
            {
              text: "2.JavaScript的内存管理",
              link: "/Document/JavaScript笔记/JavaScript的运行和原理/JavaScript的内存管理",
            },
            {
              text: "3.JavaScript的引擎的运行",
              link: "/Document/JavaScript笔记/JavaScript的运行和原理/JavaScript的引擎的运行原理",
            },
          ]
        },
        {
          text: "ECMAScript语法",
          collapsible: true,
          collapsed: true,
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
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-8(ES2017)",
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
            {
              text: "ECMAScript-14(ES2023)",
              link: "/Document/JavaScript笔记/ECMAScript语法/ECMAScript-14(ES2023)",
            },
          ]
        },
        {
          text: "实用的JavaScript代码片段",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "JavaScript代码片段1",
              link: "/Document/JavaScript笔记/实用的JavaScript代码片段/JavaScript代码片段1",
            },
            {
              text: "JavaScript编程技巧",
              link: "/Document/JavaScript笔记/实用的JavaScript代码片段/JavaScript编程技巧",
            },
          ]
        },
        {
          text: "JavaScript解决方案",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "JavaScript代码混淆和逆向",
              link: "/Document/JavaScript笔记/JavaScript解决方案/JavaScript代码混淆和逆向",
            },
            {
              text: "",
              link: "/Document/JavaScript笔记/JavaScript解决方案/",
            },
            {
              text: "",
              link: "/Document/JavaScript笔记/JavaScript解决方案/",
            },
            {
              text: "",
              link: "/Document/JavaScript笔记/JavaScript解决方案/",
            },
          ]
        }
      ]
    },
    {
      text: "😊前端基础练手项目",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "前端基础练手项目",
          link: "/Document/前端基础练手项目/开源的前端基础练手项目",
        }
      ]
    },
    {
      text: "😊TypeScript笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "TypeScript学习指南",
          link: "/Document/TypeScript/TypeScript学习指南",
        },
        {
          text: "TypeScript开发前置",
          collapsible: true,
          collapsed: true,
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
              text: "3-TypeScript编译和编译优化",
              link: "/Document/TypeScript/TypeScript开发前置/3-TypeScript编译和编译优化",
            },
            {
              text: "4-使用Webpack打包TypeScript",
              link: "/Document/TypeScript/TypeScript开发前置/4-使用Webpack打包TypeScript",
            },
          ],
        },
        {
          text: "TypeScript语法基础",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "1-基础类型",
              link: "/Document/TypeScript/TypeScript语法基础/1-基础类型",
            },
            {
              text: "2-function函数",
              link: "/Document/TypeScript/TypeScript语法基础/2-function函数",
            },
            {
              text: "3-class类",
              link: "/Document/TypeScript/TypeScript语法基础/3-class类",
            },
            {
              text: "4-interface接口",
              link: "/Document/TypeScript/TypeScript语法基础/4-interface接口",
            },
            {
              text: "5-泛型",
              link: "/Document/TypeScript/TypeScript语法基础/5-泛型",
            },
            {
              text: "6-结构类型系统兼容性",
              link: "/Document/TypeScript/TypeScript语法基础/6-结构类型系统兼容性",
            },
            {
              text: "7-类型守卫(保护)",
              link: "/Document/TypeScript/TypeScript语法基础/7-类型守卫(保护)",
            },
            {
              text: "8-TS高阶--类型变换",
              link: "/Document/TypeScript/TypeScript语法基础/8-TS高阶--类型变换",
            },
            {
              text: "9-模块VS命名空间",
              link: "/Document/TypeScript/TypeScript语法基础/9-模块VS命名空间",
            },
            {
              text: "10-类型声明",
              link: "/Document/TypeScript/TypeScript语法基础/10-类型声明",
            },
            {
              text: "11-声明文件模块标准",
              link: "/Document/TypeScript/TypeScript语法基础/11-声明文件模块标准",
            },
            {
              text: "12-装饰器",
              link: "/Document/TypeScript/TypeScript语法基础/12-装饰器",
            },
            {
              text: "TypeScript中的工程化",
              link: "/Document/TypeScript/TypeScript语法基础/TypeScript中的工程化",
            },
            {
              text: "其他",
              link: "/Document/TypeScript/TypeScript语法基础/其他",
            },
            {
              text: "TypeScript项目实战",
              link: "/Document/TypeScript/TypeScript语法基础/TypeScript项目实战",
            },
          ],
        },
        {
          text: "TypeScript配置文件",
          link: "/Document/TypeScript/TypeScript配置文件/TypeScript配置文件",
        },
      ],
    },
    {
      text: "🌝代码浏览器兼容问题",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "浏览器兼容性问题解决",
          link: "/Document/代码浏览器兼容问题/浏览器兼容性问题解决"
        },
        {
          text: "",
          link: "/Document/代码浏览器兼容问题/"
        },
      ],
    },
    {
      text: "🌝Web协议和其他原理",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "网络协议概念入门",
          link: "/Document/Web协议和其他原理/网络协议概念入门"
        },
        {
          text: "TCP服务器",
          link: "/Document/Web协议和其他原理/TCP服务器"
        },
        {
          text: "HTTP协议和TCP协议",
          link: "/Document/Web协议和其他原理/HTTP协议和TCP协议"
        },
        {
          text: "HTTP服务器",
          link: "/Document/Web协议和其他原理/HTTP服务器"
        },
        {
          text: "HTTPS协议",
          link: "/Document/Web协议和其他原理/HTTPS协议"
        },
        {
          text: "Cookie",
          link: "/Document/Web协议和其他原理/Cookie"
        },
        {
          text: "浏览器工作原理",
          link: "/Document/Web协议和其他原理/浏览器工作原理"
        }
      ],
    },
    
    {
      text: "😃前端主流开发框架学习",
      items: [],
    },
    {
      text: "Vue学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Vue2相关",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Vue2进阶",
              link: "/Document/前端主流开发框架/Vue/Vue2相关/Vue2难点进阶",
            },
          ]
        },
        {
          text: "Vue3学习指导",
          link: "/Document/前端主流开发框架/Vue/Guide",
        },
        {
          text: "Vue项目开发调试",
          link: "/Document/前端主流开发框架/Vue/Vue项目开发调试",
        },
        {
          text: "Vue开发移动端并打包成APK",
          link: "/Document/前端主流开发框架/Vue/Vue开发移动端并打包成APK",
        },
        {
          text: "Vue3快速上手",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "01_认识Vue3",
              link: "/Document/前端主流开发框架/Vue/Vue3快速上手/01_认识Vue3",
            },
            {
              text: "02_创建vue3项目",
              link: "/Document/前端主流开发框架/Vue/Vue3快速上手/02_创建vue3项目",
            },
          ],
        },
        {
          text: "Vue3 Composition API",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "01_常用部分",
              link: "/Document/前端主流开发框架/Vue/Vue3 Composition API/01_常用部分",
            },
            {
              text: "02_其它部分",
              link: "/Document/前端主流开发框架/Vue/Vue3 Composition API/02_其它部分",
            },
            {
              text: "03_手写组合API",
              link: "/Document/前端主流开发框架/Vue/Vue3 Composition API/03_手写组合API",
            },
            {
              text: "04_Composition VS Option",
              link: "/Document/前端主流开发框架/Vue/Vue3 Composition API/04_Composition VS Option",
            },
          ],
        },
        {
          text: "Vue3其它新组件和API",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "01_新组件",
              link: "/Document/前端主流开发框架/Vue/Vue3其它新组件和API/01_新组件",
            },
            {
              text: "02_scriptsetup语法糖",
              link: "/Document/前端主流开发框架/Vue/Vue3其它新组件和API/02_scriptsetup语法糖",
            },
            {
              text: "03_其他新API",
              link: "/Document/前端主流开发框架/Vue/Vue3其它新组件和API/03_其他新API",
            },
          ],
        },
        {
          text: "Vue3综合案例",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "TodoList",
              link: "/Document/前端主流开发框架/Vue/Vue3综合案例/TodoList",
            },
          ],
        },
        {
          text: "JavaScript模块导入导出",
          link: "/Document/前端主流开发框架/Vue/JavaScript模块导入导出",
        },
        {
          text: "Vue开发库",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "vueRouter",
              link: "/Document/前端主流开发框架/Vue/Vue开发库/vue-router",
            },
            {
              text: "vuex",
              link: "/Document/前端主流开发框架/Vue/Vue开发库/vuex",
            },
            {
              text: "pinia",
              link: "/Document/前端主流开发框架/Vue/Vue开发库/pinia",
            },
            {
              text: "axios",
              link: "/Document/前端主流开发框架/Vue/Vue开发库/axios",
            },
            {
              text: "tailwindcss",
              link: "/Document/前端主流开发框架/Vue/Vue开发库/tailwindcss",
            },
            // {
            //   text: "",
            //   link: "/Document/前端主流开发框架/Vue/Vue3开发库/",
            // },
          ],
        },
        {
          text: "Vue3项目开发规范",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Vue3项目开发规范",
              link: "/Document/前端主流开发框架/Vue/Vue3项目开发规范/Vue3项目开发规范",
            },
          ],
        },
        {
          text: "Vue测试",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Vue项目测试学习指南",
              link: "/Document/前端主流开发框架/Vue/Vue测试/Vue项目测试学习指南",
            },
            {
              text: "单元测试",
              link: "/Document/前端主流开发框架/Vue/Vue测试/单元测试",
            },
            {
              text: "组件测试",
              link: "/Document/前端主流开发框架/Vue/Vue测试/组件测试",
            },
            {
              text: "端到端测试",
              link: "/Document/前端主流开发框架/Vue/Vue测试/端到端测试",
            },
          ],
        },
        {
          text: "Vue服务端渲染",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "服务端渲染导学",
              link: "/Document/前端主流开发框架/Vue/Vue服务端渲染/服务端渲染导学",
            },
            {
              text: "Vue+Nuxt服务端渲染",
              link: "/Document/前端主流开发框架/Vue/Vue服务端渲染/Vue+Nuxt服务端渲染",
            },
            {
              text: "Nuxt笔记",
              link: "/Document/前端主流开发框架/Vue/Vue服务端渲染/Nuxt笔记",
            },
            {
              text: "Nuxt3笔记",
              link: "/Document/前端主流开发框架/Vue/Vue服务端渲染/Nuxt3笔记",
            },
          ],
        },
        {
          text: "Vue常用组件开发实战",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "01_前置指导",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/00_前置指导",
            },
            {
              text: "02_表单组件",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/01_表单组件",
            },
            {
              text: "03_全局加载组件",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/02_全局加载组件",
            },
            {
              text: "04_全局消息组件",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/03_全局消息组件",
            },
            {
              text: "05_上传组件",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/04_上传组件",
            },
            {
              text: "",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/",
            },
            {
              text: "组件发布",
              link: "/Document/前端主流开发框架/Vue/Vue常用组件开发实战/组件发布",
            },
          ],
        },
        {
          text: "Vue和WebAssembly",
          link: "/Document/前端主流开发框架/Vue/Vue和WebAssembly",
        },
        {
          text: "Vue3前端综合解决方案",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "00_setup()和scriptsetup语法糖",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/00_setup()和scriptsetup语法糖",
            },
            {
              text: "02_项目架构解决方案",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/01_项目架构解决方案",
            },
            {
              text: "02_项目架构之搭建登录架构方案与实现",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/02_项目架构之搭建登录架构方案与实现",
            },
            {
              text: "03_项目架构之搭建Layout架构方案与实现",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/03_项目架构之搭建Layout架构方案与实现",
            },
            {
              text: "04_后台项目通用功能开发",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/04_后台项目通用功能开发",
            },
            {
              text: "05_UI框架解决方案Vue3和ElementPlus",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/05_UI框架解决方案Vue3和ElementPlus",
            },
            {
              text: "06_角色、权限控制功能实现的解决方案",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/06_角色、权限控制功能实现的解决方案",
            },
            {
              text: "vue3+vite+ts的icons图标使用方案",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/vue3+vite+ts的icons图标使用方案",
            },
            {
              text: "Vue3的样式相关和CSS新特性应用",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/Vue3的样式相关和CSS新特性应用",
            },
            {
              text: "vue3使用icon图标的方案",
              link: "/Document/前端主流开发框架/Vue/Vue3前端综合解决方案/vue3使用icon图标的方案",
            },
          ],
        },
        {
          text: "Vue全家桶源码解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Vue2源码解析",
              link: "/Document/前端主流开发框架/Vue/Vue全家桶源码解析/Vue2源码解析",
            },
            {
              text: 'Vue3源码解析',
              link: '/Document/前端主流开发框架/Vue/Vue全家桶源码解析/Vue3源码解析',
            },
            {
              text: 'nextTick前置：event loop 和 nextTick',
              link: '/Document/前端主流开发框架/Vue/Vue全家桶源码解析/nextTick前置：event loop 和 nextTick',
            },
            {
              text: "Vuex源码原理解析和实现",
              link: "/Document/前端主流开发框架/Vue/Vue全家桶源码解析/Vuex源码原理解析和实现",
            },
            {
              text: "Pinia源码原理解析和实现",
              link: "/Document/前端主流开发框架/Vue/Vue全家桶源码解析/Pinia源码原理解析和实现",
            },
            {
              text: "VueRouter源码原理解析和实现",
              link: "/Document/前端主流开发框架/Vue/Vue全家桶源码解析/VueRouter源码原理解析和实现",
            },
          ],
        },
      ]
    },
    {
      text: "React学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "React学习前置",
          link: "/Document/前端主流开发框架/React/React学习前置",
        },
        {
          text: "React快速上手",
          link: "/Document/前端主流开发框架/React/React快速上手",
        },
        {
          text: "React实战",
          link: "/Document/前端主流开发框架/React/React实战",
        },
        {
          text: "Dva数据流方案",
          link: "/Document/前端主流开发框架/React/Dva数据流方案",
        },
        {
          text: "React全家桶源码解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "React源码解析",
              link: "/Document/前端主流开发框架/React/React全家桶源码解析/React源码解析",
            },
            {
              text: "redux源码解析",
              link: "/Document/前端主流开发框架/React/React全家桶源码解析/redux源码解析",
            },
            {
              text: "reactRouter源码解析",
              link: "/Document/前端主流开发框架/React/React全家桶源码解析/reactRouter源码解析",
            },
          ]
        },
      ]
    },
    {
      text: "😪Svelte学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Svelte简介和相关网站",
          link: "/Document/前端主流开发框架/Svelte/Svelte简介和相关网站",
        },
      ]
    },
    {
      text: "😪Solid学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "solid简介和相关网站",
          link: "/Document/前端主流开发框架/Solid/solid简介和相关网站",
        },
      ]
    },
    {
      text: "😪HTMX学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "HTMX简介和相关网站",
          link: "/Document/前端主流开发框架/HTMX/HTMX简介和相关网站",
        },
      ]
    },
    {
      text: "Angular学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Angular学习前置",
          link: "/Document/前端主流开发框架/Angular/Angular学习前置",
        },
        {
          text: "Angular快速上手",
          link: "/Document/前端主流开发框架/Angular/Angular快速上手",
        },
        {
          text: "Angular实战",
          link: "/Document/前端主流开发框架/Angular/Angular实战",
        },
        {
          text: "Angular Signal",
          link: "/Document/前端主流开发框架/Angular/Angular Signal",
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
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "微信公众号简介和相关资源",
              link: "/Document/微信开发/微信公众号开发/微信公众号简介和相关资源",
            },
            {
              text: "微信公众号开发",
              link: "/Document/微信开发/微信公众号开发/微信公众号开发",
            },
            {
              text: "Koa开发微信公众号后端服务",
              link: "/Document/微信开发/微信公众号开发/Koa开发微信公众号后端服务",
            },
          ],
        },
        {
          text: "微信小程序开发",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "微信小程序简介和相关资源",
              link: "/Document/微信开发/微信小程序开发/微信小程序简介和相关资源",
            },
          ],
        },
        {
          text: "微信小游戏开发",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "0.什么是微信小游戏",
              link: "/Document/微信开发/微信小游戏开发/0.什么是微信小游戏",
            },
            {
              text: "1.游戏引擎",
              link: "/Document/微信开发/微信小游戏开发/1.游戏引擎",
            },
            {
              text: "2.微信小游戏开发",
              link: "/Document/微信开发/微信小游戏开发/2.微信小游戏开发",
            },
            {
              text: "3.Canvas-WebGL游戏开发",
              link: "/Document/微信开发/微信小游戏开发/3.Canvas-WebGL游戏开发",
            },
          ],
        },
        {
          text: "微信云开发",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "小程序云开发",
              link: "/Document/微信开发/微信云开发/小程序云开发",
            },
          ],
        },
      ]
    },
    {
      text: "😪跨平台桌面端开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "前端跨平台开发框架",
          link: "/Document/跨平台桌面端开发/前端跨平台开发框架",
        },
        {
          text: "😗Electron笔记",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Electron学习指南",
              link: "/Document/跨平台桌面端开发/Electron/Guide",
            },
            {
              text: "Electron依赖在项目安装",
              link: "/Document/跨平台桌面端开发/Electron/Electron依赖在项目安装",
            },
            {
              text: "Electron入门",
              link: "/Document/跨平台桌面端开发/Electron/Electron入门",
            },
            {
              text: "Electron快速项目开发",
              link: "/Document/跨平台桌面端开发/Electron/Electron快速项目开发",
            },
            {
              text: "Electron相关技巧",
              link: "/Document/跨平台桌面端开发/Electron/Electron相关技巧",
            },
            {
              text: "Electron+robotjs实现自动化",
              link: "/Document/跨平台桌面端开发/Electron/Electron+robotjs实现自动化",
            },
            {
              text: "Electron激活码机制",
              link: "/Document/跨平台桌面端开发/Electron/Electron激活码机制",
            },
            {
              text: "Electron实现插件化",
              link: "/Document/跨平台桌面端开发/Electron/Electron实现插件化",
            },
            {
              text: "Electron库",
              link: "/Document/跨平台桌面端开发/Electron/Electron库",
            },
            {
              text: "Electron开发踩坑",
              link: "/Document/跨平台桌面端开发/Electron/Electron开发踩坑",
            },
            {
              text: "Electron打包工具的选择",
              link: "/Document/跨平台桌面端开发/Electron/Electron打包工具的选择",
            },
            {
              text: "electron-builder打包配置",
              link: "/Document/跨平台桌面端开发/Electron/electron-builder打包配置",
            },
            
            {
              text: "electron-packager打包配置",
              link: "/Document/跨平台桌面端开发/Electron/electron-packager打包配置",
            },
            {
              text: "@electron-forge打包配置",
              link: "/Document/跨平台桌面端开发/Electron/@electron-forge打包配置",
            },
            {
              text: "Electron打包遇见问题及解决",
              link: "/Document/跨平台桌面端开发/Electron/Electron打包遇见问题及解决",
            },
            {
              text: "Electron项目打包优化配置",
              link: "/Document/跨平台桌面端开发/Electron/Electron项目打包优化配置",
            },
            {
              text: "Electron应用更新",
              link: "/Document/跨平台桌面端开发/Electron/Electron应用更新",
            },
            {
              text: "Electron应用质量监控",
              link: "/Document/跨平台桌面端开发/Electron/Electron应用质量监控",
            },
            {
              text: "Electron集成C++能力",
              link: "/Document/跨平台桌面端开发/Electron/Electron集成C++能力",
            },
            {
              text: "Electron自动化测试",
              link: "/Document/跨平台桌面端开发/Electron/Electron自动化测试",
            },
            {
              text: "Electron体验优化",
              link: "/Document/跨平台桌面端开发/Electron/Electron体验优化",
            },
            {
              text: "Electron客户端安全",
              link: "/Document/跨平台桌面端开发/Electron/Electron客户端安全",
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
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri框架入门",
            },
            {
              text: "Tauri相关技巧",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri相关技巧",
            },
            {
              text: "Tauri打包遇见问题及解决",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri打包遇见问题及解决",
            },
            {
              text: "Rust语言学习",
              link: "/Document/跨平台桌面端开发/Tauri框架/Rust语言学习",
            },
            {
              text: "Tauri框架项目",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri框架项目",
            },
            {
              text: "Tauri插件安装与踩坑",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri插件安装与踩坑",
            },
            {
              text: "Tauri-path和fs的路径",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri-path和fs的路径",
            },
            {
              text: "Tauri开发的应用实现插件化机制",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri开发的应用实现插件化机制",
            },
            {
              text: "Tauri应用程序崩溃收集处理",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri应用程序崩溃收集处理",
            },
            {
              text: "Tauri应用日志记录",
              link: "/Document/跨平台桌面端开发/Tauri框架/Tauri应用日志记录",
            },
          ]
        },
        {
          text: "😯Wails框架",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Wails介绍",
              link: "/Document/跨平台桌面端开发/Wails框架/Wails介绍",
            },
          ]
        },
        {
          text: "😯Flutter桌面端开发",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Flutter简介",
              link: "/Document/跨平台桌面端开发/Flutter/Flutter简介",
            },
            // {
            //   text: "Flutter开发环境配置",
            //   link: "/Document/跨平台桌面端开发/Flutter/Flutter开发环境配置",
            // },
            // {
            //   text: "Flutter开发实战",
            //   link: "/Document/跨平台桌面端开发/Flutter/Flutter开发实战",
            // },
          ]
        }
      ]
    },
    {
      text: "😪移动端软件开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "React Native",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "React Native简介",
              link: "/Document/移动端软件开发/React Native/React Native简介",
            },
          ]
        },
        {
          text: "😪Flutter框架学习",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Flutter简介",
              link: "/Document/移动端软件开发/Flutter框架/Flutter简介",
            },
            {
              text: "Flutter前置准备",
              link: "/Document/移动端软件开发/Flutter框架/Flutter前置准备",
            },
            {
              text: "Dart语言基础",
              link: "/Document/移动端软件开发/Flutter框架/Dart语言基础",
            },
            {
              text: "Flutter开发环境配置",
              link: "/Document/移动端软件开发/Flutter框架/Flutter开发环境配置",
            },
            {
              text: "Flutter框架入门开发",
              link: "/Document/移动端软件开发/Flutter框架/Flutter框架入门开发",
            },
            {
              text: "Flutter实战",
              link: "/Document/移动端软件开发/Flutter框架/Flutter实战",
            },
            {
              text: "Flutter遇见问题及解决",
              link: "/Document/移动端软件开发/Flutter框架/Flutter遇见问题及解决",
            },
          ]
        },
        {
          text: "uni-app",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "uni-app简介",
              link: "/Document/移动端软件开发/uni-app/uni-app简介",
            },
          ]
        },
      ]
    },
    {
      text: "😏前端综合解决方案",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "前端项目功能介绍",
          link: "/Document/前端综合解决方案/前端项目功能介绍",
        },
        {
          text: "编程规范",
          link: "/Document/前端综合解决方案/编程规范",
        },
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
        {
          text: "纯CSS图标",
          link: "/Document/前端综合解决方案/纯CSS图标",
        },
        {
          text: "建立属于自己的前端组件库",
          link: "/Document/前端综合解决方案/建立属于自己的前端组件库",
        },
      ],
    },
    {
      text: "😁微前端",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "微前端学习指导",
          link: "/Document/微前端/微前端学习指导",
        },
        {
          text: "微前端开源框架",
          link: "/Document/微前端/微前端开源框架",
        },
        {
          text: "微前端架构设计",
          link: "/Document/微前端/微前端架构设计",
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
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "学习指导",
              link: "/Document/Project-Engineering/前端工程化/学习指导",
            },
            {
              text: "前端效率工程化",
              link: "/Document/Project-Engineering/前端工程化/前端效率工程化",
            },
            {
              text: "敏捷开发-DevOps",
              link: "/Document/Project-Engineering/前端工程化/敏捷开发-DevOps",
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
              text: "端到端测试",
              link: "/Document/Project-Engineering/前端工程化/端到端测试",
            },
            {
              text: "静态代码检查",
              link: "/Document/Project-Engineering/前端工程化/静态代码检查",
            },
            {
              text: "项目开发的Monorepo策略",
              link: "/Document/Project-Engineering/前端工程化/项目开发的Monorepo策略",
            },
          ],
        },
        {
          text: "系统项目架构",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "项目系统架构",
              link: "/Document/Project-Engineering/项目系统架构/项目系统架构",
            },
            {
              text: "脚手架架构设计和框架搭建开发",
              link: "/Document/Project-Engineering/项目系统架构/脚手架架构设计和框架搭建开发",
            },
            {
              text: "组件的标准化",
              link: "/Document/Project-Engineering/项目系统架构/组件的标准化",
            },
            {
              text: "自动化测试",
              link: "/Document/Project-Engineering/项目系统架构/自动化测试",
            },
          ],
        },
        {
          text: "协同工作源码管理",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "协同工作",
              link: "/Document/Project-Engineering/协同工作源码管理/协同工作",
            },
            {
              text: "源码管理",
              link: "/Document/Project-Engineering/协同工作源码管理/源码管理",
            },
          ],
        },
        {
          text: "自动化持续集成",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "学习指导",
              link: "/Document/Project-Engineering/自动化持续集成/学习指导",
            },
            {
              text: "前端自动化",
              link: "/Document/Project-Engineering/自动化持续集成/前端自动化",
            },
            {
              text: "持续集成",
              link: "/Document/Project-Engineering/自动化持续集成/持续集成",
            },
            {
              text: "GitHub Actions",
              link: "/Document/Project-Engineering/自动化持续集成/GitHub Actions",
            },
            {
              text: "持续集成服务Travis CI",
              link: "/Document/Project-Engineering/自动化持续集成/持续集成服务Travis CI",
            },
            {
              text: "持续部署",
              link: "/Document/Project-Engineering/自动化持续集成/持续部署",
            },
            {
              text: "持续交付",
              link: "/Document/Project-Engineering/自动化持续集成/持续交付",
            },
          ],
        },
        {
          text: "前端工具链",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "学习指南",
              link: "/Document/Project-Engineering/前端工具链/学习指南",
            },
            {
              text: "webpack",
              link: "/Document/Project-Engineering/前端工具链/webpack",
            },
            {
              text: "vite",
              link: "/Document/Project-Engineering/前端工具链/vite",
            },
            {
              text: "rolldown",
              link: "/Document/Project-Engineering/前端工具链/rolldown",
            },
            {
              text: "babel",
              link: "/Document/Project-Engineering/前端工具链/babel",
            },
            {
              text: "SWC",
              link: "/Document/Project-Engineering/前端工具链/SWC",
            },
            {
              text: "Oxc",
              link: "/Document/Project-Engineering/前端工具链/Oxc",
            },
            {
              text: "OxcLint",
              link: "/Document/Project-Engineering/前端工具链/OxcLint",
            },
            {
              text: "LightningCSS",
              link: "/Document/Project-Engineering/前端工具链/LightningCSS",
            },
            {
              text: "art-grap",
              link: "/Document/Project-Engineering/前端工具链/art-grap",
            },
            {
              text: "gulp",
              link: "/Document/Project-Engineering/前端工具链/gulp",
            }, 
            {
              text: "grunt",
              link: "/Document/Project-Engineering/前端工具链/grunt",
            },
            {
              text: "browserify",
              link: "/Document/Project-Engineering/前端工具链/browserify",
            },
            {
              text: "yeoman",
              link: "/Document/Project-Engineering/前端工具链/yeoman",
            },
            {
              text: "Rollup",
              link: "/Document/Project-Engineering/前端工具链/rollup",
            },
            {
              text: "Parcel",
              link: "/Document/Project-Engineering/前端工具链/parcel",
            },
            {
              text: "esbuild",
              link: "/Document/Project-Engineering/前端工具链/esbuild",
            },
            {
              text: "Turbopack",
              link: "/Document/Project-Engineering/前端工具链/Turbopack",
            },
            {
              text: "Biome",
              link: "/Document/Project-Engineering/前端工具链/Biome",
            },
            {
              text: "",
              link: "/Document/Project-Engineering/前端工具链/",
            },
          ],
        },
        {
          text: "😉前端监控",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "前端监控",
              link: "/Document/Project-Engineering/前端监控/前端监控",
            },
          ]
        },
        {
          text: "😉技术文档沉淀",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "技术文档沉淀",
              link: "/Document/Project-Engineering/技术文档沉淀/技术文档沉淀",
            },
          ]
        },
      ]
    },
    
    {
      text: "😍Git软件版本管理笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "Git学习指南",
          link: "/Document/Git/Guide",
        },
        {
          text: "Git软件安装和配置",
          link: "/Document/Git/00_Git软件安装和配置",
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
        {
          text: "05_服务器自动部署",
          link: "/Document/Git/05_服务器自动部署",
        },
        {
          text: "06_GitLab-CI、CD",
          link: "/Document/Git/06_GitLab-CI、CD",
        },
      ]
    },
    {
      text: "😘Serverless",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "Serverless基础概念",
          link: "/Document/Serverless/Serverless基础概念",
        },
        {
          text: "Serverle应用开发",
          link: "/Document/Serverless/Serverle应用开发",
        },
        {
          text: "Serverle应用开发进阶",
          link: "/Document/Serverless/Serverle应用开发进阶",
        },
        {
          text: "Serverle应用实战场景案例",
          link: "/Document/Serverless/Serverle应用实战场景案例",
        },
        {
          text: "Serverle实践总结和未来展望",
          link: "/Document/Serverless/Serverle实践总结和未来展望",
        },
      ]
    },
    {
      text: "😘前端安全",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "常见攻击手段攻防演练",
          link: "/Document/前端安全/常见攻击手段攻防演练",
        },
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
          text: "GitHub仓库辅助工具",
          link: "/Document/GitHub的使用/GitHub仓库辅助工具",
        },
        {
          text: "",
          link: "/Document/GitHub的使用/",
        },
      ]
    },
    {
      text: "😳Chrome 插件开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "Chrome插件开发入门",
          link: "/Document/Chrome 插件开发/Chrome插件开发入门",
        },
      ]
    },
    {
      text: "😳Shell和Bat脚本语言和批处理",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "0.理解DOS, cmd, bat, shell, bash",
          link: "/Document/Shell和Bat脚本语言和批处理/0.理解DOS, cmd, bat, shell, bash",
        },
        {
          text: "1.Windows批处理脚本和cmd",
          link: "/Document/Shell和Bat脚本语言和批处理/1.Windows批处理脚本和cmd",
        },
        {
          text: "2.Shell脚本编程",
          link: "/Document/Shell和Bat脚本语言和批处理/2.Shell脚本编程",
        },
        {
          text: "3.Windows批处理脚本教程",
          link: "/Document/Shell和Bat脚本语言和批处理/3.Windows批处理脚本教程",
        },
        {
          text: "4.Windows批处理脚本示例",
          link: "/Document/Shell和Bat脚本语言和批处理/4.Windows批处理脚本示例",
        },
        {
          text: "命令行工具",
          link: "/Document/Shell和Bat脚本语言和批处理/命令行工具",
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
          collapsible: true,
          collapsed: true,
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
          ]
        },
        {
          text: "Node开发调试",
          link: "/Document/DevDebug/Node开发调试",
        },
        {
          text: "DevTools开发者工具调试",
          link: "/Document/DevDebug/DevTools开发者工具调试",
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
      text: "😉数据可视化专题",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "canvas可视化",
          link: "/Document/数据可视化/canvas可视化",
        },
        {
          text: "webgl可视化",
          link: "/Document/数据可视化/webgl可视化",
        },
        {
          text: "Echarts可视化",
          link: "/Document/数据可视化/Echarts可视化",
        },
        {
          text: "ThreeJS可视化",
          link: "/Document/数据可视化/ThreeJS可视化",
        },
        {
          text: "d3JS可视化",
          link: "/Document/数据可视化/d3JS可视化",
        },
        {
          text: "",
          link: "/Document/数据可视化/",
        },
      ]
    },
    {
      text: "😉爬虫和Web自动化测试",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "playwright的入门和使用",
          link: "/Document/爬虫和Web自动化测试/playwright的入门和使用",
        },
        {
          text: "",
          link: "/Document/爬虫和Web自动化测试/",
        },
      ]
    },
    {
      text: "😊Docker学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Docker入门",
          link: "/Document/Docker学习/Docker入门",
        },
        {
          text: "前端使用Docker",
          link: "/Document/Docker学习/前端使用Docker",
        },
      ]
    },
    {
      text: "😉前端进阶技巧",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "前端基础知识",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "HTML标签不常用补充",
              link: "/Document/前端进阶技巧/前端基础知识/HTML标签不常用补充",
            },
            {
              text: "如何高效操作DOM元素",
              link: "/Document/前端进阶技巧/前端基础知识/如何高效操作DOM元素",
            },
            {
              text: "3个场景助你用好DOM事件",
              link: "/Document/前端进阶技巧/前端基础知识/3个场景助你用好DOM事件",
            },
            {
              text: "掌握CSS精髓-布局",
              link: "/Document/前端进阶技巧/前端基础知识/掌握CSS精髓-布局",
            },
            {
              text: "如何管理你的CSS代码",
              link: "/Document/前端进阶技巧/前端基础知识/如何管理你的CSS代码",
            },
            {
              text: "浏览器如何渲染页面",
              link: "/Document/前端进阶技巧/前端基础知识/浏览器如何渲染页面",
            },
            {
              text: "JavaScript的数据类型",
              link: "/Document/前端进阶技巧/前端基础知识/JavaScript的数据类型",
            },
            {
              text: "JavaScript的数据类型",
              link: "/Document/前端进阶技巧/前端基础知识/JavaScript的数据类型",
            },
            {
              text: "为什么说函数是JavaScript的一等公民",
              link: "/Document/前端进阶技巧/前端基础知识/为什么说函数是JavaScript的一等公民",
            },
            {
              text: "如何复用代码（模块化）",
              link: "/Document/前端进阶技巧/前端基础知识/如何复用代码（模块化）",
            },
            {
              text: "为什么JavaScript不适合大型项目（typescript的兴起）",
              link: "/Document/前端进阶技巧/前端基础知识/为什么JavaScript不适合大型项目（typescript的兴起）",
            },
            {
              text: "浏览器如何执行JavaScript代码",
              link: "/Document/前端进阶技巧/前端基础知识/浏览器如何执行JavaScript代码",
            },
            {
              text: "区分浏览器中的进程与线程",
              link: "/Document/前端进阶技巧/前端基础知识/区分浏览器中的进程与线程",
            },
            {
              text: "HTTP 协议和它的“补丁”们",
              link: "/Document/前端进阶技巧/前端基础知识/HTTP 协议和它的“补丁”们",
            },
            {
              text: "如何让浏览器更快地加载网络资源",
              link: "/Document/前端进阶技巧/前端基础知识/如何让浏览器更快地加载网络资源",
            },
            {
              text: "浏览器同源策略与跨域方案详解",
              link: "/Document/前端进阶技巧/前端基础知识/浏览器同源策略与跨域方案详解",
            },
          ]
        },
        {
          text: "实际应用场景解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "前后端如何有效沟通",
              link: "/Document/前端进阶技巧/实际应用场景解析/前后端如何有效沟通",
            },{
              text: "理解组件的概念(vue和react的源码原理探索)",
              link: "/Document/前端进阶技巧/实际应用场景解析/理解组件的概念(vue和react的源码原理探索)",
            },
            {
              text: "路由放在前端意味着什么",
              link: "/Document/前端进阶技巧/实际应用场景解析/路由放在前端意味着什么",
            },
            {
              text: "组件通信和状态管理(状态管理源码原理分析)",
              link: "/Document/前端进阶技巧/实际应用场景解析/组件通信和状态管理(状态管理源码原理分析)",
            },
            {
              text: "代码是怎么编译的(webpack前端构建工具源码原理分析)",
              link: "/Document/前端进阶技巧/实际应用场景解析/代码是怎么编译的(webpack前端构建工具源码原理分析)",
            },
            {
              text: "合理搭建前端项目(前端项目构建和代码提交)",
              link: "/Document/前端进阶技巧/实际应用场景解析/合理搭建前端项目(前端项目构建和代码提交)",
            },
            {
              text: "前端性能优化",
              link: "/Document/前端进阶技巧/实际应用场景解析/前端性能优化",
            },
            {
              text: "搭建前端脚手架",
              link: "/Document/前端进阶技巧/实际应用场景解析/搭建前端脚手架",
            },
            {
              text: "你的代码是怎么成为黑客工具的(网络安全)",
              link: "/Document/前端进阶技巧/实际应用场景解析/你的代码是怎么成为黑客工具的(网络安全)",
            },
            {
              text: "Node.j == 全栈？(Node.js 源码架构解析)",
              link: "/Document/前端进阶技巧/实际应用场景解析/Node.j == 全栈？(Node.js 源码架构解析)",
            },
          ]
        },
        {
          text: "综合能力提升",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "常用的数据结构",
              link: "/Document/前端进阶技巧/综合能力提升/常用的数据结构",
            },
            {
              text: "JavaScript算法",
              link: "/Document/前端进阶技巧/综合能力提升/JavaScript算法",
            },
            {
              text: "编程方式的了解",
              link: "/Document/前端进阶技巧/综合能力提升/编程方式的了解",
            },
            {
              text: "前端常用设计模式",
              link: "/Document/前端进阶技巧/综合能力提升/前端常用设计模式",
            },
            {
              text: "分析框架的设计模式",
              link: "/Document/前端进阶技巧/综合能力提升/分析框架的设计模式",
            },
            {
              text: "面向对象封装自己的库",
              link: "/Document/前端进阶技巧/综合能力提升/面向对象封装自己的库",
            },
            {
              text: "函数式编程",
              link: "/Document/前端进阶技巧/综合能力提升/函数式编程",
            },
            {
              text: "前端热点技术 Serverle",
              link: "/Document/前端进阶技巧/综合能力提升/前端热点技术 Serverle",
            },
            {
              text: "微前端与功能的可重用性",
              link: "/Document/前端进阶技巧/综合能力提升/微前端与功能的可重用性",
            },
            {
              text: "前端下载文件",
              link: "/Document/前端进阶技巧/综合能力提升/前端下载文件",
            },
          ]
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
          text: "05_服务端性能优化",
          link: "/Document/前端性能优化专题/05_服务端性能优化",
        },
        {
          text: "06_浏览器端性能优化",
          link: "/Document/前端性能优化专题/06_浏览器端性能优化",
        },
        {
          text: "07_Vue性能优化",
          link: "/Document/前端性能优化专题/07_Vue性能优化",
        },
        {
          text: "08_JavaScript性能优化",
          link: "/Document/前端性能优化专题/08_JavaScript性能优化",
        },
        {
          text: "09_TypeScript性能优化",
          link: "/Document/前端性能优化专题/09_TypeScript性能优化",
        },
      ]
    },
    {
      text: "😜NodeJS笔记",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Node技术栈路线",
          link: "/Document/Node/Node技术栈路线",
        },
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
          text: "Node原理和机制",
          link: "/Document/Node/Node原理和机制",
        },
        {
          text: "Node高级",
          link: "/Document/Node/Node高级",
        },
        {
          text: "Node和其他语言集成",
          link: "/Document/Node/Node和其他语言集成",
        },
        {
          text: "Node实战",
          collapsible: true,
          collapsed: true,
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
          text: "pnpm和yarn学习",
          link: "/Document/Node/pnpm和yarn学习",
        },
        {
          text: "NodeJS学习",
          link: "/Document/Node/NodeJS学习",
        },
        {
          text: "自定义Node模块包发布",
          link: "/Document/Node/自定义Node模块包发布",
        },
        {
          text: "npm scripts 使用指南",
          link: "/Document/Node/npm scripts 使用指南",
        },
        {
          text: "项目packagejson文件配置",
          link: "/Document/Node/项目packagejson文件配置",
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
          collapsible: true,
          collapsed: true,
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
          collapsible: true,
          collapsed: true,
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
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Nest框架介绍和相关网址资源",
              link: "/Document/Node后端框架开发/Nest框架/Nest框架介绍和相关网址资源",
            },
            {
              text: "Nest框架前置知识",
              link: "/Document/Node后端框架开发/Nest框架/Nest框架前置知识",
            },
            {
              text: "Nest框架入门",
              link: "/Document/Node后端框架开发/Nest框架/Nest框架入门",
            },
            {
              text: "Nest框架实战开发",
              link: "/Document/Node后端框架开发/Nest框架/Nest框架实战开发",
            },
            {
              text: "Nest项目开发流程",
              link: "/Document/Node后端框架开发/Nest框架/Nest项目开发流程",
            },
          ],
        },
        {
          text: "Meteor框架",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Meteor框架介绍和资源",
              link: "/Document/Node后端框架开发/Meteor框架/Meteor框架介绍和资源",
            },
            {
              text: "Meteor框架入门",
              link: "/Document/Node后端框架开发/Meteor框架/Meteor框架入门",
            },
          ],
        },
        {
          text: "Fastify框架",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Fastify框架",
              link: "/Document/Node后端框架开发/Fastify框架/Fastify框架",
            }
          ],
        },
        {
          text: "Midway框架",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Midway框架介绍和资源",
              link: "/Document/Node后端框架开发/Midway/Midway框架介绍和资源",
            },
          ],
        },
        {
          text: "接口测试工具",
          link: "/Document/Node后端框架开发/接口测试工具",
        },
        {
          text: "Node项目开发跨域问题",
          link: "/Document/Node后端框架开发/Node项目开发跨域问题",
        },
        {
          text: "Socket.IO",
          link: "/Document/Node后端框架开发/Socket-IO",
        },
        {
          text: "Socket.IO",
          link: "/Document/Node后端框架开发/GraphiQL",
        },
        {
          text: "健壮的Node程序",
          link: "/Document/Node后端框架开发/健壮的Node程序",
        },
        {
          text: "Node项目上线部署",
          link: "/Document/Node后端框架开发/Node项目上线部署",
        },
      ]
    },
    {
      text: "😗其他前端包管理工具",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Deno",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Deno简介和资源",
              link: "/Document/其他前端包管理工具/Deno/Deno简介和资源",
            },
            {
              text: "Deno的安装",
              link: "/Document/其他前端包管理工具/Deno/Deno的安装",
            },
            {
              text: "Deno的使用",
              link: "/Document/其他前端包管理工具/Deno/Deno的使用",
            },
            {
              text: "Deno开发框架",
              link: "/Document/其他前端包管理工具/Deno/Deno开发框架",
            },
          ]
        },
        {
          text: "Bun",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Bun简介和资源",
              link: "/Document/其他前端包管理工具/Bun/Bun简介和资源",
            },
          ]
        },
        {
          text: "比较 Bun、Node.js 和 Deno",
          link: "/Document/其他前端包管理工具/比较 Bun、Node.js 和 Deno",
        },
        {
          text: "LLRT",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "LLRT简介和资源",
              link: "/Document/其他前端包管理工具/LLRT/LLRT简介和资源",
            },
          ]
        },
        {
          text: "Wasmer",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Wasmer简介和资源",
              link: "/Document/其他前端包管理工具/Wasmer/Wasmer简介和资源",
            },
          ]
        },
      ]
    },
    {
      text: "😀数据库的使用",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "SQL语言笔记",
          link: "/Document/数据库的使用/SQL语言笔记"
        },
        {
          text: "数据库简介",
          link: "/Document/数据库的使用/数据库简介"
        },
        {
          text: "MongoDB数据库",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
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
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
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
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
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
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "Postgres数据库",
              link: "/Document/数据库的使用/Postgres数据库/Postgres数据库入门",
            },
          ]
        },
        {
          text: "Elasticsearch",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "全文搜索引擎 Elasticsearch 入门教程",
              link: "/Document/数据库的使用/Elasticsearch/全文搜索引擎Elasticsearch入门教程",
            },
          ],
        },
      ]
    },
    {
      text: "😗服务器相关配置和运维",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "服务器运维和配置",
          link: "/Document/服务器相关配置和运维/服务器运维和配置",
        },
        {
          text: "Nginx配置",
          link: "/Document/服务器相关配置和运维/Nginx配置",
        },
        {
          text: "Apache的配置使用",
          link: "/Document/服务器相关配置和运维/Apache的配置使用",
        },
        {
          text: "Ansible安装和使用",
          link: "/Document/服务器相关配置和运维/Ansible安装和使用",
        },
        {
          text: "Docker安装使用和配置",
          link: "/Document/服务器相关配置和运维/Docker安装使用和配置",
        },
        {
          text: "https配置",
          link: "/Document/服务器相关配置和运维/https配置",
        },
        {
          text: "网络安全",
          link: "/Document/服务器相关配置和运维/网络安全",
        },
      ]
    }, 
    {
      text: "😛基于FFmpeg的使用和开发",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "0.音视频和图像处理相关知识",
          link: "/Document/基于FFmpeg的使用和开发/0.音视频和图像处理相关知识",
        },
        {
          text: "1.FFmpeg的介绍和相关地址",
          link: "/Document/基于FFmpeg的使用和开发/1.FFmpeg的介绍和相关地址",
        },
        {
          text: "2.FFmpeg的安装和目录详解",
          link: "/Document/基于FFmpeg的使用和开发/2.FFmpeg的安装和目录详解",
        },
        {
          text: "3.FFmpeg原理分析",
          link: "/Document/基于FFmpeg的使用和开发/3.FFmpeg原理分析",
        },
        {
          text: "4.FFmpeg的使用",
          link: "/Document/基于FFmpeg的使用和开发/4.FFmpeg的使用",
        },
        {
          text: "5.根据需求编译FFmpeg",
          link: "/Document/基于FFmpeg的使用和开发/5.根据需求编译FFmpeg",
        },
        {
          text: "6.FFmpeg播放器开发",
          link: "/Document/基于FFmpeg的使用和开发/6.FFmpeg播放器开发",
        },
        {
          text: "7.直播流媒体推流开发",
          link: "/Document/基于FFmpeg的使用和开发/7.直播流媒体推流开发",
        },
        {
          text: "8.OpenCV+FFmpeg开发视频编辑器",
          link: "/Document/基于FFmpeg的使用和开发/8.OpenCV+FFmpeg开发视频编辑器",
        },
        {
          text: "FFmpeg相关工具",
          link: "/Document/基于FFmpeg的使用和开发/FFmpeg相关工具",
        },
        {
          text: "音视频图像相关框架",
          link: "/Document/基于FFmpeg的使用和开发/音视频图像相关框架",
        },
        {
          text: "yt-dlp下载安装使用",
          link: "/Document/基于FFmpeg的使用和开发/yt-dlp下载安装使用",
        },
      ],
    },
    {
      text: "😛其他前端编程语言",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "CoffeeScript",
          link: "/Document/其他前端编程语言/CoffeeScript",
        },
        {
          text: "Elm语言",
          link: "/Document/其他前端编程语言/Elm语言",
        },
      ],
    },
    {
      text: "😛WebAssembly",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "WebAssembly简介",
          link: "/Document/WebAssembly/WebAssembly简介",
        },
        {
          text: "WebAssembly入门",
          link: "/Document/WebAssembly/WebAssembly入门",
        },
      ],
    },
    {
      text: "😛Web3学习",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "Web3介绍",
          link: "/Document/Web3学习/Web3介绍",
        },
        {
          text: "Web3Js学习",
          link: "/Document/Web3学习/Web3Js学习",
        },
        {
          text: "EthersJs学习",
          link: "/Document/Web3学习/EthersJs学习",
        },
        {
          text: "solidity学习",
          link: "/Document/Web3学习/solidity学习",
        },
      ],
    },
    {
      text: "😎搭建在线博客或文档网站",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: 'VitePress和VuePress搭建在线博客或文档',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "01_VuePress搭建在线文档",
              link: "/Document/搭建在线博客或文档网站/VitePress和VuePress搭建在线博客或文档/01_VuePress搭建在线文档",
            },
            {
              text: "02_给VitePress添加algolia搜索",
              link: "/Document/搭建在线博客或文档网站/VitePress和VuePress搭建在线博客或文档/02_给VitePress添加algolia搜索",
            },
            {
              text: "使用vitepress搭建博客文档和踩坑",
              link: "/Document/搭建在线博客或文档网站/VitePress和VuePress搭建在线博客或文档/使用vitepress搭建博客文档和踩坑",
            },
            {
              text: "脑洞例子",
              link: "/Document/搭建在线博客或文档网站/VitePress和VuePress搭建在线博客或文档/脑洞例子",
            },
          ]
        },
        {
          text: '基于hexo框架搭建博客',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "hexo框架的介绍和使用",
              link: "/Document/搭建在线博客或文档网站/基于hexo框架搭建博客/hexo框架的介绍和使用",
            },
            {
              text: "",
              link: "/Document/搭建在线博客或文档网站/基于hexo框架搭建博客/",
            },
          ]
        },
        {
          text: 'Obsidian知识管理软件',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "玩转Obsidian",
              link: "/Document/搭建在线博客或文档网站/Obsidian知识管理软件/玩转Obsidian",
            },
            {
              text: "Obsidian插件开发相关",
              link: "/Document/搭建在线博客或文档网站/Obsidian知识管理软件/Obsidian插件开发相关",
            },
          ]
        },
        {
          text: "😘GitBook",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "GitBook制作电子书",
              link: "/Document/搭建在线博客或文档网站/GitBook/GitBook制作电子书",
            }
          ]
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
        {
          text: "GitHub开源项目的运营的相关生态",
          link: "/Document/开源相关/GitHub开源项目的运营的相关生态",
        },
      ]
    },
    {
      text: "😭JavaScript数据结构与算法",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "JavaScript数据结构与算法",
          link: "/Document/JavaScript数据结构与算法/JavaScript数据结构与算法",
        },
        {
          text: "JavaScript算法",
          link: "/Document/JavaScript数据结构与算法/JavaScript算法",
        },
      ]
    },
    {
      text: "😭框架源码原理实现解析",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "源码原理解析学习指导",
          link: "/Document/框架源码原理实现解析/源码原理解析学习指导",
        },
        {
          text: "Vue及全家桶源码解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Vue2源码解析",
              link: "/Document/框架源码原理实现解析/Vue及全家桶源码解析/Vue2源码解析",
            },
            {
              text: "Vue3源码解析",
              link: "/Document/框架源码原理实现解析/Vue及全家桶源码解析/Vue3源码解析",
            },
            {
              text: "Vuex源码解析",
              link: "/Document/框架源码原理实现解析/Vue及全家桶源码解析/Vuex源码解析",
            },
            {
              text: "Pinia源码解析",
              link: "/Document/框架源码原理实现解析/Vue及全家桶源码解析/Pinia源码解析",
            },
            {
              text: "VueRouter源码解析",
              link: "/Document/框架源码原理实现解析/Vue及全家桶源码解析/VueRouter源码解析",
            },
          ]
        },
        {
          text: "前端构建工具源码解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "webpack源码解析",
              link: "/Document/框架源码原理实现解析/前端构建工具源码解析/webpack源码解析",
            }
          ]
        },
        {
          text: "🌝jQuery技术内幕",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "jQuery技术内幕",
              link: "/Document/框架源码原理实现解析/jQuery技术内幕/jQuery技术内幕"
            },
            {
              text: "jQuery源码解析",
              link: "/Document/框架源码原理实现解析/jQuery技术内幕/jQuery源码解析"
            },
          ],
        },
        {
          text: "",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "",
              link: "/Document/框架源码原理实现解析/",
            }
          ]
        },
        {
          text: "",
          link: "/Document/框架源码原理实现解析/",
        },
        {
          text: "Node后端框架源码解析",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "Express框架源码解析",
              link: "/Document/框架源码原理实现解析/Node后端框架源码解析/Express框架源码解析",
            },
            {
              text: "KoaJS框架源码解析",
              link: "/Document/框架源码原理实现解析/Node后端框架源码解析/KoaJS框架源码解析",
            },
            {
              text: "koa和express的对比和优缺点",
              link: "/Document/框架源码原理实现解析/Node后端框架源码解析/koa和express的对比和优缺点",
            },
            {
              text: "Nest框架源码解析",
              link: "/Document/框架源码原理实现解析/Node后端框架源码解析/NestJS框架源码解析",
            },
            
          ]
        },
      ]
    },
    {
      text: "😁从软件到硬件",
      collapsible: true, // 可折叠
      collapsed: true, // 初始折叠
      items: [
        {
          text: "从软件到硬件",
          link: "/Document/从软件到硬件/从软件到硬件",
        },
        {
          text: "JavaScript跨硬件和PC",
          link: "/Document/从软件到硬件/JavaScript跨硬件和PC",
        },
      ]
    },
    {
      text: "😇前端面试相关",
      collapsible: true, // 可折叠
      collapsed: true, // 初始不折叠
      items: [
        {
          text: "【面试准备和如何面试】",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "职业规划和面试技巧",
              link: "/Document/前端面试相关/【面试准备和如何面试】/职业规划和面试技巧"
            },
            {
              text: "面试准备和技巧",
              link: "/Document/前端面试相关/【面试准备和如何面试】/面试准备和技巧"
            },
            {
              text: "前端工程师简历怎么写",
              link: "/Document/前端面试相关/【面试准备和如何面试】/前端工程师简历怎么写"
            },
            {
              text: "面试流程和面试经验",
              link: "/Document/前端面试相关/【面试准备和如何面试】/面试流程和面试经验",
            },
            {
              text: "面试刷题网站",
              link: "/Document/前端面试相关/【面试准备和如何面试】/面试刷题网站"
            },
            {
              text: "模拟面试",
              link: "/Document/前端面试相关/【面试准备和如何面试】/模拟面试"
            },
            {
              text: "别人的面试总结",
              link: "/Document/前端面试相关/【面试准备和如何面试】/别人的面试总结"
            },
          ]
        },

        {
          text: "【前端面试题】",
          collapsible: true, // 可折叠
          collapsed: true, // 初始不折叠
          items: [
            {
              text: "掘金面试相关题或文章",
              link: "/Document/前端面试相关/【前端面试题】/掘金面试相关题或文章"
            },
            {
              text: "计算机基础面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "编译原理面试题",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/编译原理面试题"
                },
                {
                  text: "操作系统面试题",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/操作系统面试题"
                },
                {
                  text: "计算机组成原理",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/计算机组成原理"
                },
                {
                  text: "计算机网络面试题",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/计算机网络面试题"
                },
                {
                  text: "前端软件工程面试题",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/前端软件工程面试题"
                },

                {
                  text: "JS设计模式面试题",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/JS设计模式面试题"
                },
                {
                  text: "JS数据结构和算法",
                  link: "/Document/前端面试相关/【前端面试题】/计算机基础面试题/JS数据结构和算法"
                },
              ]
            },
            {
              text: "【其他面试题】",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "前端错误监控面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/前端错误监控面试题"
                },
                {
                  text: "前端工程能力面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/前端工程能力面试题"
                },
                {
                  text: "前端实际项目中的问题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/前端实际项目中的问题"
                },
                {
                  text: "前端性能优化面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/前端性能优化面试题"
                },
                {
                  text: "前后端交互面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/前后端交互面试题"
                },
                {
                  text: "网络安全面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/网络安全面试题"
                },
                {
                  text: "微信小程序开发面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/微信小程序开发面试题"
                },
                {
                  text: "项目设计和开发工作流的面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/项目设计和开发工作流的面试题"
                },
                {
                  text: "桌面端跨平台框架面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/桌面端跨平台框架面试题"
                },
                {
                  text: "Git面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/Git面试题"
                },
                {
                  text: "SEO相关面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/SEO相关面试题"
                },
                {
                  text: "Typescript面试题",
                  link: "/Document/前端面试相关/【前端面试题】/【其他面试题】/Typescript面试题"
                },
              ]
            },
            
            {
              text: "JS和浏览器原理面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "浏览器原理",
                  link: "/Document/前端面试相关/【前端面试题】/JS和浏览器原理面试题/浏览器原理",
                },
                {
                  text: "JavaScript引擎运行原理",
                  link: "/Document/前端面试相关/【前端面试题】/JS和浏览器原理面试题/JavaScript引擎运行原理",
                },
              ],
            },
            {
              text: "CSS和HTML面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "HTML面试题",
                  link: "/Document/前端面试相关/【前端面试题】/CSS和HTML面试题/HTML面试题",
                },
                {
                  text: "CSS面试题",
                  link: "/Document/前端面试相关/【前端面试题】/CSS和HTML面试题/CSS面试题",
                },
                {
                  text: "移动Web开发",
                  link: "/Document/前端面试相关/【前端面试题】/CSS和HTML面试题/移动Web开发",
                },
              ],
            },
            {
              text: "JavaScript面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "JavaScript基础到高级面试题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript基础到高级面试题",
                },
                {
                  text: "JavaScript函数面试题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript函数面试题",
                },
                {
                  text: "JavaScript高级面试题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript高级面试题",
                },
                
                {
                  text: "this指向题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/this指向题",
                },
                {
                  text: "类型转换题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/类型转换题",
                },
                {
                  text: "面向对象",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/面向对象",
                },
                {
                  text: "原型和原型链",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/原型和原型链",
                },
                {
                  text: "异步和单线程",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/异步和单线程",
                },
                {
                  text: "其他面试题",
                  link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/其他面试题",
                },
                {
                  text: "JavaScript手写题",
                  collapsible: true,
                  collapsed: true,
                  items: [
                    {
                      text: "手写实现JS常用方法",
                      link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript手写题/手写实现JS常用方法",
                    },
                    {
                      text: "手写实现JS底层方法",
                      link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript手写题/手写实现JS底层方法",
                    },
                    {
                      text: "手写Promise",
                      link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript手写题/手写Promise",
                    },
                    {
                      text: "手写CSS预处理器",
                      link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript手写题/手写CSS预处理器",
                    },
                    {
                      text: "手写实现工具",
                      link: "/Document/前端面试相关/【前端面试题】/JavaScript面试题/JavaScript手写题/手写实现工具",
                    },
                  ]
                },
              ],
            },
            
            {
              text: "框架相关面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "Vue面试题",
                  collapsible: true,
                  collapsed: true,
                  items: [
                    {
                      text: "Vue面试题",
                      link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/Vue面试题/Vue面试题",
                    },
                    {
                      text: "Vuex面试题",
                      link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/Vue面试题/Vuex面试题",
                    },
                    {
                      text: "Pinia面试题",
                      link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/Vue面试题/Pinia面试题",
                    },
                    {
                      text: "VueRouter面试题",
                      link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/Vue面试题/VueRouter面试题",
                    },
                  ],
                },
                {
                  text: "React面试题",
                  link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/React面试题",
                },
                {
                  text: "Angular面试题",
                  link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/Angular面试题",
                },
                {
                  text: "JQuery面试题",
                  link: "/Document/前端面试相关/【前端面试题】/框架相关面试题/JQuery面试题",
                },
              ],
            },
            {
              text: "NodeJS面试题",
              collapsible: true,
              collapsed: true,
              items: [
                {
                  text: "NodeJS面试题",
                  link: "/Document/前端面试相关/【前端面试题】/NodeJS面试题/NodeJS面试题",
                },
                {
                  text: "Node项目工程化面试题",
                  link: "/Document/前端面试相关/【前端面试题】/NodeJS面试题/Node项目工程化面试题",
                },
                {
                  text: "服务端编程",
                  link: "/Document/前端面试相关/【前端面试题】/NodeJS面试题/服务端编程",
                },
                {
                  text: "Node原理",
                  link: "/Document/前端面试相关/【前端面试题】/NodeJS面试题/Node原理",
                },
              ],
            },
          ]
        },
      ]
    }
  ]
}
