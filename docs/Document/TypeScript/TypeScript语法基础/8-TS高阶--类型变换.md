# 8-TS高阶--类型和类型变换

## 1 类型推断

- TypeScript 能根据一些简单的规则推断变量的类型

### 1.1 从右向左

- 变量的类型可以由定义推断
- 这是一个从右向左流动类型的示例

```typescript
let foo = 1; // foo 是 'number'
let bar = 'zhufeng'; // bar 是 'string'
//foo = bar; // Error: 不能将 'string' 赋值给 `number`
```

### 1.2 底部流出

- 返回类型能被 `return` 语句推断

```typescript
function add(a: number, b: number) {
    return a + b;
}
let c = add(1,2);
```

### 1.3 从左向右

- 函数参数类型/返回值类型也能通过赋值来推断

```typescript
type Sum = (a: number, b: number) => number;
let sum: Sum = (a, b) => {
    a='zhufeng';
    return a + b;
};
```

### 1.4 结构化

- 推断规则也适用于结构化的存在(对象字面量)

```typescript
const person = {
    name: 'zhufeng',
    age: 11
};
let name = person.name;
let age = person.age;
age = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```

### 1.5 解构

- 推断规则也适用于解构

```typescript
const person = {
    name: 'zhufeng',
    age: 11
};
let { name,age } = person;

age = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型

//数组也一样
const numbers = [1, 2, 3];
numbers[0] = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型
```

### 1.5 DefaultProps

```typescript
interface DefaultProps{
    name?: string;
    age?: number;
}
let defaultProps: DefaultProps = {
   name: 'zhufeng',
   age: 10
}

let props = {
    ...defaultProps,
    home: '北京'
}
type Props = typeof props;
```

### 1.6 小心使用返回值

- 尽管 TypeScript 一般情况下能推断函数的返回值，但是它可能并不是你想要的

```typescript
function addOne(a: any) {
    return a + 1;
}
function sum(a: number, b: number) {
    return a + addOne(b);
}

type Ret = ReturnType<typeof sum>;
```

## 1 交叉类型

- 交叉类型(Intersection Types)是将多个类型合并为一个类型
- 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

```typescript
//TypeScript 交叉类型是将多个类型合并为一个类型
//这让我们可以把现有的多种类型叠加到一起成为一种类型
//它包含了所需的所有类型的特性

export {}
//接口的交叉
interface Bird {
    name: string,
    fly(): void
}
interface Person {
    name: string,
    talk(): void
}
type BirdPerson = Bird & Person;
let p: BirdPerson = { name: 'zhufeng', fly() { }, talk() { } };
p.fly;
p.name
p.talk;
interface X {
    a: string;
    b: string;
}

interface Y {
    a: number;
    c: string
}

type XY = X & Y;
type YX = Y & X;
//c = string & number
//let p1: XY={a:'',b:'',c:''};
```

联合类型的交叉类型

```typescript
type Ta = string | number;
type Tb = number | boolean;
type Tc = Ta & Tb;
```

`mixin`混入模式可以让你从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能

```typescript
interface AnyObject {
    [prop: string]: any;
}

function mixin<T extends AnyObject, U extends AnyObject>(one: T,two: U): T & U {
    const result = <T & U>{};
    for (let key in one) {
        (<T>result)[key] = one[key];
    }
    for (let key in two) {
        (<U>result)[key] = two[key];
    }
    return result;
}

const x = mixin({ name: "zhufeng" }, { age: 11 });
console.log(x.name, x.age);
```

## 2 typeof

- 可以获取一个变量的类型

```typescript
//先定义类型，再定义变量
type People = {
    name:string,
    age:number,
    gender:string
}
let p1:People = {
    name:'zhufeng',
    age:10,
    gender:'male'
}
//先定义变量，再定义类型
let p1 = {
    name:'zhufeng',
    age:10,
    gender:'male'
}
type People = typeof p1;
function getName(p:People):string{
    return p.name;
}
getName(p1);
```

## 3 索引访问操作符

- 可以通过[]获取一个类型的子类型

```typescript
interface Person{
    name: string;
    age: number;
    job: {
        name: string
    };
    interests: { name: string, level: number }[]
}
let FrontEndJob: Person['job'] = {
    name: '前端工程师'
}
let interestLevel: Person['interests'][0]['level'] = 2;
```

## 4 keyof 索引类型查询操作符

示例

