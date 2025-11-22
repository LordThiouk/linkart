import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProductStat {
  label: string;
  value: string | number;
}

export interface ProductStatsBarProps {
  stats: ProductStat[];
  style?: ViewStyle;
  testID?: string;
}

export function ProductStatsBar({ stats, style, testID }: ProductStatsBarProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {stats.map((stat, index) => (
        <View key={stat.label} style={styles.statCard} testID={`stat-${index}`}>
          <Text style={styles.statValue}>
            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
