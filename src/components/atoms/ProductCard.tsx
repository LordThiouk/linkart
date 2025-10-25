import React from 'react';
import { ViewStyle } from 'react-native';
import { tokens } from '../../theme';
import { SectionCard } from './SectionCard';

interface ProductCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  marginBottom?: number;
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  children,
  variant = 'elevated',
  marginBottom = tokens.spacing.md,
  padding = 'medium',
  style,
  testID,
}) => {
  return (
    <SectionCard variant={variant} marginBottom={marginBottom} padding={padding} style={style} testID={testID}>
      {children}
    </SectionCard>
  );
};
