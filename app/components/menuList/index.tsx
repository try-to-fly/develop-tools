import { MenuProps } from "antd";
import { Link } from "remix";

export const menuList: MenuProps["items"] = [
  { label: <Link to="/json">Json预览</Link>, key: "json" },
  { label: <Link to="/svgo">svg压缩</Link>, key: "svgo" },
  { label: <Link to="/url">url解析</Link>, key: "url" },
  { label: <Link to="/corn">corn表达式</Link>, key: "corn" },
];
