# JavaScript编程技巧

#### **1. 多条件 if 语句**

将多个值放入一个数组中，然后调用该数组的 include 方法。

```javascript
// bad
if (x === "abc" || x === "def" || x === "ghi" || x === "jkl") {
     //logic
}
     
// better
if (["abc", "def", "ghi", "jkl"].includes(x)) { 
     //logic
}
```

#### **2. 简化 if true...else 条件表达式**

```javascript
// bad
let test: boolean;
if (x > 100) {  
    test = true;
} else {  
    test = false;
}

// better
let test = x > 100 ? true : false;

//or let test = x > 100;

console.log(test);
```

#### **3. 假值（undefined, null, 0, false, NaN, empty string）检查**

当我们创建一个新变量时，有时我们想检查引用的变量是否是一个假值，例如 null 或 undefined 或空字符串。JavaScript 确实为这种检查提供了一个很好的快捷方式——逻辑 OR 运算符 (||)

|| 仅当左侧为空或 NaN 或 null 或 undefined 或 false 时，如果左侧操作数为假，则将返回右侧操作数，逻辑或运算符 ( || ) 将返回右侧的值。

```javascript
// bad
if (test1 !== null || test1 !== undefined || test1 !== "") { 
    let test2 = test1;
}

// better
let test2 = test1 || "";


// bad
if (test1 === true) or if (test1 !== "") or if (test1 !== null)

// better
if (test1){  
    // do some
    }else{  
    // do other
}

//Note: If test1 has a value, the logic after if will be executed. //This operator is mainly used for null, undefined, and empty string checks.
```

#### **4. null/undefined 检查和默认赋值**

```javascript
//null checking and default assignment

let test1 = null;
let test2 = test1 ?? "";

console.log("null check", test2); // output empty string ""

//undefined checking and default assignment

const test = undefined ?? "default";
console.log(test);// expected output: "default"
```

#### **5. 获取列表中的最后一项**

在其他语言中，此功能被制成可以在数组上调用的方法或函数，但在 JavaScript 中，你必须自己做一些工作。

```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7];

console.log(array.slice(-1)) >>> [7];
console.log(array.slice(-2)) >>> [6, 7];
console.log(array.slice(-3)) >>> [5, 6, 7];

function lastItem(list) { 
  if (Array.isArray(list)) {    
      return list.slice(-1)[0];  
  }
  if (list instanceof Set) {    
      return Array.from(list).slice(-1)[0];  
  }
  if (list instanceof Map) {    
      return Array.from(list.values()).slice(-1)[0];  
  }
 }
```

#### **6.比较后返回**

```javascript
// bad
let test;
function checkReturn() {  
if (!(test === undefined)) {    
    return test;  
    } else {    
    return callMe("test");  
    }
}

// better
function checkReturn() {  
    return test ?? callMe("test");
}
```

#### **7. 使用可选的链接运算符 -?。**

? 也称为链判断运算，它允许开发人员读取深度嵌套在对象链中的属性值，而无需验证每个引用，当引用为空时，表达式停止计算并返回 undefined。

```javascript
const travelPlans = {        
    destination: "DC",        
    monday: {            
    location: "National Mall",            
    budget: 200,        },    
};
    
// bad    
const res = travelPlans && travelPlans.tuesday && travelPlans.tuesday.location && travelPlans.tuesday.location.href;    
console.log(res);  // Result: undefined

// better    
const res1 = travelPlans?.tuesday?.location?.href;    
console.log(res1);  // Result: undefined
```

#### **8. 多个条件的 && 运算符**

要仅在变量为真时调用函数，请使用 && 运算符。

```javascript
// bad
if (test) {  
    callMethod();
}
    
// better
test && callMethod();
```

当你想在 React 中有条件地渲染组件时，这对于使用 (&&) 进行短路很有用。例如：

```html
<div> {this.state.isLoading && <Loading />} </div>
```

#### **9.开关简化**

我们可以将条件存储在键值对象中，并根据条件调用它们。

```javascript
// bad
switch (data) {  
    case 1:    
    test1();    
    break;  
    case 2:    
    test2();    
    break;  
    case 3:    
    test();    
    break;    // And so on...
}
    
// better
var data = {  
    1: test1,  
    2: test2,  
    3: test,
};
// If type exists in data, execute the corresponding function
data[type] && data[type]();
```

#### **10.默认参数值**

```javascript
// bad
function add(test1, test2) {  
    if (test1 === undefined) 
    test1 = 1;  
    if (test2 === undefined) 
    test2 = 2;  
    return test1 + test2;
}
    
// better
add = (test1 = 1, test2 = 2) => test1 + test2;add(); //output: 3
```

#### **11. 条件查找简化**

如果我们想根据不同的类型调用不同的方法，我们可以使用多个 else if 语句或开关，但是还有比这更好的简化技巧吗？其实和之前的switch简化是一样的。

```javascript
// bad
if (type === "test1") {  
    test1();
    } else if (type === "test2") {  
    test2();} else if (type === "test3") {  
    test3();} else if (type === "test4") {  
    test4();} else {  
    throw new Error("Invalid value " + type);
}

// better
var types = {  test1,  test2,  test3,  test4,};
types[type] && types[type]();
```

#### **12. 对象属性赋值**

```javascript
let test1 = "a";let test2 = "b";
// bad
let obj = { test1: test1, test2: test2 };

// better
let obj = { test1, test2 };
```

#### **13. 解构赋值**

```javascript
// bad
const test1 = this.data.test1;
const test2 = this.data.test2;
const test3 = this.data.test3;

// better
const { test1, test2, test3 } = this.data;
```

#### **14. 模板字符串**

