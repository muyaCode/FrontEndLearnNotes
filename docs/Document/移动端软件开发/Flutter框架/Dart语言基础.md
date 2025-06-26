# Dart 语言基础

dart 语言 **文档和教程**：<[Dart 教程 - Dart 教程 | 编程字典 (codingdict.com)](https://www.codingdict.com/article/21908)>

其他快速入门：

- [Dart 入门 - 简书 (jianshu.com)](https://www.jianshu.com/p/d90ba097c741)
- [Dart 入门 - 简书 (jianshu.com)](https://www.jianshu.com/p/4bc97a8a8449)

## 环境安装

官网：[Dart 编程语言主页 | Dart 中文文档 | Dart](https://dart.cn/)

Dart SDK 安装：[获取 Dart SDK | Dart](https://dart.cn/get-dart)

官网在线练习：[Dart 编程语言主页 | Dart 中文文档 | Dart](https://dart.cn/#try-dart)

## 语言风格

代码每一行 严格分号;

注释：和 JavaScript 一样

- 单行注释

- ```dart
  // 我是单行注释
  ```

- 多行注释

- ```dart
  /*
  * 我是多行注释
  */
  ```

## 变量和常量

### 变量

#### 指定值

初始化指定了值的类型，b 的类型就指定成什么值

可以通过 var 进行类型推断

- b 的后面属于什么类型会自动推断出来
- 判断属于的类型后，变量的类型便不可更改

```dart
var b = 1;
```

初始赋值后，后续值不可修改

编译函数过程中得到的值也可以

```dart
final d = 1;
```

#### 不指定值类型

初始化没有指定类型，a 是动态类型

```dart
var a;
a = 2;
a = "hello";
```

变量作用域

```dart

```

### 常量

只能直接指定值，编译得到的值不能给它赋值

```dart
const e = 10;
```

## 内置类型

### numbers-数值类型

#### int-整数值

```dart
int a = 1;
```

#### double-浮点数

```dart
double b = 1.1;
```

#### 数值类型的方法

```dart
a.floor()
a.ceil()
```

### String-字符串类型

#### 强类型声明

UTF-16 编码-字符序列声明

字符串可以单引号' ' ， 可以双引号" "

''' ''' 三个单引号多行字符串

```dart
String str = "sss";
```

#### 变量声明

```dart
var str = "aaa";
```

### booleans-布尔类型

#### 强类型声明 1

0 和 1 不能代表布尔类型

```dart
bool isTrue = flase;
```

### lists-列表类型

#### List

```dart
var arr1 = new List();
List arr2 = [1,2,3,4];
var arr3 = [1,22,3,6];
var a = <String>[];
```

#### 常用操作

```dart
arr1[0] = 100;
arr.add(300); // 添加
arr.remove(300); // 删除
arr.removeAt(0); // 下标删除
arr.indexOf(1); // 查找数字
...
```

### maps-键值对 对象

#### 声明 1

```dart
var gifts = {
    'first' : 'partridge',
    'age' : 18,
}
```

#### 声明 2

```dart
Map gifts = {
    1 : 'partridge',
    2 : 'sss',
}
```

#### 使用构造函数声明

```dart
var gifts = new Map();
gifts['first'] = 'partridge';
```

### Runes-字符集 32

字符、标点符号、表情符号的值

#### UTF-32 编码字符序列声明

```dart
var a = "\u2665";
Runes b = new Runes("\u2665");
```

### symblos-操作符、标识符

混淆后的代码，标识符的名字被混淆了，但是 Symbol 的名字不会改变

```dart
var a = Symblo("name"); // 第一种声明方式
var b = #b; // 第二种声明方式
```

## 运算符

### 算术运算符

| 算术运算符 | 作用 |
| ---------- | ---- |
| +          | 加   |
| -          | 减   |
| \*         | 乘   |
| /          | 除   |
| ~/         | 整除 |
| -expr      | 负号 |
| %          | 取余 |

### 递增递减运算符

#### ++a

```dart
a=a+1 // 值为a+1
// 先加再输出
```

#### a++

```dart
a=a+1 // 值为a
// 先输出再加
```

#### --a

```dart
a=a+1 // 值为a-1
// 先减再输出
```

#### a--

```dart
a=a+1 // 值为a
// 先输出再减
```

### 类型测试操作符

#### 类型转换

```dart
var str = 'aaa';
str as object
```

#### 当类型是相应的类型时返回 true，不是则返回 false

```dart
var obj = {};
obj is object
```

#### 当类型不是相应的类型时返回 true

```dart
var obj = {};
obj is! object
```

### 赋值操作符

| 赋值操作符 |                                     作用                                      |
| :--------: | :---------------------------------------------------------------------------: |
|     =      |                                                                               |
|    ??=     | a = value;<br/>b ??= value;<br/>如果 b 为空，则将值分配给 b；否则，b 保持不变 |
|     -=     |                                                                               |
|     /=     |                                                                               |
|     %=     |                                                                               |
|    >>=     |                                                                               |
|    <<=     |                                                                               |
|     &=     |                                                                               |
|    \|=     |                                                                               |
|     ^=     |                                                                               |
|     +=     |                                                                               |
|    \*=     |                                                                               |
|    ~/=     |                                                                               |

### 逻辑运算符

| 逻辑运算符 |  作用  |
| :--------: | :----: |
|   !expr    | 逻辑反 |
|    \|\|    | 逻辑或 |
|     &&     | 逻辑与 |

### 位运算符

| 位运算符 |                作用                |
| :------: | :--------------------------------: |
|    &     |                 与                 |
|    \|    |                 或                 |
|    ^     |                异或                |
|  ~expr   | 一元位补码(0s 变为 1s，1s 变为 0s) |
|    <<    |                左移                |
|    >>    |                右移                |

### 条件表达式

如果条件为真，返回 expr1，否则返回 expr2

```dart
condition  ? expr1 : expr2;
```

如果 expr1 为空则返回它的值，否则计算并返回 expr2 的值

```dart
expr1 ?? expr2;
```

### 级联符号

级联(...)允许对同一对象执行一系列操作

```dart
...text = ' ';
```

## 流程控制

### 条件控制

```dart
if(){}else{}
```

### 循环

#### for 循环

```dart
for(var i = 0; i<2; i++){}
```

#### while 循环

```dart
while(count<=5){}
```

#### do while 循环

```dart

```

#### 跳出循环-结束当前循环

break

#### 结束循环

continue

### 分支选择

```dart
switch(name){
case "zhangsan":
  print("张三")；
  break;
default:
  print("查无此人")；
  break;
}
```

### 断言

```dart
assert()
```

## 方法定义

### 三种方式

1

```dart
// 1.String 返回值类型，bool string list map num class
String getUser(String name){
  return "$name is very good";
}
```

2

```dart
// 2. dynamic 方式
getUser2(name){
  return "$name is very good";
}
```

3

```dart
// 3.箭头函数的写法
String getUser3(String name) => "$name is very good";
```

### 程序调用入口

```dart
void main(){print(getUser("张三"))}
```

### 参数定义

必传参数

- `num id`

可选命名参数

- `{bool,flag,String name}`

可选位置参数

- `[bool,flag,String name]`

默认值

- `name = "hello"`

```dart
getProduct(num id,{bool,flag,String name = "hello"}){}
```

### 匿名方法

```dart
var getName = (){
  print("hello");
};
getAll(Funtion cb){
  cb(["hello haha"]);
};
void main(){
  getName();
  getAll((data){
    print(data);
  });
}
```

### 函数内部变量作用域

大括号里定义的变量就只能在大括号{}里访问

### 函数闭包

一个 闭包 是一个方法的对象，该对象都能访问自己作用域内的变量(既捕获了变量)

```dart
count(){
  var n = 0; // local scope
  return (){
    n++;
    print(n);
  };
}

void main(){
   var func = count();
   func(); // 输出 1
   func(); // 输出 2
}
```

## 面向对象-类的定义

### 基本定义

```dart
class Animal{
  // 私有成员变量 "_"(实例属性)
  String name;
  int _age;
  // 给私有属性添加一个getter的访问器
  in get age{
    return this._age;
  }
  // 给私有属性添加一个setter的存储器
  set age(int age){
    this._age = age;
  }
  // 私有方法
  void _learn(){
    print("learn 的私有方法");
  }
  // 类变量 属于类本身
  static List tags ;
  // 类方法
  static sleep(){
    print("Animal 睡觉了");
  }
  // 成员方法
  eat(){
    print("$name is eating");
  }
  // 构造方法 一个类只有一个
  // 生成类的对象 初始化实例属性
  Animal(String name,int age) {
    this.name = name;
  }
  // 命名的构造方法
  Student.withName(){

  }
}
```

d

```dart
void main(){
  var cat = Animal("cat"); // new Animal(); ，可以省略new
  print(cat.name);
  cat.eat();
  Animal.tags = ["可爱"];
  print(Animal.tags);
  Animal.sleep();
  // 常量构造方法
  // 类生成的对象不可改变时使用
  const s1 = Student(“张三”);
  // 访问私有成员
  cat.learn();
}


```

### final 定义属性时

```dart

```

### 工厂构造方法

```dart
class Person{
  static Map<String,Person>_cache;
  //工厂构造器中访问
  factory Person(){
    if(_cache == null){
      _cache = new Map<String,Person>();
    }

    if(_cache["p"] == null){
      _cache["p"] = Person._inner();
    }

    return _cache["p"];
  }
  // 命名私有的构造方法
  Person._inner();
  say(){}
}
```

### 对象的仿真函数 call

```dart
class Student {
  call(int a,int b){
    print("${a+b} 如果类实现了call方法，则该类的对象可以作为方法使用 $b");
  }
}

void main(){
  var s = Student();
   s(1,2);
}
```

### 类的继承

继承写法

```dart
class A{
  A.widthName(){

  }
}
// 继承父类
class B extends A{
  B():super.widthName(){

  }
}
```

子类可以 继承或者覆盖重写 父类的方法

子类重写：get、set 方法

```dart
@override
  int get x => super.x;

  @override
  void set x(int _x) {
    super.x = _x;
  }
```

构造方法的继承-子类指向构造父类方法

```dart
B():super.widthName(){

}
```

### 抽象类-abstract

抽象类不能实例化，不能有对象-主要是用来让子类继承

```dart
abstract class Preson{
  //普通方法或者属性
  say(){

  }
  //抽象方法:子类必须实现
  sleep();
}
class Student extends Person {
  @override
  sleep() {
    // TODO: implement sleep
    return null;
  }
}
```

### 类和类之间的高级用法

#### 接口类型

面向对象的高级用法: 类与类之间的关系 接口

interface：

- 1.接口中的所有属性或者方法，子类都需要实现
- 2.一个类可以实现多个接口，从而多继承

```dart
abstract class Person {
  String name;
  say(){

  }
  eat(){

  }
}

class Driver {
  drive(){

  }
}

//当使用implements 类，这个类就被当做接口
//子类都必须重写
class Student implements Person,Driver{
  @override
  eat() {
    // TODO: implement eat
    return null;
  }

  @override
  say() {
    // TODO: implement say
    return null;
  }

  @override
  String name;

  @override
  drive() {
    // TODO: implement drive
    return null;
  }
}
```

当使用 implements 类，这个类就被当做接口

#### 混合 mixins

mixins 实现类的多继承 with

with 来实现类的继承,不可以显示申明构造方法

```dart
class A {
  a(){
    print("a");
  }
}

class B {
  b(){
    print("b");
  }
}

class C with A,B {
  c(){
    print("c");
  }
}
// 调用
void main(){
  var c = C();
  c.a();
  c.b();
}
```

#### 枚举

用户自定义的语义化类型

```dart
//枚举
enum Color {
  red, //0
  yellow,
  blue
}

showColor(name){
  switch(name){
    case Color.blue:
      print("$name is color");
      break;
    case Color.yellow:
      print("$name is color");
      break;
  }
}

void main(){
   showColor(Color.blue);
}
```

#### 泛型

作用：类型的约束，把类型申明延迟到使用的时候指定

```dart
class User {

}
//泛型方法 T
show<T>(T a){
  print(a);
}
class Person<T> {
  say(T a){
    print(a);
  }
}

void main(){
  //泛型列表
  var list = new List<String>();
  list.add("1");
  var users = new List<User>();
  users.add(new User());
  show<String>("hello");
  show<int>(1);
  var p = Person<String>();
  p.say("hello");
}
```

## 异步编程

### async await

### Future

## Dart 的 库

### 导入库

```dart
import ‘libs/hello.dart’; // 导入库
import ‘libs/hello.dart’ as hello; // 导入库 和 设置别名
import ‘libs/hello.dart’ as hello show getSome; // 只导入库的getSonme方法 和 设置别名
```

### 系统内置库

官网：<https://api.dartlang.org>

#### 导入内置库

```dart
import ‘dart:io’;
```

#### 内置库分类

CORE

VM

WEB

### Pub 包管理系统中的库

<https://pub.dev/packages>

<https://pub.fluter-io.cn/packages>

<https://pub.dartlang.org/flutter/>

#### 使用

1.项目根目录新建 pubspec.yaml 文件

2.pubspec.yaml 文件里 配置 名称、描述、依赖

- 具体配置语法

  3.然后运行 pub get 获取包下载到本地目录

  4.项目引入库 import ’package:http/http.dart‘ as http ;

- 看文档使用
