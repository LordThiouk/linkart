import React from 'react';
import { motion } from 'motion/react';

interface OnboardingSlideProps {
  title: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
}

export function OnboardingSlide({ title, description, gradient, icon }: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`mb-12 p-12 rounded-full bg-gradient-to-br ${gradient}`}
      >
        {icon}
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 text-[#F5F5F5]"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-[#D4D4D4] max-w-sm"
      >
        {description}
      </motion.p>
    </div>
  );
}
