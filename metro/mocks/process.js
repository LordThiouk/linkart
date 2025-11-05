// Mock pour process.cwd() et autres fonctions process utilisées par Storybook
// Ces fonctions ne sont pas toujours disponibles dans React Native
module.exports = {
  ...global.process,
  // S'assurer que process.cwd() retourne toujours une chaîne valide
  cwd: function cwd() {
    try {
      const result = global.process?.cwd?.() || '/';
      if (!result || typeof result !== 'string') {
        return '/';
      }
      return result;
    } catch {
      return '/';
    }
  },
  // S'assurer que process.env existe toujours
  env: {
    ...(global.process?.env || {}),
    NODE_ENV: global.process?.env?.NODE_ENV || 'development',
  },
  // S'assurer que process.version existe toujours
  version: global.process?.version || 'v18.0.0',
  // S'assurer que process.platform existe toujours
  platform: global.process?.platform || 'react-native',
  // S'assurer que process.arch existe toujours
  arch: global.process?.arch || 'unknown',
  // S'assurer que process.nextTick existe toujours
  nextTick: global.process?.nextTick || (cb => setTimeout(cb, 0)),
};
