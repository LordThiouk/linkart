import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { MarketplaceTabSelector } from './MarketplaceTabSelector';

const meta: Meta<typeof MarketplaceTabSelector> = {
  title: 'Features/Marketplace/MarketplaceTabSelector',
  component: MarketplaceTabSelector,
};

export default meta;
type Story = StoryObj<typeof MarketplaceTabSelector>;

interface InteractiveWrapperProps {
  initialTab?: 'products' | 'services';
}

const InteractiveWrapper = ({ initialTab = 'products' }: InteractiveWrapperProps) => {
  const [selectedTab, setSelectedTab] = useState<'products' | 'services'>(initialTab);
  return <MarketplaceTabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />;
};

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};

export const ServicesSelected: Story = {
  render: () => <InteractiveWrapper initialTab="services" />,
};

export const CustomLabels: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState<'products' | 'services'>('products');
    return (
      <MarketplaceTabSelector
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        productsLabel="Beats & Kits"
        servicesLabel="Services Pro"
      />
    );
  },
};
