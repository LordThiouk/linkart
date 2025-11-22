import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ServiceDetailsHeader,
  ServiceInfo,
  PricingTiers,
  ServicePortfolio,
  ServiceReviewsSection,
  ServiceBottomCTA,
  type PricingTier,
  type PortfolioItem,
  type ServiceReview,
} from '../components';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ServiceDetailsScreenFigmaProps {
  serviceId: string;
  onBack?: () => void;
  onContact?: () => void;
  onBook?: () => void;
  onShare?: () => void;
  onSeeAllReviews?: () => void;
}

// Mock data - à remplacer par des props ou un hook
const mockService = {
  id: '1',
  title: 'Professional Mixing & Mastering',
  provider: {
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    providerName: 'Audio Engineer Pro',
    location: 'Lagos, Nigeria',
  },
  coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=800',
  category: 'Mixing & Mastering',
  rating: 4.9,
  reviewCount: 127,
  completedOrders: 342,
  responseTime: '2h',
  isPro: true,
  description:
    "Ingénieur du son certifié avec 10+ ans d'expérience. Spécialisé dans le mixage et mastering de musique Afrobeat, Hip-Hop et R&B. Studio équipé de matériel professionnel (SSL, Neve, UAD).",
  packages: [
    {
      id: 'basic',
      name: 'Basic',
      price: 49.99,
      deliveryTime: '5 jours',
      features: ["Mixage d'une track", '2 révisions incluses', 'Fichier WAV haute qualité', 'Support par email'],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 99.99,
      deliveryTime: '3 jours',
      features: [
        'Mixage + Mastering',
        '4 révisions incluses',
        'WAV + MP3 320kbps',
        'Support prioritaire',
        'Stem mastering disponible',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199.99,
      deliveryTime: '2 jours',
      features: [
        'Mixage + Mastering avancé',
        'Révisions illimitées',
        'Tous formats (WAV, MP3, FLAC)',
        'Support 24/7',
        'Consultation téléphonique',
        'Mastering vinyl-ready',
      ],
    },
  ] as PricingTier[],
  portfolio: [
    { id: '1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', title: 'Afrobeat Mix' },
    { id: '2', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400', title: 'Hip-Hop Master' },
    { id: '3', image: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400', title: 'R&B Production' },
  ] as PortfolioItem[],
  reviews: [
    {
      id: '1',
      userName: 'KofiBeats',
      userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
      rating: 5,
      date: 'Il y a 2 jours',
      comment: "Excellent travail ! Mon beat sonne incroyable après le mastering. Très professionnel et à l'écoute.",
    },
    {
      id: '2',
      userName: 'NaijaVibes',
      userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
      rating: 5,
      date: 'Il y a 1 semaine',
      comment: 'Rapide, efficace, résultat au top. Je recommande vivement pour vos projets Afrobeat.',
    },
  ] as ServiceReview[],
};

export function ServiceDetailsScreenFigma({
  serviceId,
  onBack,
  onContact,
  onBook,
  onShare,
  onSeeAllReviews,
}: ServiceDetailsScreenFigmaProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');

  const currentPackage = mockService.packages.find(p => p.id === selectedPackage)!;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero Header */}
        <ServiceDetailsHeader
          coverImage={mockService.coverImage}
          category={mockService.category}
          onBack={onBack}
          onShare={onShare}
        />

        {/* Content */}
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.content}>
          {/* Service Info */}
          <ServiceInfo
            title={mockService.title}
            isPro={mockService.isPro}
            provider={mockService.provider}
            rating={mockService.rating}
            reviewCount={mockService.reviewCount}
            completedOrders={mockService.completedOrders}
            responseTime={mockService.responseTime}
            onContact={onContact}
          />

          {/* Description */}
          <AnimatedView entering={FadeInDown.delay(200)} style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>À propos du service</Text>
            <Text style={styles.description}>{mockService.description}</Text>
          </AnimatedView>

          {/* Packages */}
          <PricingTiers
            tiers={mockService.packages}
            selectedTierId={selectedPackage}
            onSelectTier={setSelectedPackage}
          />

          {/* Portfolio */}
          <ServicePortfolio items={mockService.portfolio} />

          {/* Reviews */}
          <ServiceReviewsSection reviews={mockService.reviews} onSeeAll={onSeeAllReviews} />
        </AnimatedView>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <ServiceBottomCTA
        price={currentPackage.price}
        deliveryTime={currentPackage.deliveryTime}
        onBook={onBook || (() => {})}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  descriptionSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 24,
  },
});
