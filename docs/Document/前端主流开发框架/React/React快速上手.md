# React 快速上手

编程之家 React 教程：<https://www.jb51.cc/react-tutorial/>

菜鸟教程：[React 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/react/react-tutorial.html)

React 中文网：

- [React 中文网 - 用于构建用户界面的 JavaScript 库 (zcopy.site)](https://react.zcopy.site/)
- [React 编程思想 | React 中文文档 | React 中文网 (bootcss.com)](https://react.bootcss.com/learn/thinking-in-react)
- [React 中文文档（Beta 版） | React 中文文档 | React 中文网 (bootcss.com)](https://react.bootcss.com/)

**React 官网**：[React](https://react.dev/)

**GitHub 开源地址**：[Releases · facebook/react (github.com)](https://github.com/facebook/react/releases)



[【长文】只会 Vue 不会 React ？22 点证明 React 比 Vue3 更简单 - 掘金 (juejin.cn)](https://juejin.cn/post/7344536653463207973)

## 开源学习项目

### 《React技术揭秘》开源电子书

《React技术揭秘》电子书地址：https://react.iamkasong.com/

从`理念`到`架构`，从`架构`到`实现`，完全按照`自顶向下`的模式讲解`React`源码。

学懂之后，即使除去`前端领域`的知识外，你的收获将不限于：

- 编程范式：函数式编程的`代数效应`思想
- 操作系统：如何从零实现`协程`（可以理解为`generator`）
- 数据结构：链表、树、小顶堆
- 算法：O(n)的Diff算法、各种位运算
- 浏览器运行机制

前端同学想扩展自己的知识边界，从学习`React`源码下手是个不错的选择。

## 一、React 基础

### 1.基本流程

- 1.发送请求获取数据

- 2.处理数据

- 3.操作 DOM 呈现页面

### 1.虚拟 DOM 的两种创建方法

#### 1\_使用 jsx 创建虚拟 DOM

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>1_使用jsx创建虚拟DOM</title>
	</head>
	<body>
		<!-- 准备好一个“容器” -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script type="text/javascript" src="../js/react.development.js"></script>
		<!-- 引入react-dom，用于支持react操作DOM -->
		<script
			type="text/javascript"
			src="../js/react-dom.development.js"
		></script>
		<!-- 引入babel，用于将jsx转为js -->
		<script type="text/javascript" src="../js/babel.min.js"></script>

		<script type="text/babel">
			/* 此处一定要写babel */
			//1.创建虚拟DOM
			const VDOM = (
				/* 此处一定不要写引号，因为不是字符串 */
				<h1 id="title">
					<span>Hello,React</span>
				</h1>
			);
			//2.渲染虚拟DOM到页面
			ReactDOM.render(VDOM, document.getElementById("test"));
		</script>
	</body>
</html>
```

#### 2\_使用 js 创建虚拟 DOM(jsx 编译成的真实方法)

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>2_使用js创建虚拟DOM</title>
	</head>
	<body>
		<!-- 准备好一个“容器” -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script type="text/javascript" src="../js/react.development.js"></script>
		<!-- 引入react-dom，用于支持react操作DOM -->
		<script
			type="text/javascript"
			src="../js/react-dom.development.js"
		></script>

		<script type="text/javascript">
			//1.创建虚拟DOM
			const VDOM = React.createElement(
				"h1",
				{ id: "title" },
				React.createElement("span", {}, "Hello,React")
			);
			//2.渲染虚拟DOM到页面
			ReactDOM.render(VDOM, document.getElementById("test"));
		</script>
	</body>
</html>
```

#### 3\_虚拟 DOM 与真实 DOM

1.虚拟 DOM 本质是 Object 类型的对象（一般对象）

2.虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 React 内部在用，无需真实 DOM 上那么多的属性。

3.虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>3_虚拟DOM与真实DOM</title>
	</head>
	<body>
		<!-- 准备好一个“容器” -->
		<div id="test"></div>
		<div id="demo"></div>

		<!-- 引入react核心库 -->
		<script type="text/javascript" src="../js/react.development.js"></script>
		<!-- 引入react-dom，用于支持react操作DOM -->
		<script
			type="text/javascript"
			src="../js/react-dom.development.js"
		></script>
		<!-- 引入babel，用于将jsx转为js -->
		<script type="text/javascript" src="../js/babel.min.js"></script>

		<script type="text/babel">
			/* 此处一定要写babel */
			//1.创建虚拟DOM
			const VDOM = (
				/* 此处一定不要写引号，因为不是字符串 */
				<h1 id="title">
					<span>Hello,React</span>
				</h1>
			);
			//2.渲染虚拟DOM到页面
			ReactDOM.render(VDOM, document.getElementById("test"));

			const TDOM = document.getElementById("demo");
			console.log("虚拟DOM", VDOM);
			console.log("真实DOM", TDOM);
			debugger;
			// console.log(typeof VDOM);
			// console.log(VDOM instanceof Object);
			/* 
    关于虚拟DOM：
     1.本质是Object类型的对象（一般对象）
     2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
     3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
   */
		</script>
	</body>
</html>
```

### 2.jsx 的语法规则

- 1.全称：JavaScript XML
- 2.react 定义的一种类似于 XML 的 JS 扩展语法：JS + XML 本质是 React.createElement(component, props, ...children)方法的语法糖
- 3.作用：
  - 1)写法：`var ele = <h1>Hello JSX!</h1>`
  - 2)注意 1：它不是字符串, 也不是 HTML/XML 标签
  - 3)注意 2：它最终产生的就是一个 JS 对象
- 4.任意标签名：(HTML 标签) 或其它标签
- 5.任意标签属性：(HTML 标签属性) 或其它
- 6.基本语法规则：

  - 1.定义虚拟 DOM 时，不要写引号。
  - 2.标签中混入 JS 表达式时要用{}。
  - 3.样式的类名指定不要用 `class`，要用 className。
  - 4.内联样式，要用以下 的形式去写：

    - ```jsx
      style={{key:value}}
      ```

  - 5.只有一个根标签
  - 6.标签必须闭合
  - 7.标签首字母
    - (1).若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
    - (2).若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。

```javascript
const myId = "aTgUiGu";
const myData = "HeLlo,rEaCt";

//1.创建虚拟DOM
const VDOM = (
	<div>
		<h2 className="title" id={myId.toLowerCase()}>
			<span style={{ color: "white", fontSize: "29px" }}>
				{myData.toLowerCase()}
			</span>
		</h2>
		<h2 className="title" id={myId.toUpperCase()}>
			<span style={{ color: "white", fontSize: "29px" }}>
				{myData.toLowerCase()}
			</span>
		</h2>
		<input type="text" />
	</div>
);
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById("test"));
```

- 7.babel.js 的作用
  - 1)浏览器不能直接解析 JSX 代码, 需要 babel 转译为纯 JS 的代码才能运行
  - 2)只要用了 JSX，都要加上 type="text/babel", 声明需要 babel 来处理

### 3.模块与组件

#### 组件

##### 函数式组件

1.创建函数式组件

```js
//1.创建函数式组件
function MyComponent() {
	console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
	return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>;
}
```

2.渲染组件到页面(组件必须首字母大写)

```js
ReactDOM.render(<MyComponent />, document.getElementById("test")); // 组件标签必须闭合
```

##### 类式组件

1.创建类式组件

```js
//1.创建类式组件：React.Component
class MyComponent extends React.Component {
	render() {
		//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
		//render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
		console.log("render中的this:", this);
		return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>;
	}
}
```

2.渲染组件到页面

```js
//2.渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById("test")); // 组件标签必须闭合
```

###### 类方法中的 this 指向

解决类中 this 指向问题：.bind(this)

#### 组件事件绑定的属性

state

class Person extends React.Component{} 类里面

```js
状态
state = {

}
设置组件
render(){
  return (
    <ul>
        <li></li>
        <li></li>
    </ul>
  )
}
setState改变页面状态
this.setState({isHot:!isHot})
```

代码例子

```js
<!-- 准备好一个“容器” -->
<div id="test"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel">
    // 1.创建组件
    class Weather extends React.Component{

        // 构造器调用几次？ ———— 1次
        constructor(props){
            console.log('constructor');
            super(props)
            // 初始化状态
            this.state = {isHot:false,wind:'微风'}
            // 解决changeWeather中this指向问题
            this.changeWeather = this.changeWeather.bind(this)
        }

        // render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
        render(){
            console.log('render');
            // 读取状态
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        // changeWeather调用几次？ ———— 点几次调几次
        changeWeather(){
            // changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
            // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
            // 类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

            console.log('changeWeather');
            // 获取原来的isHot值
            const isHot = this.state.isHot
            // 严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
            this.setState({isHot:!isHot})
            console.log(this);

            // 严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
            // this.state.isHot = !isHot //这是错误的写法
        }
    }
    // 2.渲染组件到页面
    ReactDOM.render(<Weather/>,document.getElementById('test'))

    </script>
```

简写代码

```js
<!-- 准备好一个“容器” -->
<div id="test"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel">
    // 1.创建组件
    class Weather extends React.Component{
        // 初始化状态
        state = {isHot:false,wind:'微风'}

        render(){
            const {isHot,wind} = this.state
            return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
        }

        // 自定义方法————要用赋值语句的形式+箭头函数
        changeWeather = ()=>{
            const isHot = this.state.isHot
            this.setState({isHot:!isHot})
        }
    }
    // 2.渲染组件到页面
    ReactDOM.render(<Weather/>,document.getElementById('test'))

    </script>
```

props

基本使用例子

```js
<!-- 准备好一个“容器” -->
<div id="test1"></div>
<div id="test2"></div>
<div id="test3"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel">
    // 创建组件
    class Person extends React.Component{
        render(){
            // console.log(this);
            const {name,age,sex} = this.props
            return (
                <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
                </ul>
                )
                }
                }
                // 渲染组件到页面
                ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
                ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

                const p = {name:'老刘',age:18,sex:'女'}
                // console.log('@',...p);
                // ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
                ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
</script>
```

对 props 进行限制例子

```js
<!-- 准备好一个“容器” -->
<div id="test1"></div>
<div id="test2"></div>
<div id="test3"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
    // 创建组件
    class Person extends React.Component{
        render(){
            // console.log(this);
            const {name,age,sex} = this.props
            // props是只读的
            // this.props.name = 'jack' //此行代码会报错，因为props是只读的
            return (
                <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
                </ul>
                )
                }
                }
                // 对标签属性进行类型、必要性的限制
                Person.propTypes = {
                    name:PropTypes.string.isRequired, //限制name必传，且为字符串
                    sex:PropTypes.string,//限制sex为字符串
                    age:PropTypes.number,//限制age为数值
                    speak:PropTypes.func,//限制speak为函数
                }
                // 指定默认标签属性值
                Person.defaultProps = {
                    sex:'男',//sex默认值为男
                    age:18 //age默认值为18
                }
                // 渲染组件到页面
                ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
                ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

                const p = {name:'老刘',age:18,sex:'女'}
                // console.log('@',...p);
                // ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
                ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

                function speak(){
                    console.log('我说话了');
                }
</script>
```

函数数组使用 props

```js
<!-- 准备好一个“容器” -->
<div id="test1"></div>
<div id="test2"></div>
<div id="test3"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
    // 创建组件
    function Person (props){
    const {name,age,sex} = props
    return (
        <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
        </ul>
        )
        }
        Person.propTypes = {
            name:PropTypes.string.isRequired, // 限制name必传，且为字符串
            sex:PropTypes.string,// 限制sex为字符串
            age:PropTypes.number,// 限制age为数值
        }

        // 指定默认标签属性值
        Person.defaultProps = {
            sex:'男', // sex默认值为男
            age:18 // age默认值为18
        }
        // 渲染组件到页面
        ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```

15.5 版本后需要 限制独立了，需要引入限制的 js 依赖：prop-types.js

```js
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
```

对标签属性进行类型、必要性的限制

```js
// 对标签属性进行类型、必要性的限制
Person.propTypes = {
  name:PropTypes.string.isRequired, // 限制
  name必传，且为字符串
  sex:PropTypes.string, // 限制sex为字符串
  age:PropTypes.number, // 限制age为数值
  speak:PropTypes.func, // 限制speak为函数
}
```

指定默认标签属性值

```js
// 指定默认标签属性值
Person.defaultProps = {
	sex: "男", // sex默认值为男
	age: 18, // age默认值为18
};
```

在 class 类里面简写 static

```js
// 对标签属性进行类型、必要性的限制
static propTypes = {
 name:PropTypes.string.isRequired, // 限制name必传，且为字符串
 sex:PropTypes.string,// 限制sex为字符串
 age:PropTypes.number,// 限制age为数值
}

// 指定默认标签属性值
static defaultProps = {
 sex:'男', // sex默认值为男
 age:18 // age默认值为18
}
```

**refs**：

1.字符串形式的 ref

不推荐使用，因为有效率问题，官网说后续版本可能移除

```html
<input ref="input1" />
```

2.回调形式的 ref

内联函数：内联函数更新状态下调用两次，第一次为 null；解决上述，使用类绑定函数即可

```html
<input ref={(c)=>{this.input1 = c}}
```

class 类绑定的函数

```html
<input ref={this.showInput} 类里面写 showInput = () => { }
```

3.createRef 创建 ref 容器

```js
myRef = React.createRef()
<input ref={this.myRef}/>
```

事件处理

(1).通过 onXxx 属性指定事件处理函数(注意大小写)

- a.React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件 ——— 为了更好的兼容性
- b.React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ———为了的高效

(2).通过 event.target 得到发生事件的 DOM 元素对象 ———不要过度使用 ref

#### 非受控组件和受控组件

非受控组件

受控组件

#### 通过函数柯里化实现 接收 多个参数(用于表单输入值的接收)

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

函数柯里化例子

```js
//创建组件
class Login extends React.Component {
	//初始化状态
	state = {
		username: "", //用户名
		password: "", //密码
	};

	//保存表单数据到状态中
	saveFormData = (dataType) => {
		return (event) => {
			this.setState({ [dataType]: event.target.value });
		};
	};

	//表单提交的回调
	handleSubmit = (event) => {
		event.preventDefault(); //阻止表单提交
		const { username, password } = this.state;
		alert(`你输入的用户名是：${username},你输入的密码是：${password}`);
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				用户名：
				<input
					onChange={this.saveFormData("username")}
					type="text"
					name="username"
				/>
				密码：
				<input
					onChange={this.saveFormData("password")}
					type="password"
					name="password"
				/>
				<button>登录</button>
			</form>
		);
	}
}
//渲染组件
ReactDOM.render(<Login />, document.getElementById("test"));
```

不用柯里化的写法

```js
//创建组件
class Login extends React.Component {
	//初始化状态
	state = {
		username: "", //用户名
		password: "", //密码
	};

	//保存表单数据到状态中
	saveFormData = (dataType, event) => {
		this.setState({ [dataType]: event.target.value });
	};

	//表单提交的回调
	handleSubmit = (event) => {
		event.preventDefault(); //阻止表单提交
		const { username, password } = this.state;
		alert(`你输入的用户名是：${username},你输入的密码是：${password}`);
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				用户名：
				<input
					onChange={(event) => this.saveFormData("username", event)}
					type="text"
					name="username"
				/>
				密码：
				<input
					onChange={(event) => this.saveFormData("password", event)}
					type="password"
					name="password"
				/>
				<button>登录</button>
			</form>
		);
	}
}
//渲染组件
ReactDOM.render(<Login />, document.getElementById("test"));
```

### 4.组件的生命周期

**render(){}**：初始化渲染 或 状态更新之后 执行

componentWillMount(){}：组件 将要被挂载 执行

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告
- 版本 17.0 之后，不加前缀的生命周期已被删除
- UNSAFE_componentWillMount(){}

**componentDidMount(){}**：组件 挂载完毕 执行

- 用途：开启监听，发送 ajax 请求

componentWillUnmount(){}

- 卸载组件前执行：ReactDOM.unmountComponentAtNode()：卸载组件
- 组件 将要卸载 执行
- 做一些收尾工作，如清除定时器

componentWillReceiveProps(props){}：组件将要接收新的 props(第一次 props 不算)

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告；版本 17.0 之后，不加前缀的生命周期已被删除：UNSAFE_componentWillReceiveProps(props){}

shouldComponentUpdate(){}

- 控制组件是否更新的阀门 返回布尔值， (不写默认返回 true) 为真 ：开启执行后面的生命周期，反之则不执行，写了必须 return 布尔值

componentWillUpdate(){}：组件 将要更新 执行

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告；版本 17.0 之后，不加前缀的生命周期已被删除-----UNSAFE_componentWillUpdate(){}

componentDidUpdate(){}：组件 更新后 调用

static getDerivedStateFromProps(props,state){}：新生命周期--得到一个派生的状态

- 里面必须 有 return 返回 state 状态对象{} 或 null
- 用了这个钩子返回状态对象，状态更新等其他钩子就不可用
- 几乎不用，容易造成代码冗余

getSnapshotBeforeUpdate(preProps,preState){}：新生命周期---更新之前获取快照，记录上一个 props 和 state

- 传值给 componentDidUpdate(preProps,preState){}组件更新完毕钩子
- 使用场景：定时器 1 秒动态 加载 列表，使固定 定位
- 几乎不用

**新的生命周期钩子和旧的生命周期钩子对比**
常用的钩子
render(){}：初始化渲染 或 状态更新之后 执行

componentDidMount(){}：组件 挂载完毕 执行；开启监听，发送 ajax 请求

componentWillUnmount(){}：卸载组件前执行---ReactDOM.unmountComponentAtNode()--卸载组件

- 组件 将要卸载 执行
- 做一些收尾工作，如清除定时器

旧的生命周期钩子：废弃了上列 三个标蓝的钩子，要使用要加前缀 UNSAFE\_ 否则报警告

新的生命周期钩子：新增了上列 两个标红的钩子

即将废弃的钩子：

componentWillMount(){}：组件 将要被挂载 执行

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告
- 版本 17.0 之后，不加前缀的生命周期已被删除
- UNSAFE_componentWillMount(){}

componentWillReceiveProps(props){}：组件将要接收新的 props(第一次 props 不算)

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告
- 版本 17.0 之后，不加前缀的生命周期已被删除
- UNSAFE_componentWillReceiveProps(props){}

componentWillUpdate(){}：组件 将要更新 执行

- 版本 16.3 后要写 UNSAFE\_前缀，否则会报警告
- 版本 17.0 之后，不加前缀的生命周期已被删除
- UNSAFE_componentWillUpdate(){}

旧 生命周期 的三个阶段

![旧 生命周期 的三个阶段](.\img\旧 生命周期 的三个阶段.jpg)

1. 初始化阶段: 由 ReactDOM.render()触发---初次渲染
   1.constructor()
   2.componentWillMount()
   3.render()
   4.componentDidMount()
   初始化的事
   开启定时器
   发送网络请求
   订阅消息
2. 更新阶段: 由组件内部 this.setSate()或父组件重新 render 触发
   1.shouldComponentUpdate()
   2.componentWillUpdate()
   3.render()
   4.componentDidUpdate()
3. 卸载组件: 由 ReactDOM.unmountComponentAtNode()触发
   componentWillUnmount()
   收尾的事
   关闭定时器
   取消订阅消息

新 生命周期 的三个阶段

![新 生命周期 的三个阶段](.\img\新 生命周期 的三个阶段.jpg)

```bash

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
  1.constructor()
  2.getDerivedStateFromProps
  3.render()
  4.componentDidMount()
2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
  1.getDerivedStateFromProps
  2.shouldComponentUpdate()
  3.render()
  4.getSnapshotBeforeUpdate
  5.componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
  1.componentWillUnmount()
```

演示代码

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
/*
V17废弃的三个生命周期函数用getDerivedStateFromProps替代，目前使用的话加上
UNSAFE_：
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
 */
export default class LifeCyclePage extends Component {
	static defaultProps = {
		msg: "omg",
	};
	static propTypes = {
		msg: PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
		};
		console.log("constructor", this.state.count);
	}
	static getDerivedStateFromProps(props, state) {
		// getDerivedStateFromProps 会在调用 render 方法之前调用，
		// 并且在初始挂载及后续更新时都会被调用。
		// 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
		const { count } = state;
		console.log("getDerivedStateFromProps", count);
		return count < 5 ? null : { count: 0 };
	}
	// 在render之后，在componentDidUpdate之前。
	getSnapshotBeforeUpdate(prevProps, prevState, snapshot) {
		const { count } = prevState;
		console.log("getSnapshotBeforeUpdate", count);
		return null;
	}
	/* UNSAFE_componentWillMount() {
  // 不推荐，将会被废弃
  console.log("componentWillMount", this.state.count);
 } */
	componentDidMount() {
		console.log("componentDidMount", this.state.count);
	}
	componentWillUnmount() {
		// 组件卸载之前
		console.log("componentWillUnmount", this.state.count);
	}
	/* UNSAFE_componentWillUpdate() {
  // 不推荐，将会被废弃
  console.log("componentWillUpdate", this.state.count);
 } */
	componentDidUpdate() {
		console.log("componentDidUpdate", this.state.count);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const { count } = nextState;
		console.log("shouldComponentUpdate", count, nextState.count);
		return count !== 3;
	}
	setCount = () => {
		this.setState({
			count: this.state.count + 1,
		});
	};
	render() {
		const { count } = this.state;
		console.log("render", this.state);
		return (
			<div>
				<h1>我是LifeCycle页面</h1>
				<p>{count}</p>
				<button onClick={this.setCount}>改变count</button>
				{/* {!!(count % 2) && <Foo />} */}
				<Child count={count} />
			</div>
		);
	}
}

// 子组件
class Child extends Component {
	UNSAFE_componentWillReceiveProps(nextProps) {
		// 不推荐，将会被废弃
		// UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调用
		console.log("Foo componentWillReceiveProps");
	}
	componentWillUnmount() {
		// 组件卸载之前
		console.log(" Foo componentWillUnmount");
	}
	render() {
		return (
			<div
				style={{ border: "solid 1px black", margin: "10px", padding: "10px" }}
			>
				我是Foo组件
				<div>Foo count: {this.props.count}</div>
			</div>
		);
	}
}
```

### 5.组件复合

React 组件复合是一种常见的组件设计模式，它允许我们将多个小组件（功能相对独立的组件）组合成一个大组件（功能更为复杂的组件）。这样可以使代码更加模块化和清晰，并且可以提高组件的复用性和可维护性。

组件的复合有两种方式：

1. 使用 Props

在 React 中，我们可以通过向组件传递 props 的方式来实现组件复合。一个组件可以接收多个 props，其中包括其他组件。这样，我们就可以在一个组件中使用其他组件，从而实现组件复合的效果。例如，

```jsx
function Button(props) {
	return <button>{props.children}</button>;
}

function SubmitButton() {
	return <Button>Submit</Button>;
}

function App() {
	return (
		<div>
			<SubmitButton />
		</div>
	);
}
```

在上述示例代码中，`SubmitButton` 组件复合了 `Button` 组件，并使用其作为提交按钮。

1. 使用 Children

React 中的组件可以有多个 children，包括其他组件。通过使用 `props.children`，我们可以在一个组件中使用其他组件，从而实现组件复合的效果。例如，

```jsx
function Card(props) {
	return <div>{props.children}</div>;
}

function App() {
	return (
		<Card>
			<h2>Card Title</h2>
			<p>Card Description</p>
		</Card>
	);
}
```

在上述示例代码中，`Card` 组件复合了 `h2` 和 `p` 元素，并将它们嵌套在一个 `div` 元素中，从而实现了一个卡片的效果。

总之，React 的组件复合是一个非常有用的设计模式，可以使我们的代码更加模块化和清晰，提高组件的复用性和可维护性。

#### 使用 Layout 复合模式（类似于 Vue 的 slot 插槽）

Layout.js

```jsx
import React, { Component } from "react";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

export default class Layout extends Component {
	componentDidMount() {
		const { title = "商城" } = this.props;
		document.title = title;
	}
	render() {
		// 接收父组件传递过来的值
		const { children, showTopBar, showBottomBar } = this.props;
		console.log("children", children);
		return (
			// 类似于Vue的slot插槽接收
			<div>
				{showTopBar && <TopBar />}
				{children.content}
				{children.txt}
				<button onClick={children.btnClick}>button</button>
				{showBottomBar && <BottomBar />}
			</div>
		);
	}
}
```

HomePage.js

```jsx
import React, { Component } from "react";
import Layout from "./Layout";

export default class HomePage extends Component {
	render() {
		return (
			<Layout showTopBar={false} showBottomBar={true} title="商城首页">
				/* 类似于Vue的slot插槽传递值或元素给子组件 */
				{/* <div>
          <h3>HomePage</h3>
        </div> */}
				{{
					content: (
						<div>
							<h3>HomePage</h3>
						</div>
					),
					txt: "这是个文本",
					btnClick: () => {
						console.log("btnClick");
					},
				}}
			</Layout>
		);
	}
}
```

UserPage.js

```jsx
import React, { Component } from "react";
import Layout from "./Layout";

export default class UserPage extends Component {
	render() {
		return (
			<Layout showTopBar={true} showBottomBar={true} title="用户中心">
				<div>
					<h3>UserPage</h3>
				</div>
			</Layout>
		);
	}
}
```

### 6.纯组件（PureComponent）

#### 掌握 PureComponent 使用，实现性能优化

**实现性能优化**：

定制了 shouldComponentUpdate 后的 Component

```jsx
import React, { Component, PureComponent } from "react";
// export default class PureComponentPage extends Component {
export default class PureComponentPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			// obj: {
			//    num: 2,
			// },
		};
	}
	setCounter = () => {
		this.setState({
			counter: 100,
			// obj: {
			//  num: 200,
			// },
		});
	};
	// 继承Component时，使用性能优化，PureComponent内置了这个优化，所以不用写
	// shouldComponentUpdate(nextProps, nextState) {
	//    return nextState.count !== this.state.count;
	// }
	render() {
		const { counter, obj } = this.state;
		console.log("render");
		return (
			<div>
				<h1>PuerComponentPage</h1>
				<div onClick={this.setCounter}>counter: {counter}</div>
			</div>
		);
	}
}
```

#### **浅比较**

缺点是必须要用 class 形式，而且要注意是**浅比较**，不能使用 Object 形式

#### 与 Component

React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate() ，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

如果赋予 React 组件相同的 props 和 state， render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

#### 注意

React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent ，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。

此外， React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

#### PureComponent 原理

### 7.组件通信

- 父子组件通信：props
- 兄弟组件通信：消息订阅与发布—pubsub-js

## 二、React 脚手架开发模式

### create-react-app 脚手架安装和使用

1.检查 node 和 npm 版本号

```bash
node -v
npm -v
```

2.安装和切换淘宝 cnpm 镜像源

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

3.检查淘宝镜像是否安装成功

```bash
cnpm -v
```

4.全局安装 react 脚手架

```bash
cnpm install -g create-react-app
```

5.脚手架命令创建项目

```bash
create-react-app  helloWord
```

6.启动项目-自动编译打包并刷新

```bash
npm start
```

### 脚手架 public 文件夹介绍

#### index.html 文件内容详解

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径 -->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
		<meta name="theme-color" content="red" />
		<meta
			name="description"
			content="Web site created using create-react-app"
		/>
		<!-- 用于指定网页添加到手机主屏幕后的图标 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件 -->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
		<title>React App</title>
	</head>

	<body>
		<!-- 若浏览器不支持js则展示标签中的内容 -->

		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
	</body>
</html>
```

#### manifest.json

应用加壳配置文件，在 index.html 里面引用

#### rebots.txt

爬虫规则文件

### 脚手架 src 文件夹介绍

1.App.css---App.js 的样式文件

2.App.js---一个 App 组件

3.App.test.js---一个 app 组件测试文件，基本不用，我们直接运行程序进行测试

4.index.css---index.js 的样式文件

5.index.js---入口文件，该文件将 app 组件渲染进入 index.html 的 root 容器中

6.logo.svg---图片，App.js 中的 App 组件会用到

7.reportWebVitals.js---实现页面上的性能监测，index.js 文件会用到

8.setUpTests.js---做组件测试的（一般用不上）

### 样式的模块化

### 脚手架配置代理

#### Axios 请求配置

##### 跨域代理配置

###### 1、配置一个代理

1.package.json 文件追加配置：`"proxy": "服务器地址"`

- 1.优点：配置简单，前端请求资源时可以不加任何前缀。
- 2.缺点：不能配置多个代理。
- 3.工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）

  2.保存后重启项目

###### 2、配置多个代理

1.src 目录新建 setupProxy.js 文件：文件名必须叫 setupProxy.js，因为 recat 中内置的 webpack，会自动的找这个名字的文件

2.编写 setupProxy.js 配置具体代理规则：

```js
const proxy = require("http-proxy-middleware"); // 引入即可，不需要安装

module.exports = function (app) {
	app.use(
		proxy("/api1", {
			//api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
			target: "http://localhost:5000", //配置转发目标地址(能返回数据的服务器地址)
			changeOrigin: true, //控制服务器接收到的请求头中host字段的值
			/*  
            changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000  
            changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000  
            changeOrigin默认值为false，但我们一般将changeOrigin值设为true  
         */
			pathRewrite: { "^/api1": "" }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
		}),
		proxy("/api2", {
			target: "http://localhost:5001",
			changeOrigin: true,
			pathRewrite: { "^/api2": "" },
		})
	);
};
```

## 三、react-router-dom(react web 路由)

### 前端路由原理

- `History.createBrowserHistory()`：H5 推出的 history 的 API
- `History.createHashHistory()`：hash 值(锚点跳转)

### react-router 有三个库

- web 开发人员使用的库(浏览器中使用)：`react-router-dom`
- 在 react-native 中移动端原生开发使用的库：`react-router-native`
- anywhere 所有人员能用的库：

react-router 提供最基本的路由功能，实际使用的时候我们不会直接安装 react-router，而是根据应用运行的环境选择安装 react-router-dom（在浏览器中使用）或 react-router-native（在 rn 中使用）。react-router-dom 和 react-router-native 都依赖 react-router，所以在安装时，react-router 也会自动安装。

印记中文翻译的文档：<https://react-router.docschina.org/>

### 路由基本使用

文档：[React Router: Declarative Routing for React.js (docschina.org)](https://react-router.docschina.org/)

react-router 中奉行一切皆组件的思想，路由器-**Router**、链接-**Link**、路由-**Route**、独占-**Switch**、重定向-**Redirect**都以组件形式存在

#### 内置组件

1.`<BrowserRouter>`：不带 # 号 2.`<HashRouter>`：带 # 号

BrowserRouter 与 HashRouter 的区别

- 1.底层原理不一样：
  - BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本。
  - HashRouter 使用的是 URL 的哈希值。
- 2.path 表现形式不一样
  - BrowserRouter 的路径中没有#,例如：localhost:3000/demo/test
  - HashRouter 的路径包含#,例如：localhost:3000/#/demo/test
- 3.刷新后对路由 state 参数的影响
  - (1).BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
  - (2).HashRouter 刷新后会导致路由 state 参数的丢失！！！
- 4.备注：HashRouter 可以用于解决一些路径错误相关的问题。

  3.`<Route>`：路由

版本写法差异

- 6.x 以前的版本
  - 1.直接写：`<Route path="/home" component={ Home } />` 跳转
  - 2.写成：`<Route path="/home" component={ Home } />`
- 6.x 版本
- 1.需要在`<Route>`跳转路径 外面套一层`<Routes>`的壳

```jsx
<Routes>
	<Route path="/home" element={<Home />} />
</Routes>
```

- 2.跳转的组件属性改成：`element={ <Home/> }`

```jsx
<Route path="/home" element={<Home />} />
```

4.`<Redirect>`：路由重定向

- 1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
- 2.具体编码：

```jsx
<Switch>
	<Route path="/about" component={About} />
	<Route path="/home" component={Home} />
	<Redirect to="/about" />
</Switch>
```

5.`<Link>`：普通路由链接 6.`<NavLink>`：NavLink 可以实现路由链接的高亮，通过 activeClassName 指定样式名

封装 NavLink 组件

封装

```js
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyNavLink extends Component {
	render() {
		console.log(this.props);
		return (
			// 其中标签体的是特殊的标签属性，以 children 接收
			<NavLink
				activeClassName="选中高光样式"
				className="一般样式"
				{...this.props}
			/>
		);
	}
}
```

调用

1

```jsx
<MyNavLink to="/home" a={a} b={b} c={c}>Home</MyNavLink>
<MyNavLink to="/about" >About</MyNavLink>
```

2

```jsx
<MyNavLink to="/home" a={a} b={b} c={c} children="Home" />
<MyNavLink to="/about" children="About" / >
```

7.`<Switch>`：使用 `<Switch></Switch>` 组件包裹路由，精确匹配多个路由组件中的第一个往后不使用，一个路由以上可以使用，效率更高

- 1.通常情况下，path 和 component 是一一对应的关系。
- 2.Switch 可以提高路由匹配效率(单一匹配)。

例子

```jsx
<Switch>
	<Route path="/about" component={About} />
	<Route path="/home" component={Home} />
</Switch>
```

#### react-router 渲染内容的三种方式

```jsx
<Route
	exact
	path="/"
	// component={ HomePage } // 方式一
	// children={() => <div>children</div>) // 方式二
	render={() => <div>render</div>} // 方式三
/>
```

Route 渲染优先级：**children > component > render**

这三种方式互斥，你只能用一种。

- children：function
  - 有时候，不管 location 是否匹配，你都需要渲染一些内容，这时候你可以用 children。
  - 除了不管 location 是否匹配都会被渲染之外，其它工作方法与 render 完全一样。
- render：function
  - 但是当你用 render 的时候，你调用的只是个函数。
  - 只在当 location 匹配的时候渲染。
- component: component
  - 只在当 location 匹配的时候渲染。

#### react-router 对象和函数

- history 对象
- match 对象
- withRouter 函数

#### 基本路由使用

##### 准备

1.下载：react-router-dom:

```bash
npm install --save react-router-dom
```

2.引入 bootstrap.css:

```js
<link rel="stylesheet" href="/css/bootstrap.css">
```

##### 基本使用

在入库 文件 index.js 套入外壳

`<App>`的最外侧包裹了一个`<BrowserRouter>`或`<HashRouter>`

没有#号

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
```

有#号

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
```

在 App.jsx 页面组件使用

```jsx
import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";

export default class App extends Component {
	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<h2>React Router Demo</h2>
				{/* 导航跳转 */}
				<div style={{ margin: "10px 20px" }}>
					<Link className="list-group-item" to="/about">
						About
					</Link>
					<Link className="list-group-item active" to="/home">
						Home
					</Link>
				</div>

				{/* 注册路由 */}
				<Routes>
					<Route path="/about" element={<About />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</div>
		);
	}
}
```

路由组件和一般组件不同点

- 1.写法不同

  - 一般组件：`<Demo/>`
  - 路由组件：`<Route path="/demo"`

- 2.存放位置不同

  - 一般组件：components 文件夹
  - 路由组件：pages 文件夹

- 3.接收到的 props 不同

  - 一般组件：写组件标签时传递了什么，就能收到什么

  - 路由组件：接收到三个固定的属性

  - ```jsx
    history:
     go: ƒ go(n)
     goBack: ƒ goBack()
     goForward: ƒ goForward()
     push: ƒ push(path, state)
     replace: ƒ replace(path, state)
    location:
     pathname: "/about"
     search: ""
     state: undefined
    match:
     params: {}
     path: "/about"
     url: "/about"
    ```

解决多级路径刷新页面样式丢失的问题

- 1.public/index.html 中 引入样式时不写 ./ 写 / （常用）
- 2.public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
- 3.使用 HashRouter

路由的严格匹配与模糊匹配

- 1.默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
- 2.开启严格匹配：`<Route exact={true} path="/about" component={About}/>`
  - exact={true} 简写 exact
- 3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

##### 嵌套路由使用

1.注册子路由时要写上父路由的 path 值
子路由路径写法：

```js
to = "/home/news"; // /home是父路由路径
```

2.路由的匹配是按照注册路由的顺序进行的

##### 向路由组件传递参数数据

1.params 参数

- 路由链接(携带参数)：
  - `<Link to='/demo/test/tom/18'}>详情</Link>`
  - `<Link to={`/demo/test/tom/${msgObj.id}/${msgObj.age}`}>详情</Link>`
- 注册路由(声明接收)：
  - `<Route path="/demo/test/:name/:age" element={<Test/>} />`
- 跳转的路由接收参数：

  - `this.props.match.params`

    2.search 参数

- 路由链接(携带参数)：
  - `<Link to='/demo/test?name=tom&age=18'}>详情</Link>`
  - `<Link to={`/demo/test/?name=${name}&age=${age}`}>详情</Link>`
- 注册路由(无需声明，正常注册即可)：
  - `<Route path="/demo/test" element={<Test/>}/>`
- 跳转的路由接收参数：
  - `this.props.location.search`
- 备注：获取到的 search 是 urlencoded 编码字符串，需要借助 querystring react 内置库解析：把序列化的数据转成对象

  - 1.直接导入不用安装
  - `import qs from ‘querystring’`
  - 2.使用

    - `qs.parse()`

      3.state 参数

- 路由链接(携带参数)：

  - ```jsx
    <Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
    <Link to={{pathname:'/demo/test',state:{name:msgObj.name,age:msgObj.age}}}>详情</Link>
    ```

- 注册路由(无需声明，正常注册即可)：
  - `<Route path="/demo/test" element={<Test/>}/>`
- 接收参数：
  - `this.props.location.state`
- 备注：地址栏不体现出来，但刷新也可以保留住参数

##### 编程式路由导航--多种路由跳转方式

1.push 和 replace 路由跳转模式

- `<Link to{{}}></Link>`
  - 什么都不写默认 push 跳转模式
  - push 路由跳转是可以跳转到上一级,可以返回的
- `<Link replace to{{}}></Link>`

  - 指定 replace 跳转模式
  - replace 路由跳转是不能返回上一层的

    2.借助 this.prosp.history 对象上的 API 对操作路由跳转、前进、后退

    3.编程式路由导航(通过事件方法执行)

- 使用高阶函数拿到传的参数
  - `onClick={() => this.showPush()}`
- 跳转方法名
  - `this.prosp.history.push()`
  - `this.prosp.history.replace()`
- 回退 2 步：`this.prosp.history.goBack(2)`
- 前进：`this.prosp.history.goForward()`
- 前进 2 步：`this.prosp.history.go(2)`

##### withRouter 的使用

让在一般组件也可以使用路由组件的 API

使用 withRouter

```js
class Header extends Component {}

export default withRouter(Header);
```

接下来就可以在一般组件里使用，编程式跳转等 API 属性

### 404 页面设置

设定一个没有 path 的路由在路由列表最后面，表示一定匹配

```jsx
{
	/* 添加Switch表示仅匹配一个*/
}
<Switch>
	{/* 根路由要添加exact，实现精确匹配 */}
	<Route exact path="/" component={HomePage} />
	<Route path="/user" component={UserPage} />
	<Route component={EmptyPage} />
</Switch>;
class EmptyPage extends Component {
	render() {
		return (
			<div>
				<h3>EmptyPage-404</h3>
			</div>
		);
	}
}
```

## 四、pubSub 消息发布订阅

兄弟组件通信：消息订阅与发布—pubsub-js

## 五、redux 各个版本状态管理

### 文档

- 英文文档：<https://redux.js.org/>
- 中文文档：<http://www.redux.org.cn/>
- Github：<https://github.com/reactjs/redux>

### redux 是什么

1. redux 是一个专门用于做状态管理的 JS 库(不是 react 插件库)，提供一种可预测的状态管理方案，使我们可以更好地组织应用程序中的数据流。
2. 它可以用在 React、Angular 和 Vue 等项目中, 但基本与 react 配合使用。
3. 作用：集中式管理 react 应用中多个组件共享的状态，对于大型或复杂的应用程序，使用 Redux 可以更好地管理和维护状态。

### 什么情况下需要使用 redux

- 1.某个组件的状态，需要让其他组件可以随时拿到（共享）。
- 2.一个组件需要改变另一个组件的状态（通信）。
- 3.总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

### redux 工作流程

![redux工作流程](.\img\redux工作流程.jpg)

### redux 的三个核心概念

#### store

- 1.将 state、action、reducer 联系在一起的对象
- 2.如何得到此对象?
  - 1)import {createStore} from 'redux'
  - 2)import reducer from './reducers'
  - 3)const store = createStore(reducer)
- 3.此对象的功能?
  - 1)getState()：得到 state
  - 2)dispatch(action)：分发 action, 触发 reducer 调用, 产生新的 state
  - 3)subscribe(listener)：注册监听, 当产生了新的 state 时, 自动调用

#### action

- 1.动作的对象

- 2.包含 2 个属性

  - type：标识属性, 值为字符串, 唯一, 必要属性
  - data：数据属性, 值类型任意, 可选属性

- 3.例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

- 异步 action

  - 1.安装 redux-thunk

  - `npm i redux-thunk`

  - 2.store.js 引入和调用

    - import { createStore, applyMiddleware } from 'redux';-----调用：applyMiddleware
    - import reduxThunk from 'redux-thunk';
    - export default createStore(countResucer,applyMiddleware(reduxThunk)); -----调用：applyMiddleware(reduxThunk)

  - 3.异步调用加法

  - ```jsx {10}
    import { INCREMENET, DECREMENET } from './constantimport store from
    import store from './store'
    
    export const createIncrementAction = data => ({type:INCREMENET,data})
    export const createDecrementAction = data => ({ftype:DECREMENET,data})
    // 异步action
    export const createDecrementAsyncAction = (data,time) =>{
        return () => {
            setTimeout(() => {
                // 默认传的对象，使用上述中间件才能转换读取异步
             store.dispatchcreateIncrementAction(data))
         },time)
        }
    }
    ```

#### reducer

1.用于初始化状态、加工状态。
​ 2.加工时，根据旧的 state 和 action， 产生新的 state 的纯函数。

#### 简单 redux 使用例子

1.安装 Redux

首先需要安装 Redux，可以通过 npm 或 yarn 安装：

```bash
npm install redux --save
# or
yarn add redux
```

2.创建 Store

Redux 中的状态存储在一个全局的 Store 对象中，使用 `createStore()` 函数创建 Store。`createStore()` 函数接受一个 reducer 函数作为参数，该函数用于更新状态：

store/index.js

```javascript
import { createStore } from "redux";

