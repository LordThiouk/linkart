import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingsHeader } from './BookingsHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BookingsHeader> = {
  title: 'Features/Bookings/BookingsHeader',
  component: BookingsHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookingsHeader>;

export const Default: Story = {
  args: {},
};

export const WithSubtitle: Story = {
  args: {
    subtitle: '5 réservations',
  },
};

export const WithBackButton: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    subtitle: '3 réservations',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Mes Services',
    subtitle: '10 réservations actives',
  },
};
