import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProductStatsBar } from './ProductStatsBar';

const meta: Meta<typeof ProductStatsBar> = {
  title: 'Features/Products/ProductStatsBar',
  component: ProductStatsBar,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductStatsBar>;

export const Default: Story = {
  args: {
    stats: [
      { label: 'Écoutes', value: 15624 },
      { label: 'Télécharg.', value: 847 },
      { label: 'BPM', value: 140 },
      { label: 'Tonalité', value: 'Am' },
    ],
  },
};

export const WithCustomStats: Story = {
  args: {
    stats: [
      { label: 'Vues', value: 125000 },
      { label: 'Likes', value: 5432 },
      { label: 'Partages', value: 234 },
      { label: 'Rating', value: '4.8' },
    ],
  },
};
