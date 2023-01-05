import * as React from "react";
import { Button, Descriptions, Image } from "antd";
import type { DouBanResult } from "~/components/douban";
import { readDouBanHtmlFromClipboard } from "~/components/douban";
import type { MetaFunction } from "@remix-run/server-runtime";

export const meta: MetaFunction = () => {
  return {
    title: "开发助手-豆瓣图书",
    referrer: "no-referrer",
  };
};

export default function Douban() {
  const [data, setData] = React.useState<DouBanResult>();

  const handleReadClipboard = async () => {
    const result = await readDouBanHtmlFromClipboard();
    setData(result);
  };

  return (
    <div className="douban">
      <h1>豆瓣图书</h1>
      <Button onClick={handleReadClipboard} type="primary">
        读取剪切板
      </Button>
      {data && (
        <div className="info">
          <Descriptions title="图书信息" bordered>
            <Descriptions.Item label="封面">
              <Image width={200} src={data?.cover} />
            </Descriptions.Item>
            <Descriptions.Item label="书名">{data?.title}</Descriptions.Item>
            <Descriptions.Item label="作者">{data?.author}</Descriptions.Item>
            <Descriptions.Item label="出版社">
              {data?.publisher}
            </Descriptions.Item>
            <Descriptions.Item label="出版日期">
              {data?.pubdate}
            </Descriptions.Item>
            <Descriptions.Item label="价格">{data?.price}</Descriptions.Item>
            <Descriptions.Item label="页数">{data?.pages}</Descriptions.Item>
            <Descriptions.Item label="ISBN">{data?.isbn}</Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </div>
  );
}
