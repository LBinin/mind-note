import React, {useMemo} from "react";

import remark from "remark";
import {buildMindNodes} from "../../utils";
import MindNode from "../../components/MindNode/MindNode";
import {ASTNode, Markdown, MindNodeItem} from "../../model";

const renderMindMap = (nodes: MindNodeItem[], hasParent?: boolean, isRoot?: boolean) => {
  return nodes.map((node: MindNodeItem, index: number) => {
    const classNames = {
      "root-node": isRoot,
      // "rainbow": isRoot,
    }

    if (nodes.length > 1) {
      Object.assign(classNames, {
        "first-child": index === 0,
        "last-child": index === nodes.length - 1,
      })
    }

    if (!node.title) {
      return null;
    }

    return (
      <MindNode
        key={index}
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


  const firstHeadingNodeIndex = allMarkdownNodes

  const dataSource = buildMindNodes(allMarkdownNodes)

  return <div>
    {dataSource && renderMindMap(dataSource, false, true)}
  </div>
}

export default MindMap;
