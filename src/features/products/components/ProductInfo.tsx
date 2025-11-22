import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProductInfoProps {
  description: string;
  tags: string[];
  style?: ViewStyle;
  testID?: string;
}

export function ProductInfo({ description, tags, style, testID }: ProductInfoProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.infoBlock}>
        <Text style={styles.infoTitle}>Description</Text>
        <Text style={styles.infoText}>{description}</Text>
      </View>

      {tags.length > 0 && (
        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>Caractéristiques</Text>
          <View style={styles.tagsContainer}>
            {tags.map(tag => (
              <View key={tag} style={styles.tag} testID={`tag-${tag}`}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  infoBlock: {
    marginBottom: spacing.md,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
