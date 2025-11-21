import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

export type PricingType = 'fixed' | 'on-demand' | 'multi-tier';

interface PricingTypeCardProps {
  id: PricingType;
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

export function PricingTypeCard({ id, label, description, selected, onPress }: PricingTypeCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pricingTypeCard, selected && styles.pricingTypeCardSelected]}
      activeOpacity={0.9}
    >
      <Text style={[styles.pricingTypeTitle, selected && styles.pricingTypeTitleSelected]}>{label}</Text>
      <Text style={[styles.pricingTypeDescription, selected && styles.pricingTypeDescriptionSelected]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pricingTypeCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  pricingTypeCardSelected: {
    backgroundColor: hexToRgba(colors.primary, 0.1),
    borderColor: colors.primary,
  },
  pricingTypeTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  pricingTypeTitleSelected: {
    color: colors.primary,
  },
  pricingTypeDescription: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  pricingTypeDescriptionSelected: {
    color: colors.textSecondary,
  },
});
