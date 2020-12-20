import {observer} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import ReactMarkdownEditor from "@uiw/react-md-editor";
import {SUPPORT_TOOLBAR_COMMANDS} from "./EditorConfig";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


import "./MarkdownEditor.less";

const MarkdownEditor: React.FC<{
  value?: string;
  onChange?: (value: string | undefined) => void;
}> = props => {
  const {value, onChange} = props;

  const [height, setHeight] = useState<number>(() => {
    // 20: 上下 margin
    // 3: 上中下 border
    return document.body.clientHeight - 20;
  });

  const handleEditorChange = (params: any) => {
    console.log({params})
    console.log(params.data)
  }

  return (
    <Editor
      initialValue="hello react editor world!"
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

  // return (
  //   <ReactMarkdownEditor
  //     className="mind-note-md-editor"
  //     ref={editorRef}
  //     value={value}
  //     onChange={onChange}
  //     preview="edit"
  //     commands={SUPPORT_TOOLBAR_COMMANDS}
  //     height={height}
  //   />
  // )
}

export default observer(MarkdownEditor);
