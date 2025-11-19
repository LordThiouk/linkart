import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface SuccessMessageProps {
  title?: string;
  subtitle?: string;
  delay?: number;
}

export function SuccessMessage({
  title = 'Paiement réussi !',
  subtitle = 'Votre achat a été confirmé avec succès',
  delay = 400,
}: SuccessMessageProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(delay)} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl, // 32px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
