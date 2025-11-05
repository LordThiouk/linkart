// Mock pour le module Node.js 'tty' utilisé par Storybook
// Ce module n'est pas disponible dans React Native
module.exports = {
  isatty: () => false,
  ReadStream: function () {},
  WriteStream: function () {},
};
