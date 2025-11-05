/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPVerificationScreen } from './OTPVerificationScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof OTPVerificationScreen> = {
  title: 'Screens/Auth/OTPVerificationScreen',
  component: OTPVerificationScreen,
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
    contact: { control: 'text' },
    onVerify: { action: 'verified' },
    onBack: { action: 'back' },
  },
  args: {
    contact: '+221 77 123 45 67',
  },
};

export default meta;
type Story = StoryObj<typeof OTPVerificationScreen>;

export const Default: Story = {
  args: {
    contact: '+221 77 123 45 67',
    onVerify: () => {},
    onBack: () => {},
  },
};

export const WithError: Story = {
  args: {
    contact: '+221 77 123 45 67',
    onVerify: () => {},
    onBack: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de vérification OTP avec gestion des erreurs et renvoi de code.',
      },
    },
  },
};
