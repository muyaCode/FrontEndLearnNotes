# JavaScript面试题

一些面试

## function的考题

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>function案例</title>
    </head>
    <body></body>
    <script>
        function Foo() {
            getName = function () {
                console.log(1);
            };
            // 不实例化Foo，直接执行：指向 window
            // 实例化Foo，再执行：
            return this;
        }

        // 给函数Foo添加静态属性方法 =》 函数对象上的方法
        Foo.getName = function () {
            console.log(2);
        };

        // 给构造函数的原型添加方法：下面两种方法执行
        // var foo = new Foo() => foo.getName
        // new Foo().getName
        Foo.prototype.getName = function () {
            console.log(3);
        };

        // 给变量赋值方法
        var getName = function () {
            console.log(4);
        };

        // 定义getName函数方法
        function getName() {
            console.log(5);
        }

        // 打印2 => 直接给函数的静态属性方法
        Foo.getName();
        // 打印4 =》 优先执行function语句式的函数方法getName，再执行变量getName的属性方法，后面执行会覆盖前面执行的所以打印4
        getName();
        // 打印1 =》 值执行Foo()函数，getName变量在Foo()函数内重新被赋值，return的 this 指向 window，所以执行window.getName方法，也就是执行Foo()的getName静态属性方法
        // Foo() -> this -> window -> window.getName -> window.getName变量在Foo()函数内重新被赋值，所以打印1
        Foo().getName(); // 打印1
        // 打印1 =》 上面Foo()的getName静态属性被赋值了新方法，所以跟着打印1
        getName();
        // 打印2 =》 new Foo没有()，所以new无用（不是实例化方法），只是执行Foo.getName属性方法，所以打印2
        new Foo.getName();
        // 打印3 =》 执行的是实例化后的构造函数Foo的prototype原型的实例方法 -> Foo.prototype.getName()
        new Foo().getName();
        // 打印3 =》
        // 先执行第二个new之后相当于：var foo = new Foo();foo.getName() -> Foo.prototype.getName()
        // 再执行第一个new：new的是Foo.prototype.getName()，new Foo.prototype.getName()，无返回值，没有实际作用
        new new Foo().getName();
    </script>
</html>
```

## 相等性判断

文档：[JavaScript 中的相等性判断 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

```js
// JS中相等性的判断
// ES6版本，四种相等判断的算法
// 全等 三等 ===
// 等于 ==
// 零值相等：-0 === +0
// 同值相等：-0 !== +0    NaN === NaN

// JS中提供有关相等判断的操作方法

// 严格相等 === Strict Equality
// 非严格 (抽象/非约束) 相等 == Loose(自由的，不受限制的) Equality
// 0bject.is(v1，v2) ES6新的API，判断两个参数是否是同一个值

// === 严格相等
// 不进行隐式类型转换 - 类型相同/值也相同
// 1 === '1' ? false  1 === 2 ? false
// 引用值必须是同一地址
// var obj = {}    obj === obj ? true  {} === {} ? false
// 两个NaN 或者是NaN跟其他值都不相等
// NaN===·NaN ? false     NaN === undefined ? false
// +0和-0相等
// +0 === -0 ? true
// + Infinity 与 - Infinity  相等
// + Infinity === - Infinity 不相等

// 如何定义变量a不能等于变量a：a !== a;  true  => var a = NaN;  因为NaN !== NaN

// 非严格相等  Abstract equality
// 隐式类型转换 - 等式两边都有可能被转换
// 转换以后还是用严格相等进行比较：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9D%9E%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89

// ToNumber(A) 尝试在比较前将参数 A 转换为数字，这与 +A（单目运算符 +）的效果相同。ToPrimitive(A)通过尝试调用 A 的A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值（Primitive）

// 任何对象都与undefined和null不相等

// ===全等对结果的预测是更加清晰明确的
// 全等在不隐式类型转换的前提下，更快

// falsy值（假的值） 有8个
// false 0，+0/-0，8n，""，''，``，null，undefined，NaN


// 同值相等(same-value)  -0 !== +0 但 NaN === NaN  （正常情况NaN !== NaN）
// 零值相等   same-value-zero -0 === +0

