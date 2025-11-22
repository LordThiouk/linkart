import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SearchResults } from './SearchResults';

const meta: Meta<typeof SearchResults> = {
  title: 'features/search/SearchResults',
  component: SearchResults,
};

export default meta;
type Story = StoryObj<typeof SearchResults>;

const mockResults = [
  {
    id: '1',
    title: 'Dark Trap Energy',
    artist: 'BeatKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29.99,
    bpm: 140,
    genre: 'Trap',
    likes: 543,
  },
  {
    id: '2',
    title: 'Chill Vibes Only',
    artist: 'LoFi Master',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19.99,
    bpm: 85,
    genre: 'Lo-fi',
    likes: 892,
  },
];

export const WithResults: Story = {
  args: {
    query: 'trap',
    results: mockResults,
    onBeatClick: beatId => console.log('Beat clicked:', beatId),
  },
};

export const EmptyState: Story = {
  args: {
    query: '',
    results: [],
  },
};

export const NoResults: Story = {
  args: {
    query: 'xyz123',
    results: [],
    onBeatClick: beatId => console.log('Beat clicked:', beatId),
  },
};
