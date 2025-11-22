import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ViewStyle, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface MarketplaceCategoryItem {
  id: string;
  label: string;
  icon: LucideIcon;
  colors: [ColorValue, ColorValue, ...ColorValue[]];
}

interface MarketplaceCategoriesGridProps {
  title?: string;
  categories: MarketplaceCategoryItem[];
  onCategoryPress?: (categoryId: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceCategoriesGrid({
  title = 'Catégories',
  categories,
  onCategoryPress,
  style,
  testID,
}: MarketplaceCategoriesGridProps) {
  const renderCategory = ({ item }: { item: MarketplaceCategoryItem }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        activeOpacity={0.9}
        onPress={() => onCategoryPress?.(item.id)}
        testID={`category-${item.id}`}
      >
        <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.categoryIcon}>
          <Icon size={24} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.categoryLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderCategory}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        testID="categories-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  grid: {
    paddingBottom: spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  categoryCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md / 2,
    minWidth: 0, // Permet au flex de fonctionner correctement
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  categoryLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
