import React from 'react';
import { ViewStyle } from 'react-native';
import { SectionCard } from './SectionCard';

interface StatCardProps {
  children: React.ReactNode;
  flex?: number;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  testID?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  children,
  flex = 1,
  variant = 'elevated',
  padding = 'medium',
  style,
  testID,
}) => {
  return (
    <SectionCard variant={variant} padding={padding} style={{ flex, ...style }} testID={testID}>
      {children}
    </SectionCard>
  );
};
