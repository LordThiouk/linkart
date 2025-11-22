import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface PortfolioItem {
  id: string;
  image: string;
  title?: string;
}

export interface ServicePortfolioProps {
  items: PortfolioItem[];
  testID?: string;
}

export function ServicePortfolio({ items, testID }: ServicePortfolioProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(400)} style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>Portfolio</Text>
      <View style={styles.grid}>
        {items.map(item => (
          <View key={item.id} style={styles.item} testID={`portfolio-item-${item.id}`}>
            <ImageWithFallback src={item.image} alt={item.title || 'Portfolio item'} style={styles.image} />
          </View>
        ))}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
