import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Play, Pause, Heart, ShoppingCart, MoreVertical } from 'lucide-react-native';
import { ImageWithFallback } from './ImageWithFallback';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface BeatCardFigmaProps {
  id: string;
  title: string;
  artist?: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  bpm: number;
  genre: string;
  likes: number;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlay?: () => void;
  onPress?: () => void;
  onToggleLike?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function BeatCardFigma({
  id,
  title,
  artist,
  artistImage,
  coverImage,
  price,
  bpm,
  genre,
  likes,
  isPlaying = false,
  isLiked = false,
  onPlay,
  onPress,
  onToggleLike,
  style,
  testID,
}: BeatCardFigmaProps) {
  const scale = useSharedValue(1);
  const playButtonOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const playButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: playButtonOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
    playButtonOpacity.value = withTiming(1, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
    playButtonOpacity.value = withTiming(0, { duration: 200 });
  };

  const formatPrice = (amount: number) => {
    return `${amount.toFixed(2)} F`;
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
        {/* Cover Image Container */}
        <View style={styles.imageContainer}>
          <ImageWithFallback src={coverImage} alt={title} style={styles.image} />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.4)', 'rgba(10, 10, 10, 0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientOverlay}
          />

          {/* Play Button Overlay */}
          {onPlay && (
            <Animated.View style={[styles.playButtonOverlay, playButtonAnimatedStyle]}>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  onPlay();
                }}
                style={styles.playButtonContainer}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.playButtonGradient}
                >
                  {isPlaying ? (
                    <Pause size={24} color="#F5F5F5" fill="#F5F5F5" />
                  ) : (
                    <Play size={24} color="#F5F5F5" fill="#F5F5F5" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Top Badges */}
          <View style={styles.topBadges}>
            <View style={styles.genreBadge}>
              <Text style={styles.genreBadgeText}>{genre}</Text>
            </View>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
              }}
              style={styles.moreButton}
              activeOpacity={0.8}
            >
              <MoreVertical size={16} color="#D4D4D4" />
            </TouchableOpacity>
          </View>

          {/* BPM Badge */}
          <View style={styles.bpmBadge}>
            <Text style={styles.bpmBadgeText}>{bpm} BPM</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {artist && (
              <>
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
              </>
            )}
          </View>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  onToggleLike?.();
                }}
                style={styles.likeButton}
                activeOpacity={0.8}
              >
                <Heart size={16} color={isLiked ? '#EC4899' : '#A3A3A3'} fill={isLiked ? '#EC4899' : 'transparent'} />
                <Text style={[styles.likeText, isLiked && styles.likeTextActive]}>{likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                }}
                style={styles.cartButton}
                activeOpacity={0.8}
              >
                <View style={styles.cartButtonInner}>
                  <ShoppingCart size={16} color="#D4D4D4" />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>{formatPrice(price)}</Text>
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
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#404040',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBadges: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  genreBadgeText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
  },
  bpmBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
  },
  bpmBadgeText: {
    color: '#D4D4D4',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  titleContainer: {
    gap: 4,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  artistImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  artist: {
    color: '#A3A3A3',
    fontSize: 14,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeText: {
    color: '#A3A3A3',
    fontSize: 14,
  },
  likeTextActive: {
    color: '#EC4899',
  },
  cartButton: {
    padding: 8,
    borderRadius: 8,
  },
  cartButtonInner: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  price: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
});
