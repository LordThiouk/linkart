import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface CategoryChipFigmaProps {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function CategoryChipFigma({
  label,
  icon: Icon,
  selected = false,
  onPress,
  style,
  testID,
}: CategoryChipFigmaProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      {selected ? (
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.selectedChip}
        >
          {Icon && <Icon size={16} color={colors.textPrimary} />}
          <Text style={styles.selectedText}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.unselectedChip}>
          {Icon && <Icon size={16} color={colors.textMuted} />}
          <Text style={styles.unselectedText}>{label}</Text>
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectedChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  unselectedChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.medium,
  },
  unselectedText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
