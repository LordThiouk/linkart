import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface BoostStatsSectionProps {
  title: string;
  stats: Stat[];
  testID?: string;
}

export function BoostStatsSection({ title, stats, testID }: BoostStatsSectionProps) {
  return (
    <AnimatedView entering={FadeIn.delay(400)} style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <AnimatedView key={stat.label} entering={FadeInDown.delay(index * 100)} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </AnimatedView>
        ))}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: spacing.lg,
    marginBottom: spacing.sm,
  },
  statValue: {
    color: colors.cyan,
    fontSize: typography.fontSize.body + 2,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
