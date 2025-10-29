import React from 'react';
import { View, ViewStyle } from 'react-native';
import { MetricItem } from '../atoms/MetricItem';

export interface ProductMetricsProps {
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  size?: 'sm' | 'md';
  layout?: 'horizontal' | 'vertical';
  testID?: string;
}

export const ProductMetrics: React.FC<ProductMetricsProps> = ({
  viewCount,
  downloadCount,
  likeCount,
  size = 'sm',
  layout = 'horizontal',
  testID,
}) => {
  const containerStyle: ViewStyle = {
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout === 'horizontal' ? 12 : 8,
  };

  return (
    <View style={containerStyle} testID={testID}>
      <MetricItem icon="eye" value={viewCount} size={size} testID={`${testID}-views`} />
      <MetricItem icon="download" value={downloadCount} size={size} testID={`${testID}-downloads`} />
      <MetricItem icon="heart" value={likeCount} size={size} testID={`${testID}-likes`} />
    </View>
  );
};
