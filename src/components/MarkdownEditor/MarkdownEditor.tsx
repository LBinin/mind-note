import {observer} from "mobx-react";
import {debounce} from "lodash";
import React, {useEffect, useRef, useState} from "react";
// import {SUPPORT_TOOLBAR_COMMANDS} from "./EditorConfig";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


import "./MarkdownEditor.less";
import {SPACING_BETWEEN} from "../../constant";

const MarkdownEditor: React.FC<{
  value?: string;
  onChange?: (value: string | undefined) => void;
}> = props => {
  const {value, onChange} = props;

  const editorRef = useRef<Editor>(null)

  const [height, setHeight] = useState<number>(() => {
    // 20: 上下 margin
    return document.body.clientHeight - SPACING_BETWEEN * 2;
  });

  useEffect(() => {
    const handleResize = debounce((e) => {
      setHeight(document.body.clientHeight - SPACING_BETWEEN * 2);
    }, 500)

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleEditorChange = (params: any) => {
    if (params.source === "markdown" && editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      onChange && onChange(content);
    }
  }

  return (
    <Editor
      ref={editorRef}
      initialValue={value}
      previewStyle="tab"
      height={`${height}px`}
      initialEditType="markdown"
      useCommandShortcut={true}
      usageStatistics={false}
      hideModeSwitch={true}
      events={{
        change: handleEditorChange,
      }}
    />
  )
}

export default observer(MarkdownEditor);
