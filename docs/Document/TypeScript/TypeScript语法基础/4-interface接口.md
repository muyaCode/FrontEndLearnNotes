# 4-interface 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interfaces）来定义对象的类型。`接口是对象的状态(属性)和行为(方法)的抽象(描述)`

- 接口一方面可以在面向对象编程中表示为`行为的抽象`，另外可以用来描述`对象的形状`
- 接口就是把一些类中共有的属性和方法抽象出来，可以用来约束实现此接口的类
- 一个类可以继承另一个类并实现多个接口
- 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
- 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类

## 接口初探

需求：创建人的对象, 需要对人的属性进行一定的约束

```bash
id是number类型, 必须有, 只读的
name是string类型, 必须有
age是number类型, 必须有
sex是string类型, 可以没有
```

下面通过一个简单示例来观察接口是如何工作的：

```typescript
/*
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
接口: 是对象的状态(属性)和行为(方法)的抽象(描述)
接口类型的对象
    多了或者少了属性是不允许的
    可选属性: ?
    只读属性: readonly
*/

/*
需求: 创建人的对象, 需要对人的属性进行一定的约束
  id是number类型, 必须有, 只读的
  name是string类型, 必须有
  age是number类型, 必须有
  sex是string类型, 可以没有
*/

// 定义人的接口
interface IPerson {
	id: number;
	name: string;
	age: number;
	sex: string;
}

const person1: IPerson = {
	id: 1,
	name: "tom",
	age: 20,
	sex: "男",
};
```

类型检查器会查看对象内部的属性是否与 IPerson 接口描述一致, 如果不一致就会提示类型错误。

### 1.对象的形状

```typescript
// 接口可以用来描述`对象的形状`,少属性或者多属性都会报错
interface Speakable {
	speak(): void;
	name?: string; // ？表示可选属性
}

let speakman: Speakable = {
	speak() {}, // 少属性会报错
	name,
	age, // 多属性也会报错
};
```

### 2.行为的抽象

```typescript
// 接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
	speak(): void;
}
interface Eatable {
	eat(): void;
}
// 一个类可以实现多个接口
class Person implements Speakable, Eatable {
	speak() {
		console.log("Person说话");
	}
	eat() {}
}
class TangDuck implements Speakable {
	speak() {
		console.log("TangDuck说话");
	}
	eat() {}
}
```

### 3.任意属性

```typescript
// 无法预先知道有哪些新的属性的时候，可以使用任意名称属性的写法： `[propName: string]:any`，propName名字是任意的
interface Person {
	readonly id: number;
	name: string;
	[propName: string]: any;
}

let p1 = {
	id: 1,
	name: "zhufeng",
	age: 10,
};
```

### 4.可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。

```typescript
interface IPerson {
	id: number;
	name: string;
	age: number;
	sex?: string; // 可选属性
}
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

```typescript
const person2: IPerson = {
	id: 1,
	name: "tom",
	age: 20,
	// sex: '男' // 可以没有
};
```

### 5.只读属性(readonly|const)

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface IPerson {
	readonly id: number; // 只读属性
	name: string;
	age: number;
	sex?: string;
}
```

一旦赋值后再也不能被改变了。

```typescript
const person2: IPerson = {
	id: 2,
	name: "tom",
	age: 20,
	// sex: '男' // 可以没有
	// xxx: 12 // error 没有在接口中定义, 不能有
};
person2.id = 2; // error
```

用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写

```typescript
interface Person {
	readonly id: number;
	name: string;
}
let tom: Person = {
	id: 1,
	name: "zhufeng",
};
tom.id = 1;
```

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

## 接口的继承

一个接口可以继承自另外一个接口

```typescript
interface Speakable {
	speak(): void;
}
// extends接口继承接口
interface SpeakChinese extends Speakable {
	speakChinese(): void;
}
// 类使用implements继承接口
class Person implements SpeakChinese {
	speak() {
		console.log("Person");
	}
	speakChinese() {
		console.log("speakChinese");
	}
}
```

