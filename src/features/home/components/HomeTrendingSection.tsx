import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { colors, spacing, typography, radii } from '@/theme';
import type { HomeProduct } from '../types';

interface HomeTrendingSectionProps {
  products: HomeProduct[];
  onProductPress?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  onTogglePlay?: (productId: string) => void;
  playingProductId?: string | null;
  likedProductIds?: Set<string>;
}

export function HomeTrendingSection({
  products,
  onProductPress,
  onToggleFavorite,
  onTogglePlay,
  playingProductId,
  likedProductIds,
}: HomeTrendingSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <LinearGradient
          colors={[colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sectionIcon}
        >
          <TrendingUp size={20} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.sectionTitle}>Tendances du moment</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ProductCardFigma
              {...item}
              isPlaying={playingProductId === item.id}
              isFavorited={likedProductIds?.has(item.id)}
              onPlay={item.type === 'beat' ? () => onTogglePlay?.(item.id) : undefined}
              onPress={() => onProductPress?.(item.id)}
              onToggleFavorite={() => onToggleFavorite?.(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionIcon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  grid: {
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  card: {
    flex: 1,
  },
});
