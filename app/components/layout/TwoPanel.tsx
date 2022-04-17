import * as React from "react";
import { Grid } from "@mui/material";
import { ClientOnly } from "remix-utils";

type OwnProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

/**
 * 并排双面板
 */
export const TwoPanel: React.FC<OwnProps> = ({ left, right }) => {
  return (
    // https://github.com/sergiodxa/remix-utils/search?q=ClientOnly
    <ClientOnly>
      {() => (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {left}
          </Grid>
          <Grid item xs={6}>
            {right}
          </Grid>
        </Grid>
      )}
    </ClientOnly>
  );
};
