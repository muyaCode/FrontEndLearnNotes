# JavaScript 基础练习题

##### 1.**编写一个打印乘法口诀表的脚本程序。**

提示：使用嵌套循环来实现。

```JavaScript
var i,j;

for(i=1;i<=9;i++){
 for(j=1;j<=i;j++)
  document.write(i+'*'+j+'='+i*j+' ');
  document.write('<br />') ;
}
```

```JavaScript
document.write('<table border="1">')

for(i=1;i<=9;i++){
 document.write('<tr>')
 for(j=1;j<=i;j++)
 document.write('<td>'+i+'*'+j+'='+i*j+'</td>');
    document.write('</tr>');
}
```

##### **2.表格显示学生信息**

在一个大学的编程选修课班里，我们得到了一组参加该班级的学生数据，分别是姓名、性别、年龄和年级，接下来呢，我们要利用 JavaScript 的知识挑出其中所有是大一的女生的的名字哦。

**学生信息如下：**

('小 A','女',21,'大一'), ('小 B','男',23,'大三'), ('小 C','男',24,'大四'), ('小 D','女',21,'大一'), ('小 E','女',22,'大四'), ('小 F','男',21,'大一'), ('小 G','女',22,'大二'), ('小 H','女',20,'大三'), ('小 I','女',20,'大一'), ('小 J','男',20,'大三')

```JavaScript
var student=new Object();
var stus = new Array(10);
function Student(name,gender,age,grade){
    this.name=name;
    this.age=age;
    this.gender=gender;
    this.grade=grade;
}
stus[0]=new Student('小A', '女', 21, '大一');
stus[1]=new Student('小B', '男', 23, '大三');
stus[2]=new Student('小C', '男', 21, '大四');
stus[3]=new Student('小D', '女', 21, '大一');
stus[4]=new Student('小E', '女', 22, '大四');
stus[5]=new Student('小F', '男', 21, '大一');
stus[6]=new Student('小G', '女', 22, '大二');
stus[7]=new Student('小H', '女', 20, '大三');
stus[8]=new Student('小I', '女', 20, '大一');
stus[9]=new Student('小J', '男', 20, '大三');
function show(){
 var i;
 document.write('<table border = "1" width="400dp">');
 document.write('<tr><td>序号</td><td>姓名</td><td>性别</td><td>年龄</td><td>年级</td></tr>');
 for(i = 0;i<10;i++){
  if(stus[i].gender=='女'&&stus[i].grade=='大一'){
        document.write('<tr bgcolor="#3C6Fee"><th>'+(i+1)+'</th>   <th>'+stus[i].name+'</th><th>'+stus[i].gender+'</th>    <th>'+stus[i].age+'</th><th>'+stus[i].grade+'</th></tr>');
 }else{
  document.write('<tr><td>'+(i+1)+'</td><td>'+stus[i].name+'</td>   <td>'+stus[i].gender+'</td><td>'+stus[i].age+'</td>     <td>'+stus[i].grade+'</td></tr>');
    }
 }
 document.write('</table>');
}

show();
```

马克思的手稿中有这样一道有趣的数学题：有 30 我的，其中有男人，女人，小孩。他们在一家饭馆中吃饭，共花费 50 先令。若是每一个男人吃饭要花 3 先令，每一个女人要花 2 先令，每一个小孩要花 1 先令，问男人，女人，小孩各多少人？

```javascript
for (var man = 1; man < 17; man++) {
	for (var woman = 1; woman < 25; woman++) {
		var child = 50 - man * 3 - woman * 2;
		if (child + woman + man == 30) {
			console.log("男人" + man + "女人" + woman + "小孩" + child);
		}
	}
}
```

计算 e=1+1/1！+1/2！+1/3！……+1/n！的前 50 项

```javascript
// var e=1;
// var n=50;
// for(var m=1;m<=n;m++){
//     var fenmu=1;
//     //fenum分母的值
//     for(var s=1;s<=m;s++){
//         fenmu*=s;
//     }
//     e+=1/fenmu;
// }
// alert(e);
//方法二
var n;
var s = 1;
var e = 1;
for (n = 1; n <= 50; n++) {
	s = s * n;
	e = e + 1 / s;
}
document.write(e);
```

1. 输入一个数（不限位数），输出一个数字的位数。

```javascript
var input = document.getElementById("input");
var output = document.getElementById("output");

output.onclick = function () {
	var value = input.value;
	output.value = value.length;
};
```

打印九九乘法表

```javascript
var i, j;
for (i = 1; i <= 9; i++) {
	for (j = 1; j <= i; j++) {
		document.write(i + "*" + j + "=" + i * j + "&nbsp;&nbsp;&nbsp;");
	}
	document.write("<br><br>");
}
```

青年歌手参加歌曲大奖赛，有 10 个评委打分，试编程求选手的平均得分（去掉一个最高分和一个最低分）

```javascript
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<input type="" name="" value="" class="inputs">
<button onclick="fun()">得分</button>
<script type="text/javascript">
    var array=[],a,max,min;
    var inputs = document.getElementsByClassName('inputs');

    function fun(){
        max=min=parseInt(inputs[9].value);
        for(a=0;a<inputs.length;a++){
            if(parseInt(inputs[a].value)>=max){
                max = parseInt(inputs[a].value);
                var k = a;
            }
            if(parseInt(inputs[a].value)<=min){
                min = parseInt(inputs[a].value);
                var s = a;
            }
        }
alert(max);
alert(k);
alert(min);
alert(s);
        for(var m=0;m<inputs.length;m++){
            if(m!=k&&m!=s){
            array.push(parseInt(inputs[m].value));
            }
        }
        var count=0;
        for(var s=0;s<array.length;s++){

            count+=array[s];
        }
        // alert(count);
        alert(array.length);
        pingjun=count/array.length;
alert(pingjun);

    }
//方法二：
   // function demo() {
   //     var str = document.getElementById("getScore").value;
   //      var score = new Array();
   //      score= str.split(",");
   //      var max = 0;
   //      var min = 10000;
   //      var sum = 0;
   //      var ave = 0;
   //      for(i=0;i<score.length;i++){
   //          if(score[i]>max)
   //          {
   //              max = score[i];
   //          }
   //          if(score[i]<min)
   //          {
   //              min = score[i];
   //          }
   //          sum = sum+score[i];
   //      }
   //      ave = (sum-max-min)/8;
   //     document.getElementById("txt").innerHTML = ave;
   //  }
</script>
```

一、打印三角形

- \*\*

  ***

  ***

```JavaScript
for(var i = 1;i <= 4;i++){
        for(var j = 1;j <= i;j++){
            document.write("*");
        }
        document.write("<br>");
    }
```

-     **

***

***

```JavaScript
for(var i = 1;i <= 4;i++){
        for(var k = 4;k > i;k--){
            document.write("&nbsp;");
        }for(var j = 1;j <= i;j++){
            document.write("*")
        }
        document.write("<br>")
    }
for(var i = 1;i <= 4;i++){
        for(var k = 1;k <=(4-i);k++){
            document.write("&nbsp;");
        }for(var j = 1;j <= i;j++){
            document.write("*")
        }
        document.write("<br>")
    }
```

---

---

 \*_
​ _

```JavaScript
for(var i =4;i > 0;i--){
        for(var k = 4;k>i;k--){
            document.write("&nbsp;");
        }for(var j = 1;j<=i;j++){
            document.write("*")
        }
        document.write("<br>")
    }
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

---

---

\*\*

-

```JavaScript
for(var i = 1;i <= 4;i++){
        for(var j = 4;j >= i;j--){
            document.write("*");
        }
        document.write("<br>");
    }
```

 \*
​ \*\*\*

---

---

```JavaScript
for(var i=0;i<4;i++){
            for(var j=5;j>i;j--){
               document.writeln("&nbsp");
            }
            for(var k=0;k<2*i+1;k++){
               document.writeln("*");
            }
            document.writeln("</br>")
         }
```

二、水仙花数 三位数 各个数字的立方和等于本身，153 1*1*1 + 5*5*5 + 3*3*3 = 153

```JavaScript
for(var i = 100;i < 999;i++){
        var bai = parseInt(i/100);
        var shi = parseInt((i-bai*100)/10);
        var ge = i - bai*100 - shi*10;
        if(bai*bai*bai+shi*shi*shi+ge*ge*ge == i){
            document.write(i  + ",")
        }
    }
```

四、100 元购物卡，牙刷 5 元，香皂 2 元、洗发水 15 元 100 元正好花完有多少种可能

```JavaScript
var bs = 0;
    for(var i = 0;i<=20;i++){
        for(var j = 0;j <= 50;j++){
            for(var k = 0;k <= 6;k++){
                if(i*5 + j*2 + k*5 == 100){
                    bs++
                }
            }
        }
    }alert(bs);
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

100 内与 7 相关的数

```JavaScript
for(var i = 0;i <= 100;i++){
        if(i%7 == 0 || i%10 == 7 || parseInt(i/10) == 7){
            document.write(i+",")
        }
    }
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

六、100 以内的质数、只能被 1 和自己整除

```JavaScript
var flag = true
    for(var i = 2;i < 100;i++){
        flag = true;
        for(var j = 2;j < i;j++){
            if(i%j == 0){
                flag = false;
            }
        }if(flag){
            document.write(i+‘，‘)
        }
    }
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

16、大马驮 2 石粮食，中马驮 1 石粮食，两头小马驮一石粮食，要用 100 匹马，驮 100 石粮食，该如何调配？

