#!/usr/bin/env node

/**
 * Pre-commit validation script for Linkart
 * Vérifie la cohérence du code avant commit
 */

const { execSync } = require('child_process');
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

function execCommand(command, description) {
  try {
    log(`\n🔍 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} - OK`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    return false;
  }
}

function execCommandOptional(command, description) {
  try {
    log(`\n🔍 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} - OK`, 'green');
    return true;
  } catch (error) {
    log(`⚠️  ${description} - SKIPPED (optionnel)`, 'yellow');
    return true; // Ne bloque pas le commit
  }
}

function execCommandWithIgnore(command, description) {
  try {
    log(`\n🔍 ${description}...`, 'blue');
    // Pour ESLint et Prettier, utiliser les fichiers spécifiques au lieu des patterns
    if (command.includes('lint')) {
      execSync('npx eslint src/ --ext .js,.jsx,.ts,.tsx --ignore-pattern "src/types/supabase.ts"', {
        stdio: 'inherit',
      });
    } else if (command.includes('format:check')) {
      execSync(
        'npx prettier --check src/ scripts/ docs/ --ignore-path .prettierignore --ignore-pattern "src/types/supabase.ts"',
        { stdio: 'inherit' }
      );
    } else {
      execSync(command, { stdio: 'inherit' });
    }
    log(`✅ ${description} - OK`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    return false;
  }
}

function checkSupabaseTypes() {
  try {
    log('\n🔍 Vérification des types Supabase...', 'blue');

    // Utiliser le script dédié pour vérifier et générer les types
    execSync('node scripts/check-supabase-types.js', { stdio: 'inherit' });
    log('✅ Types Supabase OK', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la vérification des types Supabase', 'red');
    return false;
  }
}

function checkDocumentationStructure() {
  log('\n🔍 Vérification de la structure de documentation...', 'blue');

  const requiredDirs = ['docs/internal', 'docs/product', 'docs/api', 'docs/public', 'docs/generated'];

  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      log(`❌ Dossier manquant: ${dir}`, 'red');
      return false;
    }
  }

  log('✅ Structure documentation OK', 'green');
  return true;
}

function checkMigrationFiles() {
  log('\n🔍 Vérification des migrations...', 'blue');

  const migrationsDir = 'supabase/migrations';

  if (!fs.existsSync(migrationsDir)) {
    log('❌ Dossier migrations manquant', 'red');
    return false;
  }

  const migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

  if (migrationFiles.length === 0) {
    log('⚠️  Aucune migration trouvée', 'yellow');
  } else {
    log(`✅ ${migrationFiles.length} migration(s) trouvée(s)`, 'green');
  }

  return true;
}

function checkSecrets() {
  log('\n🔍 Vérification des secrets...', 'blue');
  const forbidden = ['SUPABASE_SERVICE_ROLE_KEY', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'PAYMENT_WAVE_SECRET'];
  const pathsToScan = ['src', 'supabase'].join(' ');
  let found = false;

  try {
    const result = execSync(`grep -rE "${forbidden.join('|')}" ${pathsToScan}`).toString();
    if (result) {
      log('❌ Secret(s) détecté(s) en clair dans le code:', 'red');
      log(result, 'red');
      found = true;
    }
  } catch (error) {
    // Grep renvoie un code d'erreur si rien n'est trouvé, c'est le comportement attendu
  }

  if (found) {
    return false;
  }

  log('✅ Aucun secret détecté', 'green');
  return true;
}

function main() {
  log('🚀 Démarrage des vérifications pre-commit...', 'blue');

  const checks = [
    () => execCommandWithIgnore('npm run lint', 'ESLint', ['.history/**/*']),
    () => execCommandWithIgnore('npm run format:check', 'Prettier', ['.history/**/*']),
    () => execCommand('npx tsc --noEmit', 'TypeScript'),
    () => execCommandOptional('npm run test:unit', 'Tests Unitaires'),
    () => checkSupabaseTypes(),
    () => checkDocumentationStructure(),
    () => checkMigrationFiles(),
    () => checkSecrets(),
    () => execCommand('npm run docs:validate', 'Documentation Markdown'),
  ];

  let allPassed = true;

  for (const check of checks) {
    if (!check()) {
      allPassed = false;
    }
  }

  if (allPassed) {
    log('\n🎉 Toutes les vérifications sont passées !', 'green');
    process.exit(0);
  } else {
    log('\n💥 Certaines vérifications ont échoué', 'red');
    log('Corrigez les erreurs avant de commiter', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
