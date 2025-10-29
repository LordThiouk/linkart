/**
 * @deprecated Ce composant est obsolète et sera supprimé dans la v3.0.
 * Utilisez le nouveau composant ProductCard unifié à la place.
 * @see ProductCard
 */
import React from 'react';
import { Text, TextProps } from './Text';
import { useTheme } from 'react-native-paper';

export const ProductPrice: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <Text variant="headlineSmall" weight="bold" color={theme.colors.primary} style={style} {...props}>
      {children}
    </Text>
  );
};
