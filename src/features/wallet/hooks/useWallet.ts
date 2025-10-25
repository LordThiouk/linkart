import { useState, useEffect } from 'react';
import { supabase } from '../../auth/hooks/useAuth';
import { Transaction, Withdrawal, PlatformEarning } from '../../../types';

export interface WalletData {
  balance: number;
  pendingWithdrawals: number;
  totalEarnings: number;
  totalSpent: number;
  transactions: Transaction[];
  withdrawals: Withdrawal[];
  platformEarnings: PlatformEarning[];
}

export interface UseWalletOptions {
  includeTransactions?: boolean;
  includeWithdrawals?: boolean;
  includePlatformEarnings?: boolean;
}

export const useWallet = (options: UseWalletOptions = {}) => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      const userId = user.user.id;

      // Récupérer les données du wallet
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (walletError && walletError.code !== 'PGRST116') {
        throw walletError;
      }

      // Créer le wallet s'il n'existe pas
      if (!wallet) {
        const { error: createError } = await supabase
          .from('wallets')
          .insert({
            user_id: userId,
            balance: 0,
            pending_withdrawals: 0,
            total_earnings: 0,
            total_spent: 0,
          })
          .select()
          .single();

        if (createError) throw createError;
        // wallet = newWallet; // Commented out to avoid const assignment
      }

      const walletData: WalletData = {
        balance: wallet.balance || 0,
        pendingWithdrawals: wallet.pending_withdrawals || 0,
        totalEarnings: wallet.total_earnings || 0,
        totalSpent: wallet.total_spent || 0,
        transactions: [],
        withdrawals: [],
        platformEarnings: [],
      };

      // Récupérer les transactions si demandé
      if (options.includeTransactions) {
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
          .order('created_at', { ascending: false })
          .limit(50);

        if (transactionsError) throw transactionsError;
        walletData.transactions = transactions || [];
      }

      // Récupérer les retraits si demandé
      if (options.includeWithdrawals) {
        const { data: withdrawals, error: withdrawalsError } = await supabase
          .from('withdrawals')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (withdrawalsError) throw withdrawalsError;
        walletData.withdrawals = withdrawals || [];
      }

      // Récupérer les revenus plateforme si demandé
      if (options.includePlatformEarnings) {
        const { data: platformEarnings, error: platformEarningsError } = await supabase
          .from('platform_earnings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (platformEarningsError) throw platformEarningsError;
        walletData.platformEarnings = platformEarnings || [];
      }

      setWalletData(walletData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const requestWithdrawal = async (amount: number, method: 'wave' | 'orange_money', accountDetails: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      if (amount <= 0) throw new Error('Le montant doit être positif');
      if (amount > (walletData?.balance || 0)) throw new Error('Solde insuffisant');

      const { data: withdrawal, error: withdrawalError } = await supabase
        .from('withdrawals')
        .insert({
          user_id: user.user.id,
          amount,
          method,
          account_details: accountDetails,
          status: 'pending',
        })
        .select()
        .single();

      if (withdrawalError) throw withdrawalError;

      // Mettre à jour le wallet
      await supabase
        .from('wallets')
        .update({
          balance: (walletData?.balance || 0) - amount,
          pending_withdrawals: (walletData?.pendingWithdrawals || 0) + amount,
        })
        .eq('user_id', user.user.id);

      // Rafraîchir les données
      await fetchWalletData();

      return withdrawal;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return {
    walletData,
    loading,
    error,
    refreshWallet: fetchWalletData,
    requestWithdrawal,
  };
};
