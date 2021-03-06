import * as React from "react";
import { CodeEditor, SvgoEditor, TwoPanel } from "../components";

import styles from "codemirror/lib/codemirror.css";
import theme from "codemirror/theme/material.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: theme },
  ];
}

const svgDemo = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="120px" height="120px" viewBox="0 0 120 120"
    enable-background="new 0 0 120 120" xml:space="preserve"
>
    <style type="text/css"><![CDATA[
        svg { fill: red; }
    ]]></style>
    <g>
        <g>
            <circle fill="#ff0000" cx="60px" cy="60px" r="50px"/>
            <text>  test  </text>
        </g>
    </g>
    <g style="color: black" class="unknown-class"></g>
</svg>
`;

export default function SvgoPage() {
  const [svg, setSvg] = React.useState(svgDemo);
  return (
    <TwoPanel
      left={<CodeEditor data={svg} onChange={setSvg} />}
      right={<SvgoEditor svg={svg} />}
    />
  );
}
