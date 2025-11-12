/**
 * Carousel Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Carousel pour afficher des items en carrousel avec swipe gestures
 * Utilise Reanimated pour des animations fluides
 */

import React, { useRef, useState } from 'react';
import { View, StyleSheet, ViewProps, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { colors, spacing, radii } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CarouselProps<T = any> extends ViewProps {
  /** Données à afficher */
  data: T[];
  /** Fonction pour rendre chaque item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Largeur de chaque item */
  itemWidth?: number;
  /** Espacement entre les items */
  itemSpacing?: number;
  /** Hauteur du carousel */
  height?: number;
  /** Auto-play (défilement automatique) */
  autoplay?: boolean;
  /** Intervalle d'auto-play en ms */
  autoplayInterval?: number;
  /** Afficher les indicateurs de page */
  showIndicators?: boolean;
  /** Callback quand la page change */
  onPageChange?: (index: number) => void;
  /** Key extractor */
  keyExtractor?: (item: T, index: number) => string;
  /** Variant du carousel */
  variant?: 'default' | 'card' | 'flat';
}

/**
 * Carousel - Composant principal
 */
export default function Carousel<T = any>({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH * 0.85,
  itemSpacing = spacing.md,
  height,
  autoplay = false,
  autoplayInterval = 3000,
  showIndicators = true,
  onPageChange,
  keyExtractor,
  variant = 'default',
  style,
  ...props
}: CarouselProps<T>) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;

    const index = Math.round(offsetX / (itemWidth + itemSpacing));
    if (index !== currentIndex && index >= 0 && index < data.length) {
      setCurrentIndex(index);
      onPageChange?.(index);
    }
  };

  // Auto-play
  React.useEffect(() => {
    if (!autoplay || data.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      try {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      } catch {
        // Fallback si l'index n'est pas encore rendu
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * (itemWidth + itemSpacing),
          animated: true,
        });
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, currentIndex, data.length, autoplayInterval, itemWidth, itemSpacing]);

  const Indicator = React.memo(
    ({
      index,
      itemWidth,
      itemSpacing,
      isActive,
    }: {
      index: number;
      itemWidth: number;
      itemSpacing: number;
      isActive: boolean;
    }) => {
      const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
          (index - 1) * (itemWidth + itemSpacing),
          index * (itemWidth + itemSpacing),
          (index + 1) * (itemWidth + itemSpacing),
        ];

        const scale = interpolate(scrollX.value, inputRange, [0.8, 1.2, 0.8], 'clamp');

        const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], 'clamp');

        return {
          transform: [{ scale }],
          opacity,
        };
      });

      return (
        <Animated.View
          style={[
            styles.indicator,
            isActive && styles.indicator_active,
            index > 0 && styles.indicator_spacing,
            animatedStyle,
          ]}
        />
      );
    }
  );

  Indicator.displayName = 'Indicator';

  const containerStyle = height ? { height } : undefined;

  return (
    <View style={[styles.container, containerStyle, style]} {...props}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => (
          <View style={[styles.item, styles[`item_${variant}`], { width: itemWidth, marginRight: itemSpacing }]}>
            {renderItem(item, index)}
          </View>
        )}
        keyExtractor={keyExtractor || ((item, index) => `carousel-${index}`)}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + itemSpacing}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={(data, index) => ({
          length: itemWidth + itemSpacing,
          offset: (itemWidth + itemSpacing) * index,
          index,
        })}
      />

      {showIndicators && data.length > 1 && (
        <View style={styles.indicators}>
          {data.map((_, index) => (
            <Indicator
              key={index}
              index={index}
              itemWidth={itemWidth}
              itemSpacing={itemSpacing}
              isActive={index === currentIndex}
            />
          ))}
        </View>
      )}
    </View>
  );
}

Carousel.displayName = 'Carousel';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
  },
  item: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  item_default: {
    backgroundColor: colors.surface,
  },
  item_card: {
    backgroundColor: colors.surface,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  item_flat: {
    backgroundColor: colors.transparent,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  indicator_spacing: {
    marginLeft: spacing.xs,
  },
  indicator_active: {
    backgroundColor: colors.primary,
    width: 24,
  },
});
