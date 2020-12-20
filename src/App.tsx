import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
import {observer} from "mobx-react";
// import NoteTOC from "./container/NoteTOC/NoteTOC";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";
import {configStore} from "./store";
import classNames from "classnames";

import "./App.less";

// @ts-ignore
import MarkdownSourcePath from "./node.md";

const App = observer(() => {
  const [dataSource, setDataSource] = useState<string | undefined>("");
  const previewMode = configStore.previewMode.get();
  const editorPosition = configStore.editorPosition.get()

  useEffect(() => {
    fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  const handleMarkdownCodeChange = (md: string | undefined) => {
    console.log(previewMode);

    if (previewMode === "live") {
      setDataSource(md);
    }
  }

  console.log("???", previewMode, editorPosition)

  const appClassString = classNames("mind-note-app-container", {
    "layout-reverse": editorPosition === "right",
  })

  return (
    <div className={appClassString}>
      {dataSource && <MarkdownEditor value={dataSource} onChange={handleMarkdownCodeChange}/>}
      {dataSource && <MindMap markdown={dataSource}/>}
      {/*<NoteTOC/>*/}
    </div>
  );
});

export default App;
