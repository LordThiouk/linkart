#!/usr/bin/env node

/**
 * Script de vérification des versions compatibles pour Linkart
 * Vérifie que toutes les versions sont compatibles avec Expo SDK 54
 */

const fs = require('fs');
const path = require('path');

// Versions attendues pour Expo SDK 54
const EXPECTED_VERSIONS = {
  expo: '54.0.22',
  react: '19.1.0',
  'react-dom': '19.1.0',
  '@types/react': '~19.1.10',
  'expo-router': '~6.0.14',
  'expo-web-browser': '~15.0.9',
  nativewind: '^2.0.11',
  tailwindcss: '^3.3.2',
  storybook: '^9.1.13',
  '@storybook/react-native-web-vite': '^9.1.13',
  '@storybook/addon-docs': '^9.1.13',
  'react-native-reanimated': '^4.1.3',
};

// Packages qui doivent être en version 9.x pour Storybook
const STORYBOOK_PACKAGES = ['@storybook/react-native-web-vite', '@storybook/addon-docs', 'storybook'];

// Packages qui ne doivent PAS être installés
const FORBIDDEN_PACKAGES = ['@storybook/react-webpack5', '@storybook/addon-storyshots', '@storybook/test'];

function checkVersion(actual, expected) {
  // Normaliser les versions pour comparaison
  const normalizeVersion = v => v.replace(/[\^~]/g, '');

  // Si la version attendue commence par ~ ou ^, vérifier la compatibilité
  if (expected.startsWith('~') || expected.startsWith('^')) {
    const expectedBase = normalizeVersion(expected);
    const actualBase = normalizeVersion(actual);

    // Pour ~, vérifier que les deux premiers segments correspondent
    if (expected.startsWith('~')) {
      const expectedParts = expectedBase.split('.');
      const actualParts = actualBase.split('.');
      return expectedParts[0] === actualParts[0] && expectedParts[1] === actualParts[1];
    }

    // Pour ^, vérifier que le premier segment correspond
    if (expected.startsWith('^')) {
      const expectedParts = expectedBase.split('.');
      const actualParts = actualBase.split('.');
      return expectedParts[0] === actualParts[0];
    }
  }

  // Comparaison exacte
  return normalizeVersion(actual) === normalizeVersion(expected);
}

function checkCompatibility() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const errors = [];
  const warnings = [];

  // Vérifier les versions attendues
  for (const [packageName, expectedVersion] of Object.entries(EXPECTED_VERSIONS)) {
    const actualVersion = allDeps[packageName];

    if (!actualVersion) {
      warnings.push(`⚠️  ${packageName} n'est pas installé`);
      continue;
    }

    if (!checkVersion(actualVersion, expectedVersion)) {
      errors.push(`❌ ${packageName}: version ${actualVersion} (attendue: ${expectedVersion})`);
    }
  }

  // Vérifier que les packages Storybook sont tous en version 9.x
  for (const packageName of STORYBOOK_PACKAGES) {
    const actualVersion = allDeps[packageName];
    if (actualVersion && !actualVersion.startsWith('^9.') && !actualVersion.startsWith('~9.')) {
      errors.push(`❌ ${packageName}: version ${actualVersion} (doit être en version 9.x pour Storybook)`);
    }
  }

  // Vérifier les packages interdits
  for (const packageName of FORBIDDEN_PACKAGES) {
    if (allDeps[packageName]) {
      errors.push(`❌ ${packageName} ne doit pas être installé (non utilisé)`);
    }
  }

  // Vérifier PostCSS config
  const postcssConfigPath = path.join(process.cwd(), 'postcss.config.js');
  if (!fs.existsSync(postcssConfigPath)) {
    warnings.push("⚠️  postcss.config.js n'existe pas (recommandé pour NativeWind v2)");
  }

  // Afficher les résultats
  console.log('\n🔍 Vérification de compatibilité des versions\n');
  console.log('='.repeat(60));

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Toutes les versions sont compatibles !\n');
    return 0;
  }

  if (errors.length > 0) {
    console.log('\n❌ Erreurs de compatibilité :\n');
    errors.forEach(error => console.log(`  ${error}`));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Avertissements :\n');
    warnings.forEach(warning => console.log(`  ${warning}`));
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n💡 Utilisez `npx expo install --check` pour vérifier les versions Expo\n');

  return errors.length > 0 ? 1 : 0;
}

// Exécuter la vérification
const exitCode = checkCompatibility();
process.exit(exitCode);
