import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface PaymentHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  disabled?: boolean;
}

export function PaymentHeader({
  title = 'Paiement sécurisé',
  subtitle = 'Choisissez votre méthode de paiement',
  onBack,
  disabled = false,
}: PaymentHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            disabled={disabled}
            style={[styles.backButton, disabled && styles.disabled]}
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
        <View style={styles.textBlock}>
          <View style={styles.titleRow}>
            <Shield size={20} color={colors.success} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  disabled: {
    opacity: 0.4,
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
