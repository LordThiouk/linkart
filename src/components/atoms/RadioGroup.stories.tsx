/**
 * RadioGroup Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import RadioGroup from './RadioGroup';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
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
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

export const Selected: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const Invalid: Story = {
  args: {
    options: defaultOptions,
    invalid: true,
  },
};

export const Primary: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    variant: 'success',
  },
};

export const Small: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    size: 'lg',
  },
};

export const Horizontal: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    orientation: 'horizontal',
  },
};

export const LicenseSelection: Story = {
  args: {
    options: [
      { value: 'basic', label: 'Basic - 5,000 F' },
      { value: 'non_exclusive', label: 'Non-Exclusive - 15,000 F' },
      { value: 'exclusive', label: 'Exclusive - 50,000 F' },
    ],
    value: 'non_exclusive',
    variant: 'primary',
  },
};

export const PaymentMethod: Story = {
  args: {
    options: [
      { value: 'wave', label: 'Wave Money' },
      { value: 'orange', label: 'Orange Money' },
      { value: 'card', label: 'Carte bancaire', disabled: true },
    ],
    value: 'wave',
    variant: 'secondary',
  },
};

export const MusicGenre: Story = {
  args: {
    options: [
      { value: 'trap', label: 'Trap' },
      { value: 'drill', label: 'Drill' },
      { value: 'afrobeat', label: 'Afrobeat' },
      { value: 'hiphop', label: 'Hip-Hop' },
      { value: 'rnb', label: 'R&B' },
    ],
    value: 'trap',
    variant: 'primary',
  },
};

export const AccountType: Story = {
  args: {
    options: [
      { value: 'artist', label: 'Artiste' },
      { value: 'producer', label: 'Beatmaker' },
      { value: 'engineer', label: 'Ingénieur son' },
      { value: 'label', label: 'Label' },
    ],
    value: 'producer',
    variant: 'success',
  },
};

export const DeliveryFormat: Story = {
  args: {
    options: [
      { value: 'mp3', label: 'MP3 (320kbps)' },
      { value: 'wav', label: 'WAV (Lossless)' },
      { value: 'stems', label: 'Stems (Multipiste)' },
    ],
    value: 'wav',
    orientation: 'horizontal',
  },
};
