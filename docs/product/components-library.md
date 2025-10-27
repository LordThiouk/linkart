# Linkart — Components Library

> Version: v2.0 Auteur : Papa Diop Objectif : Catalogue complet des composants UI basé sur le design
> system, avec mapping vers les composants existants et spécifications pour les nouveaux composants.

---

## 1. Vue d'ensemble

Cette bibliothèque documente tous les composants UI nécessaires pour implémenter le design Linkart
v2.0, organisés selon l'architecture Atomic Design.

## 2. Architecture des Composants

```
src/components/
├── atoms/           # Primitives de base
├── molecules/       # Composants composés
└── organisms/       # Sections complètes
```

## 3. Atoms (Primitives)

### 3.1 Button

**Composant existant** : `src/components/atoms/Button.tsx`

**Variants nécessaires :**

- `primary` : Bouton principal violet
- `secondary` : Bouton secondaire orange
- `ghost` : Bouton transparent
- `fab` : Bouton flottant circulaire
- `icon` : Bouton icône seulement

**Props :**

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'fab' | 'icon';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children?: React.ReactNode;
  onPress: () => void;
}
```

**Styles :**

```typescript
// Primary button
backgroundColor: colors.primary,
borderRadius: tokens.radii.md,
paddingVertical: tokens.spacing.md,
paddingHorizontal: tokens.spacing.lg,

// FAB button
backgroundColor: colors.primary,
borderRadius: tokens.radii.full,
width: 56,
height: 56,
shadow: tokens.shadows.lg,
```

### 3.2 HeartIcon (NOUVEAU)

**Composant à créer** : `src/components/atoms/HeartIcon.tsx`

**Usage :** Toggle favorite sur Product Cards et Mini Player

**Props :**

```typescript
interface HeartIconProps {
  isFavorite: boolean;
  size?: number;
  onToggle: () => void;
  disabled?: boolean;
}
```

**États visuels :**

- **Outline** : `colors.dark['400']` - Non favori
- **Filled** : `colors.music.pink` (#EC4899) - Favori
- **Animation** : Scale (0.9 → 1.1 → 1.0) + couleur

**Styles :**

```typescript
const styles = {
  container: {
    padding: tokens.spacing.sm,
    borderRadius: tokens.radii.full,
  },
  icon: {
    fontSize: 20,
    color: isFavorite ? colors.music.pink : colors.dark['400'],
  },
};
```

### 3.3 PlayButton (NOUVEAU)

**Composant à créer** : `src/components/atoms/PlayButton.tsx`

**Usage :** Boutons play sur cards et player

**Props :**

```typescript
interface PlayButtonProps {
  isPlaying: boolean;
  size: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}
```

**Styles :**

```typescript
// Small (cards)
width: 32,
height: 32,
borderRadius: tokens.radii.full,
backgroundColor: colors.primary,

// Medium (mini player)
width: 40,
height: 40,
borderRadius: tokens.radii.full,
backgroundColor: colors.primary,

// Large (hero banner)
width: 48,
height: 48,
borderRadius: tokens.radii.full,
backgroundColor: colors.primary,
```

### 3.4 Pill/Chip

**Composant existant** : `src/components/atoms/Badge.tsx` (à adapter)

**Usage :** Filter tags, active filters avec close button

**Props :**

```typescript
interface PillProps {
  label: string;
  active?: boolean;
  closable?: boolean;
  onClose?: () => void;
  onPress?: () => void;
}
```

**Styles :**

```typescript
// Active pill
backgroundColor: colors.primary,
borderRadius: tokens.radii.sm,
paddingVertical: tokens.spacing.sm,
paddingHorizontal: tokens.spacing.md,

