import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing, colors } from '../../theme';

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
  const getPaddingValue = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return spacing.sm;
      case 'medium':
        return spacing.md;
      case 'large':
        return spacing.lg;
      case 'xl':
        return spacing.xl;
      default:
        return spacing.md;
    }
  };

  return (
    <View
      style={[
        {
          flex,
          backgroundColor: backgroundColor || colors.background,
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
