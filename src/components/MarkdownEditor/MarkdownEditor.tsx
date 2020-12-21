import {observer} from "mobx-react";
import classNames from "classnames";
import {configStore} from "../../store";
import {DragSizing} from "react-drag-sizing";
import {Editor} from '@toast-ui/react-editor';
import {SPACING_BETWEEN} from "../../constant";
import {EditorPosition, UserConfig} from "../../store/ConfigStore";
import React, {useEffect, useMemo, useRef, useState} from "react";

import "./MarkdownEditor.less";
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

enum EditorDirection {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

const getEditorHeight = (editorDirection: EditorDirection) => {
  // 20: 上下 margin
  const localSavedHeight = Number(configStore.getUserConfigByKey(UserConfig.EDITOR_HEIGHT));
  const documentHeight = document.body.clientHeight;

  if (localSavedHeight && editorDirection === EditorDirection.VERTICAL) {
    // 考虑到体验，留出一点空白（一般也不会有人这么做）
    return Math.min(localSavedHeight, documentHeight - 200);
  }

  return editorDirection === EditorDirection.HORIZONTAL
    ? "100%" // documentHeight - SPACING_BETWEEN * 2
    : documentHeight * 0.3;
}

const getEditorWidth = (editorDirection: EditorDirection) => {
  // 20: 上下 margin
  const localSavedWidth = Number(configStore.getUserConfigByKey(UserConfig.EDITOR_WIDTH));
  const documentWidth = document.body.clientWidth;

  if (localSavedWidth && editorDirection === EditorDirection.HORIZONTAL) {
    // 考虑到体验，留出一点空白（一般也不会有人这么做）
    return Math.min(localSavedWidth, documentWidth - 200);
  }

  return editorDirection === EditorDirection.HORIZONTAL
    ? documentWidth * 0.3
    : "100%"; // documentWidth - SPACING_BETWEEN * 2
}

const MarkdownEditor: React.FC<{
  value?: string;
  onChange?: (value: string | undefined) => void;
}> = props => {
  const {value, onChange} = props;

  // 当前编辑器位于何处（上下左右）
  const editorPosition = configStore.editorPosition.get();

  // 当前编辑器置放方式（水平、竖直）
  const editorDirection = useMemo<EditorDirection>(() => {
    switch (editorPosition) {
      case EditorPosition.TOP:
      case EditorPosition.BOTTOM:
        return EditorDirection.VERTICAL;
      case EditorPosition.RIGHT:
      case EditorPosition.LEFT:
      default:
        return EditorDirection.HORIZONTAL;
    }
  }, [editorPosition])

  // 当前拖拽器所处方位
  const dragHandlePosition = useMemo(() => {
    switch (editorPosition) {
      case EditorPosition.BOTTOM:
        return "top"
      case EditorPosition.RIGHT:
        return "left"
      case EditorPosition.TOP:
        return "bottom"
      case EditorPosition.LEFT:
      default:
        return "right"
    }
  }, [editorPosition])

  // 编辑器实例
  const editorRef = useRef<Editor>(null)

  // 初始化高度
  const [height, setHeight] = useState<number | string>(() => {
    return getEditorHeight(editorDirection);
  });

  // 初始化宽度
  const [width, setWidth] = useState<number | string>(() => {
    return getEditorWidth(editorDirection);
  });

  /**
   * 更换位置后，设置 Editor 尺寸
   */
  useEffect(() => {
    setHeight(getEditorHeight(editorDirection));
    setWidth(getEditorWidth(editorDirection));
  }, [editorDirection]);

  /**
   * 相应 Markdown 内容变化
   */
  const handleEditorContentChange = (params: any) => {
    if (params.source === "markdown" && editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      onChange && onChange(content);
    }
  }

  /**
   * 储存 Editor 尺寸信息到本地
   */
  const handleDragHandlerDragEnd = () => {
    if (!editorRef.current) { return; }

    if (editorDirection === EditorDirection.VERTICAL) {
      configStore.saveUserConfig(UserConfig.EDITOR_HEIGHT, editorRef.current.getRootElement().clientHeight + "");
    }

    if (editorDirection === EditorDirection.HORIZONTAL) {
      configStore.saveUserConfig(UserConfig.EDITOR_WIDTH, editorRef.current.getRootElement().clientWidth + "");
    }
  }

  // 拖拽杆 icon
  const editorDragHandlerClassString = classNames("markdown-editor-drag-sizing", "iconfont", {
    "icon-tuozhuai": editorPosition === EditorPosition.LEFT || editorPosition === EditorPosition.RIGHT,
    "icon-tuozhuai-horizontal": editorPosition === EditorPosition.BOTTOM || editorPosition === EditorPosition.TOP,
  });

  return (
    <DragSizing
      border={dragHandlePosition}
      handlerClassName={editorDragHandlerClassString}
      handlerOffset={-SPACING_BETWEEN}
      handlerWidth={SPACING_BETWEEN + 1}
      onEnd={handleDragHandlerDragEnd}
      style={{minHeight: 100, minWidth: 150, width, height}}
    >
      <Editor
        ref={editorRef}
        initialValue={value}
        previewStyle="tab"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
        hideModeSwitch={true}
        events={{
          change: handleEditorContentChange,
        }}
      />
    </DragSizing>
  )
}

export default observer(MarkdownEditor);
