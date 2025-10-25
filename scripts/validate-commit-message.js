#!/usr/bin/env node

/**
 * Validation des messages de commit pour Linkart
 * Vérifie le format des messages selon les conventions
 */

const fs = require('fs');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function fixEncoding(text) {
  // Corriger les problèmes d'encodage courants
  return text
    .replace(/Ã©/g, 'é')
    .replace(/Ã¨/g, 'è')
    .replace(/Ã /g, 'à')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã´/g, 'ô')
    .replace(/Ã®/g, 'î')
    .replace(/Ã¯/g, 'ï')
    .replace(/Ã¹/g, 'ù')
    .replace(/Ã¢/g, 'â')
    .replace(/Ã«/g, 'ë')
    .replace(/Ã¯/g, 'ï')
    .replace(/Ã¶/g, 'ö')
    .replace(/Ã¼/g, 'ü')
    .replace(/Ã¤/g, 'ä')
    .replace(/Ã¥/g, 'å')
    .replace(/Ã¸/g, 'ø')
    .replace(/Ã¦/g, 'æ');
}

// Types de commit autorisés selon les conventions
const ALLOWED_TYPES = [
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
];

// Scopes autorisés pour Linkart
const ALLOWED_SCOPES = [
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
];

function validateCommitMessage(message) {
  // Corriger l'encodage du message
  const fixedMessage = fixEncoding(message);
  const lines = fixedMessage.split('\n');
  const firstLine = lines[0];

  // Format: type(scope): description
  const commitRegex = /^(\w+)(?:\(([^)]+)\))?: (.+)$/;
  const match = firstLine.match(commitRegex);

  if (!match) {
    return {
      valid: false,
      error: 'Format invalide. Utilisez: type(scope): description',
    };
  }

  const [, type, scope, description] = match;

  // Vérifier le type
  if (!ALLOWED_TYPES.includes(type)) {
    return {
      valid: false,
      error: `Type invalide: ${type}. Types autorisés: ${ALLOWED_TYPES.join(', ')}`,
    };
  }

  // Vérifier le scope (optionnel mais si présent, doit être valide)
  if (scope && !ALLOWED_SCOPES.includes(scope)) {
    return {
      valid: false,
      error: `Scope invalide: ${scope}. Scopes autorisés: ${ALLOWED_SCOPES.join(', ')}`,
    };
  }

  // Vérifier la description
  if (description.length < 10) {
    return {
      valid: false,
      error: 'Description trop courte (minimum 10 caractères)',
    };
  }

  if (description.length > 100) {
    return {
      valid: false,
      error: 'Description trop longue (maximum 100 caractères)',
    };
  }

  // Vérifier que la description commence par une minuscule
  if (description[0] !== description[0].toLowerCase()) {
    return {
      valid: false,
      error: 'Description doit commencer par une minuscule',
    };
  }

  // Vérifier qu'il n'y a pas de point à la fin
  if (description.endsWith('.')) {
    return {
      valid: false,
      error: 'Description ne doit pas se terminer par un point',
    };
  }

  // Vérifier le corps du message (optionnel)
  if (lines.length > 1) {
    const body = lines.slice(1).join('\n').trim();
    if (body && body.length > 0) {
      // Le corps doit être séparé par une ligne vide
      if (lines[1] !== '') {
        return {
          valid: false,
          error: 'Corps du message doit être séparé par une ligne vide',
        };
      }
    }
  }

  return { valid: true };
}

function main() {
  const commitMessageFile = process.argv[2];

  if (!commitMessageFile) {
    log('❌ Fichier de message de commit manquant', 'red');
    process.exit(1);
  }

  if (!fs.existsSync(commitMessageFile)) {
    log('❌ Fichier de message de commit introuvable', 'red');
    process.exit(1);
  }

  // Lire le message avec gestion d'encodage
  let message;
  try {
    message = fs.readFileSync(commitMessageFile, 'utf8').trim();
  } catch (e) {
    // Fallback sur latin1 si UTF-8 échoue
    message = fs.readFileSync(commitMessageFile, 'latin1').trim();
  }

  if (!message) {
    log('❌ Message de commit vide', 'red');
    process.exit(1);
  }

  // Corriger l'encodage du message
  const fixedMessage = fixEncoding(message);

  log('🔍 Validation du message de commit...', 'blue');
  log(`Message: ${fixedMessage}`, 'blue');

  const result = validateCommitMessage(fixedMessage);

  if (result.valid) {
    log('✅ Message de commit valide', 'green');
    process.exit(0);
  } else {
    log('❌ Message de commit invalide', 'red');
    log(`Erreur: ${result.error}`, 'red');
    log('\nExemples de messages valides:', 'yellow');
    log('  feat(auth): ajouter authentification OTP', 'yellow');
    log('  fix(payment): corriger calcul commission', 'yellow');
    log('  docs(api): documenter endpoints upload', 'yellow');
    log('  refactor(ui): simplifier composant ProductCard', 'yellow');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateCommitMessage };
