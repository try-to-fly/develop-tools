import * as React from "react";
import { Grid } from "@mui/material";
import { ClientOnly } from "remix-utils";
import { CodeEditor } from "../../components";
import { JsonRightArea } from "./JsonRightArea";

// https://remix.run/docs/en/v1/guides/styling
import styles from "codemirror/lib/codemirror.css";
import theme from "codemirror/theme/material.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: theme },
  ];
}

export default function JsonMain() {
  const [json, setJson] = React.useState('{"bar": 123, "foo":"hi"}');
  return (
    // https://github.com/sergiodxa/remix-utils/search?q=ClientOnly
    <ClientOnly>
      {() => (
        <Grid container spacing={2} className="json-main">
          <Grid item xs={6}>
            <CodeEditor data={json} onChange={setJson} />
          </Grid>
          <Grid item xs={6}>
            <JsonRightArea json={json} />
          </Grid>
        </Grid>
      )}
    </ClientOnly>
  );
}
