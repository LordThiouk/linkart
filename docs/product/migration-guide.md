# Linkart — Guide de Migration Design System

> Version: v2.6 Auteur : Papa Diop Dernière mise à jour: 2025-10-28 Objectif : Plan de migration
> détaillé pour adapter les composants React Native existants au nouveau design moderne basé sur les
> screenshots. Phase 3 complétée avec composants adaptés et intégration complète.

---

## 1. Vue d'ensemble de la Migration

### 1.1 Objectifs

- **Adapter** les composants existants au nouveau design
- **Créer** les nouveaux composants nécessaires
- **Maintenir** la compatibilité avec l'architecture existante
- **Optimiser** les performances et l'expérience utilisateur

### 1.2 Stratégie de Migration

**Approche progressive :**

1. **Phase 1** : Composants de base (atoms) ✅ **COMPLÉTÉE**
2. **Phase 2** : Composants composés (molecules) ✅ **COMPLÉTÉE**
3. **Phase 3** : Sections complètes (organisms) ✅ **COMPLÉTÉE**
4. **Phase 4** : Upload Artwork & Multi-Pricing 🔄 **EN COURS**

**Principe de compatibilité :**

- Maintenir les props existantes
- Ajouter de nouveaux variants
- Éviter les breaking changes majeurs
- Tests de régression systématiques

## 2. Analyse des Composants Existants

### 2.1 Composants à Adapter

| Composant        | Fichier Actuel              | Modifications Nécessaires    | Priorité | Statut |
| ---------------- | --------------------------- | ---------------------------- | -------- | ------ |
| **Button**       | `atoms/Button.tsx`          | Ajouter variants fab, icon   | Haute    | 🔄     |
| **ProductCard**  | `atoms/ProductCard.tsx`     | Layout 2 colonnes, HeartIcon | Haute    | ✅     |
| **AudioPlayer**  | `molecules/AudioPlayer.tsx` | Layout sticky, HeartIcon     | Haute    | ✅     |
| **SearchBar**    | `molecules/SearchBar.tsx`   | Style header, placeholder    | Moyenne  | ✅     |
| **SectionTitle** | `atoms/SectionTitle.tsx`    | Action "Voir tout"           | Moyenne  | 🔄     |
| **TabBar**       | `organisms/TabBar.tsx`      | 5 tabs, FAB upload           | Moyenne  | 🔄     |
| **ProductList**  | `organisms/ProductList.tsx` | Grid 2 colonnes              | Moyenne  | 🔄     |
| **Header**       | `organisms/Header.tsx`      | Menu burger, avatar badge    | Basse    | 🔄     |

### 2.2 Nouveaux Composants à Créer

| Composant             | Fichier                           | Priorité | Dépendances    | Statut     |
| --------------------- | --------------------------------- | -------- | -------------- | ---------- |
| **HeartIcon**         | `atoms/HeartIcon.tsx`             | Haute    | Aucune         | ✅ Créé    |
| **PlayButton**        | `atoms/PlayButton.tsx`            | Haute    | Aucune         | ✅ Créé    |
| **MetricItem**        | `atoms/MetricItem.tsx`            | Haute    | Aucune         | ✅ Créé    |
| **ProductMetrics**    | `molecules/ProductMetrics.tsx`    | Haute    | MetricItem     | ✅ Créé    |
| **ServiceCard**       | `molecules/ServiceCard.tsx`       | Haute    | HeartIcon      | ✅ Créé    |
| **PlaylistCard**      | `molecules/PlaylistCard.tsx`      | Moyenne  | Aucune         | ✅ Créé    |
| **HeroBanner**        | `organisms/HeroBanner.tsx`        | Haute    | PlayButton     | ✅ Créé    |
| **FilterPills**       | `organisms/FilterPills.tsx`       | Haute    | Badge (adapté) | ✅ Créé    |
| **TrendingSection**   | `organisms/TrendingSection.tsx`   | Moyenne  | ProductCard    | 🔄 Phase 4 |
| **ServicesSection**   | `organisms/ServicesSection.tsx`   | Moyenne  | ServiceCard    | 🔄 Phase 4 |
| **MarketplaceHeader** | `organisms/MarketplaceHeader.tsx` | Moyenne  | SearchBar      | 🔄 Phase 4 |
| **ContentTabs**       | `organisms/ContentTabs.tsx`       | Moyenne  | Aucune         | 🔄 Phase 4 |
| **FeaturedPacks**     | `organisms/FeaturedPacks.tsx`     | Basse    | Aucune         | 🔄 Phase 4 |

## 3. Phase 1 : Composants de Base (Atoms) ✅ COMPLÉTÉE

### 3.1 Résumé des Réalisations

**Composants créés :**

- ✅ `HeartIcon` - Icône toggle favoris avec animation
- ✅ `PlayButton` - Bouton play/pause avec animation
- ✅ `MetricItem` - Affichage métriques (vues, downloads, likes)
- ✅ `ProductMetrics` - Groupe de métriques pour produits

**Tests et Documentation :**

- ✅ Tests unitaires pour tous les composants
- ✅ Stories Storybook pour tous les composants
- ✅ TypeScript strict avec types complets
- ✅ ESLint validation passée
- ✅ Storybook build réussi

**Utilitaires :**

- ✅ `formatMetricValue` - Formatage des nombres (1.2K, 1.5M)

### 3.2 Composants Créés

#### HeartIcon ✅

**Fichier :** `src/components/atoms/HeartIcon.tsx`

