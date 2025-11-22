import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Star } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ServiceReview {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ServiceReviewsSectionProps {
  reviews: ServiceReview[];
  onSeeAll?: () => void;
  testID?: string;
}

export function ServiceReviewsSection({ reviews, onSeeAll, testID }: ServiceReviewsSectionProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(500)} style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Avis clients</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} testID="see-all-button">
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list}>
        {reviews.map((review, index) => (
          <AnimatedView
            key={review.id}
            entering={FadeInDown.delay(500 + index * 50)}
            style={styles.reviewCard}
            testID={`review-${review.id}`}
          >
            <View style={styles.reviewHeader}>
              <ImageWithFallback src={review.userImage} alt={review.userName} style={styles.avatar} />
              <View style={styles.reviewInfo}>
                <View style={styles.reviewHeaderTop}>
                  <Text style={styles.userName}>{review.userName}</Text>
                  <View style={styles.stars}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} color={colors.secondary} fill={colors.secondary} />
                    ))}
                  </View>
                </View>
                <Text style={styles.date}>{review.date}</Text>
              </View>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
          </AnimatedView>
        ))}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  seeAll: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  list: {
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
  avatar: {
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
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs - 2,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  comment: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 20,
  },
});