```JavaScript
for(var i = 0;i <= 50;i++){
        for(var j=0;j <= 100;j++){
            for(var k = 0;k <= 100;k++){
                if(i*2+j*1+k/2 == 100 && i+j+k == 100){
                    document.write("大马："+i+"匹"+"")
                }
            }
        }
    }
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

17、有一个棋盘，有 64 个方格，在第一个方格里面放 1 粒芝麻重量是 0.00001kg，第二个里面放 2 粒，第三个里面放 4，
棋盘上放的所有芝麻的重量

```JavaScript
var sum = 0;
    for(var i = 1;i <= 64;i++){
        var num = 1;
        for(var j = 0;j < i-1;j++){
            num = num*2;
        }
        sum = sum+num;
    }
    alert(sum*0.000)
```

![分享图片](http://img.voidcn.com/vcimg/static/loading.png)

18、公园里有一只猴子和一堆桃子，猴子每天吃掉桃子总数的一半，把剩下一半中扔掉一个坏的。
到第七天的时候，猴子睁开眼发现只剩下一个桃子。问公园里刚开始有多少个桃子？

```JavaScript
var num = 1;
    for(var i = 6;i >=1;i--){
        num = (num+1)*2;
    }alert(num);
```

###### 二、小明单位发了 100 元的购物卡，小明到超市买三类洗化用品，洗发水（15 元），香皂（2 元），牙刷（5 元）。要把 100 元整好花掉，可若有哪些购买结合？

```javascript
//a=洗发水，b=香皂，c=牙刷
//100元能够买6瓶洗发水
for (var a = 0; a <= 6; a++) {
	//100元能够买50块香皂
	for (var b = 0; b <= 50; b++) {
		//100元能够买20个牙刷
		for (var c = 0; c <= 20; c++) {
			//条件
			if (15 * a + 2 * b + 5 * c == 100) {
				document.write("洗发水:" + a + "香皂:" + b + "牙刷:" + c + "<hr />");
			}
		}
	}
}
```

##### 三、打印出下列图形

●●●●●●●●
　　 ●●●●●●●●
　　 ●●●●●●●●
　　 ●●●●●●●●
　　 ●●●●●●●●
　　 ●●●●●●●●
　　 ●●●●●●●●c++

```javascript
 //循环的行数
             for(var x=1;x<=7;x++){
                 //循环的列数
                 for(var y=1;y<=8;y++){
                     document.write('●');
                 }
             //循环完每一行输出一个换行
             document.write('<br />');
             } 　　●　　●●　　●●●　　●●●●　　●●●●●
 for(var x=1;x<=5;x++){
                 for(var y=1;y<=x;y++){
                     document.write('●');
                 }
             document.write('<br />');
             }　　●●●●●　　●●●●　　●●●　　●●　　●
for(var x=1;x<=6;x++){
                for(var y=1;y<=6-x;y++){
                    document.write('●');
                }
            document.write('<br />');
            }　　□□□□● 　　□□□●● 　　□□●●● 　　□●●●● 　　●●●●●
for(var x=1;x<=5;x++){
                 for(var y=1;y<=5-x;y++){
                     document.write('□');
                 }
                 for(var z=1;z<=x;z++){
                     document.write('●');
                 }
             document.write('<br />');
             }
