import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, TrendingUp, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface AutoPlaylistBadgeProps {
  type: 'boosted' | 'top' | 'new';
  label?: string;
  testID?: string;
}

const badgeConfig = {
  boosted: {
    colors: [colors.primary, colors.primaryDark] as const,
    icon: Zap,
    defaultLabel: 'Boosté',
  },
  top: {
    colors: [colors.accent, colors.secondary] as const,
    icon: TrendingUp,
    defaultLabel: 'Top',
  },
  new: {
    colors: [colors.cyan, colors.primary] as const,
    icon: Sparkles,
    defaultLabel: 'Nouveau',
  },
};

export function AutoPlaylistBadge({ type, label, testID }: AutoPlaylistBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <LinearGradient
      colors={config.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.badge}
      testID={testID}
    >
      <Icon size={12} color={colors.textPrimary} />
      <Text style={styles.badgeText}>{displayLabel}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
