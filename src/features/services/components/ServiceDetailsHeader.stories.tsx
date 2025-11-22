import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceDetailsHeader } from './ServiceDetailsHeader';

const meta: Meta<typeof ServiceDetailsHeader> = {
  title: 'features/services/ServiceDetailsHeader',
  component: ServiceDetailsHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ServiceDetailsHeader>;

export const Default: Story = {
  args: {
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=800',
    category: 'Mixing & Mastering',
    onBack: () => console.log('Back pressed'),
    onShare: () => console.log('Share pressed'),
  },
};

export const WithoutButtons: Story = {
  args: {
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=800',
    category: 'Recording',
  },
};
