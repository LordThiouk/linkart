import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InboxScreenFigma } from './InboxScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof InboxScreenFigma> = {
  title: 'Features/Messaging/InboxScreenFigma',
  component: InboxScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onConversationSelect: { action: 'onConversationSelect' },
    onSearch: { action: 'onSearch' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof InboxScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => {},
  },
};

export const WithConversation: Story = {
  args: {
    conversationId: '1',
    onBack: () => {},
  },
};
