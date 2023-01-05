import * as React from "react";
import { Button, Descriptions, Image, Space, Input, message } from "antd";
import type { DouBanResult } from "~/components/douban";
import { readDouBanHtmlFromClipboard } from "~/components/douban";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { postNotion } from "~/components/douban/post-notion.server";
import { useLocalStorage } from "react-use";

export const meta: MetaFunction = () => {
  return {
    title: "开发助手-豆瓣图书",
    referrer: "no-referrer",
  };
};

// @ts-ignore
export async function action({ request }) {
  const body = await request.formData();

  const result = JSON.parse(body.get("data"));
  const token = body.get("token");

  const success = await postNotion({
    data: result,
    token,
  });

  // return
  return json({ success });
}

export default function Douban() {
  const [data, setData] = React.useState<DouBanResult>();
  const [showConfig, setShowConfig] = React.useState(false);
  const fetcher = useFetcher();
  const [token, setToken] = useLocalStorage("notion-token", "");
  const [dataBase, setDataBase] = useLocalStorage("notion-database", "");

  console.log("fetcher", fetcher);

  if (fetcher.data && fetcher.type === "done") {
    if (fetcher.data.success) {
      message.success("同步成功");
    } else {
      message.error("同步失败");
    }
  }

  const handleReadClipboard = async () => {
    const result = await readDouBanHtmlFromClipboard();
    setData(result);
  };

  const syncToNotion = async () => {
    if (!token || !dataBase) {
      message.error("请先配置notion token和database id");
      return;
    }

    const json = {
      parent: {
        type: "database_id",
        database_id: dataBase,
      },
      properties: {
        书名: { title: [{ type: "text", text: { content: data?.title } }] },
        作者: {
          rich_text: [{ type: "text", text: { content: data?.author } }],
        },
        译者: {
          rich_text: [{ type: "text", text: { content: data?.translator } }],
        },
        出版日期: {
          rich_text: [{ type: "text", text: { content: data?.pubdate } }],
        },
        ISBN: {
          rich_text: [{ type: "text", text: { content: data?.isbn } }],
        },
        // 丛书: {
        //   rich_text: [{ type: "text", text: { content: data?.congshu } }],
        // },
        装帧: {
          rich_text: [{ type: "text", text: { content: data?.zhuangzhen } }],
        },
        出版社: { select: { name: data?.publisher } },
        // 出品方: { select: { name: data?.chupin } },
        // 时间: { date: { start: "{purchase_date}", end: null } },
        册数: { number: 1 },
        定价: { number: data?.price },
        页数: { number: data?.pages },
        // 豆瓣: { url: "{douban_url}" },
        封面: {
          files: [
            {
              name: "testname",
              type: "external",
              external: { url: data?.cover },
            },
          ],
        },
        // 出版日: { date: { start: "{publishDate}", end: null } },
      },
    };

    fetcher.submit(
      {
        data: JSON.stringify(json),
        token,
      },
      {
        method: "post",
      }
    );
  };

  return (
    <div className="douban">
      <h1>豆瓣图书</h1>
      <Space>
        <Button onClick={handleReadClipboard} type="primary">
          读取剪切板
        </Button>
        {data && (
          <Button loading={fetcher.state !== "idle"} onClick={syncToNotion}>
            同步Notion
          </Button>
        )}
        <Button onClick={() => setShowConfig(!showConfig)}>配置</Button>
      </Space>
      {showConfig && (
        <div style={{ marginTop: 10 }}>
          <Space>
            <Input
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
              placeholder="配置notion token"
            />
            <Input
              value={dataBase}
              onChange={(e) => {
                setDataBase(e.target.value);
              }}
              placeholder="配置notion database id"
            />
          </Space>
        </div>
      )}
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