// Inactive pill
backgroundColor: colors.dark['800'],
borderRadius: tokens.radii.sm,
paddingVertical: tokens.spacing.sm,
paddingHorizontal: tokens.spacing.md,
```

### 3.5 PriceTag

**Composant existant** : `src/components/atoms/ProductPrice.tsx` (à adapter)

**Usage :** Badges de prix sur Product Cards

**Props :**

```typescript
interface PriceTagProps {
  price: number;
  currency?: string;
  variant?: 'primary' | 'secondary' | 'success';
}
```

**Styles :**

```typescript
// Primary (violet)
backgroundColor: colors.primary,
color: colors.onPrimary,
borderRadius: tokens.radii.sm,
paddingVertical: tokens.spacing.xs,
paddingHorizontal: tokens.spacing.sm,

// Secondary (orange)
backgroundColor: colors.secondary,
color: colors.onSecondary,
borderRadius: tokens.radii.sm,
paddingVertical: tokens.spacing.xs,
paddingHorizontal: tokens.spacing.sm,
```

## 4. Molecules (Composés)

### 4.1 ProductCard (ADAPTER)

**Composant existant** : `src/components/atoms/ProductCard.tsx`

**Modifications nécessaires :**

- Ajouter HeartIcon (top-right)
- Adapter layout pour 2 colonnes
- Ajouter gradient overlay sur image
- Améliorer typographie

**Props :**

```typescript
interface ProductCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onPlay: () => void;
}
```

**Layout :**

```
┌─────────────────┐
│ [Image + Heart] │
│                 │
├─────────────────┤
│ Title           │
│ Artist          │
│ [Price] [Play]  │
└─────────────────┘
```

### 4.2 ServiceCard (NOUVEAU)

**Composant à créer** : `src/components/molecules/ServiceCard.tsx`

**Usage :** Cards pour services professionnels

**Props :**

```typescript
interface ServiceCardProps {
  id: string;
  title: string;
  provider: string;
  description: string;
  priceFrom: number;
  avatarUrl: string;
  onPress: () => void;
  onBook: () => void;
}
```

**Layout :**

```
┌─────────────────────────┐
│ [Avatar] Title          │
│         Provider        │
│         Description     │
│         À partir de $X  │
│         [Réserver]      │
└─────────────────────────┘
```

### 4.3 MiniPlayer (ADAPTER)

**Composant existant** : `src/components/molecules/AudioPlayer.tsx`

**Modifications nécessaires :**

- Ajouter HeartIcon (right side)
- Adapter layout sticky bottom
- Améliorer progress bar
- Ajouter artwork thumbnail

**Props :**

```typescript
interface MiniPlayerProps {
  title: string;
  artist: string;
  artworkUrl: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onToggleFavorite: () => void;
  onPress: () => void; // Ouvrir player complet
}
```

**Layout :**

```
┌─────────────────────────────────┐
│ [Artwork] Title        [Heart]  │
│          Artist                 │
│          [Progress Bar]         │
│          [Play] [Next]          │
└─────────────────────────────────┘
```

### 4.4 SearchBar

**Composant existant** : `src/components/molecules/SearchBar.tsx`

**Modifications nécessaires :**

- Adapter style pour header
- Ajouter placeholder "Rechercher beats, artistes..."
- Améliorer icon search

**Props :**

```typescript
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
```

### 4.5 SectionHeader

**Composant existant** : `src/components/atoms/SectionTitle.tsx` (à adapter)

**Usage :** Titres de sections avec action "Voir tout"

**Props :**

```typescript
interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
}
```

**Layout :**

```
Tendances                    Voir tout
```

### 4.6 PlaylistCard (NOUVEAU)

**Composant à créer** : `src/components/molecules/PlaylistCard.tsx`

**Usage :** Cards pour playlists éditoriales

**Props :**

```typescript
interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  beatCount: number;
  coverUrl?: string;
  onPress: () => void;
}
```

**Layout :**

```
┌─────────────────┐
│ [Cover]         │
│                 │
├─────────────────┤
│ Title           │
│ X beats         │
└─────────────────┘
```

## 5. Organisms (Sections)

### 5.1 AppHeader

**Composant existant** : `src/components/organisms/Header.tsx`

**Modifications nécessaires :**

- Ajouter menu burger (gauche)
- Centrer search bar
- Ajouter avatar avec badge notification (droite)

**Props :**

```typescript
interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  showMenu?: boolean;
  showAvatar?: boolean;
  notificationCount?: number;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onAvatarPress?: () => void;
}
```

**Layout :**

```
[☰] [Search Bar] [Avatar+Badge]
```

### 5.2 HeroBanner

**Composant à créer** : `src/components/organisms/HeroBanner.tsx`

**Usage :** Grande carte featured avec gradient overlay

**Props :**

```typescript
interface HeroBannerProps {
  title: string;
  subtitle: string;
  artist: string;
  imageUrl: string;
  duration: string;
  onListen: () => void;
  onBuy: () => void;
}
```

**Layout :**

```
┌─────────────────────────────────┐
│ [Gradient Overlay]              │
│                                 │
│ Title                           │
│ by Artist                       │
│                                 │
│ [•••••] 0:30                    │
│                                 │
│ [Écouter] [Acheter]             │
└─────────────────────────────────┘
```

### 5.3 FilterPills

**Composant à créer** : `src/components/organisms/FilterPills.tsx`

**Usage :** Scrollable horizontal des filtres

**Props :**

```typescript
interface FilterPillsProps {
  filters: Filter[];
  activeFilters: string[];
  onFilterPress: (filterId: string) => void;
}

