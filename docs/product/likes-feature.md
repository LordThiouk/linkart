# Linkart — Système de Likes (Favoris)

> Version: v2.0 Auteur : Papa Diop Objectif : Spécifications complètes du système de likes/favoris
> pour permettre aux utilisateurs de sauvegarder leurs beats préférés.

---

## 1. Vue d'ensemble

Le système de likes permet aux utilisateurs de **marquer leurs beats préférés** pour les retrouver
facilement. C'est un système de **favoris personnels** avec synchronisation temps réel et interface
optimiste.

## 2. Principe de Fonctionnement

### 2.1 Fonctionnalités

**Utilisateur :**

- ✅ Toggle favorite sur Product Cards
- ✅ Toggle favorite sur Mini Player
- ✅ Consulter ses favoris dans un écran dédié
- ✅ Synchronisation automatique avec le backend
- ✅ Interface optimiste (feedback immédiat)

**Système :**

- ✅ Stockage persistant des favoris
- ✅ Synchronisation temps réel
- ✅ Gestion des conflits (offline/online)
- ✅ Performance optimisée (cache local)

### 2.2 États Visuels

**Heart Icon :**

- **Outline** : `colors.dark['400']` - Beat non favori
- **Filled** : `colors.music.pink` (#EC4899) - Beat favori
- **Animation** : Scale (0.9 → 1.1 → 1.0) + changement couleur

**États d'Interaction :**

- **Default** : État normal
- **Pressed** : Scale 0.95 + feedback haptique
- **Loading** : Opacity 0.7 + spinner (si sync en cours)
- **Error** : Retour à l'état précédent + toast d'erreur

## 3. Modèle de Données

### 3.1 Table `favorites`

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Contrainte unique : un user ne peut liker qu'une fois le même beat
  UNIQUE(user_id, product_id)
);

-- Index pour performance
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_product_id ON favorites(product_id);
CREATE INDEX idx_favorites_created_at ON favorites(user_id, created_at DESC);
```

### 3.2 RLS Policies

```sql
-- Activer RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policy : Users peuvent voir leurs propres favoris
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (user_id = auth.uid());

-- Policy : Users peuvent ajouter leurs propres favoris
CREATE POLICY "Users can add their own favorites" ON favorites
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy : Users peuvent supprimer leurs propres favoris
CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (user_id = auth.uid());
```

### 3.3 Vue pour Statistiques

```sql
-- Vue pour compter les likes par produit
CREATE VIEW product_likes_count AS
SELECT
  product_id,
  COUNT(*) as likes_count,
  MAX(created_at) as last_liked_at
FROM favorites
GROUP BY product_id;

-- Index sur la vue
CREATE INDEX idx_product_likes_count ON product_likes_count(product_id);
```

## 4. API Endpoints

### 4.1 Gestion des Favoris

#### `POST /api/favorites`

Ajouter un beat aux favoris

**Request :**

```typescript
{
  product_id: string;
}
```

**Response :**

```typescript
{
  success: true,
  data: {
    id: string,
    user_id: string,
    product_id: string,
    created_at: string
  }
}
```

**Erreurs :**

- `400` : Product déjà en favori
- `404` : Product non trouvé
- `401` : Non authentifié

#### `DELETE /api/favorites/:productId`

Retirer un beat des favoris

**Response :**

```typescript
{
  success: true,
  data: {
    message: "Beat retiré des favoris"
  }
}
```

**Erreurs :**

- `404` : Favorite non trouvé
- `401` : Non authentifié

#### `GET /api/favorites`

Liste des favoris de l'utilisateur

**Query Parameters :**

- `page` : Numéro de page (défaut: 1)
- `limit` : Nombre d'éléments par page (défaut: 20)
- `sort` : `created_at` ou `title` (défaut: `created_at`)

**Response :**

```typescript
{
  success: true,
  data: {
    favorites: [
      {
        id: string,
        product_id: string,
        created_at: string,
        product: {
          id: string,
          title: string,
          artist: string,
          preview_url: string,
          price: number,
          typebeat: string,
          bpm: number,
          duration: number,
          is_purchased: boolean
        }
      }
    ],
    pagination: {
      page: number,
      limit: number,
      total: number,
      totalPages: number
    }
  }
}
```

#### `GET /api/favorites/check`

Vérifier si des beats sont en favori (batch)

**Request :**

```typescript
{
  product_ids: string[]
}
```

**Response :**

```typescript
{
  success: true,
  data: {
    favorites: {
      [product_id]: boolean
    }
  }
}
```

### 4.2 Statistiques

#### `GET /api/products/:id/likes`

Nombre de likes d'un produit

**Response :**

```typescript
{
  success: true,
  data: {
    product_id: string,
    likes_count: number,
    is_favorite: boolean, // Pour l'utilisateur actuel
    last_liked_at?: string
  }
}
```

## 5. Interface Utilisateur

### 5.1 HeartIcon Component

```typescript
interface HeartIconProps {
  productId: string;
  isFavorite: boolean;
  size?: 'sm' | 'md' | 'lg';
  onToggle: (productId: string, isFavorite: boolean) => void;
  disabled?: boolean;
  showAnimation?: boolean;
}

