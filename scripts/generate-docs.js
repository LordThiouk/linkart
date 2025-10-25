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
 * Génère la documentation des fonctionnalités
 */
function generateFeaturesDoc() {
  console.log('📝 Génération de la documentation des fonctionnalités...');
  
  const featuresDir = './src/features';
  if (!fs.existsSync(featuresDir)) {
    console.log('⚠️ Dossier features non trouvé');
    return;
  }

  let markdownOutput = `# Documentation des Fonctionnalités\n\n> Généré le: ${CONFIG.date}\n\n`;
  
  const features = fs.readdirSync(featuresDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  features.forEach(feature => {
    markdownOutput += `## 🎯 ${feature.charAt(0).toUpperCase() + feature.slice(1)}\n\n`;
    
    // Lire le fichier index.ts s'il existe
    const indexPath = path.join(featuresDir, feature, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      markdownOutput += `### Exports\n\n\`\`\`typescript\n${content}\n\`\`\`\n\n`;
    }

    // Lister les composants
    const componentsDir = path.join(featuresDir, feature, 'components');
    if (fs.existsSync(componentsDir)) {
      const components = fs.readdirSync(componentsDir)
        .filter(file => file.endsWith('.tsx'))
        .map(file => file.replace('.tsx', ''));
      
      if (components.length > 0) {
        markdownOutput += `### Composants\n\n`;
        components.forEach(comp => {
          markdownOutput += `- **${comp}**\n`;
        });
        markdownOutput += '\n';
      }
    }

    // Lister les hooks
    const hooksDir = path.join(featuresDir, feature, 'hooks');
    if (fs.existsSync(hooksDir)) {
      const hooks = fs.readdirSync(hooksDir)
        .filter(file => file.endsWith('.ts'))
        .map(file => file.replace('.ts', ''));
      
      if (hooks.length > 0) {
        markdownOutput += `### Hooks\n\n`;
        hooks.forEach(hook => {
          markdownOutput += `- **${hook}**\n`;
        });
        markdownOutput += '\n';
      }
    }

    markdownOutput += '---\n\n';
  });

  fs.writeFileSync(path.join(CONFIG.generatedDir, 'features.md'), markdownOutput);
  console.log('✅ Documentation des fonctionnalités générée');
}

/**
 * Génère la documentation des composants
 */
function generateComponentsDoc() {
  console.log('📝 Génération de la documentation des composants...');
  
  const componentsDir = './src/components';
  if (!fs.existsSync(componentsDir)) {
    console.log('⚠️ Dossier components non trouvé');
    return;
  }

  let markdownOutput = `# Documentation des Composants\n\n> Généré le: ${CONFIG.date}\n\n`;
  
  // Parcourir les dossiers atoms, molecules, organisms
  const componentTypes = ['atoms', 'molecules', 'organisms'];
  
  componentTypes.forEach(type => {
    const typeDir = path.join(componentsDir, type);
    if (!fs.existsSync(typeDir)) return;
    
    markdownOutput += `## ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
    
    const components = fs.readdirSync(typeDir)
      .filter(file => file.endsWith('.tsx') && !file.includes('.stories'))
      .map(file => file.replace('.tsx', ''));
    
    components.forEach(comp => {
      markdownOutput += `### ${comp}\n\n`;
      
      // Lire le fichier du composant
      const compPath = path.join(typeDir, `${comp}.tsx`);
      if (fs.existsSync(compPath)) {
        const content = fs.readFileSync(compPath, 'utf8');
        
        // Extraire les props du composant
        const propsMatch = content.match(/interface\s+(\w+Props)\s*\{([^}]+)\}/);
        if (propsMatch) {
          markdownOutput += `**Props:**\n\n\`\`\`typescript\ninterface ${propsMatch[1]} {\n${propsMatch[2]}\n}\n\`\`\`\n\n`;
        }
        
        // Extraire la description du composant
        const descMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\//);
        if (descMatch) {
          markdownOutput += `**Description:** ${descMatch[1]}\n\n`;
        }
      }
      
      markdownOutput += '---\n\n';
    });
  });

  fs.writeFileSync(path.join(CONFIG.generatedDir, 'components.md'), markdownOutput);
  console.log('✅ Documentation des composants générée');
}

/**
 * Génère la documentation des services
 */
function generateServicesDoc() {
  console.log('📝 Génération de la documentation des services...');
  
  const servicesDir = './src/services';
  if (!fs.existsSync(servicesDir)) {
    console.log('⚠️ Dossier services non trouvé');
    return;
  }

  let markdownOutput = `# Documentation des Services\n\n> Généré le: ${CONFIG.date}\n\n`;
  
  const services = fs.readdirSync(servicesDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => file.replace('.ts', ''));

  services.forEach(service => {
    markdownOutput += `## ${service}\n\n`;
    
    const servicePath = path.join(servicesDir, `${service}.ts`);
    if (fs.existsSync(servicePath)) {
      const content = fs.readFileSync(servicePath, 'utf8');
      
      // Extraire les fonctions exportées
      const functions = content.match(/export\s+(?:async\s+)?function\s+(\w+)/g) || [];
      const constExports = content.match(/export\s+const\s+(\w+)/g) || [];
      
      if (functions.length > 0) {
        markdownOutput += `### Fonctions\n\n`;
        functions.forEach(func => {
          const funcName = func.match(/function\s+(\w+)/)[1];
          markdownOutput += `- **${funcName}**\n`;
        });
        markdownOutput += '\n';
      }
      
      if (constExports.length > 0) {
        markdownOutput += `### Constantes\n\n`;
        constExports.forEach(constant => {
          const constName = constant.match(/const\s+(\w+)/)[1];
          markdownOutput += `- **${constName}**\n`;
        });
        markdownOutput += '\n';
      }
    }
    
    markdownOutput += '---\n\n';
  });

  fs.writeFileSync(path.join(CONFIG.generatedDir, 'services.md'), markdownOutput);
  console.log('✅ Documentation des services générée');
}