```

##### 四、公园里有一只猴子和一堆桃子，猴子天天吃掉桃子总数的一半，把剩下一半中扔掉一个坏的。到第七天的时候，猴子睁开眼发现只剩下一个桃子。问公园里刚开始有多少个桃子？

```javascript
//最后一天剩下一个桃子
var peach = 1;
//反推
for (var i = 1; i <= 6; i++) {
	peach = (peach + 1) * 2;
}
document.write("公园里刚开始有" + peach + "个桃子");
```

##### 五、某侦察队接到一项紧急任务，要求在 A、B、C、D、E、F 六个队员中尽量多地挑若干人，但有如下限制条件：<br /> ●A 和 B 两人中至少去一人； ●A 和 D 不能一块儿去； ●A、E 和 F 三人中要派两人去； ●B 和 C 都去或都不去； ●C 和 D 两人中去一个； ● 若 D 不去，则 E 也不去。 问应当让哪几我的去？

```javascript
for (var a = 0; a <= 1; a++) {
	for (var b = 0; b <= 1; b++) {
		for (var c = 0; c <= 1; c++) {
			for (var d = 0; d <= 1; d++) {
				for (var e = 0; e <= 1; e++) {
					for (var f = 0; f <= 1; f++) {
						//根据上面列出的条件,全都加到判断中,符合条件的就是最终的结果
						if (
							a + b >= 1 &&
							a + d != 2 &&
							a + e + f == 2 &&
							b == c &&
							c + d == 1 &&
							(d + e == 0 || d == 1)
						) {
							document.write(
								"a=" +
									a +
									"<br />b=" +
									b +
									"<br />c=" +
									c +
									"<br />d=" +
									d +
									"<br />e=" +
									e +
									"<br />f=" +
									f
							);
						}
					}
				}
			}
		}
	}
}
```

##### 六、循环输出 1~100 之间数字的和

```javascript
var sum = 0;
for (var i = 1; i <= 100; i++) {
	sum += i;
}
document.write(sum);
```

##### 七、1~100 奇数和

```javascript
var sum = 0;
for (var i = 1; i <= 100; i += 2) {
	sum += i;
}
document.write(sum + "<br />");
```

##### 八、1~100 偶数和

```javascript
var sum = 0;
for (var i = 2; i <= 100; i += 2) {
	sum += i;
}
document.write(sum);
```

##### 九、99 乘法表倒着写（table）

```javascript
document.write("<table border=1 style=border-collapse:collapse>");
for (var i = 9; i >= 1; i--) {
	document.write("<tr>");
	for (var j = 1; j <= i; j++) {
		document.write("<td>");
		document.write(j + "x" + i + "=" + i * j);
		document.write("</td>");
	}
	document.write("</tr>");
}
document.write("</table>" + "<br />");
spa;
```

##### 十、五个小朋友排成一队

问第一个多大了，第一个说比第二个大两岁，
　　问第二个，第二个说比第三个大两岁，以此类推。
　　问第五个小朋友几岁了，第五个小朋友说 3 岁了。
　　问第一个小朋友几岁？code

```javascript
var a = 1;
for (var i = 1; i <= 5; i++) {
	a = a + 2;
}
document.write("第一个小朋友" + a + "岁了");
```

##### 十一、凑钱 1,2，5 凑 20 元钱有多少种可能

```javascript
for (var a = 0; a <= 20; a++) {
	for (var b = 0; b <= 10; b++) {
		for (var c = 0; c <= 4; c++) {
			if (a + 2 * b + 5 * c == 20) {
				document.write("一块：" + a + "两块：" + b + "五块：" + c + "<hr />");
			}
		}
	}
}
```

##### 十二、有一对幼兔，幼兔 1 个月后长成小兔，小兔 1 个月后长成成兔并生下一对幼兔，问几年后有多少对兔子，幼兔、小兔、成兔对数分别是多少

```javascript
var a,b,c,sum;
             for(var i=1;i<=12;i++){
                 //第一个月的时候
                 if(i==1){
                     a = 1;
                     b = 0;
                     c = 0;
                    sum = 1;
                 }else{
                     c = c + b;
                     b = a;
                     a = c;
                     sum = a + b + c;
                 }
                 document.write(i+"个月后有幼兔："+a+"对，小兔："+b+"对，成兔："+c+"对；一共："+sum+"对。<hr />")
```

##### 1 三、打印出全部的 "水仙花数 "，所谓 "水仙花数 "是指一个三位数，其各位数字立方和等于该数自己

例如：153 是一个 "水仙花数 "，由于 153=1 的三次方＋ 5 的三次方＋ 3 的三次方。orm

```javascript
for (i = 100; i < 1000; i++) {
	var a = parseInt(i % 10); //个
	var b = parseInt((i / 10) % 10); //十
	var c = parseInt(i / 100); //百
	if (a * a * a + b * b * b + c * c * c == i) {
		document.write("水仙花数：" + i + "<hr />");
	}
}
```

##### 1 四、经过 for 循环实现百钱买百 🐔 的题:公鸡 5 元每只，母鸡 3 元每只，小鸡 3 只 1 元，100 元买一百只鸡多少种办法

```javascript
for (var a = 0; a <= 20; a++) {
	for (var b = 0; b <= 33; b++) {
		var c = 100 - a - b;
		if (a + b + c == 100 && 5 * a + 3 * b + c / 3 == 100) {
			document.write("公鸡:" + a + "母鸡:" + b + "小鸡:" + c + "<hr />");
		}
	}
}
document.write("<table border=1 style=border-collapse:collapse>");
for (var i = 9; i >= 1; i--) {
	document.write("<tr>");
	for (var j = 1; j <= i; j++) {
		document.write("<td>");
		document.write(j + "x" + i + "=" + i * j);
		document.write("</td>");
	}
	document.write("</tr>");
}
document.write("</table>" + "<br />");
```

---

#### 正则表达式练习

1 实现简单模板引擎 code

```JavaScript
var str = '个人名字是{{name}},年龄{{age}}'

var data = {
    name: '小葱',
    age: 17
}

function template (str, data) {
    return str.replace(/{{(.+?)}}/g,function() {
        return data[arguments[1]]
    })
}
```

2 给一个连字符串例如：get-element-by-id 转化成驼峰形 模板引擎

```JavaScript
function toHump (str) {
    return str.replace(/-(\w)/g,function () {
        return arguments[1].toUpperCase()
    })
}
```

3 分割数字每三个以逗号分割 element

```JavaScript
var str = "12345678901890";
function numSplit(str){
    return str.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}
console.log(numSplit(str))
```

---

#### 闭包练习题

## 题目描述

实现函数 makeClosures，调用以后知足以下条件：
一、返回一个函数数组 result，长度与 arr 相同
二、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同

示例 1

```JavaScript
 1 //参考《JavaScript高级程序设计》的典型方法
 2 function makeClosures(arr, fn) {
 3     var result = new Array();
 4     for(var i=0;i<arr.length;i++){
 5         result[i] = function(num){
 6             return function(){
 7                 return fn(num);
 8
 9             }
10         }(arr[i]);
11     }
12     return result;
13 }
14
15 //使用ES5的bind()方法
16 function makeClosures(arr, fn) {
17     var result = new Array();
18     for(var i=0;i<arr.length;i++){
19         result[i] = fn.bind(null,arr[i]);
20     }
21     return result;
22 }
23
24 //使用forEach()
25 function makeClosures(arr, fn) {
26     var result = new Array();
27     arr.forEach(function(curr){
28         result.push(function(){return fn(curr)});
29     })
30     return result;
31 }
32
33 //使用let
34 function makeClosures(arr, fn) {
35     var result = new Array();
36     for(let i=0;i<arr.length;i++){
37         result[i] = function(){
38             return fn(arr[i]); //let声明的变量只在let所在代码块内有效，所以每次循环的i都是一个新的变量
39         };
40     }
41     return result;
42 }
```

---

#### 问题 1: 作用域（Scope）

考虑以下代码：

```JavaScript
(function() {
   var a = b = 5;
})();

console.log(b);
```

控制台（console）会打印出什么？

答案

上述代码会打印出 5。

这个问题的陷阱就是，在立即执行函数表达式（IIFE）中，有两个赋值，但是其中变量 a 使用关键词 var 来声明。这就意味着 a 是这个函数的局部变量。与此相反，b 被分配给了全局作用域（译注：也就是全局变量）。

这个问题另一个陷阱就是，在函数中没有使用”严格模式” ('use strict';)。如果 严格模式开启，那么代码就会报错 ” Uncaught ReferenceError: b is not defined” 。请记住，如果这是预期的行为，严格模式要求你显式地引用全局作用域。所以，你需要像下面这么写：

```JavaScript
(function() {
   'use strict';
   var a = window.b = 5;
})();

console.log(b);
```

#### 问题 2: 创建 “原生(native)” 方法

在 String 对象上定义一个 repeatify 函数。这个函数接受一个整数参数，来明确字符串需要重复几次。这个函数要求字符串重复指定的次数。举个例子：

```JavaScript
console.log('hello'.repeatify(3));
```

应该打印出 hellohellohello.

答案

一个可行的做法如下：

```JavaScript
String.prototype.repeatify = String.prototype.repeatify || function(times) {
   var str = '';

   for (var i = 0; i < times; i++) {
      str += this;
   }

   return str;
};
```

这个问题测试了开发人员对 javascript 中继承及原型(prototype)属性的知识。这也验证了开发人员是否有能力扩展原生数据类型功能（虽然不应该这么做）。

在这里，另一个关键点是，看你怎样避免重写可能已经定义了的方法。这可以通过在定义自己的方法之前，检测方法是否已经存在。

```JavaScript
String.prototype.repeatify = String.prototype.repeatify || function(times) {/* code here */};
```

当你被问起去扩展一个 Javascript 方法时，这个技术非常有用。

**另一个**：重复输出一个给定的字符串（str 第一个参数）n 次 （num 第二个参数），如果第二个参数 num 不是正数的时候，返回空字符串。

```JavaScript
function repeatStringNumTimes(str, num) {
  return str;
}
repeatStringNumTimes("abc", 3);
```

提供测试情况：

```JavaScript
repeatStringNumTimes("*", 3) //应该返回 "***".
repeatStringNumTimes("abc", 3) //应该返回 "abcabcabc".
repeatStringNumTimes("abc", 4) //应该返回 "abcabcabcabc".
repeatStringNumTimes("abc", 1) //应该返回 "abc".
repeatStringNumTimes("*", 8) //应该返回 "********".
repeatStringNumTimes("abc", -2) //应该返回 "".
```

解题思路：

三种方法：

> 使用 `while` 循环
> 使用递归
> 使用 ES6 `repeat()`

##### 方法 1：通过 `while` 循环重复输出一个字符串

这可能是最常规的解题思路。while 语句只要指定的条件计算结果为 true 的时候，就执行其语句。while 语句结构大概是这样的：

```JavaScript
while (condition)
  statement
```

在每次通过循环之前计算条件结果。如果条件为 true，则执行语句。如果条件为 false，则执行继续 while 循环之后的任何语句。

只要条件为 true，语句就会执行。 这里是解决方案：

```JavaScript
function repeatStringNumTimes(string, times) {
  // 第1步. 常见一个空字符，用来寄存重复的字符串
  var repeatedString = "";

  // 第2步. 设置 while 循环的条件为(times > 0) 作为检查
  while (times > 0) { // 只要 times 大于 0, 语句就会执行
    // 执行语句 statement
    repeatedString += string; // 等价于 repeatedString = repeatedString + string;
    times--; // 递减，等价于 times = times - 1;
  }
  /* while循环逻辑
          条件        T/F    repeatedString += string   结果          次数
    1th   (3 > 0)    true    "" + "abc"                "abc"          2
    2th   (2 > 0)    true    "abc" + "abc"             "abcabc"       1
    3th   (1 > 0)    true    "abcabc" + "abc"          "abcabcabc"    0
    4th   (0 > 0)    false
    }
  */

  // 第3步. 返回重复字符串
  return repeatedString; // "abcabcabc"
}

repeatStringNumTimes("abc", 3);
```

去掉注释后：

```JavaScript
function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
repeatStringNumTimes("abc", 3);
```

好，轻松完成！不过这里还可以有几个变种：

对于老前端来说，首先一个可能会将字符串拼接，修改为 数组 join()拼接字符串，例如：

```JavaScript
function repeatStringNumTimes(string, times) {
  var repeatedArr = []; //
  while (times > 0) {
    repeatedArr.push(string);
    times--;
  }
  return repeatedArr.join("");
}
repeatStringNumTimes("abc", 3)
```

很多老前端都有用数组 join()拼接字符串的“情怀”，因为很早以前普遍认为数组 join()拼接字符串比字符串+拼接速度要快得多。不过现在未必，例如，V8 下+拼接字符串，要比数组 join()拼接字符串快。我用这两个方法测试了 3 万次重复输出，只相差了几毫秒。

另一个变种可以用 for 循环：

```JavaScript
function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  for(var i = 0; i < times ;i++) {
    repeatedString += string;
  }
  return repeatedString;
}
repeatStringNumTimes("abc", 3)
```

##### 方法 2：通过条件判断和递归重复输出一个字符串

递归是一种通过重复地调用函数本身，直到它达到达结果为止的迭代操作的技术。为了使其正常工作，必须包括递归的一些关键特征。

第一种是基本情况：一个语句，通常在一个条件语句（如 if）中，停止递归。

第二种是递归情况：调用递归函数本身的语句。

这里是解决方案：

```JavaScript
function repeatStringNumTimes(string, times) {
  // 步骤1.检查 times 是否为负数，如果为 true 则返回一个空字符串
  if (times < 0) {
    return "";
  }

  // 步骤2.检查times是否等于1，如果是，返回字符串本身。
  if (times === 1) {
    return string;
  }

  // 步骤3. 使用递归
  else {
    return string + repeatStringNumTimes(string, times - 1); // return "abcabcabc";
  }
  /*
    递归方法的第一部分你需要记住，你不会只调用一次，您将有好几个嵌套调用
                 times       string + repeatStringNumTimes(string, times - 1)
      1st call   3           "abc" + ("abc", 3 - 1)
      2nd call   2           "abc" + ("abc", 2 - 1)
      3rd call   1           "abc" => if (times === 1) return string;
      4th call   0           ""   => if (times <= 0) return "";
    递归方法的第二部分
      4th call will return      ""
      3rd call will return     "abc"
      2nd call will return     "abc"
      1st call will return     "abc"
    最后调用是串联所有字符串
    return "abc" + "abc" + "abc"; // return "abcabcabc";
  */
}
repeatStringNumTimes("abc", 3);
```

去掉注释后：

```JavaScript
function repeatStringNumTimes(string, times) {
  if(times < 0)
    return "";
  if(times === 1)
    return string;
  else
    return string + repeatStringNumTimes(string, times - 1);
}
repeatStringNumTimes("abc", 3);
```

##### 方法 3：使用 ES6 `repeat()` 方法重复输出一个字符串

这个解决方案比较新潮，您将使用 String.prototype.repeat() 方法：

repeat() 方法构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。 这个方法有一个参数 count 表示重复次数，介于 0 和正无穷大之间的整数 : [0, +∞) 。表示在新构造的字符串中重复了多少遍原字符串。重复次数不能为负数。重复次数必须小于 infinity，且长度不会大于最长的字符串。

这里是解决方案：

```JavaScript
function repeatStringNumTimes(string, times) {
  //步骤1.如果 times 为正数，返回重复的字符串
  if (times > 0) { // (3 > 0) => true
    return string.repeat(times); // return "abc".repeat(3); => return "abcabcabc";
  }

  //Step 2. Else 如果times是负数，如果为true则返回一个空字符串
  else {
    return "";
  }
}

