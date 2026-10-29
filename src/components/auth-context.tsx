import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export const AuthContext = createContext<{ user: User | null; loading: boolean; recovery: boolean; finishRecovery: () => void }>({ user: null, loading: true, recovery: false, finishRecovery: () => {} });
export const useAuth = () => useContext(AuthContext);