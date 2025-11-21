import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

interface BookingFormNavigationButtonsProps {
  currentStep: 'details' | 'files' | 'review';
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function BookingFormNavigationButtons({
  currentStep,
  onBack,
  onNext,
  onSubmit,
  disabled = false,
}: BookingFormNavigationButtonsProps) {
  const showBackButton = currentStep !== 'details';
  const isReviewStep = currentStep === 'review';

  return (
    <View style={styles.bottomCTA}>
      <View style={styles.bottomCTAContent}>
        {showBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.bottomBackButton} activeOpacity={0.8}>
            <Text style={styles.bottomBackButtonText}>Retour</Text>
          </TouchableOpacity>
        )}
        <PrimaryButton onPress={isReviewStep ? onSubmit : onNext} disabled={disabled} style={styles.bottomNextButton}>
          {isReviewStep ? 'Envoyer la demande' : 'Suivant'}
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: `${colors.border}80`, // 50% opacity
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  bottomCTAContent: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // gap-3
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  bottomBackButton: {
    flex: 1,
    paddingVertical: spacing.md - spacing.xs, // py-3
    paddingHorizontal: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBackButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  bottomNextButton: {
    flex: 1,
    marginBottom: 0,
  },
});
