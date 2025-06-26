# Serverle 应用开发

## Serverless 的厂商

云产品：AWS、Lambda、阿里云函数计算、腾讯云云函数等

开源产品：OpenFaaS、Fission、Kubeless 等

网址：

1.亚马逊 AWS Lambda：<https://aws.amazon.com/cn/lambda/>

2.谷歌 Google Cloud Functions：<https://cloud.google.com/functions>

3.微软 Microsoft Azure：<https://www.azure.cn/>

4.阿里云函数计算：<https://www.aliyun.com/product/fc>

5.腾讯云云函数 SCF (Serverless Cloud Function)：<https://cloud.tencent.com/product/scf>

- 腾讯云文档：[云函数 触发器概述-触发器-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/583/9705)
- 腾讯云开发--文档中心：[云产品文档中心\_云产品帮助中心 (tencent.com)](https://cloud.tencent.com/document/product)

  6.华为云 FunctionGraph：<https://www.huaweicloud.com/product/functiongraph.html>

### 选择适合的 FaaS 平台

#### FaaS 产品对比

|          | Lambda (国外)                                                       | Azure Functions (国外)                                                                    | 函数计算 (国内)                                                  | 云函数 (国内)                                |
| -------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| 编程语言 | Node.js/Python/Ruby/Java/Go/C#/PowerShell                           | JavaScript/TypeScript/PythonRuby/Java/C#/PowerShell                                       | Node.js/Python/PHP/Java/C#                                       | Node.js/Python/Go/Java                       |
| 触发器   | API Gateway/AWS IoT/CloudFront/CodeCommit/MQ/S3/SNS/EventBridge/... | HTTP/Azure Cosmos DB/loT Hub/Notifications Hub/Queue Storage/Kafka/TableStorage/Timer/... | HTTP/OSS/MNS/日志服务/Tablestore/CDN/定时触发器/云监控触发器/... | API 网关/COS/定时触发器/CMQ Topic/CKafka/... |
| 免费额度 | 100 万次函数执行次数；40 万 GB-s 执行时间                           | 100 万次函数执行次数；40 万 GB-s 执行时间                                                 | 100 万次函数执行次数；40 万 GB-s 执行时间                        | 100 万次函数执行次数；40 万 GB-s 执行时间    |

- FaaS 平台都支持 Node.js、Python 、Java 等编程语言
- FaaS 平台都支持 HTTP 和定时触发器
- FaaS 的计费都差不多，且每个月都提供一定的免费额度

资源分配：在 Serverless 架构中，你不用关心应用运行的资源(比如服务配置、磁盘大小) 只提供一份代码就行。

计费方式：在 Serverless 架构中，计费方式按实际使用量计费(比如函数调用次数、运行时长)，不按传统的执行代码所需的资源计费(比如固定 CPU)。计费粒度也精确到了毫秒级，而不是传统的小时级别。

|        | 腾讯云                          | 阿里云                           |
| ------ | ------------------------------- | -------------------------------- |
| 计算量 | 40 万 G 免费；0.00011108 元/GBs | 40 万 G 免费；0.000110592 元/GBs |
| 调用量 | 100 万次免费；0.0133 元/万次    | 100 万次免费；0.0133 元/万次     |

- 每天有 100 万次请求，云函数配置 128MB 内存；
- 每次处理请求的平均运行时间为 70 ms；

- 个别云厂商推出了每个月的免费额度，比如腾讯云提供了**每个月 40 万 GBs 的资源使用额度和 100 万次调用次数的免费额度**。中小企业的网站访问量不是特别大的话完全可以免费使用。

弹性伸缩：Serverless 架构的弹性伸缩更自动化、更精确，可以快速根据业务并发扩容更多的实例，甚至允许缩容到零实例状态来实现零费用，对用户来说是完全无感知的。而传统架构对服务器 (虚拟机)进行扩容，虚拟机的启动速度也比较慢，需要几分钟甚至更久。

#### 1、为什么不使用亚马逊、谷歌、微软、IBM 的 serverless?

答：在国内阿里云 腾讯云使用的更多一些。就和大家购买域名、购买服务器一样,首先想到的肯定不是国外的运营商，当然你如果英文特别好也可以尝试的使用一下。

#### 2、阿里云 腾讯云 华为云我们为什么选择了腾讯云?

答：

- 1、微信小程序的云开发就是基于腾讯云，选择腾讯云更方便和小程序对接
- 2、腾讯云在 serverless 方面相比其他厂商支持更好一些
- 3、腾讯云的技术在线客服非常棒
- 4、腾讯云和 serverless 合作在腾讯云中集成了 serverless Framework 让我们可 以用我们喜欢的框架开发 serverless 应用。也可以让我们快速部署老项目。
- 5、价格更便宜

#### 3、会使用腾讯云的 serverless 以后，其他服务商的 serverless 也会了吗?

答：是的

## 一.开发 Serverless 应用的步骤

这里主要给大家介绍的是如何通过 Serverless Framework 提供的云函数 SCF 组件快速创建与部署一个云函数项目。后期我们还会详细给大家讲解，这里只是演示。

前提条件：Serverless Framework 帮助您将项目快速部署到腾讯云 Serverless 平台，因此在部署前，请确认您已经 注册腾讯云账号 并完成 实名认证。

### 1.安装 serverless

本地电脑上安装

```bash
npm install -g serveress
serverless -v
```

### 2.创建项目

自己要创建项目的目录上面，命令行运行 serverless

```bash
serverless
```

然后选择一个合适自己的模板

以下面功能为例

这个 Serverless 应用的功能是：提供一个所有人都可访问的“Hello World!” 接口，并且能够根据请求参数进行响应

### 如何把接口分享给别人

#### 传统应用开发流程

- 1.代码开发
- 2.初始化服务器安装 Node.js、Nginx)
- 3.启动 Nodejs Server( node index.js )
- 4.解析域名
- 5.配置 Nginx

