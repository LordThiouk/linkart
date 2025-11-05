import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface RoleCardFigmaProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function RoleCardFigma({
  icon: Icon,
  title,
  description,
  selected,
  onPress,
  style,
  testID,
}: RoleCardFigmaProps) {
  const scale = useSharedValue(1);
  const borderScale = useSharedValue(selected ? 1.02 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const borderAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: borderScale.value }],
  }));

  React.useEffect(() => {
    borderScale.value = withSpring(selected ? 1.02 : 1, {
      stiffness: 300,
      damping: 20,
    });
  }, [selected]);

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, styles.container, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      <Animated.View style={[borderAnimatedStyle, styles.borderContainer]}>
        {selected && (
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.borderGradient}
          />
        )}
        <View style={[styles.content, selected && styles.contentSelected]}>
          <View style={styles.innerContent}>
            {/* Icon Container */}
            <View style={styles.iconContainer}>
              {selected ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Icon size={24} color="#F5F5F5" />
                </LinearGradient>
              ) : (
                <View style={styles.iconBackground}>
                  <Icon size={24} color="#A3A3A3" />
                </View>
              )}
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            {/* Checkbox */}
            <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
              {selected && (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.checkboxInner}
                />
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  borderContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  borderGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    padding: 2,
  },
  content: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#404040',
  },
  contentSelected: {
    backgroundColor: '#1A1A1A',
    borderColor: 'transparent',
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  titleSelected: {
    color: '#F5F5F5',
  },
  description: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: '#6366F1',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
