import React from 'react';
import { View, Text, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { Headphones } from 'lucide-react-native';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProfileProduct {
  id: string;
  title: string;
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
}

export interface ProfileStatItem {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export type ProfileTab = 'beats' | 'services' | 'stats';

export interface ProfileContentProps {
  activeTab: ProfileTab;
  products?: ProfileProduct[];
  stats?: ProfileStatItem[];
  onProductPress?: (productId: string) => void;
  onCreateService?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProfileContent({
  activeTab,
  products = [],
  stats = [],
  onProductPress,
  onCreateService,
  style,
  testID,
}: ProfileContentProps) {
  if (activeTab === 'beats') {
    return (
      <View style={[styles.container, style]} testID={testID}>
        {products.length > 0 ? (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.productsGrid}
            columnWrapperStyle={styles.productsRow}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.productCard} testID={`product-${item.id}`}>
                <ProductCardFigma
                  {...item}
                  isFavorited={false}
                  onPress={() => onProductPress?.(item.id)}
                  onToggleFavorite={() => {}}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyState} testID="empty-products">
            <Text style={styles.emptyText}>Aucun beat publié</Text>
          </View>
        )}
      </View>
    );
  }

  if (activeTab === 'services') {
    return (
      <View style={[styles.container, style]} testID={testID}>
        <View style={styles.emptyState} testID="empty-services">
          <View style={styles.emptyIcon}>
            <Headphones size={32} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Aucun service</Text>
          <Text style={styles.emptySubtitle}>Vous n'avez pas encore publié de service</Text>
          {onCreateService && (
            <PrimaryButton style={styles.emptyButton} onPress={onCreateService}>
              <Text style={styles.emptyButtonText}>Créer un service</Text>
            </PrimaryButton>
          )}
        </View>
      </View>
    );
  }

  if (activeTab === 'stats') {
    return (
      <View style={[styles.container, style]} testID={testID}>
        <View style={styles.statsCard}>
          <Text style={styles.statsCardTitle}>Performances ce mois</Text>
          <View style={styles.statsList}>
            {stats.map((item, index) => (
              <View key={item.label} style={styles.statsItem} testID={`stat-item-${index}`}>
                <Text style={styles.statsItemLabel}>{item.label}</Text>
                <View style={styles.statsItemRight}>
                  <Text style={styles.statsItemValue}>{item.value}</Text>
                  <Text
                    style={[
                      styles.statsItemChange,
                      item.positive ? styles.statsItemChangePositive : styles.statsItemChangeNegative,
                    ]}
                  >
                    {item.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minHeight: 200,
  },
  productsGrid: {
    gap: spacing.md,
  },
  productsRow: {
    gap: spacing.md,
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
  },
  emptyIcon: {
    padding: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  emptyButton: {
    marginTop: spacing.sm,
  },
  emptyButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  statsCard: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  statsList: {
    gap: spacing.md,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  statsItemLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statsItemValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  statsItemChange: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    minWidth: 60,
    textAlign: 'right',
  },
  statsItemChangePositive: {
    color: colors.success,
  },
  statsItemChangeNegative: {
    color: colors.error,
  },
});
