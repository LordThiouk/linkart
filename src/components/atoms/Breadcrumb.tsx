/**
 * Breadcrumb Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Breadcrumb pour navigation hiérarchique
 * Adapté pour mobile avec scroll horizontal
 */

import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, ViewProps, TextProps } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export interface BreadcrumbItemData {
  /** Label de l'item */
  label: string;
  /** Callback quand l'item est pressé */
  onPress?: () => void;
  /** Item actif (dernier) */
  isActive?: boolean;
}

export interface BreadcrumbProps extends ViewProps {
  /** Items du breadcrumb */
  items: BreadcrumbItemData[];
  /** Variant du breadcrumb */
  variant?: 'default' | 'compact';
  /** Séparateur personnalisé */
  separator?: React.ReactNode;
  /** Maximum d'items à afficher (ellipsis si plus) */
  maxItems?: number;
}

/**
 * BreadcrumbItem - Item individuel
 */
export interface BreadcrumbItemProps {
  /** Label */
  label: string;
  /** Callback */
  onPress?: () => void;
  /** Actif */
  isActive?: boolean;
  style?: TextProps['style'];
}

export function BreadcrumbItem({ label, onPress, isActive = false, style, ...props }: BreadcrumbItemProps) {
  if (isActive) {
    return (
      <Text style={[styles.item, styles.item_active, style]} {...props}>
        {label}
      </Text>
    );
  }

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text style={[styles.item, styles.item_link, style]} {...props}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Text style={[styles.item, style]} {...props}>
      {label}
    </Text>
  );
}

BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * BreadcrumbSeparator - Séparateur entre les items
 */
export interface BreadcrumbSeparatorProps extends ViewProps {
  /** Contenu personnalisé */
  children?: React.ReactNode;
}

export function BreadcrumbSeparator({ children, style, ...props }: BreadcrumbSeparatorProps) {
  return (
    <View style={[styles.separator, style]} {...props}>
      {children || <Text style={styles.separatorText}>›</Text>}
    </View>
  );
}

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Breadcrumb - Composant principal
 */
export default function Breadcrumb({
  items,
  variant = 'default',
  separator,
  maxItems,
  style,
  ...props
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  // Limiter le nombre d'items si maxItems est défini
  const displayItems =
    maxItems && items.length > maxItems
      ? [items[0], { label: '...', isActive: false } as BreadcrumbItemData, ...items.slice(-(maxItems - 2))]
      : items;

  return (
    <View style={[styles.container, style]} {...props}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem label={item.label} onPress={item.onPress} isActive={item.isActive} />
            {index < displayItems.length - 1 && (separator || <BreadcrumbSeparator />)}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

Breadcrumb.displayName = 'Breadcrumb';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  item: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
  },
  item_link: {
    color: colors.primary,
  },
  item_active: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.inter.medium,
  },
  separator: {
    marginHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