如果你厌倦了使用 + 将多个变量连接成一个字符串，这个简化技巧会让你头疼。

```javascript
// bad
const welcome = "Hi " + test1 + " " + test2 + ".";

// better
const welcome = `Hi ${test1} ${test2}`;
```

#### **15. 跨越字符串**

```javascript
// bad    
const data = "hello maxwell this is a test\n\t" + "test test,test test test test\n\t";     

// better    
const data = `hello maxwell this is a test                    
                test test,test test test test`;
```

#### **16. indexOf的按位化简**

在数组中查找某个值时，我们可以使用 indexOf() 方法。但是还有更好的方法，我们来看这个例子。

```javascript
// bad
if (arr.indexOf(item) > -1) {  
    // item found
}
if (arr.indexOf(item) === -1) {  
    // item not found
}

// better
if (~arr.indexOf(item)) {  
    // item found
}
if (!~arr.indexOf(item)) {  
// item not found
}

//The bitwise (~) operator will return true (except for -1), //the reverse operation only requires !~. Alternatively, the includes() function can be used.
if (arr.includes(item)) {  
    // true if the item found
}
```

#### **17. 将字符串转换为数字**

有诸如 parseInt 和 parseFloat 等内置方法可用于将字符串转换为数字。我们也可以简单地通过在字符串前面提供一元运算符 (+) 来做到这一点。

```javascript
// bad
let total = parseInt("583");
let average = parseFloat("32.5");

// better
let total = +"583";
let average = +"32.5";
```

#### **18. 按顺序执行 Promise**

如果你有一堆异步或普通函数都返回要求你一个一个执行它们的Promise怎么办？

```javascript
async function getData() {        
const promises = [fetch("url1"), fetch("url2"), fetch("url3"), fetch("url4")];        
for (const item of promises) {            
    // Print out the promise            
    console.log(item);        
}

// better        
for await (const item of promises) {      
    // Print out the results of the request            
    console.log(item);
}
```

等待所有Promiae完成。

Promise.allSettled() 方法接受一组 Promise 实例作为参数，包装到一个新的 Promise 实例中。

在所有这些参数实例都返回结果（已完成或已拒绝）之前，包装器实例不会结束。

有时候，我们并不关心异步请求的结果，我们只关心是否所有请求都结束了。这时候，Promise.allSettled() 方法就非常有用了。

```javascript
const promises = [fetch("index.html"), fetch("https://does-not-exist/")];

const results = await Promise.allSettled(promises);

// Filter out successful requests
const successfulPromises = results.filter((p) => p.status === "fulfilled");

// Filter out failed requests and output the reason
const errors = results.filter((p) => p.status === "rejected").map((p) => p.reason);
```

#### **19.交换数组元素的位置**

```javascript
// bad
const swapWay = (arr, i, j) => {  const newArr = [...arr];

  let temp = newArr[i];
  newArr[i] = list[j];  newArr[j] = temp;
  
  return newArr;};

//Since ES6, swapping values from different locations in an array has become much easier

// better
const swapWay = (arr, i, j) => {  const newArr = [...arr];

  const [newArr[j],newArr[i]] = [newArr[i], newArr[j]];
  
  return newArr;};
```

#### **20. 带范围的随机数生成器**

有时你需要生成随机数，但又希望数字在一定范围内，则可以使用此工具。

```javascript
function randomNumber(max = 1, min = 0) {  
    if (min >= max) {    
        return max;  
    }
    return Math.floor(Math.random() * (max - min) + min);
}
```

#### **生成随机颜色**

```javascript
function getRandomColor() {  
    const colorAngle = Math.floor(Math.random() * 360);  
    return `hsla(${colorAngle},100%,50%,1)`;
}
```

### 其他

**1、解构赋值**

解构赋值是一种从数组或对象中提取值并将其分配给变量的简洁方法，可以简化代码并提高可读性。对于数组，您可以使用方括号表示，而对于对象，则可以使用大括号表示。

```JavaScript
// 解构数组
const [firstItem, secondItem, ...rest] = [1, 2, 3, 4, 5];

// 解构对象
const { name, age, ...details } = { name: 'John', age: 30, occupation: 'Developer' };
```

**2、展开语法**

您可以使用展开语法将数组的元素或对象的属性扩展到另一个数组或对象中。这对于制作副本、合并对象和将多个参数传递给函数非常有用。展开语法看起来像三个点 ...，可以按以下方式使用：

```JavaScript
// 复制数组
const originalArray = [1, 2, 3];
const newArray = [...originalArray];

// 合并对象
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };
```

**3、柯里化**

柯里化是一种函数式编程技术，它将接受多个参数的函数转换为一系列只接受单个参数的函数。这样可以更好地重用和组合代码。

示例1：

```JavaScript
const multiply = (a) => (b) => a * b;
const multiplyByTwo = multiply(2);
const result = multiplyByTwo(5); // 输出: 10
```

示例2：

```JavaScript
// 一个普通的三元函数
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// 使用柯里化转换后的函数
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6
```

**4、缓存**

缓存技术是一种用于存储昂贵函数调用的结果并避免不必要的重新计算的技术。它可以显著地减慢长期递归或消耗性函数的性能。

```JavaScript
const memoizedFibonacci = (function () {
  const cache = {};

  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
})();
```

**5、Promise 和 Async/Await**

Promises 和 Async/Await 对于优雅地处理异步操作并使代码更易读，它们有助于避免回调地狱并改善错误处理。

