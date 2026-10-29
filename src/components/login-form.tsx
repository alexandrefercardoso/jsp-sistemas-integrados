import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AuthLayout } from './auth-layout';
import { useAuth } from './auth-context';
import { recoveryRedirect } from '@/lib/auth-rules';

export function LoginForm() {
  const { user, loading, recovery } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'forgot' | 'sent'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  function changeMode(next: typeof mode) { setMode(next); setError(''); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: recoveryRedirect(window.location.origin) });
        if (error) throw error;
        setMode('sent');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        await navigate({ to: '/conta' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setError(message.includes('Invalid login') ? 'E-mail ou senha incorretos.' : message.includes('Email not confirmed') ? 'Confirme seu e-mail antes de entrar.' : message.includes('rate') ? 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' : 'Não foi possível concluir. Verifique sua conexão e tente novamente.');
    } finally { setBusy(false); }
  }
  return <AuthLayout>{loading ? <Loader2 className="mx-auto animate-spin text-primary" /> : recovery ? <><h2 className="text-3xl font-semibold">Recuperar senha</h2><Button asChild className="mt-8"><Link to="/reset-password">Definir nova senha <ArrowRight /></Link></Button></> : user ? <><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Sua conta</p><h2 className="text-3xl font-semibold">Você está conectado</h2><p className="mt-3 break-all text-muted-foreground">{user.email}</p><Button asChild className="mt-8 h-12"><Link to="/conta">Acessar minha conta <ArrowRight /></Link></Button></> : mode === 'sent' ? <><CheckCircle2 className="mb-6 size-10 text-primary" /><h2 className="text-3xl font-semibold">Confira seu e-mail</h2><p className="mt-4 leading-relaxed text-muted-foreground">Se houver uma conta com esse e-mail, você receberá um link para definir uma nova senha.</p><Button variant="outline" className="mt-8 h-12" onClick={() => changeMode('login')}><ArrowLeft /> Voltar ao login</Button></> : <>
    {mode === 'forgot' && <Button variant="ghost" className="mb-8 w-fit pl-0" onClick={() => changeMode('login')}><ArrowLeft /> Voltar</Button>}
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{mode === 'login' ? 'Bem-vindo ao JSP' : 'Recuperação de acesso'}</p>
    <h2 className="text-3xl font-semibold">{mode === 'login' ? 'Entre na sua conta' : 'Esqueceu a senha?'}</h2>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mode === 'login' ? 'É bom ter você de volta.' : 'Informe seu e-mail para receber o link de recuperação.'}</p>
    <form onSubmit={submit} className="mt-9 space-y-6">
      <div><label htmlFor="email" className="mb-2 block text-sm font-medium">E-mail</label><div className="relative"><Mail className="absolute left-3.5 top-4 size-4 text-muted-foreground" /><input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="auth-input pl-11" /></div></div>
      {mode === 'login' && <div><label htmlFor="password" className="mb-2 block text-sm font-medium">Senha</label><div className="relative"><input id="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" className="auth-input pr-12" /><Button type="button" size="icon" variant="ghost" title={visible ? 'Ocultar senha' : 'Mostrar senha'} aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setVisible(!visible)} className="absolute right-1.5 top-1.5">{visible ? <EyeOff /> : <Eye />}</Button></div><div className="mt-2 flex justify-end"><Button type="button" variant="link" className="h-auto px-0 text-xs" onClick={() => changeMode('forgot')}>Esqueceu sua senha?</Button></div></div>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy} className="h-12 w-full">{busy ? <Loader2 className="animate-spin" /> : null}{mode === 'login' ? 'Entrar' : 'Enviar link de recuperação'}{!busy && <ArrowRight />}</Button>
    </form>
  </>}</AuthLayout>;
}