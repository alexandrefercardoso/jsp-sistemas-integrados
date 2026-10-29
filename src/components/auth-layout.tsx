import type { ReactNode } from 'react';
import { Layers3, LockKeyhole } from 'lucide-react';
import office from '@/assets/jsp-office.jpg';

export function Brand() {
  return <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><Layers3 className="size-6" /></span><div><span className="block text-xl font-bold">JSP</span><span className="block text-xs text-muted-foreground">Sistemas Integrados</span></div></div>;
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="grid min-h-svh lg:grid-cols-[0.44fr_0.56fr]">
    <aside className="relative hidden overflow-hidden lg:block"><img src={office} alt="Fachada de um edifício empresarial" width={1024} height={1536} className="absolute h-full w-full object-cover" /><div className="absolute inset-0 bg-photo-overlay" /><div className="relative flex h-full min-h-svh flex-col justify-between p-12 text-photo-foreground"><Layers3 className="size-9" /><div><p className="mb-5 text-xs uppercase tracking-widest">JSP</p><h1 className="text-4xl font-semibold leading-tight">Sistemas<br />Integrados</h1><div className="mt-8 h-1 w-12 bg-brand-highlight" /></div><p className="text-xs">JSP Sistemas Integrados</p></div></aside>
    <section className="flex min-h-svh flex-col px-6 py-8 sm:px-12"><header><Brand /></header><div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16">{children}</div><footer className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> Acesso seguro · JSP Sistemas Integrados</footer></section>
  </main>;
}