import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Smartphone, CreditCard, Wifi } from 'lucide-react-native';
import { PaymentMethodCard, PaymentMethodCardProps } from './PaymentMethodCard';
import { colors, spacing } from '@/theme';

const meta: Meta<typeof PaymentMethodCard> = {
  title: 'Features/Payments/PaymentMethodCard',
  component: PaymentMethodCard,
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Carte interactive pour sélectionner un mode de paiement (Wave, Orange Money, etc.) avec feedback visuel et état sélectionné.',
      },
    },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    colors: { control: false },
    icon: { control: false },
  },
  args: {
    id: 'wave',
    name: 'Wave',
    description: 'Paiement mobile rapide et sécurisé',
    colors: [colors.wavePrimary, colors.waveSecondary],
    icon: <Smartphone size={24} color={colors.textPrimary} />,
  },
};

export default meta;

type Story = StoryObj<typeof PaymentMethodCard>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const OrangeMoney: Story = {
  args: {
    id: 'om',
    name: 'Orange Money',
    description: 'Paiement via Orange Money',
    colors: [colors.orangeMoneyPrimary, colors.orangeMoneySecondary],
    icon: <CreditCard size={24} color={colors.textPrimary} />,
    selected: true,
  },
};

const InteractiveList = (props: Omit<PaymentMethodCardProps, 'onSelect'>) => {
  const [selectedId, setSelectedId] = useState<string>('wave');

  const cards: Omit<PaymentMethodCardProps, 'onSelect'>[] = [
    {
      ...props,
      id: 'wave',
      name: 'Wave',
      description: 'Paiement mobile rapide',
      colors: [colors.wavePrimary, colors.waveSecondary],
      icon: <Smartphone size={24} color={colors.textPrimary} />,
    },
    {
      ...props,
      id: 'om',
      name: 'Orange Money',
      description: 'Paiement via opérateur Orange',
      colors: [colors.orangeMoneyPrimary, colors.orangeMoneySecondary],
      icon: <CreditCard size={24} color={colors.textPrimary} />,
    },
    {
      ...props,
      id: 'wifi',
      name: 'Paiement web',
      description: 'Paiement via carte bancaire',
      colors: [colors.cyan, colors.primaryDark],
      icon: <Wifi size={24} color={colors.textPrimary} />,
    },
  ];

  return (
    <View style={{ gap: spacing.md }}>
      {cards.map(card => (
        <PaymentMethodCard
          key={card.id}
          {...card}
          selected={selectedId === card.id}
          onSelect={id => setSelectedId(id)}
        />
      ))}
    </View>
  );
};

export const Interactive: Story = {
  render: args => <InteractiveList {...args} />,
};