#### Serverless 应用开发流程

- 1.代码开发
- 2.代码部署 FaaS 函数)
- 3.创建触发器

### Serverless 应用开发流程：使用 函数计算 为例

#### 1.以函数计算为例，可以进入函数计算的控制台，创建和编写函数

![函数计算](.\img\函数计算.jpg)

示例函数：

```js
// 函数计算
exports.handler = (request, response, context) => {
	// 从request 中获取
	const { iname } = request.queries;
	// 设置 HTTP 响应
	response.setStatusCode(200);
	response.setHeader("Content-Type", "application/json");
	response.send(JSON.stringify({ message: `Hello, ${name}` }));
};
```

#### 2.基于该函数来创建触发器

![基于该函数来创建触发器](.\img\基于该函数来创建触发器.jpg)

用该 APIEndpoint 对函数进行测试，我们通过 curl 命令测试一下:

```bash
$ curl https://1457216987974698.cn-hangzhou.fc.aliyuncs.com/2016-0815/proxy/serverless/hello-world/\?name\=Serverless

Hello Serverless!
```

##### 如何解决返回结果在浏览器中以附件的方式下载?

使用自定义域名绑定到你的函数上

### 使用 Lambda 为例

```js
// Lambda
exports.handler = (event, context, callback) => {
    // 从event 中获取 URL query 参数
    const { name } = event.queryStringParameters;
    // 定义HTTP Response
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message: `Hello ${name}!` })
    };
 callback(null, response):
}

```

与 HTTP 触发器不同的是，API 网关触发器入参是 event ，event 对象就是

### 开发 Serverless 应用的步骤总结

开发一个 Serverless 应用可以分为三个步骤

- 代码开发
- 函数部署
- 触发器创建

## 二.开发 Serverless 应用的基础知识

### 入口函数

Serverless 应用是由一个个函数组成的，与 main 函数对应的就是 FaaS 中的入口函数，一般名为 handler

FaaS 函数可以包含多个源文件，然后按照编程语言的模块机制相互引入

```js
// hello.js
exports.sayHello = function (name) {
	return `Hello, ${name}!`;
};
```

index.js

```js
const hello = require("./hello");

exports.handler = (request, response, context) => {
	// 从request 中获取
	const { name } = request.queries;
	// 处理业务逻辑
	const message = hello.sayHello(name);
	//设置 HTTP 响应
	response.setStatusCode(200);
	response.setHeader("Content-Type", "application/json");
	response.send(JSON.stringify({ message }));
};
```

### 把业务逻辑拆分到入口函数之外

![把业务逻辑拆分到入口函数之外](.\img\把业务逻辑拆分到入口函数之外.jpg)

### 函数定义

- 函数定义本质上是由云厂商、触发器和编程语言等多个条件决定的
- 标准的函数定义是：function(event,context)，event 是事件对象
- 触发器不同，event 的值可能不同调用方式
- 第二个参数 context：函数的上下文对象

#### 不同编程语言的入口函数示例

Node.is 异步函数

```js
exports.handler = function (event, context, callback) {
	callback(null, "Hello World!");
};
```

Node.is 同步函数，目前仅 Lambda 支持

```js
exports.handler = async function (event, context) {
	return "Hello World!";
};
```

Python

```python
def handler(event, context):
 return "Hello World!"
```

Java

```java
package example;
import com.aliyun.fc.runtime.Context;
import com.aliyun.fc.runtime.StreamRequestHandler;
import java.io.lOException;
import java.io.lnputStream;
import java.io.OutputStream;

public class HelloWorld implements StreamRequestHandler {
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
         outputStream.write(new String("hello world").getBytes());
     }
}
```

Node.js 中，仅 Lambda 的入口函数支持支持异步 async 写法

其他 FaaS 平台需要入口函数有第三个参数 callback

```js
async function sayHello() {
    return "hello world';
}

exports.handler =( event, context, callback) => {
    sayHello()
        .then(res => callback(null, res))
        .catch(error => callback(error));
}
```

#### 触发器及事件对象

触发器：HTTP 触发器、定时触发器、消息触发器等

##### HTTP 触发器

![HTTP 触发器](.\img\HTTP 触发器.jpg)

HTTP 触发器 request 参数

```json
{
	"method": "GET",
	"clientlp": "42.120.75.133",
	"url": "/2016-08-15/proxy/serverless/hello-world/",
	"path": "/",
	"queries": { "name": "World" },
	"headers": {
		"accept": "*/*",
		"content-length": "0",
		"content-type": "application/x-www-form-urlencoded",
		"host": "1457216987974698.cn-hangzhou.fc.aliyuncs.com",
		"user-agent": "curl/7.64.1",
		"x-forwarded-proto": "https"
	}
	// ...
}
```

##### API 网关触发器

![API网关触发器](.\img\API网关触发器.jpg)

Lambda API 网关触发器 event 参数示例

