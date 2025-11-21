import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ProductDetailsHeader,
  ProductPlayer,
  ProductStatsBar,
  ProductInfo,
  PricingSelector,
  ReviewsSection,
  SimilarProductsSection,
  ProductBottomCTA,
  type LicenseOption,
  type Review,
  type SimilarProduct,
} from '@/features/products/components';
import { colors } from '@/theme';

export interface BeatDetailsScreenFigmaProps {
  beatId: string;
  onBack: () => void;
  onBuyClick?: () => void;
  hasPurchased?: boolean;
}

// Mock data - should come from API/hooks
const beatData = {
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
  ] as LicenseOption[],
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
  ] as Review[],
};

const similarBeats: SimilarProduct[] = [
  {
    id: '2',
    title: 'Dark Energy',
    artist: 'BeatMaker',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24000,
    type: 'beat',
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
    type: 'beat',
    bpm: 142,
    genre: 'Trap',
    likes: 654,
    downloads: 321,
    rating: 4.5,
    reviewCount: 28,
  },
];

export function BeatDetailsScreenFigma({ onBack, onBuyClick, hasPurchased = false }: BeatDetailsScreenFigmaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedLicenseIndex, setSelectedLicenseIndex] = useState(0);
  const [playingProductId, setPlayingProductId] = useState<string | null>(null);
  const [likedProductIds, setLikedProductIds] = useState<Set<string>>(new Set());

  const stats = useMemo(
    () => [
      { label: 'Écoutes', value: beatData.plays.toLocaleString() },
      { label: 'Télécharg.', value: beatData.downloads.toLocaleString() },
      { label: 'BPM', value: beatData.bpm.toString() },
      { label: 'Tonalité', value: beatData.key },
    ],
    []
  );

  const tags = useMemo(() => [beatData.genre, beatData.mood, ...beatData.tags], []);

  const selectedPrice = useMemo(
    () => beatData.licenses[selectedLicenseIndex]?.price || beatData.price,
    [selectedLicenseIndex]
  );

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleFavorite = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleSimilarPlay = (productId: string) => {
    setPlayingProductId(current => (current === productId ? null : productId));
    setIsPlaying(false);
  };

  const handleToggleSimilarFavorite = (productId: string) => {
    setLikedProductIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductDetailsHeader
          coverImage={beatData.coverImage}
          title={beatData.title}
          isLiked={isLiked}
          onBack={onBack}
          onToggleFavorite={handleToggleFavorite}
          onShare={() => console.log('Share pressed')}
        />

        <ProductPlayer
          title={beatData.title}
          artist={beatData.artist}
          artistImage={beatData.artistImage}
          isPlaying={isPlaying}
          duration={beatData.duration}
          onTogglePlay={handleTogglePlay}
        />

        <ProductStatsBar stats={stats} />

        <ProductInfo description={beatData.description} tags={tags} />

        <PricingSelector
          licenses={beatData.licenses}
          selectedLicenseIndex={selectedLicenseIndex}
          onSelectLicense={setSelectedLicenseIndex}
        />

        <ReviewsSection
          rating={beatData.rating}
          reviewCount={beatData.reviewCount}
          reviews={beatData.reviews}
          hasPurchased={hasPurchased}
          onSeeAll={() => console.log('See all reviews')}
          onAddReview={() => console.log('Add review')}
          onHelpful={id => console.log('Helpful:', id)}
          onReply={id => console.log('Reply:', id)}
        />

        <SimilarProductsSection
          products={similarBeats}
          likedProductIds={likedProductIds}
          playingProductId={playingProductId}
          onProductPress={id => console.log('Product pressed:', id)}
          onTogglePlay={handleToggleSimilarPlay}
          onToggleFavorite={handleToggleSimilarFavorite}
        />
      </ScrollView>

      <ProductBottomCTA price={selectedPrice} hasPurchased={hasPurchased} onBuy={onBuyClick || (() => {})} />
    </SafeAreaView>
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
    paddingBottom: 120, // Space for bottom CTA
  },
});
