/**
 * Popover Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Popover réutilisable avec contenu interactif
 * S'ouvre au tap, permet l'interaction avec le contenu
 */

import React, { useState } from 'react';
import { View, Pressable, Modal, StyleSheet, ViewProps, LayoutRectangle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, radii, shadows } from '../../theme';

export interface PopoverProps {
  /** Contenu du popover */
  content: React.ReactNode;
  /** Enfants (trigger) */
  children: React.ReactNode;
  /** Position du popover */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignement du popover */
  align?: 'start' | 'center' | 'end';
  /** État d'ouverture contrôlé */
  open?: boolean;
  /** Callback changement d'état */
  onOpenChange?: (open: boolean) => void;
}

export default function Popover({
  content,
  children,
  side = 'bottom',
  align = 'center',
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);

    if (newOpen) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.95, { duration: 200 });
    }
  };

  const handleTriggerPress = () => {
    handleOpenChange(!isOpen);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getPopoverPosition = () => {
    if (!triggerLayout) return {};

    const popoverWidth = 288; // w-72 = 288px
    const popoverHeight = 200; // Approximate
    const offset = 8;

    let top = 0;
    let left = 0;

    // Calculate position based on side
    switch (side) {
      case 'top':
        top = triggerLayout.y - popoverHeight - offset;
        break;
      case 'bottom':
        top = triggerLayout.y + triggerLayout.height + offset;
        break;
      case 'left':
        top = triggerLayout.y;
        left = triggerLayout.x - popoverWidth - offset;
        break;
      case 'right':
        top = triggerLayout.y;
        left = triggerLayout.x + triggerLayout.width + offset;
        break;
    }

    // Calculate alignment
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = triggerLayout.x;
          break;
        case 'center':
          left = triggerLayout.x + triggerLayout.width / 2 - popoverWidth / 2;
          break;
        case 'end':
          left = triggerLayout.x + triggerLayout.width - popoverWidth;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          top = triggerLayout.y;
          break;
        case 'center':
          top = triggerLayout.y + triggerLayout.height / 2 - popoverHeight / 2;
          break;
        case 'end':
          top = triggerLayout.y + triggerLayout.height - popoverHeight;
          break;
      }
    }

    return { top, left };
  };

  return (
    <>
      <Pressable
        onPress={handleTriggerPress}
        onLayout={event => {
          const { x, y, width, height } = event.nativeEvent.layout;
          // Pour Storybook Web, utiliser les coordonnées du layout directement
          // En production React Native, cela fonctionnerait mieux avec measureInWindow
          setTriggerLayout({ x, y, width, height });
        }}
      >
        {children}
      </Pressable>

      {isOpen && (
        <Modal transparent visible={isOpen} animationType="none" onRequestClose={handleClose}>
          <Pressable onPress={handleClose}>
            <View style={styles.overlay}>
              <Animated.View style={[styles.popover, getPopoverPosition(), animatedStyle]}>{content}</Animated.View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

Popover.displayName = 'Popover';

/**
 * PopoverContent - Conteneur de contenu stylisé
 */
export interface PopoverContentProps extends ViewProps {
  children: React.ReactNode;
}

export function PopoverContent({ children, style, ...props }: PopoverContentProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

PopoverContent.displayName = 'PopoverContent';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  popover: {
    position: 'absolute',
    width: 288,
    maxWidth: '90%',
  },

  content: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
  },
});
