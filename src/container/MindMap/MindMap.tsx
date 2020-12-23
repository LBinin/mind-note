import {Card, Divider, Space} from "antd";
import remark from "remark";
import React, {useMemo} from "react";
import {buildMindNodes} from "../../utils";
import {ASTNode, MindNodeItem} from "../../model";
import MindNode from "../../components/MindNode/MindNode";

import "./MindMap.less";
import MindMapToolbar from "./MindMapToolbar/MindMapToolbar";
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
  markdown?: string;
  modifiedTime?: Date;
}> = props => {
  const {markdown, modifiedTime} = props;

  const allMarkdownNodes = useMemo<ASTNode[]>(
    () => markdown ? (remark().parse(markdown).children as ASTNode[]) : [],
    [markdown]
  );

  const dataSource = buildMindNodes(allMarkdownNodes)

  return (
    <Card title={<><Iconfont type="icon-mind-map"/> 脑图预览</>} key="mindMap" className="mind-map-card" size="small" extra={<MindMapToolbar saveTime={modifiedTime}/>}>
      <Space direction="vertical" className="mind-map-container" split={<Divider/>}>
        {dataSource && renderMindMap(dataSource, false, true)}
      </Space>
    </Card>
  )
}

export default MindMap;
