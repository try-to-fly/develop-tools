import { Link } from "remix";
import { useLocation } from "@remix-run/react";
import { List, ListItem, ListItemButton } from "@mui/material";

type MenuItem = {
  name: string;
  path: string;
};

const list: MenuItem[] = [
  { name: "Json预览", path: "/json" },
  { name: "svg压缩", path: "/svgo" },
];

export const MenuList = () => {
  const location = useLocation();
  return (
    <List component="nav" className="menu-list">
      {list.map((item) => {
        return (
          <ListItem
            selected={location.pathname === item.path}
            key={item.name}
            disablePadding
          >
            <ListItemButton>
              <Link to={item.path} prefetch="intent">
                {item.name}
              </Link>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