- Toggle favoris avec animation scale
- Feedback haptique sur iOS
- États visuels distincts (outline/filled)
- Support des tailles sm/md/lg
- Accessibilité complète

#### PlayButton ✅

**Fichier :** `src/components/atoms/PlayButton.tsx`

- Bouton play/pause avec animation
- Icônes Play/Pause de Lucide
- Support des tailles sm/md/lg
- Accessibilité avec labels

#### MetricItem ✅

**Fichier :** `src/components/atoms/MetricItem.tsx`

- Affichage icône + valeur formatée
- Support des icônes eye/download/heart
- Formatage automatique des nombres
- Couleurs personnalisables

#### ProductMetrics ✅

**Fichier :** `src/components/molecules/ProductMetrics.tsx`

- Groupe de 3 métriques (vues, downloads, likes)
- Layout horizontal/vertical
- Tailles sm/md
- Utilise MetricItem en interne

### 3.3 Tests et Validation

**Tests unitaires :**

- ✅ `formatMetricValue.test.ts` - 4 tests passés
- ✅ Tests pour tous les composants créés
- ⚠️ Problèmes Jest avec React Native Testing Library (à résoudre)

**Storybook :**

- ✅ Stories créées pour tous les composants
- ✅ Build Storybook réussi
- ✅ Interface disponible sur <http://localhost:6006/>

**Validation technique :**

- ✅ TypeScript compilation sans erreurs
- ✅ ESLint validation passée
- ✅ Exports mis à jour dans `index.ts`

## 4. Phase 2 : Composants Composés (Molecules) ✅ COMPLÉTÉE

### 4.1 Résumé des Réalisations Phase 2

**Composants créés :**

- ✅ `ServiceCard` - Cards pour services professionnels avec avatar et bouton réservation
- ✅ `PlaylistCard` - Cards pour playlists éditoriales avec PlayButton intégré
- ✅ `HeroBanner` - Grande carte featured avec gradient et boutons d'action
- ✅ `FilterPills` - Filtres scrollables horizontaux avec états actifs

**Tests et Documentation :**

- ✅ Tests unitaires pour tous les composants Phase 2
- ✅ Stories Storybook pour tous les composants Phase 2
- ✅ TypeScript strict avec types complets
- ✅ ESLint validation passée
- ✅ Storybook build réussi et accessible sur <http://localhost:6006/>

**Architecture :**

- ✅ Composants modulaires et réutilisables
- ✅ Props interfaces bien définies
- ✅ Intégration avec le système de thème existant
- ✅ Callbacks pour gestion des interactions

### 4.2 ServiceCard ✅ COMPLÉTÉ

**Fichier :** `src/components/molecules/ServiceCard.tsx`

**Réalisations :**

- ✅ Layout horizontal avec avatar et informations prestataire
- ✅ Informations complètes : titre, prestataire, description, prix, catégorie
- ✅ Bouton "Réserver" intégré avec callback
- ✅ HeartIcon pour favoris (optionnel)
- ✅ Badge de vérification pour prestataires vérifiés
- ✅ Design cohérent avec ProductCard
- ✅ Tests unitaires complets
- ✅ Stories Storybook avec différents états

### 4.3 PlaylistCard ✅ COMPLÉTÉ

**Fichier :** `src/components/molecules/PlaylistCard.tsx`

**Réalisations :**

- ✅ Layout vertical avec image de couverture
- ✅ Métadonnées complètes : titre, description, typebeat, ambiance, nombre de beats
- ✅ PlayButton intégré avec états play/pause
- ✅ Gradient overlay pour lisibilité du texte
- ✅ Badge de durée (optionnel)
- ✅ Navigation vers PlaylistDetailScreen
- ✅ Tests unitaires complets
- ✅ Stories Storybook avec différents genres musicaux

### 4.4 HeroBanner ✅ COMPLÉTÉ

**Fichier :** `src/components/organisms/HeroBanner.tsx`

**Réalisations :**

- ✅ Image de fond avec gradient overlay
- ✅ Informations complètes : titre, artiste, durée, description
- ✅ Boutons "Écouter" et "Acheter" avec callbacks
- ✅ Layout responsive et accessible
- ✅ Intégration avec PlayButton
- ✅ Design moderne avec LinearGradient
- ✅ Tests unitaires complets
- ✅ Stories Storybook avec différents contenus

### 4.5 FilterPills ✅ COMPLÉTÉ

**Fichier :** `src/components/organisms/FilterPills.tsx`

**Réalisations :**

- ✅ Scroll horizontal des filtres
- ✅ Pills avec icônes et labels
- ✅ États actif/inactif avec styles distincts
- ✅ Bouton de suppression pour filtres actifs
- ✅ Intégration avec Badge existant
- ✅ Callbacks pour gestion des états
- ✅ Tests unitaires complets
- ✅ Stories Storybook avec différents scénarios

## 5. Phase 3 : Sections Complètes (Organisms) ✅ COMPLÉTÉE

### 5.1 Résumé des Réalisations Phase 3

**Composants adaptés :**

- ✅ `ProductCard` - Adapté avec HeartIcon et ProductMetrics intégrés
- ✅ `SearchBar` - Simplifié avec nouveau style moderne
- ✅ `AudioPlayer` - Transformé en MiniPlayer avec HeartIcon intégré

**Tests et Documentation :**

- ✅ Tests unitaires mis à jour pour tous les composants Phase 3
- ✅ Stories Storybook mises à jour pour tous les composants Phase 3
- ✅ TypeScript strict avec types complets
- ✅ ESLint validation passée
- ✅ Storybook build réussi et accessible sur <http://localhost:6006/>

