# JavaScript 正则表达式

练习正则的网站：[编程胶囊-打造学习编程的最好系统 (codejiaonang.com)](https://codejiaonang.com/#/course/regex_chapter1/0/0)

编程胶囊是一个在线学习正则表达式的平台，通过丰富的案例手把手教你正则匹配规则，由浅入深，循序渐进。非常适合新手入门，两小时就能让你学会 JS 正则表达式，没开玩笑！跟着课程走就能在两小时内完全掌握，我当时也就花了两三个小时，有经验的可能也就个把小时。



正则表达式可视化网站：https://regex-vis.com/

正则表达式可视化开源地址：https://github.com/Bowen7/regex-vis

正则可视化网站：[Regulex：JavaScript Regular Expression Visualizer (jex.im)](https://jex.im/regulex/#!flags=&re=^(a|b)*%3F%24)

一个 JavaScript 正则表达式可视化工具，由纯 JavaScript 实现，源码托管在 Github 上。它可以帮助开发者更直观地理解和分析正则表达式，通过图形化的方式展示正则表达式的匹配过程和结构。

[两小时学会 JS 正则表达式，终身不忘 - 掘金 (juejin.cn)](https://juejin.cn/post/7150945473765834760)

—————

验证自己的正则是否正确：[RegExr: 学习、构建 和 测试 正则表达式 Test RegEx (regexr-cn.com)](https://regexr-cn.com/)

如果你想验证自己的正则是否正确时就可以打开这个网站，他允许你编写正则表达式并进行用例测试。

## 正则表达式文档

- **MDN 文档**：

  - [正则表达式 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

  - [RegExp(正则表达式) - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

- 菜鸟教程：[JavaScript 正则表达式 | 菜鸟教程 (runoob.com)](https://www.runoob.com/js/js-regexp.html)

- w3school 文档：[JavaScript 正则表达式 (w3school.com.cn)](https://www.w3school.com.cn/js/js_regexp.asp)

- 新的 JavaScript 正则特性：[正则的扩展 - ECMAScript 6 入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/regex)

  - ECMAScript 2018 内新增正则扩展

## 正则表达式简介

### 什么是正则表达式

正则表达式：用于匹配规律规则的表达式，正则表达式最初是科学家对人类神经系统的工作原理的早期研究，现在在编程语言中有广泛的应用。

正则表通常被用来检索、替换那些符合某个模式(规则)的文本。
正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。

### 正则表达式的作用

1. 给定的字符串是否符合正则表达式的过滤逻辑(匹配)
2. 可以通过正则表达式，从字符串中获取我们想要的特定部分(提取)
3. 强大的字符串替换能力(替换)

### 正则表达式的特点

1. 灵活性、逻辑性和功能性非常的强
2. 可以迅速地用极简单的方式达到字符串的复杂控制
3. 对于刚接触的人来说，比较晦涩难懂

## 正则表达式的测试

- 在线正则工具：[在线测试正则](https://c.runoob.com/front-end/854)
- 工具中使用正则表达式
  - sublime/vscode/word
  - 演示替换所有的数字

## 正则表达式的组成 ✨

- 普通字符
- 特殊字符(元字符)：正则表达式中有特殊意义的字符

示例演示：

- `\d` 匹配数字
- `ab\d` 匹配 ab1、ab2

### 元字符串

元字符就是拥有特动功能的特殊字符，大部分需要加反斜杠进行标识，以便于普通字符进行区别，而少数元字符，需要加反斜杠，以便转译为普通字符使用。

JavaScript 正则表达式支持的元字符如表所示。

#### 元字符

带`标注`表示的**常用元字符串**

预定义类：某些常见模式的简写方式

| 元字符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| `.`    | 匹配单个字符，除了换行和行结束符                             |
| `\w`   | 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]             |
| `\W`   | 匹配除所有字母、数字和下划线以外的字符，相当于 [^A-Za-z0-9_] |
| `\d`   | 匹配 0-9 之间的任一数字，相当于[0-9]                         |
| `\D`   | 匹配所有 0-9 以外的字符，相当于 [^0-9]                       |
| `\s`   | 匹配空格 (包括换行符、制表符、空格符等)，相等于[\t\r\n\v\f]  |
| `\S`   | 匹配非空格的字符，相当于 [^ \t\r\n\v\f]                      |
| `^`    | 表示匹配行首的文本(以谁开始)                                 |
| `$`    | 表示匹配行尾的文本(以谁结束)                                 |
| \b     | 匹配单词边界                                                 |
| \B     | 匹配非单词边界                                               |
| \0     | 匹配 NUL 字符                                                |
| \n     | 匹配换行符                                                   |
| \f     | 匹配换页符                                                   |
| \r     | 匹配回车符                                                   |
| \t     | 匹配制表符                                                   |
| \v     | 匹配垂直制表符                                               |
| \xxx   | 匹配以八进制数  xxxx  规定的字符                             |
| \xdd   | 匹配以十六进制数  dd  规定的字符                             |
| \uxxxx | 匹配以十六进制  xxxx 规定的 Unicode  字符                    |

### (重复)限定符

| 限定符  | 说明              |
| ------- | ----------------- |
| \*      | 重复零次或更多次  |
| +       | 重复一次或更多次  |
| ?       | 重复零次或一次    |
| `{n}`   | 重复 n 次         |
| `{n,}`  | 重复 n 次或更多次 |
| `{n,m}` | 重复 n 到 m 次    |

### 其它

```bash
[] 字符串用中括号括起来，表示匹配其中的任一字符，相当于或的意思
[^]  匹配除中括号以内的内容
\ 转义符
| 或者，选择两者中的一个。注意|将左右两边分为两部分，而不管左右两边有多长多乱
() 从两个直接量中选择一个，分组
   eg：gr(a|e)y匹配gray和grey
[\u4e00-\u9fa5]  匹配汉字
```

## 正则案例

验证手机号：

```javascript
^\d{11}$
```

验证邮编：

```javascript
^\d{6}$
```

验证日期 2022-5-01

```javascript
^\d{4}-\d{1,2}-\d{1,2}$
```

验证邮箱 [xxx@itcast.cn](mailto:xxx@itcast.cn)：

```javascript
^\w+@\w+\.\w+$
```

验证 IP 地址 192.168.1.10

```javascript
^\d{1,3}\(.\d{1,3}){3}$
```

## JavaScript 中使用正则表达式

### 1、创建正则表达式对象

#### 1.通过调用 RegExp 对象的构造函数创建

```javascript
var reg = new Regex("d", "i");
var reg = new Regex("d", "gi");
```

#### 2.通过字面量创建

```javascript
var reg = /\d/i;
var reg = /\d/gi;
```

#### 正则对象的参数说明 💫

| 标志 | 说明                |
| ---- | ------------------- |
| i    | 忽略大小写          |
| g    | 全局匹配            |
| gi   | 全局匹配+忽略大小写 |

---

### 2、JavaScript 正则表达式的方法 🌟

**MDN 的正则方法文档**：[RegExp.prototype 方法() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match)

#### 1.字符串的三种方法

##### search()  方法-返回匹配字符串的起始位置或者索引

用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回子串的起始位置。

- 方法返回第一个匹配项在整个字符串中的位置（索引），如果没有匹配项，则返回  -1。

- 匹配的实例：

- ```js
  const strText = "hello china，i love china";
  const regex = /china/;
  console.log(strText.search(regex)); // 6
  ```

- 没有匹配的实例：

- ```js
  const strText = "hello china，i love china";
  const regex = /devpoint/;
  console.log(strText.search(regex)); // -1
  ```

##### replace()  方法-替换匹配到的字符串

用于在字符串中用一些字符串替换另一些字符串，或替换一个与正则表达式匹配的子串。

- 方法接受两个参数：

  - 1.要搜索的值

  - 2.要替换的新值

- 方法返回一个包含被替换后的新字符串，需要注意的是，它不会改变原始字符串，并且只会替换搜索到的第一个值。

- 实例代码：

- ```js
  const strText = "hello world,i love world";
  const regex = /world/;
  // hello china,i love world
  console.log(strText.replace(regex, "china"));
  ```

##### replaceAll() 方法-替换所有匹配到的值

类似于方法 **replace()** ，但它允许替换字符串中所有匹配的值或正则表达式

- 接受两个参数：

  - 1.要搜索的值，如果是正则，则必须带上全局标记  g

  - 2.要替换的新值

- 它返回一个包含所有新值的新字符串，同样也不会更改原始字符串

- 实例代码：

  ```js
  const strText = "hello world,i love world";
  const regex = /world/g;
  console.log(strText.replaceAll(regex, "china")); // hello china,i love china
  ```

  等效于如下代码：

  ```js
  const strText = "hello world,i love world";
  console.log(strText.replaceAll("world", "china")); // hello china,i love china
  ```

  > 通过正则查找替换，在正则表达式中加上全局标记 g , 同样可以替换所有符合正则条件的字符串，如下代码：

  ```js
  const strText = "hello world,i love world";
  const regex = /world/g;
  console.log(strText.replace(regex, "china")); // hello china,i love china
  ```

#### 2.RegExp 对象的方法

> 在 JavaScript 中，RegExp 对象是一个预定义了属性和方法的正则表达式对象。

##### test() 方法-测试是否匹配，返回布尔值

文档：[RegExp.prototype.test() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

> test() 方法：用于测试指定字符串和正则表达式之间是否匹配，接受一个字符串作为其参数，并根据是否匹配返回 true 或 false 。

假设在下面的字符串 strText 中检测单词 china 是否存在。可以为查找单词创建一个正则表达式并测试该正则表达式和字符串 strText 之间是否匹配。

```js
const strText = "hello china";
const regex = /china/;
console.log(regex.test(strText)); // true
```

下面是没有匹配的实例代码：

```js
const strText = "hello China";
const regex = /china/;
console.log(regex.test(strText)); // false
```

从上面代码可以看到，大小写是会影响匹配的结果，如果需要忽略大小写，则需要使用标记 i，如下代码：

```js
const strText = "hello China";
const regex = /china/i;
console.log(regex.test(strText)); // true
```

> 请注意，在语法上  .match()  与  .test()  在使用上是 “相反” 的

##### exec() 方法-生成新数组，检索出正则的匹配结果

文档：[RegExp.prototype.exec() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#%E8%AF%AD%E6%B3%95)

> exec() 方法用于检索字符串中的正则表达式的匹配。
>
> 该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

###### 语法

```js
const regex1 = RegExp("foo*", "g");
const str = "table football, foosball";

let array1 = regex1.exec(str);
```

###### 参数

`str`：要匹配正则表达式的字符串

###### 返回值

如果匹配失败，`exec()`  方法返回  [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)，并将正则表达式的  [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)  重置为 0。

如果匹配成功，`exec()`  方法返回一个数组，并更新正则表达式对象的  [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)  属性。

完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应一个匹配的捕获组。数组还具有以下额外的属性：

`index`：

匹配到的字符位于原始字符串的基于 0 的索引值。

`input`：

匹配的原始字符串。

`groups`：

一个命名捕获组对象，其键是名称，值是捕获组。若没有定义命名捕获组，则  `groups`  的值为  [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。参阅[捕获组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)以了解更多信息。

`indices`  可选

此属性仅在设置了  [`d`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices)  标志位时存在。它是一个数组，其中每一个元素表示一个子字符串的边界。每个子字符串匹配本身就是一个数组，其中第一个元素表示起始索引，第二个元素表示结束索引。

##### match() 方法-提取匹配项

文档：[RegExp.prototype[@@match]() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match)

> match()  与字符串一起使用以检查字符串和正则表达式 regex 之间的匹配，用来提取匹配项，以正则表达式为参数

**语法**：

```js
str.match(regex);
```

方法返回 3 个可能的值：

- 如果正则表达式包含一个 g 标记，即为全局匹配，它将返回一个包含所有匹配项的数组，没捕获组信息；

- 如果正则表达式没有 g 标记，它将返回一个包含第一个匹配项和其相关的捕获组的数组；

- 如果根本没有匹配项，则返回 null 。

> groups：一个命名捕获组的对象，其键是名称，值为捕获组，如果未定义命名捕获组，则为 undefined。

带有标记 g 的实例代码：

```js
const strText = "Hello China";
const regex = /[A-Z]/g; // 大写字母正则表达式
console.log(strText.match(regex)); // [ 'H', 'C' ]
```

没有标记 g 的实例代码：

```js
const text = "Hello World";
const regex = /[A-Z]/; //Capital letters regex.
console.log(text.match(regex)); // [ 'H', index: 0, input: 'Hello China', groups: undefined ]
```

当没有匹配的实例代码：

```js
const strText = "hello china";
const regex = /[A-Z]/; // 大写字母正则表达式
console.log(strText.match(regex)); // null
```

---

### 正则匹配

```javascript
// 匹配日期
var dateStr = "2015-10-10";
var reg = /^\d{4}-\d{1,2}-\d{1,2}$/;
console.log(reg.test(dateStr));
```

### 匹配正则表达式

#### 描述字符范围

在正则表达式语法中，放括号表示字符范围。在方括号中可以包含多个字符，表示匹配其中任意一个字符。如果多个字符的编码顺序是连续的，可以仅指定开头和结尾字符，省略中间字符，仅使用连字符`~`表示。如果在方括号内添加脱字符`^`前缀，还可以表示范围之外的字符。例如：

- [abc]：查找方括号内任意一个字符。
- [^abc]：查找不在方括号内的字符。
- [0-9]：查找从 0  至 9  范围内的数字，即查找数字。
- [a-z]：查找从小写  a  到小写  z  范围内的字符，即查找小写字母。
- [A-Z]：查找从大写  A  到大写  Z  范围内的字符，即查找大写字母。
- [A-z]：查找从大写  A  到小写  z  范围内的字符，即所有大小写的字母。

匹配任意 ASCII  字符：

```js
var r = /[\u0000-\u00ff]/g;
```

匹配任意双字节的汉字：

```js
var r = /[^\u0000-\u00ff]/g;
```

匹配任意大小写字母和数字：

```js
var r = /[a-zA-Z0-9]/g;
```

使用 Unicode  编码设计，匹配数字：

```js
var r = /[\u0030-\u0039]/g;
```

匹配任意大写字母：

```js
var r = /[\u0041-\u004A]/g;
```

匹配任意小写字母：

```js
var r = /[\u0061-\u007A]/g;
```

在字符范围内可以混用各种字符模式：

```js
var s = "abcdez"; //字符串直接量
var r = /[abce-z]/g; //字符a、b、c，以及从e~z之间的任意字符
var a = s.match(r); //返回数组["a","b","c","e","z"]
```

在中括号内不要有空格，否则会误解为还要匹配空格:

```js
var r = /[0-9]/g;
```

字符范围可以组合使用，以便设计更灵活的匹配模式：

```js
// 字符串直接量
var s = "abc4 abd6 abe3 abf1 abg7";
// 前两个字符为ab，第三个字符为从c到g，第四个字符为1~7的任意数字
var r = /ab[c-g][1-7]/g;
// 返回数组["abc4","abd6","abe3","abf1","abg7"]
var a = s.match(r);
```

使用反义字符范围可以匹配很多无法直接描述的字符，达到以少应多的目的：

```js
var r = /[^0123456789]/g;
```

---

示例 1：

```js
console.log(/./.test("除了回车换行以为的任意字符")); //true
console.log(/.*/.test("0个到多个")); //true
console.log(/.+/.test("1个到多个")); //true
console.log(/.?/.test("哈哈")); //true
console.log(/[0-9]/.test("9527")); //true
console.log(/[a-z]/.test("what")); //true
console.log(/[A-Z]/.test("Are")); //true
console.log(/[a-zA-Z]/.test("干啥子")); //false
console.log(/[0-9a-zA-Z]/.test("9ebg")); //true
console.log(/b|(ara)/.test("abra")); //true
console.log(/[a-z]{2,3}/.test("arfsf")); //true
```

示例 2：

```js
console.log(/\d/.test("998")); //true
console.log(/\d*/.test("998")); //true
console.log(/\d+/.test("998")); //true
console.log(/\d{0,}/.test("998")); //true
console.log(/\d{2,3}/.test("998")); //true
console.log(/\D/.test("eat")); //true
console.log(/\s/.test("  ")); //true
console.log(/\S/.test("嘎嘎")); //true
console.log(/\w/.test("_")); //true
console.log(/\W/.test("_")); //true
```

---

### 选择匹配

选择匹配类似于 JavaScript  的逻辑与运算，使用竖线`|`描述，表示在两个子模式的匹配结果中任选一个。例如：

1)  匹配任意数字或字母

```js
var r = /\w+|\d+/;
```

2)  可以定义多重选择模式。设计方法：在多个子模式之间加入选择操作符。

```js
var r = /(abc)|(efg)|(123)|(456)/;
```

> 为了避免歧义，应该为选择操作的多个子模式加上小括号

#### 示例

设计对提交的表单字符串进行敏感词过滤。先设计一个敏感词列表，然后使用竖线把它们连接在一起，定义选择匹配模式，最后使用字符串的  replace()  方法把所有敏感字符替换为可以显示的编码格式。代码如下：

```js
var s = '<meta charset="utf-8">'; //待过滤的表单提交信息
var r = /\'|\"|\<|\>/gi; //过滤敏感字符的正则表达式
function f() {
	//替换函数
	////把敏感字符替换为对应的网页显示的编码格式
	return "&#" + arguments[0].charCodeAt(0) + ";";
}
var a = s.replace(r, f); //执行过滤替换
document.write(a); //在网页中显示正常的字符信息
console.log(a);
```

---

### 重复(限定)符匹配

使用的是限定符进行匹配

重复类量词列表跟上面限定符表格一样的

| 量词     | 描述                                                |
| -------- | --------------------------------------------------- |
| `n+`     | 匹配任何包含至少一个  n  的字符串                   |
| `n*`     | 匹配任何包含零个或多个  n  的字符串                 |
| `n?`     | 匹配任何包含零个或一个  n  的字符串                 |
| `n{x}`   | 匹配包含  x  个  n  的序列的字符串                  |
| `n{x,y}` | 匹配包含最少  x  个、最多  y  个  n  的序列的字符串 |
| `n{x,}`  | 匹配包含至少  x  个  n  的序列的字符串              |

#### 重复(限定)符匹配示例

下面结合示例进行演示说明，先设计一个字符串：

```js
var s =
	"ggle gogle google gooogle goooogle gooooogle goooooogle gooooooogle goooooooogle";
```

1)  如果仅匹配单词  ggle  和  gogle，可以设计：

```js
var r = /go?gle/g;
var a = s.match(r);
```

量词`?`表示前面字符或子表达式为可有可无，等效于：

```js
var r = /go{0,1}gle/g;
var a = s.match(r);
```

2)  如果匹配第 4  个单词  gooogle，可以设计：

```js
var r = /go{3}gle/g;
var a = s.match(r);
```

等效于：

```js
var r = /gooogle/g;
var a = s.match(r);
```

3)  如果匹配第 4  个到第 6  个之间的单词，可以设计：

```js
var r = /go{3,5}gle/g;
var a = s.match(r);
```

4)  如果匹配所有单词，可以设计：

```js
var r = /go*gle/g;
var a = s.match(r);
```

量词`*`表示前面字符或表达式可以不出现，或者重复出现任意多次。等效于：

```js
var r = /go(0,)gle/g;
var a = s.match(r);
```

5)  如果匹配包含字符“o”的所有词，可以设计：

```js
var r = /go+gle/g;
var a = s.match(r);
```

量词`+`表示前面字符或子表达式至少出现 1  次，最多重复次数不限。等效于：

```js
var r = /go{1,}gle/g;
var a = s.match(r);
```

重复类量词总是出现在它们所作用的字符或子表达式后面。如果想作用于多个字符，需要使用小括号把它们包裹在一起形成一个子表达式

---

### 惰性匹配

重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符。

- ?、{n} 和 {n,m}  重复类具有弱贪婪性，表现为贪婪的有限性。
- \*、+  和 {n,}  重复类具有强贪婪性，表现为贪婪的无限性。

#### 惰性匹配示例

越是排在左侧的重复类量词匹配优先级越高。下面示例显示当多个重复类量词同时满足条件时，会在保证右侧重复类量词最低匹配次数基础上，使最左侧的重复类量词尽可能占有所有字符。

```js
var s = "<html><head><title></title></head><body></body></html>";
var r = /(<.*>)(<.*>)/
var a = s.match(r);
//左侧表达式匹配"<html><head><title></title></head><body></body></html>"
console.log(a[1])；
console.log(a[2]);  //右侧表达式匹配“</html>”
```

与贪婪匹配相反，惰性匹配将遵循另一种算法：在满足条件的前提下，尽可能少的匹配字符。定义惰性匹配的方法：在重复类量词后面添加问号?限制词。贪婪匹配体现了最大化匹配原则，惰性匹配则体现最小化匹配原则。

#### 示例 2

下面示例演示了如何定义匹配模式

```js
var s = "<html><head><title></title></head><body></body></html>";
var r = /<.*?>/;
var a = s.match(r); //返回单个元素数组["<html>"]
```

在上面示例中，对于正则表达式 /<.\*?>/  来说，它可以返回匹配字符串 "<>"，但是为了能够确保匹配条件成立，在执行中还是匹配了带有 4  个字符的字符串“html”。惰性取值不能够以违反模式限定的条件而返回，除非没有找到符合条件的字符串，否则必须满足它。

针对 6  种重复类惰性匹配的简单描述如下：

- {n,m}?：尽量匹配  n  次，但是为了满足限定条件也可能最多重复  m  次。
- {n}?：尽量匹配  n  次。
- {n,}?：尽量匹配  n  次，但是为了满足限定条件也可能匹配任意次。
- ??：尽量匹配，但是为了满足限定条件也可能最多匹配 1  次，相当于 {0,1}?。
- +?：尽量匹配 1  次，但是为了满足限定条件也可能匹配任意次，相当于 {1,}?。
- \*? ：尽量不匹配，但是为了满足限定条件也可能匹配任意次，相当于 {0,}?。

---

## 边界量词

边界就是确定匹配模式的位置，如字符串的头部或尾部，具体说明如表所示。

JavaScript 正则表达式支持的边界量词

| 量词 | 说明                                     |
| ---- | ---------------------------------------- |
| ^    | 匹配开头，在多行检测中，会匹配一行的开头 |
| $    | 匹配结尾，在多行检测中，会匹配一行的结尾 |

下面代码演示如何使用边界量词。先定义字符串：

```js
var s = "how are you";
```

1)  匹配最后一个单词

```js
var r = /\w+$/;
var a = s.match(r); //返回数组["you"]
```

2)  匹配第一个单词

```js
var r = /^\w+/;
var a = s.match(r); //返回数组["how"]
```

3)  匹配每一个单词

```js
var r = /\w+/g;
var a = s.match(r); //返回数组["how","are","you"]
```

---

## 声明词量

声明表示条件的意思。声明词量包括正向声明和反向声明两种模式。

### 正向声明

指定匹配模式后面的字符必须被匹配，但又不返回这些字符。语法格式如下：

匹配模式 (?=  匹配条件)

声明包含在小括号内，它不是分组，因此作为子表达式。

下面代码定义一个正前向生命的匹配模式。

```js
var s = "one : 1; two : 2";
var r = /\w*(?==)/; //使用正前向声明，指定执行匹配必须满足的条件
var a = s.match(r); //返回数组["two"]
```

在上面示例中，通过`?==`锚定条件，指定只有在 `\w`所能够匹配的字符后面跟随一个等号字符，才能够执行 `\w`  匹配。所以，最后匹配的字符串“two”，而不是字符串“one”。

### 反向声明

与正向声明匹配相反，指定接下来的字符都不必被匹配。语法格式如下：

匹配模式(?!  匹配条件)

下面代码定义一个反前向生命的匹配模式。

```js
var s = "one : 1; two : 2";
var r = /\w*(?!=)/; //使用正前向声明，指定执行匹配不必满足的条件
var a = s.match(r); //返回数组["one"]
```

在上面示例中，通过`?!=`锚定条件，指定只有在“\w*”所能够匹配的字符后面不跟随一个等号字符，才能够执行 \w*匹配。所以，最后匹配的是字符串“one”，而不是字符串“two”。

---

### 子表达式

使用小括号可以对字符模式进行任意分组，在小括号内的字符串表示子表达式，也称为子模式。子表达式具有独立的匹配功能，保存独立的匹配结果；同时，小括号后的量词将会作用于整个子表达式。

通过分组可以在一个完整的字符模式中定义一个或多个子模式。当正则表达式成功地匹配目标字符串后，也可以从目标字符串中抽出与子模式相匹配的子内容。

#### 子表达式示例

在下面代码中，不仅能匹配出每个变量声明，同时还抽出每个变量及其值。

```js
var s = "ab=21, bc=45, cd=43";
var r = /(\w+)=(\d*)/g;
while ((a = r.exec(s))) {
	console.log(a); //返回类似["ab=21","bc=45","cd=43"]三个数组
}
```

---

### 反向引用

在字符模式中，后面的字符可以引用前面的子表达式。实现方法如下：

```js
\+ 数字
```

数字指定了子表达式在字符模式中的顺序。如“\1”引用的是第 1  个子表达式，“\2”引用的是第 2  个子表达式。

#### 反向引用示例 1

在下面代码中，通过引用前面子表达式匹配的文本，实现成组匹配字符串。

```js
var s = "<h1>title<h1><p>text<p>";
var r = /(<\/?\w+>)\1/g;
var a = s.match(r); //返回数组["<h1>title<h1>","<p>text<p>"]
```

由于子表达式可以相互嵌套，它们的顺序将根据左括号的顺序来确定。例如，下面示例定义匹配模式包含多个子表达式。

```js
var s = "abc";
var r = /(a(b(c)))/;
var a = s.match(r); //返回数组["abc","abc","bc","c"]
```

在这个模式中，共产生了 3  个反向引用，第一个是“(a(b(c)))”，第二个是“(b(c))”，第三个是“(C)”。它们引用的匹配文本分别是字符串“abc”、“bc”和“c”。

对子表达式的引用，是指引用前面子表达式所匹配的文本，而不是子表达式的匹配模式。如果要引用前面子表达式的匹配模式，则必须使用下面方式，只有这样才能够达到匹配目的。

```js
var s = "<h1>title</h1><p>text</p>";
var r = /((<\/?\w+>).*(<\/?\w+>))/g;
var a = s.match(r); //返回数组["<h1>title</h1>","<p>text</p>"]
```

反向引用在开发中主要有以下几种常规用法。

#### 反向引用示例 2

在正则表达式对象的  test()  方法中，以及字符串对象的  match()  和  search()  等方法中使用。在这些方法中，反向引用的值可以从 RegExp()  构造函数中获得。

```js
var s = "abcdefghijklmn";
var r = /(\w)(\w)(\w)/;
r.test(s);
console.log(RegExp.$1); //返回第1个子表达式匹配的字符a
console.log(RegExp.$2); //返回第2个子表达式匹配的字符b
console.log(RegExp.$3); //返回第3个子表达式匹配的字符c
```

通过上面示例可以看到，正则表达式执行匹配检测后，所有子表达式匹配的文本都被分组存储在 RegExp()  构造函数的属性内，通过前缀符号`$`与正则表达式中子表达式的编号来引用这些临时属性。其中属性 `$1`  标识符指向第 1  个值引用，属性 `$2`  标识符指向第 2  个值引用。

#### 反向引用示例 3

可以直接在定义的字符模式中包含反向引用。这可以通过使用特殊转义序列（如 \1、\2 等）来实现。

```js
var s = "abcbcacba";
var r = /(\w)(\w)(\w)\2\3\1\3\2\1/;
var b = r.test(s); //验证正则表达式是否匹配该字符串
console.log(b); //返回true
```

在上面示例的正则表达式中，“\1”表示对第 1  个反向引用 (\w)  所匹配的字符  a  进行引用，“\2”表示对第 2  个反向引用 (\w)  所匹配的字符串  b  进行引用，“\3”表示对第 3  个反向引用 (\w)  所匹配的字符  c  进行引用。

#### 反向引用示例 4

可以在字符串对象的  replace()  方法中使用。通过使用特殊字符序列$1、$2、$3  等来实现。例如，在下面的示例中将颠倒相邻字母和数字的位置。

```js
var s = "aa11bb22c3d4e5f6";
var r = /(\w+?)(\d+)/g;
var b = s.replace(r, "$2$1");
console.log(b); //返回字符串“aa11bb22c3 d4e5f6”
```

在上面例子中，正则表达式包括两个分组，第 1  个分组匹配任意连续的字母，第 2  个分组匹配任意连续的数字。在  replace()  方法的第 2  个参数中，`$1`  表示对正则表达式中第 1  个子表达式匹配文本的引用，而 `$2`  表示对正则表达式中第 2  个子表达式匹配文本的引用，通过颠倒 `$1`  和 `$2`  标识符的位置，即可实现字符串的颠倒来替换原字符串。

---

### 禁止引用

反向引用会占用一定的系统资源，在较长的正则表达式中，反向引用会降低匹配速度。如果分组仅仅是为了方便操作，可以禁止反向引用。

实现方法：在左括号的后面加上一个问号和冒号。

```js
var s1 = "abc";
var r = /(?:\w*?)|(?:\d*?)/;
var a = r.test(si);
```

非引用型分组必须使用子表达式，但是又不希望存储无用的匹配信息，或者希望提高匹配速度来说，是非常重用的方法。

---

### 正则表达式案例

1.验证密码强弱

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>验证密码强度案例</title>
	</head>
	<style type="text/css">
		#dv {
			width: 300px;
			height: 200px;
			position: absolute;
			left: 300px;
			top: 100px;
		}
		.strengthLv0 {
			height: 6px;
			width: 120px;
			border: 1px solid #ccc;
			padding: 2px;
		}

		.strengthLv1 {
			background: red;
			height: 6px;
			width: 40px;
			border: 1px solid #ccc;
			padding: 2px;
		}

		.strengthLv2 {
			background: orange;
			height: 6px;
			width: 80px;
			border: 1px solid #ccc;
			padding: 2px;
		}

		.strengthLv3 {
			background: green;
			height: 6px;
			width: 120px;
			border: 1px solid #ccc;
			padding: 2px;
		}
	</style>
	<body>
		<div id="dv">
			<label for="pwd">密码</label>
			<input type="text" id="pwd" maxlength="16" /><!--课外话题-->
			<div>
				<em>密码强度：</em>
				<em id="strength"></em>
				<div id="strengthLevel" class="strengthLv0"></div>
			</div>
		</div>
		<script src="common.js"></script>
		<script>
			//获取文本框注册键盘抬起事件
			my$("pwd").onkeyup = function () {
				//每次键盘抬起都要获取文本框中的内容,验证文本框中有什么东西,得到一个级别,然后下面的div显示对应的颜色
				//如果密码的长度是小于6的,没有必要判断
				//    if(this.value.length>=6){
				//     var lvl= getLvl(this.value);
				//      my$("strengthLevel").className="strengthLv"+lvl;
				//    }else{
				//      my$("strengthLevel").className="strengthLv0";
				//    }
				my$("strengthLevel").className =
					"strengthLv" + (this.value.length >= 6 ? getLvl(this.value) : 0);
			};

			//给我密码,我返回对应的级别
			function getLvl(pwd) {
				var lvl = 0; //默认是0级
				//密码中是否有数字,或者是字母,或者是特殊符号
				if (/[0-9]/.test(pwd)) {
					lvl++;
				}
				//判断密码中有没有字母
				if (/[a-zA-Z]/.test(pwd)) {
					lvl++;
				}
				//判断密码中有没有特殊符号
				if (/[^0-9a-zA-Z_]/.test(pwd)) {
					lvl++;
				}
				return lvl; //最小的值是1,最大值是3
			}
		</script>
		<script>
			/*
			 *
			 * 密码: 数字,字母,特殊符号
			 *
			 * 密码: 只有数字- 或者是只有字母,或者是只有特殊符号---1级---弱
			 * 两两组合: 数字和字母, 数字和特殊符号, 字母和特殊符号   -----2级----中
			 * 三者都有: 数字和字母和特殊符号------3级-----强
			 *
			 * */

			//  //获取文本框注册键盘抬起事件
			//  my$("pwd").onkeyup=function () {
			//    //每次键盘抬起都要获取文本框中的内容,验证文本框中有什么东西,得到一个级别,然后下面的div显示对应的颜色
			//    //如果密码的长度是小于6的,没有必要判断
			//    if(this.value.length>=6){
			//      var lvl=getLvl(this.value);
			//      if(lvl==1){
			//        //弱
			//        my$("strengthLevel").className="strengthLv1";
			//      }else if(lvl==2){
			//        my$("strengthLevel").className="strengthLv2";
			//      }else if(lvl==3){
			//        my$("strengthLevel").className="strengthLv3";
			//      }else{
			//        my$("strengthLevel").className="strengthLv0";
			//      }
			//    }else{
			//      my$("strengthLevel").className="strengthLv0";
			//    }
			//
			//
			//  };
			//
			//  //给我密码,我返回对应的级别
			//  function getLvl(pwd) {
			//    var lvl=0;//默认是0级
			//    //密码中是否有数字,或者是字母,或者是特殊符号
			//    if(/[0-9]/.test(pwd)){
			//      lvl++;
			//    }
			//    //判断密码中有没有字母
			//    if(/[a-zA-Z]/.test(pwd)){
			//      lvl++;
			//    }
			//    //判断密码中有没有特殊符号
			//    if(/[^0-9a-zA-Z_]/.test(pwd)){
			//      lvl++;
			//    }
			//    return lvl;//1  3
			//  }
			//
		</script>
	</body>
