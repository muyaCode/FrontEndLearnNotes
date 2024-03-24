# 为什么JavaScript不适合大型项目（typescript的兴起）

随着前端快速发展，JavaScript 语言的设计缺陷在大型项目中逐渐显露。

复用代码的模块问题就是其中之一，但庆幸的是，ES6 模块在原生层面解决了这个问题，不同环境下的兼容性问题也可以由工具转化代码来解决。

这一课时要提到的类型问题，是一个需要依赖第三方规范和工具来解决的缺陷。JavaScript 的类型问题具体表现在下面 3 个方面。

**类型声明**：

前面在第 08 课时中已经提过命名的提升特性，如果某个变量命名提升到全局，那么将是危险的。比如下面的代码，函数 fn 内部使用了一个变量 c，由于忘记使用关键字来声明，结果导致覆盖了全局变量 c。

```js
var c = 0
...
function fn() {
  ...
  c = 30;
}
fn();
```

**动态类型**：

动态类型是指在运行期间才做数据类型检查的语言，即动态类型语言编程时，不用给任何变量指定数据类型。

下面是一个简单的例子，定义了一个函数  printId 来返回某个对象的 id 属性。如果我们在调用函数 printId 时要想了解参数 user 的数据结构和返回值类型，只能通过查看源码，或者运行时调试、打印来获取。当函数结构复杂，参数较多时这个过程就会大大降低代码的可维护性。虽然添加注释能在一定程度上缓解问题，但为函数编写注释并不是强制性约束，能否及时同步注释也可能会成为新的问题。

就函数 printId 本身而言，也无法在编译时校验参数的合法性，只能在运行时添加校验逻辑，这也大大增加了程序出现 bug 的概率。

```js
function printId(user) {
  return user.id
}
```

**弱类型**：

弱类型是指一个变量可以被赋予不同数据类型的值。这也是一个既灵活又可怕的特性，编写代码的时候非常方便，不用考虑变量的数据类型，但这也很容易出现 bug，调试起来会变得相当困难。

```js
var tmp = []
...
tmp = null
...
// tmp 到底会变成什么？
```

为了解决上面 3 个问题，开源社区提供了解决方案——TypeScript。它是基于 JavaScript 的语法糖，也就是说 TypeScript 代码没有单独的运行环境，需要编译成 JavaScript 代码之后才能运行。

从它的名字不难看出，它的核心特性是类型“Type”。具体工作原理就是在代码编译阶段进行类型检测，这样就能在代码部署运行之前及时发现问题。

#### 类型与接口

TypeScript 让 JavaScript 变成了**静态强类型**、**变量**需要严格声明的语言，为此定义了两个重要概念：**类型（type）和接口（interface）**。

TypeScript 在 JavaScript 原生类型的基础上进行了扩展，但为了和基础类型对象进行区分，采用了小写的形式，比如 Number 类型对应的是 number。类型之间可以互相组合形成新的类型。

一些数据类型在前面第 07 课时中已经提过，这里不再赘述。下面补充一下 TypeScript 扩展的类型。

##### 元组

元组可以看成是具有固定长度的数组，其中数组元素类型可以不同。比如下面的代码声明了一个元组变量 x，x 的第一个元素是字符串，第二个是数字；又比如 react hooks 就是用到了元组类型。

```js
let x: [string, number];
```

##### 枚举

枚举指的是带有名字的常量，可以分为数字枚举、字符串枚举和异构枚举（字符串和数字的混合）3 种。比较适用于前后端通用的枚举值，比如通过 AJAX 请求获取的数据状态，对于仅在前端使用的枚举值还是推荐使 Symbol。

下面是一个异构枚举的例子，定义了数字枚举值 0 和字符串枚举值 "YES"。

```js
enum example {
 No = 0,
 Yes = "YES",
}
```

也可以使用 const 修饰符来定义枚举值，通过这种定义方式，TypeScript 会在编译的时候，直接把枚举引用替换成对应的枚举值而非创建枚举对象。

