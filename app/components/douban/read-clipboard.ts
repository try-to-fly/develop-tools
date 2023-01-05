import { readClipboard } from "~/libs";

export type DouBanResult = Partial<{
  publisher: string;
  brand: string;
  translator: string;
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

export const readDouBanHtmlFromClipboard = async (): Promise<DouBanResult> => {
  const result = await readClipboard();
  const text = result["text/plain"] || "";
  const html = result["text/html"];

  const publisher = text.match(/出版社:\s+(.+)/)?.[1];
  const chupin = text.match(/出品方:\s+(.+)/)?.[1];
  const yizhe = text.match(/译者:\s+(.+)/)?.[1];
  const pubdate = text.match(/出版年:\s+(.+)/)?.[1];
  const pages = text.match(/页数:\s+(.+)/)?.[1];
  const price = text.match(/定价:\s+(.+)/)?.[1];
  const zhuangzhen = text.match(/装帧:\s+(.+)/)?.[1];
  const congshu = text.match(/丛书:\s+(.+)/)?.[1];
  const isbn = text.match(/ISBN:\s+(.+)/)?.[1];

  const dom = new DOMParser().parseFromString(html || "", "text/html");
  const titleEl = dom.querySelector("#content .nbg");
  const title = titleEl?.getAttribute("title") || "";
  const cover = titleEl?.getAttribute("href") || "";

  const authorEl = dom.querySelector("#content #info > span a");
  const author = authorEl?.textContent || "";

  return {
    publisher,
    brand: chupin,
    translator: yizhe,
    pubdate,
    pages,
    price,
    zhuangzhen,
    congshu,
    isbn,
    title,
    cover,
    author,
  };
};
