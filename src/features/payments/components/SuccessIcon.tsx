import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle } from 'lucide-react-native';
import { colors } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface SuccessIconProps {
  size?: number;
  delay?: number;
}

export function SuccessIcon({ size = 128, delay = 200 }: SuccessIconProps) {
  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const pulse1 = useSharedValue(1);
  const pulse2 = useSharedValue(1);
  const opacity1 = useSharedValue(isStorybook ? 0.3 : 0.6);
  const opacity2 = useSharedValue(isStorybook ? 0.3 : 0.6);

  useEffect(() => {
    pulse1.value = withRepeat(withTiming(1.5, { duration: 2000 }), -1, false);
    opacity1.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
    pulse2.value = withRepeat(withTiming(1.5, { duration: 2000 }), -1, false);
    opacity2.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
  }, []);

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1.value }],
    opacity: opacity1.value,
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2.value }],
    opacity: opacity2.value,
  }));

  const borderRadius = size / 2;
  const iconSize = size * 0.5; // 64px pour size=128

  return (
    <AnimatedView entering={FadeIn.delay(delay)} style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.wrapper, { width: size, height: size }]}>
        <LinearGradient
          colors={[colors.success, colors.successDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { width: size, height: size, borderRadius }]}
        >
          <CheckCircle size={iconSize} color={colors.textPrimary} />
        </LinearGradient>
        {/* Pulse rings */}
        <AnimatedView style={[styles.pulseRing, { width: size, height: size, borderRadius }, pulseStyle1]} />
        <AnimatedView style={[styles.pulseRing, { width: size, height: size, borderRadius }, pulseStyle2]} />
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    backgroundColor: colors.success,
    opacity: 0.6,
  },
});
