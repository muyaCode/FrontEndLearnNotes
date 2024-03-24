# Web3Js 学习

## 简单介绍 web3.js

**Web3.js** 是一个标准的以太坊 JavaScript API 库，该 JS 库由一个与以太坊基金开发和维护，同时它也是最早且使用最广泛的一个 ETH API 库。它提供实用的 API 参考。从大约 2015 年开始，它在许多项目中被广泛使用。因此，该库已经成为许多“构建去中心化应用新手入门”教程的“必备资源”，由于 Moonbeam 完全兼容以太坊 EVM，因此 web3.js 可以在 Moonbeam 上进行正常交互。

## web3.js 相关网站

web3.js 库官方使用文档：<https://web3js.readthedocs.io/>

web3.js 库官方 GitHub 开源：[web3/web3.js: Ethereum JavaScript API (github.com)](https://github.com/web3/web3.js)

## web3.js 由哪些模块组成？

Web3.js 有一个主类，称为 web3。在该类中可以找到该库的大多数功能。组成 web3js 的另外 5 个模块分别是：

1. web3-eth
2. web3-shh
3. web3-bzz
4. web3-net
5. web3-utils

### web3-eth 有什么作用？

web3-eth 模块中包含函数，其作用是使 web3.js 的用户可以与以太坊区块链进行交互。具体来说，这些函数能够与智能合约、归外部所有的账户、节点、挖出的区块以及交易进行交互。下面是三个说明示例：

- _web3.eth.getBalance_ 的作用是获得指定区块的某个地址的以太坊余额
- _web3.eth.signTransaction_ 的作用是对交易签名
- _web3.eth.sendSignedTransaction_ 的作用是将签名的交易发送到以太坊区块链。

### web3-shh 有什么作用？

web3-shh 模块的作用是使你可以与 Whisper 协议进行交互。Whisper[4] 是一个消息传输协议，其目的是轻松广播消息以及进行低层异步通信。下面显示了两个说明性示例：

- _web3.shh.post_ 将 whisper 消息发布到网络
- _web3.shh.subscribe_ 创建传入的 whisper 消息订阅

### web3-bzz 有什么作用？

web3-bzz 模块的作用是使你可以与 Swarm 交互。Swarm[5] 是一个去中心化存储平台和内容分发服务，它可以用来为去中心化应用存储图片或视频等文件。下面显示了两个说明性示例：

- _web3.bzz.upload_ 的作用是使你可以将文件和文件夹上传到 Swarm
- _Web3.bzz.download_ 的作用是使你可以从 Swarm 下载文件和文件夹

### web3-net 有什么作用？

web3-net 模块的作用是使你可以与以太坊节点的网络属性进行交互。通过 web3-net，你可以采用你需要获得的信息所关联的协议后加 .net(在这里使用 \* 指定，表示选择 web.eth.net、web3.shh.net 或 web3.bzz.net)来查找该节点的相关信息。下面显示了两个说明性示例：

- web3.\*.net.getID 返回网络 ID
- web3.\*.net.getPeerCount 返回连接到节点的对等点数

### web3-utils 有什么作用？

web3-utils 模块为你提供实用程序函数，这些函数可在以太坊去中心化应用以及其他 web3.js 模块中使用。实用程序函数可以重复使用，使代码编写更轻松，在 JavaScript 和其他编程语言中很常见。Web3-utils 包含实用程序函数，这些函数用于转换数字、验证值是否满足特定条件以及搜索数据集。下面显示了三个说明性示例：

- _web3.utils.toWei_ 将以太转换为 Wei
- _web3.utils.hexToNumberString_ 将十六进制值转换为字符串
- _web3.utils.isAddress_，校验特定字符串是否为有效的以太坊地址。

## web3.js 的安装与常用 API 介绍

### 安装 web3.js

```bash
npm install web3
```

### 常用 API 介绍

#### 1. 签名交易 web3.eth.accounts.signTransaction()

```javascript
web3.eth.accounts.signTransaction(tx, privateKey, [, callback]) => promise<object>
```

- 第一个参数为 tx，即定义该交易的细则，在其中可以定义的交易细则有 gas，to，value，gasPrice 等参数，其中 gas 是必须要设置的参数（其余用到的交易参数都是可选择的），gas 参数规定了该交易将要花费的 gas 费用，to 参数则说明了这笔交易的接受者，而 value 参数则规定了这笔交易中转移代币的数量
- 第二个参数为 privateKey，为发起交易人的私钥，该交易将由该私钥进行签署
- 第三个参数为 callback，该参数为一个可选参数，该回调函数返回的第一个参数为一个错误对象，第二个参数为结果对象

该接口返回一个 Promise 对象，如果签署交易成功，将会返回该交易的一些具体信息，如`messageHash`，`rawTransaction`，`transactionHash`等信息

#### 2. 部署合约 contractInstance.deploy()

```javascript
new web3.eth.Contract(jsonInterface[, address][, options]) => promise<contract>
```

该方法用于生产合约实例，只有通过合约实例才能进行部署操作。该函数只需要填写一个一个参数即可，jsonInterface 即为该合约的 abi，填入该参数即可完成合约实例的生成

```javascript
contractInstace.deploy(options) => promise<transaction>
```

改方法用于部署合约，调用该函数将返回部署合约交易的具体信息
其中的参数为 options，其中里面可以写入两个部分，即 data(String)与 arguments(Array)两个参数，data 参数为合约的 bytecode；arguments 参数为合约构造函数中的参数，因此该参数为可选的

deploy 函数会返回一个交易对象，该对象自带一个数组与 4 个函数，数组表示先前传入的构造函数的入参，四个函数分别为`send()`，`estimateGas()`，`encodeABI()`，`createAccessList()`

#### 3. 调用合约方法 methods.myMethod.call()

```javascript
myContract.methods.myMethod(param1[, param2[, ...]]).call(options [, defaultBlock] [, callback]) => returnValuesOfContract
```

该方法用于调用一个“constant”方法并在不发起任何交易的同时在 EVM 执行智能合约的方法，使用此方法调用的智能合约方法均不会改变合约状态
其中 myMethod()括号中填入的参数为该方法的入参，call()中填入的 options 包含如下几个方面的值：from、gasPrice、gas，call()中还可以选择性的填入 defaultBlock 与 callback，其中 defaultBlock 为默认区块设置，callback 回调函数第一个参数为错误对象，第二个参数为合约方法结果

该方法会返回调用函数的返回结果，如果返回结果为多个，则返回一个带有索引的对象

#### 4. 订阅监听事件 web3.eth.subscribe()

```javascript
web3.eth.subscribe(type [, options] [, callback]) => subscriptionInstance
```

该方法用于订阅监听智能合约中触发的事件
其中订阅方法包含四种方法，分别为：pendingTransactions，newBlockHeaders，syncing，logs

监听事件一般采用 newBlockHeaders 模式，该模式订阅监听传入的区块头，该特性可以作为计时器来检查区块链上的变化。callback 参数与上述函数一样，第一个参数为错误对象，第二个参数为结果对象

同时在该函数的返回内容中，有几个回调函数比较常见：`on("connected")`, `on("data")`, `on("error")`, `on("changed")`，

1. 一旦订阅成功连接则触发`on("connected")`，该函数返回订阅 id;
2. 当 log 有数据时触发`on("data")`；
3. 当订阅出错时触发`on("error")`；
4. 当有 log 被删除出区块链时触发`on("changed")`；
