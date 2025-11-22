import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

interface UploadNavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
  showBack?: boolean;
}

export function UploadNavigationButtons({
  onBack,
  onNext,
  nextLabel = 'Suivant',
  disabled = false,
  showBack = true,
}: UploadNavigationButtonsProps) {
  return (
    <View style={styles.navigationButtons}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButtonFull} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      )}
      <PrimaryButton onPress={onNext} disabled={disabled} style={styles.nextButton}>
        {nextLabel}
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  backButtonFull: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  nextButton: {
    flex: 2,
  },
});
