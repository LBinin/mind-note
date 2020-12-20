import {Card} from "antd";
import remark from "remark";
import React, {useMemo} from "react";
import {buildMindNodes} from "../../utils";
import {ASTNode, MindNodeItem} from "../../model";
import MindNode from "../../components/MindNode/MindNode";

import "./MindMap.less";
import ScreenshotCaptureBtn from "../../components/ScreenshotCapture/ScreenshotCaptureBtn";
import MindMapToolbar, {ConfigKey} from "./MindMapToolbar/MindMapToolbar";
import Iconfont from "../../components/Iconfont/Iconfont";

const renderMindMap = (nodes: MindNodeItem[], hasParent?: boolean, isRoot?: boolean) => {
  return nodes.map((node: MindNodeItem, index: number) => {
    if (!node.title) {
      return null;
    }

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

  const toolbar = <MindMapToolbar/>

  return (
    <Card title={<><Iconfont type="icon-mind-map"/> 脑图预览</>} key="mindMap" className="mind-map-container" size="small" extra={toolbar}>
      {dataSource && renderMindMap(dataSource, false, true)}
    </Card>
  )
}

export default MindMap;
