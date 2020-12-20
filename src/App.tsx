import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
// import NoteTOC from "./container/NoteTOC/NoteTOC";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";
import ScreenshotCaptureBtn from "./components/ScreenshotCapture/ScreenshotCaptureBtn";

// @ts-ignore
import MarkdownSourcePath from "./node.md";

function App() {

  const [dataSource, setDataSource] = useState<string | undefined>("");

  useEffect(() => {
    fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  return (
    <>
      {dataSource && <MarkdownEditor value={dataSource} onChange={v => setDataSource(v)}/>}
      {dataSource && <MindMap markdown={dataSource}/>}
      {/* 导出图片按钮 */}
      <ScreenshotCaptureBtn/>
      {/*<NoteTOC/>*/}
    </>
  );
}

export default App;
