import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Music, TrendingUp, Radio, Heart } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { WelcomeLogo, WelcomeContent, WelcomeFeaturesGrid, type Feature } from '../components';
import { colors, spacing } from '@/theme';

export interface WelcomeScreenFigmaProps {
  onStart?: () => void;
}

const features: Feature[] = [
  { icon: Music, label: 'Explore', gradient: [colors.primary, colors.primaryDark] },
  { icon: TrendingUp, label: 'Trending', gradient: [colors.secondary, colors.accent] },
  { icon: Radio, label: 'Radio', gradient: [colors.primaryDark, colors.accent] },
  { icon: Heart, label: 'Favorites', gradient: [colors.accent, colors.cyan] },
];

export function WelcomeScreenFigma({ onStart }: WelcomeScreenFigmaProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const containerOpacity = useSharedValue(isStorybook ? 1 : 0);
  const buttonY = useSharedValue(isStorybook ? 0 : 50);
  const buttonOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    containerOpacity.value = withTiming(1, { duration: 500 });
    buttonY.value = withTiming(0, { duration: 500 });
    buttonOpacity.value = withTiming(1, { duration: 500 });
  }, [isStorybook]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
    opacity: buttonOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, containerAnimatedStyle]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
          <WelcomeLogo />

          <WelcomeContent
            title="Bienvenue sur SoundMarket"
            description="Votre compte a été créé avec succès. Commencez à explorer la meilleure musique."
          />

          <WelcomeFeaturesGrid features={features} />
        </ScrollView>

        {/* Button */}
        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <PrimaryButton onPress={onStart} fullWidth>
            Commencer l'exploration
          </PrimaryButton>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl - spacing.sm,
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
});
