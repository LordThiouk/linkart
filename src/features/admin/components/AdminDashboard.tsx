import React from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Card, Title, Button, Chip, Icon } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import {
  StatsContainer,
  StatCard,
  StatContent,
  StatValue,
  StatLabel,
  Text,
  LoadingSpinner,
} from '../../../components/atoms';
import { PriceDisplay } from '../../../components/molecules';
import { AdminDashboard as AdminDashboardType } from '../hooks/useAdmin';

export interface AdminDashboardProps {
  dashboard: AdminDashboardType;
  loading?: boolean;
  onProductPress?: (product: any) => void;
  onTransactionPress?: (transaction: any) => void;
  onWithdrawalPress?: (withdrawal: any) => void;
  onRatingPress?: (rating: any) => void;
  style?: ViewStyle;
  testID?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  dashboard,
  loading = false,
  onProductPress,
  onTransactionPress,
  onWithdrawalPress,
  onRatingPress,
  style,
  testID,
}) => {
  const theme = useTheme();

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      label: 'Utilisateurs',
      value: dashboard.stats.totalUsers,
      color: theme.colors.primary,
      icon: 'account-group',
    },
    {
      label: 'Produits',
      value: dashboard.stats.totalProducts,
      color: theme.colors.primary,
      icon: 'music-note',
    },
    {
      label: 'Transactions',
      value: dashboard.stats.totalTransactions,
      color: theme.colors.primary,
      icon: 'swap-horizontal',
    },
    {
      label: 'Revenus',
      value: dashboard.stats.totalRevenue,
      color: theme.colors.primary,
      icon: 'cash-multiple',
      isPrice: true,
    },
  ];

  const pendingStats = [
    {
      label: 'Produits en attente',
      value: dashboard.stats.pendingProducts,
      color: '#F59E0B',
      icon: 'clock-outline',
    },
    {
      label: 'Retraits en attente',
      value: dashboard.stats.pendingWithdrawals,
      color: theme.colors.error,
      icon: 'bank-transfer-out',
    },
    {
      label: 'Notes signalées',
      value: dashboard.stats.flaggedRatings,
      color: theme.colors.error,
      icon: 'flag-variant',
    },
  ];

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: 16 }}>
        {/* Statistiques principales */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Vue d'ensemble</Title>
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatCard key={index} style={{ flex: 1, marginBottom: 8 }}>
                  <StatContent>
                    <Icon source={stat.icon} size={24} color={stat.color} />
                    <StatValue style={{ color: stat.color, marginTop: 8 }}>
                      {stat.isPrice ? <PriceDisplay amount={stat.value} size="medium" /> : stat.value.toLocaleString()}
                    </StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatContent>
                </StatCard>
              ))}
            </StatsContainer>
          </Card.Content>
        </Card>

        {/* Actions en attente */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Actions en attente</Title>
            <StatsContainer>
              {pendingStats.map((stat, index) => (
                <StatCard key={index} style={{ flex: 1, marginBottom: 8 }}>
                  <StatContent>
                    <Icon source={stat.icon} size={24} color={stat.color} />
                    <StatValue style={{ color: stat.color, marginTop: 8 }}>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatContent>
                </StatCard>
              ))}
            </StatsContainer>
          </Card.Content>
        </Card>

        {/* Produits en attente */}
        {dashboard.recentProducts.length > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <Card.Content>
              <Title style={{ marginBottom: 16 }}>Produits en attente</Title>
              {dashboard.recentProducts.slice(0, 3).map((product, index) => (
                <View
                  key={product.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomWidth: index < 2 ? 1 : 0,
                    borderBottomColor: theme.colors.outline,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="body2" style={{ fontWeight: '600' }}>
                      {product.title}
                    </Text>
                    <Text variant="caption" style={{ color: theme.colors.onSurfaceVariant }}>
                      {(product.metadata as { genre: string })?.genre || 'N/A'} {' · '}
                      {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                    </Text>
                  </View>
                  <Chip mode="outlined" compact style={{ backgroundColor: '#F59E0B' }}>
                    {product.status}
                  </Chip>
                </View>
              ))}
              <Button
                mode="outlined"
                onPress={() => onProductPress?.(dashboard.recentProducts)}
                style={{ marginTop: 12 }}
              >
                Voir tous les produits
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Retraits en attente */}
        {dashboard.pendingWithdrawals.length > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <Card.Content>
              <Title style={{ marginBottom: 16 }}>Retraits en attente</Title>
              {dashboard.pendingWithdrawals.slice(0, 3).map((withdrawal, index) => (
                <View
                  key={withdrawal.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomWidth: index < 2 ? 1 : 0,
                    borderBottomColor: theme.colors.outline,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="body2" style={{ fontWeight: '600' }}>
                      {withdrawal.provider_ref} • {withdrawal.provider_ref}
                    </Text>
                    <Text variant="caption" style={{ color: theme.colors.onSurfaceVariant }}>
                      {withdrawal.created_at ? new Date(withdrawal.created_at).toLocaleDateString() : 'N/A'}
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
              <Button
                mode="outlined"
                onPress={() => onWithdrawalPress?.(dashboard.pendingWithdrawals)}
                style={{ marginTop: 12 }}
              >
                Voir tous les retraits
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Notes signalées */}
        {dashboard.flaggedRatings.length > 0 && (
          <Card>
            <Card.Content>
              <Title style={{ marginBottom: 16 }}>Notes signalées</Title>
              {dashboard.flaggedRatings.slice(0, 3).map((rating, index) => (
                <View
                  key={rating.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomWidth: index < 2 ? 1 : 0,
                    borderBottomColor: theme.colors.outline,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="body2" style={{ fontWeight: '600' }}>
                      Note {rating.score}/5
                    </Text>
                    <Text variant="caption" style={{ color: theme.colors.onSurfaceVariant }}>
                      {rating.created_at ? new Date(rating.created_at).toLocaleDateString() : 'N/A'}
                    </Text>
                  </View>
                  <Chip mode="outlined" compact style={{ backgroundColor: theme.colors.error }}>
                    {rating.status}
                  </Chip>
                </View>
              ))}
              <Button
                mode="outlined"
                onPress={() => onRatingPress?.(dashboard.flaggedRatings)}
                style={{ marginTop: 12 }}
              >
                Voir toutes les notes
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};
