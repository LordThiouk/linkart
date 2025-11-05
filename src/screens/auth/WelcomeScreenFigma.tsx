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
  { icon: Music, label: 'Explore', gradient: ['#6366F1', '#8B5CF6'] },
  { icon: TrendingUp, label: 'Trending', gradient: ['#F59E0B', '#EC4899'] },
  { icon: Radio, label: 'Radio', gradient: ['#8B5CF6', '#EC4899'] },
  { icon: Heart, label: 'Favorites', gradient: ['#EC4899', '#06B6D4'] },
];

export function WelcomeScreenFigma({ onStart }: WelcomeScreenFigmaProps) {
  const containerOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const titleOpacity = useSharedValue(0);
  const descriptionY = useSharedValue(20);
  const descriptionOpacity = useSharedValue(0);
  const featuresY = useSharedValue(20);
  const featuresOpacity = useSharedValue(0);
  const buttonY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
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
  }, []);

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
          <feature.icon size={24} color="#F5F5F5" />
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
                colors={['#6366F1', '#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGlowGradient}
              />
            </View>
            <View style={styles.logo}>
              <LinearGradient
                colors={['#6366F1', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradient}
              >
                <Music size={64} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 48,
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.4,
    top: -16,
    left: -16,
  },
  logoGlowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 48,
    maxWidth: 320,
    lineHeight: 24,
  },
  featuresGrid: {
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    width: '47%',
    alignItems: 'center',
    gap: 12,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 16,
  },
});
