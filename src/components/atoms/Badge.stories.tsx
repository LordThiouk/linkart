/**
 * Badge Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Badge
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Badge from './Badge';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
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
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'Style variant du badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du badge',
    },
    visible: {
      control: 'boolean',
      description: 'Badge visible',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Badge par défaut (primary)
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * Badge secondary (orange)
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/**
 * Badge destructive (erreur)
 */
export const Destructive: Story = {
  args: {
    children: 'Erreur',
    variant: 'destructive',
  },
};

/**
 * Badge outline
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

/**
 * Badge success (succès)
 */
export const Success: Story = {
  args: {
    children: 'Succès',
    variant: 'success',
  },
};

/**
 * Badge warning (avertissement)
 */
export const Warning: Story = {
  args: {
    children: 'Attention',
    variant: 'warning',
  },
};

/**
 * Badge info
 */
export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

/**
 * Badge small
 */
export const Small: Story = {
  args: {
    children: 'SM',
    size: 'sm',
  },
};

/**
 * Badge large
 */
export const Large: Story = {
  args: {
    children: 'Large Badge',
    size: 'lg',
  },
};

/**
 * Badge invisible
 */
export const Invisible: Story = {
  args: {
    children: 'Caché',
    visible: false,
  },
};

/**
 * Badges genres musicaux
 */
export const MusicGenres: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      <Badge variant="default">Trap</Badge>
      <Badge variant="secondary">Drill</Badge>
      <Badge variant="outline">Afrobeat</Badge>
      <Badge variant="info">Hip-Hop</Badge>
      <Badge variant="success">R&B</Badge>
    </View>
  ),
};

/**
 * Badges statuts
 */
export const StatusBadges: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'column', gap: spacing.md, alignItems: 'flex-start' }}>
      <Badge variant="success">Actif</Badge>
      <Badge variant="warning">En attente</Badge>
      <Badge variant="destructive">Rejeté</Badge>
      <Badge variant="info">En révision</Badge>
      <Badge variant="outline">Brouillon</Badge>
    </View>
  ),
};

/**
 * Badges licences
 */
export const LicenseBadges: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      <Badge variant="default" size="sm">
        Basic
      </Badge>
      <Badge variant="secondary" size="sm">
        Premium
      </Badge>
      <Badge variant="info" size="sm">
        Exclusive
      </Badge>
      <Badge variant="success" size="sm">
        Unlimited
      </Badge>
    </View>
  ),
};

/**
 * Badges tailles
 */
export const AllSizes: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'column', gap: spacing.md, alignItems: 'flex-start' }}>
      <Badge size="sm">Small Badge</Badge>
      <Badge size="default">Default Badge</Badge>
      <Badge size="lg">Large Badge</Badge>
    </View>
  ),
};

/**
 * Badges tous variants
 */
export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </View>
  ),
};

/**
 * Badges prix
 */
export const PriceBadges: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      <Badge variant="success">25,000 F</Badge>
      <Badge variant="warning">-30%</Badge>
      <Badge variant="secondary">PROMO</Badge>
      <Badge variant="destructive">ÉPUISÉ</Badge>
    </View>
  ),
};

/**
 * Badge avec emoji
 */
export const WithEmoji: Story = {
  args: { children: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      <Badge variant="success">✓ Vérifié</Badge>
      <Badge variant="warning">⚠️ Attention</Badge>
      <Badge variant="info">🔥 Tendance</Badge>
      <Badge variant="secondary">⭐ Premium</Badge>
    </View>
  ),
};
