# Linkart — Design System Documentation

> Version: v2.4 Auteur : Papa Diop Dernière mise à jour: 2025-10-28 Objectif : Documenter le design
> system complet basé sur les screenshots (Home + Marketplace) pour adapter les composants React
> Native existants au nouveau design moderne. Phase 4 complétée avec composants deprecated et
> placeholders Phase 5.

---

## 1. Vue d'ensemble

Le design system Linkart v2.0 est basé sur une **esthétique musicale moderne** avec :

- **Fond noir profond** pour ambiance studio
- **Cards avec overlays colorés** pour les produits
- **Gradients vibrants** pour les effets visuels
- **Typographie claire** avec hiérarchie bien définie
- **Accents colorés** pour les actions et éléments importants

## 2. Principes de Design

### 2.1 Philosophie Visuelle

- **Musical & Moderne** : Inspiration des apps musicales (Spotify, Apple Music)
- **Sombre par défaut** : Ambiance studio de création
- **Couleurs vibrantes** : Accents pour attirer l'attention
- **Minimalisme fonctionnel** : Focus sur le contenu musical

### 2.2 Principes UX

- **Thumb-friendly** : Boutons et zones de touch adaptés mobile
- **Navigation intuitive** : Structure claire et prévisible
- **Feedback visuel** : États et interactions bien définis
- **Performance** : Chargement rapide et animations fluides

## 3. Mapping avec le Thème Existant

### 3.1 Couleurs Principales