// Usage dans ProductCard
<HeartIcon
  productId={product.id}
  isFavorite={product.is_favorite}
  size="md"
  onToggle={handleToggleFavorite}
  showAnimation={true}
/>
```

**Styles :**

```typescript
const styles = {
  container: {
    padding: tokens.spacing.sm,
    borderRadius: tokens.radii.full,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparent
  },
  icon: {
    fontSize: size === 'sm' ? 16 : size === 'md' ? 20 : 24,
    color: isFavorite ? colors.music.pink : colors.dark['400'],
  },
};
```

**Animation :**

```typescript
const heartAnimation = {
  scale: [0.9, 1.1, 1.0],
  duration: 300,
  easing: 'ease-out',
};
```

### 5.2 Écran Favoris

#### FavoritesScreen

```typescript
interface FavoritesScreenProps {
  favorites: Favorite[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onProductPress: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onPlay: (product: Product) => void;
  onBuy: (product: Product) => void;
}
```

**Layout :**

```
┌─────────────────────────────────┐
│ Mes Favoris              [Sort] │
├─────────────────────────────────┤
│ [Grid 2 colonnes]               │
│ ┌─────┐ ┌─────┐                 │
│ │Beat1│ │Beat2│                 │
│ │Heart│ │Heart│                 │
│ └─────┘ └─────┘                 │
│ ┌─────┐ ┌─────┐                 │
│ │Beat3│ │Beat4│                 │
│ │Heart│ │Heart│                 │
│ └─────┘ └─────┘                 │
└─────────────────────────────────┘
```

### 5.3 Composants UI

#### FavoriteProductCard

```typescript
interface FavoriteProductCardProps {
  product: {
    id: string;
    title: string;
    artist: string;
    preview_url: string;
    price: number;
    typebeat: string;
    bpm: number;
    duration: number;
    is_purchased: boolean;
    is_favorite: boolean;
  };
  onPress: () => void;
  onToggleFavorite: () => void;
  onPlay: () => void;
  onBuy: () => void;
}
```

#### EmptyFavorites

```typescript
interface EmptyFavoritesProps {
  onDiscover: () => void; // Naviguer vers marketplace
}
```

**Message :**

```
🎵 Aucun favori pour le moment

Découvrez des beats incroyables
et ajoutez-les à vos favoris !

[Explorer le Marketplace]
```

## 6. Gestion d'État

### 6.1 Store Zustand

```typescript
interface FavoritesStore {
  // État
  favorites: Map<string, Favorite>;
  loading: boolean;
  error: string | null;

