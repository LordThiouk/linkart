# Featured Artists & Services Screen — Plan d'Implémentation Frontend

> Version: v2.0 Date: 2025-11-22 Objectif: Créer **2 screens séparés** frontend pour afficher :
>
> - **Featured Artists** : Artistes mis en avant (peuvent proposer produits ET/OU services), avec
>   catégories (Beatmaker, Mixeur, Producteur, Studio, Artiste)
> - **Featured Services** : Services mis en avant, organisés par catégorie (Mixing, Mastering,
>   Recording, etc.)

---

## 1. Objectif

Créer **2 screens séparés** :

### 1.1 Featured Artists Screen

Affiche les **artistes** mis en avant (peuvent proposer produits ET/OU services) :

- **Top Artistes** : Meilleurs créateurs (basé sur ventes + bookings + ratings)
- **Artistes Boostés** : Profils avec boost actif
- **Nouveaux Talents** : Nouveaux créateurs performants

**Catégories d'artistes** : Beatmaker, Mixeur, Producteur, Studio, etc. (filtrable)

### 1.2 Featured Services Screen

Affiche les **services** mis en avant, organisés par catégorie :

- **Par catégorie** : Mixing, Mastering, Recording, Production, Coaching, Sound Design
- **Top Services** : Meilleurs prestataires par catégorie
- **Services Boostés** : Services avec boost actif par catégorie

**Scope** : Frontend uniquement (données mockées pour l'instant)

---

## 2. Architecture

### 2.1 Structure des fichiers

```
src/features/featured-artists/
├── components/
│   ├── FeaturedArtistsHeader.tsx          # Header avec filtres catégories (optionnel)
│   ├── FeaturedArtistsHeader.stories.tsx
│   ├── ArtistPlaylistCard.tsx             # Carte artiste avec produits ET/OU services
│   ├── ArtistPlaylistCard.stories.tsx
│   ├── FeaturedArtistsList.tsx            # Liste avec sections (Top, Boostés, Nouveaux)
│   ├── FeaturedArtistsList.stories.tsx
│   ├── AutoPlaylistBadge.tsx             # Badge "Boosté", "Top", "Nouveau"
│   ├── AutoPlaylistBadge.stories.tsx
│   └── index.ts
├── screens/
│   ├── FeaturedArtistsScreenFigma.tsx     # Screen principal
│   ├── FeaturedArtistsScreenFigma.stories.tsx
│   └── index.ts
├── types.ts                               # Types pour featured artists
└── mockData.ts                            # Données mockées

src/features/featured-services/
├── components/
│   ├── FeaturedServicesHeader.tsx         # Header avec tabs catégories services
│   ├── FeaturedServicesHeader.stories.tsx
│   ├── ServicePlaylistCard.tsx            # Carte service avec provider
│   ├── ServicePlaylistCard.stories.tsx
│   ├── FeaturedServicesList.tsx           # Liste par catégorie (Top, Boostés)
│   ├── FeaturedServicesList.stories.tsx
│   └── index.ts
├── screens/
│   ├── FeaturedServicesScreenFigma.tsx    # Screen principal
│   ├── FeaturedServicesScreenFigma.stories.tsx
│   └── index.ts
├── types.ts                               # Types pour featured services
└── mockData.ts                            # Données mockées
```

---

## 3. Types TypeScript

### 3.1 Featured Artists

```typescript
// src/features/featured-artists/types.ts

export type ArtistCategory = 'beatmaker' | 'mixer' | 'producer' | 'studio' | 'artist';

export interface FeaturedArtist {
  id: string;
  name: string;
  artistName?: string;
  avatar?: string;
  category: ArtistCategory; // Catégorie de l'artiste
  isBoosted: boolean;
  isTop: boolean;
  isNewTalent?: boolean;
  stats: {
    // Produits (si l'artiste vend des beats/kits)
    sales?: number;
    revenue?: number;
    productsCount?: number;
    // Services (si l'artiste propose des services)
    bookings?: number;
    servicesCount?: number;
    // Global
    rating?: number;
  };
  playlist: {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    beatCount: number; // Produits
    serviceCount?: number; // Services (optionnel)
    totalPlays: number;
  };
}
```

### 3.2 Featured Services

```typescript
// src/features/featured-services/types.ts

export type ServiceCategory =
  | 'mixing'
  | 'mastering'
  | 'recording'
  | 'production'
  | 'coaching'
  | 'sound_design';

export interface FeaturedService {
  id: string;
  title: string;
  category: ServiceCategory;
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  isBoosted: boolean;
  isTop: boolean;
  stats: {
    bookings: number;
    rating: number;
    price?: number;
  };
  playlist?: {
    id: string;
    title: string;
    description: string;
    serviceCount: number;
  };
}
```

---

## 4. Composants à créer

### 4.1 `AutoPlaylistBadge`

**Props :**

```typescript
interface AutoPlaylistBadgeProps {
  type: 'boosted' | 'top' | 'new';
  label?: string;
  testID?: string;
}
```

**Variants :**

- `boosted` : Badge "Boosté" (gradient primary)
- `top` : Badge "Top Beatmaker" / "Top Mixeur" (gradient accent)
- `new` : Badge "Nouveau Talent" (gradient cyan)

---

### 4.2 `ArtistPlaylistCard`

**Props :**

```typescript
interface ArtistPlaylistCardProps {
  artist: FeaturedArtist;
  onPress?: () => void;
  testID?: string;
}
```

**Fonctionnalités :**

- Réutilise `PlaylistCardFigma` comme base
- Affiche avatar de l'artiste (optionnel)
- Affiche catégorie de l'artiste (Beatmaker, Mixeur, Producteur, Studio, Artiste)
- Badge "Boosté" si `isBoosted = true`
- Badge "Top" si `isTop = true`
- Affiche stats : ventes (si produits), bookings (si services), ratings
- Indique si l'artiste a produits ET/OU services
- Navigation vers `PlaylistDetailScreenFigma`

---

### 4.3 `FeaturedArtistsHeader`

**Props :**

```typescript
interface FeaturedArtistsHeaderProps {
  activeCategory?: ArtistCategory | 'all';
  onCategoryChange?: (category: ArtistCategory | 'all') => void;
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  testID?: string;
}
```

**Fonctionnalités :**

- Header avec titre et sous-titre
- Filtres par catégorie (optionnel) : Tous | Beatmaker | Mixeur | Producteur | Studio | Artiste
- Utilise `CategoryChipFigma` pour les filtres
- Sous-titre : "Artistes en vedette"

---

### 4.4 `FeaturedArtistsList`

**Props :**

```typescript
interface FeaturedArtistsListProps {
  artists: FeaturedArtist[];
  activeCategory?: ArtistCategory | 'all';
  onArtistPress: (artistId: string) => void;
  onPlaylistPress: (playlistId: string) => void;
  testID?: string;
}
```

**Sections :**

- "⚡ Artistes Boostés" (tous les artistes boostés, filtrés par catégorie si actif)
- "🏆 Top Artistes" (meilleurs artistes, filtrés par catégorie si actif)
- "✨ Nouveaux Talents" (nouveaux créateurs, filtrés par catégorie si actif)
- Empty state si aucune playlist

---

### 4.5 `FeaturedArtistsScreenFigma`

**Props :**

```typescript
interface FeaturedArtistsScreenFigmaProps {
  onBack?: () => void;
  onArtistPress?: (artistId: string) => void;
  onPlaylistPress?: (playlistId: string) => void;
}
```

**Fonctionnalités :**

- Combine tous les composants
- Gère le state (catégorie active, filtres)
- Données mockées pour tous les types d'artistes (beatmakers, mixeurs, producteurs, studios,
  artistes)
