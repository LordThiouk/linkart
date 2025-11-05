import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';

import { User } from '../types';
import { supabase } from '../utils/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string) => Promise<{ error: any }>;
  signInWithEmail: (email: string) => Promise<{ error: any }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ error: any }>;
  verifyEmailOtp: (email: string, otp: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 [AuthContext] Initialisation du AuthProvider...');
    console.log('🔐 [AuthContext] Client Supabase:', supabase ? 'défini' : 'undefined');
    console.log('🔐 [AuthContext] supabase.auth:', supabase?.auth ? 'défini' : 'undefined');

    // Get initial session
    console.log('🔐 [AuthContext] Appel de supabase.auth.getSession()...');
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        console.log('🔐 [AuthContext] getSession() résultat:', { session: session ? 'défini' : 'null', error });
        if (error) {
          console.error('❌ [AuthContext] Erreur getSession():', error);
        }
        if (session?.user) {
          console.log('🔐 [AuthContext] Session trouvée, récupération du profil...');
          fetchUserProfile(session.user.id);
        } else {
          console.log('🔐 [AuthContext] Aucune session, mise à jour du loading...');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('❌ [AuthContext] Erreur lors de getSession():', error);
        console.error('❌ [AuthContext] Error type:', error?.constructor?.name);
        console.error('❌ [AuthContext] Error message:', (error as Error)?.message);
        console.error('❌ [AuthContext] Error stack:', (error as Error)?.stack);
        setLoading(false);
      });

    // Listen for auth changes
    console.log('🔐 [AuthContext] Configuration de onAuthStateChange()...');
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔐 [AuthContext] onAuthStateChange event:', event);
        console.log('🔐 [AuthContext] onAuthStateChange session:', session ? 'défini' : 'null');
        if (session?.user) {
          console.log('🔐 [AuthContext] Session trouvée dans onAuthStateChange, récupération du profil...');
          await fetchUserProfile(session.user.id);
        } else {
          console.log('🔐 [AuthContext] Aucune session dans onAuthStateChange');
          setUser(null);
          setLoading(false);
        }
      });
      console.log('🔐 [AuthContext] Subscription créée:', subscription ? 'défini' : 'undefined');

      return () => {
        console.log('🔐 [AuthContext] Nettoyage de la subscription...');
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('❌ [AuthContext] Erreur lors de onAuthStateChange():', error);
      if (error instanceof Error) {
        console.error('❌ [AuthContext] Error type:', error.constructor.name);
        console.error('❌ [AuthContext] Error message:', error.message);
        console.error('❌ [AuthContext] Error stack:', error.stack);
      } else {
        console.error('❌ [AuthContext] Error (unknown type):', JSON.stringify(error));
      }
    }
  }, []);

  const fetchUserProfile = async (userId: string) => {
    console.log('👤 [AuthContext] fetchUserProfile appelé avec userId:', userId);
    try {
      console.log('👤 [AuthContext] Appel de supabase.from("users")...');
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      console.log('👤 [AuthContext] Résultat de la requête:', { data: data ? 'défini' : 'null', error });

      if (error) {
        console.error('❌ [AuthContext] Erreur lors de la récupération du profil:', error);
        Sentry.captureException(error);
        setLoading(false);
        return;
      }

      console.log('✅ [AuthContext] Profil utilisateur récupéré avec succès');
      setUser(data);
    } catch (error) {
      console.error('❌ [AuthContext] Erreur dans fetchUserProfile:', error);
      if (error instanceof Error) {
        console.error('❌ [AuthContext] Error type:', error.constructor.name);
        console.error('❌ [AuthContext] Error message:', error.message);
        console.error('❌ [AuthContext] Error stack:', error.stack);
      }
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
        options: {
          channel: 'sms',
        },
      });

      if (error) {
        Sentry.captureException(error);
        return { error };
      }

      return { error: null as any };
    } catch (error) {
      Sentry.captureException(error);
      return { error };
    }
  };

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (error) {
        Sentry.captureException(error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      Sentry.captureException(error);
      return { error };
    }
  };

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (error) {
        Sentry.captureException(error);
        return { error };
      }

      if (data.user) {
        // Create or update user profile
        const { error: profileError } = await supabase.from('users').upsert({
          id: data.user.id,
          phone: phone,
          name: data.user.user_metadata?.name || 'Utilisateur',
          capabilities: {
            can_buy: true,
            can_sell: false,
            can_withdraw: false,
            can_boost: false,
          },
        });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          Sentry.captureException(profileError);
        }
      }

      return { error: null };
    } catch (error) {
      Sentry.captureException(error);
      return { error };
    }
  };

  const verifyEmailOtp = async (email: string, otp: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) {
        Sentry.captureException(error);
        return { error };
      }

      if (data.user) {
        // Create or update user profile
        const { error: profileError } = await supabase.from('users').upsert({
          id: data.user.id,
          email: email,
          name: data.user.user_metadata?.name || 'Utilisateur',
          capabilities: {
            can_buy: true,
            can_sell: false,
            can_withdraw: false,
            can_boost: false,
          },
        });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          Sentry.captureException(profileError);
        }
      }

      return { error: null };
    } catch (error) {
      Sentry.captureException(error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) return { error: new Error('No user logged in') };

      const { error } = await supabase.from('users').update(updates).eq('id', user.id);

      if (error) {
        Sentry.captureException(error);
        return { error };
      }

      // Update local user state
      setUser({ ...user, ...updates });
      return { error: null };
    } catch (error) {
      Sentry.captureException(error);
      return { error };
    }
  };

  const refreshUser = async () => {
    if (user && user.id) {
      await fetchUserProfile(user.id);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signInWithEmail,
    verifyOtp,
    verifyEmailOtp,
    signOut,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
