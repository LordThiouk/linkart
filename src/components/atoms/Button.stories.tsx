/**
 * Button Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Button
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Button from './Button';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/Button',
  component: Button,
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
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Style variant du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Largeur pleine',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Bouton principal (primary)
 * Utilisé pour les actions principales
 */
export const Primary: Story = {
  args: {
    title: 'Primary Button',
    onPress: () => console.log('Primary pressed'),
    variant: 'primary',
  },
};

/**
 * Bouton secondaire
 * Utilisé pour les actions secondaires
 */
export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    onPress: () => console.log('Secondary pressed'),
    variant: 'secondary',
  },
};

/**
 * Bouton avec contour
 * Utilisé pour les actions tertiaires
 */
export const Outline: Story = {
  args: {
    title: 'Outline Button',
    onPress: () => console.log('Outline pressed'),
    variant: 'outline',
  },
};

/**
 * Bouton ghost (transparent)
 * Utilisé pour les actions discrètes
 */
export const Ghost: Story = {
  args: {
    title: 'Ghost Button',
    onPress: () => console.log('Ghost pressed'),
    variant: 'ghost',
  },
};

/**
 * Bouton destructive (danger)
 * Utilisé pour les actions destructrices (supprimer, annuler)
 */
export const Destructive: Story = {
  args: {
    title: 'Supprimer',
    onPress: () => console.log('Destructive pressed'),
    variant: 'destructive',
  },
};

/**
 * Bouton link (style lien)
 * Utilisé pour les actions de navigation
 */
export const Link: Story = {
  args: {
    title: 'En savoir plus',
    onPress: () => console.log('Link pressed'),
    variant: 'link',
  },
};

/**
 * Bouton petit (sm)
 */
export const Small: Story = {
  args: {
    title: 'Small Button',
    onPress: () => console.log('Small pressed'),
    size: 'sm',
  },
};

/**
 * Bouton par défaut
 */
export const Default: Story = {
  args: {
    title: 'Default Button',
    onPress: () => console.log('Default pressed'),
    size: 'default',
  },
};

/**
 * Bouton large (lg)
 */
export const Large: Story = {
  args: {
    title: 'Large Button',
    onPress: () => console.log('Large pressed'),
    size: 'lg',
  },
};

/**
 * Bouton icon (carré pour icône)
 * Utilisé pour les boutons avec uniquement une icône
 */
export const Icon: Story = {
  args: {
    title: '✕',
    onPress: () => console.log('Icon pressed'),
    size: 'icon',
  },
};

/**
 * Bouton désactivé
 */
export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    onPress: () => console.log('This should not fire'),
    disabled: true,
  },
};

/**
 * Bouton en chargement
 */
export const Loading: Story = {
  args: {
    title: 'Loading Button',
    onPress: () => console.log('Loading pressed'),
    loading: true,
  },
};

/**
 * Bouton pleine largeur
 */
export const FullWidth: Story = {
  args: {
    title: 'Full Width Button',
    onPress: () => console.log('Full width pressed'),
    fullWidth: true,
  },
};

/**
 * Combinaison : Secondary + Large
 */
export const SecondaryLarge: Story = {
  args: {
    title: 'Secondary Large',
    onPress: () => console.log('Secondary Large pressed'),
    variant: 'secondary',
    size: 'lg',
  },
};

/**
 * Combinaison : Outline + Small
 */
export const OutlineSmall: Story = {
  args: {
    title: 'Outline Small',
    onPress: () => console.log('Outline Small pressed'),
    variant: 'outline',
    size: 'sm',
  },
};
