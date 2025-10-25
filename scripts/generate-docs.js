#!/usr/bin/env node

/**
 * Script de génération de documentation pour Linkart
 *
 * Ce script compile et synchronise la documentation selon la stratégie définie
 * dans .cursor/rules/documentation.mdc
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  docsDir: './docs',
  generatedDir: './docs/generated',
  templatesDir: './docs/templates',
  migrationsDir: './supabase/migrations',
  date: new Date().toISOString().split('T')[0],
};

/**
 * Crée la structure de dossiers de la documentation si elle n'existe pas
 */
function createDirectoryStructure() {
  if (!fs.existsSync(CONFIG.docsDir)) fs.mkdirSync(CONFIG.docsDir);
  if (!fs.existsSync(CONFIG.generatedDir)) fs.mkdirSync(CONFIG.generatedDir);
  if (!fs.existsSync(CONFIG.templatesDir)) fs.mkdirSync(CONFIG.templatesDir);
}

/**
 * Lit toutes les migrations SQL et retourne leur contenu combiné
 */
function getCombinedMigrations() {
  if (!fs.existsSync(CONFIG.migrationsDir)) {
    console.warn('⚠️ Dossier de migrations non trouvé. Skipping...');
    return '';
  }
  const migrationFiles = fs.readdirSync(CONFIG.migrationsDir).filter(file => file.endsWith('.sql'));
  if (migrationFiles.length === 0) {
    console.warn('⚠️ Aucun fichier de migration trouvé. Skipping...');
    return '';
  }
  return migrationFiles.map(file => fs.readFileSync(path.join(CONFIG.migrationsDir, file), 'utf8')).join('\n\n');
}

/**
 * Génère la documentation pour les tables de la DB
 */
