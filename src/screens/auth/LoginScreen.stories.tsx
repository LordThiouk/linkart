/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoginScreen } from './LoginScreen';

const meta: Meta<typeof LoginScreen> = {
  title: 'Screens/Auth/LoginScreen',
  component: LoginScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onBack: () => {},
  },
};

export const WithError: Story = {
  args: {
    onSubmit: () => {},
    onBack: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de connexion avec gestion des erreurs de validation.',
      },
    },
  },
};
