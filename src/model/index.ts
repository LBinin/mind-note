export enum Markdown {
  Heading = "heading",
  Text = "text",
  InlineCode = "inlineCode",
  Blockquote = "blockquote",
  Paragraph = "paragraph",
  Strong = "strong",
}

// https://github.com/syntax-tree/mdast

export type ASTNode = MarkdownHeading | MarkdownBlockquote;
export type MarkdownDepth = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingContent = MarkdownText | MarkdownInlineCode | MarkdownStrong;
export type BlockquoteContent = MarkdownParagraph;

export type ParagraphContent = MarkdownText | MarkdownInlineCode | MarkdownStrong;
export type StrongContent = MarkdownText | MarkdownInlineCode;

/* 支持的 MD 语法 */
export interface MarkdownHeading {
  type: Markdown.Heading;
  depth: MarkdownDepth;
  children: HeadingContent[];
}

export interface MarkdownBlockquote {
  type: Markdown.Blockquote;
  children: BlockquoteContent[];
}

export interface MarkdownParagraph {
  type: Markdown.Paragraph,
  children: ParagraphContent[];
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

export interface MarkdownStrong {
  type: Markdown.Strong;
  children: StrongContent[];
}

/* Mind Node */
export interface MindNodeItem {
  title?: HeadingContent[];
  callout?: BlockquoteContent[];
  children?: MindNodeItem[];
}
