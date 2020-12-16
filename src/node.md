> commit 阶段开始于 commitRoot

# commitRoot(root)
> commit 阶段开始于 commitRoot
> 遍历这条链表进行相应的「操作」（mutation）

## before mutation
> 执行 `commitBeforeMutationEffects`

## mutation
> 执行 `commitMutationEffects`

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
> 主要操作：
> Placement | Update | Deletion | Hydrating
> 具体的实现有宿主环境提供

### DOM 插入操作 **`commitPlacement`**
> 对 flag 包含 **Placement** 的 Fiber


#### 1. 寻找最近的父级 Host 节点：`parentDOM`

#### 2. 寻找 Host 类型的兄弟节点：`siblingDOM`
> 这里复杂体现在查询可能是「**跨层级**」

#### 3. 插入文档
> 在 ReactDOM 中实现，调用 JSAPI：
> `parentDOM.appendChild(childDOM)`
> `parentDOM.insertBefore(childDOM, siblingDOM)`

#### 4. 移除 **Placement** flag
> `nextEffect.flags &= ~Placement`

### DOM 更新操作 **`commitWork`**
> 对 flag 包含 **Update** 的 Fiber

#### 函数类组件

##### 执行所有 `useLayoutEffect` 的销毁函数
> 执行 `commitHookEffectListUnmount`

##### ❓ **为什么**要先执行所有销毁函数？
> 多个组件间可能「共用」同一个 `ref`。

#### Host 组件
