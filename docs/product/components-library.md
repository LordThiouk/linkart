# Linkart — Components Library

> Version: v2.5 Auteur : Papa Diop Dernière mise à jour: 2025-10-28 Objectif : Catalogue complet des
> composants UI basé sur le design system, avec mapping vers les composants existants et
> spécifications pour les nouveaux composants. Phase 4 complétée avec composants deprecated et
> placeholders Phase 5.

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

### 4.1 ProductCard ✅ ADAPTÉ

**Composant adapté** : `src/components/atoms/ProductCard.tsx`

**Réalisations :**

- ✅ HeartIcon intégré (top-right)
- ✅ Layout adapté pour 2 colonnes
- ✅ ProductMetrics intégré en bas
- ✅ PlayButton pour preview intégré
- ✅ Styles inline avec theme uniquement
- ✅ Tests unitaires mis à jour
- ✅ Stories Storybook créées

**Props :**

```typescript
interface ProductCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onPlay?: (id: string) => void;
  testID?: string;
}
```

**Layout :**

```
┌─────────────────┐
│ [Image]    [♥]  │
│                 │
│ Title           │
│ Artist          │
│                 │
│ [Play] Price    │
│ [👁] [📥] [♥]   │
└─────────────────┘
```

**Design Tokens :**

- Layout 2 colonnes compatible (flex: 1)
- HeartIcon position absolue (top-right)
- ProductMetrics en bas
- PlayButton pour preview
- Styles inline avec theme uniquement

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

### 4.2 ServiceCard ✅ CRÉÉ

**Fichier :** `src/components/molecules/ServiceCard.tsx`

**Usage :** Cards pour services professionnels

**Props :**

```typescript
interface ServiceCardProps {
  id: string;
  title: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  description: string;
  price: number;
  category: string;
  rating?: number;
  reviewCount?: number;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  onBook?: (id: string) => void;
}
```

**Layout :**

```
┌─────────────────────────────────────┐
│ [Avatar] Provider Name [✓] [♥]      │
│                                     │
│ Service Title                       │
│ Service Description                  │
│                                     │
│ [Category] ⭐ Rating (Count)        │
│                                     │
│ Price        [Réserver]             │
└─────────────────────────────────────┘
```

**Design Tokens :**

- Container padding: 16px
- Avatar size: 32px
- HeartIcon size: md (20px)
- Button size: small
- Border radius: theme.roundness
- Shadow: elevation 2

### 4.3 PlaylistCard ✅ CRÉÉ

**Fichier :** `src/components/molecules/PlaylistCard.tsx`

**Usage :** Cards pour playlists éditoriales

**Props :**

```typescript
interface PlaylistCardProps {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  typebeat?: string;
  mood?: string;
  beatCount: number;
  duration?: string;
  isPlaying: boolean;
  onPress: (id: string) => void;
  onPlayToggle: (id: string, isPlaying: boolean) => void;
}
```

**Layout :**

```
┌─────────────────┐
│ [Cover Image]   │
│ [Play Button]   │
│ [Duration Badge]│
├─────────────────┤
│ Playlist Title  │
│ Description     │
│                 │
│ [Typebeat] [Mood] [X beats] │
└─────────────────┘
```

**Design Tokens :**

- Card width: 200px (fixe)
- Cover image height: 120px
- PlayButton size: lg (48px)
- Badge size: small
- Border radius: theme.roundness
- Shadow: elevation 2

### 4.3 MiniPlayer (AudioPlayer) ✅ ADAPTÉ

**Composant adapté** : `src/components/molecules/AudioPlayer.tsx`

**Réalisations :**

- ✅ HeartIcon intégré (right side)
- ✅ Layout sticky bottom adapté
- ✅ Progress bar améliorée
- ✅ Artwork thumbnail (40x40px) intégré
- ✅ Layout horizontal: [Artwork] [Title/Artist + Progress] [Heart] [Play/Pause] [Next]
- ✅ Bouton Next (SkipForward icon) ajouté
- ✅ Styles inline avec theme uniquement
- ✅ Tests unitaires mis à jour
- ✅ Stories Storybook créées

**Props :**