```js
enum example {
    No = 0,
    Yes = "YES",
}
console.log(example.No)
// 编译成
var example;
(function (example) {
    example[example["No"] = 0] = "No";
    example["Yes"] = "YES";
})(example || (example = {}));
console.log(example.No);
////////////
const enum example {
    No = 0,
    Yes = "YES",
}
console.log(example.No)
//  编译成
console.log(0 /* No */);
```

##### any

any 类型代表可以是任何一种类型，所以会跳过类型检查，相当于让变量或返回值又变成弱类型。因此建议尽量减少 any 类型的使用。

##### void

void 表示没有任何类型，常用于描述无返回值的函数。

##### never

never 类型表示的是那些永不存在的值的类型，对于一些特殊的校验场景比较有用，比如代码的完整性检查。下面的示例代码通过穷举判断变量 u 的值来执行对应逻辑，如果此时变量 u 的可选值新增了字符串 "c"，那么这段代码并不会给出提示告诉开发者还有一种  u 等于字符串 "c" 的场景，但如果增加 never 类型赋值的话在编译时就可以给出提示。

```typescript
let u: 'a'|'b'
//...
if(u === 'a') {
  //...
} else if (u === 'b') {
  //...
}
```

增加了 never 类型变量赋值：

```typescript
let u: 'a'|'b'|'c'
//...
if(u === 'a') {
  //...
} else if (u === 'b') {
  //...
} else {
  let trmp: never = u // Type '"c"' is not assignable to type 'never'.
}
```

接口的作用和类型非常相似，在大多数情况下可以通用，只存在一些细小的区别（比如同名接口可以自动合并，而类型不能；在编译器中将鼠标悬停在接口上显示的是接口名称，悬停在类型上显示的是字面量类型），最明显的区别还是在写法上。

```typescript
/* 声明 */
interface IA {
  id: string
}
type TA = {
  id: string
}
/* 继承 */
interface IA2 extends IA {
    name: string
}
type TA2 = TA & { name: string }
/* 实现 */
class A implements IA {
    id: string = ''
}
class A2 implements TA {
    id: string = ''
}
```

#### 类型抽象

泛型是对类型的一种抽象，一般用于函数，能让调用者动态地指定部分数据类型。这一点和 any 类型有些像，对于类型的定义具有不确定性，可以指代多种类型，但最大区别在于泛型可以对函数成员或类成员产生约束关系。
下面代码是 react 的钩子函数 useState 的类型定义，就用到了泛型。

