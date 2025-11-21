import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BeatDetailsScreenFigma, BeatDetailsScreenFigmaProps } from '@/features/products/screens';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductDetailRouteProp = RouteProp<
  {
    ProductDetail: {
      beatId: string;
      hasPurchased?: boolean;
    };
  },
  'ProductDetail'
>;

type ProductDetailNavigationProp = StackNavigationProp<any, 'ProductDetail'>;

export function ProductDetailScreen() {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();

  const props: BeatDetailsScreenFigmaProps = {
    beatId: route.params?.beatId || '',
    onBack: () => navigation.goBack(),
    onBuyClick: () => {
      // Navigation vers checkout sera gérée par le composant
    },
    hasPurchased: route.params?.hasPurchased || false,
  };

  return <BeatDetailsScreenFigma {...props} />;
}
