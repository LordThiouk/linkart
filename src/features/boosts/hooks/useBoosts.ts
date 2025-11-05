import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { Boost } from '../../../types';

export interface BoostOption {
  id: string;
  name: string;
  duration: number; // en jours
  price: number;
  description: string;
  icon: string;
}

export interface UseBoostsOptions {
  productId?: string;
  includeActive?: boolean;
  includeExpired?: boolean;
}

export const useBoosts = (options: UseBoostsOptions = {}) => {
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BOOST_OPTIONS: BoostOption[] = [
    {
      id: 'product_boost_7d',
      name: 'Boost Produit',
      duration: 7,
      price: 2000,
      description: 'Mise en avant pendant 7 jours',
      icon: 'rocket-launch',
    },
    {
      id: 'product_boost_30d',
      name: 'Boost Produit Premium',
      duration: 30,
      price: 5000,
      description: 'Mise en avant pendant 30 jours',
      icon: 'star',
    },
    {
      id: 'profile_boost_14d',
      name: 'Boost Profil',
      duration: 14,
      price: 3000,
      description: 'Mise en avant du profil pendant 14 jours',
      icon: 'account',
    },
  ];

  const fetchBoosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      let query = supabase
        .from('boosts')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false });

      if (options.productId) {
        query = query.eq('product_id', options.productId);
      }

      if (options.includeActive !== undefined) {
        if (options.includeActive) {
          query = query.eq('status', 'active');
        } else {
          query = query.neq('status', 'active');
        }
      }

      if (options.includeExpired !== undefined) {
        if (options.includeExpired) {
          query = query.lt('expires_at', new Date().toISOString());
        } else {
          query = query.gte('expires_at', new Date().toISOString());
        }
      }

      const { data: boostsData, error: boostsError } = await query;

      if (boostsError) throw boostsError;

      setBoosts(boostsData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const purchaseBoost = async (boostOption: BoostOption, productId?: string): Promise<Boost> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      // Vérifier les capabilities
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('capabilities')
        .eq('id', user.user.id)
        .single();

      if (userError) throw userError;

      if (!userData.capabilities?.can_boost) {
        throw new Error("Vous n'avez pas la permission d'acheter des boosts");
      }

      // Créer le boost
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + boostOption.duration);

      const { data: boost, error: boostError } = await supabase
        .from('boosts')
        .insert({
          user_id: user.user.id,
          product_id: productId,
          boost_type: boostOption.id,
          price: boostOption.price,
          duration: boostOption.duration,
          expires_at: expiresAt.toISOString(),
          status: 'active',
        })
        .select()
        .single();

      if (boostError) throw boostError;

      // Mettre à jour le produit si c'est un boost de produit
      if (productId) {
        const { error: productError } = await supabase
          .from('products')
          .update({
            is_boosted: true,
            boost_expires_at: expiresAt.toISOString(),
          })
          .eq('id', productId);

        if (productError) throw productError;
      }

      // Rafraîchir la liste des boosts
      await fetchBoosts();

      return boost;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBoost = async (boostId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      // Récupérer le boost
      const { data: boost, error: boostError } = await supabase
        .from('boosts')
        .select('*')
        .eq('id', boostId)
        .eq('user_id', user.user.id)
        .single();

      if (boostError) throw boostError;

      // Annuler le boost
      const { error: cancelError } = await supabase.from('boosts').update({ status: 'cancelled' }).eq('id', boostId);

      if (cancelError) throw cancelError;

      // Mettre à jour le produit si nécessaire
      if (boost.product_id) {
        const { error: productError } = await supabase
          .from('products')
          .update({
            is_boosted: false,
            boost_expires_at: null,
          })
          .eq('id', boost.product_id);

        if (productError) throw productError;
      }

      // Rafraîchir la liste des boosts
      await fetchBoosts();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getActiveBoosts = (): Boost[] => {
    return boosts.filter(boost => boost.status === 'active' && new Date(boost.end_at) > new Date());
  };

  const getExpiredBoosts = (): Boost[] => {
    return boosts.filter(boost => boost.status === 'active' && new Date(boost.end_at) <= new Date());
  };

  useEffect(() => {
    fetchBoosts();
  }, [options.productId, options.includeActive, options.includeExpired]);

  return {
    boosts,
    loading,
    error,
    boostOptions: BOOST_OPTIONS,
    refreshBoosts: fetchBoosts,
    purchaseBoost,
    cancelBoost,
    getActiveBoosts,
    getExpiredBoosts,
  };
};
