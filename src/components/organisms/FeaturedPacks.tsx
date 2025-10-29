import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
interface FeaturedPacksProps {
  packs: {
    id: string;
    title: string;
    beatCount: number;
    genre: string;
    price: string;
  }[];
  onPackPress: (packId: string) => void;
  onProductPress: (productId: string) => void;
}

/**
 * TODO: Phase 5 - Composant FeaturedPacks
 *
 * Ce composant sera implémenté dans la Phase 5 du Design System.
 * Il affichera une section de packs featured avec:
 * - Cards de packs avec image de couverture
 * - Indicateur de nombre de beats dans le pack
 * - Prix avec réduction (si applicable)
 * - Badge "Featured" ou "Limited"
 * - Animation de hover et transition
 *
 * @see Migration Guide Phase 5
 */
export const FeaturedPacks: React.FC<FeaturedPacksProps> = ({ packs, onPackPress, onProductPress }) => {
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
        ⭐ Packs Featured
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        {packs.map(pack => (
          <View
            key={pack.id}
            style={{
              width: 200,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.roundness,
              padding: 16,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: theme.fonts.titleMedium.fontSize,
                fontFamily: theme.fonts.titleMedium.fontFamily,
                color: theme.colors.onSurface,
                marginBottom: 8,
              }}
            >
              {pack.title}
            </Text>

            <Text
              style={{
                fontSize: theme.fonts.bodySmall.fontSize,
                color: theme.colors.onSurfaceVariant,
                marginBottom: 8,
              }}
            >
              {pack.beatCount} beats • {pack.genre}
            </Text>

            <Text
              style={{
                fontSize: theme.fonts.titleMedium.fontSize,
                fontFamily: theme.fonts.titleMedium.fontFamily,
                color: theme.colors.primary,
                fontWeight: '600',
              }}
            >
              {pack.price} FCFA
            </Text>
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
        TODO: Phase 5 - Images de couverture et animations
      </Text>
    </View>
  );
};