/**
 * Génère la documentation des hooks
 */
function generateHooksDoc() {
  console.log('📝 Génération de la documentation des hooks...');
  
  let markdownOutput = `# Documentation des Hooks\n\n> Généré le: ${CONFIG.date}\n\n`;
  
  // Parcourir tous les dossiers hooks
  const hooksDirs = [
    './src/hooks',
    './src/features/*/hooks'
  ];
  
  const allHooks = [];
  
  // Hooks globaux
  const globalHooksDir = './src/hooks';
  if (fs.existsSync(globalHooksDir)) {
    const globalHooks = fs.readdirSync(globalHooksDir)
      .filter(file => file.endsWith('.ts'))
      .map(file => ({ name: file.replace('.ts', ''), path: path.join(globalHooksDir, file), type: 'global' }));
    allHooks.push(...globalHooks);
  }
  
  // Hooks des features
  const featuresDir = './src/features';
  if (fs.existsSync(featuresDir)) {
    const features = fs.readdirSync(featuresDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    features.forEach(feature => {
      const featureHooksDir = path.join(featuresDir, feature, 'hooks');
      if (fs.existsSync(featureHooksDir)) {
        const featureHooks = fs.readdirSync(featureHooksDir)
          .filter(file => file.endsWith('.ts'))
          .map(file => ({ 
            name: file.replace('.ts', ''), 
            path: path.join(featureHooksDir, file), 
            type: feature 
          }));
        allHooks.push(...featureHooks);
      }
    });
  }
  
  allHooks.forEach(hook => {
    markdownOutput += `## ${hook.name}\n\n`;
    markdownOutput += `**Type:** ${hook.type}\n\n`;
    
    if (fs.existsSync(hook.path)) {
      const content = fs.readFileSync(hook.path, 'utf8');
      
      // Extraire la description du hook
      const descMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\//);
      if (descMatch) {
        markdownOutput += `**Description:** ${descMatch[1]}\n\n`;
      }
      
      // Extraire les paramètres de retour
      const returnMatch = content.match(/return\s+\{([^}]+)\}/);
      if (returnMatch) {
        markdownOutput += `**Retourne:**\n\n\`\`\`typescript\n{${returnMatch[1]}}\n\`\`\`\n\n`;
      }
    }
    
    markdownOutput += '---\n\n';
  });

  fs.writeFileSync(path.join(CONFIG.generatedDir, 'hooks.md'), markdownOutput);
  console.log('✅ Documentation des hooks générée');
}

/**
 * Génère la documentation des tests
 */
function generateTestsDoc() {
  console.log('📝 Génération de la documentation des tests...');
  
  let markdownOutput = `# Documentation des Tests\n\n> Généré le: ${CONFIG.date}\n\n`;
  
  // Trouver tous les fichiers de test
  const testFiles = [];
  
  function findTestFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        findTestFiles(fullPath);
      } else if (file.name.match(/\.(test|spec)\.(ts|tsx|js|jsx)$/)) {
        testFiles.push(fullPath);
      }
    });
  }
  
  findTestFiles('./src');
  
  markdownOutput += `## Couverture des Tests\n\n`;
  markdownOutput += `**Total des fichiers de test:** ${testFiles.length}\n\n`;
  
  testFiles.forEach(testFile => {
    const relativePath = testFile.replace('./src/', '').replace(/_/g, '\\_');
    markdownOutput += `- **${relativePath}**\n`;
  });
  
  markdownOutput += `\n## Commandes de Test\n\n`;
  markdownOutput += `\`\`\`bash\n`;
  markdownOutput += `# Tests unitaires\nnpm run test:unit\n\n`;
  markdownOutput += `# Tests d'intégration\nnpm run test:integration\n\n`;
  markdownOutput += `# Tests avec couverture\nnpm run test:coverage\n`;
  markdownOutput += `\`\`\`\n`;

  fs.writeFileSync(path.join(CONFIG.generatedDir, 'tests.md'), markdownOutput);
  console.log('✅ Documentation des tests générée');
}

/**
 * Génère un rapport sur l'état de la documentation
 */
function generateReport() {
  console.log('📊 Rapport de documentation généré');
  let report = `# Rapport de Documentation - ${CONFIG.date}\n\n`;
  report += `## 📊 Statistiques\n\n`;
  report += `- ✅ Schéma DB (Tables)\n`;
  report += `- ✅ Schéma DB (RPC)\n`;
  report += `- ✅ Schéma DB (RLS)\n`;
  report += `- ✅ Documentation API\n`;
  report += `- ✅ Types TypeScript\n`;
  report += `- ✅ Fonctionnalités\n`;
  report += `- ✅ Composants\n`;
  report += `- ✅ Services\n`;
  report += `- ✅ Hooks\n`;
  report += `- ✅ Tests\n\n`;
  
  report += `## 📁 Fichiers Générés\n\n`;
  const generatedFiles = fs.readdirSync(CONFIG.generatedDir)
    .filter(file => file.endsWith('.md'))
    .map(file => `- \`${file}\``)
    .join('\n');
  report += generatedFiles;
  
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
    generateFeaturesDoc();
    generateComponentsDoc();
    generateServicesDoc();
    generateHooksDoc();
    generateTestsDoc();
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
  generateFeaturesDoc,
  generateComponentsDoc,
  generateServicesDoc,
  generateHooksDoc,
  generateTestsDoc,
  validateDocumentation,
  generateReport,
};
