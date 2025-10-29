import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductList } from './ProductList';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';
import { Product } from '../../types';

const meta: Meta<typeof ProductList> = {
  title: 'Organisms/ProductList',
  component: ProductList,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onProductPress: { action: 'product pressed' },
    onLoadMore: { action: 'load more' },
    onRefresh: { action: 'refresh' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductList>;

const mockProducts = [
  {
    id: '1',
    title: 'Dark Trap Beat',
    artist: 'Producer Name',
    price: 25000,
    imageUrl: 'https://picsum.photos/300/200?random=1',
    genre: 'Trap',
    bpm: 140,
    license: 'Basic',
    rating: 4.2,
    viewCount: 1250,
    downloadCount: 45,
    likeCount: 89,
  },
  {
    id: '2',
    title: 'Afrobeat Fusion',
    artist: 'African Producer',
    price: 35000,
    imageUrl: 'https://picsum.photos/300/200?random=2',
    genre: 'Afrobeat',
    bpm: 120,
    license: 'Non-Exclusive',
    rating: 4.8,
    viewCount: 800,
    downloadCount: 120,
    likeCount: 67,
  },
  {
    id: '3',
    title: 'Hip-Hop Instrumental',
    artist: 'Beat Maker',
    price: 20000,
    imageUrl: 'https://picsum.photos/300/200?random=3',
    genre: 'Hip-Hop',
    bpm: 90,
    license: 'Lease',
    rating: 4.5,
    viewCount: 600,
    downloadCount: 30,
    likeCount: 45,
  },
];

export const Default: Story = {
  args: {
    products: mockProducts as never,
    loading: false,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};

export const Loading: Story = {
  args: {
    products: [] as never,
    loading: true,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};

export const Empty: Story = {
  args: {
    products: [] as never,
    loading: false,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};

export const Error: Story = {
  args: {
    products: [] as never,
    loading: false,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};

export const ManyProducts: Story = {
  args: {
    products: [
      ...(mockProducts as never),
      ...(mockProducts as unknown as Product[]),
      ...(mockProducts as unknown as Product[]).map((p: Product, i: number) => ({ ...p, id: `${p.id}-${i + 4}` })),
      ...(mockProducts as unknown as Product[]).map((p: Product, i: number) => ({ ...p, id: `${p.id}-${i + 7}` })),
    ] as Product[],
    loading: false,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};

export const WithBoostedProducts: Story = {
  args: {
    products: (mockProducts as unknown as Product[]).map((product: Product, index: number) => ({
      ...product,
      isBoosted: index === 0, // Premier produit boosté
    })) as Product[],
    loading: false,
    onProductPress: productId => console.log('Product pressed:', productId),
    onLoadMore: () => console.log('Load more'),
    onRefresh: () => console.log('Refresh'),
  },
};
