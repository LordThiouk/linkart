import React from 'react';
import { View, ViewStyle, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  visible?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  visible = true,
  style,
  testID,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return '#22C55E';
      case 'warning':
        return '#F59E0B';
      case 'error':
        return theme.colors.errorContainer;
      case 'info':
        return theme.colors.primaryContainer;
      default:
        return theme.colors.secondaryContainer;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return '#FFFFFF';
      case 'warning':
        return '#FFFFFF';
      case 'error':
        return theme.colors.onErrorContainer;
      case 'info':
        return theme.colors.onPrimaryContainer;
      default:
        return theme.colors.onSecondaryContainer;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          minWidth: 16,
          height: 16,
          borderRadius: tokens.radii.full,
          paddingHorizontal: tokens.spacing.xs,
        };
      case 'large':
        return {
          minWidth: 32,
          height: 32,
          borderRadius: tokens.radii.full,
          paddingHorizontal: tokens.spacing.sm,
        };
      default: // medium
        return {
          minWidth: 24,
          height: 24,
          borderRadius: tokens.radii.full,
          paddingHorizontal: tokens.spacing.xs,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: getBackgroundColor(),
          alignItems: 'center',
          justifyContent: 'center',
          ...getSizeStyles(),
        },
        style,
      ]}
      testID={testID}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: getTextSize(),
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </View>
  );
};
