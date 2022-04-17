import * as React from "react";
import ReactJson from "react-json-view";
import is from "@sindresorhus/is";

interface IOwnProps {
  data: Object;
}

/** 尝试解析json 数据 */
export const tryParseJson = (data: any) => {
  if (!is.string(data)) return data;
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

/**
 * 预览json数据
 */
export const JsonPreview: React.FC<IOwnProps> = ({ data }) => {
  data = tryParseJson(data);
  data = typeof data === "string" ? { data } : data;
  return (
    <div>
      <ReactJson
        displayObjectSize={false}
        displayDataTypes={false}
        src={data}
        enableClipboard
        collapsed={2}
        theme="bright"
        style={{ height: "100vh", backgroundColor: "#263238" }}
      />
    </div>
  );
};
