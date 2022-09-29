<script setup>
  import DefaultTheme from 'vitepress/theme'
  
  const { Layout } = DefaultTheme
  </script>
  
  <template>
    <Layout>
      <template #aside-outline-before>
        My custom sidebar top content
      </template>
    </Layout>
  </template>