# JavaScript 面向对象编程

## 一、面向对象介绍

### 什么是对象

> Everything is object （万物皆对象）

对象到底是什么，我们可以从两次层次来理解。

**(1) 对象是单个事物的抽象。**

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**(2) 对象是一个容器，封装了属性（property）和方法（method）。**

属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为 animal 对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

在实际开发中，对象是一个抽象的概念，可以将其简单理解为：**数据集或功能集**。

ECMAScript-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。
严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都
映射到一个值。

提示：每个对象都是基于一个引用类型创建的，这些类型可以是系统内置的原生类型，也可以是开发人员自定义的类型。

### 什么是面向对象

> 面向对象不是新的东西，它只是过程式代码的一种高度封装，目的在于提高代码的开发效率和可维护性。

面向对象编程 —— Object Oriented Programming，简称 OOP ，是一种编程开发思想。
它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。
因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程（procedural programming），更适合多人合作的大型软件项目。

面向对象与面向过程：

- 面向过程就是亲力亲为，事无巨细，面面俱到，步步紧跟，有条不紊
- 面向对象就是找一个对象，指挥得结果
- 面向对象将执行者转变成指挥者
- 面向对象不是面向过程的替代，而是面向过程的封装

面向对象的特性：

- 封装性
- 继承性
- [多态性]

扩展阅读：

