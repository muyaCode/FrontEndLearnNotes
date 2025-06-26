# JavaScript 基础

JavaScript 介绍：

- <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Overview#functions>
- <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript>

**MDN 的 JavaScript 从入门到高级文档**：<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript>

编程之家 JavaScript 文档：<https://www.jb51.cc/javascript-tutorial/1186430.html>

JavaScript 菜鸟教程基础文档：<https://www.runoob.com/js/js-tutorial.html>

JavaScript 菜鸟教程文档：<https://www.runoob.com/js/js-libraries.html>

JavaScript 实例：<https://m.runoob.com/js/js-examples.html>

JavaScript 各种对象文档参考：<https://www.runoob.com/jsref/prop-element-classList.html>

腾讯复制 MDN 的 JavaScript 文档：<https://www.apiref.com/javascript-zh/index.htm>

[不知道，但是可能超有用的 Web API - 掘金 (juejin.cn)](https://juejin.cn/post/7345775192260755497)

---

基础练习作业：

1.通过 concat 方法实现"abc","def","hij"的字符串的拼接---->输出结果为:"abcdefhij"

2.通过 indexOf 方法实现"what are you no sha lei" 每个字符串的出现的次数

3.通过 replace 方法实现 "小苏好帅" 替换成 "小杨好帅"

4.通过 split 方法实现 "小明|小红|小丽|小白" 该字符串去掉|

5.通过 substr 方法实现 "十一这个假期作业好少啊" 该字符串最终的截取结果为:---->"作业好少啊"

6.通过 every 方法实现[1000,1500,2500,3000]该数组中是否所有的工资都大于 2000,

7.通过 filter 方法实现筛选[0,100,0,200,300,500,0]把数组中不是 0 的数字组成一个新的数组

8.扩展题:可以查询 MDN 实现,请把下面这个数组中的数据通过 sort 方法进行排序["adf","abdc","abc","abtg"]

9.通过 join 方法实现数组中每个元素中间有一个|最终组成一个新的字符串并输出,数组如下:["小明","小红","小白","小黑"]

10.通过 slice 方法把该数组[10,20,30,40,50,60,70]中 30,40,50 替换成 300,400,500,最终输出数组的结果为:------>[10,20,300,400,500,60,70]

11.模拟百度搜索案例

12.通过三种方式创建下面的对象(属性和方法都需要写出来)
一辆黑色的奔驰车是四个轮子,该车的重量是 500kg,这辆车今天载了两个人在大街上以 120/h 的速度狂奔

13.动物都有名字,性别,年龄,动物都有打招呼,还有吃和玩的行为,小狗经常咬人,小猫经常抓老鼠,请创建对象及调用方法,并且通过原型添加方法,实现继承

14.把文件夹中的扩展作业抄写一遍

15.把文件夹中验证帐号和密码登录实现代码抄写一遍

16.把文件夹中完整本祝福墙代码抄写一遍(innerHTML 后面的大量字符串拼接可直接复制)

17.把解析 URL 中的字符串代码抄写一遍

18.把 JS 高级第一天的面向对象的案例抄写一遍

19.把文件夹中点赞案例抄写一遍

20.把文件夹中表格排序案例抄写一遍

21 为同一个元素注册不同的事件,指向相同的事件处理函数

## JS 基础

### JavaScript 的应用

- 前端

  - 子主题 1

- 后端

  - node.js

- 移动端

- PC 端

- 游戏

### JavaScript 的组成

- ECMAScript

  - JavaScript 的语法标准规范

- BOM

  - JavaScript 操作浏览器的部分功能的 API 对象模型

- DOM
  - JavaScript 操作网页上的元素的 API 文档对象模型

### JavaScript 语法规范

- 行内式

  - 你们好啊

- 页内式

  - alert("你们好啊")

- 外链式
  - `<script src="js/index.js"></script>`

### JavaScript 注释

- 双斜杠 // 后的内容将会被浏览器忽略：
  - // 我是注释

## JavaScript 基础语法

### 字面量(常量) (不可改变的值)

- 字符串（String）

  - 可以使用单引号或双引号:
    - "John Doe" 'John Doe'

- 表达式

  - 用于计算：
    - 5 + 6 5 \* 10

- 数组（Array）

  - 定义一个数组：
  - [40, 100, 1, 5, 25, 10]

- 对象（Object）

  - 定义一个对象：
  - let obj = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}

- 函数（Function）

  - 定义一个函数：
    - function myFunction(a, b) { return a \* b;}

- 布尔常量

  - false

  - true

- 特殊字符

### 变量

- 变量用于存储数据值。

- JavaScript 使用关键字 var 来定义变量 使用等号来为变量赋值：

  - var x, length x = 5 length = 6

- 变量作用域

  - 块级作用域

    - 在其他语言中，任何一对花括号的语句都属于一个块 在这中定义的所有变量代码块外都是不可见的

  - 全局变量

    - 定义在 script 或者 不属于某个函数的变量

      - var str = '';

    - 如果在函数内部没有送申声明的变量，也属于全局变量
      - num = 100

  - 局部变量

    - 定义在函数内部的变量

    - 函数的形参也可以是局部变量

  - 注意

    - 函数内部可以访问到该函数所属的外部作用域的变量（作用域链）

    - 不使用 var 声明的变量是全局变量，不推荐使用

    - 变量退出作用域之后会销毁，全局变量关闭网页或者浏览器才会销毁

  - 作用域链相关

    - 其他语言中变量 i 只能在 for 循环内部访问(局部变量)

    - 全局变量

      - var name = "111"; function f(){ name="222"; } f(); console.log(name);

        - 按从上往下执行

        - 输出：222

    - 局部变量，现在函数内部的作用域找变量 name， 如果找到则使用，如果找不到则去父级作用域找 name 变量

    - 作用域链

  - 变量提升

### 关键字和保留字和标识符

- 保留字符

- 关键字

- 标识符

  - 命名要求

    - 1.以字母、下划线或者$符号开头

    - 2.由字母、下划线、$符号和数字组成

    - 3.不能是 ES 中的关键字和保留字

    - 一般采用驼峰命名法

      - 首字母小写，每个单词的开头字母大写，其余字母小写

      - addHa

  - JS 底层保存标识符时实际上是采用的 Unicode 编码， 所以理论上讲，所有 utf-8 中含有的内容都可以作为标识符

### Unicode 编码表

### 运算符(操作符)

- 运算符

  - 算数运算符

    - - 加法

    - - 减法

    - - 乘法

    - / 除法

    - % 系数

    - ++ 递加

    - -- 递减

    - (a++,++a)

  - 赋值运算符

    - = x = y x = y

    - += x += y 等同于 x = x + y

    - -= x -= y 等同于 x = x - y

    - _= x _= y 等同于 x = x \* y

    - /= x /= y 等同于 x = x / y

    - %= x %= y 等同于 x = x % y

  - 比较(关系)运算符

    - == 相等

      - 1.如果两个值的类型不同，则会自动进行类型转换， 将其转换为相同的类型，然后再比较

      - 2.undefined 衍生自 null，所以这两个值做相等判断时，会返回 true

      - 3.NaN 不和任何值相等，包括它本身
        - 可以通过 isNaN()函数判断一个值是否为 NaN

    - != 不相等

      - 1.如果两个值的类型不同，则会自动进行类型转换， 将其转换为相同的类型，然后再比较

    - === 等值等型(全等)

      - 全等不会自动类型转换

    - !== 不等值或不等型

      - 不全等不会自动类型转换

    - `>` 大于

    - `<` 小于

    - `>=` 大于或等于

    - `<=` 小于或等于

    - ? 三元(条件)运算符

      - 条件表达式 ？ 语句 1 : 语句 2

      - 1.条件运算符执行时，首先对条件表达式进行求值

      - 1.1 如果该值为 true，则执行语句 1，并返回执行结果

      - 1.2 如果该值为 false，则执行语句 2，并返回执行结果

      - 1.3 如果条件表达式的求值结果是一个非布尔值，会先把值转成布尔值，再运算

  - 逻辑运算符

    - &&

      - 逻辑与

      - 非布尔类型会自动转换为布尔类型判断

      - 两个值中都为 true 才返回 true，否则返回 false

      - 短路与运算

        - true && alert("弹出来了")

        - 第一个为 true，则不会检查第二个值

    - ||

      - 逻辑或

      - 两个值中有一个为 true 就返回 true， 两个为 false 才返回 false

      - 短路或运算

        - false && alert("123")

        - 第一个为 false，则不会检查第二个值

    - && || 非布尔值的情况

      - 会先将其转为布尔值，然后再运算，并且返回原值

      - 与运算

        - true && true

          - 与运算：如果第一个值为 true，则返回第二个值

        - false && true

          - 与运算：如果第一个值为 false，则返回第一个值

        - false && false
          - 与运算：如果两个值都是 false，则返回靠前的 false

      - 或运算

        - true || true

          - 与运算：如果第一个值为 true，则直接返回第一个值

        - false || true

          - 与运算：如果第一个值为 false，则直接返回第二个值

        - false || false
          - 与运算：如果两个值都是 false，则返回后面的 false

    - ！

      - 逻辑非

      - 所谓非运算就是值对一个布尔值进行取反操作， true 变 false，false 变 true

      - 如果对一个值进行两次取反，它不会变化

      - 如果对非布尔值进行元素，则会将其他转换为布尔值，然后再取反 所以我们可以利用该特点，将一个其他的数据类型转为布尔值 可以为一个任意数据类型取两次反，来将其转为布尔值 原理和 Boolean()一样

  - 类型运算符

    - typeof

      - 返回变量的类型。

    - instanceof
      - 返回 true，如果对象是对象类型的实例。

  - 位运算符

    - `&` 与

    - `|` 或

    - `~` 非

    - `^` 异或

    - `<<` 零填充左位移

    - `>>` 有符号右位移

    - `>>>` 零填充右位移

  - 逗号运算符

    - 表达式 1,表达式 2,......,表达式 4;

    - var a,b,c

    - var a=1, b=2, c=3

  - 复合赋值运算符

    - `+=` 加后赋值 变量+=表达式 如 a+=1; 即 a=a+1

    - `-=` 减后赋值 变量-=表达式 如 a-=1; 即 a=a-1

    - `*=` 乘后赋值 变量 =表达式 如 a=1; 即 a=a\*1

    - `/=` 除后赋值 变量/ =表达式 如 a/=1; 即 a=a/1

    - `%=` 取模后赋值 变量%=表达式 如 a%=1; 即 a=a%1

    - `a *= 1+2`
      - 先算右边

  - 自增自减运算符

    - 自增

      - i++

      - ++i

    - 自减

      - i--

      - --i

    - 后缀表达式

      - x++，x--
        - 先用 x 的当前值作为表达式的值，再进行自增自减 1 运算， 即“先用后变”也就是先用变量的值参与运算， 变量的值再进行自增自减变化
          - var numi = 20, num2 = 30' var res=(num1++) + (num2++); console.log(res);//50 console.log(num1);//21 console.log(num2);//31

    - 前缀表达式
      - ++x,--x
        - 先完成变量的自增自减运算再用 x 的值作为表达式的值； 即“先用后变” 也就是变量的值先变，再用变量的值参与运算。
          - var numi = 20, num2 = 30' var res=(--num1) + (--num2); console.log(res);//48 console.log(num1);//19 console.log(num2);//29

  - 三目(三元)运算符

    - 条件 1?值 1 或操作 1: //如果满足条件 1，就返回值 1 或执行操作 1 条件 2?值 2 或操作 2: //否则，如果满足条件 2，就返回值 2 或执行操作 2 ...?..........: 默认值或操作; //否则，（前边条件都不满足） //执行默认操作，或返回默认值

    - 总结：多个条件，多件事，多选一执行。

    - 如果操作语句比较简单，建议用三目运算替代 if..else 简化代码 但是使用的前提是要必须有一个确定的结构

- 运算符的优先级

  - 第一位：`. [] ()`

    - 字段访问、数组下标、函数调用以及表达式分组

  - 第二位：`!、-+、++、-- 、 ~ !`

    - 一元运算符、返回数据类型、对象创建、未定义值

  - 第三位：`*、/、%`

    - 乘法、除法、取模

  - 第四位：+、-

    - 加法、减法、字符串连接

  - 第五位：`<、<=、>、>=`

    - 小于、小于等于、大于、大于等于、instanceof

  - 第六位：`==、!=、===、!==`

    - 等于、不等于、严格相等、非严格相等

  - 第七位：`&&`

    - 逻辑与

  - 第八位：`||`

    - 逻辑或

  - 第九位：`?:`

    - 条件

  - 第十位：`=、+=、-=、*=、/=、%=`

    - 赋值、运算赋值

  - 如果优先级搞不清的，可以通过括号()改变优先级

- 结合性

  - 两种结合性

    - 自右向左

    - 自左向右

- 内置方法

  - 数学计算方法：Math

    - Math.random() 随机数[0,1],不用书写参数

    - Math.pow() 幂的计算：第一个参数：底数 第二个参数：指数

    - Math.sqrt() 计算开方数，只需要书写一个要开方的数

### 数据类型

- 数据类型

  - 数字型（Number）

    - JS 中标识数值的最大值

      - Number.MAX_VALUE

      - 1.7976931348623157e+308

    - JS 中标识数值的最小值

      - Number.MIN_VALUE

      - 5e-324
        - 大于 0 的最小值(正最小值)

    - 如果使用 Number 表示的数字超过了最大值，则会返回一个 Infinity，表示正无穷

      - typeof Infinity

      - 返回 number

    - var a = "aa" \* "bb" console.log(typeof a)

      - 返回 NaN

      - NaN 是一个特殊的数字，表示 Not A Number

      - 使用 console.log(typeof NaN)
        - 会输出 number

    - 浮点数计算精度丢失

      - var c = 0.1+0.2

      - 所以关乎支付的不要用前端 JS 进行计算，要用后端计算

  - 字符串型（String）

    - 转义字符

    - 检测获取字符串长度

      - str.length

    - 字符串的拼接

      - '我是' + '大佬'

      - \+ 号：数值是相加的，字符是相连的

  - 布尔型（boolean）

    - true

      - 逻辑真

    - false
      - 逻辑假

  - 空（Null）

    - null

    - 专门用来表示空对象

  - 未定义（Undefined）

    - undefined

    - 当声明一个变量，但未赋值，它的值就是 undefined

  - 对象（object）

    - // Object 通过对象字面量赋值 var person = {firstName:"John", lastName:"Doe"};

  - 数组 Array

    - // Array 通过数组字面量赋值 var cars = ["Saab", "Volvo", "BMW"];

  - Symbol（ES6）

- 数据类型检测

  - typeof(NaN)

  - typeof NaN

- 类型转换

  - 转为字符串型

    - 变量.toString()

      - a.toString()

      - 不适用于 undefined 或 null 值的变量，否则会报错

    - String(变量)

      - 除了常见类型，也可以把 undefined 或 null 值的字面量都转成对应的字符串，也就是全部类型都可以转，建议使用

    - 拼接方法 （字符串拼接的数值都变成字符串）
      - num + ' '

  - 转换为数字型

    - Number(变量)

      - 1.如果是纯数字的字符串，则直接将其转换为数字

      - 2.如果字符串里面含有非数字的字符，则返回 NaN

      - 3.如果是空字符串或全是空格的，则转换为 0

      - 4.布尔值 --> 数字

        - 1.如果是布尔值 true，则转为 1

        - 2.如果是布尔值 false，则转为 0

      - 5.如果是 Null --> 数字，则转换成 0

      - 6.如果是 undefined --> 数字，则转换成 NaN

    - parseInt(变量)

      - 1.把一个字符串转换成整数

      - 2.可以将一个字符串中的有效整数内容取出来

      - 3.如果对非 String 使用 parseInt()或 parseFloat()，会先将其转成 String，然后再操作

      - 4.可以用于数字型的浮点数取整

      - 5.可以传递第二个参数，指定进制数

        - parseInt('070',10)

        - 转成 10 进制的整数

    - parseFloat(变量)

      - 1.把一个字符串转换成浮点数

      - 2.可以将一个字符串中的有效小数内容取出来

      - 3.如果对非 String 使用 parseInt()或 parseFloat()，会先将其转成 String，然后再操作

    - 算术运算转成数字型 (隐式转换)

      - \- \* /

        - ('12' - 0)

        - ('120' - '110')

        - ('123' \* 1)

  - 转换为布尔型

    - Boolean(变量)

      - 1.当数字 --> boolean： 大于或小于 0 或为 Infinity(无穷大)时都为 ture 等于 0 或 NaN 时则为 false

      - 2.当字符串 --> boolean: 除了空字符串''，其余都是 true

      - 3.null 或 undefined --> boolean: 都会转成 false

      - 4.对象也会转成 true

  - toExponential()

    - 把对象的值转换为指数计数法。

  - toFixed()

    - 把数字转换为字符串，结果的小数点后有指定位数的数字。

  - toPrecision()

    - 把数字格式化为指定的长度。

  - 基本数据类型转换的注意原理

    - 包装类 String()/Number()/Boolean() 会将基本数据类型转换成 对象 (浏览器底层使用的方法)

    - 当我们对一些基本数据类型的值去调用属性和方法时 toString()...， 浏览器会临时使用包装类 String()/Number()/Boolean() 将其转换为对象，然后再调用对象属性和方法

    - 调用完以后，再将其转换会基本数据类型

### 流程控制语句

