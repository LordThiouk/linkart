/**
 * Select Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import Select from './Select';
import { colors } from '../../theme';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  // Note: Les Modals React Native ne fonctionnent pas dans Storybook Web
  // mais fonctionnent correctement sur mobile (iOS/Android)
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
      options: ['default', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof Select>;

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
    placeholder: 'Sélectionner une option',
  },
};

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    label: 'Choisissez une option',
    placeholder: 'Sélectionner...',
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

export const DisabledWithValue: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    options: defaultOptions,
    invalid: true,
    error: 'Ce champ est requis',
  },
};

export const Filled: Story = {
  args: {
    options: defaultOptions,
    variant: 'filled',
  },
};

export const Small: Story = {
  args: {
    options: defaultOptions,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    size: 'lg',
  },
};

export const LicenseSelect: Story = {
  args: {
    label: 'Type de licence',
    options: [
      { value: 'basic', label: 'Basic - 5,000 F' },
      { value: 'non_exclusive', label: 'Non-Exclusive - 15,000 F' },
      { value: 'exclusive', label: 'Exclusive - 50,000 F' },
      { value: 'unlimited', label: 'Unlimited - 100,000 F' },
    ],
    placeholder: 'Choisir une licence',
  },
};

export const GenreSelect: Story = {
  args: {
    label: 'Genre musical',
    options: [
      { value: 'trap', label: 'Trap' },
      { value: 'drill', label: 'Drill' },
      { value: 'afrobeat', label: 'Afrobeat' },
      { value: 'hiphop', label: 'Hip-Hop' },
      { value: 'rnb', label: 'R&B' },
      { value: 'pop', label: 'Pop' },
    ],
    placeholder: 'Tous les genres',
  },
};

export const PaymentMethodSelect: Story = {
  args: {
    label: 'Méthode de paiement',
    options: [
      { value: 'wave', label: 'Wave Money' },
      { value: 'orange', label: 'Orange Money' },
      { value: 'card', label: 'Carte bancaire', disabled: true },
      { value: 'paypal', label: 'PayPal', disabled: true },
    ],
    placeholder: 'Choisir un moyen de paiement',
  },
};

export const CountrySelect: Story = {
  args: {
    label: 'Pays',
    options: [
      { value: 'sn', label: '🇸🇳 Sénégal' },
      { value: 'ci', label: "🇨🇮 Côte d'Ivoire" },
      { value: 'ml', label: '🇲🇱 Mali' },
      { value: 'bf', label: '🇧🇫 Burkina Faso' },
      { value: 'ng', label: '🇳🇬 Nigeria' },
      { value: 'gh', label: '🇬🇭 Ghana' },
    ],
    placeholder: 'Sélectionner un pays',
  },
};

export const SortBySelect: Story = {
  args: {
    label: 'Trier par',
    options: [
      { value: 'recent', label: 'Plus récent' },
      { value: 'popular', label: 'Plus populaire' },
      { value: 'price_asc', label: 'Prix croissant' },
      { value: 'price_desc', label: 'Prix décroissant' },
      { value: 'rating', label: 'Mieux notés' },
    ],
    value: 'recent',
    variant: 'filled',
    size: 'sm',
  },
};

export const BPMRangeSelect: Story = {
  args: {
    label: 'BPM',
    options: [
      { value: 'all', label: 'Tous' },
      { value: '60-90', label: '60-90 BPM (Lent)' },
      { value: '90-120', label: '90-120 BPM (Moyen)' },
      { value: '120-140', label: '120-140 BPM (Rapide)' },
      { value: '140+', label: '140+ BPM (Très rapide)' },
    ],
    placeholder: 'Sélectionner une plage BPM',
  },
};

export const WithError: Story = {
  args: {
    label: 'Genre obligatoire',
    options: [
      { value: 'trap', label: 'Trap' },
      { value: 'drill', label: 'Drill' },
      { value: 'afrobeat', label: 'Afrobeat' },
    ],
    invalid: true,
    error: 'Veuillez sélectionner un genre',
    placeholder: 'Choisir un genre',
  },
};
