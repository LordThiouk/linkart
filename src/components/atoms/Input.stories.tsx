/**
 * Input Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Input
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Input from './Input';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/Input',
  component: Input,
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
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
      description: 'Style variant du input',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du input',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Largeur pleine',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Input par défaut
 */
export const Default: Story = {
  args: {
    placeholder: 'Entrez votre texte...',
  },
};

/**
 * Input avec label
 */
export const WithLabel: Story = {
  args: {
    label: "Nom d'utilisateur",
    placeholder: 'john_doe',
  },
};

/**
 * Input avec helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    helperText: 'Nous ne partagerons jamais votre email',
  },
};

/**
 * Input avec erreur
 */
export const WithError: Story = {
  args: {
    label: 'Mot de passe',
    placeholder: '••••••••',
    error: 'Le mot de passe doit contenir au moins 8 caractères',
    secureTextEntry: true,
  },
};

/**
 * Input variant filled
 */
export const Filled: Story = {
  args: {
    label: 'Rechercher',
    placeholder: 'Rechercher des beats...',
    variant: 'filled',
  },
};

/**
 * Input variant outline
 */
export const Outline: Story = {
  args: {
    label: 'Titre du beat',
    placeholder: 'Mon beat trap...',
    variant: 'outline',
  },
};

/**
 * Input small
 */
export const Small: Story = {
  args: {
    label: 'Petit input',
    placeholder: 'Texte...',
    size: 'sm',
  },
};

/**
 * Input large
 */
export const Large: Story = {
  args: {
    label: 'Grand input',
    placeholder: 'Texte...',
    size: 'lg',
  },
};

/**
 * Input désactivé
 */
export const Disabled: Story = {
  args: {
    label: 'Input désactivé',
    placeholder: 'Non éditable',
    disabled: true,
    value: 'Valeur fixe',
  },
};

/**
 * Input pleine largeur
 */
export const FullWidth: Story = {
  args: {
    label: 'Description',
    placeholder: 'Décrivez votre beat...',
    fullWidth: true,
    multiline: true,
    numberOfLines: 4,
  },
};

/**
 * Input avec valeur par défaut
 */
export const WithValue: Story = {
  args: {
    label: 'Nom du beat',
    value: 'Trap Beat 2025',
  },
};

/**
 * Input de type email
 */
export const EmailType: Story = {
  args: {
    label: 'Email',
    placeholder: 'votre@email.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
};

/**
 * Input de type téléphone
 */
export const PhoneType: Story = {
  args: {
    label: 'Téléphone',
    placeholder: '+221 XX XXX XX XX',
    keyboardType: 'phone-pad',
  },
};

/**
 * Input de type nombre
 */
export const NumberType: Story = {
  args: {
    label: 'Prix (FCFA)',
    placeholder: '25000',
    keyboardType: 'numeric',
  },
};
