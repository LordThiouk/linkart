/**
 * Checkbox Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Checkbox from './Checkbox';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
        <Story />
      </View>
    ),
  ],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État coché',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    invalid: {
      control: 'boolean',
      description: 'État invalide (erreur)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked',
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    checked: true,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid',
    invalid: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    checked: true,
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    checked: true,
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    checked: true,
    variant: 'success',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    checked: true,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    checked: true,
    size: 'lg',
  },
};

export const AllVariants: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="Primary" checked variant="primary" />
      <Checkbox label="Secondary" checked variant="secondary" />
      <Checkbox label="Success" checked variant="success" />
    </View>
  ),
};

export const AllSizes: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="Small" checked size="sm" />
      <Checkbox label="Default" checked size="default" />
      <Checkbox label="Large" checked size="lg" />
    </View>
  ),
};

export const AllStates: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" checked disabled />
      <Checkbox label="Invalid" invalid />
    </View>
  ),
};

export const FormExample: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="J'accepte les conditions d'utilisation" />
      <Checkbox label="Je souhaite recevoir des notifications" />
      <Checkbox label="Abonnez-moi à la newsletter" />
    </View>
  ),
};

export const SettingsExample: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="Activer les notifications push" checked />
      <Checkbox label="Recevoir les emails promotionnels" checked={false} />
      <Checkbox label="Partager ma position" checked={false} />
      <Checkbox label="Mode sombre" checked variant="success" />
    </View>
  ),
};

export const MusicPreferences: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Checkbox label="Trap" checked variant="primary" />
      <Checkbox label="Drill" checked variant="primary" />
      <Checkbox label="Afrobeat" checked={false} />
      <Checkbox label="Hip-Hop" checked variant="primary" />
      <Checkbox label="R&B" checked={false} />
    </View>
  ),
};
