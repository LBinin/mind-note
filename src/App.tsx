import {observer} from "mobx-react";
import {configStore} from "./store";
import classNames from "classnames";
import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
// import NoteTOC from "./container/NoteTOC/NoteTOC";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";

import "./App.less";

// @ts-ignore
// import MarkdownSourcePath from "./node.md";
import {EditorPosition, UserConfig} from "./store/ConfigStore";

const App = observer(() => {
  const [dataSource, setDataSource] = useState<string | undefined>("");
  const [markdownLastModifiedTime, setModifiedTime] = useState<Date>();
  const previewMode = configStore.previewMode.get();
  const editorPosition = configStore.editorPosition.get();

  useEffect(() => {
    const localMarkdown = configStore.getUserConfigByKey(UserConfig.MARKDOWN_CODE);
    localMarkdown && setDataSource(localMarkdown);
    // fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  const handleMarkdownCodeChange = (md: string | undefined, saveDate?: Date) => {
    if (previewMode === "live") {
      setDataSource(md);
    }
  }

  const handleMarkdownCodeSave = (saveDate: Date) => {
    if (saveDate) {
      setModifiedTime(saveDate)
    }
  }

  const appClassString = classNames("mind-note-app-container", {
    "layout-reverse": editorPosition === EditorPosition.RIGHT,
    "layout-editor-top": editorPosition === EditorPosition.TOP,
    "layout-editor-bottom": editorPosition === EditorPosition.BOTTOM,
  })

  return (
    <div className={appClassString}>
      <MarkdownEditor
        defaultValue={dataSource}
        onChange={handleMarkdownCodeChange}
        onSave={handleMarkdownCodeSave}
      />

      <MindMap markdown={dataSource} modifiedTime={markdownLastModifiedTime}/>
      {/*<NoteTOC/>*/}
    </div>
  );
});

export default App;
