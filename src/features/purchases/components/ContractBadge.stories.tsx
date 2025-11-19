import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractBadge } from './ContractBadge';

const meta: Meta<typeof ContractBadge> = {
  title: 'Features/Purchases/ContractBadge',
  component: ContractBadge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContractBadge>;

export const Basic: Story = {
  args: {
    license: 'Basic',
  },
};

export const Premium: Story = {
  args: {
    license: 'Premium',
  },
};

export const Exclusive: Story = {
  args: {
    license: 'Exclusive',
  },
};
