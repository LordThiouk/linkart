/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoginScreen } from './LoginScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof LoginScreen> = {
  title: 'Screens/Auth/LoginScreen',
  component: LoginScreen,
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
    onLogin: { action: 'login' },
    onNavigateToSignUp: { action: 'navigateToSignUp' },
  },
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
  args: {
    onLogin: () => {},
    onNavigateToSignUp: () => {},
  },
};

export const WithError: Story = {
  args: {
    onLogin: () => {},
    onNavigateToSignUp: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de connexion avec gestion des erreurs de validation.',
      },
    },
  },
};
