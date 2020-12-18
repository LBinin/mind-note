import remark from "remark";
import {buildMindNodes} from "../../utils";
import React, {useMemo, useRef} from "react";
import {ASTNode, MindNodeItem} from "../../model";
import MindNode from "../../components/MindNode/MindNode";
import ScreenshotCaptureModal from "../../components/ScreenshotCapture/ScreenshotCaptureModal";

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

  const mapRef = useRef<HTMLDivElement>(null);

  const allMarkdownNodes = useMemo<ASTNode[]>(
    () => markdown ? (remark().parse(markdown).children as ASTNode[]) : [],
    [markdown]
  );

  if (allMarkdownNodes.length === 0) {
    return null
  }

  const dataSource = buildMindNodes(allMarkdownNodes)

  return <>
    {dataSource && (
      <ScreenshotCaptureModal dataSource={dataSource} container={mapRef}/>
    )}

    <div className="mind-map-container" ref={mapRef}>
      {dataSource && renderMindMap(dataSource, false, true)}
    </div>
  </>
}

export default MindMap;
