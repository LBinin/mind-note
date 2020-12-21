import {observer} from "mobx-react";
import {configStore} from "./store";
import classNames from "classnames";
import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
// import NoteTOC from "./container/NoteTOC/NoteTOC";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";

import "./App.less";

// @ts-ignore
import MarkdownSourcePath from "./node.md";
import {EditorPosition} from "./store/ConfigStore";

const App = observer(() => {
  const [dataSource, setDataSource] = useState<string | undefined>("");
  const previewMode = configStore.previewMode.get();
  const editorPosition = configStore.editorPosition.get();

  useEffect(() => {
    fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  const handleMarkdownCodeChange = (md: string | undefined) => {
    if (previewMode === "live") {
      setDataSource(md);
    }
  }

  const appClassString = classNames("mind-note-app-container", {
    "layout-reverse": editorPosition === EditorPosition.RIGHT,
    "layout-editor-top": editorPosition === EditorPosition.TOP,
    "layout-editor-bottom": editorPosition === EditorPosition.BOTTOM,
  })

  return (
    <div className={appClassString}>
      {dataSource && (
        <MarkdownEditor value={dataSource} onChange={handleMarkdownCodeChange}/>
      )}
      {dataSource && <MindMap markdown={dataSource}/>}
      {/*<NoteTOC/>*/}
    </div>
  );
});

export default App;
