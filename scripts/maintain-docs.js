#!/usr/bin/env node

/**
 * Script de maintenance de la documentation
 * Vérifie et maintient la cohérence de la documentation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function checkDocumentationStructure() {
  log('🔍 Vérification de la structure de documentation...', 'blue');
  
  const requiredDirs = [
    'docs/internal',
    'docs/product', 
    'docs/api',
    'docs/public',
    'docs/generated'
  ];
  
  const requiredFiles = [
    'docs/README.md',
    'docs/internal/README.md',
    'docs/product/README.md',
    'docs/api/README.md',
    'docs/public/README.md'
  ];
  
  let allGood = true;
  
  // Vérifier les dossiers
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      log(`❌ Dossier manquant: ${dir}`, 'red');
      allGood = false;
    } else {
      log(`✅ ${dir}`, 'green');
    }
  }
  
  // Vérifier les fichiers
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      log(`❌ Fichier manquant: ${file}`, 'red');
      allGood = false;
    } else {
      log(`✅ ${file}`, 'green');
    }
  }
  
  return allGood;
}

function generateDocumentation() {
  log('📝 Génération de la documentation...', 'blue');
  
  try {
    execSync('npm run docs:generate', { stdio: 'inherit' });
    log('✅ Documentation générée', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la génération', 'red');
    log(`Détails: ${error.message}`, 'red');
    return false;
  }
}

function validateDocumentation() {
  log('🔍 Validation de la documentation...', 'blue');
  
  try {
    execSync('npm run docs:validate', { stdio: 'inherit' });
    log('✅ Documentation validée', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la validation', 'red');
    return false;
  }
}

function checkDocumentationSync() {
  log('🔄 Vérification de la synchronisation...', 'blue');
  
  try {
    execSync('npm run docs:check', { stdio: 'inherit' });
    log('✅ Documentation synchronisée', 'green');
    return true;
  } catch (error) {
    log('❌ Documentation non synchronisée', 'red');
    return false;
  }
}

function updateDocumentation() {
  log('🔄 Mise à jour de la documentation...', 'blue');
  
  try {
    execSync('npm run docs:sync', { stdio: 'inherit' });
    log('✅ Documentation mise à jour', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la mise à jour', 'red');
    return false;
  }
}

function main() {
  log('🚀 Maintenance de la documentation Linkart...', 'magenta');
  
  const checks = [
    { name: 'Structure', fn: checkDocumentationStructure },
    { name: 'Génération', fn: generateDocumentation },
    { name: 'Validation', fn: validateDocumentation },
    { name: 'Synchronisation', fn: checkDocumentationSync }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    log(`\n🔍 ${check.name}...`, 'blue');
    if (!check.fn()) {
      allPassed = false;
      log(`❌ ${check.name} échouée`, 'red');
    } else {
      log(`✅ ${check.name} OK`, 'green');
    }
  }
  
  if (!allPassed) {
    log('\n🔄 Tentative de mise à jour automatique...', 'yellow');
    if (updateDocumentation()) {
      log('✅ Documentation mise à jour automatiquement', 'green');
    } else {
      log('❌ Impossible de mettre à jour automatiquement', 'red');
      log('💡 Exécutez manuellement: npm run docs:sync', 'cyan');
    }
  } else {
    log('\n🎉 Documentation parfaitement synchronisée !', 'green');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkDocumentationStructure,
  generateDocumentation,
  validateDocumentation,
  checkDocumentationSync,
  updateDocumentation
};
