import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceInfoCard } from './ServiceInfoCard';

const meta: Meta<typeof ServiceInfoCard> = {
  title: 'Features/Bookings/ServiceInfoCard',
  component: ServiceInfoCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ServiceInfoCard>;

export const Default: Story = {
  args: {
    serviceName: 'Mixing & Mastering Professionnel',
    providerName: 'Studio Alpha',
    providerImage: 'https://via.placeholder.com/40',
    packageName: 'Standard',
    price: 250.0,
    deliveryTime: '3-5 jours',
  },
};

export const PremiumPackage: Story = {
  args: {
    serviceName: 'Production Audio Complète',
    providerName: 'Sound Labs',
    providerImage: 'https://via.placeholder.com/40',
    packageName: 'Premium',
    price: 500.0,
    deliveryTime: '7-10 jours',
  },
};
