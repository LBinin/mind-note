/**
 * 该解析器根据 mdast，解析出支持的对应的 md 语法
 */

import {Markdown, BlockquoteContent, HeadingContent, MarkdownParagraph, MarkdownStrong} from "../model";

/**
 * 抽象节点解析：Title
 */
export function resolveTitle(titleList: HeadingContent[], plain?: boolean) {
  const content = titleList.map((title, index) => {
    switch (title.type) {
      case Markdown.Text:
        return title.value
      case Markdown.InlineCode:
        return plain ? title.value : <code key={title.value}>{title.value}</code>
      case Markdown.Strong:
        return plain ? resolveStrong(title, plain) :  <b key={index}>{resolveStrong(title)}</b>
      default:
        return plain ? "" : null;
    }
  });

  return plain ? content.join("") : content;
}

/**
 * 抽象节点解析：Callout
 */
export function resolveCallout(callout: BlockquoteContent) {
  switch (callout.type) {
    case Markdown.Paragraph:
      return <p>{resolveParagraph(callout)}</p>
    default:
      return null;
  }
}

/**
 * 基本节点解析：Paragraph
 */
export function resolveParagraph(paragraph: MarkdownParagraph) {
  return paragraph.children.map((child, index) => {
    switch (child.type) {
      case Markdown.Text:
        return child.value
      case Markdown.InlineCode:
        return <code key={`${child.value}$$${index}`}>{child.value}</code>
      case Markdown.Strong:
        return <b key={index}>{resolveStrong(child)}</b>
      default:
        return null;
    }
  });
}

/**
 * 基本节点解析：Strong
 */
export function resolveStrong(strong: MarkdownStrong, plain?: boolean) {
  return strong.children.map(item => {
    switch (item.type) {
      case Markdown.Text:
        return item.value
      case Markdown.InlineCode:
        return plain ? item.value : <code key={item.value}>{item.value}</code>
      default:
        return plain ? "" : null;
    }
  })
}
