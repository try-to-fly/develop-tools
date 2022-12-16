import * as React from "react";
import { Alert, Card, message, Space } from "antd";

export const CornWrap = ({
  value,
  children,
  name,
}: {
  name: string;
  value: string;
  children: React.ReactNode;
}) => {
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    message.success("已复制");
  };

  return (
    <Card
      title={name}
      style={{ width: "300px" }}
      className="inline-block mr-10 mb-10"
    >
      <Space direction="vertical">
        <Alert onClick={handleCopy} message={value || "无"} type="success" />
        {children}
      </Space>
    </Card>
  );
};
