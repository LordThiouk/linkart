import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Music, TrendingUp, Radio, Heart, LucideIcon } from 'lucide-react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface Feature {
  icon: LucideIcon;
  label: string;
  gradient: [string, string];
}

interface WelcomeScreenFigmaProps {
  onStart?: () => void;
}

const features: Feature[] = [
  { icon: Music, label: 'Explore', gradient: [colors.primary, colors.primaryDark] },
  { icon: TrendingUp, label: 'Trending', gradient: [colors.secondary, colors.accent] },
  { icon: Radio, label: 'Radio', gradient: [colors.primaryDark, colors.accent] },
  { icon: Heart, label: 'Favorites', gradient: [colors.accent, colors.cyan] },
];

export function WelcomeScreenFigma({ onStart }: WelcomeScreenFigmaProps) {
  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  // Initialiser les valeurs différemment selon l'environnement
  const containerOpacity = useSharedValue(isStorybook ? 1 : 0);
  const logoScale = useSharedValue(isStorybook ? 1 : 0.5);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const titleY = useSharedValue(isStorybook ? 0 : 20);
  const titleOpacity = useSharedValue(isStorybook ? 1 : 0);
  const descriptionY = useSharedValue(isStorybook ? 0 : 20);
  const descriptionOpacity = useSharedValue(isStorybook ? 1 : 0);
  const featuresY = useSharedValue(isStorybook ? 0 : 20);
  const featuresOpacity = useSharedValue(isStorybook ? 1 : 0);
  const buttonY = useSharedValue(isStorybook ? 0 : 50);
  const buttonOpacity = useSharedValue(isStorybook ? 1 : 0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Dans Storybook, les animations sont déjà à leur état final (sauf rotation)
    if (isStorybook) {
      // La rotation continue même dans Storybook
      rotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);
      return;
    }

    // Container animation
    containerOpacity.value = withTiming(1, { duration: 500 });

    // Logo animation
    logoScale.value = withSpring(1, { stiffness: 100, damping: 10 });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Rotation animation (continuous)
    rotation.value = withRepeat(withTiming(360, { duration: 20000, easing: Easing.linear }), -1, false);

    // Title animation
    titleY.value = withDelay(200, withTiming(0, { duration: 500 }));
    titleOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));

    // Description animation
    descriptionY.value = withDelay(300, withTiming(0, { duration: 500 }));
    descriptionOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Features animation
    featuresY.value = withDelay(400, withTiming(0, { duration: 500 }));
    featuresOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));

    // Button animation
    buttonY.value = withDelay(800, withTiming(0, { duration: 500 }));
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }, { rotate: `${rotation.value}deg` }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: descriptionY.value }],
    opacity: descriptionOpacity.value,
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: featuresY.value }],
    opacity: featuresOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
    opacity: buttonOpacity.value,
  }));

  // FeatureCard component to avoid hooks rules violation
  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
      scale.value = withDelay(500 + index * 100, withSpring(1, { stiffness: 200, damping: 15 }));
      opacity.value = withDelay(500 + index * 100, withTiming(1, { duration: 300 }));
    }, [index]);

    const featureAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    return (
      <AnimatedTouchableOpacity
        style={[styles.featureCard, featureAnimatedStyle]}
        activeOpacity={0.9}
        onPress={() => {}}
      >
        <LinearGradient
          colors={feature.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featureIconContainer}
        >
          <feature.icon size={24} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.featureLabel}>{feature.label}</Text>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, containerAnimatedStyle]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
          {/* Logo */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.logoGlow}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGlowGradient}
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

          {/* Title */}
          <Animated.View style={titleAnimatedStyle}>
            <Text style={styles.title}>Bienvenue sur SoundMarket</Text>
          </Animated.View>

          {/* Description */}
          <Animated.View style={descriptionAnimatedStyle}>
            <Text style={styles.description}>
              Votre compte a été créé avec succès. Commencez à explorer la meilleure musique.
            </Text>
          </Animated.View>

          {/* Features Grid */}
          <Animated.View style={[styles.featuresGrid, featuresAnimatedStyle]}>
            {features.map((feature, index) => (
              <FeatureCard key={feature.label} feature={feature} index={index} />
            ))}
          </Animated.View>
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
    paddingVertical: spacing.xxl - spacing.sm, // 40px
  },
  logoContainer: {
    marginBottom: spacing.xxl,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80, // Half of width/height for perfect circle
    opacity: 0.4,
    top: -spacing.md,
    left: -spacing.md,
  },
  logoGlowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80, // Half of width/height for perfect circle
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64, // Half of width/height for perfect circle
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
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    maxWidth: 320,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal, // 24px
  },
  featuresGrid: {
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureCard: {
    width: '47%',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIconContainer: {
    width: spacing.xxl, // 48px
    height: spacing.xxl, // 48px
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
});
