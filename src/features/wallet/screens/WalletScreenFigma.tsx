import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletHeader, BalanceCard, WalletStatsGrid, TransactionList, type TransactionItemProps } from '../components';
import { colors, spacing } from '@/theme';

export interface WalletScreenFigmaProps {
  onWithdraw?: () => void;
  onCardAction?: () => void;
  onSeeAllTransactions?: () => void;
  balance?: number;
  showBalance?: boolean;
  onToggleBalance?: () => void;
  transactions?: TransactionItemProps[];
  stats?: { label: string; value: string; change: string }[];
}

export function WalletScreenFigma({
  onWithdraw,
  onCardAction,
  onSeeAllTransactions,
  balance = 1247480,
  showBalance: initialShowBalance = true,
  onToggleBalance: externalOnToggleBalance,
  transactions,
  stats,
}: WalletScreenFigmaProps) {
  const [showBalance, setShowBalance] = useState(initialShowBalance);

  const defaultTransactions: TransactionItemProps[] = transactions || [
    {
      id: '1',
      type: 'income',
      title: 'Vente - Afrobeat Summer',
      amount: 24000,
      date: "Aujourd'hui",
      status: 'completed',
    },
    {
      id: '2',
      type: 'income',
      title: 'Vente - Lagos Nights (Premium)',
      amount: 49000,
      date: 'Hier',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdraw',
      title: 'Retrait vers compte bancaire',
      amount: -150000,
      date: 'Il y a 2 jours',
      status: 'pending',
    },
    {
      id: '4',
      type: 'income',
      title: 'Service - Mixing & Mastering',
      amount: 42000,
      date: 'Il y a 3 jours',
      status: 'completed',
    },
  ];

  const defaultStats = stats || [
    { label: 'Ce mois', value: '342 500 F', change: '+12%' },
    { label: 'Ventes totales', value: '47', change: '+8' },
    { label: 'En attente', value: '150 000 F', change: '1' },
  ];

  const handleToggleBalance = () => {
    setShowBalance(prev => !prev);
    externalOnToggleBalance?.();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletHeader title="Wallet" subtitle="Gérez vos revenus" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BalanceCard
          balance={balance}
          showBalance={showBalance}
          onToggleBalance={handleToggleBalance}
          onWithdraw={onWithdraw}
          onCardAction={onCardAction}
        />

        <WalletStatsGrid stats={defaultStats} numColumns={2} />

        <TransactionList
          transactions={defaultTransactions}
          title="Transactions récentes"
          showSeeAll={true}
          onSeeAll={onSeeAllTransactions}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xl * 5,
    gap: spacing.xl,
  },
});
