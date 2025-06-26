# 3-class类

对于传统的 JavaScript 程序我们会使用`函数`和`基于原型的继承`来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是`基于类的继承`并且对象是由类构建出来的。 

从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

## 基本示例

下面看一个使用类的例子：

```typescript
/*
类的基本定义与使用
*/

class Greeter {
  // 声明属性
  message: string;
  name:string;

  // 构造方法
  constructor(message: string) {
    this.message = message
  }

  // 一般方法
  greet(): string {
    return 'Hello ' + this.message
  }
  getName():void{
      console.log(this.name);
  }
}

// 创建类的实例
const greeter = new Greeter('world');
// 调用实例的方法
console.log(greeter.greet());

greeter.name = 'zhufeng';
greeter.getName();
```

如果你使用过 C# 或 Java，你会对这种语法非常熟悉。 

我们声明一个 `Greeter` 类。这个类有 3 个成员：一个叫做 `message` 的属性，一个构造函数和一个 `greet` 方法。

你会注意到，我们在引用任何一个类成员的时候都用了 `this`。 它表示我们访问的是类的成员。

后面一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

最后一行通过 `greeter` 对象调用其 `greet` 方法

```typescript
/**
 * 当我们写一个类的时候,会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */
class Component {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性';
}
let com = Component;
//Component类名本身表示的是实例的类型
//ts 一个类型 一个叫值 
//冒号后面的是类型
//放在=后面的是值
let c: Component = new Component();
let f: typeof Component = com;
```

## 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

- 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
- 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
- super可以调用父类上的方法和属性

看下面的例子：

```typescript
/*
类的继承
*/

class Animal {
  run(distance: number) {
    console.log(`Animal run ${distance}m`)
  }
}

class Dog extends Animal {
  cry() {
    console.log('wang! wang!')
  }
}

const dog = new Dog()
dog.cry()
dog.run(100) // 可以调用从父中继承得到的方法
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里，`Dog` 是一个 派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。 派生类通常被称作*子类*，基类通常被称作*超类*。

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `cry()` 和 `run()`。

下面我们来看个更加复杂的例子。

```typescript
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    // 调用父类型构造方法
    super(name)
  }

  // 重写父类型的方法
  run(distance: number = 5) {
    console.log('sliding...')
    super.run(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    // 调用父类型构造方法
    super(name)
  }

  // 重写父类型的方法
  run(distance: number = 50) {
    console.log('dashing...')
    // 调用父类型的一般方法
    super.run(distance)
  }

  xxx() {
    console.log('xxx()')
  }
}

const snake = new Snake('sn')
snake.run()

const horse = new Horse('ho')
horse.run()

// 父类型引用指向子类型的实例 ==> 多态
const tom: Animal = new Horse('ho22')
tom.run()

