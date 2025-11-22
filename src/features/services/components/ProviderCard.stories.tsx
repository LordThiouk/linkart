import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProviderCard } from './ProviderCard';

const meta: Meta<typeof ProviderCard> = {
  title: 'features/services/ProviderCard',
  component: ProviderCard,
};

export default meta;
type Story = StoryObj<typeof ProviderCard>;

export const Default: Story = {
  args: {
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    providerName: 'Audio Engineer Pro',
    location: 'Lagos, Nigeria',
    onContact: () => console.log('Contact pressed'),
  },
};

export const WithoutContact: Story = {
  args: {
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    providerName: 'Studio Master',
    location: 'Dakar, Senegal',
  },
};
