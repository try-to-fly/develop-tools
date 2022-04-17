import * as React from "react";
import jsonToTs from "json-to-ts";
import { UnControlled as CodeMirror } from "react-codemirror2";

require("codemirror/mode/javascript/javascript");
const safeParseTs = (str: string) => {
  try {
    const data = JSON.parse(str);
    return jsonToTs(data).join("\n");
  } catch (error) {
    return "error";
  }
};

type OwnProps = {
  json: string;
};

export const JsonToTs: React.FC<OwnProps> = ({ json }) => {
  const [ts, setTs] = React.useState<string>();
  React.useEffect(() => {
    const result = safeParseTs(json);
    setTs(result);
  }, [json]);

  return (
    <div className="json-to-ts">
      <CodeMirror
        value={ts}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
