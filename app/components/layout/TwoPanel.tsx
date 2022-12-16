import { Col, Row, Space } from "antd";
import * as React from "react";
import { ClientOnly } from "remix-utils";

type OwnProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

/**
 * 并排双面板
 */
export const TwoPanel: React.FC<OwnProps> = ({ left, right }) => {
  return (
    // https://github.com/sergiodxa/remix-utils/search?q=ClientOnly
    <ClientOnly>
      {() => (
        <Row>
          <Space>
            <Col span={11}>{left}</Col>
            <Col span={11}>{right}</Col>
          </Space>
        </Row>
      )}
    </ClientOnly>
  );
};
