import React, {useMemo} from "react";

import remark from "remark";
import {ASTNode, Markdown, MarkdownDepth} from "../../model";
import MindNode from "../../components/MindNode/MindNode";

const mindnode = [{
  title: "commitRoot(root)",
  callout: [
    "commit 阶段开始于 commitRoot",
    "遍历这条链表进行相应的「操作」（mutation）"
  ],
  children: [
    {
      title: "before mutation",
      children: [
        {
          title: "调用 `getSnapshotBeforeUpdate` 生命周期",
          callout: [
            "此时还没有产生页面上可见的**更新**",
            "同步进行，目的是为了保证只执行一次",
          ]
        },
        {
          title: "调度 `useEffect`",
          callout: [
            "如果存在 flag 为 Passive 的 Fiber",
          ],
          children: [
            {
              title: "告诉 root 做好清洗 Effects 的准备",
              callout: [
                "rootDoesHavePassiveEffects 置真",
                "表示 root 存在需要被调用「回调」的 useEffect"
              ],
            },
            {
              title: "并注册异步任务",
              callout: [
                "等 commit 阶段结束",
                "异步执行 flushPassiveEffects 函数",
              ],
            }
          ]
        },
      ],
    },
    {
      title: "mutation"
    }
  ]
}];

const MindMap: React.FC<{
  markdown: string;
}> = props => {
  const {markdown} = props;

  const allMarkdownNodes = useMemo<ASTNode[]>(
    () => markdown ? (remark().parse(markdown).children as ASTNode[]) : [],
    [markdown]
  );

  if (allMarkdownNodes.length === 0) {
    return null
  }

  const firstHeadingNodeIndex = allMarkdownNodes.findIndex(i => i.type === Markdown.Heading);

  // <MindNode key={`${currDepth}-${node.children.map(i => i.value)}`} title={node.children}/>

  console.log(allMarkdownNodes)
  // const generateNode = node => {
  //
  // };

  // const mapNodes = firstHeadingNode && resolveMarkdownNodeToMindNodes(
  //   1,
  //   firstHeadingNodeIndex,
  //   allMarkdownNodes[firstHeadingNodeIndex]
  // );

  // console.log(mapNodes)

  const renderMindMap = (nodes: any[]) => {
    return nodes.map((node: any) => (
      <MindNode title={node.title} callout={node.callout}>
        {node.children && renderMindMap(node.children)}
      </MindNode>
    ))
  }

  return <div>
    {renderMindMap(mindnode)}
    {/*{firstHeadingNode && resolveMarkdownNodeToMindNodes(1, firstHeadingNode)}*/}
  </div>
}

export default MindMap;
