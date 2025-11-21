import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface MarketplaceEmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  testID?: string;
  style?: ViewStyle;
}

export function MarketplaceEmptyState({
  title = 'Aucun produit trouvé',
  subtitle = 'Essayez de modifier vos filtres',
  icon: Icon = Search,
  testID,
  style,
}: MarketplaceEmptyStateProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.iconContainer}>
        <Icon size={32} color={colors.border} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
