import React from 'react';
import { ViewStyle } from 'react-native';
import { Icon as PaperIcon } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, style, testID }) => {
  const theme = useTheme();
  const iconColor = color || theme.colors.onSurface;

  return <PaperIcon source={name} size={size} color={iconColor} testID={testID} />;
};
