/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Loader2 } from 'lucide-react-native';
import { ProductCard } from './ProductCard';
import { api } from '../../src/utils/api';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  genre: string;
  preview_url?: string;
  image_url?: string;
  [key: string]: unknown;
}

interface FavoritesScreenProps {
  onBack: () => void;
  onProductClick: (productId: string) => void;
  accessToken: string | null;
}

export function FavoritesScreen({ onBack, onProductClick, accessToken }: FavoritesScreenProps) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      setFavorites([]);
      return;
    }

    try {
      const { favorites: data } = await api.favorites.list(accessToken);
      setFavorites(data || []);
    } catch (error) {
      console.error('Load favorites error:', error);
      toast.error('Erreur lors du chargement des favoris');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  async function handleToggleFavorite(productId: string) {
    if (!accessToken) {
      toast.error('Vous devez être connecté');
      return;
    }

    try {
      await api.favorites.toggle(productId, accessToken);
      // Remove from list
      setFavorites(prev => prev.filter(f => f.id !== productId));
      toast.success('Retiré des favoris');
    } catch (error) {
      console.error('Toggle favorite error:', error);
      toast.error('Erreur lors de la suppression');
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-[#EC4899] fill-current" />
                <h1 className="text-[#F5F5F5]">Mes Favoris</h1>
              </div>
              <p className="text-[#A3A3A3] text-sm mt-1">
                {favorites.length} beat{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#6366F1] animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-6">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#111111] flex items-center justify-center">
              <Heart className="w-10 h-10 text-[#404040]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Aucun favori</h3>
            <p className="text-[#A3A3A3] text-sm text-center">
              Ajoutez des beats à vos favoris en appuyant sur le cœur
            </p>
          </div>
        ) : (
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    {...product}
                    isFavorited={true}
                    onToggleFavorite={() => handleToggleFavorite(product.id)}
                    onClick={() => onProductClick(product.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
