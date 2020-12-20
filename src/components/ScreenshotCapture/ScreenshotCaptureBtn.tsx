import React, {useState} from "react";
import Iconfont from "../Iconfont/Iconfont";
import {Button} from "antd";
import ScreenshotCaptureModal from "./ScreenshotCaptureModal";

const ScreenshotCaptureBtn: React.FC = props => {

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
    />
  </>)
};

export default ScreenshotCaptureBtn;