```typescript
interface Person{
  name: string;
  age: number;
  gender: 'male'|'female';
}

// 索引类型查询操作
type PersonKey = keyof Person; // 相当于Person里面的字段：type PersonKey = 'name'|'age'|'gender';

function getValueByKey(p: Person, key: PersonKey){
  return p[key];
}
let val = getValueByKey({name:'zhufeng', age:10, gender: 'male'}, 'name');
console.log(val);
```

## 5 映射类型

在定义的时候用in操作符去批量定义类型中的属性

```typescript
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
// 批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?: Person[Key]
}

let p1:PartPerson={};
// 也可以使用泛型
type Part<T> = {
  [key in keyof T]?: T[key]
}
let p2: Part<Person> = {};
```

通过key的数组获取值的数组

```typescript
function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}
let user = { id: 1, name: 'zhufeng' };
type User = typeof user;
const res = pick<User, keyof User>(user, ["id", "name"]);
console.log(res);
```

## 6 条件类型

- 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活

### 6.1 定义条件类型

```typescript
interface Fish {
    name: string
}
interface Water {
    name: string
}
interface Bird {
    name: string
}
interface Sky {
    name: string
}
// 若 T 能够赋值给 Fish，那么类型是 Water,否则为 Sky
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Fish> = { name: '水' };
```

### 6.2 条件类型的分发

```typescript
interface Fish {
    fish: string
}
interface Water {
    water: string
}
interface Bird {
    bird: string
}
interface Sky {
    sky: string
}
// naked type
type Condition<T> = T extends Fish ? Water : Sky;

// (Fish extends Fish ? Water : Sky) | (Bird extends Fish ? Water : Sky)
// Water|Sky
let condition1: Condition<Fish | Bird> = { water: '水' };
let condition2: Condition<Fish | Bird> = { sky: '天空' };
```

- 条件类型有一个特性，就是「分布式有条件类型」，但是分布式有条件类型是有前提的，条件类型里待检查的类型必须是naked type parameter

```typescript
// none naked type
// type Condition<T> = [T] extends [Fish] ? Water : Sky;
```

- 找出T类型中U不包含的部分

```typescript
// never会被自动过滤
type Diff<T, U> = T extends U ? never : T;

type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | boolean, number>;
```

### 6.3 TypeScript内置条件类型

- TS 在内置了一些常用的条件类型，可以在 [lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291) 中查看：
- [utility-types](http://www.typescriptlang.org/docs/handbook/utility-types.html)

#### 6.3.1 Exclude

- 从 T 可分配给的类型中排除 U

```typescript
type Exclude<T, U> = T extends U ? never : T;

type  E = Exclude<string |number, string>;
let e:E = 10;
```

#### 6.3.2 Extract

- 从 T 可分配的类型中提取 U

```typescript
type Extract<T, U> = T extends U ? T : never;

type  E = Extract<string | number, string>;
let e:E = '1';
```

#### 6.3.3 NonNullable

- 从 T 中排除 null 和 undefined

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type  E = NonNullable<string|number|null|undefined>;
let e:E = null;
```

#### 6.3.4 ReturnType

- [infer](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types)最早出现在此 [PR](https://github.com/Microsoft/TypeScript/pull/21496) 中，表示在 `extends` 条件语句中待推断的类型变量
- infer和泛型的差别：infer不需要提前定义，而泛型是需要的
- 获取函数类型的返回类型

```typescript
export {}
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
function getUserInfo() {
    return { name: "zhufeng", age: 10 };
}

// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>;

const userA: UserInfo = {
    name: "zhufeng",
    age: 10
};
```

#### 6.3.5 Parameters

- Constructs a tuple type of the types of the parameters of a function type T
- [Parameters](http://www.typescriptlang.org/docs/handbook/utility-types.html#parameterst)

```typescript
export {}
type Parameters<T> = T extends (...args: infer R) => any ? R : any;

type T0 = Parameters<() => string>;  // []
type T1 = Parameters<(s: string) => void>;  // [string]
type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
```

#### 6.3.6 InstanceType

- 获取构造函数类型的实例类型
- [InstanceType](http://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypet)

```typescript
type Constructor = new (...args: any[]) => any;
type ConstructorParameters<T extends Constructor> = T extends new (...args: infer P) => any ? P : never;
type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any;

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    getName() { console.log(this.name) }
}
//构造函数参数
type constructorParameters = ConstructorParameters<typeof Person>;
let params: constructorParameters = ['zhufeng']
//实例类型
type Instance = InstanceType<typeof Person>;
let instance: Instance = { name: 'zhufeng', getName() { } };
```

#### 6.3.7 infer+分布式

- [distributive-conditional-types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)
- 「Distributive conditional types」主要用于拆分 extends 左边部分的联合类型
- 「Distributive conditional types」是由「naked type parameter」构成的条件类型。而「naked type parameter」表示没有被 Wrapped 的类型（如：Array、[T]、Promise 等都是不是「naked type parameter」）。「Distributive conditional types」主要用于拆分 extends 左边部分的联合类型，举个例子：在条件类型 T extends U ? X : Y 中，当 T 是 A | B 时，会拆分成 A extends U ? X : Y | B extends U ? X : Y；
- 利用在逆变位置上，同一类型变量的多个候选类型将会被推断为[交叉类型的特性](https://github.com/Microsoft/TypeScript/pull/21496)
- tuple转union

```typescript
type ElementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number
//联合类型（Union Types）表示取值可以为多种类型中的一种
//交叉类型（Intersection Types）表示将多个类型合并为一个类型
//联合类型转交叉类型
//union 转 intersection
//union 转 intersection 的操作多用于 mixin 中
//https://github.com/Microsoft/TypeScript/issues/27907
type T1 = { name: string };
type T2 = { age: number };