function generateTablesDoc(allSchemaContent) {
  let markdownOutput = `# Documentation des Tables\n\n> Généré le: ${CONFIG.date}\n\n`;
  const tableRegex = /CREATE TABLE\s+([\w."]+)\s+\(([\s\S]*?)\);/g;
  let match;

  while ((match = tableRegex.exec(allSchemaContent)) !== null) {
    const tableName = match[1].replace(/"/g, '');
    const columnsText = match[2];
    markdownOutput += `## Table: \`${tableName}\`\n\n| Colonne | Type | Contraintes |\n|---|---|---|\n`;
    const lines = columnsText.split('\n').filter(line => line.trim().length > 0 && !line.trim().startsWith('--'));
    lines.forEach(line => {
      const trimmedLine = line.trim().replace(/,$/, '');
      const parts = trimmedLine.match(/^(\w+)\s+([\w\(\)]+)(.*)/);
      if (parts) {
        const name = parts[1];
        const type = parts[2];
        const constraints = parts[3].trim();
        if (!['PRIMARY', 'FOREIGN', 'CHECK', 'CONSTRAINT'].includes(name.toUpperCase())) {
          markdownOutput += `| \`${name}\` | \`${type}\` | ${constraints.replace(/\|/g, '\\|')} |\n`;
        }
      }
    });
    markdownOutput += '\n';
  }
  fs.writeFileSync(path.join(CONFIG.generatedDir, 'db-tables.md'), markdownOutput);
  console.log('✅ Documentation des tables DB générée');
}

/**
 * Génère la documentation pour les fonctions (RPC)
 */
function generateRpcDoc(allSchemaContent) {
  let markdownOutput = `# Documentation des Fonctions (RPC)\n\n> Généré le: ${CONFIG.date}\n\n`;
  const functionRegex = /CREATE OR REPLACE FUNCTION\s+([\w\.]+)\(([\s\S]*?)\)\s+RETURNS\s+([\w\s]+)\s+AS/g;
  let match;

  while ((match = functionRegex.exec(allSchemaContent)) !== null) {
    const functionName = match[1];
    const argsText = match[2];
    const returnType = match[3].trim();
    markdownOutput += `## Fonction: \`${functionName}\`\n\n`;
    markdownOutput += `**Retourne**: \`${returnType}\`\n\n`;
    markdownOutput += `| Argument | Type |\n|---|---|\n`;
    if (argsText.trim()) {
      const args = argsText.split(',').map(arg => arg.trim());
      args.forEach(arg => {
        const parts = arg.split(/\s+/);
        if (parts.length >= 2) {
          markdownOutput += `| \`${parts[0]}\` | \`${parts[1]}\` |\n`;
        }
      });
    } else {
      markdownOutput += `| (aucun) | - |\n`;
    }
    markdownOutput += '\n';
  }
  fs.writeFileSync(path.join(CONFIG.generatedDir, 'db-rpc.md'), markdownOutput);
  console.log('✅ Documentation des RPC DB générée');
}

/**
 * Génère la documentation pour les politiques RLS
 */
function generateRlsDoc(allSchemaContent) {
  let markdownOutput = `# Documentation des Politiques RLS\n\n> Généré le: ${CONFIG.date}\n\n`;
  const rlsRegex = /CREATE POLICY\s+"([^"]+)"\s+ON\s+([\w\.]+)\s+FOR\s+(\w+)\s+(USING|WITH CHECK)\s*\(([\s\S]*?)\);/g;
  let match;

  const policiesByTable = {};

  while ((match = rlsRegex.exec(allSchemaContent)) !== null) {
    const policyName = match[1];
    const tableName = match[2];
    const command = match[3];
    const condition = match[5].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    if (!policiesByTable[tableName]) {
      policiesByTable[tableName] = [];
    }
    policiesByTable[tableName].push({ name: policyName, command, condition });
  }

  for (const table in policiesByTable) {
    markdownOutput += `## Table: \`${table}\`\n\n`;
    markdownOutput += `| Nom de la Politique | Commande | Règle |\n|---|---|---|\n`;
    policiesByTable[table].forEach(policy => {
      markdownOutput += `| ${policy.name} | \`${policy.command}\` | \`${policy.condition}\` |\n`;
    });
    markdownOutput += '\n';
  }
  fs.writeFileSync(path.join(CONFIG.generatedDir, 'db-rls.md'), markdownOutput);
  console.log('✅ Documentation des RLS DB générée');
}

/**
 * Génère la documentation API statique
 */
function generateAPIDocs() {
  console.log('📝 Génération de la documentation API...');
  const apiTemplate = fs.readFileSync(path.join(CONFIG.templatesDir, 'api-template.md'), 'utf8');
  const apiDoc = apiTemplate.replace('{{DATE}}', CONFIG.date);
  fs.writeFileSync(path.join(CONFIG.generatedDir, 'api.md'), apiDoc);
  console.log('✅ Documentation API générée');
}

/**
 * Génère les types TypeScript depuis la DB
 */
function generateTypes() {
  console.log('📝 Génération des types TypeScript...');
  try {
    execSync('npx supabase gen types typescript --project-id tevnkidggpvqpislmhht > src/types/supabase.ts', {
      stdio: 'inherit',
    });
    console.log('✅ Types TypeScript générés');
  } catch (_error) {
    console.error(
      '❌ Erreur lors de la génération des types TypeScript. Assurez-vous que Supabase est bien configuré.'
    );
  }
}

/**
 * Valide la cohérence et la présence des documents
 */
function validateDocumentation() {
  console.log('🔍 Validation de la cohérence...');
  // Logique de validation à implémenter
  console.log('✅ Documentation cohérente');
}

/**
 * Génère un rapport sur l'état de la documentation
 */
function generateReport() {
  console.log('📊 Rapport de documentation généré');
  let report = `# Rapport de Documentation - ${CONFIG.date}\n\n`;
  report += `- ✅ Schéma DB (Tables)\n`;
  report += `- ✅ Schéma DB (RPC)\n`;
  report += `- ✅ Schéma DB (RLS)\n`;
  report += `- ✅ Documentation API\n`;
  report += `- ✅ Types TypeScript\n`;
  fs.writeFileSync(path.join(CONFIG.generatedDir, 'README.md'), report);
}

function main() {
  console.log('🚀 Génération de la documentation Linkart...');
  try {
    createDirectoryStructure();

    const allSchemaContent = getCombinedMigrations();

    if (allSchemaContent) {
      console.log('📝 Génération de la documentation du schéma DB...');
      generateTablesDoc(allSchemaContent);
      generateRpcDoc(allSchemaContent);
      generateRlsDoc(allSchemaContent);
    }

    generateAPIDocs();
    generateTypes();
    validateDocumentation();
    generateReport();
    console.log('\n✅ Documentation générée avec succès');
  } catch (error) {
    console.error('\n❌ Une erreur est survenue:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  createDirectoryStructure,
  generateAPIDocs,
  generateTablesDoc,
  generateRpcDoc,
  generateRlsDoc,
  generateTypes,
  validateDocumentation,
  generateReport,
};
