# 代码是怎么编译的(webpack 前端构建工具源码原理分析)

Node.js 的出现，越来越多前端自动化工具涌现出来，包括早期的 Grunt、Gulp 以及现在流行的 webpack。随着这些工具的功能愈发强大，其重要性也在不断提升，成熟的框架都已经将这些工具封装成专用的命令行工具，比如 angular-cli 和 vue-cli。

这一课时我们将继续承接前面课程的“硬核”风格，通过分析 webpack(5.0.0-beta.23) 的源码来深入理解其原理。

webpack 有两个执行入口，分别是通过命令行调用的 bin/webpack.js，以及直接在代码中引用的

lib/webpack.js。我们避开命令参数解析以及进程调用的过程来分析 lib/webpack.js，下面是部分源码（省去了数组型配置及 watch 功能）。

```js
// lib/webpack.js
const webpack = (options, callback) => {
	validateSchema(webpackOptionsSchema, options);
	let compiler;
	compiler = createCompiler(options);
	if (callback) {
		compiler.run((err, stats) => {
			compiler.close((err2) => {
				callback(err || err2, stats);
			});
		});
	}
	return compiler;
};
```

从源码中可以看到，webpack() 函数内部有 3 个重要的操作：**校验配置项**、**创建编译器**、**执行编译**。

#### 校验配置项

校验配置项是通过调用 validateSchema() 函数来实现的，这个函数的内部其实是调用的 schema-utils 模块的 validate () 函数 ，validate() 函数支持通过 JSONSchema 规则来校验 json 对象。这些 JSONSchema 规则保存在 schemas/WebpackOptions.json 文件中，对应代码中的 webpackOptionsSchema 变量。

这里简单介绍一下 JSONSchema，它是通过 JSON 文件来描述 JSON 文件 ，可以用来校验 JSON 对象、生成 mock 数据及描述 JSON 对象结构。下面是一个对 output 参数的部分校验规则。

```json
"Output": {
  "description": "Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.",
  "type": "object",
  "properties": {
     ...
    "path": {
      "$ref": "#/definitions/Path"
    }
  }
}
...
"definitions": {
 "Path": {
    "description": "The output directory as **absolute path** (required).",
    "type": "string"
  }
}
```

从 "type": "object" 可以看到 Output 是一个对象，它拥有属性 Path，而这个 P ath 类型定义在 definitions 对象的 Path 属性中，通过 "type": "string" 可以看到，它是一个字符串类型。WebpackOptions.json 文件内容比较多，有 3000 多行，这里就不多介绍了，有兴趣的同学可以仔细研究。

一句话概括，validateSchema() 函数通过 JSONSchema 对 options 进行校验，如果不符合配置规则，则退出并在控制台输出格式化的错误信息。这样就能避免因为选项参数不正确而导致程序运行出错。

#### 创建编译器

创建编译器操作是在 compiler.compile() 函数中调用 createCompiler() 函数来实现的，该函数会返回一个 Compiler 实例。createCompiler() 函数源码如下：

```js
// lib/webpack.js
const createCompiler = (rawOptions) => {
	const options = getNormalizedWebpackOptions(rawOptions);
	applyWebpackOptionsBaseDefaults(options);
	const compiler = new Compiler(options.context);
	compiler.options = options;
	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging,
	}).apply(compiler);
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
	applyWebpackOptionsDefaults(options);
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	new WebpackOptionsApply().process(options, compiler);
	compiler.hooks.initialize.call();
	return compiler;
};
```

在 createCompiler() 函数内部可以看到，首先会通过 getNormalizedWebpackOptions() 函数将默认的配置参数与自定义的配置参数 rawOptions 进行合成，赋值给变量 options。applyWebpackOptionsBaseDefaults() 函数则将程序当前执行路径赋值给 options.context 属性。

经过以上处理之后，变量 options 才会作为参数传递给类 Compiler 来生成实例。在构造函数中，实例的很多属性进行了初始化操作，其中比较重要的是 hooks 属性。下面是截取的部分源码：

