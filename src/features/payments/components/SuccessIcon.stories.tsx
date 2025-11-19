import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SuccessIcon } from './SuccessIcon';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof SuccessIcon> = {
  title: 'Features/Payments/SuccessIcon',
  component: SuccessIcon,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SuccessIcon>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 64,
  },
};

export const Large: Story = {
  args: {
    size: 160,
  },
};

export const CustomDelay: Story = {
  args: {
    delay: 0,
  },
};