- Filtrage par catégorie d'artiste (optionnel)
- Navigation vers `PlaylistDetailScreenFigma`

---

## 5. Données mockées

### 5.1 Featured Artists (tous types)

```typescript
const mockArtists: FeaturedArtist[] = [
  // Beatmaker (produits uniquement)
  {
    id: 'a1',
    name: 'DJ Shadow',
    artistName: 'DJ Shadow Productions',
    avatar: 'https://...',
    category: 'beatmaker',
    isBoosted: true,
    isTop: true,
    stats: {
      sales: 150,
      revenue: 3750000,
      rating: 4.9,
      productsCount: 25,
    },
    playlist: {
      id: 'p1',
      title: 'Top Beats by DJ Shadow',
      description: 'Les meilleurs beats de DJ Shadow',
      beatCount: 25,
      totalPlays: 45000,
    },
  },
  // Mixeur (services uniquement)
  {
    id: 'a2',
    name: 'Audio Engineer Pro',
    artistName: 'Studio Master',
    avatar: 'https://...',
    category: 'mixer',
    isBoosted: true,
    isTop: true,
    stats: {
      bookings: 89,
      rating: 4.8,
      servicesCount: 3,
    },
    playlist: {
      id: 'p2',
      title: 'Top Mixes by Audio Engineer Pro',
      description: 'Les meilleurs mixes',
      beatCount: 0,
      serviceCount: 3,
      totalPlays: 28000,
    },
  },
  // Artiste complet (produits + services)
  {
    id: 'a3',
    name: 'Producer X',
    artistName: 'Producer X Music',
    avatar: 'https://...',
    category: 'artist',
    isBoosted: false,
    isTop: true,
    stats: {
      sales: 67,
      revenue: 1675000,
      bookings: 45,
      rating: 4.7,
      productsCount: 15,
      servicesCount: 2,
    },
    playlist: {
      id: 'p3',
      title: 'Complete Works by Producer X',
      description: 'Beats et services de Producer X',
      beatCount: 15,
      serviceCount: 2,
      totalPlays: 35000,
    },
  },
  // Studio
  {
    id: 'a4',
    name: 'Premium Sound Studio',
    artistName: 'Premium Sound',
    avatar: 'https://...',
    category: 'studio',
    isBoosted: true,
    isTop: false,
    stats: {
      bookings: 127,
      rating: 4.8,
      servicesCount: 5,
    },
    playlist: {
      id: 'p4',
      title: 'Studio Services',
      description: 'Tous nos services de studio',
      beatCount: 0,
      serviceCount: 5,
      totalPlays: 38000,
    },
  },
];
```

