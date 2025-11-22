import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  CheckoutScreenFigma,
  CheckoutScreenFigmaProps,
  CheckoutData,
} from '@/features/checkout/screens/CheckoutScreenFigma';
import { StackNavigationProp } from '@react-navigation/stack';

type CheckoutRouteProp = RouteProp<
  {
    Checkout: {
      productId: string;
      productTitle: string;
      productType: 'beat' | 'kit' | 'sample';
      artistName: string;
      coverImage: string;
      selectedLicense: {
        id: string;
        name: string;
        price: number;
        type: string;
      };
    };
  },
  'Checkout'
>;

type CheckoutNavigationProp = StackNavigationProp<any, 'Checkout'>;

export function CheckoutScreen() {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const route = useRoute<CheckoutRouteProp>();

  const props: CheckoutScreenFigmaProps = {
    onBack: () => navigation.goBack(),
    onProceedToPayment: (data: CheckoutData) => {
      // Navigation vers payment sera gérée par le composant
      navigation.navigate('Payment', data);
    },
    productId: route.params?.productId || '',
    productTitle: route.params?.productTitle || '',
    productType: route.params?.productType || 'beat',
    artistName: route.params?.artistName || '',
    coverImage: route.params?.coverImage || '',
    selectedLicense: route.params?.selectedLicense
      ? {
          name: route.params.selectedLicense.name,
          price: route.params.selectedLicense.price,
          features: [], // Features seront récupérées depuis la base de données si nécessaire
        }
      : {
          name: '',
          price: 0,
          features: [],
        },
  };

  return <CheckoutScreenFigma {...props} />;
}
