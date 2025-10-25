import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  testID,
}) => {
  const theme = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
        };
      case 'outline':
        return {
          borderColor: theme.colors.outline,
          borderWidth: 1,
          backgroundColor: 'transparent',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md };
      case 'medium':
        return { paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.lg };
      case 'large':
        return { paddingVertical: tokens.spacing.lg, paddingHorizontal: tokens.spacing.xl };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return theme.colors.onPrimary;
      case 'secondary':
        return theme.colors.onSecondary;
      case 'outline':
        return theme.colors.onSurface;
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.onPrimary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyles(),
        getSizeStyles(),
        {
          borderRadius: tokens.radii.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      testID={testID}
    >
      <PaperButton
        mode={variant === 'primary' ? 'contained' : variant === 'outline' ? 'outlined' : 'text'}
        onPress={onPress}
        disabled={disabled || loading}
        loading={loading}
        icon={icon}
        style={[
          {
            backgroundColor: variant === 'primary' ? theme.colors.primary : 'transparent',
            borderColor: variant === 'outline' ? theme.colors.outline : 'transparent',
          },
          style,
        ]}
        labelStyle={[
          {
            color: getTextColor(),
            fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {children || title}
      </PaperButton>
    </TouchableOpacity>
  );
};

export default Button;
