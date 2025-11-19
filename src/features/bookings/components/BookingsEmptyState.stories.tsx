import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingsEmptyState } from './BookingsEmptyState';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BookingsEmptyState> = {
  title: 'Features/Bookings/BookingsEmptyState',
  component: BookingsEmptyState,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookingsEmptyState>;

export const Default: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Aucune réservation trouvée',
    subtitle: 'Essayez de modifier vos filtres',
  },
};

export const NoSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
};
