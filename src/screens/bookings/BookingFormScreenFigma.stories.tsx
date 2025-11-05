import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingFormScreenFigma } from './BookingFormScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof BookingFormScreenFigma> = {
  title: 'Screens/Bookings/BookingFormScreenFigma',
  component: BookingFormScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
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
    serviceId: 'service1',
    serviceName: 'Mixing & Mastering',
    providerName: 'Studio Pro',
    providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    packageName: 'Standard',
    price: 25000,
    deliveryTime: '3-5 jours',
    onBack: () => console.log('Back pressed'),
    onSubmit: () => console.log('Booking submitted'),
  },
};
