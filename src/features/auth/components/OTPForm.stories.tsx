import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { OTPForm } from './OTPForm';

const meta: Meta<typeof OTPForm> = {
  title: 'Features/Auth/OTPForm',
  component: OTPForm,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onOTPSubmit: { action: 'otp submitted' },
    onResend: { action: 'resend requested' },
    phoneOrEmail: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OTPForm>;

export const Default: Story = {
  args: {
    phoneOrEmail: '+221 77 123 45 67',
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