- 编程思路

  - 问题：从键盘输入一个整数，判断其是否是偶数，如果是偶数就输出 yes，否则输出 no

  - //1.定义一个变量 var xx; //2.接收用户输入的整数 xx = +(window.prompt("请输入一个整数")) ; //2.1 把字符串转成数值 //3.合法性验证，数据安全校验 if(isNaN(xx)){ alert("输入的内容有误！")； }else{ //4.判断用户输入的整数是否是偶数 if(){ }else{ } }
    - 哪些数值可以作为变量定义

- 结构

  - 顺序结构

    - 默认的流程结构：按照书写顺序从上到下执行

  - 选择结构

    - 对给定的条件进行判断，在根据判断结构来决定执行那一段代码

  - 循环结构
    - 在给定条件成立的情况下，反复执行某一段代码

- 条件判断语句

  - if...else 语句

    - if(条件表达式){ 满足条件执行代码块 }else{ 不满足条件执行代码块 }

  - if(){}else if(){}else{} 语句

  - 三元表达式

    - 条件表达式? 值 1 : 值 2；

    - 如果表达式真，值取值 1。如果表达式假，结果为值 2

  - switch 条件分支语句

    - switch(表达式){ case 值: 执行体; break; case 值 2: 执行体; break; default: 以上情况都不满足后执行 }

    - 同样的输出可以合并

      - case 条件 1|| 条件 2 ...: 输出执行语句

    - 子主题 3

- 循环语句

  - for 循环

    - 循环代码块一定的次数

      - for (① 初始化表达式,② 循环条件表达式,③ 循环后操作表达式){ 被执行的代码块 }

        - `for (var i=0; i<5; i++){      x=x + "该数字为 " + i + ""; }`

      - `for(var i = 1;i< 100;i++){ 	console.log(i) 		}`

      - 循环变量 i 是全局变量，可以全局使用

      - for 循环嵌套 if(){}语句

        - `for(var i = 1; i <= 20; i++){ 			if(i % 5 == 0){ 				console.log(i) 			} 		}`

      - for 循环嵌套 for 循环
        - `for(var i = 1; i <= 5; i++){ 			for(var j = 1;j <= 10;j++){ 				console.log('i = ' + i ,'j = ' + j) 			} 		}`

    - 流程

      - for 循环开始时，会先执行初始化表达式，而且循环过程中只执行一次初始化表达式

      - 接着判断循环条件是否为真，如果条件为真，就会执行循环体中的语句

      - 循环体执行完毕后，接下来会执行循环后的操作表达式

      - 执行完循环后操作表达式，然后再次判断循环条件表达式是否为真，如果为真，就会执行循环体中的语句

      - 重复上述过程，直到条件不成立就结束 for 循环

    - 注意

      - 死循环
        - `for(;;){}`

    - 练习

      - 打印好友列表

        - `for(var i=1;i<=3;i++){    console.log("好友列表"+i);    for(var j=0;j<3;j++){        console.log("    好友"+j);    } }`

      - 循环嵌套：利用“\*”绘制矩形

        - `//外循环控制行数 for(var i=0;i<3;i++){    //内循环控制列数    for(var j=0;j<3;j++){        window.document.write("*");        console.log("("+i+","+j+")");    }    window.document.write(""); }`

      - 循环嵌套：利用“\*”绘制直角三角形

        - `//外循环控制行数 for(var i=0;i<5;i++){    //内循环控制列数    for(var j=0;j<=i;j++){        window.document.write("*\t");    }    window.document.write(""); }`

      - 循环嵌套：利用“\*”绘制反直角三角形

        - `//外循环控制行数 for(var i=0;i<5;i++){    //内循环控制列数    for(var j=0;j<=5;j++){        window.document.write("*\t");    }    window.document.write(""); }`

      - 循环嵌套：打印数字组成的特殊三角形

        - `for(var i=0;i<3;i++){    for(var j=0;j<=i;j++){        window.document.write(j + 1 + "  ");    }    window.document.write(""); }`

      - 循环嵌套：打印正三角形

        - `for(var i=0;i<6;i++){    for(var j=0; j<5-i; j++){        window.document.write("-");    }    //主    for(var m=0; m<2*i+1; m++){        window.document.write("-");    }    window.document.write(""); }`

      - 循环嵌套：打印 99 乘法表
        - `//外循环控制行数 for(var i=0;i<=9;i++){    //内循环控制列数    for(var j=1;j<=i;j++){        document.write("" + j + "*" + i + "=" +  i  *  j+ "");    }    window.document.write(""); }`

  - for/in

    - 循环遍历对象的属性

  - while 循环

    - 当指定的条件为 true 时循环指定的代码块

    - 先判断条件表达式，如果为真，再执行循环语句

    - 满足条件才执行

    - while (条件) { 需要执行的代码 }

      - `while (i<5) {    x=x + "the number is " + i + "";    i++; }`

    - 注意点

      - 死循环

        - `while(true){ alert("666"); }`

        - `while(1);`

  - do while 循环

    - 同样当指定的条件为 true 时循环指定的代码块

    - 无论条件满不满足，先执行一次

    - 先执行循环语句，再进行 while 条件表达式，语句至少执行一次

    - do { 需要执行的代码 } while (条件);
      - `do {    x=x + "The number is " + i + "";    i++; } while (i<5);`

- break、continue 关键字 （跳出或者结束）

  - break

    - 结束，中断(终止) 所在层循环语句，不再运行

    - break 关键字 可以用来 退出 switch 或循环语句(for/while)

    - 不能单在 if 语句中使用 break 或 continue

    - 但是在 for()循环里面的 if()里使用

      - for(){ if(){ break; } }

    - 或可以通过标签控制结束多层嵌套的指定层循环

      - waiceng: for(){ for(){ if(){ break waiceng; } } }

    - 会立即终止离他最近的那个循环语句

  - continue

    - continue 关键字结束所在层这次循环，进入下一次循环

    - 不能单在 if 语句中使用 continue

    - 但是在 for()循环里面的 if()里使用

      - for(){ if(){ continue; } }

    - 或可以通过标签控制结束多层嵌套的指定层循环
      - waiceng: for(){ for(){ if(){ continue waiceng; } } }

### 函数(Function)

- JavaScript 语句可以写在函数内，函数可以重复引用：

- 1.函数定义和调用

  - 函数创建方法

    - 1.命名函数(函数声明)

      - function fn() {};

      - // 调用 fn(); fn.call()

    - 2.构造函数

      - function Function() {}

      - // 实例对象调用 var add1 = new Function('参数 1'，'参数 2'，'函数体')；
        - 都要带引号

    - 3.匿名函数

      - var fun = function () {}

      - //调用 fun();

  - 所有的函数都是 Function 的实例对象，都有原型对象，对象能干的事函数也能干，万物皆对象

- 2.函数的参数

  - 形参

    - 形式上参与运算的变量，无实际值，为实参占位置，就像一个躯壳一样

    - function f(a,b){} //a,b 是形参

  - 实参

    - 实际参与运算的变量。真实参与运算的变量。

    - f(x,y); //x,y 实参，有具体的值， 会把 x,y 复制一份给函数内部的 a 和 b， 函数内部的值是复制新值，无法修改外部的 x,y

  - 参数为函数(一个函数式另一个函数的参数)

    - fun(next())

      - 带()的

      - 调用函数

      - 相当于使用函数的返回值

    - fun(next)

      - 函数对象

      - 相当于直接使用函数对象

  - arguments 对象参数

    - 是个类数组对象，传入所有参数。

    - 其包含一个 length 属性， 可以用 arguments.length 来获得传入函数的参数个数。

  - 注意
    - 其他语言实参和形参的个数必须一样， 但在 JS 当中没有函数签名的概念， 实参的个数和形参的个数可以不相等

- 3.函数返回值(return)

  - 函数执行完毕以后返回的结果

  - 1.若在函数中不指定返回值，则会默认返回 undefined；

  - 2.return 语句表示从当前函数退出，并从那个函数返回一个值；执行 return 后，后面的程序不会再执行

  - 3.若仅仅写一个 return，则也会返回 undefined，且会终止程序；

  - 4.return 后可以跟任意类型的数据， 可以是基本数据类型，也可以是对象，甚至是函数；

  - 5.当 return 返回是 false 时，也将会中断操作；

  - 6.推荐用法：使用 return 要有一个有效的返回值，要不就不要使用 return;

- 4.函数声明的提升

  - JavaScript 解析器首先会把当前作用域的 函数声明提前到整个作用域的最前面。 而表达式不会，要按顺序先声明

  - 变量名和函数名相同，优先提升函数名，变量将名字给函数用

- 5.函数作用域链

  - 1.函数作用域的基础概念

    - 函数内定义的变量，不能在函数之外的任何地方访问，而这个函数可以访问其范围内的任意变量和函数，以及其父函数有权访问的任何其他变量。

    - 函数不仅可以访问自己内部定义的变量，还可以访问外部函数中的变量，以及外部函数的外部函数的变量

  - 2.特性

    - 函数作用域内，依旧遵从变量提升（包括函数提升）和顺序执行。

    - 顺序执行和变量提升

  - PS：变量提升是块级作用域和函数作用域的主要区别。

- 6.绑定事件函数

  - btn.onclick = function() {}

  - 点击绑定的元素按钮就会调用

- 7.定时器函数

  - 定时器语法

    - let timeId1 = setTimeout(fn,ms)

      - 在指定的毫秒数后调用函数或计算表达式，函数返回一个定时器的 timeId。

      - 参数详解

        - fn: 自定义函数

        - ms: 函数的间隔调用周期，单位：毫秒

    - let timeId2 = setInterval(fn,ms)

      - 按照指定的周期（以毫秒计）来调用函数或计算表达式，函数返回一个定时器的 timeId。

      - 参数详解

        - fn: 自定义函数

        - ms: 函数的间隔调用周期，单位：毫秒

    - 两种方法差异

      - setTimeout 调用一次

      - setInterval 调用多次（以周期为单位重复调用）

    - 取消定时

      - clearTimeout(timeId1)

        - 取消由 setTimeout() 方法设置的 timeId。

      - clearInterval(timeId2)
        - 取消由 setInterval() 设置的 timeId。

  - 应用场景
    - 一般用于制作动画效果，比如：轮播动画，倒计时跳转页面。

- 8.匿名函数

  - 没有命名的函数，创建一块封闭区域

  - 作用

    - 用在绑定事件

      - document.onclick = function(){ alert(1); }

    - 定时器

      - setInterval(function(){ console.log(111); },1000);

    - 自调用函数
      - (function(){alert("hello")})();

  - function(){}

- 9.回调函数

  - 回调函数就是：通过函数调用的函数

  - 如果你把函数的指针(地址)作为参数传递带另一个函数， 当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。

  - 一般用于递归

  - 高阶函数

    - 高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。

    - function fn(a,b,callback) {callback && callback();}

    - fn(1,2,function(){})

  - 案例

    - 求 Fibonacci 的第 n 个数 1,1,2,3,5,8,13

    - 求 n 个数的累加 1+2+3+4+5....

    - 从前有座山，山里有座庙，......

- 10.立即执行函数

  - 函数定义完，立即被调用，这种函数叫做立即执行函数

  - 两种语法

    - (function(形参){}(实参))

    - (function(形参){})(实参)

  - 原理

  - 立即执行函数只会执行一次

  - 立即执行函数也可以称为小闭包，因为立即执行函数里面的任何一个函数都可以使用它的 i 这变量

- 11.递归函数

  - 函数在内部可以调用其本身，那么这个函数就是递归函数 (函数内部自己调用自己，这个函数就是递归函数)

  - 递归代码例子

    - function fn (n) {};fn();

    - 递归里面必须加退出条件 ： return; 来防止栈溢出

    - // 递归函数 : 函数内部自己调用自己, 这个函数就是递归函数 var num = 1; function fn() { console.log('我要打印 6 句话'); if (num == 6) { return; // 递归里面必须加退出条件 } num++; fn(); } fn();

  - 运用递归例子

    - 利用递归函数求 1-n 的阶乘

      - // 利用递归函数求 1~n 的阶乘 1 _ 2 _ 3 _ 4 _ ..n function fn(n) { if (n == 1) { return 1; } return n _ fn(n - 1); } console.log(fn(3)); console.log(fn(4)); // 详细思路 假如用户输入的是 3 //return 3 _ fn(2) //return 3 _ (2 _ fn(1)) //return 3 _ (2 _ 1) //return 3 \* (2) //return 6

      - // 利用递归函数求斐波那契数列(兔子序列) 1、1、2、3、5、8、13、21... // 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值 // 我们只需要知道用户输入的 n 的前面两项(n-1 n-2)就可以计算出 n 对应的序列值 function fb(n) { if (n === 1 || n === 2) { return 1; } return fb(n - 1) + fb(n - 2); } console.log(fb(3)); console.log(fb(6));

    - 利用递归方法遍历多层数组

      -  var data = [{ id: 1, name: '家电', goods: [{ id: 11, gname: '冰箱', goods: [{ id: 111, gname: '海尔' }, { id: 112, gname: '美的' }, ] }, { id: 12, gname: '洗衣机' }] }, { id: 2, name: '服饰' }]; // 我们想要做输入 id 号,就可以返回的数据对象 // 1. 利用 forEach 去遍历里面的每一个对象 function getID(json, id) { var o = {}; json.forEach(function(item) { // console.log(item); // 2 个数组元素 if (item.id == id) { // console.log(item); o = item; // 返回给下面使用 // 2. 我们想要得里层的数据 11 12 可以利用递归函数 // 里面应该有 goods 这个数组并且数组的长度不为 0 } else if (item.goods && item.goods.length > 0) { o = getID(item.goods, id); } }); return o; } console.log(getID(data, 1)); console.log(getID(data, 2)); console.log(getID(data, 11)); console.log(getID(data, 12)); console.log(getID(data, 111));

      - forEach 到一定条件遍历完成就会退出，所以在 forEach 里面使用递归不用 return

- 12.构造函数和原型

  - 构造函数

    - 在 ES6(2015.06 发版)之前，对象不是基于类创建，而是用一种称为构建函数的特殊函数来定义对象和它们的特征

    - 构造函数缺点

      - 浪费内存空间

    - 构造函数 this 指向 实例对象

  - 原型对象

    - 每一个构造函数都有一个 prototype 属性，指向另一个对象。注意这个 prototype 就是一个对象，这个对象的属性和方法，都会被构造函数所拥有

    - 优点

      - 共享方法，节省内存空间

    - 原型对象的 this 指向 实例对象

  - 代码流程+

    - 构造代码

      - function Star(uname,age){ this.uname = uname; this.age = age; } Star.prototype.sing = function(){ console.log('我会唱歌'); }

        - 实例成员

          - 构造函数内部通过 this 添加的成员

          - uname、age、sing 都是实例成员

          - 实例成员只能通过实例化对象来访问，不能通过构造函数访问

        - 静态成员

          - 在构造函数本身上添加成员

          - Star.sex = '男'

            - sex，就是静态成员

          - 静态成员只能通过构造函数去访问，不能通过对象访问

        - Star.prototype
          - 原型对象，共享方法

      - Star.prototype = { constructor: Star, sing: function{} movie: function{} }

        - 如果我们修改了原来的原型对象，给原型对象赋值的是一个对象，则必须手动利用 constructor 指回原来的构造函数

        - constructor: Star,
          - 手动让 constructor 指向 Star

    - 实例化

      - var zhangsan = new Star('张三',19);

    - 调用

      - zhangsan.sing()

        - 对象的原型

          - **proto**

          - 指向原型对象 Star.prototype

          - zhangsan.**proto** === Star.prototype

        - constructor: Star

          - 手动让 constructor 指向 Star，让下面两个值相等

          - zhangsan.**proto**.constructor

          - Star.prototype.constructor

  - 构造函数、原型对象、实例对象的关系

    - 构造函数里面有原型对象，通过构造函数.prototype 指向原型对象

    - 原型对象的属性：constructor: 构造函数名

      - 指向构造函数

    - new 构造函数指向实例对象

    - 实例对象里有**proto**.constructor 指向原型对象

    - 三者关系图

    - 组成的原型链图

  - JS 查找机制：

    - 按照原型链关系上一层层往上查找

    - 优先级
      - 本身开始，一层层往上

  - 扩展内置方法

  - 继承

    - 函数.call()

      - 可以调用函数

      - 可以改变 this 指向

        - 1.函数.call(另一个函数名)

        - 2.this 指向了另一个函数

    - 在子构造函数内使用

      - 1.Father.call(this,属性 1,属性 2)

      - 2.达到了继承构造函数里的方法的效果

      - 3.如果在父函数 使用了：构造函数.prototype 来拓展父方法，子函数使用这个方法来继承：

        - Son.prototype = new Father();

        - 上面代码 覆盖了父类对象的原型对象 Father.prototype 因此要利用子类对象 Son.prototype.constructor 重新指回 子类的原型对象
          - Son.prototype.constructor = Son;