**Architecture :**

- ✅ Composants modulaires et réutilisables
- ✅ Intégration complète avec les nouveaux composants Phase 1 et 2
- ✅ Styles gérés via le thème (pas de StyleSheet.create)
- ✅ Callbacks pour gestion des interactions

### 5.2 ProductCard ✅ COMPLÉTÉ

**Fichier :** `src/components/atoms/ProductCard.tsx`

**Réalisations :**

- ✅ Transformation en card complète avec image, titre, artiste, prix
- ✅ HeartIcon intégré en position absolue (top-right)
- ✅ ProductMetrics intégré en bas de la card
- ✅ PlayButton pour preview intégré
- ✅ Layout 2 colonnes compatible (flex: 1)
- ✅ Styles inline avec theme.colors, theme.spacing
- ✅ Tests unitaires complets avec nouveaux props
- ✅ Stories Storybook avec différents états

### 5.3 SearchBar ✅ COMPLÉTÉ

**Fichier :** `src/components/molecules/SearchBar.tsx`

**Réalisations :**

- ✅ Simplification pour focus sur la barre de recherche uniquement
- ✅ Style moderne aligné avec le header
- ✅ Placeholder: "Rechercher beats, artistes, services..."
- ✅ Icônes Search de Lucide au lieu de Material
- ✅ Styles inline avec theme uniquement
- ✅ Tests unitaires mis à jour
- ✅ Stories Storybook avec différents états

### 5.4 AudioPlayer (MiniPlayer) ✅ COMPLÉTÉ

**Fichier :** `src/components/molecules/AudioPlayer.tsx`

**Réalisations :**

- ✅ Transformation en MiniPlayer sticky avec HeartIcon
- ✅ Artwork thumbnail (40x40px) intégré
- ✅ HeartIcon à droite des contrôles
- ✅ Layout horizontal: [Artwork] [Title/Artist + Progress] [Heart] [Play/Pause] [Next]
- ✅ Bouton Next (SkipForward icon) ajouté
- ✅ Rendu sticky-capable (via prop position)
- ✅ Styles inline avec theme uniquement
- ✅ Tests unitaires mis à jour
- ✅ Stories Storybook créées avec différents états

## 6. Phase 4 : Upload Artwork & Multi-Pricing ✅ COMPLÉTÉE

### 6.1 Résumé des Réalisations Phase 4

**Composants créés/adaptés:**

- ✅ `ProductUploadForm` - Formulaire avec artwork upload et multi-licensing
- ✅ `ServiceUploadForm` - Formulaire avec multi-pricing tiers
- ✅ `UploadFormContainer` - Container avec tabs Produit/Service
- ✅ `FavoritesScreen` - Écran favoris avec grid
- ✅ `PlaylistDetailScreen` - Écran détail playlist
- ✅ `ProductPreview` - Adaptation au nouveau design avec HeartIcon et ProductMetrics
- ✅ Composants obsolètes marqués @deprecated

**Fonctionnalités ajoutées:**

- ✅ Artwork upload avec validation et aperçu
- ✅ Multi-licensing pour products (Basic, Non-Exclusive, Exclusive, Lease)
- ✅ Multi-pricing pour services (Fixed, On-Demand, Tiered)
- ✅ Stores Zustand (favorites, playlists)
- ✅ Tests unitaires et stories pour nouveaux composants
- ✅ Stories créées pour tous les composants publics réutilisables
- ✅ Placeholders créés pour composants futurs (Phase 5)

**Tests et Documentation:**

- ✅ Tests unitaires complets utilisant les stories comme fixtures (CSF Testing)
- ✅ WebLinearGradient créé pour compatibilité Storybook Web/Native
- ✅ HeroBanner corrigé pour affichage dans Storybook
- ✅ Tests pour tous les composants Phase 4 (HeroBanner, HeartIcon, PlayButton, ProductCard,
  ServiceCard, PlaylistCard, FilterPills, ProductUploadForm, ServiceUploadForm)
- ✅ Documentation mise à jour avec guide de tests

**Prochaines étapes:**

- Adapter ProductsScreen pour utiliser le nouveau ProductCard
- Implémenter le vrai upload d'images (actuellement placeholder)
- Finaliser les tests E2E
- Compléter les migrations DB
- Implémenter les composants Phase 5 (TrendingSection, ServicesSection, etc.)

### 6.2 Composants Deprecated

**Composants atomiques fragmentés marqués @deprecated:**

- ⚠️ `ProductFooter` - Remplacé par ProductCard unifié
- ⚠️ `ProductIcon` - Remplacé par ProductCard unifié
- ⚠️ `ProductInfo` - Remplacé par ProductCard unifié
- ⚠️ `ProductPrice` - Remplacé par ProductCard unifié
- ⚠️ `ProductTags` - Remplacé par ProductCard unifié
- ⚠️ `ProductTitle` - Remplacé par ProductCard unifié
- ⚠️ `RatingContainer` - Remplacé par ProductCard unifié
- ⚠️ `UploadForm` - Remplacé par ProductUploadForm/ServiceUploadForm

**Note:** Ces composants restent fonctionnels mais seront supprimés dans la v3.0.

### 6.3 ProductPreview Adapté

**Fichier :** `src/components/molecules/ProductPreview.tsx`

**Réalisations:**

- ✅ Remplacement des composants fragmentés par des styles inline
- ✅ HeartIcon intégré en position absolue
- ✅ ProductMetrics intégré si métriques fournies
- ✅ Support des images avec placeholder
- ✅ Layout simplifié pour correspondre au nouveau design
- ✅ Compatibilité maintenue avec ProductList
- ✅ Tests unitaires et stories créés

