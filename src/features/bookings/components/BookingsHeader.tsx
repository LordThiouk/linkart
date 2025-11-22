import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography, radii, hexToRgba } from '@/theme';

interface BookingsHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

export function BookingsHeader({ title = 'Mes Réservations', subtitle, onBack }: BookingsHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.top}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
              <ArrowLeft size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl, // pt-12
    paddingBottom: spacing.md, // pb-4
    paddingHorizontal: spacing.lg, // px-6
  },
  content: {
    gap: spacing.md, // gap-4
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // gap-4
    marginBottom: spacing.md, // mb-4
  },
  backButton: {
    padding: spacing.sm, // p-2
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - spacing.xs, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
