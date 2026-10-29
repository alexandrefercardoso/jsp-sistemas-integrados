import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

export const getProfile = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from('profiles').select('display_name').eq('id', context.userId).single();
    if (error) throw new Error('Não foi possível carregar seu nome.');
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError) throw new Error('Sua sessão expirou. Entre novamente.');
    return { display_name: data.display_name, email: auth.user?.email ?? '' };
  });

export const saveProfile = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ name: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: profile, error } = await context.supabase.from('profiles').update({ display_name: data.name }).eq('id', context.userId).select('display_name').single();
    if (error) throw new Error('Não foi possível salvar seu nome.');
    return profile;
  });