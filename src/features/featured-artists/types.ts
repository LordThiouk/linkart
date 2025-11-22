export type ArtistCategory = 'beatmaker' | 'mixer' | 'producer' | 'studio' | 'artist';

export interface FeaturedArtist {
  id: string;
  name: string;
  artistName?: string;
  avatar?: string;
  category: ArtistCategory; // Catégorie de l'artiste
  isBoosted: boolean;
  isTop: boolean;
  isNewTalent?: boolean;
  stats: {
    // Produits (si l'artiste vend des beats/kits)
    sales?: number;
    revenue?: number;
    productsCount?: number;
    // Services (si l'artiste propose des services)
    bookings?: number;
    servicesCount?: number;
    // Global
    rating?: number;
  };
  playlist: {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    beatCount: number; // Produits
    serviceCount?: number; // Services (optionnel)
    totalPlays: number;
  };
}
