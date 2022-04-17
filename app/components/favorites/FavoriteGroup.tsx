import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Grid,
  ListItemText,
} from "@mui/material";
import { IFavoriteGroup } from "./type";

type OwnProps = {
  group: IFavoriteGroup;
};

export const FavoriteGroup: React.FC<OwnProps> = ({ group }) => {
  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Grid item spacing={2} xs={4}>
      <List subheader={<ListSubheader>{group.name}</ListSubheader>}>
        {group.list.map((item) => {
          return (
            <ListItem key={item.url}>
              <ListItemButton onClick={() => handleOpenUrl(item.url)}>
                <ListItemText primary={item.name} secondary={item.summary} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};
