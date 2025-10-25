import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { User } from '../types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

      if (error) {
        console.error('Error fetching user profile:', error);
        Sentry.captureException(error);
        setLoading(false);
        return;
      }

      setUser(data);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
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

      return { error: null };
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
    if (user) {
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
