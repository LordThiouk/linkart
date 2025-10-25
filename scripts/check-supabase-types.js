#!/usr/bin/env node

/**
 * Script pour vérifier et mettre à jour les types Supabase
 * Vérifie si les types sont à jour avec la base de données
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

function checkSupabaseTypes() {
  try {
    log('\n🔍 Vérification des types Supabase...', 'blue');

    const typesFile = 'src/types/supabase.ts';

    // Vérifier que le fichier existe
    if (!fs.existsSync(typesFile)) {
      log('❌ Fichier types/supabase.ts manquant', 'red');
      log('Génération des types...', 'blue');
      execSync('npm run supabase:types', { stdio: 'inherit' });
      log('✅ Types générés avec succès', 'green');
      return true;
    }

    // Vérifier que le fichier n'est pas vide et contient des types valides
    const content = fs.readFileSync(typesFile, 'utf8');
    const isEmpty = content.trim().length === 0;
    const isInvalid = !content.includes('export type Database') && !content.includes('export interface Database');

    if (isEmpty || isInvalid) {
      const reason = isEmpty ? 'vide' : 'invalide';
      log(`⚠️  Fichier types/supabase.ts ${reason}, régénération...`, 'yellow');
      execSync('npm run supabase:types', { stdio: 'inherit' });

      // Vérifier après régénération
      const newContent = fs.readFileSync(typesFile, 'utf8');
      if (
        newContent.trim().length > 0 &&
        (newContent.includes('export type Database') || newContent.includes('export interface Database'))
      ) {
        log('✅ Types générés avec succès', 'green');
        return true;
      } else {
        log('❌ Impossible de générer des types valides', 'red');
        return false;
      }
    }

    log('✅ Types Supabase valides', 'green');

    // Vérifier si les types sont à jour (optionnel - peut être coûteux)
    try {
      log('🔄 Vérification de la synchronisation des types...', 'blue');

      // Sauvegarder le fichier actuel
      const currentContent = fs.readFileSync(typesFile, 'utf8');

      // Générer de nouveaux types temporairement
      const tempFile = 'src/types/supabase.temp.ts';
      // Utiliser directement la commande supabase sans passer par npm
      execSync(`npx supabase gen types typescript --project-id tevnkidggpvqpislmhht > ${tempFile}`, { stdio: 'pipe' });

      if (fs.existsSync(tempFile)) {
        const newContent = fs.readFileSync(tempFile, 'utf8');

        // Comparer les contenus
        if (currentContent !== newContent) {
          log('⚠️  Types Supabase non synchronisés', 'yellow');
          log('Mise à jour des types...', 'blue');
          fs.copyFileSync(tempFile, typesFile);
          log('✅ Types mis à jour avec succès', 'green');
        } else {
          log('✅ Types Supabase synchronisés', 'green');
        }

        // Nettoyer le fichier temporaire
        fs.unlinkSync(tempFile);
      }
    } catch (_error) {
      log('⚠️  Impossible de vérifier la synchronisation (normal en local)', 'yellow');
      log('✅ Types Supabase OK', 'green');
    }

    return true;
  } catch (_error) {
    log('❌ Erreur lors de la vérification des types Supabase', 'red');
    log(`Détails: ${_error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🚀 Vérification des types Supabase...', 'blue');

  if (checkSupabaseTypes()) {
    log('\n🎉 Vérification des types Supabase terminée !', 'green');
    process.exit(0);
  } else {
    log('\n💥 Erreur lors de la vérification des types', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkSupabaseTypes };
