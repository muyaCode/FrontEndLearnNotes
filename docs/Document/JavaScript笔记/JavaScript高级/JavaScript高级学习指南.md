# JavaScript高级学习指南

MDN工具书网站查询：[MDN Web Docs (mozilla.org)](https://developer.mozilla.org/zh-CN/)

## 1.JavaScript 面向对象OPP编程

### 简介

- 面向对象介绍
  - 面向对象把事务分解成一个个对象，然后由对象之间分工与合作

- 面向对象优点
  - 代码灵活、可复用、容易维护和开发，适合多人合作的大型软件项目

- 面向对象特性

  - 封装性

    - 我们平时所用的方法和类都是一种封装，当我们在项目开发中，遇到一段功能的代码在好多地方重复使用的时候，我们可以把他单独封装成一个功能的方法，这样在我们需要使用的地方直接调用就可以了。

    - 封装的优势在于定义只可以在类内部进行对属性的操作，外部无法对这些属性指手画脚，要想修改，也只能通过你定义的封装方法；

  - 继承性

    - 继承在我们的项目开发中主要使用为子类继承父类

    - 继承减少了代码的冗余，省略了很多重复代码，开发者可以从父类底层定义所有子类必须有的属性和方法，以达到耦合的目的；

    - 特别提醒：继承会继承父类的实例属性和实例方法，并不会继承静态属性和静态方法，并且静态方法只能通过类名去调用。

  - 多态性

    - 多态的具体表现为方法重载和方法重写：

    - 方法重载：重载是指不同的函数使用相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数

    - 方法重写：重写（也叫覆盖）是指在派生类中重新对基类中的虚函数（注意是虚函数）重新实现。即函数名和参数都一样，只是函数的实现体不一样

    - 多态实现了方法的个性化，不同的子类根据具体状况可以实现不同的方法，光有父类定义的方法不够灵活，遇见特殊状况就捉襟见肘了

- 面向对象和面向过程概念总结比较

  - 总结

    - 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了。

    - 面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

  - 比较

    - 面向过程性能比面向对象高，适合跟硬件联系很紧密的东西,但是不易维护、不易复用、不易扩展。

    - 面向对象易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护，但是性能比面向过程低。

### 类和对象

- 对象

  - 在JavaScript中，对象是一组无序的相关属性的方法的集合，所有的事物都是对象
    - 例如：字符串、数组、函数、数值

  - 对象是由属性和方法组成

    - 属性
      - 事物的特征，在对象中用属性来表示

    - 方法
      - 事物的行为，在对象中用方法来表示

- 类class

  - ES6中增加了类的概念，可以使用class关键字声明一个类，之后以这个类实例化对象

  - 类抽象了对象的公共部分，它泛指某一大类（class）对象特指某一个，通过类实例化一个具体的对象

  - 类的实例化

    - class Name{ constructor(uname){ this.uname } sing(){ console.log(this.uname) } }

    - var zs = new Name('张三');

    - zs.sing()

  - 类的继承

    - 代码

      - class Father{ constructor(uname){ this.uname } say(){ return '111'; } }

      - class Son extends Father { constructor(x){ super(x) } say(){ super.say() } }

        - super(x)

          - 先调用父类的构造函数

          - 子类调用必须写在子类this之前调用

          - 然后才可以调用父类的方法

        - super.say()
          - 调用父类的普通函数

    - 继承中的属性或者方法查找原则

      - 就近原则

      - 1.继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类

      - 2.继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行父类的这个方法(就近原则)

  - 注意

    - 1.在ES6中类没有变量提升，所以必须先定义类，才能通过实例化对象

    - 2.公有的属性和方法调用要在构造函数里加this.

    - 3.类里面的this指向问题

    - 4.constructor 里面的this指向实例化对象， 方法里面的this指向这个方法的调用者

### 类的使用

- 基本使用

  - 1.创建类 class
    - class Name {  // 在类中使用constructor来放置属性  construtor(name,age) {    this.name = name    this.age= age  }  // 在类中添加方法  sing(song){    console.log(this.name + song)  } }

  - 2.实例化类对象
    - let zs = new Name('张三',18)

  - 3.实例化后调用类的方法
    - zs.sing('我爱你你却爱着他')

- 类的继承

  - 子类继承父类基本示例

    - extends 关键字可以实现子类继承父类

    - ​    class Father {        constructor() {         }        money(){            console.log('钱钱钱')        }    }    class Son extends Father {     }    let son = new Son()    son.money();

  - super关键字的使用

    - super 关键字 用于访问和调用对象父类上的函数 可以调用父类的构造函数，也可以调用父类的普通函数

    - ​    class Father {        constructor(x,y) {            this.x = x            this.y = y        }        sum(){            console.log(this.x + this.y)        }        say(){            return '我是父类'        }    }    class Son extends Father {        constructor(x,y){            // 调用了父类中的构造函数            super(x, y);        }        say(){            // super.say()调用了父类的say方法            console.log(super.say() + '的子类')        }    }    let son = new Son(1,2)    son.sum();    son.say();

  - 子类继承父类方法同时扩展方法
    - ​    class Father {        constructor(x,y) {            this.x = x            this.y = y        }        sum(){            console.log(this.x + this.y)        }    }    class Son extends Father {        constructor(x,y){            // 利用super调用父类的构造函数            // 必须写在子类this之前调用操作            super(x,y)             this.x = x            this.y = y        }         substrcact(x,y){            console.log(this.x + this.y)        }    }    let son = new Son(5,2)    son.substrcact();    son.sum();

- 类和对象的三个注意点

  - 1.在 ES6 中类没有变量提升，必须先定义类，才能通过类实例化对象

  - 2.类里面共有的属性和方法一定要加this调用

  - 3.类里面的this指向问题

  - this指向示例说明
    - ​    点击            class Star {            constructor(name,age) {                const that = this                // constructor里面的this指向的是 创建的实例对象                this.name = name                this.age = age                this.btn = document.querySelector('button')                this.btn.onclick = this.sing;            }            sing(){                // 这个方法的this 指向的是 btn 这个按钮                // 因为这个按钮调用了这个函数                console.log(this)                // that是constructor的this是要打印出名字                console.log(that.name)            }            dance(){                // 这个方法里面的this指向的是实例对象 ldh                console.log(this)            }        }        let ldh = new Star('刘德华');     

### 面向对象案例

- tab栏切换

## 2.JavaScript 函数进阶—构造函数和原型实现类的机制

### 构造函数和原型

- 使用构造函数创建对象

  - 对象的创建三种方式

    - new 关键字
      - var obj1 = new Object()

    - 字面量方式
      - var  obj2 = {}

    - 自定义构造函数创建对象
      - function Star(uname, age){  this.uname = uname;  this.age = age;  this.sing = function() {    console.log("哈哈哈来了")  } } // 实例化调用 var ldh = new Star('刘德华', 18); ldh.sing();

  - 1.构造函数创建对象的new 执行做的事情

    - 在内存中创建一个新的空对象。

    - 让 this 指向这个新的对象。

    - 执行构造函数里面的代码，给这个新对象添加属性和方法。

    - 返回这个新对象（构造函数里面不需要 return ）。

  - 2.构造函数的实例成员和静态成员

    - 成员：在构造函数中的属性和方法我们统称为成员

    - 1、什么是实例成员

      - 实例成员 是构造函数内部通过this添加的成员,实例成员只能通过实例化的对象来访问

        - ldh.uname

        - ldh.sing()

    - 2、什么是静态成员

      - 静态成员是 在构造函数本身上添加的成员,只能通过构造函数来访问,不能通过由构造函数创建的实例访问

        - Star.sex = "男"

        - sex就是静态成员

  - 3.构造函数的弊端：存在浪费内存的问题。

    - 实例化一个对象就开辟一个新内存

    - 解决方法
      - 使用prototype原型

- 1.构造函数的原型对象 prototype

  - 原型：每一个构造函数都有一个 prototype 属性，指向另一个对象。这个 prototype 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

  - 我们可以把那些不变的方法，直接定义在prototype 对象上，这样所有对象的实例就可以共享这些方法

  - 示例

    - function Star(uname, age){  this.uname = uname;  this.age = age; } Star.prototype.sing = function(){  console.log("哈哈哈来了") } // 实例化调用 var ldh = new Star('刘德华', 18); ldh.sing();

    - Star.prototype.sing = function(){  console.log("哈哈哈来了") }

      - 把公共的方法 ，定义在在原型对象上

      - 所有对象的实例就都可以使用这个方法

- 2.对象的原型 __proto__

  - 示例

    - function Star(uname, age){  this.uname = uname;  this.age = age; } Star.prototype.sing = function(){  console.log("哈哈哈来了") } // 实例化调用 var ldh = new Star('刘德华', 18); ldh.sing(); console.log(ldh) console.log(ldh.__proto__ === Star.prototype)

    - console.log(ldh)

      - 对象身上系统自己添加一个__proto__ 属性，它指向构造函数的原型对象

      - console.log(ldh.__proto__ === Star.prototype)
        - 返回true

  - 实例对象原型总结

    - 1.实例对象原型：实例对象有一个属性 __proto__ 指向构造函数的 prototype 原型对象。

    - 2.实例对象原型__proto__ 和 构造函数的prototype 是等价的。

    - 3.方法的查找规则：首先 先看实例对象身上是否有方法,如果有就执行这个实例对象上的方法，如果没有这个方法，因为有__proto__ 的存在，就去 构造函数原型对象prototype 身上去查找方法。

  - __proto__对象原型的意义就在于 为对象的查找机制提供一个方向，或者说一个路线，但它是一个非标准属性，因此在实际开发中，不可以使用这个属性，它只是内部指向原型对象 prototype

- 3.原型里的 constructor 构造函数

  - constructor 手动指回原来的构造函数

  - 原因

    - 实例对象原型（ __proto__）和构造函数原型对象（prototype）里面都有一个属性 constructor 属性 ，constructor 我们称为构造函数，因为它指回构造函数本身。

    - 一般情况下，对象的方法都在构造函数的原型对象中设置。 如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor  就不再指向当前构造函数了。 此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

  - 示例

    - function Star(uname, age){  this.uname = uname;  this.age = age; } // 以对象形式添加的方法， // 要用constructor手动指回构造函数 Star.prototype={  constructor: Star,  sing: function(){    console.log("我会唱歌")  }  movie: function(){    console.log("看电影咯")  } }  // 实例化调用 var ldh = new Star('刘德华', 18); console.log(Star.prototype) console.log(ldh.__proto__)

    - constructor: Star,
      - 用constructor手动指回构造函数Star

- 4.构造函数和原型总结

  - 三者总结

    - prototype: 每一个构造函数都有一个prototype属性,指向的是该构造函数的原型对象。

    - __proto__: 每一个实例对象都有一个__proto__属性,指向构造函数的原型对象。

    - constructor: 实例对象原型__proto__和构造函数prototype原型对象里面都有一个属性 constructor 属性 ，都指向了构造函数。
      - 如果用对象形式 定义方法，就要使用 (constructor:构造函数名) 重新指回构造函数

  - 三者关系:

    - 1.构造函数的prototype属性指向了构造函数原型对象。

    - 2.实例对象是由构造函数创建的,实例对象的__proto__属性指向了构造函数的原型对象。

    - 3.构造函数的原型对象的constructor属性指向了构造函数, 实例对象的原型的constructor属性也指向了构造函数。

- 5.原型链

  - 1.只要是对象就有 __proto__ 原型，指向原型对象

  - 2.构造函数Star原型对象里面的__proto__ 原型指向的是Object.prototype

  - 3.Object.prototype原型对象里面的 __proto__ 原型 ，指向为 null 

  - 每一个实例对象又有一个__proto__属性，指向的构造函数的原型对象，构造函数的原型对象也是一个对象，也有__proto__属性，这样一层一层往上找就形成了原型链。

- 6.对象成员查找规则 (JavaScript的成员查找机制)
  - 1.当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。 2.如果没有就查找它的原型（也就是 __proto__指向的 prototype 原型对象）。 3.如果还没有就查找原型对象的原型（Object的原型对象）。 4.依此类推一直找到 Object 为止（null），按照原型链的方式去查找。

- 7.原型对象this指向

  - 构造函数中的this 与 原型对象的this 都是指向的是 new出来的实例对象 (ldh)

  - 示例

    - function Star(uname, age){  this.uname = uname;  this.age = age; } Star.prototype.sing = function(){  console.log("哈哈哈来了") } // 实例化调用 var ldh = new Star('刘德华', 18);

    - 现在的this指向的是 ldh 这个实例对象

- 8.原型对象的应用

  - 扩展内置对象方法

    - Array.prototype.sum = function(){}

    - 注意
      - 数组和字符串内置对象不能给原型对象覆盖操作 Array.prototype = {}，只能是 Array.prototype.xxx = function(){} 的方式，否则会覆盖了该原型的方法

### 继承

- 1.call方法的使用

  - 作用

    - 1.call() 可以调用函数

    - 2.call() 可以改变这个函数的this指向

  - 示例
    - function fn(x,y) {  console.log('调用了函数')  console.log(this)  console.log(x + y) } var obj = {  name: '憨憨', } fn() // 调用函数 fn.call() // 改变这个函数的this指向，指向obj 对象 fn.call(obj ,1,2)  // 可以传参数：1,2  分别是x,y

  - 1.子构造函数继承父构造函数属性

    - function Father(uname, age) {  // this指向父构造函数的对象实例  this.uname = uname  this.age= age } function Son(uname, age, score) {  // this指向子构造函数的对象实例  // 子构造函数继承父构造函数属性  Father.call(this, uname, age)   this.score = score } var son = new Son('刘德华', 18, 100) console.log(son)

    - // this指向子构造函数的对象实例 // 和子构造函数继承父构造函数属性 Father.call(this, uname, age) 

  - 2.子构造函数继承父构造函数方法

    - 利用原型对象继承方法

      - function Father(uname, age) {  // this指向父构造函数的对象实例  this.uname = uname  this.age= age } function Son(uname, age, score) {  // this指向子构造函数的对象实例  // 和子构造函数继承父构造函数属性  Father.call(this, uname, age)   this.score = score } // 子构造函数的原型指向new出来的父构造函数 Son.prototype = new Father(); // constructor 指回原来的原型对象 Son.prototype.constructor = Son; // 子构造函数专属方法 Son.prototype.exam = functio(){  console.log('孩子要考试') } var son = new Son('刘德华', 18, 100) console.log(son)

      - // 子构造函数的原型指向new出来的父构造函数 Son.prototype = new Father(); //  不能直接父子构造函数的prototype赋值，相当于复制地址指向，后面各种方法都会共用，没有独立的方法

    - 子构造函数继承父构造函数方法总结

      - 1.定义父构造函数，为父元素添加方法

      - 2.定义子构造函数，子构造函数要继承父构造函数中的方法

      - 3.在子构造函数中通过 call() 把父类型的 this 指向子类型的 this ，这样就可以实现子类型继承父类型的属性

      - 4.将子构造函数的原型对象指向父构造函数的实例

      - 5.因为修改了子构造函数原型对象,一定要利用constructor 指回子构造函数

### ES5中新增的方法

- 数组方法

  - 迭代(遍历数组) forEach

    - forEach是用来遍历数组的
      - 常用语遍历出数组的值，再添加到元素节点上

    - arr.forEach(function(value, index, array) {})

      - 参数 value 是数组元素

      - 参数 index 是数组元素的索引

      - 参数 array 是当前遍历的数组

  - 筛选数组 filter 方法

    - filter是用来过滤数组的，会将满足条件的数组元素保存到一个新数组中，返回值为新数组
      - 常用于条件查询，把满足条件的显示相应的列表筛选出来

    - var newArr = arr.filter(function(currentValue, index, arr) {})

      - 参数 currentValue 是数组当前项的值

      - 参数 index 是当前数组的索引

      - 参数 arr 是数组对象本身

  - some方法

    - some 也是查找满足条件的元素是否存在 ，返回的是一个布尔值（true，false）， 如果查找到第一个满足条件的元素就终止循环
      - 用于查询唯一的元素

    - arr.some(function(currentValue, index, arr) {})

      - 参数 currentValue 是数组当前项的值

      - 参数 index 是当前数组的索引

      - 参数 arr 是数组对象本身

  - 区别总结

    - some和forEach区别

      - 如果查询数组中唯一的元素,用some更合适,some遇到true就会终止循环,效率更高

      - forEach中return不会终止迭代

    - 数组的forEach、some、filter区别

      - forEach一般应用于数组的遍历,没有返回值

      - some一般应用于查询数组中唯一的元素, 用some方法更合适,遇到 return true 就是终止遍历 迭代效率更高,返回值是布尔值

      - filter一般应用于数据的筛选,遇到return不会终止迭代,返回值是一个新数组

  - 其他相似方法

    - arr.map()

    - arr.every()

- 字符串方法

  - str.trim()方法 去除字符串两侧空格

    - str.trim()  方法会从一个字符串的两端删除空白字符。

    - str.trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。

- 对象方法

  - Object.keys(obj)获取对象属性名

    - 对象方法Object.keys() 方法，返回一个对象的所有的属性并保存到一个数组中

    - var arr = Object.keys(obj)

  - Object.defineProperty(obj, prop, descriptor) 定义新属性或修改原有的属性 方法。

    - 参数 obj 是 当前设置的对象。（必须）

    - 参数 prop 是 需定义或修改的属性的名字。（必须）

    - 参数 descriptor 是一个对象。 对象中有多个属性。（必须）

      - {  value: 100,  writable: true,  enumerable: true,  configurable: true, }

      - 属性一 value: 设置属性的值

      - 属性二 writable: false/true 如果值为false ，不允许修改这个属性值， 默认值也是false

      - 属性三 enumerable: false/true 如果值为false ，则不允许遍历，默认的值是 false

      - 属性四 configurable: false/true 如果为false， 则不允许删除这个属性， 不允许在修改第三个参数里面的特性 ，默认为false

## 3.JavaScript 正则表达式



## 4.JavaScript的Promise



## 5.JavaScript的Canvas学习