```json
{
	"version": "2.0",
	"routeKey": "ANY /hello-world",
	"rawPath": "/default/hello-world",
	"rawQueryString": "name=1",
	"headers": {
		"accept": "*/*",
		"content-length": "o",
		"host": "gwfk38f70e.execute-api.us-east-1.amazonaws.com",
		"user-agent": "curl/7.64.1",
		"x-amzn-trace-id": "Root=1-5fb47a82-5cf8a8f3573b039d538fdea2",
		"x-forwarded-for": "42.120.75.133",
		"x-forwarded-port": "443",
		"x-forwarded-proto": "https"
	},
	"queryStringParameters": {
		"name": "1"
	},
	"requestContext": {},
	"isBase64Encoded": false
}
```

##### 基于功能选择适合业务场景的触发器

略...

##### 定时触发器

![定时触发器](.\img\定时触发器.jpg)

函数计算定时触发器 event 参数示例

```json
{
	"triggerTime": "2020-11-22T17:42:20Z",
	"triggerName": "timer",
	"payload": ""
}
```

触发器决定了一个 Serverless 应用如何提供服务，也决定了代码应该如何编写

#### 日志输出

在 Serverless 中，日志输出和传统应用的日志输出没有太大区别，只是日志的存储和查询方式变了

![日志输出](.\img\日志输出.jpg)

国内 Serverless 应用的日志存储分析、系统监控报警相关产品非常少

#### 异常处理

![异常处理](.\img\异常处理.jpg)

建议编写代码时，充分考虑程序的异常，保证代码的健壮性，进一步提升系统稳定性

### 开发 Serverless 应用的基础知识总结

- Serverless 的应用基本组成单位是函数，函数之间互相独立因此 Serverless 能提高应用稳定性
- 函数定义与触发器和编程语言相关，不同 FaaS 平台的实现不尽相同
- 为了使代码扩展性更强，建议你将业务逻辑拆分到入口函数之外
- 为了使应用稳定性更好，建议你编写函数代码时充分考虑程序异常

## 三.Serverless 应用运行原理

### 前言

Serverless 实时处理日志，每次处理结果都是相同的，函数执行过程可能存在执行上下文重用

### 案例背景

日志服务 ==原始请求日志==> FaaS(以每分钟为时间窗口聚合日志) ==分钟纬度的 PV/UV==> MysQL

```js
// 获取当前时间,例如2020-12-0112:01:05
const now = format(new Date());

// 取前一分钟的整点时间作为开始时间，例如2020-12-0112:00:00
const start_time= getStartTime(now);
// 取当前分钟的整点时间作为开始时间，例如2020-12-0112:01:00
const end_time= getEndTime(now);.

// 日志服务 client 实例，可以用来查询日志
const client= new Client();
// 数据库实例
const db = new DB0;

// 计算前一分钟内的 PV
async function countPV() {
    const sql = `SELECT COUNT(*) FROM log WHERE time >= ${start_time} AND time < ${end_time}`;
    return await client.query(sql);
}

// 计算前一分钟的 UV
async function countUV() {
    const sql = `SELECT COUNT(DISTINCT user_id) FROM log WHERE time >= ${start_time}AND time < ${end_time}`;
    return await client.query(sql);
}

// 将 UV和 PV 信息存入数据库
async function saveDataToDB() {
    const pv = await countPV():
    const uv = await countUV()
    const sql = 'INSERT INTO user(uv, pv) values(?,?)';
    await db.query(sql,[uv, pv]);
}


// 入口函数
exports.handler = (event,callback) => {
    saveDataToDB()
    .then(() => callback(null))
    .catch(callback(error));
}
```

在 Serverless 中运行上述代码，就存在两个比较严重的问题

- 函数并发限制
- 执行上下文重用

### Serverelss 的运行原理

Serverelss 的运行原理，本质上就是函数的运行原理

#### 函数调用链路

##### 事件驱动函数执行

![事件驱动](.\img\事件驱动.jpg)

#### 函数调用方式

##### FaaS 运行：支持同步调用函数和异步调用函数

![FaaS 运行](.\img\FaaS 运行.jpg)

##### 同步调用函数

![函数同步调用](.\img\函数同步调用.jpg)

例子：使用函数计算 Node.is SDK 来同步调用函数

```js
const client = new FCClient("<account id>", {
	accessKeylD: "<access key id>",
	accessKeySecret: "<access key secret>",
	region: "cn-shanghai",
	headers: {
		"x-fc-invocation-type": "Sync",
	},
});
await client.invokeFunction(serviceName, funcNameevent, "event");
```

同步执行结果

```js
{
    headers: {
        'x-fc-request-id': 'ed2248al-eaa4-487f-8402-67fa9355a3df',
        'content-length': '11',
        // ...
    },
    data: 'hello world'
}
```

##### 异步调用函数

![异步调用函数](.\img\异步调用函数.jpg)

对于函数计算来说，**定时触发器**就是异步调用的

通过 API 实现异步调用的结果

```js
{
    headers: {
        'x-fc-request-id': 'db7a27d8-189d-42c5-82b5-8e159f148d4c',
        'content-length': '0',
        // ...
    },
    data: ''
}
```

###### 异步调用怎么重试?

对于异步调用，如果你关心调用结果的正确性，可以为函数配置**“异步调用目标“**，将调用结果发送到消息队列或其他服务中，通过监听消息判断得到异步执行结果了

###### 函数超时时间

![函数超时时间](.\img\函数超时时间.jpg)