```JavaScript
// 使用 Promises
function fetchData() {
  return new Promise((resolve, reject) => {
    // 异步操作，例如从API获取数据
    // 在操作结果的基础上 resolve(data) 或 reject(error)
  });
}

// 使用 Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

**6、闭包**

闭包是一种在编程中常见的概念，指的是一个函数能够访问和操作其词法环境中的变量，即使在该函数被调用时，其词法环境已经不再存在。

```JavaScript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 输出: 1
console.log(counter()); // 输出: 2
```

**7、函数组合**

函数组合是将两个或多个函数组合成一个新函数的过程。它有助于代码重用。

```JavaScript
const add = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addAndMultiply = compose(multiplyByTwo, add);
console.log(addAndMultiply(3)); // Output: 8
```

**8、代理**

代理对象允许您为基本对象操作创建自定义行为。它允可以拦截和修改对象操作。例如，访问属性，分配和调用方法。

```JavaScript
const handler = {
  get: (target, prop) => {
    console.log(Accessing property: ${prop});
    return target[prop];
  },
};

const targetObj = { name: 'John', age: 30 };
const proxyObj = new Proxy(targetObj, handler);

console.log(proxyObj.name); // 输出: Accessing property: name \n John
```

**9、事件委托**

事件委托是一种技术，它可以将单个事件侦听器附加到父级和减少内存使用量并提高性能，特别是对于大型列表或动态生成的内容。

```JavaScript
document.getElementById('parent').addEventListener('click', function (event) {
  if (event.target.matches('li')) {
    console.log('You clicked on an li element!');
  }
});
```

**10、Web Workers**

Web Workers可以在后台与主线程一起运行JavaScript代码。它们对于卸载CPU密集型任务，避免UI挂起并提高性能响应性非常有用。

```JavaScript
// 主线程
const worker = new Worker('worker.js');
worker.postMessage({ data: 'some data' });

// worker.js
self.addEventListener('message', function (event) {
  const data = event.data;
  // 进行复杂计算后将结果返回
  self.postMessage({ result: computedResult });
});
```

### 移除数组假值

可以使用 `filter()` 结合 `Boolean` 来简化移除数组假值操作。假值指的是在条件判断中被视为 false 的值，例如 null、undefined、空字符串`（"" 或 ''）`、`0`、`NaN` 和 `false`。

传统写法：

```javascript
let arr = [12, null, 0, 'xyz', null, -25, NaN, '', undefined, 0.5, false];


let filterArray = arr.filter(value => {
    if(value) {
      return value
    };
}); 
// [12, 'xyz', -25, 0.5]
```

简化写法：

```javascript
let arr = [12, null, 0, 'xyz', null, -25, NaN, '', undefined, 0.5, false];

let filterArray = arr.filter(value => Boolean(value)); // [12, 'xyz', -25, 0.5]
```

更简化写法：

```javascript
let arr = [12, null, 0, 'xyz', null, -25, NaN, '', undefined, 0.5, false];

let filterArray = arr.filter(Boolean); // [12, 'xyz', -25, 0.5]
```

`Boolean` 是 JavaScript 的内置构造函数，通过传递一个值给它，可以将该值转换为布尔值。在这种情况下，`Boolean` 构造函数作为回调函数传递给 `filter() `方法，因此会将每个数组元素转换为布尔值。只有转换结果为真值的元素才会保留在新数组中。

注意：这种方式会将 0 也过滤掉，如果不需要过滤 0，需要进行额外的判断。

### 数组查找

当对数组进行查找时，`indexOf()`用于获取查找项的位置。如果未找到该项，则返回值为`-1`。在JavaScript中，`0`被视为`false`，而`大于或小于0`的数字被视为`true`。因此，需要这样来写：

传统写法：

```javascript
if(arr.indexOf(item) > -1) { 

}

if(arr.indexOf(item) === -1) {

}
```

简化写法：

```javascript
if(~arr.indexOf(item)) {

}

if(!~arr.indexOf(item)) {

}
```

位非`（~）`运算符对除了-1之外的任何值都返回一个`"真"`值。对其进行取反就是简单地使用`!~`即可。另外，也可以使用includes()函数：

```javascript
if(arr.includes(item)) {

}
```

### 空值合并运算符

空值合并运算符（??）用于为 null 或 undefined 的变量提供默认值。

传统写法：

```javascript
const fetchUserData = () => {
	return '前端';
};


const data = fetchUserData();
const username = data !== null && data !== undefined ? data : 'Guest';
```

简化写法：

```javascript
const fetchUserData = () => {
	return '前端';
};

const data = fetchUserData();
const username = data ?? 'CUGGZ';
```

除此之外，还有一个空位合并赋值运算符`（??=）`，用于在变量为空`（null 或 undefined）`时进行赋值操作。

传统写法：

```javascript
 
let variable1 = null;
let variable2 = "前端";

if (variable1 === null || variable1 === undefined) {
  variable1 = variable2;
}
```

简化写法：

```javascript
let variable1 = null;
let variable2 = "前端";

variable1 ??= variable2;
```

`??= `的写法更加简洁和易读。它首先检查变量 variable1 是否为`null`或 `undefined`，如果是，则将它赋值为 variable2 的值。如果 variable1 已经有一个非空的值，那么赋值操作就不会发生。

### 逻辑或赋值运算符

逻辑或赋值运算符（||=）用于为变量分配默认值。

传统写法：

```javascript
 
