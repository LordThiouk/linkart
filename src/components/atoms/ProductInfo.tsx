import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ProductInfoProps {
  children: React.ReactNode;
  style?: ViewStyle;
  flex?: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ children, style, flex = 1 }) => {
  return (
    <View
      style={[
        {
          flex,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