new Date()方法可能会导致函数延迟执行，应该使用的是`event.triggerTime`事件方法

#### 函数生命周期

##### 冷启动和热启动

![冷启动和热启动](.\img\冷启动和热启动.jpg)

###### 函数的请求

![函数的请求](.\img\函数的请求.jpg)

如果函数每分钟都执行，则函数几乎都是热启动的，也就是会重复使用之前的执行上下文

这也就是为什么函数每次处理到的都是同一份数据

### Serverless 运行原理总结

传统应用部署

- 直接进行处理无须启动应用
- 一直消耗硬件资源

Serverless 的优势

- 应用的百毫秒启动
- 资源利用率和业务性能的平衡

内容总结

- 组成 Serverless 应用的函数是事件驱动的但也可以直接同 API 调用函数
- 函数可以同步调用或异步调用，定时触发器函数是异步调用的，异步调用函数建议主动记录并处理异步调用结果
- 函数的启动过程分为下载代码、启动容器、启动运行环境、执行代码四个步骤。前三个步骤称为冷启动，最后一个步骤是热启动
- 执行上下文重用可以提高 Serverless 应用性能，但在编写代码时要注意执行上下文重用带来的风险

通过本节了解

- 函数并发限制导致函数执行时间延迟
- 执行上下文重用导致每次处理的都是同一份数据

## 四.Serverless 开发框架提高应用开发调试和部署效率

### 开发流程

- 本地调试

- 构建

- 部署

- 日志

- 监控报警

### 前言

基于 FaaS 开发 Serverless 应用的问题

- 函数太多如何管理?
- 本地开发时如何进行调试?
- 代码开发完成后如何部署?

这就需要用到 Serverless 开发框架

**Serverless 开发框架：是集成 Serverless 思想、贯穿 Serverless 应用从开发到上线全流程的工具**

### 如何设计 Serverless 的开发框架

#### 1.应用管理

应用的管理也就是函数的管理

服务 (service)

- 函数 1
- 函数 2

Serverless 应用

![Serverless 应用](.\img\Serverless 应用.jpg)

serverless.yaml 文件配置

```yaml
# 应用名称
service: myservice

# 函数列表
functions:
    # 函数1
    hello:
     handler: hello.main # 函数入口
     runtime: nodejs12
     events: # 函数触发器，一个函数可能有多个触发器
      - http
     - timer
    # 函数2
    goodbye:
     handler: goodbye.main
     runtime: nodejs12
     events:
      - http
```

#### 2.应用开发

生成目录

```bash
$ serverless init --template hello-world
|-- hello.js
|-- serverless.yaml
```

serverless.yaml 配置

```yaml
service: myservice
functions:
  hello:
    handler: hello.main
    events:
      - http
```

各个开发平台也开发了自己的 WebIDE

如 Cloud9，腾讯的 Coding

#### 3.应用调试

Serverless 开发中，应用调试是很麻烦的

```js
exports.handler = (event, context, callback) => {
	// 从 event 中获取 URL query 参数
	const { name } = event.queryStringParameters;
	// 定义HTTP Response
	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message: `Hello ${name}!` }),
	};
	callback(null, response);
};
```

##### 如何让开发者方便调试

- 远程调试：将代码部署到 FaaS 平台，然后直接调用 FaaS 平台的接口执行函数再得到函数运行日志及返回结果

- 本地调试：由开发框架模拟函数运行时环境，构造函数参数来执行函数

对一个 Serverless 开发框架来说，这两种调试方式都需要。

也就是需要实现 **serverless invoke** 和 **serverless localinvoke** 两个命令

#### 4.应用部署

根据 serverless.yaml 文件配置，解析出相关配置的服务名称和函数列表，然后调用 FaaS 平台的接口，来创建或者更新服务函数

需要注意的是，在创建函数的时候，FaaS 平台中的函数代码，通常以压缩包的方式压缩：ZIP 的方式，存储在文件的存储服务中，所以部署函数之前，先在本地把代码压缩成.zip 文件。

而在部署应用的时候，代码调试可以把函数部署到 FaaS 平台中进行调试，那可能每次代码改动都会影响线上服务，如果有版本控制，那就可以避免了，FaaS 平台提供了提供了函数版本功能(默认是 LATEST 版本)，通过版本控制，开发时使用 LATEST 版本进行开发，测试稳定之后，再发布稳定的新版本，用稳定版本，提供线上服务

![开发版本](.\img\开发版本.jpg)

各个版本发布

至此，部署结束

##### 账号设置与多平台支持

应用要部署到哪个云账号上?

- AccessKeyld
- AccessKeySecret

Serverless 开发框架最好还要抹平不同 Serverless 平台的差异，让应用能够在不同 Serverless 平台中进行平滑迁移，甚至让开发者使用一个开发框架、一套开发流程就能实现多云部署，以上是 Serverless 开发框架的核心竞争力之一

开发适配标准

![开发适配标准](.\img\开发适配标准.jpg)

以上便是完整的 Serverless 的开发框架的设计思路，也是主流的 Serverless 的开发框架实现原理

### 主流的 Serverless 的开发框架实现原理

#### 主流的 Serverless 工具链

- WebIDE

- Serverless Framework

- Vercel

- Midway FaaS

![主流的Serverless的开发框架实现原理](.\img\主流的Serverless的开发框架实现原理.jpg)

#### Serverless Framework 安装

```bash
$ npm install -g serverless
$ serverless --version

Framework Core: 2.15.0
Plugin: 4.2.0
SDK: 2.3.2
Components: 3.4.3
```

