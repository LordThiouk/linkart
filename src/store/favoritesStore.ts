import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  clearError: () => void;
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
              id: `fav-${productId}-${Date.now()}`,
              product_id: productId,
              created_at: new Date().toISOString(),
            });
          }
          return { favorites: newFavorites, error: null };
        });

        // TODO: Remplacer par vraie API call quand backend ready
        try {
          // Simuler API call
          await new Promise(resolve => setTimeout(resolve, 300));

          // Simuler erreur aléatoire (10% du temps) pour tester rollback
          if (Math.random() < 0.1) {
            throw new Error('Erreur réseau simulée');
          }
        } catch {
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
        // TODO: Remplacer par vraie API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ loading: false });
      },

      isFavorite: (productId: string) => {
        return get().favorites.has(productId);
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        favorites: Array.from(state.favorites.entries()),
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.favorites = new Map(state.favorites as any);
        }
      },
    }
  )
);

// Mock data pour développement et tests
export const MOCK_FAVORITE_PRODUCTS = [
  {
    id: '1',
    title: 'Dark Trap Beat',
    artist: 'ProducerX',
    price: 25000,
    imageUrl: 'https://picsum.photos/200',
    viewCount: 1234,
    downloadCount: 56,
    likeCount: 89,
  },
  {
    id: '2',
    title: 'Afrobeat Vibes',
    artist: 'BeatMakerSenegal',
    price: 30000,
    imageUrl: 'https://picsum.photos/201',
    viewCount: 856,
    downloadCount: 42,
    likeCount: 67,
  },
  {
    id: '3',
    title: 'Hip Hop Instrumental',
    artist: 'DakarProducer',
    price: 20000,
    imageUrl: 'https://picsum.photos/202',
    viewCount: 2100,
    downloadCount: 78,
    likeCount: 134,
  },
  {
    id: '4',
    title: 'R&B Smooth',
    artist: 'MusicCreator',
    price: 35000,
    imageUrl: 'https://picsum.photos/203',
    viewCount: 567,
    downloadCount: 23,
    likeCount: 45,
  },
  {
    id: '5',
    title: 'Electronic Fusion',
    artist: 'SoundDesigner',
    price: 40000,
    imageUrl: 'https://picsum.photos/204',
    viewCount: 1890,
    downloadCount: 91,
    likeCount: 156,
  },
];
