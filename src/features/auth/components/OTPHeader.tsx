import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface OTPHeaderProps {
  title: string;
  contact: string;
  testID?: string;
}

export function OTPHeader({ title, contact, testID }: OTPHeaderProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const logoY = useSharedValue(isStorybook ? 0 : -20);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const contentY = useSharedValue(isStorybook ? 0 : 20);
  const contentOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    logoY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    logoOpacity.value = withTiming(1, { duration: 600 });
    setTimeout(() => {
      contentY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      contentOpacity.value = withTiming(1, { duration: 600 });
    }, 100);
  }, [isStorybook]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoY.value }],
    opacity: logoOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentOpacity.value,
  }));

  return (
    <View style={styles.container} testID={testID}>
      <AnimatedView style={[styles.logoContainer, logoAnimatedStyle]}>
        <LinearGradient
          colors={[colors.primaryDark, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logo}
        >
          <Shield size={32} color={colors.textPrimary} />
        </LinearGradient>
      </AnimatedView>

      <AnimatedView style={[styles.content, contentAnimatedStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Code envoyé à <Text style={styles.contact}>{contact}</Text>
        </Text>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.3,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  contact: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
