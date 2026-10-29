import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JSP Sistemas Integrados" },
      { name: "description", content: "JSP Sistemas Integrados" },
      { property: "og:title", content: "JSP Sistemas Integrados" },
      { property: "og:description", content: "JSP Sistemas Integrados" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">JSP Sistemas Integrados</h1>
    </main>
  );
}
