# 📱 Plan de Migration Figma UI → React Native

> **Version**: v4.0  
> **Date**: 10 Novembre 2025  
> **Objectif**: Migrer tous les composants UI Figma (Web/Tailwind) vers React Native avec **Design
> System centralisé**
>
> **📋 NOUVEAU PLAN** : Voir `FIGMA_TO_RN_MIGRATION_PLAN_V4.md` pour le plan mis à jour avec les
> composants restants
>
> **⚠️ MISE À JOUR v3.0** : Abandon de NativeWind au profit d'une approche **Design Tokens + Style
> Helpers**
>
> **✅ Conformité Design** : **100%** avec `figma/styles/globals.css` — Voir
> `DESIGN_TOKENS_AUDIT.md`
>
> **Découverte** : Après inventaire complet, **47 composants sont déjà migrés** (11 UI + 36 screens)
> ! Ce document a été mis à jour pour refléter l'état actuel et la **nouvelle stratégie de
> styling**.

---

## 🎉 DÉCOUVERTE MAJEURE : ~80% déjà migré

### Composants Déjà Migrés avec StyleSheet + Reanimated ✅

**11 Composants UI** (suffixe `*Figma.tsx`) :

- 5 Atoms : BeatCard, BoostCard, CategoryChip, ProductCard, RoleCard
- 5 Molecules : OnboardingCarousel, OnboardingSlide, PlaylistCard, RatingStars, ServiceCard
- 1 Organism : BottomNavigation

**36 Screens** :

- 22 Screens Figma complets (Welcome, Login, Home, Marketplace, Checkout, etc.)
- 14 Screens additionnels (SplashScreen, PlaylistDetail, ProductDetail, etc.)

**Voir détails complets** → `docs/internal/FIGMA_MIGRATED_STATUS.md`

---

## 📊 État des Lieux

### Composants Figma UI (Web - `figma/components/ui/`)

**Total**: 48 composants UI ShadCN/Tailwind

<details>
<summary>Liste complète des composants Figma</summary>

1. ✅ accordion.tsx
2. ✅ alert-dialog.tsx
3. ✅ alert.tsx
4. ✅ aspect-ratio.tsx
5. ✅ avatar.tsx
6. ✅ badge.tsx
7. ✅ breadcrumb.tsx
8. ✅ button.tsx
9. ✅ calendar.tsx
10. ✅ card.tsx
11. ✅ carousel.tsx
12. ✅ chart.tsx
13. ✅ checkbox.tsx
14. ✅ collapsible.tsx
15. ✅ command.tsx
16. ✅ context-menu.tsx
17. ✅ dialog.tsx
18. ✅ drawer.tsx
19. ✅ dropdown-menu.tsx
20. ✅ form.tsx
21. ✅ hover-card.tsx
22. ✅ input-otp.tsx
23. ✅ input.tsx
24. ✅ label.tsx
25. ✅ menubar.tsx
26. ✅ navigation-menu.tsx
27. ✅ pagination.tsx
28. ✅ popover.tsx
29. ✅ progress.tsx
30. ✅ radio-group.tsx
31. ✅ resizable.tsx
32. ✅ scroll-area.tsx
33. ✅ select.tsx
34. ✅ separator.tsx
35. ✅ sheet.tsx
36. ✅ sidebar.tsx
37. ✅ skeleton.tsx
38. ✅ slider.tsx
39. ✅ sonner.tsx (toast)
40. ✅ switch.tsx
41. ✅ table.tsx
42. ✅ tabs.tsx
43. ✅ textarea.tsx
44. ✅ toggle-group.tsx
45. ✅ toggle.tsx
46. ✅ tooltip.tsx
47. ✅ use-mobile.ts (hook)
48. ✅ utils.ts (cn helper)

</details>

### Composants React Native Actuels (`src/components/atoms/`)

**Total**: ~35 composants déjà créés

<details>
<summary>Liste des composants atoms/ existants</summary>