- [维基百科 - 面向对象程序设计](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)
- [知乎：如何用一句话说明什么是面向对象思想？](https://www.zhihu.com/question/19854505)
- [知乎：什么是面向对象编程思想？](https://www.zhihu.com/question/31021366)

---

### 程序中面向对象的基本体现

在 JavaScript 中，所有数据类型都可以视为对象，当然也可以自定义对象。
自定义的对象数据类型就是面向对象中的类（ Class ）的概念。

我们以一个例子来说明面向过程和面向对象在程序流程上的不同之处。

假设我们要处理学生的成绩表，为了表示一个学生的成绩，面向过程的程序可以用一个对象表示：

```javascript
var std1 = { name: "Michael", score: 98 };
var std2 = { name: "Bob", score: 81 };
```

而处理学生成绩可以通过函数实现，比如打印学生的成绩：

```javascript
function printScore(student) {
	console.log("姓名：" + student.name + "  " + "成绩：" + student.score);
}
```

如果采用面向对象的程序设计思想，我们首选思考的不是程序的执行流程，
而是 `Student` 这种数据类型应该被视为一个对象，这个对象拥有 `name` 和 `score` 这两个属性（Property）。
如果要打印一个学生的成绩，首先必须创建出这个学生对应的对象，然后，给对象发一个 `printScore` 消息，让对象自己把自己的数据打印出来。

抽象数据行为模板（Class）：

```javascript
function Student(name, score) {
	this.name = name;
	this.score = score;
}

Student.prototype.printScore = function () {
	console.log("姓名：" + this.name + "  " + "成绩：" + this.score);
};
```

根据模板创建具体实例对象（Instance）：

```javascript
var std1 = new Student("Michael", 98);
var std2 = new Student("Bob", 81);
```

实例对象具有自己的具体行为（给对象发消息）：

```javascript
std1.printScore(); // => 姓名：Michael  成绩：98
std2.printScore(); // => 姓名：Bob  成绩 81
```

面向对象的设计思想是从自然界中来的，因为在自然界中，类（Class）和实例（Instance）的概念是很自然的。
Class 是一种抽象概念，比如我们定义的 Class——Student ，是指学生这个概念，
而实例（Instance）则是一个个具体的 Student ，比如， Michael 和 Bob 是两个具体的 Student 。

所以，面向对象的设计思想是：

- 抽象出 Class
- 根据 Class 创建 Instance
- 指挥 Instance 得结果

面向对象的抽象程度又比函数要高，因为一个 Class 既包含数据，又包含操作数据的方法。

## 二、创建对象的三种方式

### 1.简单方式：构造函数创建

我们可以直接通过 `new Object()` 创建：

```javascript
var person = new Object();
person.name = "Jack";
person.age = 18;

person.sayName = function () {
	console.log(this.name);
};
```

### 2.简单方式：使用对象字面量来创建

```javascript
var person = {
	name: "Jack",
	age: 18,
	sayName: function () {
		console.log(this.name);
	},
};
```

生成两个 `person` 实例对象

```javascript
var person1 = {
	name: "Jack",
	age: 18,
	sayName: function () {
		console.log(this.name);
	},
};

var person2 = {
	name: "Mike",
	age: 16,
	sayName: function () {
		console.log(this.name);
	},
};
```

通过上面的代码我们不难看出，这样写的代码太过冗余，重复性太高。

### 3.简单方式的改进：工厂函数（自定义构造函数），三种写法

#### 1.我们可以写一个函数，解决代码重复问题

```javascript
function createPerson(name, age) {
	return {
		name: name,
		age: age,
		sayName: function () {
			console.log(this.name);
		},
	};
}
```

然后生成实例对象：

```javascript
var p1 = createPerson("Jack", 18);
var p2 = createPerson("Mike", 18);
```

#### 2.封装系统钩子函数`new Object()`

工厂模式:

- 函数名是小写
- 有 new,
- 有返回值
- new 之后的对象是当前的对象
- 直接调用函数就可以创建对象

```js
function createObject(name, age) {
	var obj = new Object();
	obj.name = name;
	obj.age = age;
	obj.sayHi = function () {
		console.log("您好");
	};
	return obj;
}
```

调用工厂函数：

```js
var per = createObject("小明", 20);
```

#### 3.封装字面量的自定义构造函数

自定义构造函数:

- 函数名是大写(首字母)
- 没有 new
- 没有返回值
- this 是当前的对象
- 通过 new 的方式来创建对象

```js
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.sayHi = function () {
		console.log("您好");
	};
}
```

实例化构造函数：

```js
var per1 = new Person("小红", 20);
```

---

这样封装确实爽多了，通过工厂模式我们解决了创建多个相似对象代码冗余的问题，但却**没有解决对象识别的问题（即怎样知道一个对象的类型）**。

## 三、自定义构造函数

内容引导：

- 构造函数语法
- 分析构造函数
- 构造函数和实例对象的关系
  - 实例的 constructor 属性
  - instanceof 操作符
- 普通函数调用和构造函数调用的区别
- 构造函数的返回值
- 构造函数的静态成员和实例成员
  - 函数也是对象
  - 实例成员
  - 静态成员
- 构造函数的问题

### 更优雅的工厂函数：构造函数

一种更优雅的工厂函数就是下面这样，构造函数：

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.sayName = function () {
		console.log(this.name);
	};
}

var p1 = new Person("Jack", 18);
p1.sayName(); // => Jack

var p2 = new Person("Mike", 23);
p2.sayName(); // => Mike
```

### 解析构造函数代码的执行

在上面的示例中，`Person()` 函数取代了 `createPerson()` 函数，但是实现效果是一样的。
这是为什么呢？

我们注意到，`Person()` 中的代码与 `createPerson()` 有以下几点不同之处：

- 没有显示的创建对象
- 直接将属性和方法赋给了 `this` 对象
- 没有 `return` 语句
- 函数名使用的是大写的 `Person`

而要创建 `Person` 实例，则必须使用 `new` 操作符。
以这种方式调用构造函数会经历以下 4 个步骤：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码
4. 返回新对象

下面是具体的伪代码：

```javascript
function Person(name, age) {
	// 当使用 new 操作符调用 Person() 的时候，实际上这里会先创建一个对象
	// var instance = {}
	// 然后让内部的 this 指向 instance 对象
	// this = instance
	// 接下来所有针对 this 的操作实际上操作的就是 instance

	this.name = name;
	this.age = age;
	this.sayName = function () {
		console.log(this.name);
	};

	// 在函数的结尾处会将 this 返回，也就是 instance
	// return this
}
```

### 构造函数和实例对象的关系

使用构造函数的好处不仅仅在于代码的简洁性，更重要的是我们可以识别对象的具体类型了。
在每一个实例对象中的**proto**中同时有一个 `constructor` 属性，该属性指向创建该实例的构造函数：

```javascript
console.log(p1.constructor === Person); // => true
console.log(p2.constructor === Person); // => true
console.log(p1.constructor === p2.constructor); // => true
```

对象的 `constructor` 属性最初是用来标识对象类型的，
但是，如果要检测对象的类型，还是使用 `instanceof` 操作符更可靠一些：

```javascript
console.log(p1 instanceof Person); // => true
console.log(p2 instanceof Person); // => true
```

#### 完整演示

```js
// 自定义构造函数----->实例化对象
function Person(name, age, sex) {
	this.name = name;
	this.age = age;
	this.sex = sex;
	this.eat = function () {
		console.log("吃大蒜拌臭豆腐加榴莲酱");
	};
}
// 构造函数---->创建对象
var per = new Person("小苏", 38, "女");
// per.eat();//吃
// 实例对象是通过构造函数来创建
// 实例对象会指向自己的构造函数(暂时理解,是错误的)
// 把这个对象的结构显示出来
console.dir(per);
console.dir(Person);

// 实例对象的构造器(构造函数)
// 实例对象的构造器是指向Person的,结果是true,所以,这个实例对象per就是通过Person来创建的
console.log(per.constructor == Person); //

console.log(per.__proto__.constructor == Person);
console.log(per.__proto__.constructor == Person.prototype.constructor);

// 构造函数
function Animal(name) {
	this.name = name;
}
// 实例对象
var dog = new Animal("大黄");
console.dir(dog); // 实例对象
console.dir(Animal); // 构造函数的名字

console.log(dog.__proto__.constructor == Person);
console.log(dog.__proto__.constructor == Animal);

// 判断这个对象是不是这种数据类型
console.log(dog.constructor == Animal);

console.log(dog instanceof Person);
```

#### 实例对象跟构造函数的关系总结

- 1.构造函数是根据具体的事物抽象出来的抽象模板
- 2.实例对象是根据抽象的构造函数模板得到的具体实例对象
  - 实例对象是通过构造函数来创建的---创建的过程叫实例化
- 3.每一个实例对象都具有一个 `constructor` 属性，指向创建该实例的构造函数
  - 注意： `constructor` 是实例的属性的说法不严谨，具体后面的原型会讲到
- 4.可以通过实例的 `constructor` 属性判断实例和构造函数之间的关系
  - 注意：这种方式不严谨，推荐使用 `instanceof` 操作符（判断对象是不是这个数据类型），后面学原型会解释为什么

### 构造函数的问题（缺点）

1.使用构造函数带来的最大的好处就是创建对象更方便了，但是其本身也存在一个**浪费内存**的问题：

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.type = "human";
	this.sayHello = function () {
		console.log("hello " + this.name);
	};
}

var p1 = new Person("lpz", 18);
var p2 = new Person("Jack", 16);
```

在该示例中，从表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。

> 那就是对于每一个实例对象，`type` 和 `sayHello` 都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存，如果实例对象很多，会造成极大的内存浪费。

```javascript
console.log(p1.sayHello === p2.sayHello); // => false
```

对于这种问题我们可以**把需要共享的函数定义到构造函数外部**：

```javascript
function sayHello = function () {
  console.log('hello ' + this.name)
}

function Person (name, age) {
  this.name = name
  this.age = age
  this.type = 'human'
  this.sayHello = sayHello
}

var p1 = new Person('lpz', 18)
var p2 = new Person('Jack', 16)

console.log(p1.sayHello === p2.sayHello) // => true
```

这样确实可以了。

2.但是如果有多个需要共享的函数的话就会**造成全局命名空间冲突**的问题。

你肯定想到了可以把多个函数放到一个对象中用来避免全局命名空间冲突的问题：

```javascript
var fns = {
	sayHello: function () {
		console.log("hello " + this.name);
	},
	sayAge: function () {
		console.log(this.age);
	},
};

function Person(name, age) {
	this.name = name;
	this.age = age;
	this.type = "human";
	this.sayHello = fns.sayHello;
	this.sayAge = fns.sayAge;
}

var p1 = new Person("lpz", 18);
var p2 = new Person("Jack", 16);

console.log(p1.sayHello === p2.sayHello); // => true
console.log(p1.sayAge === p2.sayAge); // => true
```

至此，我们利用自己的方式基本上解决了构造函数的内存浪费问题。

但是代码看起来还是那么的格格不入，那有没有更好的方式呢？就是使用**原型**

## 四、原型

### 上面 内存浪费 更好的解决方案：构造函数的 `prototype`属性

> 通过原型来添加方法，实现数据共享，节省内存空间

Javascript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。
这个对象的所有属性和方法，都会被构造函数的实例继承。

这也就意味着，我们可以把所有对象实例需要共享的属性和方法直接定义在 `prototype` 对象上。

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}
// 通过原型来添加方法，解决数据共享，节省内存空间
Person.prototype.eat = function () {
	console.log("吃凉菜");
};

