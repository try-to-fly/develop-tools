import * as React from "react";
import { CodeEditor, TwoPanel } from "../../components";
import { JsonRightArea } from "./JsonRightArea";


export default function JsonMain() {
  const [json, setJson] = React.useState('{"bar": 123, "foo":"hi"}');
  return (
    <TwoPanel
      left={<CodeEditor data={json} onChange={setJson} />}
      right={<JsonRightArea json={json} />}
    />
  );
}
