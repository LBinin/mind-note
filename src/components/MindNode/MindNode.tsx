import React, {useState} from "react";
import classNames from "classnames";
import {BlockquoteContent, HeadingContent} from "../../model";
import {resolveCallout, resolveTitle} from "../../utils/MindNodeResolver";

import "./MindNode.less";

const MindNode: React.FC<{
  title: HeadingContent[];
  callout?: BlockquoteContent[];
  className?: any;
  hasParent?: boolean;
}> = props => {
  const {title, callout, className, children} = props;

  const [collapse, setCollapse] = useState<boolean>(false);

  const childrenCount = React.Children.count(children);

  const mindNodeClassString = classNames("mind-node", className, {
    "single-child": childrenCount === 1,
    collapsed: collapse && childrenCount > 0,
  });

  const handleCollapseNode = (e: any) => {
    setCollapse(v => !v);
    e.stopPropagation();
  }

  return (
    <div className={mindNodeClassString}>

      <div className="mind-node-body">
        <div className="mind-node-body-title">{resolveTitle(title)}</div>

        {callout && (
          <div className="mind-node-body-callout">
            {callout.map((item, index) => (
              <div className="mind-node-body-callout-item" key={index}>{resolveCallout(item)}</div>
            ))}
          </div>
        )}

        {/*{children && <Button className="mind-node-body-collapse-btn" size="small" shape="circle" icon={<MinusOutlined />} onClick={handleCollapseNode}/>}*/}
        {children && <button className="mind-node-body-collapse-btn" title="收缩节点" onClick={handleCollapseNode}>{collapse ? childrenCount : "-"}</button>}
      </div>

      {children && (<>
        <div className="mind-node-children">{children}</div>
      </>)}
    </div>
  )
}

export default MindNode;