#### 账号设置

```bash
serverless config credentials --provider aws --key key --secret secret
```

- --provider 具体的 Serverless 平台
- --keyAWS 账号的 aws_access_key_id
- --secret AWS 账号的 aws_secret_access_key

#### 应用配置

```bash
$ serverless create --template aws-nodejs
Serverless: Generating boilerplate..
```

#### 应用调试

远程调试

```bash
# 命令
serverless invoke --function hello
# 生成
{
 "statusCode": 200,
 "body": "{\n \"message\":\"Go Serverless v1.0! Your function executed successfully!\",\n \"input\":\"\"\n}"
}
```

本地调试

```bash
# 命令
serverless invoke local --function hello

# 生成
{
 "statusCode": 200,
 "body": "{\n \"message\":\"Go Serverless v1.0! Your function executed successfully!\",\n \"input\":\"\"\n}"
}
```

#### 应用部署

```bash
# 部署命令
$ serverless deploy

# 执行完上面的命令后查看项目目录
$ tree
```

函数计算 Fun(阿里云团队)

```bash
# 安装
$ npm install @alicloud/fun -g
# 版本查看
$ fun --version
3.6.20
# 配置查看
$ fun config
#
$ cat ~/.fcli/config.yaml
#
```

项目根目录.env 文件配置信息

```bash
ACCOUNT_ID=*****
REGION=cn-hangzhou
ACCESS_KEY_ID=******
ACCESS_KEY_SECRET=******
TIMEOUT=10
RETRIES=3
FC_ENDPOINT=******
ENABLE_CUSTOM_ENDPOINT=false
```

再执行命令

```bash
# 初始化
$ fun init event-nodejs12
# 列出文件
$ ls-l
index.js template.yaml
```

通过 funinvokefunctionName 命令对函数进行远程调试

```bash
fun invoke hello
```

通过 fun deploy 进行应用部署

```bash
fun fun deploy
```

### 开发调试和部署效率总结

开发框架的意义就在于帮助开发者提升 Serverless 应用的开发效率

- Serverless Framework 特点是功能完善、支持平台丰富
- Fun 的特点是只为函数计算服务

结语

- 与 FaaS、Baas 等基础技术一样 Serverless 开发框架也是 Serverless 领域中的非常重要的一部分
- 一个优秀的 Serverless 开发框架，可以让开发者很容易开发一个 Serverless 架构的应用也能让企业轻易将现有业务演化到 Serverless 架构
- Serverless 开发框架需要具备的基本能力是应用管理、应用调试和应用部署

## 五.Serverless 应用的依赖管理

### 前言

Serverless 应用代码都是独立的函数，不涉及其他依赖

而在实际进行应用开发时，大部分情况下都会有第三方依赖

代码例子

```js
const mysql= require('mysql2/promise');
async function main() {
    // 获取数据库连接
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
    // 查询数据库
    const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ?AND `age` >?', ['Morty', 14])
    return rows;
}

module.exports.handler = function(event, context, callback) {
    main()
        .then(res => callback(null, res)
        .catch(error => callback(error));
}
```

为什么安装依赖这么难？如何安装依赖？

将会从 Node.js、Python、Java 三种语言来安装依赖

### 依赖管理

#### 为什么安装依赖很困难

主要是因为它运行在 FaaS 平台上，而 FaaS 平台的运行环境由云广商提供且预制开发者只能进行有限的定制

#### 函数实例

![函数实例](.\img\函数实例.jpg)

#### 运行环境

- 编程语言是你创建函数时指定的某个具体版本的编程语言，由 FaaS 平台提供
- 内置模块就是该编程语言的一些内置模块
- 此外为了让开发者使用更方便，FaaS 平台一般还会默认安装一些依赖
- 函数实例创建时，会从存储服务中将你的代码下载下来并加载到运行环境中

#### 实践难点

- 大多编程语言的依赖，通常安装在全局系统目录
- 安装依赖过程中可能涉及代码编译环境不统一会导致编译产物有差异
- 系统依赖通常不可移植应用运行时依赖一些系统级别的动态链接库和软件

#### 应该如何安装依赖(难度从上到下递增)

##### 1.Java 语言应用安装依赖

虽然部署 jar 包不用关心依赖了，但这也带来了问题：部署前需要**先编译**

![java语言编译](.\img\java语言编译.jpg)

##### 2.Node.js 语言应用安装依赖

Node.js 中分为两种依赖类型：

- **全局依赖**：全局依赖安装在系统目录中
- **项目依赖**：项目依赖安装在项目目录中

避免使用全局依赖，把所有依赖都安装到项目目录中

可以通过命令，查看依赖查找路径

```bash
module.paths
```

对于 Node.is 来说，除了可以直接安装在 node moduels 中的 JS 依赖外还会使用 C++ 来编写一些 Nodejs 扩展

###### Node.js C++ 扩展的依赖安装

nodejs-addon

```bash
#清除已有编译文件
$ mpm run clean
# 开生成 C++ 工程
$ mpm run configure
# 编译 C++ 扩展
$ mpm run bufld
# 部署团数
$ fun deploy
```

###### 依赖包体积太大，导致函数无法部署的问题

函数计算限制是：100MB

在 Node.js 中，代码体积问题尤为常见

解决方法：

减小模块体积：参考 Java 等编译型语言的做法，对 Node.js 代码也进行编译

- webpack
- Vercel