var p1 = new Person("小明", 20);
var p2 = new Person("小红", 30);
console.log(p1.eat == p2.eat); // true

console.dir(p1);
console.dir(p2);
```

这时所有实例的 `type` 属性和 `sayName()` 方法，
其实都是同一个内存地址

### 构造函数、实例、原型三者之间的关系

构造函数 Person 有属性：`Person.prototype`

构造函数 Person 实例化 new Person() 得到 Person 实例对象

Person 实例对象`per` (Object)有 `__proto__`属性：`per.__proto__`

`__proto__`是 Object 上的一个属性

对象的 `__proto__` 保存着该对象的构造函数的 `prototype` 属性

![构造函数-实例-原型之间的关系](./img/构造函数-实例-原型之间的关系.png)

任何函数都具有一个 `prototype` 属性，叫原型，该属性是一个对象。

```javascript
function F() {}
console.log(F.prototype); // => object

F.prototype.sayHi = function () {
	console.log("hi!");
};
```

构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数。

```javascript
console.log(F.constructor === F); // => true
```

通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`。

实例对象的`__proto__`和构造函数中的`prototype`是相等的--->true

```javascript
var instance = new F();
console.log(instance.__proto__ === F.prototype); // => true
```

`__proto__` 也可以叫原型对象，也是一个对象，这个属性是给浏览器使用，不是标准的属性。

实例对象可以直接访问原型对象成员。

```javascript
instance.sayHi(); // => hi!
```

#### 小结

- 对象实例化输出后，在浏览器会生成属性，`__proto__`，也是对象，原型

- 在代码中构造函数中有一个属性，`prototype`，也是对象，原型

- 上面两个对象是相等的：上面的代码结合

  - ```js
    function F() {}
    console.log(F.prototype); // => object

    F.prototype.sayHi = function () {
    	console.log("hi!");
    };

    var instance = new F();
    console.log(instance.__proto__ === F.prototype); // => true

    instance.sayHi(); // => hi!
    ```

> 程序员写代码要使用：构造函数的实例的`prototype`原型对象属性 --> 原型对象`prototype`指向原型对象构造器`constructor` --> `constructor` 原型对象构造器再指向实例的构造函数（指向的都是相等==为 true）

### 原型关系总结

- 任何函数都具有一个 `prototype` 属性，该属性是一个对象
- 构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数
- 通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`
- 所有实例都直接或间接继承了原型对象的成员
  - **实例对象**中有个属性，`__proto__`，也是对象，原型
  - **构造函数**中有一个属性，`prototype`，也是对象，原型
- 通过原型来添加方法，解决数据共享，节省内存空间

---

### 属性成员的搜索原则：原型链

![关系.png](.\img\关系.png)

了解了 **构造函数-实例-原型对象** 三者之间的关系后，接下来我们来解释一下为什么实例对象可以访问原型对象中的成员。

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性

- 搜索首先从对象实例本身开始
- 如果在实例中找到了具有给定名字的属性，则返回该属性的值
- 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
- 如果在原型对象中找到了这个属性，则返回该属性的值

也就是说，在我们调用 `person1.sayName()` 的时候，会先后执行两次搜索：

- 首先，解析器会问：“实例 person1 有 sayName 属性吗？”答：“没有。
- ”然后，它继续搜索，再问：“ person1 的原型有 sayName 属性吗？”答：“有。
- ”于是，它就读取那个保存在原型对象中的函数。
- 当我们调用 person2.sayName() 时，将会重现相同的搜索过程，得到相同的结果。

而这正是多个对象实例共享原型所保存的属性和方法的基本原理。

总结：

- 先在自己身上找，找到即返回
- 自己身上找不到，则沿着原型链向上查找，找到即返回
- 如果一直到原型链的末端还没有找到，则返回 `undefined`

### 实例对象读写原型对象成员

读取：

- 先在自己身上找，找到即返回
- 自己身上找不到，则沿着原型链向上查找，找到即返回
- 如果一直到原型链的末端还没有找到，则返回 `undefined`

值类型成员写入（`实例对象.值类型成员 = xx`）：

- 当实例期望重写原型对象中的某个普通数据成员时实际上会把该成员添加到自己身上
- 也就是说该行为实际上会屏蔽掉对原型对象成员的访问

引用类型成员写入（`实例对象.引用类型成员 = xx`）：

- 同上

复杂类型修改（`实例对象.成员.xx = xx`）：

- 同样会先在自己身上找该成员，如果自己身上找到则直接修改
- 如果自己身上找不到，则沿着原型链继续查找，如果找到则修改
- 如果一直到原型链的末端还没有找到该成员，则报错（`实例对象.undefined.xx = xx`）

### 更简单的原型语法

我们注意到，前面例子中每添加一个属性和方法就要敲一遍 `Person.prototype` 。
为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype = {
	type: "human",
	sayHello: function () {
		console.log("我叫" + this.name + "，我今年" + this.age + "岁了");
	},
};
```