```js
// lib/Compiler.js
constructor(context) {
    this.hooks = Object.freeze({
      initialize: new SyncHook([]),
      shouldEmit: new SyncBailHook(["compilation"]),
      done: new AsyncSeriesHook(["stats"]),
      afterDone: new SyncHook(["stats"]),
      additionalPass: new AsyncSeriesHook([]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      emit: new AsyncSeriesHook(["compilation"]),
      assetEmitted: new AsyncSeriesHook(["file", "info"]),
      afterEmit: new AsyncSeriesHook(["compilation"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      normalModuleFactory: new SyncHook(["normalModuleFactory"]),
      contextModuleFactory: new SyncHook(["contextModuleFactory"]),
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      finishMake: new AsyncSeriesHook(["compilation"]),
      afterCompile: new AsyncSeriesHook(["compilation"]),
      watchRun: new AsyncSeriesHook(["compiler"]),
      failed: new SyncHook(["error"]),
      invalid: new SyncHook(["filename", "changeTime"]),
      watchClose: new SyncHook([]),
      infrastructureLog: new SyncBailHook(["origin", "type", "args"]),
      environment: new SyncHook([]),
      afterEnvironment: new SyncHook([]),
      afterPlugins: new SyncHook(["compiler"]),
      afterResolvers: new SyncHook(["compiler"]),
      entryOption: new SyncBailHook(["context", "entry"])
    });
}
```

为了防止 hooks 属性被修改，这里使用 Object.freeze() 函数来创建对象。简单介绍一下 object.freeze() 函数，它可以冻结一个对象。一个被冻结的对象再也不能被修改了；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。

这里一共创建了 4 种类型的钩子（hook），它们的名称和作用如下：

- **SyncHook（同步钩子）**，当钩子触发时，会依次调用钩子队列中的回调函数；
- **SyncBailHook（同步钩子）**，当钩子触发时，会依次调用钩子队列中的回调函数，如果遇到有返回值的函数则停止继续调用；
- **AsyncSeriesHook（异步串行钩子）**，如果钩子队列中有异步回调函数，则会等其执行完成后再执行剩余的回调函数；
- **AsyncParallelHook（异步并行钩子）**，可以异步执行钩子队列中的所有异步回调函数。

