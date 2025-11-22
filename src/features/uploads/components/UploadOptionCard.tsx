import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface UploadOptionCardProps {
  title: string;
  description: string;
  gradientColors: [string, string];
  onPress: () => void;
  badge?: string;
  icon?: LucideIcon;
}

export function UploadOptionCard({
  title,
  description,
  gradientColors,
  onPress,
  badge,
  icon: Icon = Download,
}: UploadOptionCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionCard} activeOpacity={0.9}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.optionIcon}>
        <Icon size={32} color={colors.textPrimary} />
      </LinearGradient>
      <View style={styles.optionContent}>
        {badge ? (
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>{title}</Text>
            <View style={styles.freeBadge}>
              <LinearGradient
                colors={[colors.success, colors.cyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.freeBadgeGradient}
              >
                <Text style={styles.freeBadgeText}>{badge}</Text>
              </LinearGradient>
            </View>
          </View>
        ) : (
          <Text style={styles.optionTitle}>{title}</Text>
        )}
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    alignItems: 'center',
  },
  optionIcon: {
    width: spacing.xxl * 2 + spacing.xs,
    height: spacing.xxl * 2 + spacing.xs,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
    gap: spacing.xs,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    flex: 1,
  },
  freeBadge: {
    overflow: 'hidden',
    borderRadius: radii.sm,
  },
  freeBadgeGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
  },
  freeBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.poppins.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionDescription: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