- 13.闭包(closure)函数

  - 1.前提：了解变量的作用域

    - 变量根据作用域的不同分为两种：全局变量和局部变量。

    - 1. 函数内部可以使用全局变量。

    - 2. 函数外部不可以使用局部变量。

    - 3. 当函数执行完毕，本作用域内的局部变量会销毁。

  - 2.闭包的概念

    - 闭包是一个函数；闭包（closure）指有权访问另一个函数作用域中变量的函数，一个作用域可以访问另外一个函数的局部变量。 就形成了闭包

  - 3.闭包的主要作用：延伸了变量的作用范围

  - 4.代码例子

    - 1、子级访问父级

      - // 闭包（closure）指有权访问另一个函数作用域中变量的函数。 // 闭包: 我们 fun 这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num function fn() { var num = 10; function fun() { console.log(num); } fun(); } fn();

    - 2、外面的作用域访问：return 返回函数

      - // 闭包（closure）指有权访问另一个函数作用域中变量的函数。 // 闭包: 我们 fun 这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num function fn() { var num = 10; function fun() { console.log(num); } return fun; } var f = fn(); // 调用，全局作用域 f 访问局部作用域变量 num f();

      - 全局作用域 f 访问局部作用域变量 num

    - 3、立即执行函数闭包 (经典面试题)

      - 立即执行函数也称为小闭包，因为立即执行函数里面的任何一个函数都可以使用它的 i 变量

      - (function(i){})(i)

      - 循环注册点击事件 (动态添加属性 和 闭包方法) 但闭包方式更麻烦
        -  ` 榴莲        臭豆腐        鲱鱼罐头        大猪蹄子                // 闭包应用-点击li输出当前li的索引号        // 1. 我们可以利用动态添加属性的方式        var lis = document.querySelector('.nav').querySelectorAll('li');        for (var i = 0; i < lis.length; i++) {            lis[i].index = i;            lis[i].onclick = function() {                // console.log(i);                console.log(this.index);             }        }        // 2. 利用闭包的方式得到当前小li 的索引号        for (var i = 0; i < lis.length; i++) {            // 利用for循环创建了4个立即执行函数            // 立即执行函数也称为小闭包            // 因为立即执行函数里面的任何一个函数都可以使用它的i变量            (function(i) {                // console.log(i);                lis[i].onclick = function() {                    console.log(i);                }            })(i);        }`

    - 4、立即执行函数里的定时器中的闭包 (3 秒钟之后,打印所有 li 元素的内容)

      - `           榴莲        臭豆腐        鲱鱼罐头        大猪蹄子                // 闭包应用-3秒钟之后,打印所有li元素的内容        var lis = document.querySelector('.nav').querySelectorAll('li');        for (var i = 0; i < lis.length; i++) {            (function(i) {                settimeout(function() {                    console.log(lis[i].innerhtml);                }, 3000)            })(i);        }  `

    - 5、打车价格计算闭包例子 (立即执行函数的返回属性值的方法)
      - `​            // 闭包应用-计算打车价格         // 打车起步价13(3公里内),  之后每多一公里增加 5块钱.  用户输入公里数就可以计算打车价格        // 如果有拥堵情况,总价格多收取10块钱拥堵费        // function fn() {};        // fn();        var car = (function() {            var start = 13; // 起步价  局部变量            var total = 0; // 总价  局部变量            return {                // 正常的总价                price: function(n) {                    if (n <= 3) {                        total = start;                    } else {                        total = start + (n - 3) * 5                    }                    return total;                },                // 拥堵之后的费用                yd: function(flag) {                    return flag ? total + 10 : total;                }            }        })();        console.log(car.price(5)); // 23        console.log(car.yd(true)); // 33         console.log(car.price(1)); // 13        console.log(car.yd(false)); // 13     `

  - 5.每调用一次 闭包都是独立的 全新闭包赋值，互不影响

- 各种函数的 this 指向

  - 普通函数调用

    - 此时 this 是全局的也就是 window

    - `var c=function(){  alert(this==window) } c()//true`

    - 普通函数、定时器函数、立即执行函数
      - this 都是指向 window

  - 对象的方法调用

    - `var myObj={  value:2,  inc:function(num){   alert(this.value+num);  } } myobject.inc(1); //结果3，因为this指向myObj`

    - this 指向调用的对象

  - 对象内部的匿名函数调用

    - `var myObj={   name:'myObject',   value:0,   increment:function(num){    this.value += typeof(num) ==='number'? num:0;   },   toString:function(){    return '[object:'+this.name+'{value:'+this.value+'}]';   },     getInfo:function(){      return (function(){        // 内部匿名函数不属于当前对象的函数，        // 因此this指向了全局对象window        return this.toString();      })();  } } alert(myObj.getInfo());//[object window];`

    - 内部匿名函数不属于当前对象的函数，因此 this 指向了全局对象 window

    - 可以把对象内部的 this 用变量赋值，再用 this 变量指定调用对象的属性

  - 构造函数调用

    - `var fn = Function (status){  this.status = status; } fn.prototype.get_status = function(){   return this.status; } var test = new fn('my status'); alert(test.get_status);//my status,this指向test`

    - 构造函数的 this 指向的的是它的实例化对象

    - 上述代码 this 指向构造函数的实例化对象 test

  - 绑定事件函数
    - this 指向的是函数的调用者(绑定的事件对象)，btn 这个按钮事件

- 改变函数 this 指向方法 (函数对象方法)

  - fn.call(对象，属性 1,属性 2)

    - 1.调用函数执行

    - 2.改变函数 this 指向，指向第一个参数对象

    - 3.第一个参数指定是什么，this 就是什么

    - 4.对象参数之后的两个属性就是函数的实际参数(实参)

    - call 经常用作构造函数的继承

    - 代码例子
      - `var o = { name: 'andy' } function fn(a, b) { console.log(this); console.log(a + b); }; fn.call(o, 1, 2); // call 第一个可以调用函数 第二个可以改变函数内的this 指向 // call 的主要作用可以实现继承 function Father(uname, age, sex) { this.uname = uname; this.age = age; this.sex = sex; } function Son(uname, age, sex) { Father.call(this, uname, age, sex); } var son = new Son('刘德华', 18, '男'); console.log(son);`

  - fn.apply(对象，数组 1, 数组 2)

    - 求数组中的最大值最小值,必须是数组

    - 代码例子

      - `var o = { name: 'andy' }; function fn(arr) { console.log(this); console.log(arr); // 'pink' }; fn.apply(o, ['pink']); // 1. 也是调用函数 第二个可以改变函数内部的this指向 // 2. 但是他的参数必须是数组(伪数组) // 3. apply 的主要应用 比如说我们可以利用 apply 借助于数学内置对象求数组最大值  // Math.max(); var arr = [1, 66, 3, 99, 4]; var arr1 = ['red', 'pink']; // var max = Math.max.apply(null, arr); var max = Math.max.apply(Math, arr); var min = Math.min.apply(Math, arr); console.log(max, min);`

    - 作用

      - 1.调用函数

      - 2.改变函数 this 指向，指向第一个参数对象

      - 3.第一个参数指定是什么，this 就是什么

      - 4.对象参数之后的数组参数就是函数的实际参数(实参)

      - 5.参数必须是数组

    - 对象参数
      - 第一个参数对象可以设置 null ，js 中万物皆对象：可以是函数，可以是方法，可以是对象

  - fn.bind(thisArg,arg1,arg2)

    - bind()不会调用原来的函数：（应用场景） 如果有的函数不需要立即调用，但又想改变这个函数内部的 this 指向时，使用 bind()方法

    - 作用

      - 1.可以改变原来内部函数的 this 指向，不会调用原函数

      - 2.返回的是 指定 this 和初始化参数改造之后 ，产生的原函数拷贝的新函数

      - 3.1.常用于 定时器函数 的 this 指向

      - 3.2. 如果有的函数我们不需要立即调用,但是又想改变这个函数内部的 this 指向此时用 bind

      - 3.3. 我们有一个按钮,当我们点击了之后,就禁用这个按钮,3 秒钟之后开启这个按钮

    - 参数

      - thisArg

        - 函数运行时 this 指向的对象

      - arg1

        - 参数 1

      - arg2
        - 参数 2

    - 代码例子 1

      - `// 3. bind()  绑定 捆绑的意思 var o = { 	name: 'andy' }; 	function fn(a, b) { 	console.log(this); 	console.log(a + b);  }; var f = fn.bind(o, 1, 2); f();`

    - 定时器函数使用场景

      - 1.有一个按钮，点击之后就禁用这个按钮，3 秒后开启这个按钮

      - 2.有一个定时器函数，写在定时器外面，绑定定时器

      - 代码例子

        - 禁用按钮例子

          - `btn.onclick = function(){  this.disabled = true;  // 定时器里的this指向window  setTimeout(dunction(){    this.disabled = flase;  }.bind(this),3000)  // 改变 定时器的this 指向 btn的this }`

        - 批量禁用按钮例子
          - `var btns = document.querySelectorAll('button'); for (var i = 0; i < btns.length; i++) { btns[i].onclick = function() { 	this.disabled = true; 	setTimeout(function() { 		this.disabled = false; 	}.bind(this), 2000); } }`

  - 三个方法总结

    - 相同点：都可以改变 this 指向

    - 不同点：

      - call 和 apply 会调用函数, 并且改变函数内部 this 指向

      - call 传递参数使用逗号隔开传递,apply 传递参数使用数组传递

      - bind 不会调用函数

    - 应用场景:

      - call 经常做继承

      - apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值

      - bind 不调用函数,但是还想改变 this 指向. 比如改变定时器内部的 this 指向

- 调用函数的隐含参数

  - 在调用函数时， 浏览器每次都会传递两个隐含的参数：

    - 1.函数的上下文对象 this

    - 2.封装实参的对象 arguments

      - arguments 是一个类数组对象，它也可以通过索引操作数据，也可以获取长度

      - 在调用函数时，我们所传递的实参都会在 arguments 中保存

        - 可以用数组的元素获取形式来获取实参

        - arguments[0]

        - arguments[1]

      - arguments.length 可以用来获取实参的长度

      - arguments 中有一个属性 callee
        - 这个属性对应一个函数对象，就是当前正在执行的函数的对象

  - `function fun(){  console.log(arguments instanceof Array)  console.log(Array.isArray(arguments))  console.log(arguments.length)  console.log(arguments[1])  console.log(arguments.callee) }`

- 高阶函数

  - 高阶函数是对其他函数的进行操作 的函数，它接收函数作为参数 或 将函数作为返回值输出

  - 例子

    - `function fn(callback){  callback&&callback(); } fn(function(){  alert('hello'); })`

      - 接收函数作为参数

    - function fn(){ return function(){} } fn();

      - 函数作为返回值输出

    - 此处 两个例子的 fn 就是高阶函数

  - 运用

    - 函数可以当做参数来进行传递,回调函数

    - `// 高阶函数- 函数可以作为参数传递 function fn(a, b, callback) { console.log(a + b); callback && callback(); } fn(1, 2, function() { console.log('我是最后调用的'); }); // JQuery.js移动变色例子 $("div").animate({ left: 500 }, function() { $("div").css("backgroundColor", "purple"); })`

### JavaScript 严格模式

- JavaScript 除了提供正常模式外，还提供了 严格模式(strict mode)。ES5 的严格模式采用具有限制性 JavaScript 变体的一种方式，即在严格模式条件下运行 JS 代码 (只兼容 IE10 以上)

- 严格模式的产生：

  - 1.消除了 Javascript 语法的一些不合理、不严谨之处,减少了一些怪异行为。

  - 2.消除代码运行的一些不安全之处，保证代码运行的安全。

  - 3.提高编译器效率，增加运行速度。

  - 4.禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class,enum,export, extends, import, super 不能做变量名

- 1、开启严格模式

  - 给整个 script 标签前面开启严格模式

    - `'use strict'`

  - 给某个函数开启严格模式
    - `function() {  'use strict' }`

- 2、严格模式规范

  - 变量：

    - 在正常模式中,如果一个变量没有声明就赋值,默认是全局变量.严格模式禁止这种用法,变量都必须先用 var 命令声明,然后再使用

    - 严禁删除已经声明变量。例如，delete x; 语法是错误的

  - this 指向问题：

    - 严格模式下全局作用域中函数中的 this 是 undefined

    - 严格模式下,如果 构造函数不加 new 调用, this 指向的是 undefined 如果赋值,会报错

    - new 实例化的构造函数指向创建的对象实例。

    - 定时器 this 还是指向 window

    - 事件、对象还是指向调用者

  - 函数变化

    - 函数不能有重名的参数

    - 函数必须声明在最前面.新版本的 JavaScript 会引入“块级作用域”（ ES6 中已引入）为了与新版本接轨，不允许在非函数的代码块内声明函数

### 浅拷贝和深拷贝

- 浅拷贝

  - 1、对象简单的 =直接赋值 ， 只是拷贝 内存地址，拷贝和被拷贝的内存地址都指向同一个，所以也是浅拷贝

  - 2、浅拷贝的方法

    - for 循环

      - `// 定义一个深层次的对象 var obj = {    id: 1,    name: 'andy',    msg: {        age: 18    } }; // 定义一个空对象，遍历obj 赋值空对象 var o = {} for (var k in obj) {  // k 是属性名   obj[k] 属性值  o[k] = obj[k]; }`

      - for 循环浅拷贝只把 obj 更深层次对象 msg 的地址拷贝给了对象 o 的 msg 对象，所以改变了 msg 内属性的值，对应的 obj 对象和 o 对象的 msg 值也会一起改变

    - ES6 浅拷贝 assign 方法

      - `// 定义一个深层次的对象 var obj = {    id: 1,    name: 'andy',    msg: {        age: 18    } }; // 定义一个空对象o，浅拷贝obj给o对象 var o = {} Object.assign(o, obj);`

      - `Object.assign(o, obj);`

- 深拷贝

  - 深拷贝会另外拷贝一份一个一模一样的对象,但是不同的是会从堆内存中开辟一个新的区域存放新对象,新对象跟原对象不再共享内存

  - 1.用函数递归的方式

    - `​            // 深拷贝拷贝多层, 每一级别的数据都会拷贝.        var obj = {            id: 1,            name: 'andy',            msg: {                age: 18            },            color: ['pink', 'red']        };        var o = {};        // 封装函数         function deepCopy(newobj, oldobj) {            for (var k in oldobj) {                // 判断我们的属性值属于那种数据类型                // 1. 获取属性值  oldobj[k]                var item = oldobj[k];                // 2. 判断这个值是否是数组                if (item instanceof Array) {                    newobj[k] = [];                    deepCopy(newobj[k], item)                } else if (item instanceof Object) {                    // 3. 判断这个值是否是对象                    newobj[k] = {};                    deepCopy(newobj[k], item)                } else {                    // 4. 属于简单数据类型                    newobj[k] = item;                }             }        }        deepCopy(o, obj);        console.log(o);         var arr = [];        console.log(arr instanceof Object);        o.msg.age = 20;        console.log(obj);     `

  - 2.对象 push 方法

    - `let object={  repayment:this.ruleForm.repayment,  interestType:this.ruleForm.interestType,  productDeadline:this.ruleForm.productDeadline,  Detention:this.ruleForm.Detention, } this.tableData.push(object);`

    - 缺点

      - 代码很臃肿

      - 如果 object 对象需要封装多条非对象属性不适合使用

  - 3.JSON.stringify(JSON.parse()) 方法
    - `var obj = {    id: 1,    name: 'andy',    msg: {        age: 18    },    color: ['pink', 'red'] }; var obj2 = JSON.stringify(JSON.parse(obj))`

### 对象

