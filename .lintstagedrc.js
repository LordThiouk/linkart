module.exports = stagedFiles => {
  // Filtrer EXPLICITEMENT supabase.ts de TOUS les fichiers stagés
  const filteredFiles = stagedFiles.filter(file => !file.includes('src/types/supabase.ts'));

  const eslintFiles = filteredFiles.filter(file => file.match(/src\/.*\.(ts|tsx|js|jsx)$/)).join(' ');

  const prettierFiles = filteredFiles
    .filter(file => file.match(/\.(ts|tsx|js|jsx|json|yml|yaml|md)$/) && !file.includes('node_modules'))
    .join(' ');

  const markdownFiles = filteredFiles.filter(file => file.match(/docs\/.*\.md$/)).join(' ');

  const sqlFiles = filteredFiles.filter(file => file.match(/supabase\/.*\.sql$/)).join(' ');

  // Vérifier si des fichiers source ont été modifiés
  const sourceFiles = filteredFiles.filter(
    file => file.match(/src\/.*\.(ts|tsx|js|jsx)$/) || file.match(/supabase\/.*\.sql$/)
  );

  const commands = [];

  if (eslintFiles) {
    commands.push(`eslint --fix ${eslintFiles}`);
  }

  if (prettierFiles) {
    commands.push(`prettier --write ${prettierFiles}`);
  }

  if (markdownFiles) {
    commands.push(`markdownlint --fix ${markdownFiles}`);
  }

  if (sqlFiles) {
    commands.push(`prettier --write --parser sql ${sqlFiles}`);
  }

  // Si des fichiers source ont été modifiés, régénérer la documentation
  if (sourceFiles.length > 0) {
    commands.push('npm run docs:generate');
  }

  return commands;
};
