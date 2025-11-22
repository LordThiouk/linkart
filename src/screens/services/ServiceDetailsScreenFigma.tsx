import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Share2,
  MessageCircle,
  Clock,
  CheckCircle,
  MapPin,
  Award,
  Calendar,
  Star,
} from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

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
            colors={['transparent', 'rgba(10, 10, 10, 0.6)', colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroGradient}
          />

          {/* Header Buttons */}
          <View style={styles.heroHeader}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.heroButton} activeOpacity={0.8}>
                <ChevronLeft size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Share2 size={20} color={colors.textPrimary} />
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
                  colors={[colors.secondary, colors.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.proBadge}
                >
                  <Award size={12} color={colors.textPrimary} />
                  <Text style={styles.proBadgeText}>PRO</Text>
                </LinearGradient>
              )}
            </View>

            <View style={styles.providerSection}>
              <ImageWithFallback src={service.providerImage} alt={service.provider} style={styles.providerAvatar} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{service.provider}</Text>
                <View style={styles.providerLocation}>
                  <MapPin size={12} color={colors.textMuted} />
                  <Text style={styles.providerLocationText}>{service.location}</Text>
                </View>
              </View>
              {onContact && (
                <TouchableOpacity onPress={onContact} style={styles.contactButton} activeOpacity={0.8}>
                  <MessageCircle size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            {/* Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Star size={16} color={colors.secondary} fill={colors.secondary} />
                <Text style={styles.statText}>
                  {service.rating} <Text style={styles.statTextMuted}>({service.reviewCount})</Text>
                </Text>
              </View>
              <View style={styles.statDot} />
              <View style={styles.statItem}>
                <CheckCircle size={16} color={colors.textMuted} />
                <Text style={styles.statText}>{service.completedOrders} commandes</Text>
              </View>
              <View style={styles.statDot} />
              <View style={styles.statItem}>
                <Clock size={16} color={colors.textMuted} />
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
                            colors={[colors.secondary, colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.popularBadge}
                          >
                            <Text style={styles.popularBadgeText}>POPULAIRE</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={styles.packageDelivery}>
                        <Clock size={12} color={colors.textMuted} />
                        <Text style={styles.packageDeliveryText}>Livraison en {pkg.deliveryTime}</Text>
                      </View>
                    </View>
                    <Text style={styles.packagePrice}>€{pkg.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.packageFeatures}>
                    {pkg.features.map((feature, idx) => (
                      <View key={idx} style={styles.packageFeature}>
                        <CheckCircle size={16} color={colors.success} />
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
                        <View style={styles.reviewStars}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} color={colors.secondary} fill={colors.secondary} />
                          ))}
                        </View>
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
              <Calendar size={20} color={colors.textPrimary} />
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
    backgroundColor: colors.background,
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
    paddingHorizontal: spacing.xl,
  },
  heroButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.xl,
  },
  categoryBadgeContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.md,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  categoryBadgeText: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  titleSection: {
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  proBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  providerAvatar: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
  },
  providerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  providerName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  providerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  providerLocationText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  contactButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statTextMuted: {
    color: colors.textMuted,
  },
  statDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: radii.sm / 2,
    backgroundColor: colors.border,
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
  packagesSection: {
    gap: spacing.md,
  },
  packagesList: {
    gap: spacing.md,
  },
  packageCard: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  packageCardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  packageHeaderLeft: {
    flex: 1,
    gap: spacing.sm,
  },
  packageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  packageName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  popularBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
    borderRadius: radii.md,
  },
  popularBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  packageDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  packageDeliveryText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  packagePrice: {
    color: colors.secondary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  packageFeatures: {
    gap: spacing.md,
  },
  packageFeature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  packageFeatureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
  portfolioSection: {
    gap: spacing.md,
  },
  portfolioGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  portfolioItem: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  reviewsSection: {
    gap: spacing.md,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  reviewsSeeAll: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  reviewsList: {
    gap: spacing.md,
  },
  reviewCard: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
  },
  reviewInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  reviewHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs - 2,
  },
  reviewUserName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  reviewDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  reviewComment: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 20,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    padding: spacing.xl,
    paddingBottom: spacing.xl + spacing.sm,
  },
  bottomCTAContent: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    gap: spacing.md,
  },
  bottomCTAInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  bottomCTAInfoItem: {
    gap: spacing.xs,
  },
  bottomCTALabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  bottomCTAPrice: {
    color: colors.secondary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  bottomCTADelivery: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
  bookButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  bookButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
});