[JavaScript日常开发中常用的Object操作方法总结 (qq.com)](https://mp.weixin.qq.com/s/LydKMa--EALM-u9VCkSlhg)

对象的分类

- 1.内建对象

  - 由 ES 标准中定义的对象，在任何的 ES 的实现中都可以使用

  - 比如：Math String Number Boolean Function Object...

- 2.宿主对象

  - 由 JS 的运行环境提供的对象，目前来讲主要指的是浏览器提供的对象

  - 比如 BOM DOM

- 3.自定义对象
  - 由开发人员自己创建的对象

自定义对象

- let obj = new Object()

自定义对象的属性的方法

- 获取对象身上所有的属性名

  - Object.keys(obj);

- 对象添加和修改属性的方式

  - 向对象添加的属性，属性名不强制要求遵循标识符的规范，但尽量遵守标识符规范

  - 对象的属性值可以是任意的数据类型，甚至也可以是一个对象

  - 方式 1：添加或修改属性值都可以

    - 如果有属性则修改，无属性则添加属性和值

    - obj.name = '张三';

  - 方式 2：只修改属性值

    - `obj["属性名"] = 属性值`

  - 方式 3：只修改属性值

    - Object.defineProperty(obj,'要设置的属性',{ value: 1000 })

      - 参数 1

        - 对象

      - 参数 2

        - 要设置的属性

      - 参数 3

        - 以对象 { } 形式书写

        - value:

          - 设置属性的值，默认为 undefined

        - writable:

          - 值是否可以重写。 true | false ，默认为 false

        - enumerable:

          - 目标属性是否可以枚举 true | false ，默认为 false

        - configurable:
          - 目标属性是否可以被删除或是否可以再次修改特性 true | false ，默认为 false

  - 方法 4 和 5：

    - unshift 和 push

  - 方式 6：对象字面量方式创建 直接创建对象 并设置属性和赋值
    - { name: '', age: 18, }

- 检查对象中是否含有某个属性

  - 'name' in obj

- 枚举对象中的属性

  - for(let n in obj){ console.log("属性名：" + n) console.log("属性值：" + obj[n]) }

  - 对象中有几个属性，循环体就会执行几次

  - 每次执行时，会将对象中的一个属性名字赋值给变量

对象的函数方法

- 函数也可以称为对象的属性：

- 如果一个函数作为一个对象的属性保存， 那么我们称这个函数为对象的方法

- 调用这个函数就说调用对象的方法

- obj.sayName = function(){ console.log('我的名字叫哈哈') } // 对象的方法 obj.sayName()

两种方法创建对象 和原型对象

- 工厂方法创建对象

  - function createPerson(name, age, gender){ var obj = new Object() obj.name = name; obj.age = age; obj.gender = gender; obj.sayName = function(){ alert(this.name); } return obj } const obj1 = createPerson("张三",18,"男") const obj1 = createPerson("李四",20,"女") const obj1 = createPerson("王五",22,"男")

  - 使用工厂方法创建的对象，使用的是构造函数 Object 所以创建的都是 Object 这个类型 就导致我们无法区分多种不同类型的对象

  - 可以使用构造函数创建区分类型的对象

- 构造函数创建对象

  - function Preson(name, age, gender){ this.name = name this.age = age this.gender = gender this.sayName = function(){ alert(this.name) } } let person1 = new Person("张三",18,"男") let person2 = new Person("李四",20,"男")

  - 有 new 是构造函数，没有 new 是普通函数

  - 构造函数首字母大写是业内的区分习惯

  - 构造函数执行流程

    - 1.调用构造函数会立即创建一个新的对象

    - 2.将新建的对象设置为函数中的 this

      - 在构造函数中可以使用 this 来引用新建的对象

    - 3.逐行执行函数中的代码

    - 4.将新建的对象作为返回值返回

    - 使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类 我们将通过一个构造函数创建的对象称为该类的实例

  - 使用 instanceof 可以检查一个对象是否是一个类的实例 如果是：返回 true，否则返回 false

    - 对象 instanceof 构造函数

    - console.log(person instanceof Person)

  - 所有对象都是 Object 的后代，所以任何对象和 Object 在 instanceof 检查时都会返回 true

  - 对象方法优化 将函数内的方法提取到全局作用域

    - function Preson(name, age, gender){ this.name = name this.age = age this.gender = gender this.sayName = fun } function fun(){ alert(this.name) } let person1 = new Person("张三",18,"男") let person2 = new Person("李四",20,"男")

    - 原理

      - 构造函数的方法，一个实例对象调用就执行一个，一千个实例对象调用就执行 1000 次，消耗内存大，提取到全局，共用一个方法，所有的调用 只调用一次

    - 缺点

      - 将函数在全局作用域中，污染了全局作用域的命名空间

      - 而且定义在全局作用域中也很不安全

      - 解决方法

        - 使用原型对象

        - Person.prototype.sayName = function(){ alert(this.name) }

- 原型对象

  - 原型 prototype

  - 1.我们所创建的每一个函数，解析器都会 向函数中添加一个属性的 prototype

    - 这个属性对应着一个对象，这个对象就是原型对象

  - 2.如果函数作为普通函数调用 prototype 没有任何作用

  - 3.当函数以构造函数形式调用时，它所创建的对象中都会有一个隐含的属性

  - 4.指向该构造函数的原型对象，我们可以通过**proto**来访问该属性

    - function MyClass(){ } let mc = new MyClass(); console.log(mc.**proto** == MyClass.prototype)

    - 图解

    - 向 MyClass 的原型添加属性 a

      - MyClass.prototype.a = 123

    - 向 MyClass 的原型添加一个方法
      - MyClass.prototype.sayHello = function(){ alert("hello") }

  - 5.当我们访问对象的一个属性和方法时，它会先在对象自身中寻找，如果没有找到则回去原型对象中寻找，如果找到则直接使用

  - 6.以后我们创建构造函数时，可以将这些对象共有的属性和方法，统一添加到构造函数的原型对象中， 这样就不用分别为每一个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了

  - 7.检查对象是否有原型

    - 1.不能用 in 检查，name in 实例对象 --> 因为使用 in 检查对象中是否含有某个属性时，如果对象中没有，但是原型中有，也会返回 true

    - 2.可以使用：实例对象.hasOwnPrototype("age")

    - 3.原型对象也是对象，所以它也有原型：
      - 当我们使用一个对象的属性或方法时，会先在自身中寻找 自身如果有，则直接使用 如果没有则去原型对象中寻找，如果原型对象中有，则使用 如果没有，则去原型的原型中寻找 直到找到 Object 对象的原型 Object 对象的原型没有原型，如果在 Object 中依然没有找到，则返回 undefined 第三层原型为 null

- 实例对象上的 [Object Object]返回值改变的方法

  - person..prototype.toString = function(){ return "name=" + this.name + "age="+this.age+"gender=" + this.gender } let person = new Person("李四",20,"男") let result = person.toString() console.log(person)

  - 当我们直接在页面中打印一个对象时，实际上输出的对象的 toString()方法的返回值

  - 如果我们希望输出对象时不输出[Object Object]，可以为对象添加一个 toString()方法

其他说明

- 对象间的=相互赋值是根据内存的地址赋值，多个对象使用了同一个地址，把其中对象的值变了，相互=两个对象的值都会变，所以 对象 对 对象 = 赋值，要进行深拷贝

  - 深拷贝的方法

- 对其他数组除和对象外的基本数据类型赋值 可以直接=相等

- 对象之间比较
  - 不管是 == 还是 === 都永远不会相等，因为是比较两个对象的内存地址，但可以比较 对象.属性 是否相等



#### Date对象

获取当前时间毫秒值

```js
// 方式一
Date.now(); // 1606381881650
// 方式二
new Date() - 0; // 1606381881650
// 方式三
new Date().getTime() // 1606381881650
```

创建`Date`对象的兼容性问题。

```js
// window和安卓支持，ios和mac不支持
new Date('2020-11-26'); 
// window和安卓支持，ios和mac支持
new Date('2020/11/26');
```

### 数组

- 数组也是一个对象

- 定义：数组对象用来在单独的变量名中存储一系列的值

- 创建方式

  - 1.构造数组

    - var myArray=new Array();

      - 创建了一个空数组

    - var myArray=new Array(20);

      - 创建了一个长度为 20 的数组

    - var myArray=new Array("张三","男");
      - 组

  - 2.数组字面量

    - var myArray=["张三",18，"男"，"唱、跳、rap"];

    - var myArray=[];

      - 向数组中添加元素，读取元素也是一样的

      - myArray[0]= 1

      - myArray[1]= 2

      - myArray[2]= 3

      - console.log(myArray[0])

- 数组对象方法

  - toString()

    - 把数组转换为字符串，并返回结果。

  - push()和 pop()

    - push() 方法（在数组结尾处）向数组添加一个或多个新的元素：逗号分割，并返回新数组 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.push("Kiwi"); // 向 fruits 添加一个新元素 push() 方法返回新数组的长度： 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; var x = fruits.push("Kiwi"); // x 的值是 5

    - pop() 方法删除数组的最后一个元素，并将删除的元素作为返回值返回 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.pop(); // 从 fruits 删除最后一个元素（"Mango"） pop() 方法返回“被弹出”(删除)的值 var fruits = ["Banana", "Orange", "Apple", "Mango"]; var x = fruits.pop(); // x 的值是 "Mango"

  - shift() 和 unshift()

    - shift() 方法会删除数组第一个元素，并把删除的元素作为返回值返回。 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.shift(); // 从 fruits 删除第一个元素 "Banana" shift() 方法返回被“位移出”的字符串： 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.shift(); // 返回 "Banana"

    - unshift() 方法（在开头）向数组第一位添加新元素，并返回新数组： 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.unshift("Lemon"); // 向 fruits 添加新元素 "Lemon" unshift() 方法返回新数组的长度。 实例 var fruits = ["Banana", "Orange", "Apple", "Mango"]; fruits.unshift("Lemon"); // 返回 5

  - concat()

    - 连接两个或更多的数组，并将新的数组返回。 该方法不会对原数组产生影响

    - arr1.concat(arr2,arr3,'哈哈哈','呵呵呵')

  - join()

    - 将所有数组元素结合为一个字符串。元素通过指定的分隔符进行分隔。

    - 它的行为类似 toString()，但是您还可以规定分隔符： 实例 var fruits = ["Banana", "Orange","Apple", "Mango"]; document.getElementById("demo").innerHTML = fruits.join(" _ "); 结果 Banana _ Orange _ Apple _ Mango

  - indexOf() 和 lastIndexOf()

    - indexOf(4,2)：接收两个参数： 要查找的项 和（可选的）表示查找起点位置的索引。 其中， 从数组的开头（位置 0）开始向后查找。

    - lastIndexOf(4,2)：接收两个参数：要查找的项和（可选的） 表示查找起点位置的索引。 其中， 从数组的末尾开始向前查找。

  - slice()

    - 从某个已有的数组返回选定的元素，该方法不会影响原数组，而是将取到的元素封装到一个新数组返回(截取元素)

    - arrObj.slice(startIndex, endIndex)

      - 第二个参数可以省略不写，会截取从开始索引往后的元素

      - 索引可以传递负值

  - splice()

    - 删除元素，并向数组添加新元素(用新元素替换删除的元素)。 用于删除数组中的指定元素，删除会影响原数组，将被删除的元素作为返回值返回

    - arrObj.splice(startIndex, endIndex, 替换元素 1, 替换元素 2)

  - reverse()

    - 颠倒(反转)数组中元素的顺序。

    - arr.reverse()

  - sort()

    - 对数组的元素进行排序，默认会按照 Unicode 编码进行排序，会影响原素组

    - let arr = [5,4] arr.sort()

    - 自定义排序规则

      - 可以在 sort()添加一个回调函数，来指定规则 回调函数中需要定义两个形参，浏览器将会分别使用数组中的元素作为实参去调用回调函数 使用哪个元素调用不确定，但是肯定是在数组中 ，a 一定在吧前边

      - 浏览器会根据回调函数的返回值来决定元素的顺序， 如果返回一个大于 0 的值，则元素位置会交换， 如果返回一个小于 0 的值，则元素位置不变， 如果返回一个等于 0 的值，则认为两个元素相等，也不交换位置，

    - let arr = [5,4] arr.sort(function(a,b)=>{ // 升序 // return a - b // 降序 return b - a })

  - toSource()

    - 返回该对象的源代码。

  - toLocaleString()

    - 把数组转换为本地数组，并返回结果。

  - valueOf()

    - 返回数组对象的原始值

  - forEach() 迭代(遍历)

    - 对数组进行遍历循环，对数组中的每一项运行给定函数。 这个方法没有返回值。参数都是 function 类型，默认有传参， 参数分别为：遍历的数组内容；第对应的数组索引，数组本身。

    - 数组.forEach(function(value,index,array){ console.log('每个数组元素' + value); console.log('每个数组元素的索引号' + index); console.log('数组本身' + array); })

      - 值

        - value

      - 索引

        - index

      - 数组本身
        - array

    - 遍历完全部数据才会终止循环遍历

  - some()遍历

    - 判断数组中是否存在满足条件的项，只要找到第一项满足条件，就会返回 true，否则返回 false (只找到一项便终止循环)

    - 数组.some(function(value,index,array){ return value >= 20; })

      - 值

        - value

      - 索引

        - index

      - 数组本身
        - array

    - 返回值为布尔值

      - return true 终止遍历

    - 查询唯一的元素，用此方法效率更高

  - filter()过滤

    - “过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。

    - 数组.filter(function(value,index,array){ })

      - 值

        - value

      - 索引

        - index

      - 数组本身
        - array

    - 返回值为数组

  - map()

    - 指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

  - every()

    - 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 true。

  - reduce()和 reduceRight()
    - 实现迭代数组的所有项，然后构建一个最终返回的值。 reduce()方法从数组的第一项开始，逐个遍历到最后。 reduceRight()则从数组的最后一项开始，向前遍历到第一项。

- 数组对象属性

  - 数组名.length = 100;

    - 数组长度为 100

    - 长度如果超出，超出的数据会删掉

    - 设置或返回数组中元素的数目。

    - 可以使用这种方法删除数组一定长度后的元素

  - 获取数组中的 元素

    - （通过使用它们的索引号来访问数组元素） 数组中的指定元素 = =数组名[索引值： 从 0 开始，取最后一个数为：arr.length - 1]；

    - 数组的索引代表的是数组中的元素在数组中的位置，从 0 开始。

    - 如果获取数组中的元素是：数组名[索引值]，没有指定索引(元素没那么多)，系统不报错，而是给定值为 undefined；

  - 在数组最后添加元素

    - arr[arr.length] = 10

  - constructor

    - 返回对创建此对象的数组函数的引用。

  - prototype
    - 向对象添加属性和方法。

### 字符串

- https://www.runoob.com/jsref/jsref-obj-string.html

- 字符串对象属性

  - str.constructor

    - 对创建该对象的函数的引用

  - str.length

    - 字符串的长度

  - str.prototype
    - 允许向对象添加属性和方法

- 字符串对象方法

  - str.charAt(5)

    - 返回在指定 5 位置的字符。(索引从 0 开始)

  - str.charCodeAt(5)

    - 返回在指定的位置 5 的字符的 Unicode 编码。

  - String.fromCharCode()

    - String 构造函数的对象的方法

    - 编码表

      - http://www.52unicode.com/

    - 将 Unicode 编码转为字符。

  - str.concat(str1,str2)

    - 连接两个或更多字符串，并返回新的字符串。

  - str.indexOf('h',1)

    - 返回某个指定的字符串值在字符串中首次出现的位置。 （用于检索一个字符串中是否含有指定内容）

    - 参数(查找的内容, 从第几个开始找)

    - 从前往后找

    - 如果找到指定的内容，则返回 -1

  - str.lastIndexOf()

    - 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。

    - 参数(查找的内容, 从第几个开始找)

    - 从后往前找

    - 如果找到指定的内容，则返回 -1

  - str.endsWith()

    - 判断当前字符串是否是以指定的子字符串结尾的（区分大小写）。

  - str.includes()

    - 查找字符串中是否包含指定的子字符串。

  - str.match()

    - 查找找到一个或多个正则表达式的匹配。

  - str.repeat()

    - 复制字符串指定次数，并将它们连接在一起返回。

  - str.replace()

    - 在字符串中查找匹配的子串，并替换与正则表达式匹配的子串。

  - str.replaceAll()

    - 在字符串中查找匹配的子串，并替换与正则表达式匹配的所有子串。

  - str.search()

    - 查找与正则表达式相匹配的值。

  - str.slice(1,,2)

    - 提取字符串的片断，并在新的字符串中返回被提取的部分。

    - 参数(开始位置索引:包括开始位置, 结束位置索引:不包括结束位置)

  - str.split(",")

    - 把字符串分割为 字符串数组。

    - 参数

      - (",")

        - (根据什么符号分割)

      - 如果传递一个空串作为参数("")，则会将每个字符都拆分为数组中的一个元素

  - str.substr()

    - 从起始索引号提取字符串中指定数目的字符。

    - 参数
      - (截取开始位置的索引, 截取长度)

  - str.substring()

    - 提取字符串中两个指定的索引号之间的字符。

    - 参数

      - (开始位置索引: 包括开始位置, 结束位置索引: 不包括结束位置)

    - 不可以传负值，如果传负值，默认为 0，如果第二个参数小于第一个，自动调整参数的位置

  - str.startsWith()

    - 查看字符串是否以指定的子字符串开头。

  - str.toLowerCase()

    - 把字符串转换为小写。并返回

  - str.toUpperCase()

    - 把字符串转换为大写。并返回

  - str.trim()

    - 从一个字符串的两端删除空白字符 (去除字符串两边的空白。)

    - 不影响原字符串本身，返回的是一个新字符串

    - 使用场景
      - 文本框获取用户输入很多空格的时候， 去掉空格，判断是否输入了东西

  - str.toLocaleLowerCase()

    - 根据本地主机的语言环境把字符串转换为小写。

  - str.toLocaleUpperCase()

    - 根据本地主机的语言环境把字符串转换为大写。

  - str.valueOf()

    - 返回某个字符串对象的原始值。

  - str.toString()
    - 返回一个字符串。

### RegExp 正则表达式对象

- 正则表达式是描述字符模式的对象。

  - https://www.runoob.com/jsref/jsref-obj-regexp.html

- 正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。

- 正则表达式对象创建

  - 构造函数创建

    - var patt= new RegExp(pattern,modifiers);

    - 参数(正则表达式模式, 修饰符 匹配)

    - 修饰符匹配

      - 全局匹配

      - 区分大小写的匹配

      - 多行匹配

    - 优点：更灵活

    - 注意：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：

      - var re = new RegExp("\\w+");

      - var re = /\w+/;

  - 字面量创建

    - var patt= /pattern/modifiers;

    - /正则表达式模式/修饰符 匹配

    - 修饰符匹配

      - 全局匹配

      - 区分大小写的匹配

      - 多行匹配

    - 优点：更简单

- 语法详解

  - 修饰符

    - 修饰符用于执行区分大小写和全局匹配:

    - i

      - 执行对大小写不敏感的匹配。

    - g

      - 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

    - m
      - 执行多行匹配。

  - 方括号

    - 方括号用于查找某个范围内的字符：

    - [abc]

      - 查找方括号之间的任何字符。

    - [^abc]

      - 查找任何不在方括号之间的字符。

    - [0-9]

      - 查找任何从 0 至 9 的数字。

    - [a-z]

      - 查找任何从小写 a 到小写 z 的字符。

    - [A-Z]

      - 查找任何从大写 A 到大写 Z 的字符。

    - [A-z]

      - 查找任何从大写 A 到小写 z 的字符。

    - [adgk]

      - 查找给定集合内的任何字符。

    - [^adgk]

      - 查找给定集合外的任何字符。

    - (red|blue|green)
      - 查找任何指定的选项。

  - 元字符

    - 元字符（Metacharacter）是拥有特殊含义的字符：

    - .

      - 查找单个字符，除了换行和行结束符。

    - \w

      - 查找数字、字母及下划线。

    - \W

      - 查找非单词字符。

    - \d

      - 查找数字。

    - \D

      - 查找非数字字符。

    - \s

      - 查找空白字符。

    - \S

      - 查找非空白字符。

    - \b

      - 匹配单词边界。

    - \B

      - 匹配非单词边界。

    - \0

      - 查找 NULL 字符。

    - \n

      - 查找换行符。

    - \f

      - 查找换页符。

    - \r

      - 查找回车符。

    - \t

      - 查找制表符。

    - \v

      - 查找垂直制表符。

    - \xxx

      - 查找以八进制数 xxx 规定的字符。

    - \xdd

      - 查找以十六进制数 dd 规定的字符。

    - \uxxxx
      - 查找以十六进制数 xxxx 规定的 Unicode 字符。

  - 量词

    - n+

      - 匹配任何包含至少一个 n 的字符串。

      - 例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。

    - n\*

      - 匹配任何包含零个或多个 n 的字符串。

      - 例如，/bo\*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。

    - n?

      - 匹配任何包含零个或一个 n 的字符串。

      - 例如，/e?le?/ 匹配 "angel" 中的 "el"，"angle" 中的 "le"。

    - n{X}

      - 匹配包含 X 个 n 的序列的字符串。

      - 例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。

    - n{X,}

      - X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。

      - 例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。

    - n{X,Y}

      - X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。

      - 例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。

    - n$

      - 匹配任何结尾为 n 的字符串。

    - ^n

      - 匹配任何开头为 n 的字符串。

    - ?=n

      - 匹配任何其后紧接指定字符串 n 的字符串。

    - ?!n
      - 匹配任何其后没有紧接指定字符串 n 的字符串。

- RegExp 对象方法

  - patt.test(str)

    - 检测一个字符串是否含有某个模式或字符。返回布尔值 true 或 false。

  - patt.exec()

    - 检索字符串中指定的值。返回找到的值，并确定其位置。

    - 执行强大的、通用的模式匹配。

  - patt.toString()
    - 返回正则表达式的字符串。

- 支持正则表达式的 String 对象的方法

  - patt.search

    - 检索与正则表达式相匹配的值

  - patt.match

    - 找到一个或多个正则表达式的匹配

  - patt.replace

    - 替换与正则表达式匹配的子串

  - patt.split
    - 把字符串分割为字符串数组

- RegExp 对象属性

  - patt.constructor

    - 返回一个函数，该函数是一个创建 RegExp 对象的原型。

  - patt.global

    - 判断是否设置了 "g" 修饰符

  - patt.ignoreCase

    - 判断是否设置了 "i" 修饰符

  - patt.lastIndex

    - 用于规定下次匹配的起始位置

    - 上次匹配后的字符位置,用于一个字符串中进行多次匹配。

  - patt.multiline

    - 判断是否设置了 "m" 修饰符

  - patt.source
    - 返回正则表达式的匹配模式 正则表达式的源文本。

### 作用域总结

- 全局作用域

- 变量作用域

- 函数作用域

### JS 对象归纳总结

- 基本要求

  - 定义一个构造函数，创建自定义对象

- 对象

  - 什么是对象

    - 生活中的对象：车、手机、物品....

    - 对象的特征和行为

  - 面向对象和基于对象

    - 面向对象

      - 可以创建自定义的类型，很好的支持和继承多态。面向对象的语言：c++/java/c#...

      - 特征：封装、继承、多态

      - 万物皆对象：世间的一切事物都可以用对象来描述

    - 基于对象

      - 无法创建自定义的类型、不能很好的支持和继承多态

      - 基于对象的语言：比如：JavaScript

- JavaScript 常见对象

  - 无序属性的集合

    - 其属性可以包含基本知识、对象或者函数

    - 对象就是一组没有顺序的值

    - 我们可以把 JavaScript 的对象想象成键值对，其中值可以是数据和函数

  - 对象的行为和特征

    - 特征--属性

    - 行为--方法

  - 字面量对象

    - var p={ name:"", age:18, sex:true, sayHi:function(){ console.log(this.name); } };
      - p.sayHi();//对象 p 调用 sayHi()方法， 所以 sayHi()中的 this 是对象 0

  - JSON

    - 什么是 JSON

      - 轻量级的数据交换格式

      - 基于 ECMAScript 的一个子集

    - JSON 和对象字面量的区别

      - JSON 的属性必须用双引号括起来，对象字面量可以省略

      - JSON 本质上是一种数据交换格式
        - JSON 有两种结构：对象 和 数组， 两种结构相互组合从而形成各种复杂的数据结构

  - 遍历对象的属性

    - for...in 遍历对象的属性或者方法
      - `var obj = {}; for(var i= 0;i<10;i++){  obj[i] = i*2; } for(var key in obj){  console.log(key + ":" + obj[key]); }`

  - 构造函数

    - new Object()

      - new 后面调用函数，我们称为构造函数

      - Object() 我们把他视为一个构造函数，构造函数的本质就是一个函数，只不过构造函数的目的是为了创新对象，为新对象进行初始化(设置对象的属性)

  - this

    - this 所在的函数在哪个对象中，this 就代表这个对象

    - 谁调用 this 就是谁

      - function test(){ console.log(this); } test();//window.test(); //上面的 this 就是 window，实际是 window 调用 test()

      - p.sayHi(); //sayHi()中的 this,是 p,此时 p 是调用 sayHi()

    - 构造函数中的 this，始终是 new 的当前对象

  - 构造器(constructor)和原型属性(prototype)

    - 在任何一个对象中都有构造器和原型属性， 包括原生的对象，比如：Date，Array 等

    - constructor：返回创建此对象的构造函数

    - prototype 让我们有能力动态给对象添加属性和方法

  - 其他语言中的面向对象
    - 子主题 1

- 数据类型和内存分析

  - 堆区和栈区

    - 堆区(heap)

      - 由编译器自动分配释放、存放函数的参数值、局部变量的值等

    - 栈区(stack)
      - 一般由程序员分配释放，若开发者不释放，程序结束时可能 OS 回收

  - JavaScript 中的数据类型

    - 简单(基本)数据类型

      - Number、String、Boolean、Undefined、Null

      - 直接存储值
        - 子主题 1

    - 复杂(引用)数据类型

      - Object、Array、Date...

      - 存储引用
        - 子主题 1

- JavaScript 中的内置对象

  - 什么是内置对象

    - js 本身已经帮我们写好的对象

    - 我们创建出来以后直接使用，不需要定义

  - 常见的内置对象 (待补充笔记和练习)

    - Object 对象

      - Object 对象 的方法

        - constructor 对一个 Javascript 函数的引用,该函数是对象的构造函数。

        - hasOwnProperty() 检查对象是否有局部定义的(非继承的)、具有特定名字的属性。

        - isPrototypeOf() 检查对象是否是指定对象的原型。

        - propertyIsEnumerable() 检查指定的属性是否存在,以及是否能用 for/in 循环枚举。

        - toLocaleString() 返回对象地方化的字符串表示。

        - toString() 返回对象的字符串表示。

        - valueOf() 返回对象的原始值(如果存在)。

    - Date 对象

      - 创建 Date 对象

        - let date = new Date()

          - 构造函数创建一个 Date 对象， 封装当前代码执行时间

        - let date = new Date('12/03/2021 11:10:30')

          - 指定时间对象

          - 日期格式：月份/日/年 时:分:秒

      - Date 对象方法

        - 获取

          - getDate() 返回月中的某一天。

          - getDay() 返回一周中的某一天。

          - getFullYear() 返回日期中的年份。

          - getYear() (被废弃) 推荐使用 getFullYear()。

          - getUTCFullYear() 同上。

          - getMouth() 返回对象的月份字段。

          - getUTCMouth() 同上。

          - getMinutes() 返回对象的分钟字段。

          - getUTCMinutes() 同上。

          - getSeconds() 返回对象的秒字段。

          - getUTCSeconds() 同上。

          - getHours() 返回对象的小时字段。

          - getUTCHours() 同上。

          - getMilliseconds() 返回对象的毫秒字段。

          - getUTCMilliseconds() 同上。

          - getTime() 返回对象内部的(1970 年 1 月 1 日 0 分 0 秒到现今)毫秒，返回结果以时间戳表示。

          - 获取当前时间戳

            - let nowTime = new Date().getTime().now()

            - 用来测试代码执行时间(性能)
              - 获取代码执行的开始和结束时间

          - getTimezoneoffset() 返回这个日期的本地时间和 UTC 表示之间的时差,以分钟为单位。

        - 设置

          - setDate() 设置对象月中的某一天。

          - setUTCDate() 同上。

          - setFullYear() 设置对象中的年份字段。

          - setUTCFullYear() 同上。

          - setHours() 设置对象的小时字段。

          - setUTCHours() 同上。

          - setMilliseconds() 设置对象的毫秒字段。

          - setUTCMilliseconds() 同上。

          - setMinutes() 设置对象的分钟字段。

          - setUTCMinutes() 同上。

          - setMouth() 设置对象的月份字段。

          - setUTCMouth() 同上。

          - setSeconds() 设置对象的秒字段。

          - setUTCSeconds() 同上。

          - setTime() 使用毫秒的形式设置对象的各个字段。

          - setYear() 推荐使用 setFullYear()。

        - 其他方法

          - toDateString() 返回日期的日期部分的字符串表示。

          - toGMTString() 推荐使用 toUTCString()。

          - toLacaleDataString() 返回日期的日期部分的字符串表示。

          - toLocaleString() 将对象转换成一个字符串。

          - toLacaleTimeString() 返回日期的时间部分的字符串表示。

          - toString() 将对象转换成一个字符串。

          - toTimeString() 将对象转换成一个字符串。

          - toString() 返回日期的时间部分的字符串表示。

          - toUTCString() 将对象转换成一个字符串。

          - valueOf() 将对象转换成它的内部毫秒格式。

          - parse() 静态方法，解析日期和时间的字符串表示,返回它的内部毫秒表示。

          - UTC() 静态方法，返回指定的 UTC 日期和时间的毫秒表示。

    - Array 对象

      - Array 对象方法

        - length 数组包含的元素的个数。

        - concat() 给数组添加元素(此操作原数组的值不变)。

        - join() 把数组中所有元素转换成字符串,然后连接起来。

        - pop() 删除并返回数组最后一个元素。

        - push() 把一个元素添加到数组的尾部,返回值为数组的新长度(Bug:ver1.2 中,将返回数组最后一个元素)。

        - reverse() 在原数组上颠倒数组中元素的顺序。

        - shift() 删除并返回数组的头部元素。

        - slice() 返回数组的一个子数组,该方法不修改原数组(Bug:在 IE4 中 start 不能为负数)。

        - sort() 从原数组上对数组进行排序。

        - splice() 插入,删除,替换一个数组元素。

        - toLocalString() 把数组转换成一个局部字符串。

        - toString() 把数组转换成一个字符串。

        - unshift() 在数组头部插入一个元素, 返回值为数组的新长度。

    - Math 数学运算对象

      - https://www.w3school.com.cn/jsref/jsref_obj_math.asp

      - https://www.runoob.com/jsref/jsref-obj-math.html

      - Math 数学运算对象 属性

        - Math.E 常量 e,自然对数的底数。

        - Math.LN10 10 的自然对数。

        - Math.LN2 2 的自然对数。

        - Math.LOG10E 以 10 为底的 e 的对数。

        - Math.LOG2E 以 2 为底的 e 的对数。

        - Math.PI 常量 π。

        - Math.SQRT1_2 1/2 的平方根。

        - Math.SQRT2 2 的平方根。

      - Math 数学运算对象 方法

        - Math.abs()

          - 求绝对值。

        - Math.acos()

        - Math.asin()

        - Math.acos()

        - Math.atan()

        - Math.atan2()

          - 计算 X 轴到一个点的角度。

        - Math.ceil()

          - 对一个数上舍入。

        - Math.cos()

        - Math.exp()

          - 计算 e 的指数。

        - Math.floor()

          - 对一个数下舍入。

        - Math.log()

          - 计算自然对数。

        - Math.max()

        - Math.min()

        - Math.pow(1,2)

          - 计算参数 1 的参数 2 次方。

        - Math.radom()

        - Math.round()

        - Math.sin()

        - Math.sqrt()

        - Math.tan()

    - Number 对象

      - Number 对象方法

        - global 对象是否具有性质 g。

        - ignoreCase 对象是否具有性质 i。

        - lastIndex 上次匹配后的字符位置,用于一个字符串中进行多次匹配。

        - multiline 对象是否具有性质 m。

        - source 正则表达式的源文本。

        - exec() 执行强大的、通用的模式匹配。

        - test() 检测一个字符串是否含有某个模式。

    - RegExp 正则表达式对象

      - 正则表达式是描述字符模式的对象。

        - https://www.runoob.com/jsref/jsref-obj-regexp.html

      - 正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。

      - 正则表达式对象创建

        - 构造函数创建

          - var patt= new RegExp(pattern,modifiers);

          - 参数(正则表达式模式, 修饰符 匹配)

          - 修饰符匹配

            - 全局匹配

            - 区分大小写的匹配

            - 多行匹配

          - 优点：更灵活

          - 注意：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：

            - var re = new RegExp("\\w+");

            - var re = /\w+/;

        - 字面量创建

          - var patt= /pattern/modifiers;

          - /正则表达式模式/修饰符 匹配

          - 修饰符匹配

            - 全局匹配

            - 区分大小写的匹配

            - 多行匹配

          - 优点：更简单

      - 语法详解

        - 修饰符

          - 修饰符用于执行区分大小写和全局匹配:

          - i

            - 执行对大小写不敏感的匹配。

          - g

            - 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

          - m
            - 执行多行匹配。

        - 方括号

          - 方括号用于查找某个范围内的字符：

          - [abc]

            - 查找方括号之间的任何字符。

          - [^abc]

            - 查找任何不在方括号之间的字符。

          - [0-9]

            - 查找任何从 0 至 9 的数字。

          - [a-z]

            - 查找任何从小写 a 到小写 z 的字符。

          - [A-Z]

            - 查找任何从大写 A 到大写 Z 的字符。

          - [A-z]

            - 查找任何从大写 A 到小写 z 的字符。

          - [adgk]

            - 查找给定集合内的任何字符。

          - [^adgk]

            - 查找给定集合外的任何字符。

          - (red|blue|green)
            - 查找任何指定的选项。

        - 元字符

          - 元字符（Metacharacter）是拥有特殊含义的字符：

          - .

            - 查找单个字符，除了换行和行结束符。

          - \w

            - 查找数字、字母及下划线。

          - \W

            - 查找非单词字符。

          - \d

            - 查找数字。

          - \D

            - 查找非数字字符。

          - \s

            - 查找空白字符。

          - \S

            - 查找非空白字符。

          - \b

            - 匹配单词边界。

          - \B

            - 匹配非单词边界。

          - \0

            - 查找 NULL 字符。

          - \n

            - 查找换行符。

          - \f

            - 查找换页符。

          - \r

            - 查找回车符。

          - \t

            - 查找制表符。

          - \v

            - 查找垂直制表符。

          - \xxx

            - 查找以八进制数 xxx 规定的字符。

          - \xdd

            - 查找以十六进制数 dd 规定的字符。

          - \uxxxx
            - 查找以十六进制数 xxxx 规定的 Unicode 字符。

        - 量词

          - n+

            - 匹配任何包含至少一个 n 的字符串。

            - 例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。

          - n\*

            - 匹配任何包含零个或多个 n 的字符串。

            - 例如，/bo\*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。

          - n?

            - 匹配任何包含零个或一个 n 的字符串。

            - 例如，/e?le?/ 匹配 "angel" 中的 "el"，"angle" 中的 "le"。

          - n{X}

            - 匹配包含 X 个 n 的序列的字符串。

            - 例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。

          - n{X,}

            - X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。

            - 例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。

          - n{X,Y}

            - X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。

            - 例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。

          - n$

            - 匹配任何结尾为 n 的字符串。

          - ^n

            - 匹配任何开头为 n 的字符串。

          - ?=n

            - 匹配任何其后紧接指定字符串 n 的字符串。

          - ?!n
            - 匹配任何其后没有紧接指定字符串 n 的字符串。

      - RegExp 对象方法

        - patt.test(str)

          - 检测一个字符串是否含有某个模式或字符。返回布尔值 true 或 false。

        - patt.exec()

          - 检索字符串中指定的值。返回找到的值，并确定其位置。

          - 执行强大的、通用的模式匹配。

        - patt.toString()
          - 返回正则表达式的字符串。

      - 支持正则表达式的 String 对象的方法

        - patt.search

          - 检索与正则表达式相匹配的值

        - patt.match

          - 找到一个或多个正则表达式的匹配

        - patt.replace

          - 替换与正则表达式匹配的子串

        - patt.split
          - 把字符串分割为字符串数组

      - RegExp 对象属性

        - patt.constructor

          - 返回一个函数，该函数是一个创建 RegExp 对象的原型。

        - patt.global

          - 判断是否设置了 "g" 修饰符

        - patt.ignoreCase

          - 判断是否设置了 "i" 修饰符

        - patt.lastIndex

          - 用于规定下次匹配的起始位置

          - 上次匹配后的字符位置,用于一个字符串中进行多次匹配。

        - patt.multiline

          - 判断是否设置了 "m" 修饰符

        - patt.source
          - 返回正则表达式的匹配模式 正则表达式的源文本。

    - Error 对象

      - Error 对象方法

        - message

          - 提供异常详细信息的错误消息。

        - name

          - 声名异常类型的字符串。

        - toString()

          - 返回一个表示 Error 对象的字符串。

        - 子对象类型： 指示具体的错误类型。

          - EvalError(执行错误)。

          - RangeError(在数字超出合法范围时抛出)。

          - ReferenceError(在读取不存在的变量时抛出)。

          - SyntaxError(抛出该错误用来通知语法错)。

          - TypeError(当一个值的类型错误时,抛出该异常)。

          - URIError(由 URI 的编码和解码方法抛出)。

    - String 字符串对象

      - String 字符串对象方法

        - fromCharCode() 静态方法, 用作为参数而传递的字符代码创建一个新的字符串。

        - length 字符串的长度。

        - charAt() 抽取字符串中指定位置的字符。

        - charCodeAt() 返回字符串中指定位置的字符编码。

        - concat() 把一个或多个值连接到字符串上。

        - indexOf() 在字符串中检索一个字符或一个子串。

        - lastIndexOf() 在字符串中向后检索一个字符或一个子串。

        - localeCompare() 用本地特定顺序来比较两个字符串。

        - match() 用正则表达式执行模式匹配。

        - replace() 用正则表达式执行查找、替换操作。

        - search() 检索字符串中与正则表达式匹配的子串。

        - slice() 返回字符串的一个片断或一个子串。

        - split() 把字符串分割成一个字符串数组,在指定的分界字符处或正则表达式处执行分割。

        - substring() 从字符串中抽取一个子串。

        - substr() 从字符串中抽取一个子串。

        - toLowerCase() 把字符串中所有字符转换成小写的,然后返回一个副本。

        - toString() 返回原始的字符串值。

        - toUpperCase() 把字符串中所有字符转换成大写的,然后返回一个副本。

        - valueOf() 返回原始字符串值。

    - Function 对象

      - Function 对象方法

        - arguments Arguments 对象, 反对使用该属性。

        - caller 对调用当前函数的 Funciton 对象的引用,反对使用该属性。

        - length 在声名函数时指定的命名参数个数。

        - prototype 一个对象,用于构造函数,这个对象定义的属性和方法由构造函数创建的所有对象共享。

        - apply() 将函数作为指定对象的方法来调用,传递给它的是指定的参数数组。

        - call() 将函数作为指定对象的方法来调用,传递给它的是指定的参数。

        - toString() 返回函数的字符串表示。

  - 全局属性

    - Infinity 表示正无穷大的数值

    - NaN 非数字值

    - undefined 未定义的值

    - decodeURI() 对 encodeURI()转义的字符串解码。

    - decodeURIComponent() 对 encodeURIComponent()转义的字符串解码。

    - encodeURI() 返回参数的副本,其中某些字符被十六进制的转义序列替换了, 建议使用 encodeURIComponent()对字符串进行编码。

    - encodeURIComponent() 返回参数的副本,其中某些字符被十六进制的转义序列替换了。

    - escape() 用转义序列替换某些字符来字符串编码。

    - eval() 计算 Javascript 代码串,返回结果。

    - isFinite() 检验一个值是否是无穷大的数字。

    - isNaN() 检验一个值是否是非数字的值。

    - parseFloat() 从字符串解析一个数字。

    - parseInt() 从字符串解析一个数字。

    - unescape() 对用 escape()编码的字符串解码。

  - Array 高级 API

    - sort()

      - 按升序排列数组--即最小的值位于最前面，最大的值排在最后面

      - 存在问题

        - 只能通过第一位排列

      - 解决办法

        - 通过回调函数进行规制设置

        - a - b 升序

        - b - a 降序

        - 内部运用了冒泡排序

    - slice()

      - 返回值 返回一个新的数组，包含从 start 到 end（不包括该元素）的 arrayObject 中的元素。

      - 参数说明

        - start

          - 必需（否则没有意义）。规定从何处开始选取，即提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。如果没有指定该参数，则从索引 0 开始。如果该参数大于原数组的长度，则会返回空数组。

        - end
          - 可选。规定从何处结束选取，该参数是数组片断结束处的数组下标，即提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素，该方法会提取原数组中索引从 start 到 end 的所有元素（包含 start，但不包含 end）。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果该参数大于数组的长度，也会一直提取到原数组末尾。

    - splice()

      - 实现删除、插入、替换

        - 删除：删除任意数量的项，只需指定 2 个参数：要删除的第一项位置和要删除的项数。例如：splice(0,2)会删除数组中的前两项

        - 插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、0 （要删除的项）和要插入的项。例如， splice（2,0,11,12）会从当前数组的位置开始插入 11 和 12

        - 替换：可以向指定位置插入任意数量的项。且同时删除任意数量的项，只需要指定三个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如： splice(2,1,4,6) 会删除当前数组位置 2 的项，然后再从位置 2 开始插入 4 和 6

      - 清空数组
        - arr.splice(0);

    - forEach()

      - 对数组进行遍历循环，对数组中的每一项运行给定函数

      - 格式
        - arr.forEach(function(value,index){})

    - map()

      - "映射"：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

    - filter()

      - "过滤" 功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组

    - every()

      - 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 true。

    - some()

      - 判断数组中每一项都是否满足条件，只要有一项满足条件，才会返回 true。

      - 查询数组中唯一元素的方法

  - 定时器

    - https://www.jb51.net/article/45215.htm

    - 1.倒计定时器：timename=setTimeout("function();",1000);

    - 2.循环定时器：timename=setInterval("function();",1000);

### JavaScript 垃圾回收机制(GC)

- 1.程序运行过程中会产生垃圾，垃圾积攒过多会导致程序运行速度过慢，所以我们需要一个垃圾回收机制，来处理程序运行过程产生的垃圾

- 2.当一个对象没有任何变量或者属性对它引用，此时我们将永远无法操作该对象，此时这种对象就是一个垃圾，这种对象过多会占用大量的内存空间，导致程序运行变慢，所以必须进行垃圾清理

- 3.在 JS 中拥有自动的垃圾回收机制，会自动将这些垃圾从内存中销毁，我们不需要也不能进行垃圾回收的操作

- 4.我们需要做的只是将不再使用的对象设置 null 即可

### 数据结构

- 堆栈结构

- 队列结构

- 链表

### this 指向

- 1.全局作用域或者普通函数中的 this 指向全局对象 window。(定时器里面的 this 也指向 window)

- 2.在以方法的形式调用时，谁调用，this 就指向谁

- 3.构造函数中 ，this 指向构造函数的实例对象

  - function Fn(){ console.log(this); } var fn = new Fn()

  - this 指向 fn

### 同步、异步 多线程

- 同步任务

  - 同步任务都在主线程上执行，形成一个执行栈

- 异步任务

  - JS 异步是通过回调函数实现的

  - 一般三种类型

    - 普通事件，如 click、resize 等

    - 资源加载，如 load、error 等

    - 定时器，包括 setInterval、setTimeout 等

  - 异步任务相关回调函数添加到任务队列中(任务队列也称消息队列)

- JS 执行机制

  - 1.先执行执行栈中的同步任务

  - 2.异步任务(回调函数)放入任务队列中

  - 3.一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行

  - 由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环(event loop)

- 多线程库
  - Concurren.Thread.js

## 进阶

### 输入输出

- 输出数据

  - 使用 document.write() 方法将内容写到 HTML 文档中。

    - 我的第一个 Web 页面 我的第一个段落。 点我 function myFunction() { document.write(Date()); }

  - 使用 innerHTML 写入到 HTML 元素。

    - 我的第一个 Web 页面 我的第一个段落 document.getElementById("demo").innerHTML = "段落已修改。";

      - document.getElementById("demo") 是使用 id 属性来查找 HTML 元素的 JavaScript 代码 。

      - innerHTML = "段落已修改。" 是用于修改元素的 HTML 内容(innerHTML)的 JavaScript 代码。

  - 使用 console.log() 写入到浏览器的控制台。
    - 我的第一个 Web 页面 a = 5; b = 6; c = a + b; console.log(c);

- 弹出框

  - window.alert() 弹出警告框。

    -  window.alert(5 + 6);

  - 弹出数据输入框

    - prompt('请输入你的年龄')

  - 弹出框警示框
    - alert('弹出的数据')

### 算法

- https://www.jianshu.com/p/0f56afd5122e

- 1.冒泡排序（Bubble Sort）

  - 重复地走访过要排序的数列，一次比较两个元素， 如果它们的顺序错误就把它们交换过来
    - //定义三个变量 a、b、c //用户输入 //冒泡排序 var tamp; if(b > c){ temp=a a=b; b=tamp } if(a > b){ temp=a a=b; b=tamp }

- 2.选择排序（Selection Sort）

- 3.插入排序（Insertion Sort）

- 4.希尔排序（Shell Sort）

- 5.归并排序（Merge Sort）

- 6.快速排序（Quick Sort）

- 7.堆排序（Heap Sort）

- 8.计数排序（Counting Sort）

- 9.桶排序（Bucket Sort）

- 10.基数排序（Radix Sort）

### BOM

- 简介

  - JavaScript 操作浏览器的部分功能的 API 对象模型

  - 提供了独立内容，而与浏览器窗口进行交互的对象

  - 提供了独立用于管理窗口与窗口之间的通讯，因此其核心对象是 window

  - BOM 由一系列相关的对象构成，并且每个对象对提供了很多方法与属性

- 需要掌握什么？

  - 掌握与浏览器窗口交互的一些对象

    - 可以移动、调整浏览器大小的 window 对象

    - 可以用于导航的 location 对象与 history 对象

    - 可以获取浏览器、操作系统与用户屏幕信息的 navigator 与 screen 对象

- window 对象

  - 常见事件

    - 加载事件

      - window.addEventListener('load',function(){})

        - 等页面内容全部加载完毕，包含 dom 元素 图片 flash css 等

      - window.addEventListener('DOMContentLoaded',function(){})
        - dom 加载完毕，不包含图片 flash css 等就可以执行 加载速度比 load 更快

    - 调整窗口大小的事件

      - window.addEventListener('resize',function(){ console.log(window.innerWidth) })
        - window.innerWidth
          - 窗口大小

    - setTimeout() 定时器

      - setTimeout(function(){ console.log('时间到了') }2000)

      - setTimeout(函数,2000)

      - 停止定时器

        - clearTimeout(定时器名字)

      - 只调用一次

    - setInterval() 定时器

      - setInterval(函数,2000)

      - 停止定时器

        - clearInterval(定时器名字)

      - 默认重复调用

    - pageshow

      - window.addEventListener('pageshow',function(){})

      - 重新加载页面触发的事件

  - 主要知识点

    - 既是 ECMAscript 规定的全局 global 对象，又是 JavaScript 访问浏览器窗口的一个接口

    - 系统对话框

      - 系统对话框，这些对话框外观由操作系统/浏览器决定，css 不起作用，所以很多时候需要自定义对话框

      - alert()

        - 在当前页面上弹出警告框，并且显示内容

      - confirm()

        - 功能：弹出一个带确定和取消按钮的提示框

        - 返回值：

          - 点击确定返回 true

          - 点击取消返回 false

      - prompt()

        - 功能：弹出一个带输入框的提示框

        - 参数：

          - 第一个参数：提示面板上的内容。

          - 第二个参数：输入框默认的值。

        - 返回值：

          - 点击确定，返回输入框中的内容

          - 点击取消，返回 null

    - 移动窗口，调整窗口大小

    - 导航和打开窗口

    - 时序相关的函数(原来的 BOM 实现，而非 ECMAjavascript)

    - open 方法

      - 1.要加载的 URL

      - 2.窗口的名称或者窗口的目标

      - 3.一个特性的字符串

  - 属性和方法

    - 所有的全局变量都是 window 的属性

      - window 正常情况下是省略写

      - var num = 0 window.num

    - 所有全局的函数都是 window 的方法

- document 对象

  - 每个载入浏览器的 HTML 文档都会成为 Document 对象； Document 对象可以对 HTML 页页面中的所有元素进行访问， 常用的操作有：增、删、改、查。

  - Document 对象是 Windows 对象的一部分， 可通过 window.document 属性进行访问

  - 常用的对象方法

    - 常规方法

      - close()

        - 关闭用 document.open()方法的输出流，并显示选定的数据

      - open()

        - 打开一个流，以收集任何 document.write() 或者 document.writeIn()方法的输出。

      - write()

        - 向文档写 HTML 表达式或 JavaScript 代码

      - writeIn()
        - 等同于 write()方法，不同的是在每个表达式之后的换行符

    - 内置属性方法

      - document.head

        - 获取头部

      - document.body

        - 获取 body

      - document.title
        - 获取 title

- frames

- location 对象

  - 属性

    - location.href

      - 获取或者设置整个 URL

      - 跳转链接页面

    - location.host

      - 返回主机(域名) www.xxxx.com

    - location.port

      - 返回端口号，如果没有返回空字符串

    - location.pathname

      - 返回路径

    - location.search

      - 返回参数

      - 页面的值传递

      - 参数截取分割

        - location.search.substr(截取位置,截取几个字符)

        - 再分割
          - .split('=')

    - location.hash
      - 返回片段 #后面内容 常见于链接 锚点

  - 方法

    - location.assign()

      - 跟 href 一样，可以跳转页面(也称为重定向页面) 可以后退返回原页面

    - location.replace()

      - 替换当前页面，可以跳转，但不能退回原页面

    - location.reload()
      - 重新加载页面，相当于刷新按钮或者 f5 ，如果参数为 true 强制刷新 ctrl+f5

- navigator 对象

  - userAgent

    - 浏览器标识对象

    -  返回由客户机发送服务器的 user-agent 头部的值。

    - 判断设备环境和浏览器
      - 实现不同页面的跳转

- history 对象

  - history.length 输出历史记录的条数

  - history.back()

    -     加载 history 列表中的前一个 URL。

  - history.forward()

    -     加载 history 列表中的下一个 URL。

  - history.go()

    - history.go(1)

      - 前进 1 步

      - 正整数 前进对应数字条记录

    - history.go(-1)

      - 后退 1 步

      - 负整数 后退对应数字条记录

    - history.go(0)

      - 刷新当前页面

    -  加载 history 列表中的某个具体页面。

- screen

### DOM

- JavaScript 操作网页上的元素的 API 文档对象模型

- 原理分析

  - HTML 加载完毕，渲染引擎会在内存中把 HTML 文档，生成一个 DOM 树，getElementById 是获取内中 DOM 上的元素节点、然后操作的时候修改的是该元素的属性

- DOM 文档对象模型

  - document 是文档对象模型的一部分

  - DOM 是一个复杂的数据类型

- Event 事件对象

  - 文档参考

    - JavaScript 是一门以事件驱动为核心的一门语言

    - https://www.runoob.com/jsref/dom-obj-document.html

  - 事件

    - 事件三要素

      - 事件源、事件、事件驱动程序

      - 获取事件源、绑定事件、书写事件驱动程序

    - 事件步骤

      - 事件源：一些 html 标签：比如：div、span、button 等标签

      - 事件：鼠标操作：鼠标经过、鼠标移动、鼠标按下...

      - 事件驱动：事件成功运行

      - 编码

        - 获取事件源

          - 子主题 1

        - 绑定事件

          - 子主题 1

        - 书写事件驱动程序
          - DOM 操作

  - 四个修改键：

    - shiftKey 如果按下 shift 键，值就是 true，否则是 false

    - ctrlKey

    - altKey

    - metakey （windows 键 mac 电脑下 command 键）

  - 获取 html 页面元素 (事件源的获取方式) (DOM 查询)

    - document.getElementById('id')

      - 获取 id

    - document.getElementsByName()

      - 查询 name 属性的元素

    - document.getElementByTagName('li')

      - 获取标签名

    - document.getElementByClassName('btn')

      - 获取类名

    - document.querySelector('#adv>img')

      - 获取#adv 的第一个 img 子元素

    - document.querySelectorAll('#adv>img')

      - 获取#adv 的所有 img 子元素

    - document.body

      - 返回文档的 body 元素

    - document.documentElement
      - 返回文档的根节点

  - 元素对象

  - 属性对象

  - 访问关系

    - 节点的获得

      - 节点的访问关系，以属性的方式存在的

      - DOM 的节点并不是孤立的，因此可以通过 DOM 节点之间的相对关系对它们进行访问

    - 获取 body、html 节点

      - 获取 body 元素

        - document.body

      - 获取 html 元素对象
        - document.documentElement

    - 父节点(parentNode)

      - 调用者就是节点，一个节点只有一个父节点

      - 节点.parentNode

    - 兄弟节点

      - 单词

        - Sibling

          - 兄弟

        - Next

          - 下一个

        - Previous
          - 上一个

      - 下一个兄弟节点

        - nextSibling

          - 调用者是节点

          - IE678 下中指下一个元素节点(标签)

          - 在火狐谷歌 IE9+以后都是指下一个节点(包括空文档和换行节点)

        - nextElementSibling

          - 在火狐谷歌 IE9+指的是下一个元素节点

        - 总结：在 IE678 中用 nextSibling，在火狐谷歌 IE9+以后用 nextElementSibling

        - 下一个兄弟节点 = 节点.nextElementSibling || 节点.nextSibling

      - 上一个兄弟节点

        - previousSibling

        - previousElementSibling

    - 单个节点

      - 第一个子节点

        - firstChild

          - 调用者是父节点，IE678 中指第一个子元素节点（标签） 在火狐谷歌 IE9+以后都是指第一个节点（包括空文档和换行节点）

        - firstElementChild

          - 在火狐谷歌 IE9 都指的第一个元素节点

        - 总结
          - 第一个子节点 = 父节点.firstElementChild || 父节点.firstChild

      - 最后一个子节点

        - latstChild

          - 调用者是父节点，IE678 中指最后一个子元素节点（标签） 在火狐谷歌 IE9+以后都是指最后一个节点（包括空文档和换行节点）

        - latstElementChild
          - 在火狐谷歌 IE9 都指的最后一个元素节点

      - 所有节点

        - childNodes

          - 标准属性，返回指定元素的子元素集合， 包括 HTML 节点，所有属性，文本节点

          - 注意：火狐，谷歌等高版本会把换行也看做是子节点

            - nodeType == 1

              - 表示是元素节点
                - 元素是标签

            - nodeType == 2

              - 表示是属性节点

            - nodeType == 3
              - 表示是文本节点

          - 获取所有子节点
            - 子节点数组 = 父节点.childNodes;

        - children

          - 非标准属性，返回指定元素的子元素集合

          - 但只返回 HTML 节点，不返回文本节点，虽不是标准的 DOM 属性 但和 innerHTML 方法一样，得到了几乎所有浏览器的支持

          - 注意

            - children 在 IE678 中包含注释节点

            - 在 IE678 中，注释节点不要写在里面

          - 获取所有节点
            - 子节点数组 = 父节点.children;

    - 获取任意兄弟节点

      - 节点自己.parentNode.children[index];

    - 获取子节点
      - 节点自己.childNodes

  - 节点操作

    - 节点源获取

      - 获取父节点

        - .parentNode

          - 得到的是离元素最近的父节点

          - 如果找不到则返回为 null

      - 获取子节点

        - .childNodes

          - 返回所有子节点

            - 包括文本节点和元素节点

            - 换行为文本节点

          - .childNodes[0].nodeType === 1

            - 这个时候会输出第一个元素节点

            - for 循环判断节点是否 相等 从而得到元素子节点

            - 不推荐使用

        - .firstChild

          - 返回第一个子节点
            - 包括文本节点和元素节点

        - .lastChild

          - 最后一个子节点
            - 包括文本节点和元素节点

        - .firstElementChild

          - 返回第一个子节点
            - 只是元素节点

        - .lastElementChild

          - 最后一个子节点
            - 只是元素节点

        - .children[1]

          - 指定第 1+1 个节点

          - .children[ol.children.length - 1]
            - 获取最后一个节点

      - 获取兄弟节点

        - div.nextSibling

          - 获取下一个兄弟节点
            - 包含元素节点和文本节点

        - div.nextElenmentSibling

          - 获取下一个兄弟节点
            - 只包含元素节点

        - div.previousSibling

          - 获取上一个兄弟节点
            - 包含元素节点和文本节点

        - div.previousElenmentSibling
          - 获取上一个兄弟节点
            - 只包含元素节点

    - 节点属性(节点.属性)

      - 获取：getAttribute(名称)

        - img.getAttribute("src")

      - 获取属性

        - ele.dataset.属性 ele.dataset.['属性']

          - h5 新增的属性获取方法

          - 如果自定义属性里面有多个-符号连接的单词， 我们获取的时候采取驼峰命名法

            - l-list

            - lList

      - 设置：setAttribute(名称,值)

        - img.setAttribute("src","img/img.png")

      - 删除：removeAttribute(名称)

        - img.removeAttribute("src")

      - 注意 IE67 不支持

    - 节点操作-CRUD(增删改查)

      - 创建节点

        - var li = document.createElement('li')；

      - 添加节点

        - 父节点.appendChild(li)；

        - 父节点.insertBefore(新节点 , 参考节点);

          - 在参考节点前插入

          - 如果参考节点为 null,那么他将在节点最后插入一个节点

        - 父节点.insertAdjacentHTML('位置',li);

          - '位置'参数

            - 元素自身的前面

              - beforbegin

            - 插入元素内部的 第一个子节点前

              - afterbegin

            - 插入元素内部的 最后一个子节点之后

              - beforeend

            - 元素自身的后面
              - afterend

          - 参数 2
            - 要插入的元素

      - 删除节点

        - 父节点.removeChild(子节点)；

          - 需要先找到他的父节点，再删除

          - this.parentNode

        - 当前节点.remove();

      - 复制节点

        - oldNode.cloneNode(true)

          - 想要复制的节点调用这个函数 cloneNode(),得到一个新节点。

          - 新节点 = 要复制的节点.cloneNode(参数); 参数可选复制节点

          - 方法内部可以传参

            - 如果是 true，深层复制(深拷贝)，复制标签和里面的内容

            - 如果是 false，浅层复制(浅拷贝)，只复制节点本身，不复制里面的内容

    - 其他

      - 表单属性

        - value

          - 表单 value 值属性

        - disable

          - 禁用

        - type

          - 表单类型

            - text

            - password

      - innerHTML(标准)

        - 获取双闭合标签里面的内容。（识别标签）

        - 可以在里面直接写标签
          - div.html = '今天是：2021/05/30'

      - innerText

        - 获取双闭合标签里面的内容。（不识别标签）

      - 三种动态创建元素的区别

        - document.write()

          - 是直接将内容写入页面的内容流 但是页面的文档流执行完毕，则它会导致页面全部重绘

        - element.innerHTML

          - 是将内容写入某个 DOM 节点，不会导致页面重绘

          - 创建多个元素效率更高(不要拼接字符串，采取数组形式拼接-array.push(''))，结构稍微复杂

        - document.creareElement()
          - 创建多个元素效率稍微低一点，但结构更清晰

  - 事件绑定

    - 匿名函数绑定

      - 事件源.事件 = function(){事件驱动程序}

    - 函数名绑定

      - div.onclick = fn; function fn(){ alert("hello word!"); }

    - 事件监听方式

      - eventTarget.addEventListener(type,listener[,useCapture])

        - type

          - 事件类型字符串，比如 click、mouseover，注意不要带 on

        - listener

          - 事件处理函数，事件发生时。会调用该监听函数

        - useCapture
          - 可选参数，是一个布尔值，默认是 false。

      - JS 的事件对象 - event

        - btn.onclick = function(event){ // event 就是当前事件的对象，简称事件对象 var event = event || window.event;//兼容性写法 }

        -

        - 事件常见的属性和方法

        - 常用的鼠标事件

        - 常用的键盘事件

        - 在监听事件 addEventListener 里都没有'on'
          - document.addEventListener('keyup', function () { alert('我弹起了'); })

      - eventTarget.addEventListener('click',function(){})

      - 删除事件
        - div[1].removeEventListener('click',fn)

  - 事件对象

    - 示例

      - eventTarget.addEventListener('click',function(e){ console.log(e) })

    - 排他思想绑定事件

      - `for （var i = 0;i<btns.length;i++）{  btn[i].onclick = function (){    this.style.backgroundColor = 'pink';  }  this.style.backgroundColor = 'blue'; }`

    - 1.onload 事件

      - 页面加载（文本和图片）完毕的时候

      - 作用

        - js 的加载时和 html 同步加载的，如果使用元素在定义元素之间，容易报错

        - 整个页面上的所有元素加载完毕 再执行 js 内容

        - window.onload()可以预防使用标签在定义之前

    - 2.常见事件对象

      - 事件合集图

        - 图解

      - 键盘事件

        - onkeydown

          - 某个键盘按键被按下触发（如果按下不放手，会一直触发）

          - 第一执行顺序

          - 不区分字母大小写 a 和 A 得到的都是 65

        - onkeypress

          - 某个键盘按键被按下时 触发

          - 不认识功能键 如 ctrl shit 箭头 等

          - 第二执行顺序

          - 区分大小写，a 97 和 A 得到的是 65

        - onkeyup

          - 某个键盘按键被松开时触发（只支持字符键）

          - 第三执行顺序

        - keyup

          - 某个键盘按键被松开时触发

          - 不区分字母大小写 a 和 A 得到的都是 65

      - 键盘事件对象

        - e.keyCode

          - 返回该键的 ASCll 值

          - 判断按下了什么键

      - 鼠标事件

        - mouseenter

          - 鼠标移动到元素上触发

          - 没有冒泡

        - mouseover

          - 鼠标移动到元素上触发

          - 有冒泡

        - mouseout

          - 鼠标移出元素

        - mouseleave

          - 鼠标移出

        - mousemove

          - 鼠标在目标的上方移动

        - mousedown

          - 鼠标按键被按下

        - mouseup

          - 鼠标按键被释放弹起

        - click

          - 鼠标点击

        - dblclick

          - 鼠标的按钮被按下

        - contextmenu
          - 弹出右键菜单

      - 鼠标事件对象

        - e.clientX

          - 返回鼠标相对于浏览器窗口可视区的 X 坐标

        - e.clientY

          - 返回鼠标相对于浏览器窗口可视区的 Y 坐标

        - e.pageX

          - 返回鼠标相对于文档页面的 X 坐标 IE9+支持

        - e.pageY

          - 返回鼠标相对于文档页面的 Y 坐标 IE9+支持

        - e.screenX

          - 返回鼠标相对于电脑屏幕的 X 坐标

        - e.screenY
          - 返回鼠标相对于电脑屏幕的 Y 坐标

      - 移动端事件

        - 触屏(触摸)事件

          - div.addEventListener('touchstart',function(){})

          - touchstart

            - 手指触摸到一个 DOM 元素时触发

            - 事件对象 TouEvent

              - e.touches

                - 正在触摸屏幕的所有手指列表

              - e.targetTouches

                - 正在触摸当前 DOM 的手指列表

                - 如果侦听的是和 e.touches 同一个元素，结果是一样的

                - 拥有的元素

                  - 坐标

                    - pageX

                    - pageY

                  - 子主题 3

              - e.changedTouches

                - 手指状态发生了改变的列表 从无到有 或者 从有到无

                - 手指操作后，离开了屏幕 会有此元素

          - touchmove

            - 手指在一个 DOM 元素上滑动时触发

            - 事件对象 TouEvent
              - 子主题 1

          - touchend

            - 手指从一个 DOM 元素上移开时触发

            - 事件对象 TouEvent
              - 子主题 1

          - 滑动距离计算
            - 移动手指后的坐标 - 触摸手指的初始坐标

      - HTML 事件

        - 1、window 事件

          - load 当页面加载完成以后会触发

          - unload 当页面解构的时候触发(刷新页面，关闭当前页面) IE 浏览器兼容

          - scroll 页面滚动

          - resize 窗口大小发生变化的时候触发

        - 2、表单事件

          - blur 失去焦点

          - focus 获取焦点

          - select 当我们在输入框内选中文本的时候触发

          - change 当我们对输入框的文本进行修改并且失去焦点的时候

          - submit 当我们点击 submit 上的按钮才能触发

          - reset 当我们点击 reset 上的按钮才能触发

      - 常用事件补充

        - 修改元素样式

          - 行内样式操作

            - this.style.CSS 属性 = ''

          - 写好样式，再 js 添加类名

            - this.className = '类名'

            - 如果原来有类名，把原来类名添加上， 以空格分隔

        - 禁止右键菜单

          - document.addEventListener('selectstart',function(e){ e.preventDefault() })

            - e.preventDefault()

              - 阻止默认行为

            - selectstart
              - 禁止选择

        - onfocus

          - 获得焦点

        - onblur

          - 失去焦点

        - parseInt

          - 解析一个字符串，并返回一个整数

        - parseFloat
          - 参数 string 要读取并转换为浮点数的字符串。 返回 无。

    - 3.常见的事件对象属性

      - e.target

        - 返回事件触发对象 标准

        - 点击了哪个对象就指向返回的点击的元素

        - 与 this.currentTatget 作用相似

      - e.srcElement

        - 返回触发事件对象， 非标准 ie6-8

      - e.type

        - 返回事件的类型，比如 click、mouseover 不带 on

      - e.cancelBubble = true

        - 阻止冒泡 非标准 ie6-8

      - e.returnValue

        - 阻止默认事件(默认行为) 非标准 ie6-8

      - e.preventDefault()

        - 阻止默认事件(默认行为) 标准

      - e.stopPropagation()
        - 阻止冒泡 标准

  - 事件冒泡和事件捕获

    - 事件捕获

    - 事件冒泡

      - 事件的传播过程

      - 没有冒泡的事件
        - onblur、onfocus、onmouseenter、onmouseleave

    - 阻止冒泡

      - addEvenListener('click',function(){}flase)

        - flase

      - e.preventDefault()

        - 阻止默认事件(默认行为) 标准

      - e.stopPropagation()
        - 阻止冒泡 标准

    - 事件委托

      - 事件监听器设置在父节点上，然后利用冒泡原理影响设置每个子节点

      - var ul = document.querySelector('ul'); ul.addEventListener('click',function(e){ e.target.style.backgroundColor = 'pink'; })

      - 优点：不需要 for 循环来为一个个元素注册事件，提升了程序运行效率

  - 数据结构

    -

    - DOM 可以做什么？

      - 找对象（元素）

      - 设置元素的属性

      - 设置元素的样式

      - 动态创建和删除元素

      - 事件-触发响应

- 重点核心 节点操作

  - 创建

    - document.write()

      - 是直接将内容写入页面的内容流 但是页面的文档流执行完毕，则它会导致页面全部重绘

    - element.innerHTML

      - 是将内容写入某个 DOM 节点，不会导致页面重绘

      - 创建多个元素效率更高(不要拼接字符串，采取数组形式拼接-array.push(''))，结构稍微复杂

    - document.creareElement()
      - 创建多个元素效率稍微低一点，但结构更清晰

  - 删

    - removeChild()

  - 改

    - 修改 dom 的元素属性，dom 元素的内容，属性，表单的值等

    - 1.修改元素属性

      - src、href、title 等

    - 2.修改普通元素的内容

      - innerHTML、innerText

    - 3.修改表单元素

      - value、type、disable 等

    - 4.修改元素样式

      - style、className

      - oDiv.style.width

      - oDiv.style.backgroundColor

  - 查

    - 1.DOM 提供的 API 方法：getElementById、getElementsByTagName 等古老用法，不太推荐

    - 2.H5 提供的新方法：querySelect、querySelectAll， 推荐使用

    - 3.利用节点操作获取元素：父(parentNode)、子(children)、兄(previousElementSibling、nextElementSibling)，推荐使用

  - 节点操作的方法

    - document.write("hello world");

    - document.createElement(标签的类型)

    - appendChild()

      -     格式：node1.appendChild(node2);

      -     功能：将node2插入到node1的子节点末尾

    - insertBefore()

      - 格式：box1.parentNode.insertBefore(box2, box1);

      - 功能：将 box2 插入到 box1 的前面

    - createTextNode()

      - 格式：document.createTextNode()

      - 参数：文本内容

      - 功能：创建文本节点

    - replaceChild()

      - 格式：box1.parentNode.replaceChild(box2, box1);

      - 功能：用 box2 节点，将 box1 节点替换。

    - removeChild()

      - 格式：box1.parentNode.removeChild(box1);

      - 功能：将 box1 删除

    - cloneNode()

      - 格式：node.cloneNode()/node.cloneNode(true)

      - 功能：克隆节点,默认克隆节点本身

      - 返回值：新克隆出来的节点。

  - 元素节点子节点

    - childNodes 获取某一个元素节点所有的子节点。 伪数组

    - firstChild 快速获取到第一个子节点

    - lastChild 快速获取到最后一个子节点

    - nextSibling 找到兄弟节点中的下一个节点

    - previousSibling 找到兄弟节点中的上一个节点

    - 【注】只获取子节点中的元素节点。

      - children

      - firstElementChild

      - lastElementChild

      - nextElementtSibling

      - previousElementSibling

    - parentNode 可以快速获取到当前节点的父节点

### 元素家族 (元素可视化区域)

- offSet 家族(元素偏移量)

  - offSet 自己的，用于获取元素位置+尺寸：包括内边距+内容的宽度和高度

  - 内置对象 document 浏览器兼容模式

    - CSS1Compat：标准兼容模式开启 浏览器宽度:document.documentElement.clientWidth

  - offSet 元素 子级居于父级定位，若父级无定位，则基于 body 为准

  - 元素

    - 网页可见区域宽： document.body.clientWidth;

    - 网页可见区域高： document.body.clientHeight;

    - .offsetParent

      - 返回当前对象的父级（带有定位）盒子， 可能是父亲、也可能是爷爷

      - 子级居于父级定位，若父级无定位，则基于 body 为准

      - 和 parentNode 的区别
        - parentNode
          - 返回父级，最近一级的父级

    - .offsetTop

      - 返回元素相对带有定位的父元素上方的偏移

    - .offsetLeft

      - 返回元素相对带有定位的父元素左边框的偏移

    - 网页可见区域宽： document.body.offsetWidth (内容、边框和内边距);

    - 网页可见区域高： document.body.offsetHeight (内容、边框和内边距);

  - 可以和 e.pageX、e.pageY 配合使用

    - 商品放大镜效果

  - offsetXXX 和 style.XXX 的区别

    - 用 offsetLeft 和 style.left 来分析，其他的以此类推：

    - a) style.left 只能获取行内的，而 offsetLeft 则可以获取到所有的；

    - b) offsetLeft 可以返回没有定位盒子距离左侧的位置；而 style.left 不可以，其只能返回有定位盒子的 left;

    - c) offsetLeft 返回的是数字，而 style.left 返回的是字符串，除了数字外还带有单位：px;

    - 注意：可以用 parseInt 进行转化；比如：styleLeft='300px' ---> parseInt(styleLft) ---> 300

    - d) offsetLeft 是只读的，而 style.left 是可读写；

    - e) 如果没有给 当前 元素指定过 top 样式，则 style.top 返回的是空字符串。

