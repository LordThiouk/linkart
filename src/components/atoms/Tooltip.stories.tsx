/**
 * Tooltip Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import React from 'react';
import Tooltip from './Tooltip';
import Button from './Button';
import Badge from './Badge';
import { colors, spacing } from '../../theme';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          padding: 100,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Tooltip content',
    children: <Button title="Long press me" onPress={() => {}} />,
  },
};

export const Top: Story = {
  args: {
    content: 'Tooltip en haut',
    side: 'top',
    children: <Button title="Long press" onPress={() => {}} />,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip en bas',
    side: 'bottom',
    children: <Button title="Long press" onPress={() => {}} />,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip à gauche',
    side: 'left',
    children: <Button title="Long press" onPress={() => {}} />,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip à droite',
    side: 'right',
    children: <Button title="Long press" onPress={() => {}} />,
  },
};

export const LongText: Story = {
  args: {
    content: 'Ceci est un tooltip avec un texte beaucoup plus long qui devrait être wrappé sur plusieurs lignes.',
    children: <Button title="Long press" onPress={() => {}} />,
  },
};

export const WithBadge: Story = {
  args: { content: 'Cliquez pour voir tous les beats Trap', children: <Badge>Trap</Badge> },
  render: () => (
    <Tooltip content="Cliquez pour voir tous les beats Trap">
      <Badge>Trap</Badge>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  args: {
    content: 'Ajouter aux favoris',
    children: (
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 24 }}>♥</Text>
      </View>
    ),
  },
  render: () => (
    <Tooltip content="Ajouter aux favoris">
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 24 }}>♥</Text>
      </View>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'Tooltip avec délai de 500ms',
    delayDuration: 500,
    children: <Button title="Long press (500ms)" onPress={() => {}} />,
  },
};

export const QuickTip: Story = {
  args: {
    content: 'Astuce rapide',
    delayDuration: 0,
    children: <Button title="Long press (instantané)" onPress={() => {}} />,
  },
};

export const HelpButton: Story = {
  args: {
    content: 'Aide : Utilisez les filtres pour affiner votre recherche',
    children: (
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>?</Text>
      </View>
    ),
  },
  render: () => (
    <Tooltip content="Aide : Utilisez les filtres pour affiner votre recherche">
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>?</Text>
      </View>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  args: {
    content: 'Profil utilisateur',
    children: (
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 24 }}>👤</Text>
      </View>
    ),
  },
  render: () => (
    <View style={{ flexDirection: 'row', gap: spacing.lg }}>
      <Tooltip content="Profil utilisateur">
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.white, fontSize: 24 }}>👤</Text>
        </View>
      </Tooltip>
      ),
    </View>
  ),
};
