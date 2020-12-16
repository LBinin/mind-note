export enum Markdown {
  Heading = "heading",
  Text = "text",
  InlineCode = "inlineCode",
  Blockquote = "blockquote",
  Paragraph = "paragraph",
  Strong = "strong",
  ThematicBreak = "thematicBreak",
}

// https://github.com/syntax-tree/mdast

export type ASTNode = // 支持识别的 Markdown 语法，于 utils/index.ts 的 buildMindNodes 实现识别
  MarkdownHeading |
  MarkdownBlockquote |
  MarkdownThematicBreak;

export type MarkdownDepth = 1 | 2 | 3 | 4 | 5 | 6;

// 支持的语法中可能用到的行内节点
export type HeadingContent = MarkdownText | MarkdownInlineCode | MarkdownStrong;
export type BlockquoteContent = MarkdownParagraph;

export type ParagraphContent = MarkdownText | MarkdownInlineCode | MarkdownStrong;
export type StrongContent = MarkdownText | MarkdownInlineCode;

/* 支持的 MD 语法 */

// 标题（#语法）
export interface MarkdownHeading {
  type: Markdown.Heading;
  depth: MarkdownDepth;
  children: HeadingContent[];
}
// 引用（>语法）
export interface MarkdownBlockquote {
  type: Markdown.Blockquote;
  children: BlockquoteContent[];
}
// 分割线
export interface MarkdownThematicBreak {
  type: Markdown.ThematicBreak,
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
