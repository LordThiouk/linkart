import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InboxScreenFigma } from './InboxScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof InboxScreenFigma> = {
  title: 'Screens/Messaging/InboxScreenFigma',
  component: InboxScreenFigma,
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
type Story = StoryObj<typeof InboxScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
  },
};

export const WithConversation: Story = {
  args: {
    conversationId: '1',
    onBack: () => console.log('Back pressed'),
  },
};
