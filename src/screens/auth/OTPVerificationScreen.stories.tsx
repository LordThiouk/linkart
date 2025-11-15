/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPVerificationScreen } from './OTPVerificationScreen';

const meta: Meta<typeof OTPVerificationScreen> = {
  title: 'Screens/Auth/OTPVerificationScreen',
  component: OTPVerificationScreen,
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
type Story = StoryObj<typeof meta>;

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
