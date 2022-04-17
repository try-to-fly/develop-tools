import {
  UnControlled as UnControlledCodeMirror,
  Controlled as CodeMirror,
} from "react-codemirror2";

require("codemirror/mode/javascript/javascript");

/** 不受控编辑器 */
export const UnControllCodeEditor: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="json-to-ts" style={{height:'100vh'}}>
      <UnControlledCodeMirror
        value={code}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          tabSize: 2,
          lineWrapping: true,
        }}
      />
    </div>
  );
};

/**
 * Json编辑器
 */
export const CodeEditor: React.FC<{
  data: string;
  onChange?: (data: string) => void;
}> = ({ data, onChange }) => {
  return (
    <div className="json-editor" style={{ height: "100vh" }}>
      <CodeMirror
        value={data}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          tabSize: 2,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          onChange?.(value);
        }}
      />
    </div>
  );
};
