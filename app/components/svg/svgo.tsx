import * as React from "react";
import { ClientOnly } from "remix-utils";
import { optimize, OptimizedSvg } from "svgo";
import { UnControllCodeEditor } from "../editor";

type OwnProps = {
  svg: string;
};

export const SvgoEditor: React.FC<OwnProps> = ({ svg }) => {
  const [optimizedSvg, setOptimizedSvg] = React.useState("");
  React.useEffect(() => {
    const result = optimize(svg);
    setOptimizedSvg((result as OptimizedSvg).data);
  }, [svg]);
  return (
    <ClientOnly>
      {() => <UnControllCodeEditor code={optimizedSvg} />}
    </ClientOnly>
  );
};
