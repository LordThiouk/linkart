import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Stat {
  label: string;
  value: string;
  icon: string;
}

interface PurchaseStatsProps {
  stats: Stat[];
  delay?: number;
}

export function PurchaseStats({ stats, delay = 0 }: PurchaseStatsProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <AnimatedView key={stat.label} entering={FadeInDown.delay(delay + index * 50)} style={styles.card}>
          <Text style={styles.icon}>{stat.icon}</Text>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </AnimatedView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // 12px
  },
  card: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  icon: {
    fontSize: spacing.lg,
    marginBottom: spacing.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
