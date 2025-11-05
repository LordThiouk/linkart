// PostCSS config minimal pour NativeWind v2
// NativeWind v2 utilise PostCSS en interne via son plugin Babel
// Cette config force PostCSS à fonctionner de manière synchrone pour Metro
//
// IMPORTANT: Utiliser uniquement des plugins synchrones (pas de promesses)

module.exports = {
  plugins: [
    // Utiliser require() directement pour éviter les plugins asynchrones
    require('tailwindcss'),
    // Pas d'autres plugins - éviter les plugins asynchrones
  ],
};
