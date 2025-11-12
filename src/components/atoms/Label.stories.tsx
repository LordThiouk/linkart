/**
 * Label Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Label
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Label from './Label';
import Input from './Input';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Label',
  component: Label,
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
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du label',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'error', 'success'],
      description: 'Style variant du label',
    },
    required: {
      control: 'boolean',
      description: 'Champ requis',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Label par défaut
 */
export const Default: Story = {
  args: {
    children: "Nom d'utilisateur",
  },
};

/**
 * Label requis
 */
export const Required: Story = {
  args: {
    children: 'Email',
    required: true,
  },
};

/**
 * Label désactivé
 */
export const Disabled: Story = {
  args: {
    children: 'Champ désactivé',
    disabled: true,
  },
};

/**
 * Label variant muted
 */
export const Muted: Story = {
  args: {
    children: 'Information optionnelle',
    variant: 'muted',
  },
};

/**
 * Label variant error
 */
export const Error: Story = {
  args: {
    children: 'Erreur de validation',
    variant: 'error',
  },
};

/**
 * Label variant success
 */
export const Success: Story = {
  args: {
    children: 'Validation réussie',
    variant: 'success',
  },
};

/**
 * Label small
 */
export const Small: Story = {
  args: {
    children: 'Petit label',
    size: 'sm',
  },
};

/**
 * Label large
 */
export const Large: Story = {
  args: {
    children: 'Grand label',
    size: 'lg',
  },
};

/**
 * Label avec Input
 */
export const WithInput: Story = {
  args: {
    children: 'Nom complet',
  },
  render: () => (
    <View style={{ gap: spacing.xs }}>
      <Label required>Nom complet</Label>
      <Input placeholder="John Doe" />
    </View>
  ),
};

/**
 * Label avec Input error
 */
export const WithInputError: Story = {
  args: {
    children: 'Mot de passe',
  },
  render: () => (
    <View style={{ gap: spacing.xs }}>
      <Label required variant="error">
        Mot de passe
      </Label>
      <Input placeholder="••••••••" error="Le mot de passe doit contenir au moins 8 caractères" secureTextEntry />
    </View>
  ),
};

/**
 * Formulaire complet
 */
export const FormExample: Story = {
  args: {
    children: "Nom d'utilisateur",
  },
  render: () => (
    <View style={{ gap: spacing.lg }}>
      <View>
        <Label required>Nom d'utilisateur</Label>
        <Input placeholder="john_doe" />
      </View>

      <View>
        <Label required>Email</Label>
        <Input placeholder="email@example.com" keyboardType="email-address" autoCapitalize="none" />
      </View>

      <View>
        <Label required>Mot de passe</Label>
        <Input placeholder="••••••••" secureTextEntry />
      </View>

      <View>
        <Label variant="muted">Biographie (optionnel)</Label>
        <Input placeholder="Parlez-nous de vous..." multiline numberOfLines={4} />
      </View>
    </View>
  ),
};
