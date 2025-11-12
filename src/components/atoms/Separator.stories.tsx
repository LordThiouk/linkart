/**
 * Separator Stories
 * Version: 2.0 - Design System
 *
 * Storybook stories pour tous les variants du Separator
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Separator from './Separator';
import { colors, spacing } from '../../theme';
import Card, { CardHeader, CardTitle, CardContent } from './Card';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du separator',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'strong'],
      description: 'Style variant du separator',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Taille du separator',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Largeur pleine',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Separator par défaut
 */
export const Default: Story = {
  args: {},
};

/**
 * Separator variant muted
 */
export const Muted: Story = {
  args: {
    variant: 'muted',
  },
};

/**
 * Separator variant strong
 */
export const Strong: Story = {
  args: {
    variant: 'strong',
  },
};

/**
 * Separator small
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Separator large
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Separator vertical
 */
export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', height: 100, alignItems: 'center' }}>
      <Text style={{ color: colors.textPrimary, flex: 1 }}>Gauche</Text>
      <Separator orientation="vertical" />
      <Text style={{ color: colors.textPrimary, flex: 1 }}>Droite</Text>
    </View>
  ),
};

/**
 * Separator vertical variants
 */
export const VerticalVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', gap: spacing.lg }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.sm }}>Default</Text>
        <Separator orientation="vertical" variant="default" />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.sm }}>Muted</Text>
        <Separator orientation="vertical" variant="muted" />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.sm }}>Strong</Text>
        <Separator orientation="vertical" variant="strong" />
      </View>
    </View>
  ),
};

/**
 * Separator dans un texte
 */
export const InText: Story = {
  render: () => (
    <View>
      <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Première section</Text>
      <Separator />
      <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Deuxième section</Text>
      <Separator />
      <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Troisième section</Text>
    </View>
  ),
};

/**
 * Separator dans une Card
 */
export const InCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Informations du Beat</CardTitle>
      </CardHeader>

      <Separator variant="muted" />

      <CardContent>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ color: colors.textSecondary }}>BPM: 140</Text>
          <Separator variant="muted" size="sm" />
          <Text style={{ color: colors.textSecondary }}>Genre: Trap</Text>
          <Separator variant="muted" size="sm" />
          <Text style={{ color: colors.textSecondary }}>Durée: 3:45</Text>
        </View>
      </CardContent>
    </Card>
  ),
};

/**
 * Separator liste d'items
 */
export const ItemList: Story = {
  render: () => (
    <Card>
      <View style={{ gap: spacing.md }}>
        <View>
          <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Beat 1</Text>
          <Text style={{ color: colors.textSecondary }}>Trap - 140 BPM</Text>
        </View>

        <Separator size="sm" />

        <View>
          <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Beat 2</Text>
          <Text style={{ color: colors.textSecondary }}>Drill - 150 BPM</Text>
        </View>

        <Separator size="sm" />

        <View>
          <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Beat 3</Text>
          <Text style={{ color: colors.textSecondary }}>Afrobeat - 128 BPM</Text>
        </View>
      </View>
    </Card>
  ),
};

/**
 * Separator sizes comparison
 */
export const SizesComparison: Story = {
  render: () => (
    <View style={{ gap: spacing.lg }}>
      <View>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.xs }}>Small</Text>
        <Separator size="sm" />
      </View>

      <View>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.xs }}>Default</Text>
        <Separator size="default" />
      </View>

      <View>
        <Text style={{ color: colors.textMuted, marginBottom: spacing.xs }}>Large</Text>
        <Separator size="lg" />
      </View>
    </View>
  ),
};
