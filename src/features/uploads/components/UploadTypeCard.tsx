import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface UploadTypeCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
  onPress: () => void;
}

export function UploadTypeCard({ label, description, icon: Icon, onPress }: UploadTypeCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.typeCard} activeOpacity={0.9}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.typeIcon}
      >
        <Icon size={24} color={colors.textPrimary} />
      </LinearGradient>
      <View style={styles.typeContent}>
        <Text style={styles.typeTitle}>{label}</Text>
        <Text style={styles.typeDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  typeCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs,
    alignItems: 'center',
  },
  typeIcon: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeContent: {
    flex: 1,
    gap: spacing.xs,
  },
  typeTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  typeDescription: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
