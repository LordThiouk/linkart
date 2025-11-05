import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  Edit,
  Share2,
  Star,
  Music,
  Headphones,
  TrendingUp,
  Award,
  Package,
  Zap,
  Heart,
  Calendar,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BeatCard } from './BeatCard';
import { PrimaryButton } from './PrimaryButton';

interface ProfileScreenProps {
  onMyPurchases?: () => void;
  onBoost?: () => void;
  onFavorites?: () => void;
  onBookings?: () => void;
}

export function ProfileScreen({ onMyPurchases, onBoost, onFavorites, onBookings }: ProfileScreenProps = {}) {
  const [activeTab, setActiveTab] = useState<'beats' | 'services' | 'stats'>('beats');

  const userBeats = [
    {
      id: '1',
      title: 'Afrobeat Summer',
      artist: 'Vous',
      coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
      price: 24.99,
      bpm: 112,
      genre: 'Afrobeat',
      likes: 892,
    },
    {
      id: '2',
      title: 'Lagos Nights',
      artist: 'Vous',
      coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
      price: 29.99,
      bpm: 128,
      genre: 'Afrobeat',
      likes: 1543,
    },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Vues totales', value: '12.4K', color: 'from-[#6366F1] to-[#8B5CF6]' },
    { icon: Music, label: 'Beats publiés', value: '24', color: 'from-[#EC4899] to-[#F59E0B]' },
    { icon: Star, label: 'Note moyenne', value: '4.8', color: 'from-[#F59E0B] to-[#EC4899]' },
    { icon: Award, label: 'Ventes', value: '47', color: 'from-[#06B6D4] to-[#8B5CF6]' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-end gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <Share2 className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <Settings className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200"
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-[#404040]"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EC4899] flex items-center justify-center border-2 border-[#0A0A0A]">
              <Award className="w-4 h-4 text-[#F5F5F5]" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-[#F5F5F5] mb-1">DJ Producer Pro</h1>
            <p className="text-[#A3A3A3] mb-3">@djproducer • Producteur & Beat Maker</p>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[#F5F5F5]">892</div>
                <div className="text-[#A3A3A3]" style={{ fontSize: '11px' }}>
                  Abonnés
                </div>
              </div>
              <div>
                <div className="text-[#F5F5F5]">234</div>
                <div className="text-[#A3A3A3]" style={{ fontSize: '11px' }}>
                  Abonnements
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#D4D4D4] mb-4">
          Producteur de beats Afrobeat, Amapiano & Trap 🎵
          <br />
          📍 Lagos, Nigeria
        </p>

        <div className="flex gap-3">
          <PrimaryButton className="flex-1">
            <Edit className="w-5 h-5 mr-2" />
            Modifier le profil
          </PrimaryButton>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <h3 className="text-[#F5F5F5] mb-3">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onMyPurchases}
            className="p-4 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-all"
          >
            <div className="w-10 h-10 mb-2 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#F5F5F5]" />
            </div>
            <p className="text-[#F5F5F5] text-sm">Mes Achats</p>
            <p className="text-[#A3A3A3] text-xs mt-1">Licences & Téléchargements</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onFavorites}
            className="p-4 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#EC4899]/50 transition-all"
          >
            <div className="w-10 h-10 mb-2 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#F59E0B] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#F5F5F5] fill-current" />
            </div>
            <p className="text-[#F5F5F5] text-sm">Favoris</p>
            <p className="text-[#A3A3A3] text-xs mt-1">Beats sauvegardés</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBoost}
            className="p-4 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#F59E0B]/50 transition-all"
          >
            <div className="w-10 h-10 mb-2 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EAB308] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#F5F5F5] fill-current" />
            </div>
            <p className="text-[#F5F5F5] text-sm">Booster</p>
            <p className="text-[#A3A3A3] text-xs mt-1">Augmenter la visibilité</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookings}
            className="p-4 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#06B6D4]/50 transition-all"
          >
            <div className="w-10 h-10 mb-2 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#F5F5F5]" />
            </div>
            <p className="text-[#F5F5F5] text-sm">Réservations</p>
            <p className="text-[#A3A3A3] text-xs mt-1">Services demandés</p>
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-2xl bg-[#111111] border border-[#404040]"
              >
                <div
                  className={`w-10 h-10 mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-[#F5F5F5]" />
                </div>
                <div className="text-[#F5F5F5] mb-1">{stat.value}</div>
                <div className="text-[#A3A3A3]" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('beats')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              activeTab === 'beats'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
            }`}
          >
            Beats
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
            }`}
          >
            Stats
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        {activeTab === 'beats' && (
          <div className="grid grid-cols-2 gap-4">
            {userBeats.map((beat, index) => (
              <motion.div
                key={beat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <BeatCard {...beat} />
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#111111] flex items-center justify-center">
              <Headphones className="w-8 h-8 text-[#A3A3A3]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Aucun service</h3>
            <p className="text-[#A3A3A3] mb-4">Vous n'avez pas encore publié de service</p>
            <PrimaryButton>Créer un service</PrimaryButton>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
              <h3 className="text-[#F5F5F5] mb-4">Performances ce mois</h3>
              <div className="space-y-3">
                {[
                  { label: 'Revenus', value: '€342.50', change: '+12%', positive: true },
                  { label: 'Vues', value: '3.2K', change: '+24%', positive: true },
                  { label: 'Ventes', value: '12', change: '+8', positive: true },
                  { label: 'Taux de conversion', value: '3.7%', change: '-0.3%', positive: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[#A3A3A3]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5F5F5]">{item.value}</span>
                      <span className={item.positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
