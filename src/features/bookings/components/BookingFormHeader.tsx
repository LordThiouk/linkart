import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface BookingFormHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function BookingFormHeader({ currentStep, totalSteps, onBack }: BookingFormHeaderProps) {
  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <View key={index} style={[styles.progressBar, (isActive || isCompleted) && styles.progressBarActive]} />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
              <ChevronLeft size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Réservation</Text>
            <Text style={styles.headerSubtitle}>
              Étape {currentStep} sur {totalSteps}
            </Text>
          </View>
        </View>
        {renderProgressBar()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.border}80`, // 50% opacity
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.md - spacing.xs, // p-3
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - spacing.xs, // 28px
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
  },
  progressBar: {
    flex: 1,
    height: spacing.xs,
    borderRadius: spacing.xs / 2,
    backgroundColor: colors.border,
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
});
