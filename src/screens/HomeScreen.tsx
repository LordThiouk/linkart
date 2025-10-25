import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollContent,
  SectionCard,
  SectionTitle,
  StatsContainer,
  StatCard,
  StatContent,
  StatValue,
  StatLabel,
} from '../components/atoms';
import { useProducts } from '../features/products';
import { ProductList } from '../components/organisms';
import { Text } from '../components/atoms/Text';

export function HomeScreen() {
  const { products, loading } = useProducts();
  const theme = useTheme();

  const stats = [
    { label: 'Beats disponibles', value: `${products.length}+`, color: theme.colors.primary },
    { label: 'Créateurs actifs', value: '50+', color: theme.colors.secondary },
  ];

  const quickActions = [
    {
      title: 'Publier un produit',
      description: 'Vendez vos beats, samples et services',
      bgColor: theme.colors.primaryContainer,
      textColor: theme.colors.onPrimaryContainer,
    },
    {
      title: 'Explorer le catalogue',
      description: 'Découvrez les créations de nos artistes',
      bgColor: theme.colors.secondaryContainer,
      textColor: theme.colors.onSecondaryContainer,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <ScrollContent>
          {/* Welcome Section */}
          <SectionCard>
            <Card.Content>
              <Title>Bienvenue sur Linkart</Title>
              <Text>La plateforme de référence pour les professionnels du son au Sénégal</Text>
            </Card.Content>
          </SectionCard>

          {/* Quick Stats */}
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatContent>
                  <StatValue color={stat.color}>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatContent>
              </StatCard>
            ))}
          </StatsContainer>

          {/* Featured Products */}
          <SectionCard>
            <Card.Content>
              <SectionTitle>Produits en vedette</SectionTitle>
              <ProductList
                products={products.slice(0, 3)}
                loading={loading}
                onProductPress={product => {
                  // Navigation vers ProductDetailScreen
                  console.log('Navigate to product:', product.id);
                }}
              />
            </Card.Content>
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard>
            <Card.Content>
              <SectionTitle>Actions rapides</SectionTitle>
              <View style={{ gap: 12 }}>
                {quickActions.map((action, index) => (
                  <Surface key={index} style={{ borderRadius: 12, padding: 16, backgroundColor: action.bgColor }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: action.textColor }}>
                      {action.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: action.textColor }}>{action.description}</Text>
                  </Surface>
                ))}
              </View>
            </Card.Content>
          </SectionCard>
        </ScrollContent>
      </ScrollView>
    </SafeAreaView>
  );
}