在该示例中，我们将 `Person.prototype` 重置到了一个新的对象。
这样做的好处就是为 `Person.prototype` 添加成员简单了，但是也会带来一个问题，那就是原型对象丢失了 `constructor` 成员。

#### 所以，我们为了保持 `constructor` 的指向正确，建议的写法是

```javascript{8}
function Person (name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}

Person.prototype = {
  constructor: Person, // => 需要手动将 constructor 指向正确的构造函数
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}

var person = new Person("段飞", 20, "男");
// 调用
console.log(person.constructor)
console.log(person.type)
person.sayHello()
```

#### 原型中的方法是可以相互访问

```html{15,19}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>title</title>
  <script>
    //原型中的方法,是可以相互访问的
    function Animal(name,age) {
      this.name=name;
      this.age=age;
    }
    //原型中添加方法
    Animal.prototype.eat=function () {
      console.log("动物吃东西");
      this.play();
    };
    Animal.prototype.play=function () {
      console.log("玩球");
      this.sleep();
    };
    Animal.prototype.sleep=function () {
      console.log("睡觉了");
    };

    var dog=new Animal("小苏",20);
    dog.eat();

    //原型对象中的方法,可以相互调用

  </script>
</head>
<body>

</body>
</html>
```

### 原型链：实例对象使用的属性和方法的层层查找搜索

> 实例对象使用的属性或者方法，先在**实例中**查找，找到了则直接使用，找不到则，去**实例对象**的`__proto__`指向的**构造函数**的原型对象`prototype`中找，找到了则使用，找不到则报错

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>title</title>
		<script>
			function Person(age, sex) {
				this.age = age; //年龄
				this.sex = sex;
				this.eat = function () {
					console.log("构造函数中的吃");
				};
			}
			Person.prototype.sex = "女";
			Person.prototype.eat = function () {
				console.log("原型对象中的吃");
			};

			var per = new Person(20, "男");
			console.log(per.sex); // 打印的是："男"
			per.eat();
			console.dir(per);
		</script>
	</head>
	<body></body>
</html>
```

---

### 原生对象的原型扩展

所有函数都有 prototype 属性对象。

- Object.prototype
- Function.prototype
- Array.prototype
- String.prototype
- Number.prototype
- Date.prototype
- ...

#### 练习：为数组对象和字符串对象扩展原型方法

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>为内置对象添加原型方法</title>
		<script>
			// 为内置对象添加原型方法

			//    var arr=new Array(10,20,30,40,50);
			//    arr.join("|");
			//    console.dir(arr);
			//
			//
			//    var str=new String("哦,唛嘎的");
			//    str.indexOf("哦");
			//    console.dir(str);
			//
			//
			//    var dt=new Date();
			//    dt.getFullYear();
			//    console.dir(dt);

			// 实例中的方法如果没有,去创建该实例对象的构造函数的原型对象prototype中找

			// 我们能否为系统的对象的原型中添加方法,相当于在改变源码
			// 我希望字符串中有一个倒序字符串的方法
			String.prototype.myReverse = function () {
				for (var i = this.length - 1; i >= 0; i--) {
					console.log(this[i]);
				}
			};
			var str = "abcdefg";
			str.myReverse();

			// 为Array内置对象的原型对象中添加方法
			Array.prototype.mySort = function () {
				for (var i = 0; i < this.length - 1; i++) {
					for (var j = 0; j < this.length - 1 - i; j++) {
						if (this[j] < this[j + 1]) {
							var temp = this[j];
							this[j] = this[j + 1];
							this[j + 1] = temp;
						} //end if
					} // end for
				} //end for
			};

			var arr = [100, 3, 56, 78, 23, 10];
			arr.mySort();
			console.log(arr);

			String.prototype.sayHi = function () {
				console.log(this + "哈哈,我又变帅了");
			};

			// 字符串就有了打招呼的方法
			var str2 = "小杨";
			str2.sayHi();
		</script>
	</head>
	<body></body>
</html>
```

### 把局部变量变成全局变量

利用立即执行函数，把局部变量给 window 全局变量（立即执行函数的参数形参 传递暴露 数值给 window 全局对象实参）

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>把局部变量变成全局变量</title>
		<script>
			// 函数的自调用---自调用函数

			// 一次性的函数--声明的同时,直接调用了
			(function () {
				console.log("函数");
			})();

			// 页面加载后.这个自调用函数的代码就执行完了
			// (function (形参) {
			//     var num = 10; //局部变量
			// })(实参);
			// console.log(num);

			// *****把局部变量给window全局变量*****
			(function (win) {
				var num = 10; //局部变量
				// js是一门动态类型的语言,对象没有属性,点了就有了
				win.num = num;
			})(window);
			console.log(window.num); // 具体写法
			console.log(num); // 简略写法：window可以省略
		</script>
	</head>
	<body></body>
