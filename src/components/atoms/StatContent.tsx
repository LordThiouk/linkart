import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from '@/theme';

interface StatContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export const StatContent: React.FC<StatContentProps> = ({ children, style, padding = spacing.md }) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
