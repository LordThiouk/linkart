import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductPreview } from './ProductPreview';

const meta: Meta<typeof ProductPreview> = {
  title: 'Molecules/ProductPreview',
  component: ProductPreview,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPress: { action: 'pressed' },
    onPlayPreview: { action: 'play preview' },
    onToggleFavorite: { action: 'toggle favorite' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductPreview>;

const mockCreator = {
  name: 'Producer Name',
  avatarUri: 'https://picsum.photos/100/100',
  rating: 4.5,
  isVerified: true,
};

export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    type: 'beat',
    price: 25000,
    currency: 'FCFA',
    creator: mockCreator,
    tags: ['trap', 'dark', 'hip-hop'],
    genre: 'Trap',
    bpm: 140,
    license: 'Basic',
    previewUri: 'https://example.com/preview.mp3',
    rating: 4.2,
    onPress: () => console.log('Product pressed'),
    onPlayPreview: () => console.log('Preview played'),
    onToggleFavorite: productId => console.log('Toggle favorite:', productId),
  },
};

export const WithMetrics: Story = {
  args: {
    id: '2',
    title: 'Afrobeat Fusion',
    type: 'beat',
    price: 35000,
    currency: 'FCFA',
    creator: mockCreator,
    tags: ['afrobeat', 'fusion', 'african'],
    genre: 'Afrobeat',
    bpm: 120,
    license: 'Non-Exclusive',
    previewUri: 'https://example.com/preview2.mp3',
    rating: 4.8,
    viewCount: 1250,
    downloadCount: 45,
    likeCount: 89,
    imageUrl: 'https://picsum.photos/300/200',
    onPress: () => console.log('Product pressed'),
    onPlayPreview: () => console.log('Preview played'),
    onToggleFavorite: productId => console.log('Toggle favorite:', productId),
  },
};

export const ServiceType: Story = {
  args: {
    id: '3',
    title: 'Professional Mixing Service',
    type: 'service',
    price: 50000,
    currency: 'FCFA',
    creator: {
      name: 'Audio Engineer',
      avatarUri: 'https://picsum.photos/100/100?random=3',
      rating: 4.9,
      isVerified: true,
    },
    tags: ['mixing', 'professional', 'studio'],
    genre: 'Audio Engineering',
    license: 'On-Demand',
    rating: 4.9,
    viewCount: 500,
    downloadCount: 0,
    likeCount: 25,
    imageUrl: 'https://picsum.photos/300/200?random=3',
    onPress: () => console.log('Service pressed'),
    onToggleFavorite: productId => console.log('Toggle favorite:', productId),
  },
};

export const KitType: Story = {
  args: {
    id: '4',
    title: 'Trap Kit Vol. 1',
    type: 'kit',
    price: 15000,
    currency: 'FCFA',
    creator: {
      name: 'Kit Producer',
      avatarUri: 'https://picsum.photos/100/100?random=4',
      rating: 4.3,
      isVerified: false,
    },
    tags: ['kit', 'trap', 'drums', 'samples'],
    genre: 'Trap',
    bpm: 140,
    license: 'Lease',
    previewUri: 'https://example.com/kit-preview.mp3',
    rating: 4.3,
    viewCount: 800,
    downloadCount: 120,
    likeCount: 67,
    imageUrl: 'https://picsum.photos/300/200?random=4',
    onPress: () => console.log('Kit pressed'),
    onPlayPreview: () => console.log('Kit preview played'),
    onToggleFavorite: productId => console.log('Toggle favorite:', productId),
  },
};

export const WithoutImage: Story = {
  args: {
    id: '5',
    title: 'Beat Without Image',
    type: 'beat',
    price: 20000,
    currency: 'FCFA',
    creator: mockCreator,
    tags: ['experimental'],
    genre: 'Experimental',
    bpm: 100,
    license: 'Basic',
    previewUri: 'https://example.com/preview5.mp3',
    rating: 3.8,
    viewCount: 300,
    downloadCount: 15,
    likeCount: 12,
    // Pas d'imageUrl - utilise le placeholder
    onPress: () => console.log('Product pressed'),
    onPlayPreview: () => console.log('Preview played'),
    onToggleFavorite: productId => console.log('Toggle favorite:', productId),
  },
};

export const AllTypes: Story = {
  render: () => (
    <>
      <ProductPreview
        id="1"
        title="Trap Beat"
        type="beat"
        price={25000}
        creator={mockCreator}
        tags={['trap']}
        genre="Trap"
        bpm={140}
        license="Basic"
        viewCount={1000}
        downloadCount={50}
        likeCount={75}
        imageUrl="https://picsum.photos/300/200?random=1"
        onPress={() => {}}
        onToggleFavorite={() => {}}
      />
      <ProductPreview
        id="2"
        title="Sample Pack"
        type="sample"
        price={10000}
        creator={mockCreator}
        tags={['samples']}
        genre="Various"
        license="Non-Exclusive"
        viewCount={500}
        downloadCount={200}
        likeCount={30}
        imageUrl="https://picsum.photos/300/200?random=2"
        onPress={() => {}}
        onToggleFavorite={() => {}}
      />
      <ProductPreview
        id="3"
        title="Kit Bundle"
        type="kit"
        price={30000}
        creator={mockCreator}
        tags={['kit', 'bundle']}
        genre="Hip-Hop"
        bpm={130}
        license="Exclusive"
        viewCount={2000}
        downloadCount={100}
        likeCount={150}
        imageUrl="https://picsum.photos/300/200?random=3"
        onPress={() => {}}
        onToggleFavorite={() => {}}
      />
    </>
  ),
};
