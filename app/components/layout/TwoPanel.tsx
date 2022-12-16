import { Col, Row } from "antd";
import * as React from "react";
import { ClientOnly } from "remix-utils";

type OwnProps = {
  left: React.ReactNode;
  right: React.ReactNode;
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
          <Col span={12}>{left}</Col>
          <Col span={12}>{right}</Col>
        </Row>
      )}
    </ClientOnly>
  );
};
