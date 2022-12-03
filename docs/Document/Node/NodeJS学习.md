# Node 学习

## Node进程（Node运行机制）

事件循环

宏任务

微任务

模块化

- 模块对象

- 模块类型

- 模块加载机制

global对象

process对象

内置模块

- stream流

- Buffer模块

- Event模块

- Process模块

- FileSystem文件系统模块

### 爬虫任务运行：进程任务示例

###### server/tasks/movie.js：爬虫运行任务进程设置

```js
// crawler/latest-list.js的爬虫脚本任务进程配置：node server/tasks/movie.js
const cp = require('child_process');
const { resolve } = require('path');
// const mongoose = require('mongoose');
// const Movie = mongoose.model('Movie');

;(async () => {
  console.log('1')
  // 两个页面相同任务，可切换爬取
  // const script = resolve(__dirname, '../crawler/latest-list')
  const script = resolve(__dirname, '../crawler/trailer-list')
  console.log('2')
  const child = cp.fork(script, [])
  console.log('3')
  let invoked = false
  /** 
  * 为子进程注册函数
  */
  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)

    console.log(err)
  })

  child.on('message', data => {
    let result = data.result

    console.log('result',result)

    // result.forEach(async (item) => {
    //   let movie = await Movie.findOne({
    //     doubanId: item.doubanId
    //   }).exec()

    //   if (!movie) {
    //     movie = new Movie(item)
    //     await movie.save()
    //   }
    // })
  })
})()
```

###### server\crawler\trailer-list.js：puppeteer爬虫脚本

```js
// puppeteer爬虫脚本01
const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/cinema/nowplaying/nanning/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
});

(async () => {
  console.log('Start visit the target page')
  // 运行浏览器
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })
  // 新建浏览器页面
  const page = await browser.newPage()
  // 去往的页面
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)
  // 选择点击“加载更多”标签
  await page.waitForSelector('#nowplaying .more')

  // 加载更多点击多少次
  // for (let i = 0; i < 2; i++) {
  //   await sleep(3000)
  //   await page.click('.more')
  // }

  // 寻找页面元素
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-item')
    var links = []

    // 元素的获取和写入数组
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.attr('id')
        let title = it.attr('data-title')
        let rate = it.attr('data-score')
        let poster = it.find('.poster img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })

  console.log('result', result)
  browser.close()

  // Node进程：运行命令文件：node server/task/movie.js | node server/crawler/trailer-list.js
  process.send({ result })
  process.exit(0) // 进程退出
})()
```

**进程模型：**

同步异步：

1. 异步IO：

2. libuv：[libuv/libuv：跨平台异步 I/O (github.com)](https://github.com/libuv/libuv)

3. 

阻塞非阻塞：

1. 事件循环和事件驱动：

2. libuv库：

3. 

单线程：

1. 进程：

2. 

子进程：

1. 启动子进程：

2. 

进程通信：

1. 
