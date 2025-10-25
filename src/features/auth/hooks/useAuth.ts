import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Session, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthUser extends User {
  capabilities?: {
    can_buy: boolean;
    can_sell: boolean;
    can_withdraw: boolean;
    can_boost: boolean;
  };
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setState(prev => ({ ...prev, error: error.message, loading: false }));
      } else {
        setState(prev => ({
          ...prev,
          session,
          user: (session?.user as AuthUser) || null,
          loading: false,
        }));
      }
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Récupérer les capabilities de l'utilisateur
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('capabilities')
          .eq('id', session.user.id)
          .single();

        if (userError) {
          console.error('Erreur lors de la récupération des capabilities:', userError);
        }

        setState(prev => ({
          ...prev,
          session,
          user: {
            ...session.user,
            capabilities: userData?.capabilities || {
              can_buy: true,
              can_sell: false,
              can_withdraw: false,
              can_boost: false,
            },
          } as AuthUser,
          loading: false,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          session: null,
          user: null,
          loading: false,
          error: null,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithPhone = async (phone: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const signInWithEmail = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: undefined,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const verifyOTP = async (phoneOrEmail: string, token: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneOrEmail.startsWith('+') ? phoneOrEmail : '+221000000000',
        token,
        type: 'sms',
      });

      if (error) throw error;

      // Créer le profil utilisateur s'il n'existe pas
      if (data.user) {
        const { error: profileError } = await supabase.from('users').upsert({
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phone,
          created_at: new Date().toISOString(),
          capabilities: {
            can_buy: true,
            can_sell: false,
            can_withdraw: false,
            can_boost: false,
          },
        });

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
        }
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const updateCapabilities = async (capabilities: Partial<AuthUser['capabilities']>) => {
    if (!state.user) return;

    try {
      const { error } = await supabase.from('users').update({ capabilities }).eq('id', state.user.id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: prev.user
          ? {
              ...prev.user,
              capabilities: {
                can_buy: prev.user.capabilities?.can_buy || false,
                can_sell: prev.user.capabilities?.can_sell || false,
                can_withdraw: prev.user.capabilities?.can_withdraw || false,
                can_boost: prev.user.capabilities?.can_boost || false,
                ...capabilities,
              },
            }
          : null,
      }));
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  };

  return {
    ...state,
    signInWithPhone,
    signInWithEmail,
    verifyOTP,
    signOut,
    updateCapabilities,
  };
};
