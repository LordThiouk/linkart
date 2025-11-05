// Babel config spécifique pour Storybook
// Exclut NativeWind car Storybook utilise Vite, pas Expo's babel
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      // Exclu 'nativewind/babel' car Storybook ne l'utilise pas
      // Exclu 'react-native-reanimated/plugin' car pas nécessaire pour Storybook web
    ],
  };
};
