import * as React from "react";
import { FavoriteGroup } from "./FavoriteGroup";
import { FAVORITE_DATA } from "./data";
import { Grid } from "@mui/material";

/**
 * 收藏夹
 */
export const Favorite: React.FC = () => {
  return (
    <Grid container>
      {FAVORITE_DATA.map((group) => {
        return <FavoriteGroup key={group.name} group={group} />;
      })}
    </Grid>
  );
};
