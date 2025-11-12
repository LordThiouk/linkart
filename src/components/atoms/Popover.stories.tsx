/**
 * Popover Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import React from 'react';
import Popover, { PopoverContent } from './Popover';
import Button from './Button';
import Badge from './Badge';
import { colors, spacing, typography } from '../../theme';

const meta = {
  title: 'Atoms/Popover',
  component: Popover,
  // Note: Les Modals React Native ne fonctionnent pas dans Storybook Web
  // mais fonctionnent correctement sur mobile (iOS/Android)
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
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: (
      <PopoverContent>
        <Text style={{ color: colors.textPrimary }}>Popover content</Text>
      </PopoverContent>
    ),
    children: <Button title="Open Popover" onPress={() => {}} />,
  },
};

export const WithRichContent: Story = {
  args: {
    content: (
      <PopoverContent>
        <Text
          style={{
            fontSize: typography.fontSize.titleMd,
            fontFamily: typography.fontFamily.poppins.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.sm,
          }}
        >
          Beat Information
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.body,
            color: colors.textSecondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing.md,
          }}
        >
          Ce beat trap de 140 BPM est parfait pour des flows rapides et énergiques.
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Badge>Trap</Badge>
          <Badge variant="secondary">140 BPM</Badge>
        </View>
      </PopoverContent>
    ),
    children: <Button title="Beat Info" variant="outline" onPress={() => {}} />,
  },
};

export const PositionBottom: Story = {
  args: {
    side: 'bottom',
    content: (
      <PopoverContent>
        <Text style={{ color: colors.textPrimary }}>Position: Bottom</Text>
      </PopoverContent>
    ),
    children: <Button title="Bottom" onPress={() => {}} />,
  },
};

export const PositionTop: Story = {
  args: {
    side: 'top',
    content: (
      <PopoverContent>
        <Text style={{ color: colors.textPrimary }}>Position: Top</Text>
      </PopoverContent>
    ),
    children: <Button title="Top" onPress={() => {}} />,
  },
};

export const AlignStart: Story = {
  args: {
    side: 'bottom',
    align: 'start',
    content: (
      <PopoverContent>
        <Text style={{ color: colors.textPrimary }}>Align: Start</Text>
      </PopoverContent>
    ),
    children: <Button title="Align Start" onPress={() => {}} />,
  },
};

export const AlignEnd: Story = {
  args: {
    side: 'bottom',
    align: 'end',
    content: (
      <PopoverContent>
        <Text style={{ color: colors.textPrimary }}>Align: End</Text>
      </PopoverContent>
    ),
    children: <Button title="Align End" onPress={() => {}} />,
  },
};

export const UserMenu: Story = {
  args: {
    side: 'bottom',
    align: 'end',
    content: (
      <PopoverContent>
        <View style={{ gap: spacing.xs }}>
          <Button title="Mon profil" variant="ghost" fullWidth onPress={() => {}} />
          <Button title="Mes beats" variant="ghost" fullWidth onPress={() => {}} />
          <Button title="Favoris" variant="ghost" fullWidth onPress={() => {}} />
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.xs }} />
          <Button title="Paramètres" variant="ghost" fullWidth onPress={() => {}} />
          <Button title="Déconnexion" variant="ghost" fullWidth onPress={() => {}} />
        </View>
      </PopoverContent>
    ),
    children: (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.white, fontSize: 18 }}>👤</Text>
      </View>
    ),
  },
};

export const BeatStats: Story = {
  args: {
    side: 'bottom',
    content: (
      <PopoverContent>
        <Text
          style={{
            fontSize: typography.fontSize.titleMd,
            fontFamily: typography.fontFamily.poppins.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.md,
          }}
        >
          Statistiques
        </Text>
        <View style={{ gap: spacing.sm }}>
          {[
            { label: 'Vues', value: '1,234' },
            { label: 'Écoutes', value: '567' },
            { label: 'Favoris', value: '89' },
            { label: 'Téléchargements', value: '12' },
          ].map((stat, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.textMuted }}>{stat.label}</Text>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontFamily: typography.fontFamily.inter.medium,
                }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </PopoverContent>
    ),
    children: <Button title="Voir stats" variant="outline" size="sm" onPress={() => {}} />,
  },
};

export const ShareOptions: Story = {
  args: {
    side: 'bottom',
    content: (
      <PopoverContent>
        <Text
          style={{
            fontSize: typography.fontSize.titleMd,
            fontFamily: typography.fontFamily.poppins.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.md,
          }}
        >
          Partager
        </Text>
        <View style={{ gap: spacing.xs }}>
          {[
            { icon: '📱', name: 'WhatsApp' },
            { icon: '📘', name: 'Facebook' },
            { icon: '🐦', name: 'Twitter' },
            { icon: '🔗', name: 'Copier le lien' },
          ].map((option, index) => (
            <Button key={index} title={`${option.icon} ${option.name}`} variant="ghost" fullWidth onPress={() => {}} />
          ))}
        </View>
      </PopoverContent>
    ),
    children: <Button title="Partager" variant="secondary" onPress={() => {}} />,
  },
};

export const FilterMenu: Story = {
  args: {
    side: 'bottom',
    align: 'start',
    content: (
      <PopoverContent>
        <Text
          style={{
            fontSize: typography.fontSize.titleMd,
            fontFamily: typography.fontFamily.poppins.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.md,
          }}
        >
          Filtrer par genre
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Badge>Trap</Badge>
          <Badge variant="outline">Drill</Badge>
          <Badge variant="outline">Afrobeat</Badge>
          <Badge variant="outline">Hip-Hop</Badge>
          <Badge variant="outline">R&B</Badge>
          <Badge variant="outline">Pop</Badge>
        </View>
        <View style={{ marginTop: spacing.md, gap: spacing.xs }}>
          <Button title="Appliquer" variant="primary" size="sm" fullWidth onPress={() => {}} />
          <Button title="Réinitialiser" variant="ghost" size="sm" fullWidth onPress={() => {}} />
        </View>
      </PopoverContent>
    ),
    children: <Button title="Filtres" variant="outline" onPress={() => {}} />,
  },
};

export const LicenseInfo: Story = {
  args: {
    side: 'top',
    content: (
      <PopoverContent>
        <Text
          style={{
            fontSize: typography.fontSize.titleMd,
            fontFamily: typography.fontFamily.poppins.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.sm,
          }}
        >
          Licence Basic
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.body,
            color: colors.textSecondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing.md,
          }}
        >
          MP3 320kbps{'\n'}
          Usage non-commercial{'\n'}
          Jusqu'à 1,000 streams{'\n'}
          Tag obligatoire
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.headingLg,
            color: colors.secondary,
            fontFamily: typography.fontFamily.poppins.semibold,
          }}
        >
          15,000 F CFA
        </Text>
      </PopoverContent>
    ),
    children: <Button title="Licence ℹ️" variant="outline" size="sm" onPress={() => {}} />,
  },
};
