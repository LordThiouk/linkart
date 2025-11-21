import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Heart, Share2 } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, radii } from '@/theme';

export interface ProductDetailsHeaderProps {
  coverImage: string;
  title: string;
  isLiked: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  onShare?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProductDetailsHeader({
  coverImage,
  title,
  isLiked,
  onBack,
  onToggleFavorite,
  onShare,
  style,
  testID,
}: ProductDetailsHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ImageWithFallback src={coverImage} alt={title} style={styles.coverImage} />
      <LinearGradient
        colors={['rgba(10, 10, 10, 0.2)', 'rgba(10, 10, 10, 0.6)', colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />

      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9} testID="back-button">
        <View style={styles.backButtonInner}>
          <ArrowLeft size={20} color={colors.textPrimary} />
        </View>
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.actionButton}
          activeOpacity={0.9}
          testID="favorite-button"
        >
          <View style={styles.actionButtonInner}>
            <Heart
              size={20}
              color={isLiked ? colors.accent : colors.textPrimary}
              fill={isLiked ? colors.accent : 'transparent'}
            />
          </View>
        </TouchableOpacity>
        {onShare && (
          <TouchableOpacity onPress={onShare} style={styles.actionButton} activeOpacity={0.9} testID="share-button">
            <View style={styles.actionButtonInner}>
              <Share2 size={20} color={colors.textPrimary} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 256,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
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
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
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
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(64, 64, 64, 0.5)',
  },
  actionButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