```typescript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

这段代码中 S 称为**泛型变量**。从这个定义可看出，useState 可以接收任何类型的参数或回调函数，但返回的元组数据第一个值必定和参数类型或者回调函数返回值类型相同，都为 S。

如果使用 any 类型来取代泛型，那么我们只能知道允许传入任何参数或回调函数，而无法知道返回值与入参的对应关系。

在使用泛型的时候，我们可以通过尖括号来手动指定泛型变量的类型，这个指定操作称之为**类型断言，**也可以不指定，让 TypeScript 自行推断类型。比如下面的代码就通过类型断言，将范型变量指定为 string 类型。

```typescript
const [id, setId] = useState<string>('');
```

#### 类型组合

类型组合就是把现有的多种类型叠加到一起，组合成一种新的类型，具体有两种方式。

##### 交叉

交叉就是将多个类型合并为一个类型，操作符为 “&” 。下面的代码定义了一个 Admin 类型，它同时是类型 Student 和类型 Teacher 的交叉类型。 就是说 Admin 类型的对象同时拥有了这 2 种类型的成员。

```typescript
type Admin = Student & Teacher
```

##### 联合

联合就是表示符合多种类型中的任意一个，不同类型通过操作符“|”连接。下面代码定义的类型是 AorB，表示该类型值可以是类型 A，也可以是类型 B。

```typescript
type A = {
  a: string
}
type B = {
  b: number
}
type AorB = A | B
```

对于联合类型 AorB，我们能够确定的是它包含了 A 和 B 中共有的成员。如果我们想确切地了解值是否为类型 A，只能通过检查值的方法是否存在来进行判断。例如，下面的变量 v 属于 AorB 类型，在需要确认其具体类型时，先将变量 v 的类型断言为 A，然后再调用其属性 a 进行判断。

```typescript
let v: AorB
// ...
if ((<A>v).a) {
  //...
} else {
  (<B>v).b
  //...
}
```

#### 类型引用

##### 索引

索引类型的目的是让 TypeScript 编译器检查出使用了动态属性名的类型，需要通过索引类型查询和索引类型访问来实现。
下面的示例代码实现了一个简单的函数 getValue ，传入对象和对象属性名获取对应的值。

```typescript
function getValue<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
let com = {
    name: 'lagou',
    id: 123
}
let id: number = getValue(com, 'id')
let no = getValue(com, 'no') //报错：Argument of type '"no"' is not assignable to parameter of type '"id" | "name"'.
```

其中，泛型变量 K 继承了泛型变量 T 的属性名联合，这里的 keyof 就是索引类型查询操作符；返回值 T[K] 就是索引访问操作符的使用方式。

前面提到的 Pick 类型就是通过索引类型来实现的。

##### 映射

映射类型是指从已有类型中创建新的类型。TypeScript 预定义了一些类型，比如最常用的 Pick 和 Omit。

下面是 Pick 类型的使用示例及源码，可以看到类型 Pick 从类型 task 中选择属性 "title" 和 "description" 生成了新的类型 simpleTask。

```typescript
type Pick<T, K extends keyof T> = {

[P in K]: TP;

};
interface task {
  title: string;
  description: string;
  status: string;
}
type simpleTask = Pick<task, 'title' | 'description'>// {title: string;description: string}
```

类型 Pick 的实现，先用到了索引类型查询，获取了类型 T 的属性名联合 K，然后通过操作符 in 对其进行遍历，同时又用到了索引类型访问来表示属性值。

由于篇幅所限，更多的预定义类型这里就不一一讲解了，对实现原理感兴趣的同学可以参看其[源码](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)。

#### 实践：编写类型声明

结合上面所说的内容，再通过一个例子来加深理解。我们以第 03 课时的代码 2 的 debounce 函数为例，为这段代码添加类型声明，转换成 TeypScript 语法。

需要添加类型声明的地方通常是变量和函数。

首先给函数 debounce 添加类型，包括参数类型和返回值类型。参数类型使用泛型变量，在调用函数 debounce 的时候手动指定，泛型变量有 3 个：函数 T 、函数 T 的返回值 U 和 函数 T 的参数 V。

然后是变量 timeout ，当定时器存在时它的值为 number，定时器不存在时值为 null。

最后按照之前定义的泛型变量给函数 debounced 和函数 flush 添加类型声明。

具体代码如下：

```typescript
const debounce = <T extends Function, U, V extends any[]>(func: T, wait: number = 0) => {
  let timeout: number | null = null
  let args: V
  function debounced(...arg: V): Promise<U> {
    args = arg
    if(timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    // 以 Promise 的形式返回函数执行结果
    return new Promise((res, rej) => {
      timeout = setTimeout(async () => {
        try {
          const result: U = await func.apply(this, args)
          res(result)
        } catch(e) {
          rej(e)
        }
      }, wait)
    })
  }
  // 允许取消
  function cancel() {
    clearTimeout(timeout)
    timeout = null
  }
  // 允许立即执行
  function flush(): U {
    cancel()
    return func.apply(this, args)
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
```

#### JavaScript类型总结

这一课时重点讲述了如何通过 TypeScript 来解决 JavaScript 的类型问题，TypeScript 在原有的基础类型上进行了扩展，理解 TypeScript 的基本类型并不难，重点需要掌握如何通过泛型来对类型进行抽象，如何通过组合及引用来对已有的类型创建新的类型。

最后布置一道思考题：TypeScript 能较好地解决编译时类型校验的问题，但无法对运行时的数据（比如通过 AJAX 请求获得的数据）进行校验，你能想到有什么好的方法解决这个问题吗？

答：可以利用泛型化请求响应类型来解决