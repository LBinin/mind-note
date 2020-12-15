import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {BlockquoteContent, HeadingContent, Markdown} from "../../model";
import classNames from "classnames";

import "./MindNode.less";
import {resolveCallout, resolveTitle} from "../../utils/MindNodeResolver";

const MindNode: React.FC<{
  // title: HeadingContent[];
  title: HeadingContent[];
  callout?: BlockquoteContent[];
  className?: any;
  hasParent?: boolean;
}> = props => {
  const {title, callout, className, hasParent, children} = props;

  const nodeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const linkLineRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [childLength, setChildLength] = useState<number>(0);

  /*
   * 设置 Node 位置偏移
   * 根据子节点的位置，取所有子节点的中间值
   */
  // useLayoutEffect(() => {
  //   if (!childrenRef.current) {
  //     return;
  //   }
  //   const childList = Array.from(childrenRef.current.children).map(node => {
  //     const titleNode = node.querySelector(".mind-node__content");
  //     return titleNode ? titleNode.clientHeight : 0;
  //   });
  //
  //   const childNodes = Array.from(childrenRef.current.children);
  //   const childTitleNode = childNodes.map(node => node.querySelector(".mind-node__content-title")) as HTMLElement[];
  //
  //   // Array.from(childrenRef.current.children).forEach()
  //
  //   const firstChildCenterX = childTitleNode[0].offsetTop + childTitleNode[0].clientHeight / 2
  //   const lastChildCenterX = childTitleNode[childTitleNode.length - 1].offsetTop + childTitleNode[childTitleNode.length - 1].clientHeight / 2
  //
  //   console.log({title, firstChildCenterX, lastChildCenterX})
  //   console.log(childTitleNode[0].offsetTop)
  //
  //   // if (childList.length === 1) {
  //   //   nodeRef.current!.style.top = `${nodeOffsetTop}px`;
  //   //   return;
  //   // }
  //
  //   setChildLength(childList.length);
  //
  //   console.log(title, childList)
  //
  //   // const childrenHeight = childList.reduce((a, b) => a + b, 0);
  //   // const originNodeCenterY = childrenHeight / 2;
  //   //
  //   // const firstChildCenterPosY = childList[0] / 2;
  //   // const lastChildCenterPosY = childrenHeight - childList[childList.length - 1] / 2;
  //   //
  //   // const nodeOffsetTop =
  //   //   firstChildCenterPosY
  //   //   + (lastChildCenterPosY - firstChildCenterPosY) / 2
  //   //   - originNodeCenterY;
  //   //
  //   // nodeRef.current!.style.top = `${nodeOffsetTop}px`;
  //   //
  //   // if (linkLineRef.current) {
  //   //   linkLineRef.current.style.width = `${Math.floor(nodeRef.current!.clientWidth - 1)}px`;
  //   // }
  //   // linkLineRef.current!.style.margin = `${firstNodeCenterPosY}px 0 ${heightList[heightList.length - 1] / 2}px 0`;
  // }, [childrenRef])

  // useLayoutEffect(() => {
  //   if (!titleRef.current) {
  //     return;
  //   }
  //   const titleHeight = titleRef.current!.offsetHeight;
  //   const linkOffsetTop = titleHeight / 2;
  //   console.log(titleHeight)
  //
  //   if (linkLineRef.current) {
  //     // console.log(linkOffsetTop, title)
  //     linkLineRef.current.style.top = `${linkOffsetTop}px`;
  //   }
  // }, [linkLineRef])

  // const titleElement = title.map(item => {
  //   switch (item.type) {
  //     case Markdown.InlineCode:
  //       return <code className="mind-node__title__code">{item.value}</code>
  //     case Markdown.Text:
  //     default:
  //       return item.value;
  //   }
  // })

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

  // return (
  //   <div className={mindNodeClassString}>
  //
  //     <div className="mind-node__link-line" ref={linkLineRef}/>
  //
  //     {/* 主体 */}
  //     <div className="mind-node__content" ref={nodeRef}>
  //       <div className="mind-node__content-title" ref={titleRef}>{title}</div>
  //       {callout && <div className="mind-node__content-callout">
  //         {callout.map(i => <div key={i} className="callout-item">{i}</div>)}
  //       </div>}
  //       {/*{hasParent && }*/}
  //     </div>
  //
  //     {children && (<>
  //       <div className="mind-node__children" ref={childrenRef}>{children}</div>
  //     </>)}
  //   </div>
  // )
}

export default MindNode;
