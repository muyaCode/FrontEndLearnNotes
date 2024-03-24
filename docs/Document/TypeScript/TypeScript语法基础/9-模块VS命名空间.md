# 9.模块VS命名空间

namespace-and-module

## 11.1 模块

### 11.1.1 全局模块

- 在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中

- 使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块

foo.ts

```typescript
const foo = 123;
```

bar.ts

```typescript
const bar = foo; // allowed
```

### 11.1.2 文件模块

- 文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域
- 模块是TS中外部模块的简称，侧重于代码和复用
- 模块在期自身的作用域里执行，而不是在全局作用域里
- 一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
- 如果想要使用一个模块里导出的变量，则需要导入

```typescript
export const a = 1;
export const b = 2;
export default 'zhufeng';
import name, { a, b } from './1';
console.log(name, a, b);
```

### 11.1.3 模块规范

- AMD：不要使用它，它仅能在浏览器工作；
- Systemtypescript：这是一个好的实验，已经被 ES 模块替代；
- ES 模块：它并没有准备好。
- 使用 module：commontypescript 选项来替代这些模式，将会是一个好的主意

## 11.2 命名空间

- 在代码量较大的情况下，为了避免命名空间冲突，可以将相似的函数、类、接口放置到命名空间内
- 命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，命名空间内通过`export`向外导出
- 命名空间是内部模块，主要用于组织代码，避免命名冲突

### 11.2.1 内部划分

```typescript
export namespace zoo {
    export class Dog { eat() { console.log('zoo dog'); } }
}
export namespace home {
    export class Dog { eat() { console.log('home dog'); } }
}
let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
let dog_of_home = new home.Dog();
dog_of_home.eat();
import { zoo } from './3';
let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
```

### 11.2.2 原理

- 其实一个命名空间本质上一个对象，它的作用是将一系列相关的全局变量组织到一个对象的属性

```typescript
namespace Numbers {
    export let a = 1;
    export let b = 2;
    export let c = 3;
}
var Numbers;
(function (Numbers) {
    Numbers.a = 1;
    Numbers.b = 2;
    Numbers.c = 3;
})(Numbers || (Numbers = {}));
```

## 11.3 文件，模块与命名空间

### 11.3.1 文件和模块

- 每个 module都不一样 src\table1.ts

  ```typescript
  export module Box{
    export class Book1{}
  }
  ```

src\table2.ts

```typescript
export module Box{
    export class Book1{}
}
```

src\table3.ts

```typescript
export module Box{
    export class Book1{}
}
```

### 11.3.2 空间

- namespace 和 module 不一样，namespace 在全局空间中具有唯一性

src\table1.ts

```typescript
namespace Box{
    export class Book1{}
}
```

src\table2.ts

```typescript
namespace Box{
    export class Book1{}
}
```

src\table3.ts

```typescript
namespace Box{
    export class Book1{}
}
```

### 11.3.3 文件

- 每个文件是独立的

src\table1.ts

```typescript
export class Book1 { }
```

src\table2.ts

```typescript
export class Book1 { }
```

src\table3.ts

```typescript
export class Book1 { }
```
