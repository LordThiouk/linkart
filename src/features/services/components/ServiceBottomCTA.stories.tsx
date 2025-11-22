import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceBottomCTA } from './ServiceBottomCTA';

const meta: Meta<typeof ServiceBottomCTA> = {
  title: 'features/services/ServiceBottomCTA',
  component: ServiceBottomCTA,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ServiceBottomCTA>;

export const Default: Story = {
  args: {
    price: 99.99,
    deliveryTime: '3 jours',
    onBook: () => console.log('Book pressed'),
  },
};

export const BasicPackage: Story = {
  args: {
    price: 49.99,
    deliveryTime: '5 jours',
    onBook: () => console.log('Book pressed'),
  },
};