```typescript
interface AudioPlayerProps {
  title: string;
  artist: string;
  artworkUrl: string;
  uri: string;
  duration?: number;
  isFavorite: boolean;
  productId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onNext?: () => void;
  onToggleFavorite: (productId: string, isFavorite: boolean) => void;
  onPress?: () => void;
  sticky?: boolean;
  style?: ViewStyle;
  testID?: string;
}
```

**Layout :**

```
┌─────────────────────────────────┐
│ [Artwork] Title        [♥] [▶] [⏭] │
│          Artist                 │
│          [Progress Bar]         │
│          [Play] [Next]          │
└─────────────────────────────────┘
```

**Design Tokens :**

- Layout horizontal avec artwork thumbnail
- HeartIcon à droite des contrôles
- Bouton Next (SkipForward icon)
- Rendu sticky-capable (via prop position)
- Styles inline avec theme uniquement

**Layout :**

```
┌─────────────────────────────────┐
│ [Artwork] Title        [Heart]  │
│          Artist                 │
│          [Progress Bar]         │
│          [Play] [Next]          │
└─────────────────────────────────┘
```

### 4.4 SearchBar ✅ ADAPTÉ

**Composant adapté** : `src/components/molecules/SearchBar.tsx`

**Réalisations :**

- ✅ Style adapté pour header moderne
- ✅ Placeholder: "Rechercher beats, artistes, services..."
- ✅ Icônes Search de Lucide au lieu de Material
- ✅ Simplification pour focus sur la barre de recherche uniquement
- ✅ Styles inline avec theme uniquement
- ✅ Tests unitaires mis à jour
- ✅ Stories Storybook mises à jour

**Props :**

```typescript
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  testID?: string;
}
```

**Design Tokens :**

- Style moderne aligné avec le header
- Icônes Search de Lucide
- Styles inline avec theme uniquement
- Focus sur la barre de recherche uniquement

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

### 5.1 ProductUploadForm

**Nouveau composant** : `src/features/products/components/ProductUploadForm.tsx`

**✅ CRÉÉ** - Phase 4 complétée

**Caractéristiques**:

- Champs: titre, description, genre, BPM, tags
- **Artwork Upload** (requis): Image de couverture avec aperçu et bouton de suppression
- Section "Licences et Prix" avec options:
  - Checkbox pour chaque type: Basic, Non-Exclusive, Exclusive, Lease
  - Pour chaque licence cochée: champ prix + textarea termes
  - Affichage conditionnel des champs prix/termes
