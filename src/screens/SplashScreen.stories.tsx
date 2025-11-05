/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SplashScreen } from './SplashScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof SplashScreen> = {
  title: 'Screens/SplashScreen',
  component: SplashScreen,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onComplete: { action: 'completed' },
  },
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  args: {
    onComplete: () => {},
  },
};

export const WithAnimation: Story = {
  args: {
    onComplete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de démarrage avec animation du logo et chargement.',
      },
    },
  },
};