function reducer(state = {}, action) {
	// 根据 action 更新 state
	return state;
}

const store = createStore(reducer);
```

3.在页面内 调度 Action

更新状态时需要调度一个 Action，Action 是一个包含描述操作的 type 属性和操作所需的任何数据的普通对象。可以通过 dispatch() 函数调用 Action：

```javascript
const action = {
	type: "ADD_TODO",
	payload: { title: "item 1" },
};

store.dispatch(action);
```

4.页面内 订阅 Store

Redux 允许我们订阅 Store，以便在状态发生变化时可以及时得到通知。`subscribe()` 函数可以用于订阅 Store 的变化：

```javascript
componentDidMount() {
    store.subscribe(() => {
      console.log('State updated:', store.getState());
      // 强制更新页面
      this.forceUpdate();
    });
}

// 更新页面数据也可以在 index.js 里面
store.subscribe(() => {
 console.log("state发生变化了");
    // 发送数据变化，重新渲染页面
    ReactDOM.render(<App />, document.getElementById("root"));
 // this.forceUpdate();
});
```

5.连接 React 组件

可以使用 React-Redux 库将 Redux 集成到 React 应用程序中，以便在 React 组件中使用 Redux 状态管理。可以通过 `connect()` 函数将组件与 Store 连接起来：

```javascript
import { connect } from "react-redux";

