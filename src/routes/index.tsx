import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acesso | JSP Sistemas Integrados" },
      { name: "description", content: "Acesse sua conta no JSP Sistemas Integrados." },
      { property: "og:title", content: "Acesso | JSP Sistemas Integrados" },
      { property: "og:description", content: "Acesse sua conta no JSP Sistemas Integrados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginForm,
});
