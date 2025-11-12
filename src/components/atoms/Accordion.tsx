/**
 * Accordion Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Accordion pour afficher/masquer du contenu avec animation
 */

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface AccordionItemProps extends ViewProps {
  /** Titre de l'item */
  title: string;
  /** Contenu de l'item */
  children: React.ReactNode;
  /** État initial (ouvert/fermé) */
  defaultOpen?: boolean;
  /** Callback quand l'état change */
  onOpenChange?: (open: boolean) => void;
  /** Variant de l'accordion */
  variant?: 'default' | 'outline' | 'ghost';
  /** Désactivé */
  disabled?: boolean;
}

export interface AccordionProps extends ViewProps {
  /** Type d'accordion (single = un seul ouvert, multiple = plusieurs ouverts) */
  type?: 'single' | 'multiple';
  /** Valeur contrôlée (pour usage contrôlé) */
  value?: string | string[];
  /** Callback quand la valeur change */
  onValueChange?: (value: string | string[]) => void;
  /** Enfants (AccordionItem) */
  children: React.ReactNode;
  /** Variant par défaut */
  variant?: 'default' | 'outline' | 'ghost';
  /** Collapsible (peut fermer le dernier item ouvert) */
  collapsible?: boolean;
}

/**
 * AccordionItem - Item individuel de l'accordion
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  onOpenChange,
  variant = 'default',
  disabled = false,
  style,
  ...props
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const height = useSharedValue(defaultOpen ? 1 : 0);
  const rotation = useSharedValue(defaultOpen ? 180 : 0);

  const toggle = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);

    height.value = withSpring(newState ? 1 : 0, {
      damping: 20,
      stiffness: 300,
    });
    rotation.value = withTiming(newState ? 180 : 0, { duration: 200 });
  };

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: height.value,
    maxHeight: height.value === 1 ? 1000 : 0, // 1000px max pour le contenu
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.item, styles[`item_${variant}`], style]} {...props}>
      <Pressable
        onPress={toggle}
        disabled={disabled}
        style={({ pressed }) => [
          styles.trigger,
          disabled && styles.trigger_disabled,
          pressed && !disabled && styles.trigger_pressed,
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={animatedIconStyle}>
          <Text style={styles.icon}>▼</Text>
        </Animated.View>
      </Pressable>

      <AnimatedView style={[styles.content, animatedContentStyle]}>
        <View style={styles.contentInner}>{children}</View>
      </AnimatedView>
    </View>
  );
}

AccordionItem.displayName = 'AccordionItem';

/**
 * Accordion - Conteneur principal
 */
export default function Accordion({
  type = 'single',
  value,
  onValueChange,
  children,
  variant = 'default',
  collapsible = false,
  style,
  ...props
}: AccordionProps) {
  // Pour usage non-contrôlé simple, on laisse les items gérer leur état
  // Pour usage contrôlé, on peut implémenter la logique ici

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

Accordion.displayName = 'Accordion';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    width: '100%',
    marginBottom: spacing.xs,
  },
  item_default: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  item_outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  item_ghost: {
    backgroundColor: colors.transparent,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  trigger_disabled: {
    opacity: 0.5,
  },
  trigger_pressed: {
    opacity: 0.8,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
  },
  icon: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
});