##### 3.Python 语言应用安装依赖

给 Python 项目安装依赖比较麻烦的地方就在于使用 pip 安装的依赖通常会散落在系统的各个文件中

###### 方法一：使用--install-option 参数

| 文件类型          | 可选项            |
| ----------------- | ----------------- |
| Python modules    | --install-purelib |
| extension modules | --install-platlib |
| all modules       | --install-lib     |
| scripts           | --install-scripts |
| data              | --install-data    |
| C headers         | -install-headers  |

例子

```bash
# 将模块安装到当面目录
$ pip install --install-option="--install-lib=$(pwd)"

PyMysQL
```

###### 方法二：--target 参数

targe 参数可以将依赖直接安装到当前目录，不会产生 `lib/python3.7/site-packages` 子目录解构

###### 方法三：使用 virtualenv

```bash
pip install virtualenv
virtualenv path/to/my/virtual-env
source path/to/my/virtual-env/bin/activate
pip install PyMySQL
```

Python 解析依赖的路径

```bash
>>>import sys
>>> print('\n'.join(sys.path))
''
/usr/lib/python/3.7
/usr/lib/python/3.7/lib-dynload
/usr/lib/Python/3.7/lib/python/site-packages
/usr/local/lib/python3.7/site-packages
```

```python
#index.py
#将lib/目录添加到 sys.path
import sys
import os
try:
    # 检查 sys.path 中是否存在 lib/目录
    sys.path.index(os.getcwd() + '/lib/python3.7/site-packages')
except ValueError:
 # 如果lib/目录不存在 sys.path 中，则将其添加到 sys.path 数组的最前面
    sys.path.insert(0, os.getcwd() + '/lib/python3.7/site-packages')

import pymysql.cursors
```

### 依赖安装总结

不同编程语言包管理机制不同，安装依赖的方式也不尽相同但本质上，都是需要将依赖安装到应用项目中，并且随项目一起部署到 FaaS 平台

- Serverless 应用的代码依赖和系统依赖都需要安装在项目中并和应用代码一起部署到 FaaS 平台
- FaaS 对代码体积大小有限制，所以最好要精简依赖体积
- 如果代码或依赖需要编译，则编译环境需要和 FaaS 运行环境兼容，不然编译后的产物可能无法运行

### 作业：编写并部署一个需要安装依赖的函数代码

## 六.自定义函数运行时

### 前言

FaaS 平台支持的编程语言有限，当你想用 TypeScript 或其他语言时，可以使用**自定义运行时**

#### 提要

主流的 FaaS 平台自定义运行时实现原理

- 原理：了解一个通用的 FaaS 自定义运行时原理
- 实现：分别实现一个 TypeScript 运行时，和 Golang 的运行时

### 自定义运行时的原理

**运行时(Runtime)**：是程序运行时所依赖的环境

如 Node.js 运行时

- ali-oss
- tablestore

### FaaS 的运行原理

![FaaS的运行原理](.\img\FaaS的运行原理.jpg)

### 怎么才能让函数在自己定义的运行环境中执行?

安装依赖的本质就是要把函数运行所需要的依赖都**打包上传到 FaaS 中**，依赖可以如下：

- 代码依赖包
- 系统依赖库
- 函数运行时

#### FaaS 平台的自定义运行

用 TypeScript 编写代码

- runtime:custom：告诉 FaaS 你使用的时自定义运行时
- bootstrap:ts-node index.ts：告诉 FaaS 函数启动时
- 使用 ts-node：运行 index.ts

#### FaaS 平台在运行函数时会有很多参数，这些参数怎么传递给自定义运行时呢?

本质上是远程数据通信问题

![自定义运行时原理](.\img\自定义运行时原理.jpg)

需要把 HTTP 服务制定一个启动命令，bootstrap 文件示例

```bash
#!/bin/bash
./node_modules/ts-node/dist/bin.js server.ts
```

### 自定义运行时的实现

TypeScript 运行时 + Golang 运行时

- typescript-custom-runtIme TypeScript 运行时
- golang-custom-runtime Golang 运行时
- nodejs15-custom-runtime Node.js 15 运行时

#### 实现一个 TypeScript 运行时

TypeScript 为 JS 代码增加了类型系统，可以大大提升代码的可读性和可维护性

**ts-node**

1.本地创建 typescript 项目

```bash
npm i -S ts-node
npmi-S typescript
npm i-D @types/node
```

2.使用 typescript 来编写一个 http 服务

```typescript
import * as http from "http";

// 你可以在这里实现具体的业务逻辑
function sayHello(name: string): string {
	return `Hello, ${name}`;
}

// 创建一个HTTP 服务
const server = http.createServer(function (
	req: http.lncomingMessage,
	res: http.ServerResponse
): void {
	// 获取 Requestld
	const requestld = req.headers["x-fc-request-id"];

	console.log(`FCInvoke Start Requestld: ${requestld}`);

	// 拼接请求参数
	let rawData = "";
	req.on("data", function (chunk) {
		rawData += chunk;
	});
	req.on("end", function () {
		// 处理业务逻辑，比如这里是输出欢迎语
		const body = sayHello(rawData);

		// 设置 HTTP 响应
		res.writeHead(200);
		res.end(body);
		console.log(`FCInvoke End Requestld: ${requestld}`);
	});
});
server.timeout = 0;
server.keepAliveTimeout = 0;

// 启动 HTTP 服务并监听9000端口
server.listen(9000, "0.0.0.0", function () {
	console.log("FunctionCompute typescript runtime initialized.");
});
```

