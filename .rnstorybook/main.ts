import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  // Note: @storybook/addon-ondevice-actions génère un preview inexistant
  // Utiliser uniquement ondevice-controls pour l'instant
  addons: ['@storybook/addon-ondevice-controls'],
};

export default main;
