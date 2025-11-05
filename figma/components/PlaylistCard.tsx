import React from 'react';
import { motion } from 'motion/react';
import { Music2, Package, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'beats' | 'kits' | 'samples';
  itemCount: number;
  totalPlays?: number;
  onClick?: () => void;
}

export function PlaylistCard({
  id,
  title,
  description,
  coverImage,
  type,
  itemCount,
  totalPlays,
  onClick,
}: PlaylistCardProps) {
  const typeConfig = {
    beats: { icon: Music2, label: 'Beats', color: 'from-[#6366F1] to-[#8B5CF6]' },
    kits: { icon: Package, label: 'Kits & Samples', color: 'from-[#EC4899] to-[#F59E0B]' },
    samples: { icon: Package, label: 'Samples', color: 'from-[#06B6D4] to-[#8B5CF6]' },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="relative group cursor-pointer">
      <div className="relative bg-[#111111] rounded-2xl border border-[#404040] hover:border-[#6366F1]/50 transition-all overflow-hidden">
        <div className="flex gap-4 p-4">
          {/* Cover */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-[#F5F5F5] ml-0.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${config.color}`}>
                <Icon className="w-3.5 h-3.5 text-[#F5F5F5]" />
              </div>
              <span className="text-[#A3A3A3] text-xs uppercase tracking-wide">{config.label}</span>
            </div>

            <h3 className="text-[#F5F5F5] mb-1 truncate">{title}</h3>
            <p className="text-[#A3A3A3] text-sm mb-2 line-clamp-2">{description}</p>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6366F1]">{itemCount} sons</span>
              {totalPlays && (
                <>
                  <span className="text-[#404040]">•</span>
                  <span className="text-[#A3A3A3]">
                    {totalPlays > 999 ? `${(totalPlays / 1000).toFixed(1)}k` : totalPlays} lectures
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/0 to-[#8B5CF6]/0 group-hover:from-[#6366F1]/5 group-hover:to-[#8B5CF6]/5 transition-all pointer-events-none" />
      </div>
    </motion.div>
  );
}
