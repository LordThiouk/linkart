import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ProductTagsProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gap?: number;
  marginBottom?: number;
}

export const ProductTags: React.FC<ProductTagsProps> = ({ children, style, gap = 8, marginBottom = 12 }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
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
