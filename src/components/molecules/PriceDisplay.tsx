import React from 'react';
import { View, ViewStyle, Text, TextStyle } from 'react-native';
import { colors, typography } from '../../theme';

export interface PriceDisplayProps {
  amount: number;
  currency?: string;
  showCurrency?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = 'FCFA',
  showCurrency = true,
  size = 'medium',
  color,
  style,
  testID,
}) => {
  const textColor = color || colors.textPrimary;

  const formatAmount = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: typography.fontSize.label,
          fontFamily: typography.fontFamily.inter.regular,
          fontWeight: typography.fontWeight.regular,
        };
      case 'large':
        return {
          fontSize: typography.fontSize.displayXl,
          fontFamily: typography.fontFamily.poppins.bold,
          fontWeight: typography.fontWeight.bold,
        };
      default:
        return {
          fontSize: typography.fontSize.titleMd,
          fontFamily: typography.fontFamily.poppins.semibold,
          fontWeight: typography.fontWeight.semibold,
        };
    }
  };

  return (
    <View style={style} testID={testID}>
      <Text
        style={[
          getTextStyle(),
          {
            color: textColor,
          },
        ]}
      >
        {formatAmount(amount)}
        {showCurrency && ` ${currency}`}
      </Text>
    </View>
  );
};
