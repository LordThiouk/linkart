import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FeaturedServicesList } from './FeaturedServicesList';
import { mockServices } from '../mockData';

const meta: Meta<typeof FeaturedServicesList> = {
  title: 'features/featured-services/FeaturedServicesList',
  component: FeaturedServicesList,
};

export default meta;
type Story = StoryObj<typeof FeaturedServicesList>;

export const All: Story = {
  args: {
    services: mockServices,
    activeCategory: 'all',
    onServicePress: serviceId => console.log('Service pressed:', serviceId),
  },
};

export const Mixing: Story = {
  args: {
    services: mockServices,
    activeCategory: 'mixing',
    onServicePress: serviceId => console.log('Service pressed:', serviceId),
  },
};

export const Mastering: Story = {
  args: {
    services: mockServices,
    activeCategory: 'mastering',
    onServicePress: serviceId => console.log('Service pressed:', serviceId),
  },
};

export const Recording: Story = {
  args: {
    services: mockServices,
    activeCategory: 'recording',
    onServicePress: serviceId => console.log('Service pressed:', serviceId),
  },
};

export const Empty: Story = {
  args: {
    services: [],
    activeCategory: 'mixing',
    onServicePress: () => {},
  },
};
