import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { NotificationsScreenFigma } from './NotificationsScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof NotificationsScreenFigma> = {
  title: 'Screens/Notifications/NotificationsScreenFigma',
  component: NotificationsScreenFigma,
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
type Story = StoryObj<typeof NotificationsScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
  },
};
