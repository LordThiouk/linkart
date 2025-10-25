import React from 'react';
import { View, ViewStyle, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  const textColor = color || theme.colors.onSurface;

  const formatAmount = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 24;
      default:
        return 18;
    }
  };

  const getFontWeight = () => {
    switch (size) {
      case 'small':
        return 'normal';
      case 'large':
        return 'bold';
      default:
        return '600';
    }
  };

  return (
    <View style={style} testID={testID}>
      <Text
        style={{
          fontSize: getTextSize(),
          fontWeight: getFontWeight() as any,
          color: textColor,
        }}
      >
        {formatAmount(amount)}
        {showCurrency && ` ${currency}`}
      </Text>
    </View>
  );
};
