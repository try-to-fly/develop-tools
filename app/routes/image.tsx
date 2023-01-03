import { Button, Empty, message, Space, Radio } from "antd";
import * as React from "react";
import { v4 as uuid } from "uuid";
import zip from "jszip";
import is from "@sindresorhus/is";
import { ImageItem } from "~/components/image";
import type { ImageType } from "~/components/image/convert-img";
import { convertImage } from "~/components/image/convert-img";
import { readImgFromClipboard } from "~/components/image/clipboard";

const imageTypes: ImageType[] = ["png", "jpeg", "webp"];

interface IFile extends File {
  uuid: string;
}

export default function ImageRoute() {
  const [originFiles, setOriginFiles] = React.useState<IFile[]>([]);
  const [resultUrl, setResultUrl] = React.useState<File[]>();
  const [fileType, setFileType] = React.useState<ImageType>(
    "webp" as ImageType
  );

  const handleConvertImage = async (type: ImageType, files = originFiles) => {
    const result = await Promise.all(
      files.map(async (file) => await convertImage(file, type))
    );
    setResultUrl(result);
  };

  const handleSelectImage = async () => {
    const files = await window.showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
          },
        },
      ],
    });
    const originFiles = await Promise.all(
      files.map(async (file) => {
        const fileHandle = await file.getFile();
        return Object.assign(fileHandle, { uuid: uuid() }) as IFile;
      })
    );
    setOriginFiles(originFiles);

    handleConvertImage(fileType, originFiles);
  };

  const downloadImages = () => {
    if (!resultUrl) {
      message.error("请先转换图片");
      return;
    }
    // 生成zip文件
    const zipFile = new zip();
    const folder = zipFile.folder("images");
    resultUrl.forEach((file, index) => {
      const ext = file.type.split("/")[1];
      const name = `${index + 1}.${ext}`;
      folder!.file(name, file);
    });
    zipFile.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      a.click();
    });
  };

  const handleReadClipboard = async () => {
    const file = await readImgFromClipboard();
    if (!file) {
      message.error("剪切板中没有图片");
      return;
    }
    const files = [Object.assign(file, { uuid: uuid() }) as IFile]
    setOriginFiles(files);
    handleConvertImage(fileType, files);
  };

  React.useEffect(() => {
    document.addEventListener("paste", handleReadClipboard);
    return () => {
      document.removeEventListener("paste", handleReadClipboard);
    }
  }, [])

  return (
    <div className="image">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Button.Group size="small">
            <Button size="small" type="primary" onClick={handleSelectImage}>
              选择图片
            </Button>
            <Button onClick={handleReadClipboard}>读取剪切板</Button>
          </Button.Group>
          {originFiles.length > 0 && (
            <Radio.Group
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              size="small"
            >
              {imageTypes.map((type) => {
                return (
                  <Radio.Button
                    key={type}
                    value={type}
                    onClick={() => handleConvertImage(type)}
                  >
                    转换为{type}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
          {is.nonEmptyArray(resultUrl) && (
            <Button onClick={downloadImages} size="small" type="primary">
              下载
            </Button>
          )}
          {is.nonEmptyArray(originFiles) && (
            <Button
              danger
              size="small"
              onClick={() => {
                setOriginFiles([]);
                setResultUrl([]);
              }}
            >
              清空
            </Button>
          )}
        </Space>
        <div className="list">
          {originFiles.map((file, index) => (
            <ImageItem
              key={file.uuid}
              originImage={file}
              outputImage={resultUrl?.[index]}
            />
          ))}
        </div>
        {originFiles.length === 0 && <Empty description="请选择图片" />}
      </Space>
    </div>
  );
}
