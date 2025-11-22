import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceServicesBanner } from './MarketplaceServicesBanner';

const meta: Meta<typeof MarketplaceServicesBanner> = {
  title: 'Features/Marketplace/MarketplaceServicesBanner',
  component: MarketplaceServicesBanner,
};

export default meta;
type Story = StoryObj<typeof MarketplaceServicesBanner>;

export const Default: Story = {
  args: {
    title: 'Services Professionnels',
    subtitle: 'Engagez des experts certifiés',
    badgeText: '✨ Vérifié',
  },
};

export const WithPress: Story = {
  args: {
    title: 'Services Professionnels',
    subtitle: 'Engagez des experts certifiés',
    badgeText: '✨ Premium',
    onPress: () => {},
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Découvrez nos Experts',
    subtitle: 'Professionnels certifiés à votre service',
    badgeText: '⭐ Top Rated',
  },
};
