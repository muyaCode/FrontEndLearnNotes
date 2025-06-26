# JavaScript数据结构与算法

**数据结构**是计算机基础，**算法**是计算机科学

**《学习JavaScript数据结构与算法第3版》**学习笔记

B站视频：[01_课程内容介绍_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1x7411L7Q7/?p=1&vd_source=5f0c99b3deddffe219938763769b15ac)

源码笔记：[XPoet/js-data-structures-and-algorithms: 从 0 到 1 学习 JavaScript 数据结构与算法 (github.com)](https://github.com/XPoet/JS-Data-Structures-and-Algorithms)

博客：[JavaScript数据结构与算法博客目录 - AhuntSun - 博客园 (cnblogs.com)](https://www.cnblogs.com/AhuntSun-blog/p/12636718.html)

## 刷算法题常用的 JS 基础扫盲

[前端算法入门一：刷算法题常用的JS基础扫盲 - 掘金 (juejin.cn)](https://juejin.cn/post/7087134135193436197)

[前端算法入门二：时间空间复杂度&8大数据结构的JS实现 - 掘金 (juejin.cn)](https://juejin.cn/post/7087286814230183943)

[前端算法入门三：5大排序算法&2大搜索&4大算法思想 - 掘金 (juejin.cn)](https://juejin.cn/post/7088725301974269960)

[hovinghuang/fe-agorithm-interview: 前端算法面试常考题目解析。 (github.com)](https://github.com/hovinghuang/fe-agorithm-interview)

## 一、数据结构

前置知识：JavaScript数组相关属性和方法

### 栈

#### 栈概念

栈是一种遵从**后进先出**（LIFO）原则的有序集合。

顶部进，顶部移除

![后进先出](.\img\后进先出.jpg)

#### 栈结构

新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

在现实生活中也能发现很多栈的例子。一摞书或者餐厅里叠放的盘子

栈也被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录（浏览器的返回按钮）。

#### 栈操作

使用数组来保存栈里的元素，数组允许我们在任何位置添加或删除元素

| 方法名           | 操作                                                         |
| ---------------- | ------------------------------------------------------------ |
| push(element(s)) | 添加一个（或几个）新元素到栈顶。                             |
| pop()            | 移除栈顶的元素，同时返回被移除的元素。                       |
| peek()           | 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。 |
| isEmpty()        | 如果栈里没有任何元素就返回 true，否则返回 false。            |
| clear()          | 移除栈里的所有元素。                                         |
| size()           | 返回栈里的元素个数。该方法和数组的 length 属性很类似。       |

实践

```js
// ES5
// 函数：函数/构造器
// this指向要创建的对象
var Stack = function() {
	var items = []; // 私有
	
	// push 栈顶添加元素
	this.push = function(element) {
		items.push(element);
	}
	// pop 栈顶移除元素
	this.pop = function() {
		return items.pop();
	}
	// peek 检查栈顶
	this.peek = function() {
		return items[items.length - 1];
	}
	// 检查栈 是否为空
	this.isEmpty = function() {
		return items.length === 0;
	}
    // 清除栈
	this.clear = function() {
		items = [];
	}
    // 获取栈的大小
	this.size = function() {
		return items.length;
	}
    // 检查items
	this.getItems = function() {
		return items;
	}
}

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.pop();
stack.peek();
stack.getItems();
```

#### 栈实战：十进制转二进制

进制转换法：余数法

文章方法：[进制转换算法_算法进制转换_AcceptedLin的博客-CSDN博客](https://blog.csdn.net/u013185349/article/details/123182353)

- ![使用栈实现余数法入栈](.\img\使用栈实现余数法入栈.jpg)

```js
// 十进制转二进制-->需要和上面的实践定义的构造函数
var divBy2 = function(number) {
    var stack = new Stack();
    var yushu;
    var string2 = '';
    
    while(number > 0) {
        yushu = number % 2;
        stack.push(yushu);
        number = Math.floor(number / 2);
    }
    // 移除
    while() {
        string2 += stack.pop();
    }
    
    return string2;
}
divBy2(10);
```

栈的作用：在编程语言的编译器和内存中保存变量、方法调用

---

### 队列

#### 队列的概念

队列是遵循**先进先出**（FIFO，也称为先来先服务）原则的一组有序的项。

队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

![先进先出](.\img\先进先出.jpg)

#### 队列的例子

在现实中，最常见的队列的例子就是排队--买东西、买票等

#### 队列操作

创建队列，添加一些队列可用的方法

| 方法名              | 操作                                                         |
| ------------------- | ------------------------------------------------------------ |
| enqueue(element(s)) | 向队列尾部添加一个（或多个）新的项。                         |
| dequeue()           | 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。 |
| peek()              | 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方法在其他语言中也可以叫作 front 方法。 |
| isEmpty()           | 如果队列中不包含任何元素，返回 true，否则返回 false。        |
| size()              | 返回队列包含的元素个数，与数组的 length 属性类似。           |

代码：

```js
// ES5
// 函数：函数/构造器
// this指向要创建的对象
var Queue = function() {
    var items = [];
    // 入队
    this.enqueue = function(element) {
        items.push(element);
    }
    // 出队
    this.dequeue = function(element) {
        return items.shift();
    }
    // 查看队列头
    this.peek = function() {
        return items[0];
    }
    // 检查队列是否为空
    this.isEmpty = function() {
        return items.length === 0;
    }
    // 检查队列长度
    this.size = function() {
        return items.length;
    }
}

var q = new Queue();

```

#### 循环队列-->击鼓传花

```js
// 使用上面的队列操作构造函数
var jgch = function(names, number) {
    var q = new Queue();
    for(var i = 0; i < names.length; i++) {
        q.enqueue(names[i]);
    }
    // 重要部分
    var taotai
    while(q.size() > 1) {
        // 2
        for(var i = 0; i < number - 1; i++) {
            q.enqueue(q.dequeue());
        }
        taotai = q.dequeue();
        console.log('淘汰的玩家是 - ' + taotai);
    }
    returm q.dequeue();
}
// 玩家列表
var names = ['a','b','c','d','e'];
// 游戏规则
var number = 3;
// 执行击鼓传花游戏
jgch(names, number);
```

#### 优先队列和辅助类

比如：会员 --> 优先

```js
var PriorityQueue = function() {
    var items = [];
    
    // 辅助类
    var QueueItem = function(element, priorty) {
        this.element = element;
        this.priorty = priorty;
    }
    // 队列方法
    this.enqueue = function(element, priorty) {
        var queueItem = new QueueItem(element, priorty);
        
        var added = false;
        
        for(var i = 0; i < items.length; i++) {
            if(queueItem.priorty > items[i].priorty) {
                items.splice(i, 0, queueItem);
                added = true;
                break;
            }
        }
        if(!added) {
            items.push(queItem);
        }
    }
    this.getItems = function() {
        return items;
    }
}

var pq = new PriortyQueue();
pq.enqueue('小明', 10);
pq.enqueue('小黑', 20);
```

#### 双端队列

双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

双端队列在现实生活中的例子有电影院、餐厅中排队的队伍等。举个例子，一个刚买了票的人如果只是还需要再问一些简单的信息，就可以直接回到队伍的头部。另外，在队伍末尾的人如果赶时间，他可以直接离开队伍。

在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行了预先定义的一定数量的操作后，先进行的操作会被从双端队列的前端移除。由于双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。

```js
```



---

### 链表

#### 链表概念

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。下图展示了一个链表的结构。

![一种链表结构](.\img\一种链表结构.jpg)

更具体表现

![链表结构详解](.\img\链表结构详解.jpg)

#### 链表操作

需要实现的类中的方法列表

| 方法名                    | 操作                                                         |
| ------------------------- | ------------------------------------------------------------ |
| push(element)             | 向链表尾部添加一个新元素。                                   |
| insert(element, position) | 向链表的特定位置插入一个新元素。                             |
| getElementAt(index)       | 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。 |
| remove(element)           | 从链表中移除一个元素。                                       |
| indexOf(element)          | 返回元素在链表中的索引。如果链表中没有该元素则返回-1。       |
| removeAt(position)        | 从链表的特定位置移除一个元素。                               |
| isEmpty()                 | 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false。 |
| size()                    | 返回链表包含的元素个数，与数组的 length 属性类似。           |
| toString()                | 返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。 |

1

![链表操作1](.\img\链表操作1.jpg)

2

![链表操作2](.\img\链表操作2.jpg)

示例代码：

```js
var LikedList = function() {
    // 链表头
    var head = null;
    // 链表长度
    var length = 0;
    
    // 辅助类：节点
    var Node = function(element) {
        this.element = element;
        this.next = null;
    }
    
    // 链表尾部添加元素
    this.append = function(element) {
        var node = new Node(element);
        
        if(head == null) {
            head = node;
        } else {
            var current = head;
            while(current.next) {
                current = current.next;
            }
            // while循环执行完成之后，current已经是最后一项
            current.next = node;
        }
        length ++;
    }
    
    // 链表的某一位置添加元素
    this.insert = function(position, element) {
        var node = new Node(element);
        // 越界
        if(position > -1 && position < length) {
            if(position == 0) {
                var current = head;
                head = node;
                head.next = current;
            } else {
                var index = 0;
                var current = head;
                var previous = null;
                while(index < position) {
                    previous = current;
                    current = current.next;
                    index ++;
                }
                previous.next = node;
                node.next = curent;
            }
            length ++;
        }
    }
    
    // 移除
    this.removeAt = function(position) {
        if(position > -1 && position < length) {
            if(position == 0) {
                var current = head;
                head = current.next;
            } else {
                var current = head;
                var previous = null;
                var index = 0;
                while(index < position) {
                    previous = current;
                    current = current.next;
                    index ++;
                }
                // 跳出循环的时候，index == position
                previous.next = current.next;
            }
            length --;
            return current;
        }
        return null;
    }
    
    // 获取元素的位置
    this.indexOf = function(element) {
        var current = head;
        var index = 0;
        while(current) {
            if(current.element == element) {
                return index;
            }
            current = current.next;
            index ++;
        }
        return -1;
    }
    
    // 删除某个位置的元素
    this.remove = function(element) {
        return this.removeAt(this.indexOf(element));
    }
    
    // 检测是否为空
    this.isEmpty = function() {
    	return length === 0;
    }
    
    // 获取长度
    this.size = function() {
        return length;
    }
    
    // 获取链表头部
    this.getHead = function() {
        return head;
    }
}
// 实例化操作
var l = new LikedList();
l.append(1);
l.append(2);
l.append(3);
l.append(4);

l.insert(1, 10);
```

#### 双向链表

双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素，如下图所示。

![双向链表](.\img\双向链表.jpg)

2

![双向链表2](.\img\双向链表2.jpg)

#### 循环链表



双向循环链表

![双向循环链表](.\img\双向循环链表.jpg)

#### 有序链表



---

### 集合

#### 子集



#### 交集



#### 并集



#### 差集

---

### 字典和散列表



### 树

前置知识：JavaScript递归相关知识

#### 二叉搜索树



#### 自平衡树



#### 树遍历



---

### 二叉堆和堆排序



---

### 图

#### 深度优先



#### 广度优先



#### 最短路径



## 二、算法

### 排序

冒泡排序-选择排序-插入排序-归并排序

### 搜索算法

顺序搜索-二分搜索

### 算法模式

递归-动态规划-贪心算法

### 算法设计与技巧



## 算法复杂度

