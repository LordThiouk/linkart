/**
 * Sheet Component (Bottom Sheet)
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Sheet (Bottom Sheet) réutilisable avec animations
 * Optimisé pour mobile avec support gestes de fermeture
 */

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Dimensions, ViewProps, TextProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors, spacing, radii, typography, shadows } from '../../theme';

const { height: screenHeight } = Dimensions.get('window');

export interface SheetProps {
  /** État d'ouverture du sheet */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du sheet */
  children: React.ReactNode;
  /** Position du sheet (mobile: bottom uniquement) */
  side?: 'bottom';
}

export default function Sheet({ open = false, onOpenChange, children, side = 'bottom' }: SheetProps) {
  const [visible, setVisible] = useState(open);
  const backdropOpacity = useSharedValue(0);
  const translateY = useSharedValue(screenHeight);

  useEffect(() => {
    if (open) {
      setVisible(true);
      backdropOpacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 30, stiffness: 400 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(screenHeight, { duration: 300 });
      setTimeout(() => setVisible(false), 300);
    }
  }, [open, backdropOpacity, translateY]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Gesture pour swipe down
  const panGesture = Gesture.Pan()
    .runOnJS(true) // Explicite pour Storybook Web
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (event.translationY > 100 || event.velocityY > 500) {
        // Fermer si swipe > 100px ou vitesse > 500
        translateY.value = withTiming(screenHeight, { duration: 300 });
        backdropOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(handleClose)();
      } else {
        // Revenir en place
        translateY.value = withSpring(0, { damping: 30, stiffness: 400 });
      }
    });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose} statusBarTranslucent>
      <Pressable onPress={handleClose}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.content, contentStyle]}>{children}</Animated.View>
          </GestureDetector>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

Sheet.displayName = 'Sheet';

/**
 * SheetContent - Conteneur principal du sheet
 */
export interface SheetContentProps extends ViewProps {
  children: React.ReactNode;
  /** Afficher le handle de drag */
  showHandle?: boolean;
  /** Afficher le bouton de fermeture */
  showClose?: boolean;
  /** Fonction de fermeture */
  onClose?: () => void;
}

export function SheetContent({
  children,
  showHandle = true,
  showClose = true,
  onClose,
  style,
  ...props
}: SheetContentProps) {
  return (
    <View style={[styles.contentContainer, style]} {...props}>
      {showHandle && <View style={styles.handle} />}
      {showClose && onClose && (
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
      {children}
    </View>
  );
}

SheetContent.displayName = 'SheetContent';

/**
 * SheetHeader - En-tête du sheet
 */
export interface SheetHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function SheetHeader({ children, style, ...props }: SheetHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

SheetHeader.displayName = 'SheetHeader';

/**
 * SheetTitle - Titre du sheet
 */
export interface SheetTitleProps extends TextProps {
  children: React.ReactNode;
}

export function SheetTitle({ children, style, ...props }: SheetTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

SheetTitle.displayName = 'SheetTitle';

/**
 * SheetDescription - Description du sheet
 */
export interface SheetDescriptionProps extends TextProps {
  children: React.ReactNode;
}

export function SheetDescription({ children, style, ...props }: SheetDescriptionProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

SheetDescription.displayName = 'SheetDescription';

/**
 * SheetFooter - Pied du sheet avec actions
 */
export interface SheetFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function SheetFooter({ children, style, ...props }: SheetFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

SheetFooter.displayName = 'SheetFooter';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },

  content: {
    width: '100%',
    maxHeight: screenHeight * 0.9,
  },

  contentContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingBottom: spacing.xl,
    ...shadows.lg,
    position: 'relative',
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radii.full,
    alignSelf: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  closeButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.inter.medium,
  },

  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },

  title: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  description: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
    lineHeight: typography.lineHeight.relaxed,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
});
