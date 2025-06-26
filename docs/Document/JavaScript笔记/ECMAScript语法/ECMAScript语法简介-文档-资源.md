# ECMAScript 语法简介-文档-资源

## ECMAScript 语法简介

ECMA（European Computer Manufacturers Association）中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994 年后该组织改名为 Ecma 国际。

最初 `JavaScript` 语言有 2 份标准：

`ECMA-262`：主标准，由 ECMA 国际组织（`Ecma International`）负责管理（为了让最初的`JavaScript` 与最初的 `JScript` 能遵循同一套标准发展而诞生的 `ECMAScript` ，正好排到了作为 `Ecma` 的 `262` 号标准，所以得到 `ECMA-262` 编号。）

`ISO/IEC 16262`：第二标准，由国际标准化组织 `ISO`（`International Standard Organization`）和国际电子技术委员会 `IEC`（`International Electrotechnical Commission`）负责管理

出于商标版权的原因，规范标准中将这门语言称为 `ECMAScript` ，所以原则上 `JavaScript` 与`ECMAScript` 指的是同一个东西，但有时也会加以区分：

- `JavaScript`：指语言及其实现
- `ECMAScript`：指语言标准及语言版本，比如 ES6 表示语言（标准）的第 6 版

### 1.什么是 ECMAScript

- ECMAScript 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言。

### 2.什么是 ECMA-262

Ecma 国际制定了许多标准，而 ECMA-262 只是其中的一个，所有标准列表查看

- <http://www.ecma-international.org/publications/standards/Standard.htm>

### ECMAScript 规范

ECMAScript 规范每年都会更新一次，正式标准化 JavaScript 语言的 ECMAScript 的下一次年度更新将在 2023 年 6 月左右获得批准，这将是 ECMAScript 的第 14 版。所有在 2023 年 3 月之前达到阶段 4 的提案都将包含在 ECMAScript 2023 标准中。 对于一个提案，从提出到最后被纳入 ECMAScript 标准，总共分为五步：

- **stage0（strawman）**：任何 TC39 的成员都可以提交。
- **stage1（proposal）**：进入此阶段就意味着这一提案被认为是正式的了，需要对此提案的场景与 API 进行详尽的描述。
- **stage2（draft）**：演进到这一阶段的提案如果能最终进入到标准，那么在之后的阶段都不会有太大的变化，因为理论上只接受增量修改。
- **state3（candidate）**：这一阶段的提案只有在遇到了重大问题才会修改，规范文档需要被全面的完成。
- **state4（finished）**：这一阶段的提案将会被纳入到 ES 每年发布的规范之中。

### 3.ECMA-262 历史

#### 3.1 ECMA-262（ECMAScript）历史版本查看网址

- <http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm>

#### 3.2 ECMASript 语法提案库

- <https://github.com/ungap>

#### 3.3 ECMASript 标准文档

- 文档：https://tc39.es/
- 提案：<https://tc39.es/ecma262/>
- 提案程序规范：https://tc39.es/process-document/
- 组织：https://github.com/tc39
- 提案完整列表：https://github.com/tc39/proposals/tree/main
- 新闻：https://ecma-international.org/news/
- 已经通过并实行的标准：https://ecma-international.org/publications-and-standards/standards/
- 标准库：https://github.com/zloirock/core-js

注：从 ES6 开始，每年的 6 月份发布一个版本，版本号比年号最后一位大 1

### 4.谁在维护 ECMA-262

TC39（Technical Committee 39）是推进 ECMAScript 发展的委员会。其会员都是公司（其中主要是浏览器厂商，有苹果、谷歌、微软、因特尔等）。TC39 定期召开会议，会议由会员公司的代表与特邀专家出席

#### 标准组织 TC39

- Ecma TC39 组织库：<https://github.com/tc39>
- ECMAScript 提案：<https://github.com/tc39/proposals>

## ECMAScript 发展历史

- ECMAScript 1（1997 年 6 月）：规范第一版
- ECMAScript 2（1998 年 6 月）：为了同步 ISO 标准，引入了一些小更新
- ECMAScript 3（1999 年 12 月）：增加了正则表达式、字符串处理、控制语句（do-while、switch）、异常处理（try-catch）等众多核心特性
- ECMAScript 4（2008 年 7 月废除)：本来是一次大规模升级（静态类型、模块、命名空间等），但跨度过大，出现了分歧，最终没能推广使用
- ECMAScript 5（2009 年 12 月）：变化不大，加了一些标准库特性和严格模式
- ECMAScript-5.1（2011 年 6 月）：又一次小更新，为了同步 ISO 标准
- ECMAScript 6（2015 年 6 月）：一大波更新，实现了当年 ES4 的许多设想，并正式改为按年份命名规范版本
- ECMAScript 2016（2016 年 6 月）：第一个年度版本，与 ES6 相比，发布周期较短，新特性也相对少些
- ECMAScript 2017（2017 年 6 月）：第二个年度版本...

> 以后的 ECMAScript 版本（ES2018、ES2019、ES2020 等）都在 6 月正式获准生效

## 书籍文档相关

推荐阮一峰的《ES6 标准入门》：<https://es6.ruanyifeng.com/>

《JavaScript 高级教程（第 4 版）》[红宝石书]

《JavaScript 权威指南》[犀牛书]

## 资源

ECMA-262，ECMAScript 的语法标准（语法草案和版本相关）：<https://www.ecma-international.org/publications-and-standards/standards/ecma-262/>

## MDN 语法查询

<https://developer.mozilla.org/zh-CN/>



# WICG：Web 孵化器

开源社区：[Web 孵化器 CG](https://github.com/WICG)

## observable提案相关链接

[原生 Observable API 来了！能否取代每周下载 5200 万次的 RxJS？](https://mp.weixin.qq.com/s/gtTFPz4zARloKG5MqxRIGQ)

- **规范**：https://wicg.github.io/observable/
- **提案**：https://github.com/WICG/observable
- **Chrome 实施状态**：https://chromestatus.com/feature/5154593776599040
