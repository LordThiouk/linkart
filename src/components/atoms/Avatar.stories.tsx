/**
 * Avatar Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants de l'Avatar
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Avatar, { AvatarGroup } from './Avatar';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
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
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: "Taille de l'avatar",
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'muted'],
      description: 'Couleur du fallback',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Avatar avec initiales
 */
export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
};

/**
 * Avatar avec image
 */
export const WithImage: Story = {
  args: {
    source: { uri: 'https://i.pravatar.cc/150?img=1' },
    name: 'John Doe',
  },
};

/**
 * Avatar small
 */
export const Small: Story = {
  args: {
    name: 'Alice Smith',
    size: 'sm',
  },
};

/**
 * Avatar default
 */
export const Default: Story = {
  args: {
    name: 'Bob Johnson',
    size: 'default',
  },
};

/**
 * Avatar large
 */
export const Large: Story = {
  args: {
    name: 'Charlie Brown',
    size: 'lg',
  },
};

/**
 * Avatar extra large
 */
export const ExtraLarge: Story = {
  args: {
    name: 'Diana Prince',
    size: 'xl',
  },
};

/**
 * Avatar variant primary
 */
export const VariantPrimary: Story = {
  args: {
    name: 'Primary User',
    variant: 'primary',
  },
};

/**
 * Avatar variant secondary
 */
export const VariantSecondary: Story = {
  args: {
    name: 'Secondary User',
    variant: 'secondary',
  },
};

/**
 * Avatar variant success
 */
export const VariantSuccess: Story = {
  args: {
    name: 'Success User',
    variant: 'success',
  },
};

/**
 * Avatar variant warning
 */
export const VariantWarning: Story = {
  args: {
    name: 'Warning User',
    variant: 'warning',
  },
};

/**
 * Avatar variant muted
 */
export const VariantMuted: Story = {
  args: {
    name: 'Muted User',
    variant: 'muted',
  },
};

/**
 * Avatar avec fallback custom
 */
export const CustomFallback: Story = {
  args: {
    fallbackText: 'AB',
    variant: 'primary',
  },
};

/**
 * Avatar sans nom (fallback ?)
 */
export const NoName: Story = {
  args: {
    variant: 'muted',
  },
};

/**
 * Avatar toutes tailles
 */
export const AllSizes: Story = {
  args: { name: '' },
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="default" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </View>
  ),
};

/**
 * Avatar tous variants
 */
export const AllVariants: Story = {
  args: { name: '' },
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
      <Avatar name="PR" variant="primary" />
      <Avatar name="SE" variant="secondary" />
      <Avatar name="SU" variant="success" />
      <Avatar name="WA" variant="warning" />
      <Avatar name="MU" variant="muted" />
    </View>
  ),
};

/**
 * Avatar avec images
 */
export const WithImages: Story = {
  args: { name: '' },
  render: () => (
    <View style={{ flexDirection: 'row', gap: spacing.md }}>
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=1' }} name="User 1" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=2' }} name="User 2" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} name="User 3" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=4' }} name="User 4" />
    </View>
  ),
};

/**
 * AvatarGroup - Groupe d'avatars empilés
 */
export const Group: Story = {
  args: { name: '' },
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="John Doe" variant="primary" />
      <Avatar name="Jane Smith" variant="secondary" />
      <Avatar name="Bob Johnson" variant="success" />
      <Avatar name="Alice Brown" variant="warning" />
      <Avatar name="Charlie Wilson" variant="muted" />
    </AvatarGroup>
  ),
};

/**
 * AvatarGroup avec images
 */
export const GroupWithImages: Story = {
  args: { name: '' },
  render: () => (
    <AvatarGroup max={4}>
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=1' }} name="User 1" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=2' }} name="User 2" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} name="User 3" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=4' }} name="User 4" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=5' }} name="User 5" />
      <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=6' }} name="User 6" />
    </AvatarGroup>
  ),
};

/**
 * AvatarGroup small
 */
export const GroupSmall: Story = {
  args: { name: '' },
  render: () => (
    <AvatarGroup size="sm" max={3}>
      <Avatar name="John Doe" variant="primary" size="sm" />
      <Avatar name="Jane Smith" variant="secondary" size="sm" />
      <Avatar name="Bob Johnson" variant="success" size="sm" />
      <Avatar name="Alice Brown" variant="warning" size="sm" />
    </AvatarGroup>
  ),
};

/**
 * AvatarGroup large
 */
export const GroupLarge: Story = {
  args: { name: '' },
  render: () => (
    <AvatarGroup size="lg" max={3}>
      <Avatar name="John Doe" variant="primary" size="lg" />
      <Avatar name="Jane Smith" variant="secondary" size="lg" />
      <Avatar name="Bob Johnson" variant="success" size="lg" />
      <Avatar name="Alice Brown" variant="warning" size="lg" />
    </AvatarGroup>
  ),
};

/**
 * Cas d'usage - Profils artistes
 */
export const ArtistProfiles: Story = {
  args: { name: '' },
  render: () => (
    <View style={{ gap: spacing.lg }}>
      <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
        <Avatar name="DJ Shadow" size="lg" variant="primary" />
        <View>
          <Avatar name="Beatmaker Pro" size="default" variant="secondary" />
        </View>
      </View>
      <AvatarGroup max={3}>
        <Avatar name="Producer 1" variant="primary" />
        <Avatar name="Producer 2" variant="secondary" />
        <Avatar name="Producer 3" variant="success" />
        <Avatar name="Producer 4" variant="warning" />
      </AvatarGroup>
    </View>
  ),
};
