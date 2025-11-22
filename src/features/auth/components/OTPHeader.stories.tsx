import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPHeader } from './OTPHeader';

const meta: Meta<typeof OTPHeader> = {
  title: 'features/auth/OTPHeader',
  component: OTPHeader,
};

export default meta;
type Story = StoryObj<typeof OTPHeader>;

export const Default: Story = {
  args: {
    title: 'Entrez le code',
    contact: '+221 7X XXX XX XX',
  },
};

export const Email: Story = {
  args: {
    title: 'Entrez le code',
    contact: 'email@example.com',
  },
};