1. ✅ Avatar.tsx + stories
2. ✅ Badge.tsx + stories
3. ✅ BeatCardFigma.tsx + stories
4. ✅ BoostCardFigma.tsx + stories
5. ✅ Button.tsx + stories
6. ✅ CategoryChipFigma.tsx + stories
7. ✅ CenteredContent.tsx
8. ✅ Container.tsx + stories
9. ✅ Divider.tsx + stories
10. ✅ HeartIcon.tsx + stories
11. ✅ Icon.tsx + stories
12. ✅ ImageWithFallback.tsx + stories
13. ✅ Input.tsx + stories
14. ✅ InputField.tsx + stories
15. ✅ ListItem.tsx + stories
16. ✅ LoadingSpinner.tsx + stories
17. ✅ Logo.tsx + stories
18. ✅ PlayButton.tsx + stories
19. ✅ PrimaryButton.tsx + stories
20. ✅ ProfileImage.tsx + stories
21. ✅ RatingStars.tsx + stories
22. ✅ SafeArea.tsx + stories
23. ✅ SearchInput.tsx + stories
24. ✅ SecondaryButton.tsx + stories
25. ✅ Select.tsx + stories
26. ✅ ServiceCategoryChip.tsx + stories
27. ✅ Spacer.tsx + stories
28. ✅ StatusIndicator.tsx + stories
29. ✅ TabsNavigation.tsx + stories
30. ✅ TagChip.tsx + stories
31. ✅ TextArea.tsx + stories
32. ✅ Title.tsx + stories
33. ✅ WaveformVisualizer.tsx + stories
34. ✅ Checkbox.tsx + stories
35. ✅ Switch.tsx + stories

</details>

---

## 🎯 Stratégie de Migration v3.0

### Principe : Design System Centralisé

**Pourquoi abandonner NativeWind ?**

- ❌ Incompatibilités avec Storybook Web
- ❌ Complexité de configuration (Babel, PostCSS, Vite)
- ❌ Maintenance difficile avec StyleSheet existant
- ✅ **Approche hybride tokens + StyleSheet** = simplicité + performance

**Nouvelle approche** : Design Tokens centralisés + Style Helpers réutilisables

- ✅ **Un seul fichier** de tokens pour toute l'app
- ✅ **Helpers de style** pour variants (Button, Card, etc.)
- ✅ **Compatible** Storybook Web + React Native
- ✅ **Maintenable** : changer 1 couleur = impact global
- ✅ **Performant** : StyleSheet.create natif

---

## 🏗️ Architecture du Design System

### Structure des fichiers

```
src/theme/
├── index.ts              # Export tout
├── colors.ts             # Palette complète Figma
├── spacing.ts            # xs, sm, md, lg, xl, 2xl
├── typography.ts         # fontSize, fontWeight, fontFamily
├── radii.ts              # borderRadius variants
├── shadows.ts            # shadowColor, shadowOffset, elevation
└── helpers.ts            # Fonctions de style réutilisables
```

---

## 📦 Contenu des Tokens

### 1. Colors (`src/theme/colors.ts`)

✅ **100% conforme avec `figma/styles/globals.css`** — Voir `DESIGN_TOKENS_AUDIT.md`

```typescript
export const colors = {
  // Background
  background: '#0A0A0A',
  surface: '#111111',
  surfaceElevated: '#1A1A1A',
  border: '#404040',

  // Brand - Primary
  primary: '#6366F1',
  primaryDark: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryForeground: '#FFFFFF',

  // Brand - Secondary
  secondary: '#F59E0B', // ✅ Orange doré (conforme Figma)
  secondaryForeground: '#0A0A0A',

  // Accents
  accent: '#EC4899',
  accentForeground: '#F5F5F5',
  golden: '#F59E0B',
  pink: '#EC4899',
  cyan: '#06B6D4',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  destructiveForeground: '#FFFFFF',

  // Muted
  muted: '#1A1A1A',
  mutedForeground: '#A3A3A3',

  // Text
  foreground: '#F5F5F5',
  textPrimary: '#F5F5F5',
  textSecondary: '#D4D4D4',
  textMuted: '#A3A3A3',

  // Focus & Interactive
  ring: '#6366F1',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.8)',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};
```

### 2. Spacing (`src/theme/spacing.ts`)

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### 3. Typography (`src/theme/typography.ts`)

