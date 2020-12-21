export default {};
// import React from "react";
// import {commands, ICommand, TextApi, TextState} from "@uiw/react-md-editor";
// import Iconfont from "../Iconfont/Iconfont";
// import {Tooltip} from "antd";

// @ts-ignore
// export const DEFAULT_TOOLBAR_COMMANDS: ICommand[] = [
//   commands.bold,          // 加粗
//   commands.italic,        // 斜体
//   commands.strikethrough, // 划线
//   commands.hr,            // 分割线
//   commands.title,         // 添加二级标题
//
//   /* 功能栏分割线 */
//   commands.divider,
//   commands.link,  // 插入连接
//   commands.quote, // 插入引用
//   commands.code,  // 插入代码
//   commands.image, // 插入图片
//
//   /* 功能栏分割线 */
//   commands.divider,
//   commands.unorderedListCommand,  // 插入无序列表
//   commands.orderedListCommand,    // 插入有序列表
//   commands.checkedListCommand,    // 插入清单列表
//
//   /* 功能栏分割线 */
//   commands.divider,
//   commands.codeEdit,    // 编辑模式
//   commands.codeLive,    // 实时编辑模式
//   commands.codePreview, // 预览模式
//
//   /* 功能栏分割线 */
//   commands.divider,
//   commands.fullscreen, // 全屏
//
//   // commands.getCommands()
//   // commands.getStateFromTextArea()
//   // commands.TextAreaCommandOrchestrator
//   // commands.TextAreaTextApi
// ]
//
// const ToolbarIcon = {
//   bold: <Iconfont type="icon-fuhao-jiacu"/>,
//   quote: <Iconfont type="icon-wenzitishi"/>,
//   code: <Iconfont type="icon-daima"/>,
// }
//
// const withTooltip = (node: any, title: string) => {
//   return <Tooltip title={title}>{node}</Tooltip>
// }
//
// export const SUPPORT_TOOLBAR_COMMANDS: ICommand[] = [
//   Object.assign({}, commands.bold, {icon: withTooltip(ToolbarIcon.bold, "加粗")}),
//   Object.assign({}, commands.quote, {icon: withTooltip(ToolbarIcon.quote, "插入引用")}),
//   Object.assign({}, commands.code, {icon: withTooltip(ToolbarIcon.code, "插入代码")}),
//   // commands.quote, //
//   // commands.code,  //
//
//   /* 功能栏分割线 */
//   commands.divider,
//   Object.assign({}, commands.codeEdit, {icon: withTooltip(commands.codeEdit.icon, "编辑模式")}),
//   Object.assign({}, commands.codeLive, {icon: withTooltip(commands.codeLive.icon, "实时编辑模式")}),
//   Object.assign({}, commands.codePreview, {icon: withTooltip(commands.codePreview.icon, "预览模式")}),
//
//   /* 功能栏分割线 */
//   commands.divider,
//
//   Object.assign({}, commands.fullscreen, {icon: withTooltip(commands.fullscreen.icon, "全屏")}),
// ]
