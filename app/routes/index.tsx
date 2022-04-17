import type { MetaFunction } from "remix";
import { Favorite } from "../components";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Develop tools",
    description: "开发工具合集",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <Favorite />
    </div>
  );
}