type UnionToIntersection<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;
type T3 = UnionToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>; // T1 & T2
```

## 7 内置工具类型

- TS 中内置了一些工具类型来帮助我们更好地使用类型系统，可以在 [lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291) 中查看：
- [utility-types](http://www.typescriptlang.org/docs/handbook/utility-types.html)
- [一看就懂的TypeScript工具类型 (qq.com)](https://mp.weixin.qq.com/s/4I7B_rtgB-ZSPA_mS5YBPQ)

- TypeScript中增加了对映射类型修饰符的控制
- 具体而言，一个 `readonly` 或 `?` 修饰符在一个映射类型里可以用前缀 `+` 或`-`来表示这个修饰符应该被添加或移除

| 符号 | 含义     |
| :--- | :------- |
| +?   | 变为可选 |
| -?   | 变为必选 |

### 7.1 Partial

- Partial 可以将传入的属性由非可选变为可选，具体使用如下：

```typescript
type Partial<T> = { [P in keyof T]?: T[P] };

interface A {
  a1: string;
  a2: number;
  a3: boolean;
}

type aPartial = Partial<A>;

const a: aPartial = {}; // 不会报错
```

### 7.2 类型递归

```typescript
interface Company {
    id: number
    name: string
}

interface Person {
    id: number
    name: string
    company: Company
}
type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object
    ? DeepPartial<T[U]>
    : T[U]
};

type R2 = DeepPartial<Person>
```

### 7.3 Required

- Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。

```typescript
interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
let p: Required<Person> = {
  name: 'zhufeng',
  age: 10,
  //gender: 'male'
}
```

### 7.4 Readonly

- Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。

```typescript
interface Person{
  name: string;
  age: number;
  gender?: 'male'|'female';
}
// type Readonly<T> = { readonly [P in keyof T]: T[P] };
let p:Readonly<Person> = {
  name:'zhufeng',
  age:10,
  gender:'male'
}
p.age = 11;
```

### 7.5 Pick

- Pick 能够帮助我们从传入的属性中摘取某一项返回

```typescript
interface Animal {
  name: string;
  age: number;
  gender:number
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
interface Person {
    name: string;
    age: number;
    married: boolean
}
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result: any = {};
    keys.map(key => {
        result[key] = obj[key];
    });
    return result
}
let person: Person = { name: 'zhufeng', age: 10, married: true };
let result: Pick<Person, 'name' | 'age'> = pick<Person, 'name' | 'age'>(person, ['name', 'age']);
console.log(result);
```

### 7.6 Record

- Record 是 TypeScript 的一个高级类型
- 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, map: (x: T) => U): Record<K, U> {
    let result: any = {};
    for (const key in obj) {
        result[key] = map(obj[key]);
    }
    return result;
}
let names = { 0: 'hello', 1: 'world' };
let lengths = mapObject<string | number, string, number>(names, (s: string) => s.length);
console.log(lengths);//{ '0': 5, '1': 5 }
type Point = 'x' | 'y';
type PointList = Record<Point, { value: number }>
const cars: PointList = {
    x: { value: 10 },
    y: { value: 20 },
}
```

## 8 自定义高级类型

