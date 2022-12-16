import { Collapse } from "antd";
import * as React from "react";
import { JsonPreview, JsonToTs } from "../../components";

type OwnProps = {
  json: string;
};

/** 右侧区域 */
export const JsonRightArea: React.FC<OwnProps> = ({ json }) => {
  return (
    <Collapse defaultActiveKey={["json-preview"]}>
      <Collapse.Panel header="Json预览" key="json-preview">
        <JsonPreview data={json} />
      </Collapse.Panel>
      <Collapse.Panel header="转Ts" key="to-ts">
        <JsonToTs json={json} />
      </Collapse.Panel>
    </Collapse>
  );
};
