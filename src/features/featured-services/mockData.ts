import { FeaturedService } from './types';

export const mockServices: FeaturedService[] = [
  // Mixing
  {
    id: 's1',
    title: 'Professional Mixing Service',
    category: 'mixing',
    provider: {
      id: 'p1',
      name: 'Audio Engineer Pro',
      avatar: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=200',
    },
    isBoosted: true,
    isTop: true,
    stats: {
      bookings: 89,
      rating: 4.9,
      price: 25000,
    },
    playlist: {
      id: 'pl1',
      title: 'Top Mixes by Audio Engineer Pro',
      description: 'Les meilleurs mixes professionnels',
      serviceCount: 3,
    },
  },
  {
    id: 's2',
    title: 'Premium Mixing Studio',
    category: 'mixing',
    provider: {
      id: 'p2',
      name: 'Mix Master Studio',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
    },
    isBoosted: false,
    isTop: true,
    stats: {
      bookings: 127,
      rating: 4.8,
      price: 30000,
    },
  },
  // Mastering
  {
    id: 's3',
    title: 'Premium Mastering',
    category: 'mastering',
    provider: {
      id: 'p3',
      name: 'Mastering Studio',
      avatar: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=200',
    },
    isBoosted: false,
    isTop: true,
    stats: {
      bookings: 127,
      rating: 4.8,
      price: 30000,
    },
  },
  {
    id: 's4',
    title: 'Expert Mastering Service',
    category: 'mastering',
    provider: {
      id: 'p4',
      name: 'Sound Lab Pro',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200',
    },
    isBoosted: true,
    isTop: false,
    stats: {
      bookings: 67,
      rating: 4.7,
      price: 28000,
    },
  },
  // Recording
  {
    id: 's5',
    title: 'Professional Recording Studio',
    category: 'recording',
    provider: {
      id: 'p5',
      name: 'Premium Sound Studio',
      avatar: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200',
    },
    isBoosted: true,
    isTop: true,
    stats: {
      bookings: 156,
      rating: 4.9,
      price: 50000,
    },
  },
  // Production
  {
    id: 's6',
    title: 'Music Production Service',
    category: 'production',
    provider: {
      id: 'p6',
      name: 'Producer X',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
    },
    isBoosted: false,
    isTop: true,
    stats: {
      bookings: 98,
      rating: 4.8,
      price: 40000,
    },
  },
  // Coaching
  {
    id: 's7',
    title: 'Music Production Coaching',
    category: 'coaching',
    provider: {
      id: 'p7',
      name: 'Music Mentor',
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200',
    },
    isBoosted: true,
    isTop: false,
    stats: {
      bookings: 45,
      rating: 4.6,
      price: 20000,
    },
  },
  // Sound Design
  {
    id: 's8',
    title: 'Custom Sound Design',
    category: 'sound_design',
    provider: {
      id: 'p8',
      name: 'Sound Designer Pro',
      avatar: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200',
    },
    isBoosted: false,
    isTop: true,
    stats: {
      bookings: 78,
      rating: 4.7,
      price: 35000,
    },
  },
];
