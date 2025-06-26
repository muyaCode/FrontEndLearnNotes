<script setup>
  import { useData } from 'vitepress';
  
  import DefaultTheme from 'vitepress/theme'
  
  const { Layout } = DefaultTheme
  // config.js的配置
  const data = useData()
  // config.js的themeConfig配置
  const { theme } = data
  </script>
  
  <template>
    <Layout>
      <template #aside-outline-before>
        <!-- 可以在这里配置内容大纲下的内容，如，放置广告或者自己的练习方式和二维码等 -->
      </template>
    </Layout>
  </template>