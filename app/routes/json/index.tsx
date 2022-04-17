import * as React from "react";
import { CodeEditor, TwoPanel } from "../../components";
import { JsonRightArea } from "./JsonRightArea";

// https://remix.run/docs/en/v1/guides/styling
import styles from "codemirror/lib/codemirror.css";
import theme from "codemirror/theme/material.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: theme },
  ];
}

export default function JsonMain() {
  const [json, setJson] = React.useState('{"bar": 123, "foo":"hi"}');
  return (
    <TwoPanel
      left={<CodeEditor data={json} onChange={setJson} />}
      right={<JsonRightArea json={json} />}
    />
  );
}
