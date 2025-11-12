/**
 * AlertDialog Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant AlertDialog réutilisable pour confirmations critiques
 * Ne peut pas être fermé en tapant à l'extérieur - nécessite une action explicite
 */

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ViewProps, TextProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, radii, typography, shadows } from '../../theme';

export interface AlertDialogProps {
  /** État d'ouverture du dialog */
  open?: boolean;
  /** Fonction appelée au changement d'état */
  onOpenChange?: (open: boolean) => void;
  /** Contenu du dialog */
  children: React.ReactNode;
}

export default function AlertDialog({ open = false, onOpenChange, children }: AlertDialogProps) {
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

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
    opacity: contentOpacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => {}} // Pas de fermeture par hardware back button
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Animated.View style={[styles.content, contentStyle]}>{children}</Animated.View>
      </Animated.View>
    </Modal>
  );
}

AlertDialog.displayName = 'AlertDialog';

/**
 * AlertDialogContent - Conteneur principal du dialog
 */
export interface AlertDialogContentProps extends ViewProps {
  children: React.ReactNode;
}

export function AlertDialogContent({ children, style, ...props }: AlertDialogContentProps) {
  return (
    <View style={[styles.contentContainer, style]} {...props}>
      {children}
    </View>
  );
}

AlertDialogContent.displayName = 'AlertDialogContent';

/**
 * AlertDialogHeader - En-tête du dialog
 */
export interface AlertDialogHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function AlertDialogHeader({ children, style, ...props }: AlertDialogHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

AlertDialogHeader.displayName = 'AlertDialogHeader';

/**
 * AlertDialogTitle - Titre du dialog
 */
export interface AlertDialogTitleProps {
  children: React.ReactNode;
  style?: TextProps['style'];
}

export function AlertDialogTitle({ children, style, ...props }: AlertDialogTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

AlertDialogTitle.displayName = 'AlertDialogTitle';

/**
 * AlertDialogDescription - Description du dialog
 */
export interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  style?: TextProps['style'];
}

export function AlertDialogDescription({ children, style, ...props }: AlertDialogDescriptionProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

AlertDialogDescription.displayName = 'AlertDialogDescription';

/**
 * AlertDialogFooter - Pied du dialog avec actions
 */
export interface AlertDialogFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function AlertDialogFooter({ children, style, ...props }: AlertDialogFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

AlertDialogFooter.displayName = 'AlertDialogFooter';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop, // Plus opaque que Dialog
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
    borderWidth: 2,
    borderColor: colors.error, // Bordure rouge pour indiquer l'alerte
  },

  header: {
    marginBottom: spacing.md,
    alignItems: 'center', // Centré pour attirer l'attention
  },

  title: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },

  description: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
    lineHeight: typography.lineHeight.relaxed,
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centré pour les actions
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
