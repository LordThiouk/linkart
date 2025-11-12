import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing, radii, shadows } from '../../theme';

export interface SectionCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  marginBottom?: number;
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  variant = 'elevated',
  marginBottom = spacing.md,
  padding = 'medium',
  style,
  testID,
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          ...shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radii.lg,
        };
      case 'filled':
        return {
          backgroundColor: colors.surfaceElevated,
          borderRadius: radii.lg,
        };
      default:
        return {};
    }
  };

  const getPaddingStyles = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: spacing.sm };
      case 'medium':
        return { padding: spacing.md };
      case 'large':
        return { padding: spacing.lg };
      default:
        return { padding: spacing.md };
    }
  };

  return (
    <View style={[getVariantStyles(), getPaddingStyles(), { marginBottom }, style]} testID={testID}>
      {children}
    </View>
  );
};