```typescript
export const typography = {
  // Font Families
  fontFamily: {
    poppins: {
      bold: 'Poppins_700Bold',
      semibold: 'Poppins_600SemiBold',
      medium: 'Poppins_500Medium',
    },
    inter: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
    },
  },

  // Font Sizes
  fontSize: {
    displayXl: 32,
    headingLg: 24,
    titleMd: 18,
    body: 16,
    label: 14,
    caption: 12,
  },

  // Font Weights (pour les styles)
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

### 4. Border Radius (`src/theme/radii.ts`)

```typescript
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};
```

### 5. Shadows (`src/theme/shadows.ts`)

```typescript
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
```

### 6. Style Helpers (`src/theme/helpers.ts`)

```typescript
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';

// Helper pour créer des styles de bouton
export const createButtonStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost',
  size: 'sm' | 'default' | 'lg' = 'default'
) => {
  const baseStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: radii.xxl,
  };

  const sizeStyles = {
    sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
    default: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
    lg: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  };

  const variantStyles = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.surfaceElevated },
    outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.border },
    ghost: { backgroundColor: 'transparent' },
  };

  return StyleSheet.create({
    container: {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    },
  });
};

// Helper pour créer des styles de texte
export const createTextStyle = (variant: 'h1' | 'h2' | 'body' | 'caption') => {
  const variantStyles = {
    h1: {
      fontSize: typography.fontSize.displayXl,
      fontFamily: typography.fontFamily.poppins.bold,
      color: colors.textPrimary,
    },
    h2: {
      fontSize: typography.fontSize.headingLg,
      fontFamily: typography.fontFamily.poppins.semibold,
      color: colors.textPrimary,
    },
    body: {
      fontSize: typography.fontSize.body,
      fontFamily: typography.fontFamily.inter.regular,
      color: colors.textSecondary,
    },
    caption: {
      fontSize: typography.fontSize.caption,
      fontFamily: typography.fontFamily.inter.medium,
      color: colors.textMuted,
    },
  };

  return StyleSheet.create({
    text: variantStyles[variant],
  });
};
```

---

## 📋 Plan de Migration par Priorité

### 🔴 Phase 1 : Composants Critiques (MVP) - **1 semaine**

#### Groupe A : Composants de Base (Jour 1-2) ✅ **COMPLÉTÉ 100%**

| Composant Figma | État | Composant RN              | Action                                        | Statut      |
| --------------- | ---- | ------------------------- | --------------------------------------------- | ----------- |
| `button.tsx`    | ✅   | `Button.tsx`              | ✅ Migré + variants (destructive, link, icon) | ✅ **100%** |
| `input.tsx`     | ✅   | `Input.tsx`               | ✅ Créé avec Design Tokens                    | ✅ **100%** |
| `card.tsx`      | ✅   | `Card.tsx` + `CardAction` | ✅ Créé avec tous sub-components              | ✅ **100%** |
| `label.tsx`     | ✅   | `Label.tsx`               | ✅ Créé avec variants                         | ✅ **100%** |
| `separator.tsx` | ✅   | `Separator.tsx`           | ✅ Renommé depuis Divider                     | ✅ **100%** |
| `textarea.tsx`  | ✅   | `TextArea.tsx`            | ✅ Créé avec compteur                         | ✅ **100%** |

**✅ Résultat Jour 1-2 (COMPLÉTÉ)** :

```bash
# Composants créés avec Design System v2.0
✅ src/components/atoms/Button.tsx (6 variants, 4 sizes)
✅ src/components/atoms/Input.tsx (label, error, icons)
✅ src/components/atoms/Card.tsx (7 sub-components dont CardAction)
✅ src/components/atoms/Label.tsx (4 variants, required)
✅ src/components/atoms/TextArea.tsx (compteur, error)
✅ src/components/atoms/Separator.tsx (horizontal/vertical)

# Storybook stories créées
✅ Button.stories.tsx (13 stories)
✅ Input.stories.tsx (14 stories)
✅ Card.stories.tsx (10 stories dont WithCardAction)
✅ Label.stories.tsx (10 stories)
✅ TextArea.stories.tsx (13 stories)
✅ Separator.stories.tsx (10 stories)

