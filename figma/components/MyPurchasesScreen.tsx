import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, FileText, Music2, Package, Filter, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RatingStars } from './RatingStars';

interface MyPurchasesScreenProps {
  onBack: () => void;
  onDownload: (purchaseId: string) => void;
  onViewContract: (purchaseId: string) => void;
}

const purchasesData = [
  {
    id: 'p1',
    type: 'beat' as const,
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Premium',
    purchaseDate: '2024-11-01',
    price: 49000,
    downloaded: true,
    hasReview: true,
    contractUrl: '/contracts/p1.pdf',
  },
  {
    id: 'p2',
    type: 'kit' as const,
    title: 'Afro Percussion Kit',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    license: 'Basic',
    purchaseDate: '2024-10-28',
    price: 15000,
    downloaded: false,
    hasReview: false,
    contractUrl: '/contracts/p2.pdf',
  },
  {
    id: 'p3',
    type: 'beat' as const,
    title: 'Summer Dreams',
    artist: 'Melodic Soul',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Exclusive',
    purchaseDate: '2024-10-15',
    price: 299000,
    downloaded: true,
    hasReview: true,
    contractUrl: '/contracts/p3.pdf',
  },
];

export function MyPurchasesScreen({ onBack, onDownload, onViewContract }: MyPurchasesScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beats' | 'kits'>('all');

  const filteredPurchases = purchasesData.filter(purchase => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'beats') return purchase.type === 'beat';
    if (selectedFilter === 'kits') return purchase.type === 'kit';
    return true;
  });

  const totalSpent = purchasesData.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-[#F5F5F5] mb-1">Mes Achats</h1>
              <p className="text-[#A3A3A3] text-sm">
                {purchasesData.length} produit{purchasesData.length > 1 ? 's' : ''} acheté
                {purchasesData.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Stats */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total dépensé', value: `${totalSpent.toLocaleString()} F`, icon: '💰' },
              { label: 'Achats', value: purchasesData.length, icon: '📦' },
              { label: 'Téléchargés', value: purchasesData.filter(p => p.downloaded).length, icon: '⬇️' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-[#111111] border border-[#404040] text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-[#F5F5F5] mb-1">{stat.value}</div>
                <div className="text-[#A3A3A3] text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4">
          <div className="flex gap-2">
            {[
              { id: 'all' as const, label: 'Tout', icon: Filter },
              { id: 'beats' as const, label: 'Beats', icon: Music2 },
              { id: 'kits' as const, label: 'Kits', icon: Package },
            ].map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                      : 'bg-[#111111] text-[#A3A3A3] border border-[#404040]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Purchases List */}
        <div className="px-6 py-4 space-y-4">
          {filteredPurchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-all"
            >
              <div className="flex gap-4">
                {/* Cover */}
                <ImageWithFallback
                  src={purchase.coverImage}
                  alt={purchase.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#F5F5F5] truncate">{purchase.title}</h3>
                      <p className="text-[#A3A3A3] text-sm">{purchase.artist}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs ${
                        purchase.license === 'Exclusive'
                          ? 'bg-gradient-to-r from-[#EC4899] to-[#F59E0B] text-[#F5F5F5]'
                          : purchase.license === 'Premium'
                            ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                            : 'bg-[#1A1A1A] text-[#A3A3A3] border border-[#404040]'
                      }`}
                    >
                      {purchase.license}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3 h-3 text-[#A3A3A3]" />
                    <span className="text-[#A3A3A3] text-xs">
                      {new Date(purchase.purchaseDate).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="text-[#404040]">•</span>
                    <span className="text-[#6366F1] text-xs">{purchase.price.toLocaleString()} F</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDownload(purchase.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] text-sm"
                    >
                      <Download className="w-4 h-4" />
                      {purchase.downloaded ? 'Retélécharger' : 'Télécharger'}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewContract(purchase.id)}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1A1A1A] border border-[#404040] text-[#D4D4D4] text-sm hover:border-[#6366F1]/50 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Contrat
                    </motion.button>
                  </div>

                  {/* Review Status */}
                  {!purchase.hasReview && (
                    <div className="mt-3 p-2 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30">
                      <p className="text-[#F59E0B] text-xs text-center">⭐ Laissez un avis sur ce produit</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPurchases.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#111111] flex items-center justify-center">
              <Package className="w-10 h-10 text-[#404040]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Aucun achat</h3>
            <p className="text-[#A3A3A3] text-sm">Vos achats apparaîtront ici</p>
          </div>
        )}
      </div>
    </div>
  );
}
