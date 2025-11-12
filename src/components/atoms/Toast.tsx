/**
 * Toast Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Toast pour afficher des notifications temporaires
 * Remplace Alert.alert() et unifie react-native-toast-message
 */

import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps extends ViewProps {
  /** Message à afficher */
  message: string;
  /** Variant du toast */
  variant?: ToastVariant;
  /** Position du toast */
  position?: ToastPosition;
  /** Durée d'affichage en ms (0 = infini) */
  duration?: number;
  /** Action optionnelle */
  action?: {
    label: string;
    onPress: () => void;
  };
  /** Callback quand le toast est fermé */
  onDismiss?: () => void;
  /** Afficher l'icône */
  showIcon?: boolean;
}

/**
 * Toast - Composant principal
 */
export default function Toast({
  message,
  variant = 'default',
  position = 'bottom',
  duration = 4000,
  action,
  onDismiss,
  showIcon = true,
  style,
  ...props
}: ToastProps) {
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animation d'entrée
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 300 });

    // Auto-dismiss si duration > 0
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    translateY.value = withTiming(position === 'top' ? -100 : 100, { duration: 250 }, () => {
      opacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(onDismiss || (() => {}))();
      });
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: colors.success + '15', // 15% opacity
          borderColor: colors.success,
          icon: '✓',
        };
      case 'error':
        return {
          backgroundColor: colors.error + '15',
          borderColor: colors.error,
          icon: '✕',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning + '15',
          borderColor: colors.warning,
          icon: '⚠',
        };
      case 'info':
        return {
          backgroundColor: colors.primary + '15',
          borderColor: colors.primary,
          icon: 'ℹ',
        };
      default:
        return {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.border,
          icon: '',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`position_${position}`],
        { backgroundColor: variantStyles.backgroundColor, borderColor: variantStyles.borderColor },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {showIcon && variantStyles.icon && (
          <View style={[styles.iconContainer, { backgroundColor: variantStyles.borderColor }]}>
            <Text style={styles.icon}>{variantStyles.icon}</Text>
          </View>
        )}
        <Text style={[styles.message, variant !== 'default' && styles.message_colored]}>{message}</Text>
      </View>
      {action && (
        <Pressable onPress={action.onPress} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: variantStyles.borderColor }]}>{action.label}</Text>
        </Pressable>
      )}
      <Pressable onPress={handleDismiss} style={styles.closeButton}>
        <Text style={styles.closeIcon}>×</Text>
      </Pressable>
    </Animated.View>
  );
}

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    borderWidth: 1,
    minHeight: 48,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  position_top: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  position_bottom: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  message: {
    flex: 1,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },
  message_colored: {
    color: colors.textPrimary,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: '600',
  },
  closeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textMuted,
    fontWeight: '300',
  },
});
