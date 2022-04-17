import type { MetaFunction } from "remix";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to Remix!</h2>
        <p>We're stoked that you're here. 🥳</p>
      </main>
    </div>
  );
}
