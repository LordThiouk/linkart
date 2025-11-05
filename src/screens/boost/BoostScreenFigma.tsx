import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Zap, Info, Check } from 'lucide-react-native';
import { BoostCardFigma } from '../../components/atoms/BoostCardFigma';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BoostScreenFigmaProps {
  onBack?: () => void;
  itemType: 'product' | 'profile';
  itemName?: string;
}

const boostPlans = [
  {
    duration: '24h' as const,
    price: 2500,
    views: '500-1000',
    isPopular: false,
  },
  {
    duration: '7j' as const,
    price: 12000,
    views: '5k-10k',
    isPopular: true,
  },
  {
    duration: '30j' as const,
    price: 35000,
    views: '25k-50k',
    isPopular: false,
  },
];

export function BoostScreenFigma({ onBack, itemType, itemName }: BoostScreenFigmaProps) {
  const [selectedPlan, setSelectedPlan] = useState<'24h' | '7j' | '30j' | null>(null);

  const handlePurchaseBoost = () => {
    if (!selectedPlan) return;
    // Handle boost purchase
    console.log('Purchasing boost:', selectedPlan);
  };

  const benefits = [
    'Mise en avant dans les résultats',
    'Badge "Boosté" sur votre contenu',
    'Statistiques détaillées en temps réel',
    'Ciblage géographique automatique',
  ];

  const stats = [
    { label: 'Vues', value: '+350%', icon: '👁️' },
    { label: 'Clics', value: '+240%', icon: '🎯' },
    { label: 'Ventes', value: '+180%', icon: '💰' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color="#D4D4D4" />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Booster la visibilité</Text>
              <Text style={styles.headerSubtitle}>
                {itemType === 'product' ? '📦 Produit' : '👤 Profil'} • {itemName || 'Sélection'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero Section */}
        <AnimatedView entering={FadeIn} style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.2)', 'rgba(236, 72, 153, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroIcon}
            >
              <Zap size={32} color="#F5F5F5" fill="#F5F5F5" />
            </LinearGradient>
            <Text style={styles.heroTitle}>Augmentez votre visibilité</Text>
            <Text style={styles.heroSubtitle}>
              Apparaissez en tête des résultats de recherche et attirez plus de clients
            </Text>

            {/* Benefits */}
            <View style={styles.benefitsContainer}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <LinearGradient
                    colors={['#06B6D4', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.benefitIcon}
                  >
                    <Check size={12} color="#F5F5F5" />
                  </LinearGradient>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Info Banner */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.infoBanner}>
          <View style={styles.infoBannerContent}>
            <Info size={20} color="#06B6D4" />
            <View style={styles.infoBannerText}>
              <Text style={styles.infoBannerTitle}>💡 Astuce</Text>
              <Text style={styles.infoBannerMessage}>
                Les boosts de 7 jours offrent le meilleur rapport qualité-prix et permettent une exposition continue
              </Text>
            </View>
          </View>
        </AnimatedView>

        {/* Plans */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choisissez votre durée</Text>
          <View style={styles.plansContainer}>
            {boostPlans.map((plan, index) => (
              <AnimatedView key={plan.duration} entering={FadeInDown.delay(index * 100)} style={styles.planWrapper}>
                <TouchableOpacity
                  onPress={() => setSelectedPlan(plan.duration)}
                  style={styles.planTouchable}
                  activeOpacity={0.9}
                >
                  <BoostCardFigma {...plan} onSelect={() => setSelectedPlan(plan.duration)} />
                  {selectedPlan === plan.duration && (
                    <AnimatedView entering={FadeIn} style={styles.selectedBadge}>
                      <LinearGradient
                        colors={['#06B6D4', '#8B5CF6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.selectedBadgeGradient}
                      >
                        <Check size={20} color="#F5F5F5" />
                      </LinearGradient>
                    </AnimatedView>
                  )}
                </TouchableOpacity>
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>

        {/* Stats Preview */}
        <AnimatedView entering={FadeIn.delay(400)} style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Résultats attendus</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <AnimatedView key={stat.label} entering={FadeInDown.delay(index * 100)} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      {selectedPlan && (
        <AnimatedView entering={FadeIn} style={styles.bottomCTA}>
          <LinearGradient
            colors={['transparent', '#0A0A0A', '#0A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bottomCTAGradient}
          >
            <View style={styles.bottomCTAContent}>
              <PrimaryButton onPress={handlePurchaseBoost} fullWidth>
                <View style={styles.ctaButtonContent}>
                  <Zap size={20} color="#F5F5F5" fill="#F5F5F5" />
                  <Text style={styles.ctaButtonText}>
                    Acheter le boost {selectedPlan} -{' '}
                    {boostPlans.find(p => p.duration === selectedPlan)?.price.toLocaleString()} F
                  </Text>
                </View>
              </PrimaryButton>
            </View>
          </LinearGradient>
        </AnimatedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    padding: 24,
  },
  heroCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    gap: 16,
    overflow: 'hidden',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  infoBanner: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  infoBannerContent: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  infoBannerText: {
    flex: 1,
    gap: 4,
  },
  infoBannerTitle: {
    color: '#06B6D4',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoBannerMessage: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  plansSection: {
    padding: 24,
    gap: 16,
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  plansContainer: {
    gap: 16,
  },
  planWrapper: {
    position: 'relative',
  },
  planTouchable: {
    position: 'relative',
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
  },
  selectedBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    padding: 24,
    paddingTop: 16,
    gap: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    color: '#06B6D4',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  bottomCTAGradient: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  bottomCTAContent: {
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  ctaButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
});
