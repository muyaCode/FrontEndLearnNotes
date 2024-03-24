# ECMAScript-14(ES2023)

## 提案



## 特性

2023年 6 月 27 日，第 125 届 ECMA 大会正式批准了 ECMAScript 2023 语言规范。总而言之，本次 ECMAScript 2023 并没有新增大的改动点，更多是对 JavaScript 原来语法的完善与增补。而笔者认为其中比较有意义的更新主要有以下两个：

### 1、WeakMap 支持 Symbol 作为 Key。

总所周知， WeakMap 的 Key 是弱引用，且要求是唯一的值。由 Symbol 具有唯一性，保证不可重建，因此在今年的 ECMAScript 2023 新特性中扩展了 WeakMap API，WeakMaps 允许使用唯一的 Symbol 作为键。不过值得注意的是，通过 Symbol.for 创建的 Symbol 是不可以作为弱引用的，因为 Symbol.for 会在全局注册 Symbol，并支持在任何地方通过 Symbol.for 再次引用。



### 2、新增四个通过副本修改数组的方法：toReversed()、toSorted()、toSpliced()、with()，

目前大多数的数组方法都是非破坏性的，当然也存在一些对原数组具有破坏性的方法，例如 reverse()、sort() 以及 splice() 。当我们想要使用这些方法又不想对原数组造成影响的话，通常需要先拷贝一份数组再调用相应的方法，由此可见，这种开发体验不友好的。因此在今年的 ECMAScript 2023 优化了开发体验，新增了相应的非破坏性方法。



关于更多 ECMAScript 2023 其他改动的完整信息，请参考官方文档，此处不再赘述：ECMAScript® 2023 Language&nbsp;Specification：https://tc39.es/ecma262/2023/



参考内容：

ES2023（ES14）新标准详解 - IT深客：https://www.itthink.tech/article/03e3d5cb-c817-41e9-918b-095fe6ace04b/d081bab2-1200-4fe3-a037-1abb8e6b8ba4#h2-SymbolsE58FAFE4BBA5E4BD9CE4B8BAweakE99B86E59088E79A84key