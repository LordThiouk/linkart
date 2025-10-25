import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  filters?: {
    label: string;
    value: string;
    selected?: boolean;
  }[];
  onFilterChange?: (filter: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher des beats...',
  value,
  onChangeText,
  onSearch,
  filters = [],
  onFilterChange,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    onSearch?.(value);
    // Simuler une recherche (à remplacer par l'appel API réel)
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handleFilterPress = (filterValue: string) => {
    onFilterChange?.(filterValue);
  };

  return (
    <View style={style} testID={testID}>
      <Searchbar
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
        loading={isSearching}
        style={{
          backgroundColor: theme.colors.surface,
          elevation: 2,
        }}
      />

      {filters.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: tokens.spacing.md,
            gap: tokens.spacing.sm,
          }}
        >
          {filters.map(filter => (
            <Chip
              key={filter.value}
              selected={filter.selected}
              onPress={() => handleFilterPress(filter.value)}
              style={{
                backgroundColor: filter.selected ? theme.colors.primary : theme.colors.surface,
              }}
              textStyle={{
                color: filter.selected ? theme.colors.onPrimary : theme.colors.onSurface,
              }}
            >
              {filter.label}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
};
