// Mock pour le module Node.js 'os' utilisé par Storybook
// Ce module n'est pas disponible dans React Native
// Les propriétés principales sont des fonctions qui retournent des valeurs
module.exports = {
  platform: function platform() {
    return 'react-native';
  },
  arch: function arch() {
    return 'unknown';
  },
  type: function type() {
    return 'React Native';
  },
  release: function release() {
    return '0.0.0';
  },
  hostname: function hostname() {
    return 'react-native';
  },
  homedir: function homedir() {
    return '/'; // Toujours retourner une chaîne valide
  },
  tmpdir: function tmpdir() {
    return '/tmp'; // Toujours retourner une chaîne valide
  },
  // S'assurer que userInfo().homedir retourne toujours une chaîne
  userInfo: function userInfo() {
    return {
      username: 'react-native',
      uid: 0,
      gid: 0,
      shell: null,
      homedir: '/', // Toujours retourner une chaîne valide
    };
  },
  endianness: function endianness() {
    return 'LE';
  },
  EOL: '\n',
  cpus: function cpus() {
    return [];
  },
  networkInterfaces: function networkInterfaces() {
    return {};
  },
  loadavg: function loadavg() {
    return [0, 0, 0];
  },
  totalmem: function totalmem() {
    return 0;
  },
  freemem: function freemem() {
    return 0;
  },
  uptime: function uptime() {
    return 0;
  },
};