</html>
```

2.验证邮箱：`[0-9a-zA-Z_.-]+[@][0-9a-zA-Z._-]+([.][a-zA-Z]+){1,2}`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>验证邮箱</title>
	</head>
	<body>
		请您输入邮箱地址:<input type="text" value="" id="email" /> *<br />
		<script>
			//如果输入的是邮箱,那么背景颜色为绿色,否则为红色

			//获取文本框,注册失去焦点的事件
			document.getElementById("email").onblur = function () {
				//判断这个文本框中输入的是不是邮箱
				var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
				if (reg.test(this.value)) {
					this.style.backgroundColor = "green";
				} else {
					this.style.backgroundColor = "red";
				}
			};
		</script>
	</body>
</html>
```

3.验证中文名字：`[\u4e00-\u9fa5]`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>验证中文名字</title>
	</head>
	<body>
		请输入您的名字:<input type="text" value="" id="userName" />*<br />
		<script>
			//是中文名字,则绿色,否则红色
			document.getElementById("userName").onblur = function () {
				var reg = /^[\u4e00-\u9fa5]{2,6}$/;
				if (reg.test(this.value)) {
					this.style.backgroundColor = "green";
				} else {
					this.style.backgroundColor = "pink";
				}
			};

			//[\u4e00-\u9fa5]    [一-龥]
		</script>
	</body>