let count;
if (!count) {
  count = 0;
}
```

简化写法：

```javascript
let count;
count ||= 0;
```

当 count 为假值（例如 undefined、null、false、0、NaN 或空字符串）时，逻辑或赋值运算符将 count 赋值为 0。否则，它会保留 count 的原始值。

### 多值匹配

对于多个值的匹配，可以将所有的值放入一个数组中，然后使用 indexOf() 方法进行检查。indexOf() 方法是 JavaScript 数组的一个内置方法，它用于返回指定元素在数组中第一次出现的位置索引。如果数组中不存在该元素，则返回 -1。

传统写法：

```javascript
if (value === 1 || value === 'one' || value === 2 || value === 'two') {
  // ...
}
```

简化写法：

```javascript
if ([1, 'one', 2, 'two'].indexOf(value) >= 0) {
   // ...
}
```

更简化写法：

```javascript
if ([1, 'one', 2, 'two'].includes(value)) { 
    // ...
}
```

### 三元表达式

使用三元表达式表示可以简化if...else。

传统写法：

```javascript
let isAdmin;
if (user.role === 'admin') {
  isAdmin = true;
} else {
  isAdmin = false;
}
```

简化写法：

```javascript
const isAdmin = user.role === 'admin' ? true : false;
```

更简化写法：

```javascript
const isAdmin = user.role === 'admin';
```

### 短路求值

当将一个变量的值赋给另一个变量时，可能希望确保源变量不为 null、undefined 或空。可以编写一个包含多个条件的长 if 语句，或者使用短路求值来简化。

```javascript
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
    let variable2 = variable1;
}
```

使用短路求值简化后的代码如下：

```javascript
const variable2 = variable1 || 'new';
```

对于逻辑或（||）操作符，以下值被视为假：

- false
- 0
- 空字符串（"" 或 ''）
- null
- undefined
- NaN

所以，如果本身的值可能就是这些中的一个，就不适合使用短路求值。

短路求值还能在函数调用中避免不必要的函数执行。

传统写法：

```javascript
function fetchData() {
  if (shouldFetchData) {
    return fetchDataFromAPI();
  } else {
    return null;
  }
}
```

简化写法：

```javascript
function fetchData() {
  return shouldFetchData && fetchDataFromAPI();
}
```

当 `shouldFetchData `为真值时，短路求值会继续执行 `fetchDataFromAPI() `函数并返回其结果。如果 `shouldFetchData` 为假值，短路求值会直接返回假值（`null`），避免了不必要的函数调用。

### 科学计数法

可以使用科学技术法来表示数字，以省略尾部的零。例如，1e7 实际上表示 1 后面跟着 7 个零。它表示一个十进制，相当于 10,000,000。

传统写法：

```javascript
for (let i = 0; i < 10000; i++) {}
```

简化写法：

```javascript
for (let i = 0; i < 1e7; i++) {}

// 下面的所有比较都将返回 true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;
```

### 位运算符

双位非运算符有一个非常实用的用途，可以用它来替代`Math.floor()`函数，它在执行相同的操作时速度更快。

传统写法：

```javascript
Math.floor(4.9) === 4  //true
```

简化写法：

```javascript
~~4.9 === 4  //true
```

## 指数幂运算

指数幂运算可以使用 `**` 来简化。

传统写法：

```javascript
Math.pow(2,3); // 8
Math.pow(2,2); // 4
Math.pow(4,3); // 64
```

简化写法：

```javascript
2**3 // 8
2**4 // 4
4**3 // 64
```

从 ES7（ECMAScript 2016）开始，JavaScript 引入了指数幂运算符` **`，使指数幂运算更加简洁。

双非未运算符 在 JavaScript 中，双非位运算符 ~~ 可以用于将数字向下取整，类似于 Math.floor() 方法的功能。

传统写法：

```javascript
const floor = Math.floor(6.8); // 6
```

简化写法：

```javascript
const floor = ~~6.8; // 6
```

注意：双非位运算符只适用于 32 位整数，即范围为 `-(2^31) `到` (2^31)-1`，即 `-2147483648 `到 `2147483647`。对于大于` 2147483647` 或小于`0`的数字，双非位运算符`（~~）`会给出错误的结果，因此建议在这种情况下使用 `Math.floor() `方法。

对象属性 ES6 提供了一种更简洁的方式来给对象赋值属性。如果变量名与对象的键名相同，可以利用简写符号来进行赋值。

传统写法：

```javascript
const name = '前端';
const age = 18;

const person = {
  name: name,
  age: age
};
```

简化写法：

```javascript
const name = '前端';
const age = 30;

const person = {
  name,
  age
};
```

## 箭头函数

箭头函数可以简化经典函数的写法。

传统写法：

```javascript
function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});
```

简化写法：

```javascript
sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));
```

如果箭头函数只有一条语句，它会隐式地返回其求值的结果，这时可以省略 return 关键字：

传统写法：

```javascript
function calcCircumference(diameter) {
  return Math.PI * diameter
}
```

简化写法：

```javascript
calcCircumference = diameter => (
  Math.PI * diameter;
)
```

## 参数解构

如果正在使用一些流行的 Web 框架，比如 React、Vue，可能会使用数组或对象字面量形式的数据来在组件之间传递信息。在组件中要想使用数据对象，就需要对其进行解构。

传统写法：

```javascript
 
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;
```

简化写法：

```javascript
import { observable, action, runInAction } from 'mobx';

const { store, form, loading, errors, entity } = this.props;
```

还可以为变量赋予新的变量名：

```javascript
const { store, form, loading, errors, entity:contact } = this.props;
```

## 扩展运算符

在ES6中引入的扩展运算符可以简化数组和对象的一些操作。

传统写法：

```javascript
 
// 合并数组
const odd = [1, 3, 5];
const nums = [2, 4, 6].concat(odd);
// 克隆数组
const arr = [1, 2, 3, 4];
const arr2 = arr.slice();
```

简化写法：

```javascript
 
