import { LinksFunction } from "remix";
import { EveryHour, TimeCorn } from "../components/corn";

import antdCss from "antd/dist/reset.css";
import { ClientOnly } from "remix-utils";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: antdCss }];
};

export default function Cron() {
  return (
    <ClientOnly>
      {() => (
        <div className="corn">
          <EveryHour />
          <TimeCorn />
        </div>
      )}
    </ClientOnly>
  );
}
