# Biome：格式化程序

**Prettier 的创建者 Christopher Chedeau 悬赏 1 万美元**（奖金随后也逐步增加）**开发一个由 Rust 驱动的代码格式化程序，该格式化程序需要通过 Prettier 95% 以上单元测试。 目前，随着 v1.4.0 版本发布，Biome 团队确认赢得了 Prettier 团队发布的该奖项。**

## 什么是 Biome

Biome 是一个用于 Web 项目的高性能工具链，旨在提供开发者工具来维护项目的健康。Biome 是 JavaScript、TypeScript、JSX 和 JSON 的快速格式化程序。

同时，Biome 也是一个适用于 JavaScript、TypeScript 和 JSX 的高性能 linter，具有来自 ESLint、TypeSCript ESLint 和其他来源的 170 多个规则。 Biome 输出详细的上下文诊断信息，帮助开发者改进代码。

Biome 从一开始就被设计为可以在编辑器中交互使用，可以在开发者编写错误代码时对其进行格式化和检查。

## 更好的格式化程序

Biome 格式化程序现在与 Prettier 的兼容性超过 96%，分数是针对 JavaScript、TypeScript 和 JSX 代码综合计算的。

Biome 团队将挑战目标能够实现的主要因素归结为以下三个：

- 钱：通过参与到 Biome 的项目中，不少贡献者可以获得一笔不错的收入
- 沟通：Biome 使用 GitHub 作为唯一的协调媒介，提供了有关如何交付的信息、说明和帮助。
- 基础设施：Biome 依赖于以前的 Rome Tools 员工和贡献者构建的可靠的测试基础设施，能够捕获每个重新格式化错误，提供精细的差异，并在发出的输出与 Prettier 发出的输出不同时警告用户。

根据内部指标（JavaScript、TypeScript 和 JSX，基于选项奇偶校验），在挑战之前，Biome 的兼容性约为 85%。 尽管 85% 看起来很高，但像 15% 这样的低数字对大型代码库的影响是巨大的，人们可能会对如此多的变化感到害怕，导致早期采用者在将 Biome 引入团队时遇到一些阻力。

## Biome 新的格式选项

## lineEnding

使用此选项来匹配操作系统的行结尾，支持 lf（换行 - \n）、cr（回车 - \r）和 crlf（回车换行 - \r\n）。

## bracketSameLine

```html
// Existing behavior. Now also the default, meaning `bracketSameLine: false`. <Foo className={somethingReallyLongThatForcesThisToWrap} anotherReallyLongAttribute={withAValueThatsSurelyTooLong} soThatEverythingWraps > Hello </Foo> <Foo selfClosingTags={likeThisOne} stillPlaceTheBracket={onItsOwnLine} toIndicateThat={itClosesItself} />
```

使用 'bracketSameLine': true 格式化后代码如下：

```html
// New behavior, with `bracketSameLine: true`.
<Foo
  className={somethingReallyLongThatForcesThisToWrap}
  anotherReallyLongAttribute={withAValueThatsSurelyTooLong}
  soThatEverythingWraps>
  Hello
</Foo>

<Foo
  selfClosingTags={likeThisOne}
  stillPlaceTheBracket={onItsOwnLine}
/>
```

## bracketSpacing

```js
import { sort } from 'sort.js'; const value = { sort };
```

使用 'bracketSpacing': false 格式化后代码如下：

```js
import { sort } from 'sort.js';
const value = { sort };
```

关于 Biome 的更多规则可以参考文末资料，这里不再过多展开。

## Biome CLI

依赖 Biome LSP 的开发者会很高兴他们现在可以使用选项 --config-path 将自定义配置传递给命令 lsp-proxy，命令 start 接受相同的选项：

```bash
biome --config-path=../path/where/config/is lsp-proxy biome --config-path=../path/where/config/is start
```

CLI 现在公开了选项 --diagnostic-level，该选项允许过滤打印到终端的诊断类型。

```bash
biome check --diagnostic-level=error ./src
```

## 参考资料

biome开源地址：https://github.com/biomejs/biome

https://v/blog/biome-wins-prettier-challenge/

https://github.com/biomejs/biome

https://github.com/prettier/prettier