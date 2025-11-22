import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileSetupScreenFigma } from './ProfileSetupScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ProfileSetupScreenFigma> = {
  title: 'features/auth/ProfileSetupScreenFigma',
  component: ProfileSetupScreenFigma,
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
type Story = StoryObj<typeof ProfileSetupScreenFigma>;

export const Default: Story = {
  args: {
    onComplete: () => console.log('Complete pressed'),
    onSkip: () => console.log('Skip pressed'),
  },
};