- client 家族(元素可视区)

  - 用于获取元素大小

  - 可见区域的尺寸 padding 和内容宽度 (不包括边框)返回数值不带单位

    - clientWidth

    - clientHeight

  - 元素边框的宽

    - clientLeft

      - 左边边框的宽度

    - clientTop
      - 上边边框的宽度

- scroll 家族(元素滚动区)

  - 用于获取滚动距离

  - 自身实际宽度，返回数值不带单位

  - 元素

    - 网页正文全文宽： document.body.scrollWidth;

    - 网页正文全文高： document.body.scrollHeight;

    - 网页被卷去的头部： window.pageYOffset;

    - 网页被卷去的左：window.pageXOffset;

    - 网页被卷去的头部： document.body.scrollTop(x,y);

    - 网页被卷去的左： document.body.scrollLeft;

    - 元素被卷去的头部：element.scrollTop(x,y);

    - 元素被卷去的左： element.scrollLeft;

  - 页面滚动距离

    - window.pageXOffset

  - 对应的滚动事件

    - div.addEventListener('scroll',function(){console.log(div.scrollTop)})

  - 处理 scroll 家族浏览器适配问题

  - ie9+ 和 最新浏览器 window.pageXOffset; （scrollLeft） window.pageYOffset; （scrollTop）

  - Firefox 浏览器 和 其他浏览器 document.documentElement.scrollTop;

  - Chrome 浏览器 和 没有声明 DTD `<doctype >` document.body.scrollTop;

  - 兼容写法 var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

