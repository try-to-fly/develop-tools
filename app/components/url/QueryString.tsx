import * as React from "react";
import { JsonPreview } from "../json";
import { parseUrl } from "./UrlSummary";

type OwnProps = {
  url: string;
};

/** 解析url查询字符串 */
export const QueryString: React.FC<OwnProps> = ({ url }) => {
  const [json, setJson] = React.useState({});

  React.useEffect(() => {
    const params = getUrlParse(url);
    setJson(params);
  }, [url]);

  return <JsonPreview data={json} />;
};

function getUrlParse(url: string) {
  const { searchParams } = parseUrl(url);

  return !searchParams
    ? {}
    : [...searchParams.entries()].reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
}
