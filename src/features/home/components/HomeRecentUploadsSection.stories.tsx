import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeRecentUploadsSection } from './HomeRecentUploadsSection';
import type { HomeProduct } from '../types';

const products: HomeProduct[] = [
  {
    id: '1',
    title: 'Urban Flow',
    artist: 'Beat Architect',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19000,
    type: 'beat',
    bpm: 95,
  },
  {
    id: '2',
    title: 'Vocal Chops Pack',
    artist: 'SampleKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 12000,
    type: 'sample',
  },
];

const meta: Meta<typeof HomeRecentUploadsSection> = {
  title: 'Features/Home/HomeRecentUploadsSection',
  component: HomeRecentUploadsSection,
};

export default meta;
type Story = StoryObj<typeof HomeRecentUploadsSection>;

export const Default: Story = {
  args: {
    products,
    playingProductId: '1',
    onProductPress: () => {},
    onTogglePlay: () => {},
  },
};
