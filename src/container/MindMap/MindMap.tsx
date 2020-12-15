import React, {useMemo} from "react";

import remark from "remark";
import {ASTNode, Markdown, MarkdownDepth, MarkdownHeading, MindNodeItem} from "../../model";
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
                "表示 root 存在需要被调用「回调」的 useEffect",
              ],
            },
            // {
            //   title: "并注册异步任务",
            //   callout: [
            //     "等 commit 阶段结束",
            //     "异步执行 flushPassiveEffects 函数",
            //   ],
            // }
          ]
        },
      ],
    },
    {
      title: "mutation"
    },
  ]
}];

let buildProgressIndex = 0;

const buildMindNodes = (depth: number, node: ASTNode) => {
  const currLevel: MindNodeItem[] = [];

  const mindNode: MindNodeItem = {
    title: node.children,
  };

  switch (node.type) {
    case Markdown.Heading:
      if (node.depth <= depth) {
        currLevel.push(node);
      } else {
        mindNode.children = buildMindNodes(node.depth, node);
      }
      break;
    case Markdown.Blockquote:
      if (!mindNode.callout) {
        mindNode.callout = [];
      }
      mindNode.callout.push(node.children)
      break;
    default:
      break;
  }

  return currLevel;
}

const renderMindMap = (nodes: any[], hasParent?: boolean, isRoot?: boolean) => {
  return nodes.map((node: any, index: number) => {
    const classNames = {
      "root-node": isRoot,
    }

    if (nodes.length > 1) {
      Object.assign(classNames, {
        "first-child": index === 0,
        "last-child": index === nodes.length - 1,
      })
    }

    return (
      <MindNode
        key={node.title}
        hasParent={hasParent}
        title={node.title}
        callout={node.callout}
        className={classNames}
      >
        {node.children && renderMindMap(node.children, true)}
      </MindNode>
    )
  })
}

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

  buildMindNodes(
    (allMarkdownNodes[firstHeadingNodeIndex] as MarkdownHeading).depth,
    allMarkdownNodes[firstHeadingNodeIndex]
  )
  // const mindNode

  for (let i = firstHeadingNodeIndex; i < allMarkdownNodes.length; i++) {

  }

  // <MindNode key={`${currDepth}-${node.children.map(i => i.value)}`} title={node.children}/>

  console.log(allMarkdownNodes)

  return <div>
    {renderMindMap(mindnode, false, true)}
  </div>
}

export default MindMap;
