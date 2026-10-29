import { useEffect, useState, type FormEvent } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth-layout';
import { useAuth } from '@/components/auth-context';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { isRecoveryHash, passwordError } from '@/lib/auth-rules';
export const Route = createFileRoute('/reset-password')({ head: () => ({ meta: [{ title: 'Nova senha | JSP Sistemas Integrados' }, { name: 'description', content: 'Defina uma nova senha para sua conta JSP.' }, { property: 'og:title', content: 'Nova senha | JSP Sistemas Integrados' }, { property: 'og:description', content: 'Defina uma nova senha para sua conta JSP.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: ResetPassword });
function ResetPassword() {
  const { user, loading, recovery, finishRecovery } = useAuth();
  const [hashRecovery, setHashRecovery] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => { setHashRecovery(isRecoveryHash(window.location.hash)); }, []);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); const invalid = passwordError(password, confirmation); if (invalid) { setError(invalid); return; } if (!user || !(recovery || hashRecovery)) { setError('Link inválido. Solicite um novo link de recuperação.'); return; } setBusy(true); try { const { error } = await supabase.auth.updateUser({ password }); if (error) throw error; finishRecovery(); window.history.replaceState(null, '', '/reset-password'); setDone(true); } catch { setError('Não foi possível atualizar. O link pode ter expirado; solicite outro ou tente uma senha diferente.'); } finally { setBusy(false); } }
  return <AuthLayout>{loading ? <Loader2 className="mx-auto animate-spin text-primary" /> : done ? <><CheckCircle2 className="mb-6 size-10 text-primary" /><h2 className="text-3xl font-semibold">Senha atualizada</h2><Button className="mt-8 h-12" onClick={() => navigate({ to: '/conta' })}>Acessar minha conta</Button></> : !user || !(recovery || hashRecovery) ? <><h2 className="text-3xl font-semibold">Link inválido ou expirado</h2><p className="mt-4 text-sm text-muted-foreground">Solicite um novo link em “Esqueceu sua senha?”.</p><Button asChild variant="outline" className="mt-8 h-12"><Link to="/auth"><ArrowLeft /> Voltar ao login</Link></Button></> : <><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Recuperação de acesso</p><h2 className="text-3xl font-semibold">Defina sua nova senha</h2><form onSubmit={submit} className="mt-9 space-y-6"><div><label htmlFor="new-password" className="mb-2 block text-sm font-medium">Nova senha</label><input id="new-password" type="password" autoComplete="new-password" required minLength={6} className="auth-input" value={password} onChange={e => setPassword(e.target.value)} /></div><div><label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">Confirmar nova senha</label><input id="confirm-password" type="password" autoComplete="new-password" required minLength={6} className="auth-input" value={confirmation} onChange={e => setConfirmation(e.target.value)} /></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} className="h-12 w-full">{busy && <Loader2 className="animate-spin" />} Salvar nova senha</Button></form></>}</AuthLayout>;
}