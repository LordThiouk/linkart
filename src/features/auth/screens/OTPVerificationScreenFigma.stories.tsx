import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPVerificationScreenFigma } from './OTPVerificationScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof OTPVerificationScreenFigma> = {
  title: 'features/auth/OTPVerificationScreenFigma',
  component: OTPVerificationScreenFigma,
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
type Story = StoryObj<typeof OTPVerificationScreenFigma>;

export const Default: Story = {
  args: {
    contact: '+221 7X XXX XX XX',
    onVerify: () => console.log('Verify pressed'),
    onBack: () => console.log('Back pressed'),
  },
};

export const Email: Story = {
  args: {
    contact: 'email@example.com',
    onVerify: () => console.log('Verify pressed'),
    onBack: () => console.log('Back pressed'),
  },
};
