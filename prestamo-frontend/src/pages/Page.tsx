
const pages: { [key: string]: JSX.Element } = {
  "/dashboard": <h1>Dashboard Page</h1>,
  "/prestaamos": <h1>Prestamos Page</h1>,
  "/reports/sales": <h1>Sales Reports</h1>,
  "/reports/traffic": <h1>Traffic Reports</h1>,
  "/integrations": <h1>Integrations Page</h1>,
};

export function PageContent({ path }: { path: string }) {
  console.log(path)
  return pages[path as keyof typeof pages] || <h1>404 - Page Not Found</h1>;
}
