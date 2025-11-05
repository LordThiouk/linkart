import React from 'react';
import { motion } from 'motion/react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    'px-8 py-4 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] shadow-lg shadow-[#6366F1]/20 hover:shadow-xl hover:shadow-[#6366F1]/30',
    ghost: 'bg-transparent text-[#D4D4D4] border border-[#404040] hover:bg-[#1A1A1A]',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