# Conformité Figma: 100% ✅
```

#### Groupe B : Navigation & Feedback (Jour 3-4) ✅ **COMPLÉTÉ 100%**

| Composant Figma | État        | Composant RN         | Action                               | Statut      |
| --------------- | ----------- | -------------------- | ------------------------------------ | ----------- |
| `badge.tsx`     | ✅          | `Badge.tsx`          | ✅ Migré avec Design Tokens          | ✅ **100%** |
| `avatar.tsx`    | ✅          | `Avatar.tsx`         | ✅ Migré avec variants + AvatarGroup | ✅ **100%** |
| `alert.tsx`     | ✅          | `Alert.tsx`          | ✅ Créé avec 5 variants              | ✅ **100%** |
| `skeleton.tsx`  | ✅          | `Skeleton.tsx`       | ✅ Créé avec animations              | ✅ **100%** |
| `progress.tsx`  | ✅          | `Progress.tsx`       | ✅ Créé avec 5 variants              | ✅ **100%** |
| `tabs.tsx`      | 🟡 Existant | `TabsNavigation.tsx` | ⏳ À migrer (Phase 2)                | P2          |

**✅ Résultat Jour 3-4 (COMPLÉTÉ)** :

```bash
# Composants créés avec Design System v2.0
✅ src/components/atoms/Badge.tsx (7 variants, 3 sizes)
✅ src/components/atoms/Avatar.tsx (5 variants + AvatarGroup)
✅ src/components/atoms/Alert.tsx (5 variants)
✅ src/components/atoms/Skeleton.tsx (3 variants + animations)
✅ src/components/atoms/Progress.tsx (5 variants, 3 sizes)

# Storybook stories créées
✅ Badge.stories.tsx (17 stories)
✅ Avatar.stories.tsx (18 stories)
✅ Alert.stories.tsx (12 stories)
✅ Skeleton.stories.tsx (6 stories)
✅ Progress.stories.tsx (14 stories)

# Conformité Figma: 100% ✅
```

#### Groupe C : Formulaires (Jour 5-6) ✅ **COMPLÉTÉ 100%**

| Composant Figma   | État | Composant RN     | Action                    | Statut      |
| ----------------- | ---- | ---------------- | ------------------------- | ----------- |
| `checkbox.tsx`    | ✅   | `Checkbox.tsx`   | ✅ Créé avec 3 variants   | ✅ **100%** |
| `switch.tsx`      | ✅   | `Switch.tsx`     | ✅ Créé avec 3 variants   | ✅ **100%** |
| `radio-group.tsx` | ✅   | `RadioGroup.tsx` | ✅ Créé avec orientations | ✅ **100%** |
| `select.tsx`      | ✅   | `Select.tsx`     | ✅ Créé avec modal        | ✅ **100%** |
| `slider.tsx`      | ✅   | `Slider.tsx`     | ✅ Créé avec gestures     | ✅ **100%** |
| `input-otp.tsx`   | ✅   | `InputOTP.tsx`   | ✅ Créé avec auto-focus   | ✅ **100%** |

**✅ Résultat Jour 5-6 (COMPLÉTÉ 100%)** :

```bash
# Composants créés avec Design System v2.0
✅ src/components/atoms/Checkbox.tsx (3 variants, 3 sizes)
✅ src/components/atoms/Switch.tsx (3 variants, 3 sizes)
✅ src/components/atoms/RadioGroup.tsx (3 variants, 2 orientations)
✅ src/components/atoms/Select.tsx (modal-based, 2 variants, 3 sizes)
✅ src/components/atoms/Slider.tsx (gesture-based, 3 variants)
✅ src/components/atoms/InputOTP.tsx (auto-focus, configurable length)

# Storybook stories créées
✅ Checkbox.stories.tsx (19 stories)
✅ Switch.stories.tsx (18 stories)
✅ RadioGroup.stories.tsx (17 stories)
✅ Select.stories.tsx (17 stories)
✅ Slider.stories.tsx (9 stories)
✅ InputOTP.stories.tsx (13 stories)

