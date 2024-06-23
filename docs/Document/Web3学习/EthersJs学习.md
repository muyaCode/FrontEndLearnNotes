# EthersJs 学习

## 简单介绍 Ethers.js

Ethers.js 与 Web3.js 一样，都是以太坊标准 JavaScript API 库，Ethers.js 最初是为了 ethers.io 设计，后来拓展为一个开放的 JS API 库，与 Web3.js 相同的是，Ethers.js 同样可以与 Moonbeam 进行正常交互，这得益于 Moonbeam 是一个完全兼容以太坊 EVM 的智能合约平台；而与 Web3.js 不同的是，Ethers.js 在使用时不需要过多的回调函数，而且可以搭配 Hardhat 工具是的语法得到进一步的优化

**Ethers.js** 的优势之处在于紧凑小巧，同时又包含大量测试案例。它提供实用的“新手入门”文档，因此新用户也可使用。许多开发者评价 ethers.js 使用起来“简单”、“直观”，并且该库在近两年越来越受欢迎，下载量和在项目中的使用量也不断增加。

## Ethers.js 相关网站

官方 GitHub 开源库：[ethers-io/ethers.js: Complete Ethereum library and wallet implementation in JavaScript. (github.com)](https://github.com/ethers-io/ethers.js)

ethers.js 官网文档：<https://docs.ethers.org/v6/>

官网：[ethers](https://ethers.org/)

**ethers.js 中文文档**：[ethers.js 中文文档 (learnblockchain.cn)](https://learnblockchain.cn/ethers_v5/)

[WTFAcademy/WTF-Ethers: 我最近在重新学 ethers.js，巩固一下细节，也写一个“WTF Ethers.js 极简入门”，供小白们使用，每周更新 1-3 讲。 (github.com)](https://github.com/WTFAcademy/WTF-Ethers)

## Ethers.js 入门

[Ethers.js 入门 | WTF Academy](https://wtf.academy/ether-start/)

## ethers.js 有四个模块，构成应用程序编程界面 (API)

1. Ethers.provider
2. Ethers.contract
3. Ethers.utils
4. Ethers.wallets

### ethers.provider 有什么作用？

Ethers.provider 的作用是封装与以太坊区块链的连接。它可以用于签发查询和发送已签名的交易，这将改变区块链的状态。下面显示了三个说明性示例：

- _ethers.providers.InfuraProvider_ 的作用是使你可以与 Infura 托管的以太坊节点网络建立连接
- _ethers.provider.getBalance_ 将为你获取区块链中某个地址或区块的以太坊余额
- _ethers.provider.resolve_ 将解析传递到以太坊地址的以太坊名称服务 (ENS) 名称(通过“承诺”— 如果你刚接触 JavaScript，我们建议你阅读有关承诺[7]的更多内容，它们的作用是在未来某个时间点对它们进行计算时可以返回数据)。

注：_web3.js_ 也有服务于此目的的提供商，位于 _web3_ 基础模块中。_Ethers.js_ 和 _web3.js_ 的组织方式截然不同，因此尽管两个库的功能非常相似，但模块间并非总是能清晰对应。

### ethers.contract 有什么作用？

Ethers.contract 的作用是部署智能合约并与它交互。具体来说，该模块中的函数用于侦听从智能合约发射的事件、调用智能合约提供的函数、获取有关智能合约的信息，以及部署智能合约。下面显示了两个说明性示例：

- _ethers.ContractFactory.fromSolidity_ 从 Solidity 编译器的编译器输出或从 Truffle 生成的 JSON 文件创建一个用于部署智能合约的“工厂”。_ethers.Contract_ 使你可以与已部署的智能合约进行交互。

### ethers.utils 有什么作用？

Ethers.utils 提供用于格式化数据和处理用户输入的实用程序函数。Ethers.utils 的作用方式与 web3-utils 相似，能够简化去中心化应用的构建流程。下面提供了三个示例：

- _ethers.utils.getContractAddress_ 从用于部署智能合约的交易中提取智能合约地址
- _ethers.utils.computeAddress_ 通过传递与地址相关的公钥或私钥的函数来计算地址 _ethers.utils.formatEther_ 将所传递的 Wei 金额转换为 Ether 十进制字符串格式

### ethers.wallet 有什么作用？

Ethers.wallet 提供的功能与我们目前讨论过的其他模块截然不同。Ethers.wallet 的作用是使你可以与现有钱包(以太坊地址)建立连接、创建新钱包以及对交易签名。下面提供了三个示例：

- _ethers.wallet.createRandom_ 将创建随机新账户。
- _ethers.wallet.sign_ 将对交易签名并将已签名的交易返回为十六进制字符串的形式(通过“承诺”— 如果你刚接触 JavaScript，我们建议你阅读有关承诺[8]的更多内容，它们的作用是在未来某个时间点对它们进行计算时可以返回数据)。
- _ethers.wallet.getBalance_ 将为我们提供钱包地址的以太坊余额。

## Ethers.js(Hardhat)的安装与常用 API 介绍

### 一、Ethers.js(Hardhat)的安装

Ethers.js 的安装分为两种，一种为直接使用命令行安装，另一种为通过 Hardhat 间接安装（配合 Hardhat 使用），推荐第二种通过 Hardhat👷 的方式使用 Ethers.js（安装 Hardhat 时通过 hardhat-ethers 插件安装经过包装后的 Ethers.js）

安装步骤如下：

```bash
# 安装命令
npm install --save ethers

# 安装步骤
npm init
npm install --save-dev hardhat
npx hardhat
```

默认下载最新版本包。

### 引入依赖

**Node.js 环境**：

```bash
const { ethers } = require("ethers"); // node.js require

import { ethers } from "ethers";  // ES6 or TypeScript
```

**网页浏览器环境**：

对于快速演示或原型设计，您可以从 CDN 将其加载到 Web 应用程序中：

```javascript
<!-- ES6 in the Browser -->
<script type="module">
    import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
    // Your code here...

</script>
<!-- ES3 (UMD) in the Browser -->
<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js"
type="application/javascript"></script>
```

> 将 ethers 库复制到您自己的网络服务器并自己提供服务通常是更好的做法（出于安全原因）。

### 二、常用 API 介绍

Ethers.js 库中的 API 主要由 4 大部分组成：**Providers**，**Signers**，**Contract Interaction**，**Utilities**

| **Provider**  | Provider（在 ethers 中）是一个为以太坊网络连接提供抽象的类。它提供对区块链及其状态的只读访问。                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Signer**    | 签名者是一个（通常）以某种方式直接或间接访问私钥的类，它可以签署消息和交易以授权网络向您的帐户收取以太币，执行操作。 |
| **Contract**  | 合约是一种抽象，表示与以太坊网络上特定合约的连接，因此应用程序可以像使用普通 JavaScript 对象一样使用它。             |
| **Utilities** |                                                                                                                      |

#### 1. Provider

Provider 是以太坊网络连接的抽象，其为标准以太坊节点功能提供简洁、一致的接口

在 Provider 中比较常用的方法为 JsonRpcProvider，该方法允许通过 JSON-RPC 的方式连接某一个节点网络

```javascript
// new ethers.providers.JsonRpcProvider([urlOrConnectionInfo[, networkish]])
const provider = new ethers.providers.JsonRpcProvider(
	"https://rpc.api.moonbase.moonbeam.network",
	{
		chainId: 1287,
		name: "moonbase-alpha",
	}
);
```

在上面的代码示例中，通过 JsonRpcProvider 的方式，连接到了 Moonbase Alpha 测试网中，在其中不止可以定义 url 参数，还可以定义该网络的 chainId 与 name 等信息

#### 2. Signers

Signer 是以太坊账户的抽象，可用于对消息和交易进行签名，并将签名过的交易发送到以太坊网络以执行状态更改操作

在 Signer 中比较常用的方法为 Wallet，只有 Wallet 可以使用私钥对交易和信息进行签名

```javascript
// new ethers.Wallet(privateKey[, provider])
const alice = new ethers.Wallet(privateKeyAlice, provider);
const bob = new ethers.Wallet(privateKeyBob, provider);

const txReceipt = await alice.sendTransaction({
	to: bob.address,
	value: ethers.utils.parseEther("1.0"),
});
await txReceipt.wait();
```

在上面的代码示例中，使用 Wallet 定义了 alice 与 bob 两个 Signer，接下来 alice 调用方法 sendTransaction()方法向 bob 发起交易，转移了 1 ether 的 token

#### 3. Contract Interaction

部署合约与生成合约实例离不开下面介绍的两个方法：ContractFactory()与 Contract，具体方法直接看下面的代码示例接口

```javascript
// deploy contract
new ethers.ContractFactory(interface, bytecode[, signer])
contractFactory.deploy(..args)
contract.deployed()

// generate contract instance
new ethers.Contract(address, abi, signerOrProvider)
```

其中 ContracFactory 中的 interface 参数代表合约的 abi
使用 Hardhat 编译过后的合约，其 abi 与 bytecode 等编译信息都存放在了项目根目录下的 artifacts/contracts/CONTRACT_NAME.json 文件中

#### 4. Utilities

utilities 下提供的各种方法更像是各种各样的工具，比较常用的有对 BigNumber 的操作，以太坊 Token 单位的直接转换以及将 string 于 bytes32 相互转化的工具等，以下列出几个常见方法

```javascript
// BigNumber
BigNumber.toNumber() => number
BigNumber.toHexString() => string<DataHexString>

// Display Logic and Input
ethers.utils.parseEther(string) => BigNumber
ethers.utils.formatEther(value(BigNumber)) => string

// Strings
ethers.utils.parseBytes32String(aBytesLike) => string
ethers.utils.formatBytes32String(text) => string<DataHexString<32>>
```

1. **BigNumber.toNumber()**：将 BigNumber 的值转换为 JavaScript 值
2. **BigNumber.toHexString()**：将 BigNumber 值转换为 0x 开头，16 进制的值
3. **ethers.utils.parseEther(string)**：将一个整数转换为以 ether 为单位的大整数
4. **ethers.utils.formatEther(value(BigNumber))**：将大整数转换为以 ether 为单位的整数
5. **ethers.utils.parseBytes32String(aBytesLike)**：返回一个 bytes 32 编码数据表示的解码字符串
6. **ethers.utils.formatBytes32String(text)**：返回文本的 bytes 32 字符串表示形式

#### hardhat-ethers 升级接口

使用原生 Ethers.js 库进行与节点进行交互时，特别在部署合约方面的接口使用中，会发现原生接口的调用比较麻烦

因此 Hardhat 在此方面做了优化，即 Hardhat 提供了一个 hardhat-ethers 插件，该插件会提供一个 ethers 对象，该对象与 Ethers.js 有着相同的 API，同时还有一些 Hardhat 特别定义的接口

其特别定义的接口主要体现在以下是三个方面：

- 不需要额外定义 provider，provider 已经在执行 npx hardhat --network NET run SCRIPT 命令时已自动连接到了选定网络中
- getSigner() => Signer，该接口直接在 hardhat 配置中获取 signer，不需要定义 wallet，但需要提前将账户私钥信息填写到 Hardhat 配置文件中
- getContracFactory(contractName[, signer]) => contractFactory，该接口简化了原生 contractFactory()接口，使得只需要合约的名字即可产生 contractFactory 对象
  以部署一个 ERC-20 合约为例：

```javascript
// using hardhat-ethers API to deploy an ERC20 contract

// get signer
const alith = await ethers.getSigner(1);
// deploy contract
const Token = await ehters.getContractFactory("Token", alith);
const token = await Token.deploy("MoonToken", "MTK", 100);
await token.deployed();

// using raw ethers.js API to deploy the same ERC20 contract

// get provider and signer
const provider = new ethers.providers.JsonRpcProvider("http://localhost:9933");
const alith = new ethers.Wallet(privateKeyAlith, provider);
// deploy contract
const Token = new ethers.ContractFactory(interface, bytecode, alith);
const token = await Token.deploy("MoonToken", "MTK", 100);
await token.deployed();
```

通过上面的代码示例可以很直观的发现，使用 hardhat-ethers 提供的 API 在部署合约时会更方便一些
