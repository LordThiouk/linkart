import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, Heart, Share2, Download, ShoppingCart, Check, Star, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WaveformVisualizer } from './WaveformVisualizer';
import { PrimaryButton } from './PrimaryButton';
import { BeatCard } from './BeatCard';
import { RatingStars } from './RatingStars';

interface BeatDetailsScreenProps {
  beatId: string;
  onBack: () => void;
  onBuyClick?: () => void;
  hasPurchased?: boolean; // User has purchased this beat
}

export const beatData = {
  id: '1',
  title: 'Midnight Vibes',
  artist: 'DJ Shadow',
  artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
  coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=800',
  price: 29000,
  type: 'beat' as const,
  bpm: 140,
  key: 'Am',
  genre: 'Trap',
  mood: 'Sombre & Énergique',
  likes: 1243,
  plays: 15624,
  downloads: 847,
  duration: '3:24',
  tags: ['Dark', 'Heavy Bass', '808s', 'Atmospheric'],
  description:
    'Un beat trap sombre avec des 808s puissantes et une atmosphère mystérieuse. Parfait pour du rap conscient ou des vibes nocturnes.',
  rating: 4.8,
  reviewCount: 87,
  licenses: [
    { name: 'Basic', price: 29000, features: ['MP3 & WAV', '2000 streams', 'Crédit obligatoire'] },
    { name: 'Premium', price: 49000, features: ['MP3 & WAV & Stems', '10000 streams', 'Crédit optionnel'] },
    { name: 'Exclusive', price: 299000, features: ['Tous les fichiers', 'Streams illimités', 'Droits exclusifs'] },
  ],
  reviews: [
    {
      id: '1',
      user: 'MC Flow',
      userImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
      rating: 5,
      date: '2 jours',
      comment: 'Beat incroyable ! La qualité est top et les 808s claquent vraiment. Parfait pour mon projet.',
      helpful: 12,
    },
    {
      id: '2',
      user: 'RapArtist',
      userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
      rating: 4,
      date: '5 jours',
      comment: "Très bon beat, l'ambiance est vraiment sombre comme décrit. Juste un peu répétitif.",
      helpful: 8,
    },
    {
      id: '3',
      user: 'ProducerX',
      userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
      rating: 5,
      date: '1 semaine',
      comment: 'Production de qualité professionnelle. Le mastering est impeccable.',
      helpful: 15,
    },
  ],
};

const similarBeats = [
  {
    id: '2',
    title: 'Dark Energy',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24.99,
    bpm: 138,
    genre: 'Trap',
    likes: 892,
  },
  {
    id: '3',
    title: 'Night Drive',
    artist: 'SoundWave',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 27.99,
    bpm: 142,
    genre: 'Trap',
    likes: 654,
  },
];

export function BeatDetailsScreen({ beatId, onBack, onBuyClick, hasPurchased = false }: BeatDetailsScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(0);

  return (
    <div className="relative flex flex-col h-full bg-[#0A0A0A]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Header with Cover */}
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback src={beatData.coverImage} alt={beatData.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/20 via-[#0A0A0A]/60 to-[#0A0A0A]" />

            {/* Back button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="absolute top-12 left-6 p-3 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#404040]/50 hover:bg-[#1A1A1A]/80 transition-colors z-10"
            >
              <ArrowLeft className="w-5 h-5 text-[#F5F5F5]" />
            </motion.button>

            {/* Actions */}
            <div className="absolute top-12 right-6 flex gap-2 z-10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="p-3 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#404040]/50 hover:bg-[#1A1A1A]/80 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#EC4899] text-[#EC4899]' : 'text-[#F5F5F5]'}`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#404040]/50 hover:bg-[#1A1A1A]/80 transition-colors"
              >
                <Share2 className="w-5 h-5 text-[#F5F5F5]" />
              </motion.button>
            </div>
          </div>

          {/* Title Section */}
          <div className="px-6 -mt-8 relative z-10">
            <div className="flex items-end gap-4 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-2xl shadow-[#6366F1]/50"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-[#F5F5F5] fill-current" />
                ) : (
                  <Play className="w-8 h-8 text-[#F5F5F5] ml-1 fill-current" />
                )}
              </motion.button>

              <div className="flex-1">
                <h1 className="text-[#F5F5F5] mb-1">{beatData.title}</h1>
                <div className="flex items-center gap-2">
                  <ImageWithFallback
                    src={beatData.artistImage}
                    alt={beatData.artist}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="text-[#D4D4D4]">{beatData.artist}</p>
                </div>
              </div>
            </div>

            {/* Waveform */}
            <div className="bg-[#111111] rounded-2xl p-4 border border-[#404040]">
              <WaveformVisualizer isPlaying={isPlaying} bars={80} height={60} />
              <div className="flex items-center justify-between mt-3 text-[#A3A3A3]">
                <span>0:00</span>
                <span>{beatData.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Écoutes', value: beatData.plays.toLocaleString() },
              { label: 'Télécharg.', value: beatData.downloads.toLocaleString() },
              { label: 'BPM', value: beatData.bpm },
              { label: 'Tonalité', value: beatData.key },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-3 rounded-xl bg-[#111111] border border-[#404040]"
              >
                <div className="text-[#F5F5F5] mb-1">{stat.value}</div>
                <div className="text-[#A3A3A3]" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <h3 className="text-[#F5F5F5] mb-2">Description</h3>
            <p className="text-[#A3A3A3]">{beatData.description}</p>
          </div>

          <div>
            <h3 className="text-[#F5F5F5] mb-2">Caractéristiques</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#D4D4D4] border border-[#404040]">
                {beatData.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#D4D4D4] border border-[#404040]">
                {beatData.mood}
              </span>
              {beatData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#D4D4D4] border border-[#404040]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Licenses */}
        <div className="px-6 py-4">
          <h3 className="text-[#F5F5F5] mb-4">Choisir une licence</h3>
          <div className="space-y-3">
            {beatData.licenses.map((license, index) => (
              <motion.button
                key={license.name}
                onClick={() => setSelectedLicense(index)}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full p-4 rounded-2xl transition-all text-left ${
                  selectedLicense === index
                    ? 'bg-[#111111] border-2 border-[#6366F1]'
                    : 'border-2 border-[#404040] bg-[#111111] hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-[#F5F5F5]">{license.name}</h4>
                      {selectedLicense === index && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#F5F5F5]" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {license.features.map(feature => (
                        <li key={feature} className="text-[#A3A3A3] text-sm flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[#F5F5F5] ml-4">€{license.price}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F5F5]">Avis & Notations</h3>
            <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors text-sm">Voir tout</button>
          </div>

          {/* Overall Rating */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040] mb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl text-[#F5F5F5] mb-1">{beatData.rating.toFixed(1)}</div>
                <RatingStars rating={beatData.rating} size="md" />
                <p className="text-[#A3A3A3] text-sm mt-1">{beatData.reviewCount} avis</p>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(stars => {
                  const count = beatData.reviews.filter(r => r.rating === stars).length;
                  const percentage = (count / beatData.reviews.length) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-[#A3A3A3] text-sm w-3">{stars}</span>
                      <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F59E0B] to-[#EC4899]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[#A3A3A3] text-sm w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-3">
            {beatData.reviews.map(review => (
              <div key={review.id} className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
                <div className="flex items-start gap-3">
                  <ImageWithFallback
                    src={review.userImage}
                    alt={review.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[#F5F5F5]">{review.user}</h4>
                      <span className="text-[#A3A3A3] text-sm">Il y a {review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} size="sm" />
                    <p className="text-[#D4D4D4] text-sm mt-2">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-[#A3A3A3] hover:text-[#6366F1] text-sm transition-colors">
                        👍 Utile ({review.helpful})
                      </button>
                      <button className="text-[#A3A3A3] hover:text-[#6366F1] text-sm transition-colors">
                        Répondre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Review Button - Only if purchased */}
          {hasPurchased ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] hover:opacity-90 transition-opacity"
            >
              ⭐ Laisser un avis
            </motion.button>
          ) : (
            <div className="mt-4 p-4 rounded-2xl bg-[#111111] border border-[#404040]">
              <p className="text-[#A3A3A3] text-center text-sm">🔒 Achetez ce beat pour laisser un avis</p>
            </div>
          )}
        </div>

        {/* Similar Beats */}
        <div className="px-6 py-4 pb-6">
          <h3 className="text-[#F5F5F5] mb-4">Beats similaires</h3>
          <div className="grid grid-cols-2 gap-4">
            {similarBeats.map(beat => (
              <BeatCard key={beat.id} {...beat} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-20 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pointer-events-none">
        <div className="max-w-[375px] mx-auto flex gap-3 pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-2xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
          >
            <Download className="w-5 h-5 text-[#D4D4D4]" />
          </motion.button>
          <PrimaryButton onClick={onBuyClick} className="flex-1 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Acheter - {beatData.licenses[selectedLicense].price.toLocaleString()} F
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
