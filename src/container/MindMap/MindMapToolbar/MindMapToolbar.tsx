import React from "react";
import {observer} from "mobx-react";
import {configStore} from "../../../store";
import toolbarCommandsHandler from "./ToolbarCommands";
import {EditorPosition} from "../../../store/ConfigStore";
import Iconfont from "../../../components/Iconfont/Iconfont";
import {Button, Checkbox, Divider, Dropdown, Menu, Space, Tooltip} from "antd";
import ScreenshotCaptureBtn from "../../../components/ScreenshotCapture/ScreenshotCaptureBtn";

import {
  PicLeftOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  PicRightOutlined, SaveOutlined,
} from "@ant-design/icons";

import "./MindMapToolbar.less";

export enum ConfigKey {
  EDITOR_POSITION_LEFT = "editorPositionLeft",
  EDITOR_POSITION_RIGHT = "editorPositionRight",
  EDITOR_POSITION_TOP = "editorPositionTop",
  EDITOR_POSITION_BOTTOM = "editorPositionBottom",
  LIVE_PREVIEW = "livePreview"
}

const MindMapToolbar: React.FC<{
  saveTime?: Date;
  // onClick?: (key: ConfigKey) => void; // Menu Item Click handle
}> = props => {
  const {saveTime} = props;

  const handlePreviewModeChange = (e: any) => {
    toolbarCommandsHandler(ConfigKey.LIVE_PREVIEW, e.target.checked);
  }

  return (<>
    <Tooltip title="[待实现] 使用 ctrl/cmd + s 保存预览（非实时预览模式）"><Checkbox disabled={true} checked={true} onChange={handlePreviewModeChange}>实时预览</Checkbox></Tooltip>

    <Space>
      <Divider type="vertical" />
      <LastSaveTime time={saveTime}/>
      {/* 编辑器布局 */}
      <EditorLayout/>
      {/* 导出图片功能 */}
      <ScreenshotCaptureBtn/>
    </Space>
  </>)
}

const LastSaveTime: React.FC<{
  time?: Date;
}> = props => {
  const {time} = props;

  if (!time) { return null; }

  return <Space>
    <span className="tool-bar-last-modified-time"><SaveOutlined /> 上次保存时间：
      {String(time.getHours()).padStart(2, "0")}:
      {String(time.getMinutes()).padStart(2, "0")}:
      {String(time.getSeconds()).padStart(2, "0")}
    </span>
    <Divider type="vertical" />
  </Space>
}

const EditorLayout: React.FC = props => {
  const editorPosition = configStore.editorPosition.get();

  const handleMoreFuncMenuItemClick = ({key}: {key: any}) => {
    toolbarCommandsHandler(key);
  }

  const menu = <Menu onClick={handleMoreFuncMenuItemClick}>
    <Menu.Item
      disabled={editorPosition === EditorPosition.RIGHT}
      key={ConfigKey.EDITOR_POSITION_RIGHT}
      icon={<PicRightOutlined />}
    >编辑器右移
    </Menu.Item>

    <Menu.Item
      disabled={editorPosition === EditorPosition.LEFT}
      key={ConfigKey.EDITOR_POSITION_LEFT}
      icon={<PicLeftOutlined />}
    >编辑器左移
    </Menu.Item>

    <Menu.Item
      disabled={editorPosition === EditorPosition.TOP}
      key={ConfigKey.EDITOR_POSITION_TOP}
      icon={<VerticalAlignTopOutlined />}
    >编辑器上移
    </Menu.Item>

    <Menu.Item
      disabled={editorPosition === EditorPosition.BOTTOM}
      key={ConfigKey.EDITOR_POSITION_BOTTOM}
      icon={<VerticalAlignBottomOutlined />}
    >编辑器下移
    </Menu.Item>
  </Menu>

  return <Dropdown overlay={menu} placement="bottomCenter" arrow>
    <Button icon={<Iconfont type="icon-layout"/>}>编辑器布局</Button>
  </Dropdown>
}

export default observer(MindMapToolbar);
