import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react';
import { CategoryChip } from './CategoryChip';
import { BeatCard } from './BeatCard';

interface SearchFiltersScreenProps {
  onBack: () => void;
  onBeatClick: (beatId: string) => void;
}

const genres = ['Trap', 'Hip-Hop', 'Lo-fi', 'EDM', 'R&B', 'Pop', 'Rock', 'Jazz'];
const priceRanges = ['Gratuit', '< €20', '€20-€50', '> €50'];
const moods = ['Énergique', 'Calme', 'Sombre', 'Joyeux', 'Mélancolique'];
const bpmRanges = ['< 80', '80-120', '120-140', '> 140'];

const searchResults = [
  {
    id: '1',
    title: 'Dark Trap Energy',
    artist: 'BeatKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29.99,
    bpm: 140,
    genre: 'Trap',
    likes: 543,
  },
  {
    id: '2',
    title: 'Chill Vibes Only',
    artist: 'LoFi Master',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19.99,
    bpm: 85,
    genre: 'Lo-fi',
    likes: 892,
  },
];

export function SearchFiltersScreen({ onBack, onBeatClick }: SearchFiltersScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedBPM, setSelectedBPM] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => (prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]));
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedPrice(null);
    setSelectedMood(null);
    setSelectedBPM(null);
  };

  const activeFiltersCount =
    selectedGenres.length + (selectedPrice ? 1 : 0) + (selectedMood ? 1 : 0) + (selectedBPM ? 1 : 0);

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#D4D4D4]" />
            </motion.button>

            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="Rechercher un beat, artiste..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                autoFocus
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`relative p-3 rounded-xl border transition-all ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-transparent'
                  : 'bg-[#111111] border-[#404040]'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5 text-[#F5F5F5]" />
              {activeFiltersCount > 0 && (
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#EC4899] to-[#F59E0B] flex items-center justify-center text-[#F5F5F5]"
                  style={{ fontSize: '10px' }}
                >
                  {activeFiltersCount}
                </div>
              )}
            </motion.button>
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#111111] border-b border-[#404040]"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Genre Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#D4D4D4]">Genre</label>
                  {selectedGenres.length > 0 && (
                    <button onClick={() => setSelectedGenres([])} className="text-[#6366F1] hover:text-[#8B5CF6]">
                      Effacer
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <CategoryChip
                      key={genre}
                      label={genre}
                      selected={selectedGenres.includes(genre)}
                      onClick={() => toggleGenre(genre)}
                    />
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-[#D4D4D4] mb-3">Prix</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map(price => (
                    <CategoryChip
                      key={price}
                      label={price}
                      selected={selectedPrice === price}
                      onClick={() => setSelectedPrice(selectedPrice === price ? null : price)}
                    />
                  ))}
                </div>
              </div>

              {/* BPM Filter */}
              <div>
                <label className="block text-[#D4D4D4] mb-3">BPM</label>
                <div className="flex flex-wrap gap-2">
                  {bpmRanges.map(bpm => (
                    <CategoryChip
                      key={bpm}
                      label={bpm}
                      selected={selectedBPM === bpm}
                      onClick={() => setSelectedBPM(selectedBPM === bpm ? null : bpm)}
                    />
                  ))}
                </div>
              </div>

              {/* Mood Filter */}
              <div>
                <label className="block text-[#D4D4D4] mb-3">Ambiance</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(mood => (
                    <CategoryChip
                      key={mood}
                      label={mood}
                      selected={selectedMood === mood}
                      onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                    />
                  ))}
                </div>
              </div>

              {/* Clear All */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Réinitialiser tous les filtres
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[#A3A3A3]">
            {searchQuery
              ? `${searchResults.length} résultats pour "${searchQuery}"`
              : 'Recherchez ou utilisez les filtres'}
          </p>
        </div>

        {searchQuery && (
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((beat, index) => (
              <motion.div
                key={beat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <BeatCard {...beat} onClick={() => onBeatClick(beat.id)} />
              </motion.div>
            ))}
          </div>
        )}

        {!searchQuery && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#111111] flex items-center justify-center">
              <Search className="w-10 h-10 text-[#A3A3A3]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Commencez votre recherche</h3>
            <p className="text-[#A3A3A3] max-w-sm">
              Utilisez la barre de recherche ou les filtres pour trouver le beat parfait
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