**Nouvelles Props:**

```typescript
interface ProductPreviewProps {
  // ... props existantes
  viewCount?: number;
  downloadCount?: number;
  likeCount?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  imageUrl?: string;
}
```

### 6.4 Stories Créées

**Composants avec nouvelles stories:**

- ✅ `ProductPreview.stories.tsx` - Stories avec différents types de produits
- ✅ `ProductList.stories.tsx` - Stories avec loading, empty, error states
- ✅ `UploadScreen.stories.tsx` - Stories avec UploadFormContainer
- ✅ `ProductsScreen.stories.tsx` - Stories avec liste de produits
- ✅ `ProductDetailScreen.stories.tsx` - Stories avec produit détaillé
- ✅ `HeroBanner.stories.tsx` - Stories corrigées pour correspondre aux props actuelles

### 6.5 Composants Futurs (Phase 5)

**Placeholders créés avec TODO comments:**

- 🔄 `TrendingSection` - Section horizontale des tendances
- 🔄 `ServicesSection` - Section verticale des services
- 🔄 `MarketplaceHeader` - Header avec search et filters
- 🔄 `ContentTabs` - Tabs de navigation contenu
- 🔄 `FeaturedPacks` - Section packs featured

**Note:** Ces composants sont fonctionnels mais marqués comme "TODO: Phase 5" avec des
fonctionnalités limitées.

### 6.6 WebLinearGradient (Nouveau)

**Fichier :** `src/components/atoms/WebLinearGradient.tsx`

**Réalisations:**

- ✅ Wrapper compatible Web/Native pour LinearGradient
- ✅ Détection automatique de l'environnement (Platform.OS)
- ✅ CSS gradient natif sur Web, expo-linear-gradient sur Native
- ✅ Résolution du problème d'écran blanc dans Storybook
- ✅ Interface TypeScript complète avec props étendues
- ✅ Export dans index.ts des atoms

**Utilisation:**

```typescript
import { WebLinearGradient as LinearGradient } from '../atoms/WebLinearGradient';

// Utilisation identique à expo-linear-gradient
<LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.gradient}>
  {children}
</LinearGradient>
```

### 6.7 Tests Unitaires avec Stories (CSF Testing)

**Réalisations:**

- ✅ Tests unitaires pour tous les composants Phase 4
- ✅ Utilisation de `composeStories` pour réutiliser les stories comme fixtures
- ✅ Évite la duplication de code entre tests et stories
- ✅ Tests d'interaction (onPress, onToggle, onPlay, etc.)
- ✅ Tests de validation et d'états (favorited, playing, disabled)
- ✅ Tests de rendu avec différents props (tailles, contenus)

**Structure des tests:**

```
src/
  components/
    atoms/
      __tests__/
        HeartIcon.test.tsx (utilise HeartIcon.stories.tsx)
        PlayButton.test.tsx (utilise PlayButton.stories.tsx)
        ProductCard.test.tsx (utilise ProductCard.stories.tsx)
    molecules/
      __tests__/
        ServiceCard.test.tsx (utilise ServiceCard.stories.tsx)
        PlaylistCard.test.tsx (utilise PlaylistCard.stories.tsx)
    organisms/
      __tests__/
        HeroBanner.test.tsx (utilise HeroBanner.stories.tsx)
        FilterPills.test.tsx (utilise FilterPills.stories.tsx)
  features/
    products/
      components/
        __tests__/
          ProductUploadForm.test.tsx (utilise ProductUploadForm.stories.tsx)
    services/
      components/
        __tests__/
          ServiceUploadForm.test.tsx (utilise ServiceUploadForm.stories.tsx)
```

### 6.8 Intégration HeartIcon

**Dans ProductCard :**

```typescript
// Ajouter HeartIcon dans ProductCard
<View style={styles.imageContainer}>
  <Image source={{ uri: imageUrl }} style={styles.image} />
  <View style={styles.heartIcon}>
    <HeartIcon
      productId={id}
      isFavorite={isFavorite}
      onToggle={onToggleFavorite}
      size="md"
    />
  </View>
</View>
```

**Dans MiniPlayer :**

```typescript
// Ajouter HeartIcon dans MiniPlayer
<View style={styles.controls}>
  <HeartIcon
    productId={currentBeat.id}
    isFavorite={currentBeat.isFavorite}
    onToggle={onToggleFavorite}
    size="sm"
  />
  <PlayButton
    isPlaying={isPlaying}
    size="md"
    onPress={onPlayPause}
  />
  <TouchableOpacity onPress={onNext}>
    <SkipForward size={24} color={theme.colors.onSurface} />
  </TouchableOpacity>
</View>
```

### 6.2 Store Zustand pour Favoris

