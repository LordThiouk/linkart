import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Share2, MessageCircle, Clock, CheckCircle, MapPin, Award, Calendar } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { RatingStarsFigma } from '../../components/molecules/RatingStarsFigma';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ServiceDetailsScreenFigmaProps {
  serviceId: string;
  onBack?: () => void;
  onContact?: () => void;
  onBook?: () => void;
}

const service = {
  id: '1',
  title: 'Professional Mixing & Mastering',
  provider: 'Audio Engineer Pro',
  providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
  coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=800',
  rating: 4.9,
  reviewCount: 127,
  completedOrders: 342,
  responseTime: '2h',
  category: 'Mixing & Mastering',
  location: 'Lagos, Nigeria',
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
  ],
  portfolio: [
    { id: '1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', title: 'Afrobeat Mix' },
    { id: '2', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400', title: 'Hip-Hop Master' },
    { id: '3', image: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400', title: 'R&B Production' },
  ],
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
  ],
};

export function ServiceDetailsScreenFigma({ serviceId, onBack, onContact, onBook }: ServiceDetailsScreenFigmaProps) {
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');

  const currentPackage = service.packages.find(p => p.id === selectedPackage)!;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero Image */}
        <AnimatedView entering={FadeIn} style={styles.heroContainer}>
          <ImageWithFallback src={service.coverImage} alt={service.title} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 10, 0.6)', '#0A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroGradient}
          />

          {/* Header Buttons */}
          <View style={styles.heroHeader}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.heroButton} activeOpacity={0.8}>
                <ChevronLeft size={20} color="#F5F5F5" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Share2 size={20} color="#F5F5F5" />
            </TouchableOpacity>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <View style={styles.categoryBadgeContent}>
              <Text style={styles.categoryBadgeText}>{service.category}</Text>
            </View>
          </View>
        </AnimatedView>

        {/* Content */}
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.content}>
          {/* Title & Provider */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{service.title}</Text>
              {service.isPro && (
                <LinearGradient
                  colors={['#F59E0B', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.proBadge}
                >
                  <Award size={12} color="#F5F5F5" />
                  <Text style={styles.proBadgeText}>PRO</Text>
                </LinearGradient>
              )}
            </View>

            <View style={styles.providerSection}>
              <ImageWithFallback src={service.providerImage} alt={service.provider} style={styles.providerAvatar} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{service.provider}</Text>
                <View style={styles.providerLocation}>
                  <MapPin size={12} color="#A3A3A3" />
                  <Text style={styles.providerLocationText}>{service.location}</Text>
                </View>
              </View>
              {onContact && (
                <TouchableOpacity onPress={onContact} style={styles.contactButton} activeOpacity={0.8}>
                  <MessageCircle size={20} color="#D4D4D4" />
                </TouchableOpacity>
              )}
            </View>

            {/* Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <RatingStarsFigma rating={service.rating} size="sm" />
                <Text style={styles.statText}>
                  {service.rating} ({service.reviewCount})
                </Text>
              </View>
              <View style={styles.statDot} />
              <View style={styles.statItem}>
                <CheckCircle size={16} color="#A3A3A3" />
                <Text style={styles.statText}>{service.completedOrders} commandes</Text>
              </View>
              <View style={styles.statDot} />
              <View style={styles.statItem}>
                <Clock size={16} color="#A3A3A3" />
                <Text style={styles.statText}>Répond en {service.responseTime}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <AnimatedView entering={FadeInDown.delay(200)} style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>À propos du service</Text>
            <Text style={styles.description}>{service.description}</Text>
          </AnimatedView>

          {/* Packages */}
          <AnimatedView entering={FadeInDown.delay(300)} style={styles.packagesSection}>
            <Text style={styles.sectionTitle}>Packages disponibles</Text>
            <View style={styles.packagesList}>
              {service.packages.map((pkg, index) => (
                <AnimatedTouchableOpacity
                  key={pkg.id}
                  entering={FadeInDown.delay(300 + index * 50)}
                  onPress={() => setSelectedPackage(pkg.id as any)}
                  style={[styles.packageCard, selectedPackage === pkg.id && styles.packageCardSelected]}
                  activeOpacity={0.9}
                >
                  <View style={styles.packageHeader}>
                    <View style={styles.packageHeaderLeft}>
                      <View style={styles.packageTitleRow}>
                        <Text style={styles.packageName}>{pkg.name}</Text>
                        {pkg.popular && (
                          <LinearGradient
                            colors={['#F59E0B', '#EC4899']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.popularBadge}
                          >
                            <Text style={styles.popularBadgeText}>POPULAIRE</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={styles.packageDelivery}>
                        <Clock size={12} color="#A3A3A3" />
                        <Text style={styles.packageDeliveryText}>Livraison en {pkg.deliveryTime}</Text>
                      </View>
                    </View>
                    <Text style={styles.packagePrice}>€{pkg.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.packageFeatures}>
                    {pkg.features.map((feature, idx) => (
                      <View key={idx} style={styles.packageFeature}>
                        <CheckCircle size={16} color="#22C55E" />
                        <Text style={styles.packageFeatureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </AnimatedTouchableOpacity>
              ))}
            </View>
          </AnimatedView>

          {/* Portfolio */}
          <AnimatedView entering={FadeInDown.delay(400)} style={styles.portfolioSection}>
            <Text style={styles.sectionTitle}>Portfolio</Text>
            <View style={styles.portfolioGrid}>
              {service.portfolio.map(item => (
                <View key={item.id} style={styles.portfolioItem}>
                  <ImageWithFallback src={item.image} alt={item.title} style={styles.portfolioImage} />
                </View>
              ))}
            </View>
          </AnimatedView>

          {/* Reviews */}
          <AnimatedView entering={FadeInDown.delay(500)} style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Avis clients</Text>
              <TouchableOpacity>
                <Text style={styles.reviewsSeeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewsList}>
              {service.reviews.map((review, index) => (
                <AnimatedView key={review.id} entering={FadeInDown.delay(500 + index * 50)} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <ImageWithFallback src={review.userImage} alt={review.userName} style={styles.reviewAvatar} />
                    <View style={styles.reviewInfo}>
                      <View style={styles.reviewHeaderTop}>
                        <Text style={styles.reviewUserName}>{review.userName}</Text>
                        <RatingStarsFigma rating={review.rating} size="sm" />
                      </View>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>
        </AnimatedView>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.bottomCTAContent}>
          <View style={styles.bottomCTAInfo}>
            <View style={styles.bottomCTAInfoItem}>
              <Text style={styles.bottomCTALabel}>À partir de</Text>
              <Text style={styles.bottomCTAPrice}>€{currentPackage.price.toFixed(2)}</Text>
            </View>
            <View style={styles.bottomCTAInfoItem}>
              <Text style={styles.bottomCTALabel}>Livraison</Text>
              <Text style={styles.bottomCTADelivery}>{currentPackage.deliveryTime}</Text>
            </View>
          </View>
          <PrimaryButton onPress={onBook} fullWidth>
            <View style={styles.bookButtonContent}>
              <Calendar size={20} color="#F5F5F5" />
              <Text style={styles.bookButtonText}>Réserver ce service</Text>
            </View>
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingBottom: 160,
  },
  heroContainer: {
    height: 256,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  heroHeader: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  heroButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: '#404040',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 24,
  },
  categoryBadgeContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  categoryBadgeText: {
    color: '#06B6D4',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  titleSection: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  proBadgeText: {
    color: '#F5F5F5',
    fontSize: 11,
    fontWeight: '700',
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  providerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  providerInfo: {
    flex: 1,
    gap: 4,
  },
  providerName: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  providerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  providerLocationText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  contactButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  statDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#404040',
  },
  descriptionSection: {
    gap: 12,
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  packagesSection: {
    gap: 12,
  },
  packagesList: {
    gap: 12,
  },
  packageCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#404040',
    backgroundColor: '#111111',
  },
  packageCardSelected: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  packageHeaderLeft: {
    flex: 1,
    gap: 8,
  },
  packageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  packageName: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  popularBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontWeight: '700',
  },
  packageDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  packageDeliveryText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  packagePrice: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '700',
  },
  packageFeatures: {
    gap: 12,
  },
  packageFeature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  packageFeatureText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  portfolioSection: {
    gap: 12,
  },
  portfolioGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  portfolioItem: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111111',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  reviewsSection: {
    gap: 12,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewsSeeAll: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '400',
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  reviewInfo: {
    flex: 1,
    gap: 4,
  },
  reviewHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUserName: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
  },
  reviewDate: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  reviewComment: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    padding: 24,
    paddingBottom: 32,
  },
  bottomCTAContent: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    gap: 12,
  },
  bottomCTAInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bottomCTAInfoItem: {
    gap: 4,
  },
  bottomCTALabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  bottomCTAPrice: {
    color: '#F59E0B',
    fontSize: 20,
    fontWeight: '700',
  },
  bottomCTADelivery: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
});
