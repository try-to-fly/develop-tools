import * as React from "react";
import { Select } from "antd";
import { CornWrap } from "./CornWrap.client";
import is from "@sindresorhus/is";

const options = Array.from({ length: 24 }, (v, k) => k + 1).map((v) => ({
  label: v,
  value: v,
}));

/**
 * 每天的某几小时
 */
export const EveryHour = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const [corn, setCorn] = React.useState<string>("");

  const handleChange = (value: string[]) => {
    setValue(value);
    if (is.nonEmptyArray(value)) {
      setCorn(`0 0 ${value.join(",")} * * *`);
    }
  };

  return (
    <CornWrap name="每天的某几小时" value={corn}>
      <Select
        style={{
          width: "200px",
        }}
        size="small"
        mode="multiple"
        value={value}
        options={options}
        onChange={handleChange}
      ></Select>
    </CornWrap>
  );
};
