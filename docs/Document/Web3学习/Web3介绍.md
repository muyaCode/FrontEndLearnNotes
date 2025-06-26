# Web3 和相关库介绍

## Web3 简介

Web3 是一种对互联网的新构想，它利用了去中心化、区块链技术和基于代币的经济等概念（<https://hbr.org/2022/05/what-is-web3>）（<https://en.wikipedia.org/wiki/Web3>）。Web3 的支持者认为，这种新的网络服务将使互联网的构建者和用户拥有更多的控制权和所有权，而不是依赖于传统的中介和门户 ¹²。Web3 的应用包括去中心化的社交网络、以代币奖励玩家的“玩赚”视频游戏、以及允许人们购买和出售数字文化碎片的 NFT 平台（<https://www.nytimes.com/interactive/2022/03/18/technology/web3-definition-internet.html>）。Web3 也被称为“第三代”互联网，它将使机器能够解释更多的数据，从而使我们能够更深入地与其他用户交互（<https://www.bbc.com/mundo/noticias-59746140>）。

---

[2023 年 Web3 开发学习路线全指南\_元宇宙中心的博客-CSDN 博客](https://blog.csdn.net/paranoid_7988/article/details/128905615)

中文学习库：[WTF.Academy (github.com)](https://github.com/WTFAcademy)

[WTFAcademy/WTF-gm: Web3 黑话汇总（黑宝书） (github.com)](https://github.com/WTFAcademy/WTF-gm)

## 以太坊标准 JS API 库——Web3.js/Ethers.js/

`Web3.js`与`Ethers.js`都属于以太坊标准 JavaScript API 库，二者各有特点，同样被广大的 Web3 开发者接受

Web3.js 属于比较老牌的 API 库，功能比较强大，但是使用过程中需要注意各种回调函数；

而 Ethers.js 属于新兴起的 API 库，其最大的特点在于其接口调用简单方便，对于不是很熟悉 JS 的开发者来说比较友好。

### 如何确定在去中心化应用中到底应该使用 web3.js 还是 ethers.js 呢？两者有何区别？

首先，如果你要基于样板应用或教程开发，则使用该样板或教程建议你使用的库，不管是 web3.js 还是 ethers.js。这将为你省去不少麻烦，让你可以更好地跟着教程操作。**请务必使用教程指定的 web3.js 或 ethers.js 版本。**有许多教程没有更新，不要想当然地认为你可以使用最新版本的库，除非教程中具体说明。

如果你要从零开始构建应用并确定需要使用的库，我们有一个使用评估流程，下面列出了 9 个问题。在确定哪个库适合你(即读者)时应该思考这些问题。此外还提供了一些上下文和信息以帮助你回答这些问题。

### 1.库的受欢迎程度有多重要？

“在 Github 上受欢迎的项目正如你所料。也就是说，有许多人提问、参与和支持。这些活动能让软件更加可靠。通过查看任何一个项目的加星数、已发布的问题数量、处理中的拉取请求以及项目的参与者数量，可以确定它的受欢迎程度。”

截止到撰写本博客时，Web3.js 获得了近 8,800 颗星，而 ethers.js 获得了近 1,500 颗星。在 GitHub 上使用 web3.js 的资源库有 51,300 个，而使用 ethers.js 的有 18,500 个。Web3.js 存在的时间更长，这也是 **web3.js 更受欢迎**的原因之一。

### 2.库的维护有多重要？

我们希望自己使用的库能够频繁更新，以修复错误和添加新功能。尽管不完美，但通过查看一两个月期间的提交数、已解决的问题数、正在处理的问题数以及维护者数，可了解开源项目的优势和弱点。用户从中也能看到库的维护模式，了解库一般有哪些更新并修复了哪些错误，并以此作为判断库维护情况的代理指标。我们来查看两个库([web3.js](https://github.com/web3/web3.js) 和 [ethers.js](https://github.com/ethers-io/ethers.js))在 GitHub 上的每月动态，以了解它们的统计数据。

ethers.js 的维护者只有一人 — Richard Moore，他完成的提交数和已解决的问题数相当惊人，值得称赞。Web3.js 有 12 位维护者，绝大多数提交数都是由其中三人完成的。在这方面没有明显的胜负差异，但在选择库时应注意，这些统计数据可以帮助你确定，在维护性方面你最看重哪些，并根据你的需求确定库的优先性。

### 3.库的开发负责人是谁？使用库的项目有多少个？

Web3.js 是[以太坊基金会](https://ethereum.org/en/)的一个项目。以太坊基金会是一个非营利性组织，致力于协议层开发的研究和组织。Ethers.js 的目的是建立[“一个完整、简单、小巧的库，取代 web3 和 ethereum.js”](https://www.youtube.com/watch?v=P-UzQTDfdXY)。Ethers.js 的开发者是 Richard Moore，并由他来创建和维护库。

有些项目公开声明了他们使用的是哪个库，我们认为从这些数据中可以看出两个库受欢迎的程度都很高。查看 [web3.js](https://github.com/ethereum/web3.js/network/dependents)和 ethers.js 依赖图，以了解你信任的项目使用的是哪个库，或者他们是否同时使用/支持两个库。

### 4.库具有测试有多重要？

如果预编写的测试对你的项目来说很重要，那么**从历史数据来看，ethers.js 胜**。截至撰写本文时止，Ethers.js 已经在 Github 上发布了 3.0 发行版的清晰[测试文档](https://github.com/ethers-io/ethers.js/tree/master/docs)，但还没有为 5.0 发行版更新该文档。Web3.js 在测试文档方面稍逊一筹。如果 ethers.js 在接下来几周更新测试文档，那么在测试和测试文档方面将继续保持优胜地位。到目前为止尚无定论，因为 ethers.js 它测试套件至今似乎还未更新。

### 5.库的下载量有多重要？

由于 web3.js 存在的时间更长，因此它的下载量超过了 ethers.js 的下载量，但是如果查看周下载量，ethers.js 超过了 web3.js，因此目前的下载次数更加频繁。Ethers.js 的近期下载量更高，而 web3.js 的总下载量更高。

### 6.Web 性能有多重要？

如果 web 性能对你来说非常重要，则我们认为 ethers.js 库的性能更加优越。ethers.js 库声称未压缩大小为 284 kb，而在 NPM 上列出的解压缩大小为 3.5 MB([ethers - npm (npmjs.com)](https://www.npmjs.com/package/ethers))。Web3.js 至少大一个数量级，解压缩大小为 10.6 MB(<https://www.npmjs.com/package/web3>)。考虑到 ethers.js 比 web3.js 更加小巧，因此推测使用 ethers.js 的应用程序比使用 web3.js 的相同应用程序加载速度更快。这是因为不管使用什么库，它都会和构成 web 应用程序的其他资源一起加载。我们没有使用 web3.js 和 ethers.js 分别对完全相同的应用程序测试加载速度，因此在这一点上应该持保留态度。如果数据量大小对应用程序会有影响，则数据量较小的 ethers.js 库会有优势。

### 7.文档质量有多重要？

文档质量是一个主观性指标，但评估文档质量的其中一种方式是阅读文档，看它的阅读难易程度如何。最理想的情况是，编写的文档能够让新用户理解如何使用库。文档在结构安排上也应该能够让资深用户快速找到他们需要查找的内容。

Web3.js 具有广泛而相当实用的 API 参考(<https://web3js.readthedocs.io/en>)。这是文档最重要的部分。“新手入门”材料较为简单，这可能会深受资深用户的欢迎，但适合 web3.js 新用户使用的材料很少。

Ethers.js 包括“新手入门”部分以及拓展性 API 参考。这些材料非常实用，使得 ethers.js 相对于 web3.js 具有优势，尤其是对以太坊生态系统中的入门级开发者而言。针对 ethers.js 的文档中有一些不完整的部分，这对用户来说很不方便(“以太坊基本介绍”部分[https://docs.ethers.io/v5/concepts/events/]以及以前对开发者非常实用的常见代码样例“整理合集”尚未更新到 5.0，用户必须返回到第 4.0 版文档查找这些有用的资源)。Ethers.js 还清晰地介绍了使用 ethers.js 的优势。

两个库的文档都存在不足之处，因此如果文档对你来说很重要，请花一些时间来了解并确定哪个库提供了充分的信息来帮助你实现你需要构建的特性。

### 8.库的总使用量有多重要？

由于 web3.js 存在的时间更长，因此具有更高的下载量和 GitHub 加星数，而 ethers.js 在受欢迎程度上有所上升。最终应该由你自己来决定库的哪些方面对你的用例最重要。

### 9.许可证有多重要？

根据你的具体用例，开源软件许可证对你来说可能很重要。Web3.js 有 LGPLv3 许可证(列在 NPM[[web3 - npm (npmjs.com)](https://www.npmjs.com/package/web3)] 上，但没有列在其 GitHub 库上)，ethers.js 有 MIT 许可证(列在其 GitHub 库上)。联系关于该主题的法律专家可以获取有关许可证的更多详细信息。但是，Slava Todavchich 在文章“了解开源和免费软件许可[26]”中针对该主题进行了生动有趣的阐述。

### 结论

正如我们开篇就已指出，两个库都能够完成任务。Ethers.js 在近两年来越来越受欢迎，下载量和项目使用量都不断增加。Web3.js 一直以来都作为标杆存在，并且仍然拥有许多开发者共享资源。

请关注第二部分。我们将发布一份跟进教程，介绍如何连接到 Infura API [https://infura.io/dashboard] 并使用 web3.js 和 ethers.js 发送交易。

## 其他库

Etherscan：[Etherscan 使用说明 — Etherscan API 中文文档 — 深入浅出区块链 (learnblockchain.cn)](https://learnblockchain.cn/docs/etherscan/)

truffle：[Truffle 翻译说明及概述 | Truffle 中文文档 - DApp 开发框架 | 深入浅出区块链 (learnblockchain.cn)](https://learnblockchain.cn/docs/truffle/)

hardhat：[概述 | Hardhat | 为专业人士开发的以太坊开发环境 by Nomic Labs (learnblockchain.cn)](https://learnblockchain.cn/docs/hardhat/getting-started/)

foundry：[介绍 - Foundry 中文文档 (learnblockchain.cn)](https://learnblockchain.cn/docs/foundry/i18n/zh/)

Solidity：[Solidity 中文文档 — Solidity 中文文档 — 登链社区 (learnblockchain.cn)](https://learnblockchain.cn/docs/solidity/)
