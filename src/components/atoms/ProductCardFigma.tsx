import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Play, Pause, Heart, ShoppingCart, Download, Package, LucideIcon } from 'lucide-react-native';
import { ImageWithFallback } from './ImageWithFallback';
import { RatingStarsFigma } from '../molecules/RatingStarsFigma';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ProductCardFigmaProps {
  id: string;
  title: string;
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
  isPlaying?: boolean;
  isFavorited?: boolean;
  onPlay?: () => void;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const typeConfig: Record<'beat' | 'kit' | 'sample', { icon: LucideIcon; label: string; colors: [string, string] }> = {
  beat: { icon: Play, label: 'Beat', colors: ['#6366F1', '#8B5CF6'] },
  kit: { icon: Package, label: 'Kit', colors: ['#EC4899', '#F59E0B'] },
  sample: { icon: Download, label: 'Sample', colors: ['#06B6D4', '#8B5CF6'] },
};

export function ProductCardFigma({
  id,
  title,
  artist,
  artistImage,
  coverImage,
  price,
  type,
  bpm,
  genre,
  likes,
  downloads,
  rating,
  reviewCount,
  isPlaying = false,
  isFavorited = false,
  onPlay,
  onPress,
  onToggleFavorite,
  style,
  testID,
}: ProductCardFigmaProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
    translateY.value = withTiming(-4, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
    translateY.value = withTiming(0, { duration: 100 });
  };

  const config = typeConfig[type];

  const formatMetric = (value: number) => {
    if (value > 999) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, styles.container, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      <View style={styles.card}>
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <ImageWithFallback src={coverImage} alt={title} style={styles.image} />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.4)', 'rgba(10, 10, 10, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientOverlay}
          />

          {/* Type Badge */}
          <View style={styles.typeBadge}>
            <LinearGradient
              colors={config.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.typeBadgeGradient}
            >
              <config.icon size={12} color="#F5F5F5" />
              <Text style={styles.typeBadgeText}>{config.label}</Text>
            </LinearGradient>
          </View>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              style={styles.favoriteButton}
              activeOpacity={0.8}
            >
              <Heart
                size={16}
                color={isFavorited ? '#EC4899' : '#F5F5F5'}
                fill={isFavorited ? '#EC4899' : 'transparent'}
              />
            </TouchableOpacity>
          )}

          {/* Play Button - Only for beats */}
          {type === 'beat' && onPlay && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onPlay();
              }}
              style={styles.playButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playButtonGradient}
              >
                {isPlaying ? (
                  <Pause size={20} color="#F5F5F5" fill="#F5F5F5" />
                ) : (
                  <Play size={20} color="#F5F5F5" fill="#F5F5F5" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Stats (Likes + Downloads for beats) */}
          <View style={styles.statsContainer}>
            {likes !== undefined && (
              <View style={styles.statBadge}>
                <Heart size={12} color="#EC4899" />
                <Text style={styles.statText}>{formatMetric(likes)}</Text>
              </View>
            )}
            {downloads !== undefined && type === 'beat' && (
              <View style={styles.statBadge}>
                <Download size={12} color="#06B6D4" />
                <Text style={styles.statText}>{formatMetric(downloads)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {/* Artist */}
          {artistImage ? (
            <View style={styles.artistContainer}>
              <ImageWithFallback src={artistImage} alt={artist} style={styles.artistImage} />
              <Text style={styles.artist} numberOfLines={1}>
                {artist}
              </Text>
            </View>
          ) : (
            <Text style={styles.artist} numberOfLines={1}>
              {artist}
            </Text>
          )}

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <Text style={styles.genre}>{genre}</Text>
            {bpm && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.bpm}>{bpm} BPM</Text>
              </>
            )}
          </View>

          {/* Rating */}
          {rating !== undefined && (
            <View style={styles.ratingContainer}>
              <RatingStarsFigma
                rating={rating}
                size="lg"
                showNumber={reviewCount !== undefined}
                reviewCount={reviewCount}
              />
            </View>
          )}

          {/* Price & Action */}
          <View style={styles.footer}>
            <Text style={styles.price}>{price} F</Text>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                // Add to cart action
              }}
              style={styles.cartButton}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cartButtonGradient}
              >
                <ShoppingCart size={16} color="#F5F5F5" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 24, // rounded-2xl
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  typeBadgeGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    gap: 8,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  content: {
    padding: 12, // p-3
  },
  title: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 4,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  artistImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  artist: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  genre: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  separator: {
    color: '#404040',
    fontSize: 14,
  },
  bpm: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reviewCountText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
  },
  price: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  cartButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
