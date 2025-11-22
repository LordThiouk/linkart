import React, { useEffect } from 'react';
import { View, StyleSheet, Easing } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Music } from 'lucide-react-native';
import { colors, spacing } from '@/theme';

export interface WelcomeLogoProps {
  testID?: string;
}

export function WelcomeLogo({ testID }: WelcomeLogoProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const logoScale = useSharedValue(isStorybook ? 1 : 0.5);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isStorybook) {
      rotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
      return;
    }

    logoScale.value = withSpring(1, { stiffness: 100, damping: 10 });
    logoOpacity.value = withTiming(1, { duration: 600 });
    rotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
  }, [isStorybook]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }, { rotate: `${rotation.value}deg` }],
    opacity: logoOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, logoAnimatedStyle]} testID={testID}>
      <View style={styles.glow}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glowGradient}
        />
      </View>
      <View style={styles.logo}>
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoGradient}
        >
          <Music size={64} color={colors.textPrimary} />
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xxl,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.4,
    top: -spacing.md,
    left: -spacing.md,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.5,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
