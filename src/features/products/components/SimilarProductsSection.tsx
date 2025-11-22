import React from 'react';
import { View, Text, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { colors, spacing, typography } from '@/theme';

export interface SimilarProduct {
  id: string;
  title: string;
  artist: string;
  artistImage: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre?: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
}

export interface SimilarProductsSectionProps {
  title?: string;
  products: SimilarProduct[];
  likedProductIds?: Set<string>;
  playingProductId?: string | null;
  onProductPress?: (productId: string) => void;
  onTogglePlay?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export function SimilarProductsSection({
  title = 'Beats similaires',
  products,
  likedProductIds = new Set(),
  playingProductId = null,
  onProductPress,
  onTogglePlay,
  onToggleFavorite,
  style,
  testID,
}: SimilarProductsSectionProps) {
  const renderProduct = ({ item }: { item: SimilarProduct }) => {
    const isPlaying = playingProductId === item.id;
    const isFavorited = likedProductIds.has(item.id);

    return (
      <View style={styles.productCard} testID={`product-${item.id}`}>
        <ProductCardFigma
          {...item}
          genre={item.genre || 'Unknown'}
          isPlaying={isPlaying}
          isFavorited={isFavorited}
          onPress={() => onProductPress?.(item.id)}
          onPlay={item.type === 'beat' ? () => onTogglePlay?.(item.id) : undefined}
          onToggleFavorite={() => onToggleFavorite?.(item.id)}
        />
      </View>
    );
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productsRow}
        scrollEnabled={false}
        renderItem={renderProduct}
        testID="products-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
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
});
