import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface ClearFiltersButtonProps {
  onPress: () => void;
  testID?: string;
}

export function ClearFiltersButton({ onPress, testID }: ClearFiltersButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8} testID={testID}>
      <X size={16} color={colors.textSecondary} />
      <Text style={styles.text}>Réinitialiser tous les filtres</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md - spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    marginTop: spacing.sm,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
