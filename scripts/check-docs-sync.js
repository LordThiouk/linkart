#!/usr/bin/env node

/**
 * Script de vérification de la synchronisation de la documentation
 * Vérifie que la documentation générée est à jour avec le code source
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDocsSync() {
  try {
    log('🔍 Vérification de la synchronisation de la documentation...', 'blue');

    // Générer la documentation
    log('📝 Génération de la documentation...', 'blue');
    execSync('npm run docs:generate', { stdio: 'inherit' });

    // Vérifier s'il y a des changements dans docs/generated/
    const result = execSync('git status --porcelain docs/generated/', { encoding: 'utf8' });

    if (result.trim()) {
      log('❌ Documentation non synchronisée', 'red');
      log('Fichiers modifiés:', 'yellow');
      console.log(result);
      log('\n💡 Solution: Exécutez "npm run docs:generate" et commitez les changements', 'cyan');
      return false;
    } else {
      log('✅ Documentation synchronisée', 'green');
      return true;
    }
  } catch (error) {
    log('❌ Erreur lors de la vérification de la documentation', 'red');
    log(`Détails: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🚀 Vérification de la synchronisation de la documentation Linkart...', 'magenta');

  const isSync = checkDocsSync();

  if (isSync) {
    log('\n🎉 Documentation à jour !', 'green');
    process.exit(0);
  } else {
    log('\n💥 Documentation non synchronisée', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkDocsSync };
