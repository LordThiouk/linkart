import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, ShoppingCart, Download, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  id: string;
  title: string;
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
  isPlaying?: boolean;
  isFavorited?: boolean;
  onPlay?: () => void;
  onClick?: () => void;
  onToggleFavorite?: () => void;
}

export function ProductCard({
  id,
  title,
  artist,
  artistImage,
  coverImage,
  price,
  type,
  bpm,
  genre,
  likes,
  downloads,
  rating,
  reviewCount,
  isPlaying = false,
  isFavorited = false,
  onPlay,
  onClick,
  onToggleFavorite,
}: ProductCardProps) {
  const typeConfig = {
    beat: { icon: Play, label: 'Beat', color: 'from-[#6366F1] to-[#8B5CF6]' },
    kit: { icon: Package, label: 'Kit', color: 'from-[#EC4899] to-[#F59E0B]' },
    sample: { icon: Download, label: 'Sample', color: 'from-[#06B6D4] to-[#8B5CF6]' },
  };

  const config = typeConfig[type];

  return (
    <motion.div whileHover={{ y: -4 }} className="relative group cursor-pointer" onClick={onClick}>
      {/* Card Container */}
      <div className="relative bg-[#111111] rounded-2xl border border-[#404040] hover:border-[#6366F1]/50 transition-all overflow-hidden">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <ImageWithFallback
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-60" />

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <div
              className={`px-2 py-1 rounded-lg bg-gradient-to-r ${config.color} backdrop-blur-sm flex items-center gap-1`}
            >
              <config.icon className="w-3 h-3 text-[#F5F5F5]" />
              <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">{config.label}</span>
            </div>
          </div>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={e => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-[#0A0A0A]/60 backdrop-blur-sm border border-[#404040]/50 hover:bg-[#1A1A1A]/80 transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-[#EC4899] text-[#EC4899]' : 'text-[#F5F5F5]'}`}
              />
            </motion.button>
          )}

          {/* Play Button - Only for beats */}
          {type === 'beat' && onPlay && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={e => {
                e.stopPropagation();
                onPlay();
              }}
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#6366F1]/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[#F5F5F5] fill-current" />
              ) : (
                <Play className="w-5 h-5 text-[#F5F5F5] ml-0.5 fill-current" />
              )}
            </motion.button>
          )}

          {/* Stats (Likes + Downloads for beats) */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {likes !== undefined && (
              <div className="px-2 py-1 rounded-lg bg-[#0A0A0A]/60 backdrop-blur-sm border border-[#404040]/50">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#EC4899]" />
                  <span className="text-[#F5F5F5] text-xs">
                    {likes > 999 ? `${(likes / 1000).toFixed(1)}k` : likes}
                  </span>
                </div>
              </div>
            )}
            {downloads !== undefined && type === 'beat' && (
              <div className="px-2 py-1 rounded-lg bg-[#0A0A0A]/60 backdrop-blur-sm border border-[#404040]/50">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3 text-[#06B6D4]" />
                  <span className="text-[#F5F5F5] text-xs">
                    {downloads > 999 ? `${(downloads / 1000).toFixed(1)}k` : downloads}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-[#F5F5F5] mb-1 truncate">{title}</h3>

          {/* Artist */}
          {artistImage ? (
            <div className="flex items-center gap-2 mb-2">
              <ImageWithFallback src={artistImage} alt={artist} className="w-5 h-5 rounded-full object-cover" />
              <p className="text-[#A3A3A3] text-sm truncate">{artist}</p>
            </div>
          ) : (
            <p className="text-[#A3A3A3] text-sm mb-2 truncate">{artist}</p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#6366F1]">{genre}</span>
              {bpm && (
                <>
                  <span className="text-[#404040]">•</span>
                  <span className="text-[#A3A3A3]">{bpm} BPM</span>
                </>
              )}
            </div>
          </div>

          {/* Rating */}
          {rating !== undefined && (
            <div className="mb-2">
              <RatingStars rating={rating} size="sm" showNumber reviewCount={reviewCount} />
            </div>
          )}

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2 border-t border-[#404040]/50">
            <div>
              <span className="text-[#F5F5F5]">{price} F</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={e => {
                e.stopPropagation();
                // Add to cart action
              }}
              className="p-2 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4 text-[#F5F5F5]" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
