import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InboxHeader } from './InboxHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof InboxHeader> = {
  title: 'Features/Messaging/InboxHeader',
  component: InboxHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onSearch: { action: 'onSearch' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof InboxHeader>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onSearch: () => {},
  },
};

export const NoBackButton: Story = {
  args: {
    onSearch: () => {},
  },
};
