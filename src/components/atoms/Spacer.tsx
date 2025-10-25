import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 16, horizontal = false, style, testID }) => {
  return <View style={[horizontal ? { width: size } : { height: size }, style]} testID={testID} />;
};
