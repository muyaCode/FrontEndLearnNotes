# Svelte 简介和相关网站

## Svelte 简介

Svelte 是一个相对较新的前端框架，由 Rich Harris 创建并由一个志愿者团队维护。

Svelte 与传统的 JavaScript 框架（如 React 和 Vue）有着显著的不同，主要体现在它的工作方式和性能优化上。

Svelte 作为一个编译器，将大部分工作在构建阶段完成，而不是在浏览器中，这种方法减少了运行时的 JavaScript 执行量，从而提高了应用的性能。

Svelte 是一个现代的前端框架，它与传统的框架如 React 或 Vue 不同，因为它在构建时将应用程序编译成高效的 JavaScript 代码。这种方法意味着没有运行时框架的开销，可以生成更小、更快的 Web 应用程序。Svelte 的组件是声明式编写的，结合了标记、样式和行为，最终被编译成精简的 JavaScript 模块。

Svelte 的主要特点包括：

- **编译时优化**：Svelte 在构建过程中进行编译，生成最小化的代码，减少了浏览器的工作量。
- **无需虚拟 DOM**：Svelte 直接更新 DOM，避免了虚拟 DOM 带来的额外开销。
- **易于上手**：Svelte 的语法简洁，学习曲线平缓，使得开发者可以快速上手。
- **响应式编程**：Svelte 的响应式系统简单而强大，允许自动更新 UI 以响应状态变化。

Svelte 也支持 TypeScript，并且可以逐步引入到现有的代码库中，或者作为独立组件发布。

适合人群：

- 您希望学习一个简单易上手的框架
- 追求简洁且代码执行速度快的开发体验

**Svelte 是另一个尝试通过尽可能直接和初学者友好的方式来简化和加速 Web 开发的框架。它是一个很容易学习的框架，因为要使一个属性具有响应性，您只需声明它并在 HTML 模板中使用它。** 每当在 JavaScript 中程序化地更新值时（例如，通过触发 onClick 事件按钮），它将在 UI 上反映出来，反之亦然。

Svelte 的下一步将是引入 runes。runes 将是 Svelte 处理响应性的方式，使处理大型应用程序变得更加容易。类似于 Solid.js 的信号，符文通过使用类似函数的语句提供了一种直接访问应用程序响应性状态的方式。与 Svelte 当前的工作方式相比，它们将允许用户精确定义整个脚本中哪些部分是响应性的，从而使组件更加高效。类似于 Solid 和 Solid Start，Svelte 也有其自己的框架，称为 SvelteKit。SvelteKit 为用户提供了一种快速启动其由 Vite 驱动的 Svelte 应用程序的方式。它提供了路由器、构建优化、不同的渲染和预渲染方式、图像优化等功能。

## 相关网站

开源地址：https://github.com/sveltejs/svelte.git

官网：https://svelte.dev/

sveltejs 精简版实现：https://github.com/sveltejs/kit
