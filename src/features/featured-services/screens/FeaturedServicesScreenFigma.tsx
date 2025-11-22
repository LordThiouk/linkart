import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeaturedServicesHeader, FeaturedServicesList } from '../components';
import { type ServiceCategory } from '../types';
import { mockServices } from '../mockData';
import { colors } from '@/theme';

export interface FeaturedServicesScreenFigmaProps {
  onBack?: () => void;
  onServicePress?: (serviceId: string) => void;
}

export function FeaturedServicesScreenFigma({ onBack, onServicePress }: FeaturedServicesScreenFigmaProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FeaturedServicesHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        subtitle="Découvrez les meilleurs services professionnels"
      />

      <FeaturedServicesList services={mockServices} activeCategory={activeCategory} onServicePress={onServicePress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
