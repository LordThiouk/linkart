import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

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
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  if (selected) {
    return (
      <AnimatedTouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle, styles.container, styles.selected, style]}
        activeOpacity={0.9}
        testID={testID}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {Icon && <Icon size={16} color="#F5F5F5" style={styles.icon} />}
            <Text style={styles.selectedText}>{label}</Text>
          </View>
        </LinearGradient>
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, styles.container, styles.unselected, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      <View style={styles.content}>
        {Icon && <Icon size={16} color="#D4D4D4" style={styles.icon} />}
        <Text style={styles.unselectedText}>{label}</Text>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 999, // rounded-full
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    overflow: 'hidden',
  },
  selected: {
    borderWidth: 0,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  unselected: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    marginRight: 0,
  },
  selectedText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '500',
  },
  unselectedText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
  },
});
