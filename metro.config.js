const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withStorybook } = require('@storybook/react-native/metro');

// Utiliser process.cwd() pour une compatibilité maximale avec les environnements CI/CD
const projectRoot = process.cwd();

const config = getSentryExpoConfig(projectRoot);

config.resolver.sourceExts.push('sql');

module.exports = withStorybook(config, {
  // Options for Storybook
  projectRoot: process.cwd(),
  // storybook-enabled build resolving stories from all folders in src
  unstable_server_internal_external_resolve: true,
  unstable_server_only_resolve_stories: false,
});
