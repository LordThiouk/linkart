import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeScreenFigma } from './WelcomeScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof WelcomeScreenFigma> = {
  title: 'features/auth/WelcomeScreenFigma',
  component: WelcomeScreenFigma,
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
type Story = StoryObj<typeof WelcomeScreenFigma>;

export const Default: Story = {
  args: {
    onStart: () => console.log('Start pressed'),
  },
};
