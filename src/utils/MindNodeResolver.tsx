/**
 * 该解析器根据 mdast，解析出支持的对应的 md 语法
 */

import {Markdown, BlockquoteContent, HeadingContent, MarkdownParagraph, MarkdownStrong} from "../model";

/**
 * 抽象节点解析：Title
 */
export function resolveTitle(titleList: HeadingContent[]) {
  return titleList.map(title => {
    switch (title.type) {
      case Markdown.Text:
        return title.value
      case Markdown.InlineCode:
        return <code key={title.value}>{title.value}</code>
      case Markdown.Strong:
        return <b>{resolveStrong(title)}</b>
      default:
        return null;
    }
  })
}

/**
 * 抽象节点解析：Callout
 */
export function resolveCallout(callout: BlockquoteContent) {
  console.log(callout)
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
        return <code key={child.value}>{child.value}</code>
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
export function resolveStrong(strong: MarkdownStrong) {
  return strong.children.map(item => {
    switch (item.type) {
      case Markdown.Text:
        return item.value
      case Markdown.InlineCode:
        return <code>{item.value}</code>
      default:
        return null;
    }
  })
}
