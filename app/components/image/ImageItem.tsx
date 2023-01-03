import * as React from "react";
import { Image, Space , Card} from "antd";
import bytes from "bytes";

/**
 * 图片元素
 */
export const ImageItem = ({
  originImage,
  outputImage,
}: {
  originImage?: File;
  outputImage?: File;
}) => {
  return (
    <Card style={{
      display: "inline-block",
      width: 420,
      marginRight: 10,
      marginBottom: 10,
    }} size="small" className="image-item" title={originImage?.name}>
      <Space>
        {originImage && <ImageInfo file={originImage} />}
        {outputImage && <ImageInfo file={outputImage} />}
      </Space>
    </Card>
  );
};

function ImageInfo({ file }: { file: File }) {
  const src = URL.createObjectURL(file);
  const size = file.size;
  const type = file.type;

  return (
    <div>
      <Image width={200} src={src} />
      <div>
        <span>{type}</span>
        <span>{bytes(size)}</span>
      </div>
    </div>
  );
}
