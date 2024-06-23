// 文档：https://vitepress.vuejs.org/config/frontmatter-configs#layout
// 主题参考：https://github.dev/lauset/vitepress-theme-vuetom
import DefaultTheme from 'vitepress/theme'
// import Layout from './Layout.vue'
import Layout from "genji-theme-vitepress";
import { h } from "vue";
import './custom.css'

// More props: https://genji-md.dev/reference/props
// 代码块运行插件文档：https://genji-md.dev/getting-started
const props = {
  Theme: DefaultTheme,
};

export default {
  ...DefaultTheme,
  // 根组件来包装每个页面
  // Layout,
  Layout: () => h(Layout, props),

//   // 这是Vue 3的功能组件
//   NotFound: () => 'custom 404',

//   enhanceApp({ app, router, siteData }) {
//    // app是来自' createApp() '的Vue 3应用实例。
//   //路由器是VitePress的自定义路由器。“siteData”是
//   //当前站点级元数据的' ref '。

//   }

//   setup() {
//     //这个函数将在VitePressApp中执行
//   //设置钩。所有的组合api都可以在这里找到。

//   }
}