### 5.2 Featured Services (par catégorie)

```typescript
const mockServices: FeaturedService[] = [
  // Mixing
  {
    id: 's1',
    title: 'Professional Mixing Service',
    category: 'mixing',
    provider: {
      id: 'p1',
      name: 'Audio Engineer Pro',
      avatar: 'https://...',
    },
    isBoosted: true,
    isTop: true,
    stats: {
      bookings: 89,
      rating: 4.9,
      price: 25000,
    },
  },
  // Mastering
  {
    id: 's2',
    title: 'Premium Mastering',
    category: 'mastering',
    provider: {
      id: 'p2',
      name: 'Mastering Studio',
      avatar: 'https://...',
    },
    isBoosted: false,
    isTop: true,
    stats: {
      bookings: 127,
      rating: 4.8,
      price: 30000,
    },
  },
  // ... plus de services par catégorie
];
```

---

## 6. Intégration avec composants existants

### 6.1 Réutilisation

- ✅ `PlaylistCardFigma` — base pour `ArtistPlaylistCard`
- ✅ `PlaylistDetailScreenFigma` — navigation depuis les cartes
- ✅ `CategoryChipFigma` — pour les tabs
- ✅ `Badge` — pour les badges "Boosté", "Top"

### 6.2 Extensions nécessaires

- `PlaylistCardFigma` : Ajouter props optionnelles `isBoosted`, `artistAvatar`, `artistStats`
- Ou créer `ArtistPlaylistCard` qui wrap `PlaylistCardFigma` avec les badges

---

## 7. Navigation

### 7.1 Route à ajouter

```typescript
// Dans le stack navigator
<Stack.Screen
  name="FeaturedArtists"
  component={FeaturedArtistsScreen}
/>
```

### 7.2 Points d'entrée

1. **HomeScreen** : Lien "Voir tous les artistes en vedette"
2. **Marketplace** : Section "Artistes Boostés"
3. **Profile** : Si l'utilisateur est boosté, lien vers sa playlist

---

## 8. Design & UX

### 8.1 Layout

