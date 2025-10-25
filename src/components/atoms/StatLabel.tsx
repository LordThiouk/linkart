import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface StatLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export const StatLabel: React.FC<StatLabelProps> = ({ children, style, fontSize = 14, textAlign = 'center' }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontSize,
          color: theme.colors.onSurfaceVariant,
          textAlign,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