3.通过安装在项目中的 ts-node 命令来运行

```bash
# 启动HTTP 服务
$ ./node_modules/ts-node/dist/bin.js server.ts
```

4.在另一个终端中使用 curl 命令进行测试

```bash
$ curl 0.0.0.0:9000 -X POST -d"Serverless" -H "x-fc-request-id:abcde"
Hello, Serverless
```

至此，自定义运行时完成

5.让 FaaS 知道如何启动你的自定义运行时

```bash
#!/bin/bash
./node modules/ts-node/dist/bin.js server.ts
```

6.添加函数计算的 template.yaml 配置

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
 custom-typescript-demo:
  Type: 'Aliyun::Serverless::Servicel‘
  Properties:
   Description: 'helloworld'
  typescript-demo:
  Type: 'Aliyun::Serverless::Function'
  Properties:
   Runtime: custom
   MemorySize:512
   Handler: index.handler
   CodeUri: './'
```

7.部署

```bash
# 部署
$ fun deploy -y
# 测试
$ fun invoke -e "Serverless"
```

#### 实现一个 Golang 的运行时

将运行环境和代码打包，这种思想是不是和容器技术很像?

- 容器技术就是将应用和运行所依赖环境打包为镜像这样应用可以轻松迁移、部署

自定义运行时使用流程

![自定义运行时原理](.\img\自定义运行时使用流程.jpg)

仓库地址：registry.<地域>.aliyuncs.com/<命名空间/<仓库名>

#### 使用 Golang 实现一个 HTTP 服务

1.Golang 实现一个 HTTP 服务

```go
package main

import(
 "fmt"
    "net/http"
    "runtime"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w,"Hello Serverless! This is Golang runtime, version: %s", runtime.Version())
}

func main () {
    http.HandleFunc("/", HelloHandler)
    http.ListenAndServe(":8080" nil)
}
```

2.本地测试

```bash
#启动 HTTP服务
$ go run main.go
```

3.新开一个终端，通过 curl 命令测试

```bash
# 新开一个终端，通过 curl 命令测试
$ curllocalhost:8080
Hello Serverless! This is Golang runtime, version:go1.13.5
```

4.构建包含 Golang 运行时及代码的镜像

```bash
# Dockerfile
FROM golang:1.15.6-alpine3.12

WORKDIR/go/src/app

# 将代码复制到工作目录
COPY..

# 编译
RUN go build main.go
# 暴露 8080端口
EXPOSE 8080
#启动应用
ENTRYPOINT["./main"]
```

5.构建并上传镜像

```bash
# 指定镜像名称，例如registry.cn-

hangzhou.aliyuncs.com/serverless-image/golang:v0.1

$ export IMAGE_NAME="你的镜像仓库:版本"

$ docker build -t $IMAGE_NAME.

$ docker push $IMAGE_NAME
```

6.创建 template.yaml 配置文件

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
 serverless:
  Type: 'Aliyun::Serverless::Service’
  Properties:
   Policies:
    - AliyunContainerRegistryReadOnlyAccess
   InternetAccess: true
  golang-runtime:
   Type: 'Aliyun::Serverless::Function‘
   Properties:
    Description:'Golang Runtime’
    Runtime: custom-container
    Timeout: 60
    CAPort:8080
    Handler: not-used
    MemorySize: 1024
    CodeUri:./
    CustomContainerConfig:
    lmage: 'registry.cn-hangzhou.aliyuncs.com/serverless-image/golang:v0.1'
```

7.通过 fun deploy 进行部署，fun invoke 进行测试

```bash
$ fun deploy
$ fun invoke
Hello Serverless!This is Golang runtime, version: gol.15.6
```

### 自定义运行时总结

- FaaS 平台提供了有限的编程语言及版本的支持使用自定义运行时，可以自定义编程语言进行开发
- 自定义运行时的原理是在函数中实现一个 HTTP 服务 FaaS 平台将触发器事件转发到你的 HTTP 服务
- 可以通过将运行时上传到 FaaS 在 bootstrap 中定义启动命令来实现自定义运行时
- 可以通过自定义容器镜像来实现任意编程语言的自定义运行时

自定义运行时是 Serverless 应用开中非常重要的一个功能。基于容器实现自定义运行时你可以很方便地安装依赖，因为依赖都打包到了镜像中

## 七.Serverless 应用代码单元测试

### 前言

单元测试是保证代码质量和应用稳定性的重要手段

### 使用 Serverless 的难点

- Serverless 架构是分布式的，组成 Serverless 应用的函数是单独运行的。这些函数集合到一起组成分布式架构，你需要对独立函数和分布式应用都进行测试
- Serverless 架构依赖很多云服务，比如各种 FaaS、BaaS 等，这些云服务很难在本地模拟
- Serverless 架构是事件驱动的事件驱动这种异步工作模式也很难在本地模拟

### Serverless 单元测试准则

测试金字塔理论

![测试金字塔](.\img\测试金字塔.jpg)

Serverless 应用依赖很多云服务函数参数也与触发器强相关

- 将业务逻辑和依赖的云服务分开，保持业务代码独立使其更易于扩展和测试
- 对业务逻辑编写充分的单元测试保证业务代码的正确性
- 对业务代码和云服务编写集成测试保证应用的正确性

要解决这些难点主要就是要将业务代码和依赖的云服务分离开来，这样才能方便测试

