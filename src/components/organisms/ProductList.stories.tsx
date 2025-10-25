import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductList } from './ProductList';

const meta: Meta<typeof ProductList> = {
  title: 'Organisms/ProductList',
  component: ProductList,
  parameters: {
    docs: {
      description: {
        component: 'Liste de produits avec pagination et actions.',
      },
    },
  },
  argTypes: {
    products: {
      control: { type: 'object' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    refreshing: {
      control: { type: 'boolean' },
    },
    onProductPress: {
      action: 'onProductPress',
    },
    onRefresh: {
      action: 'onRefresh',
    },
    onLoadMore: {
      action: 'onLoadMore',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductList>;

const mockProducts = [
  {
    id: '1',
    title: 'Afrobeat Instrumental',
    price: 15000,
    type: 'beat',
    status: 'active',
    license: 'Standard',
    file_key: 'beats/1/afrobeat-instrumental.zip',
    preview_key: 'previews/1/afrobeat-instrumental.mp3',
    metadata: { genre: 'Afrobeat', bpm: 120, tags: ['Afrobeat', 'Instrumental'] },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    deleted_at: null,
    user_id: 'user1',
  },
  {
    id: '2',
    title: 'Trap Beat Premium',
    price: 25000,
    type: 'beat',
    status: 'active',
    license: 'Exclusive',
    file_key: 'beats/2/trap-beat-premium.zip',
    preview_key: 'previews/2/trap-beat-premium.mp3',
    metadata: { genre: 'Trap', bpm: 140, tags: ['Trap', 'Premium'] },
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    deleted_at: null,
    user_id: 'user2',
  },
  {
    id: '3',
    title: 'Service de Mixage',
    price: 50000,
    type: 'service',
    status: 'active',
    license: 'Standard',
    file_key: null,
    preview_key: null,
    metadata: { genre: 'Service', tags: ['Service', 'Mixage'] },
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    deleted_at: null,
    user_id: 'user3',
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    loading: false,
    refreshing: false,
    onProductPress: product => console.log('Product pressed:', product.id),
    onRefresh: () => console.log('Refresh'),
    onLoadMore: () => console.log('Load more'),
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
    refreshing: false,
    onProductPress: product => console.log('Product pressed:', product.id),
    onRefresh: () => console.log('Refresh'),
    onLoadMore: () => console.log('Load more'),
  },
};

export const Refreshing: Story = {
  args: {
    products: mockProducts,
    loading: false,
    refreshing: true,
    onProductPress: product => console.log('Product pressed:', product.id),
    onRefresh: () => console.log('Refresh'),
    onLoadMore: () => console.log('Load more'),
  },
};

export const Empty: Story = {
  args: {
    products: [],
    loading: false,
    refreshing: false,
    onProductPress: product => console.log('Product pressed:', product.id),
    onRefresh: () => console.log('Refresh'),
    onLoadMore: () => console.log('Load more'),
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
    loading: false,
    refreshing: false,
    onProductPress: product => console.log('Product pressed:', product.id),
    onRefresh: () => console.log('Refresh'),
    onLoadMore: () => console.log('Load more'),
  },
};
