import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, ShoppingCart, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BeatCardProps {
  id: string;
  title: string;
  artist: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  bpm: number;
  genre: string;
  likes: number;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlay?: () => void;
  onClick?: () => void;
}

export function BeatCard({
  title,
  artist,
  artistImage,
  coverImage,
  price,
  bpm,
  genre,
  likes,
  isPlaying = false,
  isLiked = false,
  onPlay,
  onClick,
}: BeatCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="relative group cursor-pointer">
      <div className="bg-[#111111] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#6366F1]/50 transition-all">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
          <ImageWithFallback
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

          {/* Play button overlay */}
          <motion.button
            onClick={e => {
              e.stopPropagation();
              onPlay?.();
            }}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-2xl shadow-[#6366F1]/50">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-[#F5F5F5] fill-current" />
              ) : (
                <Play className="w-8 h-8 text-[#F5F5F5] ml-1 fill-current" />
              )}
            </div>
          </motion.button>

          {/* Top badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            <span className="px-2 py-1 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm text-[#F59E0B] border border-[#F59E0B]/30">
              {genre}
            </span>
            <button
              onClick={e => {
                e.stopPropagation();
              }}
              className="p-2 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm hover:bg-[#1A1A1A] transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-[#D4D4D4]" />
            </button>
          </div>

          {/* BPM badge */}
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm text-[#D4D4D4]">{bpm} BPM</span>
          </div>
        </div>

        {/* Info section */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-[#F5F5F5] mb-1 truncate">{title}</h3>
            <div className="flex items-center gap-2">
              {artistImage && (
                <ImageWithFallback src={artistImage} alt={artist} className="w-5 h-5 rounded-full object-cover" />
              )}
              <p className="text-[#A3A3A3] truncate">{artist}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={e => {
                  e.stopPropagation();
                }}
                className="flex items-center gap-1 text-[#A3A3A3] hover:text-[#EC4899] transition-colors"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#EC4899] text-[#EC4899]' : ''}`} />
                <span>{likes}</span>
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                }}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-[#D4D4D4]" />
              </button>
            </div>

            <div className="text-[#F5F5F5]">€{price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
