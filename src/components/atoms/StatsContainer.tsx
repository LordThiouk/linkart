import React from 'react';
import { View, ViewStyle } from 'react-native';

interface StatsContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gap?: number;
  marginBottom?: number;
}

export const StatsContainer: React.FC<StatsContainerProps> = ({ children, style, gap = 12, marginBottom = 16 }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          marginBottom,
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
