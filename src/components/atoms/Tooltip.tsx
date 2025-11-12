/**
 * Tooltip Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Tooltip réutilisable avec long press
 * Optimisé pour mobile (long press au lieu de hover)
 */

import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, LayoutRectangle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

export interface TooltipProps {
  /** Contenu du tooltip */
  content: string;
  /** Enfants (trigger) */
  children: React.ReactNode;
  /** Position du tooltip */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Délai avant affichage (ms) */
  delayDuration?: number;
}

export default function Tooltip({ content, children, side = 'top', delayDuration = 0 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLongPress = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(true);
      opacity.value = withTiming(1, { duration: 150 });
      scale.value = withTiming(1, { duration: 150 });
    }, delayDuration);
  };

  const handlePressOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    opacity.value = withTiming(0, { duration: 150 });
    scale.value = withTiming(0.9, { duration: 150 });
    setTimeout(() => setVisible(false), 150);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getTooltipPosition = () => {
    if (!triggerLayout) return {};

    const tooltipHeight = 40; // Approximate height
    const tooltipWidth = 120; // Approximate width
    const offset = 8;

    switch (side) {
      case 'top':
        return {
          top: triggerLayout.y - tooltipHeight - offset,
          left: triggerLayout.x + triggerLayout.width / 2 - tooltipWidth / 2,
        };
      case 'bottom':
        return {
          top: triggerLayout.y + triggerLayout.height + offset,
          left: triggerLayout.x + triggerLayout.width / 2 - tooltipWidth / 2,
        };
      case 'left':
        return {
          top: triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2,
          left: triggerLayout.x - tooltipWidth - offset,
        };
      case 'right':
        return {
          top: triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2,
          left: triggerLayout.x + triggerLayout.width + offset,
        };
      default:
        return {};
    }
  };

  return (
    <>
      <Pressable
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        onLayout={event => {
          const { x, y, width, height } = event.nativeEvent.layout;
          // Pour Storybook Web, utiliser les coordonnées du layout directement
          // En production React Native, cela fonctionnerait mieux avec measureInWindow
          setTriggerLayout({ x, y, width, height });
        }}
      >
        {children}
      </Pressable>

      {visible && (
        <Modal transparent visible={visible} animationType="none">
          <View style={styles.overlay}>
            <Animated.View style={[styles.tooltip, getTooltipPosition(), animatedStyle]}>
              <Text style={styles.text}>{content}</Text>
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
}

Tooltip.displayName = 'Tooltip';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  tooltip: {
    position: 'absolute',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    maxWidth: 200,
  },

  text: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.primaryForeground,
    textAlign: 'center',
  },
});