- Header fixe avec tabs
- ScrollView vertical avec sections
- Cards en **liste verticale** (plus d'espace pour infos artiste)
- Badge "Boosté" visible sur les cartes boostées
- Badge "Top" pour les meilleurs artistes

### 8.2 Animations

- FadeIn pour les sections
- Scale animation sur les cards au press
- Transition fluide entre tabs

### 8.3 Empty states

- "Aucun artiste boosté pour le moment"
- "Aucun top beatmaker disponible"

---

## 9. Plan d'implémentation (ordre)

### Phase 1 : Featured Artists (corriger l'existant)

#### Étape 1 : Types et données mockées (corriger)

1. Modifier `types.ts` : ajouter `category: ArtistCategory`, supprimer `type`
2. Modifier données mockées : artistes avec catégories (beatmaker, mixer, producer, studio, artist)
3. Ajouter artistes avec produits ET/OU services

#### Étape 2 : Composants (corriger)

1. Modifier `FeaturedArtistsHeader` : supprimer tabs, ajouter filtres catégories (optionnel)
2. Modifier `ArtistPlaylistCard` : afficher catégorie, produits ET/OU services
3. Modifier `FeaturedArtistsList` : filtrer par catégorie si actif

#### Étape 3 : Screen (corriger)

1. Modifier `FeaturedArtistsScreenFigma` : gérer filtres catégories

### Phase 2 : Featured Services (nouveau)

#### Étape 1 : Structure et types

1. Créer structure `features/featured-services/`
2. Créer `types.ts` avec `FeaturedService`, `ServiceCategory`
3. Créer données mockées par catégorie

#### Étape 2 : Composants

1. `FeaturedServicesHeader` (tabs catégories : Mixing, Mastering, etc.)
2. `ServicePlaylistCard` (carte service avec provider)
3. `FeaturedServicesList` (liste par catégorie avec sections Top/Boostés)

#### Étape 3 : Screen

1. `FeaturedServicesScreenFigma` (combine tout)
2. Stories avec données mockées

#### Étape 4 : Navigation

1. Wrapper React Navigation pour Featured Services
2. Ajouter routes dans le stack
3. Liens depuis HomeScreen (optionnel)

---

## 10. Estimation frontend

### Phase 1 : Featured Artists (corrections)

- Modifier types + données mockées : 30 min
- Corriger composants existants : 2h
- Tests + polish : 30 min **Total Phase 1** : ~3 heures

### Phase 2 : Featured Services (nouveau)

- Structure + types + données mockées : 1h
- `FeaturedServicesHeader` : 1h
- `ServicePlaylistCard` : 2h
- `FeaturedServicesList` : 2h
- `FeaturedServicesScreenFigma` : 2h
- Navigation + intégration : 1h
- Stories Storybook : 1h
- Tests + polish : 1h **Total Phase 2** : ~11 heures

**Total Global** : ~14 heures (2 jours)

---

## 11. Décisions de design

### Featured Artists

✅ **Layout** : Liste verticale (plus d'espace pour infos artiste) ✅ **Badge position** : Top-right
de la card ✅ **Stats affichées** : Principales uniquement (sales/bookings, rating) ✅ **Filtres
catégories** : Optionnels, scrollables horizontalement ✅ **Indicateur produits/services** : Badge
ou icône pour indiquer si l'artiste a produits ET/OU services

### Featured Services

✅ **Layout** : Liste verticale par catégorie ✅ **Tabs catégories** : Toujours visibles (Mixing,
Mastering, Recording, etc.) ✅ **Sections** : Top Services + Services Boostés par catégorie ✅
**Service card** : Affiche provider, category, stats (bookings, rating, price)

---

## 12. Checklist

### Phase 1 : Featured Artists (corrigé) ✅

- [x] Corriger `types.ts` : ajouter `category`, supprimer `type`
- [x] Corriger `mockData.ts` : catégories et artistes avec produits ET/OU services
- [x] Corriger `FeaturedArtistsHeader` : filtres catégories au lieu de tabs
- [x] Corriger `ArtistPlaylistCard` : afficher catégorie et indicateurs produits/services
- [x] Corriger `FeaturedArtistsList` : filtrer par catégorie
- [x] Corriger `FeaturedArtistsScreenFigma` : gérer filtres catégories
- [x] Mettre à jour stories Storybook

### Phase 2 : Featured Services (créé) ✅

- [x] Créer structure `features/featured-services/`
- [x] Créer `types.ts` avec `FeaturedService` et `ServiceCategory`
- [x] Créer `mockData.ts` pour services par catégorie
- [x] Créer `FeaturedServicesHeader` + stories
- [x] Créer `ServicePlaylistCard` + stories
- [x] Créer `FeaturedServicesList` + stories
- [x] Créer `FeaturedServicesScreenFigma` + stories
- [x] Créer wrapper React Navigation

### Navigation (à faire manuellement)

- [ ] Ajouter route `FeaturedArtists` dans stack
- [ ] Ajouter route `FeaturedServices` dans stack
- [ ] Ajouter liens depuis HomeScreen (optionnel)

---

## 13. Notes

- **Backend** : À implémenter plus tard (Edge Functions pour génération automatique)
- **Cron job** : À ajouter pour mise à jour quotidienne des playlists auto
- **Performance** : Pagination si beaucoup d'artistes
- **Filtres** : À ajouter en V2 (par genre, localisation, etc.)

---

## 14. Changelog

- **v2.1** (2025-11-22) : Implémentation complète ✅
  - ✅ Featured Artists corrigé : catégories d'artistes, filtres, produits ET/OU services
  - ✅ Featured Services créé : structure complète, composants, screen
  - ✅ Tous les composants créés avec stories Storybook
  - ✅ Wrappers React Navigation créés
  - ⏳ Navigation : routes à ajouter manuellement dans stack
- **v2.0** (2025-11-22) : Plan corrigé — Séparation Artistes/Services
  - ✅ Séparation claire : Featured Artists (artistes avec catégories) vs Featured Services
    (services par catégorie)
  - ✅ Catégories d'artistes : Beatmaker, Mixeur, Producteur, Studio, Artiste
  - ✅ Artistes peuvent avoir produits ET/OU services
  - ✅ Services organisés par catégorie (Mixing, Mastering, Recording, etc.)
- **v1.1** (2025-11-22) : Implémentation frontend complète ✅
  - Tous les composants créés
  - Stories Storybook ajoutées
  - Wrapper React Navigation créé
  - Données mockées (beatmakers + services)
- **v1.0** (2025-11-22) : Plan initial frontend uniquement
