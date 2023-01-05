import { readClipboard } from "~/libs";

/** 从剪切板中读取数据 */
export const readImgFromClipboard = async () => {
  const result = await readClipboard();

  if (!result["image/png"]) {
    throw new Error("剪切板中没有图片");
  }
  return result["image/png"] as Blob;
};