- Upload preview (placeholder pour l'instant)
- Upload fichier complet (placeholder pour l'instant)
- Validation: artwork requis + au moins une licence configurée

**Props**:

```typescript
interface ProductUploadFormProps {
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
}

interface ProductFormData {
  title: string;
  description: string;
  genre: string;
  bpm?: number;
  tags: string[];
  artworkUrl?: string;
  licenses: Array<{
    type: 'basic' | 'non_exclusive' | 'exclusive' | 'lease';
    price: number;
    terms: string;
    is_available: boolean;
  }>;
}
```

**Validation**:

- Titre requis (min 3 chars)
- Description requise (min 10 chars)
- **Artwork requis** (image de couverture)
- Au moins une licence avec prix > 0
- BPM optionnel (60-200 si fourni)

### 5.2 AppHeader

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

### 5.2 HeroBanner ✅ CRÉÉ

**Fichier :** `src/components/organisms/HeroBanner.tsx`

**Usage :** Grande carte featured avec gradient overlay

**Props :**

```typescript
interface HeroBannerProps {
  title: string;
  subtitle: string;
  artist: string;
  imageUrl: string;
  duration: string;
  description?: string;
  onListen: () => void;
  onBuy: () => void;
}
```

**Layout :**

```
┌─────────────────────────────────────┐
│ [Image Background + Gradient]       │
│                                     │
│ Title                               │
│ Subtitle                            │
│ by Artist                           │
│ Duration                            │
│                                     │
│ [Écouter] [Acheter]                │
└─────────────────────────────────────┘
```

**Design Tokens :**

- Height: 200px
- Gradient: rgba(0,0,0,0.3) → rgba(0,0,0,0.7)
- Button size: md
- Padding: theme.spacing.lg

### 5.3 FilterPills ✅ CRÉÉ

**Fichier :** `src/components/organisms/FilterPills.tsx`

**Usage :** Filtres scrollables horizontaux

**Props :**

```typescript
interface FilterPillsProps {
  filters: Filter[];
  activeFilters: string[];
  onFilterPress: (filterId: string) => void;
  onFilterRemove?: (filterId: string) => void;
  showRemoveButton?: boolean;
}

interface Filter {
  id: string;
  label: string;
  active: boolean;
}
```

**Layout :**

```
[Trap] [Hip-Hop] [Electronic] [Afrobeat] →
```

**Design Tokens :**

- Scroll horizontal
- Pill padding: theme.spacing.md horizontal, theme.spacing.sm vertical
- Active color: theme.colors.primary
- Inactive color: theme.colors.surfaceVariant

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

| Composant Design | Composant Existant | Modifications                        | Statut |
| ---------------- | ------------------ | ------------------------------------ | ------ |
| Button           | `Button.tsx`       | Ajouter variants fab, icon           | 🔄     |
| ProductCard      | `ProductCard.tsx`  | Ajouter HeartIcon, layout 2 colonnes | ✅     |
| MiniPlayer       | `AudioPlayer.tsx`  | Ajouter HeartIcon, layout sticky     | ✅     |
| SearchBar        | `SearchBar.tsx`    | Adapter style header                 | ✅     |
| SectionTitle     | `SectionTitle.tsx` | Ajouter action "Voir tout"           | 🔄     |
| TabBar           | `TabBar.tsx`       | Adapter 5 tabs, FAB upload           | 🔄     |
| ProductList      | `ProductList.tsx`  | Adapter grid 2 colonnes              | 🔄     |

### 7.2 Nouveaux Composants à Créer

| Composant         | Fichier                           | Priorité | Statut |
| ----------------- | --------------------------------- | -------- | ------ |
| HeartIcon         | `atoms/HeartIcon.tsx`             | Haute    | ✅     |
| PlayButton        | `atoms/PlayButton.tsx`            | Haute    | ✅     |
| MetricItem        | `atoms/MetricItem.tsx`            | Haute    | ✅     |
| ProductMetrics    | `molecules/ProductMetrics.tsx`    | Haute    | ✅     |
| ServiceCard       | `molecules/ServiceCard.tsx`       | Haute    | ✅     |
| PlaylistCard      | `molecules/PlaylistCard.tsx`      | Moyenne  | ✅     |
| HeroBanner        | `organisms/HeroBanner.tsx`        | Haute    | ✅     |
| FilterPills       | `organisms/FilterPills.tsx`       | Haute    | ✅     |
| TrendingSection   | `organisms/TrendingSection.tsx`   | Moyenne  | 🔄     |
| ServicesSection   | `organisms/ServicesSection.tsx`   | Moyenne  | 🔄     |
| MarketplaceHeader | `organisms/MarketplaceHeader.tsx` | Moyenne  | 🔄     |
| ContentTabs       | `organisms/ContentTabs.tsx`       | Moyenne  | 🔄     |
| FeaturedPacks     | `organisms/FeaturedPacks.tsx`     | Basse    | 🔄     |

## 8. Tests et Qualité

### 8.1 Tests Unitaires

**Composants Phase 1 (Atoms) :**

- ✅ HeartIcon : Tests complets avec animation et haptic feedback
- ✅ PlayButton : Tests avec tous les variants et états
- ✅ MetricItem : Tests avec icônes et formats

**Composants Phase 2 (Molecules) :**

- ✅ ProductMetrics : Tests avec métriques et layout
- ✅ ServiceCard : Tests avec pricing et layout
- ✅ PlaylistCard : Tests avec métadonnées et navigation

**Composants Phase 2 (Organisms) :**

- ✅ HeroBanner : Tests avec gradient et boutons
- ✅ FilterPills : Tests avec sélection et scroll

**Composants Phase 3 (Adaptés) :**

- ✅ ProductCard : Tests mis à jour avec nouveaux props
- ✅ SearchBar : Tests mis à jour avec nouveau style
- ✅ AudioPlayer : Tests mis à jour avec MiniPlayer

### 8.2 Stories Storybook

**Composants Phase 1 (Atoms) :**

- ✅ HeartIcon : Stories avec états favori/non-favori
- ✅ PlayButton : Stories avec variants et loading
- ✅ MetricItem : Stories avec différentes métriques

**Composants Phase 2 (Molecules) :**

- ✅ ProductMetrics : Stories avec métriques variées
- ✅ ServiceCard : Stories avec différents services
- ✅ PlaylistCard : Stories avec playlists variées

**Composants Phase 2 (Organisms) :**

- ✅ HeroBanner : Stories avec différents contenus
- ✅ FilterPills : Stories avec filtres variés

**Composants Phase 3 (Adaptés) :**

- ✅ ProductCard : Stories mises à jour avec nouveaux props
- ✅ SearchBar : Stories mises à jour avec nouveau style
- ✅ AudioPlayer : Stories créées avec MiniPlayer

### 8.3 Couverture de Tests

- **Phase 1** : 100% des composants atoms testés
- **Phase 2** : 100% des composants molecules et organisms testés
- **Phase 3** : 100% des composants adaptés testés
- **Global** : 100% des composants créés/adaptés testés

## 9. Performance

### 9.1 Optimisations

- **Memoization** : `React.memo` pour composants purs
- **Lazy Loading** : Images et composants lourds
- **Virtual Scrolling** : Pour listes longues
- **Image Optimization** : Formats WebP, tailles adaptées
- **Bundle Splitting** : Code splitting par feature
- **Tree Shaking** : Import uniquement des composants utilisés

### 9.2 Métriques de Performance

- **Bundle Size** : < 2MB pour l'app mobile
- **First Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Memory Usage** : < 100MB en usage normal
- **FPS** : 60fps pour animations fluides

### 9.3 Optimisations Spécifiques

**Composants Phase 1 (Atoms) :**

- HeartIcon : Animation native avec `useNativeDriver`
- PlayButton : Lazy loading des icônes
- MetricItem : Memoization des valeurs

**Composants Phase 2 (Molecules) :**

- ProductMetrics : Lazy loading des métriques
- ServiceCard : Memoization des prix
- PlaylistCard : Lazy loading des images

**Composants Phase 2 (Organisms) :**

- HeroBanner : Lazy loading des images
- FilterPills : Virtual scrolling pour filtres

**Composants Phase 3 (Adaptés) :**

- ProductCard : Memoization des props
- SearchBar : Debounce des recherches
- AudioPlayer : Lazy loading des artworks

### 9.4 Bundle Size

- **Tree Shaking** : Imports spécifiques
- **Code Splitting** : Par écran/feature
- **Lazy Loading** : Composants lourds
- **Image Optimization** : Formats WebP, tailles adaptées
- **Bundle Analysis** : Monitoring régulier
- **Dead Code Elimination** : Supprimer code inutilisé

---

## Changelog

- **v2.5** (2025-10-28) - Phase 4 complétée : Composants deprecated marqués, ProductPreview adapté,
  placeholders Phase 5 créés
- **v2.4** (2025-10-28) - Ajout artwork upload dans ProductUploadForm avec validation et aperçu
- **v2.3** (2025-10-28) - Phase 3 complétée : ProductCard, SearchBar, AudioPlayer adaptés avec
  nouveaux composants
- **v2.3** (2025-10-28) - Tests unitaires et Stories Storybook mis à jour pour tous les composants
  Phase 3
- **v2.3** (2025-10-28) - Documentation mise à jour avec statut des composants Phase 3
- **v2.2** - Ajout des composants ServiceCard, PlaylistCard, HeroBanner et FilterPills
- **v2.2** - Documentation complète des composants Phase 2 avec exemples d'usage
- **v2.1** - Ajout des composants MetricItem et HeartIcon pour les métriques produits
- **v2.1** - Documentation complète des animations et états du système de favoris
- **v2.0** - Bibliothèque complète basée sur design system
- **v2.0** - Mapping avec composants existants
- **v2.0** - Spécifications nouveaux composants (HeartIcon, PlayButton, etc.)
- **v2.0** - Documentation états, animations, tests
