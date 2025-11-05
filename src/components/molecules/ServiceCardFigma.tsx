import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Star, Clock, CheckCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../atoms/ImageWithFallback';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ServiceCardFigmaProps {
  id: string;
  title: string;
  provider: string;
  providerImage: string;
  coverImage: string;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  category: string;
  isPro?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ServiceCardFigma({
  id,
  title,
  provider,
  providerImage,
  coverImage,
  price,
  rating,
  reviewCount,
  deliveryTime,
  category,
  isPro = false,
  onPress,
  style,
  testID,
}: ServiceCardFigmaProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
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
        <View style={styles.coverContainer}>
          <ImageWithFallback src={coverImage} alt={title} style={styles.cover} />
          <LinearGradient
            colors={['rgba(10, 10, 10, 0.8)', 'transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.coverGradient}
          />

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <View style={styles.categoryBadgeContent}>
              <Text style={styles.categoryBadgeText}>{category}</Text>
            </View>
          </View>

          {/* Pro Badge */}
          {isPro && (
            <View style={styles.proBadge}>
              <LinearGradient
                colors={['#F59E0B', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.proBadgeGradient}
              >
                <CheckCircle size={12} color="#F5F5F5" />
                <Text style={styles.proBadgeText}>PRO</Text>
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>

            <View style={styles.providerContainer}>
              <ImageWithFallback src={providerImage} alt={provider} style={styles.providerImage} />
              <Text style={styles.provider} numberOfLines={1}>
                {provider}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{rating}</Text>
              <Text style={styles.reviewCount}>({reviewCount})</Text>
              <View style={styles.deliveryContainer}>
                <Clock size={16} color="#A3A3A3" />
                <Text style={styles.deliveryTime}>{deliveryTime}</Text>
              </View>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>À partir de</Text>
            <Text style={styles.price}>€{price.toFixed(2)}</Text>
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
  coverContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    position: 'relative',
  },
  cover: {
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
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  categoryBadgeContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  categoryBadgeText: {
    color: '#06B6D4',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  proBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  proBadgeGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  proBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    fontWeight: '600',
  },
  content: {
    padding: 16, // p-4
    gap: 12, // space-y-3
  },
  header: {
    marginBottom: 8,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 8,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  providerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  provider: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  footer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginLeft: 4,
  },
  reviewCount: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 12,
  },
  deliveryTime: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  price: {
    color: '#F59E0B',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
