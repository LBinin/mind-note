import React from "react";
import {Button, Form, Row, Select} from "antd";
import {resolveTitle} from "../../utils/MindNodeResolver";
import {MindNodeItem} from "../../model";
import Iconfont from "../Iconfont/Iconfont";

enum ScreenshotCaptureFormItem {
  TARGET = "target",
  BACKGROUND = "background",
}

enum BackgroundColor {
  WHITE = "#fff",
  TRANSPARENT = "transparent",
}

export interface ScreenshotCaptureFormOptions {
  // 选择节点
  [ScreenshotCaptureFormItem.TARGET]: string;
  // 图片背景
  [ScreenshotCaptureFormItem.BACKGROUND]: string;
}

const ScreenshotCaptureForm: React.FC<{
  targetList: MindNodeItem[];
  onCapture?: (values: ScreenshotCaptureFormOptions) => void;
  loading?: boolean;
}> = props => {
  const {targetList, onCapture, loading} = props;

  const [form] = Form.useForm();

  const handleCapture = () => {
    const values: ScreenshotCaptureFormOptions = form.getFieldsValue();
    onCapture && onCapture(values);
  }

  return (
    <Form form={form} onChange={console.log}>
      {/* 选择节点 */}
      {targetList && targetList.length && (
        <Form.Item label="选择节点" name={ScreenshotCaptureFormItem.TARGET} initialValue="0">
          <Select dropdownMatchSelectWidth={false}>
            {targetList.map((item, index) => (
              item.title && <Select.Option key={index} value={index + ""}>{resolveTitle(item.title)}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* 图片背景 */}
      <Form.Item label="图片背景" name={ScreenshotCaptureFormItem.BACKGROUND} initialValue={BackgroundColor.TRANSPARENT}>
        <Select dropdownMatchSelectWidth={false}>
          <Select.Option value={BackgroundColor.TRANSPARENT}>透明</Select.Option>
          <Select.Option value={BackgroundColor.WHITE}>白色</Select.Option>
        </Select>
      </Form.Item>

      <Row justify="center">
        <Button type="primary" onClick={handleCapture} icon={<Iconfont type="icon-shandian-white"/>} loading={loading}>
          {loading ? "导出中，请稍后..." : "开始导出!"}
        </Button>
      </Row>
    </Form>
  )
}

export default ScreenshotCaptureForm;