</html>
```

---

### 正则提取

```javascript
// 1. 提取工资
var str = "张三：1000，李四：5000，王五：8000。";
var array = str.match(/\d+/g);
console.log(array);

// 2. 提取email地址
var str =
	"123123@xx.com,fangfang@valuedopinions.cn 286669312@qq.com 2、emailenglish@emailenglish.englishtown.com 286669312@qq.com...";
var array = str.match(/\w+@\w+\.\w+(\.\w+)?/g);
console.log(array);

// 3. 分组提取
// 3. 提取日期中的年部分  2015-5-10
var dateStr = "2016-1-5";
// 正则表达式中的()作为分组来使用，获取分组匹配到的结果用Regex.$1 $2 $3....来获取
var reg = /(\d{4})-\d{1,2}-\d{1,2}/;
if (reg.test(dateStr)) {
	console.log(RegExp.$1);
}

// 4. 提取邮件中的每一部分
var reg = /(\w+)@(\w+)\.(\w+)(\.\w+)?/;
var str = "123123@xx.com";
if (reg.test(str)) {
	console.log(RegExp.$1);
	console.log(RegExp.$2);
	console.log(RegExp.$3);
}
```

---

### 正则替换

```javascript
// 1. 替换所有空白
var str = "   123AD  asadf   asadfasf  adf ";
str = str.replace(/\s/g, "xx");
console.log(str);

