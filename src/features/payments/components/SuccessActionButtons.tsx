import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Download, Package, Home } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface SuccessActionButtonsProps {
  onDownload?: () => void;
  onViewPurchases?: () => void;
  onGoHome?: () => void;
  delay?: number;
}

export function SuccessActionButtons({
  onDownload,
  onViewPurchases,
  onGoHome,
  delay = 1000,
}: SuccessActionButtonsProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(delay)} style={styles.container}>
      <PrimaryButton onPress={onDownload} fullWidth>
        <View style={styles.buttonContent}>
          <Download size={20} color={colors.textPrimary} />
          <Text style={styles.buttonText}>Télécharger maintenant</Text>
        </View>
      </PrimaryButton>

      <TouchableOpacity onPress={onViewPurchases} style={styles.secondaryButton} activeOpacity={0.8}>
        <Package size={20} color={colors.textPrimary} />
        <Text style={styles.secondaryButtonText}>Voir mes achats</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoHome} style={styles.tertiaryButton} activeOpacity={0.8}>
        <Home size={20} color={colors.textMuted} />
        <Text style={styles.tertiaryButtonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.md - spacing.xs, // 12px
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.transparent,
  },
  tertiaryButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
