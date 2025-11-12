/**
 * Dialog Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Dialog (Modal) réutilisable avec animations
 */

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ViewProps, TextProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, radii, typography, shadows } from '../../theme';

export interface DialogProps {
  /** État d'ouverture du dialog */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du dialog */
  children: React.ReactNode;
}

export default function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const [visible, setVisible] = useState(open);
  const backdropOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      setVisible(true);
      backdropOpacity.value = withTiming(1, { duration: 200 });
      contentScale.value = withSpring(1, { damping: 20, stiffness: 300 });
      contentOpacity.value = withTiming(1, { duration: 200 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      contentScale.value = withTiming(0.9, { duration: 200 });
      contentOpacity.value = withTiming(0, { duration: 200 });
      setTimeout(() => setVisible(false), 200);
    }
  }, [open, backdropOpacity, contentScale, contentOpacity]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
    opacity: contentOpacity.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose} statusBarTranslucent>
      <Pressable onPress={handleClose}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Animated.View style={[styles.content, contentStyle]}>{children}</Animated.View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

Dialog.displayName = 'Dialog';

/**
 * DialogContent - Conteneur principal du dialog
 */
export interface DialogContentProps extends ViewProps {
  children: React.ReactNode;
  /** Afficher le bouton de fermeture */
  showClose?: boolean;
  /** Fonction de fermeture */
  onClose?: () => void;
}

export function DialogContent({ children, showClose = true, onClose, style, ...props }: DialogContentProps) {
  return (
    <View style={[styles.contentContainer, style]} {...props}>
      {showClose && onClose && (
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
      {children}
    </View>
  );
}

DialogContent.displayName = 'DialogContent';

/**
 * DialogHeader - En-tête du dialog
 */
export interface DialogHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function DialogHeader({ children, style, ...props }: DialogHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

DialogHeader.displayName = 'DialogHeader';

/**
 * DialogTitle - Titre du dialog
 */
export interface DialogTitleProps extends TextProps {
  children: React.ReactNode;
}

export function DialogTitle({ children, style, ...props }: DialogTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

DialogTitle.displayName = 'DialogTitle';

/**
 * DialogDescription - Description du dialog
 */
export interface DialogDescriptionProps extends TextProps {
  children: React.ReactNode;
}

export function DialogDescription({ children, style, ...props }: DialogDescriptionProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

DialogDescription.displayName = 'DialogDescription';

/**
 * DialogFooter - Pied du dialog avec actions
 */
export interface DialogFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function DialogFooter({ children, style, ...props }: DialogFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

DialogFooter.displayName = 'DialogFooter';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  content: {
    width: '100%',
    maxWidth: 500,
  },

  contentContainer: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    ...shadows.lg,
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
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
    marginBottom: spacing.md,
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
    marginTop: spacing.lg,
  },
});
