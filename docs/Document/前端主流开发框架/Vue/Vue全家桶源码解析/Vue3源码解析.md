# Vue3源码解析

  Vue3官网：<https://cn.vuejs.org/>

## Vue3源码学习指导

Vue3 优化Vdom
在Vue2中,每次更新diff,都是全量对比,Vue3则只对比带有标记的,这样大大减少了非动态内容的对比消耗

[Vue Template Explorer](https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+Iiwib3B0aW9ucyI6e319) 我们可以通过这个网站看到静态标记
