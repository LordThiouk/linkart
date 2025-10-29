import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Eye, Download, Heart } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { formatMetricValue } from '../../utils/formatMetricValue';

export interface MetricItemProps {
  icon: 'eye' | 'download' | 'heart';
  value: number | string;
  size?: 'sm' | 'md';
  color?: string;
  testID?: string;
}

export const MetricItem: React.FC<MetricItemProps> = ({ icon, value, size = 'sm', color, testID }) => {
  const theme = useTheme();

  const getIcon = () => {
    const iconSize = size === 'sm' ? 16 : 20;
    const iconColor = color || theme.colors.onSurfaceVariant;

    switch (icon) {
      case 'eye':
        return <Eye size={iconSize} color={iconColor} />;
      case 'download':
        return <Download size={iconSize} color={iconColor} />;
      case 'heart':
        return <Heart size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  const getTextSize = () => {
    return size === 'sm' ? 12 : 14;
  };

  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') {
      return val;
    }
    return formatMetricValue(val);
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  };

  const textStyle = {
    fontSize: getTextSize(),
    fontFamily: theme.fonts.bodySmall.fontFamily,
    color: color || theme.colors.onSurfaceVariant,
    marginLeft: 4,
  };

  return (
    <View style={containerStyle} testID={testID}>
      {getIcon()}
      <Text style={textStyle}>{formatValue(value)}</Text>
    </View>
  );
};
