import { message } from "antd";

/** 从剪切板中读取数据 */
export const readImgFromClipboard = async () => {
  return new Promise<File>(async (resolve, reject) => {
    try {
      const permission = await navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
      });
      if (permission.state === "denied") {
        throw new Error("Clipboard permission denied.");
      }
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
        if (!item.types.includes("image/png")) {
          throw new Error("Clipboard contains non-image data.");
        }
        const blob = await item.getType("image/png");

        // blob转file
        const file = new File([blob], "clipboard.png", { type: "image/png" });
        resolve(file);
      }
    } catch (error) {
      console.error(error);
      message.error("剪切板读取失败");
      reject(error);
    }
  });
};
