import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Filter, Music2, Package } from 'lucide-react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { spacing } from '@/theme';

export type PurchaseFilterType = 'all' | 'beats' | 'kits';

interface PurchaseFiltersProps {
  selectedFilter: PurchaseFilterType;
  onFilterChange: (filter: PurchaseFilterType) => void;
}

const FILTERS: { id: PurchaseFilterType; label: string; icon: typeof Filter }[] = [
  { id: 'all', label: 'Tout', icon: Filter },
  { id: 'beats', label: 'Beats', icon: Music2 },
  { id: 'kits', label: 'Kits', icon: Package },
];

export function PurchaseFilters({ selectedFilter, onFilterChange }: PurchaseFiltersProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map(filter => (
        <CategoryChipFigma
          key={filter.id}
          label={filter.label}
          icon={filter.icon}
          selected={selectedFilter === filter.id}
          onPress={() => onFilterChange(filter.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
