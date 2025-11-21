import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadStatsCard } from './UploadStatsCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadStatsCard> = {
  title: 'Features/Uploads/UploadStatsCard',
  component: UploadStatsCard,
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
type Story = StoryObj<typeof UploadStatsCard>;

export const Default: Story = {
  args: {
    stats: [
      { label: 'Ventes', value: '0' },
      { label: 'Revenus', value: '0 F' },
      { label: 'Vues', value: '0' },
    ],
  },
};

export const WithData: Story = {
  args: {
    stats: [
      { label: 'Ventes', value: '12' },
      { label: 'Revenus', value: '450 F' },
      { label: 'Vues', value: '1.2K' },
    ],
  },
};
