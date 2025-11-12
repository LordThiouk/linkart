import React from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Title, Chip, Icon } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import {
  StatsContainer,
  StatCard,
  StatContent,
  StatValue,
  StatLabel,
  Text,
  LoadingSpinner,
  SectionCard,
  Button,
} from '../../../components/atoms';
import { PriceDisplay } from '../../../components/molecules';
import { WalletData } from '../hooks/useWallet';
import { spacing } from '../../../theme';

export interface WalletOverviewProps {
  walletData: WalletData;
  loading?: boolean;
  onWithdrawPress?: () => void;
  onTransactionPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const WalletOverview: React.FC<WalletOverviewProps> = ({
  walletData,
  loading = false,
  onWithdrawPress,
  onTransactionPress,
  style,
  testID,
}) => {
  const theme = useTheme();

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      label: 'Solde disponible',
      value: walletData.balance,
      color: theme.colors.primary,
      icon: 'wallet',
    },
    {
      label: 'En attente',
      value: walletData.pendingWithdrawals,
      color: '#F59E0B',
      icon: 'clock-outline',
    },
    {
      label: 'Total gagné',
      value: walletData.totalEarnings,
      color: '#22C55E',
      icon: 'trending-up',
    },
    {
      label: 'Total dépensé',
      value: walletData.totalSpent,
      color: theme.colors.error,
      icon: 'trending-down',
    },
  ];

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: spacing.md }}>
        {/* Statistiques principales */}
        <SectionCard style={{ marginBottom: spacing.md }}>
          <Title style={{ marginBottom: spacing.md }}>Vue d'ensemble</Title>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard key={index} style={{ flex: 1, marginBottom: spacing.sm }}>
                <StatContent>
                  <Icon source={stat.icon} size={24} color={stat.color} />
                  <StatValue style={{ color: stat.color }}>
                    <PriceDisplay amount={stat.value} size="medium" />
                  </StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatContent>
              </StatCard>
            ))}
          </StatsContainer>
        </SectionCard>

        {/* Actions rapides */}
        <SectionCard marginBottom={spacing.md}>
          <Title style={{ marginBottom: spacing.md }}>Actions rapides</Title>
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Button
              variant="primary"
              title="Retirer"
              onPress={onWithdrawPress || (() => {})}
              disabled={walletData.balance <= 0}
              fullWidth={true}
            />
            <Button variant="outline" title="Historique" onPress={onTransactionPress || (() => {})} fullWidth={true} />
          </View>
        </SectionCard>

        {/* Dernières transactions */}
        {walletData.transactions.length > 0 && (
          <SectionCard style={{ marginBottom: spacing.md }}>
            <Title style={{ marginBottom: spacing.md }}>Dernières transactions</Title>
            {walletData.transactions.slice(0, 3).map((transaction, index) => (
              <View
                key={transaction.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.sm,
                  borderBottomWidth: index < 2 ? 1 : 0,
                  borderBottomColor: theme.colors.outline,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600' }}>Transaction</Text>
                  <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                    {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Date inconnue'}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <PriceDisplay
                    amount={transaction.gross_amount}
                    size="small"
                    color={transaction.buyer_id === transaction.seller_id ? '#22C55E' : theme.colors.error}
                  />
                  <Chip mode="outlined" compact style={{ marginTop: 4 }}>
                    {transaction.status}
                  </Chip>
                </View>
              </View>
            ))}
          </SectionCard>
        )}

        {/* Retraits en attente */}
        {walletData.withdrawals.filter(w => w.status === 'pending').length > 0 && (
          <SectionCard>
            <Title style={{ marginBottom: spacing.md }}>Retraits en attente</Title>
            {walletData.withdrawals
              .filter(w => w.status === 'pending')
              .slice(0, 2)
              .map((withdrawal, index) => (
                <View
                  key={withdrawal.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.sm,
                    borderBottomWidth: index < 1 ? 1 : 0,
                    borderBottomColor: theme.colors.outline,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600' }}>Retrait</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                      {withdrawal.created_at ? new Date(withdrawal.created_at).toLocaleDateString() : 'Date inconnue'}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <PriceDisplay amount={withdrawal.amount} size="small" />
                    <Chip mode="outlined" compact style={{ marginTop: 4 }}>
                      {withdrawal.status}
                    </Chip>
                  </View>
                </View>
              ))}
          </SectionCard>
        )}
      </View>
    </ScrollView>
  );
};
