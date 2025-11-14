import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Pause, Heart, Share2, Download, ShoppingCart, Check, Star } from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { WaveformVisualizer } from '../components/molecules/WaveformVisualizer';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { RatingStarsFigma } from '../components/molecules/RatingStarsFigma';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';
import { colors, spacing, typography, radii } from '@/theme';

interface BeatDetailsScreenFigmaProps {
  beatId: string;
  onBack: () => void;
  onBuyClick?: () => void;
  hasPurchased?: boolean;
}

export const beatData = {
  id: '1',
  title: 'Midnight Vibes',
  artist: 'DJ Shadow',
  artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
  coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=800',
  price: 29000,
  type: 'beat' as const,
  bpm: 140,
  key: 'Am',
  genre: 'Trap',
  mood: 'Sombre & Énergique',
  likes: 1243,
  plays: 15624,
  downloads: 847,
  duration: '3:24',
  tags: ['Dark', 'Heavy Bass', '808s', 'Atmospheric'],
  description:
    'Un beat trap sombre avec des 808s puissantes et une atmosphère mystérieuse. Parfait pour du rap conscient ou des vibes nocturnes.',
  rating: 4.8,
  reviewCount: 87,
  licenses: [
    { name: 'Basic', price: 29000, features: ['MP3 & WAV', '2000 streams', 'Crédit obligatoire'] },
    { name: 'Premium', price: 49000, features: ['MP3 & WAV & Stems', '10000 streams', 'Crédit optionnel'] },
    { name: 'Exclusive', price: 299000, features: ['Tous les fichiers', 'Streams illimités', 'Droits exclusifs'] },
  ],
  reviews: [
    {
      id: '1',
      user: 'MC Flow',
      userImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
      rating: 5,
      date: '2 jours',
      comment: 'Beat incroyable ! La qualité est top et les 808s claquent vraiment. Parfait pour mon projet.',
      helpful: 12,
    },
    {
      id: '2',
      user: 'RapArtist',
      userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
      rating: 4,
      date: '5 jours',
      comment: "Très bon beat, l'ambiance est vraiment sombre comme décrit. Juste un peu répétitif.",
      helpful: 8,
    },
    {
      id: '3',
      user: 'ProducerX',
      userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
      rating: 5,
      date: '1 semaine',
      comment: 'Production de qualité professionnelle. Le mastering est impeccable.',
      helpful: 15,
    },
  ],
};

const similarBeats = [
  {
    id: '2',
    title: 'Dark Energy',
    artist: 'BeatMaker',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24000,
    type: 'beat' as const,
    bpm: 138,
    genre: 'Trap',
    likes: 892,
    downloads: 456,
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: '3',
    title: 'Night Drive',
    artist: 'SoundWave',
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 27000,
    type: 'beat' as const,
    bpm: 142,
    genre: 'Trap',
    likes: 654,
    downloads: 321,
    rating: 4.5,
    reviewCount: 28,
  },
];

