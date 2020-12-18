import React, {useMemo, useRef} from "react";

import remark from "remark";
import {buildMindNodes} from "../../utils";
import {ASTNode, MindNodeItem} from "../../model";
import MindNode from "../../components/MindNode/MindNode";
import html2canvas from "html2canvas";

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

  const currTarget = useRef<HTMLDivElement>(null);

  const allMarkdownNodes = useMemo<ASTNode[]>(
    () => markdown ? (remark().parse(markdown).children as ASTNode[]) : [],
    [markdown]
  );

  if (allMarkdownNodes.length === 0) {
    return null
  }

  const dataSource = buildMindNodes(allMarkdownNodes)

  const handleTakeScreenshots = () => {
    if (!currTarget.current) {
      return;
    }

    const target = currTarget.current
    html2canvas(target).then(canvas => {
      document.body.parentElement!.appendChild(canvas);
      // setCanvas(canvas)
    })
  }

  return <div ref={currTarget}>
    {dataSource && renderMindMap(dataSource, false, true, )}
    <button onClick={handleTakeScreenshots}>screen shots</button>
  </div>
}

export default MindMap;
