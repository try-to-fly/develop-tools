import * as React from "react";
import { ClientOnly } from "remix-utils";
import type { Output } from "svgo";
import { optimize } from "svgo";
import { CodeEditor } from "../editor";

type OwnProps = {
  svg: string;
};

export const SvgoEditor: React.FC<OwnProps> = ({ svg }) => {
  const [optimizedSvg, setOptimizedSvg] = React.useState("");
  React.useEffect(() => {
    const result = optimize(svg);
    setOptimizedSvg((result as Output).data);
  }, [svg]);
  return (
    <ClientOnly>
      {() => <CodeEditor data={optimizedSvg} />}
    </ClientOnly>
  );
};
