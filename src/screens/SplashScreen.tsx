import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Music } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  // Initialiser les valeurs différemment selon l'environnement
  const opacity = useSharedValue(1);
  const logoScale = useSharedValue(isStorybook ? 1 : 0.5);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const titleY = useSharedValue(isStorybook ? 0 : 20);
  const titleOpacity = useSharedValue(isStorybook ? 1 : 0);
  const subtitleY = useSharedValue(isStorybook ? 0 : 20);
  const subtitleOpacity = useSharedValue(isStorybook ? 1 : 0);
  const dotsOpacity = useSharedValue(isStorybook ? 1 : 0);
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);
  const glowRotation = useSharedValue(0);

  useEffect(() => {
    // Dans Storybook, les animations sont déjà à leur état final (sauf rotation et dots)
    if (isStorybook) {
      // La rotation continue même dans Storybook
      glowRotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
      // Les dots continuent d'animer
      dot1Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      dot2Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot2Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 200);
      dot3Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot3Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 400);
      return;
    }
    // Logo animation
    logoScale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Title animation
    setTimeout(() => {
      titleY.value = withTiming(0, { duration: 600 });
      titleOpacity.value = withTiming(1, { duration: 600 });
    }, 300);

    // Subtitle animation
    setTimeout(() => {
      subtitleY.value = withTiming(0, { duration: 600 });
      subtitleOpacity.value = withTiming(1, { duration: 600 });
    }, 400);

    // Dots animation
    setTimeout(() => {
      dotsOpacity.value = withTiming(1, { duration: 600 });
      dot1Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      dot2Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot2Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 200);
      dot3Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot3Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 400);
    }, 600);

    // Glow rotation
    glowRotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);

    // Complete after 2.5 seconds
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 800 }, () => {
        onComplete();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete, isStorybook]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: subtitleOpacity.value,
  }));

  const dotsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
  }));

  const dot1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));

  const dot2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));

  const dot3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${glowRotation.value}deg` }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Logo with glow */}
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <View style={styles.logoWrapper}>
                {/* Glow effect */}
                <Animated.View style={[styles.glow, glowAnimatedStyle]}>
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark, colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.glowGradient}
                  />
                </Animated.View>

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
            </Animated.View>

            {/* Title */}
            <Animated.Text style={[styles.title, titleAnimatedStyle]}>SoundMarket</Animated.Text>

            {/* Subtitle */}
            <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>Your Music Marketplace</Animated.Text>

            {/* Loading dots */}
            <Animated.View style={[styles.dotsContainer, dotsAnimatedStyle]}>
              <Animated.View style={[styles.dot, styles.dot1, dot1AnimatedStyle]} />
              <Animated.View style={[styles.dot, styles.dot2, dot2AnimatedStyle]} />
              <Animated.View style={[styles.dot, styles.dot3, dot3AnimatedStyle]} />
            </Animated.View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logoWrapper: {
    position: 'relative',
    width: spacing.xxl * 2, // 96px
    height: spacing.xxl * 2, // 96px
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    marginLeft: -spacing.md + spacing.xs, // -12px
    marginTop: -spacing.md + spacing.xs, // -12px
    borderRadius: 60, // Half of width/height for perfect circle
    opacity: 0.3,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60, // Half of width/height for perfect circle
  },
  logo: {
    width: spacing.xxl * 2, // 96px
    height: spacing.xxl * 2, // 96px
    borderRadius: spacing.xxl, // 48px = half of width/height
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.5,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl, // 32px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.xs, // 4px
  },
  dot1: {
    backgroundColor: colors.primary,
  },
  dot2: {
    backgroundColor: colors.primaryDark,
  },
  dot3: {
    backgroundColor: colors.accent,
  },
});
