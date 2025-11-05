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

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const opacity = useSharedValue(1);
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const titleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const dotsOpacity = useSharedValue(0);
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);
  const glowRotation = useSharedValue(0);

  useEffect(() => {
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
  }, [onComplete]);

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
                    colors={['#6366F1', '#8B5CF6', '#EC4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.glowGradient}
                  />
                </Animated.View>

                {/* Logo */}
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logo}
                >
                  <Music size={48} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
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
    marginBottom: 32,
  },
  logoWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    marginLeft: -12,
    marginTop: -12,
    borderRadius: 60,
    opacity: 0.3,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A3A3A3',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 48,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dot1: {
    backgroundColor: '#6366F1',
  },
  dot2: {
    backgroundColor: '#8B5CF6',
  },
  dot3: {
    backgroundColor: '#EC4899',
  },
});
