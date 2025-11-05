import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Bell,
  MessageCircle,
  TrendingUp,
  Flame,
  Music2,
  Package,
  Zap,
  Sparkles,
  ListMusic,
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CategoryChip } from './CategoryChip';
import { PlaylistCard } from './PlaylistCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onSearch: () => void;
  onNotifications: () => void;
  onProductClick: (productId: string) => void;
  onMessages?: () => void;
}

const featuredProducts = [
  {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29000,
    type: 'beat' as const,
    bpm: 140,
    genre: 'Trap',
    likes: 1243,
    downloads: 847,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: '2',
    title: 'Summer Dreams',
    artist: 'Melodic Soul',
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24000,
    type: 'beat' as const,
    bpm: 128,
    genre: 'Lo-fi',
    likes: 892,
    downloads: 623,
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: '3',
    title: 'Afro Percussion Kit',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 15000,
    type: 'kit' as const,
    genre: 'Afrobeat',
    likes: 654,
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: '4',
    title: 'Urban Flow',
    artist: 'Beat Architect',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19000,
    type: 'beat' as const,
    bpm: 95,
    genre: 'Hip-Hop',
    likes: 756,
    downloads: 421,
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: '5',
    title: 'Vocal Chops Pack',
    artist: 'SampleKing',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 12000,
    type: 'sample' as const,
    genre: 'Pop',
    likes: 432,
    rating: 4.5,
    reviewCount: 29,
  },
  {
    id: '6',
    title: 'Drill Essentials Kit',
    artist: 'DrillPro',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit' as const,
    genre: 'Drill',
    likes: 987,
    downloads: 534,
    rating: 4.9,
    reviewCount: 76,
  },
];

const featuredPlaylists = [
  {
    id: 'p1',
    title: 'Top Beats Afrobeat',
    description: 'Les meilleurs beats afrobeat du moment',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'beats' as const,
    itemCount: 24,
    totalPlays: 45000,
  },
  {
    id: 'p2',
    title: 'Drum Kits Essentiels',
    description: 'Collection complète de kits pour producteurs',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    type: 'kits' as const,
    itemCount: 15,
    totalPlays: 28000,
  },
  {
    id: 'p3',
    title: 'Samples Trap Premium',
    description: 'Samples trap haute qualité',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'samples' as const,
    itemCount: 32,
    totalPlays: 38000,
  },
];

const categories = [
  { id: 'all', label: 'Tout', icon: Sparkles },
  { id: 'beats', label: 'Beats', icon: Music2 },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
  { id: 'trending', label: 'Tendances', icon: TrendingUp },
];

