import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BoostHeader,
  BoostHeroSection,
  BoostInfoBanner,
  BoostPlansSection,
  BoostStatsSection,
  BoostBottomCTA,
  type BoostPlan,
  type Stat,
} from '../components';
import { colors } from '@/theme';

export interface BoostScreenFigmaProps {
  onBack?: () => void;
  itemType: 'product' | 'profile';
  itemName?: string;
}

const boostPlans: BoostPlan[] = [
  {
    duration: '24h',
    price: 2500,
    views: '500-1000',
    isPopular: false,
  },
  {
    duration: '7j',
    price: 12000,
    views: '5k-10k',
    isPopular: true,
  },
  {
    duration: '30j',
    price: 35000,
    views: '25k-50k',
    isPopular: false,
  },
];

const benefits = [
  'Mise en avant dans les résultats',
  'Badge "Boosté" sur votre contenu',
  'Statistiques détaillées en temps réel',
  'Ciblage géographique automatique',
];

const stats: Stat[] = [
  { label: 'Vues', value: '+350%', icon: '👁️' },
  { label: 'Clics', value: '+240%', icon: '🎯' },
  { label: 'Ventes', value: '+180%', icon: '💰' },
];

export function BoostScreenFigma({ onBack, itemType, itemName }: BoostScreenFigmaProps) {
  const [selectedPlan, setSelectedPlan] = useState<'24h' | '7j' | '30j' | null>(null);

  const handlePurchaseBoost = () => {
    if (!selectedPlan) return;
    // Handle boost purchase
    console.log('Purchasing boost:', selectedPlan);
  };

  const selectedPlanData = selectedPlan ? boostPlans.find(p => p.duration === selectedPlan) : null;

  const headerSubtitle = `${itemType === 'product' ? '📦 Produit' : '👤 Profil'} • ${itemName || 'Sélection'}`;

  return (
    <SafeAreaView style={styles.container}>
      <BoostHeader title="Booster la visibilité" subtitle={headerSubtitle} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <BoostHeroSection
          title="Augmentez votre visibilité"
          subtitle="Apparaissez en tête des résultats de recherche et attirez plus de clients"
          benefits={benefits}
        />

        <BoostInfoBanner
          title="💡 Astuce"
          message="Les boosts de 7 jours offrent le meilleur rapport qualité-prix et permettent une exposition continue"
        />

        <BoostPlansSection plans={boostPlans} selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />

        <BoostStatsSection title="Résultats attendus" stats={stats} />
      </ScrollView>

      {selectedPlan && selectedPlanData && (
        <BoostBottomCTA selectedPlan={selectedPlan} price={selectedPlanData.price} onPurchase={handlePurchaseBoost} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
