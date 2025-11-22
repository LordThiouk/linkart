import type { LucideIcon } from 'lucide-react-native';

export interface HomeCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export type ProductType = 'beat' | 'kit' | 'sample';

export interface HomeProduct {
  id: string;
  title: string;
  artist?: string;
  artistImage?: string;
  coverImage: string;
  price: number;
  type: ProductType;
  bpm?: number;
  genre?: string;
  likes?: number;
  downloads?: number;
  rating?: number;
  reviewCount?: number;
}

export interface HomePlaylist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'beats' | 'kits' | 'samples';
  itemCount: number;
  totalPlays: number;
}
