/**
 * @deprecated Ce composant est obsolète et sera supprimé dans la v3.0.
 * Utilisez le nouveau composant ProductCard unifié à la place.
 * @see ProductCard
 */
import React from 'react';
import { TextStyle } from 'react-native';
import { Title } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

interface ProductTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  fontWeight?: string;
  marginBottom?: number;
  numberOfLines?: number;
}

export const ProductTitle: React.FC<ProductTitleProps> = ({
  children,
  style,
  fontSize = 16,
  fontWeight = '600',
  marginBottom = 4,
  numberOfLines,
}) => {
  const theme = useTheme();

  return (
    <Title
      style={[
        {
          fontSize,
          fontWeight: fontWeight as any,
          marginBottom,
          color: theme.colors.onSurface,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Title>
  );
};