# Conformité Figma: 100% ✅
# Total: 6 composants, 93 stories
```

#### Groupe D : Overlays (Jour 7) ✅ **COMPLÉTÉ 100%**

| Composant Figma    | État | Composant RN      | Action                     | Statut      |
| ------------------ | ---- | ----------------- | -------------------------- | ----------- |
| `dialog.tsx`       | ✅   | `Dialog.tsx`      | ✅ Créé avec animations    | ✅ **100%** |
| `sheet.tsx`        | ✅   | `Sheet.tsx`       | ✅ Créé avec gestures      | ✅ **100%** |
| `popover.tsx`      | ✅   | `Popover.tsx`     | ✅ Créé avec state control | ✅ **100%** |
| `tooltip.tsx`      | ✅   | `Tooltip.tsx`     | ✅ Créé avec long press    | ✅ **100%** |
| `alert-dialog.tsx` | ✅   | `AlertDialog.tsx` | ✅ Créé (variant Dialog)   | ✅ **100%** |

**✅ Résultat Jour 7 (COMPLÉTÉ 100%)** :

```bash
# Composants créés avec Design System v2.0
✅ src/components/atoms/Dialog.tsx (5 sub-components)
✅ src/components/atoms/Sheet.tsx (5 sub-components + gestures)
✅ src/components/atoms/Tooltip.tsx (long press + animations)
✅ src/components/atoms/Popover.tsx (2 sub-components + state control)
✅ src/components/atoms/AlertDialog.tsx (5 sub-components + no backdrop close)

# Storybook stories créées
✅ Dialog.stories.tsx (8 stories)
✅ Sheet.stories.tsx (8 stories)
✅ Tooltip.stories.tsx (11 stories)
✅ Popover.stories.tsx (10 stories)
✅ AlertDialog.stories.tsx (8 stories)

# Conformité Figma: 100% ✅
# Total: 5 composants, 18 sub-components, 45 stories
```

---

### 🟡 Phase 2 : Composants Avancés - **1 semaine**

| Composant Figma  | État | Composant RN     | Action                                    | Statut      |
| ---------------- | ---- | ---------------- | ----------------------------------------- | ----------- |
| `accordion.tsx`  | ✅   | `Accordion.tsx`  | ✅ Créé avec animations Reanimated        | ✅ **100%** |
| `table.tsx`      | ✅   | `Table.tsx`      | ✅ Créé avec FlatList + scroll horizontal | ✅ **100%** |
| `carousel.tsx`   | ✅   | `Carousel.tsx`   | ✅ Créé avec Reanimated + auto-play       | ✅ **100%** |
| `calendar.tsx`   | ✅   | `Calendar.tsx`   | ✅ Créé avec navigation mois/année        | ✅ **100%** |
| `pagination.tsx` | ✅   | `Pagination.tsx` | ✅ Créé avec ellipsis                     | ✅ **100%** |
| `breadcrumb.tsx` | ✅   | `Breadcrumb.tsx` | ✅ Créé adapté mobile avec scroll         | ✅ **100%** |

**✅ Résultat Phase 2 (6/6 COMPLÉTÉ 100%)** :

```bash
# Composants créés avec Design System v2.0
✅ src/components/atoms/Accordion.tsx (3 variants, animations Reanimated)
✅ src/components/atoms/Table.tsx (FlatList, scroll horizontal, sticky columns)
✅ src/components/atoms/Carousel.tsx (Reanimated, auto-play, indicators)
✅ src/components/atoms/Calendar.tsx (navigation mois/année, range mode, min/max dates)
✅ src/components/atoms/Pagination.tsx (ellipsis, siblingCount, navigation)
✅ src/components/atoms/Breadcrumb.tsx (scroll horizontal, maxItems, custom separator)

# Storybook stories créées
✅ Accordion.stories.tsx (7 stories)
✅ Table.stories.tsx (8 stories)
✅ Carousel.stories.tsx (7 stories)
✅ Calendar.stories.tsx (6 stories)
✅ Pagination.stories.tsx (7 stories)
✅ Breadcrumb.stories.tsx (7 stories)

