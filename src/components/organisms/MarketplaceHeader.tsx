import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SearchBar } from '../molecules/SearchBar';
import { FilterPills } from './FilterPills';

interface MarketplaceHeaderProps {
  onSearch: (query: string) => void;
  onFilterPress: (filterId: string) => void;
  activeFilters: string[];
  searchQuery: string;
}

/**
 * TODO: Phase 5 - Composant MarketplaceHeader
 *
 * Ce composant sera implémenté dans la Phase 5 du Design System.
 * Il affichera un header complet pour le marketplace avec:
 * - SearchBar avec suggestions en temps réel
 * - FilterPills avec filtres avancés (prix, genre, licence)
 * - Bouton de tri avec options (prix, popularité, récent)
 * - Indicateur de nombre de résultats
 * - Mode vue (grille/liste)
 *
 * @see Migration Guide Phase 5
 */
export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  onSearch,
  onFilterPress,
  activeFilters,
  searchQuery,
}) => {
  const theme = useTheme();

  const filters = [
    { id: 'all', label: 'Tous', icon: 'grid' },
    { id: 'beats', label: 'Beats', icon: 'music' },
    { id: 'kits', label: 'Kits', icon: 'archive' },
    { id: 'samples', label: 'Samples', icon: 'waveform' },
    { id: 'services', label: 'Services', icon: 'headphones' },
  ];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: theme.fonts.headlineMedium.fontSize,
          fontFamily: theme.fonts.headlineMedium.fontFamily,
          color: theme.colors.onSurface,
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        🎵 Marketplace
      </Text>

      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <SearchBar placeholder="Rechercher beats, artistes, services..." value={searchQuery} onChangeText={onSearch} />
      </View>

      <FilterPills filters={filters} onFilterPress={onFilterPress} />

      <Text
        style={{
          fontSize: theme.fonts.bodySmall.fontSize,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 8,
          fontStyle: 'italic',
        }}
      >
        TODO: Phase 5 - Tri, suggestions de recherche et mode vue
      </Text>
    </View>
  );
};
