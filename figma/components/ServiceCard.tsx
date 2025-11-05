import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceCardProps {
  id: string;
  title: string;
  provider: string;
  providerImage: string;
  coverImage: string;
  price: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  category: string;
  isPro?: boolean;
  onClick?: () => void;
}

export function ServiceCard({
  title,
  provider,
  providerImage,
  coverImage,
  price,
  rating,
  reviewCount,
  deliveryTime,
  category,
  isPro = false,
  onClick,
}: ServiceCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-[#111111] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#6366F1]/50 transition-all cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
        <ImageWithFallback src={coverImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm text-[#06B6D4] border border-[#06B6D4]/30">
            {category}
          </span>
        </div>

        {/* Pro Badge */}
        {isPro && (
          <div className="absolute top-2 right-2">
            <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#EC4899] flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-[#F5F5F5]" />
              <span className="text-[#F5F5F5]">PRO</span>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-[#F5F5F5] mb-2 line-clamp-2">{title}</h3>

          <div className="flex items-center gap-2">
            <ImageWithFallback src={providerImage} alt={provider} className="w-6 h-6 rounded-full object-cover" />
            <p className="text-[#A3A3A3] truncate">{provider}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#404040]/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-[#D4D4D4]">{rating}</span>
              <span className="text-[#A3A3A3]">({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-[#A3A3A3]">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#A3A3A3]">À partir de</span>
          <div className="text-[#F59E0B]">€{price.toFixed(2)}</div>
        </div>
      </div>
    </motion.div>
  );
}
