import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface OnboardingSlideFigmaProps {
  title: string;
  description: string;
  gradient: [string, string] | [string, string, string];
  icon: LucideIcon;
  style?: ViewStyle;
  testID?: string;
}

export function OnboardingSlideFigma({
  title,
  description,
  gradient,
  icon: Icon,
  style,
  testID,
}: OnboardingSlideFigmaProps) {
  const iconScale = useSharedValue(0.8);
  const iconOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const titleOpacity = useSharedValue(0);
  const descriptionY = useSharedValue(20);
  const descriptionOpacity = useSharedValue(0);

  useEffect(() => {
    // Icon animation
    iconScale.value = withTiming(1, { duration: 500 });
    iconOpacity.value = withTiming(1, { duration: 500 });

    // Title animation
    titleY.value = withDelay(200, withTiming(0, { duration: 500 }));
    titleOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));

    // Description animation
    descriptionY.value = withDelay(300, withTiming(0, { duration: 500 }));
    descriptionOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    opacity: iconOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: descriptionY.value }],
    opacity: descriptionOpacity.value,
  }));

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Animated.View style={iconAnimatedStyle}>
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconContainer}>
          <Icon size={64} color="#F5F5F5" />
        </LinearGradient>
      </Animated.View>

      <Animated.View style={titleAnimatedStyle}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 24,
  },
});
