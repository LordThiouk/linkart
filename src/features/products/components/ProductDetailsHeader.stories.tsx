import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductDetailsHeader } from './ProductDetailsHeader';
import { View } from 'react-native';

const meta: Meta<typeof ProductDetailsHeader> = {
  title: 'Features/Products/ProductDetailsHeader',
  component: ProductDetailsHeader,
  decorators: [
    Story => (
      <View style={{ width: 375, height: 256, backgroundColor: '#000' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductDetailsHeader>;

export const Default: Story = {
  args: {
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=800',
    title: 'Midnight Vibes',
    isLiked: false,
    onBack: () => console.log('Back pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share pressed'),
  },
};

export const Liked: Story = {
  args: {
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=800',
    title: 'Midnight Vibes',
    isLiked: true,
    onBack: () => console.log('Back pressed'),
    onToggleFavorite: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share pressed'),
  },
};
