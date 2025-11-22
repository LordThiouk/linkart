import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InfoBanner } from './InfoBanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof InfoBanner> = {
  title: 'Features/Messaging/InfoBanner',
  component: InfoBanner,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof InfoBanner>;

export const Default: Story = {
  args: {
    message: 'Cette conversation est privée et limitée à ce service. Restez respectueux.',
  },
};

export const Warning: Story = {
  args: {
    message: "Attention : Ne partagez pas de liens externes vers d'autres plateformes.",
    iconColor: '#F59E0B',
  },
};
