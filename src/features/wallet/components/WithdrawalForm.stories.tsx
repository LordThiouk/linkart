import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { WithdrawalForm } from './WithdrawalForm';

const meta: Meta<typeof WithdrawalForm> = {
  title: 'Features/Wallet/WithdrawalForm',
  component: WithdrawalForm,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    balance: { control: 'number' },
    onSubmit: { action: 'submitted' },
    loading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof WithdrawalForm>;

export const Default: Story = {
  args: {
    balance: 75000,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    balance: 75000,
    loading: true,
  },
};

export const InsufficientBalance: Story = {
  args: {
    balance: 1000,
    loading: false,
  },
};