// 合并数组
const odd = [1, 3, 5];
const nums = [2, 4, 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
// 克隆数组
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
```

与 concat() 函数不同，可以使用扩展运算符在另一个数组的任意位置插入一个数组。

```javascript
const odd = [1, 3, 5];
const nums = [2, ...odd, 4, 6];
```

还可以将扩展运算符与ES6的解构语法结合使用：

```javascript
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }
```

扩展运算符还能用于合并对象：

传统写法：

```javascript
let fname = { firstName : '前端' };
let lname = { lastName : '你好'}
let full_names = Object.assign(fname, lname);
```

简化写法：

```javascript
let full_names = {...fname, ...lname};
```

## 强制参数

在传统的 JavaScript 写法中，为了确保函数参数被传入一个有效值，我们需要使用条件语句来抛出一个错误。可以通过使用强制参数简写的写法实现相同的逻辑。

传统写法：

```javascript
function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}
```

简化写法：

```javascript
mandatory = () => {
  throw new Error('Missing parameter!');
}

foo = (bar = mandatory()) => {
  return bar;
}
```

这里定义了一个名为 mandatory 的函数，用于抛出一个错误，表示函数参数未被传入。然后，在函数 foo 的参数列表中，使用赋默认值的方式来将 bar 参数设置为 mandatory() 的调用结果，如果 bar 参数未被传入或者传入了假值，就会触发 mandatory() 函数的执行。

## 转为布尔值

可以使用双重逻辑非操作符将任何值转换为布尔值。

```javascript
!!23 // TRUE
!!"" // FALSE
!!0 // FALSE
!!{} // TRUE
```

单一的逻辑非操作符已经可以将值转换为布尔类型并对其进行取反，所以第二个逻辑非操作符会再次对其进行取反，从而将其恢复为原始含义，并保持为布尔类型。

## 变量交换

可以使用数组解构来轻松实现变量交换。

传统写法（使用临时变量完成两个变量的交换）：

```javascript
let a = 5;
let b = 10;

const temp = a;
a = b;
b = temp;
```

简化写法（使用数组解构赋值完成两个变量交换）：

```javascript
let a = 5;
let b = 10;

[a, b] = [b, a];
```

这里创建了一个包含两个元素的数组 [b, a]，然后使用数组解构赋值将其中的值分别赋给变量 a 和 b。由于左侧的数组和右侧的数组结构相同，所以两个值会进行交换。

## 变量声明

当需要同时声明多个变量时，可以使用变量声明的简写方法来节省时间和空间。

传统写法：

```javascript
let x;
let y;
let z = 3;
```

简化写法：

```javascript
let x, y, z = 3;
```

不过，这个优化有些争议，很多人认为这么写会影响代码的可读性，因为许多变量写到了一行，不如一个变量一行更清晰明了，所以可以选择性采用。

如果有多个变量需要赋相同的值，则可以使用连等来实现。

传统写法：

```javascript
 
let a = 100;
let b = 100;
let c = 100;
```

简化写法：

```javascript
let a = b = c = 100;
```

## For 循环

JavaScript 中传统的 for 循环语法使用数组的长度作为迭代器来遍历数组。还有很多 for 循环的快捷方式提供了在数组中迭代对象的不同方法，例如：

```javascript
for...of：用于遍历内置字符串、数组、类数组对象、NodeList。

for...in：用于访问数组的索引和对对象字面量进行遍历，并记录属性名称和值的字符串。
```

## Array.forEach：使用回调函数对数组元素及其索引执行操作。

传统写法：

```javascript
for (let i = 0; i < arr.length; i++) {
  console.log("item: ", arr[i]);}
}
```

简化写法：

```javascript
for (let str of arr) {
  console.log("item: ", str);
}

arr.forEach((str) => {
  console.log("item: ", str);
});

for (let index in arr) {
  console.log(index, arr[index]);
}

// 对于对象字面量，也可以使用 for...in 来遍历:

 
const obj = { a: 1, b: 3, c: 5 };

for (let key in obj) {
  console.log(key, obj[key]);
}
```

## 参数默认值

```javascript
// 传统写法
function greeting(name) {
  name = name || 'Guest';
  console.log('Hello, ' + name + '!');
}

// 使用默认值
function greeting(name = 'Guest') {
  console.log('Hello, ' + name + '!');
}
```

## 箭头函数

```javascript
var sum = function(a, b) {
  return a + b;
}

// 使用箭头函数
const sum = (a, b) => a + b;
```

## 模板字符串

```javascript
// 传统写法
var name = 'Alice';
console.log('Hello, ' + name + '!');

// 使用模板字符串
const name = 'Alice';
console.log(`Hello, ${name}!`);
```

## 对象字面量简写

```javascript
// 传统写法
var firstName = 'John';
var lastName = 'Doe';
var user = {
  firstName: firstName,
  lastName: lastName
};

// 使用简写
const firstName = 'John';
const lastName = 'Doe';
const user = { firstName, lastName };
```

## 解构赋值

```javascript
// 传统写法
var user = {
  firstName: 'John',
  lastName: 'Doe'
};
var firstName = user.firstName;
var lastName = user.lastName;

// 使用解构赋值
const user = {
  firstName: 'John',
  lastName: 'Doe'
};
const { firstName, lastName } = user;
```

## Array.prototype.map()

```javascript
// 传统写法
var numbers = [1, 2, 3];
var doubledNumbers = [];
for (var i = 0; i < numbers.length; i++) {
  doubledNumbers.push(numbers[i] * 2);
}

// 使用map()
const numbers = [1, 2, 3];
const doubledNumbers = numbers.map(number => number * 2);
```

## Array.prototype.filter()

```javascript
// 传统写法
var numbers = [1, 2, 3, 4, 5];
var evenNumbers = [];
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}

