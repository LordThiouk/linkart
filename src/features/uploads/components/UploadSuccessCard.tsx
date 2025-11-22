import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface UploadSuccessCardProps {
  isProductType: boolean;
}

export function UploadSuccessCard({ isProductType }: UploadSuccessCardProps) {
  return (
    <AnimatedView entering={FadeIn} style={styles.successContainer}>
      <AnimatedView entering={FadeIn.delay(200)} style={styles.successIcon}>
        <LinearGradient
          colors={[colors.success, colors.cyan]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successIconGradient}
        >
          <CheckCircle size={48} color={colors.textPrimary} fill={colors.textPrimary} />
        </LinearGradient>
      </AnimatedView>
      <AnimatedView entering={FadeIn.delay(300)}>
        <Text style={styles.successTitle}>Publication envoyée !</Text>
      </AnimatedView>
      <AnimatedView entering={FadeIn.delay(400)}>
        <Text style={styles.successMessage}>
          {isProductType ? 'Votre produit est en attente de validation' : 'Votre service est en attente de validation'}
        </Text>
      </AnimatedView>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  successIcon: {
    width: spacing.xxl * 3,
    height: spacing.xxl * 3,
    borderRadius: spacing.xxl * 3,
    overflow: 'hidden',
  },
  successIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  successMessage: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    maxWidth: spacing.xxl * 12,
  },
});
