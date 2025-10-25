import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useWallet, WalletOverview, WithdrawalForm } from '../features/wallet';

export function WalletScreen() {
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const theme = useTheme();
  const { walletData, loading, requestWithdrawal } = useWallet({
    includeTransactions: true,
    includeWithdrawals: true,
  });

  const handleWithdraw = async (data: { amount: number; method: 'wave' | 'orange_money'; accountDetails: string }) => {
    try {
      await requestWithdrawal(data.amount, data.method, data.accountDetails);
      setShowWithdrawalForm(false);
    } catch (error) {
      console.error('Erreur lors du retrait:', error);
    }
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  if (showWithdrawalForm) {
    return (
      <SafeAreaView style={containerStyle}>
        <WithdrawalForm balance={walletData?.balance || 0} onSubmit={handleWithdraw} loading={loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle}>
      <WalletOverview
        walletData={walletData!}
        loading={loading}
        onWithdrawPress={() => setShowWithdrawalForm(true)}
        onTransactionPress={() => console.log('Navigate to transactions')}
      />
    </SafeAreaView>
  );
}