// 使用filter()
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(number => number % 2 === 0);
```

## Array.prototype.reduce()

```javascript
// 传统写法
var numbers = [1, 2, 3, 4, 5];
var sum = 0;
for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

// 使用reduce()
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, number) => total + number, 0);
```

## 避免使用全局变量

全局变量会导致变量名冲突和意外的赋值，最好避免使用。可以将需要的变量定义在函数内部或使用模块化的方式管理变量。

```javascript
// 不推荐使用全局变量
const name = '张三';
function getName() {
  return name;
}

// 推荐使用函数内部变量
function getName() {
  const name = '张三';
  return name;
}

// 推荐使用模块化
// moduleA.js
export const name = '张三';
// moduleB.js
import { name } from './moduleA.js';
```

## 使用数组和对象解构

解构可以让代码更加简洁，同时提高可读性。

```javascript
// 数组解构
const arr = [1, 2, 3];
const [first, second, third] = arr;

// 对象解构
const obj = { name: '张三', age: 18 };
const { name, age } = obj;
```

## 使用函数式编程思想

函数式编程思想可以让代码更加简洁，同时提高可维护性。可以使用纯函数、高阶函数、柯里化等方式。

```js
// 纯函数
function add(a, b) {
  return a + b;
}

// 高阶函数
function double(fn) {
  return function(num) {
    return fn(num) * 2;
  }
}

// 柯里化
function add(a) {
  return function(b) {
    return a + b;
  }
}
```

## 动态加载JS文件

在一些特殊的场景下，特别是一些库和框架的开发中，我们有时会去动态的加载JS文件并执行，下面是利用Promise进行了简单的封装。

```javascript
function loadJS(files, done) {
  // 获取head标签
  const head = document.getElementsByTagName('head')[0];
  Promise.all(files.map(file => {
    return new Promise(resolve => {
      // 创建script标签并添加到head
      const s = document.createElement('script');
      s.type = "text/javascript";
      s.async = true;
      s.src = file;
      // 监听load事件，如果加载完成则resolve
      s.addEventListener('load', (e) => resolve(), false);
      head.appendChild(s);
    });
  })).then(done);  // 所有均完成，执行用户的回调事件
}

loadJS(["test1.js", "test2.js"], () => {
  // 用户的回调逻辑
});
```

上面代码核心有两点，一是利用Promise处理异步的逻辑，二是利用script标签进行js的加载并执行。

## 实现模板引擎

下面示例用了极少的代码实现了动态的模板渲染引擎，不仅支持普通的动态变量的替换，还支持包含for循环，if判断等的动态的JS语法逻辑，具体实现逻辑在我的另外一篇文章做了非常详详尽的说明，感兴趣的小伙伴戳此链接[【造轮子系列】面试官问：你能手写一个模板引擎吗？](https://juejin.cn/post/7207697872706486328)

```javascript
// 这是包含了js代码的动态模板
var template = 
'My avorite sports:' + 
'<%if(this.showSports) {%>' +
    '<% for(var index in this.sports) {   %>' + 
    '<a><%this.sports[index]%></a>' +
    '<%}%>' +
'<%} else {%>' +
    '<p>none</p>' +
'<%}%>';
// 这是我们要拼接的函数字符串
const code = `with(obj) {
  var r=[];
  r.push("My avorite sports:");
  if(this.showSports) {
    for(var index in this.sports) {   
      r.push("<a>");
      r.push(this.sports[index]);
      r.push("</a>");
    }
  } else {
    r.push("<span>none</span>");
  }
  return r.join("");
}`
// 动态渲染的数据
const options = {
  sports: ["swimming", "basketball", "football"],
  showSports: true
}
// 构建可行的函数并传入参数，改变函数执行时this的指向
result = new Function("obj", code).apply(options, [options]);
console.log(result);
```

## 利用reduce进行数据结构的转换

有时候前端需要对后端传来的数据进行转换，以适配前端的业务逻辑，或者对组件的数据格式进行转换再传给后端进行处理，而reduce是一个非常强大的工具。

```javascript
const arr = [
    { classId: "1", name: "张三", age: 16 },
    { classId: "1", name: "李四", age: 15 },
    { classId: "2", name: "王五", age: 16 },
    { classId: "3", name: "赵六", age: 15 },
    { classId: "2", name: "孔七", age: 16 }
]; 

groupArrayByKey(arr, "classId"); 

function groupArrayByKey(arr = [], key) {
    return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {})
}
```

很多很复杂的逻辑如果用reduce去处理，都非常的简洁。

## 添加默认值

有时候一个方法需要用户传入一个参数，通常情况下我们有两种处理方式，如果用户不传，我们通常会给一个默认值，亦或是用户必须要传一个参数，不传直接抛错。

```javascript
function double() {
    return value *2
}

// 不传的话给一个默认值0
function double(value = 0) {
    return value * 2
}

// 用户必须要传一个参数，不传参数就抛出一个错误

const required = () => {
    throw new Error("This function requires one parameter.")
}
function double(value = required()) {
    return value * 2
}

double(3) // 6
double() // throw Error
```

## 函数只执行一次

有些情况下我们有一些特殊的场景，某一个函数只允许执行一次，或者绑定的某一个方法只允许执行一次。

```javascript
export function once (fn) {
  // 利用闭包判断函数是否执行过
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

## 实现Curring

JavaScript的柯里化是指将接受多个参数的函数转换为一系列只接受一个参数的函数的过程。这样可以更加灵活地使用函数，减少重复代码，并增加代码的可读性。

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(x, y) {
  return x + y;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)); // 输出 3