// 2. 替换所有,|，
var str = "abc,efg,123，abc,123，a";
str = str.replace(/,|，/g, ".");
console.log(str);
```

### 正则替换示例

示例 1：

下面使用 ASCII  编码定义正则表达式直接量。

```js
var r = /\x61/;
var s = "JavaScript";
var a = s.match(s);
```

由于字母  a  的 ASCII  编码为 97，被转换为十六进制数值后为 61，因此如果要匹配字符  a，就应该在前面添加“\x”前缀，以提示它为 ASCII  编码。

示例 2：

除了十六进制外，还可以直接使用八进制数值表示字符。

```js
var r = /\141/;
var s = "JavaScript";
var a = s.match(r);
```

使用十六进制需要添加“\x”前缀，主要是为了避免语义混淆，而八进制则不需要添加前缀。

示例 3：

ASCII  编码只能够匹配有限的单字节字符，使用 Unicode  编码可以表示双字节字符。Unicode  编码方式：“\u”前缀加上 4  位十六进制值。

```js
var r = "/\u0061/";
var s = "JavaScript";
var a = s.match(s);
```

在 RegExp()  构造函数中使用元字符时，应使用双斜杠。

```js
var r = new RegExp("\\u0061");
```

RegExp()  构造函数的参数只接受字符串，而不是字符模式。在字符串中，任何字符加反斜杠还表示字符本身，如字符串“\u”就被解释为  u  本身，所以对于“\u0061”字符串来说，在转换为字符模式时，就被解释为“u0061”，而不是“\u0061”，此时反斜杠就失去转义功能。解决方法：在字符  u  前面加双反斜杠。

**案例:过滤敏感词汇**：

```js
<textarea name="" id="message"></textarea> <button>提交</button>
<div></div>
<script>
    var text = document.querySelector('textarea');
    var btn = document.querySelector('button');
    var div = document.querySelector('div');
    btn.onclick = function() {
        div.innerHTML = text.value.replace(/激情|gay/g, '**');
    }
