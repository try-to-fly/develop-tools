import { message } from "antd";
import pMap from "p-map";

export type Result = Partial<{
  "text/plain": string;
  "text/html": string;
  "image/png": Blob;
}>;

export const readClipboard = () => {
  return new Promise<Result>(async (resolve, reject) => {
    try {
      const permission = await navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
      });
      if (permission.state === "denied") {
        message.error("需要剪切板权限");
        throw new Error("Clipboard permission denied.");
      }
      const clipboardContents = await navigator.clipboard.read();
      const result: Result = {};
      for (const item of clipboardContents) {
        await pMap(item.types, async (type) => {
          const blob = await item.getType(type);
          switch (type) {
            case "text/plain":
            case "text/html":
              result[type] = await blob.text();
              break;
            case "image/png":
              result[type] = blob;
              break;
            default:
              (result as any)[type] = blob;
              break;
          }
        });
      }
      resolve(result);
    } catch (error) {
      console.error(error);
      message.error("剪切板读取失败");
      reject(error);
    }
  });
};
