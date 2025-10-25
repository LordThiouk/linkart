import React from 'react';
import { ViewStyle } from 'react-native';
import { Divider as PaperDivider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface DividerProps {
  style?: ViewStyle;
  testID?: string;
}

export const Divider: React.FC<DividerProps> = ({ style, testID }) => {
  const theme = useTheme();

  return (
    <PaperDivider
      style={[
        {
          backgroundColor: theme.colors.outline,
          marginVertical: 8,
        },
        style,
      ]}
      testID={testID}
    />
  );
};
