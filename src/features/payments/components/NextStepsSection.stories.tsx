import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { NextStepsSection } from './NextStepsSection';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof NextStepsSection> = {
  title: 'Features/Payments/NextStepsSection',
  component: NextStepsSection,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NextStepsSection>;

export const Default: Story = {
  args: {},
};

export const CustomDelay: Story = {
  args: {
    delay: 0,
  },
};
