# koa 和 express 的对比和优缺点

## 关于 Express

### 优点

Express 的优点是线性逻辑：路由和中间件完美融合，通过中间件形式把业务逻辑细分，简化，一个请求进来经过一系列中间件处理后再响应给用户，再复杂的业务也是线性了，清晰明了。

### 缺点

Express 是基于 callback 来组合业务逻辑。Callback 有两大硬伤，一是不可组合，二是异常不可捕获。Express 的中间件模式虽然在一定程度上解决这两个问题，但没法彻底解决。

中间件模式就是把嵌套的异步逻辑拉平了，但它也只能是从较宏观的层面解耦顺序执行的异步业务，它无法实现精细的异步组合控制，比如并发的异步逻辑，比如有相对复杂条件控制的异步逻辑。人们通常会要借助 async、bluebird 等异步库。但即便有了这类异步库，当涉及到共享状态数据时，仍然不得不写出嵌套异步逻辑。

对于 callback 的异常不可捕获的问题，下面这个示意想必大家能理会：

```js
someAPI.get(data, function (err, res) {
	throw error;
});
```

每个人都不会期望这个 callback 里面 throw 一个异常，但估计每一个写 js 的都写出过这样的异常，这种异常可能会隐藏得很深，callback 模型下它是不可捕获的。

## 关于 koa

### 优点

首先，借助 promise 和 generator 的能力，丢掉了 callback，完美解决异步组合问题和异步异常捕获问题。

其次，koa 把 express 中内置的 router、view 等功能都移除了，使得框架本身更轻量化。有些人可能会不习惯，但我认为这特别好。

首先，把 express 各种中间件移植到 koa 是很简单的一件事；其次，express 中内置的功能件未必好，比如 view，想添加自己的 view engine 进入得做较深层次的 hack，又比如 router，它的效率不是最好的。koa 没有内置这些，给了社区很大的自由度，各位大神都能自由发挥制作出更精细更专业的中间件。当然这带来的另一个问题便是中间件良莠不齐，需要使用者自行甄选。

### 缺点

首先是级联。我把这个东西理解为宏观层面的 callback。Express 中的 callback 问题是微观层面的问题，比如一个中间件内，可能不得不嵌套两三层 callback。但起码，这些 callback 在一起，能一眼看全，能完全掌控。

koa 的级联使得所有中间件的逻辑关系变成了 callback 关系。如果项目简单，没问题；如果有高手坐镇，也没问题。当项目业务变庞大变复杂后，当不断有新人进入后，想让所有的开发人员掌握整个项目业务逻辑关系，应该就不是那么简单了。

为什么要有级联，这其实是 promise 带来的副作用：promise 组合体的逻辑不能正常中断！有些 callback 能手初写 promise 时可能就会出现类似这样的逻辑：

```js
someAPI = function (data, callback) {
	otherAPI(data)
		.then(function (res) {
			if (res.something) callback(null, res);
			return doOther(res);
		})
		.then(function (res) {
			callback(null, res);
		})
		.catch(callback);
};
```

promise 不能正常中断，哪怕你业务逻辑 callback 出去了，后面的 then 会继续运行！这只是个简单的示意，我想强调的任然是 promise 组合体不能正常中断！koa 把你所有的中间件所有的异步业务组合成了一个 promise 组合体。

那么，koa 中如果第一个中间挂载了静态文件处理器，后面是 API 业务，当一个静态资源请求第一个中间就处理完毕了怎么办？如果按照 promise then 的逻辑那必然会往后面走，但级联解决了这个问题：所有后续逻辑被封装成 next 了，别调用它，就不会进到后续中间件逻辑。

对于复杂的 koa 项目，要避免使用类似 express 中间件思想来开发，应该尽量发挥 koa 带来的异步控制组合能力，将各种异步业务在各大中间件内组合完毕。

其次是代码安全问题，因为任意一个中间件都能访问到最顶层的 app 对象，第三方模块想作恶，那是完全有机会的。