</script>
```

---

### 案例：表单验证

```html
QQ号：<input type="text" id="txtQQ" /><span></span><br />
邮箱：<input type="text" id="txtEMail" /><span></span><br />
手机：<input type="text" id="txtPhone" /><span></span><br />
生日：<input type="text" id="txtBirthday" /><span></span><br />
姓名：<input type="text" id="txtName" /><span></span><br />
```

```javascript
//获取文本框
var txtQQ = document.getElementById("txtQQ");
var txtEMail = document.getElementById("txtEMail");
var txtPhone = document.getElementById("txtPhone");
var txtBirthday = document.getElementById("txtBirthday");
var txtName = document.getElementById("txtName");

//
txtQQ.onblur = function () {
	//获取当前文本框对应的span
	var span = this.nextElementSibling;
	var reg = /^\d{5,12}$/;
	//判断验证是否成功
	if (!reg.test(this.value)) {
		//验证不成功
		span.innerText = "请输入正确的QQ号";
		span.style.color = "red";
	} else {
		//验证成功
		span.innerText = "";
		span.style.color = "";
	}
};

//txtEMail
txtEMail.onblur = function () {
	//获取当前文本框对应的span
	var span = this.nextElementSibling;
	var reg = /^\w+@\w+\.\w+(\.\w+)?$/;
	//判断验证是否成功
	if (!reg.test(this.value)) {
		//验证不成功
		span.innerText = "请输入正确的EMail地址";
		span.style.color = "red";
	} else {
		//验证成功
		span.innerText = "";
		span.style.color = "";
	}
};
```

表单验证部分，封装成函数：

```javascript
var regBirthday = /^\d{4}-\d{1,2}-\d{1,2}$/;
addCheck(txtBirthday, regBirthday, "请输入正确的出生日期");
//给文本框添加验证
function addCheck(element, reg, tip) {
	element.onblur = function () {
		//获取当前文本框对应的span
		var span = this.nextElementSibling;
		//判断验证是否成功
		if (!reg.test(this.value)) {
			//验证不成功
			span.innerText = tip;
			span.style.color = "red";
		} else {
			//验证成功
			span.innerText = "";
			span.style.color = "";
		}
	};
}
```

通过给元素增加自定义验证属性对表单进行验证：

```html
<form id="frm">
	QQ号：<input type="text" name="txtQQ" data-rule="qq" /><span></span><br />
	邮箱：<input type="text" name="txtEMail" data-rule="email" /><span></span
	><br />
	手机：<input type="text" name="txtPhone" data-rule="phone" /><span></span
	><br />
	生日：<input type="text" name="txtBirthday" data-rule="date" /><span></span
	><br />
	姓名：<input type="text" name="txtName" data-rule="cn" /><span></span><br />
