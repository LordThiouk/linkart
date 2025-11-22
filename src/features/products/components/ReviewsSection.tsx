import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { RatingStarsFigma } from '@/components/molecules/RatingStarsFigma';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface Review {
  id: string;
  user: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface ReviewsSectionProps {
  title?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  hasPurchased: boolean;
  onSeeAll?: () => void;
  onAddReview?: () => void;
  onHelpful?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export function ReviewsSection({
  title = 'Avis & Notations',
  rating,
  reviewCount,
  reviews,
  hasPurchased,
  onSeeAll,
  onAddReview,
  onHelpful,
  onReply,
  style,
  testID,
}: ReviewsSectionProps) {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.8} testID="see-all-button">
            <Text style={styles.seeAllLink}>Voir tout</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Overall Rating */}
      <View style={styles.overallRating}>
        <View style={styles.ratingLeft}>
          <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
          <RatingStarsFigma rating={rating} size="md" />
          <Text style={styles.reviewCountText}>{reviewCount} avis</Text>
        </View>

        <View style={styles.ratingBars}>
          {ratingDistribution.map(({ stars, count, percentage }) => (
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
          ))}
        </View>
      </View>

      {/* Individual Reviews */}
      <View style={styles.reviewsList}>
        {reviews.map(review => (
          <View key={review.id} style={styles.reviewCard} testID={`review-${review.id}`}>
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
                  {onHelpful && (
                    <TouchableOpacity onPress={() => onHelpful(review.id)} activeOpacity={0.8}>
                      <Text style={styles.reviewAction}>👍 Utile ({review.helpful})</Text>
                    </TouchableOpacity>
                  )}
                  {onReply && (
                    <TouchableOpacity onPress={() => onReply(review.id)} activeOpacity={0.8}>
                      <Text style={styles.reviewAction}>Répondre</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Add Review Button */}
      {hasPurchased ? (
        onAddReview && (
          <TouchableOpacity
            onPress={onAddReview}
            style={styles.addReviewButton}
            activeOpacity={0.9}
            testID="add-review-button"
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addReviewGradient}
            >
              <Text style={styles.addReviewText}>⭐ Laisser un avis</Text>
            </LinearGradient>
          </TouchableOpacity>
        )
      ) : (
        <View style={styles.lockedReview} testID="locked-review">
          <Text style={styles.lockedReviewText}>🔒 Achetez ce beat pour laisser un avis</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
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
    fontSize: 36,
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
    width: 12,
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
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
    width: 32,
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
    width: 40,
    height: 40,
    borderRadius: radii.full,
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
});
