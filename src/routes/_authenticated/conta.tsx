import { useState, type FormEvent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LogOut, Save, UserRound, Loader2 } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/profile.functions';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/auth-layout';

const profileOptions = { queryKey: ['profile'], queryFn: () => getProfile() };
export const Route = createFileRoute('/_authenticated/conta')({
  head: () => ({ meta: [{ title: 'Minha conta | JSP Sistemas Integrados' }, { name: 'description', content: 'Seu perfil no JSP Sistemas Integrados.' }, { property: 'og:title', content: 'Minha conta | JSP Sistemas Integrados' }, { property: 'og:description', content: 'Seu perfil no JSP Sistemas Integrados.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileOptions), component: Account,
});
function Account() {
  const { data } = useSuspenseQuery(profileOptions);
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();
  const [name, setName] = useState(data.display_name);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function save(event: FormEvent) { event.preventDefault(); setBusy(true); setError(''); setMessage(''); try { await saveProfile({ data: { name } }); await queryClient.invalidateQueries({ queryKey: ['profile'] }); setMessage('Nome salvo.'); } catch { setError('Não foi possível salvar seu nome. Tente novamente.'); } finally { setBusy(false); } }
  async function signOut() { setBusy(true); setError(''); await queryClient.cancelQueries(); queryClient.clear(); const { error } = await supabase.auth.signOut(); if (error) { setError('Não foi possível sair. Tente novamente.'); setBusy(false); return; } await navigate({ to: '/auth', replace: true }); }
  return <main className="min-h-svh bg-background"><header className="flex items-center justify-between gap-4 border-b border-border px-6 py-6 sm:px-12"><Brand /><Button variant="outline" onClick={signOut} disabled={busy}><LogOut /> Sair</Button></header><section className="mx-auto max-w-2xl px-6 py-16"><UserRound className="mb-5 size-9 text-primary" /><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Minha conta</p><h1 className="text-3xl font-semibold">{data.display_name ? `Olá, ${data.display_name}` : 'Bem-vindo ao JSP'}</h1><form onSubmit={save} className="mt-10 max-w-md space-y-6"><div><label htmlFor="name" className="mb-2 block text-sm font-medium">Nome</label><input id="name" className="auth-input" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required maxLength={120} placeholder="Seu nome" /></div><div><span className="mb-2 block text-sm font-medium">E-mail</span><p className="break-all text-muted-foreground">{data.email}</p></div>{message && <p role="status" className="text-sm text-primary">{message}</p>}{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} type="submit">{busy ? <Loader2 className="animate-spin" /> : <Save />} Salvar nome</Button></form></section></main>;
}