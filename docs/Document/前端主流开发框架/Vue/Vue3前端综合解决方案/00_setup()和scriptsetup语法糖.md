# 00_setup()和scriptsetup语法糖

1.setup(){} 方法写出来的数据使用过于复杂 ，最后return出来的数据导致代码太长，结构难看且难以维护

``` js
<script lang='ts'>
import { reactive, toRefs,onBeforeMount, onMounted } from 'vue'

export default {
  name: '',
  setup() {
    const state = reactive({})
    onBeforeMount(() => {
      
    })
    onMounted(() => {
      
    })
    const refState = toRefs(state)
    return {
      ...refState
    }
  }
}
</script>
```

2.script-setup 语法糖：源自 2020年10月28号提出的RFC，到2021年08月05日：Vue3.2发布，正式推出全新的语法标准：script-setup，缩减了代码，使编写vue代码跟原生JavaScript一样
（推荐使用script-setup语法糖）

``` js
<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

const state = reactive({})
onBeforeMount(() => {
  
})
onMounted(() => {
  
})
const refState = toRefs(state)
</script>
```
