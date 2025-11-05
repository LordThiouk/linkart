import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Music, Headphones, Mic, Radio, Package, Zap, TrendingUp, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ServiceCard } from './ServiceCard';
import { CategoryChip } from './CategoryChip';

interface MarketplaceScreenProps {
  onProductClick: (productId: string) => void;
  onServiceClick: (serviceId: string) => void;
  onSearch: () => void;
}

const allProducts = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'KofiBeats',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat' as const,
    bpm: 112,
    genre: 'Afrobeat',
    likes: 892,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: '2',
    title: 'Lagos Nights',
    artist: 'NaijaVibes',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat' as const,
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    rating: 4.9,
    reviewCount: 102,
  },
  {
    id: '3',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit' as const,
    genre: 'Amapiano',
    likes: 2104,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '4',
    title: 'Trap 808 Pack',
    artist: 'AfroTrap Pro',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 15000,
    type: 'sample' as const,
    genre: 'Trap',
    likes: 654,
    rating: 4.6,
    reviewCount: 45,
  },
  {
    id: '5',
    title: 'Drill Essential Kit',
    artist: 'DrillKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 22000,
    type: 'kit' as const,
    genre: 'Drill',
    likes: 987,
    rating: 4.9,
    reviewCount: 76,
  },
  {
    id: '6',
    title: 'Vocal Chops Sample',
    artist: 'VocalPro',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 12000,
    type: 'sample' as const,
    genre: 'Pop',
    likes: 432,
    rating: 4.5,
    reviewCount: 34,
  },
];

const featuredServices = [
  {
    id: '1',
    title: 'Professional Mixing & Mastering',
    provider: 'Audio Engineer Pro',
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=400',
    price: 49000,
    rating: 4.9,
    reviewCount: 127,
    deliveryTime: '3 jours',
    category: 'Mixing',
    isPro: true,
  },
  {
    id: '2',
    title: 'Vocal Recording & Production',
    provider: 'Studio Master',
    providerImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    price: 39000,
    rating: 4.8,
    reviewCount: 89,
    deliveryTime: '2 jours',
    category: 'Recording',
    isPro: true,
  },
];

const productCategories = [
  { id: 'all', label: 'Tout', icon: Music },
  { id: 'beats', label: 'Beats', icon: Radio },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
];

const genreFilters = ['Tout', 'Afrobeat', 'Amapiano', 'Trap', 'Drill', 'Hip-Hop', 'R&B', 'Lo-fi'];
const locationFilters = ['Toutes', 'Dakar', 'Abidjan', 'Lagos', 'Accra', 'Douala', 'Bamako', 'Lomé', 'Cotonou'];
const serviceCategories = ['Tous', 'Mixing', 'Mastering', 'Recording', 'Production', 'Vocal Tuning', 'Beat Making'];

