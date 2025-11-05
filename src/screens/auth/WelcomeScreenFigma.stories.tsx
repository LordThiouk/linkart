import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeScreenFigma } from './WelcomeScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof WelcomeScreenFigma> = {
  title: 'Screens/Auth/WelcomeScreenFigma',
  component: WelcomeScreenFigma,
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
type Story = StoryObj<typeof WelcomeScreenFigma>;

export const Default: Story = {
  args: {
    onStart: () => console.log('Start exploration pressed'),
  },
};