console.log(curriedAdd(1, 2)); // 输出 3
```

通过柯里化，我们可以将一些常见的功能模块化，例如验证、缓存等等。这样可以提高代码的可维护性和可读性，减少出错的机会。

## 实现单例模式

JavaScript的单例模式是一种常用的设计模式，它可以确保一个类只有一个实例，并提供对该实例的全局访问点，在JS中有广泛的应用场景，如购物车，缓存对象，全局的状态管理等等。

```javascript
let cache;
class A {
  // ...
}

function getInstance() {
  if (cache) return cache;
  return cache = new A();
}

const x = getInstance();
const y = getInstance();

console.log(x === y); // true
```

## 实现CommonJs规范

CommonJS规范的核心思想是将每个文件都看作一个模块，每个模块都有自己的作用域，其中的变量、函数和对象都是私有的，不能被外部访问。要访问模块中的数据，必须通过导出（exports）和导入（require）的方式。

```javascript
// id：完整的文件名
const path = require('path');
const fs = require('fs');
function Module(id){
    // 用来唯一标识模块
    this.id = id; 
    // 用来导出模块的属性和方法
    this.exports = {}; 
}

function myRequire(filePath) {
    // 直接调用Module的静态方法进行文件的加载
    return Module._load(filePath);
}

Module._cache = {};
Module._load = function(filePath) {
    // 首先通过用户传入的filePath寻址文件的绝对路径
    // 因为再CommnJS中，模块的唯一标识是文件的绝对路径
    const realPath = Module._resoleveFilename(filePath);
    // 缓存优先，如果缓存中存在即直接返回模块的exports属性
    let cacheModule = Module._cache[realPath];
    if(cacheModule) return cacheModule.exports;
    // 如果第一次加载，需要new一个模块，参数是文件的绝对路径
    let module = new Module(realPath);
    // 调用模块的load方法去编译模块
    module.load(realPath);
    return module.exports;
}

// node文件暂不讨论
Module._extensions = {
   // 对js文件处理
  ".js": handleJS,
  // 对json文件处理
  ".json": handleJSON
}

function handleJSON(module) {
 // 如果是json文件，直接用fs.readFileSync进行读取，
 // 然后用JSON.parse进行转化，直接返回即可
  const json = fs.readFileSync(module.id, 'utf-8')
  module.exports = JSON.parse(json)
}

function handleJS(module) {
  const js = fs.readFileSync(module.id, 'utf-8')
  let fn = new Function('exports', 'myRequire', 'module', '__filename', '__dirname', js)
  let exports = module.exports;
  // 组装后的函数直接执行即可
  fn.call(exports, exports, myRequire, module,module.id,path.dirname(module.id))
}

Module._resolveFilename = function (filePath) {
  // 拼接绝对路径，然后去查找，存在即返回
  let absPath = path.resolve(__dirname, filePath);
  let exists = fs.existsSync(absPath);
  if (exists) return absPath;
  // 如果不存在，依次拼接.js,.json,.node进行尝试
  let keys = Object.keys(Module._extensions);
  for (let i = 0; i < keys.length; i++) {
    let currentPath = absPath + keys[i];
    if (fs.existsSync(currentPath)) return currentPath;
  }
};

Module.prototype.load = function(realPath) {
  // 获取文件扩展名，交由相对应的方法进行处理
  let extname = path.extname(realPath)
  Module._extensions[extname](this)
}
```

上面对CommonJs规范进行了简单的实现，核心解决了作用域的隔离，并提供了Myrequire方法进行方法和属性的加载，对于上面的实现，我专门有一篇文章进行了详细的说明，感兴趣的小伙伴戳此链接： [【造轮子系列】38行代码带你实现CommonJS规范](https://juejin.cn/post/7212503883263787064)

## 递归获取对象属性

如果让我挑选一个用的最广泛的设计模式，我会选观察者模式，如果让我挑一个我所遇到的最多的算法思维，那肯定是递归，递归通过将原始问题分割为结构相同的子问题，然后依次解决这些子问题，组合子问题的结果最终获得原问题的答案。

```javascript
const user = {
  info: {
    name: "张三",
    address: { home: "Shaanxi", company: "Xian" },
  },
};

// obj是获取属性的对象，path是路径，fallback是默认值
function get(obj, path, fallback) {
  const parts = path.split(".");
  const key = parts.shift();
  if (typeof obj[key] !== "undefined") {
    return parts.length > 0 ?
      get(obj[key], parts.join("."), fallback) :
      obj[key];
  }
  // 如果没有找到key返回fallback
  return fallback;
}

console.log(get(user, "info.name")); // 张三
console.log(get(user, "info.address.home")); // Shaanxi
console.log(get(user, "info.address.company")); // Xian
console.log(get(user, "info.address.abc", "fallback")); // fallback
```

## 实用的Set、Map使用技巧

Set是一种类似于数组的数据结构，但是它的值是唯一的，即Set中的每个值只会出现一次。Set对象的实例可以用于存储任何类型的唯一值，从而使它们非常适用于去重。

Map是一种键值对集合，其中每个键都是唯一的，可以是任何类型，而值则可以是任何类型。Map对象的实例可以用于存储复杂的对象，并且可以根据键进行快速的查找和访问。

以下是Set和Map的一些常用方法：

Set:

- new Set(): 创建一个新的Set对象
- add(value): 向Set对象中添加一个新的值
- delete(value): 从Set对象中删除一个值
- has(value): 检查Set对象中是否存在指定的值
- size: 获取Set对象中的值的数量
- clear(): 从Set对象中删除所有值

Map:

- new Map(): 创建一个新的Map对象
- set(key, value): 向Map对象中添加一个键值对
- get(key): 根据键获取Map对象中的值
- delete(key): 从Map对象中删除一个键值对
- has(key): 检查Map对象中是否存在指定的键
- size: 获取Map对象中的键值对数量
- clear(): 从Map对象中删除所有键值对

Set和Map是非常有用的数据结构，它们可以提高程序的性能和可读性，并且可以简化代码的编写。

### Set

#### 去重

使用 Set 可以轻松地进行数组去重操作，因为 Set 只能存储唯一的值。

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

#### 数组转换

可以使用 Set 将数组转换为不包含重复元素的 Set 对象，再使用 Array.from() 将其转换回数组。

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];
const set = new Set(arr);
const uniqueArr = Array.from(set);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

#### 优化数据查找

使用 Set 存储数据时，查找操作的时间复杂度为 O(1)，比数组的 O(n) 要快得多，因此可以使用 Set 来优化数据查找的效率。

```js
const dataSet = new Set([1, 2, 3, 4, 5]);

