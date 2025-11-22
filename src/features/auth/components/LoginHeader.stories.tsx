import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoginHeader } from './LoginHeader';

const meta: Meta<typeof LoginHeader> = {
  title: 'features/auth/LoginHeader',
  component: LoginHeader,
};

export default meta;
type Story = StoryObj<typeof LoginHeader>;

export const Default: Story = {
  args: {
    title: 'Bienvenue',
    subtitle: 'Connectez-vous pour continuer',
  },
};