// 同值相等的底层实现 Object.is() -- 同值相等的实现
// Object.is() ES6抛出来的方法
// ES5并没有暴露JS引擎的同值相等的方法
// 同值相等例子：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E7%90%86%E8%A7%A3%E7%9B%B8%E7%AD%89%E6%AF%94%E8%BE%83%E7%9A%84%E6%A8%A1%E5%9E%8B
// const res1 = Object.is(NaN, NaN)
// const res2 = Object.is(null, null)
// const res3 = Object.is(undefined, undefined)
// const res4 = Object.is("1", "1")
// const res5 = Object.is(1, 1)
// const res6 = Object.is(-0, +0)
// console.log(res1)
// console.log(res2)
// console.log(res3)
// console.log(res4)
// console.log(res5)
// console.log(res6)

// 实现同值相等
// Object.myIs = function (a, b) {
//   if(a === b) {
//     // (1 / a === 1 / b) 解析：1 / +0  等于Infinity， 1 / -0 等于 -Infinity，所以+0和-0为false
//     return a !== 0 || 1 / a === 1 / b;
//   }
//   // NaN === NaN的原理
//   return a !== a && b !== b;
// }
```

## 实现JavaScript的深拷贝

### ES5深拷贝函数封装

```js
// ES5实现深拷贝
function deepClone(origin, target) {
	var tar = target || {};
	var toStr = Object.prototype.toString;
	var arrType = "[object Array]"; 

	for (var k in origin) {
		if (origin.has0wnProperty(k)) { // 对象自身属性中是否具有指定的k属性
			if (typeof origin[k] === "object" && origin[k] !== null) {
        // toString方法通过call调用之后 === arrType 就是数组，如果是"[object object]"就是对象
				tar[k] = toStr.call(origin[k]) === arrType ? [] : {};
				deepClone(origin[k], tar[k]);
			} else {
				tar[k] = origin[k];
			}
		}
	}

	return tar;
}
```

---

WeakMap知识铺垫：[WeakMap - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

new WeakMap()实例化后使用set方法，是弱引用，一引用了元素，引用便回断开，元素就会被内存垃圾回收，不占用内存（设置弱引用，在new WeakMap()实例化的内存中存起来，引用后会删掉节点，节省内存）

`Map` 和 `WeakMap` 是两种数据结构，可用于操纵键和值之间的关系。

区别：

我们可以对 `Map` 的键和值使用对象或任何基本类型。

但是，`WeakMap` 仅接受对象。这意味着我们不能将基本类型用作 `WeakMap` 的键。

```js
const attrs = new WeakMap()

attrs.set('color', 'plum') // error
```

与 `Map`不同，`WeakMap` 不支持对键和值进行迭代。无法获取 `WeakMap` 的所有键或值。此外，也没有办法清除 `WeakMap`。

**最重要的区别是，`WeakMap` 不会阻止在没有对键的引用时对键进行垃圾收集。**

另一方面，`Map` 无限期地维护对键和值的引用。一旦创建了键和值，它们将占用内存，即使没有对它们的引用，也不会被垃圾收集。这可能会导致内存泄漏问题。

考虑下面的一个简单代码，我们将一个唯一的 ID 映射到特定的人的信息：

```js
let id = { value: 1 }

const people = new Map()
people.set(id, {
  name: 'Foo',
  age: 20,
  address: 'Bar'
})

// 移除 id
id = null
```

删除键对象 `id` 后，它仍然能够通过映射键访问其引用：

```js
people.keys().next().value // { value: 1 }
```

由于这种差异，`WeakMap`（顾名思义）保存对键的弱引用。它解释了为什么它的键不可枚举，这在前面的区别中已经提到。

由于 `WeakMap` 保存对键的弱引用，且无法枚举，因此无法使用 `keys()`、`values()`、`entries()` 这些方法。

### ES6实现深拷贝

```js
// ES6实现深拷贝
function deepClone(origin, hashMap = new WeakMap()) {
	if (origin == undefined || typeof origin !== 'object') {
    return origin
  }
  // 如果是时间构造函数
  if (origin instanceof Date) {
    return new Date(origin);
  }
  // 如果是正则构造函数
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 判断是否弱引用，两个对象-相互把对方作为键名赋值给对方
  const hashKey = hashMap.get(origin);
  if(hashKey) {
    return hashKey
  }
  // 执行继承来的构造器，实例化构造器得到新的对象，就不用判断
  const target = new origin.constructor();
  // 设置弱引用，引用后会删掉节点，节省内存
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) { // 对象自身属性中是否具有指定的k属性
      target[k] = deepClone(origin[k], hashMap); // 递归再赋值
    }
  }

  return target;
}


```
