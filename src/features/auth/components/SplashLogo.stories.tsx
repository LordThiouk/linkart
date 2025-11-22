import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SplashLogo } from './SplashLogo';

const meta: Meta<typeof SplashLogo> = {
  title: 'features/auth/SplashLogo',
  component: SplashLogo,
};

export default meta;
type Story = StoryObj<typeof SplashLogo>;

export const Default: Story = {};
