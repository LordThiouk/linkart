import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ScrollContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  paddingBottom?: number;
}

export const ScrollContent: React.FC<ScrollContentProps> = ({ children, style, padding = 16, paddingBottom = 32 }) => {
  return (
    <View
      style={[
        {
          padding,
          paddingBottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
