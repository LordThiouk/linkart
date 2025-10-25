#!/usr/bin/env node

/**
 * Script de vérifications CI/CD
 * Vérifie la cohérence entre le code et les types/migrations Supabase
 */

const { execSync } = require('child_process');
const fs = require('fs');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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

function checkSupabaseTypes() {
  try {
    log('\n🔍 Vérification des types Supabase...', 'blue');

    // Vérifier que le fichier existe
    const typesFile = 'src/types/supabase.ts';
    if (!fs.existsSync(typesFile)) {
      log('❌ Fichier types/supabase.ts manquant', 'red');
      return false;
    }

    // Vérifier que le fichier n'est pas vide
    const content = fs.readFileSync(typesFile, 'utf8');
    if (content.trim().length === 0) {
      log('❌ Fichier types/supabase.ts vide', 'red');
      return false;
    }

    // Vérifier que le fichier contient des types valides
    if (!content.includes('export type') && !content.includes('export interface')) {
      log('❌ Fichier types/supabase.ts ne contient pas de types valides', 'red');
      return false;
    }

    log('✅ Types Supabase OK', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la vérification des types Supabase', 'red');
    return false;
  }
}

function checkMigrationFiles() {
  try {
    log('\n🔍 Vérification des migrations...', 'blue');

    const migrationsDir = 'supabase/migrations';
    if (!fs.existsSync(migrationsDir)) {
      log('❌ Dossier supabase/migrations manquant', 'red');
      return false;
    }

    const migrationFiles = fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql'));

    if (migrationFiles.length === 0) {
      log('❌ Aucune migration trouvée', 'red');
      return false;
    }

    log(`✅ ${migrationFiles.length} migration(s) trouvée(s)`, 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la vérification des migrations', 'red');
    return false;
  }
}

function checkDocumentationStructure() {
  try {
    log('\n🔍 Vérification de la structure de documentation...', 'blue');

    const requiredDirs = ['docs/internal', 'docs/product', 'docs/api', 'docs/public', 'docs/generated'];

    for (const dir of requiredDirs) {
      if (!fs.existsSync(dir)) {
        log(`❌ Dossier ${dir} manquant`, 'red');
        return false;
      }
    }

    log('✅ Structure documentation OK', 'green');
    return true;
  } catch (error) {
    log('❌ Erreur lors de la vérification de la documentation', 'red');
    return false;
  }
}

function main() {
  log('🚀 Démarrage des vérifications CI/CD...', 'blue');

  const checks = [
    () => execCommand('npm run lint', 'ESLint'),
    () => execCommand('npm run format:check', 'Prettier'),
    () => execCommand('npm run type-check', 'TypeScript'),
    () => checkSupabaseTypes(),
    () => checkMigrationFiles(),
    () => checkDocumentationStructure(),
    () => execCommand('npm run docs:validate', 'Documentation Markdown'),
  ];

  let allPassed = true;

  for (const check of checks) {
    if (!check()) {
      allPassed = false;
    }
  }

  if (allPassed) {
    log('\n🎉 Toutes les vérifications CI/CD sont passées !', 'green');
    process.exit(0);
  } else {
    log('\n💥 Certaines vérifications CI/CD ont échoué', 'red');
    log('Corrigez les erreurs avant de merger', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