export function BeatDetailsScreenFigma({
  beatId,
  onBack,
  onBuyClick,
  hasPurchased = false,
}: BeatDetailsScreenFigmaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Cover */}
        <View style={styles.coverContainer}>
          <ImageWithFallback src={beatData.coverImage} alt={beatData.title} style={styles.coverImage} />
          <LinearGradient
            colors={['rgba(10, 10, 10, 0.2)', 'rgba(10, 10, 10, 0.6)', colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.coverGradient}
          />

          {/* Back button */}
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
            <View style={styles.backButtonInner}>
              <ArrowLeft size={20} color={colors.textPrimary} />
            </View>
          </TouchableOpacity>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.actionButton} activeOpacity={0.9}>
              <View style={styles.actionButtonInner}>
                <Heart
                  size={20}
                  color={isLiked ? colors.accent : colors.textPrimary}
                  fill={isLiked ? colors.accent : 'transparent'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
              <View style={styles.actionButtonInner}>
                <Share2 size={20} color={colors.textPrimary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.playButton} activeOpacity={0.9}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playButtonGradient}
              >
                {isPlaying ? (
                  <Pause size={32} color={colors.textPrimary} fill={colors.textPrimary} />
                ) : (
                  <Play size={32} color={colors.textPrimary} fill={colors.textPrimary} />
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.titleContent}>
              <Text style={styles.title}>{beatData.title}</Text>
              <View style={styles.artistRow}>
                <ImageWithFallback src={beatData.artistImage} alt={beatData.artist} style={styles.artistImage} />
                <Text style={styles.artist}>{beatData.artist}</Text>
              </View>
            </View>
          </View>

          {/* Waveform */}
          <View style={styles.waveformContainer}>
            <WaveformVisualizer isPlaying={isPlaying} bars={80} height={60} />
            <View style={styles.waveformTime}>
              <Text style={styles.timeText}>0:00</Text>
              <Text style={styles.timeText}>{beatData.duration}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Écoutes', value: beatData.plays.toLocaleString() },
            { label: 'Télécharg.', value: beatData.downloads.toLocaleString() },
            { label: 'BPM', value: beatData.bpm.toString() },
            { label: 'Tonalité', value: beatData.key },
          ].map((stat, index) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Description</Text>
            <Text style={styles.infoText}>{beatData.description}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Caractéristiques</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{beatData.genre}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{beatData.mood}</Text>
              </View>
              {beatData.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Licenses */}
        <View style={styles.licensesSection}>
          <Text style={styles.sectionTitle}>Choisir une licence</Text>
          <View style={styles.licensesContainer}>
            {beatData.licenses.map((license, index) => (
              <TouchableOpacity
                key={license.name}
                onPress={() => setSelectedLicense(index)}
                style={[styles.licenseCard, selectedLicense === index && styles.licenseCardSelected]}
                activeOpacity={0.9}
              >
                <View style={styles.licenseContent}>
                  <View style={styles.licenseHeader}>
                    <Text style={styles.licenseName}>{license.name}</Text>
                    {selectedLicense === index && (
                      <View style={styles.licenseCheck}>
                        <LinearGradient
                          colors={[colors.primary, colors.primaryDark]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.checkGradient}
                        >
                          <Check size={12} color={colors.textPrimary} />
                        </LinearGradient>
                      </View>
                    )}
                  </View>
                  <View style={styles.licenseFeatures}>
                    {license.features.map(feature => (
                      <View key={feature} style={styles.licenseFeature}>
                        <View style={styles.featureDot} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.licensePrice}>{license.price.toLocaleString()} F</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Avis & Notations</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.seeAllLink}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* Overall Rating */}
          <View style={styles.overallRating}>
            <View style={styles.ratingLeft}>
              <Text style={styles.ratingNumber}>{beatData.rating.toFixed(1)}</Text>
              <RatingStarsFigma rating={beatData.rating} size="md" />
              <Text style={styles.reviewCountText}>{beatData.reviewCount} avis</Text>
            </View>

            <View style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map(stars => {
                const count = beatData.reviews.filter(r => r.rating === stars).length;
                const percentage = (count / beatData.reviews.length) * 100;
                return (
                  <View key={stars} style={styles.ratingBarRow}>
                    <Text style={styles.ratingBarLabel}>{stars}</Text>
                    <Star size={12} color={colors.secondary} fill={colors.secondary} />
                    <View style={styles.ratingBarContainer}>
                      <LinearGradient
                        colors={[colors.secondary, colors.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.ratingBarFill, { width: `${percentage}%` }]}
                      />
                    </View>
                    <Text style={styles.ratingBarCount}>{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Individual Reviews */}
          <View style={styles.reviewsList}>
            {beatData.reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <ImageWithFallback src={review.userImage} alt={review.user} style={styles.reviewAvatar} />
                  <View style={styles.reviewContent}>
                    <View style={styles.reviewTitleRow}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <Text style={styles.reviewDate}>Il y a {review.date}</Text>
                    </View>
                    <RatingStarsFigma rating={review.rating} size="sm" />
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                    <View style={styles.reviewActions}>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Text style={styles.reviewAction}>👍 Utile ({review.helpful})</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Text style={styles.reviewAction}>Répondre</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Add Review Button */}
          {hasPurchased ? (
            <TouchableOpacity style={styles.addReviewButton} activeOpacity={0.9}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addReviewGradient}
              >
                <Text style={styles.addReviewText}>⭐ Laisser un avis</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.lockedReview}>
              <Text style={styles.lockedReviewText}>🔒 Achetez ce beat pour laisser un avis</Text>
            </View>
          )}
        </View>

        {/* Similar Beats */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Beats similaires</Text>
          <FlatList
            data={similarBeats}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.similarGrid}
            columnWrapperStyle={styles.similarRow}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.similarCard}>
                <ProductCardFigma {...item} isFavorited={false} onPress={() => {}} onToggleFavorite={() => {}} />
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.bottomCTA}>
        <LinearGradient
          colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)', colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.bottomCTAGradient}
        >
          <View style={styles.bottomCTAContent}>
            <TouchableOpacity style={styles.downloadButton} activeOpacity={0.9}>
              <View style={styles.downloadButtonInner}>
                <Download size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
            <PrimaryButton onPress={onBuyClick} style={styles.buyButton}>
              <View style={styles.buyButtonContent}>
                <ShoppingCart size={20} color={colors.textPrimary} />
                <Text style={styles.buyButtonText}>
                  Acheter - {beatData.licenses[selectedLicense].price.toLocaleString()} F
                </Text>
              </View>
            </PrimaryButton>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for bottom CTA (specific value)
  },
  coverContainer: {
    height: 256, // h-64 (specific height)
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.lg,
    zIndex: 10,
  },
  backButtonInner: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: 'rgba(10, 10, 10, 0.8)', // colors.background with opacity
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
  },
  actionsContainer: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.lg,
    flexDirection: 'row',
    gap: spacing.sm,
    zIndex: 10,
  },
  actionButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: 'rgba(10, 10, 10, 0.8)', // colors.background with opacity
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
  },
  actionButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    position: 'relative',
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  playButton: {
    width: 64, // w-16 (specific size)
    height: 64, // h-16
    borderRadius: radii.full, // 32 = width/2 (circle)
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.5,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full, // 32 = width/2 (circle)
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  artistImage: {
    width: 24, // w-6 (specific size)
    height: 24, // h-6
    borderRadius: radii.md,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  waveformContainer: {
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  waveformTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  infoSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  infoBlock: {
    marginBottom: spacing.md,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  licensesSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  licensesContainer: {
    gap: spacing.md,
  },
  licenseCard: {
    width: '100%',
    padding: spacing.md,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  licenseCardSelected: {
    borderColor: colors.primary,
  },
  licenseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  licenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flex: 1,
  },
  licenseName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  licenseCheck: {
    width: 20, // w-5 (specific size)
    height: 20, // h-5
    borderRadius: radii.full, // 10 = width/2 (circle)
    overflow: 'hidden',
  },
  checkGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full, // 10 = width/2 (circle)
    alignItems: 'center',
    justifyContent: 'center',
  },
  licenseFeatures: {
    flex: 1,
    gap: spacing.xs,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureDot: {
    width: 4, // w-1 (specific size)
    height: 4, // h-1
    borderRadius: radii.full, // 2 = width/2 (circle)
    backgroundColor: colors.primary,
  },
  featureText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  licensePrice: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginLeft: spacing.md,
  },
  reviewsSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  seeAllLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  overallRating: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    flexDirection: 'row',
    gap: spacing.md,
  },
  ratingLeft: {
    alignItems: 'center',
  },
  ratingNumber: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl + 4, // 36px (larger than displayXl)
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  reviewCountText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginTop: spacing.xs,
  },
  ratingBars: {
    flex: 1,
    gap: spacing.sm,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ratingBarLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    width: 12, // w-3 (specific size)
  },
  ratingBarContainer: {
    flex: 1,
    height: 8, // h-2 (specific size)
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.sm / 2,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: radii.sm / 2,
  },
  ratingBarCount: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    width: 32, // w-8 (specific size)
    textAlign: 'right',
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
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  reviewAvatar: {
    width: 40, // w-10 (specific size)
    height: 40, // h-10
    borderRadius: radii.full, // 20 = width/2 (circle)
  },
  reviewContent: {
    flex: 1,
  },
  reviewTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reviewUser: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.medium,
  },
  reviewDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  reviewComment: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  reviewAction: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  addReviewButton: {
    marginTop: spacing.md,
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  addReviewGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReviewText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  lockedReview: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedReviewText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  similarSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  similarGrid: {
    gap: spacing.md,
  },
  similarRow: {
    gap: spacing.md,
  },
  similarCard: {
    flex: 1,
    maxWidth: '48%',
  },
  bottomCTA: {
    position: 'absolute',
    bottom: spacing.xxl + spacing.xl, // bottom-20 (80px)
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    pointerEvents: 'box-none',
  },
  bottomCTAGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bottomCTAContent: {
    maxWidth: 375, // specific width
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    pointerEvents: 'auto',
  },
  downloadButton: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    flex: 1,
  },
  buyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buyButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
