import React from "react";

import remark from "remark";

const MindMap: React.FC<{
  markdown: string;
}> = props => {
  const {markdown} = props;

  const result = remark().parse(markdown);

  console.log(result)

  return <div>{markdown}</div>
}

export default MindMap;
