import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Pause, Heart, Share2, Download, ShoppingCart, Check, Star } from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { WaveformVisualizer } from '../components/molecules/WaveformVisualizer';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { RatingStarsFigma } from '../components/molecules/RatingStarsFigma';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';

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
            colors={['rgba(10, 10, 10, 0.2)', 'rgba(10, 10, 10, 0.6)', '#0A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.coverGradient}
          />

          {/* Back button */}
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
            <View style={styles.backButtonInner}>
              <ArrowLeft size={20} color="#F5F5F5" />
            </View>
          </TouchableOpacity>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.actionButton} activeOpacity={0.9}>
              <View style={styles.actionButtonInner}>
                <Heart size={20} color={isLiked ? '#EC4899' : '#F5F5F5'} fill={isLiked ? '#EC4899' : 'transparent'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
              <View style={styles.actionButtonInner}>
                <Share2 size={20} color="#F5F5F5" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.playButton} activeOpacity={0.9}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playButtonGradient}
              >
                {isPlaying ? (
                  <Pause size={32} color="#F5F5F5" fill="#F5F5F5" />
                ) : (
                  <Play size={32} color="#F5F5F5" fill="#F5F5F5" />
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
                          colors={['#6366F1', '#8B5CF6']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.checkGradient}
                        >
                          <Check size={12} color="#F5F5F5" />
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
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <View style={styles.ratingBarContainer}>
                      <LinearGradient
                        colors={['#F59E0B', '#EC4899']}
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
                colors={['#6366F1', '#8B5CF6']}
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
          colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)', '#0A0A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.bottomCTAGradient}
        >
          <View style={styles.bottomCTAContent}>
            <TouchableOpacity style={styles.downloadButton} activeOpacity={0.9}>
              <View style={styles.downloadButtonInner}>
                <Download size={20} color="#D4D4D4" />
              </View>
            </TouchableOpacity>
            <PrimaryButton onPress={onBuyClick} style={styles.buyButton}>
              <View style={styles.buyButtonContent}>
                <ShoppingCart size={20} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for bottom CTA
  },
  coverContainer: {
    height: 256, // h-64
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
    top: 48, // top-12
    left: 24, // left-6
    zIndex: 10,
  },
  backButtonInner: {
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
  },
  actionsContainer: {
    position: 'absolute',
    top: 48, // top-12
    right: 24, // right-6
    flexDirection: 'row',
    gap: 8, // gap-2
    zIndex: 10,
  },
  actionButton: {
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
  },
  actionButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: 24, // px-6
    marginTop: -32, // -mt-8
    position: 'relative',
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16, // gap-4
    marginBottom: 16, // mb-4
  },
  playButton: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  artistImage: {
    width: 24, // w-6
    height: 24, // h-6
    borderRadius: 12,
  },
  artist: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  waveformContainer: {
    backgroundColor: '#111111',
    borderRadius: 24, // rounded-2xl
    padding: 16, // p-4
    borderWidth: 1,
    borderColor: '#404040',
  },
  waveformTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12, // mt-3
  },
  timeText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    gap: 12, // gap-3
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statValue: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  infoSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    gap: 16, // space-y-4
  },
  infoBlock: {
    marginBottom: 16,
  },
  infoTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  infoText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // gap-2
  },
  tag: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
  },
  tagText: {
    color: '#D4D4D4',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  licensesSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16, // mb-4
  },
  licensesContainer: {
    gap: 12, // space-y-3
  },
  licenseCard: {
    width: '100%',
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    borderWidth: 2,
    borderColor: '#404040',
    backgroundColor: '#111111',
  },
  licenseCardSelected: {
    borderColor: '#6366F1',
  },
  licenseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  licenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    marginBottom: 8,
    flex: 1,
  },
  licenseName: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  licenseCheck: {
    width: 20, // w-5
    height: 20, // h-5
    borderRadius: 10,
    overflow: 'hidden',
  },
  checkGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  licenseFeatures: {
    flex: 1,
    gap: 4, // space-y-1
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  featureDot: {
    width: 4, // w-1
    height: 4, // h-1
    borderRadius: 2,
    backgroundColor: '#6366F1',
  },
  featureText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  licensePrice: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 16, // ml-4
  },
  reviewsSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16, // mb-4
  },
  seeAllLink: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  overallRating: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    marginBottom: 16, // mb-4
    flexDirection: 'row',
    gap: 16, // gap-4
  },
  ratingLeft: {
    alignItems: 'center',
  },
  ratingNumber: {
    color: '#F5F5F5',
    fontSize: 36, // text-4xl
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  reviewCountText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  ratingBars: {
    flex: 1,
    gap: 8, // space-y-2
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  ratingBarLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    width: 12, // w-3
  },
  ratingBarContainer: {
    flex: 1,
    height: 8, // h-2
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  ratingBarCount: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    width: 32, // w-8
    textAlign: 'right',
  },
  reviewsList: {
    gap: 12, // space-y-3
  },
  reviewCard: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12, // gap-3
  },
  reviewAvatar: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
  },
  reviewTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUser: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  reviewDate: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  reviewComment: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    marginTop: 12, // mt-3
  },
  reviewAction: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  addReviewButton: {
    marginTop: 16, // mt-4
    borderRadius: 24, // rounded-2xl
    overflow: 'hidden',
  },
  addReviewGradient: {
    paddingVertical: 12, // py-3
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReviewText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  lockedReview: {
    marginTop: 16, // mt-4
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  lockedReviewText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  similarSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    paddingBottom: 24, // pb-6
  },
  similarGrid: {
    gap: 16, // gap-4
  },
  similarRow: {
    gap: 16, // gap-4
  },
  similarCard: {
    flex: 1,
    maxWidth: '48%',
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 80, // bottom-20
    left: 0,
    right: 0,
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
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
    maxWidth: 375,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12, // gap-3
    pointerEvents: 'auto',
  },
  downloadButton: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
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
    gap: 8, // gap-2
  },
  buyButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});
