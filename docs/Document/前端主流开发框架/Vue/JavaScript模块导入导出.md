# JavaScript模块导入导出

## 一、前言

导出模块就是让 .js 文件中的某些值对外可见，导入模块就是将那些对外可见的值导入到当前 .js 文件中。

模块导入与导出分别使用关键字`import `、`export`

## 二、exports 导出方式

存在两种 exports 导出方式：① 命名导出（每个模块包含任意数量）② 默认导出（每个模块包含一个）

### 1、默认导出（每个模块包含一个）

默认导出关键字为：default

```javascript
// 导出变量
export default name; 

// 导出对象
export default {name: '憨瓜',age: 3}; 

// 导出函数
export default function (…) { … } 
export default function name1(…) { … } 
export { name1 as default, … };
```

### 2、 命名导出

```javascript
// 导出单个特性
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 解构导出并重命名
export const { name1, name2: bar } = o;
```

### 注意点

在每一个模块中可以定义多个命名导出，但是只允许有一个默认导出。每种方式对应于上述的一种语法：

## 三、import 导入方式

### 1、导入默认值

引入模块可能有一个 default export（无论它是对象，函数，类等）可用。然后可以使用 import 语句来导入这样的默认接口。

```javascript
import myDefault from '@/idnex.js';
```

### 2、单独导入

```javascript
// 导入单个接口
import {getInfo} from '@/index.js';

// 导入多个接口
import {getInfo, removeInfo} from '@/index.js';

// 导入带有别名的接口
import {reallyReallyLongModuleExportName as shortName} from '@/index.js';

// 导入时重命名多个接口
import {reallyReallyLongModuleMemberName as shortName,anotherLongModuleName as short} from '@/index.js';
```

### 3、整体导入

`import * as name` 语法导入所有导出接口，即导入模块整体
参数
name 参数是“导入模块对象”的名称，它将用一种名称空间来引用导入模块的接口。export 参数指定单个的命名导出

```javascript
import * as myModule from '@/index.js';
```

### 4、仅为副作用而导入一个模块

整个模块仅为副作用而导入，这将运行模块中的全局代码，但实际上不导入任何值。

```javascript
import '@/index.js';
```