function TodoList(props) {
	return (
		<ul>
			{props.todos.map((todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</ul>
	);
}

function mapStateToProps(state) {
	return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoList);
```

上面的代码中，`mapStateToProps()` 函数将 Store 中的状态映射到组件的 props 中。然后通过 `connect()` 函数将组件与 Store 连接起来，使其能够获取 Store 中的数据。此时，在组件内部就可以通过 `props.todos` 访问 Store 中的 `todos` 数组。

### redux 的核心 API

- `createstore()` 作用：创建包含指定 reducer 的 store 对象
- `store对象`

  - 1.作用: redux 库最核心的管理对象
  - 2.它内部维护着:

    - state
    - reducer

  - 3.核心方法:

    - getState()
    - dispatch(action)
    - subscribe(listener)

  - 4.具体编码:

  1. store.getState()
  2. store.dispatch({type:'INCREMENT', number})
  3. store.subscribe(render)

- `applyMiddleware()` 作用：应用上基于 redux 的中间件(插件库)
- `combineReducers()` 作用：合并多个 reducer 函数

### redux 异步编程

理解：

- 1.redux 默认是不能进行异步处理的,
- 2.某些时候应用中需要在 redux 中执行异步任务(ajax, 定时器)

使用异步中间件

```bash
npm install --save redux-thunk
```

### (重点)🌟react-redux

**React-Redux 是 Redux 在 React 应用程序中的一个官方绑定库**。

React-Redux 提供了一个组件和 Hooks API，使得在 React 组件中使用 Redux 更加方便。

React-Redux 主要解决了以下问题：

1. 连接 React 组件和 Redux Store：React-Redux 提供一个 `connect()` 函数，帮助我们将 React 组件连接到 Redux Store 上，使得组件能够获取到 Store 中的特定数据，并在必要时更新组件状态。
2. 管理组件状态：React-Redux 提供了 `Provider` 组件，将 Redux Store 传递给整个应用程序，使组件能够获取和更新 Store 中的状态。

总之，Redux 用于管理应用程序中的全局状态，而 React-Redux 则提供了一种在 React 中方便使用 Redux 状态管理的方式，它为 React 组件提供了访问 Redux Store 的能力，并提供了一些方便的 API 使组件能够更加灵活地使用和管理状态。

#### react-redux 安装和使用

##### 1.安装

```bash
npm i react-redux --save
# or
yarn add react-redux -S
```

##### 2.使用

react-redux 提供了两个 api

1. Provider 为后代组件提供 store

2. connect 为组件提供数据和变更方法

store/index.js

```js
import i createStore  from "redux";

定义state初始化和修改规则，reducer是一个纯函数
function counterReducer(state = 0, action) {
    switch(action.type) {
        case "ADD":
         return state + 1;
        case "MINUS":
         return state - 1;
        default:
         return state;
    }
}
const store = createStore(counterReducer);
export default store;
```

Provider 组件的使用：index.js 入口文件中：多个组件传递，就不需要在单个容器组件使用 store

```jsx
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import store from './store/'
import { Provider } from 'react-redux'
ReactDom.render(
 <Provider store={store}>
  <App/>
 </Provider>,
 document.getElementById('root');
)
```

获取状态数据：使用 connect 方法导出映射和派发的事件，ReactReduxPage.js

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
class ReactReduxPage extends Component {
	render() {
		const { num, add, minus } = this.props;
		return (
			<div>
				<h1>ReactReduxPage</h1>
				<p>{num}</p>
				<button onClick={add}>add</button>
				<button onClick={minus}>minus</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		num: state,
	};
};
const mapDispatchToProps = {
	add: () => {
		return { type: "add" };
	},
	minus: () => {
		return { type: "minus" };
	},
};
// 事件映射和派发
export default connect(
	mapStateToProps, // 状态映射 mapStateToProps
	mapDispatchToProps // 派发事件映射
)(ReactReduxPage);
```

#### redux 调试工具

1.安装 chrome 浏览器插件：Redux DevTools

2.下载工具依赖包

```bash
npm install --save-dev redux-devtools-extension
```

3.reducer 目录下 store.js 文件引入

```bash
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'
```

4.使用

```jsx
// 暴露store
export default createStore(
	allReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
composeWithDevTools(applyMiddleware(thunk));
```

5.至此，浏览器开发者工具便可以使用

#### 1.UI 组件

1. 只负责 UI 的呈现，不带有任何业务逻辑
2. 通过 props 接收数据(一般数据和函数)
3. 不使用任何 Redux 的 API
4. 一般保存在 components 文件夹下

#### 2.容器组件

1. 负责管理数据和业务逻辑，不负责 UI 的呈现
2. 使用 Redux 的 API
3. 一般保存在 containers 文件夹下

#### 3.整合 UI 组件和容器组件

两个组件可以合并在一个页面或者分开两个页面

#### 相关 API

1. Provider：让所有组件都可以得到 state 数据

   ```jsx
   <Provider store={store}>
   	<App />
   </Provider>
   ```

2. connect：用于包装 UI 组件生成容器组件

   ```jsx
   import { connect } from "react-redux";
   connect(mapStateToprops, mapDispatchToProps)(Counter);
   ```

3. mapStateToprops：将外部的数据（即 state 对象）转换为 UI 组件的标签属性

   ```JSX
   const mapStateToprops = function (state) {
     return {
    value: state
     }
   }
   ```

4. mapDispatchToProps：将分发 action 的函数转换为 UI 组件的标签属性

   ```JSX
   const mapDispatchToProps = function(dispatch){
     return {
       jia:number => dispatch(createIncrementAction(number)),
       jian:number => dispatch(createDecrementAction(number)),
       jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
    }
   }
   ```

#### react-redux 数据共享

store.js

使用 combineReducers 去合并所有组件的 reducer 的值到一个对象内

```JS
/*该文件专门用于暴露一个store对象，整个应用只有一个store对象*/
import {createStore,applyMiddleware,combineReducers} from "redux"
//引入为Count组件服务的reducer
import countReducer from  "./reducer/count_reducer"
//引入为Person组件服务的reducer
import presonReducer from  "./reducer/person_reducer"
//引入redux-thunk中间件，用于支持异步action
import thunk from "redux-thunk"

//汇总所有的reducer
const allReducer = combineReducers({
    count:countReducer ,
    person:presonReducer
})

export default createStore(allReducer ,applyMiddleware(thunk))
```

组件内取数据共享的数值

```js
// 容器组件
export default connect(
	(state) => ({
		count: state.count,
		person: state.person,
	}),
	{
		increment: incrementAction,
		decrement: decrementAction,
		incrementAsync: incrementActionAsync,
	}
)(Count);

// 组件内调用
{
	this.props.count;
}
{
	this.props.person;
}
```

#### 纯函数和高阶函数

##### 纯函数

1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
2. 必须遵守以下一些约束

- 1. 不得改写参数数据
- 2. 不会产生任何副作用，例如网络请求，输入和输出设备
- 3. 不能调用 Date.now()或者 Math.random()等不纯的方法

  3.redux 的 reducer 函数必须是一个纯函数

- 非纯函数实例
- preState.unshift(data)
- 上述方法导致 preState 被改写，reducer 的方法就不是纯函数
- 纯函数实例
- return [data,...preState]

##### 高阶函数

- 理解: 一类特别的函数

  - 情况 1: 参数是函数
  - 情况 2: 返回是函数

- 常见的高阶函数:

  - 定时器设置函数
  - 数组的 forEach()/map()/filter()/reduce()/find()/bind()
  - promise
  - react-redux 中的 connect 函数

- 作用: 能实现更加动态, 更加可扩展的功能

## 六、React 扩展(setState|lazyLoad|Hooks)

### 1.setState 更新状态的 2 种写法

- (1). 对象式的 setState(setState 方法接收一个对象作为参数)：`setState(stateChange, [callback])`

  - 1.`stateChange` 为状态改变对象(该对象可以体现出状态的更改)
  - 2.`callback` 是可选的回调函数, 它在状态更新完毕、界面也更新后(render 调用后)才被调用

- ```js
  this.setState({ key: value });
  // 例如：给setState方法传递了一个对象，对象里的属性代表需要更新的状态，例如上例中，我们需要更新状态中的count属性
  this.setState({
  	count: this.state.count + 1,
  });
  ```

- (2). 函数式的 setState(setState 方法接收一个函数作为参数)：`setState(updater, [callback])`

  - 1.updater 为返回 stateChange 对象的函数。
  - 2.updater 可以接收到 state 和 props。
  - 3.callback 是可选的回调函数, 它在状态更新、界面也更新后(render 调用后)才被调用。

- ```js
  // 给setState方法传递了一个函数，这个函数接收一个参数prevState，表示当前状态。我们需要返回一个对象，对象里的属性代表需要更新的状态。
  this.setState((prevState) => {
  	return { count: prevState.count + 1 };
  });
  ```

- 两种方法--完整代码

- ```js
  import React from "react";
  
  class Counter extends React.Component {
  	constructor(props) {
  		super(props);
  
  		this.state = { count: 0 };
  	}
  
  	handleClick1 = () => {
  		// 第一种写法：传递一个对象
  		this.setState({ count: this.state.count + 1 });
  	};
  
  	handleClick2 = () => {
  		// 第二种写法：传递一个更新函数
  		this.setState((prevState) => {
  			return { count: prevState.count + 1 };
  		});
  	};
  
  	render() {
  		return (
  			<div>
  				<h1>Count: {this.state.count}</h1>
  				<button onClick={this.handleClick1}>Click 1</button>
  				<button onClick={this.handleClick2}>Click 2</button>
  			</div>
  		);
  	}
  }
  
  export default Counter;
  ```

- 总结:

  - 1.对象式的 setState 是函数式的 setState 的简写方式(语法糖)
  - 2.使用原则：

    - (1).如果新状态不依赖于原状态 ===> 使用对象方式
    - (2).如果新状态依赖于原状态 ===> 使用函数方式
    - (3).如果需要在 setState()执行后获取最新的状态数据, 要在第二个 callback 函数中读取

  - 在 React 中，`setState`通常是异步的，这意味着当你调用`setState`时，React 并不会立即更新组件的状态，而是将其加入到一个更新队列中等待后续处理。这种异步更新状态的方式可以提高性能和效率，因为它可以将多个状态更新批量处理，避免不必要的渲染。

  - 但是，在某些情况下，你需要确保在调用`setState`后立即获取更新后的状态值，此时异步更新可能会带来问题。这里有一些关于`setState`同步和异步的注意事项：

    1. `setState`执行是异步的，所以如果你想基于当前状态更新状态，你需要使用第二种写法——传递一个函数。
    2. 在异步的更新过程中，React 可能会合并或删除一些状态更新。例如，在循环中连续多次调用`setState`方法，实际上只有最后一次调用会被执行。这是因为 React 会将这些更新合并成一个更新，以提高渲染性能。
    3. 如果你需要在调用`setState`之后立即获取更新后的状态值，你可以使用回调函数。该回调函数会在状态更新完成之后再执行，此时你可以获取到最新的状态值。

    下面是一个简单的示例代码，演示了在`setState`中使用回调函数获取更新后的状态值：

    ```js
    import React from "react";
    
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
    
        this.state = { count: 0 };
      }
    
      handleClick = () => {
        this.setState({ count: this.state.count + 1 }, () => {
          // 1.通过回调函数获取当前状态的值，并将其打印出来。
          console.log("Updated count:", this.state.count);
        });
      };
      // 2.也可以通过定时器使异步变同步
      handleClick1 = () => {
        this.setState({ count: this.state.count + 1 });
    
        setTimeout(() => {
          console.log("Updated count:", this.state.count);
        }, 0);
      };
      // 3.通过原生事件的方法获取id监听
      componentDidMount() {
          document.getElementById("test").addEventListener("click"
    this.handleClick1);
      }
    
      render() {
        return (
          <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.handleClick}>Click Me</button>
      <button id="test">原生点击</button>
          </div>
        );
      }
    }
    
    export default MyComponent;
    ```

### 2.路由组件的 lazyLoad(懒加载)

0.引入

```js
import React, { Component, lazy } from "react";
```

1.通过 React 的 lazy 函数配合 import()函数动态加载路由组件 ===> 路由组件代码会被分开打包

```js
const Login = lazy(() => import("@/pages/Login"));
```

2.通过`<Suspense>`指定在 加载得到路由 打包文件前 显示一个自定义 loading 界面

```jsx
<Suspense fallback={<h1>loading.....</h1>}>
	<Route path="/Home" component={Home} />
	<Redirect to="/login" component={Login} />
</Suspense>
```

### 3.⭐️⭐️React Hooks

#### 1.React Hook/Hooks 是什么?

官网文档：[Reusing Logic with Custom Hooks – React](https://react.dev/learn/reusing-logic-with-custom-hooks)

(1). Hook 是 React 16.8.0 版本增加的新特性/新语法

(2). 可以让你在函数组件中使用 state 以及其他的 React 特性

**认识 Hook**：

**Hook 是什么？** Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如， useState 是允许

你在 React 函数组件中添加 state 的 Hook。

**什么时候我会用** **Hook**？ 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须

将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

#### 2.三个常用的 Hook

##### (1). State Hook：React.useState()

- (1). State Hook 让函数组件也可以有 state 状态, 并进行状态数据的读写操作

- (2). 语法:

- ```jsx
  import React, { useState } from "react";
  
  export default function HookPage(props) {
  	// 声明一个叫 “count” 的 state 变量，初始化为0
  	const [count, setCount] = useState(0);
  	return (
  		<div>
  			<h3>HookPage</h3>
  			<p>{count}</p>
  			<button onClick={() => setCount(count + 1)}>add</button>
  		</div>
  	);
  }
  ```

- (3). useState()说明:

  - 参数：第一次初始化指定的值在内部作缓存
  - 返回值：包含 2 个元素的数组, 第 1 个为内部当前状态值, 第 2 个为更新状态值的函数

- (4). setCount() 2 种写法:

  - setCount()：是语法自定义的方法名
  - setCount(count+1)：参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
  - setCount(count => count+1)：参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

##### (2). Effect Hook：React.useEffect()

- (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)

- (2). React 中的副作用操作：

  - 发 ajax 请求数据获取
  - 设置订阅 / 启动定时器
  - 手动更改真实 DOM

- (3). 语法和说明:

  - ```jsx
    import { useEffect } from "react";
    
    export default function HookPage(props) {
    	// 声明一个叫 “count” 的 state 变量，初始化为0
    	const [count, setCount] = useState(0);
    	// 与 componentDidMount 和 componentDidUpdate相似
    	useEffect(() => {
    		// 在此可以执行任何带副作用操作
    		// 更新 title
    		document.title = `You clicked ${count} times`;
    		// return () => {
    		// 在组件卸载前执行
    		// 在此做一些收尾工作, 比如清除定时器/取消订阅等
    		// };
    	}, [stateValue]); // 如果指定的是[], 回调函数只会在第一次render()后执行
    	return (
    		<div>
    			<h3>HookPage</h3>
    			<p>{count}</p>
    			<button onClick={() => setCount(count + 1)}>add</button>
    		</div>
    	);
    }
    ```

- (4). 可以把 useEffect Hook 看做如下三个函数的组合

  - componentDidMount()
  - componentDidUpdate()
  - componentWillUnmount()

- 在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录⽇志以及执

  行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

  使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。你可以

  把 effffect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

  默认情况下，effffect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变的时候 才执行。

  **effffect** **的条件执行**

  默认情况下，effffect 会在每轮组件渲染完成后执行。这样的话，一旦 effffect 的依赖发生变化，它就会被

  重新创建。

  然而，在某些场景下这么做可能会矫枉过正。比如，在上一章节的订阅示例中，我们不需要在每次组件

  更新时都创建新的订阅，而是仅需要在 source props 改变时重新创建。

  要实现这一点，可以给 useEffect 传递第二个参数，它是 effffect 所依赖的值数组。更新后的示例如

  下

  ```jsx
  import React, { useState, useEffect } from "react";
  export default function HookPage(props) {
  	// 声明一个叫 “count” 的 state 变量，初始化为0
  	const [count, setCount] = useState(0);
  	const [date, setDate] = useState(new Date());
  	// 与 componentDidMount 和 componentDidUpdate相似
  	useEffect(() => {
  		// 更新 title
  		document.title = `You clicked ${count} times`;
  	}, [count]);
  	useEffect(() => {
  		const timer = setInterval(() => {
  			setDate(new Date());
  		}, 1000);
  	}, []);
  	return (
  		<div>
  			<h3>HookPage</h3>
  			<p>{count}</p>
  			<button onClick={() => setCount(count + 1)}>add</button>
  			<p>{date.toLocaleTimeString()}</p>
  		</div>
  	);
  }
  ```

  此时，只有当 useEffffect 第二个参数数组里的数值 改变后才会重新创建订阅。

  **清除** **effffect**

  通常，组件卸载时需要清除 effffect 创建的诸如订阅或计时器 ID 等资源。要实现这一点， useEffect

  函数需返回一个清除函数，以防止内存泄漏，清除函数会在组件卸载前执行。

  ```jsx
  useEffect(() => {
  	const timer = setInterval(() => {
  		setDate(new Date());
  	}, 1000);
  	return () => clearInterval(timer);
  }, []);
  ```

##### (3). Ref Hook：React.useRef()

- (1). Ref Hook 可以在函数组件中存储/查找组件内的标签或任意其它数据

- (2). 作用：保存标签对象,功能与 React.createRef()一样

- (3). 语法：

- ```js
  import { useRef } from "react";
  
  const refInput = useRef();
  ```

- (4).使用

  - ```jsx
    <input type="text" ref={refInput} />;
    
    refInput.current.value;
    ```

#### 3.自定义 Hook

有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：高阶组

件和 render props。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

**自定义** **Hook** **是一个函数，其名称以** **“use”** **开头，函数内部可以调用其他的** **Hook**。

hooks/useMousePosition.js

```js
import React, { useState, useEffect } from "react";

// 因为要返回positions对象所以函数不能为React.FC了
const useMousePosition = () => {
	const [positions, setPositions] = useState({ x: 0, y: 0 });
	useEffect(() => {
		console.log("add effect");
		const updateMouse = (e) => {
			setPositions({ x: e.clientX, y: e.clientY });
		};
		document.addEventListener("mousemove", updateMouse);
		return () => {
			console.log("remove effect");
			document.removeEventListener("mousemove", updateMouse);
		};
	}, []);
	return positions;
};

export default useMousePosition;
```

其他完整：

```jsx
import React, { useState, useEffect, useMemo } from "react";
export default function CustomHookPage(props) {
	// 定义一个叫count的state变量，初始化为0
	const [count, setCount] = useState(0);
	// 和didMount、didUpdate类似
	useEffect(() => {
		console.log("count effect");
		// 只需要在count发生改变的时候执行就可以啦
		document.title = `点击了${count}次`;
	}, [count]);
	return (
		<div>
			<h3>自定义Hook</h3>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>add</button>
			<p>{useClock().toLocaleTimeString()}</p>
		</div>
	);
}
// 自定义hook，命名必须以use开头
function useClock() {
	const [date, setDate] = useState(new Date());
	useEffect(() => {
		console.log("date effect");
		// 只需要在didMount时候执行就可以了
		const timer = setInterval(() => {
			setDate(new Date());
		}, 1000);
		// 清除定时器，类似willUnmount
		return () => clearInterval(timer);
	}, []);
	return date;
}
```

#### 4.**Hook** 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件** 中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中。）

#### 5.Hook API 之 useMemo 与 useCallback

文档：[Built-in React Hooks – React](https://react.dev/reference/react)

**useMemo**：

把“创建”函数和依赖项数组作为参数传入 useMemo ，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```jsx
import React, { useState, useMemo } from "react";
export default function UseMemoPage(props) {
	const [count, setCount] = useState(0);
	const expensive = useMemo(() => {
		console.log("compute");
		let sum = 0;
		for (let i = 0; i < count; i++) {
			sum += i;
		}
		return sum;
		//只有count变化，这里才重新执行
	}, [count]);
	const [value, setValue] = useState("");
	return (
		<div>
			<h3>UseMemoPage</h3>
			<p>expensive:{expensive}</p>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>add</button>
			<input value={value} onChange={(event) => setValue(event.target.value)} />
		</div>
	);
}
```

**useCallback**：

把内联回调函数及依赖项数组作为参数传入 useCallback ，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate ）的子组件时，它将非常有用。

```jsx
import React, { useState, useCallback, PureComponent } from "react";
export default function UseCallbackPage(props) {
	const [count, setCount] = useState(0);
	const addClick = useCallback(() => {
		let sum = 0;
		for (let i = 0; i < count; i++) {
			sum += i;
		}
		return sum;
	}, [count]);
	const [value, setValue] = useState("");
	return (
		<div>
			<h3>UseCallbackPage</h3>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>add</button>
			<input value={value} onChange={(event) => setValue(event.target.value)} />
			<Child addClick={addClick} />
		</div>
	);
}
class Child extends PureComponent {
	render() {
		console.log("child render");
		const { addClick } = this.props;
		return (
			<div>
				<h3>Child</h3>
				<button onClick={() => console.log(addClick())}>add</button>
			</div>
		);
	}
}
```

useCallback(fn, deps) 相当于 useMemo(() => fn, deps) 。

> 注意
>
> 依赖项数组不会作为参数传给“创建”函数。虽然从概念上来说它表现为：所有“创建”函数中引用的
>
> 值都应该出现在依赖项数组中。未来编译器会更加智能，届时自动创建数组将成为可能。

### 4.Fragment 组件

#### 1.作用

- 可以不用必须有一个真实的 DOM 根标签了
- div 包裹组件的层级不用这么多

#### 2.引入

```jsx
import React, { Component, Fragment } from "react";
```

#### 3.使用

```jsx
// 可以指定key属性
<Fragment key={1}><Fragment>
// 不可以指定属性
<></>
```

### 5.Context：祖组件与后代组件通信

#### 1.理解

一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

#### 2.使用祖组件与后代组件通信

0.引入

```jsx
import React from "react";
```

1.创建 Context 容器对象：

```jsx
const XxxContext = React.createContext();
```

2.渲染子组时，外面包裹 xxxContext.Provider, 通过 value 属性给后代组件传递数据：

```jsx
<xxxContext.Provider value={数据}>子组件</xxxContext.Provider>
```

1. 后代组件读取数据：(两种方式)

1、类组件 声明

```jsx
static contextType = xxxContext
声明接收context
{this.context}
```

2、函数组件与类组件都可以

```jsx
function(){
    return(
      <div>
        <xxxContext.Consumer>
            {
               value => (
                  // value就是context中的value数据 要显示的内容
                  return `名字是：${value.username}`
               )
             }
        </xxxContext.Consumer>
      </div>
    )
}
```

#### 3.注意

在应用开发中一般不用 context, 一般都用它的封装 react 插件

### 6.组件优化

- 1.Component 的 2 个问题

  - 1.只要执行 setState(),即使不改变状态数据, 组件也会重新 render() ==> 效率低
  - 2.只当前组件重新 render(), 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

- 2.效率高的做法：只有当组件的 state 或 props 数据发生改变时才重新 render()

- 3.原因：Component 中的 shouldComponentUpdate()总是返回 true

- 4.解决：

  - 办法 1:

  - 重写 shouldComponentUpdate()方法，比较新旧 state 或 props 数据, 如果有变化才返回 true, 如果没有返回 false

  - 例子：

  - ```jsx
    shouldComponentUpdate(nextProps,nextState){
      console.log(this.props,this.state) // 现在的目标
      console.log(nextProps,nextState)// 接下来要变化的
      // if(this.state.name === nextState.name) return false
      // else return true
      // 简化上面的注释写法
      return !this.state.name === nextState.name
    }
    ```

  - 办法 2：使用 PureComponent

  - 1.引入：`import React, { PureComponent } from 'react'`

  - 2.使用：子组件或者父组件类继承的时候写

  - ```jsx
    export default class Parent extends PureComponent {
    
    }
    // 或者
    export default class children extends PureComponent {
    
    }
    ```

  - PureComponent 重写了 shouldComponentUpdate(), 只有 state 或 props 数据有变化才返回 true

  - 注意:

  - 只是进行 state 和 props 数据的浅比较, 如果只是数据对象内部数据变了, 返回 false

  - 不要直接修改 state 数据, 而是要产生新数据

  - 项目中一般使用 PureComponent 来优化

  - 使用了 PureComponent 后 setState 不能这样写

    - ```jsx
      const obj = this.state
      obj.name = ‘老王’
      this.setState(obj)
      ```

    - ```jsx
      const { name } = this.state;
      name.unshift("小刘");
      this.setState({ name });
      // 对的写法
      const { name } = this.state;
      this.setState({ name: ["小刘", ...name] });
      ```

    - 这两种 样子 写设置状态 都不会更新

### 7.render props

如何向组件内部动态传入带内容的结构(标签)?

- 1.使用 children props: 通过组件标签体传入结构
- 2.使用 render props: 通过组件标签属性传入结构,而且可以携带数据，一般用 render 函数属性

方法 1：children props

```jsx
<A>
	<B>xxxx</B>
</A>;
{
	this.props.children;
}
```

问题: 如果 B 组件需要 A 组件内的数据, ==> 做不到

**方法 2：render props**：

- 祖组件：`<A render={(data) => <C data={data}></C>}></A>`
- A 组件: 传给数据给子组件 C：`{this.props.render(data)}`
- C 组件: 读取父组件 A 传入的数据显示：`{this.props.data}`
- 优势：编码更灵活
  - A 组件可以预留 `{this.props.render(data)}` ----更灵活可以传其他组件
  - 类似于 Vue 的 slot 插槽技术

### 8.错误边界

#### 理解

- 后端接口返回 undefined 或出错
- 错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

#### 特点

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

#### 使用方式

在父组件使用 getDerivedStateFromError 配合 componentDidCatch

```jsx
state = {
  hasError:''
}
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: error,
    };
}
// 子组件 调用
{this.state.hasError ? <h2>出错了</h2> : <Child/>}

// 或者使用
componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台
    console.log(error, info);
}
```

### 9.组件通信方式总结

- 组件间的关系：
  - 父子组件
  - 兄弟组件（非嵌套组件）
  - 祖孙组件（跨级组件）
- 几种通信方式：
  - 1.props：
    - (1).children props
    - (2).render props
  - 2.消息订阅-发布：
    - pubs-sub、event 等等
  - 3.集中式管理：
    - redux、dva 等等
  - 4.conText:
    - 生产者-消费者模式
- 比较好的搭配方式：
  - 父子组件：
    - props
  - 兄弟组件：
    - 消息订阅-发布
    - 集中式管理
  - 祖孙组件(跨级组件)：
    - 消息订阅-发布
    - 集中式管理
    - conText(开发用的少，封装插件用的多)

### 10.React Suspense

## 七、UI 组件库

### Ant-Design(蚂蚁金服)

#### 网站

1.官网：<https://ant.design/index-cn>

2.Github：<https://github.com/ant-design/ant-design/>

基本使用：<https://ant.design/docs/react/use-with-create-react-app-cn>

### material-ui(国外)

#### material-ui 网站

1.官网：<http://www.material-ui.com/#/>
2.github：<https://github.com/callemall/material-ui>

### element -React

#### element -React 网站

1.官网：<https://elemefe.github.io/element-react/index>
2.GitHub：<https://link.zhihu.com/?target=https%3A//github.com/eleme/element-react>

## 八、项目打包和本地运行

1.编译打包 react 项目，生成 build 文件夹和编译好的文件

```bash
npm run build
```

2.全局安装服务器

```bash
npm i -g serve
```

3.在项目当前根目录下基于服务器运行

```bash
server build
```

以 build 文件夹在服务器中运行
