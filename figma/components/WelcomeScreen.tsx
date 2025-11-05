import React from 'react';
import { motion } from 'motion/react';
import { Music, TrendingUp, Radio, Heart } from 'lucide-react';

export function WelcomeScreen() {
  const features = [
    { icon: Music, label: 'Explore', gradient: 'from-[#6366F1] to-[#8B5CF6]' },
    { icon: TrendingUp, label: 'Trending', gradient: 'from-[#F59E0B] to-[#EC4899]' },
    { icon: Radio, label: 'Radio', gradient: 'from-[#8B5CF6] to-[#EC4899]' },
    { icon: Heart, label: 'Favorites', gradient: 'from-[#EC4899] to-[#06B6D4]' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-12"
        >
          <div className="relative w-32 h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] opacity-40"
            />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center shadow-2xl">
              <Music className="w-16 h-16 text-[#F5F5F5]" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-[#F5F5F5] text-center"
        >
          Bienvenue sur SoundMarket
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#A3A3A3] text-center mb-12 max-w-sm"
        >
          Votre compte a été créé avec succès. Commencez à explorer la meilleure musique.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <motion.button
                key={feature.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#111111] border border-[#404040] hover:bg-[#1A1A1A] transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                >
                  <feature.icon className="w-6 h-6 text-[#F5F5F5]" />
                </div>
                <span className="text-[#D4D4D4]">{feature.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-8"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] shadow-lg shadow-[#6366F1]/30 hover:shadow-xl hover:shadow-[#6366F1]/40 transition-all"
        >
          Commencer l'exploration
        </motion.button>
      </motion.div>
    </div>
  );
}
