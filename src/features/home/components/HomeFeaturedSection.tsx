import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { colors, spacing, typography } from '@/theme';
import type { HomeProduct } from '../types';

interface HomeFeaturedSectionProps {
  products: HomeProduct[];
  onProductPress?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  onTogglePlay?: (productId: string) => void;
  playingProductId?: string | null;
  likedProductIds?: Set<string>;
  onSeeAll?: () => void;
}

export function HomeFeaturedSection({
  products,
  onProductPress,
  onToggleFavorite,
  onTogglePlay,
  playingProductId,
  likedProductIds,
  onSeeAll,
}: HomeFeaturedSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>À la une</Text>
        <Text style={styles.sectionLink} onPress={onSeeAll}>
          Voir tout
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {products.map(product => (
          <View key={product.id} style={styles.card}>
            <ProductCardFigma
              {...product}
              isPlaying={playingProductId === product.id}
              isFavorited={likedProductIds?.has(product.id)}
              onPlay={product.type === 'beat' ? () => onTogglePlay?.(product.id) : undefined}
              onPress={() => onProductPress?.(product.id)}
              onToggleFavorite={() => onToggleFavorite?.(product.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  sectionLink: {
    color: colors.cyan,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    width: 260,
  },
});