/* 如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例 */
const tom3: Snake = new Animal('tom3')
tom3.run()
/* 如果子类型有扩展的方法, 不能让子类型引用指向父类型的实例 */
// const tom2: Horse = new Animal('tom2')
// tom2.run()
```

这个例子展示了一些上面没有提到的特性。 这一次，我们使用 `extends` 关键字创建了 Animal 的两个子类：`Horse` 和 `Snake`。

与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 `super()`，它会执行基类的构造函数。 而且，在构造函数里访问 `this` 的属性之前，我们 一定要调用 `super()`。 这个是 TypeScript 强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。`Snake`类和 `Horse` 类都创建了 `run` 方法，它们重写了从 `Animal` 继承来的 `run` 方法，使得 `run` 方法根据不同的类而具有不同的功能。注意，即使 `tom` 被声明为 `Animal` 类型，但因为它的值是 `Horse`，调用 `tom.run(34)` 时，它会调用 `Horse` 里重写的方法。

```bash
sliding...
sn run 5m
dashing...
ho run 50m
```

例子3

```typescript
class Person {
    name: string;//定义实例的属性，默认省略public修饰符
    age: number;
    constructor(name:string,age:number) {//构造函数
        this.name=name;
        this.age=age;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Student extends Person{
    no: number;
    constructor(name:string,age:number,no:number) {
        super(name,age);
        this.no=no;
    }
    getNo():number {
        return this.no;
    }
}
let s1=new Student('zfpx',10,1);
console.log(s1);
```

## 类的修饰符：public 公共、private 私有、protected 受保护

### 默认为：public 公共

在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 `public` 来做修饰；例如，C# 要求必须明确地使用 `public` 指定成员是可见的。 在 TypeScript 里，成员都默认为 `public`。

你也可以明确的将一个成员标记成 `public`。 我们可以用下面的方式来重写上面的 `Animal` 类：

### private 私有

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。

### protected 受保护

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。例如：

```typescript
/*
访问修饰符: 用来描述类内部的属性/方法的可访问性
  public: 默认值, 公开的外部也可以访问
  private: 只能类内部可以访问
  protected: 类内部和子类可以访问
*/

class Animal {
  public name: string

  public constructor(name: string) {
    this.name = name
  }

  public run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}

class Person extends Animal {
  private age: number = 18
  protected sex: string = '男'

  run(distance: number = 5) {
    console.log('Person jumping...')
    super.run(distance)
  }
}

class Student extends Person {
  run(distance: number = 6) {
    console.log('Student jumping...')

    console.log(this.sex) // 子类能看到父类中受保护的成员
    // console.log(this.age) //  子类看不到父类中私有的成员

    super.run(distance)
  }
}

console.log(new Person('abc').name) // 公开的可见
// console.log(new Person('abc').sex) // 受保护的不可见
// console.log(new Person('abc').age) //  私有的不可见
```

例子2

```typescript
class Father {
    public name: string;  //类里面 子类 其它任何地方外边都可以访问
    protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
    private money: number; //类里面可以访问， 子类和其它任何地方都不可以访问
    constructor(name:string,age:number,money:number) {//构造函数
        this.name=name;
        this.age=age;
        this.money=money;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Child extends Father{
    constructor(name:string,age:number,money:number) {
        super(name,age,money);
    }
    desc() {
        console.log(`${this.name} ${this.age} ${this.money}`);
    }
}

let child = new Child('zfpx',10,1000);
console.log(child.name);
console.log(child.age);
console.log(child.money);
```

### readonly 只读修饰符

你可以使用 `readonly` 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

- readonly修饰的变量只能在`构造函数`中初始化
- 在 TypeScript 中，const 是`常量`标志符，其值不能被重新分配
- TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
- readonly 实际上只是在`编译`阶段进行代码检查。而 const 则会在`运行时`检查（在支持 const 语法的 JavaScript 运行时环境中）

```typescript
class Person {
  readonly name: string = 'abc'
  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
// john.name = 'peter' // error
```

#### readonly 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Person` 类的修改版，使用了参数属性：

```typescript
class Person2 {
  constructor(readonly name: string) {}
}

const p = new Person2('jack')
console.log(p.name)
```

注意看我们是如何舍弃参数 `name`，仅在构造函数里使用 `readonly name: string` 参数来创建和初始化 `name` 成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 `private` 限定一个参数属性会声明并初始化一个私有成员；对于 `public` 和 `protected` 来说也是一样。

## 存取器

- 在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
- 构造函数
  - 主要用于初始化类的成员变量属性
  - 类的对象创建时自动调用执行
  - 没有返回值

`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 `get` 和 `set`。 首先，我们从一个没有使用存取器的例子开始。

```typescript
class Person {
  firstName: string = 'A'
  lastName: string = 'B'
  get fullName() {
    return this.firstName + '-' + this.lastName
  }
  set fullName(value) {
    const names = value.split('-')
    this.firstName = names[0]
    this.lastName = names[1]
  }
}

const p = new Person()
console.log(p.fullName)

p.firstName = 'C'
p.lastName = 'D'
console.log(p.fullName)

p.fullName = 'E-F'
console.log(p.firstName, p.lastName)
```

## static 静态属性

使用 `static` 定义 `origin`，因为它是所有网格都会用到的属性。

每个实例想要访问这个属性的时候，都要在 `origin` 前面加上类名。 如同在实例属性上使用 `this.xxx` 来访问属性一样，这里我们使用 `Grid.xxx` 来访问静态属性。

```typescript
/*
静态属性, 是类对象的属性
非静态属性, 是类的实例对象的属性
*/

class Person {
  name1: string = 'A'
  static name2: string = 'B'
}

console.log(Person.name2)
console.log(new Person().name1)
```

例子2

```typescript
class Father {
    static className='Father';
    static getClassName() {
        return Father.className;
    }
    public name: string;
    constructor(name:string) { // 构造函数
        this.name=name;
    }

}
console.log(Father.className);
console.log(Father.getClassName());
```

## 参数属性

```typescript
class User {
    constructor(public myname: string) {}
    get name() {
        return this.myname;
    }
    set name(value) {
        this.myname = value;
    }
}

let user = new User('zhufeng');
console.log(user.name); 
user.name = 'jiagou'; 
console.log(user.name);
```

## 💎装饰器(Nest.typescript使用的)

- 需要再typescript.typescripton配置中：

- ```typescript
  "esModuleInterop": true,
  "experimentalDecorators": true
  ```

- 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
- 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
- 装饰器的写法分为普通装饰器和装饰器工厂

```typescript
class Person{
    say() {
        console.log('hello')
    }
}

function Person() {}
Object.defineProperty(Person.prototype, 'say', {
    value: function() { console.log('hello'); },
    enumerable: false,
    configurable: true,
    writable: true
});
```

### 1.类装饰器

- 类装饰器在类声明之前声明，用来监视、修改或替换类定义

```typescript
namespace a {
    // 当装饰器作为修饰类的时候，会把构造器传递进去，要使用prototype原型接收值
    function addNameEat(constructor: Function) {
      constructor.prototype.name = "zhufeng";
      constructor.prototype.eat = function () {
        console.log("eat");
      };
    }
    @addNameEat
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace b {
    // 还可以使用装饰器工厂
    function addNameEatFactory(name:string) {
        return function (constructor: Function) {
            constructor.prototype.name = name;
            constructor.prototype.eat = function () {
              console.log("eat");
            };
        };
    }
    @addNameEatFactory('zhufeng')
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace c {
    // 还可以替换类,不过替换的类要与原类结构相同（使用不多）
    function enhancer(constructor: Function) {
        return class {
            name: string = "jiagou";
            eat() {
                console.log("吃饭饭");
            }
        };
    }
    @enhancer
    class Person {
      name!: string;
      eat!: Function;
      constructor() {}
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}
```

### 2.属性和方法装饰器

- 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
- 属性装饰器用来装饰属性
  - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - 第二个参数是属性的名称
- 方法装饰器用来装饰方法
  - 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - 第二个参数是方法的名称
  - 第三个参数是方法描述符

```typescript
namespace d {
    // 1.属性装饰器：修饰实例属性
    function upperCase(target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = function () {
            return value;
        }
        // 用来替换的setter
        const setter = function (newVal: string) {
            value = newVal.toUpperCase()
        };
        // 替换属性，先删除原先的属性，再重新定义属性
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    // 2.方法装饰器：修饰实例方法：普通方法，target 对应的是类的 prototype
    function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
        console.log('target.getName', target.getName);
        console.log('target.getAge', target.getAge);
        // 修饰方法
        descriptor.enumerable = true;
    }
    // 3.方法装饰器：重写方法
    function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
        let oldMethod = descriptor.value;
        // 重写方法
        descriptor.value = function (...args: any[]) {
            args = args.map(item => parseFloat(item));
            return oldMethod.apply(this, args);
        }
    }
    
    // 上面三个属性装饰类
    class Person {
        @upperCase
        name: string = 'zhufeng'
        public static age: number = 10
        constructor() { }
        @noEnumerable
        getName() {
            console.log(this.name);
        }
        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu: number, item: number) => accu + item, 0);
        }
    }
    let p: Person = new Person();
    for (let attr in p) {
        console.log('attr=', attr);
    }
    p.name = 'jiagou';
    p.getName();
    console.log(p.sum("1", "2", "3"));
}
```

单个属性装饰器例子

```typescript
// function nameDecorator(target: any, key: string): any {
//   const descriptor: PropertyDescriptor = {
//     writable: false
//   };
//   return descriptor;
// }

// test.name = 'dell lee';

// 修改的并不是实例上的 name， 而是原型上的 name
function nameDecorator(target: any, key: string): any {
  target[key] = 'lee';
}

// name 放在实例上
class Test {
  @nameDecorator
  name = 'Dell';
}

const test = new Test();
console.log((test as any).__proto__.name);
```

### 3.访问器装饰器

和方法是一样的

```typescript
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor.writable = false;
}

class Test {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  // 装饰访问器
  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test = new Test('dell');
test.name = 'dell lee';
console.log(test.name);
```

### 4.参数装饰器

- 会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
  - 第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
  - 第2个参数的名称
  - 第3个参数在函数列表中的索引

```typescript
namespace d {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('zhufeng', '123456');
}

// 原型，方法名，参数所在的位置
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}

class Test {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age);
  }
}

const test = new Test();
test.getInfo('Dell', 30);
```

### 5.装饰器执行顺序

- 1.有多个参数装饰器时：从最后一个参数依次向前执行
- 2.方法和方法参数中 参数装饰器先执行。
- 3.类装饰器总是最后执行
- 4.方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
- 5.类比React组件的componentDidMount 先上后下、先内后外

```typescript
namespace e {
    function Class1Decorator() {
        return function (target: any) {
            console.log("类1装饰器");
        }
    }
    function Class2Decorator() {
        return function (target: any) {
            console.log("类2装饰器");
        }
    }
    function MethodDecorator() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            console.log("方法装饰器");
        }
    }
    function Param1Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数1装饰器");
        }
    }
    function Param2Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数2装饰器");
        }
    }
    function PropertyDecorator(name: string) {
        return function (target: any, propertyName: string) {
            console.log(name + "属性装饰器");
        }
    }

    @Class1Decorator()
    @Class2Decorator()
    class Person {
        @PropertyDecorator('name')
        name: string = 'zhufeng';
        @PropertyDecorator('age')
        age: number = 10;
        @MethodDecorator()
        greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) { }
    }
}
/**
name属性装饰器
age属性装饰器
参数2装饰器
参数1装饰器
方法装饰器
类2装饰器
类1装饰器
 */
