import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { colors, spacing } from '@/theme';
import type { HomeCategory } from '../types';

interface HomeCategoriesProps {
  categories: HomeCategory[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export function HomeCategories({ categories, selectedCategory, onSelect }: HomeCategoriesProps) {
  return (
    <View style={styles.container}>
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
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
});
