import React from 'react';
import { View, FlatList, StyleSheet, ViewStyle, ListRenderItem } from 'react-native';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { MarketplaceEmptyState } from './MarketplaceEmptyState';
import { spacing } from '@/theme';

export interface MarketplaceProduct {
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

interface MarketplaceProductsGridProps {
  products: MarketplaceProduct[];
  playingProductId?: string | null;
  likedProductIds?: Set<string>;
  onProductPress?: (productId: string) => void;
  onTogglePlay?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  testID?: string;
}

export function MarketplaceProductsGrid({
  products,
  playingProductId,
  likedProductIds = new Set(),
  onProductPress,
  onTogglePlay,
  onToggleFavorite,
  emptyTitle,
  emptySubtitle,
  style,
  contentContainerStyle,
  testID,
}: MarketplaceProductsGridProps) {
  const renderProduct: ListRenderItem<MarketplaceProduct> = ({ item }) => {
    return (
      <View style={styles.productCard}>
        <ProductCardFigma
          {...item}
          isPlaying={playingProductId === item.id}
          isFavorited={likedProductIds.has(item.id)}
          onPlay={item.type === 'beat' ? () => onTogglePlay?.(item.id) : undefined}
          onPress={() => onProductPress?.(item.id)}
          onToggleFavorite={() => onToggleFavorite?.(item.id)}
        />
      </View>
    );
  };

  if (products.length === 0) {
    return (
      <View style={[styles.container, style]} testID={testID}>
        <MarketplaceEmptyState title={emptyTitle} subtitle={emptySubtitle} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        scrollEnabled={false}
        contentContainerStyle={[styles.productsGrid, contentContainerStyle]}
        columnWrapperStyle={styles.productsRow}
        testID="products-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
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
