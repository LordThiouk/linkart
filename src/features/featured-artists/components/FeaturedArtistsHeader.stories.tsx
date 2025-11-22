import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { FeaturedArtistsHeader } from './FeaturedArtistsHeader';
import type { ArtistCategory } from '../types';

const meta: Meta<typeof FeaturedArtistsHeader> = {
  title: 'features/featured-artists/FeaturedArtistsHeader',
  component: FeaturedArtistsHeader,
};

export default meta;
type Story = StoryObj<typeof FeaturedArtistsHeader>;

export const Default: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState<ArtistCategory | 'all'>('all');
    return (
      <FeaturedArtistsHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        subtitle="Découvrez les meilleurs créateurs"
      />
    );
  },
};

export const WithoutFilters: Story = {
  args: {
    showFilters: false,
    subtitle: 'Tous les artistes en vedette',
  },
};
