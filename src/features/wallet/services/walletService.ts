import { supabase } from '../../../utils/supabase/client';
import { Withdrawal, Transaction } from '../../../types';

export interface WithdrawalRequest {
  amount: number;
  method: 'wave' | 'orange_money';
  accountDetails: string;
}

export interface WalletStats {
  balance: number;
  pendingWithdrawals: number;
  totalEarnings: number;
  totalSpent: number;
  monthlyEarnings: number;
  monthlySpent: number;
}

export class WalletService {
  static async getWalletStats(): Promise<WalletStats> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: wallet, error } = await supabase.from('wallets').select('*').eq('user_id', user.user.id).single();

    if (error) throw error;

    // Calculer les statistiques mensuelles
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const { data: monthlyTransactions, error: monthlyError } = await supabase
      .from('transactions')
      .select('amount, commission, seller_id, buyer_id')
      .or(`buyer_id.eq.${user.user.id},seller_id.eq.${user.user.id}`)
      .gte('created_at', currentMonth.toISOString())
      .eq('status', 'released');

    if (monthlyError) throw monthlyError;

    type TransactionWithStatus = {
      amount: number;
      commission: number;
      seller_id: string;
      buyer_id: string;
    };

    const sellerTransactions = (monthlyTransactions || []).filter(
      (t: TransactionWithStatus) => t.seller_id === user.user.id
    );
    const monthlyEarnings = sellerTransactions.reduce(
      (sum: number, t: TransactionWithStatus) => sum + (t.amount - t.commission),
      0
    );

    const buyerTransactions = (monthlyTransactions || []).filter(
      (t: TransactionWithStatus) => t.buyer_id === user.user.id
    );
    const monthlySpent = buyerTransactions.reduce((sum: number, t: TransactionWithStatus) => sum + t.amount, 0);

    return {
      balance: wallet.balance || 0,
      pendingWithdrawals: wallet.pending_withdrawals || 0,
      totalEarnings: wallet.total_earnings || 0,
      totalSpent: wallet.total_spent || 0,
      monthlyEarnings,
      monthlySpent,
    };
  }

  static async getTransactions(limit = 50, offset = 0): Promise<Transaction[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        product:products(title, genre),
        buyer:users!transactions_buyer_id_fkey(name),
        seller:users!transactions_seller_id_fkey(name)
      `
      )
      .or(`buyer_id.eq.${user.user.id},seller_id.eq.${user.user.id}`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return transactions || [];
  }

  static async getWithdrawals(): Promise<Withdrawal[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: withdrawals, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return withdrawals || [];
  }

  static async requestWithdrawal(request: WithdrawalRequest): Promise<Withdrawal> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    // Vérifier le solde
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user.user.id)
      .single();

    if (walletError) throw walletError;
    if (request.amount > wallet.balance) throw new Error('Solde insuffisant');

    // Créer la demande de retrait
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from('withdrawals')
      .insert({
        user_id: user.user.id,
        amount: request.amount,
        method: request.method,
        account_details: request.accountDetails,
        status: 'pending',
      })
      .select()
      .single();

    if (withdrawalError) throw withdrawalError;

    // Mettre à jour le wallet
    const { error: updateError } = await supabase
      .from('wallets')
      .update({
        balance: wallet.balance - request.amount,
        pending_withdrawals: ((wallet as any).pending_withdrawals || 0) + request.amount,
      })
      .eq('user_id', user.user.id);

    if (updateError) throw updateError;

    return withdrawal;
  }

  static async cancelWithdrawal(withdrawalId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    // Récupérer le retrait
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('id', withdrawalId)
      .eq('user_id', user.user.id)
      .eq('status', 'pending')
      .single();

    if (withdrawalError) throw withdrawalError;

    // Annuler le retrait
    const { error: cancelError } = await supabase
      .from('withdrawals')
      .update({ status: 'cancelled' })
      .eq('id', withdrawalId);

    if (cancelError) throw cancelError;

    // Récupérer le wallet avant de mettre à jour
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (walletError) throw walletError;

    // Restaurer le solde
    const { error: restoreError } = await supabase
      .from('wallets')
      .update({
        balance: (wallet?.balance || 0) + withdrawal.amount,
        pending_withdrawals: ((wallet as any)?.pending_withdrawals || 0) - withdrawal.amount,
      })
      .eq('user_id', user.user.id);

    if (restoreError) throw restoreError;
  }
}
