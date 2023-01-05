import { Link } from "@remix-run/react";
import type { MenuProps } from "antd";

export const menuList: MenuProps["items"] = [
  { label: <Link to="/json">Json预览</Link>, key: "json" },
  { label: <Link to="/svgo">svg压缩</Link>, key: "svgo" },
  { label: <Link to="/url">url解析</Link>, key: "url" },
  { label: <Link to="/corn">corn表达式</Link>, key: "corn" },
  { label: <Link to="/text-reg">文本正则</Link>, key: "text-reg" },
  { label: <Link to="/image">图片处理</Link>, key: "image" },
  { label: <Link to="/douban-book">豆瓣图书</Link>, key: "douban" },
];
