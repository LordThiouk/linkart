import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProductBottomCTA } from './ProductBottomCTA';

const meta: Meta<typeof ProductBottomCTA> = {
  title: 'Features/Products/ProductBottomCTA',
  component: ProductBottomCTA,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 600, justifyContent: 'flex-end' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductBottomCTA>;

export const Default: Story = {
  args: {
    price: 29000,
    hasPurchased: false,
    onDownload: () => console.log('Download pressed'),
    onBuy: () => console.log('Buy pressed'),
  },
};

export const Purchased: Story = {
  args: {
    price: 29000,
    hasPurchased: true,
    onDownload: () => console.log('Download pressed'),
    onBuy: () => console.log('Buy pressed'),
  },
};

export const Expensive: Story = {
  args: {
    price: 299000,
    hasPurchased: false,
    onBuy: () => console.log('Buy pressed'),
  },
};
