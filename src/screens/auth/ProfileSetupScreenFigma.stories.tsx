import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileSetupScreenFigma } from './ProfileSetupScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof ProfileSetupScreenFigma> = {
  title: 'Screens/Auth/ProfileSetupScreenFigma',
  component: ProfileSetupScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
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
    onComplete: () => console.log('Profile setup completed'),
    onSkip: () => console.log('Profile setup skipped'),
  },
};
