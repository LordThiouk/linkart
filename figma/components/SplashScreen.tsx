import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Music } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center h-full bg-[#0A0A0A]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] opacity-30"
            style={{ width: '120px', height: '120px', margin: '-10px' }}
          />
          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-2xl shadow-[#6366F1]/50">
            <Music className="w-12 h-12 text-[#F5F5F5]" />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-2 text-[#F5F5F5]"
      >
        SoundMarket
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-[#A3A3A3] mb-12"
      >
        Your Music Marketplace
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-2"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 rounded-full bg-[#6366F1]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          className="w-2 h-2 rounded-full bg-[#8B5CF6]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          className="w-2 h-2 rounded-full bg-[#EC4899]"
        />
      </motion.div>
    </motion.div>
  );
}
