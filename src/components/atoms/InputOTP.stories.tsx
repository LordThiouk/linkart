/**
 * InputOTP Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import InputOTP from './InputOTP';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/InputOTP',
  component: InputOTP,
  decorators: [
    Story => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </View>
    ),
  ],
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    keyboardType: {
      control: 'select',
      options: ['numeric', 'default'],
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 6,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Code de vérification',
    length: 6,
  },
};

export const FourDigits: Story = {
  args: {
    label: 'Code PIN',
    length: 4,
  },
};

export const SixDigits: Story = {
  args: {
    label: 'Code OTP',
    length: 6,
  },
};

export const Filled: Story = {
  args: {
    label: 'Code rempli',
    value: '123456',
    length: 6,
  },
};

export const PartiallyFilled: Story = {
  args: {
    label: 'Code partiel',
    value: '123',
    length: 6,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Code désactivé',
    value: '123456',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Code invalide',
    value: '123456',
    invalid: true,
    error: 'Code incorrect',
  },
};

export const EmailVerification: Story = {
  args: {
    label: 'Vérifiez votre email',
    length: 6,
    keyboardType: 'numeric',
  },
};

export const PhoneVerification: Story = {
  args: {
    label: 'Code envoyé par SMS',
    length: 6,
    keyboardType: 'numeric',
  },
};

export const TwoFactorAuth: Story = {
  args: {
    label: 'Authentification à deux facteurs',
    length: 6,
    keyboardType: 'numeric',
  },
};

export const PINCode: Story = {
  args: {
    label: 'Entrez votre code PIN',
    length: 4,
    keyboardType: 'numeric',
  },
};

export const InvalidPIN: Story = {
  args: {
    label: 'Code PIN incorrect',
    value: '1234',
    length: 4,
    invalid: true,
    error: 'Code PIN invalide. Veuillez réessayer.',
  },
};