</form>
```

```javascript
// 所有的验证规则
var rules = [
	{
		name: "qq",
		reg: /^\d{5,12}$/,
		tip: "请输入正确的QQ",
	},
	{
		name: "email",
		reg: /^\w+@\w+\.\w+(\.\w+)?$/,
		tip: "请输入正确的邮箱地址",
	},
	{
		name: "phone",
		reg: /^\d{11}$/,
		tip: "请输入正确的手机号码",
	},
	{
		name: "date",
		reg: /^\d{4}-\d{1,2}-\d{1,2}$/,
		tip: "请输入正确的出生日期",
	},
	{
		name: "cn",
		reg: /^[\u4e00-\u9fa5]{2,4}$/,
		tip: "请输入正确的姓名",
	},
];

addCheck("frm");

//给文本框添加验证
function addCheck(formId) {
	var i = 0,
		len = 0,
		frm = document.getElementById(formId);
	len = frm.children.length;
	for (; i < len; i++) {
		var element = frm.children[i];
		// 表单元素中有name属性的元素添加验证
		if (element.name) {
			element.onblur = function () {
				// 使用dataset获取data-自定义属性的值
				var ruleName = this.dataset.rule;
				var rule = getRuleByRuleName(rules, ruleName);

				var span = this.nextElementSibling;
				//判断验证是否成功
				if (!rule.reg.test(this.value)) {
					//验证不成功
					span.innerText = rule.tip;
					span.style.color = "red";
				} else {
					//验证成功
					span.innerText = "";
					span.style.color = "";
				}
			};
		}
	}
}

// 根据规则的名称获取规则对象
function getRuleByRuleName(rules, ruleName) {
	var i = 0,
		len = rules.length;
	var rule = null;
	for (; i < len; i++) {
		if (rules[i].name == ruleName) {
			rule = rules[i];
			break;
		}
	}
	return rule;
}
```

## 相关资源和库

any-rule，地址：<https://any86.github.io/any-rule/>

- any-rule 是一个强大且开源的正则表达式库，目前已经收集了 82 条常用的正则表达式，如常用的手机号验证，邮箱验证，链接验证，车牌验证等，并且支持 web，vscode，idea 等多个平台，在 web 端可以在线验证和一键复制正则表达式，而在编辑器上，我们只需要安装对应的插件，即可方便的生成我们所需要的正则表达式，非常的方便