  // Actions
  toggleFavorite: (productId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
  clearError: () => void;

  // Getters
  isFavorite: (productId: string) => boolean;
  getFavoritesList: () => Favorite[];
  getFavoritesCount: () => number;
}

const useFavoritesStore = create<FavoritesStore>((set, get) => ({
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

  refreshFavorites: async () => {
    await get().loadFavorites();
  },

  clearError: () => set({ error: null }),

  isFavorite: (productId: string) => {
    return get().favorites.has(productId);
  },

  getFavoritesList: () => {
    return Array.from(get().favorites.values());
  },

  getFavoritesCount: () => {
    return get().favorites.size;
  },
}));
```

### 6.2 Cache Local

```typescript
// Cache des favoris en local storage
const FAVORITES_CACHE_KEY = 'linkart_favorites';

const saveFavoritesToCache = (favorites: Map<string, Favorite>) => {
  const favoritesArray = Array.from(favorites.values());
  AsyncStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(favoritesArray));
};

const loadFavoritesFromCache = async (): Promise<Map<string, Favorite>> => {
  try {
    const cached = await AsyncStorage.getItem(FAVORITES_CACHE_KEY);
    if (cached) {
      const favoritesArray = JSON.parse(cached);
      return new Map(favoritesArray.map((fav: Favorite) => [fav.product_id, fav]));
    }
  } catch (error) {
    console.error('Erreur chargement cache favoris:', error);
  }
  return new Map();
};
```

## 7. Synchronisation Temps Réel

### 7.1 WebSocket Events

```typescript
// Écouter les changements de favoris en temps réel
const useFavoritesSync = () => {
  const { toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('favorite_added', (data: { user_id: string; product_id: string }) => {
      if (data.user_id === currentUser.id) {
        // Mettre à jour le store local
        toggleFavorite(data.product_id);
      }
    });

    socket.on('favorite_removed', (data: { user_id: string; product_id: string }) => {
      if (data.user_id === currentUser.id) {
        // Mettre à jour le store local
        toggleFavorite(data.product_id);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
```

### 7.2 Gestion Offline

```typescript
// Queue des actions offline
const offlineQueue: Array<{
  action: 'add' | 'remove';
  productId: string;
  timestamp: number;
}> = [];

const processOfflineQueue = async () => {
  if (!navigator.onLine) return;

  for (const item of offlineQueue) {
    try {
      if (item.action === 'add') {
        await api.post('/favorites', { product_id: item.productId });
      } else {
        await api.delete(`/favorites/${item.productId}`);
      }
      // Retirer de la queue
      offlineQueue.splice(offlineQueue.indexOf(item), 1);
    } catch (error) {
      console.error('Erreur sync offline:', error);
    }
  }
};

// Écouter les changements de connectivité
useEffect(() => {
  const handleOnline = () => {
    processOfflineQueue();
  };

  window.addEventListener('online', handleOnline);
  return () => window.removeEventListener('online', handleOnline);
}, []);
```

## 8. Performance et Optimisation

### 8.1 Optimisations

**Cache Intelligent :**

- Cache local des favoris
- Invalidation automatique
- Synchronisation différentielle

**Batch Operations :**

- Vérification batch des favoris
- Mise à jour groupée
- Debounce des actions rapides

**Lazy Loading :**

- Chargement paginé des favoris
- Images lazy loading
- Composants lazy loading

### 8.2 Métriques de Performance

- **Temps de réponse** toggle favorite : < 200ms
- **Temps de chargement** liste favoris : < 500ms
- **Taux de succès** synchronisation : > 99%
- **Temps de récupération** après offline : < 2s

## 9. Tests

### 9.1 Tests Unitaires

```typescript
describe('HeartIcon', () => {
  it('should toggle favorite on press', async () => {
    const mockToggle = jest.fn();
    render(<HeartIcon productId="123" isFavorite={false} onToggle={mockToggle} />);

    fireEvent.press(screen.getByTestId('heart-icon'));
    expect(mockToggle).toHaveBeenCalledWith('123', true);
  });

  it('should show correct visual state', () => {
    render(<HeartIcon productId="123" isFavorite={true} onToggle={jest.fn()} />);

    const icon = screen.getByTestId('heart-icon');
    expect(icon).toHaveStyle({ color: colors.music.pink });
  });
});
```

### 9.2 Tests d'Intégration

```typescript
describe('Favorites Integration', () => {
  it('should sync favorites across screens', async () => {
    // Ajouter un favori sur ProductCard
    // Vérifier qu'il apparaît sur FavoritesScreen
    // Vérifier qu'il est marqué sur MiniPlayer
  });

  it('should handle offline/online sync', async () => {
    // Simuler offline
    // Ajouter des favoris
    // Simuler online
    // Vérifier la synchronisation
  });
});
```

## 10. Analytics et Métriques

### 10.1 Événements Trackés

```typescript
// Événements analytics
const trackFavoriteEvent = (action: 'add' | 'remove', productId: string) => {
  analytics.track('favorite_toggled', {
    action,
    product_id: productId,
    timestamp: new Date().toISOString(),
  });
};

const trackFavoritesScreenView = () => {
  analytics.track('favorites_screen_viewed', {
    favorites_count: useFavoritesStore.getState().getFavoritesCount(),
  });
};
```

### 10.2 KPIs

- **Taux d'engagement** : % d'utilisateurs utilisant les favoris
- **Favoris par utilisateur** : Moyenne des favoris par user
- **Conversion favoris** : % de favoris → achat
- **Rétention** : Utilisateurs revenant consulter leurs favoris
- **Performance** : Temps de réponse des actions

## 11. Roadmap Évolution

### Phase 1 (MVP)

- ✅ Toggle favorite sur Product Cards et Mini Player
- ✅ Écran favoris avec grid
- ✅ Synchronisation temps réel
- ✅ Interface optimiste

### Phase 2 (Améliorations)

- 🔄 Favoris par catégories (Trap, Afrobeat, etc.)
- 🔄 Partage de favoris
- 🔄 Export favoris (playlist)

### Phase 3 (Avancé)

- 🔮 Recommandations basées sur favoris
- 🔮 Favoris collaboratifs
- 🔮 Analytics avancées

---

## Changelog

- **v2.0** - Système de favoris complet
- **v2.0** - Interface optimiste avec synchronisation temps réel
- **v2.0** - Écran favoris dédié
- **v2.0** - Gestion offline/online
