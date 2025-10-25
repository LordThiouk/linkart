import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color, style, testID }) => {
  const theme = useTheme();
  const spinnerColor = color || theme.colors.primary;

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
