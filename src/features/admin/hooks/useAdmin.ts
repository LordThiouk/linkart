import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { Product, Transaction, Withdrawal, Rating } from '../../../types';

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalTransactions: number;
  totalRevenue: number;
  pendingProducts: number;
  pendingWithdrawals: number;
  flaggedRatings: number;
}

export interface AdminDashboard {
  stats: AdminStats;
  recentProducts: Product[];
  recentTransactions: Transaction[];
  pendingWithdrawals: Withdrawal[];
  flaggedRatings: Rating[];
}

export const useAdmin = () => {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      // Vérifier les permissions admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.user.id)
        .single();

      if (userError) throw userError;
      if (userData.role !== 'admin') throw new Error('Accès non autorisé');

      // Récupérer les statistiques
      const [
        { data: users, error: usersError },
        { data: products, error: productsError },
        { data: transactions, error: transactionsError },
        { data: pendingProducts, error: pendingProductsError },
        { data: pendingWithdrawals, error: pendingWithdrawalsError },
        { data: flaggedRatings, error: flaggedRatingsError },
      ] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('transactions').select('amount, commission', { count: 'exact' }),
        supabase
          .from('products')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('withdrawals')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('ratings')
          .select('*')
          .eq('status', 'flagged')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

      if (usersError) throw usersError;
      if (productsError) throw productsError;
      if (transactionsError) throw transactionsError;
      if (pendingProductsError) throw pendingProductsError;
      if (pendingWithdrawalsError) throw pendingWithdrawalsError;
      if (flaggedRatingsError) throw flaggedRatingsError;

      // Calculer les revenus
      const totalRevenue = transactions?.reduce((sum: number, t) => sum + (t.commission || 0), 0) || 0;

      const stats: AdminStats = {
        totalUsers: users?.length || 0,
        totalProducts: products?.length || 0,
        totalTransactions: transactions?.length || 0,
        totalRevenue,
        pendingProducts: pendingProducts?.length || 0,
        pendingWithdrawals: pendingWithdrawals?.length || 0,
        flaggedRatings: flaggedRatings?.length || 0,
      };

      // Récupérer les transactions récentes
      const { data: recentTransactions, error: recentTransactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (recentTransactionsError) throw recentTransactionsError;

      setDashboard({
        stats,
        recentProducts: pendingProducts || [],
        recentTransactions: recentTransactions || [],
        pendingWithdrawals: pendingWithdrawals || [],
        flaggedRatings: flaggedRatings || [],
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (productId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('products').update({ status: 'active' }).eq('id', productId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectProduct = async (productId: string, reason: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('products')
        .update({
          status: 'rejected',
          rejection_reason: reason,
        })
        .eq('id', productId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveWithdrawal = async (withdrawalId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('withdrawals').update({ status: 'paid' }).eq('id', withdrawalId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectWithdrawal = async (withdrawalId: string, reason: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('withdrawals')
        .update({
          status: 'rejected',
          rejection_reason: reason,
        })
        .eq('id', withdrawalId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hideRating = async (ratingId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('ratings').update({ status: 'hidden' }).eq('id', ratingId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveRating = async (ratingId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('ratings').update({ status: 'visible' }).eq('id', ratingId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const suspendUser = async (userId: string, reason: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: 'suspended',
          suspension_reason: reason,
        })
        .eq('id', userId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unsuspendUser = async (userId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: 'active',
          suspension_reason: null,
        })
        .eq('id', userId);

      if (error) throw error;

      // Rafraîchir le dashboard
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard: fetchDashboard,
    approveProduct,
    rejectProduct,
    approveWithdrawal,
    rejectWithdrawal,
    hideRating,
    approveRating,
    suspendUser,
    unsuspendUser,
  };
};
