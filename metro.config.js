const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// Utiliser process.cwd() pour une compatibilité maximale avec les environnements CI/CD
const projectRoot = process.cwd();

// Obtenir la config Expo avec Sentry
const config = getSentryExpoConfig(projectRoot);

// Ajouter l'extension SQL
config.resolver.sourceExts.push('sql');

// Exclure les fichiers CSS de Metro (NativeWind v2 n'utilise pas PostCSS dans React Native)
// Les fichiers CSS ne doivent pas être traités par Metro
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'css');
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'css');

// Exclure PostCSS de Metro pour éviter les erreurs "Use process(css).then(cb)"
// NativeWind v2 utilise Babel pour transformer les classes Tailwind, mais PostCSS peut être chargé
// via des dépendances transitives. Le blockList empêche Metro de traiter PostCSS.
// Note: Le postcss.config.js est nécessaire pour que postcss-load-config fonctionne correctement
// et force PostCSS à utiliser des plugins synchrones uniquement.
config.resolver.blockList = config.resolver.blockList || [];
// Ne pas bloquer PostCSS complètement car NativeWind en a besoin en interne
// Le problème vient des plugins asynchrones, pas de PostCSS lui-même
// Le postcss.config.js force PostCSS à utiliser des plugins synchrones

// Mock des modules Node.js pour Storybook React Native
// Ces modules ne sont pas disponibles dans React Native mais sont requis par Storybook
const path = require('path');
const ttyMockPath = path.resolve(__dirname, 'metro/mocks/tty.js');
const osMockPath = path.resolve(__dirname, 'metro/mocks/os.js');
const pathMockPath = path.resolve(__dirname, 'metro/mocks/path.js');
const processMockPath = path.resolve(__dirname, 'metro/mocks/process.js');

// Configurer extraNodeModules pour mocker les modules Node.js
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  // Mock du module 'tty' utilisé par storybook
  tty: ttyMockPath,
  // Mock du module 'os' utilisé par storybook
  os: osMockPath,
  // Mock du module 'path' utilisé par storybook (pour éviter les erreurs indexOf)
  path: pathMockPath,
  // Mock du module 'process' utilisé par storybook (pour process.cwd() et autres)
  process: processMockPath,
};

// Storybook React Native - wrapper optionnel
// Si Storybook est activé dans App.tsx, il sera chargé automatiquement
try {
  const { withStorybook } = require('@storybook/react-native/metro');
  const storybookConfig = withStorybook(config, {
    projectRoot: process.cwd(),
  });

  // Réappliquer les mocks après withStorybook car il peut écraser la config
  storybookConfig.resolver.extraNodeModules = {
    ...storybookConfig.resolver.extraNodeModules,
    tty: ttyMockPath,
    os: osMockPath,
    path: pathMockPath,
    process: processMockPath,
  };

  module.exports = storybookConfig;
} catch (error) {
  // Si Storybook n'est pas disponible, utiliser la config standard
  module.exports = config;
}