假设实现一个功能：保存用户信息，保存成功后并发送欢迎邮件

```js
// handler.js
const db = require("db").connect();
const mailer = require("mailer");

module.exports.handler = (event, context, callback) => {
	const user = {
		email: event.email,
		created_at: Date.now(),
	};

	// 将用户信息存入数据库
	db.saveUser(user, function (err, userld) {
		if (err) {
			callback("保存用户信息失败");
		} else {
			// 存入成功后，为用户发送一封邮件
			const success = mailer.sendWelcomeEmail(event.email);
			if (success) {
				// 如果发送邮件成功，则通过回调函数返回 userld
				callback(null, userld);
			} else {
				// 如果发送邮件失败，则通过回调函数告诉调用方发送邮件失败
				callback(`发送邮件{user.email}失败`);
			}
		}
	});
};
```

上面代码重构后

src/users.js

```js
class Users {
	constructor(db, mailer) {
		this.db = db;
		this.mailer = mailer;
	}
	save(email, callback) {
		const user = {
			email: email,
			created_at: Date.now(),
		};

		// 将用户信息存入数据库
		this.db.saveUser(user, (err, id) => {
			if (err) {
				callback("保存用户信息失败");
			} else {
				// 存入成功后，为用户发送一封邮件
				const success = mailer.sendWelcomeEmail(email);
				if (success) {
					// 如果发送邮件成功，则通过回调函数返回 userld
					callback(null, id);
				} else {
					// 如果发送邮件失败，则通过回调函数告诉调用方发送邮件失败
					callback(`发送邮件{email}失败`);
				}
			}
		});
	}
}
module.exports = Users;
```

handler.js

```js
const db = require("db").connect();
const mailer = require("mailer");
const Users = require("./src/users");

// 初始化 User 实例
let users = new Users(db, mailer);

module.exports.saveUser = (event, context, callback) => {
	users.save(event.email, callback);
};
```

代码重构准则

- 准则一：代码更易于扩展--提供一个 handlerjs 使其适用于新的 FaaS 平台，从而避免云厂商绑定
- 准则二：需要对 User 类编写单元测试

### Serverless 单元测试实践

Node.js 使用 jest 框架做单元测试

1.创建一个`__test__` 目录

2.新建 `users.test.js`文件编写 Users 类的测试

3.测试可能的情况

- 用户信息写入数据库成功，发送邮件成功
- 用户信息写入数据库失败
- 用户信息写入数据库成功，发送邮件失败

  3.1 对 db.saveUser 和 mailer.sendWelcomeEmail 函数进行模拟

```js
const db = {
	saveUser: jest.fn((user, callback) => callback(null, 1)),
};

const mailer = {
	sendWelcomeEmail: jest.fn(() => true),
};
```

4.针对 save 方法编写第一个测试用例

```js
const Users = require('../src/users');

test('用户信息写入数据库成功，发送邮件成功',() => {
    //模拟db.saveUser，并调用成功
    const db = {
        saveUser: jest.fn((user, cb) => cb(null, 1))，
    };

    // 模拟 mailer.sendWelcomeEmail，并调用成功
    const mailer = {
        sendWelcomeEmail: jest.fn(() => true),
    };

    const users = new Users(db, mailer);
    const email= 'test@gmail.com';
    users.save(email, (err, userld) => {
        // 第一个断言，保存用户信息后的结果为 null
        expect(err).toBeNull();
        //第二个断言，保存并发送
        expect(userld).toBe(1);
    });
});

test('用户信息写入数据库成功，发送邮件失败', () => {
    const db = {
        saveUser:jest.fn((user, cb) => cb(null,1)),
    };
    const mailer = {
        sendWelcomeEmail: jest.fn(() => false),
    };

 const users = new Users(db, mailer);
    const email = 'test@gmail.com';
    users.save(email, (err, userld) => {
        expect(err).toBe(`发送邮件{email}失败`);
        sexpect(userld).toBeUndefined();
    });
});

test('用户信息写入数据库失败', () => {
    const db = {
        saveUser:jest.fn((user, cb) => cb(new Error('Internal Error'))),
    };
    const mailer = {
        sendWelcomeEmail: jest.fn(() => false),
    };

 const users = new Users(db, mailer);
    const email = 'test@gmail.com';
    users.save(email, (err, userld) => {
        expect(err).toBe('保存用户信息失败');
        sexpect(userld).toBeUndefined();
    });
});
```

5.使用 npm run test 测试

```bash
npm run test
```

6.运行单元测试并生成测试覆盖率

```bash
npm run test:coverage
# 运行之后查看输出，看看单元测试覆盖率怎么样
```

7.业务逻辑的变更，如何修改单元测试

为了更好地管理代码，建议单元测试的目录结构和业务代码结构保持一致，也就是 src 下的目录结构和`__test__` 的目录结构一样

### 单元测试的最佳实践

- 速度
- 隔离外部调用
- 模拟
- 单一职责
- 自描述

### 单元测试总结

- Serverless 应用由于其分布式、依赖云服务、事件驱动等特性导致编写单元测试很困难
- 为了方便编写单元测试需要将业务逻辑和依赖的云服务分离开来
- 编写单元测试时，需要考虑速度、隔离性、单一职责等因素避免单元测试成为开发的负担
- 好的单元测试应该是自描述的能对代码进行解释说明

对 Serverless 应用编写单元测试的前提是：**将业务代码和云服务依赖分离**
