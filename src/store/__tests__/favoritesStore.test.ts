import { act, renderHook } from '@testing-library/react-native';
import { useFavoritesStore } from '../favoritesStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('favoritesStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useFavoritesStore.setState({
        favorites: new Map(),
        loading: false,
        error: null,
      });
    });
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    expect(result.current.favorites.size).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should toggle favorite with optimistic update', async () => {
    const { result } = renderHook(() => useFavoritesStore());
    const productId = 'test-product-1';

    await act(async () => {
      await result.current.toggleFavorite(productId);
    });

    expect(result.current.favorites.has(productId)).toBe(true);
    expect(result.current.isFavorite(productId)).toBe(true);
  });

  it('should remove favorite when toggled again', async () => {
    const { result } = renderHook(() => useFavoritesStore());
    const productId = 'test-product-1';

    // Add favorite first
    await act(async () => {
      await result.current.toggleFavorite(productId);
    });

    expect(result.current.isFavorite(productId)).toBe(true);

    // Remove favorite
    await act(async () => {
      await result.current.toggleFavorite(productId);
    });

    expect(result.current.favorites.has(productId)).toBe(false);
    expect(result.current.isFavorite(productId)).toBe(false);
  });

  it('should handle multiple favorites', async () => {
    const { result } = renderHook(() => useFavoritesStore());
    const productIds = ['product-1', 'product-2', 'product-3'];

    await act(async () => {
      for (const productId of productIds) {
        await result.current.toggleFavorite(productId);
      }
    });

    expect(result.current.favorites.size).toBe(3);
    productIds.forEach(id => {
      expect(result.current.isFavorite(id)).toBe(true);
    });
  });

  it('should clear error when clearError is called', async () => {
    const { result } = renderHook(() => useFavoritesStore());

    // Manually set error state
    act(() => {
      useFavoritesStore.setState({ error: 'Test error' });
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should load favorites', async () => {
    const { result } = renderHook(() => useFavoritesStore());

    await act(async () => {
      await result.current.loadFavorites();
    });

    expect(result.current.loading).toBe(false);
  });
});
