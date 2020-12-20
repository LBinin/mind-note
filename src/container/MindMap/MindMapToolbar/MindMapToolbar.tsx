import React from "react";
import ScreenshotCaptureBtn from "../../../components/ScreenshotCapture/ScreenshotCaptureBtn";
import {Button, Checkbox, Divider, Dropdown, Menu, Space, Tooltip} from "antd";
import {PicLeftOutlined, PicRightOutlined} from "@ant-design/icons";
import Iconfont from "../../../components/Iconfont/Iconfont";
import toolbarCommandsHandler from "./ToolbarCommands";

export enum ConfigKey {
  EDITOR_POSITION_LEFT = "editorPositionLeft",
  EDITOR_POSITION_RIGHT = "editorPositionRight",
  LIVE_PREVIEW = "livePreview"
}

const MindMapToolbar: React.FC<{
  // onClick?: (key: ConfigKey) => void; // Menu Item Click handle
}> = props => {
  const handleMoreFuncMenuItemClick = ({key}: {key: any}) => {
    toolbarCommandsHandler(key);
  }

  const handlePreviewModeChange = (e: any) => {
    toolbarCommandsHandler(ConfigKey.LIVE_PREVIEW, e.target.checked);
  }

  const moreFuncMenu = (<Menu onClick={handleMoreFuncMenuItemClick}>
    <Menu.SubMenu title="布局" icon={<Iconfont type="icon-layout"/>}>
      <Menu.Item key={ConfigKey.EDITOR_POSITION_RIGHT} icon={<PicRightOutlined />}>编辑器右移</Menu.Item>
      <Menu.Item key={ConfigKey.EDITOR_POSITION_LEFT} icon={<PicLeftOutlined />}>编辑器左移</Menu.Item>
    </Menu.SubMenu>
  </Menu>)


  return (<>
    <Tooltip title="使用 ctrl/cmd + s 保存预览（非实时预览模式）"><Checkbox onChange={handlePreviewModeChange}>实时预览</Checkbox></Tooltip>

    <Space>
      <Divider type="vertical" />

      <Dropdown overlay={moreFuncMenu} placement="bottomCenter" arrow>
        <Button icon={<Iconfont type="icon-more"/>}/>
      </Dropdown>

      <ScreenshotCaptureBtn/>
    </Space>
  </>)
}

export default MindMapToolbar;
