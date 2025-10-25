import React from 'react';
import { View, ViewStyle } from 'react-native';

interface CenteredContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export const CenteredContent: React.FC<CenteredContentProps> = ({ children, style, padding = 24 }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
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
