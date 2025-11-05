import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    // Note: @storybook/addon-interactions@9.1.13 doesn't exist, using @storybook/addon-docs which includes actions
    // Note: @storybook/addon-a11y@10.0.0 requires Storybook 10.x, but we're on 9.x
    // Uncomment when upgrading to Storybook 10:
    // '@storybook/addon-a11y',
    // Note: @storybook/addon-actions is included in @storybook/addon-docs for v9.x
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  babel: async options => {
    // Utiliser le babel config de Storybook qui exclut NativeWind
    // Storybook ne doit pas utiliser le plugin NativeWind car il utilise Vite, pas Expo
    return {
      ...options,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        // Exclu complètement NativeWind et react-native-reanimated pour Storybook
        ...(options.plugins || []).filter(
          plugin =>
            !(typeof plugin === 'string' && plugin.includes('nativewind')) &&
            !(typeof plugin === 'string' && plugin.includes('react-native-reanimated')) &&
            !(Array.isArray(plugin) && plugin[0]?.includes?.('nativewind')) &&
            !(Array.isArray(plugin) && plugin[0]?.includes?.('react-native-reanimated'))
        ),
      ],
    };
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // Exclude NativeWind from Vite's dependency optimization
      optimizeDeps: {
        exclude: ['nativewind', 'react-native-reanimated'],
      },
      resolve: {
        alias: {
          // Mock react-native-reanimated pour Storybook (les worklets ne fonctionnent pas dans le web)
          'react-native-reanimated': path.resolve(__dirname, './mocks/react-native-reanimated.ts'),
        },
      },
      define: {
        'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify('http://localhost:54321'),
        'process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('your_dummy_anon_key'),
        // Désactiver les worklets dans Storybook
        'global._WORKLET': false,
        'global.__reanimatedWorkletInit': undefined,
      },
    });
  },
};

export default config;