interface Filter {
  id: string;
  label: string;
  icon: string;
}
```

### 5.4 TrendingSection

**Composant à créer** : `src/components/organisms/TrendingSection.tsx`

**Usage :** Section horizontale des tendances

**Props :**

```typescript
interface TrendingSectionProps {
  title: string;
  items: Product[];
  onItemPress: (item: Product) => void;
  onSeeAll?: () => void;
}
```

### 5.5 ProductGrid

**Composant existant** : `src/components/organisms/ProductList.tsx` (à adapter)

**Modifications nécessaires :**

- Adapter pour 2 colonnes
- Intégrer HeartIcon
- Améliorer spacing et layout

**Props :**

```typescript
interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onPlay: (product: Product) => void;
  loading?: boolean;
  onEndReached?: () => void;
}
```

### 5.6 ServicesSection

**Composant à créer** : `src/components/organisms/ServicesSection.tsx`

**Usage :** Section verticale des services

**Props :**

```typescript
interface ServicesSectionProps {
  title: string;
  services: Service[];
  onServicePress: (service: Service) => void;
  onBook: (service: Service) => void;
  onSeeAll?: () => void;
}
```

### 5.7 BottomNavigation

**Composant existant** : `src/components/organisms/TabBar.tsx`

**Modifications nécessaires :**

- Adapter pour 5 tabs
- Ajouter Upload tab avec FAB
- Améliorer icons et labels

**Props :**

```typescript
interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  onUploadPress: () => void;
}
```

**Tabs :**

- Home (house icon)
- Market (shopping bag icon)
- Upload (plus icon, FAB style)
- Wallet (wallet icon)
- Profile (person icon)

### 5.8 MarketplaceHeader

**Composant à créer** : `src/components/organisms/MarketplaceHeader.tsx`

**Usage :** Header spécifique marketplace

**Props :**

```typescript
interface MarketplaceHeaderProps {
  onSearchPress: () => void;
  onFilterPress: () => void;
}
```

### 5.9 ContentTabs

**Composant à créer** : `src/components/organisms/ContentTabs.tsx`

**Usage :** Tabs Beats/Samples/Services

**Props :**

```typescript
interface ContentTabsProps {
  activeTab: 'beats' | 'samples' | 'services';
  onTabPress: (tab: string) => void;
}
```

### 5.10 FeaturedPacks

**Composant à créer** : `src/components/organisms/FeaturedPacks.tsx`

**Usage :** 2 colonnes de packs featured

**Props :**

```typescript
interface FeaturedPacksProps {
  packs: Pack[];
  onPackPress: (pack: Pack) => void;
}

