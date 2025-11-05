import React from 'react';
import { motion } from 'motion/react';
import { Home, ShoppingBag, Upload, Wallet, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile';
  onTabChange: (tab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: User, label: 'Profil' },
  ] as const;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#111111] border-t border-[#404040] px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[60px]"
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-[#6366F1]' : 'text-[#A3A3A3]'}`} />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={`transition-colors ${isActive ? 'text-[#F5F5F5]' : 'text-[#A3A3A3]'}`}
                style={{ fontSize: '10px' }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
