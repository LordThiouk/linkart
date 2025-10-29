/**
 * @deprecated Ce composant est obsolète et sera supprimé dans la v3.0.
 * Utilisez le nouveau composant ProductCard unifié à la place.
 * @see ProductCard
 */
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ProductFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ProductFooter: React.FC<ProductFooterProps> = ({ children, style }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
