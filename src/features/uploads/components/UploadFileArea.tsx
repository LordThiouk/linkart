import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon, Upload } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface UploadFileAreaProps {
  label: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  gradientColors: [string, string];
  onPress: () => void;
  onBrowse: () => void;
}

export function UploadFileArea({
  label,
  title,
  subtitle,
  icon: Icon = Upload,
  gradientColors,
  onPress,
  onBrowse,
}: UploadFileAreaProps) {
  return (
    <View style={styles.uploadSection}>
      <Text style={styles.uploadLabel}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={styles.uploadArea} activeOpacity={0.9}>
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.uploadIcon}>
          <Icon size={24} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.uploadTitle}>{title}</Text>
        <Text style={styles.uploadSubtitle}>{subtitle}</Text>
        <TouchableOpacity onPress={onBrowse} style={styles.uploadButton} activeOpacity={0.8}>
          <Text style={styles.uploadButtonText}>Parcourir</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadSection: {
    gap: spacing.sm,
  },
  uploadLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  uploadArea: {
    padding: spacing.xl,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: spacing.md,
  },
  uploadIcon: {
    width: spacing.xxl * 2 + spacing.xs,
    height: spacing.xxl * 2 + spacing.xs,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  uploadTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  uploadSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  uploadButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
  },
  uploadButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
