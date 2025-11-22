import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SplashScreenFigma } from './SplashScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof SplashScreenFigma> = {
  title: 'features/auth/SplashScreenFigma',
  component: SplashScreenFigma,
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
type Story = StoryObj<typeof SplashScreenFigma>;

export const Default: Story = {
  args: {
    onComplete: () => console.log('Splash complete'),
  },
};
