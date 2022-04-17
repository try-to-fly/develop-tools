import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import * as React from "react";
import { JsonPreview, JsonToTs } from "../../components";

type OwnProps = {
  json: string;
};

/** 右侧区域 */
export const JsonRightArea: React.FC<OwnProps> = ({ json }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div>
      <Accordion
        key="1"
        expanded={expanded === "json-preview"}
        onChange={handleChange("json-preview")}
      >
        <AccordionSummary>Json预览</AccordionSummary>
        <AccordionDetails>
          <JsonPreview data={json} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        key="2"
        expanded={expanded === "to-ts"}
        onChange={handleChange("to-ts")}
      >
        <AccordionSummary>转Ts</AccordionSummary>
        <AccordionDetails>
          <JsonToTs json={json} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
