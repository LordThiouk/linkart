import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import { PricingSelector } from './PricingSelector';

const licenses = [
  { name: 'Basic', price: 29000, features: ['MP3 & WAV', '2000 streams', 'Crédit obligatoire'] },
  { name: 'Premium', price: 49000, features: ['MP3 & WAV & Stems', '10000 streams', 'Crédit optionnel'] },
  { name: 'Exclusive', price: 299000, features: ['Tous les fichiers', 'Streams illimités', 'Droits exclusifs'] },
];

const InteractiveWrapper: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <PricingSelector licenses={licenses} selectedLicenseIndex={selectedIndex} onSelectLicense={setSelectedIndex} />
  );
};

const meta: Meta<typeof PricingSelector> = {
  title: 'Features/Products/PricingSelector',
  component: PricingSelector,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PricingSelector>;

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Sélectionner votre licence',
    licenses,
    selectedLicenseIndex: 1,
    onSelectLicense: index => console.log('Selected:', index),
  },
};

export const BasicSelected: Story = {
  args: {
    licenses,
    selectedLicenseIndex: 0,
    onSelectLicense: index => console.log('Selected:', index),
  },
};

export const PremiumSelected: Story = {
  args: {
    licenses,
    selectedLicenseIndex: 1,
    onSelectLicense: index => console.log('Selected:', index),
  },
};

export const ExclusiveSelected: Story = {
  args: {
    licenses,
    selectedLicenseIndex: 2,
    onSelectLicense: index => console.log('Selected:', index),
  },
};
