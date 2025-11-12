import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar, Chip, Divider, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { spacing } from '../theme';

const CapabilityBadge = ({ enabled }: { enabled: boolean }) => {
  const theme = useTheme();
  return (
    <Chip
      mode="outlined"
      style={{
        backgroundColor: enabled ? theme.colors.tertiaryContainer : theme.colors.surfaceVariant,
      }}
    >
      {enabled ? 'Activé' : 'Désactivé'}
    </Chip>
  );
};

const StatBox = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <Card style={{ flex: 1 }}>
    <Card.Content style={{ alignItems: 'center', padding: spacing.md }}>
      <Text variant="headlineSmall" style={{ color }}>
        {value}
      </Text>
      <Text variant="bodySmall">{label}</Text>
    </Card.Content>
  </Card>
);

const ActionButton = ({
  title,
  onPress,
  variant = 'contained',
}: {
  title: string;
  onPress: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}) => (
  <Button mode={variant} onPress={onPress} style={{ marginBottom: spacing.sm }}>
    {title}
  </Button>
);

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const theme = useTheme();

  const capabilities = (user?.capabilities as Record<string, boolean>) || {};
  const stats = [
    { value: '5', label: 'Produits', color: theme.colors.primary },
    { value: '12', label: 'Ventes', color: (theme.colors as any).success || '#22C55E' },
    { value: '4.8', label: 'Note', color: theme.colors.secondary },
  ];

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {/* Profile Header */}
        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.lg }}>
            <Avatar.Text size={80} label={user?.name?.charAt(0) || 'U'} />
            <View style={{ marginLeft: spacing.md, flex: 1 }}>
              <Title>{user?.name || 'Utilisateur'}</Title>
              <Paragraph>{user?.email || user?.phone}</Paragraph>
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                <CapabilityBadge enabled={capabilities.can_buy} />
                <CapabilityBadge enabled={capabilities.can_sell} />
                <CapabilityBadge enabled={capabilities.can_withdraw} />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Stats */}
        <View style={{ flexDirection: 'row', marginBottom: spacing.md, gap: spacing.md }}>
          {stats.map((stat, index) => (
            <StatBox key={index} {...stat} />
          ))}
        </View>

        {/* Wallet Balance */}
        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content>
            <Title>Portefeuille</Title>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: spacing.md,
              }}
            >
              <Text variant="bodyLarge">Solde disponible</Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                {(user?.wallet_balance || 0).toLocaleString()} F
              </Text>
            </View>
            <Button mode="outlined" style={{ alignSelf: 'flex-start' }}>
              Gérer le portefeuille
            </Button>
          </Card.Content>
        </Card>

        {/* Actions */}
        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content>
            <Title>Actions</Title>
            <View style={{ marginTop: spacing.md }}>
              <ActionButton title="Mes produits" onPress={() => console.log('Mes produits')} />
              <ActionButton title="Mes ventes" onPress={() => console.log('Mes ventes')} />
              <ActionButton title="Paramètres" onPress={() => console.log('Paramètres')} />
              <ActionButton title="Se déconnecter" onPress={handleSignOut} variant="outlined" />
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content>
            <Title>Activité récente</Title>
            <View style={{ gap: spacing.md, marginTop: spacing.md }}>
              <View>
                <Text variant="titleMedium">Nouvelle vente</Text>
                <Paragraph>Afrobeat Beat vendu</Paragraph>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Il y a 2 jours
                </Text>
              </View>
              <Divider />
              <View>
                <Text variant="titleMedium">Produit approuvé</Text>
                <Paragraph>Trap Beat publié</Paragraph>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Il y a 1 semaine
                </Text>
              </View>
              <Divider />
              <View>
                <Text variant="titleMedium">Retrait effectué</Text>
                <Paragraph>50 000 F retirés</Paragraph>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Il y a 2 semaines
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
