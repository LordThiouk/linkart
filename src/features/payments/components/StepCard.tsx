import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientColors: [string, string];
}

export function StepCard({ icon: Icon, title, description, gradientColors }: StepCardProps) {
  return (
    <View style={styles.card}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.icon}>
        <Icon size={16} color={colors.textPrimary} />
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
