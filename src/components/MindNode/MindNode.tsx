import React from "react";
import {HeadingContent, Markdown} from "../../model";

import "./MindNode.less";

const MindNode: React.FC<{
  // title: HeadingContent[];
  title: string;
  callout?: string;
}> = props => {
  const {title, callout, children} = props;

  // const titleElement = title.map(item => {
  //   switch (item.type) {
  //     case Markdown.InlineCode:
  //       return <code className="mind-node__title__code">{item.value}</code>
  //     case Markdown.Text:
  //     default:
  //       return item.value;
  //   }
  // })

  return (
    <div className="mind-node">
      {/* 主体 */}
      <div className="mind-node__content">
        <div className="mind-node__content-title">{title}</div>
        {callout && <div className="mind-node__content-callout">{callout}</div>}
      </div>

      {children && <div className="mind-node__children">{children}</div>}
    </div>
  )
}

export default MindNode;
