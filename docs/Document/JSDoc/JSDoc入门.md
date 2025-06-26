# JSDoc入门

涵盖常见的 JSDoc 注释用法和场景，例如描述函数、参数、返回值等。同时，也提供一些高级示例，展示如何利用 JSDoc 注释来描述复杂的数据结构、异步函数、类等。通过这些示例，开发者可以更好地了解如何在他们的代码中使用 JSDoc 注释，并根据需要进行定制和扩展。

## 基本用法示例

### 描述函数：展示如何使用 JSDoc 注释来描述函数的用途、参数和返回值。

```js
/**
 * 计算两个数字的和
 * @param {number} a 第一个数字
 * @param {number} b 第二个数字
 * @returns {number} 两个数字的和
 */
function add(a, b) {
    return a + b;
}
```

### 描述参数：示范如何使用 JSDoc 注释来描述函数参数的类型、名称和含义。

```js
/**
 * 计算两个数字的乘积
 * @param {number} num1 第一个数字
 * @param {number} num2 第二个数字
 * @returns {number} 两个数字的乘积
 */
function multiply(num1, num2) {
    return num1 * num2;
}
```

### 描述返回值：展示如何使用 JSDoc 注释来描述函数的返回值类型和含义。

```js
/**
 * 生成一个随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 生成的随机整数
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

### 描述变量：演示如何使用 JSDoc 注释来描述变量的类型和用途。

```js
/**
 * @type {number}
 * @description 默认年龄
 */
let defaultAge = 18;
```

## 高级用法示例

### 描述复杂数据结构：展示如何使用 JSDoc 注释来描述复杂的数据结构，包括对象、数组等。

```js
/**
 * 用户信息对象
 * @typedef {Object} UserInfo
 * @property {string} name 用户名
 * @property {number} age 用户年龄
 * @property {string} email 用户邮箱
 */

/**
 * 订单对象
 * @typedef {Object} Order
 * @property {number} orderId 订单ID
 * @property {string} productName 产品名称
 * @property {number} quantity 数量
 * @property {number} price 单价
 * @property {UserInfo} customerInfo 客户信息
 */

// 示例用法
/**
 * 获取订单总金额
 * @param {Order[]} orders 订单列表
 * @returns {number} 订单总金额
 */
function getTotalAmount(orders) {
    return orders.reduce((total, order) => total + order.quantity * order.price, 0);
}
```

### 描述异步函数：示范如何使用 JSDoc 注释来描述异步函数的参数和返回值，以及异步操作的含义。

```js
/**
 * 模拟从服务器获取用户信息的异步操作
 * @async
 * @function getUserInfo
 * @param {string} userId 用户ID
 * @returns {Promise<UserInfo>} 包含用户信息的 Promise 对象
 */
async function getUserInfo(userId) {
    // 模拟异步操作
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟从服务器获取用户信息
            const userInfo = { name: 'Alice', age: 30, email: 'alice@example.com' };
            resolve(userInfo);
        }, 1000);
    });
}
```

### 描述类和方法：演示如何使用 JSDoc 注释来描述类和类的方法，包括构造函数、成员方法等。

```js
/**
 * 表示一个矩形的类
 * @class
 */
class Rectangle {
    /**
     * 创建一个矩形对象
     * @constructor
     * @param {number} width 矩形的宽度
     * @param {number} height 矩形的高度
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * 计算矩形的面积
     * @method
     * @returns {number} 矩形的面积
     */
    calculateArea() {
        return this.width * this.height;
    }
}
```

### 复杂函数注释

定义一个函数 export const getIcons = () => {};

返回如下数据

```js
const newData = {
  "probeIconList": [
    {
      "createTime": "2024-02-27 10:00:00",
      "createUserId": "1",
      "delFlag": 0,
      "format": "svg",
      "icon": "probe-new",
      "id": "123",
      "name": "New Probe",
      "size": "20.5",
      "type": 2,
      "updateTime": "2024-02-27 10:00:00",
      "updateUserId": "1",
      "url": "http://example.com/new_probe.svg"
    }
  ],
  "topologyIconList": [
    {
      "createTime": "2024-02-27 10:00:00",
      "createUserId": "1",
      "delFlag": 0,
      "format": "svg",
      "icon": "new-topology",
      "id": "456",
      "name": "New Topology",
      "size": "10.2",
      "type": 1,
      "updateTime": "2024-02-27 10:00:00",
      "updateUserId": "1",
      "url": "http://example.com/new_topology.svg"
    }
  ]
};
```

注释写法

```js
/**
 * 图标信息
 * @typedef {Object} IconInfo
 * @property {string} createTime - 创建时间
 * @property {string} createUserId - 创建用户ID
 * @property {number} delFlag - 删除标志
 * @property {string} format - 格式
 * @property {string} icon - 图标
 * @property {string} id - ID
 * @property {string} name - 名称
 * @property {string} size - 大小
 * @property {number} type - 类型
 * @property {string} updateTime - 更新时间
 * @property {string} updateUserId - 更新用户ID
 * @property {string} url - URL
 */

/**
 * 图标列表对象
 * @typedef {Object} IconListObject
 * @property {IconInfo[]} probeIconList - 探针图标列表
 * @property {IconInfo[]} topologyIconList - 拓扑图标列表
 */

/**
 * 获取图标列表对象
 * @returns {IconListObject} 包含探针图标列表和拓扑图标列表的对象
 */
export const getIcons = () => {};
```

## 定制扩展

1. 定制和扩展 JSDoc 注释：
   - 根据项目的实际需求，你可以定制和扩展 JSDoc 注释，以满足特定的文档化和类型提示需求。
   - 可以定义项目内部的 JSDoc 注释规范和约定，以确保所有开发者都遵循相同的标准。
   - 可以根据需要创建自定义的 JSDoc 注释标签，以提供额外的元数据信息，如作者、版本、更新日期等。
2. JSDoc 标签的自定义和扩展：
   - JSDoc 允许开发者自定义和扩展标签，以适应特定的项目需求。
   - 可以使用 `@typedef` 标签定义自定义类型，以描述复杂的数据结构。
   - 可以使用 `@callback` 标签定义回调函数类型，以描述函数的回调参数和返回值。
   - 可以使用 `@template` 标签定义泛型类型参数，以提供更灵活的类型定义。
3. 与其他工具和框架集成：
   - JSDoc 可以与许多其他工具和框架集成，以提供更全面的文档化和类型提示支持。
   - 可以使用 JSDoc 插件或工具，如 JSDoc Toolkit、jsdoc-to-markdown 等，将 JSDoc 注释转换为其他格式的文档，如 Markdown、HTML 等。
   - 对于特定的框架或库，如 Node.js、React、Vue.js 等，可以使用相应的 JSDoc 插件或扩展，以提供针对性的文档化和类型提示支持。

## 结语

本文介绍了 JSDoc 注释的基本用法和高级用法示例，包括描述函数、参数、返回值、变量、复杂数据结构、异步函数、类和方法等。通过 JSDoc 注释，开发者可以为 JavaScript 代码提供详细的文档和类型提示，提高代码的可读性和可维护性。JSDoc 注释不仅可以用于生成文档，还可以在编辑器中提供代码提示和类型检查，使开发者更加高效地编写代码。

在实际项目中，定制和扩展 JSDoc 注释可以根据特定需求提供更灵活和强大的文档化和类型提示支持。通过定义项目内部的 JSDoc 注释规范和约定，以及与其他工具和框架的集成，开发者可以更好地管理和维护代码，促进团队合作和共同成长。