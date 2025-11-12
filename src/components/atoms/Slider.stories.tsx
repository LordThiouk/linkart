/**
 * Slider Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import Slider from './Slider';
import { colors, spacing, typography } from '../../theme';

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  decorators: [
    Story => (
      <View
        style={{
          alignItems: 'flex-start',
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
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    disabled: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 80,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Volume',
    value: 75,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Prix maximum',
    value: 30000,
    min: 0,
    max: 100000,
    step: 1000,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Désactivé',
    value: 60,
    disabled: true,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    value: 70,
    variant: 'primary',
    showValue: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    value: 40,
    variant: 'secondary',
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    value: 90,
    variant: 'success',
    showValue: true,
  },
};

export const BPMSelector: Story = {
  args: {
    label: 'BPM',
    value: 120,
    min: 60,
    max: 200,
    step: 5,
    showValue: true,
    variant: 'primary',
  },
};

export const PriceRange: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.lg }}>
      <Slider label="Prix minimum" value={5000} min={0} max={100000} step={1000} showValue />
      <Slider label="Prix maximum" value={25000} min={0} max={100000} step={1000} showValue variant="secondary" />
    </View>
  ),
};

export const AudioSettings: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.lg }}>
      <Slider label="Volume" value={80} min={0} max={100} showValue variant="primary" />
      <Slider label="Balance" value={50} min={0} max={100} showValue variant="secondary" />
      <Slider label="Bass" value={60} min={0} max={100} showValue variant="success" />
    </View>
  ),
};

export const QualitySelector: Story = {
  args: { value: 0 },
  render: () => (
    <View style={{ gap: spacing.sm }}>
      <Text style={styles.title}>Qualité audio</Text>
      <Slider value={2} min={1} max={3} step={1} showValue variant="primary" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.helperText}>Low</Text>
        <Text style={styles.helperText}>Medium</Text>
        <Text style={styles.helperText}>High</Text>
      </View>
    </View>
  ),
};

const styles = {
  title: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
  },
};
