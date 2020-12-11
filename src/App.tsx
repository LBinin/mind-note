import React from 'react';
import MindMap from "./container/MindMap/MindMap";
import NoteTOC from "./container/NoteTOC/NoteTOC";

function App() {
  const dataSource = `
# commitRoot(root)
> commit 阶段开始于 commitRoot
> 遍历这条链表进行相应的「操作」（mutation）

## before mutation

### 调用 \`getSnapshotBeforeUpdate\` 生命周期

> 此时还没有产生页面上可见的**更新**
> 同步进行，目的是为了保证只执行一次

### 调度 \`useEffect\`
> 如果存在 flag 为 Passive 的 Fiber

#### 告诉 root 做好清洗 Effects 的准备
> rootDoesHavePassiveEffects 置真
> 表示 root 存在需要被调用「回调」的 useEffect

#### 并注册异步任务
> 等 commit 阶段结束
> 异步执行 flushPassiveEffects 函数

## mutation
  `
  return (
    <div>
      <MindMap markdown={dataSource}/>
      <NoteTOC/>
    </div>
  );
}

export default App;
