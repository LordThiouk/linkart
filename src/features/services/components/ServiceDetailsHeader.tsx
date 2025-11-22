import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Share2 } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ServiceDetailsHeaderProps {
  coverImage: string;
  category: string;
  onBack?: () => void;
  onShare?: () => void;
  testID?: string;
}

export function ServiceDetailsHeader({ coverImage, category, onBack, onShare, testID }: ServiceDetailsHeaderProps) {
  return (
    <AnimatedView entering={FadeIn} style={styles.container} testID={testID}>
      <ImageWithFallback src={coverImage} alt="Service cover" style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(10, 10, 10, 0.6)', colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />

      {/* Header Buttons */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.button} activeOpacity={0.8} testID="back-button">
            <ChevronLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        {onShare && (
          <TouchableOpacity onPress={onShare} style={styles.button} activeOpacity={0.8} testID="share-button">
            <Share2 size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Badge */}
      <View style={styles.categoryBadge}>
        <View style={styles.categoryBadgeContent}>
          <Text style={styles.categoryBadgeText}>{category}</Text>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 256,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  header: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  button: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.xl,
  },
  categoryBadgeContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.md,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  categoryBadgeText: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
});