</html>
```

随机数原型对象赋值案例：贪吃蛇例子准备

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>随机数原型对象赋值全局对象</title>
		<script>
			// 通过自调用函数产生一个随机数对象,在自调用函数外面,调用该随机数对象方法产生随机数
			(function (window) {
				// 产生随机数的构造函数
				function Random() {}
				// 在原型对象中添加方法
				Random.prototype.getRandom = function (min, max) {
					return Math.floor(Math.random() * (max - min) + min);
				};
				// 把Random对象暴露给顶级对象window ---> 外部可以直接使用这个对象
				window.Random = Random;
			})(window);
			// 实例化随机数对象
			var rm = new Random();
			// 调用方法产生随机数
			console.log(rm.getRandom(0, 5));

			// 全局变量
		</script>
	</head>
	<body></body>
</html>
```

---

### 原型对象的问题

- 共享数组
- 共享对象

如果真的希望可以被实例对象之间共享和修改这些共享数据那就不是问题。但是如果不希望实例之间共享和修改这些共享数据则就是问题。

一个更好的建议是，最好不要让实例之间互相共享这些数组或者对象成员，一旦修改的话会导致数据的走向很不明确而且难以维护。

### 原型对象使用建议

- 私有成员（一般就是非函数成员）放到构造函数中
- 共享成员（一般就是函数）放到原型对象中
- 如果重置了 `prototype` 记得修正 `constructor` 的指向

## 五、原型及原型链

演示代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>原型及原型链</title>
		<script>
			//使用对象---->使用对象中的属性和对象中的方法,使用对象就要先有构造函数
			//构造函数
			function Person(name, age) {
				//属性
				this.name = name;
				this.age = age;
				//在构造函数中的方法
				this.eat = function () {
					console.log("吃好吃的");
				};
			}
			//添加共享的属性
			Person.prototype.sex = "男";
			//添加共享的方法
			Person.prototype.sayHi = function () {
				console.log("您好啊,怎么这么帅,就是这么帅");
			};
			//实例化对象,并初始化
			var per = new Person("小明", 20);
			per.sayHi();
			//如果想要使用一些属性和方法,并且属性的值在每个对象中都是一样的,方法在每个对象中的操作也都是一样,那么,为了共享数据,节省内存空间,是可以把属性和方法通过原型的方式进行赋值

			console.dir(per); //实例对象的结构
			console.dir(Person); //构造函数的结构

			//实例对象的原型__proto__和构造函数的原型prototype指向是相同的

			//实例对象中的__proto__原型指向的是构造函数中的原型prototype
			console.log(per.__proto__ == Person.prototype);
			//实例对象中__proto__是原型,浏览器使用的
			//构造函数中的prototype是原型,程序员使用的

			//原型链:是一种关系,实例对象和原型对象之间的关系,关系是通过原型(__proto__)来联系的
		</script>
	</head>
	<body></body>
</html>
```

原型链的关系图解：实例对象和原型对象之间，通过原型`__proto__`联系

![原型及原型链.png](.\img\原型及原型链.png)

#### Function 和 Object 的特殊性

```js
// Function object: 函数 对象，Test是构造函数
console.log(Test.__proto__ === Function.prototype); // true

// const Test = new Function()
console.log(Function.__proto__);
console.log(Function.prototype);
console.log(Function._proto === Function.prototype); // true

// const obj = {};
//const obj = new Object(); // function

console.log(typeof Object);
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.__proto__ === Function.__proto__); // true
```

---

### 原型链指向的改变

原型指向可以改变

- 实例对象的原型**proto**指向的是该对象所在的构造函数的原型对象

- 构造函数的原型对象(prototype)指向如果改变了,实例对象的原型(**proto**)指向也会发生改变

- 实例对象和原型对象之间的关系是通过**proto**原型来联系起来的，这个关系就是**原型链**

```html{39}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>原型链指向的改变</title>
  <script>
    //构造函数中的this就是实例对象
    //原型对象中方法中的this就是实例对象
//    function Person(age) {
//      this.age=age;
//      console.log(this);
//    }
//    Person.prototype.eat=function () {
//      console.log(this);
//      console.log("您吃了没,走着,吃点臭豆腐去");
//    };
//    var per=new Person(10);
//    per.eat();
//    console.log(per);



    //人的构造函数
    function Person(age) {
      this.age=10;
    }
    //人的原型对象方法
    Person.prototype.eat=function () {
      console.log("人的吃");
    };
    //学生的构造函数
    function Student() {

    }
    Student.prototype.sayHi=function () {
      console.log("嗨,小苏你好帅哦");
    };
    //学生的原型,指向了一个人的实例对象
    Student.prototype=new Person(10);
    var stu=new Student();
    stu.eat();
    stu.sayHi();

    //原型指向可以改变
    //实例对象的原型__proto__指向的是该对象所在的构造函数的原型对象
    //构造函数的原型对象(prototype)指向如果改变了,实例对象的原型(__proto__)指向也会发生改变

    //原型的指向是可以改变的
    //实例对象和原型对象之间的关系是通过__proto__原型来联系起来的,这个关系就是原型链


  </script>
</head>
<body>


