import { useState, useEffect } from 'react';
import { supabase } from '../../auth/hooks/useAuth';
import { Product, ProductFilters } from '../../../types';

export interface UseProductsOptions {
  filters?: ProductFilters;
  limit?: number;
  offset?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('products')
        .select(
          `
          *,
          creator:users!products_creator_id_fkey(
            id,
            name,
            avatar_url,
            rating,
            is_verified
          )
        `
        )
        .eq('status', 'active')
        .order('is_boosted', { ascending: false })
        .order('created_at', { ascending: false });

      // Appliquer les filtres
      if (options.filters?.genre) {
        query = query.eq('genre', options.filters.genre);
      }
      if (options.filters?.minPrice) {
        query = query.gte('price', options.filters.minPrice);
      }
      if (options.filters?.maxPrice) {
        query = query.lte('price', options.filters.maxPrice);
      }
      if (options.filters?.license) {
        query = query.eq('license', options.filters.license);
      }
      // Note: isBoosted filter removed as it's not in the Product type
      if (options.filters?.search) {
        query = query.or(`title.ilike.%${options.filters.search}%,description.ilike.%${options.filters.search}%`);
      }

      // Pagination
      const limit = options.limit || 20;
      const offset = reset ? 0 : options.offset || 0;
      query = query.range(offset, offset + limit - 1);

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;

      if (reset) {
        setProducts(data || []);
      } else {
        setProducts(prev => [...prev, ...(data || [])]);
      }

      setHasMore((data?.length || 0) === limit);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts(true);
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      fetchProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [options.filters]);

  return {
    products,
    loading,
    error,
    hasMore,
    refreshProducts,
    loadMoreProducts,
  };
};
