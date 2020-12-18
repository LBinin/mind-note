import React, {useState} from "react";
import {Button, Modal, message, Divider} from "antd";
import {FileImageOutlined} from "@ant-design/icons";
import {MindNodeItem} from "../../model";
import ScreenshotCaptureForm, {ScreenshotCaptureFormOptions} from "./ScreenshotCaptureForm";
import html2canvas from "html2canvas";
import Iconfont from "../Iconfont/Iconfont";

const ScreenshotCaptureModal: React.FC<{
  dataSource: MindNodeItem[];
  container: React.RefObject<HTMLElement | null>;
}> = props => {
  const {dataSource, container} = props;

  const [screenshot, setScreenshot] = useState<string>();
  const [screenshotVisible, setScreenshotVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTakeScreenshots = (value: ScreenshotCaptureFormOptions) => {
    if (!value.target) {
      message.warn("目标节点不存在").then()
      return;
    }

    if (!container.current) {
      message.warn("脑图节点不存在，请刷新页面").then()
      return;
    }

    const target = Array.from(container.current.children)[+value.target] as HTMLElement;

    if (!target) {
      message.warn("目标节点不存在").then()
      return;
    }

    setLoading(true);

    html2canvas(target, { backgroundColor: value.background }).then(canvas => {
      setScreenshot(canvas.toDataURL())
      setScreenshotVisible(true);
      setLoading(false);
    })
  }

  return (<>
    <Button onClick={() => setScreenshotVisible(true)} type="primary" icon={<Iconfont type="icon-xiangji-white"/>}>导出图片</Button>

    <Modal
      title={<><Iconfont type="icon-xiangji4"/> 图片导出</>}
      visible={screenshotVisible}
      onCancel={() => setScreenshotVisible(v => !v)}
      footer={null}
    >
      <ScreenshotCaptureForm
        targetList={dataSource}
        onCapture={handleTakeScreenshots}
        loading={loading}
      />

      {screenshot && <>
        <Divider>右键保存 <Iconfont type="icon-shubiaojiantou"/></Divider>
        <img style={{width: "100%"}} src={screenshot} alt="screenshot"/>
      </>}
    </Modal>
  </>);
}

export default ScreenshotCaptureModal;