下面一段代码是钩子函数的简单用法。通过 new 关键字创建钩子实例，然后调用 tap() 函数来监听钩子，向 hook 的钩子队列中添加一个回调函数 。 当执行 hook.call() 函数时，会依次调用队列中的回调函数，并将参数传递给这些回调函数 。 需要注意的是， 参数的数量必须与实例化的数组长度一致。在下面的例子中，只能传递 1 个参数。
tapable 模块提供了十多种钩子，这里就不一一详细介绍了，我们只要知道它实现了一些特殊的订阅机制即可，对钩子有兴趣的同学可以参看其 [文档](https://www.npmjs.com/package/tapable)。

```js
const { SyncHook } = require("tapable");
const hook = new SyncHook(["whatever"]);
hook.tap("1", function (arg1) {
	console.log(arg1);
});
hook.call("lagou");
```

接着继续往下看，会发现这样一行代码。

```js
// lib/webpack.js
new NodeEnvironmentPlugin({
	infrastructureLogging: options.infrastructureLogging,
}).apply(compiler);
```

这种调用插件（plugin）的 apply() 函数的写法在 webpack 中很常见，主要作用就是监听 compiler 钩子事件，或者说是向钩子队列中插入一个回调函数，当对应的钩子事件触发时调用。

钩子初始化完成后会调用 3 个钩子事件：

```js
// lib/webpack.js
compiler.hooks.environment.call();
compiler.hooks.afterEnvironment.call();
new WebpackOptionsApply().process(options, compiler);
compiler.hooks.initialize.call();
```

其中，process() 函数会根据不同的执行环境引入一些默认的插件并调用它的 apply() 函数，比如 Node 环境下会引入下面的插件：

```js
// lib/WebpackOptionsApply.js
const NodeTemplatePlugin = require("./node/NodeTemplatePlugin");
const ReadFileCompileWasmPlugin = require("./node/ReadFileCompileWasmPlugin");
const ReadFileCompileAsyncWasmPlugin = require("./node/ReadFileCompileAsyncWasmPlugin");
const NodeTargetPlugin = require("./node/NodeTargetPlugin");
new NodeTemplatePlugin({
	asyncChunkLoading: options.target === "async-node",
}).apply(compiler);
new ReadFileCompileWasmPlugin({
	mangleImports: options.optimization.mangleWasmImports,
}).apply(compiler);
new ReadFileCompileAsyncWasmPlugin().apply(compiler);
new NodeTargetPlugin().apply(compiler);
new LoaderTargetPlugin("node").apply(compiler);
```

至此，编译器已经创建完成。小结一下创建编译器步骤的主要逻辑，首先会将配置参数进行修改，比如加入一些默认配置项；然后创建一个编译器实例 compiler，这个实例的构造函数会初始化一些钩子；最后就是调用插件的 apply() 函数来监听钩子，同时也会主动触发一些钩子事件。

#### 执行编译

调用 compiler.compile() 函数标志着进入编译阶段，该阶段非常依赖钩子， 代码跳跃比较大，理解起来会有一定难度 。下面是 compile() 函数的部分代码：

```js
// lib/Compiler.js
compile(callback) {
  const params = this.newCompilationParams();
  this.hooks.beforeCompile.callAsync(params, err => {
    if (err) return callback(err);
    this.hooks.compile.call(params);
    const compilation = this.newCompilation(params);
    this.hooks.make.callAsync(compilation, err => {
    })
  })
}
```

首先是触发了 compiler.hooks.compile 钩子，触发后，一些插件将进行初始化操作，为编译做好准备，比如 LoaderTargetPlugin 插件将会加载需要的加载器。

调用 newCompilation() 函数则会创建了一个 Compilation 实例。注意，这里的 Compilation 和前面创建的 Compiler 是有区别的：Compiler 是全局唯一的，包含了配置参数、加载器、插件这些信息，它会一直存在 webpack 的生命周期中；而 Compilation 包含了当前模块的信息，只是代表一次编译过程。

在创建 compilation 完成后会触发 compiler.hooks.thisCompilation 钩子和 compiler.hooks.compilation，激活 JavaScriptModulesPlugin 插件的监听函数，从而加载 JavaScript 的解析模块 acorn 。

```js
// lib/Compiler.j s
newCompilation(params) {
  const compilation = this.createCompilation();
  compilation.fileTimestamps = this.fileTimestamps;
  compilation.contextTimestamps = this.contextTimestamps;
  compilation.name = this.name;
  compilation.records = this.records;
  compilation.compilationDependencies = params.compilationDependencies;
  this.hooks.thisCompilation.call(compilation, params);
  this.hooks.compilation.call(compilation, params);
  return compilation;
}
```

在 compiler.compile() 函数中触发 compiler.hooks.make 钩子标志着编译操作正式开始。那么哪些函数监听了 make 钩子呢？通过搜索代码可以发现有 7 个插件监听了它。

![监听了 make 钩子的插件 ](../img/监听了 make 钩子的插件 .png)

监听了 make 钩子的插件

其中 EntryPlugin 插件负责分析入口文件，下面是截取的部分代码：

```js
// lib/EntryPlugin.js
class EntryPlugin {
	apply(compiler) {
		compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
			const { entry, options, context } = this;
			const dep = EntryPlugin.createDependency(entry, options);
			// 开始入口解析
			compilation.addEntry(context, dep, options, (err) => {
				callback(err);
			});
		});
	}
}
```

EntryPlugin 插件中调用了 compilation 对象的 addEntry() 函数，该函数中又调用了 \_addEntryItem() 函数将入口模块添加到模块依赖列表中，部分源码如下：

```js
_addEntryItem(context, entry, target, options, callback) {
  this.addModuleChain(context, entry, (err, module) => {
    if (err) {
      this.hooks.failedEntry.call(entry, options, err);
      return callback(err);
    }
    this.hooks.succeedEntry.call(entry, options, module);
    return callback(null, module);
  });
}
```

在 addModuleChain() 函数中会调用 compilation 的 handleModuleCreation() 函数，该函数代码比较多，其中会调用 compilation 的 buildModule() 函数来构建模块。

模块构建完成过后，通过 acorn 生成模块代码的抽象语法树，根据抽象语法树分析这个模块是否还有依赖的模块，如果有则继续解析每个依赖的模块，直到所有依赖解析完成，最后合并生成输出文件。这个过程和前面几讲提到的编译器执行过程类似，就不再赘述了。

#### webpack 前端构建工具源码原理分析-总结

这一课时从源码层面分析了 webpack 的工作原理，webpack 的执行过程大体上可以分为 3 个步骤，包括：检验配置项、创建编译器、执行编译。

在 检验 配置项时使用了 JSONSchema 来校验配置参数。在创建编译器时，用到了 tapable 模块提供的钩子机制，通过触发适当的钩子事件来让对应的插件进行初始化。

在执行编译阶段，以 compiler.hooks.make 钩子事件为起始点，触发入口文件的解析工作，并调用加载器对资源进行处理，然后构建成抽象语法树，将最终的抽象语法树转换成目标文件并输出到配置项指定的目录。

最后布置一道思考题：尝试一下 tapable 模块的各种钩子事件，分析比较一下它们的使用区别。

答：
