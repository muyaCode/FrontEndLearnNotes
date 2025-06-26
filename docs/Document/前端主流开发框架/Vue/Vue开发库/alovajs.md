# alovajs

官网：[Alova.JS - 轻量级请求策略库 | Alova.JS](https://alova.js.org/zh-CN/)

GitHub：https://github.com/alovajs/alova

今天我想聊的是，在我们写项目代码时，应该更加专注于业务逻辑的实现，而把定式代码交给js库或工程化自动处理，而我想说的是，请求逻辑其实也是可以继续简化的。

你可能会说，用axios或fetch api就够了啊，哪有什么请求逻辑，那可能是你还没有意识到这个问题，作为一个前端开发，你肯定也遇到过这些问题：

- 处理分页逻辑
- 表单处理逻辑
- 处理请求防抖逻辑
- 处理轮询检查
- 处理缓存处理
- 处理加载状态
- 处理错误处理
- 验证码发送
- 文件上传
- ...

这些问题，如果你正在使用 axios 或 fetch api，你需要编写大量的代码来处理这些问题，但我想说，他们其实更多的也都是固定的模板代码，也可以被精简掉。

在今天你可以使用 alova 来处理它们，alova提供了大量日常业务中常用的请求模块，你只需要简单配置几行代码，alova 就能自动帮你管理请求状态，优化网络体验，那些烦人的分页逻辑、轮询检查、缓存处理，全都不用你操心了，让你更加专注于业务逻辑。

## alova的学习成本更低

alova 借鉴了 axios 和ahooks-useRequest的设计，让大家更容易上手，学习成本更低。

> ❝
>
> alova 官网（https://alova.js.org/zh-CN/）在这里。
>
> ❞

alova 自从 2023 年 4 月份正式对外发布以来，在 Issues 和 Disscussion 中收到了来自世界各地的开发者积极参与的信息，深感荣幸。

**「如果你也喜欢 alovajs，请在Github 仓库（https://github.com/alovajs/alova）中贡献一颗 star，这对我们非常重要。」**

有任何问题，你可以加入以下群聊咨询，也可以在github 仓库中发布 Discussions，如果遇到问题，也请在github 的 issues中提交，我们会在最快的时间解决。

下面我们来看看如何通过简单配置，就能帮你解决各种复杂场景下的请求问题。

## 基础请求

基本的请求，适用于初始化信息，自带了请求相关的各种状态。

以 vue3 为例。

```vue
<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else-if="error">error: {{ error }}</div>
    <div v-else>
      <div>
        <span>id: {{ data.title }}</span>
        <span>title: {{ data.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRequest } from "alova";

  // 和axios相似的参数风格
  const todoDetail = alova.Get("/todo", {
    params: {
      id: 1,
    },
  });

  const {
    loading,
    data,
    error,
    onSuccess,
    onError,
    onComplete,
    send,
    abort,
    update,
  } = useRequest(todoDetail);
  onSuccess((event) => {
    console.log("success", event);
  });
  onError((event) => {
    console.log("error", event);
  });
  onComplete((event) => {
    console.log("complete", event);
  });
</script>
```

useRequest 会自动帮你管理 loading、data、error 等状态，不需要自己控制！

useRequest 详细文档（https://alova.js.org/zh-CN/tutorial/learning/use-request/）

## 状态变化请求

在数据筛选、搜索等交互中，可以通过 useWatcher 来监听状态变化并发送请求，返回值也包含与 useRequest 相同的状态、事件函数、操作函数。

```javascript
useWatcher(() => filterTodoList(page, keyword), [keyword, page], {
  debounce: [500, 0], // 请求级的防抖参数
});
```

它还有请求防抖、保证请求时序、过滤状态变化时是否发送请求等功能，超方便！

useWatcher 详细文档（https://alova.js.org/zh-CN/tutorial/learning/use-watcher/）

## 预加载数据

可以用 useFetcher 预加载数据,不需要直接处理响应,但会更新相关状态:

```javascript
const { fetching, error, fetch } = useFetcher();
fetch(todoDetail);
```

useFetcher 详细文档（https://alova.js.org/zh-CN/tutorial/learning/use-fetcher/）

## 分页请求

分页场景下，page、pageSize、pageCount、total 等等好多状态要自己维护，还要写一堆逻辑来判断何时应该发送请求！

如果用 alovajs 提供的分页 Hook，你就只需要这样：

```javascript
const {
  // 加载状态
  loading,

  // 列表数据
  data,

  // 是否为最后一页
  // 下拉加载时可通过此参数判断是否还需要加载
  isLastPage,

  // 当前页码，改变此页码将自动触发请求
  page,

  // 每页数据条数
  pageSize,

  // 分页页数
  pageCount,

  // 总数据量
  total,
} = usePagination((page, pageSize) => queryStudents(page, pageSize));

// 翻到上一页，page值更改后将自动发送请求
const handlePrevPage = () => {
  page.value--;
};

// 翻到下一页，page值更改后将自动发送请求
const handleNextPage = () => {
  page.value++;
};

// 更改每页数量，pageSize值更改后将自动发送请求
const handleSetPageSize = () => {
  pageSize.value = 20;
};
```

是不是清爽很多，节省了超多重复代码。

usePagination 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/usePagination/）

## 表单提交

表单处理也很头疼吧？alova 的 useForm 直接帮你搞定表单提交、表单草稿、自动重置表单项、多页共享数据啥的。

```javascript
const {
  form,
  send: submitForm,
  updateForm,
} = useForm((formData) => submitData(formData), {
  initialForm: {
    title: "",
    content: "",
    time: "",
  },
  resetAfterSubmiting: true,
});
```

useForm 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useForm/）

## 验证码实现

别再自己做倒计时了，这有！

```javascript
const { loading: sending, send: sendCaptcha } = useCaptcha(
  () => sendCaptcha(mobile),
  {
    initialCountdown: 60,
  }
);
```

useCaptcha 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useCaptcha/）

## 文件上传策略

更简单的文件上传策略，支持对 base64、Blob、ArrayBuffer、Canvas 数据的自动识别和转换，还可以多文件同时上传、图片预览图生成

```javascript
const {
  fileList
  loading,
  progress
} = useUploader(({ file, name }) => uploadFile(file, name), {
  limit: 3,
  accept: ['png', 'jpg', 'gif'],
  imageTempLink: true
});
```

useUploader 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useUploader/）

## 自动重新拉取数据

可以在浏览器 tab 切换时拉取最新数据、浏览器聚焦时拉取最新数据、网络重连时拉取最新数据、轮询请求自动重新拉取数据，可以同时配置以上的一个或多个触发条件，也可以配置节流时间来防止短时间内触发多次请求，例如 1 秒内只允许触发一次。

```javascript
useAutoRequest(todoDetail, {
  enablePolling: 2000,
  enableVisibility: true,
  enableFocus: true,
  enableNetwork: true,
  throttle: 1000
}
```

useAutoRequest 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useAutoRequest/）

## 跨组件请求策略

跨组件或模块触发请求相关操作，消除组件层级的限制，在任意组件中快速地触发任意请求的操作函数，例如，你可以某个组件中更新了菜单数据后，重新触发侧边菜单栏的重新请求，从而刷新数据。当操作了列表数据后，触发列表更新。

```javascript
// 组件A创建代理
useRequest(todoDetail, {
  middleware: actionDelegationMiddleware("someAction"),
});

// 组件B内触发操作
accessAction("someAction", (actions) => {
  actions.send();
});
```

actionDelegationMiddleware 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/actionDelegationMiddleware/）

## 请求重试策略

在重要的请求上使用它，可以提高请求的稳定性，可以自定义设置是否重试，以及重试延迟，还有手动停止重试

```javascript
const { onRetry, onFail, stop } = useRetriableRequest(pay, {
  retry(error) {
    return /network timeout/i.test(error.message);
  },
  backoff: {
    delay: 2000,
  },
});
```

useRetriableRequest 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useRetriableRequest/）

## SSE

可以直接通过 SSE 进行请求，它可以通过全局响应和方法实例的函数 transformData 自动转换数据，还提供了对 EventSource 对象的全部控制。

```javascript
const { readyState, data, eventSource, onMessage, onError, onOpen, on } =
  useSSE(() => chatGPT(), {
    withCredentials: true,
    interceptByGlobalResponded: true,
  });
```

useSSE 详细文档（https://alova.js.org/zh-CN/tutorial/strategy/useSSE/）

## 结尾

现在，你还可以在 vue2 的 options 写法中使用 alova 了，点击查看详情：https://alova.js.org/zh-CN/tutorial/framework/vue-options/

这里还有超多可运行的示例（https://alova.js.org/zh-CN/category/examples/）

如果觉得文章对你有帮助，请别吝啬你的赞和评论哈，说说你对 alovajs 怎么看的，或者可以问一些问题，我会尽量回答的，你的支持是我创作的最大动力！哈哈哈哈哈哈~

想学习更多 alovajs 的用法，欢迎来alova 官网学习。如果你也喜欢 alovajs，请在Github 仓库中贡献一颗 star，这对我们非常重要。