# commitRoot(root)
> commit 阶段开始于 commitRoot
> 遍历这条链表进行相应的「操作」（mutation）

## **before mutation** 阶段
> 执行 `commitBeforeMutationEffects`

## **mutation** 阶段
> 执行 `commitMutationEffects`

## 双缓存机制 —— 切换 Fiber 树
> `root.current = finishedWork;`

### 「workInProgress Fiber 树」 转变为 「current Fiber 树」

### ❓ 为什么要在 mutation 和 layout 阶段之间执行？
> mutation 阶段调用的 `componentWillUnmount` 和
> layout 阶段调用的 `componentDidMount/componentDidUpdate`
> 其中对应的 Fiber 树需要是不同的 Fiber 树。

## **layout** 阶段
> 执行 `commitLayoutEffects`

---

# 函数与文件结构

## react-reconciler

### **ReactFiberWorkLoop.js**
> 事件循环相关工作

#### **`commitBeforeMutationEffects`**
> before mutation 阶段

#### **`commitMutationEffects`**
> mutation 阶段

#### **`commitLayoutEffects`**
> layout 阶段

### **ReactFiberCommitWork.js**
> 对 DOM 进行更新
> 具体的实现位于 `ReactDOMHostConfig.js`

#### **`commitPlacement`**
> 对 flag 包含 **Placement** 的 Fiber
> 执行 DOM **插入**操作。

#### **`commitWork`**
> 对 flag 包含 **Update** 的 Fiber
> 执行 DOM **更新**操作。

##### **`commitHookEffectListUnmount`**
> 函数组件执行所有 Effect 的**销毁函数**

#### **`commitDeletion`**
> 对 flag 包含 **Deletion** 的 Fiber
> 执行 DOM **删除**操作。

#### **`commitLifeCycles`**
> layout 阶段执行的重要操作

##### **`commitHookEffectListMount`**
> 函数组件执行所有 Effect 的**回调函数**

## react-dom

### **ReactDOMHostConfig.js**
> ReactDOM 渲染器与 Host 组件的接口配置

#### **`commitUpdate`**
> 接受 `updatePayload`
> 其中包含需要变更的 Props
> 最终传递给 `updateDOMProperties`

### **ReactDOMComponent.js**
> 对 DOM 执行具体的操作

#### **`updateProperties`**
> 调用 `updateDOMProperties`
> 处理特定表单节点

#### **`updateDOMProperties`**
> 对 DOM 的属性进行更新

##### **`setValueForStyles`**
> 设置 style
> 处理自定义属性、添加 `px` 单位等

##### **`setInnerHTML`**
> 设置 HTML 内容（SVG 特殊处理）
> key 为 `dangerouslySetInnerHTML`

##### **`setTextContent`**
> 设置文本内容
> 只对唯一的文本子节点生效

##### **`setValueForProperty`**
> 设置 DOM 属性
> 使用 `setAttribute` 和 `removeAttribute` API


---

# before mutation

## 调用 `getSnapshotBeforeUpdate` 生命周期

> 此时还没有产生页面上可见的**更新**
> 同步进行，目的是为了保证只执行一次

## 调度 `useEffect`
> 如果存在 flag 为 **Passive** 的 Fiber

### 告诉 root 做好清洗 Effects 的准备
> `rootDoesHavePassiveEffects` 置真
> 表示：root 存在需要被调用「回调」的 useEffect

### 注册异步任务
> 等待 commit 阶段结束后，
> 异步执行 `flushPassiveEffects` 函数

# mutation

## 重置文本节点
> 对应 flag 包含 **ContentReset** 的 Fiber

## 「**解绑**」或者「**更新**」Ref

## 执行操作 Mutation
> 处理以下 flags：
> Placement | Update | Deletion | Hydrating
> 最后具体的 mutation 操作，由宿主环境提供
> 这里我们用的渲染器是 **ReactDOM**（宿主环境）

### **Placement**：DOM 插入操作
> 执行 `commitPlacement`

#### 1. 寻找最近的父级 Host 节点：`parentDOM`

#### 2. 寻找 Host 类型的兄弟节点：`siblingDOM`
> 这里复杂体现在查询可能是「**跨层级**」

#### 3. 插入文档
> 在 ReactDOM 中实现，调用 JSAPI：
> `parentDOM.appendChild(childDOM)`
> `parentDOM.insertBefore(childDOM, siblingDOM)`

#### 4. 移除 **Placement** flag
> `nextEffect.flags &= ~Placement`

### **Update**：DOM 更新操作
> 执行 `commitWork`

#### 函数类组件

##### 执行所有 `useLayoutEffect` 的销毁函数
> 针对 HookLayout | HookHasEffect
> 执行 `commitHookEffectListUnmount`

##### ❓ **为什么**要先执行所有销毁函数？
> 多个组件间可能「共用」同一个 `ref`

#### Host 组件

##### 更新 DOM 属性
> 从 Fiber 上拿到 `updateQueue`（需要更新的 Props）
> 调用 `updateProperties` 进行更新；
> `updateQueue` 是在 render 阶段构建的，
> 也就是的「归」（`completeWork`）的过程中

### **Deletion**：DOM 删除操作
> 执行 `commitDeletion`

#### 1. 寻找父节点
> 利用 `.return` 属性和 `.stateNode`
> 向上递归寻找 Host 类型的父节点

#### 2. 递归卸载 Fiber 节点
> 目标 Fiber 节点可能是一颗 Fiber 树
> 需要递归卸载（`commitNestedUnmounts`）其子孙 Fiber 节点
> 卸载调用的是 `commitUnmount` 方法

##### 函数组件
> 注册需要卸载的 Effect 的「**销毁函数**」
> 执行 `enqueuePendingPassiveHookEffectUnmount`

##### 类组件
> 执行 `safelyDetachRef`，为其解绑 ref 属性；
> 调用 **`componentWillUnmount`** 生命周期

##### Host 组件
> 执行 `safelyDetachRef`，为其解绑 ref 属性；

#### 3. 移除节点
> 在 ReactDOM 中实现，调用 JSAPI：
> `container.removeChild(child)`
