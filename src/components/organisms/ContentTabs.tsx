import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ContentTabsProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

/**
 * TODO: Phase 5 - Composant ContentTabs
 *
 * Ce composant sera implémenté dans la Phase 5 du Design System.
 * Il affichera des tabs de navigation pour le contenu avec:
 * - Tabs avec icônes et labels
 * - Indicateur de tab actif avec animation
 * - Badge de notification sur certains tabs
 * - Support des tabs scrollables
 * - Animation de transition fluide
 *
 * @see Migration Guide Phase 5
 */
export const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, onTabPress }) => {
  const theme = useTheme();

  const tabs = [
    { id: 'products', label: 'Produits', icon: '🎵' },
    { id: 'services', label: 'Services', icon: '🎧' },
    { id: 'playlists', label: 'Playlists', icon: '📀' },
    { id: 'favorites', label: 'Favoris', icon: '❤️' },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outline,
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: isActive ? theme.colors.primary : 'transparent',
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 4 }}>{tab.icon}</Text>
            <Text
              style={{
                fontSize: theme.fonts.labelMedium.fontSize,
                fontFamily: theme.fonts.labelMedium.fontFamily,
                color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant,
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <Text
        style={{
          fontSize: theme.fonts.bodySmall.fontSize,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 8,
          fontStyle: 'italic',
          width: '100%',
        }}
      >
        TODO: Phase 5 - Animation et badges de notification
      </Text>
    </View>
  );
};
