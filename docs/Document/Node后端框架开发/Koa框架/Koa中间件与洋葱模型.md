# Koa中间件运行机制与洋葱模型

事件运行机制

```js
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(1)
    ctx.body = 'hello koa'
    await next()
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
})

app.use(async (ctx, next) => {
    console.log(5)
})

app.listen(3031, () => {
    console.log('http://localhost:3031/');
})
```

输入结果：13542

洋葱模型：一层一层进入，一层一层出

```js
app.use(async (ctx,next)=>{
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx,next)=>{
  console.log(3);
  await next();
  console.log(4);
});

<<<
1
3
4
2
```
