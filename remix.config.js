/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = process.env.VERCEL_ENV
  ? {
      serverBuildTarget: "vercel",
      server:
        process.env.NODE_ENV === "development" ? undefined : "./server.js",
      cacheDirectory: "./node_modules/.cache/remix",
      ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
      serverDependenciesToBundle: [],
    }
  : {
      cacheDirectory: "./node_modules/.cache/remix",
      ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
      serverDependenciesToBundle: [],
    };
