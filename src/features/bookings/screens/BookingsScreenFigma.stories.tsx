import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BookingsScreenFigma } from '@/features/bookings/screens/BookingsScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BookingsScreenFigma> = {
  title: 'Features/Bookings/BookingsScreenFigma',
  component: BookingsScreenFigma,
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
type Story = StoryObj<typeof BookingsScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    onOpenChat: (conversationId, userName) => console.log('Open chat:', conversationId, userName),
    userId: 'provider1',
    accessToken: 'mock-token',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    userId: 'user1',
  },
  render: args => {
    // Override to show empty state
    return <BookingsScreenFigma {...args} />;
  },
};
