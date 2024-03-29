import { Outlet, useCatch, Meta, Links, ScrollRestoration, Scripts, LiveReload, useLocation } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import globalStylesUrl from "~/styles/global.css";
import normalizeCss from "normalize.css";
import tailwindCss from "~/styles/tailwind.css";
import { Layout, Menu, theme } from "antd";
import { menuList } from "./components/menuList";
import { ClientOnly } from "remix-utils";
import antdCss from "antd/dist/reset.css";


// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    { rel: "stylesheet", href: normalizeCss },
    // { rel: "stylesheet", href: tailwindCss },
    { rel: "stylesheet", href: antdCss }
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <PageLayout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </PageLayout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <PageLayout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </PageLayout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  return (
    <div className="remix-app">
      <Layout>
        <Layout.Header className="header">
          <div className="text-white">工具集</div>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname.replace(/^\//, "")]}
              style={{ height: "100%", borderRight: 0 }}
              items={menuList}
            />
          </Layout.Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Layout.Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <ClientOnly>{() => children}</ClientOnly>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
