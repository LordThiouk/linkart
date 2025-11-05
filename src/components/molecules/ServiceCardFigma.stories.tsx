/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceCardFigma } from './ServiceCardFigma';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof ServiceCardFigma> = {
  title: 'Molecules/ServiceCardFigma',
  component: ServiceCardFigma,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 300 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    provider: { control: 'text' },
    price: { control: 'number' },
    rating: { control: 'number' },
    isPro: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
  args: {
    id: '1',
    title: 'Professional Mixing & Mastering',
    provider: 'Audio Engineer Pro',
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=400',
    price: 49000,
    rating: 4.9,
    reviewCount: 127,
    deliveryTime: '3 jours',
    category: 'Mixing',
    isPro: true,
  },
};

export default meta;

type Story = StoryObj<typeof ServiceCardFigma>;

export const Default: Story = {
  args: {},
};

export const NonPro: Story = {
  args: {
    isPro: false,
    title: 'Vocal Recording & Production',
    provider: 'Studio Master',
    price: 39000,
    rating: 4.8,
  },
};

export const HighRating: Story = {
  args: {
    rating: 5.0,
    reviewCount: 500,
    price: 75000,
  },
};

export const VerticalList: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ServiceCardFigma
        id="1"
        title="Professional Mixing & Mastering"
        provider="Audio Engineer Pro"
        providerImage="https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100"
        coverImage="https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=400"
        price={49000}
        rating={4.9}
        reviewCount={127}
        deliveryTime="3 jours"
        category="Mixing"
        isPro={true}
        onPress={() => {}}
      />
      <ServiceCardFigma
        id="2"
        title="Vocal Recording & Production"
        provider="Studio Master"
        providerImage="https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100"
        coverImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400"
        price={39000}
        rating={4.8}
        reviewCount={89}
        deliveryTime="2 jours"
        category="Recording"
        isPro={true}
        onPress={() => {}}
      />
    </View>
  ),
};
