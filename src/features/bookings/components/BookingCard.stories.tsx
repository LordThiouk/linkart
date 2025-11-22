import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';
import { BookingCard, BookingCardProps } from './BookingCard';
import { spacing } from '@/theme';

const meta: Meta<typeof BookingCard> = {
  title: 'Features/Bookings/BookingCard',
  component: BookingCard,
  args: {
    serviceName: 'Mixing & Mastering',
    counterpartLabel: 'Client',
    counterpartName: 'John Doe',
    message: 'Besoin de mixer mon dernier single pour sortie vendredi.',
    preferredDate: '15 décembre 2025',
    status: 'pending',
    showConfirmActions: true,
  },
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onReject: { action: 'onReject' },
    onChat: { action: 'onChat' },
    onComplete: { action: 'onComplete' },
  },
};

export default meta;

type Story = StoryObj<typeof BookingCard>;

export const Pending: Story = {};

export const ConfirmedWithChat: Story = {
  args: {
    status: 'confirmed',
    showConfirmActions: false,
    showChatAction: true,
  },
};

export const Completed: Story = {
  args: {
    status: 'completed',
    message: 'Session terminée avec succès ✅',
    showConfirmActions: false,
    showCompleteAction: false,
  },
};

export const Cancelled: Story = {
  args: {
    status: 'cancelled',
    message: 'Le client ne pouvait plus se déplacer.',
    showConfirmActions: false,
  },
};

export const ProviderActions: Story = {
  name: 'Flux prestataire',
  render: args => (
    <BookingCard
      {...args}
      serviceName="Enregistrement studio 4h"
      counterpartLabel="Client"
      counterpartName="Sarah Miller"
      message="Session ce week-end pour enregistrer vocals + ad-libs"
      preferredDate="20 décembre 2025"
      showConfirmActions
    />
  ),
};

const StatusGallery = (props: BookingCardProps) => (
  <View style={{ gap: spacing.md }}>
    <BookingCard {...props} status="pending" showConfirmActions />
    <BookingCard {...props} status="confirmed" counterpartLabel="Prestataire" showChatAction />
    <BookingCard
      {...props}
      status="completed"
      message="Livraison effectuée, mix et master envoyés."
      showCompleteAction={false}
      showConfirmActions={false}
    />
  </View>
);

export const AllStates: Story = {
  render: args => <StatusGallery {...args} />,
  args: {
    counterpartLabel: 'Client',
    counterpartName: 'DJ Alex',
  },
};
