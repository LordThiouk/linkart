/**
 * Switch Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Switch from './Switch';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
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
      description: 'État activé',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
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
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Switch',
  },
};

export const Checked: Story = {
  args: {
    label: 'On',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Off',
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
    label: 'Disabled On',
    checked: true,
    disabled: true,
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
      <Switch label="Primary" checked variant="primary" />
      <Switch label="Secondary" checked variant="secondary" />
      <Switch label="Success" checked variant="success" />
    </View>
  ),
};

export const AllSizes: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Switch label="Small" checked size="sm" />
      <Switch label="Default" checked size="default" />
      <Switch label="Large" checked size="lg" />
    </View>
  ),
};

export const AllStates: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Switch label="Off" checked={false} />
      <Switch label="On" checked={true} />
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" checked disabled />
    </View>
  ),
};

export const SettingsExample: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Switch label="Notifications push" checked />
      <Switch label="Mode sombre" checked variant="success" />
      <Switch label="Vibration" checked={false} />
      <Switch label="Économie de données" checked={false} />
    </View>
  ),
};

export const PrivacySettings: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Switch label="Profil public" checked variant="primary" />
      <Switch label="Afficher mon activité" checked={false} />
      <Switch label="Autoriser les messages directs" checked variant="success" />
      <Switch label="Partager ma localisation" checked={false} />
    </View>
  ),
};

export const MusicSettings: Story = {
  args: { label: '' },
  render: () => (
    <View style={{ gap: spacing.md }}>
      <Switch label="Lecture automatique" checked variant="primary" />
      <Switch label="Téléchargements automatiques" checked={false} />
      <Switch label="Qualité audio haute" checked variant="success" />
      <Switch label="Normaliser le volume" checked />
    </View>
  ),
};
