import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface AvatarUploadProps {
  imageUri?: string | null;
  onUpload: () => void;
  testID?: string;
}

export function AvatarUpload({ imageUri, onUpload, testID }: AvatarUploadProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const imageY = useSharedValue(isStorybook ? 0 : 20);
  const imageOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    imageY.value = withDelay(100, withTiming(0, { duration: 500 }));
    imageOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imageY.value }],
    opacity: imageOpacity.value,
  }));

  return (
    <AnimatedView style={[styles.container, imageAnimatedStyle]} testID={testID}>
      <TouchableOpacity onPress={onUpload} style={styles.imageContainer} activeOpacity={0.9} testID="upload-button">
        <View style={styles.imageWrapper}>
          {imageUri ? (
            <ImageWithFallback src={imageUri} alt="Profile" style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Upload size={32} color={colors.textMuted} />
            </View>
          )}
        </View>
        <View style={styles.uploadBadge}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.uploadBadgeGradient}
          >
            <Upload size={16} color={colors.textPrimary} />
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>Ajouter une photo de profil</Text>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: radii.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: spacing.sm,
    elevation: 6,
  },
  uploadBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