| Élément Design        | Couleur Screenshot | Couleur Thème Actuel           | Usage                     |
| --------------------- | ------------------ | ------------------------------ | ------------------------- |
| **Fond principal**    | Noir profond       | `colors.dark['950']` (#0A0A0A) | Background principal      |
| **Surface cards**     | Gris très sombre   | `colors.dark['900']` (#111111) | Cards et surfaces         |
| **Surface élevée**    | Gris sombre        | `colors.dark['800']` (#1A1A1A) | Modales, overlays         |
| **Accent principal**  | Violet/Indigo      | `colors.primary` (#6366F1)     | Boutons, liens, accents   |
| **Accent secondaire** | Orange/Doré        | `colors.secondary` (#F59E0B)   | Prix, highlights          |
| **Accent musical**    | Rose vibrant       | `colors.music.pink` (#EC4899)  | Éléments spéciaux         |
| **Texte principal**   | Blanc              | `colors.dark['100']` (#F5F5F5) | Titres, texte important   |
| **Texte secondaire**  | Gris clair         | `colors.dark['300']` (#D4D4D4) | Sous-titres, descriptions |
| **Texte tertiaire**   | Gris moyen         | `colors.dark['400']` (#A3A3A3) | Labels, métadonnées       |

### 3.2 Gradients Utilisés

```typescript
// Gradients pour overlays et effets visuels
gradients: {
  primary: ['#6366F1', '#8B5CF6'],     // Indigo vers violet
  secondary: ['#F59E0B', '#EC4899'],   // Orange vers rose
  music: ['#8B5CF6', '#EC4899', '#06B6D4'], // Arc-en-ciel musical
}
```

**Usage dans le design :**

- **Hero Banner** : Gradient primary pour overlay violet
- **Product Cards** : Gradients music pour backgrounds d'images
- **Featured Packs** : Gradients secondaires pour variété

### 3.3 Typographie

| Type              | Police           | Taille | Usage             | Token Thème      |
| ----------------- | ---------------- | ------ | ----------------- | ---------------- |
| **Display Large** | Poppins Bold     | 32px   | Titres principaux | `displayLarge`   |
| **Headline**      | Poppins SemiBold | 24px   | Titres sections   | `headlineMedium` |
| **Title**         | Poppins Medium   | 18px   | Titres cards      | `titleLarge`     |
| **Body Large**    | Inter Regular    | 16px   | Texte principal   | `bodyLarge`      |
| **Body Medium**   | Inter Regular    | 14px   | Descriptions      | `bodyMedium`     |
| **Label**         | Inter Medium     | 12px   | Labels, prix      | `labelMedium`    |

## 4. Espacements et Grilles

### 4.1 Système de Grille (8px Grid)

```typescript
spacing: {
  xs: 4,    // 0.25rem - Espacement minimal
  sm: 8,    // 0.5rem  - Espacement petit
  md: 16,   // 1rem    - Espacement standard
  lg: 24,   // 1.5rem  - Espacement large
  xl: 32,   // 2rem    - Espacement extra large
  '2xl': 48, // 3rem   - Espacement section
}
```

### 4.2 Layout Patterns

**Home Screen :**

- Header : `paddingHorizontal: md, paddingVertical: sm`
- Hero Banner : `marginHorizontal: md, marginBottom: lg`
- Filter Pills : `marginHorizontal: md, marginBottom: md`
- Section Headers : `paddingHorizontal: md, marginBottom: sm`
- Cards Grid : `paddingHorizontal: md, gap: md`

**Marketplace Screen :**

- Header : `paddingHorizontal: md, paddingVertical: sm`
- Active Filters : `marginHorizontal: md, marginBottom: md`
- Content Tabs : `marginHorizontal: md, marginBottom: lg`
- Product Grid : `paddingHorizontal: md, gap: md`

## 5. Arrondis et Ombres

### 5.1 Border Radius

```typescript
radii: {
  sm: 4,    // Petits éléments (badges, tags)
  md: 8,    // Boutons, inputs
  lg: 16,   // Cards principales (cohérent avec roundness)
  xl: 24,   // Cards grandes (hero banner)
  '2xl': 32, // Modales, overlays
}
```

**Usage dans le design :**

- **Cards** : `borderRadius: lg` (16px)
- **Boutons** : `borderRadius: md` (8px)
- **Badges prix** : `borderRadius: sm` (4px)
- **Hero Banner** : `borderRadius: xl` (24px)

### 5.2 Ombres et Élévations

```typescript
shadows: {
  sm: { elevation: 1, shadowRadius: 2 },   // Cards légères
  md: { elevation: 3, shadowRadius: 6 },    // Cards standard
  lg: { elevation: 6, shadowRadius: 12 },    // Cards importantes
  xl: { elevation: 12, shadowRadius: 24 }, // Modales, overlays
}
```

**Usage dans le design :**

- **Product Cards** : `shadow: md`
- **Hero Banner** : `shadow: lg`
- **Mini Player** : `shadow: xl` (sticky bottom)
- **FAB Button** : `shadow: lg`

## 6. États et Interactions

### 6.1 États des Composants

| État         | Couleur         | Opacité       | Usage        |
| ------------ | --------------- | ------------- | ------------ |
| **Default**  | Couleur normale | 100%          | État normal  |
| **Hover**    | Couleur normale | 90%           | Survol (web) |
| **Pressed**  | Couleur normale | 80%           | Appui        |
| **Disabled** | Gris            | 50%           | Désactivé    |
| **Loading**  | Couleur normale | 70% + spinner | Chargement   |
| **Error**    | Rouge           | 100%          | Erreur       |
| **Success**  | Vert            | 100%          | Succès       |

### 6.2 Animations et Transitions

```typescript
animations: {
  fast: 150,   // Micro-interactions (hover, press)
  normal: 300, // Transitions standard
  slow: 500,   // Animations complexes
}
```

**Patterns d'animation :**

- **Heart Icon** : Scale (0.9 → 1.1 → 1.0) sur toggle
- **Play Button** : Scale (0.95 → 1.05) sur press
- **Cards** : Scale (1.0 → 0.98) sur press
- **Navigation** : Slide transitions (300ms)

## 7. Composants Visuels Identifiés

### 7.1 Home Screen Components

1. **AppHeader**
   - Menu burger (gauche)
   - Search bar (centre) ✅ ADAPTÉ
   - Avatar avec badge notification (droite)

2. **HeroBanner** ✅ CRÉÉ
   - Grande carte avec gradient overlay violet
   - Titre principal + sous-titre
   - Boutons "Écouter" + "Acheter"
   - Progress dots + durée

3. **FilterPills** ✅ CRÉÉ
   - Scrollable horizontal
   - Pills avec icons (Genre, BPM, Prix, Licence)
   - État actif (violet) / inactif (gris)

4. **SectionHeader**
   - Titre section (gauche)
   - "Voir tout" link (droite)

5. **TrendingCards**
   - Horizontal scroll
   - Image + titre + artiste + prix + play button
   - ProductCard ✅ ADAPTÉ avec HeartIcon ✅ CRÉÉ

6. **ProductGrid**
   - 2 colonnes
   - Image + titre + artiste + prix + heart icon
   - ProductCard ✅ ADAPTÉ avec layout 2 colonnes et HeartIcon ✅ CRÉÉ

7. **ServiceCards**
   - Horizontal layout
   - Avatar + titre + description + prix "À partir de" + bouton "Réserver"
   - ServiceCard ✅ CRÉÉ avec layout vertical et pricing

8. **MiniPlayer** ✅ ADAPTÉ
   - Sticky bottom
   - Artwork + titre + artiste + progress bar + controls + heart
   - HeartIcon ✅ CRÉÉ à droite des contrôles
   - Bouton Next (SkipForward icon) ajouté

9. **BottomNavigation**
   - 5 tabs avec icons
   - Home (actif), Market, Upload (+), Wallet, Profile

### 7.2 Marketplace Screen Components

1. **MarketplaceHeader**
   - Titre "Marketplace"
   - Search icon + Filter icon (droite) ✅ ADAPTÉ

2. **ActiveFilters**
   - Pills avec close button (X)
   - Scrollable horizontal

3. **ContentTabs**
   - Beats (actif), Samples, Services
   - Icons + labels

4. **FeaturedPacks**
   - 2 colonnes
   - Cards avec icons (crown, flame) + labels
   - ProductCard ✅ ADAPTÉ avec layout 2 colonnes

5. **SortDropdown**
   - "Popularité" avec chevron down

6. **FABButton**
   - Bouton "+" flottant violet (upload)

## 8. Composants de Base

### 8.1 MetricItem Component

Composant atomique pour afficher une métrique (vues, downloads, likes).

**Props :**

- `icon`: 'eye' | 'download' | 'heart'
- `value`: number | string
- `size`: 'sm' | 'md' (défaut: 'sm')
- `color`: couleur de l'icône (défaut: muted)

**Exemple :**

```tsx
<MetricItem icon="eye" value="1.2K" />
<MetricItem icon="heart" value={89} color={colors.music.pink} />
```

**Design Tokens :**

- Icon size sm: 16px
- Icon size md: 20px
- Text size sm: 12px
- Text size md: 14px
- Gap: 4px

### 8.2 HeartIcon (Favorite Toggle) ✅ CRÉÉ

Icône interactive pour toggle favoris avec états visuels distincts.

**États :**

- `outline`: cœur vide, couleur muted
- `filled`: cœur plein, couleur music.pink

**Animation :**

- Transition: 200ms ease-out
- Scale on tap: 0.9 → 1.1 → 1.0
- Haptic feedback: light impact

### 8.3 ServiceCard Component ✅ CRÉÉ

Composant molecule pour afficher les informations d'un service professionnel.

**Props :**

- `id`: string - Identifiant unique du service
- `title`: string - Titre du service
- `provider`: object - Informations du prestataire (nom, avatar, vérification)
- `description`: string - Description du service
- `price`: number - Prix en centimes
- `category`: string - Catégorie du service
- `rating?`: number - Note moyenne (optionnel)
- `reviewCount?`: number - Nombre d'avis (optionnel)
- `isFavorite`: boolean - État favori
- `onPress`: (id: string) => void - Callback navigation
- `onToggleFavorite?`: (id: string, isFavorite: boolean) => void - Callback favoris
- `onBook?`: (id: string) => void - Callback réservation

**Design Tokens :**

- Container padding: 16px
- Avatar size: 32px
- HeartIcon size: md (20px)
- Button size: small
- Border radius: theme.roundness
- Shadow: elevation 2

### 8.4 PlaylistCard Component ✅ CRÉÉ

Composant molecule pour afficher les informations d'une playlist éditoriale.

**Props :**

- `id`: string - Identifiant unique de la playlist
- `title`: string - Titre de la playlist
- `description`: string - Description de la playlist
- `typebeat`: string - Type de beat (Trap, Drill, etc.)
- `ambiance`: string - Ambiance (Énergique, Chill, etc.)
- `beatCount`: number - Nombre de beats
- `imageUrl`: string - URL de l'image de couverture
- `onPress`: (id: string) => void - Callback navigation

**Design Tokens :**

- Container padding: 16px
- Image size: 60x60px
- Border radius: theme.roundness
- Shadow: elevation 2

**Props :**

- `id`: string - Identifiant unique de la playlist
- `title`: string - Titre de la playlist
- `description?`: string - Description (optionnel)
- `coverImage`: string - URL de l'image de couverture
- `typebeat?`: string - Type de beat (optionnel)
- `mood?`: string - Ambiance (optionnel)
- `beatCount`: number - Nombre de beats
- `duration?`: string - Durée totale (optionnel)
- `isPlaying`: boolean - État de lecture
- `onPress`: (id: string) => void - Callback navigation
- `onPlayToggle`: (id: string, isPlaying: boolean) => void - Callback lecture

**Design Tokens :**

- Card width: 200px (fixe)
- Cover image height: 120px
- PlayButton size: lg (48px)
- Badge size: small
- Border radius: theme.roundness
- Shadow: elevation 2

### 8.5 HeroBanner Component

Composant organism pour afficher une carte featured avec gradient.

**Props :**

- `title`: string - Titre principal
- `subtitle`: string - Sous-titre
- `artist`: string - Nom de l'artiste
- `imageUrl`: string - URL de l'image de fond
- `duration`: string - Durée du contenu
- `description?`: string - Description (optionnel)
- `onListen`: () => void - Callback écoute
- `onBuy`: () => void - Callback achat

**Design Tokens :**

- Container height: 200px
- Gradient: rgba(0,0,0,0.3) → rgba(0,0,0,0.7)
- Button size: md
- Padding: theme.spacing.lg
- Border radius: theme.roundness

### 8.6 FilterPills Component

Composant organism pour afficher des filtres scrollables horizontaux.

**Props :**

- `filters`: Filter[] - Liste des filtres disponibles
- `activeFilters`: string[] - Liste des filtres actifs
- `onFilterPress`: (filterId: string) => void - Callback sélection
- `onFilterRemove?`: (filterId: string) => void - Callback suppression
- `showRemoveButton?`: boolean - Afficher bouton suppression

**Interface Filter :**

```typescript
interface Filter {
  id: string;
  label: string;
  active: boolean;
}
```

**Design Tokens :**

- Scroll horizontal avec padding: theme.spacing.md
- Pill padding: theme.spacing.md horizontal, theme.spacing.sm vertical
- Active color: theme.colors.primary
- Inactive color: theme.colors.surfaceVariant
- Border radius: theme.roundness

## 9. Nouvelles Fonctionnalités Visuelles

### 9.1 Système de Likes (Heart Icon)

**États visuels :**

- **Outline** : `colors.dark['400']` - Non favori
- **Filled** : `colors.music.pink` (#EC4899) - Favori
- **Animation** : Scale (0.9 → 1.1 → 1.0) + couleur

**Placement :**

- Product Cards (top-right)
- Mini Player (right side)

### 9.2 Système de Playlists Éditoriales

**PlaylistCard :**

- Cover générée (gradient + icon)
- Titre playlist
- Nombre de beats
- Badge "Éditorial"

**PlaylistDetail :**

- Header avec cover + titre + description
- Liste des beats avec play buttons
- Player intégré en bas

## 10. Responsive et Adaptations

### 10.1 Breakpoints

```typescript
breakpoints: {
  xs: 0,     // Mobile portrait
  sm: 576,   // Mobile landscape
  md: 768,   // Tablet portrait
  lg: 992,   // Tablet landscape
  xl: 1200,  // Desktop
}
```

### 10.2 Adaptations Mobile

- **Cards** : Toujours 2 colonnes sur mobile
- **Navigation** : Bottom tabs (pas de sidebar)
- **Text** : Tailles adaptées pour lisibilité
- **Touch targets** : Minimum 44px (iOS) / 48px (Android)

## 11. Accessibilité

### 11.1 Contrastes

- **Texte principal** : Ratio 4.5:1 minimum
- **Texte secondaire** : Ratio 3:1 minimum
- **Boutons** : Ratio 3:1 minimum

### 11.2 Support

- **Screen readers** : Labels appropriés
- **Touch** : Zones de touch suffisantes
- **Couleurs** : Pas de dépendance couleur seule

## 12. Implémentation

### 12.1 Priorités

1. **Phase 1** : Composants de base (Button, Card, Text)
2. **Phase 2** : Composants complexes (Header, Navigation)
3. **Phase 3** : Nouvelles fonctionnalités (Heart, Playlists)
4. **Phase 4** : Animations et micro-interactions

### 12.2 Migration

- **Réutiliser** le thème existant (`src/theme/index.ts`)
- **Adapter** les composants existants
- **Créer** les nouveaux composants nécessaires
- **Tester** sur différents appareils

---

## Changelog

- **v2.3** (2025-10-28) - Phase 3 complétée : ProductCard, SearchBar, AudioPlayer adaptés avec
  nouveaux composants
- **v2.3** (2025-10-28) - Tests unitaires et Stories Storybook mis à jour pour tous les composants
  Phase 3
- **v2.3** (2025-10-28) - Documentation mise à jour avec statut des composants Phase 3
- **v2.2** - Ajout des composants ServiceCard, PlaylistCard, HeroBanner et FilterPills
- **v2.2** - Spécifications complètes pour les composants Phase 2
- **v2.1** - Ajout des composants MetricItem et HeartIcon pour les métriques produits
- **v2.1** - Spécifications complètes des animations et états du système de favoris
- **v2.0** - Design system complet basé sur screenshots Home + Marketplace
- **v2.0** - Ajout système likes et playlists éditoriales
- **v2.4** (2025-10-28) - Phase 4 complétée : Composants deprecated marqués, ProductPreview adapté,
  placeholders Phase 5 créés
- **v2.3** (2025-10-28) - Phase 3 complétée : ProductCard, SearchBar, AudioPlayer adaptés avec
  nouveaux composants
- **v2.2** (2025-10-27) - Phase 2 complétée : ServiceCard, PlaylistCard, HeroBanner, FilterPills
  créés
- **v2.1** (2025-10-26) - Phase 1 complétée : HeartIcon, PlayButton, MetricItem, ProductMetrics
  créés
- **v2.0** - Mapping avec thème existant (pas de nouvelles couleurs)