- [utility-types](https://github.com/piotrwitek/utility-types)

### 8.1 Proxy

```typescript
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T> {
    let result = {} as Proxify<T>;
    for (const key in obj) {
        result[key] = {
            get: () => obj[key],
            set: (value) => obj[key] = value
        }
    }
    return result;
}
let props = {
    name: 'zhufeng',
    age: 10
}
let proxyProps = proxify(props);
console.log(proxyProps);

function unProxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originProps = unProxify(proxyProps);
console.log(originProps);
```

### 8.2 SetDifference

- SetDifference (same as Exclude)

```typescript
/**
 * SetDifference (same as Exclude)
 * @desc Set difference of given union types `A` and `B`
 * @example
 *   // Expect: "1"
 *   SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
 *
 *   // Expect: string | number
 *   SetDifference<string | number | (() => void), Function>;
 */
export type SetDifference<A, B> = A extends B ? never : A;
```

### 8.3 Omit

- Exclude 的作用是从 T 中排除出可分配给 U的元素.
- Omit<T, K>的作用是忽略T中的某些属性
- Omit = Exclude + Pick

```typescript
/**
 * Omit (complements Pick)
 * @desc From `T` remove a set of properties by key `K`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type Props = Omit<Props, 'age'>;
 */
export type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
```

### 8.4 Diff

```typescript
/**
 * Diff
 * @desc From `T` remove properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type DiffProps = Diff<Props, DefaultProps>;
 */
export type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;
```

### 8.5 Intersection

```typescript
/**
 * Intersection
 * @desc From `T` pick properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { age: number; }
 *   type DuplicateProps = Intersection<Props, DefaultProps>;
 */
export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
```

### 8.6 Overwrite

- Overwrite<T, U>顾名思义,是用U的属性覆盖T的相同属性.
- [mapped-types](https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts)

```typescript
/**
 * Overwrite
 * @desc From `U` overwrite properties to `T`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type NewProps = { age: string; other: string };
 *
 *   // Expect: { name: string; age: string; visible: boolean; }
 *   type ReplacedProps = Overwrite<Props, NewProps>;
 */
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

// Expect: { name: string; age: string; visible: boolean; }
type ReplacedProps = Overwrite<Props, NewProps>;
```

### 8.7 Merge

- Merge<O1, O2>的作用是将两个对象的属性合并:
- Merge<O1, O2> = Compute + Omit<U, T>

```typescript
type O1 = {
  id: number;
  name: string;
};

type O2 = {
  id: number;
  age: number;
};


//Compute的作用是将交叉类型合并
type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };

type R1 = Compute<{ x: "x" } & { y: "y" }>;
type Merge<O1 extends object, O2 extends object> = Compute<
  O1 & Omit<O2, keyof O1>
>;

type R2 = Merge<O1, O2>;
```

### 8.8 Mutable

- 将 T 的所有属性的 `readonly` 移除

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

## 9 面试题综合实战

- `infer` 关键字就是声明一个类型变量，当类型系统给足条件的时候类型就会被推断出来
- [typescript_zh](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md)
- [codesandbox](https://codesandbox.io/s/4tmtp)

```typescript
interface Action<T> {
    payload?: T;
    type: string;
}

class EffectModule {
    count = 1;
    message = "hello!";

    delay(input: Promise<number>): Promise<Action<string>> {
        let action: Promise<Action<string>> =  input.then(i => ({
            payload: `hello ${i}!`,
            type: 'delay'
        }));
        return action;
    }

    setMessage(action: Action<Date>): Action<number> {
        let action2: Action<number> = {
            payload: action.payload!.getMilliseconds(),
            type: "set-message"
        };
        return action2;
    }
}
// 把 EffectModule 中的方法名取出来
type methodsPick<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
// 定义转换前后的方法
type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>> // 转换前
type asyncMethodConnect<T, U> = (input: T) => Action<U> // 转换后
type syncMethod<T, U> = (action: Action<T>) => Action<U> // 转换前
type syncMethodConnect<T, U> = (action: T) => Action<U> // 转换后
// 条件类型+推断类型
type EffectModuleMethodsConnect<T> = T extends asyncMethod<infer U, infer V>
    ? asyncMethodConnect<U, V>
    : T extends syncMethod<infer U, infer V>
    ? syncMethodConnect<U, V>
    : never
type EffectModuleMethods = methodsPick<EffectModule>
// 映射类型
type Connect = (module: EffectModule) => {
    [M in EffectModuleMethods]: EffectModuleMethodsConnect<EffectModule[M]>
} 
type Connected = {
    delay(input: number): Action<string>;
    setMessage(action: Date): Action<number>;
};
const connect: Connect = (m: EffectModule): Connected => ({
    delay: (input: number) => ({
        type: 'delay',
        payload: `hello 2`
    }),
    setMessage: (input: Date) => ({
        type: "set-message",
        payload: input.getMilliseconds()
    })
});

export const connected: Connected = connect(new EffectModule());
```
