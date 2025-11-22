import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeLogo } from './WelcomeLogo';

const meta: Meta<typeof WelcomeLogo> = {
  title: 'features/auth/WelcomeLogo',
  component: WelcomeLogo,
};

export default meta;
type Story = StoryObj<typeof WelcomeLogo>;

export const Default: Story = {};
