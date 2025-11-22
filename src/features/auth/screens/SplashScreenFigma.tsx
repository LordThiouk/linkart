import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashLogo, SplashContent, LoadingDots } from '../components';
import { colors } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SplashScreenFigmaProps {
  onComplete: () => void;
}

export function SplashScreenFigma({ onComplete }: SplashScreenFigmaProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isStorybook) return;

    // Complete after 2.5 seconds
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 800 }, () => {
        onComplete();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete, isStorybook]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AnimatedView style={[styles.container, containerAnimatedStyle]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <SplashLogo />
            <SplashContent title="SoundMarket" subtitle="Your Music Marketplace" />
            <LoadingDots />
          </View>
        </SafeAreaView>
      </AnimatedView>
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
});
