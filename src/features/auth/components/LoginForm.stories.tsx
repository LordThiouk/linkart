import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onPhoneSubmit: { action: 'phone submitted' },
    onEmailSubmit: { action: 'email submitted' },
    // onNavigateToRegister: { action: 'navigated to register' }, // Not in LoginFormProps
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
