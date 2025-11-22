import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { InputField } from '@/components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BookingFormDetailsStepProps {
  projectName: string;
  description: string;
  deadline: string;
  additionalNotes: string;
  onProjectNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDeadlineChange: (value: string) => void;
  onAdditionalNotesChange: (value: string) => void;
}

export function BookingFormDetailsStep({
  projectName,
  description,
  deadline,
  additionalNotes,
  onProjectNameChange,
  onDescriptionChange,
  onDeadlineChange,
  onAdditionalNotesChange,
}: BookingFormDetailsStepProps) {
  return (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Détails du projet</Text>
        <Text style={styles.stepSubtitle}>
          Décrivez votre projet pour aider le prestataire à mieux comprendre vos besoins
        </Text>
      </View>

      <InputField
        label="Nom du projet"
        placeholder="Ex: Mon EP Afrobeat 2025"
        value={projectName}
        onChangeText={onProjectNameChange}
      />

      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Description du projet</Text>
        <TextInput
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Décrivez en détail ce que vous attendez du prestataire..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={6}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>

      <InputField
        label="Date limite souhaitée (optionnel)"
        placeholder="YYYY-MM-DD"
        value={deadline}
        onChangeText={onDeadlineChange}
      />

      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Notes additionnelles (optionnel)</Text>
        <TextInput
          value={additionalNotes}
          onChangeText={onAdditionalNotesChange}
          placeholder="Références, style souhaité, informations complémentaires..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>
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
  textAreaSection: {
    gap: spacing.sm,
  },
  textAreaLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  textArea: {
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    minHeight: spacing.xxl * 2 + spacing.md, // 120px
  },
});
