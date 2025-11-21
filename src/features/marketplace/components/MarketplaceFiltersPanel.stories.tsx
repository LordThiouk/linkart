import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { MarketplaceFiltersPanel } from './MarketplaceFiltersPanel';

const genreFilters = ['Tout', 'Afrobeat', 'Amapiano', 'Trap', 'Drill', 'Hip-Hop', 'R&B', 'Lo-fi'];
const locationFilters = ['Toutes', 'Dakar', 'Abidjan', 'Lagos', 'Accra', 'Douala', 'Bamako', 'Lomé', 'Cotonou'];
const serviceCategories = ['Tous', 'Mixing', 'Mastering', 'Recording', 'Production', 'Vocal Tuning', 'Beat Making'];

const meta: Meta<typeof MarketplaceFiltersPanel> = {
  title: 'Features/Marketplace/MarketplaceFiltersPanel',
  component: MarketplaceFiltersPanel,
};

export default meta;
type Story = StoryObj<typeof MarketplaceFiltersPanel>;

interface InteractiveWrapperProps {
  initialTab?: 'products' | 'services';
}

const InteractiveWrapper = ({ initialTab = 'products' }: InteractiveWrapperProps) => {
  const [selectedTab] = useState<'products' | 'services'>(initialTab);
  const [selectedGenre, setSelectedGenre] = useState('Tout');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('Tous');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState(0);

  const handleReset = () => {
    setSelectedGenre('Tout');
    setSelectedServiceCategory('Tous');
    setSelectedLocation('Toutes');
    setPriceRange([0, 50000]);
    setMinRating(0);
  };

  return (
    <MarketplaceFiltersPanel
      selectedTab={selectedTab}
      genreFilters={genreFilters}
      selectedGenre={selectedGenre}
      onGenreSelect={setSelectedGenre}
      serviceCategories={serviceCategories}
      selectedServiceCategory={selectedServiceCategory}
      onServiceCategorySelect={setSelectedServiceCategory}
      locationFilters={locationFilters}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
      priceRange={priceRange}
      minRating={minRating}
      onMinRatingChange={setMinRating}
      onReset={handleReset}
    />
  );
};

export const ProductsTab: Story = {
  render: () => <InteractiveWrapper initialTab="products" />,
};

export const ServicesTab: Story = {
  render: () => <InteractiveWrapper initialTab="services" />,
};

export const WithFilters: Story = {
  render: () => {
    const [selectedTab] = useState<'products' | 'services'>('products');
    const [selectedGenre, setSelectedGenre] = useState('Afrobeat');
    const [selectedLocation, setSelectedLocation] = useState('Dakar');
    const [minRating, setMinRating] = useState(4);

    return (
      <MarketplaceFiltersPanel
        selectedTab={selectedTab}
        genreFilters={genreFilters}
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
        locationFilters={locationFilters}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
        priceRange={[10000, 30000]}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        onReset={() => {}}
      />
    );
  },
};
