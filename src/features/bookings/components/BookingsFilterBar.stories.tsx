import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { BookingsFilterBar } from './BookingsFilterBar';
import type { BookingFilterType } from './BookingsFilterBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BookingsFilterBar> = {
  title: 'Features/Bookings/BookingsFilterBar',
  component: BookingsFilterBar,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookingsFilterBar>;

const InteractiveWrapper = (args: any) => {
  const [filter, setFilter] = useState<BookingFilterType>('all');
  return <BookingsFilterBar {...args} selectedFilter={filter} onFilterChange={setFilter} />;
};

export const Default: Story = {
  args: {
    selectedFilter: 'all',
    onFilterChange: (filter: BookingFilterType) => console.log('Filter changed:', filter),
  },
};

export const SelectedPending: Story = {
  args: {
    selectedFilter: 'pending',
    onFilterChange: (filter: BookingFilterType) => console.log('Filter changed:', filter),
  },
};

export const SelectedConfirmed: Story = {
  args: {
    selectedFilter: 'confirmed',
    onFilterChange: (filter: BookingFilterType) => console.log('Filter changed:', filter),
  },
};

export const Interactive: Story = {
  render: InteractiveWrapper,
  args: {},
};
