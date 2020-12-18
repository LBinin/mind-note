import React, {useState} from "react";
import Iconfont from "../Iconfont/Iconfont";
import {Button} from "antd";
import ScreenshotCaptureModal from "./ScreenshotCaptureModal";
import {MindNodeItem} from "../../model";

const ScreenshotCaptureBtn: React.FC<{
  dataSource: MindNodeItem[];
  container: React.RefObject<HTMLElement | null>;
}> = props => {
  const {dataSource, container} = props;

  const [screenshotModalVisible, setScreenshotModalVisible] = useState<boolean>(false);

  return (<>
    <Button
      onClick={() => setScreenshotModalVisible(true)}
      type="primary"
      icon={<Iconfont type="icon-xiangji-white"/>}
    >
      导出图片
    </Button>

    <ScreenshotCaptureModal
      visible={screenshotModalVisible}
      onCancel={() => setScreenshotModalVisible(v => !v)}
      dataSource={dataSource}
      container={container}
    />
  </>)
};

export default ScreenshotCaptureBtn;
