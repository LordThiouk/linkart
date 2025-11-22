import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Music } from 'lucide-react-native';
import { colors, spacing } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SplashLogoProps {
  testID?: string;
}

export function SplashLogo({ testID }: SplashLogoProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const logoScale = useSharedValue(isStorybook ? 1 : 0.5);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const glowRotation = useSharedValue(0);

  useEffect(() => {
    if (isStorybook) {
      glowRotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
      return;
    }
    logoScale.value = withTiming(1, { duration: 600, easing: Easing.linear });
    logoOpacity.value = withTiming(1, { duration: 600 });
    glowRotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
  }, [isStorybook]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${glowRotation.value}deg` }],
  }));

  return (
    <AnimatedView style={[styles.container, logoAnimatedStyle]} testID={testID}>
      <View style={styles.wrapper}>
        {/* Glow effect */}
        <AnimatedView style={[styles.glow, glowAnimatedStyle]}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glowGradient}
          />
        </AnimatedView>

        {/* Logo */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logo}
        >
          <Music size={48} color={colors.textPrimary} />
        </LinearGradient>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  wrapper: {
    position: 'relative',
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    marginLeft: -spacing.md + spacing.xs,
    marginTop: -spacing.md + spacing.xs,
    borderRadius: 60,
    opacity: 0.3,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  logo: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    borderRadius: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.5,
    shadowRadius: spacing.md,
    elevation: 12,
  },
});
