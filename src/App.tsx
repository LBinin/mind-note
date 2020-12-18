import React, {useEffect, useState} from 'react';
import MindMap from "./container/MindMap/MindMap";
import NoteTOC from "./container/NoteTOC/NoteTOC";

import html2canvas from "html2canvas";

// @ts-ignore
import MarkdownSourcePath from "./node.md";

function App() {

  const [dataSource, setDataSource] = useState<string>("");

  useEffect(() => {
    fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  return (
    <>
      <MindMap markdown={dataSource}/>
      {/*<NoteTOC/>*/}
    </>
  );
}

export default App;