## 函数类型接口类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
/*
接口可以描述函数类型(参数的类型与返回的类型)
*/
interface SearchFunc {
	(source: string, subString: string): boolean;
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```typescript
const mySearch: SearchFunc = function (source: string, sub: string): boolean {
	return source.search(sub) > -1;
};

console.log(mySearch("abcd", "bc"));
```

对方法传入的参数和返回值进行约束

```typescript
interface discount {
	(price: number): number;
}
let cost: discount = function (price: number): number {
	return price * 0.8;
};
```

## 可索引签名接口(对数组和对象进行约束)

- 对数组和对象进行约束

```typescript
interface UserInterface {
	[index: number]: string;
}
// 表示`index`的类型是 number，那么值的类型必须是 string
let arr: UserInterface = ["zfpx1", "zfpx2"];
console.log(arr);
// `index` 的类型是 string，那么值的类型必须是 string
interface UserInterface2 {
	[index: string]: string;
}
let obj: UserInterface2 = { name: "zhufeng" };
```

### 索引访问类型

```typescript
const symid = Symbol("productno")
interface Product {
    [symid]: number
    name: string
    price: number
    account: number
    buy(): string
}
type A = Product["price"]
type B = Product["price" | "name"]
type S = Product[typeof symid]

type PKeys = keyof Product // "name" | "price" | "account" | "buy"
typeof pKeys: PKeys = "account"
// let pKeys2:"name"|"price"|"account"|"buy"|typeof symid=""

// type AllKeys<T>=T extends any?T:never
// type Pkeys2=A11Keys<keyof Product>
```

## 类 类型 | 类接口

### 类实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```typescript
/*
类类型: 实现接口
1. 一个类可以实现多个接口
2. 一个接口可以继承多个接口
*/

interface Alarm {
	alert(): any;
}

interface Light {
	lightOn(): void;
	lightOff(): void;
}

class Car implements Alarm {
	alert() {
		console.log("Car alert");
	}
}
```

对类的约束

```typescript
interface Speakable {
	name: string;
	speak(words: string): void;
}
class Dog implements Speakable {
	name!: string;
	speak(words: string) {
		console.log(words);
	}
}
let dog = new Dog();
dog.speak("汪汪汪");
```

### 一个类可以实现多个接口

```typescript
class Car2 implements Alarm, Light {
	alert() {
		console.log("Car alert");
	}
	lightOn() {
		console.log("Car light on");
	}
	lightOff() {
		console.log("Car light off");
	}
}
```

## 构造函数的接口类型

- 在 TypeScript 中，我们可以用 interface 来描述类
- 同时也可以使用 interface 里特殊的 new()关键字来描述类的构造函数类型

```typescript
class Animal {
	constructor(public name: string) {}
}
// 不加new是修饰函数的，加new是修饰类的
interface WithNameClass {
	new (name: string): Animal;
}
function createAnimal(clazz: WithNameClass, name: string) {
	return new clazz(name);
}
let a = createAnimal(Animal, "zhufeng");
console.log(a.name);
```

## 接口继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface LightableAlarm extends Alarm, Light {}
```

## 抽象类 VS 接口

- 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
- 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
- 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
- 抽象类也可以实现接口

```typescript
abstract class Animal {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	abstract speak(): void;
}
interface Flying {
	fly(): void;
}
class Duck extends Animal implements Flying {
	speak() {
		console.log("汪汪汪");
	}
	fly() {
		console.log("我会飞");
	}
}
let duck = new Duck("zhufeng");
duck.speak();
duck.fly();
```

## interface 和 type 的区别

type 和接口类似，都用来定义类型，但 type 和 interface 区别如下：

**区别 1：定义类型范围不同**

- interface 只能定义对象类型或接口当名字的函数类型

- type 可以定义任何类型，包括基础类型、联合类型 ，交叉类型，元组

```typescript
// type 定义基础类型
type num = number;

// type 定义联合类型例子1:
type baseType = string | inumber | symbol;

// type 定义联合类型例子2:
interface Car {
	brandNo: string;
}
interface Plane {
	No: string;
	brandNo: string;
}
type TypVechile = Car | Plane;

// 元组
interface Car {
	brandNo: string;
}
interface Plane {
	No: string;
	brandNo: string;
}
type TypVechile = [Car, Plane];
```

**区别 2：接口可以 extends 一个或者多个 接口 或类实现一个或者多个接口，也可以继承 type，但 type 类型没有继承功能，但一般接口继承 类 和 type 的应用场景很少见，只需要记住有这样的语法即可**

**区别 3：用 type 交叉类型&可让类型中的成员合并成一个新的 type 类型，但接口不能交叉合并**

```typescript
type Group = { groupName: string; memberNum: number };
type GroupInfoLog = { info: string; happen: string };
type GroupMemeber = Group & GroupInfoLog; // type 交叉类型合并

let data: GroupMemeber = {
	groupName: "001",
	memberNum: 10,
	info: "集体爬山",
	happen: "中途有组员差点滑落，有惊无险",
};
export {};
```

**区别 4：接口可合并声明**

定义两个相同名称的接口会合并声明，定义两个同名的 type 会出现编译错误。

```typescript
interface Error {
	name: string;
}
interface Error {
	message: string;
	stack?: string;
}
// 接口合并
let error: Error = { message: "空指针", name: "NulTPointException" };
```
