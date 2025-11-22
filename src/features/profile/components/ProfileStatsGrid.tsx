import React from 'react';
import { View, Text, StyleSheet, ViewStyle, ColorValue, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProfileStat {
  icon: LucideIcon;
  label: string;
  value: string | number;
  colors: [ColorValue, ColorValue, ...ColorValue[]];
}

export interface ProfileStatsGridProps {
  stats: ProfileStat[];
  style?: ViewStyle;
  testID?: string;
}

export function ProfileStatsGrid({ stats, style, testID }: ProfileStatsGridProps) {
  // Calculate card width for 2 columns
  const { width: screenWidth } = useWindowDimensions();
  const horizontalPadding = spacing.xl * 2;
  const gap = spacing.md;
  const cardWidth = (screenWidth - horizontalPadding - gap) / 2;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.grid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <View key={stat.label} style={[styles.card, { width: cardWidth }]} testID={`stat-${index}`}>
              <LinearGradient colors={stat.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.icon}>
                <Icon size={20} color={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.value}>
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </Text>
              <Text style={styles.label}>{stat.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
