import React from 'react';
import { Text, TextStyle } from 'react-native';
import { colors } from '@/theme';

interface StatValueProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

export const StatValue: React.FC<StatValueProps> = ({ children, style, color, fontSize = 24, fontWeight = 'bold' }) => {
  return (
    <Text
      style={[
        {
          fontSize,
          fontWeight: fontWeight as any,
          marginBottom: 4,
          color: color || colors.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
