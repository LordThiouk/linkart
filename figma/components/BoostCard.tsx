import React from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Eye, Star } from 'lucide-react';

interface BoostCardProps {
  duration: '24h' | '7j' | '30j';
  price: number;
  views: string;
  isPopular?: boolean;
  onSelect: () => void;
}

export function BoostCard({ duration, price, views, isPopular = false, onSelect }: BoostCardProps) {
  const durationConfig = {
    '24h': { label: '24 heures', color: 'from-[#06B6D4] to-[#8B5CF6]' },
    '7j': { label: '7 jours', color: 'from-[#6366F1] to-[#8B5CF6]' },
    '30j': { label: '30 jours', color: 'from-[#EC4899] to-[#F59E0B]' },
  };

  const config = durationConfig[duration];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
        isPopular
          ? 'bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border-[#6366F1]'
          : 'bg-[#111111] border-[#404040] hover:border-[#6366F1]/50'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center gap-1">
          <Star className="w-3 h-3 text-[#F5F5F5] fill-current" />
          <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">Populaire</span>
        </div>
      )}

      <div className="text-center">
        {/* Icon */}
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center`}
        >
          <Zap className="w-8 h-8 text-[#F5F5F5] fill-current" />
        </div>

        {/* Duration */}
        <h3 className="text-[#F5F5F5] mb-2">{config.label}</h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-[#F5F5F5] text-3xl">{price.toLocaleString()}</span>
          <span className="text-[#A3A3A3] ml-1">F CFA</span>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Eye className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-[#D4D4D4]">{views} vues estimées</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-[#EC4899]" />
            <span className="text-[#D4D4D4]">Top résultats</span>
          </div>
        </div>

        {/* CTA */}
        <div className={`py-2 px-4 rounded-xl bg-gradient-to-r ${config.color} text-[#F5F5F5] text-sm`}>
          Booster maintenant
        </div>
      </div>
    </motion.div>
  );
}
