import React, {useState} from "react";
import html2canvas from "html2canvas";
import {MindNodeItem} from "../../model";
import Iconfont from "../Iconfont/Iconfont";
import {Modal, message, Divider} from "antd";
import ScreenshotCaptureForm, {ScreenshotCaptureFormOptions} from "./ScreenshotCaptureForm";

const ScreenshotCaptureModal: React.FC<{
  visible?: boolean;
  onCancel?: () => void;
  dataSource: MindNodeItem[];
  container: React.RefObject<HTMLElement | null>;
}> = props => {
  const {dataSource, container, visible, onCancel} = props;

  const [screenshot, setScreenshot] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 根据用户选择生成对应图片
   * @param value 表单 value
   */
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
      setLoading(false);
    })
  }

  return (<>
    <Modal
      title={<><Iconfont type="icon-xiangji4"/> 图片导出</>}
      visible={visible}
      onCancel={onCancel}
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