</body>
</html>
```

图解：

![原型链指向改变.png](.\img\原型链指向改变.png)

#### 总结：原型链的最终指向

原型链最终的指向是 Object 的 prototype 中的**proto**是 null

1. 实例对象中有`__proto__`原型

2. 构造函数中有 prototype 原型

3. prototype 是对象，只要是对象就有对象的原型`__proto__`

4. 所以，prototype 这个对象中也有`__proto__`,那么指向了哪里

5. 实例对象中的`__proto__`指向的是构造函数的 prototype

6. 所以，prototype 这个对象中`__proto__`指向的应该是某个构造函数的原型 prototype

7. Person 的 prototype 中的`__proto__`的指向：

   1. console.log(Person.prototype.**proto**);

   2. per 实例对象的 `__proto__` -------> Person.prototype 的`__proto__` ----> Object.prototype 的`__proto__`是 null

示例代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>原型链的最终指向</title>
		<script>
			function Person() {}
			Person.prototype.eat = function () {
				console.log("吃东西");
			};

			var per = new Person();
			console.dir(per);
			console.dir(Person);

			//实例对象中有__proto__原型
			//构造函数中有prototype原型
			//prototype是对象
			//所以,prototype这个对象中也有__proto__,那么指向了哪里
			//实例对象中的__proto__指向的是构造函数的prototype
			//所以,prototype这个对象中__proto__指向的应该是某个构造函数的原型prototype

			//Person的prototype中的__proto__的指向
			//console.log(Person.prototype.__proto__);

			//per实例对象的__proto__------->Person.prototype的__proto__---->Object.prototype的__proto__是null

			console.log(per.__proto__ == Person.prototype); // true
			console.log(per.__proto__.__proto__ == Person.prototype.__proto__); // true
			console.log(Person.prototype.__proto__ == Object.prototype); // true
			console.log(Object.prototype.__proto__); // true
		</script>
	</head>
	<body></body>
</html>
```

图例：

![原型最终的指向.png](.\img\原型最终的指向.png)

---

### 原型指向改变如果再添加原型方法

代码示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>原型指向改变如果再添加原型方法</title>
		<script>
			// ***** 1.先添加原型方法再改变原型指向 *****
			//    //人的构造函数
			//    function Person(age) {
			//      this.age=age;
			//    }
			//    //人的原型中添加方法
			//    Person.prototype.eat=function () {
			//      console.log("人正在吃东西");
			//    };
			//    //学生构造函数
			//    function Student(sex) {
			//      this.sex=sex;
			//    }
			//
			//    //学生的原型中添加方法----先在原型中添加方法
			//    Student.prototype.sayHi=function () {
			//      console.log("您好哦");
			//    };
			//    //改变了原型对象的指向
			//    Student.prototype=new Person(10);
			//
			//    var stu=new Student("男");
			//    stu.eat();
			//    stu.sayHi(); // 先添加的sayHi()方法不能访问
			//

			// ***** 2.先改变原型指向再添加原型方法 *****
			//    //人的构造函数
			//    function Person(age) {
			//      this.age=age;
			//    }
			//    //人的原型中添加方法
			//    Person.prototype.eat=function () {
			//      console.log("人正在吃东西");
			//    };
			//    //学生构造函数
			//    function Student(sex) {
			//      this.sex=sex;
			//    }
			//
			//    //改变了原型对象的指向
			//    Student.prototype=new Person(10);
			//    //学生的原型中添加方法----先在原型中添加方法
			//    Student.prototype.sayHi=function () {
			//      console.log("您好哦");
			//    };
			//    var stu=new Student("男");
			//    stu.eat();
			//    stu.sayHi(); 后添加的sayHi()方法可以访问
			//
			//    console.dir(stu);

			// 原型指向改变后添加方法的正确使用
			function Person(age) {
				this.age = age;
			}
			// 先-改变 prototype 指向
			Person.prototype = {
				eat: function () {
					console.log("吃");
				},
			};
			// 后-添加原型方法：如果放在[改变 prototype 指向]前面，就不能访问
			Person.prototype.sayHi = function () {
				console.log("您好");
			};
			var per = new Person(10);
			per.sayHi(); // 可以访问
		</script>
	</head>
	<body></body>
</html>
```

**1.先添加原型方法再改变原型指向**：

![原型指向后的图解.png](.\img\原型指向后的图解.png)

先添加的 sayHi()方法不能访问

**2.先改变原型指向再添加原型方法**：

后在原型添加的 sayHi()方法，可以访问

---

### 实例对象的属性和原型对象中的属性重名问题

> 通过实例对象`__proto__`不能改变原型对象中的属性值
> 想改变原型对象中属性的值：构造函数.原型对象 prototype.属性 = 值;

示例代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>实例对象的属性和原型对象中的属性重名问题</title>
		<script>
			function Person(age, sex) {
				this.age = age;
				this.sex = sex;
			}
			Person.prototype.sex = "女";
			var per = new Person(10, "男");
			console.log(per.sex);
			// 因为JS是一门动态类型的语言,对象没有什么,只要点了,那么这个对象就有了这个东西：
			// 就是说没有这个属性,只要对象.属性名字,对象就有这个属性了,但是,该属性没有赋值,所以,结果是:undefined
			console.log(per.fdsfdsfsdfds); // undefined

			console.log(fsdfdsfds);

			//实例对象访问这个属性,应该先从实例对象中找,找到了就直接用，找不到就去指向的原型对象中找,找到了就使用,找不到呢?=====
			//通过实例对象能否改变原型对象中的属性值?不能
			//就想改变原型对象中属性的值,怎么办?直接通过原型对象.属性=值;可以改变
			//    Person.prototype.sex="哦唛嘎的";
			//    per.sex="人";
			//    console.log(per.sex);
			//
			//    console.dir(per);
		</script>
	</head>
	<body></body>
</html>
```

### div 元素的原型链

#### div 的原型链

`divObj.__proto__`---->`HTMLDivElement.prototype的__proto__`--->`HTMLElement.prototype的__proto__`---->`Element.prototype的__proto__---->Node.prototype的__proto__`---->`EventTarget.prototype的__proto__`---->`Object.prototype`没有`__proto__`，所以，`Object.prototype`中的`__proto__`是`null`

