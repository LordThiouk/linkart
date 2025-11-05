import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { Rating } from '../../../types';

export interface RatingData {
  id: string;
  transactionId: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  rating: number;
  comment?: string;
  status: 'visible' | 'hidden' | 'flagged';
  createdAt: string;
  updatedAt: string;
  buyer: {
    name: string;
    avatar_url?: string;
  };
  product: {
    title: string;
  };
}

export interface UseRatingsOptions {
  productId?: string;
  userId?: string;
  includeHidden?: boolean;
  limit?: number;
  offset?: number;
}

export const useRatings = (options: UseRatingsOptions = {}) => {
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  const fetchRatings = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('ratings')
        .select(
          `
          *,
          buyer:users!ratings_buyer_id_fkey(name, avatar_url),
          product:products(title)
        `
        )
        .order('created_at', { ascending: false });

      if (options.productId) {
        query = query.eq('product_id', options.productId);
      }

      if (options.userId) {
        query = query.eq('seller_id', options.userId);
      }

      if (!options.includeHidden) {
        query = query.eq('status', 'visible');
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
      }

      const { data: ratingsData, error: ratingsError } = await query;

      if (ratingsError) throw ratingsError;

      setRatings(ratingsData || []);

      // Calculer la moyenne si c'est pour un produit
      if (options.productId) {
        const { data: statsData, error: statsError } = await supabase
          .from('ratings')
          .select('rating')
          .eq('product_id', options.productId)
          .eq('status', 'visible');

        if (statsError) throw statsError;

        const total = statsData?.length || 0;
        const sum = statsData?.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) || 0;
        const average = total > 0 ? sum / total : 0;

        setTotalRatings(total);
        setAverageRating(average);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (transactionId: string, rating: number, comment?: string): Promise<Rating> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      // Vérifier que la transaction existe et que l'utilisateur est l'acheteur
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .select('*, product:products(id, title, creator_id)')
        .eq('id', transactionId)
        .eq('buyer_id', user.user.id)
        .eq('status', 'released')
        .single();

      if (transactionError) throw transactionError;

      // Vérifier qu'il n'y a pas déjà un rating pour cette transaction
      const { data: existingRating, error: existingError } = await supabase
        .from('ratings')
        .select('id')
        .eq('transaction_id', transactionId)
        .single();

      if (existingError && existingError.code !== 'PGRST116') {
        throw existingError;
      }

      if (existingRating) {
        throw new Error('Vous avez déjà noté cette transaction');
      }

      // Créer le rating
      const { data: newRating, error: ratingError } = await supabase
        .from('ratings')
        .insert({
          transaction_id: transactionId,
          product_id: transaction.product.id,
          buyer_id: user.user.id,
          seller_id: transaction.product.creator_id,
          rating,
          comment,
          status: 'visible',
        })
        .select()
        .single();

      if (ratingError) throw ratingError;

      // Rafraîchir les ratings
      await fetchRatings();

      return newRating;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRating = async (ratingId: string, rating: number, comment?: string): Promise<Rating> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      const { data: updatedRating, error: updateError } = await supabase
        .from('ratings')
        .update({
          rating,
          comment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ratingId)
        .eq('buyer_id', user.user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Rafraîchir les ratings
      await fetchRatings();

      return updatedRating;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (ratingId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      const { error: deleteError } = await supabase
        .from('ratings')
        .delete()
        .eq('id', ratingId)
        .eq('buyer_id', user.user.id);

      if (deleteError) throw deleteError;

      // Rafraîchir les ratings
      await fetchRatings();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const flagRating = async (ratingId: string, reason: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Utilisateur non authentifié');

      const { error: flagError } = await supabase
        .from('ratings')
        .update({
          status: 'flagged',
          flagged_reason: reason,
          flagged_by: user.user.id,
        })
        .eq('id', ratingId);

      if (flagError) throw flagError;

      // Rafraîchir les ratings
      await fetchRatings();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [options.productId, options.userId, options.includeHidden, options.limit, options.offset]);

  return {
    ratings,
    averageRating,
    totalRatings,
    loading,
    error,
    refreshRatings: fetchRatings,
    submitRating,
    updateRating,
    deleteRating,
    flagRating,
  };
};
