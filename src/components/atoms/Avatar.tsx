/**
 * Avatar Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Avatar pour afficher des images de profil avec fallback
 */

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ViewProps, ImageSourcePropType } from 'react-native';
import { colors, radii, typography } from '../../theme';

export interface AvatarProps extends ViewProps {
  /** Source de l'image (URI ou require) */
  source?: ImageSourcePropType | { uri: string };
  /** Nom complet pour générer les initiales */
  name?: string;
  /** Taille de l'avatar */
  size?: 'sm' | 'default' | 'lg' | 'xl';
  /** Variant de couleur du fallback */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'muted';
  /** Texte du fallback (override les initiales) */
  fallbackText?: string;
}

export default function Avatar({
  source,
  name,
  size = 'default',
  variant = 'primary',
  fallbackText,
  style,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName?: string): string => {
    if (fallbackText) return fallbackText;
    if (!fullName) return '?';

    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !source || imageError;

  return (
    <View
      style={[styles.base, styles[`size_${size}`], showFallback && styles[`fallback_${variant}`], style]}
      {...props}
    >
      {!showFallback ? (
        <Image
          source={source!}
          style={[styles.image, styles[`size_${size}`]]}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.fallbackText, styles[`fallbackText_${size}`]]}>{getInitials(name)}</Text>
      )}
    </View>
  );
}

Avatar.displayName = 'Avatar';

/**
 * AvatarGroup - Groupe d'avatars empilés
 */
export interface AvatarGroupProps extends ViewProps {
  /** Avatars à afficher */
  children: React.ReactNode;
  /** Nombre maximum d'avatars visibles */
  max?: number;
  /** Taille des avatars */
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

export function AvatarGroup({ children, max = 3, size = 'default', style, ...props }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <View style={[styles.group, style]} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <View key={index} style={[styles.groupItem, index > 0 && styles[`groupItemOffset_${size}`]]}>
          {avatar}
        </View>
      ))}
      {remaining > 0 && (
        <Avatar size={size} variant="muted" fallbackText={`+${remaining}`} style={styles[`groupItemOffset_${size}`]} />
      )}
    </View>
  );
}

AvatarGroup.displayName = 'AvatarGroup';

const styles = StyleSheet.create({
  // Base
  base: {
    borderRadius: radii.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.muted,
  },

  // Sizes
  size_sm: {
    width: 32,
    height: 32,
  },
  size_default: {
    width: 40,
    height: 40,
  },
  size_lg: {
    width: 56,
    height: 56,
  },
  size_xl: {
    width: 80,
    height: 80,
  },

  // Image
  image: {
    borderRadius: radii.full,
  },

  // Fallback variants
  fallback_primary: {
    backgroundColor: colors.primary,
  },
  fallback_secondary: {
    backgroundColor: colors.secondary,
  },
  fallback_success: {
    backgroundColor: colors.success,
  },
  fallback_warning: {
    backgroundColor: colors.warning,
  },
  fallback_muted: {
    backgroundColor: colors.muted,
  },

  // Fallback text
  fallbackText: {
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.white,
    textAlign: 'center',
  },

  fallbackText_sm: {
    fontSize: typography.fontSize.caption,
  },
  fallbackText_default: {
    fontSize: typography.fontSize.body,
  },
  fallbackText_lg: {
    fontSize: typography.fontSize.titleMd,
  },
  fallbackText_xl: {
    fontSize: typography.fontSize.headingLg,
  },

  // Group
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  groupItem: {
    borderWidth: 2,
    borderColor: colors.background,
    borderRadius: radii.full,
  },

  // Group offsets (overlap)
  groupItemOffset_sm: {
    marginLeft: -12,
  },
  groupItemOffset_default: {
    marginLeft: -16,
  },
  groupItemOffset_lg: {
    marginLeft: -20,
  },
  groupItemOffset_xl: {
    marginLeft: -28,
  },
});
