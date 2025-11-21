import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadProductInfoCard } from './DownloadProductInfoCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadProductInfoCard> = {
  title: 'Features/Downloads/DownloadProductInfoCard',
  component: DownloadProductInfoCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DownloadProductInfoCard>;

export const Default: Story = {
  args: {
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Premium',
  },
};

export const BasicLicense: Story = {
  args: {
    title: 'Summer Dreams',
    artist: 'KofiBeats',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    license: 'Basic',
  },
};