**Fichier :** `src/store/favoritesStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Favorite {
  id: string;
  product_id: string;
  created_at: string;
}

interface FavoritesStore {
  favorites: Map<string, Favorite>;
  loading: boolean;
  error: string | null;

  toggleFavorite: (productId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Map(),
      loading: false,
      error: null,

      toggleFavorite: async (productId: string) => {
        const { favorites, isFavorite } = get();
        const currentState = isFavorite(productId);

        // Optimistic update
        set(state => {
          const newFavorites = new Map(state.favorites);
          if (currentState) {
            newFavorites.delete(productId);
          } else {
            newFavorites.set(productId, {
              id: `${productId}-${Date.now()}`,
              product_id: productId,
              created_at: new Date().toISOString(),
            });
          }
          return { favorites: newFavorites };
        });

        try {
          if (currentState) {
            await api.delete(`/favorites/${productId}`);
          } else {
            await api.post('/favorites', { product_id: productId });
          }
        } catch (error) {
          // Rollback optimistic update
          set(state => {
            const newFavorites = new Map(state.favorites);
            if (currentState) {
              newFavorites.set(productId, favorites.get(productId)!);
            } else {
              newFavorites.delete(productId);
            }
            return {
              favorites: newFavorites,
              error: 'Erreur lors de la mise à jour des favoris',
            };
          });
        }
      },

      loadFavorites: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get('/favorites');
          const favoritesMap = new Map();
          response.data.favorites.forEach((fav: Favorite) => {
            favoritesMap.set(fav.product_id, fav);
          });
          set({ favorites: favoritesMap, loading: false });
        } catch (error) {
          set({
            loading: false,
            error: 'Erreur lors du chargement des favoris',
          });
        }
      },

      isFavorite: (productId: string) => {
        return get().favorites.has(productId);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);
```

## 7. Tests de Migration

### 7.1 Tests de Régression

```typescript
// Tests pour vérifier que les composants existants fonctionnent toujours
describe('Migration Regression Tests', () => {
  it('should maintain existing Button functionality', () => {
    render(<Button variant="primary" onPress={mockPress}>Test</Button>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('should maintain existing ProductCard functionality', () => {
    render(
      <ProductCard
        id="123"
        title="Test Beat"
        artist="Test Artist"
        price={25}
        imageUrl="test.jpg"
        onPress={mockPress}
      />
    );
    expect(screen.getByText('Test Beat')).toBeTruthy();
  });
});
```

### 7.2 Tests des Nouveaux Composants

```typescript
describe('New Components Tests', () => {
  it('should render HeartIcon correctly', () => {
    render(
      <HeartIcon
        productId="123"
        isFavorite={false}
        onToggle={mockToggle}
      />
    );
    expect(screen.getByTestId('heart-icon')).toBeTruthy();
  });

  it('should render PlayButton correctly', () => {
    render(
      <PlayButton
        isPlaying={false}
        size="md"
        onPress={mockPress}
      />
    );
    expect(screen.getByTestId('play-button')).toBeTruthy();
  });
});
```

## 8. Plan de Déploiement

### 8.1 Phases de Déploiement

**Phase 1 (Semaine 1-2) :** ✅ **COMPLÉTÉE**

- ✅ Créer HeartIcon et PlayButton
- ✅ Créer MetricItem et ProductMetrics
- ✅ Tests unitaires
- ✅ Stories Storybook

**Phase 2 (Semaine 3-4) :** ✅ **COMPLÉTÉE**

- ✅ Créer ServiceCard et PlaylistCard
- ✅ Créer HeroBanner et FilterPills
- ✅ Tests unitaires et Stories Storybook
- 🔄 Adapter ProductCard avec HeartIcon (Phase 3)

**Phase 3 (Semaine 5-6) :** ✅ **COMPLÉTÉE**

- ✅ Adapter ProductCard avec HeartIcon et ProductMetrics
- ✅ Adapter SearchBar avec nouveau style moderne
- ✅ Transformer AudioPlayer en MiniPlayer avec HeartIcon
- ✅ Tests unitaires et Stories Storybook mis à jour
- ✅ Documentation mise à jour avec statut Phase 3

**Phase 4 (Semaine 7-8) :**

- Intégrer store Zustand pour favoris
- Créer écran Favoris
- Tests de performance

### 8.2 Stratégie de Rollout

**Feature Flags :**

```typescript
const useFeatureFlags = () => {
  return {
    newDesignSystem: process.env.EXPO_PUBLIC_NEW_DESIGN === 'true',
    favoritesEnabled: process.env.EXPO_PUBLIC_FAVORITES === 'true',
    playlistsEnabled: process.env.EXPO_PUBLIC_PLAYLISTS === 'true',
  };
};
```

**Rollout Progressif :**

1. **10%** des utilisateurs (test interne)
2. **25%** des utilisateurs (beta testeurs)
3. **50%** des utilisateurs (test A/B)
4. **100%** des utilisateurs (déploiement complet)

## 9. Monitoring et Métriques

### 9.1 Métriques de Migration

- **Taux d'adoption** des nouveaux composants
- **Performance** des composants migrés
- **Erreurs** liées à la migration
- **Satisfaction utilisateur** (surveys)

### 9.2 Alertes

- **Erreurs** dans les nouveaux composants
- **Performance** dégradée
- **Crashs** liés à la migration
- **Taux d'erreur** API favoris

## 10. Rollback Plan

### 10.1 Stratégie de Rollback

**Si problèmes majeurs :**

1. **Désactiver** les feature flags
2. **Revenir** aux composants précédents
3. **Analyser** les logs d'erreur
4. **Corriger** les problèmes identifiés
5. **Redéployer** avec corrections

**Temps de rollback :** < 5 minutes

### 10.2 Points de Contrôle

- **Tests** de régression passent
- **Performance** maintenue
- **Erreurs** < 0.1%
- **Satisfaction** utilisateur > 4/5

---

## Changelog

- **v2.3** (2025-10-28) - Phase 3 complétée : ProductCard, SearchBar, AudioPlayer adaptés avec
  nouveaux composants
- **v2.3** (2025-10-28) - Tests unitaires et Stories Storybook mis à jour pour tous les composants
  Phase 3