代码示例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>div元素的原型链</title>
		<script>
			//原型链:实例对象和原型对象之间的关系,通过__proto__来联系
		</script>
	</head>
	<body>
		<div id="dv"></div>
		<script>
			var divObj = document.getElementById("dv");
			console.dir(divObj);

			//divObj.__proto__---->HTMLDivElement.prototype的__proto__--->HTMLElement.prototype的__proto__---->Element.prototype的__proto__---->Node.prototype的__proto__---->EventTarget.prototype的__proto__---->Object.prototype没有__proto__,所以,Object.prototype中的__proto__是null
		</script>
	</body>
</html>
```

---

## 六：面向对象编程思想和应用

### 面向对象的特性：封装、继承、多态

- 封装:就是包装
  - 一个值存储在一个变量中--封装
  - 一坨重复代码放在一个函数中--封装
  - 一系列的属性放在一个对象中--封装
  - 一些功能类似的函数(方法)放在一个对象中--封装
  - 好多相类似的对象放在一个 js 文件中---封装
- 继承是一种关系：父类级别与类级别的关系
- 多态：
  - 一个对象有不同的行为，或者是同一个行为针对不同的对象，产生不同的结果，要想有多态,就要先有继承，ES5 构造函数中可以模拟多态，但是不会去使用，也不会模拟

### ES5 语法的构造函数实现面向对象编程

#### 需求分析

- 根据需求，分析对象，找到对象有什么特征和行为，通过代码的方式来实现需求，要想实现这个需求，就要创建对象，要想创建对象，就应该显示有构造函数，然后通过构造函数来创建对象，通过对象调用属性和方法来实现相应的功能及需求
- 面向对象的思想适合于人的想法,编程起来会更加的方便，及后期的维护
- 面向对象的编程语言中有类(class)的概念(也是一种特殊的数据类型)，但是**JS 的 ES5 语法不是面向对象的语言**，JS 的 ES6 之后才有类(class)
- **JS 的 ES5 语法**构造函数语法可以模拟模拟类的概念(class)，来实现面向对象的思想编程

### 1.通过对象原型实现继承

#### 什么是继承

- 现实生活中的继承

  - 继承是一种关系：父类级别与类级别的关系

- 程序中的继承

  - 继承: 首先继承是一种关系，类(class)与类之间的关系，JS 的 ES5 语法中没有类，ES6 才有，但是 ES5 的语法可以通过构造函数模拟类，然后通过原型来实现继承
  - 继承也是为了数据共享，js 中的继承也是为了实现数据共享

#### 原型的作用

- 原型作用之一：数据共享,节省内存空间

- 原型作用之二：为了实现继承

#### 1.构造函数的原型方法继承：拷贝继承（for-in）

为什么不使用简单的=等于赋值，因为赋值只是改变地址的指向，值都是指向同一内存空间，改一个值，另一个也会改变（浅拷贝）

下面的是拷贝继承是深拷贝：

```html{23-25}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>拷贝继承</title>
  <script>

    //拷贝继承；把一个对象中的属性或者方法直接复制到另一个对象中

    function Person() {}

    Person.prototype.age=10;
    Person.prototype.sex="男";
    Person.prototype.height=100;
    Person.prototype.play=function () {
      console.log("玩的好开心");
    };

    var obj2={};
    //Person的构造中有原型prototype,prototype就是一个对象,那么里面,age,sex,height,play都是该对象中的属性或者方法

    // 原型对象拷贝继承原型对象成员
    for(var key in Person.prototype){
      obj2[key] = Person.prototype[key];
    }
    console.dir(obj2);
    obj2.play();

  </script>
</head>
<body>

</body>
</html>
```

#### 2.第二种继承方式：原型继承

```javascript{16}
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log('hello ' + this.name)
}

function Student (name, age) {
  Person.call(this, name, age)
}

// 利用原型的特性实现继承
Student.prototype = new Person()

var s1 = Student('张三', 18)

console.log(s1.type) // => human

s1.sayName() // => hello 张三
```

例子：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>学生和人构造函数继承例子</title>
		<script>
			// 例子:
			// 人，都有姓名，性别，年龄，吃饭，睡觉，玩
			// 学生，都有姓名，性别，年龄，成绩，吃饭，睡觉，玩，学习的行为

			// js中通过原型来实现继承
			// 人 - 构造函数
			function Person(name, age, sex) {
				this.name = name;
				this.sex = sex;
				this.age = age;
			}
			// 人 - 构造函数原型上添加方法
			Person.prototype.eat = function () {
				console.log("人可以吃东西");
			};
			Person.prototype.sleep = function () {
				console.log("人在睡觉");
			};
			Person.prototype.play = function () {
				console.log("生活就是不一样的玩法而已");
			};

			// 学生 - 构造函数
			function Student(score) {
				this.score = score;
			}
			// 改变学生的原型的指向即可==========>学生和人已经发生关系
			Student.prototype = new Person("小明", 10, "男");
			Student.prototype.study = function () {
				console.log("学习很累很累的哦.");
			};

			// 相同的代码太多，造成了代码的冗余(重复的代码)

			var stu = new Student(100);

			console.log("下面的是人-构造函数对象中自己有的");
			console.log(stu.name);
			console.log(stu.age);
			console.log(stu.sex);
			stu.eat();
			stu.play();
			stu.sleep();

			console.log("下面的是学生-构造函数对象中自己有的");
			console.log(stu.score);
			stu.study();
		</script>
	</head>
	<body></body>
</html>
```

