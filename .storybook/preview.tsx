import type { Preview } from '@storybook/react-native-web-vite';
import React from 'react';
import { Decorator } from '@storybook/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withInteractiveState } from './decorators/withInteractiveState';

/**
 * Decorators globaux pour Storybook
 * L'ORDRE EST IMPORTANT:
 * 1. withInteractiveState - gère le state des composants interactifs
 * 2. SafeAreaProvider + NavigationContainer - contexte global
 */
export const decorators: Decorator[] = [
  withInteractiveState, // ← Ajouté en premier pour gérer le state
  Story => (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 375, height: 812 },
        insets: { top: 44, left: 0, bottom: 34, right: 0 },
      }}
    >
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    </SafeAreaProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