export function HomeScreen({ onSearch, onNotifications, onProductClick, onMessages }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingProduct, setPlayingProduct] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const filteredProducts = featuredProducts.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'beats') return product.type === 'beat';
    if (selectedCategory === 'kits') return product.type === 'kit';
    if (selectedCategory === 'samples') return product.type === 'sample';
    if (selectedCategory === 'trending') return product.likes > 800;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-6">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-[#F5F5F5] mb-1">Découvrir</h1>
              <p className="text-[#A3A3A3]">Trouvez votre prochain hit</p>
            </motion.div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onSearch}
                className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
              >
                <Search className="w-5 h-5 text-[#D4D4D4]" />
              </motion.button>

              {onMessages && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onMessages}
                  className="relative p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#D4D4D4]" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6]" />
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onNotifications}
                className="relative p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
              >
                <Bell className="w-5 h-5 text-[#D4D4D4]" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#EC4899] to-[#F59E0B]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Categories */}
        <div className="px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <CategoryChip
                key={category.id}
                label={category.label}
                icon={category.icon}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Hero Banner Carousel */}
        <div className="py-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-6" style={{ width: 'max-content' }}>
              {/* Featured Deal Banner */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-[340px] h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] p-6 flex flex-col justify-between flex-shrink-0"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5]/20 backdrop-blur-sm mb-3">
                    <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">🔥 Hot Deals</span>
                  </div>
                  <h2 className="text-[#F5F5F5] mb-2">Beats Premium -30%</h2>
                  <p className="text-[#F5F5F5]/80 text-sm">Offre limitée sur une sélection de beats</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="self-start px-4 py-2 rounded-xl bg-[#F5F5F5] text-[#6366F1] hover:bg-[#F5F5F5]/90 transition-colors text-sm"
                >
                  Explorer
                </motion.button>

                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-[#EC4899]/20 rounded-full blur-2xl" />
              </motion.div>

              {/* New Arrivals Banner */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative w-[340px] h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#06B6D4] via-[#0891B2] to-[#6366F1] p-6 flex flex-col justify-between flex-shrink-0"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5]/20 backdrop-blur-sm mb-3">
                    <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">✨ Nouveautés</span>
                  </div>
                  <h2 className="text-[#F5F5F5] mb-2">Kits Afrobeat 2024</h2>
                  <p className="text-[#F5F5F5]/80 text-sm">Les derniers drum kits des producteurs top</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="self-start px-4 py-2 rounded-xl bg-[#F5F5F5] text-[#06B6D4] hover:bg-[#F5F5F5]/90 transition-colors text-sm"
                >
                  Découvrir
                </motion.button>

                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5]/10 rounded-full blur-3xl" />
              </motion.div>

              {/* Boost Banner */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-[340px] h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#EC4899] via-[#F59E0B] to-[#EAB308] p-6 flex flex-col justify-between flex-shrink-0"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5]/20 backdrop-blur-sm mb-3">
                    <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">⚡ Boost</span>
                  </div>
                  <h2 className="text-[#F5F5F5] mb-2">Boostez vos ventes</h2>
                  <p className="text-[#F5F5F5]/80 text-sm">+350% de visibilité garantie</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="self-start px-4 py-2 rounded-xl bg-[#F5F5F5] text-[#EC4899] hover:bg-[#F5F5F5]/90 transition-colors text-sm"
                >
                  Essayer
                </motion.button>

                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5]/10 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Playlists Slider */}
        <div className="py-4">
          <div className="px-6 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6]">
                <ListMusic className="w-5 h-5 text-[#F5F5F5]" />
              </div>
              <h2 className="text-[#F5F5F5]">Playlists sélectionnées</h2>
            </div>
            <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors text-sm">Voir tout</button>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-6" style={{ width: 'max-content' }}>
              {featuredPlaylists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-80 flex-shrink-0"
                >
                  <PlaylistCard
                    {...playlist}
                    onClick={() => {
                      // Navigate to playlist
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F5F5]">À la une</h2>
            <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors text-sm">Voir tout</button>
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {featuredProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-72"
                >
                  <ProductCard
                    {...product}
                    isPlaying={playingProduct === product.id}
                    isLiked={likedProducts.has(product.id)}
                    onPlay={() => setPlayingProduct(playingProduct === product.id ? null : product.id)}
                    onClick={() => onProductClick(product.id)}
                    onLike={() => handleLike(product.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Products */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EC4899]">
              <TrendingUp className="w-5 h-5 text-[#F5F5F5]" />
            </div>
            <h2 className="text-[#F5F5F5]">Tendances du moment</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  {...product}
                  isPlaying={playingProduct === product.id}
                  isLiked={likedProducts.has(product.id)}
                  onPlay={
                    product.type === 'beat'
                      ? () => setPlayingProduct(playingProduct === product.id ? null : product.id)
                      : undefined
                  }
                  onClick={() => onProductClick(product.id)}
                  onLike={() => handleLike(product.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Uploads - Compact View */}
        <div className="px-6 py-4 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
              <Flame className="w-5 h-5 text-[#F5F5F5]" />
            </div>
            <h2 className="text-[#F5F5F5]">Nouveautés</h2>
          </div>

          <div className="space-y-3">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onProductClick(product.id)}
                className="flex gap-3 p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-all cursor-pointer"
              >
                <ImageWithFallback
                  src={product.coverImage}
                  alt={product.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#F5F5F5] truncate">{product.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        product.type === 'beat'
                          ? 'bg-[#6366F1]/20 text-[#6366F1]'
                          : product.type === 'kit'
                            ? 'bg-[#EC4899]/20 text-[#EC4899]'
                            : 'bg-[#06B6D4]/20 text-[#06B6D4]'
                      }`}
                    >
                      {product.type}
                    </span>
                  </div>
                  <p className="text-[#A3A3A3] text-sm">{product.artist}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {product.bpm && (
                      <>
                        <span className="text-[#6366F1] text-sm">{product.bpm} BPM</span>
                        <span className="text-[#A3A3A3]">•</span>
                      </>
                    )}
                    <span className="text-[#F5F5F5] text-sm">{product.price} F</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={e => {
                    e.stopPropagation();
                    if (product.type === 'beat') {
                      setPlayingProduct(playingProduct === product.id ? null : product.id);
                    }
                  }}
                  className="self-center p-3 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]"
                >
                  {playingProduct === product.id && product.type === 'beat' ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 border-2 border-[#F5F5F5] rounded"
                    />
                  ) : (
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#F5F5F5] border-b-[6px] border-b-transparent ml-0.5" />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
