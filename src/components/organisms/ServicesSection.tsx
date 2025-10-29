import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ServiceCard } from '../molecules/ServiceCard';

interface ServicesSectionProps {
  services: any[];
  onServicePress: (serviceId: string) => void;
  onBookService?: (serviceId: string) => void;
  onToggleFavorite?: (serviceId: string) => void;
}

/**
 * TODO: Phase 5 - Composant ServicesSection
 *
 * Ce composant sera implémenté dans la Phase 5 du Design System.
 * Il affichera une section verticale des services avec:
 * - Liste verticale des ServiceCard
 * - Titre "Services Professionnels" avec filtre par catégorie
 * - Badge de vérification pour prestataires vérifiés
 * - Indicateur de disponibilité en temps réel
 * - Pagination infinie
 *
 * @see Migration Guide Phase 5
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onServicePress,
  onBookService,
  onToggleFavorite,
}) => {
  const theme = useTheme();

  const renderService = ({ item }: { item: any }) => (
    <ServiceCard
      id={item.id}
      title={item.title}
      provider={item.provider}
      description={item.description}
      price={item.price}
      category={item.category}
      rating={item.rating}
      reviewCount={item.reviewCount}
      isFavorite={item.isFavorite}
      onToggleFavorite={() => onToggleFavorite?.(item.id)}
      onPress={() => onServicePress(item.id)}
      onBook={() => onBookService?.(item.id)}
    />
  );

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
        🎧 Services Professionnels
      </Text>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />

      <Text
        style={{
          fontSize: theme.fonts.bodySmall.fontSize,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 8,
          fontStyle: 'italic',
        }}
      >
        TODO: Phase 5 - Filtres par catégorie et disponibilité temps réel
      </Text>
    </View>
  );
};
