import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { spacing } from '@/theme';
import type { LucideIcon } from 'lucide-react-native';

export interface MarketplaceCategory {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface MarketplaceCategoryPillsProps {
  categories: MarketplaceCategory[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceCategoryPills({
  categories,
  selectedCategory,
  onSelect,
  style,
  testID,
}: MarketplaceCategoryPillsProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map(category => (
          <CategoryChipFigma
            key={category.id}
            label={category.label}
            icon={category.icon}
            selected={selectedCategory === category.id}
            onPress={() => onSelect(category.id)}
            testID={`category-chip-${category.id}`}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  scrollContent: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
});
