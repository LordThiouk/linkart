import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function RoleCard({ icon: Icon, title, description, selected, onClick }: RoleCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={{ scale: selected ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        relative w-full p-6 rounded-2xl
        bg-[#1A1A1A] 
        border-2
        ${selected ? 'border-transparent bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20' : 'border-[#404040]'}
        text-left
        transition-all duration-200
        hover:bg-[#1F1F1F]
      `}
    >
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-[2px]">
          <div className="absolute inset-[2px] rounded-2xl bg-[#1A1A1A]" />
        </div>
      )}

      <div className="relative flex items-start gap-4">
        <div
          className={`
          p-3 rounded-xl 
          ${selected ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]' : 'bg-[#111111]'}
        `}
        >
          <Icon className={`w-6 h-6 ${selected ? 'text-[#F5F5F5]' : 'text-[#A3A3A3]'}`} />
        </div>

        <div className="flex-1">
          <h3 className={`mb-1 ${selected ? 'text-[#F5F5F5]' : 'text-[#D4D4D4]'}`}>{title}</h3>
          <p className="text-[#A3A3A3]">{description}</p>
        </div>

        <div
          className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selected ? 'border-[#6366F1]' : 'border-[#404040]'}
        `}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]" />}
        </div>
      </div>
    </motion.button>
  );
}