- **v2.3** (2025-10-28) - Documentation mise à jour avec statut des composants Phase 3
- **v2.2** - Phase 2 complétée : ServiceCard, PlaylistCard, HeroBanner, FilterPills créés
- **v2.2** - Tests unitaires et Stories Storybook pour tous les composants Phase 2
- **v2.2** - Documentation mise à jour avec statut des composants Phase 2
- **v2.1** - Phase 1 complétée : HeartIcon, PlayButton, MetricItem, ProductMetrics créés
- **v2.1** - Tests unitaires et Stories Storybook pour tous les composants Phase 1
- **v2.1** - Documentation mise à jour avec statut des composants
- **v2.0** - Guide de migration complet
- **v2.0** - Plan de déploiement par phases
- **v2.0** - Tests de régression et nouveaux composants
- **v2.0** - Stratégie de rollback et monitoring

### 3.1 HeartIcon (NOUVEAU)

**Fichier :** `src/components/atoms/HeartIcon.tsx`

**Implémentation :**

```typescript
import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

interface HeartIconProps {
  productId: string;
  isFavorite: boolean;
  size?: 'sm' | 'md' | 'lg';
  onToggle: (productId: string, isFavorite: boolean) => void;
  disabled?: boolean;
  showAnimation?: boolean;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  productId,
  isFavorite,
  size = 'md',
  onToggle,
  disabled = false,
  showAnimation = true,
}) => {
  const theme = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;

    // Animation
    if (showAnimation) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    onToggle(productId, !isFavorite);
  };

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  const iconColor = isFavorite ? theme.colors.music?.pink : theme.colors.outline;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={{
        padding: theme.spacing.sm,
        borderRadius: theme.roundness,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Heart
          size={iconSize}
          color={iconColor}
          fill={isFavorite ? iconColor : 'transparent'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
```

**Tests :**

```typescript
// src/components/atoms/__tests__/HeartIcon.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { HeartIcon } from '../HeartIcon';

describe('HeartIcon', () => {
  it('should toggle favorite on press', () => {
    const mockToggle = jest.fn();
    render(
      <HeartIcon
        productId="123"
        isFavorite={false}
        onToggle={mockToggle}
      />
    );

    fireEvent.press(screen.getByTestId('heart-icon'));
    expect(mockToggle).toHaveBeenCalledWith('123', true);
  });
});
```

### 3.2 PlayButton (NOUVEAU)

**Fichier :** `src/components/atoms/PlayButton.tsx`

**Implémentation :**

```typescript
import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

interface PlayButtonProps {
  isPlaying: boolean;
  size: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  size,
  onPress,
  disabled = false,
}) => {
  const theme = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;

    // Animation de press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const buttonSize = size === 'sm' ? 32 : size === 'md' ? 40 : 48;
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={{
        width: buttonSize,
        height: buttonSize,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {isPlaying ? (
          <Pause size={iconSize} color={theme.colors.onPrimary} />
        ) : (
          <Play size={iconSize} color={theme.colors.onPrimary} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
```

### 3.3 Button (ADAPTER)

**Fichier :** `src/components/atoms/Button.tsx`

**Modifications :**

```typescript
// Ajouter les nouveaux variants
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'fab' | 'icon';
  size: 'sm' | 'md' | 'lg';
  // ... props existantes
}

// Styles pour FAB
const fabStyles = {
  width: 56,
  height: 56,
  borderRadius: theme.roundness,
  backgroundColor: theme.colors.primary,
  shadowColor: theme.colors.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,
};

// Styles pour Icon
const iconStyles = {
  width: 40,
  height: 40,
  borderRadius: theme.roundness,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
};
```

## 4. Phase 2 : Composants Composés (Molecules)

### 4.1 ProductCard (ADAPTER)

**Fichier :** `src/components/atoms/ProductCard.tsx`

**Modifications :**

```typescript
// Ajouter HeartIcon
import { HeartIcon } from './HeartIcon';

interface ProductCardProps {
  // ... props existantes
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

// Layout 2 colonnes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  heartIcon: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 1,
  },
  content: {
    paddingTop: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fonts.titleMedium.fontSize,
    fontFamily: theme.fonts.titleMedium.fontFamily,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  artist: {
    fontSize: theme.fonts.bodySmall.fontSize,
    fontFamily: theme.fonts.bodySmall.fontFamily,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTag: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.roundness / 2,
  },
  priceText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.labelMedium.fontSize,
    fontFamily: theme.fonts.labelMedium.fontFamily,
  },
});
```

### 4.2 ServiceCard (NOUVEAU)

**Fichier :** `src/components/molecules/ServiceCard.tsx`

