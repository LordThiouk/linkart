// Mock pour le module Node.js 'path' utilisé par Storybook
// Ce module est partiellement disponible dans React Native via polyfills
// Mais Storybook peut avoir besoin de fonctionnalités supplémentaires
const path = require('path');

// Assurer que toutes les fonctions retournent des valeurs valides (pas undefined)
module.exports = {
  ...path,
  // Surcharger resolve pour s'assurer qu'il ne retourne jamais undefined
  resolve: function resolve(...args) {
    const result = path.resolve(...args);
    if (!result || typeof result !== 'string') {
      return '/';
    }
    return result;
  },
  // Surcharger join pour s'assurer qu'il ne retourne jamais undefined
  join: function join(...args) {
    const result = path.join(...args);
    if (!result || typeof result !== 'string') {
      return '/';
    }
    return result;
  },
  // Surcharger dirname pour s'assurer qu'il ne retourne jamais undefined
  dirname: function dirname(p) {
    if (!p || typeof p !== 'string') {
      return '/';
    }
    const result = path.dirname(p);
    if (!result || typeof result !== 'string') {
      return '/';
    }
    return result;
  },
  // Surcharger basename pour s'assurer qu'il ne retourne jamais undefined
  basename: function basename(p, ext) {
    if (!p || typeof p !== 'string') {
      return 'file';
    }
    const result = path.basename(p, ext);
    if (!result || typeof result !== 'string') {
      return 'file';
    }
    return result;
  },
  // Surcharger extname pour s'assurer qu'il ne retourne jamais undefined
  extname: function extname(p) {
    if (!p || typeof p !== 'string') {
      return '';
    }
    const result = path.extname(p);
    if (!result || typeof result !== 'string') {
      return '';
    }
    return result;
  },
};