- offset、client 和 scroll 的区别分析

  - left 和 top 分析：

    - clientLeft: 左边边框的宽度；clientTop: 上边边框的宽度

    - offsetLeft: 当前元素距离有定位的父盒子左边的距离； offsetTop: 当前元素距离有定位的父盒子上边的距离

    - scrollLeft: 左边滚动的长度; scrollTop: 上边滚动的长度;

  - width 和 height 分析

    - clientWidth\/Height: 内容 + 内边距

    - offsetWidth\/Height: 内容 + 内边距 + 边框

    - scrollWidth\/Height: 滚动内容的宽度和高度

- 获取屏幕的可视区域(兼容性)

  - //ie9 及其以上的版本、最新浏览器 window.innerWidth, window.innerHeight

  - //标准模式浏览器 document.documentElement.clientWidth, document.documentElement.clientHeight

  - //怪异模式 document.body.clientWidth, document.body.clientHeight

  - //通用写法 function client() { if(window.innerWidth){ // ie9 及其以上的版本 return{ width: window.innerWidth, height: window.innerHeight } }else if(document.compatMode != 'CSS1Compat'){ // 怪异模式 return{ width: document.body.clientWidth, height: document.body.clientHeight } } // 标准 return{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight } }

- 常用窗口事件-onresize

