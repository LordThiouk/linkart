import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Check } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface BoostHeroSectionProps {
  title: string;
  subtitle: string;
  benefits: string[];
  testID?: string;
}

export function BoostHeroSection({ title, subtitle, benefits, testID }: BoostHeroSectionProps) {
  return (
    <AnimatedView entering={FadeIn} style={styles.container} testID={testID}>
      <LinearGradient
        colors={[hexToRgba(colors.primary, 0.2), hexToRgba(colors.primaryDark, 0.2), hexToRgba(colors.accent, 0.2)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.icon}
          >
            <Zap size={24} color={colors.textPrimary} fill={colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem} testID={`benefit-${index}`}>
              <LinearGradient
                colors={[colors.cyan, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.benefitIcon}
              >
                <Check size={12} color={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.primary, 0.3),
    gap: spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
    marginBottom: spacing.md,
  },
  icon: {
    width: spacing.xxl + spacing.xs,
    height: spacing.xxl + spacing.xs,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.md,
  },
  benefitsContainer: {
    gap: spacing.md - spacing.xs,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
  },
  benefitIcon: {
    width: spacing.xl - spacing.xs,
    height: spacing.xl - spacing.xs,
    borderRadius: spacing.xl / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
