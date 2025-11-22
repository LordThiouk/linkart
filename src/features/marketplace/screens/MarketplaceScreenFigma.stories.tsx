import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceScreenFigma } from './MarketplaceScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof MarketplaceScreenFigma> = {
  title: 'Features/Marketplace/MarketplaceScreenFigma',
  component: MarketplaceScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MarketplaceScreenFigma>;

export const Default: Story = {
  args: {
    onProductClick: id => console.log('Product clicked:', id),
    onServiceClick: id => console.log('Service clicked:', id),
    onSearch: () => console.log('Search clicked'),
  },
};

export const WithFilters: Story = {
  args: {
    onProductClick: id => console.log('Product clicked:', id),
    onServiceClick: id => console.log('Service clicked:', id),
    onSearch: () => console.log('Search clicked'),
  },
};
