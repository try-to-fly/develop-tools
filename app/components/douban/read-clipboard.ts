import { message } from "antd";

export type DouBanResult = Partial<{
  publisher: string;
  chupin: string;
  yizhe: string;
  pubdate: string;
  pages: string;
  price: string;
  zhuangzhen: string;
  congshu: string;
  isbn: string;
  title: string;
  cover: string;
  author: string;
}>;

export const readDouBanHtmlFromClipboard = async () => {
  return new Promise<DouBanResult>(async (resolve, reject) => {
    try {
      const permission = await navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
      });
      if (permission.state === "denied") {
        throw new Error("Clipboard permission denied.");
      }
      const clipboardContents = await navigator.clipboard.read();
      const result: DouBanResult = {};
      for (const item of clipboardContents) {
        if (item.types.includes("text/plain")) {
          // 纯文本
          const blob = await item.getType("text/plain");
          // 转text
          const text = await blob.text();
          const publisher = text.match(/出版社:\s+(.+)/)?.[1];
          const chupin = text.match(/出品方:\s+(.+)/)?.[1];
          const yizhe = text.match(/译者:\s+(.+)/)?.[1];
          const pubdate = text.match(/出版年:\s+(.+)/)?.[1];
          const pages = text.match(/页数:\s+(.+)/)?.[1];
          const price = text.match(/定价:\s+(.+)/)?.[1];
          const zhuangzhen = text.match(/装帧:\s+(.+)/)?.[1];
          const congshu = text.match(/丛书:\s+(.+)/)?.[1];
          const isbn = text.match(/ISBN:\s+(.+)/)?.[1];

          Object.assign(result, {
            publisher,
            chupin,
            yizhe,
            pubdate,
            pages,
            price,
            zhuangzhen,
            congshu,
            isbn,
          });
        }
        if (item.types.includes("text/html")) {
          const blob = await item.getType("text/html");
          const html = await blob.text();
          const dom = new DOMParser().parseFromString(html, "text/html");
          const titleEl = dom.querySelector("#content .nbg");
          const title = titleEl?.getAttribute("title");
          const cover = titleEl?.getAttribute("href");

          const authorEl = dom.querySelector("#content #info > span a");
          const author = authorEl?.textContent;

          Object.assign(result, {
            title,
            cover,
            author,
          });
        }
      }

      resolve(result);
    } catch (error) {
      console.error(error);
      message.error("剪切板读取失败");
      reject(error);
    }
  });
};
