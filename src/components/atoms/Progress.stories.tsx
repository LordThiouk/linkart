/**
 * Progress Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Progress from './Progress';
import { colors, spacing, typography } from '../../theme';

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
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
        <View style={{ width: '100%', maxWidth: 400, gap: spacing.md }}>
          <Story />
        </View>
      </View>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Valeur de progression (0-100)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Primary: Story = {
  args: {
    value: 60,
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    value: 75,
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 30,
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    value: 15,
    variant: 'error',
  },
};

export const Small: Story = {
  args: {
    value: 65,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 85,
    size: 'lg',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const AllVariants: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.lg, width: '100%' }}>
      <View>
        <Text style={styles.label}>Primary (60%)</Text>
        <Progress value={60} variant="primary" />
      </View>
      <View>
        <Text style={styles.label}>Secondary (75%)</Text>
        <Progress value={75} variant="secondary" />
      </View>
      <View>
        <Text style={styles.label}>Success (100%)</Text>
        <Progress value={100} variant="success" />
      </View>
      <View>
        <Text style={styles.label}>Warning (40%)</Text>
        <Progress value={40} variant="warning" />
      </View>
      <View>
        <Text style={styles.label}>Error (20%)</Text>
        <Progress value={20} variant="error" />
      </View>
    </View>
  ),
};

export const AllSizes: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.lg, width: '100%' }}>
      <View>
        <Text style={styles.label}>Small</Text>
        <Progress value={70} size="sm" />
      </View>
      <View>
        <Text style={styles.label}>Default</Text>
        <Progress value={70} size="default" />
      </View>
      <View>
        <Text style={styles.label}>Large</Text>
        <Progress value={70} size="lg" />
      </View>
    </View>
  ),
};

export const UploadProgress: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.sm, width: '100%' }}>
      <Text style={styles.label}>Téléversement en cours...</Text>
      <Progress value={45} variant="primary" size="lg" />
      <Text style={styles.helperText}>45% - 2.3 MB / 5.1 MB</Text>
    </View>
  ),
};

export const PaymentProcessing: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.sm, width: '100%' }}>
      <Text style={styles.label}>Traitement du paiement</Text>
      <Progress value={66} variant="secondary" size="default" />
      <Text style={styles.helperText}>Vérification en cours...</Text>
    </View>
  ),
};

const styles = {
  label: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
};
