import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";

/**
 * Json编辑器
 */
export const CodeEditor: React.FC<{
  data: string;
  onChange?: (data: string) => void;
}> = ({ data, onChange }) => {
  return (
    <div className="code-editor" style={{ height: "80vh" }}>
      <AceEditor
        height="100%"
        value={data}
        mode="javascript"
        theme="one_dark"
        onChange={onChange}
        name="ace-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          wrap: true,
        }}
      />
    </div>
  );
};
