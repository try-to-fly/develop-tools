import * as React from "react";
import { Input, Space } from "antd";
import { CodeEditor, TwoPanel } from "~/components";

import styles from "codemirror/lib/codemirror.css";
import theme from "codemirror/theme/material.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: theme },
  ];
}

export default function TextReg() {
  const [reg, setReg] = React.useState("");
  const [originText, setOriginText] = React.useState("");
  const [result, setResult] = React.useState("");

  const handleOriginTextChange = (data: string) => {
    setOriginText(data);
  };

  const handleRegChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const value = e.target.value.trim();
    if (!value) return;
    setReg(value);
    try {
      const match = originText.matchAll(new RegExp(value, "g"));
      
      const data = Array.from(match)
      .map((item) => item[1] || item[0])
      .join("\r");

      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-reg">
      <Space direction="vertical">
        <Input.TextArea
          style={{ width: 600 }}
          value={reg}
          onChange={handleRegChange}
          spellCheck={false}
          placeholder="请输入正则表达式"
        />
        <TwoPanel
          left={
            <CodeEditor data={originText} onChange={handleOriginTextChange} />
          }
          right={<CodeEditor data={result} onChange={setResult} />}
        />
      </Space>
    </div>
  );
}
