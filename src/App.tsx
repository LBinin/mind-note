import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
import {observer} from "mobx-react";
import { DragSizing } from "react-drag-sizing"
// import NoteTOC from "./container/NoteTOC/NoteTOC";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";
import {configStore} from "./store";
import classNames from "classnames";

import "./App.less";

// @ts-ignore
import MarkdownSourcePath from "./node.md";
import {SPACING_BETWEEN} from "./constant";

const App = observer(() => {
  const [dataSource, setDataSource] = useState<string | undefined>("");
  const previewMode = configStore.previewMode.get();
  const editorPosition = configStore.editorPosition.get()

  useEffect(() => {
    fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  const handleMarkdownCodeChange = (md: string | undefined) => {
    if (previewMode === "live") {
      setDataSource(md);
    }
  }

  const appClassString = classNames("mind-note-app-container", {
    "layout-reverse": editorPosition === "right",
  })

  return (
    <div className={appClassString}>
      {dataSource && (
        <DragSizing border="right" handlerClassName="markdown-editor-drag-sizing iconfont icon-tuozhuai" handlerOffset={-SPACING_BETWEEN} handlerWidth={SPACING_BETWEEN + 1}>
          <MarkdownEditor value={dataSource} onChange={handleMarkdownCodeChange}/>
        </DragSizing>
      )}
      {dataSource && <MindMap markdown={dataSource}/>}
      {/*<NoteTOC/>*/}
    </div>
  );
});

export default App;
