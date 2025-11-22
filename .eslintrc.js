module.exports = {
  extends: ['expo', 'prettier', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react-native'],
  ignorePatterns: [
    '.history/**/*',
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'src/types/supabase.ts',
    'figma/**/*',
    'metro/mocks/**/*',
    'expo-env.d.ts',
    'storybook-static/**/*',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
  },
  overrides: [
    {
      files: ['src/components/**/*.ts', 'src/components/**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['react-native-paper'],
                message:
                  'react-native-paper est interdit dans src/components. Utilisez les composants du Design System v2.0 (@/theme) à la place.',
              },
            ],
            paths: [
              {
                name: 'react-native-paper',
                importNames: ['*'],
                message:
                  'react-native-paper est interdit dans src/components. Utilisez les composants du Design System v2.0 (@/theme) à la place.',
              },
            ],
          },
        ],
      },
    },
  ],
  env: {
    jest: true,
  },
};