export function MarketplaceScreen({ onProductClick, onServiceClick, onSearch }: MarketplaceScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'products' | 'services'>('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('Tout');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('Tous');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState(0);
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

  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.type !== selectedCategory.slice(0, -1)) return false;

    // Genre filter
    if (selectedGenre !== 'Tout' && product.genre !== selectedGenre) return false;

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    // Rating filter
    if (product.rating && product.rating < minRating) return false;

    return true;
  });

  const filteredServices = featuredServices.filter(service => {
    // Category filter
    if (selectedServiceCategory !== 'Tous' && service.category !== selectedServiceCategory) return false;

    // Price filter
    if (service.price < priceRange[0] || service.price > priceRange[1]) return false;

    // Rating filter
    if (service.rating && service.rating < minRating) return false;

    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-6">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-[#F5F5F5] mb-1">Marketplace</h1>
              <p className="text-[#A3A3A3]">
                {selectedTab === 'products' ? 'Beats, kits & samples' : 'Services professionnels'}
              </p>
            </motion.div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onSearch}
                className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
              >
                <Search className="w-5 h-5 text-[#D4D4D4]" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl border transition-colors ${
                  showFilters
                    ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] border-transparent'
                    : 'bg-[#111111] border-[#404040] hover:border-[#6366F1]/50'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5 text-[#D4D4D4]" />
              </motion.button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedTab('products')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                selectedTab === 'products'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                  : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => setSelectedTab('services')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                selectedTab === 'services'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                  : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
              }`}
            >
              Services
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#111111] border-b border-[#404040]/50"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Products Filters */}
              {selectedTab === 'products' && (
                <>
                  {/* Genre Filter */}
                  <div>
                    <label className="block text-[#D4D4D4] text-sm mb-2">Genre</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {genreFilters.map(genre => (
                        <button
                          key={genre}
                          onClick={() => setSelectedGenre(genre)}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all ${
                            selectedGenre === genre
                              ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                              : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#404040]'
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Services Filters */}
              {selectedTab === 'services' && (
                <>
                  {/* Service Category Filter */}
                  <div>
                    <label className="block text-[#D4D4D4] text-sm mb-2">Catégorie de service</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {serviceCategories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedServiceCategory(category)}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all ${
                            selectedServiceCategory === category
                              ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                              : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#404040]'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Location Filter (for all) */}
              <div>
                <label className="block text-[#D4D4D4] text-sm mb-2">📍 Localité</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {locationFilters.map(location => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all ${
                        selectedLocation === location
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                          : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#404040]'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[#D4D4D4] text-sm mb-2">
                  Prix: {priceRange[0]} F - {priceRange[1]} F
                </label>
                <div className="flex gap-3">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-[#D4D4D4] text-sm mb-2">Note minimum</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        minRating === rating
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                          : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#404040]'
                      }`}
                    >
                      {rating === 0 ? 'Toutes' : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedGenre('Tout');
                  setSelectedServiceCategory('Tous');
                  setSelectedLocation('Toutes');
                  setPriceRange([0, 50000]);
                  setMinRating(0);
                }}
                className="w-full py-2 rounded-lg bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors text-sm"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Products Tab */}
        {selectedTab === 'products' && (
          <>
            {/* Categories */}
            <div className="px-6 py-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {productCategories.map(category => (
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

            {/* Stats Bar */}
            <div className="px-6 py-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A3A3A3]">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé
                  {filteredProducts.length > 1 ? 's' : ''}
                </span>
                <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors">Trier par popularité</button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="px-6 py-4 pb-8">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
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
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#111111] flex items-center justify-center">
                    <Search className="w-8 h-8 text-[#404040]" />
                  </div>
                  <h3 className="text-[#F5F5F5] mb-2">Aucun produit trouvé</h3>
                  <p className="text-[#A3A3A3] text-sm">Essayez de modifier vos filtres</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Services Tab */}
        {selectedTab === 'services' && (
          <>
            {/* Featured Services Banner */}
            <div className="px-6 py-4">
              <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5]/20 backdrop-blur-sm mb-3">
                    <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">✨ Vérifié</span>
                  </div>
                  <h2 className="text-[#F5F5F5] mb-2">Services Professionnels</h2>
                  <p className="text-[#F5F5F5]/80 text-sm">Engagez des experts certifiés</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-[#8B5CF6]/20 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Top Rated Services */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EC4899]">
                  <TrendingUp className="w-5 h-5 text-[#F5F5F5]" />
                </div>
                <h2 className="text-[#F5F5F5]">Services populaires</h2>
              </div>
              <div className="space-y-4">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ServiceCard {...service} onClick={() => onServiceClick(service.id)} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="px-6 py-4 pb-8">
              <h2 className="text-[#F5F5F5] mb-4">Catégories</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Mic, label: 'Recording', color: 'from-[#EC4899] to-[#F59E0B]' },
                  { icon: Headphones, label: 'Mixing', color: 'from-[#06B6D4] to-[#6366F1]' },
                  { icon: Radio, label: 'Mastering', color: 'from-[#8B5CF6] to-[#EC4899]' },
                  { icon: Music, label: 'Production', color: 'from-[#F59E0B] to-[#06B6D4]' },
                ].map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.label}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 rounded-2xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-all"
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-[#F5F5F5]" />
                      </div>
                      <p className="text-[#D4D4D4]">{cat.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
