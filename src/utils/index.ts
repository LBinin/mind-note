import {Node} from "unist";
import {ASTNode, HeadingContent, Markdown, MarkdownDepth} from "../model";

export function resolveASTNodeToMindNode (nodes: ASTNode[]) {
  let nextIndex = 0; // 当前遍历下标

  while (nextIndex < nodes.length) {

    

    nextIndex++;
  }

  /**
   *
   * @param currDepth 当前深度
   * @param index 当前节点 index
   * @param node 当前节点
   */
  const resolveMarkdownNodeToMindNodes = (currDepth: MarkdownDepth, node: ASTNode) => {
    const children: any[] = [];
    nextIndex++;

    const currMindNode: {
      title?: HeadingContent[],
      children?: any[],
    } = {}

    switch (node.type) {
      case Markdown.Heading:
        if (currDepth === node.depth) {
          currMindNode.title = node.children;
          // children.push({
          //   title: ,
          // });
        } else {
          currMindNode.children = resolveMarkdownNodeToMindNodes(node.depth, node);
        }
        break;
      case Markdown.Blockquote:
        const prevNode = children[children.length - 1];
        if (!prevNode.callout) {
          prevNode.callout = []
        }
        prevNode.callout.push(node.children);
        break;
      default:
        break;
    }

    if (nextIndex < nodes.length) {
      resolveMarkdownNodeToMindNodes(currDepth, nodes[nextIndex])
    }

    return children;
  };
}
