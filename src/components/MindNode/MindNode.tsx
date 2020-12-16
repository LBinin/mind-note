import React from "react";
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

  const mindNodeClassString = classNames("mind-node", className, {
    // "no-children": childLength === 0,
    "single-child": React.Children.count(children) === 1,
  });

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
      </div>

      {children && (<>
        <div className="mind-node-children">{children}</div>
      </>)}
    </div>
  )
}

export default MindNode;
