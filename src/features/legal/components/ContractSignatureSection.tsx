import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ContractSignatureSectionProps {
  title: string;
  date: string;
  legalNotice?: string;
  testID?: string;
}

export function ContractSignatureSection({ title, date, legalNotice, testID }: ContractSignatureSectionProps) {
  return (
    <AnimatedView entering={FadeIn.delay(200)} style={styles.container} testID={testID}>
      {legalNotice && (
        <View style={styles.legalNotice}>
          <Text style={styles.legalNoticeText}>{legalNotice}</Text>
        </View>
      )}

      <LinearGradient
        colors={[hexToRgba(colors.primary, 0.1), hexToRgba(colors.primaryDark, 0.1)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.signatureCard}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signatureIcon}
        >
          <Check size={32} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.signatureTitle}>{title}</Text>
        <Text style={styles.signatureDate}>{date}</Text>
      </LinearGradient>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  legalNotice: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legalNoticeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: typography.fontSize.caption * 1.5,
  },
  signatureCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.primary, 0.3),
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
  },
  signatureIcon: {
    width: spacing.xxl * 2 + spacing.xl,
    height: spacing.xxl * 2 + spacing.xl,
    borderRadius: spacing.xxl + spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md - spacing.xs,
  },
  signatureTitle: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  signatureDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
