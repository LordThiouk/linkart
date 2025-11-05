import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CategoryChipProps {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ label, icon: Icon, selected = false, onClick }: CategoryChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full 
        border transition-all
        whitespace-nowrap
        flex items-center gap-2
        ${
          selected
            ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-transparent text-[#F5F5F5] shadow-lg shadow-[#6366F1]/30'
            : 'bg-[#1A1A1A] border-[#404040] text-[#D4D4D4] hover:border-[#6366F1]/50'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </motion.button>
  );
}
