import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface MarketplaceStatsBarProps {
  count: number;
  label?: string;
  sortLabel?: string;
  onSort?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceStatsBar({
  count,
  label,
  sortLabel = 'Trier par popularité',
  onSort,
  style,
  testID,
}: MarketplaceStatsBarProps) {
  const itemLabel = label || 'produit';
  const pluralLabel = label || 'produits';

  return (
    <View style={[styles.statsBar, style]} testID={testID}>
      <Text style={styles.statsText}>
        {count} {count > 1 ? pluralLabel : itemLabel} trouvé{count > 1 ? 's' : ''}
      </Text>
      {onSort && (
        <TouchableOpacity onPress={onSort} activeOpacity={0.8}>
          <Text style={styles.sortLink}>{sortLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  statsText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  sortLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