动物和狗继承案例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>动物和狗继承案例</title>
		<script>
			//动物有名字,有体重,有吃东西的行为
			//小狗有名字,有体重,有毛色, 有吃东西的行为,还有咬人的行为
			//哈士奇名字,有体重,有毛色,性别, 有吃东西的行为,还有咬人的行为,逗主人开心的行为

			//动物的构造韩素
			function Animal(name, weight) {
				this.name = name;
				this.weight = weight;
			}
			//动物的原型的方法
			Animal.prototype.eat = function () {
				console.log("天天吃东西,就是吃");
			};

			//狗的构造函数
			function Dog(color) {
				this.color = color;
			}
			Dog.prototype = new Animal("哮天犬", "50kg");
			Dog.prototype.bitePerson = function () {
				console.log("哼~汪汪~咬死你");
			};

			//哈士奇
			function ErHa(sex) {
				this.sex = sex;
			}
			ErHa.prototype = new Dog("黑白色");
			ErHa.prototype.playHost = function () {
				console.log(
					"哈哈~要坏衣服,要坏桌子,拆家..嘎嘎...好玩,开心不,惊喜不,意外不"
				);
			};
			var erHa = new ErHa("雄性");
			console.log(erHa.name, erHa.weight, erHa.color);
			erHa.eat();
			erHa.bitePerson();
			erHa.playHost();
		</script>
	</head>
	<body></body>
</html>
```

#### 3.构造函数的属性继承：借用构造函数继承

- 为了数据共享，**改变原型指向**，做到了继承---通过改变原型指向实现的继承

  - **缺陷**：因为改变原型指向的同时实现继承，直接初始化了属性，继承过来的属性的值都是一样的了，所以，这就是问题

  - 只能重新调用对象的属性进行重新赋值，

  - 改变原型指向缺点的**解决方案**：继承的时候，不用改变原型的指向，直接调用父级的构造函数的方式来为属性赋值就可以了------**借用构造函数 👇**

- **借用构造函数**：`构造函数名字.call(当前对象,属性,属性,属性....);`

  - 解决了属性继承,并且值不重复的问题

  - **缺陷**：父级类别中的方法不能继承

##### 借用构造函数继承示例，运用函数的 call 方法：`Person.call(this,name,age,sex,weight);`

call 方法文档：[Function.prototype.call() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

```html{18}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>借用构造函数继承</title>
  <script>
    function Person(name, age, sex, weight) {
      this.name = name;
      this.age = age;
      this.sex = sex;
      this.weight = weight;
    }
    Person.prototype.sayHi = function () {
      console.log("您好");
    };
    function Student(name,age,sex,weight,score) {
      // 借用构造函数继承属性成员
      Person.call(this,name,age,sex,weight);
      this.score = score;
    }

    // 实例化输出打印
    var stu1 = new Student("小明",10,"男","10kg","100");
    console.log(stu1.name, stu1.age, stu1.sex, stu1.weight, stu1.score);

    var stu2 = new Student("小红",20,"女","20kg","120");
    console.log(stu2.name, stu2.age, stu2.sex, stu2.weight, stu2.score);

    var stu3 = new Student("小丽",30,"妖","30kg","130");
    console.log(stu3.name, stu3.age, stu3.sex, stu3.weight, stu3.score);

  </script>
</head>
<body>

</body>
</html>
```

#### 4.组合继承：原型继承和借用构造函数继承 相结合

- **改变原型指向**，做到了继承---通过改变原型指向实现的继承

  - **缺陷**：只能继承父类的方法

- **借用构造函数**：`构造函数名字.call(当前对象,属性,属性,属性....);`

  - **缺陷**：只能继承父类的属性

两种方式结合，相辅相成：

```html{21,25}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>"原型继承"和"借用构造函数继承"相结合</title>
  <script>
    //原型实现继承
    //借用构造函数实现继承
    //组合继承:原型继承+借用构造函数继承

    function Person(name,age,sex) {
      this.name=name;
      this.age=age;
      this.sex=sex;
    }
    Person.prototype.sayHi=function () {
      console.log("阿涅哈斯诶呦");
    };
    function Student(name,age,sex,score) {
      //借用构造函数:属性值重复的问题
      Person.call(this,name,age,sex);
      this.score=score;
    }
    //改变原型指向----继承
    Student.prototype=new Person();//不传值
    Student.prototype.eat=function () {
      console.log("吃东西");
    };
    var stu=new Student("小黑",20,"男","100分");
    console.log(stu.name,stu.age,stu.sex,stu.score);
    stu.sayHi();
    stu.eat();
    var stu2=new Student("小黑黑",200,"男人","1010分");
    console.log(stu2.name,stu2.age,stu2.sex,stu2.score);
    stu2.sayHi();
    stu2.eat();

    //属性和方法都被继承了

  </script>
</head>
<body>

</body>
</html>
```

#### 逆推继承看原型

![逆推继承看原型.png](.\img\逆推继承看原型.png)

代码：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>逆推继承看原型</title>
		<script>
			function F1(age) {
				this.age = age;
			}
			function F2(age) {
				this.age = age;
			}
			F2.prototype = new F1(10);
			function F3(age) {
				this.age = age;
			}
			F3.prototype = new F2(20);

			var f3 = new F3(30);
			console.log(f3.age); //
		</script>
	</head>
	<body></body>
</html>
```

## ES6 的 class 类的面向对象编程

视频：<https://www.bilibili.com/video/BV1i54y1v7bE/?spm_id_from=333.999.0.0&vd_source=5f0c99b3deddffe219938763769b15ac>

### 面向对象编程总结

#### 继承

1. 原型作用：数据共享 ，目的是：为了节省内存空间

2. 原型作用：继承 - 目的是：为了节省内存空间

3. 原型继承：改变原型的指向

4. 借用构造函数继承：主要解决属性的问题

5. 组合继承：原型继承+借用构造函数继承，既能解决属性问题,又能解决方法问题

6. 拷贝继承：就是把对象中需要共享的属性或者犯法,直接遍历的方式复制到另一个对象中
