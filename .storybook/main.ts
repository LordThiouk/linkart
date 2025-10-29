import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // ... existing resolve and optimizeDeps ...
      define: {
        'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify('http://localhost:54321'),
        'process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('your_dummy_anon_key'),
      },
    });
  },
};

export default config;
