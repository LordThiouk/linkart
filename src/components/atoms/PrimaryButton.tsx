import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface PrimaryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  onPress,
  style,
  testID,
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const baseStyles: ViewStyle = {
    paddingHorizontal: 32, // px-8
    paddingVertical: 16, // py-4
    borderRadius: 24, // rounded-2xl
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled || loading ? 0.5 : 1,
    ...(fullWidth && { width: '100%' }),
  };

  if (variant === 'primary') {
    return (
      <AnimatedTouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, baseStyles, style]}
        activeOpacity={0.9}
        testID={testID}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: 24,
            },
          ]}
        />
        <View
          style={{
            shadowColor: '#6366F1',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#F5F5F5" size="small" />
          ) : (
            <Text style={styles.primaryText}>{children}</Text>
          )}
        </View>
      </AnimatedTouchableOpacity>
    );
  }

  // Ghost variant
  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, baseStyles, styles.ghostButton, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      {loading ? <ActivityIndicator color="#D4D4D4" size="small" /> : <Text style={styles.ghostText}>{children}</Text>}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#404040',
  },
  ghostText: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
});