**Implémentation :**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';

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

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  provider,
  description,
  priceFrom,
  avatarUrl,
  onPress,
  onBook,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Avatar
        source={{ uri: avatarUrl }}
        size="md"
        style={{ marginRight: theme.spacing.md }}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.fonts.titleMedium.fontSize,
            fontFamily: theme.fonts.titleMedium.fontFamily,
            color: theme.colors.onSurface,
            marginBottom: theme.spacing.xs,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: theme.fonts.bodySmall.fontSize,
            fontFamily: theme.fonts.bodySmall.fontFamily,
            color: theme.colors.onSurfaceVariant,
            marginBottom: theme.spacing.xs,
          }}
        >
          {provider}
        </Text>

        <Text
          style={{
            fontSize: theme.fonts.bodySmall.fontSize,
            fontFamily: theme.fonts.bodySmall.fontFamily,
            color: theme.colors.onSurfaceVariant,
            marginBottom: theme.spacing.sm,
          }}
          numberOfLines={2}
        >
          {description}
        </Text>

        <Text
          style={{
            fontSize: theme.fonts.labelMedium.fontSize,
            fontFamily: theme.fonts.labelMedium.fontFamily,
            color: theme.colors.secondary,
            marginBottom: theme.spacing.sm,
          }}
        >
          À partir de ${priceFrom}
        </Text>

        <Button
          variant="primary"
          size="sm"
          onPress={onBook}
          style={{ alignSelf: 'flex-start' }}
        >
          Réserver
        </Button>
      </View>
    </TouchableOpacity>
  );
};
```

## 5. Phase 3 : Sections Complètes (Organisms)

### 5.1 HeroBanner (NOUVEAU)

**Fichier :** `src/components/organisms/HeroBanner.tsx`

**Implémentation :**

```typescript
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { PlayButton } from '../atoms/PlayButton';
import { Button } from '../atoms/Button';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  artist: string;
  imageUrl: string;
  duration: string;
  onListen: () => void;
  onBuy: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  artist,
  imageUrl,
  duration,
  onListen,
  onBuy,
}) => {
  const theme = useTheme();

  return (
    <View style={{ marginHorizontal: theme.spacing.md, marginBottom: theme.spacing.lg }}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={{
          height: 200,
          borderRadius: theme.roundness,
          overflow: 'hidden',
        }}
        imageStyle={{ borderRadius: theme.roundness }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={{
            flex: 1,
            padding: theme.spacing.lg,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: theme.fonts.headlineMedium.fontSize,
                fontFamily: theme.fonts.headlineMedium.fontFamily,
                color: theme.colors.onSurface,
                marginBottom: theme.spacing.xs,
              }}
            >
              {title}
            </Text>

            <Text
              style={{
                fontSize: theme.fonts.bodyMedium.fontSize,
                fontFamily: theme.fonts.bodyMedium.fontFamily,
                color: theme.colors.onSurfaceVariant,
                marginBottom: theme.spacing.sm,
              }}
            >
              by {artist}
            </Text>

            <Text
              style={{
                fontSize: theme.fonts.bodySmall.fontSize,
                fontFamily: theme.fonts.bodySmall.fontFamily,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {duration}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              variant="secondary"
              size="md"
              onPress={onListen}
              style={{ flex: 1, marginRight: theme.spacing.sm }}
            >
              Écouter
            </Button>

            <Button
              variant="primary"
              size="md"
              onPress={onBuy}
              style={{ flex: 1 }}
            >
              Acheter
            </Button>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
```

### 5.2 FilterPills (NOUVEAU)

**Fichier :** `src/components/organisms/FilterPills.tsx`

**Implémentation :**

```typescript
import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { X } from 'lucide-react-native';

interface Filter {
  id: string;
  label: string;
  icon: string;
}

interface FilterPillsProps {
  filters: Filter[];
  activeFilters: string[];
  onFilterPress: (filterId: string) => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  activeFilters,
  onFilterPress,
}) => {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}
    >
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);

        return (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterPress(filter.id)}
            style={{
              backgroundColor: isActive ? theme.colors.primary : theme.colors.surfaceVariant,
              borderRadius: theme.roundness,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              marginRight: theme.spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: theme.fonts.labelMedium.fontSize,
                fontFamily: theme.fonts.labelMedium.fontFamily,
                color: isActive ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                marginRight: theme.spacing.xs,
              }}
            >
              {filter.label}
            </Text>

            {isActive && (
              <X
                size={16}
                color={theme.colors.onPrimary}
                onPress={() => onFilterPress(filter.id)}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
```

## 6. Phase 4 : Nouvelles Fonctionnalités

### 6.1 Intégration HeartIcon

**Dans ProductCard :**

```typescript
// Ajouter HeartIcon dans ProductCard
<View style={styles.imageContainer}>
  <Image source={{ uri: imageUrl }} style={styles.image} />
  <View style={styles.heartIcon}>
    <HeartIcon
      productId={id}
      isFavorite={isFavorite}
      onToggle={onToggleFavorite}
      size="md"
    />
  </View>
</View>
```

**Dans MiniPlayer :**

```typescript
// Ajouter HeartIcon dans MiniPlayer
<View style={styles.controls}>
  <HeartIcon
    productId={currentBeat.id}
    isFavorite={currentBeat.isFavorite}
    onToggle={onToggleFavorite}
    size="sm"
  />
  <PlayButton
    isPlaying={isPlaying}
    size="md"
    onPress={onPlayPause}
  />
  <TouchableOpacity onPress={onNext}>
    <SkipForward size={24} color={theme.colors.onSurface} />
  </TouchableOpacity>
</View>
```

### 6.2 Store Zustand pour Favoris

**Fichier :** `src/store/favoritesStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Favorite {
  id: string;
  product_id: string;
  created_at: string;
}

interface FavoritesStore {
  favorites: Map<string, Favorite>;
  loading: boolean;
  error: string | null;

  toggleFavorite: (productId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Map(),
      loading: false,
      error: null,

      toggleFavorite: async (productId: string) => {
        const { favorites, isFavorite } = get();
        const currentState = isFavorite(productId);

        // Optimistic update
        set(state => {
          const newFavorites = new Map(state.favorites);
          if (currentState) {
            newFavorites.delete(productId);
          } else {
            newFavorites.set(productId, {
              id: `${productId}-${Date.now()}`,
              product_id: productId,
              created_at: new Date().toISOString(),
            });
          }
          return { favorites: newFavorites };
        });

        try {
          if (currentState) {
            await api.delete(`/favorites/${productId}`);
          } else {
            await api.post('/favorites', { product_id: productId });
          }
        } catch (error) {
          // Rollback optimistic update
          set(state => {
            const newFavorites = new Map(state.favorites);
            if (currentState) {
              newFavorites.set(productId, favorites.get(productId)!);
            } else {
              newFavorites.delete(productId);
            }
            return {
              favorites: newFavorites,
              error: 'Erreur lors de la mise à jour des favoris',
            };
          });
        }
      },

      loadFavorites: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get('/favorites');
          const favoritesMap = new Map();
          response.data.favorites.forEach((fav: Favorite) => {
            favoritesMap.set(fav.product_id, fav);
          });
          set({ favorites: favoritesMap, loading: false });
        } catch (error) {
          set({
            loading: false,
            error: 'Erreur lors du chargement des favoris',
          });
        }
      },

      isFavorite: (productId: string) => {
        return get().favorites.has(productId);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);
```

## 7. Tests de Migration

### 7.1 Tests de Régression

```typescript
// Tests pour vérifier que les composants existants fonctionnent toujours
describe('Migration Regression Tests', () => {
  it('should maintain existing Button functionality', () => {
    render(<Button variant="primary" onPress={mockPress}>Test</Button>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('should maintain existing ProductCard functionality', () => {
    render(
      <ProductCard
        id="123"
        title="Test Beat"
        artist="Test Artist"
        price={25}
        imageUrl="test.jpg"
        onPress={mockPress}
      />
    );
    expect(screen.getByText('Test Beat')).toBeTruthy();
  });
});
```

### 7.2 Tests des Nouveaux Composants

```typescript
describe('New Components Tests', () => {
  it('should render HeartIcon correctly', () => {
    render(
      <HeartIcon
        productId="123"
        isFavorite={false}
        onToggle={mockToggle}
      />
    );
    expect(screen.getByTestId('heart-icon')).toBeTruthy();
  });

  it('should render PlayButton correctly', () => {
    render(
      <PlayButton
        isPlaying={false}
        size="md"
        onPress={mockPress}
      />
    );
    expect(screen.getByTestId('play-button')).toBeTruthy();
  });
});
```

## 8. Plan de Déploiement

### 8.1 Phases de Déploiement

**Phase 1 (Semaine 1-2) :**

- Créer HeartIcon et PlayButton
- Adapter Button avec nouveaux variants
- Tests unitaires

**Phase 2 (Semaine 3-4) :**

- Adapter ProductCard avec HeartIcon
- Créer ServiceCard
- Tests d'intégration

**Phase 3 (Semaine 5-6) :**

- Créer HeroBanner et FilterPills
- Adapter AudioPlayer (MiniPlayer)
- Tests E2E

**Phase 4 (Semaine 7-8) :**

- Intégrer store Zustand pour favoris
- Créer écran Favoris
- Tests de performance

### 8.2 Stratégie de Rollout

**Feature Flags :**

```typescript
const useFeatureFlags = () => {
  return {
    newDesignSystem: process.env.EXPO_PUBLIC_NEW_DESIGN === 'true',
    favoritesEnabled: process.env.EXPO_PUBLIC_FAVORITES === 'true',
    playlistsEnabled: process.env.EXPO_PUBLIC_PLAYLISTS === 'true',
  };
};
```

**Rollout Progressif :**

1. **10%** des utilisateurs (test interne)
2. **25%** des utilisateurs (beta testeurs)
3. **50%** des utilisateurs (test A/B)
4. **100%** des utilisateurs (déploiement complet)

## 9. Monitoring et Métriques

### 9.1 Métriques de Migration

- **Taux d'adoption** des nouveaux composants
- **Performance** des composants migrés
- **Erreurs** liées à la migration
- **Satisfaction utilisateur** (surveys)

### 9.2 Alertes

- **Erreurs** dans les nouveaux composants
- **Performance** dégradée
- **Crashs** liés à la migration
- **Taux d'erreur** API favoris

## 10. Rollback Plan

### 10.1 Stratégie de Rollback

**Si problèmes majeurs :**

1. **Désactiver** les feature flags
2. **Revenir** aux composants précédents
3. **Analyser** les logs d'erreur
4. **Corriger** les problèmes identifiés
5. **Redéployer** avec corrections

**Temps de rollback :** < 5 minutes

### 10.2 Points de Contrôle

- **Tests** de régression passent
- **Performance** maintenue
- **Erreurs** < 0.1%
- **Satisfaction** utilisateur > 4/5

---

## Changelog

- **v2.6** (2025-10-29) - Tests visuels avec Storybook Test Runner configurés
- **v2.6** (2025-10-29) - Tests A11y automatiques avec addon a11y
- **v2.6** (2025-10-29) - Play functions pour HeroBanner et HeartIcon
- **v2.6** (2025-10-29) - Guide complet de tests Storybook et visual regression
- **v2.5** (2025-10-29) - Phase 4 complétée : Tests unitaires avec CSF Testing, WebLinearGradient,
  HeroBanner corrigé
- **v2.5** (2025-10-29) - Tests unitaires pour tous les composants Phase 4 utilisant les stories
  comme fixtures
- **v2.5** (2025-10-29) - WebLinearGradient créé pour compatibilité Storybook Web/Native
- **v2.5** (2025-10-29) - HeroBanner corrigé pour affichage dans Storybook avec gradients
