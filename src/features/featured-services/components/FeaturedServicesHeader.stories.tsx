import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { FeaturedServicesHeader } from './FeaturedServicesHeader';
import type { ServiceCategory } from '../types';

const meta: Meta<typeof FeaturedServicesHeader> = {
  title: 'features/featured-services/FeaturedServicesHeader',
  component: FeaturedServicesHeader,
};

export default meta;
type Story = StoryObj<typeof FeaturedServicesHeader>;

export const Default: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
    return (
      <FeaturedServicesHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        subtitle="Découvrez les meilleurs services professionnels"
      />
    );
  },
};
