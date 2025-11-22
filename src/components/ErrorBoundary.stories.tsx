import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View, Text } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { colors, spacing, typography } from '../theme';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'System/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component:
          "Gestionnaire d'erreurs global affichant une UI cohérente avec le Design System lorsqu'un composant enfant crash.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const SafeContent = () => (
  <View
    style={{
      padding: spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: spacing.sm,
      gap: spacing.sm,
    }}
  >
    <Text
      style={{
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.poppins.semibold,
        fontSize: typography.fontSize.titleMd,
      }}
    >
      Tout est stable ✅
    </Text>
    <Text style={{ color: colors.textSecondary }}>
      Ce contenu s'affiche lorsque l'application fonctionne correctement.
    </Text>
  </View>
);

const CrashyComponent = () => {
  throw new Error('Erreur simulée pour la story ErrorBoundary');
};

export const NormalState: Story = {
  name: 'État normal',
  render: () => (
    <ErrorBoundary>
      <SafeContent />
    </ErrorBoundary>
  ),
};

export const FallbackState: Story = {
  name: 'Fallback après erreur',
  render: () => (
    <ErrorBoundary>
      <CrashyComponent />
    </ErrorBoundary>
  ),
};
