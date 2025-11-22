export type ServiceCategory = 'mixing' | 'mastering' | 'recording' | 'production' | 'coaching' | 'sound_design';

export interface FeaturedService {
  id: string;
  title: string;
  category: ServiceCategory;
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  isBoosted: boolean;
  isTop: boolean;
  stats: {
    bookings: number;
    rating: number;
    price?: number;
  };
  playlist?: {
    id: string;
    title: string;
    description: string;
    serviceCount: number;
  };
}
