import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors } from '@/theme';

export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'body2'
  | 'h6'
  | 'caption';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  color,
  weight,
  align,
  style,
  ...props
}) => {
  const getVariantStyles = (): TextStyle => {
    switch (variant) {
      case 'displayLarge':
        return { fontSize: 57, lineHeight: 64, letterSpacing: 0 };
      case 'displayMedium':
        return { fontSize: 45, lineHeight: 52, letterSpacing: 0 };
      case 'displaySmall':
        return { fontSize: 36, lineHeight: 44, letterSpacing: 0 };
      case 'headlineLarge':
        return { fontSize: 32, lineHeight: 40, letterSpacing: 0 };
      case 'headlineMedium':
        return { fontSize: 28, lineHeight: 36, letterSpacing: 0 };
      case 'headlineSmall':
        return { fontSize: 24, lineHeight: 32, letterSpacing: 0 };
      case 'titleLarge':
        return { fontSize: 22, lineHeight: 28, letterSpacing: 0 };
      case 'titleMedium':
        return { fontSize: 16, lineHeight: 24, letterSpacing: 0.15 };
      case 'titleSmall':
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 };
      case 'labelLarge':
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 };
      case 'labelMedium':
        return { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 };
      case 'labelSmall':
        return { fontSize: 11, lineHeight: 16, letterSpacing: 0.5 };
      case 'bodyLarge':
        return { fontSize: 16, lineHeight: 24, letterSpacing: 0.15 };
      case 'bodyMedium':
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.25 };
      case 'bodySmall':
        return { fontSize: 12, lineHeight: 16, letterSpacing: 0.4 };
      case 'body2':
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.25 };
      case 'h6':
        return { fontSize: 20, lineHeight: 32, letterSpacing: 0 };
      case 'caption':
        return { fontSize: 12, lineHeight: 16, letterSpacing: 0.4 };
      default:
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.25 };
    }
  };

  const getWeightStyles = (): TextStyle => {
    switch (weight) {
      case 'normal':
        return { fontWeight: '400' };
      case 'medium':
        return { fontWeight: '500' };
      case 'semibold':
        return { fontWeight: '600' };
      case 'bold':
        return { fontWeight: '700' };
      default:
        return {};
    }
  };

  return (
    <RNText
      style={[
        getVariantStyles(),
        getWeightStyles(),
        {
          color: color || colors.textPrimary,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
