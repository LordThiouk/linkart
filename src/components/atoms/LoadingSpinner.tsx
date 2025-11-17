import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';
import { colors } from '@/theme';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color, style, testID }) => {
  const spinnerColor = color || colors.primary;

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        },
        style,
      ]}
      testID={testID}
    >
      <ActivityIndicator size={size === 'medium' ? 'small' : size} color={spinnerColor} />
    </View>
  );
};
