import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { tokens, componentStyles } from '../../theme';

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
  marginBottom = tokens.spacing.md,
  padding = 'medium',
  style,
  testID,
}) => {
  const theme = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.colors.surface,
          ...componentStyles.card,
          ...tokens.shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          borderWidth: 1,
          borderRadius: tokens.radii.lg,
        };
      case 'filled':
        return {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: tokens.radii.lg,
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
        return { padding: tokens.spacing.sm };
      case 'medium':
        return { padding: tokens.spacing.md };
      case 'large':
        return { padding: tokens.spacing.lg };
      default:
        return { padding: tokens.spacing.md };
    }
  };

  return (
    <View style={[getVariantStyles(), getPaddingStyles(), { marginBottom }, style]} testID={testID}>
      {children}
    </View>
  );
};
