import * as React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

type OwnProps = {
  url: string;
};

export const UrlSummary: React.FC<OwnProps> = ({ url }) => {
  const { host, protocol, port, pathname, hash, origin } = parseUrl(url);
  const list = [
    { name: "域名", value: host },
    { name: "协议", value: protocol },
    { name: "端口", value: port },
    { name: "路径", value: pathname },
    { name: "hash", value: hash },
    { name: "origin", value: origin },
  ];
  return (
    <List className="url-summary">
      {list
        .filter((item) => item.value)
        .map((item) => {
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemText primary={item.name} secondary={item.value} />
            </ListItem>
          );
        })}
    </List>
  );
};

export function parseUrl(url: string): URL {
  try {
    return new URL(url);
  } catch (error) {
    return {} as any;
  }
}
