export enum Markdown {
  Heading = "heading",
  Text = "text",
  InlineCode = "inlineCode",
  Blockquote = "blockquote",
  Paragraph = "paragraph",
}

// https://github.com/syntax-tree/mdast

export type ASTNode = MarkdownHeading | MarkdownBlockquote;
export type MarkdownDepth = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingContent = MarkdownText | MarkdownInlineCode;
export type BlockquoteContent = MarkdownParagraph;

/* 支持的 MD 语法 */
export interface MarkdownHeading {
  type: Markdown.Heading;
  depth: MarkdownDepth;
  children: Array<HeadingContent>;
}

export interface MarkdownBlockquote {
  type: Markdown.Blockquote;
  children: Array<BlockquoteContent>;
}

export interface MarkdownParagraph {
  type: Markdown.Paragraph,
  children: MarkdownText | MarkdownInlineCode;
}

/* 行内节点（基本节点） */
export interface MarkdownText {
  type: Markdown.Text;
  value: string;
}

export interface MarkdownInlineCode {
  type: Markdown.InlineCode;
  value: string;
}

/* Mind Node */
export interface MindNodeItem {
  title?: any;
  callout?: any[];
  children?: any[];
}
