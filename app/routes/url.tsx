import { TextField, Stack } from "@mui/material";
import * as React from "react";
import { UrlSummary, QueryString, TwoPanel } from "../components";

export default function UrlPage() {
  const [url, setUrl] = React.useState("");
  return (
    <TwoPanel
      left={
        <TextField
          label="url"
          placeholder="请输入url"
          multiline
          fullWidth
          rows={10}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      }
      right={
        <div className="url-result">
          <Stack spacing={2}>
            <h3>url概要:</h3>
            <UrlSummary url={url} />
            <h3>查询参数:</h3>
            <QueryString url={url} />
          </Stack>
        </div>
      }
    />
  );
}
