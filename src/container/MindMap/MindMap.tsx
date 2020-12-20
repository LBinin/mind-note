import remark from "remark";
import React, {useMemo} from "react";
import {buildMindNodes} from "../../utils";
import {ASTNode, MindNodeItem} from "../../model";
import MindNode from "../../components/MindNode/MindNode";

const renderMindMap = (nodes: MindNodeItem[], hasParent?: boolean, isRoot?: boolean) => {
  return nodes.map((node: MindNodeItem, index: number) => {
    if (!node.title) { return null; }

    const classNames = nodes.length > 1 ? {
      "first-child": index === 0,
      "last-child": index === nodes.length - 1,
    } : undefined;

    return (
      <MindNode
        key={index}
        hasParent={hasParent}
        title={node.title}
        callout={node.callout}
        className={classNames}
        isRoot={isRoot}
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

  const dataSource = buildMindNodes(allMarkdownNodes)

  return <>
    <div className="mind-map-container">
      {dataSource && renderMindMap(dataSource, false, true)}
    </div>
  </>
}

export default MindMap;
