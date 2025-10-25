module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nouvelle fonctionnalité
        'fix', // Correction de bug
        'docs', // Documentation
        'style', // Formatage, point-virgules manquants, etc.
        'refactor', // Refactoring du code
        'test', // Ajout de tests
        'chore', // Tâches de maintenance
        'ci', // Configuration CI/CD
        'build', // Build system
        'perf', // Amélioration de performance
        'revert', // Annulation d'un commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'auth', // Authentification
        'api', // API/Backend
        'ui', // Interface utilisateur
        'mobile', // Application mobile
        'db', // Base de données
        'docs', // Documentation
        'ci', // CI/CD
        'security', // Sécurité
        'payment', // Paiements
        'upload', // Upload de fichiers
        'wallet', // Portefeuille
        'boost', // Système de boost
        'rating', // Système de notation
        'admin', // Administration
        'supabase', // Configuration Supabase
        'r2', // Stockage R2
        'types', // Types TypeScript
      ],
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
