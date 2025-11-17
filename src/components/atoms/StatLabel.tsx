import React from 'react';
import { Text, TextStyle } from 'react-native';
import { colors } from '@/theme';

interface StatLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const StatLabel: React.FC<StatLabelProps> = ({ children, style, fontSize = 14, textAlign = 'center' }) => {
  return (
    <Text
      style={[
        {
          fontSize,
          color: colors.textMuted,
          textAlign,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
