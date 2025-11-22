import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServicePortfolio } from './ServicePortfolio';

const meta: Meta<typeof ServicePortfolio> = {
  title: 'features/services/ServicePortfolio',
  component: ServicePortfolio,
};

export default meta;
type Story = StoryObj<typeof ServicePortfolio>;

const mockPortfolio = [
  { id: '1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', title: 'Afrobeat Mix' },
  { id: '2', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400', title: 'Hip-Hop Master' },
  { id: '3', image: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400', title: 'R&B Production' },
];

export const Default: Story = {
  args: {
    items: mockPortfolio,
  },
};

export const SingleItem: Story = {
  args: {
    items: [mockPortfolio[0]],
  },
};
