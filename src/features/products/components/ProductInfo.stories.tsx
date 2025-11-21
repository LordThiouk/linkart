import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProductInfo } from './ProductInfo';

const meta: Meta<typeof ProductInfo> = {
  title: 'Features/Products/ProductInfo',
  component: ProductInfo,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductInfo>;

export const Default: Story = {
  args: {
    description:
      'Un beat trap sombre avec des 808s puissantes et une atmosphère mystérieuse. Parfait pour du rap conscient ou des vibes nocturnes.',
    tags: ['Trap', 'Sombre & Énergique', 'Dark', 'Heavy Bass', '808s', 'Atmospheric'],
  },
};

export const ShortDescription: Story = {
  args: {
    description: 'Beat énergique parfait pour le rap.',
    tags: ['Trap', 'Énergique'],
  },
};

export const NoTags: Story = {
  args: {
    description:
      'Un beat trap sombre avec des 808s puissantes et une atmosphère mystérieuse. Parfait pour du rap conscient ou des vibes nocturnes.',
    tags: [],
  },
};