interface Pack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}
```

## 6. États et Interactions

### 6.1 États des Composants

**Loading State :**

```typescript
const LoadingState = {
  opacity: 0.7,
  showSpinner: true,
  disabled: true,
};
```

**Error State :**

```typescript
const ErrorState = {
  borderColor: colors.error,
  backgroundColor: colors.errorContainer,
};
```

**Empty State :**

```typescript
const EmptyState = {
  showIcon: true,
  message: 'Aucun élément trouvé',
  actionText: 'Réessayer',
};
```

### 6.2 Animations

**Heart Toggle :**

```typescript
const heartAnimation = {
  scale: [0.9, 1.1, 1.0],
  duration: 300,
  easing: 'ease-out',
};
```

**Card Press :**

```typescript
const cardPressAnimation = {
  scale: [1.0, 0.98],
  duration: 150,
  easing: 'ease-in-out',
};
```

**FAB Pulse :**

```typescript
const fabPulseAnimation = {
  scale: [1.0, 1.05, 1.0],
  duration: 2000,
  repeat: 'infinite',
};
```

## 7. Mapping avec Composants Existants

### 7.1 Composants à Adapter

| Composant Design | Composant Existant | Modifications                        |
| ---------------- | ------------------ | ------------------------------------ |
| Button           | `Button.tsx`       | Ajouter variants fab, icon           |
| ProductCard      | `ProductCard.tsx`  | Ajouter HeartIcon, layout 2 colonnes |
| MiniPlayer       | `AudioPlayer.tsx`  | Ajouter HeartIcon, layout sticky     |
| SearchBar        | `SearchBar.tsx`    | Adapter style header                 |
| SectionTitle     | `SectionTitle.tsx` | Ajouter action "Voir tout"           |
| TabBar           | `TabBar.tsx`       | Adapter 5 tabs, FAB upload           |
| ProductList      | `ProductList.tsx`  | Adapter grid 2 colonnes              |

### 7.2 Nouveaux Composants à Créer

| Composant         | Fichier                           | Priorité |
| ----------------- | --------------------------------- | -------- |
| HeartIcon         | `atoms/HeartIcon.tsx`             | Haute    |
| PlayButton        | `atoms/PlayButton.tsx`            | Haute    |
| ServiceCard       | `molecules/ServiceCard.tsx`       | Haute    |
| PlaylistCard      | `molecules/PlaylistCard.tsx`      | Moyenne  |
| HeroBanner        | `organisms/HeroBanner.tsx`        | Haute    |
| FilterPills       | `organisms/FilterPills.tsx`       | Haute    |
| TrendingSection   | `organisms/TrendingSection.tsx`   | Moyenne  |
| ServicesSection   | `organisms/ServicesSection.tsx`   | Moyenne  |
| MarketplaceHeader | `organisms/MarketplaceHeader.tsx` | Moyenne  |
| ContentTabs       | `organisms/ContentTabs.tsx`       | Moyenne  |
| FeaturedPacks     | `organisms/FeaturedPacks.tsx`     | Basse    |

## 8. Tests et Qualité

### 8.1 Tests Unitaires

Chaque composant doit avoir :

- Tests des props et variants
- Tests des états (loading, error, disabled)
- Tests des interactions (onPress, onToggle)
- Tests d'accessibilité

### 8.2 Storybook Stories

Chaque composant doit avoir :

- Story par variant
- Story par état
- Story interactive
- Documentation des props

## 9. Performance

### 9.1 Optimisations

- **Memoization** : `React.memo` pour composants purs
- **Lazy Loading** : Images et composants lourds
- **Virtual Scrolling** : Pour listes longues
- **Image Optimization** : Formats WebP, tailles adaptées

### 9.2 Bundle Size

- **Tree Shaking** : Imports spécifiques
- **Code Splitting** : Par écran/feature
- **Dead Code Elimination** : Supprimer code inutilisé

---

## Changelog

- **v2.0** - Bibliothèque complète basée sur design system
- **v2.0** - Mapping avec composants existants
- **v2.0** - Spécifications nouveaux composants (HeartIcon, PlayButton, etc.)
- **v2.0** - Documentation états, animations, tests
