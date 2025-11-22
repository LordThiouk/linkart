import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

type Step = 'select' | 'type' | 'details' | 'pricing' | 'preview' | 'success';

interface UploadHeaderProps {
  currentStep: Step;
  subtitle?: string;
}

const stepTitles: Record<Step, string> = {
  select: 'Partagez votre talent',
  type: 'Choisissez le type',
  details: 'Détails du produit',
  pricing: 'Configuration tarifaire',
  preview: 'Vérification',
  success: '',
};

const getStepIndex = (step: Step): number => {
  const steps = ['type', 'details', 'pricing', 'preview'];
  return steps.indexOf(step);
};

export function UploadHeader({ currentStep, subtitle }: UploadHeaderProps) {
  const showProgress = currentStep !== 'select' && currentStep !== 'success';
  const steps = ['type', 'details', 'pricing', 'preview'] as Step[];
  const currentIndex = getStepIndex(currentStep);

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Publier</Text>
        <Text style={styles.headerSubtitle}>{subtitle || stepTitles[currentStep]}</Text>
      </View>
      {showProgress && (
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <View key={step} style={[styles.progressBar, currentIndex >= index && styles.progressBarActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  headerContent: {
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: spacing.xs - 2,
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs / 2,
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
});