### 数据存储

- 本地存储

  - 特征

    - 1.数据存储在用户浏览器中

    - 2.设置、读取方便、甚至页面刷新不丢数据

    - 3.容量较大，sessionStorage 约 5M、localStorage 约 20M

    - 4.只能存储字符串，可以将对象的 Json.stringify()编码后存储

  - window.sessionStorage

    - 对象

      - sessionStorage.setItem('uname',val)

        - 存储数据

      - sessionStorage.getItem('uname')

        - 获取数据

      - sessionStorage.removeItem('uname')

        - 移除数据

      - sessionStorage.clear();
        - 清空所有数据

    - 生命周期和特性

      - 1.关闭浏览器窗口便没有了

      - 2.同一个窗口(页面)的数据可以共享

      - 3.以键值对的形式存储使用

    - sessionStorage 常用于结合后台使用

  - window.localStorage

    - HTML5 中，新加入了一个 localStorage 特性

      - localStorage 中一般浏览器支持的是 5M 大小

      - 在不同的浏览器中 localStorage 会有所不同。

    - 对象

      - localStorage.setItem('uname',val)

        - 存储数据

      - localStorage.getItem('uname')

        - 获取数据

      - localStorage.removeItem('uname')

        - 移除数据

      - localStorage.clear();
        - 清空所有数据

    - 生命周期和特性

      - 1.生命周期永久生效，除非手动删除 ，否则关闭页面也会存在

      - 2.可以多窗口(页面)共享（统一浏览器共享使用）

      - 3.以键值对的形式存储使用

    - localStorage 的优势

      - localStorage 拓展了 cookie 的 4K 限制。

      - localStorage 会可以将第一次请求的数据直接存储到本地，这个相当于一个 5M 大小的针对于前端页面的数据库，相比于 cookie 可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的

    - localStorage 的局限

      - 浏览器的大小不统一，并且在 IE8 以上的 IE 版本才支持 localStorage 这个属性。

      - 前所有的浏览器中都会把 localStorage 的值类型限定为 string 类型，这个在对我们日常比较常见的 JSON 对象类型需要一些转换。

      - localStorage 在浏览器的隐私模式下面是不可读取的。

      - localStorage 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。

      - localStorage 不能被爬虫抓取到。

      - localStorage 属于永久性存储。

  - cookie

    - 特性

      - 1、可以设置过期时间

      - 2、最大可以存 4KB

      - 3、每一个域名下面最多可以存储 50 条数据