repeatStringNumTimes("abc", 3);
```

去掉注释后：

```JavaScript
function repeatStringNumTimes(string, times) {
  if (times > 0)
    return string.repeat(times);
  else
    return "";
}
repeatStringNumTimes("abc", 3);
```

您可以使用三元表达式作为 if/else 语句的快捷方式，如下所示：

```JavaScript
function repeatStringNumTimes(string, times) {
  return times > 0 ? string.repeat(times) : "";
}
repeatStringNumTimes("abc", 3);
```

#### 问题 3: 变量提升（Hoisting）

执行以下代码的结果是什么？为什么？

```JavaScript
function test() {
   console.log(a);
   console.log(foo());

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

答案

这段代码的执行结果是 undefined 和 2。

这个结果的原因是，变量和函数都被提升(hoisted) 到了函数体的顶部。因此，当打印变量 a 时，它虽存在于函数体（因为 a 已经被声明），但仍然是 undefined。换言之，上面的代码等同于下面的代码：

```JavaScript
function test() {
   var a;
   function foo() {
      return 2;
   }

   console.log(a);
   console.log(foo());

   a = 1;
}

test();
```

#### 问题 4: 在 javascript 中，`this`是如何工作的

以下代码的结果是什么？请解释你的答案。

```JavaScript
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
```

答案

这段代码打印结果是：Aurelio De Rosa 和 John Doe 。原因是，JavaScript 中关键字 this 所引用的是函数上下文，取决于函数是如何调用的，而不是怎么被定义的。

在第一个 console.log()，getFullname()是作为 obj.prop 对象的函数被调用。因此，当前的上下文指代后者，并且函数返回这个对象的 fullname 属性。相反，当 getFullname()被赋值给 test 变量时，当前的上下文是全局对象 window，这是因为 test 被隐式地作为全局对象的属性。基于这一点，函数返回 window 的 fullname，在本例中即为第一行代码设置的。

#### 问题 5: call() 和 apply()

修复前一个问题，让最后一个 console.log() 打印输出 Aurelio De Rosa.

答案

这个问题可以通过运用 call()或者 apply()方法强制转换上下文环境。如果你不了解这两个方法及它们的区别，我建议你看看这篇文章 function.call 和 function.apply 之间有和区别?。 下面的代码中，我用了 call(),但 apply()也能产生同样的结果：

```JavaScript
console.log(test.call(obj.prop));
```

问题 6: 闭包（Closures）

考虑下面的代码：

```JavaScript
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
   nodes[i].addEventListener('click', function() {
      console.log('You clicked element #' + i);
   });
}
```

请问，如果用户点击第一个和第四个按钮的时候，控制台分别打印的结果是什么？为什么？

答案

上面的代码考察了一个非常重要的 JavaScript 概念：闭包（Closures）。对于每一个 JavaScript 开发者来说，如果你想在网页中编写 5 行以上的代码，那么准确理解和恰当使用闭包是非常重要的。如果你想开始学习或者只是想简单地温习一下闭包，那么我强烈建议你去阅读 Colin Ihrig 这个教程：JavaScript Closures Demystified

也就是说，代码打印两次 You clicked element #NODES_LENGTH，其中 NODES_LENGTH 是 nodes 的结点个数。原因是在 for 循环完成后，变量 i 的值等于节点列表的长度。此外，因为 i 在代码添加处理程序的作用域中，该变量属于处理程序的闭包。你会记得，闭包中的变量的值不是静态的，因此 i 的值不是添加处理程序时的值（对于列表来说，第一个按钮为 0，对于第二个按钮为 1，依此类推）。在处理程序将被执行的时候，在控制台上将打印变量 i 的当前值，等于节点列表的长度。

#### 问题 7: 闭包（Closures）

修复上题的问题，使得点击第一个按钮时输出 0，点击第二个按钮时输出 1，依此类推。

答案

有多种办法可以解决这个问题，下面主要使用两种方法解决这个问题。

第一个解决方案使用立即执行函数表达式（IIFE）再创建一个闭包，从而得到所期望的 i 的值。实现此方法的代码如下：

```JavaScript
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
   nodes[i].addEventListener('click', (function(i) {
      return function() {
         console.log('You clicked element #' + i);
      }
   })(i));
}
```

另一个解决方案不使用 IIFE，而是将函数移到循环的外面。这种方法由下面的代码实现：

```JavaScript
function handlerWrapper(i) {
   return function() {
      console.log('You clicked element #' + i);
   }
}

var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
   nodes[i].addEventListener('click', handlerWrapper(i));
}
```

问题 8：数据类型

考虑如下代码：

```JavaScript
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof undefined);
```

答案

前面的问题似乎有点傻，但它考察 typeof 操作符的知识。很多 JavaScript 开发人员不知道 typeof 的一些特性。在此示例中，控制台将显示以下内容：

```JavaScript
object
object
object
undefined
```

最令人惊讶的输出结果可能是第三个。大多数开发人员认为 typeof []会返回 Array。如果你想测试一个变量是否为数组，您可以执行以下测试：

```JavaScript
var myArray = [];
if (myArray instanceof Array) {
   // do something...
}
```

#### 问题 9：事件循环

下面代码运行结果是什么？请解释。

```JavaScript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}
printing();
```

答案

输出结果：

```JavaScript
1
4
3
2
```

想知道为什么输出顺序是这样的，你需要弄了解 setTimeout()做了什么，以及浏览器的事件循环原理。浏览器有一个事件循环用于检查事件队列，处理延迟的事件。UI 事件（例如，点击，滚动等），Ajax 回调，以及提供给 setTimeout()和 setInterval()的回调都会依次被事件循环处理。因此，当调用 setTimeout()函数时，即使延迟的时间被设置为 0，提供的回调也会被排队。回调会呆在队列中，直到指定的时间用完后，引擎开始执行动作（如果它在当前不执行其他的动作）。因此，即使 setTimeout()回调被延迟 0 毫秒，它仍然会被排队，并且直到函数中其他非延迟的语句被执行完了之后，才会执行。

有了这些认识，理解输出结果为“1”就容易了，因为它是函数的第一句并且没有使用 setTimeout()函数来延迟。接着输出“4”，因为它是没有被延迟的数字，也没有进行排队。然后，剩下了“2”，“3”，两者都被排队，但是前者需要等待一秒，后者等待 0 秒（这意味着引擎完成前两个输出之后马上进行）。这就解释了为什么“3”在“2”之前。

#### 问题 10：算法

写一个 isPrime()函数，当其为质数时返回 true，否则返回 false。

答案

我认为这是面试中最常见的问题之一。然而，尽管这个问题经常出现并且也很简单，但是从被面试人提供的答案中能很好地看出被面试人的数学和算法水平。

首先， 因为 JavaScript 不同于 C 或者 Java，因此你不能信任传递来的数据类型。如果面试官没有明确地告诉你，你应该询问他是否需要做输入检查，还是不进行检查直接写函数。严格上说，应该对函数的输入进行检查。

第二点要记住：负数不是质数。同样的，1 和 0 也不是，因此，首先测试这些数字。此外，2 是质数中唯一的偶数。没有必要用一个循环来验证 4,6,8。再则，如果一个数字不能被 2 整除，那么它不能被 4，6，8 等整除。因此，你的循环必须跳过这些数字。如果你测试输入偶数，你的算法将慢 2 倍（你测试双倍数字）。可以采取其他一些更明智的优化手段，我这里采用的是适用于大多数情况的。例如，如果一个数字不能被 5 整除，它也不会被 5 的倍数整除。所以，没有必要检测 10,15,20 等等。如果你深入了解这个问题的解决方案，我建议你去看相关的 Wikipedia 介绍。

最后一点，你不需要检查比输入数字的开方还要大的数字。我感觉人们会遗漏掉这一点，并且也不会因为此而获得消极的反馈。但是，展示出这一方面的知识会给你额外加分。

现在你具备了这个问题的背景知识，下面是总结以上所有考虑的解决方案：

```JavaScript
function isPrime(number) {
   // If your browser doesn't support the method Number.isInteger of ECMAScript 6,
   // you can implement your own pretty easily
   if (typeof number !== 'number' || !Number.isInteger(number)) {
      // Alternatively you can throw an error.
      return false;
   }
   if (number < 2) {
      return false;
   }

   if (number === 2) {
      return true;
   } else if (number % 2 === 0) {
      return false;
   }
   var squareRoot = Math.sqrt(number);
   for(var i = 3; i <= squareRoot; i += 2) {
      if (number % i === 0) {
         return false;
      }
   }
   return true;
}
```

#### 问题 11：数据类型

```JavaScript
var a = {n : 1};
var b = a;
a.x = a = {n : 2};
console.log(a.x);
console.log(b.x);
```

解析：

```JavaScript
var a = {n : 1};
var b = a;
// 此时b = {n:1};
//如果此时a.n=4，那么b.n也等于4
a.x = a = {n : 2};
// 从右往左赋值，a = {n:2}; 新对象
// b = {n:2}，//此时笔者认为b应该还是{n:1}待考证确认
// a.x 中的a是{n:1}; {n:1}.x = {n:2}; 旧对象
// 因为b和a是引用的关系所以b.x也等于 {n:2}
console.log(a.x); undefined
// 此时的a是新对象，新对象上没有a.x 所以是undefined
console.log(b.x); {n:2}
var i = 10;
i += i *= i;

// i*=i 100
// i+= 这里的i是 =10不是100
console.log(i);
```

#### 问题 12

```JavaScript
if (!("a" in window)) {
    var a = 1;
}

console.log(a);
```

解析：

在浏览器环境中，全局变量都是 window 的一个属性，即
var a = 1 等价于 window.a = 1。in 操作符用来判断某个属性属于某个对象，可以是对象的直接属性，也可以是通过 prototype 继承的属性。

再看题目，在浏览器中，如果没有全局变量 a ，则声明一个全局变量 a (ES5 没有块级作用域)，并且赋值为 1。很多人会认为打印的是 1。非也，大家不要忘了变量声明会被前置！什么意思呢？题目也就等价于

```JavaScript
var a;

if (!("a" in window)) {
    a = 1;
}

console.log(a);
```

所以其实已经声明了变量 a，只不过 if 语句之前值是 undefined，所以 if 语句压根不会执行。
最后答案就是 undefined

#### 问题 13

```JavaScript
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
console.log(a);
```

解析：
这道题有几个需要注意的地方：

1.变量声明、函数声明会被前置，但是函数表达式并不会，准确说类似变量声明前置，举个栗子：

```JavaScript
console.log('b', b); // b undefined
var b = function() {}
console.log('b', b); // b function () {}
```

2.具名的函数表达式的名字只能在该函数内部取到，举个例子(排除老的 IE?)：

```JavaScript
var foo = function bar () {}

console.log('foo', foo);
// foo function bar(){}

console.log('bar', bar);
// Uncaught ReferenceError: bar is not defined
```

综合这两点，再看题目，最后输出的内容就为 1

## 问题 14

```JavaScript
function a(x) {
    return x * 2;
}
var a;
console.log(a);
```

解析：
函数声明会覆盖变量声明，但不会覆盖变量赋值，举个栗子简单粗暴：

```JavaScript
function foo(){
    return 1;
}
var foo;
console.log(typeof foo);    // "function"
```

函数声明的优先级高于变量声明的优先级，但如果该变量 foo 赋值了，那结果就完全不一样了：

```JavaScript
function foo(){
    return 1;
}
var foo = 1;
console.log(typeof foo);    // "number"
```

变量 foo 赋值以后，变量赋值初始化就覆盖了函数声明。这个需要注意
再看题目

```JavaScript
function a(x) {
    return x * 2;
}
var a;
console.log(a); // function a(x) {...}
```

## 问题 15

```JavaScript
function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3);
```

解析：
这题考察 arguments 对象的用法(详看[JavaScript 中的 arguments 对象](https://microzz.com/2017/04/28/arguments/))
一般情况，arguments 与函数参数是动态绑定关系(为什么说是一般稍后会解释)，所以很好理解，最后输出的是 10

但是但是但是，我们不要忘了一个特殊情况–严格模式，在严格模式中 arguments 与相当于函数参数的一个拷贝，并没有动态绑定关系，举个栗子：

```JavaScript
'use strict'
// 严格模式！！

function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3); // 3
```

## 问题 16

```JavaScript
function a() {
    console.log(this);
}
a.call(null);
```

解析：

```JavaScript
function a() {
    console.log(this);
}
a.call(null);
```

关于 a.call(null); 根据 ECMAScript262 规范规定：
如果第一个参数传入的对象调用者是 null 或者 undefined 的话，call 方法将把全局对象（浏览器上是 window 对象）作为 this 的值。所以，不管你什么时候传入 null 或者 undefined，其 this 都是全局对象 window。所以，在浏览器上答案是输出 window 对象。

但是但是但是，我们依旧不能忘记一个特殊情况–严格模式，在严格模式中，null 就是 null，undefined 就是 undefined ，举个栗子：

```JavaScript
'use strict';
// 严格模式！！

function a() {
    console.log(this);
}
a.call(null); // null
a.call(undefined); // undefined
```

**累加函数 addNum**

实现一个累加函数 addNum，参数为 number 类型，每次返回的结果= 上一次计算的值+ 传入的值

```JavaScript
var addNum = (function() {
    var result = result  0;
    return function(num) {
        result += num;
        return result;
    };
})();
addNum(10);          // 10
addNum(12);          // 22
addNum(30);          // 52
```

闭包实现即可。addNum 右边为一个立即执行函数，返回了一个函数，此函数在内存中，所以其所依赖的 result 也还在内存中，不会被回收，从而实现缓存的效果。

灵活的应用闭包，能方便很多问题，再看下面一个例子：

```JavaScript
    /////////////
    // 求斐波那契数列 //
    /////////////
    var count = 0;

    // 直接递归
    function fib(n) {
        count++;
        if (n < 0) return 0;
        if (n === 0  n === 1) return 1;
        // 大于2时递归
        // arguments.callee 返回正在执行的Function对象
        return arguments.callee(n - 1) + arguments.callee(n - 2);
    }
    console.time('fib(30)');
    console.log('fib(30),结果为：', fib(30), '，计算次数：', count); //fib(30),结果为： 1346269 计算次数： 2692537
    console.timeEnd('fib(30)'); //fib(30): 115.944ms //本机多次测试100ms以上

    // 闭包缓存方式
    count = 0;
    var fibWithCache = (function() {
        var result = []; // 缓存结果

        return function(n) {
            var res = result[n];
            // 存在直接取出，否则递归计算
            if (res != undefined) {
                return res;
            } else {
                if (n < 0) return null;
                if (n === 0  n === 1) {
                    res = 1;
                } else {
                    count++;
                    res = arguments.callee(n - 1) + arguments.callee(n - 2);
                }
            }
            result[n] = res;
            //console.log(result);
            return result[n];
        };
    })();

    console.time('fibWithCache(30)');
    console.log('fibWithCache(30),结果为：', fibWithCache(30), '，计算次数：', count);
    //fibWithCache(30),结果为： 1346269 计算次数： 29
    console.timeEnd('fibWithCache(30)');
    //fibWithCache(30): 0.312ms //本机多次测试均小于1ms

       //  之后再调用小于30的项目，将会直接取出，不用计算。
    count = 0;
    console.time('fibWithCache(9)');
    console.log('fibWithCache(9),结果为：', fibWithCache(9), '，计算次数：', count);
    console.timeEnd('fibWithCache(9)');
    // fibWithCache(9),结果为： 55 ，计算次数： 0
    // fibWithCache(9): 0.215ms

    // 计算更大的 也变得很高效
    count = 0;
    console.time('fibWithCache(32)');
    console.log('fibWithCache(32),结果为：', fibWithCache(32), '，计算次数：', count);
    console.timeEnd('fibWithCache(32)');
    // fibWithCache(32),结果为： 3524578 ，计算次数： 2
    // fibWithCache(32): 0.224ms
```

使用闭包，函数所依赖的 result 数组将不会被系统的垃圾回收机制回收，将它用来缓存，使得性能得到大幅得的提升。

> 关于闭包有以下三个特性：

- 函数可以引用定义在其外部作用域的变量。
- 闭包比创建他们的函数具有更长的生命周期。(即使外部函数已经返回，闭包函数仍然可以引用在外部函数中定义的变量，例如上面两个例子中用来缓存上次累加结果的 result 和斐波拉切数列缓存数列的 result 数组。)
- 闭包在内部存储其外部变量的引用，并能读写这些变量。（上两例中，闭包对两个外部函数中的 result 不仅可读，而且可写。）

**实现一个 Person 类**

实现一个 Person 类，有 2 个属性 name，gender（性别），有一个 sayHello 方法.

```JavaScript
////////////////////////////////////////////////////////
// 实现一个Person 类，有2 个属性name，gender（性别），有一个sayHello 方法. //
////////////////////////////////////////////////////////
// 构造函数
function Person(name, gender) {
    // 避免忘记使用new命令
    if (!(this instanceof Person)) {
        return new Person(name, gender);
    }
    this.name = name;
    this.gender = gender;
}
Person.prototype.sayHello = function() {
    console.log('Hello,I am', this.name, '. I\'m a', this.gender);
};
var zs = new Person("zs", "man");
console.log(zs);        // Person {name: "zs", gender: "man"}
zs.sayHello();          // Hello,I am zs . I'm a man
```

注意 sayHello 方法不是写在构造函数里面，而是写在构造函数的原型上。这是因为如果写在构造函数里，将会为每个实例对象给添加一个自己的 sayHello 方法，而这是没有必要的，每个实例对象的 sayHello 方法都一样，写在构造函数的原型上就可以使得每个实例对象都能引用到此方法。

> 关于构造函数的 new 命令，原理是这样的：

1. 创建一个空对象，作为将要返回的对象实例
2. 将这个空对象的原型，指向构造函数的 prototype 属性
3. 将这个空对象赋值给函数内部的 this 关键字
4. 开始执行构造函数内部的代码

更多关于原型和构造函数的具体知识请访问：[面向对象编程概述](http://javascript.ruanyifeng.com/oop/basic.html#toc1)

**基于 Person 类，增加一个 static 方法 getNum(), 返回创建的实例数**

为了实现计数功能，只需要在每次调用构造函数的时候，递增 1 即可，构造函数已经存在，不能修改，所以直接重写一遍

```JavaScript
function Person(name, gender) {
    // 避免忘记使用new命令
    if (!(this instanceof Person)) {
        return new Person(name, gender);
    }
    this.name = name;
    this.gender = gender;
    Person._count += 1;
}
Person.getNum = (function() {
    Person._count = 0;
    return function() {
        return Person._count;
    };
})();

var p1 = new Person('aaa', 'male');
var p2 = new Person('bbb', 'female');
Person.getNum(); // 2
var p3 = new Person('ccc', 'female');
Person.getNum(); // 3
```

**实现一个 arrMerge 函数**

实现一个 arrMerge 函数，可传入 2 个以上的数组类型参数，生成一个包含所有数组项，且没有重复项的新数组

```JavaScript
function arrMerge() {
    var len = arguments.length,
        arr = [];
    for (var i = 0; i < len; i++) {
        // 合并
        arr = arr.concat(arguments[i]);
    }
    // 去重
    var result = [],
        hasElem = {};
    for (i = 0, l = arr.length; i < l; i++) {
        if (!hasElem[arr[i]]) {
            result.push(arr[i]);
            hasElem[arr[i]] = true;
            console.log(hasElem);
        }
    }
    return result;
}
```

实现可以接收任意个参数，我们需要了解 js 里面在 function 对象中 arguments 这个对象的知识，它代表此函数实参的参数列表，是一个类数组对象。

合并数组直接使用原生的<code>concat()</code>方法即可。

去重一步，使用了一个对象来记录此值是不是已经存在，使用对象来标识，效率比用数组来标识要高一点，因为对象是键值对的形式，类似哈希表，直接将数组元素作为此对象的键，用一个布尔值来标识这个数组元素是不是已经存在了，不存在则添加，并记录此元素已存在，存在则直接跳过。

```JavaScript
arrMerge([0,1,1],[1,3],[2,0,456,6],[222,456]);
// [0, 1, 3, 2, 456, 6, 222]
arrMerge(['a', 'b', 'c', 'd'], ['a', 'bb', 'ccc', 'd'], ['11', 'sss']);
// ["a", "b", "c", "d", "bb", "ccc", "11", "sss"]
```

**实现一个 toCamelStyle 函数**

实现一个 toCamelStyle 函数，把“aaa-bbb-cc”这种形式的命名转换为“aaaBbbCc”

```JavaScript
function toCamelStyle(str) {
    var strArr = str.split('-'),
        temp = '',
        result = '';

    for (var i = 0, l = strArr.length; i < l; i++) {
        result += strArr[i].substr(0, 1).toUpperCase() + strArr[i].substr(1).toLowerCase();
        //console.log(result);
    }
    return result;
}
```

使用正则表达式完成

```JavaScript
function toCamelStyle(str) {
    // 匹配-以及之后的一个字符，其中这个字符在一个分组内
    var camelRegExp = /-([a-z])/ig;

    return str.replace(camelRegExp, fcamelCase);

    // all为匹配到的内容，letter为组匹配
    function fcamelCase(all, letter) {
        console.log(all);
        console.log(letter);
        return letter.toUpperCase();
    }
}
toCamelStyle('aaa-bbb-cc');    // aaaBbbCc
```

使用正则表达式效率较高，之前的方法需要对整个字符串进行遍历，而正则表达式一次就把所有匹配内容获取到了，直接替换即可。

<code>String.prototype.replace()</code>方法第二个参数还可以是一个函数，接收多个参数，第一个为匹配到的内容，第二个为匹配到的分组，有多少组就可以传多少个参数，在此之后还可以有两个参数，一个为匹配到内容在原字符串的位置，另一个是原字符串。

以上在执行<code>toCamelStyle('aaa-bbb-cc')</code>时，控制台输出结果分别为：-b b -c c，代表匹配到的内容为：-b 和 -c 对应的分组为：b c

**setTimeout 实现重复调用**

用 setTimeout 实现一个定时循环任务，每隔 200 毫秒，console 输出一句：”I am working ...”

```JavaScript
function showWorking() {
    var timer = timer  1;
    console.log('I am working ...');
    // 避免重复调用 计时加快
    if (timer) clearTimeout(timer);
    timer = setTimeout(showWorking, 200);
}
```

<code>setTimeout()</code> 方法本来是迟延指定的时间执行指定的代码，要达到重复调用的效果就需要在方法里面加入它实现递归调用，从而达到效果。

<code>setTimeout()</code> 和<code>setInterval()()</code> 有所不同，后者是每隔指定的时间执行一次指定的代码，不需要递归就能重复调用。

但是后者不管执行的时间，只负责定时再次调用，比如指定 100 毫秒调用一次，那么每隔 100ms 就会发出一条指令，而不关心，上次的代码有没有执行完毕，假设所指定的代码执行需要一秒才能完成，那么一段时间后，会发现内存中会堆积很多等待执行的指令。 而前者本身就是迟延指定时间，在函数内部递归来实现重复调用，它会等待执行到它才会发出下一次指令，两次间隔的实际时间为执行时间+迟延时间（不考虑其他情况）。

**实现一个 bind 函数**

实现一个 bind 函数，传入一个函数和一个对象，返回一个新的函数，且传入对象为函数执行时的 context，即 this 的指向

ES6 中可直接使用 bind 方法，类似 call、apply，但是其返回一个改变上下文环境的新函数，而 call 和 apply 是替换上下文环境并运行原函数。

```JavaScript
function bind(fun, context) {
    return fun.bind(context);
}
```

利用 call 或 apply 来实现一个

以下都是用 apply 而没有试用 call 的原因是因为，call 第一个参数传递新的上下文环境，之后依次传入其他参数。而 apply 最多接受两个参数，第一个参数为新的上下文环境，第二个参数为数组（参数按顺序放入数组）。使用 call 需要将参数分割出来依次传递进去，而使用 apply 直接传递数组即可较为简单。

```JavaScript
// 参数可在生成新函数时传递（即调用bind时），也可以在实际使用时传递
function bind(fun, context) {
    var args = [].slice.call(arguments, 2);
    return function() {
        fun.apply(context  this, args.concat([].slice.call(arguments)));
    };
}

// 参数只能在生成新函数时传递
function bind1(fun, context) {
    var args = [].slice.call(arguments, 2);
    return function() {
        fun.apply(context  this, args);
    };
}
// 参数只能在实际使用时传递
function bind2(fun, context) {
    return function() {
        fun.apply(context  this, [].slice.call(arguments));
    };
}
```

调用测试：

```JavaScript
var fun = function(sex, age) {
    console.log(this.name, sex, age);
};
var person = {
    name: "Andrew"
};

// 使用bind方法，可以在任何时候传递参数
var fun1 = bind(fun, person);
// 实际使用时传递
fun1('gril', 20);                   // Andrew gril 20
// 生成新函数时传递
bind(fun, person, 'gril', 20)();    // Andrew gril 20
// 混合传递
bind(fun, person, 'gril')(20);      // Andrew gril 20

// bind1方法 只能在生成函数时传递 不支持调用时传递参数
bind1(fun, person, 'gril', 20)();       // Andrew gril 20
bind1(fun, person)('gril', 20);         // Andrew undefined undefined
bind1(fun, person, 'gril')(20);         // Andrew gril undefined

// bind2方法 只能在调用时传递，生成时传递无效
bind2(fun, person, 'gril', 20)();       // Andrew undefined undefined
bind2(fun, person)('gril', 20);         // Andrew gril 20
bind2(fun, person, 'gril')(20);         // Andrew 20 undefined
```

第一个方法是参照 jQuery 中<code>$.proxy （）</code> 方法写的，之所以对参数进行了两次处理，原因在于，这样可以使得再调用 bind 方法生成新函数的时候，直接给原函数指定一些参数，达到固定前面一些参数的作用（之后传入的参数会依次后移，例如 <code>bind(fun, person, 'gril')('boy',20)</code> 的结果为：Andrew gril boy，相当于在生成新函数的时候，直接把第一个参数固定为 gril 了，实际调用时候参数依次后移）。

第二个方法 bind1 几乎没有实际意义，仅仅是为了测试。因为根据原函数生成的新函数，不能传递参数了（参数只能在生成新函数的时候直接指定好）。

第三个方法 bind2 最符合简单的直接需求，bind2 的作用仅仅是根据原函数，替换上下文，生成一个新函数，原函数的参数和新函数的参数相同。

**实现一个 Utils 模块**

实现一个 Utils 模块，有\_method1 方法、\_method2 方法、methodAll 方法，methodAll 中调用了\_method1 和\_method2

```JavaScript
//  简单写法
var Utils0 = {
    _method1: function() {
        console.log('this is _method1 running');
    },
    _method2: function() {
        console.log('this is _method1 running');
    },
    methodAll: function() {
        this._method1();
        this._method2();
    }
};

// 模块放大式写法
var Utils = (function(Utils) {
    var _method1 = function() {
            console.log('this is _method1 running');
        },
        _method2 = function() {
            console.log('this is _method1 running');
        },
        methodAll = function() {
            this._method1();
            this._method2();
        };
    return {
        _method1: _method1,
        _method2: _method2,
        methodAll: methodAll
    };
})(Utils  {});
```

可以简单写为一个对象，内部有几个方法的模式。但是这样，外部可以访问并修改这个对象的任何内容。

采用模块放大模式，对外暴露的仅仅是 return 出来的内容，在函数里面，可以定义很多私有的方法和属性。最后传递 Utils {}的作用是表示此部分代码可能仅是 Utils 模块的一部分，可做合并使用，多传入一个 {}对象能去除加载顺序的依赖（当然要保证此块代码不依赖别的地方的 Utils），此部分代码可以最先加载。

参考链接：[面向对象编程模式](http://javascript.ruanyifeng.com/oop/pattern.html#toc6)

**输出一个对象自身的属性**

有一个对象 obj，请输出它自身具有的属性，而非它原型连上的。

```JavaScript
function showOwnProp(obj) {
    if (typeof obj == "undefined"  typeof obj != 'object') throw new Error('请传入一个对象！');
    for (var key in obj) {
        // for in循环会遍历整个原型链
        // in运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            console.log(key, ':', obj[key]);
        }
    }
}
```

其中 <code>Object.prototype.hasOwnProperty.call(obj, key)</code> 可以替换为 <code>obj.hasOwnProperty(key)</code> 之所以使用 Object 上的是因为防止 obj 对象上重写了 <code>hasOwnProperty()</code>方法对结果的影响。

另外在 ES5 中可使用 Object.keys 方法和 Object.getOwnPropertyNames 方法 都返回数组，仅含自身属性，keys 只返回可枚举的，而后者包含不可枚举的。

**对象深复制**

在 js 中，对象的赋值，实质是传递指向它内存的引用，请实现一个深度 copy 的方法，传入一个对象 obj，返回一个该对象的复制，而且两者没有任何值引用关联

> 复制对象需要保证：

- 确保拷贝后的对象，与原对象具有同样的 prototype 原型对象。
- 确保拷贝后的对象，与原对象具有同样的属性。

> **所以** 1、原型链上的属性不要复制，直接指向即可。2、自身属性一一复制

下面总结了一点简单的复制对象方法：

- 简单数组（内部不含符合类型）可直接使用 slice 方法
- 不含 json 不支持的值（方法）以及 enumerable 属性不为 false 的对象可转化为 json 字符串，再转化为对象。
- 还可以直接及使用 jQuery 的 extend 方法，第一个参数传入 true 即可。
- 不考虑不可枚举属性的话 可以遍历分别加入新对象即可。

以下演示通过属性描述对象拷贝对象。

```JavaScript
// 在之前通过Person实例化出的zs对象上添加属性以做测试使用
zs.family = {
    father: 'zsfather',
    mother: 'zsmother'
};
zs.children = [{}, {}];

function deepCopyObject(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    _copySelfProp(copy, obj);
    return copy;
    // 内部使用 拷贝自身属性
    function _copySelfProp(target, source) {
        Object
            .getOwnPropertyNames(source)
            .forEach(function(key) {
                console.log(key);
                // 获取属性描述对象
                var desc = Object.getOwnPropertyDescriptor(source, key);
                // 复合类型再次调用
                if (typeof desc.value == 'object') {
                    // function未处理，原因见下描述
                    target[key] = deepCopyObject(source[key]);
                } else {
                    // 将此属性添加到target
                    Object.defineProperty(target, key, desc);
                }
            });
        return target;
    }
}
```

先介绍两个方法

> Object.defineProperty(obj, prop, descriptor)

obj 需要定义属性的对象。

prop 需定义或修改的属性的名字。

descriptor 将被定义或修改的属性的描述对象。

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。该方法允许精确添加或修改对象的属性。一般情况下，我们为对象添加属性是通过赋值来创建并显示在属性枚举中（for...in 或 Object.keys 方法）， 但这种方式添加的属性值可以被改变，也可以被删除。而使用 Object.defineProperty() 则允许改变这些额外细节的默认设置。例如，默认情况下，使用 Object.defineProperty() 增加的属性值是不可改变的。

> Object.getOwnPropertyDescriptor(obj, prop)

obj 要处理的对象

prop 属性名称，该属性的属性描述对象将被返回

该方法允许对一个属性的描述进行检索。在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成。更多关于属性描述符类型以及他们属性的信息可以查看：[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。

这个拷贝方法比把值（即使是简单类型的值）直接给新对象要精确很多。js 中对象的值，可能看起来就是个字符串或者数值，但实际它还有一些属性，我们查看 zs.name 属性，发现他的描述对象为：Object {value: "zs", writable: true, enumerable: true, configurable: true}。此方法拷贝的对象能保证这个值的属性也都和原对象一直。而直接赋值的方式，其他属性都变成了默认值。

参考链接：[属性描述对象](http://javascript.ruanyifeng.com/stdlib/attributes.html)

但是<code>getOwnPropertyDescriptor</code>、<code>defineProperty</code>、<code>getOwnPropertyNames</code>是在 ES5 和 ES6 中才有的，下面再展示一个只用 ES 写的

```JavaScript
function deepCopy(obj) {
    // 通过原对象的构造函数来创建对象，确保类型一致且原型链相同
    var copy = obj.constructor.call();
    _copySelfProp(copy, obj);
    return copy;
    // 自身属性拷贝
    function _copySelfProp(target, source) {
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (typeof source[key] == "object") {
                    // function未处理，原因见下描述
                    target[key] = deepCopy(source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
}
```

需要指出的是，以上两个拷贝函数都没有对复合类型中的 function 进行处理（对象和数组进行 typeof 结果都为 object），原因是函数一旦定义，不能对函数体进行修改，可以直接对齐进行引用。如果重新赋值一个新的函数给这个属性的话，由于新的函数也是一个对象，就切断了原来的联系，可以不用处理。

比如 obj.a 为一个 function 内存地址记为 N1，对 obj 进行拷贝时，可以直接将 obj1.a 指向 N1，如果修改 obj.a 为一个新的函数，此函数有一个内存地址 N2，那么修改后：obj.a 实际指向 N2，而复制出的 obj1.a 指向 N1。意思就是 function 比较特殊，不能像对象一样直接修改它内部的东西，可以直接拿来引用。

但是当前可以这么做的前提是：obj.a 值仅仅是一个 function，而没有其他值。实际可能存在的情况是先给 obj.a=function(){},再接着给 obj.a 添加属性，obj.a.prop=[{},{}]，（这就是 js 里面的一切皆对象，你甚至可以先 var mm='111'，再 mm.a=[{},{}]，此时 typeof mm 仍为 string，但 mm 真的只是个字符串吗？）这种情况虽然不多，但是也是存在的，需要注意。

**使用字面量形式创建对象而不是构造函数**

两者差异是因为其创建的时候不一样，构造函数是在运行时创建，而字面量形式是在编译时创建。

以下代码可以看出字面量形式创建对象效率要高很多，同时字面量形式创建对象，写的代码也少，而且比较可读。

```JavaScript
console.time('for');
var arr10000=new Array(10000);
for(var i=0,l=arr10000.length;i<l;i++){
    arr10000[i]=new Object();
}
console.timeEnd('for'); //for: 4.885ms

console.time('for2');
var arr10000=new Array(10000);
for(var i=0,l=arr10000.length;i<l;i++){
    arr10000[i]={};
}
console.timeEnd('for2');//for2: 0.855ms

// 在创建正则表达式时，差别更加明显：
console.time('for3');
var arr10000=new Array(10000);
for(var i=0,l=arr10000.length;i<l;i++){
    arr10000[i]=new RegExp('.*');
}
console.timeEnd('for3'); //for3: 10.689ms

console.time('for4');
var arr10000=new Array(10000);
for(var i=0,l=arr10000.length;i<l;i++){
    arr10000[i]=/.*/;
}
console.timeEnd('for4');//for4: 0.930ms
```

## 14.Proxy和Object.defineProperty区别

`Proxy`的意思是代理，我一般叫他拦截器，可以拦截对象上的一个操作。用法如下，通过`new`的方式创建对象，第一个参数是被拦截的对象，第二个参数是对象操作的描述。实例化后返回一个新的对象，当我们对这个新的对象进行操作时就会调用我们描述中对应的方法。

```js
new Proxy(target, {
    get(target, property) {

    },
    set(target, property) {

    },
    deleteProperty(target, property) {

    }
})
```

`Proxy`区别于`Object.definedProperty`。

`Object.defineProperty`只能监听到属性的读写，而`Proxy`除读写外还可以监听属性的删除，方法的调用等。

通常情况下我们想要监视数组的变化，基本要依靠重写数组方法的方式实现，这也是`Vue`的实现方式，而`Proxy`可以直接监视数组的变化。

```js
const list = [1, 2, 3];
const listproxy = new Proxy(list, {
    set(target, property, value) {
        target[property] = value;
        return true; // 标识设置成功
    }
});

list.push(4);
```

`Proxy`是以非入侵的方式监管了对象的读写，而`defineProperty`需要按特定的方式定义对象的属性。

## 15.Reflect

他是`ES2015`新增的对象，纯静态对象也就是不能被实例画，只能通过静态方法的方式调用，和`Math`对象类似，只能类似`Math.random()`的方式调用。

`Reflect`内部封装了一系列对对象的底层操作，一共`14`个，其中`1`个被废弃，还剩下`13`个。

`Reflect`的静态方法和`Proxy`描述中的方法完全一致。也就是说`Reflect`成员方法就是`Proxy`处理对象的默认实现。

`Proxy`对象默认的方法就是调用了`Reflect`内部的处理逻辑，也就是如果我们调用`get`方法，那么在内部，`Reflect`就是将`get`原封不动的交给了`Reflect`，如下。

```js
const proxy = new Proxy(obj, {
    get(target, property) {
        return Reflect.get(target, property);
    }
})
```

`Reflect`和`Proxy`没有绝对的关系，我们一般将他们两个放在一起讲是为了方便对二者的理解。

那为什么会有`Reflect`对象呢，其实他最大的用处就是提供了一套统一操作`Object`的`API`。

判断对象是否存在某一个属性，可以使用`in`操作符，但是不够优雅，还可以使用`Reflect.has(obj, name)`; 删除一个属性可以使用`delete`，也可以使用`Reflect.deleteProperty(obj, name)`; 获取所有属性名可以使用`Object.keys`, 也可以使用`Reflect.ownKeys(obj)`; 我们更推荐使用`Reflect`的`API`来操作对象，因为他才是未来。

## 16.解析get参数

通过`replace`方法获取`url`中的参数键值对，可以快速解析`get`参数。

```js
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q); 
```

## 17.解析连接url

可以通过创建`a`标签，给`a`标签赋值`href`属性的方式，获取`到协议`，`pathname`，`origin`等`location`对象上的属性。

```js
// 创建a标签
const aEle = document.createElement('a');
// 给a标签赋值href路径
aEle.href = '/test.html';
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;
...
```

## 18.localStorage

`localStorage`是`H5`提供的永久存储空间，一般最大可存储`5M`数据，并且支持跨域隔离，他的出现极大提高了前端开发的可能性。`localStorage`的使用很多人都知道`setItem`，`getItem`,`removeItem`, 但他也可以直接以成员的方式操作。

```js
// 存储
localStorage.name = 'yd';
// 获取
localStorage.name; // yd
// 删除
delete localStorage.name;
// 清除全部
localStorage.clear();

// 遍历
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // 获取本地存储的Key
    localStorage[key]; // 获取本地存储的value
}
```

`localStorage`满了的情况下仍继续存储并不会覆盖其他的值，而是直接报错(`QuotaExceededError`)，并且当前存储的值也会被清空。浏览器支持每个域名下存储`5M`数据。

## 19.sessionStorage

`sessionStorage`和`localStorage`的区别是，存在当前会话，很多人理解的是浏览器关闭，这是不对的，假设你在`A`页面存储了`sessionStorage`，新开选项卡将`A`页面的链接粘贴进去打开页面，`sessionStorage`也是不存在的。

所以`sessionStorage`存在的条件是页面间的跳转，`A`页面存储了`sessionStorage`，他要通过`超链接`或者`location.href`或者`window.open`来打开另一个同域页面才能访问`sessionStorage`。

这一点在混合开发嵌套`H5`的开发模式中尤为重要，如果以新开`webview`的方式打开页面，很可能`sessionStorage`就没有了。

## 20.会话cookie

`cookie`在设置的时候如果不设置过期时间，就表示是个会话`cookie`，以前我以为关闭浏览器会话`cookie`就消失了，然而...喜提`bug`一个。

在多数情况下`windows`系统或者安卓系统确实是这样的。但是在`macOS`系统或者`ios`系统中，关闭浏览器并不会清除掉会话`cookie`，结束浏览器进程才行。

## 21.标签模板字符串

模板字符串支持在前面添加一个函数，第一个参数是一个有固定内容组成的数组，后面参数依次为传入的变量，函数返回值为模板字符串真正展示的值。不过这个功能个人感觉没啥用。

```js
const tag = (params, ...args) => {
    return params[0] + args[0]; // 返回值为模板字符串的真实值。
}

const str = tag`hello ${'world'}`;
```

## 22.字符串常用的几个方法

### 1. includes();

字符串中是否包含某个字符串，这个不说了，其实就是`indexOf`的替代方案，用起来更优雅，

### 2. startsWith();

字符串是否为某个字符串开始，我一般用它判断`url`是否有`http`

### 3. endsWith();

字符串是否为某个字符串结尾。判断后缀名的时候尤其有效。

### 4. repeat(number);

得到一个重复`number`次的字符串。额...我也不知道什么时候有用，一般我用它造测试数据。

### 5. 'abc'.padEnd(5, '1'); // abc11;

用给定的字符串在尾部拼接到指定长度，第一个参数为长度，第二个参数为用于拼接的值。

### 6. 'abc'.padStart(5, '1'); // 11abc;

用给定的字符串在首部拼接到指定长度第一个参数为长度，第二个参数为用于拼接的值。首部补0？

## 23.数组快速去重

应该很多人都知道这个，数组转换成`Set`, 再转换为数组，不过这种去重方式只能去除基本数据类型组成的数组。

```js
const arr = [1, 2, 3, 4, 5, 6];

const arr2 = new Set(arr);

const arr3 = [...arr2];
```

## 24.Object.keys, values, entries

一般我们常用`Object.keys`，返回一个对象的键组成的数组，其实还有`Object.values`，返回对象值组成的数组，`Object.entries`将对象转成数组，每个元素是键值对组成的数组，可以使用此功能快速将对象转为`Map`。

```js
const obj = {name: 'yd', age: 18};

Object.keys(obj); // ['name', 'age'];

Object.values(obj); // ['yd', 18];

const l = Object.entries(obj); // [['name', 'yd'], ['age': 18]];

const m = new Map(l);
```

## 25.Object.getOwnPropertyDescriptors

获取对象的描述信息

`Object.assign`复制时，将对象的属性和方法当做普通属性来复制，并不会复制完整的描述信息，比如`this`。

```js
const p1 = {
    a: 'y',
    b: 'd',
    get name() {
        return `${this.a} ${this.b}`;
    }
}
const p2 = Object.assign({}, p1);

p2.a = 'z';

p2.name; // y d; 发现并没有修改p2.a的值，是因为this仍旧指向p1
```

使用`Object.getOwnPropertyDescriptors`获取完整描述信息

```js
const description = Object.getOwnPropertyDescriptors(p1);

const p2 = Object.defineProperty({}, description);

p2.a = 'z';

p2.name; // z d
```

## 26.BigInt

`JavaScript`可以处理的最大数字是`2`的`53`次方 `- 1`，这一点我们可以在`Number.MAX_SAFE_INTEGER`中看到。

```js
consoel.log(Number.MAX_SAFE_INTEGER); //9007199254740991
```

更大的数字则无法处理，`ECMAScript2020`引入`BigInt`数据类型来解决这个问题。通过把字母`n`放在末尾, 可以运算大数据。

`BigInt`可以使用算数运算符进行加、减、乘、除、余数及幂等运算。它可以由数字和十六进制或二进制字符串构造。此外它还支持`AND`、`OR`、`NOT`和`XOR`之类的按位运算。唯一无效的位运算是零填充右移运算符。

```js
const bigNum = 100000000000000000000000000000n;
console.log(bigNum * 2n); // 200000000000000000000000000000n

const bigInt = BigInt(1);
console.log(bigInt); // 1n;

const bigInt2 = BigInt('2222222222222222222');
console.log(bigInt2); // 2222222222222222222n;
```

BigInt是一个大整数，所以他不能用来存储小数。

## 27.??合并空运算符

假设变量`a`不存在，我们希望给系统一个默认值，一般我们会使用`||`运算符。但是在`javascript`中空字符串，`0`，`false`都会执行`||`运算符，所以`ECMAScript2020`引入合并空运算符解决该问题，只允许在值为`null`或未定义时使用默认值。

```js
const name = '';

console.log(name || 'yd'); // yd;
console.log(name ?? 'yd'); // '';
```

## 28.?可选链运算符

业务代码中经常会遇到这样的情况，`a`对象有个属性`b`,`b`也是一个对象有个属性`c`,

我们需要访问`c`，经常会写成`a.b.c`，但是如果`f`不存在时，就会出错。

```js
const a = {
    b: {
        c: 123,
    }
}
console.log(a.b.c); // 123;
console.log(a.f.c); // f不存在所以会报错
```

`ECMAScript2020`定义可选链运算符解决该问题，通过在`.`之前添加一个`?`将键名变成可选

```js
let person = {};
console.log(person?.profile?.age ?? 18); // 18
```

## 29.import

`import`是`ECMAScript2015`当中定义的一套`ES Module`模块系统，语法特性绝大多数浏览器已经支持了，通过给`script`标签添加`type=module`的属性就可以使用`ES Module`的标准去执行`javascript`代码了。

```js
<script type="module">
console.log('this is es module');
</script>
```

在`ES Module`规范下，会采用严格模式(`use strict`)运行`javascript`代码。每个`ES Module`都运行在单独的作用域中，也就意味着变量间不会互相干扰。外部`js`文件是通过`CORS`的方式请求的，所以要求我们外部的`js`文件地址要支持跨域请求，也就是文件服务器要支持`CORS`。我们可以在任意网站控制台输入下面代码。

```js
const script = document.createElement('script');

script.type = 'module';

script.innerHTML = `import React from 'https://cdn.bootcdn.net/ajax/libs/react/17.0.1/cjs/react-jsx-dev-runtime.development.js';`;

document.body.append(script);
```

可以发现在`network`中请求了`https://cdn.bootcdn.net/ajax/libs/react/17.0.1/cjs/react-jsx-dev-runtime.development.js`资源。

`ES Module`的`script`标签会延迟脚本加载，等待网页请求完资源之后才执行，和使用`deffer`的方式加载资源相同。

需要注意的是，`import {} from 'xx'`导入模块的时候，并不是对象的解构，而是`import`的固定语法，这一点很多人容易弄错。

并且`ECMAScript2020`中`import`开始支持动态导入功能，在此之前`import`只能写在模块代码的顶部，一开始就要声明模块依赖的其它模块。支持动态引入后就可以按需引入对应的模块，这个功能我们早在`SPA`中就已经用到了。动态导入返回的是一个`Promise`。

a.js

```js
const a = 123;
export { a };
```

b.js

```js
import('./a.js').then(data => {
    console.log(data.a); // 123;
})
```

## 30. 0.1 + 0.2 === 0.3 // false

```js
console.log(0.1+0.2); // 0.30000000000000004
```

在`JS`当中，`Number`类型实际上是`double`类型，运算小数时存在精度问题。因为计算机只认识二进制，在进行运算时，需要将其他进制的数值转换成二进制，然后再进行计算

小数用二进制表达时是无穷的。

```js
// 将0.1转换成二进制
console.log(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101

// 将0.2转换成二进制
console.log(0.2.toString(2));  // 0.001100110011001100110011001100110011001100110011001101
```

双精度浮点数的小数部分最多支持`53`位二进制位，所以两者相加后，因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了`0.30000000000000004`，这样在进行算术计算时会产生误差。

`ES6 在Number`对象上面，新增一个极小的常量`Number.EPSILON`。根据规格，它表示`1`与大于`1`的最小浮点数之间的差。对于`64`位浮点数来说，大于`1`的最小浮点数相当于二进制的`1.00..001`，小数点后面有连续`51`个零。这个值减去`1`之后，就等于`2的-52次方`。

```js
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
```

`Number.EPSILON`实际上是`JavaScript`能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

`Number.EPSILON`可以用来设置`能够接受的误差范围`。比如，误差范围设为`2`的`-50`次方（即`Number.EPSILON * Math.pow(2, 2)`），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```js
(0.1 + 0.2 - 0.3) < Number.EPSILON // true
```
