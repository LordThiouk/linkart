import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { spacing } from '@/theme';

export type BookingFilterType = 'all' | 'pending' | 'confirmed' | 'completed';

interface BookingsFilterBarProps {
  selectedFilter: BookingFilterType;
  onFilterChange: (filter: BookingFilterType) => void;
}

const FILTERS: { id: BookingFilterType; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'pending', label: 'En attente' },
  { id: 'confirmed', label: 'Confirmées' },
  { id: 'completed', label: 'Terminées' },
];

export function BookingsFilterBar({ selectedFilter, onFilterChange }: BookingsFilterBarProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {FILTERS.map(filter => (
        <CategoryChipFigma
          key={filter.id}
          label={filter.label}
          selected={selectedFilter === filter.id}
          onPress={() => onFilterChange(filter.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm, // gap-2
    paddingRight: spacing.lg, // pr-6
  },
});
