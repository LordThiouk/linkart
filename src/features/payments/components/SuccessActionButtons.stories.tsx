import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SuccessActionButtons } from './SuccessActionButtons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof SuccessActionButtons> = {
  title: 'Features/Payments/SuccessActionButtons',
  component: SuccessActionButtons,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onDownload: { action: 'download' },
    onViewPurchases: { action: 'viewPurchases' },
    onGoHome: { action: 'goHome' },
  },
};

export default meta;
type Story = StoryObj<typeof SuccessActionButtons>;

export const Default: Story = {
  args: {},
};

export const CustomDelay: Story = {
  args: {
    delay: 0,
  },
};