### 代码实战

- 代码实战 1

  - 代码例子

    - 图片切换

    - 图片的显示和隐藏

    - 百度换肤

    - 选中和取消选中

    - transform 的运用

    - 输入框焦点处理

    - 表单验证

      - parseInt

        - 解析一个字符串，并返回一个整数

      - parseFloat

        - 参数 string 要读取并转换为浮点数的字符串。 返回 无。

      - function $(id){ return typeof id==="string"?document.getElementById(id):null }
        - $ 函数名。 id 参数 如果传入的 id 是字符串类型的。返回 document.getElementById(id) 如果不是 直接返回 null

    - 选项卡

    - 简化微博

      - 01-九宫格布局
        - 求出当前盒子所在的行和列
          - var row = parseInt(i / allCols); var col = parseInt(i % allCols);

    - 定时器

      - 01-Date

        - 基本属性

          - console.log(date.getDate()); // 日 console.log(date.getDay()); // 星期几 console.log(date.getMonth() + 1); // 月 console.log(date.getFullYear() ); // 完整的年份 console.log(date.getHours() ); // 小时 console.log(date.getMinutes() ); // 分钟 console.log(date.getSeconds() ); // 秒 console.log(date.getMilliseconds() ); // 毫秒 console.log(date.getTime() ); // 时间戳

        - 简单日历效果

      - 02-定时器

        - 1. 需求

          - 1. JS 的程序的执行速度是非常快的, 如果希望一段程序，可以每间隔一段时间执行一次，可以使用定时调用

          - 2. 某一段程序需要在延迟多少时间后执行，可以使用定时器调用

        - 2. 使用

          - 循环执行

            - var timeid = window.setInterval（“方法名或方法”，“延时”）; window.clearInterval(timeid);

          - 定时执行

            - var timeid = window.setTimeout(“方法名或方法”, “延时”); window.clearTimeout(timeid);

            - 当方法执行完成定时器停止(但是定时器还在,只不过没用了)

          - 一次定时器
            - setTimeout

        - 3. 实操

      - 03-时钟表实战

        - 时钟

        - 思路

          - 时间戳

            - 先求出毫秒

            - 秒

            - 分钟

            - 小时

          - 再用 CSS 旋转属性

      - 04-长图滚动效果

      - 05-随机点名册

      - 06-匀速动画

      - 07-缓动动画

      - 08-轮播

  - 代码封装

  - 排他思想

    - `btnList[0].onclick = function () {    //遍历清除所有的 claaName    for (var i = 0; i< btnList.length; i++){        btnList[i].className=''    }    //将响应事件的按钮，再单独设置    btnList[0].className='current' };`

  - 1. 字符串 API

    - charAt()

      - 返回在指定位置的字符。

    - charCodeAt()

      - 返回在指定的位置的字符的 Unicode 编码。

    - concat()

      - 连接字符串

    - indexOf()

      - 检索字符串

    - lastIndexOf()

      - 从后向前搜索字符串

    - toLowerCase()

      - 把字符串转换为小写。

    - toUpperCase()
      - 把字符串转换为大写。

  - 2. 编码

    - URI

      - 统一资源标识符，或叫做 URI，是用来标识互联网上的资源（例如，网页或文件）和怎样访问这些资源的传输协议（例如，HTTP 或 FTP）的字符串。

      - 除了 encodeURI、encodeURIComponent、decodeURI、decodeURIComponent 四个用来编码和解码 URI 的函数之外 ECMAScript 语言自身不提供任何使用 URL 的支持。

    - encodeURI 和 decodeURI

      - 这两个函数操作的是完整的 URI；这俩函数假定 URI 中的任何保留字符都有特殊意义，所有不会编码它们。

    - encodeURIComponent

      - 可把字符串作为 URI 组件进行编码

      - 该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - \_ . ! ~ \* ' ( )

    - decodeURIComponent
      - 可把字符串作为 URI 组件进行解码

  - 面试作业-1

    - 1. 浏览器请求一个资源的过程?

    - 2. 页面渲染的过程?

    - 3. 请描述计算机网络的 OSI 七层模型? css 渲染是在这七层的那一层?

    - 4. 浏览器输入一个网址，得到页面的具体过程?

    - 5. 什么是 TCP 三次握手、四次挥手?

    - 6. 找 100 亿个数中最小的 1000 个数?

    - 7. 两个文件各有 100 亿个 URL，如何找到两个文件中相同的 URL ?

    - 8. 八个铁球，七个一样重，一个要重一些， 请问最少几次找出那个重的 ?

  - 面试作业-2

    - 1. var 的变量提升的底层原理是什么?

    - 2. JS 如何计算浏览器的渲染时间?

    - 3. JS 的回收机制?

    - 4. 垂直水平居中的方式?

    - 5. 实现一个三栏布局，中间版块自适应方法有哪些?

    - 6. 如何判断一个对象是否为数组?

    - 7. 行内元素和块级元素有哪些? img 属于什么元素?

    - 8. margin 坍塌?

    - 9. 说说 BFC 原理?

    - 10. 写一下节点增删改?

    - 11. 如何获取元素的父节点和兄弟节点，写一下?

    - 12. 给你一个乱序数组，你怎么排序?

  - 面试作业-3

    - 1. 一个圆上随机三点，求形成锐角三角形概率？

    - 2. 请说说伪元素，伪类？

    - 3. dom 操作有哪些？

- 代码实战 2

  - 1.星空特效

    - 1.css 写好动效

    - 2.js 求出屏幕的尺寸

      - clientWidth

      - clientHeight

    - 3.动态创建星星

      - 遍历循环

        - for(var i=0;i=200;i++){ }

        - 遍历创建星星

        - 随机数创建随机坐标

        - 随机数创建星星的随机缩放

        - 随机数创建星星闪烁的频率

        - 鼠标经过星星旋转：用 JS 或者 css3 做

  - 2.照片墙特效

    - 1.写一个 ul 标签

    - 2.JS 获取标签

    - 3.js 创建标签

      - for 循环动态

        - 创建 li 标签

          - 放 img 标签

        - 创建 img 标签
          - 放图片

    - 4.求出屏幕宽度和高度

    - 5.随机分布角度

      - for 循环遍历

        - 取出单个 li 标签

        - 随机分布

          - 随机的屏幕宽度高度

        - 随机角度

    - 6.点击图片选中事件

      - 加选中的 CSS 动效

      - JS 点击监听事件
        - 循环遍历

  - 3.弹性导航

    - 使用事件

      - offSet 家族
        - 一定要用定位

    - 1.新建 ul>li 导航标签

    - 2..获取标签

    - 3.for 循环 li 标签的遍历

      - 监听鼠标进入事件

      - 监听鼠标按下事件

      - 监听鼠标离开事件

      - 缓动动画

        - 定义一个开始和结束的函数

        - 定时器计算
          - 数值的移动

  - 4.放大镜特效

    - JS 的事件对象 - event

      - btn.onclick = function(event){ // event 就是当前事件的对象，简称事件对象 var event = event || window.event;//兼容性写法 }

    - 1.写 Html 元素和 css 布局

      - 小图、中图(显示的图)、大图(鼠标滑动放大图)、遮罩

    - 2.JS 获取 6 个标签

    - 3.鼠标监听

      - 进入监听

        - 隐藏的遮罩显示

        - 鼠标移动监听

          - JS 的事件对象 - event

            - small_box.onmouseover = function(event){ // event 就是当前事件的对象，简称事件对象 var event = event || window.event;//兼容性写法 }

          - 求出鼠标坐标

            - 使用 event 事件的自带函数计算

          - 移动的边界检测

            - 宽和高计算：if(){}else{}

          - 让放大镜移动起来

          - 让大图移动起来
            - 求出中图移动多少，大图跟着移动

      - 离开监听

    - 4.遍历列表图片切换

  - 5.橱窗特效

  - 6.瀑布流布局

  - 7.中部导航吸顶特效

  - 8.侧边横幅特效

- https://egame.qq.com/5837682

### 正则表达式

- 用于匹配字符串中字符组合的模式

- 1.创建 正则表达式

  - 1.通过 new RegExp 对象 创建

    - var regexp = new RegExp(/123/);

  - 2.省略 new 运算符去声明

    - var box1 = RegExp("hello", "ig");

  - 3.利用字面量常量赋值创建
    - var reg = /123/

- 2.检测正则

  - test

    - 格式：正则.test(字符串)

    - 功能：在字符串中匹配这个正则是否存在

    - 返回值：如果匹配成功返回 true，匹配失败返回 false。

    - test() 方法用来检测字符串是否符合 正则表达式要求的规范

      - console.log(reg.test(123));

      - console.log(reg.test('abc'));

  - exec

    - 格式：正则.exec(字符串)

    - 功能：在字符串中匹配这个正则是否存在

    - 返回值：返回匹配到的串，匹配成功，返回一个装有字符串的数组

    - 匹配失败，返回 null

- 作用

  - 表单验证（匹配）

    - 表达式

      - 普通类

        - 只要包含

          - /a/

        - 以什么开头

          - /^a/

        - 以什么结尾

          - /a$/

        - 精确匹配
          - /^a$/

      - 字符串类

        - 只要包含

          - /[a]/

        - 多选 1,只要有一个

          - /^[abcde]$/

        - 限定字母 a 到 z 范围 之内只要有一个（字符组合）

          - /^[a-z]$/

          - /^[a-zA-Z]$/

            - 大写和小写都可以

          - /^[0-9]$/
            - 数字 0-9

        - 取反（括号里面有^符号，表示取反）
          - /^[^0-9]$/

    - 量词符（出现的次数）

      - \* 相当于 >=0 可以出现 0 次或者很多次

        - /^a\*$/

      - \+ 相当于 >=1 可以出现 1 次或者很多次

        - /^a+$/

      - ? 相当于 1||0

        - /^a?$/

      - {3} 重复 3 次

        - /^a{3}$/

      - {3, } 大于等于 3

        - /^a{3,}$/

      - {3, 16} 大于等于 3 并且小于等于 16

        - /^a{6,16}$/

      - 某个模式出现的次数
        - /^[a-zA-Z0-9_-]{6,16}$/

    - 元字符(预定义类)
      - 图解

  - 敏感词过滤（替换）

    - text.value.replace (/激情/,'\*\*');

      - 只替换一个

    - text.value.replace (/激情/g,'\*\*');

      - 全局匹配

    - text.value.replace (/激情/i,'\*\*');

      - 忽略大小写

    - text.value.replace (/激情/gi,'\*\*');

      - 全局匹配+忽略大小写

    - text.value.replace (/激情 | 贱/,'\*\*');
      - 多个关键词

  - 字符串的函数：

  - 从字符串中获取我们想要的特定部分（提取）

    - 提取

  - match()

    - 格式：字符串.match(正则)

    - 功能：在字符串匹配是否有符合正则表达式，

    - 返回值：匹配成功，返回装有匹配到子串的数组

    -  匹配失败，返回 null

  - replace()

    - 格式：字符串.replace(oldStr/正则, newStr);

    - 功能：用 newStr 将 oldStr 替换，

    - 返回值：替换成功的新字符串。

  - split()

    - 格式：字符串.split(分割符/正则);

    - 功能：用分割符将原字符串进行分割

    - 返回值：分割剩下的子串组成的数组。

  - search()

    - 格式：字符串.search(子串/正则)

    - 功能：找到符合条件的子串第一次出现的位置

    - 返回值：

    -  如果找到，返回>=0 的下标

    -  否则，返回-1

  - 单个数字和字符的元字符

    - . 匹配单个的任意字符

    - [范围] 匹配单个范围内的字符

    - [0-9]

    - [a-zA-Z0-9_] 匹配单个的数字、字母下划线

    - [^范围] 匹配任意一个除括号范围内的字符

    - [^0-9] 匹配任意一个非数字字符

    - \w 匹配单个的数字、字母下划线 等价于 [a-zA-Z0-9_]

    - \W 匹配单个非数字、字母下划线

    - \d 匹配单个数字 等价于 [0-9]

    - \D 匹配单个非数字 等价于 [^0-9]

  - 空白字符

    - \s 匹配任意单个的空白字符

    - \S 匹配任意单个非空白字符

  - 重复字符 x（任意的单个字符）

    - x? 匹配 0 个或者 1 个 x

    - x+ 匹配至少一个 x 字符

    - x\* 匹配任意个 x 字符

    - x{m,n}匹配至少 m 个，最多 n 个 x 字符，包括 n

    - x{n} 必须匹配 n 个 x 字符

    - (xyz)+ 小括号括起来的部分是当做单个字符处理

  - 锚字符

    - ^ 行首匹配 必须以这个正则开头

    - $ 行尾匹配 必须以这个正则结尾

- 注意

  - 正则表达式不需要加引号， 不管是数字类型还是字符串类型

- 表达式字母或符号详解

  - https://www.runoob.com/js/js-regexp.html

  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
