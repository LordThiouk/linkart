import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, MessageCircle, Star, Clock, CheckCircle, MapPin, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PrimaryButton } from './PrimaryButton';
import { ServiceCard } from './ServiceCard';

interface ServiceDetailsScreenProps {
  serviceId: string;
  onBack: () => void;
  onContact: () => void;
  onBook: () => void;
}

export function ServiceDetailsScreen({ serviceId, onBack, onContact, onBook }: ServiceDetailsScreenProps) {
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');

  // Mock data - in real app, fetch based on serviceId
  const service = {
    id: serviceId,
    title: 'Professional Mixing & Mastering',
    provider: 'Audio Engineer Pro',
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=800',
    rating: 4.9,
    reviewCount: 127,
    completedOrders: 342,
    responseTime: '2h',
    category: 'Mixing & Mastering',
    location: 'Lagos, Nigeria',
    isPro: true,
    description:
      "Ingénieur du son certifié avec 10+ ans d'expérience. Spécialisé dans le mixage et mastering de musique Afrobeat, Hip-Hop et R&B. Studio équipé de matériel professionnel (SSL, Neve, UAD).",
    packages: [
      {
        id: 'basic',
        name: 'Basic',
        price: 49.99,
        deliveryTime: '5 jours',
        features: ["Mixage d'une track", '2 révisions incluses', 'Fichier WAV haute qualité', 'Support par email'],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 99.99,
        deliveryTime: '3 jours',
        features: [
          'Mixage + Mastering',
          '4 révisions incluses',
          'WAV + MP3 320kbps',
          'Support prioritaire',
          'Stem mastering disponible',
        ],
        popular: true,
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 199.99,
        deliveryTime: '2 jours',
        features: [
          'Mixage + Mastering avancé',
          'Révisions illimitées',
          'Tous formats (WAV, MP3, FLAC)',
          'Support 24/7',
          'Consultation téléphonique',
          'Mastering vinyl-ready',
        ],
      },
    ],
    portfolio: [
      { id: '1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', title: 'Afrobeat Mix' },
      { id: '2', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400', title: 'Hip-Hop Master' },
      { id: '3', image: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400', title: 'R&B Production' },
    ],
    reviews: [
      {
        id: '1',
        userName: 'KofiBeats',
        userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
        rating: 5,
        date: 'Il y a 2 jours',
        comment: "Excellent travail ! Mon beat sonne incroyable après le mastering. Très professionnel et à l'écoute.",
      },
      {
        id: '2',
        userName: 'NaijaVibes',
        userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
        rating: 5,
        date: 'Il y a 1 semaine',
        comment: 'Rapide, efficace, résultat au top. Je recommande vivement pour vos projets Afrobeat.',
      },
    ],
  };

  const currentPackage = service.packages.find(p => p.id === selectedPackage)!;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] overflow-y-auto pb-32">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

        {/* Header Buttons */}
        <div className="absolute top-12 left-0 right-0 px-6 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#404040]"
          >
            <ChevronLeft className="w-5 h-5 text-[#F5F5F5]" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#404040]"
          >
            <Share2 className="w-5 h-5 text-[#F5F5F5]" />
          </motion.button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-6">
          <span className="px-3 py-1.5 rounded-xl bg-[#06B6D4]/20 backdrop-blur-sm text-[#06B6D4] border border-[#06B6D4]/30">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Title & Provider */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-[#F5F5F5] flex-1 pr-4">{service.title}</h1>
            {service.isPro && (
              <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#EC4899] flex items-center gap-1">
                <Award className="w-3 h-3 text-[#F5F5F5]" />
                <span className="text-[#F5F5F5]" style={{ fontSize: '11px' }}>
                  PRO
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <ImageWithFallback
              src={service.providerImage}
              alt={service.provider}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-[#F5F5F5]">{service.provider}</h3>
              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <MapPin className="w-3 h-3" />
                <span>{service.location}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#404040]/50">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-[#F5F5F5]">{service.rating}</span>
              <span className="text-[#A3A3A3]">({service.reviewCount})</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#404040]" />
            <div className="flex items-center gap-1 text-[#A3A3A3]">
              <CheckCircle className="w-4 h-4" />
              <span>{service.completedOrders} commandes</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#404040]" />
            <div className="flex items-center gap-1 text-[#A3A3A3]">
              <Clock className="w-4 h-4" />
              <span>Répond en {service.responseTime}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-[#F5F5F5] mb-3">À propos du service</h2>
          <p className="text-[#D4D4D4] leading-relaxed">{service.description}</p>
        </div>

        {/* Packages */}
        <div>
          <h2 className="text-[#F5F5F5] mb-4">Packages disponibles</h2>
          <div className="space-y-3">
            {service.packages.map(pkg => (
              <motion.button
                key={pkg.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPackage(pkg.id as any)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedPackage === pkg.id
                    ? 'border-[#6366F1] bg-[#6366F1]/10'
                    : 'border-[#404040] bg-[#111111] hover:border-[#6366F1]/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#F5F5F5]">{pkg.name}</h3>
                      {pkg.popular && (
                        <span
                          className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EC4899] text-[#F5F5F5]"
                          style={{ fontSize: '10px' }}
                        >
                          POPULAIRE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#A3A3A3]">
                      <Clock className="w-3 h-3" />
                      <span>Livraison en {pkg.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#F59E0B]">€{pkg.price.toFixed(2)}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#D4D4D4]">
                      <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <h2 className="text-[#F5F5F5] mb-4">Portfolio</h2>
          <div className="grid grid-cols-3 gap-3">
            {service.portfolio.map(item => (
              <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden bg-[#111111]">
                <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F5F5]">Avis clients</h2>
            <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors">Voir tout</button>
          </div>
          <div className="space-y-4">
            {service.reviews.map(review => (
              <div key={review.id} className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
                <div className="flex items-start gap-3 mb-3">
                  <ImageWithFallback
                    src={review.userImage}
                    alt={review.userName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[#F5F5F5]">{review.userName}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#A3A3A3]">{review.date}</p>
                  </div>
                </div>
                <p className="text-[#D4D4D4]">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#404040]/50">
        <div className="max-w-[375px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#A3A3A3]">À partir de</p>
              <div className="text-[#F59E0B]">€{currentPackage.price.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <p className="text-[#A3A3A3]">Livraison</p>
              <div className="text-[#F5F5F5]">{currentPackage.deliveryTime}</div>
            </div>
          </div>
          <PrimaryButton onClick={onBook} className="w-full">
            <Calendar className="w-5 h-5 mr-2" />
            Réserver ce service
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
