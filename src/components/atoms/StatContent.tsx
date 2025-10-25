import React from 'react';
import { ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

interface StatContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export const StatContent: React.FC<StatContentProps> = ({ children, style, padding = 16 }) => {
  return (
    <Card.Content
      style={[
        {
          alignItems: 'center',
          padding,
        },
        style,
      ]}
    >
      {children}
    </Card.Content>
  );
};
