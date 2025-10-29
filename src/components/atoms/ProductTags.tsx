/**
 * @deprecated Ce composant est obsolète et sera supprimé dans la v3.0.
 * Utilisez le nouveau composant ProductCard unifié à la place.
 * @see ProductCard
 */
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