# Conformité Figma: 100% ✅
# Total: 6 composants, 42 stories
```

---

### 🟢 Phase 3 : Composants Optionnels - **3-5 jours**

| Composant Figma       | État        | Action                          | Priorité    |
| --------------------- | ----------- | ------------------------------- | ----------- |
| `command.tsx`         | ❌ Manquant | Non applicable mobile           | P4          |
| `context-menu.tsx`    | ❌ Manquant | Long press menu                 | P3          |
| `dropdown-menu.tsx`   | ❌ Manquant | Créer                           | P3          |
| `hover-card.tsx`      | ❌ Manquant | Non applicable mobile           | P4          |
| `menubar.tsx`         | ❌ Manquant | Adapter                         | P3          |
| `navigation-menu.tsx` | ❌ Manquant | Adapter                         | P3          |
| `resizable.tsx`       | ❌ Manquant | Non applicable mobile           | P4          |
| `scroll-area.tsx`     | ❌ Manquant | ScrollView natif                | P4          |
| `sidebar.tsx`         | ❌ Manquant | Drawer navigation               | P3          |
| `toggle-group.tsx`    | ❌ Manquant | Créer                           | P3          |
| `toggle.tsx`          | ❌ Manquant | Créer                           | P3          |
| `chart.tsx`           | ❌ Manquant | Utiliser react-native-chart-kit | P3          |
| `collapsible.tsx`     | ❌ Manquant | Créer                           | P3          |
| `form.tsx`            | ❌ Manquant | Créer avec react-hook-form      | P2          |
| `sonner.tsx` (toast)  | ✅          | `Toast.tsx` - Créé avec Design  | ✅ **100%** |
|                       |             | Tokens + animations             |             |

---

## 🛠️ Méthodologie de Migration v3.0

### 1. Template de Composant avec Design Tokens

```typescript
// src/components/atoms/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  children,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withTiming(1.02, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        animatedStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.primary} />
      ) : children ? (
        children
      ) : (
        <Text style={[styles.text, styles[`text_${variant}`]]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  // Base
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xxl,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceElevated,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  size_sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  size_default: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  size_lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },

  // Text
  text: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  text_primary: {
    color: '#FFFFFF',
  },
  text_secondary: {
    color: colors.textSecondary,
  },
  text_outline: {
    color: colors.textPrimary,
  },
  text_ghost: {
    color: colors.textPrimary,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
});
```

### 2. Template Storybook

```typescript
// src/components/atoms/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        backgroundColor: '#0A0A0A', // background dark
      }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    onPress: () => console.log('Pressed'),
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    onPress: () => console.log('Pressed'),
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline Button',
    onPress: () => console.log('Pressed'),
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    title: 'Ghost Button',
    onPress: () => console.log('Pressed'),
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Button',
    onPress: () => console.log('Pressed'),
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Button',
    onPress: () => console.log('Pressed'),
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    onPress: () => console.log('Pressed'),
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Button',
    onPress: () => console.log('Pressed'),
    loading: true,
  },
};
```

### 3. Checklist par Composant

Pour chaque composant migré :

- [ ] Lire composant Figma source (`figma/components/ui/`)
- [ ] Identifier les variants et props
- [ ] Créer fichier RN avec StyleSheet + Design Tokens
- [ ] Utiliser les tokens `colors`, `spacing`, `radii`, `typography`
- [ ] Créer Storybook story avec decorators
- [ ] Tester visuellement dans Storybook
- [ ] Tester sur iOS et Android (Expo Go)
- [ ] Documenter les différences avec web
- [ ] Commit avec message descriptif (`feat(atoms): add Button with design tokens`)

---

## 📦 Dépendances

### Déjà installées ✅

```bash
npm list react-native-reanimated  # Animations
npm list @storybook/react-native-web-vite  # Storybook Web
```

### Optionnelles (selon composant)

```bash
npm install @gorhom/bottom-sheet     # Bottom sheets (Dialog, Sheet)
npm install react-native-gesture-handler  # Gestures (Drawer, Swipe)
npm install react-native-svg         # Icons personnalisés
```

### ⚠️ NE PAS installer

```bash
# ❌ RETIRÉES - Incompatibles avec Storybook
# nativewind
# class-variance-authority
# clsx
# tailwind-merge
```

---

## 🎨 Guides de Référence

1. **REACT_NATIVE_CONVERSION_GUIDE.md** - Guide complet web → RN
2. **REACT_NATIVE_STYLING_GUIDE.md** - Guide Tailwind → StyleSheet
3. **REACT_NATIVE_SCREENS_CONVERSION.md** - Conversion des écrans

---

## ✅ Critères de Succès

### Pour chaque composant migré

- ✅ Fonctionne sur iOS et Android
- ✅ Respecte le design Figma (couleurs, spacing, typography)
- ✅ A une story Storybook
- ✅ Utilise NativeWind + design tokens
- ✅ Est testé visuellement
- ✅ Est documenté

### Pour le projet global

- ✅ 100% des composants P0 et P1 migrés
- ✅ Design system unifié (tokens partagés)
- ✅ Storybook Web fonctionnel
- ✅ Documentation à jour
- ✅ Pas de duplication de code

---

## 📈 Timeline Globale

| Phase                    | Durée       | Composants               | Livrables              |
| ------------------------ | ----------- | ------------------------ | ---------------------- |
| **Phase 1 (MVP)**        | 1 semaine   | 24 composants critiques  | Base app fonctionnelle |
| **Phase 2 (Avancés)**    | 1 semaine   | 6 composants avancés     | Features complètes     |
| **Phase 3 (Optionnels)** | 3-5 jours   | 15 composants optionnels | App polie              |
| **Total**                | ~3 semaines | **48 composants**        | **App complète**       |

---

## 🚀 Prochaines Étapes Immédiates (v3.0)

### � **AUJOURD'HUI - Setup Design System**

#### 1. Créer l'infrastructure des tokens

```bash
src/theme/
├── index.ts       # ⬅️ Export tout
├── colors.ts      # ⬅️ Palette Figma complète
├── spacing.ts     # ⬅️ xs, sm, md, lg, xl, xxl
├── typography.ts  # ⬅️ fontSize, fontFamily, lineHeight
├── radii.ts       # ⬅️ borderRadius variants
├── shadows.ts     # ⬅️ shadow + elevation
└── helpers.ts     # ⬅️ createButtonStyle, createTextStyle
```

#### 2. Créer Button de test

```bash
src/components/atoms/
├── Button.tsx         # ⬅️ Nouveau (avec design tokens)
└── Button.stories.tsx # ⬅️ Stories complètes (Primary, Secondary, etc.)
```

#### 3. Tester dans Storybook

```bash
npm run storybook
# Vérifier que Button s'affiche avec les bonnes couleurs Figma
```

---

### ✅ Critères de Succès Jour 1

- [ ] Design tokens complets dans `src/theme/`
- [ ] Button avec 4 variants (primary, secondary, outline, ghost)
- [ ] Button avec 3 sizes (sm, default, lg)
- [ ] Button avec animations (scale on press)
- [ ] Button avec états (loading, disabled)
- [ ] 8 stories Storybook fonctionnelles
- [ ] Couleurs exactes du Figma (#6366F1 primary, etc.)

---

### � **JOUR 2-3 - Composants de Base**

1. Créer `Input.tsx` (unifier Input + InputField)
2. Créer `Card.tsx` + sous-composants
3. Créer `Label.tsx`
4. Migrer `TextArea.tsx` avec tokens

---

### � **JOUR 4-7 - Phase 1 MVP**

Continuer selon le plan Phase 1 (24 composants critiques).

---

## � Validation Continue

À chaque composant créé, vérifier :

- ✅ Utilise `colors`, `spacing`, `radii`, `typography` de `src/theme/`
- ✅ Aucun hardcoded color/spacing dans StyleSheet
- ✅ Story Storybook avec tous les variants
- ✅ Animations fluides (Reanimated)
- ✅ Compatible iOS + Android + Storybook Web

---

**👉 Dis "ACT" pour que je crée le Design System maintenant !** 🎯
