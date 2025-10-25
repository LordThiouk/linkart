import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xl';
  backgroundColor?: string;
  flex?: number;
  testID?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = 'medium',
  backgroundColor,
  flex = 1,
  testID,
}) => {
  const theme = useTheme();

  const getPaddingValue = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return tokens.spacing.sm;
      case 'medium':
        return tokens.spacing.md;
      case 'large':
        return tokens.spacing.lg;
      case 'xl':
        return tokens.spacing.xl;
      default:
        return tokens.spacing.md;
    }
  };

  return (
    <View
      style={[
        {
          flex,
          backgroundColor: backgroundColor || theme.colors.background,
          padding: getPaddingValue(),
        },
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};
