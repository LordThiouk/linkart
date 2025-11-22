import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SplashContent } from './SplashContent';

const meta: Meta<typeof SplashContent> = {
  title: 'features/auth/SplashContent',
  component: SplashContent,
};

export default meta;
type Story = StoryObj<typeof SplashContent>;

export const Default: Story = {
  args: {
    title: 'SoundMarket',
    subtitle: 'Your Music Marketplace',
  },
};
