import { EveryHour, TimeCorn } from "../components/corn";

import { ClientOnly } from "remix-utils";

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
