import { TimePicker } from "antd";
import * as React from "react";
import { CornWrap } from "~/components/corn/CornWrap.client";
import dayjs from "dayjs";

export const TimeCorn = () => {
  const [time, setTime] = React.useState<dayjs.Dayjs>();
  const [corn, setCorn] = React.useState<string>("");

  const handleChange = (time: dayjs.Dayjs | null) => {
    if (!time) return;
    setCorn(`0 ${time.minute()} ${time.hour()} * * *`);
    setTime(time);
  };
  return (
    <CornWrap name="每天的几点" value={corn}>
      <TimePicker
        value={time}
        format="HH:mm"
        onChange={handleChange}
      ></TimePicker>
    </CornWrap>
  );
};
