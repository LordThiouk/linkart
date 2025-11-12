/**
 * Pagination Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Pagination pour naviguer entre les pages
 * Optimisé pour mobile avec ellipsis
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface PaginationProps extends ViewProps {
  /** Page actuelle (1-indexed) */
  currentPage: number;
  /** Nombre total de pages */
  totalPages: number;
  /** Callback quand la page change */
  onPageChange: (page: number) => void;
  /** Nombre de pages à afficher de chaque côté de la page actuelle */
  siblingCount?: number;
  /** Variant du pagination */
  variant?: 'default' | 'compact';
  /** Désactivé */
  disabled?: boolean;
}

/**
 * Pagination - Composant principal
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  variant = 'default',
  disabled = false,
  style,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Générer les numéros de page à afficher
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const totalNumbers = siblingCount * 2 + 5; // siblingCount de chaque côté + current + first + last + 2 ellipsis

    if (totalPages <= totalNumbers) {
      // Afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      // Première page
      pages.push(1);

      // Ellipsis gauche
      if (shouldShowLeftEllipsis) {
        pages.push('ellipsis');
      }

      // Pages autour de la page actuelle
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Ellipsis droite
      if (shouldShowRightEllipsis) {
        pages.push('ellipsis');
      }

      // Dernière page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePagePress = (page: number) => {
    if (page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  return (
    <View style={[styles.container, style]} {...props}>
      {/* Bouton Précédent */}
      <Pressable
        onPress={handlePrevious}
        disabled={disabled || currentPage === 1}
        style={({ pressed }) => [
          styles.button,
          styles.navButton,
          (disabled || currentPage === 1) && styles.button_disabled,
          pressed && !disabled && styles.button_pressed,
        ]}
      >
        <Text style={[styles.navText, (disabled || currentPage === 1) && styles.text_disabled]}>‹</Text>
      </Pressable>

      {/* Numéros de page */}
      <View style={styles.pages}>
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <View key={`ellipsis-${index}`} style={styles.ellipsis}>
                <Text style={styles.ellipsisText}>⋯</Text>
              </View>
            );
          }

          const isActive = page === currentPage;
          return (
            <Pressable
              key={page}
              onPress={() => handlePagePress(page)}
              disabled={disabled}
              style={({ pressed }) => [
                styles.button,
                styles.pageButton,
                isActive && styles.pageButton_active,
                pressed && !disabled && !isActive && styles.button_pressed,
              ]}
            >
              <Text style={[styles.pageText, isActive && styles.pageText_active, disabled && styles.text_disabled]}>
                {page}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Bouton Suivant */}
      <Pressable
        onPress={handleNext}
        disabled={disabled || currentPage === totalPages}
        style={({ pressed }) => [
          styles.button,
          styles.navButton,
          (disabled || currentPage === totalPages) && styles.button_disabled,
          pressed && !disabled && styles.button_pressed,
        ]}
      >
        <Text style={[styles.navText, (disabled || currentPage === totalPages) && styles.text_disabled]}>›</Text>
      </Pressable>
    </View>
  );
}

Pagination.displayName = 'Pagination';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  button: {
    minWidth: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  navButton: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
  },
  pageButton: {
    backgroundColor: colors.transparent,
    minWidth: 40,
  },
  pageButton_active: {
    backgroundColor: colors.primary,
  },
  button_disabled: {
    opacity: 0.5,
  },
  button_pressed: {
    opacity: 0.8,
  },
  navText: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  pageText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
  },
  pageText_active: {
    color: colors.white,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
  text_disabled: {
    color: colors.textMuted,
  },
  ellipsis: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisText: {
    fontSize: 18,
    color: colors.textMuted,
  },
});
