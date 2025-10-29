import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ProductCard } from '../atoms/ProductCard';

interface TrendingSectionProps {
  products: any[];
  onProductPress: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
}

/**
 * TODO: Phase 5 - Composant TrendingSection
 *
 * Ce composant sera implémenté dans la Phase 5 du Design System.
 * Il affichera une section horizontale des produits tendances avec:
 * - Scroll horizontal des ProductCard
 * - Titre "Tendances" avec bouton "Voir tout"
 * - Indicateur de tendance (fire icon)
 * - Animation de scroll fluide
 *
 * @see Migration Guide Phase 5
 */
export const TrendingSection: React.FC<TrendingSectionProps> = ({ products, onProductPress, onToggleFavorite }) => {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: theme.fonts.headlineSmall.fontSize,
          fontFamily: theme.fonts.headlineSmall.fontFamily,
          color: theme.colors.onSurface,
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        🔥 Tendances
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        {products.map(product => (
          <View key={product.id} style={{ width: 160 }}>
            <ProductCard
              id={product.id}
              title={product.title}
              artist={product.artist}
              price={product.price}
              imageUrl={product.imageUrl}
              viewCount={product.viewCount}
              downloadCount={product.downloadCount}
              likeCount={product.likeCount}
              onPress={() => onProductPress(product.id)}
            />
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          fontSize: theme.fonts.bodySmall.fontSize,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 8,
          fontStyle: 'italic',
        }}
      >
        TODO: Phase 5 - Animation et indicateurs de tendance
      </Text>
    </View>
  );
};
