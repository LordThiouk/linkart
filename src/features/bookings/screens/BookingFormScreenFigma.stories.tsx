import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormScreenFigma } from './BookingFormScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BookingFormScreenFigma> = {
  title: 'Features/Bookings/BookingFormScreenFigma',
  component: BookingFormScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookingFormScreenFigma>;

export const Default: Story = {
  args: {
    serviceId: '1',
    serviceName: 'Mixing & Mastering Professionnel',
    providerName: 'Studio Alpha',
    providerImage: 'https://via.placeholder.com/40',
    packageName: 'Standard',
    price: 250.0,
    deliveryTime: '3-5 jours',
    onBack: () => {},
    onSubmit: () => {},
  },
};
