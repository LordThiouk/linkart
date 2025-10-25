import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface StatValueProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

export const StatValue: React.FC<StatValueProps> = ({ children, style, color, fontSize = 24, fontWeight = 'bold' }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontSize,
          fontWeight: fontWeight as any,
          marginBottom: 4,
          color: color || theme.colors.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