if (dataSet.has(3)) {
  console.log('数据已经存在');
} else {
  console.log('数据不存在');
}
```

#### 并集、交集、差集

Set数据结构可以用于计算两个集合的并集、交集和差集。以下是一些使用Set进行集合运算的示例代码：

```js
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// 并集
const union = new Set([...setA, ...setB]);
console.log(union); // Set {1, 2, 3, 4}

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set {2, 3}

// 差集
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set {1}
```

#### 模糊搜索

Set 还可以通过正则表达式实现模糊搜索。可以将匹配结果保存到 Set 中，然后使用 Array.from() 方法将 Set 转换成数组。

```javascript
const data = ['apple', 'banana', 'pear', 'orange'];

// 搜索以 "a" 开头的水果
const result = Array.from(new Set(data.filter(item => /^a/i.test(item))));
console.log(result); // ["apple"]
```

#### 使用 Set 替代数组实现队列和栈

可以使用 Set 来模拟队列和栈的数据结构。

```js
// 使用 Set 实现队列
const queue = new Set();
queue.add(1);
queue.add(2);
queue.add(3);
queue.delete(queue.values().next().value); // 删除第一个元素
console.log(queue); // Set(2) { 2, 3 }

// 使用 Set 实现栈
const stack = new Set();
stack.add(1);
stack.add(2);
stack.add(3);
stack.delete([...stack][stack.size - 1]); // 删除最后一个元素
console.log(stack); // Set(2) { 1, 2 }
```

### Map

#### 将 Map 转换为对象

```js
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const obj = Object.fromEntries(map);
```

#### 将 Map 转换为数组

```js
const map = new Map().set('key1', 'value1').set('key2', 'value2');
const array = Array.from(map);
```

#### 记录数据的顺序

如果你需要记录添加元素的顺序，那么可以使用`Map`来解决这个问题。当你需要按照添加顺序迭代元素时，可以使用`Map`来保持元素的顺序。

```javascript
const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
map.set('d', 4);

for (const [key, value] of map) {
  console.log(key, value);
}
// Output: a 1, b 2, c 3, d 4
```

#### 统计数组中元素出现次数

可以使用 Map 统计数组中每个元素出现的次数。

```javascript
const arr = [1, 2, 3, 1, 2, 4, 5];

const countMap = new Map();
arr.forEach(item => {
  countMap.set(item, (countMap.get(item) || 0) + 1);
});

console.log(countMap.get(1)); // 2
console.log(countMap.get(2)); // 2
console.log(countMap.get(3)); // 1
```

#### 统计字符出现次数

使用Map数据结构可以方便地统计字符串中每个字符出现的次数。

```javascript
const str = 'hello world';
const charCountMap = new Map();
for (let char of str) {
  charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
}
console.log(charCountMap); // Map { 'h' => 1, 'e' => 1, 'l' => 3, 'o' => 2, ' ' => 1, 'w' => 1, 'r' => 1, 'd' => 1 }
```

#### 缓存计算结果

在处理复杂的计算时，可能需要对中间结果进行缓存以提高性能。可以使用Map数据结构缓存计算结果，以避免重复计算。

```javascript
const cache = new Map();
function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  if (cache.has(n)) {
    return cache.get(n);
  }
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, result);
  return result;
}
console.log(fibonacci(10)); // 55
```

#### 使用 Map 进行数据的分组

```javascript
const students = [
  { name: "Tom", grade: "A" },
  { name: "Jerry", grade: "B" },
  { name: "Kate", grade: "A" },
  { name: "Mike", grade: "C" },
];

const gradeMap = new Map();
students.forEach((student) => {
  const grade = student.grade;
  if (!gradeMap.has(grade)) {
    gradeMap.set(grade, [student]);
  } else {
    gradeMap.get(grade).push(student);
  }
});

console.log(gradeMap.get("A")); // [{ name: "Tom", grade: "A" }, { name: "Kate", grade: "A" }]
```

#### 使用 Map 过滤符合条件的对象

在实际开发中，我们常常需要在一个对象数组中查找符合某些条件的对象。此时，我们可以结合使用 Map 和 filter 方法来实现。比如：

```javascript
const users = [
  { name: 'Alice', age: 22 },
  { name: 'Bob', age: 18 },
  { name: 'Charlie', age: 25 }
];
const userMap = new Map(users.map(user => [user.name, user]));
const result = users.filter(user => userMap.has(user.name) && user.age > 20);
console.log(result); // [{ name: 'Alice', age: 22 }, { name: 'Charlie', age: 25 }]
```

首先，我们将对象数组转换为 Map，以便快速查找。然后，我们使用 filter 方法来过滤符合条件的对象。

