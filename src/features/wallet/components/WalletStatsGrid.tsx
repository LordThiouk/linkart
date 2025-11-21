import React from 'react';
import { View, Text, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface WalletStat {
  label: string;
  value: string;
  change: string;
}

export interface WalletStatsGridProps {
  stats: WalletStat[];
  numColumns?: 2 | 3;
  style?: ViewStyle;
  testID?: string;
}

export function WalletStatsGrid({ stats, numColumns = 2, style, testID }: WalletStatsGridProps) {
  const renderStat = ({ item, index }: { item: WalletStat; index: number }) => {
    return (
      <View style={styles.card} testID={`stat-${index}`}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
        <View style={styles.change}>
          <TrendingUp size={12} color={colors.success} />
          <Text style={styles.changeText}>{item.change}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <FlatList
        data={stats}
        numColumns={numColumns}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={renderStat}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        testID="stats-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  grid: {
    gap: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  card: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 0, // Allows flex to work correctly
    marginHorizontal: spacing.md / 2,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  changeText: {
    color: colors.success,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
