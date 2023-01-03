export type ImageType = "png" | "jpeg" | "webp";

const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const convertImage = async (
  originImage: File,
  type: ImageType
) => {
  // 获取 canvas 元素
  var canvas = document.createElement("canvas");
  // file转blob
  const originalImage = await loadImage(URL.createObjectURL(originImage));

  // 设置 canvas 的宽度和高度
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

  // 获取 canvas 的 2D 绘图环境
  var ctx = canvas.getContext("2d");

  // 将图片绘制到 canvas 上
  ctx!.drawImage(originalImage, 0, 0);

  // 获取 canvas 图像的 data URL
  var dataURL = canvas.toDataURL(`image/${type}`);

  // 将 data URL 转换为 Blob 对象
  var blob = dataURLToBlob(dataURL);

  // 转file
  var file = new File([blob], "image.webp", { type: `image/${type}` });
  return file;
};

function dataURLToBlob(dataURL: string) {
  // 解析 dataURL 的格式
  var parts = dataURL.split(";base64,");
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
