import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '@/theme';
import { InfoBanner } from '@/features/uploads/components';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BookingFormReviewStepProps {
  projectName: string;
  description: string;
  deadline?: string;
  packageName: string;
  price: number;
  deliveryTime: string;
}

export function BookingFormReviewStep({
  projectName,
  description,
  deadline,
  packageName,
  price,
  deliveryTime,
}: BookingFormReviewStepProps) {
  return (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Vérification</Text>
        <Text style={styles.stepSubtitle}>Vérifiez les informations avant d'envoyer votre demande</Text>
      </View>

      {/* Summary Sections */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Détails du projet</Text>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Nom du projet</Text>
            <Text style={styles.summaryDetailValue}>{projectName || 'Non spécifié'}</Text>
          </View>
          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Description</Text>
            <Text style={styles.summaryDetailValue}>{description || 'Non spécifié'}</Text>
          </View>
          {deadline && (
            <View style={styles.summaryDetail}>
              <Text style={styles.summaryDetailLabel}>Date limite</Text>
              <Text style={styles.summaryDetailValue}>{deadline}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Résumé de la commande</Text>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowLabel}>Package {packageName}</Text>
            <Text style={styles.summaryRowValue}>€{price.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.summaryRowLabelTotal}>Total</Text>
            <Text style={styles.summaryRowValueTotal}>€{price.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <InfoBanner
        message={`⚠️ Le prestataire examinera votre demande et vous répondra dans les ${deliveryTime}. Le paiement sera effectué après confirmation de sa part.`}
      />
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  stepHeader: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  stepTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryCard: {
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs,
  },
  summaryCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md - spacing.xs,
  },
  summaryDetails: {
    gap: spacing.md - spacing.xs,
  },
  summaryDetail: {
    gap: spacing.sm,
  },
  summaryDetailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.xs,
  },
  summaryDetailValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryRowTotal: {
    paddingTop: spacing.md - spacing.xs,
    borderTopWidth: 1,
    borderTopColor: `${colors.border}80`,
    marginTop: spacing.md - spacing.xs,
  },
  summaryRowLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryRowValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  summaryRowLabelTotal: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  summaryRowValueTotal: {
    color: colors.secondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
});
