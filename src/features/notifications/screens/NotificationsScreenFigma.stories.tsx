import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { NotificationsScreenFigma } from './NotificationsScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof NotificationsScreenFigma> = {
  title: 'Features/Notifications/NotificationsScreenFigma',
  component: NotificationsScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NotificationsScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => {},
  },
};
