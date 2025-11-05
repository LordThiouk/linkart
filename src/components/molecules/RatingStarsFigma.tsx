import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';

interface RatingStarsFigmaProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  style?: ViewStyle;
  testID?: string;
}

const sizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
};

const textSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function RatingStarsFigma({
  rating,
  size = 'md',
  showNumber = false,
  reviewCount,
  style,
  testID,
}: RatingStarsFigmaProps) {
  const starSize = sizeMap[size];
  const textSize = textSizeMap[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => {
          const isFilled = star <= fullStars;
          const isHalf = star === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={star}
              size={starSize}
              color={isFilled || isHalf ? '#F59E0B' : '#404040'}
              fill={isFilled ? '#F59E0B' : isHalf ? 'rgba(245, 158, 11, 0.5)' : 'transparent'}
            />
          );
        })}
      </View>
      {showNumber && (
        <Text style={[styles.ratingText, { fontSize: textSize }]}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && <Text style={styles.reviewCount}> ({reviewCount})</Text>}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: '#D4D4D4',
    fontFamily: 'Inter_400Regular',
  },
  reviewCount: {
    color: '#A3A3A3',
    fontFamily: 'Inter_400Regular',
  },
});
