import React from "react";
import {observer} from "mobx-react";
import {configStore} from "../../../store";
import toolbarCommandsHandler from "./ToolbarCommands";
import Iconfont from "../../../components/Iconfont/Iconfont";
import {Button, Checkbox, Divider, Dropdown, Menu, Space, Tooltip} from "antd";
import ScreenshotCaptureBtn from "../../../components/ScreenshotCapture/ScreenshotCaptureBtn";

import {
  PicLeftOutlined,
  PicRightOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons";
import {EditorPosition} from "../../../store/ConfigStore";

export enum ConfigKey {
  EDITOR_POSITION_LEFT = "editorPositionLeft",
  EDITOR_POSITION_RIGHT = "editorPositionRight",
  EDITOR_POSITION_TOP = "editorPositionTop",
  EDITOR_POSITION_BOTTOM = "editorPositionBottom",
  LIVE_PREVIEW = "livePreview"
}

const MindMapToolbar: React.FC<{
  // onClick?: (key: ConfigKey) => void; // Menu Item Click handle
}> = props => {
  const editorPosition = configStore.editorPosition.get();

  const handleMoreFuncMenuItemClick = ({key}: {key: any}) => {
    toolbarCommandsHandler(key);
  }

  const handlePreviewModeChange = (e: any) => {
    toolbarCommandsHandler(ConfigKey.LIVE_PREVIEW, e.target.checked);
  }

  const moreFuncMenu = (<Menu onClick={handleMoreFuncMenuItemClick}>
    <Menu.SubMenu title="编辑器布局" icon={<Iconfont type="icon-layout"/>}>
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
    </Menu.SubMenu>
  </Menu>)

  return (<>
    <Tooltip title="[待实现] 使用 ctrl/cmd + s 保存预览（非实时预览模式）"><Checkbox disabled={true} checked={true} onChange={handlePreviewModeChange}>实时预览</Checkbox></Tooltip>

    <Space>
      <Divider type="vertical" />

      <Dropdown overlay={moreFuncMenu} placement="bottomCenter" arrow>
        <Button icon={<Iconfont type="icon-more"/>}/>
      </Dropdown>

      <ScreenshotCaptureBtn/>
    </Space>
  </>)
}

export default observer(MindMapToolbar);
