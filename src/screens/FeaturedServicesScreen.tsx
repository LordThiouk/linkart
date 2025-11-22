import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FeaturedServicesScreenFigma } from '@/features/featured-services/screens/FeaturedServicesScreenFigma';

export function FeaturedServicesScreen() {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleServicePress = (serviceId: string) => {
    console.log('Service pressed:', serviceId);
    // Navigation vers le détail du service
    // navigation.navigate('ServiceDetails', { serviceId });
  };

  return <FeaturedServicesScreenFigma onBack={handleBack} onServicePress={handleServicePress} />;
}