```

### 6.装饰器实际使用的例子

异常捕获的方法装饰器的复用

```typescript
const userInfo: any = undefined;

// 异常捕获装饰器
function catchError(msg: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      try {
        fn();
      } catch (e) {
        console.log(msg);
      }
    };
  };
}

class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name;
  }
  @catchError('userInfo.age 不存在')
  getAge() {
    return userInfo.age;
  }
  @catchError('userInfo.gender 不存在')
  getGender() {
    return userInfo.gender;
  }
}

const test = new Test();
test.getName();
test.getAge();
```

## 抽象类

- 抽象类做为其它派生类的基类使用。 抽象描述一种抽象的概念，它们不能被实例化(不能创建实例对象)，只能被继承。
- 不同于接口，抽象类可以包含成员的实现细节，可以包含未实现的抽象方法。
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
- `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
  name!:string;
  abstract speak():void;
    
  abstract cry()
  run() {
    console.log('run()')
  }
}
class Cat extends Animal{
    speak(){
        console.log('喵喵喵');
    }
}
let animal = new Animal(); // Cannot create an instance of an abstract class
animal.speak();
let cat = new Cat();
cat.speak();


class Dog extends Animal {
  cry() {
    console.log(' Dog cry()')
  }
}

const dog = new Dog()
dog.cry()
dog.run()
```

| 访问控制修饰符   | private protected public |
| :--------------- | :----------------------- |
| 只读属性         | readonly                 |
| 静态属性         | static                   |
| 抽象类、抽象方法 | abstract                 |

## 抽象方法

- 抽象类和方法不包含具体实现，必须在子类中实现
- 抽象方法只能出现在抽象类中
- 子类可以对抽象类进行不同的实现

```typescript
abstract class Animal{
    abstract speak():void;
}
class Dog extends  Animal{
    speak(){
        console.log('小狗汪汪汪');
    }
}
class Cat extends  Animal{
    speak(){
        console.log('小猫喵喵喵');
    }
}
let dog = new Dog();
let cat = new Cat();
dog.speak();
cat.speak();
```

## 重写(override) vs 重载(overload)

- 重写是指子类重写继承自父类中的方法
- 重载是指为同一个函数提供多个类型定义

```typescript
// 重写 子类重新实现并覆盖父类中的方法
class Animal{
    speak(word:string):string{
        return '动作叫:'+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return '猫叫:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
//--------------------------------------------
function double(val:number):number
function double(val:string):string
function double(val:any):any{
  if(typeof val == 'number'){
    return val *2;
  }
  return val + val;
}

let r = double(1);
console.log(r);
```

## 继承 vs 多态

- **继承(Inheritance)** 子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- **多态(Polymorphism)** 由继承而产生了相关的不同的类，**对同一个方法可以有不同的行为**

```typescript
class Animal{
    speak(word:string):string{
        return 'Animal: '+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return 'Cat:'+word;
    }
}
class Dog extends Animal{
    speak(word:string):string{
        return 'Dog:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello'));
let dog = new Dog();
console.log(dog.speak('hello'));
```
