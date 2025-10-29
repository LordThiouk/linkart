import React, { useRef } from 'react';
import { TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export interface PlayButtonProps {
  isPlaying: boolean;
  size: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, size, onPress, disabled = false, testID }) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;

    // Animation de press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 32;
      case 'md':
        return 40;
      case 'lg':
        return 48;
      default:
        return 40;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const buttonSize = getButtonSize();
  const iconSize = getIconSize();

  const containerStyle: ViewStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
      testID={testID}
      accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {isPlaying ? (
          <Pause size={iconSize} color={theme.colors.onPrimary} />
        ) : (
          <Play size={iconSize} color={theme.colors.onPrimary} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
