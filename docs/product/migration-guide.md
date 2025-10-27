# Linkart — Guide de Migration Design System

> Version: v2.0 Auteur : Papa Diop Objectif : Plan de migration détaillé pour adapter les composants
> React Native existants au nouveau design moderne basé sur les screenshots.

---

## 1. Vue d'ensemble de la Migration

### 1.1 Objectifs

- **Adapter** les composants existants au nouveau design
- **Créer** les nouveaux composants nécessaires
- **Maintenir** la compatibilité avec l'architecture existante
- **Optimiser** les performances et l'expérience utilisateur

### 1.2 Stratégie de Migration

**Approche progressive :**

1. **Phase 1** : Composants de base (atoms)
2. **Phase 2** : Composants composés (molecules)
3. **Phase 3** : Sections complètes (organisms)
4. **Phase 4** : Nouvelles fonctionnalités (likes, playlists)

**Principe de compatibilité :**

- Maintenir les props existantes
- Ajouter de nouveaux variants
- Éviter les breaking changes majeurs
- Tests de régression systématiques

## 2. Analyse des Composants Existants

### 2.1 Composants à Adapter

| Composant        | Fichier Actuel              | Modifications Nécessaires    | Priorité |
| ---------------- | --------------------------- | ---------------------------- | -------- |
| **Button**       | `atoms/Button.tsx`          | Ajouter variants fab, icon   | Haute    |
| **ProductCard**  | `atoms/ProductCard.tsx`     | Layout 2 colonnes, HeartIcon | Haute    |
| **AudioPlayer**  | `molecules/AudioPlayer.tsx` | Layout sticky, HeartIcon     | Haute    |
| **SearchBar**    | `molecules/SearchBar.tsx`   | Style header, placeholder    | Moyenne  |
| **SectionTitle** | `atoms/SectionTitle.tsx`    | Action "Voir tout"           | Moyenne  |
| **TabBar**       | `organisms/TabBar.tsx`      | 5 tabs, FAB upload           | Moyenne  |
| **ProductList**  | `organisms/ProductList.tsx` | Grid 2 colonnes              | Moyenne  |
| **Header**       | `organisms/Header.tsx`      | Menu burger, avatar badge    | Basse    |

### 2.2 Nouveaux Composants à Créer

| Composant             | Fichier                           | Priorité | Dépendances    |
| --------------------- | --------------------------------- | -------- | -------------- |
| **HeartIcon**         | `atoms/HeartIcon.tsx`             | Haute    | Aucune         |
| **PlayButton**        | `atoms/PlayButton.tsx`            | Haute    | Aucune         |
| **ServiceCard**       | `molecules/ServiceCard.tsx`       | Haute    | HeartIcon      |
| **PlaylistCard**      | `molecules/PlaylistCard.tsx`      | Moyenne  | Aucune         |
| **HeroBanner**        | `organisms/HeroBanner.tsx`        | Haute    | PlayButton     |
| **FilterPills**       | `organisms/FilterPills.tsx`       | Haute    | Badge (adapté) |
| **TrendingSection**   | `organisms/TrendingSection.tsx`   | Moyenne  | ProductCard    |
| **ServicesSection**   | `organisms/ServicesSection.tsx`   | Moyenne  | ServiceCard    |
| **MarketplaceHeader** | `organisms/MarketplaceHeader.tsx` | Moyenne  | SearchBar      |
| **ContentTabs**       | `organisms/ContentTabs.tsx`       | Moyenne  | Aucune         |
| **FeaturedPacks**     | `organisms/FeaturedPacks.tsx`     | Basse    | Aucune         |

## 3. Phase 1 : Composants de Base (Atoms)

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

- **v2.0** - Guide de migration complet
- **v2.0** - Plan de déploiement par phases
- **v2.0** - Tests de régression et nouveaux composants
- **v2.0** - Stratégie de rollback et monitoring
