import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/components/login-form';
export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [{ title: 'Login | JSP Sistemas Integrados' }, { name: 'description', content: 'Entre com seu e-mail e senha no JSP.' }, { property: 'og:title', content: 'Login | JSP Sistemas Integrados' }, { property: 'og:description', content: 'Entre com seu e-mail e senha no JSP.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: LoginForm,
});